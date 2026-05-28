/* ==========================================================
   Card APIs Globais - Cianorte Card Masters
   Suporta:
   - fab      => GoAgain API
   - mtg      => Scryfall API
   - pokemon  => TCGdex + Pokémon TCG API
   - tcgdex   => TCGdex API para Pokémon TCG
   - yugioh   => YGOPRODeck API

   Uso em qualquer página/post:
   {% include tcg-card.html game="fab" name="Bios Update" pitch="red" %}
   {% include tcg-card.html game="mtg" name="Lightning Bolt" %}
   {% include tcg-card.html game="pokemon" name="Pikachu" %}
   {% include tcg-card.html game="yugioh" name="Blue-Eyes White Dragon" %}
========================================================== */

(() => {
  const caches = {
    fab: new Map(),
    mtg: new Map(),
    pokemon: new Map(),
    pokemonTcgdex: new Map(),
    yugioh: new Map()
  };

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function findDeepImageUrl(object) {
    const stack = [object];
    const seen = new Set();

    while (stack.length) {
      const current = stack.pop();
      if (!current || typeof current !== "object" || seen.has(current)) continue;
      seen.add(current);

      for (const [key, value] of Object.entries(current)) {
        const keyLooksImage = /image|img|picture|art|print/i.test(key);
        const valueIsUrl = typeof value === "string" && /^https?:\/\//i.test(value);
        const valueLooksImage = valueIsUrl && /\.(png|jpe?g|webp)(\?|$)/i.test(value);
        if (keyLooksImage && valueIsUrl) return value;
        if (valueLooksImage) return value;
        if (value && typeof value === "object") stack.push(value);
      }
    }
    return "";
  }

  function setCardImage(element, imageUrl, altText, isFallback = false) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = element.dataset.alt || altText || "Carta";
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";

    img.onerror = () => {
      img.onerror = null;
      if (!isFallback && setCardFallback(element, altText)) return;
      const wrapper = document.createElement("span");
      wrapper.className = "tcg-card-loading";
      wrapper.append(document.createTextNode("Imagem indisponível"));
      if (altText) {
        const small = document.createElement("small");
        small.textContent = altText;
        wrapper.append(small);
      }
      element.classList.remove("tcg-card-loaded");
      element.classList.add("tcg-card-error");
      element.replaceChildren(wrapper);
    };

    element.replaceChildren(img);
    element.classList.remove("tcg-card-error");
    element.classList.add("tcg-card-loaded");
  }

  function setCardFallback(element, altText = "Imagem da postagem") {
    const fallbackSrc = element.dataset.fallbackSrc || "";
    if (!fallbackSrc) return false;
    setCardImage(element, fallbackSrc, element.dataset.fallbackAlt || altText, true);
    element.classList.add("tcg-card-fallback");
    return true;
  }

  function setCardError(element, message, detail = "") {
    if (setCardFallback(element, detail || message)) return;
    element.classList.add("tcg-card-error");
    const wrapper = document.createElement("span");
    wrapper.className = "tcg-card-loading";
    wrapper.append(document.createTextNode(message));
    if (detail) {
      const small = document.createElement("small");
      small.textContent = detail;
      wrapper.append(small);
    }
    element.replaceChildren(wrapper);
  }

  async function jsonFetch(url, options = {}) {
    const { timeoutMs = 7000, ...fetchOptions } = options;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), Number(timeoutMs));

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: fetchOptions.signal || controller.signal
      });
      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
      return response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  /* ================= FAB / GoAgain ================= */

  function extractGoAgainCards(payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.cards)) return payload.cards;
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.items)) return payload.items;
    return [];
  }

  function getFabPitch(card) {
    return normalizeText(
      card.pitch ||
      card.color ||
      card.pitch_value ||
      card.resource ||
      (card.variants && card.variants.pitch) ||
      ""
    );
  }

  async function fetchFabCard(name, pitch = "") {
    const cacheKey = `${normalizeText(name)}|${normalizeText(pitch)}`;
    if (caches.fab.has(cacheKey)) return caches.fab.get(cacheKey);

    const request = jsonFetch(`https://api.goagain.dev/v1/cards?name=${encodeURIComponent(name)}&limit=20`)
      .catch(() => jsonFetch(`https://api.goagain.dev/v1/cards?q=${encodeURIComponent(name)}&limit=20`))
      .then(payload => {
        const cards = extractGoAgainCards(payload);
        const wanted = normalizeText(name);
        const wantedPitch = normalizeText(pitch);

        let exact = cards.filter(card => normalizeText(card.name || card.card_name) === wanted);
        if (!exact.length) exact = cards.filter(card => normalizeText(card.name || card.card_name).includes(wanted));
        if (!exact.length) exact = cards;

        if (wantedPitch) {
          const byPitch = exact.find(card => getFabPitch(card) === wantedPitch);
          if (byPitch) return byPitch;
        }

        return exact[0] || null;
      });

    caches.fab.set(cacheKey, request);
    return request;
  }

  function fabImageUrl(card) {
    return findDeepImageUrl(card);
  }

  /* ================= MTG / Scryfall ================= */

  async function fetchMtgCard(name) {
    const cacheKey = normalizeText(name);
    if (caches.mtg.has(cacheKey)) return caches.mtg.get(cacheKey);

    const request = jsonFetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`)
      .catch(async () => {
        // fallback search
        const payload = await jsonFetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(name)}`);
        return Array.isArray(payload.data) ? payload.data[0] : null;
      });

    caches.mtg.set(cacheKey, request);
    return request;
  }

  function mtgImageUrl(card) {
    if (!card) return "";
    if (card.image_uris?.normal) return card.image_uris.normal;
    if (card.image_uris?.large) return card.image_uris.large;
    if (Array.isArray(card.card_faces)) {
      for (const face of card.card_faces) {
        if (face.image_uris?.normal) return face.image_uris.normal;
        if (face.image_uris?.large) return face.image_uris.large;
      }
    }
    return findDeepImageUrl(card);
  }

  /* ================= Pokémon ================= */

  function pokemonNameCandidates(name) {
    const raw = String(name || "").trim();
    const withoutPromoSuffix = raw.replace(/\s+-\s+[A-Z]{1,6}\d+[A-Z]?$/i, "").trim();
    const withoutCollectorSuffix = raw.replace(/\s+#?\d+\/?\d*$/i, "").trim();

    return Array.from(new Set([raw, withoutPromoSuffix, withoutCollectorSuffix]
      .map(value => value.trim())
      .filter(Boolean)));
  }

  function pokemonSetCandidates(set) {
    const raw = String(set || "").trim();
    const withoutCodePrefix = raw.replace(/^[A-Z]{1,8}\d{0,3}(?:\.[0-9]+)?:\s*/i, "").trim();
    const withoutParentheses = withoutCodePrefix.replace(/\s*\([^)]*\)\s*$/g, "").trim();

    return Array.from(new Set([raw, withoutCodePrefix, withoutParentheses]
      .map(value => value.trim())
      .filter(Boolean)));
  }

  function pokemonNumberCandidates(number, name) {
    const rawNumber = String(number || "").trim();
    const localNumber = rawNumber.split("/")[0].trim();
    const namePromo = String(name || "").match(/\b[A-Z]{1,6}\d+[A-Z]?\b/);

    return Array.from(new Set([rawNumber, localNumber, namePromo?.[0] || ""]
      .map(value => value.trim())
      .filter(Boolean)));
  }

  function escapePokemonQuery(value) {
    return String(value || "").replace(/[\\"]/g, "\\$&");
  }

  function pokemonSearchQueries(name, set = "", number = "") {
    const names = pokemonNameCandidates(name);
    const sets = pokemonSetCandidates(set);
    const numbers = pokemonNumberCandidates(number, name);
    const queries = [];

    for (const cardName of names.slice(0, 3)) {
      for (const cardNumber of numbers.slice(0, 2)) {
        queries.push(`name:"${escapePokemonQuery(cardName)}" number:"${escapePokemonQuery(cardNumber)}"`);
      }

      for (const setName of sets.slice(0, 2)) {
        queries.push(`name:"${escapePokemonQuery(cardName)}" set.name:"${escapePokemonQuery(setName)}"`);
      }

      queries.push(`name:"${escapePokemonQuery(cardName)}"`);
    }

    return Array.from(new Set(queries)).filter(Boolean);
  }

  function scorePokemonCard(card, name, set = "", number = "") {
    const wantedNames = pokemonNameCandidates(name).map(normalizeText);
    const wantedSets = Array.from(new Set([
      ...pokemonSetCandidates(set),
      ...tcgdexSetCandidates(set)
    ])).map(normalizeText);
    const wantedNumbers = pokemonNumberCandidates(number, name).map(normalizeText);
    const cardName = normalizeText(card?.name);
    const cardSet = normalizeText(card?.set?.name || card?.setName || card?.set?.id || card?.id?.split("-")?.[0]);
    const cardNumber = normalizeText(card?.number || card?.localId);
    const cardId = normalizeText(card?.id);
    let score = 0;

    if (wantedNames.includes(cardName)) score += 80;
    else if (wantedNames.some(value => value && cardName.includes(value))) score += 42;
    else if (wantedNames.some(value => value && value.includes(cardName))) score += 24;

    if (wantedNumbers.includes(cardNumber)) score += 55;
    else if (wantedNumbers.length && cardNumber) score -= 10;

    if (wantedSets.includes(cardSet)) score += 35;
    else if (wantedSets.some(value => value && (cardSet.includes(value) || value.includes(cardSet) || cardId.includes(value)))) score += 18;

    if (card?.image) score += 10;
    if (card?.images?.large || card?.images?.small) score += 8;
    return score;
  }

  async function fetchPokemonCard(name, set = "", number = "") {
    const cacheKey = `${normalizeText(name)}|${normalizeText(set)}|${normalizeText(number)}`;
    if (caches.pokemon.has(cacheKey)) return caches.pokemon.get(cacheKey);

    const request = (async () => {
      const queries = pokemonSearchQueries(name, set, number);

      for (const q of queries) {
        try {
          const payload = await jsonFetch(`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(q)}&pageSize=24&select=id,name,set,number,images`);
          const cards = Array.isArray(payload.data) ? payload.data : [];
          if (!cards.length) continue;

          return cards
            .slice()
            .sort((a, b) => scorePokemonCard(b, name, set, number) - scorePokemonCard(a, name, set, number))[0];
        } catch (error) {
          console.warn("Pokémon TCG API falhou para", q, error);
        }
      }

      return null;
    })();

    caches.pokemon.set(cacheKey, request);
    return request;
  }

  function tcgdexFallbackLanguages(preferredLang = "pt-br") {
    const lang = String(preferredLang || "pt-br").toLowerCase().trim();
    const supported = ["pt-br", "pt", "en", "es", "fr", "it", "de", "ja", "zh-tw", "id", "th"];
    const normalized = supported.includes(lang) ? lang : "pt-br";

    // Preferimos português do Brasil no site, mas mantemos inglês como fallback
    // porque alguns cards recentes podem ainda não ter imagem/dados em pt-br.
    return Array.from(new Set([normalized, "pt-br", "pt", "en"]));
  }

  function tcgdexSearchLanguages(preferredLang = "pt-br") {
    // Os nomes das decklists geralmente vêm em inglês. Buscamos primeiro em inglês
    // para localizar o ID global da carta e depois tentamos abrir a imagem em pt-br.
    return Array.from(new Set(["en", ...tcgdexFallbackLanguages(preferredLang)]));
  }

  function tcgdexSetCandidates(set) {
    const raw = String(set || "").trim();
    const normalized = normalizeText(raw).replace(/\s+/g, "");

    const aliases = {
      svi: ["sv01", "sv1"],
      pal: ["sv02", "sv2"],
      par: ["sv04", "sv4"],
      paf: ["sv04.5", "sv4.5"],
      twm: ["sv06", "sv6"],
      sfa: ["sv06.5", "sv6.5"],
      pre: ["sv08.5", "sv8.5"]
    };

    if (aliases[normalized]) return aliases[normalized];

    // Se a lista já vier com um id TCGdex, aceita direto.
    if (/^(sv|swsh|sm|xy|bw|dp|ex|base|hgss)[a-z0-9.]*$/i.test(normalized)) {
      return [normalized];
    }

    // Evita tentar dezenas de URLs desconhecidas em sequência.
    // Códigos como MEG, quando ainda não mapeados na TCGdex, vão direto para busca por nome.
    return [];
  }

  function tcgdexCardsUrl(lang, cardName) {
    const params = new URLSearchParams();
    params.set("name", cardName);
    params.set("pagination:itemsPerPage", "36");
    return `https://api.tcgdex.net/v2/${lang}/cards?${params.toString()}`;
  }

  function tcgdexCardUrl(lang, cardId) {
    return `https://api.tcgdex.net/v2/${lang}/cards/${encodeURIComponent(cardId)}`;
  }

  function tcgdexSetCardUrl(lang, setId, localId) {
    return `https://api.tcgdex.net/v2/${lang}/sets/${encodeURIComponent(setId)}/${encodeURIComponent(localId)}`;
  }

  async function tryTcgdexCardById(cardId, preferredLang = "pt-br") {
    if (!cardId) return null;

    for (const lang of tcgdexFallbackLanguages(preferredLang)) {
      try {
        const card = await jsonFetch(tcgdexCardUrl(lang, cardId), { timeoutMs: 4500 });
        if (card?.image) return card;
      } catch (error) {
        // Continua para o próximo idioma.
      }
    }

    return null;
  }

  async function tryTcgdexCardBySetNumber(setIds, numbers, preferredLang = "pt-br") {
    if (!setIds.length || !numbers.length) return null;

    for (const lang of tcgdexFallbackLanguages(preferredLang)) {
      for (const setId of setIds.slice(0, 3)) {
        for (const localId of numbers.slice(0, 2)) {
          try {
            const card = await jsonFetch(tcgdexSetCardUrl(lang, setId, localId), { timeoutMs: 3500 });
            if (card?.image) return card;
          } catch (error) {
            // Continua para o próximo candidato.
          }
        }
      }
    }

    return null;
  }

  async function fetchPokemonTcgdexCard(name, set = "", number = "", preferredLang = "pt-br") {
    const cacheKey = `${normalizeText(name)}|${normalizeText(set)}|${normalizeText(number)}|${normalizeText(preferredLang)}`;
    if (caches.pokemonTcgdex.has(cacheKey)) return caches.pokemonTcgdex.get(cacheKey);

    const request = (async () => {
      const numbers = pokemonNumberCandidates(number, name);
      const setIds = tcgdexSetCandidates(set);

      // Se existir set/localId confiável, tenta direto em português primeiro.
      // Isso ajuda a puxar a imagem PT-BR sem depender do nome traduzido da carta.
      const directCard = await tryTcgdexCardBySetNumber(setIds, numbers, preferredLang);
      if (directCard?.image) return directCard;

      // Depois busca por nome. Como as listas de deck normalmente vêm em inglês,
      // a busca começa em inglês para achar o ID global e então tenta reabrir em pt-br.
      for (const lang of tcgdexSearchLanguages(preferredLang)) {
        for (const cardName of pokemonNameCandidates(name).slice(0, 3)) {
          try {
            const payload = await jsonFetch(tcgdexCardsUrl(lang, cardName), { timeoutMs: 6000 });
            const cards = Array.isArray(payload) ? payload : [];
            if (!cards.length) continue;

            const sorted = cards
              .slice()
              .sort((a, b) => scorePokemonCard(b, name, set, number) - scorePokemonCard(a, name, set, number));

            const best = sorted[0];
            if (!best?.image) continue;

            const localizedCard = await tryTcgdexCardById(best.id, preferredLang);
            if (localizedCard?.image) return localizedCard;

            // Último fallback: usa o card encontrado no idioma da busca.
            return best;
          } catch (error) {
            console.warn("TCGdex falhou para", cardName, error);
          }
        }
      }

      return null;
    })();

    caches.pokemonTcgdex.set(cacheKey, request);
    return request;
  }

  function tcgdexImageUrl(card, quality = "low") {
    const image = card?.image || "";
    if (!image) return "";
    return `${image}/${quality}.webp`;
  }

  function pokemonImageUrl(card) {
    if (!card) return "";
    if (card.images?.large) return card.images.large;
    if (card.images?.small) return card.images.small;
    if (card.image) return tcgdexImageUrl(card, "low");
    return findDeepImageUrl(card);
  }

  /* ================= Yu-Gi-Oh! ================= */

  async function fetchYugiohCard(name) {
    const cacheKey = normalizeText(name);
    if (caches.yugioh.has(cacheKey)) return caches.yugioh.get(cacheKey);

    const request = jsonFetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`)
      .then(payload => Array.isArray(payload.data) ? payload.data[0] : null);

    caches.yugioh.set(cacheKey, request);
    return request;
  }

  function yugiohImageUrl(card) {
    if (!card) return "";
    const img = Array.isArray(card.card_images) ? card.card_images[0] : null;
    if (img?.image_url_cropped) return img.image_url_cropped;
    if (img?.image_url) return img.image_url;
    return findDeepImageUrl(card);
  }

  /* ================= Loader Global ================= */

  async function loadCardElement(element) {
    if (!element || element.dataset.loaded === "true") return;
    element.dataset.loaded = "true";

    const game = normalizeText(element.dataset.game);
    const name = element.dataset.name;
    const pitch = element.dataset.pitch || "";
    const set = element.dataset.set || "";
    const number = element.dataset.number || "";
    const lang = element.dataset.lang || "pt-br";

    if (!game || !name) {
      setCardError(element, "Carta inválida");
      return;
    }

    try {
      let card = null;
      let imageUrl = "";

      if (game === "fab") {
        card = await fetchFabCard(name, pitch);
        imageUrl = fabImageUrl(card);
      } else if (game === "mtg" || game === "magic") {
        card = await fetchMtgCard(name);
        imageUrl = mtgImageUrl(card);
      } else if (game === "pokemon" || game === "pkm") {
        card = await fetchPokemonCard(name, set, number);
        imageUrl = pokemonImageUrl(card);

        if (!imageUrl) {
          card = await fetchPokemonTcgdexCard(name, set, number, lang);
          imageUrl = pokemonImageUrl(card);
        }
      } else if (game === "tcgdex" || game === "pokemon tcgdex") {
        card = await fetchPokemonTcgdexCard(name, set, number, lang);
        imageUrl = pokemonImageUrl(card);
      } else if (game === "yugioh" || game === "ygo") {
        card = await fetchYugiohCard(name);
        imageUrl = yugiohImageUrl(card);
      } else {
        throw new Error(`Jogo não suportado: ${game}`);
      }

      if (!card || !imageUrl) {
        throw new Error("Imagem não encontrada.");
      }

      setCardImage(element, imageUrl, name);
    } catch (error) {
      console.warn("Erro ao carregar carta:", game, name, error);
      setCardError(element, "Imagem indisponível", name);
    }
  }

  async function getImageUrl(game, name, options = {}) {
    const normalizedGame = normalizeText(game);
    let card = null;

    if (normalizedGame === "fab") {
      card = await fetchFabCard(name, options.pitch || "");
      return fabImageUrl(card);
    }

    if (normalizedGame === "mtg" || normalizedGame === "magic") {
      card = await fetchMtgCard(name);
      return mtgImageUrl(card);
    }

    if (normalizedGame === "pokemon" || normalizedGame === "pkm") {
      card = await fetchPokemonCard(name, options.set || "", options.number || "");
      let imageUrl = pokemonImageUrl(card);
      if (imageUrl) return imageUrl;

      card = await fetchPokemonTcgdexCard(name, options.set || "", options.number || "", options.lang || "pt-br");
      return pokemonImageUrl(card);
    }

    if (normalizedGame === "tcgdex" || normalizedGame === "pokemon tcgdex") {
      card = await fetchPokemonTcgdexCard(name, options.set || "", options.number || "", options.lang || "pt-br");
      return pokemonImageUrl(card);
    }

    if (normalizedGame === "yugioh" || normalizedGame === "ygo") {
      card = await fetchYugiohCard(name);
      return yugiohImageUrl(card);
    }

    throw new Error(`Jogo não suportado: ${game}`);
  }

  function initGlobalCardApis() {
    document.querySelectorAll(".tcg-card-image[data-game][data-name]").forEach(loadCardElement);
  }

  function failStuckLoaders() {
    document.querySelectorAll('.tcg-card-image[data-loaded="true"]:not(.tcg-card-loaded):not(.tcg-card-error)').forEach(element => {
      setCardError(element, "Imagem indisponível", element.dataset.name || "Carta");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobalCardApis);
  } else {
    initGlobalCardApis();
  }

  window.setTimeout(initGlobalCardApis, 500);
  window.setTimeout(failStuckLoaders, 15000);

  // API pública opcional para inicializar manualmente conteúdo injetado depois
  window.CCMCardApis = {
    init: initGlobalCardApis,
    load: loadCardElement,
    getImageUrl
  };
})();

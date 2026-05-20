/* ==========================================================
   Card APIs Globais - Cianorte Card Masters
   Suporta:
   - fab      => GoAgain API
   - mtg      => Scryfall API
   - pokemon  => Pokémon TCG API
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

  function setCardImage(element, imageUrl, altText) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altText || "Carta";
    img.loading = "lazy";
    element.replaceChildren(img);
    element.classList.remove("tcg-card-error");
  }

  function setCardFallback(element, altText = "Imagem da postagem") {
    const fallbackSrc = element.dataset.fallbackSrc || "";
    if (!fallbackSrc) return false;
    setCardImage(element, fallbackSrc, element.dataset.fallbackAlt || altText);
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
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
    return response.json();
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

  async function fetchPokemonCard(name, set = "", number = "") {
    const cacheKey = `${normalizeText(name)}|${normalizeText(set)}|${normalizeText(number)}`;
    if (caches.pokemon.has(cacheKey)) return caches.pokemon.get(cacheKey);

    const terms = [`name:"${name}"`];
    if (set) terms.push(`set.name:"${set}"`);
    if (number) terms.push(`number:${number}`);
    const q = terms.join(" ");

    const request = jsonFetch(`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(q)}&pageSize=12`)
      .then(payload => {
        const cards = Array.isArray(payload.data) ? payload.data : [];
        const wanted = normalizeText(name);
        return (
          cards.find(card => normalizeText(card.name) === wanted) ||
          cards.find(card => normalizeText(card.name).includes(wanted)) ||
          cards[0] ||
          null
        );
      });

    caches.pokemon.set(cacheKey, request);
    return request;
  }

  function pokemonImageUrl(card) {
    if (!card) return "";
    if (card.images?.large) return card.images.large;
    if (card.images?.small) return card.images.small;
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

  function initGlobalCardApis() {
    document.querySelectorAll(".tcg-card-image[data-game][data-name]").forEach(loadCardElement);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobalCardApis);
  } else {
    initGlobalCardApis();
  }

  // API pública opcional para inicializar manualmente conteúdo injetado depois
  window.CCMCardApis = {
    init: initGlobalCardApis,
    load: loadCardElement
  };
})();

/* Comunidade: paginação do feed social, estatísticas do Armory e destaque da última Liga. */
(() => {
  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function parseArmoryData() {
    const script = document.querySelector("#armory-data");
    if (!script) return [];
    try {
      const data = JSON.parse(script.textContent || "[]");
      return Array.isArray(data)
        ? data
            .filter(item => item && item.date)
            .sort((a, b) => new Date(b.event_date || b.date) - new Date(a.event_date || a.date))
        : [];
    } catch (error) {
      console.warn("Erro ao ler dados de Armory:", error);
      return [];
    }
  }

  function parseLeagueData() {
    const script = document.querySelector("#league-data");
    if (!script) return [];
    try {
      const data = JSON.parse(script.textContent || "[]");
      return Array.isArray(data)
        ? data
            .filter(item => item && item.date)
            .sort((a, b) => new Date(b.event_date || b.date) - new Date(a.event_date || a.date))
        : [];
    } catch (error) {
      console.warn("Erro ao ler dados de Liga:", error);
      return [];
    }
  }


  function normalizeGame(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  function isPokemonGame(value) {
    const game = normalizeGame(value);
    return game.includes("pokemon") || game === "pkm";
  }

  function isFleshAndBloodGame(value) {
    const game = normalizeGame(value);
    return game.includes("flesh and blood") || game === "fab";
  }

  function dateLabel(value) {
    if (!value) return "Sem data";
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  function monthLabel(date = new Date()) {
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }

  function currentMonthItems(items) {
    const now = new Date();
    return items.filter(item => {
      const date = new Date(item.date);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    });
  }

  function flattenResults(items) {
    return items.flatMap(item => {
      const results = Array.isArray(item.results) ? item.results : [];
      return results.map(result => ({ ...result, eventDate: item.date, eventTitle: item.title }));
    });
  }

  function winsFromRecord(record) {
    const text = String(record || "").trim();
    const match = text.match(/^(\d+)\s*[-–xX]\s*\d+/);
    return match ? Number(match[1]) : 0;
  }

  function resultPoints(result) {
    const explicit = Number(result.wins ?? result.vitorias ?? result.vitórias ?? result.points ?? result.pontos);
    if (Number.isFinite(explicit) && explicit > 0) return explicit;
    const parsed = winsFromRecord(result.record ?? result.campanha ?? result.score);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  function getPlayer(result) {
    return result.player || result.jogador || result.name || result.nome || "";
  }

  function getHero(result) {
    return result.hero || result.heroi || result.herói || result.hero_name || result.deck || result.deque || "";
  }

  function sumBy(results, key) {
    const map = new Map();
    results.forEach(result => {
      const name = key === "player" ? getPlayer(result) : getHero(result);
      if (!name) return;
      const points = resultPoints(result);
      if (!points) return;
      map.set(name, (map.get(name) || 0) + points);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
  }

  function makePie(container, legend, data) {
    if (!container || !legend) return;
    if (!data.length) {
      container.className = "pie-chart-empty";
      container.innerHTML = "Sem dados";
      container.style.background = "";
      legend.innerHTML = "";
      return;
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const palette = ["#d4af37", "#1fb85c", "#8ecae6", "#ff595e", "#c77dff", "#ffca3a", "#b8f2e6", "#f77f00"];
    let cumulative = 0;
    const slices = data.map((item, index) => {
      const start = cumulative / total;
      cumulative += item.value;
      const end = cumulative / total;
      return `${palette[index % palette.length]} ${start * 100}% ${end * 100}%`;
    });

    container.className = "pie-chart";
    container.style.background = `conic-gradient(${slices.join(", ")})`;
    container.innerHTML = `<span>${total}</span><small>vitórias</small>`;

    legend.innerHTML = data.map((item, index) => `
      <li>
        <span class="legend-dot" style="--dot:${palette[index % palette.length]}"></span>
        <strong>${escapeHtml(item.name)}</strong>
        <em>${item.value}</em>
      </li>
    `).join("");
  }

  function assetUrl(path) {
    const base = String(window.CCM_BASEURL || "").replace(/\/$/, "");
    const normalized = String(path || "");
    if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith("data:")) return normalized;
    return `${base}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
  }

  const armoryIcons = {
    depth: {
      badge: assetUrl("/assets/img/armory-icons/depth/badge-armory.png"),
      leagueBadge: assetUrl("/assets/img/armory-icons/depth/badge-liga.png"),
      champion: assetUrl("/assets/img/armory-icons/depth/badge-campeao.png"),
      placement: assetUrl("/assets/img/armory-icons/depth/badge-colocacao.png"),
      trophy: assetUrl("/assets/img/armory-icons/depth/icon-trofeu.png")
    },
    flat: {
      trophy: assetUrl("/assets/img/armory-icons/flat/icon-trofeu.png"),
      swords: assetUrl("/assets/img/armory-icons/flat/icon-espadas.png"),
      people: assetUrl("/assets/img/armory-icons/flat/icon-pessoas.png"),
      cards: assetUrl("/assets/img/armory-icons/flat/icon-cartas.png"),
      calendar: assetUrl("/assets/img/armory-icons/flat/icon-calendario.png")
    }
  };

  const heroNameAliases = {
    "arakni marionette": "Arakni, Marionette",
    "marionette": "Arakni, Marionette",
    "aurora": "Aurora, Shooting Star",
    "aurora shooting star": "Aurora, Shooting Star",
    "azalea": "Azalea, Ace in the Hole",
    "boltyn": "Ser Boltyn, Breaker of Dawn",
    "ser boltyn": "Ser Boltyn, Breaker of Dawn",
    "dash i/o": "Dash I-O",
    "dash i-o": "Dash I-O",
    "fai": "Fai, Rising Rebellion",
    "ira": "Ira, Crimson Haze",
    "ira, scarlet revenger": "Ira, Crimson Haze",
    "pleiades": "Pleiades, Superstar",
    "prism": "Prism, Awakener of Sol",
    "teklovossen": "Teklovossen, Esteemed Magnate"
  };

  function canonicalHeroName(value) {
    const clean = cleanHeroName(value);
    if (!clean) return "";
    return heroNameAliases[clean.toLowerCase()] || clean;
  }

  function slugHeroFileName(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-")
      .toLowerCase();
  }

  function heroAssetCandidates(heroName, explicitIcon = "") {
    const canonical = canonicalHeroName(heroName);
    if (!canonical) return [];

    const slug = slugHeroFileName(canonical);
    const encoded = encodeURIComponent(canonical);
    const explicit = String(explicitIcon || "").trim();
    const localExplicit = explicit && !/^[a-z]+:/i.test(explicit) ? assetUrl(explicit) : "";
    const candidates = [
      localExplicit,
      // Padrão escolhido para o bloco Armory: arquivos em slug minúsculo, sem vírgula e sem espaços.
      assetUrl(`/assets/img/fab-heroes/${slug}.webp`),
      assetUrl(`/assets/img/fab-heroes/${slug}.png`),
      // Fallback para os arquivos duplicados antigos com nome completo.
      assetUrl(`/assets/img/fab-heroes/${encoded}.webp`),
      assetUrl(`/assets/img/fab-heroes/${encoded}.png`)
    ];

    return Array.from(new Set(candidates.filter(Boolean)));
  }

  function cleanHeroName(value) {
    return String(value || "")
      .replace(/^Armory\s+Deck\s*[–—-]\s*/i, "")
      .replace(/\s+Edit\s+card\s*$/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function shortHeroName(value) {
    const clean = canonicalHeroName(value);
    if (!clean) return "Herói";
    const parts = clean.split(",").map(part => part.trim()).filter(Boolean);
    if (/^Arakni$/i.test(parts[0] || "") && parts[1]) return parts[1];
    return parts[0] || clean;
  }

  function fullHeroName(value) {
    return canonicalHeroName(value) || "Herói não informado";
  }

  function heroInitials(value) {
    const words = shortHeroName(value).split(/\s+/).filter(Boolean);
    return words.slice(0, 2).map(word => word[0]).join("").toUpperCase() || "?";
  }

  function recordRoundCount(record) {
    const text = String(record || "").trim();
    const match = text.match(/^(\d+)\s*[-–xX]\s*(\d+)/);
    return match ? Number(match[1]) + Number(match[2]) : 0;
  }

  function roundsFromResults(results, explicitRounds) {
    const explicit = Number(explicitRounds);
    if (Number.isFinite(explicit) && explicit > 0) return explicit;
    return Math.max(...results.map(result => recordRoundCount(result.record || result.campanha || result.score)), 0);
  }

  function uniqueHeroes(results) {
    const map = new Map();
    results.forEach(result => {
      const rawHero = canonicalHeroName(getHero(result));
      if (!rawHero) return;
      const key = rawHero.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name: rawHero,
          shortName: fullHeroName(rawHero),
          icon: result.hero_icon || result.heroIcon || result.icon || ""
        });
      }
    });
    return Array.from(map.values());
  }

  function iconImage(src, className, alt = "") {
    return `<img class="${className}" src="${src}" alt="${escapeHtml(alt)}" loading="lazy">`;
  }

  function splitPokemonValue(value) {
    if (Array.isArray(value)) {
      return value.flatMap(item => splitPokemonValue(item));
    }

    if (value && typeof value === "object") {
      return [value];
    }

    return String(value || "")
      .split(/\s*\/\s*|\s*,\s*|\s*\+\s*|\s*&\s*/)
      .map(name => name.trim())
      .filter(Boolean);
  }

  function getFirstDefined(...values) {
    return values.find(value => {
      if (Array.isArray(value)) return value.length;
      if (value && typeof value === "object") return Object.keys(value).length;
      return String(value || "").trim();
    });
  }

  function pokemonEntryDisplayName(entry) {
    if (entry && typeof entry === "object") {
      return getFirstDefined(entry.label, entry.display, entry.display_name, entry.displayName, entry.name, entry.pokemon, entry.hero) || "";
    }

    return String(entry || "").trim();
  }

  function pokemonEntryLookupName(entry) {
    if (entry && typeof entry === "object") {
      return getFirstDefined(
        entry.api,
        entry.api_name,
        entry.apiName,
        entry.sprite,
        entry.sprite_name,
        entry.spriteName,
        entry.slug,
        entry.lookup,
        entry.lookup_name,
        entry.lookupName,
        entry.name,
        entry.pokemon,
        entry.hero
      ) || "";
    }

    return String(entry || "").trim();
  }

  function pokemonEntriesFromSource(source) {
    if (source && typeof source === "object" && !Array.isArray(source)) {
      const value = getFirstDefined(
        source.pokemon,
        source.pokemons,
        source.pokemon_names,
        source.pokemonNames,
        source.pokemon_label,
        source.pokemonLabel,
        source.hero,
        source.deck,
        source.deque
      );
      return splitPokemonValue(value).slice(0, 3);
    }

    return splitPokemonValue(source).slice(0, 3);
  }

  function pokemonLookupEntriesFromSource(source, displayEntries = []) {
    if (source && typeof source === "object" && !Array.isArray(source)) {
      const explicit = getFirstDefined(
        source.pokemon_api,
        source.pokemonApi,
        source.pokemon_sprites,
        source.pokemonSprites,
        source.pokemon_slugs,
        source.pokemonSlugs,
        source.sprite_names,
        source.spriteNames,
        source.sprite_slugs,
        source.spriteSlugs
      );

      const explicitEntries = splitPokemonValue(explicit);
      if (explicitEntries.length) {
        return explicitEntries.slice(0, 3).map(pokemonEntryLookupName);
      }
    }

    return displayEntries.map(entry => pokemonEntryLookupName(entry));
  }

  function pokemonTitleCase(value) {
    return String(value || "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean)
      .map(word => {
        const lower = word.toLowerCase();
        if (["ex", "gx", "v", "vmax", "vstar", "x", "y"].includes(lower)) return lower.toUpperCase();
        if (lower === "mr") return "Mr.";
        if (lower === "mime") return "Mime";
        if (lower === "nidoran-f") return "Nidoran♀";
        if (lower === "nidoran-m") return "Nidoran♂";
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ");
  }

  function formatPokemonCardName(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";

    const normalized = raw
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const startsWithMega = normalized.match(/^mega\s+(.+?)(?:\s+(x|y))?(?:\s+ex)?$/i);
    if (startsWithMega) {
      const base = pokemonTitleCase(startsWithMega[1]);
      const variant = startsWithMega[2] ? ` ${startsWithMega[2].toUpperCase()}` : "";
      const suffix = /\bex\b$/i.test(normalized) ? " EX" : "";
      return `Mega ${base}${variant}${suffix}`;
    }

    const endsWithMega = normalized.match(/^(.+?)\s+mega(?:\s+(x|y))?(?:\s+ex)?$/i);
    if (endsWithMega) {
      const base = pokemonTitleCase(endsWithMega[1]);
      const variant = endsWithMega[2] ? ` ${endsWithMega[2].toUpperCase()}` : "";
      return `Mega ${base}${variant} EX`;
    }

    return pokemonTitleCase(normalized);
  }

  function pokemonDisplayNamesFromSource(source) {
    return pokemonEntriesFromSource(source)
      .map(entry => formatPokemonCardName(pokemonEntryDisplayName(entry)))
      .filter(Boolean);
  }

  function pokemonDisplayLabel(source) {
    const names = pokemonDisplayNamesFromSource(source);
    return names.length ? names.join(" / ") : (getHero(source) || String(source || "") || "Deck Pokémon");
  }

  function pokemonLookupName(value) {
    let text = String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[♀]/g, " nidoran f ")
      .replace(/[♂]/g, " nidoran m ")
      .replace(/[’'.:]/g, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    text = text
      .replace(/\b(pokemon|pokémon)\b/g, "")
      .replace(/\b(tag team|v union|vunion|ex|gx|vmax|vstar|v|break|prime|radiant|shiny)\b/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const startsWithMega = text.match(/^mega\s+(.+?)(?:\s+(x|y))?$/i);
    if (startsWithMega) {
      const base = startsWithMega[1].trim();
      const variant = startsWithMega[2] ? `-${startsWithMega[2].toLowerCase()}` : "";
      return `${base}-mega${variant}`;
    }

    const endsWithMega = text.match(/^(.+?)\s+mega(?:\s+(x|y))?$/i);
    if (endsWithMega) {
      const base = endsWithMega[1].trim();
      const variant = endsWithMega[2] ? `-${endsWithMega[2].toLowerCase()}` : "";
      return `${base}-mega${variant}`;
    }

    return text;
  }

  function normalizePokemonSlug(value) {
    return pokemonLookupName(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[♀]/g, "-f")
      .replace(/[♂]/g, "-m")
      .replace(/['’.:]/g, "")
      .replace(/\s*\([^)]*\)\s*/g, " ")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-");
  }

  function pokemonNamesFromHero(hero) {
    return pokemonDisplayNamesFromSource(hero);
  }

  const pokemonSpriteFallbackCache = new Map();

  function pokemonSpriteUrl(name) {
    const slug = normalizePokemonSlug(name);
    if (!slug) return "";
    return `https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular/${encodeURIComponent(slug)}.png`;
  }

  async function fetchPokemonFallbackSprite(slug) {
    const cleanSlug = normalizePokemonSlug(slug);
    if (!cleanSlug) return "";

    if (pokemonSpriteFallbackCache.has(cleanSlug)) {
      return pokemonSpriteFallbackCache.get(cleanSlug);
    }

    const request = fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(cleanSlug)}`)
      .then(response => response.ok ? response.json() : null)
      .then(data => data?.sprites?.front_default || "")
      .catch(() => "");

    pokemonSpriteFallbackCache.set(cleanSlug, request);
    return request;
  }

  function removeBrokenPokemonImage(img) {
    if (!img) return;
    const badge = img.closest?.(".armory-hero-badge");
    if (badge) badge.classList.remove("has-image");
    img.remove();
  }

  window.CCMCommunityPokemonFallback = async function CCMCommunityPokemonFallback(img) {
    if (!img || img.dataset.pokeapiFallbackTried === "true") {
      removeBrokenPokemonImage(img);
      return;
    }

    img.dataset.pokeapiFallbackTried = "true";
    img.removeAttribute("onerror");

    const slug = img.dataset.pokemonSlug || img.dataset.pokemonApi || img.dataset.pokemonName || img.alt || "";
    const fallbackSrc = await fetchPokemonFallbackSprite(slug);

    if (!fallbackSrc) {
      removeBrokenPokemonImage(img);
      return;
    }

    img.addEventListener("error", () => removeBrokenPokemonImage(img), { once: true });
    img.src = fallbackSrc;
  };

  function pokemonSpriteImg(name, className = "", altName = "") {
    const src = pokemonSpriteUrl(name);
    const slug = normalizePokemonSlug(name);
    const alt = altName || formatPokemonCardName(name) || name;
    if (!src || !slug) return "";

    const classAttr = className ? ` class="${escapeHtml(className)}"` : "";
    return `<img${classAttr} src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" data-pokemon-name="${escapeHtml(alt)}" data-pokemon-api="${escapeHtml(name)}" data-pokemon-slug="${escapeHtml(slug)}" onerror="window.CCMCommunityPokemonFallback&&window.CCMCommunityPokemonFallback(this)">`;
  }

  function pokemonSpriteStack(source) {
    const entries = pokemonEntriesFromSource(source);
    if (entries.length < 2) return "";

    const lookupNames = pokemonLookupEntriesFromSource(source, entries);
    const icons = entries.slice(0, 2).map((entry, index) => {
      const display = formatPokemonCardName(pokemonEntryDisplayName(entry));
      const lookup = lookupNames[index] || pokemonEntryLookupName(entry) || display;
      return pokemonSpriteImg(lookup, "league-pokemon-sprite", display);
    }).join("");

    return icons ? `<span class="league-pokemon-sprites" aria-label="Pokémon do deck">${icons}</span>` : "";
  }

  function pokemonBadge(source, size = "normal") {
    const entries = pokemonEntriesFromSource(source);
    const lookupNames = pokemonLookupEntriesFromSource(source, entries);
    const label = pokemonDisplayLabel(source);
    const firstLookup = entries.length ? (lookupNames[0] || pokemonEntryLookupName(entries[0]) || pokemonEntryDisplayName(entries[0])) : "";
    const firstSprite = firstLookup ? pokemonSpriteImg(firstLookup, "", formatPokemonCardName(pokemonEntryDisplayName(entries[0]))) : "";
    const initials = `<span class="armory-hero-initials">${escapeHtml(heroInitials(label))}</span>`;

    return `
      <span class="armory-hero-badge armory-hero-badge-${size} league-pokemon-badge${firstSprite ? " has-image" : ""}" title="${escapeHtml(label)}">
        ${firstSprite}
        ${initials}
      </span>
    `;
  }

  function uniquePokemonDecks(results) {
    const map = new Map();
    results.forEach(result => {
      const label = pokemonDisplayLabel(result);
      if (!label) return;
      const key = label.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { name: label, shortName: label, source: result });
      }
    });
    return Array.from(map.values());
  }

  function heroBadge(hero, icon = "", size = "normal") {
    const clean = canonicalHeroName(hero);
    const label = clean || "Herói não informado";
    const candidates = heroAssetCandidates(clean, icon);
    const firstImage = candidates[0] || "";
    const fallbacks = candidates.slice(1);
    const initials = `<span class="armory-hero-initials">${escapeHtml(heroInitials(label))}</span>`;
    const image = firstImage
      ? `<img src="${escapeHtml(firstImage)}" alt="${escapeHtml(label)}" loading="lazy" data-fallbacks="${escapeHtml(JSON.stringify(fallbacks))}">`
      : "";

    return `
      <span class="armory-hero-badge armory-hero-badge-${size}${image ? " has-image" : ""}" data-hero-name="${escapeHtml(clean)}" title="${escapeHtml(label)}">
        ${image}
        ${initials}
      </span>
    `;
  }

  function initArmoryHeroBadges(scope = document) {
    scope.querySelectorAll(".armory-hero-badge img[data-fallbacks]").forEach(img => {
      if (img.dataset.bound === "true") return;
      img.dataset.bound = "true";

      img.addEventListener("error", () => {
        let fallbacks = [];
        try {
          fallbacks = JSON.parse(img.dataset.fallbacks || "[]");
        } catch (error) {
          fallbacks = [];
        }

        const next = fallbacks.shift();
        if (next) {
          img.dataset.fallbacks = JSON.stringify(fallbacks);
          img.src = next;
          return;
        }

        const badge = img.closest(".armory-hero-badge");
        if (badge) badge.classList.remove("has-image");
        img.remove();
      });
    });
  }

  function renderLatestArmory(items) {
    const target = document.querySelector("#latest-armory-card");
    if (!target) return;
    const latest = items[0];
    if (!latest) return;

    const results = Array.isArray(latest.results) ? latest.results : [];
    const displayDate = latest.event_date || latest.date;
    const playerCount = new Set(results.map(getPlayer).filter(Boolean)).size || results.length;
    const rounds = roundsFromResults(results, latest.rounds);
    const game = latest.game || "Flesh and Blood";
    const nextArmory = latest.next_armory || latest.nextArmory || "Quarta • 19:00";
    const heroes = uniqueHeroes(results);

    const rows = results.slice(0, 12).map((result, index) => {
      const player = getPlayer(result) || "Jogador";
      const hero = fullHeroName(getHero(result));
      const heroName = hero;
      const record = result.record || result.campanha || result.score || "";
      const heroIcon = result.hero_icon || result.heroIcon || result.icon || "";
      const placement = index + 1;
      const placementIcon = index === 0 ? armoryIcons.depth.champion : armoryIcons.depth.placement;
      return `
        <li class="armory-result-row${index === 0 ? " is-champion" : ""}">
          <span class="armory-rank-badge armory-rank-${placement}" aria-label="${placement}º colocado">
            ${iconImage(placementIcon, "armory-rank-icon", "")}
            <strong>${placement}º</strong>
          </span>
          <div class="armory-player-cell">
            ${heroBadge(hero, heroIcon, index === 0 ? "featured" : "normal")}
            <div>
              <strong>${escapeHtml(player)}</strong>
              <small>${escapeHtml(heroName)}</small>
            </div>
          </div>
          <span class="armory-hero-name" title="${escapeHtml(heroName)}">${escapeHtml(heroName)}</span>
          <span class="armory-record">${iconImage(armoryIcons.depth.trophy, "armory-record-icon", "")}${escapeHtml(record || "-")}</span>
        </li>
      `;
    }).join("");

    const statItems = [
      { icon: armoryIcons.flat.people, label: "Jogadores", value: playerCount || "-" },
      { icon: armoryIcons.flat.swords, label: "Rodadas", value: rounds || "-" },
      { icon: armoryIcons.flat.cards, label: "Jogo", value: game },
      { icon: armoryIcons.flat.calendar, label: "Próximo Armory", value: nextArmory }
    ].map(item => `
      <div class="armory-stat-item">
        ${iconImage(item.icon, "armory-stat-icon", "")}
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>
    `).join("");

    const heroList = heroes.map(hero => `
      <li>
        ${heroBadge(hero.name, hero.icon, "mini")}
        <span title="${escapeHtml(hero.name)}">${escapeHtml(hero.shortName)}</span>
      </li>
    `).join("");

    target.innerHTML = `
      <div class="armory-board-glow" aria-hidden="true"></div>
      <div class="armory-board-heading">
        <div class="armory-event-badge">${iconImage(armoryIcons.depth.badge, "armory-event-badge-img", "")}</div>
        <div>
          <p class="eyebrow">Último Armory</p>
          <h3>${escapeHtml(latest.title || "Resultado Armory")}</h3>
          <p>${dateLabel(displayDate)}${latest.summary ? " • " + escapeHtml(latest.summary) : ""}</p>
        </div>
      </div>

      <div class="armory-board-layout">
        <div class="armory-results-panel">
          ${rows ? `<ol class="latest-armory-podium armory-results-list">${rows}</ol>` : `<p class="empty-section">Resultado sem lista de jogadores.</p>`}
        </div>

        <aside class="armory-board-sidebar" aria-label="Resumo do Armory">
          <div class="armory-stat-panel">${statItems}</div>
          <div class="armory-heroes-panel">
            <div class="armory-panel-title"><span></span><strong>Heróis do evento</strong><span></span></div>
            ${heroList ? `<ul>${heroList}</ul>` : `<p class="empty-section">Nenhum herói informado.</p>`}
          </div>
        </aside>
      </div>

      <div class="armory-board-actions">
        ${latest.url ? `<a class="btn armory-btn-primary" href="${latest.url}">${iconImage(armoryIcons.depth.trophy, "armory-btn-icon", "")}Ver resultado completo</a>` : ""}
        <a class="btn armory-btn-secondary" href="#armory-historico">Ver histórico</a>
      </div>
    `;

    initArmoryHeroBadges(target);
  }

  function renderLeagueCard(selector, latest, options = {}) {
    const target = document.querySelector(selector);
    if (!target || !latest) return;

    const results = Array.isArray(latest.results) ? latest.results : [];
    const displayDate = latest.event_date || latest.date;
    const playerCount = new Set(results.map(getPlayer).filter(Boolean)).size || results.length;
    const rounds = roundsFromResults(results, latest.rounds);
    const game = latest.game || (options.variant === "pokemon" ? "Pokemon" : "Flesh and Blood");
    const nextLeague = latest.next_league || latest.next_liga || latest.nextLeague || "Domingo • 13:30";
    const isPokemon = options.variant === "pokemon" || isPokemonGame(game);
    const heroes = isPokemon ? uniquePokemonDecks(results) : uniqueHeroes(results);
    const eyebrow = isPokemon ? "Última Liga de Pokémon" : "Última Liga de Flesh and Blood";
    const sideTitle = isPokemon ? "Pokémon da liga" : "Heróis da liga";

    const rows = results.slice(0, 12).map((result, index) => {
      const player = getPlayer(result) || "Jogador";
      const hero = fullHeroName(getHero(result));
      const pokemonLabel = isPokemon ? pokemonDisplayLabel(result) : "";
      const heroName = isPokemon ? pokemonLabel : hero;
      const record = result.record || result.campanha || result.score || "";
      const heroIcon = result.hero_icon || result.heroIcon || result.icon || "";
      const placement = index + 1;
      const placementIcon = index === 0 ? armoryIcons.depth.champion : armoryIcons.depth.placement;
      const badgeMarkup = isPokemon ? pokemonSpriteStack(result) : heroBadge(hero, heroIcon, index === 0 ? "featured" : "normal");
      return `
        <li class="armory-result-row${index === 0 ? " is-champion" : ""}${isPokemon ? " is-pokemon-row" : ""}">
          <span class="armory-rank-badge armory-rank-${placement}" aria-label="${placement}º colocado">
            ${iconImage(placementIcon, "armory-rank-icon", "")}
            <strong>${placement}º</strong>
          </span>
          <div class="armory-player-cell">
            ${badgeMarkup}
            <div class="armory-player-meta">
              <div class="armory-player-name-line">
                <strong>${escapeHtml(player)}</strong>
              </div>
              <small>${escapeHtml(heroName)}</small>
            </div>
          </div>
          <span class="armory-hero-name" title="${escapeHtml(heroName)}">${escapeHtml(heroName)}</span>
          <span class="armory-record">${iconImage(armoryIcons.depth.trophy, "armory-record-icon", "")}${escapeHtml(record || "-")}</span>
        </li>
      `;
    }).join("");

    const statItems = [
      { icon: armoryIcons.flat.people, label: "Jogadores", value: playerCount || "-" },
      { icon: armoryIcons.flat.swords, label: "Rodadas", value: rounds || "-" },
      { icon: armoryIcons.flat.cards, label: "Jogo", value: game },
      { icon: armoryIcons.flat.calendar, label: "Próxima Liga", value: nextLeague }
    ].map(item => `
      <div class="armory-stat-item">
        ${iconImage(item.icon, "armory-stat-icon", "")}
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>
    `).join("");

    const heroList = heroes.map(hero => `
      <li>
        ${isPokemon ? pokemonBadge(hero.source || hero.name, "mini") : heroBadge(hero.name, hero.icon, "mini")}
        <span title="${escapeHtml(hero.name)}">${escapeHtml(hero.shortName)}</span>
      </li>
    `).join("");

    target.innerHTML = `
      <div class="armory-board-glow" aria-hidden="true"></div>
      <div class="armory-board-heading">
        <div class="armory-event-badge league-event-badge">${iconImage(armoryIcons.depth.leagueBadge, "armory-event-badge-img", "")}</div>
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h3>${escapeHtml(latest.title || "Resultado da Liga")}</h3>
          <p>${dateLabel(displayDate)}${latest.summary ? " • " + escapeHtml(latest.summary) : ""}</p>
        </div>
      </div>

      <div class="armory-board-layout">
        <div class="armory-results-panel">
          ${rows ? `<ol class="latest-armory-podium armory-results-list">${rows}</ol>` : `<p class="empty-section">Resultado sem lista de jogadores.</p>`}
        </div>

        <aside class="armory-board-sidebar" aria-label="Resumo da Liga">
          <div class="armory-stat-panel">${statItems}</div>
          <div class="armory-heroes-panel">
            <div class="armory-panel-title"><span></span><strong>${escapeHtml(sideTitle)}</strong><span></span></div>
            ${heroList ? `<ul>${heroList}</ul>` : `<p class="empty-section">Nenhum herói informado.</p>`}
          </div>
        </aside>
      </div>

      <div class="armory-board-actions">
        ${latest.url ? `<a class="btn armory-btn-primary" href="${latest.url}">${iconImage(armoryIcons.depth.trophy, "armory-btn-icon", "")}Ver resultado completo</a>` : ""}
        <a class="btn armory-btn-secondary" href="#resultados-ligas">Ver resultados anteriores</a>
      </div>
    `;

    initArmoryHeroBadges(target);
  }

  function renderArmoryStats() {
    const allArmories = parseArmoryData();
    const allLeagues = parseLeagueData();

    document.querySelectorAll("#armory-player-month, #armory-hero-month").forEach(el => {
      el.textContent = monthLabel();
    });

    const pokemonLeagues = allLeagues.filter(item => isPokemonGame(item.game));
    const fabLeagues = allLeagues.filter(item => isFleshAndBloodGame(item.game) || !isPokemonGame(item.game));

    renderLeagueCard("#latest-league-fab-card", fabLeagues[0], { variant: "fab" });
    renderLeagueCard("#latest-league-pokemon-card", pokemonLeagues[0], { variant: "pokemon" });

    if (!allArmories.length) return;

    renderLatestArmory(allArmories);

    const monthItems = currentMonthItems(allArmories);
    const monthResults = flattenResults(monthItems);
    const byPlayer = sumBy(monthResults, "player");
    const byHero = sumBy(monthResults, "hero");

    makePie(
      document.querySelector("#armory-player-chart"),
      document.querySelector("#armory-player-legend"),
      byPlayer
    );

    makePie(
      document.querySelector("#armory-hero-chart"),
      document.querySelector("#armory-hero-legend"),
      byHero
    );

    const summary = document.querySelector("#armory-month-summary");
    if (summary) {
      const totalPlayers = new Set(monthResults.map(getPlayer).filter(Boolean)).size;
      const totalHeroes = new Set(monthResults.map(getHero).filter(Boolean)).size;
      const totalWins = monthResults.reduce((sum, result) => sum + resultPoints(result), 0);
      summary.innerHTML = monthResults.length ? `
        <div><strong>${monthItems.length}</strong><span>Armory no mês</span></div>
        <div><strong>${totalPlayers}</strong><span>jogadores únicos</span></div>
        <div><strong>${totalHeroes}</strong><span>heróis usados</span></div>
        <div><strong>${totalWins}</strong><span>vitórias registradas</span></div>
      ` : "Sem dados no mês vigente.";
    }

    const history = document.querySelector("#armory-history-list");
    if (history) {
      history.innerHTML = allArmories.slice(0, 12).map(item => `
        <a href="${item.url || "#"}">
          <strong>${escapeHtml(item.title || "Armory")}</strong>
          <span>${dateLabel(item.date)}</span>
        </a>
      `).join("");
    }
  }

  function initCommunityPagination() {
    const items = Array.from(document.querySelectorAll("[data-community-feed-item]"));
    const filters = Array.from(document.querySelectorAll("[data-community-filter]"));
    const pageSizeSelect = document.querySelector("#community-page-size");
    const pagination = document.querySelector("#community-pagination");
    const prev = document.querySelector("[data-community-prev]");
    const next = document.querySelector("[data-community-next]");
    const info = document.querySelector("[data-community-page-info]");

    if (!items.length || !pageSizeSelect || !pagination) return;

    let currentFilter = "all";
    let currentPage = 1;

    function filteredItems() {
      return items.filter(item => currentFilter === "all" || item.dataset.communityCategory === currentFilter);
    }

    function render() {
      const perPage = Number(pageSizeSelect.value || 10);
      const filtered = filteredItems();
      const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
      currentPage = Math.min(currentPage, totalPages);
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;

      items.forEach(item => { item.hidden = true; });
      filtered.slice(start, end).forEach(item => { item.hidden = false; });

      pagination.hidden = filtered.length <= perPage;
      if (info) info.textContent = `Página ${currentPage} de ${totalPages}`;
      if (prev) prev.disabled = currentPage <= 1;
      if (next) next.disabled = currentPage >= totalPages;
    }

    filters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        currentFilter = filter.dataset.communityFilter || "all";
        currentPage = 1;
        filters.forEach(item => item.classList.toggle("is-active", item === filter));
        render();
      });
    });

    pageSizeSelect.addEventListener("change", () => {
      currentPage = 1;
      render();
    });

    if (prev) prev.addEventListener("click", () => {
      currentPage = Math.max(1, currentPage - 1);
      render();
    });

    if (next) next.addEventListener("click", () => {
      currentPage += 1;
      render();
    });

    render();
  }

  function initPagedFeedPagination(options) {
    const {
      items,
      pagination,
      pageSizeSelect,
      info,
      prev,
      next,
      getFilteredItems,
      onRender
    } = options;

    if (!items.length || typeof getFilteredItems !== "function") return null;

    let currentPage = 1;

    function getPerPage() {
      const selected = pageSizeSelect ? parseInt(pageSizeSelect.value, 10) : 12;
      return Number.isFinite(selected) && selected > 0 ? selected : 12;
    }

    function render() {
      const perPage = getPerPage();
      const filtered = getFilteredItems();
      const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

      currentPage = Math.min(Math.max(1, currentPage), totalPages);

      const start = (currentPage - 1) * perPage;
      const end = start + perPage;

      items.forEach(item => { item.hidden = true; });
      filtered.slice(start, end).forEach(item => { item.hidden = false; });

      if (pagination) pagination.hidden = filtered.length <= perPage;
      if (info) info.textContent = `Página ${currentPage} de ${totalPages}`;
      if (prev) prev.disabled = currentPage <= 1;
      if (next) next.disabled = currentPage >= totalPages;
      if (typeof onRender === "function") onRender(filtered.length, currentPage, totalPages);
    }

    if (pageSizeSelect) {
      pageSizeSelect.addEventListener("change", () => {
        currentPage = 1;
        render();
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        currentPage = Math.max(1, currentPage - 1);
        render();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        currentPage += 1;
        render();
      });
    }

    return {
      render,
      reset() {
        currentPage = 1;
        render();
      }
    };
  }

  function initBlogFilter() {
    const items = Array.from(document.querySelectorAll("[data-blog-feed-item]"));
    const filters = Array.from(document.querySelectorAll("[data-blog-filter]"));
    const emptyState = document.querySelector("[data-blog-empty]");
    if (!items.length || !filters.length) return;

    const pagination = document.querySelector("#blog-pagination");
    const pageSizeSelect = document.querySelector("[data-blog-page-size]");
    const info = document.querySelector("[data-blog-page-info]");
    const prev = document.querySelector("[data-blog-prev]");
    const next = document.querySelector("[data-blog-next]");
    let currentFilter = "all";

    function filteredItems() {
      return items.filter(item => currentFilter === "all" || item.dataset.blogCategory === currentFilter);
    }

    function setActiveFilters() {
      filters.forEach(filter => {
        const isActive = (filter.dataset.blogFilter || "all") === currentFilter;
        filter.classList.toggle("is-active", isActive);
        if (isActive) {
          filter.setAttribute("aria-current", "true");
        } else {
          filter.removeAttribute("aria-current");
        }
      });
    }

    const pager = initPagedFeedPagination({
      items,
      pagination,
      pageSizeSelect,
      info,
      prev,
      next,
      getFilteredItems: filteredItems,
      onRender(visibleCount) {
        if (emptyState) emptyState.hidden = visibleCount !== 0;
      }
    });

    function applyFilter(updateHash = true) {
      setActiveFilters();
      if (updateHash) {
        history.replaceState(null, "", `#${currentFilter === "all" ? "todos" : currentFilter}`);
      }
      if (pager) pager.reset();
    }

    function activateFromHash() {
      const hash = window.location.hash.replace("#", "").trim();
      const hashFilter = filters.find(filter => (filter.dataset.blogFilter || "all") === hash);
      currentFilter = hashFilter ? (hashFilter.dataset.blogFilter || "all") : "all";
      applyFilter(false);
    }

    filters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        currentFilter = filter.dataset.blogFilter || "all";
        applyFilter(true);
      });
    });

    activateFromHash();
    window.addEventListener("hashchange", activateFromHash);
  }


  function initGuideFilter() {
    const items = Array.from(document.querySelectorAll("[data-guide-feed-item]"));
    const gameFilters = Array.from(document.querySelectorAll("[data-guide-game-filter]"));
    const topicFilters = Array.from(document.querySelectorAll("[data-guide-topic-filter]"));
    const emptyState = document.querySelector("[data-guide-empty]");
    if (!items.length || (!gameFilters.length && !topicFilters.length)) return;

    const pagination = document.querySelector("#guide-pagination");
    const pageSizeSelect = document.querySelector("[data-guide-page-size]");
    const info = document.querySelector("[data-guide-page-info]");
    const prev = document.querySelector("[data-guide-prev]");
    const next = document.querySelector("[data-guide-next]");
    let activeGame = "all";
    let activeTopic = "all";

    function setActive(filters, activeValue, datasetKey) {
      filters.forEach(filter => {
        const value = filter.dataset[datasetKey] || "all";
        const isActive = value === activeValue;
        filter.classList.toggle("is-active", isActive);
        if (isActive) {
          filter.setAttribute("aria-current", "true");
        } else {
          filter.removeAttribute("aria-current");
        }
      });
    }

    function filteredItems() {
      return items.filter(item => {
        const matchesGame = activeGame === "all" || item.dataset.guideGame === activeGame;
        const matchesTopic = activeTopic === "all" || item.dataset.guideTopic === activeTopic;
        return matchesGame && matchesTopic;
      });
    }

    const pager = initPagedFeedPagination({
      items,
      pagination,
      pageSizeSelect,
      info,
      prev,
      next,
      getFilteredItems: filteredItems,
      onRender(visibleCount) {
        if (emptyState) emptyState.hidden = visibleCount !== 0;
      }
    });

    function applyFilters(updateHash = true) {
      setActive(gameFilters, activeGame, "guideGameFilter");
      setActive(topicFilters, activeTopic, "guideTopicFilter");

      if (updateHash) {
        const hash = activeGame !== "all" ? activeGame : activeTopic !== "all" ? activeTopic : "todos";
        history.replaceState(null, "", `#${hash}`);
      }

      if (pager) pager.reset();
    }

    function activateFromHash() {
      const hash = window.location.hash.replace("#", "").trim();
      activeGame = "all";
      activeTopic = "all";
      if (hash) {
        const gameMatch = gameFilters.find(filter => (filter.dataset.guideGameFilter || "") === hash);
        const topicMatch = topicFilters.find(filter => (filter.dataset.guideTopicFilter || "") === hash);

        if (gameMatch) {
          activeGame = gameMatch.dataset.guideGameFilter || "all";
        }

        if (topicMatch) {
          activeTopic = topicMatch.dataset.guideTopicFilter || "all";
        }
      }

      applyFilters(false);
    }

    gameFilters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        activeGame = filter.dataset.guideGameFilter || "all";
        applyFilters(true);
      });
    });

    topicFilters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        activeTopic = filter.dataset.guideTopicFilter || "all";
        applyFilters(true);
      });
    });

    activateFromHash();
    window.addEventListener("hashchange", activateFromHash);
  }

  function initDeckFilter() {
    const items = Array.from(document.querySelectorAll("[data-deck-feed-item]"));
    const gameFilters = Array.from(document.querySelectorAll("[data-deck-game-filter]"));
    const formatFilters = Array.from(document.querySelectorAll("[data-deck-format-filter], [data-deck-filter]"));
    const emptyState = document.querySelector("[data-deck-empty]");
    if (!items.length || (!gameFilters.length && !formatFilters.length)) return;

    const pagination = document.querySelector("#deck-pagination");
    const pageSizeSelect = document.querySelector("[data-deck-page-size]");
    const info = document.querySelector("[data-deck-page-info]");
    const prev = document.querySelector("[data-deck-prev]");
    const next = document.querySelector("[data-deck-next]");
    let activeGame = "all";
    let activeFormat = "all";

    function setActive(filters, activeValue, datasetKey) {
      filters.forEach(filter => {
        const value = filter.dataset[datasetKey] || filter.dataset.deckFilter || "all";
        const isActive = value === activeValue;
        filter.classList.toggle("is-active", isActive);
        if (isActive) {
          filter.setAttribute("aria-current", "true");
        } else {
          filter.removeAttribute("aria-current");
        }
      });
    }

    function filteredItems() {
      return items.filter(item => {
        const matchesGame = activeGame === "all" || item.dataset.deckGame === activeGame;
        const matchesFormat = activeFormat === "all" || item.dataset.deckFormat === activeFormat;
        return matchesGame && matchesFormat;
      });
    }

    const pager = initPagedFeedPagination({
      items,
      pagination,
      pageSizeSelect,
      info,
      prev,
      next,
      getFilteredItems: filteredItems,
      onRender(visibleCount) {
        if (emptyState) emptyState.hidden = visibleCount !== 0;
      }
    });

    function applyFilters(updateHash = true) {
      setActive(gameFilters, activeGame, "deckGameFilter");
      setActive(formatFilters, activeFormat, "deckFormatFilter");

      if (updateHash) {
        const hash = activeGame !== "all" ? activeGame : activeFormat !== "all" ? activeFormat : "todos";
        history.replaceState(null, "", `#${hash}`);
      }

      if (pager) pager.reset();
    }

    function activateFromHash() {
      const hash = window.location.hash.replace("#", "").trim();
      activeGame = "all";
      activeFormat = "all";
      if (hash) {
        const gameMatch = gameFilters.find(filter => (filter.dataset.deckGameFilter || "") === hash);
        const formatMatch = formatFilters.find(filter => ((filter.dataset.deckFormatFilter || filter.dataset.deckFilter || "") === hash));

        if (gameMatch) {
          activeGame = gameMatch.dataset.deckGameFilter || "all";
        }

        if (formatMatch) {
          activeFormat = formatMatch.dataset.deckFormatFilter || formatMatch.dataset.deckFilter || "all";
        }
      }

      applyFilters(false);
    }

    gameFilters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        activeGame = filter.dataset.deckGameFilter || "all";
        applyFilters(true);
      });
    });

    formatFilters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        activeFormat = filter.dataset.deckFormatFilter || filter.dataset.deckFilter || "all";
        applyFilters(true);
      });
    });

    activateFromHash();
    window.addEventListener("hashchange", activateFromHash);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initBlogFilter();
      initGuideFilter();
      initDeckFilter();
      initCommunityPagination();
      renderArmoryStats();
    });
  } else {
    initBlogFilter();
    initGuideFilter();
    initDeckFilter();
    initCommunityPagination();
    renderArmoryStats();
  }
})();

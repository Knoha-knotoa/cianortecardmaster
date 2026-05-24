import { readFile, writeFile } from "node:fs/promises";

const JUSTTCG_API = "https://api.justtcg.com/v1";
const TCGCSV_API = "https://tcgcsv.com/tcgplayer";
const API_KEY = process.env.JUSTTCG_API_KEY;
const OUTPUT_PATH = "assets/data/spikes.json";

// O plano gratuito da JustTCG aceita até 20 cartas por chamada no endpoint /cards.
// Para exibir 9 cartas reais, buscamos páginas extras até completar o bloco.
const API_LIMIT = "20";
const DISPLAY_LIMIT = 9;
const MAX_PAGES_PER_GAME = Number(process.env.JUSTTCG_MAX_PAGES_PER_GAME || 5);

// Evita 429 no plano gratuito/básico. Dá para diminuir pelo secret/env JUSTTCG_WAIT_MS se seu plano permitir.
const REQUEST_WAIT_MS = Number(process.env.JUSTTCG_WAIT_MS || 8000);
const MAX_RETRIES = Number(process.env.JUSTTCG_MAX_RETRIES || 3);

// TCGCSV é usado apenas para Flesh and Blood, como referência de TCGplayer.
// A documentação do TCGCSV recomenda User-Agent próprio e limite de polling diário.
const TCGCSV_FAB_CATEGORY_FALLBACK = 62;
const TCGCSV_WAIT_MS = Number(process.env.TCGCSV_WAIT_MS || 180);
const TCGCSV_USER_AGENT = process.env.TCGCSV_USER_AGENT || "CianorteCardMasters/1.0 (+https://github.com/Knoha-knotoa/cianortecardmaster)";

// Imagens de Pokémon: a JustTCG nem sempre entrega URL de imagem.
// Enriquecemos o JSON estático com Pokémon TCG API e TCGdex como fallback.
const POKEMON_TCG_API = "https://api.pokemontcg.io/v2";
const TCGDEX_API = "https://api.tcgdex.net/v2/en";
const POKEMON_API_WAIT_MS = Number(process.env.POKEMON_API_WAIT_MS || 250);

const targets = [
  { code: "fab", label: "Flesh and Blood", match: /flesh\s*(and|&)\s*blood/i },
  { code: "mtg", label: "Magic: The Gathering", match: /magic/i },
  { code: "pokemon", label: "Pokémon TCG", match: /pok[eé]mon/i },
  { code: "yugioh", label: "Yu-Gi-Oh!", match: /yu-?gi-?oh/i }
];

const windows = [
  // A página de Spikes mostra apenas altas das últimas 24h.
  { key: "daily", orderBy: "24h", label: "24 horas", historyDuration: "7d", minPrice: "0.01" }
];

if (!API_KEY) {
  console.log("JUSTTCG_API_KEY não configurada. Mantendo assets/data/spikes.json atual.");
  process.exit(0);
}

let previousData = null;
let lastRequestAt = 0;
let lastTcgcsvRequestAt = 0;
let cachedFabCategoryId = null;
let cachedFabGroups = null;
let lastPokemonRequestAt = 0;
const tcgcsvGroupDataCache = new Map();
const pokemonImageCache = new Map();

async function loadPreviousData() {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function previousGameByCode(code) {
  return (previousData?.games || []).find(game => game.code === code) || null;
}

function previousWindow(code, windowKey) {
  const game = previousGameByCode(code);
  const items = game?.windows?.[windowKey];
  if (Array.isArray(items)) return items.slice(0, DISPLAY_LIMIT);

  // Compatibilidade com o primeiro formato, que só tinha game.items.
  if ((windowKey === "weekly" || windowKey === "daily") && Array.isArray(game?.items)) return game.items.slice(0, DISPLAY_LIMIT);
  return [];
}

function previousGameId(code) {
  const game = previousGameByCode(code);
  return game?.id || "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitBeforeRequest() {
  const elapsed = Date.now() - lastRequestAt;
  if (lastRequestAt && elapsed < REQUEST_WAIT_MS) {
    await sleep(REQUEST_WAIT_MS - elapsed);
  }
  lastRequestAt = Date.now();
}

async function waitBeforeTcgcsvRequest() {
  const elapsed = Date.now() - lastTcgcsvRequestAt;
  if (lastTcgcsvRequestAt && elapsed < TCGCSV_WAIT_MS) {
    await sleep(TCGCSV_WAIT_MS - elapsed);
  }
  lastTcgcsvRequestAt = Date.now();
}

async function waitBeforePokemonRequest() {
  const elapsed = Date.now() - lastPokemonRequestAt;
  if (lastPokemonRequestAt && elapsed < POKEMON_API_WAIT_MS) {
    await sleep(POKEMON_API_WAIT_MS - elapsed);
  }
  lastPokemonRequestAt = Date.now();
}

async function justtcg(path, options = {}) {
  const url = `${JUSTTCG_API}${path}`;
  const shouldThrottle = options.throttle !== false;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    if (shouldThrottle) await waitBeforeRequest();

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "accept": "application/json"
      }
    });

    if (response.ok) return response.json();

    const text = await response.text().catch(() => "");
    const retryAfter = Number(response.headers.get("retry-after"));

    if (response.status === 429 && attempt < MAX_RETRIES) {
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : REQUEST_WAIT_MS * attempt * 2;
      console.warn(`JustTCG 429. Aguardando ${Math.round(waitMs / 1000)}s antes de tentar novamente...`);
      await sleep(waitMs);
      continue;
    }

    throw new Error(`JustTCG ${response.status}: ${text}`);
  }

  throw new Error("JustTCG: número máximo de tentativas excedido.");
}

async function tcgcsv(path) {
  const url = `${TCGCSV_API}${path}`;
  await waitBeforeTcgcsvRequest();

  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "user-agent": TCGCSV_USER_AGENT
    }
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`TCGCSV ${response.status}: ${text}`);
  }

  return response.json();
}

async function pokemonJson(url) {
  await waitBeforePokemonRequest();

  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "user-agent": TCGCSV_USER_AGENT
    }
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Pokémon image API ${response.status}: ${text}`);
  }

  return response.json();
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const normalized = String(value).replace(/[%$,]/g, "").trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function roundMoney(value) {
  const n = numberOrNull(value);
  return n === null ? null : Math.round(n * 100) / 100;
}

function validImageUrl(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) return "";
  return trimmed;
}

function extractCards(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.cards)) return payload.data.cards;
  if (Array.isArray(payload?.data?.results)) return payload.data.results;
  if (Array.isArray(payload?.cards)) return payload.cards;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

function paginationInfo(payload) {
  return payload?.pagination || payload?.meta || payload?._metadata || payload?.data?.pagination || payload?.data?.meta || payload?.data?._metadata || {};
}

function firstNumber(...values) {
  for (const value of values) {
    const n = numberOrNull(value);
    if (n !== null) return n;
  }
  return null;
}

function historyChangePercent(history) {
  if (!Array.isArray(history) || history.length < 2) return null;
  const sorted = history
    .filter(point => Number(point.p) > 0)
    .sort((a, b) => Number(a.t) - Number(b.t));
  if (sorted.length < 2) return null;
  const first = sorted[0].p;
  const last = sorted[sorted.length - 1].p;
  if (!first || !last) return null;
  return Math.round(((last - first) / first) * 1000) / 10;
}

function firstImageUrl(...values) {
  for (const value of values) {
    if (!value) continue;

    if (typeof value === "string") {
      const url = validImageUrl(value);
      if (url) return url;
    }

    if (Array.isArray(value)) {
      const url = firstImageUrl(...value);
      if (url) return url;
    }

    if (typeof value === "object") {
      const preferred = [
        value.imageUrl, value.image_url, value.image, value.img, value.picture, value.photo,
        value.thumbnailUrl, value.thumbnail_url, value.thumbnail,
        value.small, value.normal, value.large, value.original, value.url, value.src,
        value.front, value.back
      ];
      const preferredUrl = firstImageUrl(...preferred);
      if (preferredUrl) return preferredUrl;
    }
  }

  return "";
}

function extractImageUrl(card, variant) {
  return firstImageUrl(
    variant?.imageUrl,
    variant?.image_url,
    variant?.image,
    variant?.images,
    variant?.cardImage,
    variant?.card_image,
    card?.imageUrl,
    card?.image_url,
    card?.image,
    card?.images,
    card?.cardImage,
    card?.card_image,
    card?.card_images,
    card?.thumbnail,
    card?.thumbnailUrl,
    card?.art
  );
}

function variantChange(variant, windowKey) {
  if (!variant) return null;
  const stats = variant.statistics || variant.stats || variant.priceStatistics || variant.price_stats || {};

  if (windowKey === "daily") {
    return firstNumber(
      variant.priceChange24hr, variant.priceChange24h, variant.priceChange1d,
      variant.change24hr, variant.change24h, variant.change1d,
      variant.priceChange24hrPercent, variant.priceChange24hPercent, variant.priceChange1dPercent,
      variant.priceChangePercent24h, variant.changePercent24h, variant.percentChange24h,
      variant.percentageChange24h, variant.price_change_24h, variant.price_change_24hr,
      stats.priceChange24hr, stats.priceChange24h, stats.change24h, stats.percentChange24h
    );
  }

  if (windowKey === "weekly") {
    return firstNumber(
      variant.priceChange7d, variant.change7d,
      variant.priceChange7dPercent, variant.priceChangePercent7d,
      variant.changePercent7d, variant.percentChange7d,
      variant.percentageChange7d, variant.price_change_7d,
      stats.priceChange7d, stats.change7d, stats.percentChange7d
    );
  }

  if (windowKey === "monthly") {
    return firstNumber(
      variant.priceChange30d, variant.change30d,
      variant.priceChange30dPercent, variant.priceChangePercent30d,
      variant.changePercent30d, variant.percentChange30d,
      variant.percentageChange30d, variant.price_change_30d,
      stats.priceChange30d, stats.change30d, stats.percentChange30d
    );
  }

  if (windowKey === "expensive") return numberOrNull(variant.price);
  return null;
}

function bestVariant(card, windowKey = "weekly") {
  const variants = Array.isArray(card.variants) && card.variants.length ? card.variants : [card];
  if (!variants.length) return null;

  return variants
    .slice()
    .sort((a, b) => {
      const ca = variantChange(a, windowKey) ?? 0;
      const cb = variantChange(b, windowKey) ?? 0;
      if (cb !== ca) return cb - ca;
      return Number(b.price ?? 0) - Number(a.price ?? 0);
    })[0];
}

function normalizeHistory(variant, windowKey) {
  const history =
    (windowKey === "monthly" || windowKey === "expensive"
      ? variant?.priceHistory30d || variant?.priceHistory90d || variant?.priceHistory
      : variant?.priceHistory) ||
    variant?.price_history ||
    variant?.priceHistory30d ||
    [];

  if (!Array.isArray(history)) return [];

  return history
    .map(point => ({
      t: Number(point.t || point.timestamp || point.date || 0),
      p: Number(point.p || point.price || point.value || 0)
    }))
    .filter(point => point.t && point.p > 0);
}

function cardToSpike(card, windowKey = "weekly") {
  const variant = bestVariant(card, windowKey);
  if (!variant) return null;

  const price = numberOrNull(variant.price ?? card.price ?? card.marketPrice ?? card.market_price) ?? 0;
  const history = normalizeHistory(variant, windowKey);
  const inferredChange = historyChangePercent(history);
  const change1d = variantChange(variant, "daily") ?? (windowKey === "daily" ? inferredChange : null);
  const change7d = variantChange(variant, "weekly") ?? (windowKey === "weekly" ? inferredChange : null);
  const change30d = variantChange(variant, "monthly") ?? (windowKey === "monthly" ? inferredChange : null);

  if (windowKey !== "expensive") {
    const selectedChange = windowKey === "daily" ? change1d : windowKey === "monthly" ? change30d : change7d;
    if (!Number.isFinite(selectedChange) || selectedChange <= 0) return null;
  }

  const imageUrl = extractImageUrl(card, variant);

  return {
    id: card.id || "",
    name: card.name || "Carta sem nome",
    set: card.set_name || card.set || card.setName || "",
    number: card.number || "",
    rarity: card.rarity || "",
    price,
    justtcgPrice: price,
    change1d,
    change7d,
    change30d,
    variant: [variant.printing, variant.condition].filter(Boolean).join(" / "),
    imageUrl,
    history,
    sources: {
      justtcg: {
        label: "JustTCG",
        price,
        variant: [variant.printing, variant.condition].filter(Boolean).join(" / "),
        imageUrl
      }
    }
  };
}

function resolveGameId(games, target) {
  const found = games.find(game => target.match.test(game.name || "") || target.match.test(game.id || ""));
  return found?.id || previousGameId(target.code) || null;
}

function sortWindowItems(items, windowKey) {
  return items.slice().sort((a, b) => {
    if (windowKey === "expensive") return Number(b.price ?? 0) - Number(a.price ?? 0);
    const getChange = item => windowKey === "daily" ? item.change1d : windowKey === "monthly" ? item.change30d : item.change7d;
    const diff = Number(getChange(b) ?? 0) - Number(getChange(a) ?? 0);
    if (diff !== 0) return diff;
    return Number(b.price ?? 0) - Number(a.price ?? 0);
  });
}

function payloadHasMore(payload, cardsLength) {
  const pagination = paginationInfo(payload);
  if (typeof pagination.hasMore === "boolean") return pagination.hasMore;
  if (typeof pagination.has_more === "boolean") return pagination.has_more;
  if (typeof pagination.total === "number" && typeof pagination.offset === "number") {
    const limit = Number(pagination.limit || API_LIMIT);
    return pagination.offset + limit < pagination.total;
  }
  return cardsLength >= Number(API_LIMIT);
}

function payloadNextOffset(payload, currentOffset) {
  const pagination = paginationInfo(payload);
  const limit = Number(pagination.limit || API_LIMIT);

  if (typeof pagination.nextOffset === "number") return pagination.nextOffset;
  if (typeof pagination.next_offset === "number") return pagination.next_offset;
  if (typeof pagination.offset === "number") return pagination.offset + limit;

  return currentOffset + limit;
}

async function getCardsForWindow(gameId, windowConfig) {
  const seen = new Set();
  const items = [];
  let offset = 0;

  for (let page = 0; page < MAX_PAGES_PER_GAME && items.length < DISPLAY_LIMIT; page += 1) {
    const params = new URLSearchParams({
      game: gameId,
      orderBy: windowConfig.orderBy,
      order: "desc",
      limit: API_LIMIT,
      offset: String(offset),
      min_price: windowConfig.minPrice,
      include_price_history: "true",
      include_statistics: "7d,30d,90d",
      priceHistoryDuration: windowConfig.historyDuration
    });

    const payload = await justtcg(`/cards?${params.toString()}`);
    const cards = extractCards(payload);
    if (!cards.length) break;

    let newCardsOnThisPage = 0;

    for (const card of cards) {
      const item = cardToSpike(card, windowConfig.key);
      if (!item) continue;

      const uniqueKey = `${item.id || item.name}-${item.variant || ""}`;
      if (seen.has(uniqueKey)) continue;

      seen.add(uniqueKey);
      newCardsOnThisPage += 1;
      items.push(item);

      if (items.length >= DISPLAY_LIMIT) break;
    }

    if (!payloadHasMore(payload, cards.length)) break;

    const nextOffset = payloadNextOffset(payload, offset);
    if (!Number.isFinite(nextOffset) || nextOffset <= offset) break;
    offset = nextOffset;

    // Proteção contra APIs que ignoram offset e devolvem sempre a mesma página.
    if (!newCardsOnThisPage && page > 0) break;
  }

  return sortWindowItems(items, windowConfig.key).slice(0, DISPLAY_LIMIT);
}

function stripHtml(value) {
  return String(value || "").replace(/<[^>]*>/g, " ");
}

function normalizeText(value) {
  return stripHtml(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\/\//g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(tcg|flesh|blood|fab)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSetName(value) {
  return normalizeText(value)
    .replace(/\b(first|1st|unlimited|edition|booster|deck|display|box)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCardNumber(value) {
  return String(value || "")
    .split("//")[0]
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "");
}

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

function pokemonSearchQueries(item) {
  const names = pokemonNameCandidates(item.name).slice(0, 3);
  const sets = pokemonSetCandidates(item.set).slice(0, 2);
  const numbers = pokemonNumberCandidates(item.number, item.name).slice(0, 2);
  const queries = [];

  for (const name of names) {
    for (const number of numbers) {
      queries.push(`name:"${escapePokemonQuery(name)}" number:"${escapePokemonQuery(number)}"`);
    }

    for (const set of sets) {
      queries.push(`name:"${escapePokemonQuery(name)}" set.name:"${escapePokemonQuery(set)}"`);
    }

    queries.push(`name:"${escapePokemonQuery(name)}"`);
  }

  return Array.from(new Set(queries)).filter(Boolean);
}

function scorePokemonApiCard(card, item) {
  const wantedNames = pokemonNameCandidates(item.name).map(normalizeText);
  const wantedSets = pokemonSetCandidates(item.set).map(normalizeText);
  const wantedNumbers = pokemonNumberCandidates(item.number, item.name).map(normalizeText);
  const cardName = normalizeText(card?.name);
  const cardSet = normalizeText(card?.set?.name || card?.setName);
  const cardNumber = normalizeText(card?.number || card?.localId);
  let score = 0;

  if (wantedNames.includes(cardName)) score += 80;
  else if (wantedNames.some(value => value && cardName.includes(value))) score += 42;
  else if (wantedNames.some(value => value && value.includes(cardName))) score += 24;

  if (wantedNumbers.includes(cardNumber)) score += 55;
  else if (wantedNumbers.length && cardNumber) score -= 10;

  if (wantedSets.includes(cardSet)) score += 35;
  else if (wantedSets.some(value => value && (cardSet.includes(value) || value.includes(cardSet)))) score += 18;

  if (card?.images?.large || card?.images?.small || card?.image) score += 8;
  return score;
}

function tcgdexImageUrl(card, quality = "low") {
  const image = validImageUrl(card?.image || "");
  if (!image) return "";
  return `${image}/${quality}.webp`;
}

function pokemonApiImageUrl(card) {
  return validImageUrl(card?.images?.large) || validImageUrl(card?.images?.small) || tcgdexImageUrl(card, "low");
}

async function findPokemonTcgApiImage(item) {
  for (const q of pokemonSearchQueries(item)) {
    try {
      const url = `${POKEMON_TCG_API}/cards?q=${encodeURIComponent(q)}&pageSize=24&select=id,name,set,number,images`;
      const payload = await pokemonJson(url);
      const cards = Array.isArray(payload.data) ? payload.data : [];
      if (!cards.length) continue;

      const selected = cards
        .slice()
        .sort((a, b) => scorePokemonApiCard(b, item) - scorePokemonApiCard(a, item))[0];
      const imageUrl = pokemonApiImageUrl(selected);
      if (imageUrl) return { imageUrl, source: "Pokémon TCG API", card: selected };
    } catch (error) {
      console.warn(`Pokémon TCG API: falha ao buscar imagem de ${item.name}:`, error.message);
    }
  }

  return null;
}

async function findPokemonTcgdexImage(item) {
  for (const name of pokemonNameCandidates(item.name).slice(0, 3)) {
    try {
      const url = `${TCGDEX_API}/cards?name=${encodeURIComponent(name)}&pagination:itemsPerPage=24`;
      const payload = await pokemonJson(url);
      const cards = Array.isArray(payload) ? payload : [];
      if (!cards.length) continue;

      const selected = cards
        .slice()
        .sort((a, b) => scorePokemonApiCard(b, item) - scorePokemonApiCard(a, item))[0];
      const imageUrl = pokemonApiImageUrl(selected);
      if (imageUrl) return { imageUrl, source: "TCGdex", card: selected };
    } catch (error) {
      console.warn(`TCGdex: falha ao buscar imagem de ${item.name}:`, error.message);
    }
  }

  return null;
}

async function resolvePokemonImage(item) {
  const existing = validImageUrl(item.imageUrl);
  if (existing) return { imageUrl: existing, source: "JustTCG" };

  const cacheKey = `${normalizeText(item.name)}|${normalizeText(item.set)}|${normalizeText(item.number)}`;
  if (pokemonImageCache.has(cacheKey)) return pokemonImageCache.get(cacheKey);

  const request = (async () => (
    await findPokemonTcgApiImage(item) ||
    await findPokemonTcgdexImage(item) ||
    null
  ))();

  pokemonImageCache.set(cacheKey, request);
  return request;
}

async function enrichPokemonWindowWithImages(items) {
  if (!Array.isArray(items) || !items.length) return items;

  for (const item of items) {
    try {
      const resolved = await resolvePokemonImage(item);
      if (!resolved?.imageUrl) continue;

      item.imageUrl = resolved.imageUrl;
      item.sources = item.sources || {};
      item.sources.pokemonImage = {
        label: resolved.source,
        source: resolved.source,
        imageUrl: resolved.imageUrl,
        matchedName: resolved.card?.name || "",
        matchedSet: resolved.card?.set?.name || resolved.card?.setName || "",
        matchedNumber: resolved.card?.number || resolved.card?.localId || ""
      };
    } catch (error) {
      console.warn(`Imagem Pokémon não encontrada para ${item.name}:`, error.message);
    }
  }

  return items;
}

async function enrichPokemonGameWithImages(gameResult) {
  if (gameResult.code !== "pokemon") return gameResult;

  for (const windowConfig of windows) {
    gameResult.windows[windowConfig.key] = await enrichPokemonWindowWithImages(gameResult.windows[windowConfig.key]);
  }

  gameResult.items = gameResult.windows.daily;
  gameResult.imageSources = ["Pokémon TCG API", "TCGdex"];
  return gameResult;
}

function fabNameCandidates(item) {
  const raw = String(item?.name || "").trim();
  const firstFace = raw.split("//")[0].trim();
  const withoutParenPitch = firstFace.replace(/\s*\((red|yellow|blue)\)\s*$/i, "").trim();
  const withoutDashPitch = firstFace.replace(/\s*[-–—]\s*(red|yellow|blue)\s*$/i, "").trim();
  const withoutCommaPitch = firstFace.replace(/\s*,\s*(red|yellow|blue)\s*$/i, "").trim();

  return Array.from(new Set([raw, firstFace, withoutParenPitch, withoutDashPitch, withoutCommaPitch]
    .map(normalizeText)
    .filter(Boolean)));
}

function detectFabPitch(itemOrProduct) {
  const raw = [
    itemOrProduct?.name,
    itemOrProduct?.variant,
    itemOrProduct?.pitch,
    itemOrProduct?.pitchValue,
    itemOrProduct?.pitch_value
  ].filter(Boolean).join(" ");

  const match = raw.match(/\b(red|yellow|blue)\b/i);
  return match ? match[1].toLowerCase() : "";
}

function extendedMap(product) {
  const map = new Map();
  const data = Array.isArray(product?.extendedData) ? product.extendedData : [];
  for (const entry of data) {
    const keys = [entry?.name, entry?.displayName].filter(Boolean).map(key => normalizeText(key));
    for (const key of keys) map.set(key, entry?.value ?? "");
  }
  return map;
}

function extendedValue(product, names) {
  const map = extendedMap(product);
  for (const name of names) {
    const key = normalizeText(name);
    if (map.has(key)) return map.get(key);
  }
  return "";
}

function productNumber(product) {
  return extendedValue(product, ["Number", "Card Number", "CardNumber"]);
}

function productRarity(product) {
  return extendedValue(product, ["Rarity"]);
}

function productPitch(product) {
  const fromExtended = extendedValue(product, ["Pitch", "Pitch Value", "PitchValue"]);
  if (fromExtended) return detectFabPitch({ name: fromExtended });
  return detectFabPitch(product);
}

function cardLikeProduct(product) {
  return Boolean(productNumber(product) || productRarity(product));
}

async function getFabCategoryId() {
  if (cachedFabCategoryId) return cachedFabCategoryId;

  try {
    const payload = await tcgcsv("/categories");
    const categories = Array.isArray(payload.results) ? payload.results : [];
    const found = categories.find(category => /flesh\s*(and|&)\s*blood/i.test(`${category.name || ""} ${category.displayName || ""} ${category.seoCategoryName || ""}`));
    cachedFabCategoryId = found?.categoryId || TCGCSV_FAB_CATEGORY_FALLBACK;
  } catch (error) {
    console.warn(`TCGCSV: não foi possível resolver categoria de FAB. Usando fallback ${TCGCSV_FAB_CATEGORY_FALLBACK}.`, error.message);
    cachedFabCategoryId = TCGCSV_FAB_CATEGORY_FALLBACK;
  }

  return cachedFabCategoryId;
}

async function getFabGroups(categoryId) {
  if (cachedFabGroups) return cachedFabGroups;
  const payload = await tcgcsv(`/${categoryId}/groups`);
  cachedFabGroups = Array.isArray(payload.results) ? payload.results : [];
  return cachedFabGroups;
}

function matchFabGroup(groups, setName) {
  const target = normalizeSetName(setName);
  if (!target) return null;

  let best = null;
  let bestScore = 0;

  for (const group of groups) {
    const groupName = normalizeSetName(group.name || "");
    const abbreviation = normalizeSetName(group.abbreviation || "");
    let score = 0;

    if (groupName === target) score = 100;
    else if (abbreviation && abbreviation === target) score = 92;
    else if (groupName.includes(target) && target.length >= 5) score = 82;
    else if (target.includes(groupName) && groupName.length >= 5) score = 72;

    if (score > bestScore) {
      bestScore = score;
      best = group;
    }
  }

  return bestScore >= 70 ? best : null;
}

async function getTcgcsvGroupData(categoryId, group) {
  const groupId = group?.groupId;
  if (!groupId) return { products: [], pricesByProductId: new Map() };
  if (tcgcsvGroupDataCache.has(groupId)) return tcgcsvGroupDataCache.get(groupId);

  const productsPayload = await tcgcsv(`/${categoryId}/${groupId}/products`);
  const pricesPayload = await tcgcsv(`/${categoryId}/${groupId}/prices`);

  const products = Array.isArray(productsPayload.results) ? productsPayload.results.filter(cardLikeProduct) : [];
  const prices = Array.isArray(pricesPayload.results) ? pricesPayload.results : [];
  const pricesByProductId = new Map();

  for (const price of prices) {
    const list = pricesByProductId.get(price.productId) || [];
    list.push(price);
    pricesByProductId.set(price.productId, list);
  }

  const data = { products, pricesByProductId };
  tcgcsvGroupDataCache.set(groupId, data);
  return data;
}

function scoreFabProductMatch(item, product) {
  const itemNumber = normalizeCardNumber(item.number);
  const prodNumber = normalizeCardNumber(productNumber(product));
  const names = fabNameCandidates(item);
  const prodNames = Array.from(new Set([
    normalizeText(product.name),
    normalizeText(product.cleanName)
  ].filter(Boolean)));
  const itemPitch = detectFabPitch(item);
  const prodPitch = productPitch(product);

  let score = 0;

  if (itemNumber && prodNumber && itemNumber === prodNumber) score += 70;
  if (itemNumber && prodNumber && itemNumber !== prodNumber) score -= 35;

  for (const itemName of names) {
    for (const prodName of prodNames) {
      if (itemName && prodName && itemName === prodName) score += 45;
      else if (itemName && prodName && prodName.includes(itemName) && itemName.length >= 4) score += 24;
      else if (itemName && prodName && itemName.includes(prodName) && prodName.length >= 4) score += 18;
    }
  }

  if (itemPitch && prodPitch && itemPitch === prodPitch) score += 10;
  if (itemPitch && prodPitch && itemPitch !== prodPitch) score -= 10;

  return score;
}

function chooseTcgplayerPrice(item, prices) {
  if (!Array.isArray(prices) || !prices.length) return null;
  const variant = normalizeText(item.variant || "");

  function subtypeScore(price) {
    const subtype = normalizeText(price.subTypeName || "");
    let score = 0;

    if (variant.includes("cold foil") && subtype.includes("cold foil")) score += 50;
    if (variant.includes("rainbow foil") && subtype.includes("rainbow foil")) score += 50;
    if (variant.includes("foil") && !variant.includes("cold foil") && subtype.includes("foil")) score += 28;
    if (variant.includes("normal") && subtype.includes("normal")) score += 42;
    if (!variant && subtype.includes("normal")) score += 16;
    if (numberOrNull(price.marketPrice) !== null) score += 8;
    if (numberOrNull(price.midPrice) !== null) score += 4;

    return score;
  }

  return prices
    .slice()
    .sort((a, b) => {
      const diff = subtypeScore(b) - subtypeScore(a);
      if (diff !== 0) return diff;
      return Number(numberOrNull(b.marketPrice) ?? numberOrNull(b.midPrice) ?? 0) - Number(numberOrNull(a.marketPrice) ?? numberOrNull(a.midPrice) ?? 0);
    })[0];
}

function tcgplayerPriceValue(price) {
  return numberOrNull(price?.marketPrice) ?? numberOrNull(price?.midPrice) ?? numberOrNull(price?.lowPrice) ?? numberOrNull(price?.directLowPrice);
}

function applyTcgcsvMatch(item, group, product, price) {
  const tcgPrice = roundMoney(tcgplayerPriceValue(price));
  const productImage = validImageUrl(product?.imageUrl || "");

  item.sources = item.sources || {};
  item.sources.justtcg = item.sources.justtcg || {
    label: "JustTCG",
    price: item.price,
    variant: item.variant || "",
    imageUrl: item.imageUrl || ""
  };

  if (!tcgPrice) {
    item.sources.tcgplayer = null;
    item.tcgcsvStatus = "sem preço TCGplayer compatível";
    return item;
  }

  const referenceBRL = {
    x5: roundMoney(tcgPrice * 5),
    x6: roundMoney(tcgPrice * 6),
    x7: roundMoney(tcgPrice * 7)
  };

  item.tcgplayerPrice = tcgPrice;
  item.tcgplayerReference = referenceBRL;
  item.tcgcsvStatus = "ok";
  item.tcgcsv = {
    source: "TCGCSV",
    categoryId: TCGCSV_FAB_CATEGORY_FALLBACK,
    groupId: group?.groupId || null,
    groupName: group?.name || "",
    productId: product?.productId || null,
    productName: product?.name || "",
    subTypeName: price?.subTypeName || ""
  };
  item.sources.tcgplayer = {
    label: "TCGplayer",
    source: "TCGCSV",
    price: tcgPrice,
    marketPrice: roundMoney(price?.marketPrice),
    midPrice: roundMoney(price?.midPrice),
    lowPrice: roundMoney(price?.lowPrice),
    highPrice: roundMoney(price?.highPrice),
    directLowPrice: roundMoney(price?.directLowPrice),
    subTypeName: price?.subTypeName || "",
    productId: product?.productId || null,
    productName: product?.name || "",
    url: product?.url || "",
    imageUrl: productImage,
    referenceBRL
  };

  // Mantém prioridade para imagem da JustTCG. Só usa TCGCSV/TCGplayer se a JustTCG não enviou imagem.
  if (!item.imageUrl && productImage) {
    item.imageUrl = productImage;
  }

  return item;
}

function applyTcgcsvMiss(item, status) {
  item.sources = item.sources || {};
  item.sources.justtcg = item.sources.justtcg || {
    label: "JustTCG",
    price: item.price,
    variant: item.variant || "",
    imageUrl: item.imageUrl || ""
  };
  item.sources.tcgplayer = null;
  item.tcgcsvStatus = status;
  return item;
}

async function enrichFabWindowWithTcgcsv(items) {
  if (!Array.isArray(items) || !items.length) return items;

  let categoryId;
  let groups;

  try {
    categoryId = await getFabCategoryId();
    groups = await getFabGroups(categoryId);
  } catch (error) {
    console.warn("TCGCSV: não foi possível carregar grupos de FAB:", error.message);
    return items.map(item => applyTcgcsvMiss(item, "erro ao carregar grupos TCGCSV"));
  }

  for (const item of items) {
    try {
      const group = matchFabGroup(groups, item.set);
      if (!group) {
        applyTcgcsvMiss(item, "set não encontrado no TCGCSV");
        continue;
      }

      const { products, pricesByProductId } = await getTcgcsvGroupData(categoryId, group);
      const candidates = products
        .map(product => ({ product, score: scoreFabProductMatch(item, product) }))
        .filter(candidate => candidate.score >= 50)
        .sort((a, b) => b.score - a.score);

      if (!candidates.length) {
        applyTcgcsvMiss(item, "produto não encontrado no TCGCSV");
        continue;
      }

      let selected = null;
      for (const candidate of candidates.slice(0, 5)) {
        const prices = pricesByProductId.get(candidate.product.productId) || [];
        const price = chooseTcgplayerPrice(item, prices);
        if (price && tcgplayerPriceValue(price) !== null) {
          selected = { product: candidate.product, price };
          break;
        }
      }

      if (!selected) {
        applyTcgcsvMiss(item, "preço TCGplayer não encontrado no TCGCSV");
        continue;
      }

      applyTcgcsvMatch(item, group, selected.product, selected.price);
    } catch (error) {
      applyTcgcsvMiss(item, `erro TCGCSV: ${error.message}`);
    }
  }

  return items;
}

async function enrichFabGameWithTcgcsv(gameResult) {
  if (gameResult.code !== "fab") return gameResult;

  for (const windowConfig of windows) {
    gameResult.windows[windowConfig.key] = await enrichFabWindowWithTcgcsv(gameResult.windows[windowConfig.key]);
  }

  gameResult.items = gameResult.windows.daily;
  gameResult.priceSources = ["JustTCG", "TCGCSV/TCGplayer"];
  return gameResult;
}

async function getSpikesForGame(gameId, target) {
  const result = {
    id: gameId,
    code: target.code,
    label: target.label,
    windows: {
      daily: []
    },
    items: [],
    warnings: [],
    priceSources: target.code === "fab" ? ["JustTCG", "TCGCSV/TCGplayer"] : ["JustTCG"]
  };

  for (const windowConfig of windows) {
    try {
      result.windows[windowConfig.key] = await getCardsForWindow(gameId, windowConfig);
      console.log(`${target.label} / ${windowConfig.label}: ${result.windows[windowConfig.key].length} cartas`);
    } catch (error) {
      const fallback = previousWindow(target.code, windowConfig.key);
      result.windows[windowConfig.key] = fallback;
      result.warnings.push(`${windowConfig.key}: ${error.message}`);
      console.error(`Erro em ${target.label} / ${windowConfig.key}:`, error.message);
      if (fallback.length) console.log(`Mantendo dados anteriores de ${target.label} / ${windowConfig.key}: ${fallback.length} cartas`);
    }
  }

  // Compatibilidade com componentes antigos do site, como o card do banner hero.
  result.items = result.windows.daily;

  if (target.code === "fab") return enrichFabGameWithTcgcsv(result);
  if (target.code === "pokemon") return enrichPokemonGameWithImages(result);
  return result;
}

async function main() {
  previousData = await loadPreviousData();

  let games = [];
  try {
    const gamesPayload = await justtcg("/games", { throttle: false });
    games = extractCards(gamesPayload);
  } catch (error) {
    console.error("Erro ao buscar lista de jogos. Tentando usar ids do JSON anterior:", error.message);
  }

  const output = {
    updatedAt: new Date().toISOString(),
    source: "JustTCG + TCGCSV/TCGplayer para FAB + Pokémon TCG API/TCGdex para imagens",
    schema: "spikes-daily-v6-pokemon-images",
    windows: windows.map(window => window.key),
    requestLimit: Number(API_LIMIT),
    displayLimit: DISPLAY_LIMIT,
    maxPagesPerGame: MAX_PAGES_PER_GAME,
    requestWaitMs: REQUEST_WAIT_MS,
    tcgcsv: {
      enabledFor: ["fab"],
      fabCategoryId: TCGCSV_FAB_CATEGORY_FALLBACK,
      referenceMultipliers: [5, 6, 7]
    },
    imageApis: {
      pokemon: ["Pokémon TCG API", "TCGdex"],
      note: "Usadas apenas para preencher imageUrl quando a JustTCG não enviar imagem."
    },
    games: []
  };

  for (const target of targets) {
    try {
      const gameId = resolveGameId(games, target);
      if (!gameId) {
        console.log(`Jogo não encontrado na JustTCG: ${target.label}`);
        const previous = previousGameByCode(target.code);
        output.games.push(previous || { id: "", code: target.code, label: target.label, windows: { daily: [] }, items: [] });
        continue;
      }

      const result = await getSpikesForGame(gameId, target);
      output.games.push(result);
      console.log(`Atualizado: ${target.label}`);
    } catch (error) {
      console.error(`Erro em ${target.label}:`, error.message);
      const previous = previousGameByCode(target.code);
      output.games.push(previous || { id: "", code: target.code, label: target.label, windows: { daily: [] }, items: [] });
    }
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");
  console.log(`${OUTPUT_PATH} atualizado.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

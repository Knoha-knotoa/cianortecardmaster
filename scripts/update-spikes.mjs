import { readFile, writeFile } from "node:fs/promises";

const API = "https://api.justtcg.com/v1";
const API_KEY = process.env.JUSTTCG_API_KEY;
const OUTPUT_PATH = "assets/data/spikes.json";

// O log do GitHub mostrou que o plano atual da JustTCG aceita limit entre 1 e 20.
const API_LIMIT = "20";

// Evita 429 no plano gratuito/básico. Dá para diminuir pelo secret/env JUSTTCG_WAIT_MS se seu plano permitir.
const REQUEST_WAIT_MS = Number(process.env.JUSTTCG_WAIT_MS || 8000);
const MAX_RETRIES = Number(process.env.JUSTTCG_MAX_RETRIES || 3);

const targets = [
  { code: "fab", label: "Flesh and Blood", match: /flesh\s*and\s*blood/i },
  { code: "mtg", label: "Magic: The Gathering", match: /magic/i },
  { code: "pokemon", label: "Pokémon TCG", match: /pok[eé]mon/i },
  { code: "yugioh", label: "Yu-Gi-Oh!", match: /yu-?gi-?oh/i }
];

const windows = [
  // A página de Spikes mostra apenas altas das últimas 24h.
  { key: "daily", orderBy: "24h", label: "24 horas", historyDuration: "7d", minPrice: "0.25" }
];

if (!API_KEY) {
  console.log("JUSTTCG_API_KEY não configurada. Mantendo assets/data/spikes.json atual.");
  process.exit(0);
}

let previousData = null;
let lastRequestAt = 0;

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
  if (Array.isArray(items)) return items.slice(0, 9);

  // Compatibilidade com o primeiro formato, que só tinha game.items.
  if ((windowKey === "weekly" || windowKey === "daily") && Array.isArray(game?.items)) return game.items.slice(0, 9);
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

async function justtcg(path, options = {}) {
  const url = `${API}${path}`;
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

function numberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const normalized = String(value).replace(/[%$,]/g, "").trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function validImageUrl(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) return "";
  return trimmed;
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
  if (windowKey === "daily") return numberOrNull(variant.priceChange24hr ?? variant.priceChange24h ?? variant.priceChange1d ?? variant.change24hr ?? variant.change24h ?? variant.change1d);
  if (windowKey === "weekly") return numberOrNull(variant.priceChange7d ?? variant.change7d);
  if (windowKey === "monthly") return numberOrNull(variant.priceChange30d ?? variant.change30d);
  if (windowKey === "expensive") return numberOrNull(variant.price);
  return null;
}

function bestVariant(card, windowKey = "weekly") {
  const variants = Array.isArray(card.variants) ? card.variants : [];
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

  const price = numberOrNull(variant.price) ?? 0;
  const change1d = variantChange(variant, "daily");
  const change7d = variantChange(variant, "weekly");
  const change30d = variantChange(variant, "monthly");

  if (windowKey !== "expensive") {
    const selectedChange = windowKey === "daily" ? change1d : windowKey === "monthly" ? change30d : change7d;
    if (!Number.isFinite(selectedChange) || selectedChange <= 0) return null;
  }

  return {
    id: card.id || "",
    name: card.name || "Carta sem nome",
    set: card.set_name || card.set || card.setName || "",
    number: card.number || "",
    rarity: card.rarity || "",
    price,
    change1d,
    change7d,
    change30d,
    variant: [variant.printing, variant.condition].filter(Boolean).join(" / "),
    imageUrl: extractImageUrl(card, variant),
    history: normalizeHistory(variant, windowKey)
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

async function getCardsForWindow(gameId, windowConfig) {
  const params = new URLSearchParams({
    game: gameId,
    orderBy: windowConfig.orderBy,
    order: "desc",
    limit: API_LIMIT,
    min_price: windowConfig.minPrice,
    include_price_history: "true",
    include_statistics: "7d,30d,90d",
    priceHistoryDuration: windowConfig.historyDuration
  });

  const payload = await justtcg(`/cards?${params.toString()}`);
  const cards = Array.isArray(payload.data) ? payload.data : [];

  const seen = new Set();
  const items = [];

  for (const card of cards) {
    const item = cardToSpike(card, windowConfig.key);
    if (!item) continue;

    const uniqueKey = `${item.id || item.name}-${item.variant || ""}`;
    if (seen.has(uniqueKey)) continue;

    seen.add(uniqueKey);
    items.push(item);
  }

  return sortWindowItems(items, windowConfig.key).slice(0, 9);
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
    warnings: []
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
  return result;
}

async function main() {
  previousData = await loadPreviousData();

  let games = [];
  try {
    const gamesPayload = await justtcg("/games", { throttle: false });
    games = Array.isArray(gamesPayload.data) ? gamesPayload.data : [];
  } catch (error) {
    console.error("Erro ao buscar lista de jogos. Tentando usar ids do JSON anterior:", error.message);
  }

  const output = {
    updatedAt: new Date().toISOString(),
    source: "JustTCG",
    schema: "spikes-daily-v4",
    windows: windows.map(window => window.key),
    requestLimit: Number(API_LIMIT),
    requestWaitMs: REQUEST_WAIT_MS,
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

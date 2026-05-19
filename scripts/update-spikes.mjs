import { writeFile } from "node:fs/promises";

const API = "https://api.justtcg.com/v1";
const API_KEY = process.env.JUSTTCG_API_KEY;

const targets = [
  { code: "fab", label: "Flesh and Blood", match: /flesh\s*and\s*blood/i },
  { code: "mtg", label: "Magic: The Gathering", match: /magic/i },
  { code: "pokemon", label: "Pokémon TCG", match: /pok[eé]mon/i },
  { code: "yugioh", label: "Yu-Gi-Oh!", match: /yu-?gi-?oh/i }
];

const windows = [
  { key: "daily", orderBy: "24h", label: "24 horas", changeField: "change1d" },
  { key: "weekly", orderBy: "7d", label: "7 dias", changeField: "change7d" },
  { key: "monthly", orderBy: "30d", label: "30 dias", changeField: "change30d" },
  { key: "expensive", orderBy: "price", label: "mais caras", changeField: "price" }
];

if (!API_KEY) {
  console.log("JUSTTCG_API_KEY não configurada. Mantendo dados de demonstração.");
  process.exit(0);
}

async function justtcg(path) {
  const response = await fetch(`${API}${path}`, {
    headers: {
      "x-api-key": API_KEY,
      "accept": "application/json"
    }
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`JustTCG ${response.status}: ${text}`);
  }

  return response.json();
}

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function bestVariant(card, windowKey = "weekly") {
  const variants = Array.isArray(card.variants) ? card.variants : [];
  if (!variants.length) return null;

  return variants
    .slice()
    .sort((a, b) => {
      if (windowKey === "expensive") return Number(b.price ?? 0) - Number(a.price ?? 0);
      const fields = windowKey === "daily"
        ? ["priceChange24hr", "priceChange24h", "priceChange1d"]
        : windowKey === "monthly"
          ? ["priceChange30d", "change30d"]
          : ["priceChange7d", "change7d"];
      const changeFor = variant => {
        for (const field of fields) {
          const value = Number(variant[field]);
          if (Number.isFinite(value)) return value;
        }
        return 0;
      };
      const ca = changeFor(a);
      const cb = changeFor(b);
      if (cb !== ca) return cb - ca;
      return Number(b.price ?? 0) - Number(a.price ?? 0);
    })[0];
}

function normalizeHistory(variant) {
  const history = variant?.priceHistory || variant?.price_history || variant?.priceHistory30d || [];
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
  const change1d = numberOrNull(variant.priceChange24hr ?? variant.priceChange24h ?? variant.priceChange1d ?? variant.change24hr ?? variant.change24h ?? variant.change1d);
  const change7d = numberOrNull(variant.priceChange7d ?? variant.change7d);
  const change30d = numberOrNull(variant.priceChange30d ?? variant.change30d);

  if (windowKey !== "expensive") {
    const selectedChange = windowKey === "daily" ? change1d : windowKey === "monthly" ? change30d : change7d;
    if (!Number.isFinite(selectedChange) || selectedChange <= 0) return null;
  }

  return {
    id: card.id || "",
    name: card.name || "Carta sem nome",
    set: card.set_name || card.set || "",
    number: card.number || "",
    rarity: card.rarity || "",
    price,
    change1d,
    change7d,
    change30d,
    variant: [variant.printing, variant.condition].filter(Boolean).join(" / "),
    history: normalizeHistory(variant)
  };
}

function resolveGameId(games, target) {
  const found = games.find(game => target.match.test(game.name || "") || target.match.test(game.id || ""));
  return found?.id || null;
}

async function getCardsForWindow(gameId, windowKey) {
  const windowConfig = windows.find(window => window.key === windowKey) || windows[1];
  const params = new URLSearchParams({
    game: gameId,
    orderBy: windowConfig.orderBy,
    order: "desc",
    limit: "24",
    min_price: windowKey === "expensive" ? "0" : "1",
    include_price_history: "true",
    include_statistics: "7d,30d",
    priceHistoryDuration: "30d"
  });

  const payload = await justtcg(`/cards?${params.toString()}`);
  const cards = Array.isArray(payload.data) ? payload.data : [];

  return cards
    .map(card => cardToSpike(card, windowKey))
    .filter(Boolean)
    .sort((a, b) => {
      if (windowKey === "expensive") return Number(b.price ?? 0) - Number(a.price ?? 0);
      const getChange = item => windowKey === "daily" ? item.change1d : windowKey === "monthly" ? item.change30d : item.change7d;
      return Number(getChange(b) ?? 0) - Number(getChange(a) ?? 0);
    })
    .slice(0, 4);
}

async function getSpikesForGame(gameId, target) {
  const result = {
    id: gameId,
    code: target.code,
    label: target.label,
    windows: {
      daily: [],
      weekly: [],
      monthly: [],
      expensive: []
    }
  };

  for (const windowConfig of windows) {
    try {
      result.windows[windowConfig.key] = await getCardsForWindow(gameId, windowConfig.key);
    } catch (error) {
      console.error(`Erro em ${target.label} / ${windowConfig.key}:`, error.message);
      result.windows[windowConfig.key] = [];
    }
  }

  result.items = result.windows.weekly;
  return result;
}

async function main() {
  const gamesPayload = await justtcg("/games");
  const games = Array.isArray(gamesPayload.data) ? gamesPayload.data : [];

  const output = {
    updatedAt: new Date().toISOString(),
    source: "JustTCG",
    windows: ["daily", "weekly", "monthly", "expensive"],
    games: []
  };

  for (const target of targets) {
    try {
      const gameId = resolveGameId(games, target);
      if (!gameId) {
        console.log(`Jogo não encontrado na JustTCG: ${target.label}`);
        output.games.push({ id: "", code: target.code, label: target.label, windows: { daily: [], weekly: [], monthly: [], expensive: [] }, items: [] });
        continue;
      }

      const result = await getSpikesForGame(gameId, target);
      output.games.push(result);
      console.log(`Atualizado: ${target.label}`);
    } catch (error) {
      console.error(`Erro em ${target.label}:`, error.message);
      output.games.push({ id: "", code: target.code, label: target.label, windows: { daily: [], weekly: [], monthly: [], expensive: [] }, items: [] });
    }
  }

  await writeFile("assets/data/spikes.json", JSON.stringify(output, null, 2), "utf8");
  console.log("assets/data/spikes.json atualizado.");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

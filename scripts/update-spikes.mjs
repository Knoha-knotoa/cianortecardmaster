import { writeFile } from "node:fs/promises";

const API = "https://api.justtcg.com/v1";
const API_KEY = process.env.JUSTTCG_API_KEY;

const targets = [
  { code: "fab", label: "Flesh and Blood", match: /flesh\s*and\s*blood/i },
  { code: "mtg", label: "Magic: The Gathering", match: /magic/i },
  { code: "pokemon", label: "Pokémon TCG", match: /pok[eé]mon/i },
  { code: "yugioh", label: "Yu-Gi-Oh!", match: /yu-?gi-?oh/i }
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

function bestVariant(card) {
  const variants = Array.isArray(card.variants) ? card.variants : [];
  if (!variants.length) return null;

  return variants
    .slice()
    .sort((a, b) => {
      const ca = Number(a.priceChange7d ?? a.priceChange30d ?? 0);
      const cb = Number(b.priceChange7d ?? b.priceChange30d ?? 0);
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

function cardToSpike(card) {
  const variant = bestVariant(card);
  if (!variant) return null;

  const change7d = Number(variant.priceChange7d ?? 0);
  const change30d = Number(variant.priceChange30d ?? 0);
  const change = change7d || change30d;

  if (!Number.isFinite(change) || change <= 0) return null;

  return {
    id: card.id || "",
    name: card.name || "Carta sem nome",
    set: card.set_name || card.set || "",
    number: card.number || "",
    rarity: card.rarity || "",
    price: Number(variant.price ?? 0),
    change7d: Number.isFinite(change7d) ? change7d : null,
    change30d: Number.isFinite(change30d) ? change30d : null,
    variant: [variant.printing, variant.condition].filter(Boolean).join(" / "),
    history: normalizeHistory(variant)
  };
}

function resolveGameId(games, target) {
  const found = games.find(game => target.match.test(game.name || "") || target.match.test(game.id || ""));
  return found?.id || null;
}

async function getSpikesForGame(gameId, target) {
  const params = new URLSearchParams({
    game: gameId,
    orderBy: "7d",
    order: "desc",
    limit: "16",
    min_price: "1",
    include_price_history: "true",
    include_statistics: "7d,30d",
    priceHistoryDuration: "30d"
  });

  const payload = await justtcg(`/cards?${params.toString()}`);
  const cards = Array.isArray(payload.data) ? payload.data : [];

  const items = cards
    .map(cardToSpike)
    .filter(Boolean)
    .sort((a, b) => Number(b.change7d ?? b.change30d ?? 0) - Number(a.change7d ?? a.change30d ?? 0))
    .slice(0, 4);

  return {
    id: gameId,
    code: target.code,
    label: target.label,
    items
  };
}

async function main() {
  const gamesPayload = await justtcg("/games");
  const games = Array.isArray(gamesPayload.data) ? gamesPayload.data : [];

  const output = {
    updatedAt: new Date().toISOString(),
    source: "JustTCG",
    window: "7d",
    games: []
  };

  for (const target of targets) {
    try {
      const gameId = resolveGameId(games, target);
      if (!gameId) {
        console.log(`Jogo não encontrado na JustTCG: ${target.label}`);
        output.games.push({ id: "", code: target.code, label: target.label, items: [] });
        continue;
      }

      const result = await getSpikesForGame(gameId, target);
      output.games.push(result);
      console.log(`Atualizado: ${target.label} (${result.items.length} cards)`);
    } catch (error) {
      console.error(`Erro em ${target.label}:`, error.message);
      output.games.push({ id: "", code: target.code, label: target.label, items: [] });
    }
  }

  await writeFile("assets/data/spikes.json", JSON.stringify(output, null, 2), "utf8");
  console.log("assets/data/spikes.json atualizado.");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

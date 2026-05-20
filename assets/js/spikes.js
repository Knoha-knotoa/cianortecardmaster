/* Spikes JustTCG
   Lê assets/data/spikes.json e renderiza listas por jogo.
   A atualização dos dados reais é feita pelo GitHub Actions usando a API JustTCG.
*/

(() => {
  const baseurl = window.CCM_BASEURL || "";
  const dataUrl = `${baseurl}/assets/data/spikes.json`;

  const WINDOW_CONFIG = {
    daily: {
      label: "Dia",
      eyebrow: "Top spikes do dia",
      title: "Maiores altas das últimas 24h",
      description: "Até 9 cartas que mais subiram nas últimas 24 horas."
    },
    weekly: {
      label: "Semana",
      eyebrow: "Top spikes da semana",
      title: "Maiores altas dos últimos 7 dias",
      description: "As cartas que mais subiram na semana."
    },
    monthly: {
      label: "Mês",
      eyebrow: "Top spikes do mês",
      title: "Maiores altas dos últimos 30 dias",
      description: "As cartas que mais subiram no mês."
    },
    expensive: {
      label: "Mais caras",
      eyebrow: "Cartas mais caras",
      title: "Maiores preços atuais",
      description: "As cartas mais caras do jogo no momento."
    }
  };

  // A página de Spikes agora mostra apenas altas das últimas 24h.
  const WINDOW_ORDER = ["daily"];
  let pagePayloads = [];

  function money(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
    return Number(value).toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function percent(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
    const sign = Number(value) > 0 ? "+" : "";
    return `${sign}${Number(value).toFixed(1)}%`;
  }

  function dateBR(value) {
    if (!value) return "Sem data";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Sem data";
    return date.toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }

  function shortDate(value) {
    const numeric = Number(value || 0);
    if (!numeric) return "";
    const ms = numeric < 1000000000000 ? numeric * 1000 : numeric;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function gameToImageApi(code) {
    if (code === "fab") return "fab";
    if (code === "mtg") return "mtg";
    if (code === "pokemon") return "pokemon";
    if (code === "yugioh") return "yugioh";
    return code;
  }

  function gameKey(game) {
    return String(game.code || game.id || game.label || "jogo").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  }

  function normalizeHistory(history) {
    if (!Array.isArray(history)) return [];
    return history
      .map(point => ({
        t: Number(point.t || point.date || point.timestamp || 0),
        p: Number(point.p || point.price || point.value || 0)
      }))
      .filter(point => point.p > 0)
      .sort((a, b) => a.t - b.t);
  }

  function makeChart(history, size = "card") {
    const points = normalizeHistory(history);
    if (points.length < 2) {
      return `<div class="spike-chart-empty">Sem histórico suficiente</div>`;
    }

    const large = size === "large";
    const compact = size === "compact";
    const width = large ? 780 : 360;
    const height = large ? 300 : compact ? 92 : 136;
    const padX = large ? 58 : 36;
    const padTop = large ? 26 : 18;
    const padBottom = large ? 42 : 28;
    const chartHeight = height - padTop - padBottom;
    const prices = points.map(p => p.p);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    function xy(point, index) {
      const x = padX + (index / (points.length - 1)) * (width - padX * 2);
      const y = padTop + (1 - ((point.p - min) / range)) * chartHeight;
      return { x, y };
    }

    const coords = points.map(xy);
    const d = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
    const area = `${d} L ${coords.at(-1).x.toFixed(2)} ${height - padBottom} L ${coords[0].x.toFixed(2)} ${height - padBottom} Z`;
    const gridValues = [max, min + range / 2, min];
    const grid = gridValues.map(value => {
      const y = padTop + (1 - ((value - min) / range)) * chartHeight;
      return `
        <line class="spike-chart-grid" x1="${padX}" y1="${y.toFixed(2)}" x2="${width - padX}" y2="${y.toFixed(2)}"></line>
        <text class="spike-chart-label spike-chart-y-label" x="8" y="${(y + 4).toFixed(2)}">${money(value).replace("US", "")}</text>
      `;
    }).join("");
    const dots = coords.map((point, index) => {
      if (!large && index !== 0 && index !== coords.length - 1) return "";
      return `<circle class="spike-chart-dot" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${large ? 4 : 3}"></circle>`;
    }).join("");

    return `
      <svg class="spike-chart ${large ? "spike-chart-large" : ""}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfico de preço">
        ${grid}
        <path class="spike-chart-area" d="${area}"></path>
        <path class="spike-chart-line" d="${d}"></path>
        ${dots}
        <text class="spike-chart-label" x="${padX}" y="${height - 10}">${shortDate(points[0].t)}</text>
        <text class="spike-chart-label spike-chart-end-label" x="${width - padX}" y="${height - 10}">${shortDate(points.at(-1).t)}</text>
      </svg>
    `;
  }

  function itemChange(item, windowKey) {
    if (windowKey === "daily") return item.change1d ?? item.change24h ?? item.change24hr ?? item.change7d ?? item.change30d;
    if (windowKey === "weekly") return item.change7d ?? item.change30d ?? item.change1d;
    if (windowKey === "monthly") return item.change30d ?? item.change7d ?? item.change1d;
    return item.price;
  }

  function metricTemplate(item, windowKey) {
    if (windowKey === "expensive") {
      return `
        <div class="spike-metric-main">
          <strong>${money(item.price)}</strong>
          <span>Preço atual</span>
        </div>
      `;
    }

    return `
      <div class="spike-metric-main">
        <strong>${percent(itemChange(item, windowKey))}</strong>
        <span>Variação</span>
      </div>
      <div class="spike-metric-secondary">
        <strong>${money(item.price)}</strong>
        <span>Preço atual</span>
      </div>
    `;
  }

  function fallbackCardName(item, game) {
    let name = String(item.name || "").trim();

    // A API de imagem costuma encontrar melhor a primeira face de cartas duplas de FAB.
    if (game?.code === "fab") {
      name = name.split("//")[0].trim();
      name = name.replace(/\s*\((red|yellow|blue)\)\s*$/i, "").trim();
    }

    return name || String(item.name || "Carta sem nome");
  }

  function fallbackPitch(item, game) {
    if (game?.code !== "fab") return "";
    const match = String(item.name || item.variant || "").match(/\b(red|yellow|blue)\b/i);
    return match ? match[1].toLowerCase() : "";
  }

  function directImageUrl(item) {
    return item.imageUrl || item.image_url || item.image || item.imageSmall || item.imageLarge || "";
  }

  function cardImageTemplate(item, game, extraClass = "") {
    const apiGame = gameToImageApi(game.code);
    const imageUrl = directImageUrl(item);
    const className = `spike-card-image ${extraClass}`.trim();

    if (imageUrl) {
      return `
        <div class="${className} spike-card-image-direct">
          <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.dataset.imageError='true'; this.remove();">
          <span class="tcg-card-loading">Imagem indisponível</span>
        </div>
      `;
    }

    return `
      <div
        class="tcg-card-image ${className}"
        data-game="${apiGame}"
        data-name="${escapeHtml(fallbackCardName(item, game))}"
        data-pitch="${escapeHtml(fallbackPitch(item, game))}"
        data-set="${escapeHtml(item.set || "")}"
        data-number="${escapeHtml(item.number || "")}">
        <span class="tcg-card-loading">Imagem</span>
      </div>
    `;
  }

  function cardTemplate(item, game, windowKey, payloads, compact = false) {
    const history = item.history || [];
    const payloadIndex = payloads.push({ item, game, windowKey }) - 1;

    return `
      <article class="spike-card ${compact ? "spike-card-compact" : ""}" tabindex="0" role="button" data-spike-card data-spike-index="${payloadIndex}">
        <div class="spike-card-media">
          ${cardImageTemplate(item, game)}
        </div>
        <div class="spike-card-data">
          <p class="eyebrow">${escapeHtml(game.label)} • ${escapeHtml(WINDOW_CONFIG[windowKey]?.label || "Spikes")}</p>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.set || "Set não informado")}${item.variant ? " • " + escapeHtml(item.variant) : ""}</p>
          <div class="spike-metrics-grid">${metricTemplate(item, windowKey)}</div>
        </div>
        <div class="spike-card-chart-wrap">
          ${makeChart(history, compact ? "compact" : "card")}
        </div>
      </article>
    `;
  }

  function getItemsForWindow(game, windowKey) {
    if (game.windows && Array.isArray(game.windows[windowKey])) {
      return game.windows[windowKey].slice(0, 9);
    }

    if (windowKey === "weekly" && Array.isArray(game.items)) {
      return game.items.slice(0, 9);
    }

    return [];
  }

  function windowSectionTemplate(game, windowKey, payloads) {
    const config = WINDOW_CONFIG[windowKey];
    const items = getItemsForWindow(game, windowKey);

    if (!items.length) {
      return `
        <section class="spike-window-section spike-window-section-empty" data-spike-window-section="${windowKey}">
          <div class="spike-window-head">
            <div>
              <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
              <h3>${escapeHtml(config.title)}</h3>
              <p>${escapeHtml(config.description)}</p>
            </div>
            <span>0 cartas</span>
          </div>
          <p class="spike-loading">Sem dados para esta janela. Rode o workflow “Atualizar spikes JustTCG” para gerar esta lista.</p>
        </section>
      `;
    }

    return `
      <section class="spike-window-section" data-spike-window-section="${windowKey}">
        <div class="spike-window-head">
          <div>
            <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
            <h3>${escapeHtml(config.title)}</h3>
            <p>${escapeHtml(config.description)}</p>
          </div>
          <span>${items.length} cartas</span>
        </div>
        <div class="spike-row">
          ${items.map(item => cardTemplate(item, game, windowKey, payloads)).join("")}
        </div>
      </section>
    `;
  }

  function sectionTemplate(game, payloads) {
    const hasAnyItem = WINDOW_ORDER.some(windowKey => getItemsForWindow(game, windowKey).length > 0);
    if (!hasAnyItem) return "";
    const key = gameKey(game);

    return `
      <section class="spike-game-section" data-spike-game="${escapeHtml(key)}">
        <div class="spike-section-title">
          <div>
            <p class="eyebrow">Top spikes</p>
            <h2>${escapeHtml(game.label)}</h2>
          </div>
          <span>Até 9 cartas nas últimas 24h</span>
        </div>
        <div class="spike-window-stack">
          ${WINDOW_ORDER.map(windowKey => windowSectionTemplate(game, windowKey, payloads)).join("")}
        </div>
      </section>
    `;
  }

  function openModal(item, game, windowKey) {
    const existing = document.querySelector(".spike-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.className = "spike-modal";
    modal.innerHTML = `
      <div class="spike-modal-backdrop" data-close-modal></div>
      <div class="spike-modal-card" role="dialog" aria-modal="true">
        <button class="spike-modal-close" type="button" data-close-modal>×</button>
        <div class="spike-modal-grid">
          ${cardImageTemplate(item, game, "spike-modal-image")}
          <div>
            <p class="eyebrow">${escapeHtml(game.label)} • ${escapeHtml(WINDOW_CONFIG[windowKey]?.label || "Spikes")}</p>
            <h2>${escapeHtml(item.name)}</h2>
            <p>${escapeHtml(item.set || "Set não informado")} ${item.variant ? "• " + escapeHtml(item.variant) : ""}</p>
            <div class="spike-modal-metrics">
              <span><strong>Preço atual</strong>${money(item.price)}</span>
              <span><strong>24h</strong>${percent(item.change1d ?? item.change24h ?? item.change24hr)}</span>
              <span><strong>7 dias</strong>${percent(item.change7d)}</span>
              <span><strong>30 dias</strong>${percent(item.change30d)}</span>
            </div>
          </div>
        </div>
        ${makeChart(item.history || [], "large")}
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelectorAll("[data-close-modal]").forEach(button => {
      button.addEventListener("click", () => modal.remove());
    });

    if (window.CCMCardApis) {
      window.CCMCardApis.init();
    }
  }

  function bindCards(container) {
    container.querySelectorAll("[data-spike-card]").forEach(el => {
      const payload = pagePayloads[Number(el.dataset.spikeIndex)];
      if (!payload) return;

      el.addEventListener("click", () => openModal(payload.item, payload.game, payload.windowKey));
      el.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(payload.item, payload.game, payload.windowKey);
        }
      });
    });
  }

  function renderGameFilters(data) {
    const target = document.querySelector("#spikes-game-filters");
    if (!target) return;

    const games = (data.games || []).filter(game => WINDOW_ORDER.some(windowKey => getItemsForWindow(game, windowKey).length > 0));
    if (!games.length) {
      target.innerHTML = `<span class="spike-loading">Nenhum jogo disponível.</span>`;
      return;
    }

    target.innerHTML = games.map(game => {
      const key = gameKey(game);
      return `
        <label class="spikes-game-filter-chip" data-game-filter-chip="${escapeHtml(key)}">
          <input type="checkbox" value="${escapeHtml(key)}" checked>
          <span>${escapeHtml(game.label)}</span>
        </label>
      `;
    }).join("");

    function applyFilter() {
      const checked = new Set(Array.from(target.querySelectorAll("input:checked")).map(input => input.value));
      document.querySelectorAll("[data-spike-game]").forEach(section => {
        section.hidden = !checked.has(section.dataset.spikeGame);
      });
      target.querySelectorAll("[data-game-filter-chip]").forEach(chip => {
        const input = chip.querySelector("input");
        chip.classList.toggle("is-active", Boolean(input?.checked));
      });
    }

    target.querySelectorAll("input").forEach(input => input.addEventListener("change", applyFilter));
    applyFilter();
  }

  function renderHeroSpike(data) {
    const hero = document.querySelector("#hero-spike-card");
    if (!hero) return;

    const fab = (data.games || []).find(game => game.code === "fab") || data.games?.[0];
    const items = getItemsForWindow(fab || {}, "daily");
    if (!items.length) {
      hero.innerHTML = `<span class="spike-loading">Nenhum spike encontrado.</span>`;
      return;
    }

    const item = items[Math.floor(Math.random() * items.length)];
    const heroPayloads = [];
    hero.innerHTML = cardTemplate(item, fab, "daily", heroPayloads, true);

    const card = hero.querySelector("[data-spike-card]");
    if (card) {
      card.addEventListener("click", () => openModal(item, fab, "daily"));
    }

    if (window.CCMCardApis) {
      window.CCMCardApis.init();
    }
  }

  async function initSpikes() {
    let data;
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
      data = await response.json();
    } catch (error) {
      console.warn("Erro ao carregar spikes:", error);
      return;
    }

    renderHeroSpike(data);

    const updated = document.querySelector("#spikes-updated-at");
    if (updated) {
      updated.textContent = `Atualizado em ${dateBR(data.updatedAt)} • Fonte: ${data.source || "JustTCG"}`;
    }

    const container = document.querySelector("#spikes-sections");
    if (!container) return;

    pagePayloads = [];
    const html = (data.games || []).map(game => sectionTemplate(game, pagePayloads)).join("");
    container.innerHTML = html || `<p class="spike-loading">Nenhum dado disponível. Rode o workflow “Atualizar spikes JustTCG”.</p>`;

    renderGameFilters(data);
    bindCards(container);

    if (window.CCMCardApis) {
      window.CCMCardApis.init();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSpikes);
  } else {
    initSpikes();
  }
})();

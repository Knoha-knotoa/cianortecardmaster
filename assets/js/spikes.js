/* Spikes JustTCG
   Lê assets/data/spikes.json e renderiza 4 listas diferentes por jogo:
   - top spikes do dia
   - top spikes da semana
   - top spikes do mês
   - cartas mais caras

   A atualização dos dados reais é feita pelo GitHub Actions usando a API JustTCG.
*/

(() => {
  const baseurl = window.CCM_BASEURL || "";
  const dataUrl = `${baseurl}/assets/data/spikes.json`;

  const WINDOW_CONFIG = {
    daily: {
      label: "Por dia",
      eyebrow: "Top spikes do dia",
      title: "Maiores altas das últimas 24h",
      description: "As 4 cartas que mais subiram no dia.",
      changeKey: "change1d"
    },
    weekly: {
      label: "Semana",
      eyebrow: "Top spikes da semana",
      title: "Maiores altas dos últimos 7 dias",
      description: "As 4 cartas que mais subiram na semana.",
      changeKey: "change7d"
    },
    monthly: {
      label: "Mês",
      eyebrow: "Top spikes do mês",
      title: "Maiores altas dos últimos 30 dias",
      description: "As 4 cartas que mais subiram no mês.",
      changeKey: "change30d"
    },
    expensive: {
      label: "Mais caras",
      eyebrow: "Cartas mais caras",
      title: "Maiores preços atuais",
      description: "As 4 cartas mais caras do jogo no momento.",
      changeKey: "price"
    }
  };

  const WINDOW_ORDER = ["daily", "weekly", "monthly", "expensive"];

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

  function normalizeHistory(history) {
    if (!Array.isArray(history)) return [];
    return history
      .map(point => ({
        t: Number(point.t || point.date || point.timestamp || 0),
        p: Number(point.p || point.price || point.value || 0)
      }))
      .filter(point => point.p > 0);
  }

  function makeChart(history, large = false) {
    const points = normalizeHistory(history);
    if (points.length < 2) {
      return `<div class="spike-chart-empty">Sem histórico suficiente</div>`;
    }

    const width = large ? 720 : 260;
    const height = large ? 260 : 86;
    const pad = large ? 28 : 8;
    const prices = points.map(p => p.p);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    const d = points.map((point, index) => {
      const x = pad + (index / (points.length - 1)) * (width - pad * 2);
      const y = height - pad - ((point.p - min) / range) * (height - pad * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(" ");

    const area = `${d} L ${width - pad} ${height - pad} L ${pad} ${height - pad} Z`;

    return `
      <svg class="spike-chart ${large ? "spike-chart-large" : ""}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfico de preço">
        <path class="spike-chart-area" d="${area}"></path>
        <path class="spike-chart-line" d="${d}"></path>
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
        <div class="spike-price-row">
          <strong>${money(item.price)}</strong>
          <span class="spike-rank">Preço atual</span>
        </div>
      `;
    }

    return `
      <div class="spike-price-row">
        <strong>${money(item.price)}</strong>
        <span class="spike-up">${percent(itemChange(item, windowKey))}</span>
      </div>
    `;
  }

  function cardTemplate(item, game, windowKey) {
    const apiGame = gameToImageApi(game.code);
    const history = item.history || [];
    return `
      <article class="spike-card" tabindex="0" role="button" data-spike-card>
        <div class="spike-card-top">
          <div class="tcg-card-image spike-card-image" data-game="${apiGame}" data-name="${escapeHtml(item.name)}">
            <span class="tcg-card-loading">Imagem</span>
          </div>
          <div class="spike-card-data">
            <p class="eyebrow">${escapeHtml(game.label)}</p>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.set || "Set não informado")}</p>
            ${metricTemplate(item, windowKey)}
          </div>
        </div>
        ${makeChart(history)}
      </article>
    `;
  }

  function getItemsForWindow(game, windowKey) {
    if (game.windows && Array.isArray(game.windows[windowKey])) {
      return game.windows[windowKey].slice(0, 4);
    }

    /* Compatibilidade com o JSON antigo: ele só tinha game.items com 7 dias.
       Para não repetir as mesmas cartas em Dia/Semana/Mês/Mais caras,
       usamos o legado apenas na seção Semana. Depois que o workflow rodar,
       o JSON novo trará game.windows.daily/weekly/monthly/expensive. */
    if (windowKey === "weekly" && Array.isArray(game.items)) {
      return game.items.slice(0, 4);
    }

    return [];
  }

  function windowSectionTemplate(game, windowKey) {
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
          <span>4 cartas</span>
        </div>
        <div class="spike-row">
          ${items.map(item => cardTemplate(item, game, windowKey)).join("")}
        </div>
      </section>
    `;
  }

  function sectionTemplate(game) {
    const hasAnyItem = WINDOW_ORDER.some(windowKey => getItemsForWindow(game, windowKey).length > 0);
    if (!hasAnyItem) return "";

    return `
      <section class="spike-game-section" data-spike-game="${escapeHtml(game.code || game.id || game.label)}">
        <div class="spike-section-title">
          <div>
            <p class="eyebrow">Top spikes</p>
            <h2>${escapeHtml(game.label)}</h2>
          </div>
          <span>4 listas por jogo</span>
        </div>
        <div class="spike-window-stack">
          ${WINDOW_ORDER.map(windowKey => windowSectionTemplate(game, windowKey)).join("")}
        </div>
      </section>
    `;
  }

  function flattenCards(data) {
    const allCards = [];
    (data.games || []).forEach(game => {
      WINDOW_ORDER.forEach(windowKey => {
        getItemsForWindow(game, windowKey).forEach(item => allCards.push({ item, game, windowKey }));
      });
    });
    return allCards;
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
        <p class="eyebrow">${escapeHtml(game.label)} • ${escapeHtml(WINDOW_CONFIG[windowKey]?.label || "Spikes")}</p>
        <h2>${escapeHtml(item.name)}</h2>
        <p>${escapeHtml(item.set || "Set não informado")} ${item.variant ? "• " + escapeHtml(item.variant) : ""}</p>
        <div class="spike-modal-metrics">
          <span><strong>Preço atual</strong>${money(item.price)}</span>
          <span><strong>24h</strong>${percent(item.change1d ?? item.change24h ?? item.change24hr)}</span>
          <span><strong>7 dias</strong>${percent(item.change7d)}</span>
          <span><strong>30 dias</strong>${percent(item.change30d)}</span>
        </div>
        ${makeChart(item.history || [], true)}
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelectorAll("[data-close-modal]").forEach(button => {
      button.addEventListener("click", () => modal.remove());
    });
  }

  function bindCards(container, data) {
    const allCards = flattenCards(data);

    container.querySelectorAll("[data-spike-card]").forEach((el, index) => {
      const payload = allCards[index];
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

  function bindJumpButtons() {
    document.querySelectorAll("[data-spike-jump]").forEach(button => {
      button.addEventListener("click", () => {
        const target = document.querySelector(`[data-spike-window-section="${button.dataset.spikeJump}"]`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderHeroSpike(data) {
    const hero = document.querySelector("#hero-spike-card");
    if (!hero) return;

    const fab = (data.games || []).find(game => game.code === "fab") || data.games?.[0];
    const items = getItemsForWindow(fab || {}, "weekly").concat(getItemsForWindow(fab || {}, "daily"));
    if (!items.length) {
      hero.innerHTML = `<span class="spike-loading">Nenhum spike encontrado.</span>`;
      return;
    }

    const item = items[Math.floor(Math.random() * items.length)];
    hero.innerHTML = cardTemplate(item, fab, "weekly");

    const card = hero.querySelector("[data-spike-card]");
    if (card) {
      card.addEventListener("click", () => openModal(item, fab, "weekly"));
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
    bindJumpButtons();

    const updated = document.querySelector("#spikes-updated-at");
    if (updated) {
      updated.textContent = `Atualizado em ${dateBR(data.updatedAt)} • Fonte: ${data.source || "JustTCG"}`;
    }

    const container = document.querySelector("#spikes-sections");
    if (!container) return;

    const html = (data.games || []).map(sectionTemplate).join("");
    container.innerHTML = html || `<p class="spike-loading">Nenhum dado disponível. Rode o workflow “Atualizar spikes JustTCG”.</p>`;

    bindCards(container, data);

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

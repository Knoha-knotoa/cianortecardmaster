/* Spikes JustTCG - lê assets/data/spikes.json e renderiza cards + gráficos.
   A atualização dos dados reais é feita pelo GitHub Actions usando a API JustTCG.
*/

(() => {
  const baseurl = window.CCM_BASEURL || "";
  const dataUrl = `${baseurl}/assets/data/spikes.json`;

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
    return new Date(value).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
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

  function cardTemplate(item, game) {
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
            <div class="spike-price-row">
              <strong>${money(item.price)}</strong>
              <span class="spike-up">${percent(item.change7d ?? item.change30d)}</span>
            </div>
          </div>
        </div>
        ${makeChart(history)}
      </article>
    `;
  }

  function sectionTemplate(game) {
    const items = Array.isArray(game.items) ? game.items.slice(0, 4) : [];
    if (!items.length) return "";

    return `
      <section class="spike-game-section">
        <div class="spike-section-title">
          <div>
            <p class="eyebrow">Top spikes</p>
            <h2>${escapeHtml(game.label)}</h2>
          </div>
          <span>Até 4 cartas</span>
        </div>
        <div class="spike-row">
          ${items.map(item => cardTemplate(item, game)).join("")}
        </div>
      </section>
    `;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function openModal(item, game) {
    const existing = document.querySelector(".spike-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.className = "spike-modal";
    modal.innerHTML = `
      <div class="spike-modal-backdrop" data-close-modal></div>
      <div class="spike-modal-card" role="dialog" aria-modal="true">
        <button class="spike-modal-close" type="button" data-close-modal>×</button>
        <p class="eyebrow">${escapeHtml(game.label)}</p>
        <h2>${escapeHtml(item.name)}</h2>
        <p>${escapeHtml(item.set || "Set não informado")} ${item.variant ? "• " + escapeHtml(item.variant) : ""}</p>
        <div class="spike-modal-metrics">
          <span><strong>Preço atual</strong>${money(item.price)}</span>
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
    const allCards = [];
    data.games.forEach(game => {
      (game.items || []).forEach(item => allCards.push({ item, game }));
    });

    container.querySelectorAll("[data-spike-card]").forEach((el, index) => {
      const payload = allCards[index];
      if (!payload) return;

      el.addEventListener("click", () => openModal(payload.item, payload.game));
      el.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(payload.item, payload.game);
        }
      });
    });
  }

  function renderHeroSpike(data) {
    const hero = document.querySelector("#hero-spike-card");
    if (!hero) return;

    const fab = (data.games || []).find(game => game.code === "fab") || data.games?.[0];
    const items = fab?.items || [];
    if (!items.length) {
      hero.innerHTML = `<span class="spike-loading">Nenhum spike encontrado.</span>`;
      return;
    }

    const item = items[Math.floor(Math.random() * items.length)];
    hero.innerHTML = cardTemplate(item, fab);

    const card = hero.querySelector("[data-spike-card]");
    if (card) {
      card.addEventListener("click", () => openModal(item, fab));
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

    container.innerHTML = (data.games || []).map(sectionTemplate).join("");

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

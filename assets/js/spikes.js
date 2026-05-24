/* Spikes JustTCG + TCGCSV
   Lê assets/data/spikes.json e renderiza listas por jogo.
   A atualização dos dados reais é feita pelo GitHub Actions para não expor chaves no navegador.
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
    }
  };

  // A página de Spikes agora mostra apenas altas das últimas 24h.
  const WINDOW_ORDER = ["daily"];
  let pagePayloads = [];

  function numberOrNull(value) {
    if (value === null || value === undefined || value === "") return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function money(value) {
    const n = numberOrNull(value);
    if (n === null) return "—";
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function brl(value) {
    const n = numberOrNull(value);
    if (n === null) return "—";
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function percent(value) {
    const n = numberOrNull(value);
    if (n === null) return "—";
    const sign = n > 0 ? "+" : "";
    return `${sign}${n.toFixed(1)}%`;
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

  function gameKey(game) {
    return String(game.code || game.id || game.label || "jogo").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  }

  function itemChange(item, windowKey) {
    if (windowKey === "daily") return item.change1d ?? item.change24h ?? item.change24hr ?? item.change7d ?? item.change30d;
    if (windowKey === "weekly") return item.change7d ?? item.change30d ?? item.change1d;
    if (windowKey === "monthly") return item.change30d ?? item.change7d ?? item.change1d;
    return item.price;
  }

  function sourceJusttcg(item) {
    return item.sources?.justtcg || { price: item.justtcgPrice ?? item.price, variant: item.variant || "" };
  }

  function sourceTcgplayer(item) {
    return item.sources?.tcgplayer || null;
  }

  function tcgReference(item, multiplier) {
    const tcg = sourceTcgplayer(item);
    const key = `x${multiplier}`;
    const direct = numberOrNull(tcg?.referenceBRL?.[key] ?? item.tcgplayerReference?.[key]);
    if (direct !== null) return direct;

    const tcgPrice = numberOrNull(tcg?.price ?? item.tcgplayerPrice);
    if (tcgPrice === null) return null;
    return Math.round(tcgPrice * multiplier * 100) / 100;
  }

  function metricBox(label, value, extraClass = "") {
    return `
      <div class="spike-metric-box ${extraClass}">
        <strong>${value}</strong>
        <span>${label}</span>
      </div>
    `;
  }

  function metricTemplate(item, game, windowKey, compact = false) {
    const justtcg = sourceJusttcg(item);
    const tcg = sourceTcgplayer(item);
    const isFab = game?.code === "fab";
    const boxes = [];

    boxes.push(metricBox("Variação 24h", percent(itemChange(item, windowKey)), "spike-metric-up"));
    boxes.push(metricBox("JustTCG", money(justtcg.price ?? item.price)));

    if (isFab) {
      boxes.push(metricBox("TCGplayer", money(tcg?.price ?? item.tcgplayerPrice)));

      if (!compact) {
        boxes.push(metricBox("TCG x5", brl(tcgReference(item, 5)), "spike-metric-brl"));
        boxes.push(metricBox("TCG x6", brl(tcgReference(item, 6)), "spike-metric-brl"));
        boxes.push(metricBox("TCG x7", brl(tcgReference(item, 7)), "spike-metric-brl"));
      }
    }

    return `<div class="spike-metrics-grid ${isFab ? "spike-metrics-grid-fab" : ""} ${compact ? "spike-metrics-grid-compact" : ""}">${boxes.join("")}</div>`;
  }

  function sourceNoteTemplate(item, game) {
    const justtcg = sourceJusttcg(item);
    const tcg = sourceTcgplayer(item);

    if (game?.code !== "fab") {
      return `<p class="spike-source-note">Preço: JustTCG${justtcg.variant ? " • " + escapeHtml(justtcg.variant) : ""}</p>`;
    }

    if (tcg?.price) {
      const subtype = tcg.subTypeName ? ` • ${escapeHtml(tcg.subTypeName)}` : "";
      return `<p class="spike-source-note">Preço: JustTCG + TCGplayer via TCGCSV${subtype}</p>`;
    }

    return `<p class="spike-source-note spike-source-note-warning">TCGplayer via TCGCSV: aguardando atualização ou sem correspondência</p>`;
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
    return item.imageUrl || item.image_url || item.image || item.imageSmall || item.imageLarge || item.sources?.justtcg?.imageUrl || item.sources?.tcgplayer?.imageUrl || "";
  }

  function cardAltText(item, game) {
    const pieces = [
      `Carta ${item.name || "sem nome"}`,
      game?.label ? `de ${game.label}` : "",
      item.set ? `do set ${item.set}` : "",
      "listada nos spikes de preço das últimas 24 horas"
    ].filter(Boolean);

    return pieces.join(" ");
  }

  function cardDataAttributes(item, game) {
    const apiGame = gameToImageApi(game.code);
    return `data-game="${apiGame}" data-name="${escapeHtml(fallbackCardName(item, game))}" data-pitch="${escapeHtml(fallbackPitch(item, game))}" data-set="${escapeHtml(item.set || "")}" data-number="${escapeHtml(item.number || "")}" data-alt="${escapeHtml(cardAltText(item, game))}"`;
  }

  function cardImageTemplate(item, game, extraClass = "") {
    const imageUrl = directImageUrl(item);
    const className = `spike-card-image ${extraClass}`.trim();
    const dataAttributes = cardDataAttributes(item, game);
    const alt = cardAltText(item, game);

    if (imageUrl) {
      return `
        <div class="${className} spike-card-image-direct" ${dataAttributes}>
          <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove(); this.parentElement.classList.remove('spike-card-image-direct'); this.parentElement.classList.add('tcg-card-image'); this.parentElement.dataset.imageError='api-fallback'; window.CCMCardApis && window.CCMCardApis.load(this.parentElement);">
          <span class="tcg-card-loading">Imagem</span>
        </div>
      `;
    }

    return `
      <div class="tcg-card-image ${className}" ${dataAttributes}>
        <span class="tcg-card-loading">Imagem</span>
      </div>
    `;
  }

  function cardTemplate(item, game, windowKey, payloads, compact = false) {
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
          ${metricTemplate(item, game, windowKey, compact)}
          ${sourceNoteTemplate(item, game)}
        </div>
      </article>
    `;
  }

  function getItemsForWindow(game, windowKey) {
    if (game.windows && Array.isArray(game.windows[windowKey])) {
      return game.windows[windowKey].slice(0, 9);
    }

    if ((windowKey === "weekly" || windowKey === "daily") && Array.isArray(game.items)) {
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
    const sourceLabel = game.code === "fab" ? "JustTCG + TCGplayer/TCGCSV" : "JustTCG";

    return `
      <section class="spike-game-section" data-spike-game="${escapeHtml(key)}">
        <div class="spike-section-title">
          <div>
            <p class="eyebrow">Top spikes</p>
            <h2>${escapeHtml(game.label)}</h2>
          </div>
          <span>Até 9 cartas nas últimas 24h • ${escapeHtml(sourceLabel)}</span>
        </div>
        <div class="spike-window-stack">
          ${WINDOW_ORDER.map(windowKey => windowSectionTemplate(game, windowKey, payloads)).join("")}
        </div>
      </section>
    `;
  }

  function modalMetricList(item, game, windowKey) {
    const justtcg = sourceJusttcg(item);
    const tcg = sourceTcgplayer(item);
    const isFab = game?.code === "fab";

    const rows = [
      `<span><strong>Variação 24h</strong>${percent(itemChange(item, windowKey))}</span>`,
      `<span><strong>JustTCG</strong>${money(justtcg.price ?? item.price)}</span>`
    ];

    if (isFab) {
      rows.push(`<span><strong>TCGplayer</strong>${money(tcg?.price ?? item.tcgplayerPrice)}</span>`);
      rows.push(`<span><strong>TCG x5</strong>${brl(tcgReference(item, 5))}</span>`);
      rows.push(`<span><strong>TCG x6</strong>${brl(tcgReference(item, 6))}</span>`);
      rows.push(`<span><strong>TCG x7</strong>${brl(tcgReference(item, 7))}</span>`);
    }

    return rows.join("");
  }

  function sourceDetailsTemplate(item, game) {
    if (game?.code !== "fab") {
      return `<p class="spike-modal-source-text">Fonte de preço: JustTCG.</p>`;
    }

    const tcg = sourceTcgplayer(item);
    if (!tcg?.price) {
      return `<p class="spike-modal-source-text">Fonte de preço: JustTCG. O campo TCGplayer/TCGCSV aparecerá quando o workflow encontrar correspondência da carta no TCGCSV.</p>`;
    }

    const details = [
      `Produto TCGplayer: ${escapeHtml(tcg.productName || "não informado")}`,
      tcg.subTypeName ? `variante: ${escapeHtml(tcg.subTypeName)}` : "",
      tcg.marketPrice ? `market: ${money(tcg.marketPrice)}` : "",
      tcg.midPrice ? `mid: ${money(tcg.midPrice)}` : "",
      tcg.lowPrice ? `low: ${money(tcg.lowPrice)}` : ""
    ].filter(Boolean).join(" • ");

    return `<p class="spike-modal-source-text">Fonte de preço: JustTCG + TCGplayer via TCGCSV. ${details}</p>`;
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
              ${modalMetricList(item, game, windowKey)}
            </div>
            ${sourceDetailsTemplate(item, game)}
          </div>
        </div>
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

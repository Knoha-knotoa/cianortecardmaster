/* Comunidade: paginação do feed social e estatísticas do Armory. */
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
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];
    } catch (error) {
      console.warn("Erro ao ler dados de Armory:", error);
      return [];
    }
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

  function renderLatestArmory(items) {
    const target = document.querySelector("#latest-armory-card");
    if (!target) return;
    const latest = items[0];
    if (!latest) return;

    const results = Array.isArray(latest.results) ? latest.results : [];
    const podium = results.slice(0, 8).map((result, index) => {
      const player = getPlayer(result) || "Jogador";
      const hero = getHero(result) || "Herói não informado";
      const record = result.record || result.campanha || "";
      return `
        <li>
          <span>${index + 1}º</span>
          <strong>${escapeHtml(player)}</strong>
          <em>${escapeHtml(hero)}${record ? " • " + escapeHtml(record) : ""}</em>
        </li>
      `;
    }).join("");

    target.innerHTML = `
      <p class="eyebrow">Último Armory</p>
      <h3>${escapeHtml(latest.title || "Resultado Armory")}</h3>
      <p>${dateLabel(latest.date)}${latest.summary ? " • " + escapeHtml(latest.summary) : ""}</p>
      ${podium ? `<ol class="latest-armory-podium">${podium}</ol>` : `<p class="empty-section">Resultado sem lista de jogadores.</p>`}
      ${latest.url ? `<a class="btn btn-secondary" href="${latest.url}">Ver resultado completo</a>` : ""}
    `;
  }

  function renderArmoryStats() {
    const allArmories = parseArmoryData();

    document.querySelectorAll("#armory-player-month, #armory-hero-month").forEach(el => {
      el.textContent = monthLabel();
    });

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

  function initBlogFilter() {
    const items = Array.from(document.querySelectorAll("[data-blog-feed-item]"));
    const filters = Array.from(document.querySelectorAll("[data-blog-filter]"));
    if (!items.length || !filters.length) return;

    filters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        const active = filter.dataset.blogFilter || "all";
        filters.forEach(item => item.classList.toggle("is-active", item === filter));
        items.forEach(item => {
          item.hidden = active !== "all" && item.dataset.blogCategory !== active;
        });
      });
    });
  }

  function initDeckFilter() {
    const items = Array.from(document.querySelectorAll("[data-deck-feed-item]"));
    const filters = Array.from(document.querySelectorAll("[data-deck-filter]"));
    if (!items.length || !filters.length) return;

    filters.forEach(filter => {
      filter.addEventListener("click", event => {
        event.preventDefault();
        const active = filter.dataset.deckFilter || "all";
        filters.forEach(item => item.classList.toggle("is-active", item === filter));
        items.forEach(item => {
          item.hidden = active !== "all" && item.dataset.deckFormat !== active;
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initBlogFilter();
      initDeckFilter();
      initCommunityPagination();
      renderArmoryStats();
    });
  } else {
    initBlogFilter();
    initDeckFilter();
    initCommunityPagination();
    renderArmoryStats();
  }
})();

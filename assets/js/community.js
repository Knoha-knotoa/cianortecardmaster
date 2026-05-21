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

  function assetUrl(path) {
    const base = String(window.CCM_BASEURL || "").replace(/\/$/, "");
    const normalized = String(path || "");
    if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith("data:")) return normalized;
    return `${base}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
  }

  const armoryIcons = {
    depth: {
      badge: assetUrl("/assets/img/armory-icons/depth/badge-armory.png"),
      champion: assetUrl("/assets/img/armory-icons/depth/badge-campeao.png"),
      placement: assetUrl("/assets/img/armory-icons/depth/badge-colocacao.png"),
      trophy: assetUrl("/assets/img/armory-icons/depth/icon-trofeu.png"),
      swords: assetUrl("/assets/img/armory-icons/depth/icon-espadas.png"),
      people: assetUrl("/assets/img/armory-icons/depth/icon-pessoas.png"),
      cards: assetUrl("/assets/img/armory-icons/depth/icon-cartas.png"),
      calendar: assetUrl("/assets/img/armory-icons/depth/icon-calendario.png")
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
    "ira, scarlet revenger": "Ira, Crimson Haze",
    "dash i/o": "Dash I-O"
  };

  function canonicalHeroName(value) {
    const clean = cleanHeroName(value);
    if (!clean) return "";
    return heroNameAliases[clean.toLowerCase()] || clean;
  }

  function heroAssetCandidates(heroName) {
    const canonical = canonicalHeroName(heroName);
    if (!canonical) return [];
    const encoded = encodeURIComponent(canonical);
    return [
      assetUrl(`/assets/img/fab-heroes/${encoded}.webp`),
      assetUrl(`/assets/img/fab-heroes/${encoded}.png`)
    ];
  }

  function tryLoadImage(candidates = []) {
    const list = Array.isArray(candidates) ? [...candidates].filter(Boolean) : [];
    return new Promise(resolve => {
      const attempt = () => {
        const src = list.shift();
        if (!src) {
          resolve("");
          return;
        }
        const img = new Image();
        img.loading = "lazy";
        img.onload = () => resolve(src);
        img.onerror = attempt;
        img.src = src;
      };
      attempt();
    });
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
          shortName: shortHeroName(rawHero),
          icon: result.hero_icon || result.heroIcon || result.icon || ""
        });
      }
    });
    return Array.from(map.values());
  }

  function iconImage(src, className, alt = "") {
    return `<img class="${className}" src="${src}" alt="${escapeHtml(alt)}" loading="lazy">`;
  }

  function heroBadge(hero, icon = "", size = "normal") {
    const clean = canonicalHeroName(hero);
    const label = clean || "Herói não informado";
    const resolvedIcon = icon ? assetUrl(icon) : "";
    return `
      <span class="armory-hero-badge armory-hero-badge-${size}" data-hero-name="${escapeHtml(clean)}" data-hero-icon="${escapeHtml(resolvedIcon)}" title="${escapeHtml(label)}">
        <span class="armory-hero-initials">${escapeHtml(heroInitials(label))}</span>
      </span>
    `;
  }

  async function loadHeroBadge(badge) {
    if (!badge || badge.dataset.loaded === "true") return;
    badge.dataset.loaded = "true";

    const heroName = canonicalHeroName(badge.dataset.heroName);
    const explicitIcon = badge.dataset.heroIcon || "";

    function applyImage(src) {
      if (!src) return;
      const img = new Image();
      img.loading = "lazy";
      img.alt = heroName || "Herói";
      img.onload = () => {
        badge.classList.add("has-image");
        badge.replaceChildren(img);
      };
      img.src = src;
    }

    if (!heroName) return;

    const localIcon = await tryLoadImage(explicitIcon ? [explicitIcon, ...heroAssetCandidates(heroName)] : heroAssetCandidates(heroName));
    if (localIcon) {
      applyImage(localIcon);
      return;
    }

    if (!window.CCMCardApis?.getImageUrl) return;

    try {
      const imageUrl = await window.CCMCardApis.getImageUrl("fab", heroName);
      applyImage(imageUrl);
    } catch (error) {
      console.warn("Imagem do herói indisponível:", heroName, error);
    }
  }

  function initArmoryHeroBadges(scope = document) {
    scope.querySelectorAll(".armory-hero-badge[data-hero-name]").forEach(loadHeroBadge);
  }

  function renderLatestArmory(items) {
    const target = document.querySelector("#latest-armory-card");
    if (!target) return;
    const latest = items[0];
    if (!latest) return;

    const results = Array.isArray(latest.results) ? latest.results : [];
    const playerCount = new Set(results.map(getPlayer).filter(Boolean)).size || results.length;
    const rounds = roundsFromResults(results, latest.rounds);
    const game = latest.game || "Flesh and Blood";
    const nextArmory = latest.next_armory || latest.nextArmory || "Quarta • 19:00";
    const heroes = uniqueHeroes(results);

    const rows = results.slice(0, 12).map((result, index) => {
      const player = getPlayer(result) || "Jogador";
      const hero = cleanHeroName(getHero(result)) || "Herói não informado";
      const heroName = shortHeroName(hero);
      const record = result.record || result.campanha || result.score || "";
      const heroIcon = result.hero_icon || result.heroIcon || result.icon || "";
      return `
        <li class="armory-result-row${index === 0 ? " is-champion" : ""}">
          <span class="armory-rank-badge" aria-label="${index + 1}º colocado">${index + 1}º</span>
          <div class="armory-player-cell">
            ${heroBadge(hero, heroIcon, index === 0 ? "featured" : "normal")}
            <div>
              <strong>${escapeHtml(player)}</strong>
              <small>${escapeHtml(heroName)}</small>
            </div>
          </div>
          <span class="armory-hero-name" title="${escapeHtml(hero)}">${escapeHtml(heroName)}</span>
          <span class="armory-record">${iconImage(armoryIcons.flat.trophy, "armory-record-icon", "")}${escapeHtml(record || "-")}</span>
        </li>
      `;
    }).join("");

    const statItems = [
      { icon: armoryIcons.depth.people, label: "Jogadores", value: playerCount || "-" },
      { icon: armoryIcons.depth.swords, label: "Rodadas", value: rounds || "-" },
      { icon: armoryIcons.depth.cards, label: "Jogo", value: game },
      { icon: armoryIcons.depth.calendar, label: "Próximo Armory", value: nextArmory }
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
          <p>${dateLabel(latest.date)}${latest.summary ? " • " + escapeHtml(latest.summary) : ""}</p>
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
        ${latest.url ? `<a class="btn armory-btn-primary" href="${latest.url}">${iconImage(armoryIcons.flat.trophy, "armory-btn-icon", "")}Ver resultado completo</a>` : ""}
        <a class="btn armory-btn-secondary" href="#armory-historico">Ver histórico</a>
      </div>
    `;

    initArmoryHeroBadges(target);
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

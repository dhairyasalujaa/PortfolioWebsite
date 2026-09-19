function filterBlocks(blocks, style, query) {
  const normalized = query.trim().toLowerCase();
  return blocks.filter((block) => {
    const matchesStyle = style === "all" || block.style === style;
    const haystack = `${block.name} ${block.type} ${block.description}`.toLowerCase();
    return matchesStyle && (!normalized || haystack.includes(normalized));
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function miniature(type) {
  const key = type.toLowerCase().replaceAll(" ", "-");
  const patterns = {
    navigation: '<span class="mini-nav-line"></span><span class="mini-nav-links"></span><span class="mini-nav-action"></span>',
    hero: '<span class="mini-copy"><i></i><i></i><i></i></span><span class="mini-visual"></span>',
    projects: '<span class="mini-project"></span><span class="mini-project"></span><span class="mini-project"></span>',
    features: '<span class="mini-feature mini-feature--large"></span><span class="mini-feature"></span><span class="mini-feature"></span>',
    "social-proof": '<span class="mini-quote">“</span><span class="mini-proof-lines"></span>',
    "call-to-action": '<span class="mini-cta-copy"></span><span class="mini-cta-button"></span>',
    footer: '<span class="mini-footer-brand"></span><span class="mini-footer-col"></span><span class="mini-footer-col"></span>',
    pricing: '<span class="mini-price"></span><span class="mini-price mini-price--focus"></span><span class="mini-price"></span>',
    faq: '<span class="mini-faq"></span><span class="mini-faq"></span><span class="mini-faq"></span>',
    team: '<span class="mini-person"></span><span class="mini-person"></span><span class="mini-person"></span>',
    statistics: '<span class="mini-stat">12</span><span class="mini-stat">48</span><span class="mini-stat">06</span>',
    newsletter: '<span class="mini-news-copy"></span><span class="mini-news-input"></span>',
    "contact-form": '<span class="mini-form-copy"></span><span class="mini-form-fields"></span>',
  };
  return patterns[key] || patterns.hero;
}

function renderBlocks(blocks, container) {
  container.innerHTML = blocks
    .map(
      (block) => `
        <article class="block-card block-card--${escapeHtml(block.style)}">
          <div class="block-card__preview mini mini--${escapeHtml(block.type.toLowerCase().replaceAll(" ", "-"))}" aria-hidden="true">
            ${miniature(block.type)}
          </div>
          <div class="block-card__meta">
            <span>${escapeHtml(block.style)}</span>
            <span>${escapeHtml(block.files)}</span>
          </div>
          <h3>${escapeHtml(block.name)}</h3>
          <p>${escapeHtml(block.description)}</p>
          <a href="blocks/${encodeURIComponent(block.id)}/index.html">Open preview</a>
        </article>`,
    )
    .join("");
}

if (typeof document !== "undefined") {
  const grid = document.querySelector("#block-grid");
  const search = document.querySelector("#block-search");
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty-state");
  const filters = document.querySelectorAll("[data-style-filter]");
  let activeStyle = "all";

  function updateCatalogue() {
    const results = filterBlocks(window.BLOCKS, activeStyle, search.value);
    renderBlocks(results, grid);
    count.textContent = `${results.length} ${results.length === 1 ? "block" : "blocks"}`;
    empty.hidden = results.length !== 0;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeStyle = button.dataset.styleFilter;
      filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      updateCatalogue();
    });
  });

  search.addEventListener("input", updateCatalogue);
  updateCatalogue();
}

if (typeof module !== "undefined") {
  module.exports = { filterBlocks, renderBlocks };
}

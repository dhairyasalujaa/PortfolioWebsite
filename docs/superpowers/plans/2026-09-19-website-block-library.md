# Website Block Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, framework-free catalogue of 36 independently copyable HTML/CSS website blocks in four visual styles.

**Architecture:** A neutral catalogue reads a static browser-safe metadata file and filters preview cards with a small testable script. Each block lives in its own self-contained folder with complete HTML, scoped CSS, instructions, and optional vanilla JavaScript; four demo pages assemble the core packs to prove cross-section compatibility.

**Tech Stack:** Semantic HTML5, modern CSS, vanilla JavaScript, Node.js standard-library tests, local Node HTTP preview server.

**Spec:** `docs/superpowers/specs/2026-09-19-website-block-library-design.md`

## Global Constraints

- Create runtime files only under `website-blocks/`; do not modify the root portfolio, `portfolio-redesign/`, `.claude/`, or `v2/`.
- Produce exactly 36 numbered block folders using the identifiers in this plan.
- Every block is self-contained and imports no parent-folder stylesheet, package, font, image, icon library, or remote runtime dependency.
- Every block contains non-empty `index.html`, `style.css`, and `README.md`; add `script.js` only for mobile menus or the product FAQ.
- Every HTML file contains an appropriate semantic root landmark, a root class matching its metadata, a viewport meta tag, and `<!-- EDIT: ... -->` comments.
- Every stylesheet begins with editable theme variables, scopes component selectors under its root class, provides visible `:focus-visible` styling, includes a `720px` mobile breakpoint, and handles reduced motion when motion exists.
- Blocks work from 320px phones through wide desktops, retain readable content without JavaScript, and use 44px minimum interactive targets.
- Sample copy is credible but fictional, with no fake attribution to real people, invented performance claims, or proprietary source code.
- Every block README contains `Use it for`, `Files`, `Edit first`, `Behavior`, and `Accessibility` sections.
- Preserve all unrelated dirty-worktree changes.

---

### Task 1: Library contract, metadata, and test harness

**Files:**
- Create: `website-blocks/block-data.js`
- Create: `website-blocks/README.md`
- Create: `website-blocks/tests/blocks.test.js`
- Create: `website-blocks/tests/server.js`

**Interfaces:**
- Produces: `BLOCKS: Array<{id, name, style, type, description, files, rootClass}>` on `window` and through `module.exports`.
- Produces: `implementedIds: string[]` in the test file; later tasks append their completed identifiers.
- Produces: preview server command `node website-blocks/tests/server.js` on `127.0.0.1:4174`.

- [ ] **Step 1: Write the failing metadata test**

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "block-data.js");
assert.ok(fs.existsSync(dataPath), "Missing block-data.js");

const { BLOCKS } = require(dataPath);
assert.equal(BLOCKS.length, 36, "The catalogue must contain exactly 36 blocks");
assert.equal(new Set(BLOCKS.map((block) => block.id)).size, 36, "Block ids must be unique");
assert.equal(new Set(BLOCKS.map((block) => block.rootClass)).size, 36, "Root classes must be unique");
```

- [ ] **Step 2: Run the test and verify the missing metadata failure**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `Missing block-data.js`.

- [ ] **Step 3: Create the complete metadata contract**

`block-data.js` must expose these exact records, adding a one-sentence practical description and `files: "HTML · CSS"` or `files: "HTML · CSS · JS"` to each:

```js
const BLOCKS = [
  ["01-studio-navigation", "Studio Navigation", "studio", "Navigation", "studio-nav"],
  ["02-studio-hero", "Studio Hero", "studio", "Hero", "studio-hero"],
  ["03-studio-projects", "Studio Projects", "studio", "Projects", "studio-projects"],
  ["04-studio-features", "Studio Features", "studio", "Features", "studio-features"],
  ["05-studio-social-proof", "Studio Social Proof", "studio", "Social proof", "studio-proof"],
  ["06-studio-contact-cta", "Studio Contact CTA", "studio", "Call to action", "studio-cta"],
  ["07-studio-footer", "Studio Footer", "studio", "Footer", "studio-footer"],
  ["08-brutal-navigation", "Brutal Navigation", "brutal", "Navigation", "brutal-nav"],
  ["09-brutal-hero", "Brutal Hero", "brutal", "Hero", "brutal-hero"],
  ["10-brutal-projects", "Brutal Projects", "brutal", "Projects", "brutal-projects"],
  ["11-brutal-features", "Brutal Features", "brutal", "Features", "brutal-features"],
  ["12-brutal-social-proof", "Brutal Social Proof", "brutal", "Social proof", "brutal-proof"],
  ["13-brutal-contact-cta", "Brutal Contact CTA", "brutal", "Call to action", "brutal-cta"],
  ["14-brutal-footer", "Brutal Footer", "brutal", "Footer", "brutal-footer"],
  ["15-product-navigation", "Product Navigation", "product", "Navigation", "product-nav"],
  ["16-product-hero", "Product Hero", "product", "Hero", "product-hero"],
  ["17-product-projects", "Product Showcase", "product", "Projects", "product-projects"],
  ["18-product-features", "Product Features", "product", "Features", "product-features"],
  ["19-product-social-proof", "Product Social Proof", "product", "Social proof", "product-proof"],
  ["20-product-contact-cta", "Product Contact CTA", "product", "Call to action", "product-cta"],
  ["21-product-footer", "Product Footer", "product", "Footer", "product-footer"],
  ["22-editorial-navigation", "Editorial Navigation", "editorial", "Navigation", "editorial-nav"],
  ["23-editorial-hero", "Editorial Hero", "editorial", "Hero", "editorial-hero"],
  ["24-editorial-projects", "Editorial Projects", "editorial", "Projects", "editorial-projects"],
  ["25-editorial-features", "Editorial Features", "editorial", "Features", "editorial-features"],
  ["26-editorial-social-proof", "Editorial Social Proof", "editorial", "Social proof", "editorial-proof"],
  ["27-editorial-contact-cta", "Editorial Contact CTA", "editorial", "Call to action", "editorial-cta"],
  ["28-editorial-footer", "Editorial Footer", "editorial", "Footer", "editorial-footer"],
  ["29-studio-pricing", "Studio Pricing", "specialty", "Pricing", "studio-pricing"],
  ["30-editorial-pricing", "Editorial Pricing", "specialty", "Pricing", "editorial-pricing"],
  ["31-product-faq", "Product FAQ", "specialty", "FAQ", "product-faq"],
  ["32-brutal-faq", "Brutal FAQ", "specialty", "FAQ", "brutal-faq"],
  ["33-studio-team", "Studio Team", "specialty", "Team", "studio-team"],
  ["34-brutal-stats", "Brutal Stats", "specialty", "Statistics", "brutal-stats"],
  ["35-product-newsletter", "Product Newsletter", "specialty", "Newsletter", "product-newsletter"],
  ["36-editorial-contact-form", "Editorial Contact Form", "specialty", "Contact form", "editorial-contact"],
].map(([id, name, style, type, rootClass]) => ({
  id,
  name,
  style,
  type,
  rootClass,
  description: DESCRIPTION_BY_ID[id],
  files: ["01-studio-navigation", "08-brutal-navigation", "15-product-navigation", "22-editorial-navigation", "31-product-faq"].includes(id)
    ? "HTML · CSS · JS"
    : "HTML · CSS",
}));

if (typeof window !== "undefined") window.BLOCKS = BLOCKS;
if (typeof module !== "undefined") module.exports = { BLOCKS };
```

Define `DESCRIPTION_BY_ID` above the array with a specific description for all 36 ids; do not reuse one generic sentence.

- [ ] **Step 4: Create the root usage guide and dependency-free server**

The root README must explain browsing, copying a whole folder, editing `EDIT` markers and CSS variables, preserving optional scripts, and running both commands below:

```powershell
node website-blocks/tests/blocks.test.js
node website-blocks/tests/server.js
```

`tests/server.js` uses `node:http`, serves `website-blocks/`, maps `/` to `/index.html`, rejects resolved paths outside the library root, and listens on `127.0.0.1:4174`.

- [ ] **Step 5: Run the metadata test**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS with 36 unique metadata records.

- [ ] **Step 6: Commit the contract**

```powershell
git add -- website-blocks/block-data.js website-blocks/README.md website-blocks/tests
git commit -m "test: define website block library contract"
```

### Task 2: Polished catalogue and filtering behavior

**Files:**
- Create: `website-blocks/index.html`
- Create: `website-blocks/catalog.css`
- Create: `website-blocks/catalog.js`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Consumes: `window.BLOCKS` from `block-data.js`.
- Produces: `filterBlocks(blocks, style, query)` and `renderBlocks(blocks, container)` exported through `module.exports` for Node tests.
- Produces: `[data-style-filter]`, `#block-search`, `#result-count`, `#block-grid`, and `#empty-state` catalogue hooks.

- [ ] **Step 1: Add failing catalogue behavior tests**

```js
const { filterBlocks } = require(path.join(root, "catalog.js"));
const studioResults = filterBlocks(BLOCKS, "studio", "");
assert.equal(studioResults.length, 7);
assert.ok(studioResults.every((block) => block.style === "studio"));
assert.deepEqual(
  filterBlocks(BLOCKS, "all", "pricing").map((block) => block.id),
  ["29-studio-pricing", "30-editorial-pricing"],
);
assert.equal(filterBlocks(BLOCKS, "editorial", "navigation")[0].id, "22-editorial-navigation");
assert.equal(filterBlocks(BLOCKS, "studio", "accordion").length, 0);
```

- [ ] **Step 2: Run the test and verify the missing catalogue module failure**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL because `catalog.js` does not exist.

- [ ] **Step 3: Implement pure filter and render functions**

```js
function filterBlocks(blocks, style, query) {
  const normalized = query.trim().toLowerCase();
  return blocks.filter((block) => {
    const matchesStyle = style === "all" || block.style === style;
    const haystack = `${block.name} ${block.type} ${block.description}`.toLowerCase();
    return matchesStyle && (!normalized || haystack.includes(normalized));
  });
}
```

`renderBlocks` must produce article cards with style class, CSS miniature markup, metadata, file list, and `blocks/<id>/index.html` preview link. Escape metadata text before inserting it. Bind filter buttons and input events only inside a `document` guard. Update count and empty-state visibility after every filter.

- [ ] **Step 4: Build the catalogue document and visual system**

Create a semantic page with skip link, dark-neutral header, 36-block count, sticky filter/search bar, four style introductions and demo links, result count, grid, empty state, usage steps, and footer. Load `block-data.js` before `catalog.js`.

`catalog.css` uses a neutral ink `#111318`, paper `#f2f4f6`, electric blue `#3157ff`, and one family swatch per style. Build distinct CSS miniatures for navigation, hero, projects, features, proof, CTA, footer, pricing, FAQ, team, stats, newsletter, and form card types. Include visible focus, 44px controls, 720px and 420px breakpoints, and reduced motion.

- [ ] **Step 5: Run catalogue tests**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS for metadata and filter behavior.

- [ ] **Step 6: Commit the catalogue**

```powershell
git add -- website-blocks/index.html website-blocks/catalog.css website-blocks/catalog.js website-blocks/tests/blocks.test.js
git commit -m "feat: add polished website block catalogue"
```

### Task 3: Minimal studio core pack

**Files:**
- Create: `website-blocks/blocks/01-studio-navigation/{index.html,style.css,script.js,README.md}`
- Create: `website-blocks/blocks/02-studio-hero/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/03-studio-projects/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/04-studio-features/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/05-studio-social-proof/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/06-studio-contact-cta/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/07-studio-footer/{index.html,style.css,README.md}`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Produces: root classes `studio-nav`, `studio-hero`, `studio-projects`, `studio-features`, `studio-proof`, `studio-cta`, and `studio-footer`.
- Produces: `setStudioMenu(open, controls)` from block 01 for behavior testing.

- [ ] **Step 1: Add the reusable block validator and failing studio expectations**

```js
const implementedIds = [
  "01-studio-navigation", "02-studio-hero", "03-studio-projects",
  "04-studio-features", "05-studio-social-proof", "06-studio-contact-cta",
  "07-studio-footer",
];

function validateBlock(block) {
  const folder = path.join(root, "blocks", block.id);
  for (const file of ["index.html", "style.css", "README.md"]) {
    const filePath = path.join(folder, file);
    assert.ok(fs.existsSync(filePath), `${block.id} is missing ${file}`);
    assert.ok(fs.statSync(filePath).size > 100, `${block.id}/${file} is too small`);
  }
  const html = fs.readFileSync(path.join(folder, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(folder, "style.css"), "utf8");
  const guide = fs.readFileSync(path.join(folder, "README.md"), "utf8");
  assert.match(html, /name="viewport"/);
  assert.ok(html.includes(`class="${block.rootClass}`));
  assert.match(html, /<!-- EDIT:/);
  assert.doesNotMatch(html, /(href|src)="(\.\.\/|https?:\/\/)/);
  assert.match(css, /\/\* EDIT: theme \*\//);
  assert.ok(css.includes(`.${block.rootClass}`));
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  for (const heading of ["Use it for", "Files", "Edit first", "Behavior", "Accessibility"]) {
    assert.ok(guide.includes(`## ${heading}`), `${block.id} README is missing ${heading}`);
  }
}

for (const id of implementedIds) validateBlock(BLOCKS.find((block) => block.id === id));
```

- [ ] **Step 2: Run the test and verify `01-studio-navigation` is missing**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `01-studio-navigation is missing index.html`.

- [ ] **Step 3: Build the seven studio blocks**

Use this exact composition set:

- navigation: compact square monogram, four links, outlined inquiry action, accessible mobile drawer;
- hero: asymmetric 12-column headline, short studio statement, two actions, blue geometric SVG composition;
- projects: three editorial rows with title, discipline, year, and inline SVG artwork;
- features: three alternating service statements separated by fine rules, not cards;
- social proof: one large fictional quote attributed to “Mara Chen, Northline”, plus four text-only client marks;
- contact CTA: oversized question with email action and availability note;
- footer: brand statement, two link columns, location, and year.

Use palette `#eef1f4`, `#11151c`, `#3157ff`, `#a7b0bd`, `#ffffff`; system sans only. Every README names the exact theme variables and repeated element selector for its block.

- [ ] **Step 4: Test studio navigation behavior**

Require its script in Node, use fake `classList` and attribute maps, and assert `setStudioMenu(true)` sets `aria-expanded="true"`, `aria-hidden="false"`, and `.is-open`; assert the false case reverses all three.

- [ ] **Step 5: Run the studio tests**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS for all seven studio folders and menu behavior.

- [ ] **Step 6: Commit the studio pack**

```powershell
git add -- website-blocks/blocks/0[1-7]-studio-* website-blocks/tests/blocks.test.js
git commit -m "feat: add minimal studio website blocks"
```

### Task 4: Bold brutalist core pack

**Files:**
- Create: `website-blocks/blocks/08-brutal-navigation/{index.html,style.css,script.js,README.md}`
- Create: `website-blocks/blocks/09-brutal-hero/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/10-brutal-projects/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/11-brutal-features/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/12-brutal-social-proof/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/13-brutal-contact-cta/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/14-brutal-footer/{index.html,style.css,README.md}`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Produces: root classes `brutal-nav`, `brutal-hero`, `brutal-projects`, `brutal-features`, `brutal-proof`, `brutal-cta`, and `brutal-footer`.
- Produces: `setBrutalMenu(open, controls)` from block 08.

- [ ] **Step 1: Extend `implementedIds` with ids 08–14 and run RED**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `08-brutal-navigation is missing index.html`.

- [ ] **Step 2: Build the seven brutal blocks**

Use palette `#fff7df`, `#0b0b0b`, `#f03a24`, `#f2cc0d`, `#ffffff`, 3px borders, square corners, offset shadows, and system sans. Compositions:

- navigation: boxed wordmark, ticket-style links, red menu action;
- hero: poster headline, diagonal badge, three-line event facts, yellow CTA;
- projects: numbered vertical index with alternating red/yellow preview fields;
- features: four connected capability cells with deliberately uneven spans;
- social proof: two oversized quote fragments and a score strip;
- contact CTA: red full-width statement with black offset action;
- footer: dense sitemap framed by a heavy top rule and rotating-text visual accent disabled under reduced motion.

Instructions explicitly explain how to reduce border weight and replace the strong palette. Test `setBrutalMenu` using the same observable state contract as the studio menu.

- [ ] **Step 3: Run the brutal pack tests**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS for implemented ids 01–14 and both menu functions.

- [ ] **Step 4: Commit the brutal pack**

```powershell
git add -- website-blocks/blocks/0[8-9]-brutal-* website-blocks/blocks/1[0-4]-brutal-* website-blocks/tests/blocks.test.js
git commit -m "feat: add bold brutalist website blocks"
```

### Task 5: Soft product pack and specialty blocks

**Files:**
- Create: `website-blocks/blocks/15-product-navigation/{index.html,style.css,script.js,README.md}`
- Create: `website-blocks/blocks/16-product-hero/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/17-product-projects/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/18-product-features/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/19-product-social-proof/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/20-product-contact-cta/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/21-product-footer/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/31-product-faq/{index.html,style.css,script.js,README.md}`
- Create: `website-blocks/blocks/35-product-newsletter/{index.html,style.css,README.md}`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Produces: product root classes from metadata.
- Produces: `setProductMenu(open, controls)` and `setFaqItem(button, panel, open)`.

- [ ] **Step 1: Extend `implementedIds` with ids 15–21, 31, and 35 and run RED**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `15-product-navigation is missing index.html`.

- [ ] **Step 2: Build the seven product core blocks**

Use palette `#f7f5ff`, `#1d1a2b`, `#7658ff`, `#bfe8d0`, `#ffffff`, radii ranging from 12px to 30px by hierarchy, and system sans. Compositions:

- navigation: friendly wordmark, three links, login text, filled start action, mobile drawer;
- hero: left copy with compact product interface mockup built from semantic HTML and CSS;
- projects: three use-case panels with different layout proportions, not identical cards;
- features: one large feature stage plus three compact supporting items;
- social proof: testimonial, satisfaction statement without invented numbers, and fictional company marks;
- contact CTA: split trial invitation and short expectation list;
- footer: curved top edge, product links, legal links, and status indicator.

- [ ] **Step 3: Build FAQ and newsletter specialty blocks**

The FAQ contains five questions, single-open accordion behavior, `aria-expanded`, `aria-controls`, hidden panels, Escape support, and readable answers without JavaScript. `setFaqItem(button, panel, open)` is the tested state transition. The newsletter uses an associated email label, `autocomplete="email"`, privacy note, and no fake submission behavior.

- [ ] **Step 4: Test product interactions**

Assert the product menu contract. For `setFaqItem`, assert the open case sets `aria-expanded="true"`, removes `hidden`, and adds `.is-open`; assert closing reverses the state.

- [ ] **Step 5: Run product tests and commit**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS for implemented ids 01–21, 31, and 35.

```powershell
git add -- website-blocks/blocks/1[5-9]-product-* website-blocks/blocks/2[0-1]-product-* website-blocks/blocks/31-product-faq website-blocks/blocks/35-product-newsletter website-blocks/tests/blocks.test.js
git commit -m "feat: add soft product website blocks"
```

### Task 6: Dark editorial pack and specialty blocks

**Files:**
- Create: `website-blocks/blocks/22-editorial-navigation/{index.html,style.css,script.js,README.md}`
- Create: `website-blocks/blocks/23-editorial-hero/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/24-editorial-projects/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/25-editorial-features/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/26-editorial-social-proof/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/27-editorial-contact-cta/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/28-editorial-footer/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/30-editorial-pricing/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/36-editorial-contact-form/{index.html,style.css,README.md}`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Produces: editorial root classes from metadata.
- Produces: `setEditorialMenu(open, controls)`.

- [ ] **Step 1: Extend `implementedIds` with ids 22–28, 30, and 36 and run RED**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `22-editorial-navigation is missing index.html`.

- [ ] **Step 2: Build the seven editorial core blocks**

Use palette `#151414`, `#f1ebdf`, `#8d3142`, `#b8ad9d`, `#292626`; Georgia for editorial display text and system sans for UI text. Compositions:

- navigation: issue label, centered publication name, section links, mobile overlay;
- hero: asymmetric cover story with large inline SVG image field and issue metadata;
- projects: cinematic horizontal stories with category, title, date, and abstract frame;
- features: editorial contents list beside one long-form introduction;
- social proof: serif review, press-note column, and issue marker;
- contact CTA: burgundy membership invitation with two measured actions;
- footer: publication colophon, section index, contact, and edition metadata.

- [ ] **Step 3: Build editorial pricing and contact form blocks**

Pricing presents two offers using typographic hierarchy rather than equal cards, includes a comparison list, and marks one offer as recommended in visible text. The contact form includes name, email, project type, budget range, message, consent note, and button; all labels remain visible and no submit handler is added.

- [ ] **Step 4: Test editorial menu, run the suite, and commit**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS for implemented ids 01–31, 35, and 36 except the four specialty blocks assigned to Task 7.

```powershell
git add -- website-blocks/blocks/2[2-8]-editorial-* website-blocks/blocks/30-editorial-pricing website-blocks/blocks/36-editorial-contact-form website-blocks/tests/blocks.test.js
git commit -m "feat: add dark editorial website blocks"
```

### Task 7: Remaining specialty blocks and final block contract

**Files:**
- Create: `website-blocks/blocks/29-studio-pricing/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/32-brutal-faq/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/33-studio-team/{index.html,style.css,README.md}`
- Create: `website-blocks/blocks/34-brutal-stats/{index.html,style.css,README.md}`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Produces: final four root classes from metadata and completes all 36 ids.

- [ ] **Step 1: Extend `implementedIds` with ids 29 and 32–34 and run RED**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `29-studio-pricing is missing index.html`.

- [ ] **Step 2: Build the final four blocks**

- studio pricing: three restrained tiers, comparison rows, visible recommended label;
- brutal FAQ: five native `<details>` disclosures with heavy borders and no JavaScript;
- studio team: five fictional roles in a varied editorial grid using abstract inline SVG portraits;
- brutal stats: four honest replaceable example values explicitly labeled as sample data in HTML comments.

Reuse each named style's exact palette and typography rules while changing composition to suit the specialty content.

- [ ] **Step 3: Add the final directory contract**

```js
assert.equal(implementedIds.length, 36);
const directories = fs.readdirSync(path.join(root, "blocks"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert.deepEqual(directories, BLOCKS.map((block) => block.id).sort());

for (const block of BLOCKS.filter((item) => item.files.endsWith("JS"))) {
  const scriptPath = path.join(root, "blocks", block.id, "script.js");
  assert.ok(fs.existsSync(scriptPath), `${block.id} is missing script.js`);
}
```

Run `node --check` on every discovered block `script.js` from the test with `spawnSync(process.execPath, ["--check", scriptPath])` and assert status 0.

- [ ] **Step 4: Run all block tests and commit**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS with exactly 36 valid block directories.

```powershell
git add -- website-blocks/blocks/29-studio-pricing website-blocks/blocks/32-brutal-faq website-blocks/blocks/33-studio-team website-blocks/blocks/34-brutal-stats website-blocks/tests/blocks.test.js
git commit -m "feat: complete specialty website blocks"
```

### Task 8: Four assembled style demos

**Files:**
- Create: `website-blocks/demos/studio.html`
- Create: `website-blocks/demos/brutal.html`
- Create: `website-blocks/demos/product.html`
- Create: `website-blocks/demos/editorial.html`
- Create: `website-blocks/demos/demo.css`
- Create: `website-blocks/demos/demo.js`
- Modify: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Consumes: content and visual tokens from core blocks 01–28.
- Produces: four complete seven-section sites linked from the catalogue style introductions.

- [ ] **Step 1: Add failing demo composition tests**

```js
for (const style of ["studio", "brutal", "product", "editorial"]) {
  const demoPath = path.join(root, "demos", `${style}.html`);
  assert.ok(fs.existsSync(demoPath), `Missing ${style} demo`);
  const html = fs.readFileSync(demoPath, "utf8");
  assert.equal((html.match(/data-demo-section=/g) || []).length, 7, `${style} demo needs seven sections`);
  assert.match(html, new RegExp(`data-demo-style="${style}"`));
}
```

- [ ] **Step 2: Run the test and verify the studio demo is missing**

Run: `node website-blocks/tests/blocks.test.js`

Expected: FAIL with `Missing studio demo`.

- [ ] **Step 3: Assemble the four demo pages**

Each page uses one navigation, hero, projects, features, social proof, contact CTA, and footer composition from its pack, carries `data-demo-section` on each, and uses `data-demo-style` on `<body>`. Consolidate the required pack CSS into `demo.css` under body-style scoping so demo pages make no requests to block folders. `demo.js` handles all four mobile menus with one `setDemoMenu(open, controls)` function.

- [ ] **Step 4: Run demos and suite, then commit**

Run: `node website-blocks/tests/blocks.test.js`

Expected: PASS for 36 blocks and four seven-section demos.

```powershell
git add -- website-blocks/demos website-blocks/tests/blocks.test.js
git commit -m "feat: add complete block style demos"
```

### Task 9: Browser verification and evidence-backed refinement

**Files:**
- Modify if findings require it: `website-blocks/index.html`
- Modify if findings require it: `website-blocks/catalog.css`
- Modify if findings require it: `website-blocks/catalog.js`
- Modify if findings require it: `website-blocks/blocks/**`
- Modify if findings require it: `website-blocks/demos/**`
- Modify if findings require it: `website-blocks/tests/blocks.test.js`

**Interfaces:**
- Consumes: complete catalogue, blocks, and demos.
- Produces: browser-reviewed library with no console errors, missing resources, broken links, or target-size overflow.

- [ ] **Step 1: Start the preview and verify all HTTP routes**

Run: `node website-blocks/tests/server.js`

For the catalogue, four demos, and all `blocks/<id>/index.html` routes, request each URL and require status 200. Add this route loop to `blocks.test.js` using `node:http` and a spawned server only if the port is not already listening.

- [ ] **Step 2: Review the catalogue at three sizes**

Use browser viewport overrides at 1440 × 1000, 390 × 844, and 320 × 800. Verify header hierarchy, sticky controls, search, every style filter, count changes, empty state, keyboard focus, miniature variety, touch targets, and zero horizontal overflow.

- [ ] **Step 3: Review all four demos**

At 1440 × 1000 and 390 × 844, review section transitions, pack consistency, heading scale, navigation, CTA prominence, footer completion, and mobile menu behavior. Confirm each demo reads as a coherent real site.

- [ ] **Step 4: Review all 36 blocks**

Open every block at either desktop or mobile size. For each, confirm the intended root renders, no content is clipped, inline SVGs load, focus states are visible, and no horizontal overflow exists. Test all four menu scripts, the product FAQ, native brutal FAQ, form labels, and reduced-motion rules.

- [ ] **Step 5: Convert every discovered defect into a failing test before fixing it**

Add the smallest regression assertion that names the observed break, run it to confirm RED, apply the focused HTML/CSS/JavaScript change, and rerun to GREEN. Do not make speculative restyling changes during this task.

- [ ] **Step 6: Run final verification**

```powershell
node website-blocks/tests/blocks.test.js
git diff --check -- website-blocks
git status --short
```

Expected: all checks pass; diff check prints nothing; only `website-blocks/` changes from this implementation are present alongside preserved unrelated user changes.

- [ ] **Step 7: Commit verified refinements**

If browser review changed files:

```powershell
git add -- website-blocks
git commit -m "fix: refine website block library presentation"
```

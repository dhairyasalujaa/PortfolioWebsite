# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained, developer-first portfolio redesign in `portfolio-redesign/` without modifying the existing website.

**Architecture:** Two static HTML pages share one stylesheet and one small progressive-enhancement script. Local copies of the existing fonts and photographs keep the redesign independent, while a Node standard-library smoke test protects structure, accessibility hooks, links, and file boundaries.

**Tech Stack:** Semantic HTML5, modern CSS, vanilla JavaScript, Node.js standard library tests, local fonts and images.

**Spec:** `docs/superpowers/specs/2026-09-19-portfolio-redesign-design.md`

## Global Constraints

- Create all runtime files under `portfolio-redesign/`; do not modify `index.html`, `projects.html`, `style.css`, `scripts.js`, `fonts/`, or `images/` at the repository root.
- Use no framework, package manager, build step, animation library, or external runtime dependency.
- The redesign must work by opening `portfolio-redesign/index.html` directly and through a basic static server.
- Preserve existing facts, project names, email address, GitHub link, and boxing Instagram link; improve spelling and clarity without inventing experience or results.
- Support 320px phones through wide desktops, keyboard input, visible focus, and `prefers-reduced-motion`.
- JavaScript must progressively enhance the pages; all content remains available when it does not run.
- External links that open a new tab must include `rel="noopener noreferrer"`.

---

### Task 1: Isolated structure and boundary test

**Files:**
- Create: `portfolio-redesign/tests/site.test.js`
- Create: `portfolio-redesign/README.md`
- Create: `portfolio-redesign/fonts/SFPRODISPLAYREGULAR.OTF`
- Create: `portfolio-redesign/fonts/SFPRODISPLAYMEDIUM.OTF`
- Create: `portfolio-redesign/fonts/junicode.regular.ttf`
- Create: `portfolio-redesign/images/mirror.jpg`
- Create: `portfolio-redesign/images/boxing.jpg`

**Interfaces:**
- Consumes: source assets from root `fonts/` and `images/`.
- Produces: self-contained asset paths used by both HTML pages and `node portfolio-redesign/tests/site.test.js` as the project-wide verification entry point.

- [ ] **Step 1: Write the failing boundary test**

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const required = [
  "index.html",
  "projects.html",
  "style.css",
  "scripts.js",
  "README.md",
  "fonts/SFPRODISPLAYREGULAR.OTF",
  "fonts/SFPRODISPLAYMEDIUM.OTF",
  "fonts/junicode.regular.ttf",
  "images/mirror.jpg",
  "images/boxing.jpg",
];

for (const file of required) {
  assert.ok(fs.existsSync(path.join(root, file)), `Missing ${file}`);
}
```

- [ ] **Step 2: Run the test and verify the new site files are missing**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: FAIL with `Missing index.html`.

- [ ] **Step 3: Copy the five approved local assets and create the README**

Use PowerShell `Copy-Item -LiteralPath` for the exact font and image paths named above. Create `README.md` with these commands:

```markdown
# Portfolio redesign

This is a self-contained static redesign of Dhairya Saluja's portfolio.

Open `index.html` directly, or from this folder run:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173/`.

Run the structural checks from the repository root:

```powershell
node portfolio-redesign/tests/site.test.js
```
```

- [ ] **Step 4: Add empty runtime files so the boundary test passes**

Create `index.html`, `projects.html`, `style.css`, and `scripts.js` as empty UTF-8 files. These files are populated in later tasks.

- [ ] **Step 5: Run the boundary test**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: PASS with exit code 0.

- [ ] **Step 6: Commit the isolated scaffold**

```powershell
git add -- portfolio-redesign
git commit -m "chore: scaffold isolated portfolio redesign"
```

### Task 2: Semantic pages and content

**Files:**
- Modify: `portfolio-redesign/tests/site.test.js`
- Modify: `portfolio-redesign/index.html`
- Modify: `portfolio-redesign/projects.html`

**Interfaces:**
- Consumes: relative asset paths from Task 1.
- Produces: `.site-header`, `.nav-toggle`, `.site-nav`, `[data-nav-link]`, `[data-reveal]`, `[data-section]`, and `[data-year]` hooks consumed by CSS and JavaScript.

- [ ] **Step 1: Extend the test with semantic and content assertions**

```js
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const home = read("index.html");
const projects = read("projects.html");

for (const html of [home, projects]) {
  assert.match(html, /<header class="site-header"/);
  assert.match(html, /class="nav-toggle"[^>]+aria-expanded="false"/);
  assert.match(html, /<main/);
  assert.match(html, /<footer/);
  assert.match(html, /data-year/);
  assert.doesNotMatch(html, /(href|src)="\.\.\//);
}

for (const text of ["Weyn", "This portfolio", "TodoList"]) {
  assert.ok(home.includes(text), `Home is missing ${text}`);
  assert.ok(projects.includes(text), `Projects page is missing ${text}`);
}

assert.match(home, /id="work"/);
assert.match(home, /id="toolkit"/);
assert.match(home, /id="boxing"/);
assert.match(home, /dhairyarsaluja@gmail\.com/);
assert.match(home, /github\.com\/dhairyasalujaa/);
assert.match(home, /instagram\.com\/dhairya\.bxng/);
```

- [ ] **Step 2: Run the test to verify it fails on the empty HTML files**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: FAIL because `.site-header` is absent.

- [ ] **Step 3: Build the home page semantic structure**

Write a complete HTML document containing:

- a skip link;
- fixed header with logo, desktop links, contact link, and button-based mobile menu;
- hero statement “I build things while learning how they work.”, Muscat location, portrait, and current learning status;
- `#work` project rows for Weyn, This portfolio, and TodoList;
- `#toolkit` groups for Core, Exploring, and Workflow;
- `#boxing` image-led personal section using `images/boxing.jpg`;
- `#contact` email and GitHub actions;
- footer with `[data-year]`.

Use only the hooks listed in **Produces**. Give both images explicit `width`, `height`, and meaningful `alt` attributes. Add `target="_blank" rel="noopener noreferrer"` to GitHub and Instagram links.

- [ ] **Step 4: Build the projects page semantic structure**

Write a complete HTML document using the same header and footer hooks. Add an intro and three `<article class="project-detail">` elements. Each article contains a name, honest status, concise description, and tool list. Weyn is “Paused”, This portfolio is “In progress”, and TodoList is “Complete”.

- [ ] **Step 5: Run the semantic tests**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: PASS with exit code 0.

- [ ] **Step 6: Commit the pages**

```powershell
git add -- portfolio-redesign/index.html portfolio-redesign/projects.html portfolio-redesign/tests/site.test.js
git commit -m "feat: add redesigned portfolio content"
```

### Task 3: Visual system and responsive layout

**Files:**
- Modify: `portfolio-redesign/tests/site.test.js`
- Modify: `portfolio-redesign/style.css`

**Interfaces:**
- Consumes: semantic classes and data attributes from Task 2.
- Produces: responsive 12-column layout, accessible interaction states, mobile navigation styling, and reduced-motion behavior.

- [ ] **Step 1: Add stylesheet contract tests**

```js
const css = read("style.css");
for (const token of ["--paper", "--ink", "--cobalt", "--burgundy", "--steel"]) {
  assert.ok(css.includes(token), `Missing CSS token ${token}`);
}
assert.match(css, /@font-face/);
assert.match(css, /:focus-visible/);
assert.match(css, /@media\s*\(max-width:\s*760px\)/);
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.match(css, /grid-template-columns:\s*repeat\(12/);
```

- [ ] **Step 2: Run the test and verify the empty stylesheet fails**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: FAIL with `Missing CSS token --paper`.

- [ ] **Step 3: Implement foundations and shared components**

Define the six spec colors in `:root`, three local `@font-face` rules, reset styles, fluid type scale, focus treatment, skip link, fixed header, navigation, buttons, rules, and footer. Use `#E9EDF2`, `#11151C`, `#244BFF`, `#7A2938`, `#AAB3C0`, and `#FDFEFF` exactly.

- [ ] **Step 4: Implement the desktop page compositions**

Use a centered `min(100% - 48px, 1440px)` page shell and `repeat(12, minmax(0, 1fr))` grids. Build the asymmetric hero, portrait frame, status panel, editorial project rows, toolkit strip, dark boxing band, contact block, projects intro, and project detail rows. Keep project information as rows separated by rules rather than rounded cards.

- [ ] **Step 5: Implement responsive and reduced-motion rules**

At `760px`, collapse content to one column, expose `.nav-toggle`, turn `.site-nav` into a controlled dropdown, keep tap targets at least 44px tall, and preserve the document order. Under `prefers-reduced-motion: reduce`, remove transitions and reveal transforms.

- [ ] **Step 6: Run the stylesheet tests**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: PASS with exit code 0.

- [ ] **Step 7: Commit the visual system**

```powershell
git add -- portfolio-redesign/style.css portfolio-redesign/tests/site.test.js
git commit -m "feat: style developer workbench portfolio"
```

### Task 4: Progressive enhancement and interaction tests

**Files:**
- Modify: `portfolio-redesign/tests/site.test.js`
- Modify: `portfolio-redesign/scripts.js`

**Interfaces:**
- Consumes: `.nav-toggle`, `.site-nav`, `[data-nav-link]`, `[data-reveal]`, `[data-section]`, and `[data-year]` from Task 2.
- Produces: `setMenu(open: boolean): void`; menu, reveal, active-section, and year behavior.

- [ ] **Step 1: Add JavaScript contract assertions**

```js
const js = read("scripts.js");
assert.match(js, /function setMenu\(open\)/);
assert.match(js, /aria-expanded/);
assert.match(js, /IntersectionObserver/);
assert.match(js, /prefers-reduced-motion/);
assert.match(js, /data-year/);
assert.match(js, /keydown/);
```

- [ ] **Step 2: Run the test and verify the empty script fails**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: FAIL because `setMenu` is absent.

- [ ] **Step 3: Implement the mobile menu and year**

Create `setMenu(open)` to synchronize `.is-open`, `aria-expanded`, and `aria-hidden`. Close the menu after a navigation selection, on Escape, and when the viewport becomes wider than 760px. Fill every `[data-year]` with `new Date().getFullYear()`.

- [ ] **Step 4: Implement restrained reveals and active navigation**

If reduced motion is not requested and `IntersectionObserver` exists, add `.is-visible` to reveal groups on first entry. Use a second observer to set `.is-active` on the matching `[data-nav-link]`. If observation is unavailable, make every reveal group visible immediately.

- [ ] **Step 5: Run all structural tests**

Run: `node portfolio-redesign/tests/site.test.js`

Expected: PASS with exit code 0.

- [ ] **Step 6: Commit the interactions**

```powershell
git add -- portfolio-redesign/scripts.js portfolio-redesign/tests/site.test.js
git commit -m "feat: add accessible portfolio interactions"
```

### Task 5: Browser verification and final refinement

**Files:**
- Modify if findings require it: `portfolio-redesign/index.html`
- Modify if findings require it: `portfolio-redesign/projects.html`
- Modify if findings require it: `portfolio-redesign/style.css`
- Modify if findings require it: `portfolio-redesign/scripts.js`
- Modify if findings require it: `portfolio-redesign/tests/site.test.js`

**Interfaces:**
- Consumes: the complete redesign.
- Produces: a visually reviewed, keyboard-tested, console-clean static site.

- [ ] **Step 1: Start a static server**

Run from `portfolio-redesign/`: `python -m http.server 4173`

Expected: server listens on `http://localhost:4173/`.

- [ ] **Step 2: Review desktop at 1440 × 1000**

Open the home and projects pages. Confirm hierarchy, portrait crop, project row alignment, boxing contrast, footer spacing, and absence of horizontal overflow. Capture a screenshot of each page.

- [ ] **Step 3: Review mobile at 390 × 844**

Confirm the single-column order, readable hero type, 44px controls, working menu, no clipped text, suitable image crops, and absence of horizontal overflow. Capture the home page.

- [ ] **Step 4: Verify keyboard, reduced motion, and errors**

Tab from the skip link through every interactive element; open and close the menu with keyboard controls; verify Escape closes it. Emulate reduced motion and confirm reveals do not animate. Confirm both pages produce no browser console errors or missing-resource failures.

- [ ] **Step 5: Apply findings and rerun checks**

Make only evidence-backed layout or interaction corrections. Run:

```powershell
node portfolio-redesign/tests/site.test.js
git diff --check
git status --short
```

Expected: tests pass, `git diff --check` prints nothing, and only intended redesign files are modified.

- [ ] **Step 6: Commit final refinements**

```powershell
git add -- portfolio-redesign
git commit -m "fix: refine responsive portfolio presentation"
```

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "block-data.js");

assert.ok(fs.existsSync(dataPath), "Missing block-data.js");

const { BLOCKS } = require(dataPath);

assert.equal(BLOCKS.length, 36, "The catalogue must contain exactly 36 blocks");
assert.equal(new Set(BLOCKS.map((block) => block.id)).size, 36, "Block ids must be unique");
assert.equal(
  new Set(BLOCKS.map((block) => block.rootClass)).size,
  36,
  "Root classes must be unique",
);

const catalogPath = path.join(root, "catalog.js");
assert.ok(fs.existsSync(catalogPath), "Missing catalog.js");

const { filterBlocks } = require(catalogPath);
const studioResults = filterBlocks(BLOCKS, "studio", "");

assert.equal(studioResults.length, 7);
assert.ok(studioResults.every((block) => block.style === "studio"));
assert.deepEqual(
  filterBlocks(BLOCKS, "all", "pricing").map((block) => block.id),
  ["29-studio-pricing", "30-editorial-pricing"],
);
assert.equal(filterBlocks(BLOCKS, "editorial", "navigation")[0].id, "22-editorial-navigation");
assert.equal(filterBlocks(BLOCKS, "studio", "accordion").length, 0);

const implementedIds = [
  "01-studio-navigation",
  "02-studio-hero",
  "03-studio-projects",
  "04-studio-features",
  "05-studio-social-proof",
  "06-studio-contact-cta",
  "07-studio-footer",
  "08-brutal-navigation",
  "09-brutal-hero",
  "10-brutal-projects",
  "11-brutal-features",
  "12-brutal-social-proof",
  "13-brutal-contact-cta",
  "14-brutal-footer",
  "15-product-navigation",
  "16-product-hero",
  "17-product-projects",
  "18-product-features",
  "19-product-social-proof",
  "20-product-contact-cta",
  "21-product-footer",
  "31-product-faq",
  "35-product-newsletter",
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

for (const id of implementedIds) {
  validateBlock(BLOCKS.find((block) => block.id === id));
}

const studioMenuPath = path.join(root, "blocks", "01-studio-navigation", "script.js");
assert.ok(fs.existsSync(studioMenuPath), "Studio navigation is missing script.js");

const { setStudioMenu } = require(studioMenuPath);

function fakeElement() {
  const attributes = new Map();
  const classes = new Set();
  return {
    attributes,
    classes,
    classList: { toggle(name, force) { if (force) classes.add(name); else classes.delete(name); } },
    setAttribute(name, value) { attributes.set(name, String(value)); },
  };
}

const studioToggle = fakeElement();
const studioNav = fakeElement();
setStudioMenu(true, { toggle: studioToggle, nav: studioNav });
assert.equal(studioToggle.attributes.get("aria-expanded"), "true");
assert.equal(studioNav.attributes.get("aria-hidden"), "false");
assert.ok(studioNav.classes.has("is-open"));
setStudioMenu(false, { toggle: studioToggle, nav: studioNav });
assert.equal(studioToggle.attributes.get("aria-expanded"), "false");
assert.equal(studioNav.attributes.get("aria-hidden"), "true");
assert.ok(!studioNav.classes.has("is-open"));

const brutalMenuPath = path.join(root, "blocks", "08-brutal-navigation", "script.js");
assert.ok(fs.existsSync(brutalMenuPath), "Brutal navigation is missing script.js");
const { setBrutalMenu } = require(brutalMenuPath);
const brutalToggle = fakeElement();
const brutalNav = fakeElement();
setBrutalMenu(true, { toggle: brutalToggle, nav: brutalNav });
assert.equal(brutalToggle.attributes.get("aria-expanded"), "true");
assert.equal(brutalNav.attributes.get("aria-hidden"), "false");
assert.ok(brutalNav.classes.has("is-open"));
setBrutalMenu(false, { toggle: brutalToggle, nav: brutalNav });
assert.equal(brutalNav.attributes.get("aria-hidden"), "true");
assert.ok(!brutalNav.classes.has("is-open"));

const productMenuPath = path.join(root, "blocks", "15-product-navigation", "script.js");
assert.ok(fs.existsSync(productMenuPath), "Product navigation is missing script.js");
const { setProductMenu } = require(productMenuPath);
const productToggle = fakeElement();
const productNav = fakeElement();
setProductMenu(true, { toggle: productToggle, nav: productNav });
assert.equal(productToggle.attributes.get("aria-expanded"), "true");
assert.equal(productNav.attributes.get("aria-hidden"), "false");
assert.ok(productNav.classes.has("is-open"));
setProductMenu(false, { toggle: productToggle, nav: productNav });
assert.equal(productNav.attributes.get("aria-hidden"), "true");
assert.ok(!productNav.classes.has("is-open"));

const productFaqPath = path.join(root, "blocks", "31-product-faq", "script.js");
assert.ok(fs.existsSync(productFaqPath), "Product FAQ is missing script.js");
const { setFaqItem } = require(productFaqPath);
const faqButton = fakeElement();
const faqPanel = fakeElement();
faqPanel.hidden = false;
setFaqItem(faqButton, faqPanel, false);
assert.equal(faqButton.attributes.get("aria-expanded"), "false");
assert.equal(faqPanel.hidden, true);
assert.ok(!faqButton.classes.has("is-open"));
setFaqItem(faqButton, faqPanel, true);
assert.equal(faqButton.attributes.get("aria-expanded"), "true");
assert.equal(faqPanel.hidden, false);
assert.ok(faqButton.classes.has("is-open"));

console.log(`PASS: catalogue behavior and ${implementedIds.length} block contracts`);

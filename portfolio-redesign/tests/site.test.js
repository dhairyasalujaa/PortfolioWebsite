const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

const requiredFiles = [
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

for (const file of requiredFiles) {
  assert.ok(fileExists(file), `Missing ${file}`);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assertPageStructure(html, pageName) {
  assert.match(html, /<header class="site-header"/, `${pageName} needs a header`);
  assert.match(html, /<main[^>]*id="main-content"/, `${pageName} needs a main landmark`);
  assert.match(html, /<footer class="site-footer"/, `${pageName} needs a footer`);
  assert.match(
    html,
    /class="nav-toggle"[^>]+aria-expanded="false"/,
    `${pageName} needs a collapsed menu button`,
  );
  assert.match(html, /data-year/, `${pageName} needs an automatic year hook`);
  assert.doesNotMatch(
    html,
    /(href|src)="\.\.\//,
    `${pageName} must not depend on parent-folder assets`,
  );
}

const home = read("index.html");
const projects = read("projects.html");

assertPageStructure(home, "Home page");
assertPageStructure(projects, "Projects page");

for (const project of ["Weyn", "This portfolio", "TodoList"]) {
  assert.ok(home.includes(project), `Home page is missing ${project}`);
  assert.ok(projects.includes(project), `Projects page is missing ${project}`);
}

for (const section of ["work", "toolkit", "boxing", "contact"]) {
  assert.match(home, new RegExp(`id="${section}"`), `Home page is missing #${section}`);
}

assert.match(home, /dhairyarsaluja@gmail\.com/, "Home page is missing the email address");
assert.match(home, /github\.com\/dhairyasalujaa/, "Home page is missing GitHub");
assert.match(home, /instagram\.com\/dhairya\.bxng/, "Home page is missing boxing Instagram");

const css = read("style.css");

for (const token of ["--paper", "--ink", "--cobalt", "--burgundy", "--steel"]) {
  assert.ok(css.includes(token), `Stylesheet is missing ${token}`);
}

assert.match(css, /@font-face/, "Stylesheet needs local font faces");
assert.match(css, /:focus-visible/, "Stylesheet needs a visible keyboard focus state");
assert.match(css, /@media\s*\(max-width:\s*760px\)/, "Stylesheet needs the mobile breakpoint");
assert.match(css, /prefers-reduced-motion:\s*reduce/, "Stylesheet needs reduced-motion support");
assert.match(css, /repeat\(12,\s*minmax\(0,\s*1fr\)\)/, "Desktop layout needs a 12-column grid");

console.log("PASS: isolated files, page contracts, and responsive style contracts are present");

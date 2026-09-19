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

console.log(`PASS: ${requiredFiles.length} isolated redesign files exist`);

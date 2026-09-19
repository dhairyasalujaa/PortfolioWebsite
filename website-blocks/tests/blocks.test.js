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

console.log("PASS: metadata and catalogue filtering");

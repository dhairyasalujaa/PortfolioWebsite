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

console.log("PASS: 36 unique block records");

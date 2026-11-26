import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  loadTokens,
  generatedFiles,
  generateFrontmatter,
  replaceFrontmatter,
} from "./lib/tokens.mjs";

/**
 * @param {string} relativePath
 * @param {string} content
 * @returns {string}
 */
function write(relativePath, content) {
  const target = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  return relativePath;
}

/**
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
function copyFile(from, to) {
  const source = path.join(ROOT, from);
  const target = path.join(ROOT, to);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  return to;
}

/**
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
function copyDirectory(from, to) {
  const source = path.join(ROOT, from);
  const target = path.join(ROOT, to);
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
  return to;
}

const tokens = loadTokens();
const written = [];

for (const [relativePath, content] of Object.entries(generatedFiles(tokens))) {
  written.push(write(relativePath, content));
}

const designPath = path.join(ROOT, "DESIGN.md");
const design = fs.readFileSync(designPath, "utf8");
written.push(write("DESIGN.md", replaceFrontmatter(design, generateFrontmatter(tokens))));

const skillRoot = "skills/uni-helper-design/assets";
for (const file of [
  "tokens.css",
  "tokens.json",
  "tokens.schema.json",
  "components/components.css",
  "components/components.js",
]) {
  written.push(copyFile(file, path.join(skillRoot, path.basename(file))));
}
written.push(copyDirectory("fonts", path.join(skillRoot, "fonts")));
written.push(copyDirectory("assets/logos", path.join(skillRoot, "logos")));
written.push(copyDirectory("assets/icons", path.join(skillRoot, "icons")));

console.log(`Built ${written.length} outputs from tokens.json:`);
for (const item of written) console.log(`  ${item}`);

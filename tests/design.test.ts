import fs from "node:fs";
import path from "node:path";
import { expect, it } from "vite-plus/test";
import { ROOT, loadTokens, generatedFiles, generateFrontmatter } from "../scripts/lib/tokens.mjs";

const tokens = loadTokens();
const errors: string[] = [];

function read(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

for (const [relativePath, expected] of Object.entries(generatedFiles(tokens))) {
  const actual = read(relativePath);
  if (actual !== expected) errors.push(`${relativePath} is stale. Run \`pnpm build\`.`);
}

const design = read("DESIGN.md");
const actualFrontmatter = design.match(/^---\n[\s\S]*?\n---\n/)?.[0];
const expectedFrontmatter = generateFrontmatter(tokens);
if (actualFrontmatter !== expectedFrontmatter) {
  errors.push("DESIGN.md frontmatter is stale. Run `pnpm build`.");
}

const skillAssets = "skills/uni-helper-design/assets";
for (const [from, to] of [
  ["tokens.css", "tokens.css"],
  ["tokens.json", "tokens.json"],
  ["tokens.schema.json", "tokens.schema.json"],
  ["components/components.css", "components.css"],
  ["components/components.js", "components.js"],
]) {
  const source = read(from);
  const target = read(path.join(skillAssets, to));
  if (source !== target) errors.push(`${skillAssets}/${to} is stale. Run \`pnpm build\`.`);
}

function directoryFiles(directory: string): Record<string, Buffer> {
  const root = path.join(ROOT, directory);
  const files: Record<string, Buffer> = {};
  for (const entry of fs.readdirSync(root, { recursive: true, encoding: "utf8" })) {
    const file = path.join(root, entry);
    if (fs.statSync(file).isFile()) files[entry] = fs.readFileSync(file);
  }
  return files;
}

for (const [from, to] of [
  ["fonts", "fonts"],
  ["assets/logos", "logos"],
  ["assets/icons", "icons"],
]) {
  const source = directoryFiles(from);
  const target = directoryFiles(path.join(skillAssets, to));
  for (const [file, content] of Object.entries(source)) {
    const targetContent = target[file];
    if (!targetContent || !targetContent.equals(content)) {
      errors.push(`${skillAssets}/${to}/${file} is stale. Run \`pnpm build\`.`);
    }
  }
  for (const file of Object.keys(target)) {
    if (!source[file]) errors.push(`${skillAssets}/${to}/${file} is stale. Run \`pnpm build\`.`);
  }
}

const componentsCss = read("components/components.css");
const rawHex = componentsCss.match(/#[0-9a-fA-F]{3,8}\b/);
if (rawHex) errors.push(`components.css contains a raw color (${rawHex[0]}). Use a token.`);
const rawFont = componentsCss.match(/\bfont(?:-size)?:\s*[0-9]/);
if (rawFont)
  errors.push(`components.css contains a raw font size (${rawFont[0]}). Use --text-* or --type-*.`);

function color(name: string, theme: "light" | "dark" = "light"): string {
  const token = tokens.color.tokens.find((item) => item.name === name);
  if (!token) throw new Error(`Unknown color token: ${name}`);
  return typeof token.value === "string" ? token.value : token.value[theme];
}

function luminance(value: string): number {
  const match = value.match(/^#([0-9a-f]{6})$/i);
  if (!match) throw new Error(`Contrast needs a 6-digit hex color, got ${value}`);
  const rgb = [0, 2, 4].map((index) => parseInt(match[1].slice(index, index + 2), 16) / 255);
  const linear = rgb.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a: string, b: string): number {
  const values = [luminance(a), luminance(b)].sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const contrastPairs: Array<[string, string, number]> = [
  ["foreground", "background", 4.5],
  ["foreground", "card", 4.5],
  ["card-foreground", "card", 4.5],
  ["muted-foreground", "background", 4.5],
  ["muted-foreground", "muted", 4.5],
  ["muted-foreground", "card", 4.5],
  ["muted-foreground", "card-hover", 4.5],
  ["primary", "primary-foreground", 4.5],
  ["destructive", "destructive-foreground", 4.5],
  ["border-strong", "background", 3],
  ["border-strong", "card", 3],
  ["input", "background", 3],
  ["brand", "background", 3],
  ["brand-text", "background", 4.5],
  ["brand-cta", "brand-cta-foreground", 4.5],
  ["link", "background", 4.5],
  ["link-hover", "background", 4.5],
  ["info", "background", 3],
  ["success", "background", 3],
  ["warning", "background", 3],
  ["error", "background", 3],
  ["chart-1", "background", 3],
  ["chart-2", "background", 3],
  ["chart-3", "background", 3],
  ["chart-4", "background", 3],
  ["chart-5", "background", 3],
  ["chart-6", "background", 3],
  ["code-fg", "code-bg", 4.5],
  ["code-muted", "code-bg", 4.5],
  ["code-keyword", "code-bg", 4.5],
  ["code-string", "code-bg", 4.5],
  ["code-number", "code-bg", 4.5],
  ["code-function", "code-bg", 4.5],
  ["code-punctuation", "code-bg", 4.5],
];

for (const theme of ["light", "dark"] as const) {
  for (const [foreground, background, minimum] of contrastPairs) {
    const ratio = contrast(color(foreground, theme), color(background, theme));
    if (ratio < minimum) {
      errors.push(
        `${theme}: ${foreground} on ${background} is ${ratio.toFixed(2)}:1, needs ${minimum}:1`,
      );
    }
  }
}

interface PackageJson {
  version: string;
  exports: Record<string, string>;
}

function isPackageJson(value: unknown): value is PackageJson {
  if (typeof value !== "object" || value === null) return false;
  if (!("version" in value) || typeof value.version !== "string") return false;
  if (!("exports" in value) || typeof value.exports !== "object" || value.exports === null)
    return false;
  const exports = value.exports as Record<string, unknown>;
  return Object.values(exports).every((entry) => typeof entry === "string");
}

const pkg: unknown = JSON.parse(read("package.json"));
if (!isPackageJson(pkg)) throw new Error("package.json has an unexpected shape");
if (pkg.version !== tokens.version) {
  errors.push(
    `package.json version ${pkg.version} does not match tokens.json version ${tokens.version}.`,
  );
}
for (const target of Object.values(pkg.exports)) {
  if (!fs.existsSync(path.join(ROOT, target)))
    errors.push(`package.json export is missing: ${target}`);
}

it("generated files match tokens, colors are tokenized, and contrast floors hold", () => {
  expect(errors, errors.join("\n")).toEqual([]);
});

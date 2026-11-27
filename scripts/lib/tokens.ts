import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "../..");

export type Token = {
  name: string;
  value: string | { light: string; dark: string };
  usage?: string;
};

type Section = { tokens: Token[] };

type ColorSection = Section & { themes: Array<{ id: string; name: string }> };

type TypeGroup = {
  name: string;
  family: "sans" | "mono";
  fontFamily: string;
  fontSize: string;
  fluidSize?: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  usage?: string;
  cjk?: { lineHeight: string; letterSpacing?: string };
};

type TypeSection = {
  groups: TypeGroup[];
  families: { sans: string; mono: string };
  fonts: Array<{ family: string; file: string; weight: string; style: string }>;
};

type LayoutSection = {
  tokens: Token[];
  breakpoints: Array<{ name: string; value: string; usage?: string }>;
};

type MotionSection = {
  durations: Array<{ name: string; value: string; usage?: string }>;
  easings: Array<{ name: string; value: string; usage?: string }>;
};

export type TokenFile = {
  name: string;
  version: string;
  color: ColorSection;
  type: TypeSection;
  shadow: Section;
  spacing: Section;
  radius: Section;
  border: Section;
  layout: LayoutSection;
  control: Section;
  icon: Section;
  opacity: Section;
  motion: MotionSection;
};

export function loadTokens(): TokenFile {
  // tokens.json is validated by tokens.schema.json in CI.
  return JSON.parse(fs.readFileSync(path.join(ROOT, "tokens.json"), "utf8"));
}

export function themeEntries(
  section: Section,
  theme: "light" | "dark",
): Array<[string, string, string | undefined]> {
  const entries: Array<[string, string, string | undefined]> = [];
  for (const token of section.tokens) {
    if (typeof token.value === "object") {
      entries.push([token.name, token.value[theme], token.usage]);
    }
  }
  return entries;
}

export function constantEntries(section: Section): Array<[string, string, string | undefined]> {
  const entries: Array<[string, string, string | undefined]> = [];
  for (const token of section.tokens) {
    if (typeof token.value === "string") {
      entries.push([token.name, token.value, token.usage]);
    }
  }
  return entries;
}

function declaration(name: string, value: string, usage?: string): string {
  const comment = usage ? ` /* ${usage} */` : "";
  return `  --${name}: ${value};${comment}`;
}

function block(selector: string, lines: string[], indent: string = ""): string {
  if (!lines.length) return "";
  return `${indent}${selector} {\n${lines.map((line) => `${indent}${line}`).join("\n")}\n${indent}}\n`;
}

function primitiveLines(tokens: TokenFile): string[] {
  const lines = [];
  for (const section of [tokens.spacing, tokens.radius, tokens.border]) {
    for (const [name, value, usage] of constantEntries(section)) {
      lines.push(declaration(name, value, usage));
    }
  }
  for (const [name, value, usage] of constantEntries(tokens.layout)) {
    lines.push(declaration(name, value, usage));
  }
  for (const item of tokens.layout.breakpoints) {
    lines.push(declaration(item.name, item.value, item.usage));
  }
  for (const [name, value, usage] of constantEntries(tokens.control)) {
    lines.push(declaration(name, value, usage));
  }
  for (const [name, value, usage] of constantEntries(tokens.icon)) {
    lines.push(declaration(name, value, usage));
  }
  for (const [name, value, usage] of constantEntries(tokens.opacity)) {
    lines.push(declaration(name, value, usage));
  }
  for (const item of tokens.motion.durations) {
    lines.push(declaration(item.name, item.value, item.usage));
  }
  for (const item of tokens.motion.easings) {
    lines.push(declaration(item.name, item.value, item.usage));
  }
  return lines;
}

function typeLines(tokens: TokenFile): string[] {
  const lines = [];
  const sans = tokens.type.families.sans;
  const mono = tokens.type.families.mono;
  lines.push(declaration("font-sans", sans, "Geist with CJK fallbacks."));
  lines.push(declaration("font-mono", mono, "Geist Mono with CJK fallbacks."));
  for (const group of tokens.type.groups) {
    const size = group.fluidSize || group.fontSize;
    const family = group.family === "mono" ? "var(--font-mono)" : "var(--font-sans)";
    const shorthand = `${group.fontWeight} ${size}/${group.lineHeight} ${family}`;
    lines.push(declaration(`type-${group.name}-size`, size, group.usage));
    lines.push(declaration(`type-${group.name}-line`, group.lineHeight));
    lines.push(declaration(`type-${group.name}-weight`, String(group.fontWeight)));
    lines.push(declaration(`type-${group.name}-tracking`, group.letterSpacing || "0"));
    lines.push(declaration(`text-${group.name}`, shorthand, group.usage));
  }
  return lines;
}

function typeClasses(tokens: TokenFile): string {
  const chunks = [];
  for (const group of tokens.type.groups) {
    const lines = [
      `  font: var(--text-${group.name});`,
      `  letter-spacing: var(--type-${group.name}-tracking);`,
    ];
    if (["display", "heading-1", "heading-2", "heading-3", "heading-4"].includes(group.name)) {
      lines.push("  text-wrap: balance;");
    }
    chunks.push(block(`.uh-type-${group.name}`, lines));
    if (group.cjk) {
      const cjkLines = [
        `  line-height: ${group.cjk.lineHeight};`,
        `  letter-spacing: ${group.cjk.letterSpacing || "0"};`,
      ];
      chunks.push(
        block(`:lang(zh) .uh-type-${group.name},\n.uh-type-${group.name}:lang(zh)`, cjkLines),
      );
    }
  }
  return chunks.join("\n");
}

function fontFaces(tokens: TokenFile): string {
  return tokens.type.fonts
    .map(
      (font) =>
        `@font-face { font-family: "${font.family}"; src: url("${font.file}") format("woff2"); font-weight: ${font.weight}; font-style: ${font.style}; font-display: swap; }`,
    )
    .join("\n");
}

export function generateTokensCss(tokens: TokenFile): string {
  const lightColors = themeEntries(tokens.color, "light").map(([name, value, usage]) =>
    declaration(name, value, usage),
  );
  const darkColors = themeEntries(tokens.color, "dark").map(([name, value, usage]) =>
    declaration(name, value, usage),
  );
  const constants = constantEntries(tokens.color).map(([name, value, usage]) =>
    declaration(name, value, usage),
  );
  lightColors.push(
    ...themeEntries(tokens.shadow, "light").map(([name, value, usage]) =>
      declaration(name, value, usage),
    ),
  );
  darkColors.push(
    ...themeEntries(tokens.shadow, "dark").map(([name, value, usage]) =>
      declaration(name, value, usage),
    ),
  );

  const rootLines = [...constants, ...primitiveLines(tokens), ...typeLines(tokens)];

  return `/* uni-helper design tokens. Generated from tokens.json; do not edit by hand. */
${fontFaces(tokens)}

:root {
${rootLines.join("\n")}
}

${block(':root,\n[data-theme="light"]', ["  color-scheme: light;", ...lightColors])}
${block('[data-theme="dark"],\n.dark:not([data-theme="light"])', ["  color-scheme: dark;", ...darkColors])}
@media (prefers-color-scheme: dark) {
${block(":root:not([data-theme]):not(.dark)", ["  color-scheme: dark;", ...darkColors], "  ")}}

${typeClasses(tokens)}
.uh-nums {
  font-variant-numeric: tabular-nums;
}

.uh-measure {
  max-width: var(--measure);
}
`;
}

export function generateTailwindCss(tokens: TokenFile): string {
  const colors = tokens.color.tokens
    .map((token) => `  --color-${token.name}: var(--${token.name});`)
    .join("\n");
  const radii = constantEntries(tokens.radius)
    .map(([name, value]) => `  --radius-${name.replace(/^radius-/, "")}: ${value};`)
    .join("\n");
  const shadows = tokens.shadow.tokens
    .map((token) => `  --${token.name}: var(--${token.name});`)
    .join("\n");
  const containers = constantEntries(tokens.layout)
    .filter(([name]) => name.startsWith("container-"))
    .map(([name, value]) => `  --container-${name.replace(/^container-/, "")}: ${value};`)
    .join("\n");
  const breakpoints = tokens.layout.breakpoints
    .map((token) => `  --breakpoint-${token.name.replace(/^bp-/, "")}: ${token.value};`)
    .join("\n");
  return `/* Tailwind v4 theme bridge. Load after Tailwind's own imports. */
@import "../tokens.css";

@theme inline {
  --font-sans: ${tokens.type.families.sans};
  --font-mono: ${tokens.type.families.mono};
  --spacing: 4px;

${breakpoints}

${containers}

${colors}

${radii}

${shadows}
}
`;
}

export function generateNuxtUiCss(): string {
  return `/* Nuxt UI v4 bridge. Import after tokens.css and Nuxt UI's own theme. */
@import "../tokens.css";

:root {
  --ui-bg: var(--background);
  --ui-bg-muted: var(--muted);
  --ui-bg-elevated: var(--card);
  --ui-bg-accented: var(--accent);
  --ui-bg-inverted: var(--primary);
  --ui-border: var(--border);
  --ui-border-muted: var(--border);
  --ui-border-accented: var(--border-strong);
  --ui-text: var(--foreground);
  --ui-text-highlighted: var(--foreground);
  --ui-text-toned: var(--muted-foreground);
  --ui-text-muted: var(--muted-foreground);
  --ui-text-dimmed: var(--muted-foreground);
  --ui-text-inverted: var(--primary-foreground);
  --ui-primary: var(--primary);
  --ui-secondary: var(--foreground);
  --ui-info: var(--info);
  --ui-success: var(--success);
  --ui-warning: var(--warning);
  --ui-error: var(--error);
  --ui-chart-1: var(--chart-1);
  --ui-chart-2: var(--chart-2);
  --ui-chart-3: var(--chart-3);
  --ui-chart-4: var(--chart-4);
  --ui-chart-5: var(--chart-5);
  --ui-chart-6: var(--chart-6);
  --ui-container: var(--container-page);
  --ui-header-height: var(--header-height);
  --ui-radius: var(--radius-md);
}
`;
}

export function generateShadcnUiCss(): string {
  return `/* shadcn/ui Base UI bridge. Import after Tailwind and shadcn/tailwind.css. */
@import "./tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius: var(--radius-md);
  --color-sidebar: var(--muted);
  --color-sidebar-foreground: var(--foreground);
  --color-sidebar-primary: var(--primary);
  --color-sidebar-primary-foreground: var(--primary-foreground);
  --color-sidebar-accent: var(--accent);
  --color-sidebar-accent-foreground: var(--accent-foreground);
  --color-sidebar-border: var(--border);
  --color-sidebar-ring: var(--ring);
}
`;
}

function colorValue(token: Token, theme: "light" | "dark"): string {
  return typeof token.value === "string" ? token.value : token.value[theme];
}

function table(rows: string[]): string {
  return rows.join("\n");
}

export function generateTokensDoc(tokens: TokenFile): string {
  const colorRows = tokens.color.tokens.map((token) => {
    const light = colorValue(token, "light");
    const dark = colorValue(token, "dark");
    return `| \`${token.name}\` | \`${light}\` | \`${dark}\` | ${token.usage || ""} |`;
  });
  const typeRows = tokens.type.groups.map((group) => {
    const size = group.fluidSize ? `${group.fontSize} (${group.fluidSize})` : group.fontSize;
    return `| \`${group.name}\` | ${group.fontFamily} | ${size} | ${group.lineHeight} | ${group.fontWeight} | \`${group.letterSpacing || "0"}\` | ${group.usage || ""} |`;
  });
  const simple = (section: Section): string[] =>
    constantEntries(section).map(
      ([name, value, usage]) => `| \`${name}\` | \`${value}\` | ${usage || ""} |`,
    );
  const shadows = tokens.shadow.tokens.map(
    (token) =>
      `| \`${token.name}\` | \`${colorValue(token, "light")}\` | \`${colorValue(token, "dark")}\` | ${token.usage || ""} |`,
  );
  const durations = tokens.motion.durations.map(
    (token) => `| \`${token.name}\` | \`${token.value}\` | ${token.usage || ""} |`,
  );
  const easings = tokens.motion.easings.map(
    (token) => `| \`${token.name}\` | \`${token.value}\` | ${token.usage || ""} |`,
  );
  const breakpoints = tokens.layout.breakpoints.map(
    (token) => `| \`${token.name}\` | \`${token.value}\` | ${token.usage || ""} |`,
  );

  return `# Tokens

Generated from \`tokens.json\` (v${tokens.version}). Do not edit this file by hand; run \`pnpm build\`.

## Themes

- Light is the default. Set \`data-theme="light"\` or \`data-theme="dark"\` on \`<html>\`.
- \`.dark\` works for Nuxt UI and other tools that toggle a class.
- With no attribute and no class, the sheet follows \`prefers-color-scheme\`.
- An explicit attribute or class wins over the system preference. \`components.js\` stores a user choice in \`localStorage\` under \`uh-theme\`.
- Read \`uh-theme\` before the first paint to avoid a flash when the stored choice differs from the HTML default.

## Color

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
${table(colorRows)}

Brand constants do not change between themes. \`brand\` is for marks, diagrams, borders and large text; white on it is 3.67:1. Use \`brand-text\`, \`link\` or \`brand-cta\` when you need accessible brand-colored text or a filled brand action.

## Typography

| Style | Font | Size | Line height | Weight | Tracking | Usage |
| --- | --- | --- | --- | --- | --- | --- |
${table(typeRows)}

Classes are \`uh-type-{style}\`. Chinese text gets its own line height and zero tracking through \`:lang(zh)\`. Keep body text at 16px or larger.

## Spacing

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.spacing))}

## Radius

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.radius))}

## Border and focus

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.border))}

## Shadow

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
${table(shadows)}

## Motion

| Duration | Value | Usage |
| --- | --- | --- |
${table(durations)}

| Easing | Value | Usage |
| --- | --- | --- |
${table(easings)}

All motion respects \`prefers-reduced-motion: reduce\`.

## Layout

| Breakpoint | Value | Usage |
| --- | --- | --- |
${table(breakpoints)}

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.layout))}

## Controls and icons

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.control))}

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.icon))}

| Token | Value | Usage |
| --- | --- | --- |
${table(simple(tokens.opacity))}

## Contrast floor

- Body and secondary text: 4.5:1 on \`background\`, \`card\` and \`muted\` in both themes.
- Controls, input borders and status icons: 3:1.
- \`brand\`, \`border-strong\`, \`input\`, \`link\`, \`brand-text\`, \`brand-cta\` and status accents are audited in \`tests/design.test.ts\`.
`;
}

export function generateSkillFoundations(tokens: TokenFile): string {
  return generateTokensDoc(tokens)
    .replace("# Tokens\n", "# Foundations\n")
    .replace(
      `Generated from \`tokens.json\` (v${tokens.version}). Do not edit this file by hand; run \`pnpm build\`.`,
      "Values come from `assets/tokens.json`. The CSS build is `assets/tokens.css`.",
    )
    .replace("are audited in `tests/design.test.ts`.", "are audited against these floors.");
}

export function generateSkillComponents(): string {
  return fs
    .readFileSync(path.join(ROOT, "docs/components.md"), "utf8")
    .replaceAll("components/components.css", "assets/components.css")
    .replaceAll("components/components.js", "assets/components.js")
    .replaceAll("tokens.css", "assets/tokens.css")
    .replace(
      "The gallery in `components/index.html` shows every primitive in light and dark mode. ",
      "",
    )
    .replace("Load the token sheet first, then the component sheet. ", "");
}

function yamlString(value: string | number): string {
  return JSON.stringify(String(value));
}

export function generateFrontmatter(tokens: TokenFile): string {
  const constants = constantEntries(tokens.color);
  const light = themeEntries(tokens.color, "light");
  const dark = themeEntries(tokens.color, "dark");
  const lines = [
    "---",
    `version: ${tokens.version}`,
    `name: ${tokens.name}`,
    'description: "A neutral-first design system for uni-app tooling, documentation, and developer interfaces."',
    "colors:",
  ];
  for (const [name, value] of constants) lines.push(`  ${name}: ${yamlString(value)}`);
  lines.push("  light:");
  for (const [name, value] of light) lines.push(`    ${name}: ${yamlString(value)}`);
  lines.push("  dark:");
  for (const [name, value] of dark) lines.push(`    ${name}: ${yamlString(value)}`);
  lines.push("typography:");
  for (const group of tokens.type.groups) {
    lines.push(`  ${group.name}:`);
    lines.push(`    fontFamily: ${yamlString(group.fontFamily)}`);
    lines.push(`    fontSize: ${yamlString(group.fontSize)}`);
    lines.push(`    fontWeight: ${group.fontWeight}`);
    lines.push(`    lineHeight: ${yamlString(group.lineHeight)}`);
    lines.push(`    letterSpacing: ${yamlString(group.letterSpacing || "0")}`);
  }
  lines.push("rounded:");
  for (const [name, value] of constantEntries(tokens.radius))
    lines.push(`  ${name.replace(/^radius-/, "")}: ${yamlString(value)}`);
  lines.push("spacing:");
  for (const [name, value] of constantEntries(tokens.spacing))
    lines.push(`  ${name}: ${yamlString(value)}`);
  const fast =
    tokens.motion.durations.find((item) => item.name === "duration-fast")?.value || "150ms";
  const slow =
    tokens.motion.durations.find((item) => item.name === "duration-slow")?.value || "300ms";
  const ease = tokens.motion.easings.find((item) => item.name === "ease-standard")?.value || "ease";
  const easeOut =
    tokens.motion.easings.find((item) => item.name === "ease-out")?.value || "ease-out";
  lines.push("motion:");
  lines.push("  state-change:");
  lines.push(`    duration: ${yamlString(fast)}`);
  lines.push(`    timingFunction: ${yamlString(ease)}`);
  lines.push("  brand-expand:");
  lines.push(`    duration: ${yamlString(slow)}`);
  lines.push(`    timingFunction: ${yamlString(easeOut)}`);
  lines.push("---");
  lines.push("");
  return lines.join("\n");
}

export function replaceFrontmatter(markdown: string, frontmatter: string): string {
  const next = markdown.replace(/^---\n[\s\S]*?\n---\n/, frontmatter);
  if (next === markdown && !markdown.startsWith(frontmatter)) {
    return `${frontmatter}${markdown}`;
  }
  return next;
}

export function generatedFiles(tokens: TokenFile): Record<string, string> {
  return {
    "tokens.css": generateTokensCss(tokens),
    "integrations/tailwind.css": generateTailwindCss(tokens),
    "integrations/nuxt-ui.css": generateNuxtUiCss(),
    "integrations/shadcn-ui.css": generateShadcnUiCss(),
    "docs/tokens.md": generateTokensDoc(tokens),
    "skills/uni-helper-design/references/components.md": generateSkillComponents(),
    "skills/uni-helper-design/references/foundations.md": generateSkillFoundations(tokens),
  };
}

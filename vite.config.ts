import { defineConfig } from "vite-plus";

const generated = [
  "CHANGELOG.md",
  "DESIGN.md",
  "tokens.css",
  "docs/tokens.md",
  "integrations/**",
  "skills/uni-helper-design/assets/**",
  "skills/uni-helper-design/references/**",
];

export default defineConfig({
  fmt: {
    ignorePatterns: generated,
  },
  lint: {
    ignorePatterns: generated,
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});

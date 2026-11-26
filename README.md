# uni-helper design

English | [中文](README.zh.md)

The design system for uni-helper. Neutral zinc surfaces, Geist type, brand-green marks, light and dark themes, and 30+ CSS primitives for documentation, websites, and developer tools.

## Install

```bash
pnpm add -D @uni-helper/design
```

Or copy the files you need from this repository. The CSS has no build step and no runtime dependencies.

## Quick start

Load the token sheet, the component sheet, and optionally the behavior file:

```html
<!doctype html>
<html lang="zh-CN" data-theme="light">
  <head>
    <script>
      try {
        const theme = localStorage.getItem("uh-theme");
        if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
      } catch {}
    </script>
    <link rel="stylesheet" href="node_modules/@uni-helper/design/tokens.css" />
    <link rel="stylesheet" href="node_modules/@uni-helper/design/components/components.css" />
    <script src="node_modules/@uni-helper/design/components/components.js" defer></script>
  </head>
  <body>
    <button class="uh-btn uh-btn--default" type="button">新建项目</button>
    <span class="uh-badge uh-badge--secondary">Beta</span>
  </body>
</html>
```

`data-theme` accepts `light` or `dark`. The `.dark` class is also supported for Nuxt UI compatibility. When neither is set, the system follows `prefers-color-scheme`; an explicit choice always wins.

The inline script applies a stored choice before the first paint. Remove `data-theme` from `<html>` if the page should follow the system preference instead.

`components.js` is optional. It powers the theme toggle (`data-theme-toggle`), tabs, dialogs (`data-dialog-open`), toasts (`data-toast-trigger`), and code copy (`data-copy-target`).

## Tokens

`tokens.json` is the only source of truth. `tokens.css`, the integration files, the DESIGN.md frontmatter, and the Skill assets and references are generated from it.

```css
--background, --foreground, --card, --card-foreground
--primary, --primary-foreground, --secondary, --muted, --accent
--border, --border-strong, --input, --ring
--link, --brand-text, --brand-cta
--brand, --brand-deep, --brand-mint, --brand-soft
--info, --success, --warning, --error
--space-1 ... --space-24
--radius-sm ... --radius-full
--shadow-sm, --shadow, --shadow-lg
--font-sans, --font-mono
```

Type classes use the `uh-type-*` prefix: `uh-type-display`, `uh-type-heading-1` to `uh-type-heading-4`, `uh-type-body`, `uh-type-small`, `uh-type-nav`, `uh-type-label`, `uh-type-field-label`, `uh-type-code`, `uh-type-kbd`. Chinese text gets its own line height and zero tracking through `:lang(zh)`.

See [docs/tokens.md](docs/tokens.md) for every token and [DESIGN.md](DESIGN.md) for the rules.

## Components

Load `components/components.css` after `tokens.css`. Use the classes directly; the full markup lives in [docs/components.md](docs/components.md) and the gallery in [components/index.html](components/index.html).

| Family     | Classes                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------ |
| Layout     | `uh-stack`, `uh-row`, `uh-container`, `uh-grid`                                            |
| Actions    | `uh-btn`, `uh-link`, `uh-ihb`                                                              |
| Labels     | `uh-badge`, `uh-kbd`                                                                       |
| Forms      | `uh-field`, `uh-input`, `uh-select`, `uh-textarea`, `uh-checkbox`, `uh-radio`, `uh-switch` |
| Feedback   | `uh-alert`, `uh-toast`, `uh-spinner`, `uh-skeleton`, `uh-empty`                            |
| Navigation | `uh-tabs`, `uh-breadcrumb`, `uh-pagination`, `uh-sidebar`, `uh-nav-item`, `uh-toc`         |
| Content    | `uh-card`, `uh-table`, `uh-prose`, `uh-code-block`, `uh-separator`                         |
| Overlay    | `uh-dialog`                                                                                |

Keep the fonts beside the CSS. If you copy `tokens.css` to another folder, update the two `@font-face` URLs.

## Integrations

### Tailwind CSS v4

```css
@import "tailwindcss";
@import "@uni-helper/design/tailwind.css";
```

This exposes `bg-background`, `text-muted-foreground`, `border-border-strong`, `rounded-lg`, `shadow-sm`, `max-w-page`, and the 4px spacing scale.

### Nuxt UI v4

```css
@import "tailwindcss";
@import "@nuxt/ui";
@import "@uni-helper/design/nuxt-ui.css";
```

The bridge maps Nuxt UI surfaces, borders, text, radii, container, header height, status colors, and chart slots to uni-helper tokens. Set `primary` and `neutral` to `zinc` in `app.config.ts` so the palettes that remain outside the bridge match the system:

```ts
export default defineAppConfig({
  ui: {
    colors: { primary: "zinc", neutral: "zinc" },
  },
});
```

Read [docs/integration.md](docs/integration.md) for theme switching, migration from HSL variables, and the full mapping.

## Repository contents

| Path                        | What it is                                                                     |
| --------------------------- | ------------------------------------------------------------------------------ |
| `tokens.json`               | The only value source.                                                         |
| `tokens.schema.json`        | JSON Schema for the token file.                                                |
| `tokens.css`                | Generated CSS variables, type classes, and font faces.                         |
| `components/components.css` | The component and layout styles.                                               |
| `components/components.js`  | Optional theme, tabs, dialog, toast, and copy behavior.                        |
| `components/index.html`     | A gallery of every primitive in light and dark mode.                           |
| `integrations/`             | Tailwind v4 and Nuxt UI v4 bridges.                                            |
| `docs/`                     | Token, component, and integration references.                                  |
| `skills/uni-helper-design/` | A self-contained Agent Skill with tokens, components, fonts, icons, and logos. |
| `assets/`                   | Logos, a 24-icon sprite, and the social card.                                  |
| `scripts/`                  | The build and release scripts.                                                 |
| `tests/`                    | Design and component behavior tests.                                           |

## Use the skill

`skills/uni-helper-design/` is a self-contained Agent Skill. Copy the folder into your agent's skills directory. It carries its own `tokens.css`, `components.css`, `components.js`, fonts, icons, and logos, so it works without the rest of this repository.

## Development

```bash
pnpm build   # regenerate CSS, integrations, docs, frontmatter, and the Skill
pnpm check   # format, lint, and type-check with Vite+
pnpm fix     # apply formatting and safe lint fixes
pnpm test    # Vitest design and component tests
```

Development uses Vite+ and needs Node 22.18+, 24.11+, or 26+.

Generated files keep the generator's format. `pnpm test` checks that they match it.

Do not edit generated files by hand. Change `tokens.json`, `docs/components.md`, `components/components.css`, `components/components.js`, or the scripts, then run `pnpm build` and `pnpm test`.

## Release

Run `pnpm check` and `pnpm test` after `pnpm release` and before publishing or pushing. The Release workflow does not run checks.

### 0.1.0

Publish the first version manually:

1. Commit all work.
2. Run `pnpm release`. It bumps the version, regenerates the token files and the Skill, updates `CHANGELOG.md`, commits, and creates a `v*` tag. It does not push or publish.
3. Run `npm publish --access public`.
4. Configure the npm trusted publisher for this repository.
5. Push the commit and tag:

```bash
git push --follow-tags
```

The `Release` workflow creates the GitHub release and skips npm because `0.1.0` is already published.

### Later releases

Run `pnpm release`, then `git push --follow-tags`. The `Release` workflow publishes to npm and creates the GitHub release.

## Principles

- **Neutral first.** Zinc ink and off-white surfaces carry the interface. Brand green is for marks, diagram shapes, and large accents.
- **Green is identity, not a primary action.** `--primary` is ink. The default primary button is not green. `--brand-cta` is an opt-in exception.
- **One action per view.** Use one default button per screen. Supporting actions use secondary, outline, or ghost.
- **4px grid.** Spacing starts at 2px, then 4, 8, 12, 16, 24, 32, 48, 64, 80, and 96px.
- **One radius family per control group.** 6px for controls, 8px for cards, 12px for media cards and dialogs.
- **Chinese first.** English appears in package names, APIs, and commands. Interface copy is direct and calm.
- **Accessibility is part of the system.** Body text passes 4.5:1 in both themes, control boundaries pass 3:1, every interactive element keeps a visible focus ring, and motion stops under `prefers-reduced-motion`.

## License

The system, code, and documentation are MIT licensed. Geist and Geist Mono are licensed under the SIL Open Font License 1.1; see `fonts/LICENSE.txt`. The uni-helper marks are trademarks of the uni-helper project. See `assets/logos/README.md` before use.

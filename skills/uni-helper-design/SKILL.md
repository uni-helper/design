---
name: uni-helper-design
description: Build interfaces with the uni-helper design system. Use when creating or reviewing a uni-helper website, documentation page, developer tool, or any UI that must match the organization's visual identity. The system covers neutral zinc surfaces, Geist type, brand-green marks, light and dark themes, layout primitives, forms, navigation, feedback, content, and overlays.
license: MIT
compatibility: Works with agents that can read local files and write HTML and CSS. No network access is required.
metadata:
  author: uni-helper
  version: "0.1.1"
---

# uni-helper design system

Use this skill to build a page, a component, or a review that matches uni-helper. The system is neutral-first: zinc ink and off-white surfaces carry the interface, and the brand green marks identity.

## Read first

1. `references/foundations.md` — colours, type, spacing, radius, elevation, motion, and accessibility.
2. `references/components.md` — markup and states for every primitive.

The repository's `DESIGN.md` has the full rationale. Read it only when the task needs the reasoning behind a rule.

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
    <link rel="stylesheet" href="assets/tokens.css" />
    <link rel="stylesheet" href="assets/components.css" />
    <script src="assets/components.js" defer></script>
  </head>
  <body>
    <button class="uh-btn uh-btn--default" type="button">新建项目</button>
    <span class="uh-badge uh-badge--secondary">Beta</span>
  </body>
</html>
```

`data-theme` accepts `light` or `dark`. `.dark` is also supported for Nuxt UI compatibility. When neither is set, the system follows `prefers-color-scheme`.

The inline script applies a stored choice before the first paint. Remove `data-theme` from `<html>` if the page should follow the system preference.

Keep `assets/fonts/` beside `assets/tokens.css`. If you copy the CSS to another folder, update the two `@font-face` URLs.

`assets/components.js` is optional. It powers `data-theme-toggle`, tabs, `data-dialog-open`, `data-toast-trigger`, and `data-copy-target`.

## Rules

- Use `--primary` for the one main action on a screen. It is zinc ink, not brand green.
- Use `--brand` for marks, diagram shapes, borders, and display-size text. White body text on `--brand` fails contrast.
- Use `--brand-text` or `--link` for accessible green text. Use `--brand-cta` only for one explicit brand action.
- Use `--foreground` for body text. Use `--muted-foreground` for secondary text. Do not set body text below 14px.
- Use `--input` for form-control borders and `--border` for decorative separators.
- Keep one default button per view. Supporting actions use secondary, outline, or ghost.
- Keep one radius family per control group: 6px for controls, 8px for cards, 12px for media cards and dialogs.
- Keep the focus ring visible. Use a 2px `--ring` outline with 2px offset; inputs keep both the border change and the outline.
- Set `aria-label` on icon-only buttons. Hide decorative icons from assistive technology.
- Stop motion under `prefers-reduced-motion: reduce`. Animate only colour, opacity, transform, clip-path, and shadows.
- Write Chinese first. Keep package names, APIs, paths, and commands in code format. English UI text uses sentence case.
- Do not use exclamation marks, urgency, or marketing superlatives.

## Components

Use the class names directly. Do not re-implement a primitive with local styles.

| Family                  | Classes                                                                                 | Notes                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Layout                  | `uh-stack`, `uh-row`, `uh-container`, `uh-grid`                                         | Stack and row gaps; 260px auto-fit grid.                                                              |
| Button                  | `uh-btn` + `uh-btn--{variant}`                                                          | Variants: default, secondary, outline, ghost, destructive, brand, link. Sizes: sm, default, lg, icon. |
| Link                    | `uh-link`                                                                               | Inline navigation only.                                                                               |
| InteractiveHoverButton  | `uh-ihb`                                                                                | One per view. Keep the label constant.                                                                |
| Badge                   | `uh-badge` + `uh-badge--{variant}`                                                      | Variants: default, secondary, outline, destructive. One or two words.                                 |
| Field                   | `uh-field`, `uh-field__label`, `uh-field__hint`, `uh-field__error`, `uh-field--invalid` | Wrap every control.                                                                                   |
| Input, select, textarea | `uh-input`, `uh-select`, `uh-textarea`                                                  | Pair with a visible label or `aria-label`.                                                            |
| Check, radio, switch    | `uh-check-row`, `uh-checkbox`, `uh-radio-row`, `uh-radio`, `uh-switch-row`, `uh-switch` | Native controls; the switch wraps a checkbox.                                                         |
| Alert                   | `uh-alert` + `uh-alert--{type}`                                                         | Types: info, warning, success, danger. Default has no modifier.                                       |
| Toast                   | `uh-toast-region`, `uh-toast`, `uh-toast--{type}`                                       | One message per event.                                                                                |
| Loading                 | `uh-spinner`, `uh-skeleton`                                                             | Skeleton variants: text, circle, block.                                                               |
| Empty                   | `uh-empty` + `uh-empty__*`                                                              | Say what belongs here and how to add it.                                                              |
| Tabs                    | `uh-tabs`, `uh-tab`, `uh-tab-panel`                                                     | ARIA tablist; `components.js` adds arrow keys.                                                        |
| Breadcrumb              | `uh-breadcrumb` + `uh-breadcrumb__*`                                                    | `aria-current="page"`.                                                                                |
| Pagination              | `uh-pagination`, `uh-pagination__link`                                                  | `aria-current="page"`.                                                                                |
| Sidebar                 | `uh-sidebar`, `uh-sidebar__label`, `uh-nav-item`                                        | One current item.                                                                                     |
| TOC                     | `uh-toc`, `uh-toc__list`, `uh-toc__link`                                                | `aria-current="true"`.                                                                                |
| Card                    | `uh-card`, `uh-card--media`, `uh-card__*`                                               | One destination per card.                                                                             |
| Table                   | `uh-table-wrap`, `uh-table`, `uh-table__num`                                            | Wrap for overflow; tabular numbers.                                                                   |
| Prose                   | `uh-prose`                                                                              | Documentation typography.                                                                             |
| Code block              | `uh-code-block` + `uh-code-block__*`                                                    | Optional header and copy button.                                                                      |
| Dialog                  | `uh-dialog` + `uh-dialog__*`                                                            | Native `<dialog>` with `showModal()`.                                                                 |
| Separator               | `uh-separator`, `uh-separator--vertical`                                                | Divides groups.                                                                                       |

`references/components.md` has complete markup for each family.

## Assets

- `assets/tokens.css` — CSS variables, type classes, and font faces.
- `assets/tokens.json` — token values as JSON.
- `assets/components.css` — component styles.
- `assets/components.js` — optional behavior.
- `assets/fonts/` — Geist and Geist Mono variable WOFF2 files.
- `assets/icons/uni-helper-icons.svg` — 24 symbols at 24px, 2px stroke.
- `assets/logos/` — the uni-helper mark and project marks. Read `assets/logos/README.md` before use.

Copy the files you need into the project. Keep `assets/fonts/` next to `assets/tokens.css`.

## Before delivery

- Check both themes. A dark surface must not reuse a light-only value.
- Check body text contrast at 4.5:1 or better and control boundaries at 3:1.
- Check the focus ring on every interactive element.
- Check that action labels describe the outcome.
- Check that no more than two font weights appear on one screen.
- Check that status has a title and a colour-independent cue.
- Check that decorative motion is absent and reduced motion is respected.
- Check icon-only buttons for `aria-label`.

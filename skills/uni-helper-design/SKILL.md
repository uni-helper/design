---
name: uni-helper-design
description: Build interfaces with the uni-helper design system. Use when creating or reviewing a uni-helper website, documentation page, developer tool, or any UI that must match the organization's visual identity. The system covers neutral zinc surfaces, Geist type, brand-green marks, light and dark themes, and nine base components.
license: MIT
compatibility: Works with agents that can read local files and write HTML and CSS. No network access is required.
metadata:
  author: uni-helper
  version: "1.0.0"
---

# uni-helper design system

Use this skill to build a page, a component, or a review that matches uni-helper. The system is neutral-first: zinc ink and off-white surfaces carry the interface, and the brand green marks identity.

## Read first

1. `references/foundations.md` — colors, type, spacing, radius, elevation, motion, and accessibility.
2. `references/components.md` — markup and states for the nine base components.

The repository's `DESIGN.md` has the full rationale. Read it only when the task needs the reasoning behind a rule.

## Quick start

Load the token sheet, then the component sheet:

```html
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/components.css">

<html data-theme="light">
  <body>
    <button class="uh-btn uh-btn--default">新建项目</button>
  </body>
</html>
```

`data-theme` accepts `light` or `dark`. The first theme is light.

Keep `assets/fonts/` beside `assets/tokens.css`. If you copy the CSS to another folder, update the two `@font-face` URLs.

## Rules

- Use `--primary` for the one main action on a screen. It is zinc ink, not brand green.
- Use `--brand` for marks, diagram shapes, borders, and display-size text. White body text on `--brand` fails contrast.
- Use `--foreground` for body text. Use `--muted-foreground` for secondary text on `--background`; do not place it on `--muted` below 14px.
- Keep one default button per view. Supporting actions use `--secondary`, `--outline`, or `--ghost`.
- Keep one radius family per control group: 6px for controls, 8px for cards, 12px for media cards.
- Keep the focus ring visible. Use a 2px `--ring` outline with 2px offset, or a 1px ring on inputs.
- Set `aria-label` on icon-only buttons. Hide decorative duplicate text from assistive technology.
- Stop motion under `prefers-reduced-motion: reduce`. Animate only `background-color`, `border-color`, `color`, `opacity`, and `transform`.
- Write Chinese first. Keep package names, APIs, paths, and commands in code format. English UI text uses sentence case.
- Do not use exclamation marks, urgency, or marketing superlatives.

## Components

Use the class names directly. Do not re-implement a component with local styles.

| Component | Class | Notes |
| --- | --- | --- |
| Button | `uh-btn` + `uh-btn--{variant}` | Variants: default, secondary, outline, ghost, destructive, link. Sizes: sm, default, lg, icon. |
| Badge | `uh-badge` + `uh-badge--{variant}` | Variants: default, secondary, outline, destructive. One or two words. |
| Input | `uh-input` | Pair with `uh-label` or an `aria-label`. |
| Label | `uh-label` | Required mark: `uh-label__required`. |
| Checkbox | `uh-checkbox` + `uh-check-row` | Native checkbox with the primary accent. |
| Alert | `uh-alert` + `uh-alert--{type}` | Types: info, warning, success, danger. Default has no modifier. |
| Kbd | `uh-kbd` | One key per cap. |
| Card | `uh-card` + `uh-card__*` | One destination per card. |
| InteractiveHoverButton | `uh-ihb` | One per view. Keep the label constant. |

`references/components.md` has complete markup for each component.

## Assets

- `assets/tokens.css` — CSS variables, type classes, and font faces.
- `assets/tokens.json` — token values as JSON.
- `assets/components.css` — component styles.
- `assets/fonts/` — Geist and Geist Mono variable WOFF2 files.
- `assets/logos/` — the uni-helper mark and project marks. Read `assets/logos/README.md` before use.

Copy the files you need into the project. Keep the `fonts/` folder next to `tokens.css`.

## Before delivery

- Check both themes. A dark surface must not reuse a light-only value.
- Check body text contrast at 4.5:1 or better. The destructive fill is 4.63:1 with its foreground.
- Check the focus ring on every interactive element.
- Check that the active button and link labels describe the outcome.
- Check that no more than two font weights appear on one screen.
- Check that decorative motion is absent and reduced motion is respected.

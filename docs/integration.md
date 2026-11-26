# Integration

The system ships three entry points:

| File                        | Use                                                                     |
| --------------------------- | ----------------------------------------------------------------------- |
| `tokens.css`                | A plain CSS project. Variables, type classes, and `@font-face`.         |
| `integrations/tailwind.css` | Tailwind CSS v4. Adds the token sheet and a `@theme inline` bridge.     |
| `integrations/nuxt-ui.css`  | Nuxt UI v4. Adds the token sheet and maps Nuxt UI's semantic variables. |

All three read from the generated token sheet. Do not copy values out of the tables in the documentation; use the variables.

## Plain CSS

```html
<link rel="stylesheet" href="/design/tokens.css" />
<link rel="stylesheet" href="/design/components/components.css" />
<script src="/design/components/components.js" defer></script>
```

```html
<html lang="zh-CN" data-theme="light">
  <body class="uh-type-body">
    <main class="uh-container uh-stack">
      <h1 class="uh-type-display">uni-helper</h1>
      <p>为 uni-app 生态提供可靠的开发工具。</p>
      <button class="uh-btn uh-btn--default" type="button">新建项目</button>
    </main>
  </body>
</html>
```

Keep `fonts/` as a sibling of `tokens.css`. The generated `@font-face` rules use `url("fonts/Geist.woff2")` and `url("fonts/GeistMono.woff2")`. If you move the CSS, update both URLs. The CJK faces are not bundled; the stack falls back to the system.

## Theme

The token sheet declares the light theme on `:root` and `[data-theme="light"]`, the dark theme on `[data-theme="dark"]` and `.dark`, and a `prefers-color-scheme: dark` fallback on `:root:not([data-theme]):not(.dark)`.

```html
<html data-theme="dark">
```

```html
<html class="dark">
```

- An explicit `data-theme` wins over the system preference.
- `.dark` exists for Nuxt UI and other tools that toggle the class.
- `components.js` stores the explicit choice in `localStorage` under `uh-theme`.
- A component can set `data-theme` on its own root to show the other theme.
- Do not place theme values on `body` only; the generated fallback targets `:root`.

To keep a stored choice from flashing the wrong theme on load, read it before the first paint:

```html
<script>
  try {
    const theme = localStorage.getItem("uh-theme");
    if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  } catch {}
</script>
```

Place the script in `<head>` before the stylesheets.

If your app owns the theme, skip `components.js` and set the attribute or class yourself:

```js
document.documentElement.dataset.theme = isDark ? "dark" : "light";
```

## Tailwind CSS v4

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@uni-helper/design/tailwind.css";

@theme {
  /* Project-specific additions go here. */
}
```

The compiled CSS keeps the `@font-face` URLs as `fonts/Geist.woff2` and `fonts/GeistMono.woff2`. If your bundler writes the stylesheet outside the package root, copy `fonts/` beside the output CSS or add a resolver for those paths, then verify the network panel. Plain `<link>` use keeps the fonts beside `tokens.css`, so no extra step is needed.

The bridge maps:

- `--color-*` for every semantic, brand, status, chart, code, and overlay token;
- `--radius-*` for the five radii;
- `--shadow-*` for `sm`, default, and `lg`;
- `--font-sans` and `--font-mono` with the CJK fallback stacks;
- `--spacing: 4px` so `p-4` is 16px;
- `--breakpoint-*` for 640, 768, 1024, and 1280px;
- `--container-narrow`, `--container-page`, and `--container-wide` for `max-w-*`.

Examples:

```html
<div class="bg-background text-foreground">
  <div class="mx-auto max-w-page px-4">
    <button class="rounded-md bg-primary px-4 py-2 text-primary-foreground">新建项目</button>
    <p class="text-muted-foreground">次要说明</p>
    <div class="border border-border-strong bg-card shadow-sm">...</div>
  </div>
</div>
```

Use `border-border` for decorative separators and `border-input` for form controls. Both compile because the bridge exposes every colour token.

The bridge uses `@theme inline`, so a class resolves to `var(--background)` rather than to a copied hex value. Theme switching therefore keeps working without rebuilding or duplicating utilities.

### Opacity modifiers

Because the bridge stores real colours (`#ffffff`, `rgb(9 9 11 / 0.48)`) rather than HSL channel triples, Tailwind's `bg-background/80` and `text-foreground/60` modifiers use `color-mix` and work in both themes. Do not wrap the variables in `hsl()`; that was the old website pattern and it is not compatible with this token sheet.

## Nuxt UI v4

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";
@import "@uni-helper/design/nuxt-ui.css";
```

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "zinc",
      neutral: "zinc",
    },
  },
});
```

The bridge maps these Nuxt UI variables:

| Nuxt UI variable                                          | uni-helper token             |
| --------------------------------------------------------- | ---------------------------- |
| `--ui-bg`                                                 | `--background`               |
| `--ui-bg-muted`                                           | `--muted`                    |
| `--ui-bg-elevated`                                        | `--card`                     |
| `--ui-bg-accented`                                        | `--accent`                   |
| `--ui-bg-inverted`                                        | `--primary`                  |
| `--ui-border`, `--ui-border-muted`                        | `--border`                   |
| `--ui-border-accented`                                    | `--border-strong`            |
| `--ui-text`, `--ui-text-highlighted`                      | `--foreground`               |
| `--ui-text-toned`, `--ui-text-muted`, `--ui-text-dimmed`  | `--muted-foreground`         |
| `--ui-text-inverted`                                      | `--primary-foreground`       |
| `--ui-primary`                                            | `--primary` (ink, not green) |
| `--ui-secondary`                                          | `--foreground`               |
| `--ui-info`, `--ui-success`, `--ui-warning`, `--ui-error` | matching status token        |
| `--ui-chart-1` ... `--ui-chart-6`                         | matching chart token         |
| `--ui-container`                                          | `--container-page`           |
| `--ui-header-height`                                      | `--header-height`            |
| `--ui-radius`                                             | `--radius-md`                |

Set `primary` and `neutral` to `zinc` so the palette shades that Nuxt UI still generates match the system. The bridge then overrides the semantic shortcuts. If you leave `primary` as the default `green`, some Nuxt UI components will derive green shades that the bridge does not replace.

The system's primary action is ink. Do not set `primary: 'green'` to make the brand green the main button. If you need one brand moment, use `uh-btn--brand` or `--brand-cta` directly, and keep it rare.

Nuxt UI's colour mode toggles `.dark` on `<html>`. The token sheet supports that class, so no extra dark selector is needed. If you use Nuxt UI's `useColorMode`, keep the explicit `data-theme` in sync only if another part of the page reads it.

## Migrating an existing HSL theme

The current website stylesheet uses channel triples:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --primary: 240 6% 10%;
  --border: 240 6% 90%;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
}
```

The design system uses complete colours:

```css
:root {
  --background: #ffffff;
  --foreground: #09090b;
  --primary: #18181b;
  --border: #e4e4e7;
}

.dark {
  --background: #09090b;
  --foreground: #fafafa;
}
```

To migrate:

1. Load `tokens.css` before the project stylesheet and delete the local HSL token block.
2. Replace `hsl(var(--token))` and `hsl(var(--token) / <alpha>)` with `var(--token)` or `color-mix(in srgb, var(--token) 80%, transparent)`.
3. Rename old tokens to the semantic names in `docs/tokens.md`. The common changes are `--border` to `--border` for separators, and a new `--input` for control outlines. The old single border token was too light for form boundaries.
4. Replace the old chart palette with `--chart-1` to `--chart-6`.
5. Replace the old code colours with `--code-*`.
6. Add `data-theme="light"` in the document shell if the app has a theme switcher; keep `.dark` if Nuxt UI already writes it.
7. Replace ad hoc type rules with `uh-type-*` classes, or copy the `--text-*` and `--type-*` variables.
8. Check every page in both themes. The dark card is now lighter than the page; this is intentional.
9. Run the project's visual checks. The check script in this repository only audits the system, not the consuming app.

Do not migrate by copying hex values into the consumer. Import the token sheet so future token changes reach the app.

## Framework notes

### Vue and Nuxt

Use the classes and ARIA attributes from `docs/components.md`. Let Vue own open state, selected tabs, and toasts:

```vue
<button class="uh-btn uh-btn--default" type="button" @click="publish">
  发布
</button>
```

If you use `components.js` alongside Vue, avoid mounting it on a subtree that Vue re-renders. Prefer the framework implementation for interactive state.

### Static HTML

`components.js` is enough for the gallery, prototypes, and plain HTML pages. It uses event delegation, so new markup with the documented data attributes works without re-initialization.

### Print

No print styles are included. Hide navigation and dialogs in the consumer, and let `uh-prose` carry the document. Borders print more reliably than shadows.

## Accessibility checks

Before shipping:

- Tab through the page. Every interactive element shows a 2px focus outline at 2px offset, or the input's border plus outline.
- Check body and secondary text in both themes. The audited floors are in `docs/tokens.md`.
- Check control boundaries. `--input` and `--border-strong` clear 3:1.
- Check status messages. They must have a title and a colour-independent cue.
- Check icon-only buttons. They need an `aria-label`.
- Check reduced motion. Decorative transitions and loading loops stop.
- Check forced colors. The focus outline maps to `Highlight`.
- Check coarse pointers. Buttons, inputs, selects, tabs, pagination, and navigation items grow to 44px.

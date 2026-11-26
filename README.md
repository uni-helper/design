# uni-helper design

English | [中文](README.zh.md)

The design system for uni-helper. Neutral surfaces, Geist type, brand-green marks, and nine base components for documentation, websites, and developer tools.

## What is here

| Path | What it is |
| --- | --- |
| `DESIGN.md` | The design system in the DESIGN.md format: machine-readable tokens and the rules for using them. |
| `tokens.css` | CSS custom properties for both themes, type classes, and `@font-face` rules. |
| `tokens.json` | The same token values as JSON, for build tools and design tools. |
| `components/components.css` | Styles for the nine base components. Reads only variables from `tokens.css`. |
| `components/index.html` | A gallery of every component in light and dark mode. |
| `assets/logos/` | The uni-helper mark and the project marks. |
| `assets/social/` | The 1200×600 social card. |
| `fonts/` | Geist and Geist Mono variable WOFF2 files. |
| `skills/uni-helper-design/` | A self-contained Agent Skill with the system, fonts, logos, and component styles. |

## Use the tokens

Load `tokens.css` and set the theme on the root element:

```html
<link rel="stylesheet" href="tokens.css">

<html data-theme="dark">
  <body>
    <button class="uh-btn uh-btn--default">新建项目</button>
  </body>
</html>
```

The first theme is light. `data-theme="dark"` switches the semantic values. A component can set the attribute on its own root when it must show the other theme.

The common variables:

```css
--background, --foreground, --muted, --muted-foreground
--primary, --primary-foreground, --border, --ring
--brand, --brand-deep, --brand-mint, --brand-soft
--space-1 ... --space-24
--radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full
--shadow-sm, --shadow, --shadow-lg
--font-sans, --font-mono
```

Type classes match the scale: `display`, `heading-1` to `heading-4`, `body`, `small`, `nav`, `label`, `code`, `kbd`.

Keep `fonts/` beside `tokens.css`. If you copy `tokens.css` to another folder, update the two `@font-face` URLs.

## Use the components

Load `components/components.css` after `tokens.css`. The gallery uses the same markup that ships in the stylesheet:

```html
<button class="uh-btn uh-btn--default">新建项目</button>
<span class="uh-badge uh-badge--secondary">Beta</span>
<input class="uh-input" type="text" placeholder="搜索文档...">
```

The nine components are Button, Badge, Input, Label, Checkbox, Alert, Kbd, Card, and InteractiveHoverButton. `DESIGN.md` has the rules; `components/index.html` has the markup and states.

## Use the skill

`skills/uni-helper-design/` is a self-contained Agent Skill. Copy the folder into your agent's skills directory. It carries its own `tokens.css`, `components.css`, fonts, and logos, so it works without the rest of this repository.

The skill tells an agent when to use the system, which tokens to reach for, and how to build the components. It follows the Agent Skills specification.

## Principles

- **Neutral first.** Zinc ink and off-white surfaces carry the interface. The brand green is for marks, diagram shapes, and large accents.
- **Green is identity, not a primary action.** `--primary` is ink. A primary button is not green.
- **One action per view.** Use one default button per screen. Supporting actions use secondary, outline, or ghost.
- **4px grid.** Spacing starts at 2px, then 4, 8, 12, 16, 24, 32, 48, 64, 80, and 96px.
- **One radius family per control group.** 6px for controls, 8px for cards, 12px for media cards.
- **Chinese first.** English appears in package names, APIs, and commands. Interface copy is direct and calm.
- **Accessibility is part of the system.** Every interactive element keeps a visible focus ring. Body text passes 4.5:1 in both themes. Motion stops under `prefers-reduced-motion`.

## Validate

```bash
npx @google/design.md lint DESIGN.md
```

The linter reports 0 errors. Its current release reports one warning for the `motion` token block because it does not recognize that key yet; the block follows the published specification.

## License

The system, code, and documentation are MIT licensed. Geist and Geist Mono are licensed under the SIL Open Font License 1.1; see `fonts/LICENSE.txt`. The uni-helper marks are trademarks of the uni-helper project. See `assets/logos/README.md` for use.

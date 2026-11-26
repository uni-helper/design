# Foundations

Values come from `assets/tokens.json`. The CSS build is `assets/tokens.css`.

## Themes

| Theme | Selector | Use |
| --- | --- | --- |
| Light | `data-theme="light"` | Default. |
| Dark | `data-theme="dark"` | Low-light interfaces. |

The light theme is the fallback. Set the attribute on `<html>` or on the root of a component that must show the other theme.

## Color

### Semantic colors

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#ffffff` | `#09090b` | Page background. |
| `--foreground` | `#09090b` | `#fafafa` | Body text. |
| `--card` | `#ffffff` | `#09090b` | Card surface. |
| `--card-foreground` | `#09090b` | `#fafafa` | Text on card. |
| `--popover` | `#ffffff` | `#09090b` | Menus and floating panels. |
| `--popover-foreground` | `#09090b` | `#fafafa` | Text on popover. |
| `--primary` | `#18181b` | `#fafafa` | Main action fill. |
| `--primary-foreground` | `#fafafa` | `#18181b` | Text on primary. |
| `--secondary` | `#f4f4f5` | `#27272a` | Secondary button and quiet fill. |
| `--secondary-foreground` | `#18181b` | `#fafafa` | Text on secondary. |
| `--muted` | `#f4f4f5` | `#27272a` | Code blocks and hover state. |
| `--muted-foreground` | `#71717a` | `#a1a1aa` | Secondary text. |
| `--accent` | `#f4f4f5` | `#27272a` | Selected and hovered surface. |
| `--accent-foreground` | `#18181b` | `#fafafa` | Text on accent. |
| `--destructive` | `#dc2626` | `#7f1d1d` | Destructive action fill. |
| `--destructive-foreground` | `#fafafa` | `#fafafa` | Text on destructive. |
| `--border` | `#e4e4e7` | `#27272a` | 1px separator. |
| `--input` | `#e4e4e7` | `#27272a` | Form outline. |
| `--ring` | `#18181b` | `#d4d4d8` | Focus ring. |

### Brand colors

| Token | Value | Use |
| --- | --- | --- |
| `--brand` | `#2b9939` | The mark and large accents. |
| `--brand-deep` | `#1c6325` | Grounds and pressed states. |
| `--brand-mint` | `#8acb9b` | Secondary marks and diagram strokes. |
| `--brand-soft` | `#a9d6b0` | Tints and diagram fills. |

The brand colors do not change between themes. White text on `--brand` reaches 3.67:1, so use the green for marks and large display text, not body copy.

### Status colors

| Token | Value | Use |
| --- | --- | --- |
| `--info` | `oklch(62.3% 0.214 259.815)` | Info border and icon. |
| `--success` | `oklch(72.3% 0.219 149.579)` | Success border and icon. |
| `--warning` | `oklch(79.5% 0.184 86.047)` | Warning border and icon. |
| `--error` | `oklch(63.7% 0.237 25.331)` | Error border and icon. |

Status text stays `--foreground`. The hue appears on the border, the icon, or a tinted background.

## Typography

| Style | Font | Size / line | Weight | Use |
| --- | --- | --- | --- | --- |
| `display` | Geist | 36px / 1.1 | 800 | Document h1. |
| `heading-1` | Geist | 30px / 1.2 | 600 | Document h2. |
| `heading-2` | Geist | 24px / 1.3 | 600 | Document h3 and card title. |
| `heading-3` | Geist | 20px | 600 | Document h4. |
| `heading-4` | Geist | 18px | 600 | Document h5. |
| `body` | Geist | 16px / 1.75 | 400 | Long-form text. |
| `small` | Geist | 14px / 20px | 400 | Tables and captions. |
| `nav` | Geist | 14px / 20px | 600 | Navigation and button labels. |
| `label` | Geist | 12px / 16px | 600 | Badges and compact labels. |
| `code` | Geist Mono | 14px / 20px | 400 | Inline code and code blocks. |
| `kbd` | Geist Mono | 10px / 1 | 500 | Key caps. |

`display`, `heading-1`, and `heading-2` use `-0.025em` letter-spacing. All other styles use normal spacing.

The sans stack is `Geist, Noto Sans SC, Noto Sans CJK SC, ui-sans-serif, system-ui, sans-serif`. The mono stack is `Geist Mono, Noto Sans Mono CJK SC, ui-monospace, monospace`. Chinese renders in the system CJK face when Noto is not installed.

Keep body text at 16px. Do not use more than two weights on one screen.

## Spacing

The scale uses a 4px step with a 2px half-step.

| Token | Value |
| --- | --- |
| `--space-0-5` | 2px |
| `--space-1` | 4px |
| `--space-1-5` | 6px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

Use 8px for inline gaps, 12px for control padding, 16px for card padding and page gutters, and 24px for block gaps. Separate groups with at least 24px. Page bands use 64px to 96px.

## Radius

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | 4px | Badges and key caps. |
| `--radius-md` | 6px | Buttons, inputs, and menu items. |
| `--radius-lg` | 8px | Cards, popovers, and alerts. |
| `--radius-xl` | 12px | Media cards. |
| `--radius-full` | 9999px | Pills, avatars, and dots. |

Keep one radius family per control group. Do not mix 6px and 8px on one control.

## Elevation

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Controls and small cards. |
| `--shadow` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Raised cards. |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Dialogs and popovers. |

Borders carry most of the separation. Use one shadow level per surface. A raised card uses `--shadow` with a 1px border. Menus and dialogs use `--shadow-lg`.

## Motion

| Token | Duration | Easing | Use |
| --- | --- | --- | --- |
| `state-change` | 150ms | `ease` | Hover, focus, and color changes. |
| `brand-expand` | 300ms | `ease` | The brand button dot and label. |

Animate only `background-color`, `border-color`, `color`, `opacity`, and `transform`. Under `prefers-reduced-motion: reduce`, set transition durations to 1ms. Focus rings appear without animation.

## Accessibility

- Body text reaches 4.5:1 or better in both themes.
- `--muted-foreground` on `--background` reaches 4.83:1 in light and 7.76:1 in dark. It is not for small text on `--muted`.
- `--destructive` with `--destructive-foreground` reaches 4.63:1 in light. The dark pair is stronger.
- `--primary` with `--primary-foreground` reaches 16.97:1 in both themes.
- White text on `--brand` reaches 3.67:1. Use it only for large display text, never body text.
- Status is never carried by color alone. Pair it with an icon and a title.
- Every interactive element keeps a visible focus ring. Inputs use a 1px ring; other controls use a 2px outline with 2px offset.

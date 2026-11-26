---
version: alpha
name: uni-helper
description: A neutral-first design system for uni-app tooling, documentation, and developer interfaces.
colors:
  brand: "#2b9939"
  brand-deep: "#1c6325"
  brand-mint: "#8acb9b"
  brand-soft: "#a9d6b0"
  info: "oklch(62.3% 0.214 259.815)"
  success: "oklch(72.3% 0.219 149.579)"
  warning: "oklch(79.5% 0.184 86.047)"
  error: "oklch(63.7% 0.237 25.331)"
  primary: "#18181b"
  primary-foreground: "#fafafa"
  light:
    background: "#ffffff"
    foreground: "#09090b"
    card: "#ffffff"
    card-foreground: "#09090b"
    popover: "#ffffff"
    popover-foreground: "#09090b"
    secondary: "#f4f4f5"
    secondary-foreground: "#18181b"
    muted: "#f4f4f5"
    muted-foreground: "#71717a"
    accent: "#f4f4f5"
    accent-foreground: "#18181b"
    destructive: "#dc2626"
    destructive-foreground: "#fafafa"
    border: "#e4e4e7"
    input: "#e4e4e7"
    ring: "#18181b"
  dark:
    background: "#09090b"
    foreground: "#fafafa"
    card: "#09090b"
    card-foreground: "#fafafa"
    popover: "#09090b"
    popover-foreground: "#fafafa"
    primary: "#fafafa"
    primary-foreground: "#18181b"
    secondary: "#27272a"
    secondary-foreground: "#fafafa"
    muted: "#27272a"
    muted-foreground: "#a1a1aa"
    accent: "#27272a"
    accent-foreground: "#fafafa"
    destructive: "#7f1d1d"
    destructive-foreground: "#fafafa"
    border: "#27272a"
    input: "#27272a"
    ring: "#d4d4d8"
typography:
  display:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.025em
  heading-1:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.025em
  heading-2:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.025em
  heading-3:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 600
  heading-4:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 600
  body:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
  small:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  nav:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  label:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
  code:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  kbd:
    fontFamily: Geist Mono
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  space-0-5: 2px
  space-1: 4px
  space-1-5: 6px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  space-20: 80px
  space-24: 96px
motion:
  state-change:
    duration: 150ms
    timingFunction: ease
  brand-expand:
    duration: 300ms
    timingFunction: ease
components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-default-dark:
    backgroundColor: "{colors.dark.primary}"
    textColor: "{colors.dark.primary-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-secondary:
    backgroundColor: "{colors.light.secondary}"
    textColor: "{colors.light.secondary-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-secondary-dark:
    backgroundColor: "{colors.dark.secondary}"
    textColor: "{colors.dark.secondary-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-outline:
    backgroundColor: "{colors.light.background}"
    textColor: "{colors.light.foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-outline-dark:
    backgroundColor: "{colors.dark.background}"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-ghost:
    backgroundColor: "{colors.light.accent}"
    textColor: "{colors.light.accent-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-ghost-dark:
    backgroundColor: "{colors.dark.accent}"
    textColor: "{colors.dark.accent-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-destructive:
    backgroundColor: "{colors.light.destructive}"
    textColor: "{colors.light.destructive-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  button-destructive-dark:
    backgroundColor: "{colors.dark.destructive}"
    textColor: "{colors.dark.destructive-foreground}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-4}"
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 20px
    padding: "{spacing.space-2}"
  badge-default-dark:
    backgroundColor: "{colors.dark.primary}"
    textColor: "{colors.dark.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 20px
    padding: "{spacing.space-2}"
  input-field:
    backgroundColor: "{colors.light.background}"
    textColor: "{colors.light.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-3}"
  input-field-dark:
    backgroundColor: "{colors.dark.background}"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    height: 36px
    padding: "{spacing.space-3}"
  card:
    backgroundColor: "{colors.light.card}"
    textColor: "{colors.light.card-foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.xl}"
    padding: "{spacing.space-6}"
  card-dark:
    backgroundColor: "{colors.dark.card}"
    textColor: "{colors.dark.card-foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.xl}"
    padding: "{spacing.space-6}"
  popover:
    backgroundColor: "{colors.light.popover}"
    textColor: "{colors.light.popover-foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  popover-dark:
    backgroundColor: "{colors.dark.popover}"
    textColor: "{colors.dark.popover-foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-info:
    backgroundColor: "color-mix(in srgb, oklch(62.3% 0.214 259.815) 8%, #ffffff)"
    textColor: "{colors.light.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-info-dark:
    backgroundColor: "color-mix(in srgb, oklch(62.3% 0.214 259.815) 8%, #09090b)"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-success:
    backgroundColor: "color-mix(in srgb, oklch(72.3% 0.219 149.579) 8%, #ffffff)"
    textColor: "{colors.light.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-success-dark:
    backgroundColor: "color-mix(in srgb, oklch(72.3% 0.219 149.579) 8%, #09090b)"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-warning:
    backgroundColor: "color-mix(in srgb, oklch(79.5% 0.184 86.047) 8%, #ffffff)"
    textColor: "{colors.light.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-warning-dark:
    backgroundColor: "color-mix(in srgb, oklch(79.5% 0.184 86.047) 8%, #09090b)"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-danger:
    backgroundColor: "color-mix(in srgb, oklch(63.7% 0.237 25.331) 8%, #ffffff)"
    textColor: "{colors.light.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-danger-dark:
    backgroundColor: "color-mix(in srgb, oklch(63.7% 0.237 25.331) 8%, #09090b)"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  alert-info-icon:
    backgroundColor: "{colors.info}"
    width: 20px
    height: 20px
  alert-success-icon:
    backgroundColor: "{colors.success}"
    width: 20px
    height: 20px
  alert-warning-icon:
    backgroundColor: "{colors.warning}"
    width: 20px
    height: 20px
  kbd:
    backgroundColor: "{colors.light.muted}"
    textColor: "{colors.light.foreground}"
    typography: "{typography.kbd}"
    rounded: "{rounded.sm}"
    height: 20px
    padding: "{spacing.space-1}"
  kbd-dark:
    backgroundColor: "{colors.dark.muted}"
    textColor: "{colors.dark.foreground}"
    typography: "{typography.kbd}"
    rounded: "{rounded.sm}"
    height: 20px
    padding: "{spacing.space-1}"
  text-secondary:
    textColor: "{colors.light.muted-foreground}"
    typography: "{typography.small}"
  text-secondary-dark:
    textColor: "{colors.dark.muted-foreground}"
    typography: "{typography.small}"
  divider:
    backgroundColor: "{colors.light.border}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.dark.border}"
    height: 1px
  input-border:
    backgroundColor: "{colors.light.input}"
    height: 1px
  input-border-dark:
    backgroundColor: "{colors.dark.input}"
    height: 1px
  focus-ring:
    backgroundColor: "{colors.light.ring}"
    height: 2px
  focus-ring-dark:
    backgroundColor: "{colors.dark.ring}"
    height: 2px
  brand-mark:
    backgroundColor: "{colors.brand}"
    width: 40px
    height: 40px
  brand-mark-deep:
    backgroundColor: "{colors.brand-deep}"
    width: 40px
    height: 40px
  brand-mark-mint:
    backgroundColor: "{colors.brand-mint}"
    width: 40px
    height: 40px
  brand-mark-soft:
    backgroundColor: "{colors.brand-soft}"
    width: 40px
    height: 40px
---

# uni-helper

## Overview

uni-helper makes tooling, templates, and documentation for the uni-app ecosystem. The interface should feel like a well-kept workshop: quiet surfaces, exact labels, and no decorative noise around the work.

The system is neutral-first. Zinc ink and off-white surfaces carry almost every screen. The brand green appears in marks, diagram shapes, and large display accents. It does not fill primary buttons. This split keeps long documentation readable and lets the green stay recognisable as the brand.

Interfaces are compact but not cramped. Controls are 36px high, body text is 16px, and the spacing scale starts at 2px so that dense tool panels can align to the same rhythm as marketing pages.

The writing is Chinese-first. English appears in package names, APIs, and commands. The interface never uses exclamation marks or marketing superlatives.

## Colors

The palette has three jobs: neutral structure, brand identity, and status.

- **Background and foreground (#ffffff / #09090b in light, #09090b / #fafafa in dark):** Body surfaces and text. The pair reaches 19.9:1 in light and 19.06:1 in dark.
- **Primary (#18181b in light, #fafafa in dark):** The fill for the single main action on a screen. This is zinc ink, not brand green.
- **Primary foreground (#fafafa in light, #18181b in dark):** Text and icons on primary. The pair reaches 16.97:1 in both themes.
- **Secondary, muted, accent (#f4f4f5 in light, #27272a in dark):** Quiet fills for secondary buttons, code blocks, hover states, and selected rows. They share one value on purpose; the role is decided by the component.
- **Muted foreground (#71717a in light, #a1a1aa in dark):** Secondary text. It reaches 4.83:1 on light and 7.76:1 on dark.
- **Border and input (#e4e4e7 in light, #27272a in dark):** One-pixel separators and form outlines.
- **Ring (#18181b in light, #d4d4d8 in dark):** Keyboard focus. Never remove the focus ring.
- **Brand (#2b9939):** The uni-helper mark. White text on it reaches only 3.67:1, so use it for marks, borders, diagram fills, and display-size text. Do not set body copy in white on green.
- **Brand deep, mint, soft (#1c6325, #8acb9b, #a9d6b0):** Supporting greens for the three-shape mark, diagram grounds, and tints.
- **Info, success, warning, error:** Status accents. They color borders and icons. Message text stays foreground, so the reader never depends on hue alone.

The light and dark themes share token names. A component that shows a theme sets `data-theme` on its root. The first theme is the fallback.

`--destructive` (#dc2626) with `--destructive-foreground` (#fafafa) reaches 4.63:1 in light. The dark pair (#7f1d1d / #fafafa) is stronger still. The destructive fill is safe for labels at normal size.

## Typography

Geist carries every interface and document size. Geist Mono carries code, key caps, and fixed-width values. Chinese falls back to Noto Sans SC and then the system CJK face.

- **Display (36px / 1.1, 800):** Documentation h1. Letter-spacing is -0.025em.
- **Heading 1 (30px / 1.2, 600):** Documentation h2.
- **Heading 2 (24px / 1.3, 600):** Documentation h3 and card titles.
- **Heading 3 (20px, 600):** Documentation h4.
- **Heading 4 (18px, 600):** Documentation h5.
- **Body (16px / 1.75, 400):** Long-form text. Keep the measure near 70 characters.
- **Small (14px / 20px, 400):** Tables, captions, and secondary copy.
- **Nav (14px / 20px, 600):** Navigation, button labels, and field labels.
- **Label (12px / 16px, 600):** Badges and compact labels.
- **Code (14px / 20px, 400, Geist Mono):** Inline code and code blocks.
- **Kbd (10px / 1, 500, Geist Mono):** Key caps.

Use no more than two weights on one screen. Do not set body text below 14px. The tight letter-spacing belongs to display and heading sizes only.

## Layout

The spacing scale is built on a 4px step, with a 2px half-step for hairlines.

- 2px: divider inset and hairline gaps.
- 4px: icon-to-text gap.
- 8px: default inline gap.
- 12px: control padding.
- 16px: card padding and page gutter.
- 24px: card padding and block gap.
- 32px and 48px: section spacing.
- 64px to 96px: page bands and hero space.

Related controls share a gap. Separate groups with at least 24px. A card uses 24px inner padding. A page uses 16px gutters on small screens and 24px on large screens.

Content sits in a single column unless the content is a set of cards or a comparison. Cards align to a 16:9 media band. Text inside a card keeps the same left edge as its title.

## Elevation & Depth

Borders carry most of the separation. Shadows are a hint that a surface is above another; they never decorate.

- **shadow-sm:** Controls, inputs, and small cards.
- **shadow:** Raised cards.
- **shadow-lg:** Dialogs and popovers.

Use one shadow level per surface. A card with a border and `shadow-sm` is enough. Do not stack `shadow` on a card that already sits in a bordered container. Menus and dialogs use `shadow-lg` with a 1px border.

## Shapes

- **4px (sm):** Badges, key caps, and small controls.
- **6px (md):** Buttons, inputs, and menu items.
- **8px (lg):** Cards, popovers, alerts, and code blocks.
- **12px (xl):** Media cards and large containers.
- **9999px (full):** Pills, avatars, dots, and the brand button.

Keep one radius family per control group. A button, its input, and its menu item use 6px. A card and the alert inside it may use 8px. Pills are reserved for the brand action and status dots.

## Motion & Micro-interaction

State changes take 150ms and use `ease`. The brand button expands its dot over 300ms and slides the label out. Nothing loops, nothing bounces, and nothing moves without a state change.

Motion only animates `background-color`, `border-color`, `color`, `opacity`, and `transform`. Under `prefers-reduced-motion: reduce`, transitions drop to 1ms. Focus rings appear immediately; they never animate.

## Voice & Content Strategy

- **Tone:** Direct, technical, and calm. State the action and the result. Never use exclamation marks, urgency, or praise.
- **Language:** Chinese first. Keep package names, APIs, file paths, and commands in code format. English UI text uses sentence case.
- **Terminology:** Say 包 for an npm package, 插件 for a Vite or uni-app plugin, 模板 for a starter, and 文档 for documentation. Use one word for one concept.
- **Button and action labels:** Start with a verb: 新建项目, 查看文档, 发布. Keep Chinese labels to two to six characters. Do not end a label with punctuation.
- **Errors:** State what failed and the next action. "The build failed: fix the type error before exporting." Do not blame the reader.
- **Empty states:** Say what belongs in the list and how to add it. Do not use jokes.
- **Numbers and units:** Put a space between a number and its unit in prose (16 px). Keep versions and paths unbroken.

## Components

The canonical markup and states live in `@components/index.html`. Styles live in `@components/components.css`. Token values live in `@tokens.css` and `@tokens.json`.

- **Button:** Six variants (default, secondary, outline, ghost, destructive, link) and four sizes (sm, default, lg, icon). One default button per view. Icon-only buttons need an `aria-label`.
- **Badge:** Four variants. One or two words, never a sentence, never a button.
- **Input:** 36px high, 1px input border, 6px radius. Pair every input with a visible label or an `aria-label`.
- **Label:** 14px medium. Mark required fields with a destructive asterisk and set `required` on the control.
- **Checkbox:** Native 16px checkbox tinted with primary. Use for independent choices; use a switch for immediate settings.
- **Alert:** Default, info, warning, success, and danger. The title states the condition; the body states the action. Do not stack more than three on a page.
- **Kbd:** 20px key cap, one key per cap. Write a chord as separate caps.
- **Card:** One destination per card. The whole card may be a link, with no second link inside.
- **InteractiveHoverButton:** The brand pill for landing pages. One per view. The label stays constant; the hover layer repeats it for sighted users and is hidden from assistive technology.

## Do's and Don'ts

- Do use `--primary` for the main action and `--brand` for identity.
- Don't fill a primary button with brand green.
- Do keep body text at 16px and secondary text at 14px or larger.
- Don't use more than two font weights on one screen.
- Do use 6px radii for controls and 8px for cards.
- Don't mix 6px and 8px on the same control group.
- Do keep one default button per view.
- Don't use a badge as a button.
- Do keep status text in `--foreground` and the hue on the border or icon.
- Don't use color alone to carry status.
- Do keep the focus ring visible on every interactive element.
- Don't remove the focus ring or replace it with a color change.
- Do disable motion under `prefers-reduced-motion`.
- Don't animate layout properties.

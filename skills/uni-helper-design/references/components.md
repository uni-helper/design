# Components

Styles come from `assets/components.css`; values come from `assets/tokens.css`. Use the classes directly and keep the markup structure.

## Button

```html
<button class="uh-btn uh-btn--default" type="button">新建项目</button>
<button class="uh-btn uh-btn--secondary" type="button">Secondary</button>
<button class="uh-btn uh-btn--outline" type="button">Outline</button>
<button class="uh-btn uh-btn--ghost" type="button">Ghost</button>
<button class="uh-btn uh-btn--destructive" type="button">Delete</button>
<button class="uh-btn uh-btn--link" type="button">Link</button>
```

Sizes: `uh-btn--sm`, default, `uh-btn--lg`, `uh-btn--icon`.

```html
<button class="uh-btn uh-btn--outline uh-btn--icon" type="button" aria-label="Add">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
</button>
```

- Use one `uh-btn--default` per view.
- Use `uh-btn--destructive` only for an action that cannot be undone, and confirm before running it.
- An icon-only button needs an `aria-label`.
- Disabled buttons keep their label and use the `disabled` attribute.

## Badge

```html
<span class="uh-badge uh-badge--default">已发布</span>
<span class="uh-badge uh-badge--secondary">Beta</span>
<span class="uh-badge uh-badge--outline">WIP</span>
<span class="uh-badge uh-badge--destructive">Deprecated</span>
```

Use one or two words. A badge is not a button.

## Input and label

```html
<label class="uh-label" for="package-name">包名</label>
<input class="uh-input" id="package-name" type="text" placeholder="@uni-helper/uni-use">

<label class="uh-label" for="version">版本<span class="uh-label__required">*</span></label>
<input class="uh-input" id="version" type="text" value="0.9.0">
```

- Every input has a visible label or an `aria-label`.
- The placeholder is an example, not a label.
- The required asterisk is decorative. Set `required` or `aria-required` on the control.
- Focus uses a 1px `--ring` border and a 1px ring.

## Checkbox

```html
<label class="uh-check-row">
  <input class="uh-checkbox" type="checkbox" checked>
  ESLint
</label>
```

Use checkboxes for independent choices. Use a switch for an immediate setting that applies without saving. Group related boxes under a `fieldset` and `legend`.

## Alert

```html
<div class="uh-alert">
  <span class="uh-alert__icon"></span>
  <div>
    <p class="uh-alert__title">Default</p>
    <p class="uh-alert__body">The package ships with TypeScript types.</p>
  </div>
</div>
```

Add one type modifier: `uh-alert--info`, `uh-alert--warning`, `uh-alert--success`, or `uh-alert--danger`.

```html
<div class="uh-alert uh-alert--info">
  <span class="uh-alert__icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>
    </svg>
  </span>
  <div>
    <p class="uh-alert__title">Info</p>
    <p class="uh-alert__body">Run <code>pnpm dev</code> before opening the playground.</p>
  </div>
</div>
```

- The title states the condition. The body states the next action.
- Use the icon that matches the type. Do not swap in an unrelated icon.
- Do not stack more than three alerts on a page.

## Kbd

```html
<span class="uh-kbd">⌘</span>
<span class="uh-kbd">K</span>
<span class="uh-muted">搜索</span>
```

One key per cap. Write a chord as separate caps. Add `aria-label` when the glyph is ambiguous.

## Card

```html
<a class="uh-card" href="/packages/vite-plugin-uni-pages">
  <div class="uh-card__media">
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M44 66a22 22 0 1 1 22-22v22H44z" fill="var(--brand-soft)"/>
      <path d="M20 52a22 22 0 1 1 22 22H20V52z" fill="var(--brand-deep)"/>
      <circle cx="66" cy="66" r="20" fill="var(--brand)"/>
    </svg>
  </div>
  <div class="uh-card__body">
    <h3 class="uh-card__title">vite-plugin-uni-pages</h3>
    <p class="uh-card__description">File-based routing for uni-app.</p>
  </div>
  <div class="uh-card__footer">
    <span>@uni-helper</span>
    <span>v0.9</span>
  </div>
</a>
```

- One card is one destination. When the whole card is a link, put no second link inside it.
- The media band is 16:9. It is a preview, not a diagram.
- The footer carries owner and version or date, not actions.

## InteractiveHoverButton

```html
<button class="uh-ihb" type="button">
  <span class="uh-ihb__dot"></span>
  <span class="uh-ihb__label">开始使用</span>
  <span class="uh-ihb__hover" aria-hidden="true">
    开始使用
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </span>
</button>
```

- Use one per view, on a landing or hero section.
- Keep the label the same in the resting and hover states.
- The hover layer duplicates the label for sighted users. Mark it `aria-hidden="true"`.
- Use an `<a class="uh-ihb">` when the action navigates.

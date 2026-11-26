# Components

Styles come from `components/components.css`; values come from `tokens.css`. Load the token sheet first, then the component sheet. Use the classes directly and keep the markup structure.

The gallery in `components/index.html` shows every primitive in light and dark mode. `components/components.js` adds theme switching, tab keyboard navigation, native dialogs, toasts, and code copy. It is optional.

## Conventions

- Components are prefixed with `uh-`.
- A block uses `uh-block`; its parts use `uh-block__part`; a variant uses `uh-block--variant`.
- Sizes are `--sm`, default, `--lg`, or `--icon` where a component supports them.
- State uses native attributes and ARIA: `disabled`, `aria-current`, `aria-selected`, `aria-invalid`, `hidden`.
- Do not override component colours with local values. Use the semantic tokens.

## Layout

```html
<div class="uh-container">
  <div class="uh-stack">
    <div class="uh-row uh-row--between">
      <strong>包</strong>
      <span class="uh-type-small">12 个</span>
    </div>
    <div class="uh-grid">
      <div class="uh-card">...</div>
      <div class="uh-card">...</div>
    </div>
  </div>
</div>
```

- `uh-stack` is a vertical flex column with a 16px gap. Add `uh-stack--tight` for 8px or `uh-stack--loose` for 24px.
- `uh-row` is a wrapping horizontal flex row with a 12px gap. Add `uh-row--between` for space-between or `uh-row--start` for top alignment.
- `uh-container` caps at 1120px with 16px gutters. Add `uh-container--narrow` for 720px or `uh-container--wide` for 1440px.
- `uh-grid` auto-fits cards at a 260px minimum. `uh-grid--2`, `--3`, and `--4` become explicit columns from 768px up.

## Button

```html
<button class="uh-btn uh-btn--default" type="button">新建项目</button>
<button class="uh-btn uh-btn--secondary" type="button">次要操作</button>
<button class="uh-btn uh-btn--outline" type="button">导出</button>
<button class="uh-btn uh-btn--ghost" type="button">取消</button>
<button class="uh-btn uh-btn--destructive" type="button">删除</button>
<button class="uh-btn uh-btn--brand" type="button">品牌入口</button>
<button class="uh-btn uh-btn--link" type="button">查看详情</button>
```

Sizes and an icon-only button:

```html
<button class="uh-btn uh-btn--outline uh-btn--sm" type="button">小号</button>
<button class="uh-btn uh-btn--default uh-btn--lg" type="button">大号</button>
<button class="uh-btn uh-btn--ghost uh-btn--icon" type="button" aria-label="添加">
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
</button>
```

- Use one `uh-btn--default` per view. It is zinc ink, not brand green.
- `uh-btn--brand` is opt-in for one brand moment. Do not use it as the default primary action.
- Use `uh-btn--destructive` only for an action that cannot be undone, and confirm before running it.
- An icon-only button needs an `aria-label`.
- Disabled buttons keep their label and use the `disabled` attribute.

## Link

```html
<a class="uh-link" href="/guide">阅读指南</a>
```

`uh-link` is green by default with an accessible hover. Use it for inline navigation, not for a filled action.

## Badge

```html
<span class="uh-badge uh-badge--default">已发布</span>
<span class="uh-badge uh-badge--secondary">Beta</span>
<span class="uh-badge uh-badge--outline">WIP</span>
<span class="uh-badge uh-badge--destructive">已弃用</span>
```

Use one or two words. A badge is not a button.

## Field, input, select, textarea

```html
<div class="uh-field">
  <label class="uh-field__label" for="package-name">包名</label>
  <input class="uh-input" id="package-name" type="text" placeholder="@uni-helper/uni-use" />
  <p class="uh-field__hint">使用 npm 包名，不需要版本号。</p>
</div>
```

```html
<div class="uh-field uh-field--invalid">
  <label class="uh-field__label" for="version">版本<span class="uh-field__required">*</span></label>
  <input
    class="uh-input"
    id="version"
    type="text"
    value="0.9.0"
    aria-invalid="true"
    aria-describedby="version-error"
  />
  <p class="uh-field__error" id="version-error">版本号必须符合 semver。</p>
</div>
```

```html
<div class="uh-field">
  <label class="uh-field__label" for="channel">发布通道</label>
  <div class="uh-select-wrap">
    <select class="uh-select" id="channel">
      <option>稳定版</option>
      <option>测试版</option>
    </select>
  </div>
</div>

<div class="uh-field">
  <label class="uh-field__label" for="notes">发布说明</label>
  <textarea class="uh-textarea" id="notes" rows="4"></textarea>
</div>
```

- Every control has a visible label or an `aria-label`.
- The placeholder is an example, not a label.
- The required asterisk is decorative. Set `required` or `aria-required` on the control.
- Use `aria-invalid="true"` with `uh-field--invalid`; connect the error with `aria-describedby`.
- Focus keeps both the border change and the 2px outline.

## Checkbox, radio, switch

```html
<label class="uh-check-row">
  <input class="uh-checkbox" type="checkbox" checked />
  ESLint
</label>

<label class="uh-radio-row">
  <input class="uh-radio" type="radio" name="package-manager" checked />
  pnpm
</label>

<label class="uh-switch-row">
  <span class="uh-switch">
    <input class="uh-switch__input" type="checkbox" checked />
    <span class="uh-switch__track"></span>
  </span>
  自动发布
</label>
```

Use checkboxes for independent choices, radios for one choice, and a switch for a setting that applies immediately without a save button. Group related boxes under a `fieldset` and `legend`.

## Alert

```html
<div class="uh-alert uh-alert--info">
  <span class="uh-alert__icon">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  </span>
  <div>
    <p class="uh-alert__title">需要先启动开发服务器</p>
    <p class="uh-alert__body">运行 <code>pnpm dev</code> 后再打开 playground。</p>
  </div>
</div>
```

Types: `uh-alert--info`, `--warning`, `--success`, `--danger`. The default has no modifier. The title states the condition; the body states the next action. Do not stack more than three alerts on a page.

## Toast

Build a region once near the end of `<body>`:

```html
<div class="uh-toast-region" data-toast-region aria-live="polite" aria-label="通知"></div>
```

Trigger a toast from any element:

```html
<button
  class="uh-btn uh-btn--secondary"
  type="button"
  data-toast-trigger
  data-toast-title="已保存"
  data-toast-body="你的更改已经保存。"
>
  显示通知
</button>
```

A static toast uses the same markup:

```html
<div class="uh-toast uh-toast--success" role="status">
  <span class="uh-toast__icon">...</span>
  <div>
    <p class="uh-toast__title">已发布</p>
    <p class="uh-toast__body">v1.0.0 已推送到 npm。</p>
  </div>
</div>
```

One message per event. State the result, not a slogan. The region is bottom-right and uses `role="status"`.

## Loading and empty states

```html
<div class="uh-row">
  <span class="uh-spinner" role="status" aria-label="加载中"></span>
  <span class="uh-spinner uh-spinner--sm" role="status" aria-label="加载中"></span>
</div>

<div class="uh-stack uh-stack--tight">
  <div class="uh-skeleton uh-skeleton--text"></div>
  <div class="uh-skeleton uh-skeleton--text"></div>
  <div class="uh-skeleton uh-skeleton--block"></div>
</div>

<div class="uh-empty">
  <span class="uh-empty__icon">...</span>
  <h3 class="uh-empty__title">还没有包</h3>
  <p class="uh-empty__body">创建第一个包后，它会出现在这里。</p>
  <div class="uh-empty__actions">
    <button class="uh-btn uh-btn--default" type="button">新建包</button>
  </div>
</div>
```

Skeleton variants are `uh-skeleton--text`, `--circle`, and `--block`. Spinner sizes are default and `--sm`. Both stop under reduced motion.

An empty state says what belongs here and how to add it. Do not use jokes.

## Tabs

```html
<div class="uh-tabs" role="tablist" aria-label="包信息">
  <button
    class="uh-tab"
    id="tab-readme"
    role="tab"
    type="button"
    aria-selected="true"
    aria-controls="panel-readme"
  >
    README
  </button>
  <button
    class="uh-tab"
    id="tab-versions"
    role="tab"
    type="button"
    aria-selected="false"
    aria-controls="panel-versions"
    tabindex="-1"
  >
    版本
  </button>
</div>
<div class="uh-tab-panel" id="panel-readme" role="tabpanel" aria-labelledby="tab-readme">...</div>
<div class="uh-tab-panel" id="panel-versions" role="tabpanel" aria-labelledby="tab-versions" hidden>
  ...
</div>
```

`components.js` adds ArrowLeft, ArrowRight, Home, and End navigation. Keep one selected tab and one visible panel.

## Breadcrumb and pagination

```html
<nav class="uh-breadcrumb" aria-label="面包屑">
  <ol class="uh-breadcrumb__list">
    <li class="uh-breadcrumb__item"><a class="uh-breadcrumb__link" href="/">首页</a></li>
    <li class="uh-breadcrumb__item"><a class="uh-breadcrumb__link" href="/packages">包</a></li>
    <li class="uh-breadcrumb__item" aria-current="page">uni-use</li>
  </ol>
</nav>

<nav aria-label="分页">
  <ul class="uh-pagination">
    <li><a class="uh-pagination__link" href="?page=1" aria-disabled="true">上一页</a></li>
    <li><a class="uh-pagination__link" href="?page=1" aria-current="page">1</a></li>
    <li><a class="uh-pagination__link" href="?page=2">2</a></li>
    <li><a class="uh-pagination__link" href="?page=2">下一页</a></li>
  </ul>
</nav>
```

Use `aria-current="page"` for the current item. A disabled pagination link uses `aria-disabled="true"`.

## Sidebar, navigation, TOC

```html
<nav class="uh-sidebar" aria-label="文档">
  <p class="uh-sidebar__label">开始</p>
  <a class="uh-nav-item" href="/guide" aria-current="page">安装</a>
  <a class="uh-nav-item" href="/config">配置</a>
</nav>

<nav class="uh-toc" aria-label="本页">
  <ul class="uh-toc__list">
    <li><a class="uh-toc__link" href="#install" aria-current="true">安装</a></li>
    <li><a class="uh-toc__link" href="#usage">使用</a></li>
  </ul>
</nav>
```

Use one current item per region. `uh-toc__link` uses `aria-current="true"`; navigation links use `aria-current="page"`.

## Card

```html
<a class="uh-card uh-card--media" href="/packages/vite-plugin-uni-pages">
  <div class="uh-card__media">
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M44 66a22 22 0 1 1 22-22v22H44z" fill="var(--brand-soft)" />
      <path d="M20 52a22 22 0 1 1 22 22H20V52z" fill="var(--brand-deep)" />
      <circle cx="66" cy="66" r="20" fill="var(--brand)" />
    </svg>
  </div>
  <div class="uh-card__body">
    <h3 class="uh-card__title">vite-plugin-uni-pages</h3>
    <p class="uh-card__description">uni-app 的基于文件的路由。</p>
  </div>
  <div class="uh-card__footer">
    <span>@uni-helper</span>
    <span>v0.9</span>
  </div>
</a>
```

- One card is one destination. When the whole card is a link, put no second link inside it.
- Standard cards use 8px; `uh-card--media` uses a 16:9 media band and 12px.
- The footer carries owner and version or date, not actions.

## Table

```html
<div class="uh-table-wrap">
  <table class="uh-table">
    <caption>
      最近的发布
    </caption>
    <thead>
      <tr>
        <th scope="col">包</th>
        <th scope="col">版本</th>
        <th class="uh-table__num" scope="col">下载</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">uni-use</th>
        <td>1.2.0</td>
        <td class="uh-table__num">12,480</td>
      </tr>
      <tr>
        <th scope="row">uni-pages</th>
        <td>0.9.4</td>
        <td class="uh-table__num">8,102</td>
      </tr>
    </tbody>
  </table>
</div>
```

Wrap tables in `uh-table-wrap` for horizontal overflow. Right-align numeric columns with `uh-table__num`. Keep a caption or an accessible name.

## Prose and code block

```html
<article class="uh-prose">
  <h1>快速开始</h1>
  <p>安装包，然后在配置中启用插件。</p>
  <pre><code>pnpm add -D @uni-helper/vite-plugin-uni-pages</code></pre>
  <blockquote>需要 Node.js 20 或更高版本。</blockquote>
</article>
```

```html
<div class="uh-code-block">
  <div class="uh-code-block__header">
    <span>vite.config.ts</span>
    <button class="uh-code-block__copy" type="button" data-copy-target="#config-code">复制</button>
  </div>
  <pre><code id="config-code"><span class="tok-keyword">import</span> uniPages <span class="tok-keyword">from</span> <span class="tok-string">'@uni-helper/vite-plugin-uni-pages'</span></code></pre>
</div>
```

`uh-prose` handles headings, lists, blockquotes, inline code, tables, and images for documentation. Syntax classes are `tok-keyword`, `tok-string`, `tok-number`, `tok-function`, `tok-variable`, `tok-comment`, `tok-punctuation`, `tok-tag`, `tok-attr`, `tok-constant`, `tok-title`, `tok-property`, `tok-meta`, and `tok-operator`.

## Dialog

```html
<button class="uh-btn uh-btn--default" type="button" data-dialog-open="#publish-dialog">
  发布
</button>

<dialog class="uh-dialog" id="publish-dialog" aria-labelledby="publish-title">
  <div class="uh-dialog__header">
    <h2 class="uh-dialog__title" id="publish-title">发布 v1.0.0</h2>
    <button
      class="uh-btn uh-btn--ghost uh-btn--icon"
      type="button"
      data-dialog-close
      aria-label="关闭"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </div>
  <div class="uh-dialog__body">
    <p>发布后无法撤回。确认版本号和发布说明。</p>
  </div>
  <div class="uh-dialog__footer">
    <button class="uh-btn uh-btn--outline" type="button" data-dialog-close>取消</button>
    <button class="uh-btn uh-btn--default" type="button" data-dialog-close>发布</button>
  </div>
</dialog>
```

Use a native `<dialog>` and `showModal()`. `components.js` wires `data-dialog-open`, `data-dialog-close`, backdrop click, and Escape. Keep a visible title and a close control.

## Separator

```html
<hr class="uh-separator" />
<div class="uh-row">
  <span>包</span>
  <span class="uh-separator uh-separator--vertical"></span>
  <span>文档</span>
</div>
```

Use a separator to divide groups, not to decorate every block.

## Utilities

- `uh-type-*` classes come from `tokens.css` and apply the type scale with Chinese overrides.
- `uh-nums` sets tabular numbers for tables, versions, counters, and developer tool readouts.
- `uh-measure` caps a block at the 72ch reading measure.

## Behavior contract

`components.js` does not replace application state. It only:

- sets `data-theme` and persists it in `localStorage` under `uh-theme`;
- syncs `aria-pressed` and `[data-theme-label]` on theme toggles;
- manages `aria-selected`, `tabindex`, and `hidden` for tabs;
- opens and closes native dialogs;
- appends and removes toast nodes;
- copies the text of a `data-copy-target` element.

Vue, React, and other frameworks should own state themselves and use the same classes and ARIA attributes.

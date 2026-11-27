# uni-helper 设计系统

[English](README.md) | 中文

uni-helper 的设计系统。锌灰中性色、Geist 字体、品牌绿标志、明暗主题，以及 30 多个 CSS 基础组件，覆盖文档、网站和开发者工具。

## 安装

```bash
pnpm add -D @uni-helper/design
```

也可以直接从仓库复制需要的文件。CSS 没有构建步骤，也没有运行时依赖。

## 快速开始

依次加载 token、组件样式，并按需加载行为脚本：

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

`data-theme` 接受 `light` 或 `dark`。为了兼容 Nuxt UI，也支持 `.dark` 类。两者都不设置时跟随 `prefers-color-scheme`；显式选择始终优先。

这段内联脚本会在首次绘制前应用已保存的选择。如果希望跟随系统主题，请从 `<html>` 上移除 `data-theme`。

`components.js` 是可选的。它提供主题切换（`data-theme-toggle`）、标签页、对话框（`data-dialog-open`）、Toast（`data-toast-trigger`）和代码复制（`data-copy-target`）。

## Token

`tokens.json` 是唯一事实源。`tokens.css`、集成文件、DESIGN.md frontmatter 以及 Skill 资源和参考文档都由它生成。

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

文字样式使用 `uh-type-*` 前缀：`uh-type-display`、`uh-type-heading-1` 到 `uh-type-heading-4`、`uh-type-body`、`uh-type-small`、`uh-type-nav`、`uh-type-label`、`uh-type-field-label`、`uh-type-code`、`uh-type-kbd`。中文通过 `:lang(zh)` 使用独立的行高和零字距。

完整 token 见 [docs/tokens.md](docs/tokens.md)，使用规则见 [DESIGN.md](DESIGN.md)。

## 组件

先加载 `tokens.css`，再加载 `components/components.css`。直接使用类名；完整标记见 [docs/components.md](docs/components.md)，可视化总览见 [components/index.html](components/index.html)。

| 类别 | 类名                                                                                       |
| ---- | ------------------------------------------------------------------------------------------ |
| 布局 | `uh-stack`、`uh-row`、`uh-container`、`uh-grid`                                            |
| 操作 | `uh-btn`、`uh-link`、`uh-ihb`                                                              |
| 标签 | `uh-badge`、`uh-kbd`                                                                       |
| 表单 | `uh-field`、`uh-input`、`uh-select`、`uh-textarea`、`uh-checkbox`、`uh-radio`、`uh-switch` |
| 反馈 | `uh-alert`、`uh-toast`、`uh-spinner`、`uh-skeleton`、`uh-empty`                            |
| 导航 | `uh-tabs`、`uh-breadcrumb`、`uh-pagination`、`uh-sidebar`、`uh-nav-item`、`uh-toc`         |
| 内容 | `uh-card`、`uh-table`、`uh-prose`、`uh-code-block`、`uh-separator`                         |
| 浮层 | `uh-dialog`                                                                                |

把 `fonts/` 放在 `tokens.css` 旁边。如果把 `tokens.css` 复制到其他目录，要同步修改两条 `@font-face` 的路径。

## 集成

### Tailwind CSS v4

```css
@import "tailwindcss";
@import "@uni-helper/design/tailwind.css";
```

可以使用 `bg-background`、`text-muted-foreground`、`border-border-strong`、`rounded-lg`、`shadow-sm`、`max-w-page` 和 4px 间距刻度。

### Nuxt UI v4

```css
@import "tailwindcss";
@import "@nuxt/ui";
@import "@uni-helper/design/nuxt-ui.css";
```

桥接层会把 Nuxt UI 的表面、边框、文字、圆角、容器、页头高度、状态色和图表槽位映射到 uni-helper token。在 `app.config.ts` 中把 `primary` 和 `neutral` 设为 `zinc`，让桥接层之外的色阶也与系统一致：

```ts
export default defineAppConfig({
  ui: {
    colors: { primary: "zinc", neutral: "zinc" },
  },
});
```

### shadcn/ui（Base UI）

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@uni-helper/design/shadcn-ui.css";
```

运行 `pnpm dlx shadcn@latest init -b base`，然后删除 `init` 写入的主题块和 Geist 字体导入。桥接层会把侧边栏颜色和圆角映射到设计 token。Base UI 对话框示例见 [docs/integration.md](docs/integration.md)。

主题切换、从 HSL 变量迁移以及完整映射见 [docs/integration.md](docs/integration.md)。

## 仓库内容

| 路径                        | 内容                                               |
| --------------------------- | -------------------------------------------------- |
| `tokens.json`               | 唯一取值来源。                                     |
| `tokens.schema.json`        | token 文件的 JSON Schema。                         |
| `tokens.css`                | 生成的 CSS 变量、文字样式和字体声明。              |
| `components/components.css` | 组件和布局样式。                                   |
| `components/components.js`  | 可选的主题、标签页、对话框、Toast 和复制行为。     |
| `components/index.html`     | 所有基础组件的明暗主题总览。                       |
| `integrations/`             | Tailwind v4 和 Nuxt UI v4 桥接层。                 |
| `docs/`                     | token、组件和集成参考。                            |
| `skills/uni-helper-design/` | 自带 token、组件、字体、图标和标志的 Agent Skill。 |
| `assets/`                   | 标志、24 个图标的 sprite 和社交分享图。            |
| `scripts/`                  | 构建与发布脚本。                                   |
| `tests/`                    | Vitest 设计与组件测试。                            |

## 使用 skill

`skills/uni-helper-design/` 是一个自带资源的 Agent Skill。把整个目录复制到 agent 的 skills 目录即可。它包含自己的 `tokens.css`、`components.css`、`components.js`、字体、图标和标志，不依赖仓库的其他文件。

## 开发

```bash
pnpm build   # 重新生成 CSS、集成文件、文档、frontmatter 和 Skill 内容
pnpm check   # 用 Vite+ 做格式、lint 和类型检查
pnpm fix     # 应用格式和安全 lint 修复
pnpm test    # Vitest 设计检查与组件测试
```

仓库在 `.node-version` 中固定 Node 26。发布的包支持 Node `^22.18`、`^24.11` 或 `>=26`。

生成文件保留生成器的格式；`pnpm test` 会检查它们是否最新。

不要手改生成文件。修改 `tokens.json`、`docs/components.md`、`components/components.css`、`components/components.js` 或脚本，然后运行 `pnpm build` 和 `pnpm test`。

## 发布

运行 `pnpm release` 后、发布或推送前，运行 `pnpm check` 和 `pnpm test`。Release workflow 不运行检查。

### 0.1.0

首次发布需要手动执行：

1. 提交所有改动。
2. 运行 `pnpm release`。它会更新版本号、重新生成 token 文件和 Skill 内容、更新 `CHANGELOG.md`、提交并创建 `v*` 标签。它不会推送或发布。
3. 运行 `npm publish --access public`。
4. 在 npm 上配置该仓库的 trusted publisher。
5. 推送提交和标签：

```bash
git push --follow-tags
```

`Release` workflow 会创建 GitHub Release，并跳过 npm 发布，因为 `0.1.0` 已经发布。

### 后续发布

运行 `pnpm release`，再运行 `git push --follow-tags`。`Release` workflow 会发布 npm 包并创建 GitHub Release。

## 设计原则

- **中性色打底。** 锌灰墨色和近白表面承载界面；品牌绿只用于标志、图形和大字号。
- **绿色代表身份，不承担主操作。** `--primary` 是墨色，默认主按钮不是绿色。`--brand-cta` 是显式的例外。
- **每屏一个主操作。** 主按钮只出现一次；其他操作使用 secondary、outline 或 ghost。
- **4px 栅格。** 间距从 2px 开始，然后是 4、8、12、16、24、32、48、64、80、96px。
- **同一控件组只用一种圆角。** 控件 6px，卡片 8px，媒体卡片和对话框 12px。
- **中文优先。** 英文只用于包名、API 和命令。界面文案直接、平静。
- **可访问性是系统的一部分。** 两套主题的正文都达到 4.5:1，控件边界达到 3:1，所有交互元素保留可见焦点环，`prefers-reduced-motion` 生效时停止动效。

## 许可

设计系统、代码和文档使用 MIT 许可。Geist 和 Geist Mono 使用 SIL Open Font License 1.1，见 `fonts/LICENSE.txt`。uni-helper 标志是 uni-helper 项目的商标，使用前请阅读 `assets/logos/README.md`。

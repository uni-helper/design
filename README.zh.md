# uni-helper 设计系统

[English](README.md) | 中文

uni-helper 的设计系统。中性色打底，Geist 字体，品牌绿只用于标志和图形；九种基础组件覆盖文档、网站和开发者工具。

## 仓库内容

| 路径 | 内容 |
| --- | --- |
| `DESIGN.md` | 按 DESIGN.md 规范编写的设计系统：机器可读的 token 和使用规则。 |
| `tokens.css` | 明暗两套主题的 CSS 变量、文字样式和 `@font-face`。 |
| `tokens.json` | 同一组 token 的 JSON 版本，供构建工具和设计工具读取。 |
| `components/components.css` | 九种基础组件的样式，只读取 `tokens.css` 的变量。 |
| `components/index.html` | 组件总览页，可以切换明暗主题。 |
| `assets/logos/` | uni-helper 标志和各项目标志。 |
| `assets/social/` | 1200×600 社交分享图。 |
| `fonts/` | Geist 和 Geist Mono 可变字体，WOFF2 格式。 |
| `skills/uni-helper-design/` | 自带 token、组件样式、字体和标志的 Agent Skill，可以单独安装。 |

## 使用 token

加载 `tokens.css`，在根元素上设置主题：

```html
<link rel="stylesheet" href="tokens.css">

<html data-theme="dark">
  <body>
    <button class="uh-btn uh-btn--default">新建项目</button>
  </body>
</html>
```

第一套主题是明色。`data-theme="dark"` 切换到暗色值。某个组件必须显示另一套主题时，可以在自己的根元素上设置这个属性。

常用变量：

```css
--background, --foreground, --muted, --muted-foreground
--primary, --primary-foreground, --border, --ring
--brand, --brand-deep, --brand-mint, --brand-soft
--space-1 ... --space-24
--radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full
--shadow-sm, --shadow, --shadow-lg
--font-sans, --font-mono
```

文字样式类与字号表一致：`display`、`heading-1` 到 `heading-4`、`body`、`small`、`nav`、`label`、`code`、`kbd`。

把 `fonts/` 放在 `tokens.css` 旁边。如果把 `tokens.css` 复制到其他目录，要同步修改两条 `@font-face` 的路径。

## 使用组件

先加载 `tokens.css`，再加载 `components/components.css`。总览页使用的标记与样式表一致：

```html
<button class="uh-btn uh-btn--default">新建项目</button>
<span class="uh-badge uh-badge--secondary">Beta</span>
<input class="uh-input" type="text" placeholder="搜索文档...">
```

九种组件是 Button、Badge、Input、Label、Checkbox、Alert、Kbd、Card 和 InteractiveHoverButton。使用规则见 `DESIGN.md`，标记和状态见 `components/index.html`。

## 使用 skill

`skills/uni-helper-design/` 是一个自带资源的 Agent Skill。把整个目录复制到 agent 的 skills 目录即可。它包含自己的 `tokens.css`、`components.css`、字体和标志，不依赖仓库的其他文件。

skill 会告诉 agent 何时使用这套系统、选择哪些 token，以及如何搭建组件。目录结构符合 Agent Skills 规范。

## 设计原则

- **中性色打底。** 锌灰墨色和近白表面承载界面；品牌绿只用于标志、图形和大字号。
- **绿色代表身份，不承担主操作。** `--primary` 是墨色，主按钮不是绿色。
- **每屏一个主操作。** 主按钮只出现一次；其他操作使用 secondary、outline 或 ghost。
- **4px 栅格。** 间距从 2px 开始，然后是 4、8、12、16、24、32、48、64、80、96px。
- **同一控件组只用一种圆角。** 控件 6px，卡片 8px，媒体卡片 12px。
- **中文优先。** 英文只用于包名、API 和命令。界面文案直接、平静。
- **可访问性是系统的一部分。** 所有交互元素保留可见的焦点环；两套主题的正文都达到 4.5:1；`prefers-reduced-motion` 生效时停止动效。

## 校验

```bash
npx @google/design.md lint DESIGN.md
```

linter 报告 0 个错误。当前版本还会报告 1 条警告：它还不识别规范中的 `motion` token 块。该块按已发布规范编写。

## 许可

设计系统、代码和文档使用 MIT 许可。Geist 和 Geist Mono 使用 SIL Open Font License 1.1，见 `fonts/LICENSE.txt`。uni-helper 标志是 uni-helper 项目的商标，使用规则见 `assets/logos/README.md`。

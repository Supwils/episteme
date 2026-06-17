# 任务：Universe Knowledge 视觉系统重构（交给工程 Agent）

> 把这份文件 + 同目录的 5 个 `.dc.html` 原型一起交给在 **universe-knowledge 仓库** 里工作的编码 agent。
> 你（agent）的目标：把仓库的视觉从「深空科技皮肤」重构为「**观测台（暗）/ 手记（亮）双主题**」设计系统，**不破坏现有功能**。

---

## 0. 背景与目标

- 现状问题：全站充斥霓虹渐变、发光卡片、点阵网格、渐变文字，配 `Fraunces + Inter`——典型「AI 生成感」。
- 目标视觉：克制、有设计感的双主题。
  - **暗色 = 观测台**：近黑哑光、发丝级描边、等宽元数据标签、`Space Grotesk` 标题、单一领域强调色，**无任何发光/渐变**。
  - **亮色 = 手记**：暖纸底、柔和投影、圆角卡片、`LXGW WenKai` 楷体标题、`Noto Serif SC` 正文衬线，温润适合长读。
- **核心策略（低风险）**：共享组件 `ArticleLayout`、`MarkdownRenderer` 等都是**令牌驱动**（读 `--color-*` / `--font-*`）。因此迁移的本质是 **① 改令牌值 ② 换字体 ③ 删装饰类**，而不是逐页重写。

---

## 1. 你会收到什么

| 文件                   | 用途                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `交付给Agent.md`       | 本文（任务书）                                                                                  |
| `参考代码片段.md`      | **可直接粘贴的成品代码**（fonts.ts / layout / globals.css / 领域 css / DomainCard / FOUC 脚本） |
| `设计交付规范.dc.html` | 设计规范（可视化版，含调色板/令牌/字体/组件/清单）                                              |
| `首页.dc.html`         | 门户目标效果                                                                                    |
| `领域页.dc.html`       | 领域页（定制/内容两类）目标效果                                                                 |
| `文章页.dc.html`       | 正文阅读页目标效果                                                                              |
| `人物传记.dc.html`     | 人物页目标效果                                                                                  |
| `全局搜索.dc.html`     | ⌘K 全局搜索浮层目标效果                                                                         |
| `对话页.dc.html`       | 对话（跨时空对谈）页目标效果                                                                    |

> 这些 `.dc.html` 是**视觉参照**，用浏览器打开即可（右上角可切 DARK/LIGHT）。不要把它们的代码直接拷进 Next.js 仓库——它们是独立原型，仓库用的是真实 React/Tailwind 组件。照「视觉」与下面的「令牌/字体表」改仓库。

---

## 2. 令牌映射（核心 —— 直接照抄值）

### `app/globals.css`

```css
/* @theme — DARK 默认（观测台） */
@theme {
  --color-bg-deep: #08080d;
  --color-bg-base: #0e0f14;
  --color-bg-near: #0e0f14; /* 卡片与底同色，靠描边分隔 */
  --color-bg-panel: #14151c;
  --color-bg-elevated: #14151c;
  --color-bg-floating: #1c1c26;
  --color-bg-overlay: rgba(8, 8, 13, 0.86);

  --color-fg-primary: #e6e3da;
  --color-fg-secondary: #a8a499;
  --color-fg-muted: #7a766c;
  --color-fg-disabled: #4a4858;

  --color-accent-gold: #d9a441; /* 门户中性主色 */

  --color-border-faint: rgba(255, 255, 255, 0.06);
  --color-border-subtle: rgba(255, 255, 255, 0.1);
  --color-border-strong: rgba(255, 255, 255, 0.2);

  --font-sans: var(--font-noto-sans-sc), "Noto Sans SC", system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), "Space Grotesk", "Noto Sans SC", sans-serif;
  --font-body: var(--font-noto-sans-sc), "Noto Sans SC", system-ui, sans-serif; /* 新增 */
  --font-mono: var(--font-plex-mono), "IBM Plex Mono", ui-monospace, monospace;
}

/* .light — 手记 */
.light,
[data-theme="light"] {
  --color-bg-deep: #efece4;
  --color-bg-base: #faf6ef;
  --color-bg-near: #ffffff;
  --color-bg-panel: #ffffff;
  --color-bg-elevated: #fffdf8;
  --color-bg-floating: #ffffff;
  --color-bg-overlay: rgba(245, 242, 235, 0.86);

  --color-fg-primary: #2c2a26;
  --color-fg-secondary: #5f5b54;
  --color-fg-muted: #9a948a;
  --color-fg-disabled: #b6b3c2;

  --color-accent-gold: #b8862f;

  --color-border-faint: #eee6d9;
  --color-border-subtle: #e8dfd0;
  --color-border-strong: #d8d0c0;

  --font-display: "LXGW WenKai TC", "Noto Serif SC", serif; /* 楷体标题 */
  --font-body: "Noto Serif SC", serif; /* 衬线正文 */
}
```

> `app/domain-shared.css` 的 `@theme` 用**同样的值**同步一遍（它是 computer-science / political-science 等引擎领域的令牌来源）。并给 `.domain-root` 增加 `.light` 支持。
> legacy `:root`（`--background/--foreground/--card-bg/--card-border/--nav-bg/--accent`…）也按同色系改；`.light` 块已存在，更新为上面手记的值。

### 速查表

| 令牌                    | 旧                      | Dark 新                 | Light 新  |
| ----------------------- | ----------------------- | ----------------------- | --------- |
| `--color-bg-base`       | `#08080f`               | `#0e0f14`               | `#faf6ef` |
| `--color-bg-near`(卡片) | `#0d0d18`               | `#0e0f14`               | `#ffffff` |
| `--color-bg-panel`      | `#111119`               | `#14151c`               | `#ffffff` |
| `--color-fg-primary`    | `#ece9f5`               | `#e6e3da`               | `#2c2a26` |
| `--color-fg-secondary`  | `#a8a4c0`               | `#a8a499`               | `#5f5b54` |
| `--color-fg-muted`      | `#8d8aa0`               | `#7a766c`               | `#9a948a` |
| `--color-border-faint`  | `rgba(150,150,210,.08)` | `rgba(255,255,255,.06)` | `#eee6d9` |
| `--color-border-subtle` | `rgba(150,150,210,.14)` | `rgba(255,255,255,.10)` | `#e8dfd0` |
| `--color-accent-gold`   | `#c8a45a`               | `#d9a441`               | `#b8862f` |

---

## 3. 字体替换

`lib/fonts.ts`：移除 `Fraunces / Inter / JetBrains_Mono`，改为：

```ts
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
```

**CJK 字体注意**（重要，别踩坑）：

- `Noto Sans SC` / `Noto Serif SC` 体积很大；用 `next/font/google` 时**不要带 `subsets:["latin"]`**（会丢中文），建议 `preload: false` 并指定需要的 `weight`，或干脆用 `<link>` 从 Google Fonts 引入（更省心）。
- `LXGW WenKai TC` **不在** `next/font/google`，必须用 `<link>` 或自托管 `woff2`。
- 在 `app/layout.tsx` 把 `spaceGrotesk.variable`、`plexMono.variable`（及 CJK 字体变量）挂到 `<html>`/`<body>` 的 `className`，替换原来的 `inter/fraunces/jetbrains` 变量。

挂载后，第 2 节里 `--font-*` 栈引用的 `var(--font-space-grotesk)` 等即可生效。

---

## 4. 领域强调色（每个领域一个色相，明暗共用）

在每个领域的根（`.economics-root` 等，或领域 layout 容器）上设 `--accent`：

| 领域                   | `--accent` | 领域                    | `--accent` |
| ---------------------- | ---------- | ----------------------- | ---------- |
| 物理 universe-physics  | `#6a6fd0`  | 数学 mathematics        | `#8b6fd0`  |
| 宇宙学 cosmology       | `#4f7fd0`  | 经济 economics          | `#c9a23e`  |
| 人类历史 human-history | `#c08a3e`  | 心理 psychology         | `#cc7a9e`  |
| 哲学 philosophy        | `#4a9e74`  | 计算机 computer-science | `#4f9cd0`  |
| 生命科学 life-science  | `#5b9e52`  | 政治 political-science  | `#c66a5e`  |

- 文章页/列表页里，`ArticleLayout` 的 `accent` prop 与 `MarkdownRenderer` 的 `accentColor` 应传该领域色（仓库里多数页面已在传 accent，核对即可）。
- `--accent-soft` = 该色 ~10%（亮）/ ~16%（暗）alpha，用于 pill 背景。

---

## 5. 任务清单（分阶段，按顺序）

### Phase 0 · 准备

- [ ] 通读 `app/globals.css`、`app/domain-shared.css`、`lib/fonts.ts`、`app/layout.tsx`、`components/ThemeProvider.tsx`、`components/ThemeToggle.tsx`、`components/ArticleLayout.tsx`、`components/MarkdownRenderer.tsx`、`components/DomainCard.tsx`、`components/HeroSection.tsx`。
- [ ] 浏览器打开 4 个 `.dc.html` 原型，DARK/LIGHT 各看一遍，记住目标观感。
- [ ] 建分支 `redesign/observatory-notebook`。

### Phase 1 · 字体 + 门户令牌

- [ ] 改 `lib/fonts.ts` 与 `app/layout.tsx`（第 3 节）。
- [ ] 改 `app/globals.css` 的 `@theme` / `:root` / `.light`（第 2 节）。
- [ ] **删除门户装饰**：`body::before`（星云 mesh 径向渐变）、`body::after`（噪点）、`dotPulse` 点阵、`heroGradientDrift*`、`shimmer`、`cornerPulse` 等 keyframes 及其使用。
- [ ] `components/HeroSection.tsx`：去掉两层径向渐变与 CornerMark；标题去掉 `bg-clip-text` 渐变文字，改纯色，关键词用 `--accent` 实色。
- [ ] `components/DomainCard.tsx`：删除 `domain-card__shimmer / __glow / __topline` 与渐变左栏；改平整卡片 = `mono「DOMAIN 0X」+ 领域色圆点 + 标题 + 描述 + accent CTA`；hover 仅描边变色 + `translateY(-3px)`。
- [ ] `app/page.tsx`：移除点阵层 div 与两块径向光晕 div。
- [ ] **验收**：门户 DARK/LIGHT 都正确，无发光/渐变残留，切换流畅。

### Phase 2 · 共享组件 + 单行导航 + 一个内容领域（验证管线）

- [ ] 导航收成**单行**：返回 + 可横向滚动领域标签 + 搜索(⌘K) + 主题切换；激活标签用领域色胶囊。（`DesktopNav.tsx` / 领域 nav / `domain-shared.css` 的 `.domain-nav-bar`）
- [ ] `components/ArticleLayout.tsx`：header 去掉 `blur` 光晕圆；保留 eyebrow 徽章/标题/titleEn/tags；令牌生效即焕新。
- [ ] `components/MarkdownRenderer.tsx`：`blockquote` 去掉渐变底，改纯 `2px` 左边框 + 斜体；正文用 `--font-body`；`h2` 用 `--accent`（已是）。
- [ ] 选 **economics** 做第一个内容领域：`app/economics/globals.css` 令牌改值 + 新增 `.light` 块 + `--accent: #c9a23e`；移除 `glow-* / glass / grid-paper / pull-quote::before` 等重度装饰。
- [ ] **验收**：economics 首页、一篇文章、一个人物页，DARK/LIGHT 都正确，正文排版舒适。

### Phase 3 · 推广其余内容领域

- [ ] 对 `philosophy / psychology / mathematics / computer-science / political-science` 重复 Phase 2 的领域级改动（令牌值 + `.light` 块 + 领域色 + 删装饰）。
- [ ] 抽公共：如果各领域 `globals.css` 大量重复，考虑把双主题令牌收敛到 `domain-shared.css`，各领域只覆写 `--accent`。

### Phase 4 · 定制领域（仅令牌，保持暗色）

- [ ] `universe-physics / cosmology / human-history / life-science`：**只**同步令牌值与字体，保持 `color-scheme: dark`，**不加亮色块**。
- [ ] 接入单行导航壳与领域色；**3D / Canvas / 时间线 / 地图等可视化引擎一律不动**。

### Phase 5 · 全局清理 + QA

- [ ] 全局搜索并清除残留：`glow` / `shimmer` / `gradient`(文字) / `dotPulse` / `Fraunces` / `Inter` / `JetBrains`。
- [ ] 全局搜索浮层（⌘K，`GlobalSearch.tsx`）适配新令牌与明暗。
- [ ] 跑 `pnpm build` + `pnpm test`（Vitest）+ e2e（Playwright `e2e/`）。
- [ ] 逐路由人工过一遍 DARK/LIGHT。

---

## 6. 注意事项 / 红线 ⚠️

1. **不要动任何可视化引擎**：React Three Fiber / Three.js（物理、宇宙学）、知识图谱的 Canvas 力导向图、历史时间线/SVG 地图、经济学的模拟实验交互。只换它们外层的导航壳与令牌/字体。
2. **保留作用域隔离**：每个领域的 `globals.css` 是独立 Tailwind 入口、作用域在 `.xxx-root`。改值即可，**不要把领域样式提到全局**导致互相污染。
3. **令牌名不改、只改值**：`ArticleLayout`/`MarkdownRenderer` 等靠现有令牌名工作，改名会全站失效。`--font-body` 是**唯一新增**令牌。
4. **主题一致性**：门户与各领域必须共用**同一个** `localStorage` key 和 `.light` class 机制（核对 `ThemeProvider`），避免跨页跳变。检查 SSR：首屏前用内联脚本根据存储值给 `<html>` 加 `.light`，**防止暗/亮闪烁（FOUC）**。
5. **CJK 字体加载**：见第 3 节，别用 `subsets:["latin"]` 加载中文字体；LXGW WenKai 走 `<link>`/自托管。注意首屏字体回退不要导致大幅度位移。
6. **无障碍/动效**：保留 `prefers-reduced-motion`、`:focus-visible` 描边、≥44px 触控区、对比度（亮色正文 `#2c2a26` on `#faf6ef` 已达 AA）。
7. **定制领域不做亮色**：它们的沉浸式体验本就该是暗的，强行加亮色会破坏画面，保持 `color-scheme: dark`。
8. **分批合并**：Phase 1→2 各自可独立 PR 验证，不要一次性大改全仓后再测。

---

## 7. 验收标准

- [ ] `pnpm build` 通过；Vitest / Playwright 全绿。
- [ ] 门户、领域页、文章页、人物页在 **DARK 与 LIGHT** 下均与原型观感一致。
- [ ] 全仓**无** glow / shimmer / 渐变文字 / 点阵 / Fraunces / Inter 残留。
- [ ] 主题切换无闪烁、跨页一致、刷新保持。
- [ ] 定制领域的 3D / Canvas / 时间线交互**完全不受影响**。
- [ ] Lighthouse 可访问性 ≥ 95；无新增 console error。

---

## 8. 参考原型对照

| 仓库目标                                    | 看这个原型                                         |
| ------------------------------------------- | -------------------------------------------------- |
| 门户 `app/page.tsx`                         | `首页.dc.html`                                     |
| 领域首页 / `DomainHome`                     | `领域页.dc.html`（定制看 stage，内容看 catalogue） |
| 文章详情 `ArticleLayout`+`MarkdownRenderer` | `文章页.dc.html`                                   |
| 人物 / thinker 详情                         | `人物传记.dc.html`                                 |
| 全套令牌/字体/清单                          | `设计交付规范.dc.html`                             |
| 成品代码（直接抄）                          | `参考代码片段.md`                                  |
| 全局搜索 `GlobalSearch.tsx`                 | `全局搜索.dc.html`                                 |
| 对话 dialogues 详情                         | `对话页.dc.html`                                   |

> 完成 Phase 1+2 后先让我（产品/设计）看一版 economics 的截图再继续推广。

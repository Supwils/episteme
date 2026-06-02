# CLAUDE.md — philosophy

本文件是 AI 编码代理在本子项目工作的第一份必读。**所有指令优先级高于默认行为。**

---

## 1. 项目定位

**产品名**：**philosophy** —— universe-knowledge 平台下的哲学知识图谱应用。

这是一个以**文字为主**的哲学知识站：哲学家传记、流派介绍、经典著作解读。目标受众是有一定人文素养的中文读者，内容深度定位在"顶级教授通识讲座"级别——有现场感，有结构，有争议意识，有跨文明连接。

视觉风格参考 `universe-physics`：深色主题、工业级设计质感、金色/鼠尾草色点缀（区别于 universe-physics 的蓝白冷色系）。

### 六大板块

| 板块 | 路径 | 数量 | 内容 |
|------|------|------|------|
| 哲学家 | `/thinkers` | 45 位 | 从苏格拉底到福柯，跨文明哲学家传记 |
| 流派 | `/schools` | 32 个 | 从古希腊到当代的哲学流派与传统 |
| 主义 | `/isms` | 21 个 | 核心哲学概念与立场（唯心论、虚无主义等） |
| 思想实验 | `/experiments` | 16 个 | 经典思想实验（电车难题、缸中之脑等） |
| 大问题 | `/questions` | 8 个 | 哲学根本问题（意识、正义、自由意志等） |
| 时间线 | `/timeline` | 108 事件 | 从前 600 年到当代的哲学大事年表 |

---

## 2. 语言规则（强制）

| 类型 | 语言 |
|------|------|
| 所有 `.md` / `.mdx` 文档正文 | **中文** |
| MDX frontmatter 的 key 名 | **英文** |
| 代码、变量名、函数名、文件名 | **英文** |
| 与用户的对话、计划、汇报 | **中文** |
| 哲学家专名、著作名 | 中英对照（首次出现写"康德 Immanuel Kant"） |

---

## 3. 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js | ^15.0 |
| 运行时 | React | ^19.0 |
| 语言 | TypeScript | strict 模式 |
| 样式 | Tailwind CSS | ^4.0 |
| MDX | @next/mdx + next-mdx-remote | ^15 / ^5 |
| 动画 | Framer Motion | ^12.0 |
| 字体 | next/font/google (Fraunces + Inter + JetBrains Mono) | — |
| 包管理 | pnpm (通过 monorepo 根管理) | — |
| 构建 | Turbopack (dev), Next.js build (prod) | — |

**依赖约束**：
- 不引入 Three.js / WebGL（此项目无 3D 可视化需求）
- 不引入 D3.js（如需图表用轻量替代或纯 CSS）
- MDX 内容仅依赖 `@next/mdx` + `gray-matter`；复杂交互组件用 RSC 或 Client Component 拆分

---

## 4. 目录结构

```
apps/philosophy/
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # 根布局（导航栏、字体变量、全局 CSS）
│   ├── page.tsx                     # 主页（六大板块入口卡片）
│   ├── loading.tsx                  # 全局 loading 状态
│   ├── not-found.tsx                # 404 页面
│   ├── fonts.ts                     # next/font 配置
│   ├── globals.css                  # Tailwind @theme + 全局 CSS
│   ├── thinkers/
│   │   ├── page.tsx                 # 哲学家列表页（45 位）
│   │   └── [slug]/page.tsx          # 哲学家详情页（读取 content/thinkers/*.mdx）
│   ├── schools/
│   │   ├── page.tsx                 # 流派列表页（32 个）
│   │   └── [slug]/page.tsx          # 流派详情页（读取 content/schools/*.mdx）
│   ├── isms/
│   │   ├── page.tsx                 # 主义列表页（21 个）
│   │   ├── IsmsFilter.tsx           # 主义筛选组件（Client Component）
│   │   └── [slug]/page.tsx          # 主义详情页（读取 content/isms/*.mdx）
│   ├── experiments/
│   │   ├── page.tsx                 # 思想实验列表页（16 个）
│   │   └── [slug]/page.tsx          # 思想实验详情页（读取 content/experiments/*.mdx）
│   ├── questions/
│   │   ├── page.tsx                 # 大问题列表页（8 个）
│   │   └── [slug]/page.tsx          # 大问题详情页（读取 content/questions/*.mdx）
│   └── timeline/
│       └── page.tsx                 # 时间线页面（108 事件，纯数据驱动）
├── components/
│   ├── Breadcrumb.tsx               # 面包屑导航
│   ├── EmptyState.tsx               # 空状态占位
│   ├── MarkdownRenderer.tsx         # Markdown 渲染组件
│   ├── MobileMenu.tsx               # 移动端菜单（Client Component）
│   ├── RelatedContent.tsx           # 相关内容推荐
│   ├── RelatedDomains.tsx           # 跨领域推荐（宇宙物理/人类历史）
│   ├── SafeRender.tsx               # 安全渲染包装
│   ├── SearchInput.tsx              # 搜索输入框
│   ├── SchoolsList.tsx              # 流派列表组件
│   ├── ThinkersList.tsx             # 哲学家列表组件
│   ├── school-detail/               # 流派详情页专用组件
│   │   ├── ContentRenderer.tsx
│   │   ├── Decorations.tsx
│   │   └── Sections.tsx
│   ├── thinker-detail/              # 哲学家详情页专用组件
│   │   ├── content-parser.ts        # 内容解析工具
│   │   ├── RenderBlocks.tsx
│   │   ├── ThinkerNav.tsx
│   │   └── ThinkerSidebar.tsx
│   └── timeline/
│       └── TimelineComponents.tsx   # 时间线可视化组件
├── content/                         # MDX 内容库（5 种内容类型）
│   ├── thinkers/                    # 45 位哲学家传记
│   ├── schools/                     # 32 个流派介绍
│   ├── isms/                        # 21 个主义词条
│   ├── experiments/                 # 16 个思想实验
│   └── questions/                   # 8 个大问题
├── lib/
│   ├── mdx.ts                       # 读取、解析 MDX frontmatter 的工具函数
│   ├── types.ts                     # 共享类型定义
│   ├── constants.ts                 # 全局常量
│   ├── cross-references.ts          # 跨内容类型交叉引用逻辑
│   ├── experiments.ts               # 思想实验数据读取
│   ├── isms.ts                      # 主义数据读取
│   ├── schools.ts                   # 流派数据读取
│   ├── timeline-data.ts             # 时间线核心数据
│   ├── timeline-data-ancient.ts     # 古代时间线数据
│   └── timeline-data-modern.ts      # 近现代时间线数据
├── public/                          # 静态资产
├── CLAUDE.md                        # 本文件
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 5. MDX Frontmatter Schema

每种内容类型有独立的 frontmatter schema，定义在 `lib/types.ts`。以下按类型列出：

### 5.1 哲学家 (`content/thinkers/*.mdx`)

```yaml
---
title: string           # 哲学家姓名（中文）
philosopher: string     # 哲学家姓名（英文）
era: 古代 | 近代 | 现代 | 当代
school: string          # 所属流派（如"儒家"、"德国古典哲学"）
tags: string[]          # 关键词标签
related: string[]       # 相关 slug（用于交叉引用）
status: stub | draft | published
updated: YYYY-MM-DD
---
```

**类型**：`PhilosopherFrontmatter`

### 5.2 流派 (`content/schools/*.mdx`)

```yaml
---
title: string           # 流派名称（中文）
era: 古代 | 近代 | 现代 | 当代
period?: string         # 存续时期（如"公元前300年—公元2世纪"）
founder?: string        # 创始人
key_figures?: string[]  # 代表人物
tags: string[]          # 关键词标签
related_thinkers?: string[]  # 相关哲学家 slug
status: stub | draft | published
updated: YYYY-MM-DD
---
```

**类型**：`SchoolFrontmatter`

### 5.3 主义 (`content/isms/*.mdx`)

```yaml
---
title: string           # 主义名称（中文）
title_en: string        # 主义名称（英文）
category: string        # 所属领域（如"伦理学"、"形而上学"）
era: string             # 时期描述（如"19世纪至当代"）
key_figures: string[]   # 代表人物
opposing: string[]      # 对立立场
tags: string[]          # 关键词标签
status: stub | draft | published
updated: YYYY-MM-DD
---
```

**类型**：`IsmFrontmatter`（见 `lib/isms.ts`）

### 5.4 思想实验 (`content/experiments/*.mdx`)

```yaml
---
title: string           # 实验名称（中文）
title_en: string        # 实验名称（英文）
philosopher: string     # 提出者
year: number            # 提出年份
field: string           # 所属领域（如"伦理学"、"认识论"）
tags: string[]          # 关键词标签
related_thinkers: string[]  # 相关哲学家
status: stub | draft | published
updated: YYYY-MM-DD
---
```

**类型**：`ExperimentFrontmatter`

### 5.5 大问题 (`content/questions/*.mdx`)

```yaml
---
title: string           # 问题（中文，如"意识是什么？"）
field: string           # 所属领域（如"心灵哲学"）
key_figures: string[]   # 核心相关哲学家
tags: string[]          # 关键词标签
related_thinkers: string[]  # 相关哲学家 slug
status: stub | draft | published
updated: YYYY-MM-DD
---
```

**类型**：`QuestionFrontmatter`

### 校验规则（通用）

- `status: stub` 表示占位，正文可为"（内容待补充）"
- `status: published` 要求正文 ≥ 80 行且包含至少一条事实卡或引用
- `related` / `related_thinkers` 中的 slug 必须对应实际存在的 `.mdx` 文件

---

## 6. 内容深度规范

参考 `human-history` 的内容深度规范，单篇哲学文章结构如下：

### 哲学家传记结构
1. **破除误解**：先指出常见的过浅或错误理解
2. **生平脉络**：出身、关键转折、晚年（具体年代与地点）
3. **时代背景**：哲学问题从哪里来
4. **核心思想**：逐条解释，避免只堆术语
5. **争议**：史学或思想史争论至少 1 条
6. **遗产与影响**：跨文明、跨时代的连接
7. **事实卡**（4 条）+ 经典名言

### 著作解读结构
1. **为什么读这本书**：历史地位与当下意义
2. **问题背景**：作者想解决什么问题
3. **核心论证**：逻辑脉络，不止复述结论
4. **反驳与争议**：有哪些经典批评
5. **长期影响**：如何改变了后来的哲学

---

## 7. 工程铁律

1. **单文件 ≤ 300 行**（RSC 与 Client Component 分文件）。
2. **命名**：文件名 `kebab-case`，变量/函数 `camelCase`，常量 `UPPER_SNAKE_CASE`，CSS 类 `kebab-case`。
3. **颜色通过 CSS 变量引用**，禁止在组件中硬编码十六进制色值（accent 颜色除外，因为它们与内容数据绑定）。
4. **动画必须检查 `prefers-reduced-motion`**，用 `useReducedMotion()` (Framer Motion) 统一处理。
5. **RSC 优先**：无客户端状态的组件不加 `"use client"`。
6. **MDX 内容与渲染逻辑分离**：`content/` 只放 `.mdx`，渲染逻辑在 `lib/mdx.ts` + `components/article/`。
7. **每次会话结束更新本文件的变更日志节（如有重大决策）**。

---

## 8. 与 monorepo 的关系

- 本项目属于 `apps/philosophy`，受根 `turbo.json` 统一调度。
- 共享 UI 组件通过 `@universe/ui` 引入（`packages/ui`）；独属哲学的组件放本项目 `components/`。
- 不直接依赖 `universe-physics` 或 `human-history` 的代码；灵感可借，代码不复制。

---

## 9. 开发命令

```bash
# 从 monorepo 根运行
pnpm --filter @universe/philosophy dev

# 或进入子目录（需先安装依赖）
cd apps/philosophy
pnpm dev           # Turbopack dev server
pnpm build         # production build
pnpm typecheck     # tsc --noEmit
pnpm lint          # eslint strict
pnpm check         # typecheck + lint + format:check
```

---

## 10. 变更日志

| 日期 | 变更内容 |
|------|---------|
| 2026-06-01 | 更新 CLAUDE.md：将四大板块（`/ancient-greek`、`/eastern`、`/modern`、`/contemporary`）更正为六大板块（`/thinkers`、`/schools`、`/isms`、`/experiments`、`/questions`、`/timeline`）；更新目录结构反映实际文件树；更新 MDX Frontmatter Schema 为 5 种独立类型 |

# 01 — 技术栈

## 1. 决策摘要

| 类别          | 选型                                              | 备注                                      |
| ------------- | ------------------------------------------------- | ----------------------------------------- |
| 框架          | **Next.js 16 (App Router)** + **React 19**        | SSG + 路由 + image/font 优化              |
| 语言          | **TypeScript 5.7+** strict                        | 全栈 strict                               |
| 样式          | **Tailwind CSS v4**                               | utility-first，配合 design tokens         |
| 3D / WebGL    | **three.js** + **@react-three/fiber (R3F)**       | R3F 声明式管理 Three 生命周期             |
| R3F 帮手      | **@react-three/drei**                             | Controls, Loaders, GPU instancing helpers |
| 后处理        | **@react-three/postprocessing**                   | Bloom / DoF / Vignette                    |
| 相机/过场动画 | **GSAP**                                          | 用 GSAP timeline 编排跨 Tier 相机动画     |
| UI / 微交互   | **Framer Motion**                                 | 知识面板、HUD、过渡                       |
| 状态管理      | **Zustand**                                       | 单页状态 (current tier / camera / panel)  |
| 内容          | **MDX** (`@next/mdx`) + 本地 JSON                 | `src/content` 下的静态资源                |
| 数据校验      | **Zod**                                           | 校验 JSON / MDX frontmatter               |
| 测试          | **Vitest** + **Playwright**                       | 单测与 e2e                                |
| Lint / Format | ESLint 9 + Prettier + prettier-plugin-tailwindcss | 与参考项目一致                            |
| 包管理        | **pnpm**                                          | 锁文件唯一                                |
| Node          | ≥ 22 LTS                                          |                                           |
| 部署          | **Vercel** (默认)                                 | SSG + Edge functions 备用                 |

## 2. 选型理由 (展开)

### 2.1 Three.js + R3F 是核心

- 跨尺度 3D 是产品本体；Canvas 2D 或 SVG 都撑不起。
- R3F 让 Three 的命令式 API 变成声明式组件，配合 React 19 的 transitions 和 Suspense 自然集成。
- drei 提供大量 production-ready 帮手 (Stats, Bvh, useGLTF, Instances, ...)。

### 2.2 GSAP **专管**相机/过场，Framer Motion **专管** UI

两者职责正交：

- **GSAP**：操作 Three 相机的 position / quaternion / fov，timeline 能编排多阶段过场，是 R3F 生态里相机动画的事实标准。
- **Framer Motion**：操作 DOM 元素，layout / exit animation / drag。

不混用。文档里也强调"哪个动画归谁"。

### 2.3 anime.js / motion.dev 不引入

有 GSAP 就够了。多一个引擎只是多一份 bundle 和心智负担。

### 2.4 Zustand 而不是 Redux / Jotai

- 单页 SPA 性质，状态形状简单 (current tier、目标对象、面板开关、相机状态)。
- Zustand API 最轻，配合 React 19 的并发模型也最稳。

### 2.5 Next.js 而不是 Vite

- 路由 / 文件结构 / SSG / 图片优化全家桶。
- 与参考项目 `swil-fitneheal` 保持一致，降低脑切换成本。
- 部署到 Vercel 顺滑。

唯一代价：Next + R3F 的 SSR 要小心，所有 Three 组件用 `'use client'` + `next/dynamic({ ssr: false })`。

## 3. 关键版本

```
node: >= 22
pnpm: >= 10
next: ^16
react: ^19
typescript: ^5.7
three: ^0.170
@react-three/fiber: ^9
@react-three/drei: ^10
@react-three/postprocessing: ^3
gsap: ^3.15
framer-motion: ^12
zustand: ^5
tailwindcss: ^4
zod: ^3
```

新版本上来先开 issue 评估，不直接升。

## 4. 不引入的东西 (Phase 1)

- React Query / SWR — 没有远程数据。
- Babylon.js / PlayCanvas — Three 已经够。
- D3 — 暂无图表需求；真需要再说。
- redux / mobx / jotai / valtio — Zustand 足矣。
- 任何 CSS-in-JS (styled-components / emotion) — Tailwind v4 + CSS variables。
- shadcn/ui / Radix 完整集成 — 用到 Dialog / Popover 时按需引入 Radix primitives，不全套铺开。

## 5. 第三方资产

- 行星纹理：NASA Visible Earth / Solar System Treks (Public Domain)。
- 星空背景：自生成的程序化星点 + 可选叠加真实星表 (HYG Database)。
- 字体：Noto Sans SC (OFL), Inter Variable (OFL), JetBrains Mono Variable (OFL)。
- 图标：手画 SVG 或 Lucide (ISC) 按需。

资产版权来源都要记录在 `docs/develop/asset-credits.md` (待建)。

## 6. 决策日志

写关键技术决策时，开一个 `docs/develop/decisions/NNNN-title.md`。每条 ADR 包含：上下文、考察的方案、选了什么、为什么、什么时候应该重新考虑。

Phase 1 暂不强制，Phase 2 起强制。

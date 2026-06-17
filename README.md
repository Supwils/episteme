# Episteme · 格致

> **重现人类认识世界的旅程**
>
> Episteme（ἐπιστήμη，古希腊语"知识"）· 格致（格物致知）—— 让任何人都能随时以美好、深入、系统的方式，接触人类最重要的知识。

一个以浏览器为唯一交付方式的**知识平台**：用可视化、沉浸式的方式探索十大知识领域，从可见宇宙下钻到地球，从远古文明走到当代前沿。我们重现的不是百科词条，而是人类认识世界的完整过程——包括震撼、疑惑、错误与顿悟。

---

## 十大知识领域

| 领域           | 路径                 | 核心体验                                       |
| -------------- | -------------------- | ---------------------------------------------- |
| **宇宙物理**   | `/universe-physics`  | WebGL 3D 场景，从可见宇宙逐层下钻到地球        |
| **人类历史**   | `/human-history`     | 时间线 + 图谱 + 人物 + SVG 地图，远古到当代    |
| **哲学思想**   | `/philosophy`        | 哲学家 / 流派 / 概念的文字驱动知识图谱         |
| **生命科学**   | `/life-science`      | 40 亿年演化，物种 / 灭绝 / 科学家 / 系统发育树 |
| **宇宙学**     | `/cosmology`         | 观测宇宙学与天体物理专题                       |
| **数学**       | `/mathematics`       | 概念 / 定理 / 悖论 / 数学家（KaTeX 公式）      |
| **经济学**     | `/economics`         | 经济学家 / 理论 / 案例 / 金融 KB + 模拟实验    |
| **心理学**     | `/psychology`        | 理论家 / 实验 / 现象 / 认知偏差                |
| **计算机科学** | `/computer-science`  | 先驱 / 概念 / 算法 / 计算理论                  |
| **政治学**     | `/political-science` | 思想家 / 主义 / 制度 / 国际关系                |
| 知识图谱       | `/knowledge-graph`   | 跨领域交互式力导向图                           |
| 研究前沿       | `/<领域>/frontier`   | 各领域"正在发生的 2020s 知识"（带年份与来源）  |
| 每日知识       | `/daily`             | 每日精选事实 / 问题，可"换一批"                |

**总计**：约 1850+ 知识单元、2300+ 静态页面、覆盖 10 个学科。

## 核心特性

- **可点击的知识网**：正文内 `[[wiki-link]]` 跨引用自动成为可跳转链接（含中文知识库），并在每页底部展示"被引用"反向链接——把孤立文章织成一张网。
- **深度优先的内容**：每篇遵循"通俗易懂·形象·准确·有深度"，破除误解、呈现争议、跨域连接、真实参考文献（详见 [`docs/叙事与引用规范.md`](docs/叙事与引用规范.md)）。
- **全站搜索**（⌘K / Ctrl+K）跨全部领域。
- **叙事朗读**：部分文章配 TTS 音频。
- **双主题**：观测台（暗）/ 手记（亮）。

## 快速开始

```bash
pnpm install      # 安装依赖（单包）
pnpm dev          # localhost:3000（Turbopack）
pnpm build        # 生产构建（prebuild 自动重生索引）
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm test         # Vitest 单元测试
pnpm check-content # 内容质量校验
```

访问 http://localhost:3000 —— 所有知识领域通过路径前缀统一访问。

## 内容管线

内容与代码解耦，统一存放在 `content/<领域>/`。类型化数据用 `@/content/...` 直接导入；散文 MDX/MD 由 loader 在运行时按路径读取。搜索镜像、wiki-link 索引等派生数据由生成脚本产出，并在每次构建前自动刷新：

```bash
pnpm gen-all   # 重生全部搜索镜像 + 正/反向 wiki-link 索引（prebuild 自动调用）
```

## 技术栈

- **框架**：Next.js 15（App Router）
- **语言**：TypeScript（strict + noUncheckedIndexedAccess）
- **包管理**：pnpm 10
- **样式**：Tailwind CSS v4 + CSS 变量（next-themes 双主题）
- **3D**：React Three Fiber + drei + postprocessing + Three.js
- **动画**：Framer Motion + GSAP
- **内容**：MDX + gray-matter + Zod
- **数学**：KaTeX
- **测试**：Vitest + Testing Library + Playwright
- **部署**：Vercel

## 部署（Vercel）

仓库根目录即应用。在 Vercel 导入本仓库即可自动识别 Next.js（`vercel.json` 已配置 `pnpm build` / `pnpm install`）。建议设置环境变量：

```
NEXT_PUBLIC_SITE_URL = https://<你的生产域名>   # 用于 SEO / sitemap / OG
```

`reference/`、`docs/`、`e2e/` 已通过 `.vercelignore` 排除出部署。

## 项目结构

```
.
├── app/          ← App Router 路由与 API（10 领域 + 全局页）
├── components/   ← 全局与跨领域 UI 组件
├── lib/          ← loader、搜索、图引擎、wiki-link 索引与工具
├── subjects/     ← 各领域前端代码与领域逻辑
├── content/      ← 知识内容（按领域分目录，与代码解耦）
├── scripts/      ← 内容生成与校验脚本
├── docs/         ← 平台文档与内容创作准则
└── reference/    ← 旧源码参考（不参与构建/测试）
```

## 文档

- [CLAUDE.md](CLAUDE.md) —— AI 编码代理必读规范
- [知识精神](docs/知识精神.md) —— 内容价值观
- [叙事与引用规范](docs/叙事与引用规范.md) —— 内容核心创作准则
- [项目总览](docs/项目总览.md) —— 平台全景
- [工作日志](docs/工作日志.md) —— 开发会话记录

## 许可

私有项目，保留所有权利。

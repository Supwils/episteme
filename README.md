# Episteme · 格致

> **重现人类认识世界的旅程**
>
> Episteme（ἐπιστήμη，古希腊语"知识"）· 格致（格物致知）—— 让任何人都能随时以美好、深入、系统的方式，接触人类最重要的知识。

一个以浏览器为唯一交付方式的**知识平台**：用可视化、沉浸式的方式探索 18 个知识领域，从可见宇宙下钻到地球，从远古文明走到当代前沿。我们呈现的不是百科词条，而是人类认识世界的完整过程——包括震撼、疑惑、错误与顿悟。

---

## 18 个知识领域（按六簇组织）

| 簇             | 领域                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| **宇宙与自然** | 物理学 `/universe-physics` · 宇宙学 `/cosmology` · 地球科学 `/earth-science` · 化学 `/chemistry`           |
| **生命与心灵** | 生命科学与进化 `/life-science` · 医学与公共卫生 `/medicine` · 心理学 `/psychology` · 语言学 `/linguistics` |
| **社会与制度** | 社会学 `/sociology` · 经济学 `/economics` · 政治学 `/political-science` · 法学 `/law`                      |
| **历史与文明** | 人类历史 `/human-history`                                                                                  |
| **人文与艺术** | 哲学思想 `/philosophy` · 艺术、建筑与美学 `/arts`                                                          |
| **数理与技术** | 数学与逻辑 `/mathematics` · 计算机科学 `/computer-science` · 工程与技术 `/engineering`                     |

**跨领域入口**：知识图谱 `/knowledge-graph`（力导向图）· 阅读路线 `/read` · 全站搜索 `/search` · 每日知识 `/daily` · 奇趣知识 `/curiosities` · 分子图鉴 `/molecules` · 知识汇流 `/knowledge-confluence` · 研究前沿 `/<领域>/frontier`（14 域 91 篇，"正在发生的 2020s 知识"，带年份与来源）。

**当前规模**：约 **2479 篇内容**、搜索索引 2635 个文档、知识图谱 1788 节点 / 8151 边、跨文章反向链接 13026 条。

## 核心特性

- **可点击的知识网**：正文内 `[[wiki-link]]` 跨引用自动成为可跳转链接（含中文知识库），每页底部按领域分组展示"被引用"反链——把孤立文章织成一张网。
- **深度优先的内容**：每篇遵循"通俗易懂 · 形象 · 准确 · 有深度"，破除误解、呈现争议、跨域连接、真实参考文献（详见 [`docs/叙事与引用规范.md`](docs/叙事与引用规范.md)）。
- **中文全文搜索**（⌘K / Ctrl+K）：bigram 分词两层架构（Worker 倒排索引 + 服务端短语 corpus），标题召回 100%。
- **知识编排**：认知分层的知识图谱、学习主线（L1→L5）、知识连续体与缺口诊断、策展阅读路线。
- **阅读体验**：三档阅读模式、阅读进度条、移动端 TOC 抽屉、打印样式、KaTeX 服务端渲染、部分文章配 TTS 朗读。
- **双主题**：观测台（暗）/ 手记（亮），WCAG A/AA serious/critical 违规为 0。

## 快速开始

```bash
pnpm install         # 安装依赖（单包，Node 22）
pnpm dev             # ⚠️ http://localhost:3067（Turbopack）
pnpm build           # 生产构建（prebuild 自动跑 gen-all 重生索引）
pnpm start           # 生产模式 http://localhost:3000

pnpm typecheck       # tsc --noEmit
pnpm lint            # eslint . --max-warnings 0
pnpm test            # Vitest（1049 测试 / 132 文件）
pnpm check-content   # 内容质量校验
pnpm prepush         # 本地完整门禁（上面这些 + 五项知识/图像审计）
```

## 内容管线

内容与代码解耦，统一存放在 `content/<领域>/`。类型化数据用 `@/content/...` 直接导入；散文 MDX/MD 由 loader 在运行时按路径读取。搜索镜像、wiki-link 正/反向索引、响应式图像等派生数据由生成脚本产出，并在每次构建前自动刷新：

```bash
pnpm gen-all   # 10 步生成链：各域搜索镜像 → 历史路由数据 → wiki-link/反链 → 搜索索引 → 内容图像
```

改了内容就要跑 `gen-all`，并把重生的产物一并提交——CI 会在干净 checkout 上验证生成幂等。

## 技术栈

- **框架**：Next.js 15（App Router，dev/prod 均 Turbopack）· React 19 · Node 22
- **语言**：TypeScript（strict + `noUncheckedIndexedAccess`）｜**包管理**：pnpm 10（单包，非 monorepo）
- **样式**：Tailwind CSS v4 + CSS 变量（next-themes 双主题）
- **3D**：React Three Fiber + drei + postprocessing + Three.js｜**动画**：Framer Motion + GSAP
- **内容**：MDX + gray-matter + Zod｜**数学**：KaTeX｜**搜索**：MiniSearch + 自研中文 bigram 分词
- **测试**：Vitest + Testing Library + Playwright｜**部署**：Vercel（GitHub Actions 预构建产物部署）

## 部署

仓库根目录即应用。生产部署由 `.github/workflows/ci.yml` 在 push `main` 后自动执行三级门禁：**Quality**（生成幂等 · 类型 · Lint · 内容与知识审计 · 单测）→ **Build**（构建 · 渲染审计 · 包体预算 · Lighthouse · Playwright smoke）→ **Deploy**（`vercel deploy --prebuilt --prod --archive=tgz`）。

Vercel 原生 git 集成**刻意关闭**（`vercel.json`）——它会拒绝 Next serverless 函数的去重符号链接。细节见 [`docs/CI-CD与渲染策略.md`](docs/CI-CD与渲染策略.md) 与 [`docs/复盘-从一次Vercel部署翻车到CICD最优解.md`](docs/复盘-从一次Vercel部署翻车到CICD最优解.md)。

`reference/`、`docs/`、`e2e/` 已通过 `.vercelignore` 排除出部署。

## 项目结构

```
.
├── app/             ← App Router 路由与 API（18 领域 + 探索页 + 15 个 route handler）
├── components/      ← 全局、跨领域与领域专属 UI 组件
├── subjects/        ← 12 个有专属前端逻辑的领域（物理 3D、历史 Canvas、图谱引擎…）
├── lib/             ← 内容加载器、领域引擎、搜索、图引擎、知识编排、生成索引
├── content/         ← 知识内容（按领域分目录，与代码解耦）
├── content-assets/  ← 内容图像原图 + 权利元数据
├── generated/       ← corpus 与搜索统计（构建产物，已提交）
├── scripts/         ← 生成 / 校验 / 审计 / 性能脚本
├── e2e/             ← Playwright 端到端测试
├── docs/            ← 平台文档与内容创作准则
└── reference/       ← 旧源码参考（不参与构建/测试/部署）
```

## 文档

- [CLAUDE.md](CLAUDE.md) —— AI 编码代理必读规范（唯一真相源）
- [docs/README.md](docs/README.md) —— 全部文档索引
- [项目总览](docs/项目总览.md) —— 平台全景与内容盘点
- [知识精神](docs/知识精神.md) · [叙事与引用规范](docs/叙事与引用规范.md) —— 内容价值观与创作准则
- [任务清单](docs/任务清单.md) · [工作日志](docs/工作日志.md) —— 在办事项与会话记录

## 许可

私有项目，保留所有权利。

# CLAUDE.md — Episteme · 格致（仓库目录名 `universe-knowledge`）

**本文件适用于所有 AI 编码代理（Claude Code、Kilocode、Cursor 等）。进入仓库后必须首先读完本文件。所有指令优先级高于你的默认行为。**

> 品牌名 **Episteme · 格致**（`package.json` 的 `name: "episteme"`、根 `README.md`）；仓库目录与历史文档里的 "Universe Knowledge" 是同一个项目的旧称，遇到时按同义处理。

---

## ⛔ Git 与部署纪律（最高优先 · 默认行为）

> 这是默认规则，除非用户在**当次会话中**明确另行要求。代理只管"改 + 本地验证"，**commit / merge / push 三个动作都由用户口令触发**。

1. **默认不 commit、不 merge、不 push、不开 PR。** 把工作做在工作树里，用本地命令验证质量即可；要不要落库、合并、上线，全部等用户发话。
2. **`git commit` 只在用户明确说"commit / 提交"时执行。** 平时不要一边做一边频繁提交；等用户喊 commit 时，再把当前工作收敛成**最小数量**的 commit（理想 1 个；多个互不相干的逻辑单元可各自成 commit，零碎的先 `git reset --soft` 合并）。
3. **集成到 `main` 用本地 merge，绝不用 PR。** 用户说"merge"时执行 `git checkout main && git merge <branch>`（本地合并），**不要 `gh pr create`**。
4. **`git push` 只在用户明确说"push / 部署 / 上线 / deploy"时执行。** 本仓库 `main` 一旦被 push，GitHub Actions 会自动触发生产部署（`vercel deploy --prebuilt --prod`）；用户不希望部署被频繁触发。
5. **验证靠本地命令，不靠 push 触发 CI。** 用 `pnpm prepush / build / bundle-check` 本地确认质量，不要为了"看 CI 绿不绿"而 push。
6. 历史改写（`reset` / force-push）属重操作，仍需用户明确授权（见第十节）。

---

## 🚀 构建 / ISR / CI-CD 机制（部署如何工作）

> 与上方"Git 与部署纪律"配套：纪律讲"何时、由谁触发"，本节讲"机制上怎么跑"。**改动任何构建/部署/CI 配置前必读。** 策略细节见 `docs/CI-CD与渲染策略.md`，事故复盘见 `docs/复盘-从一次Vercel部署翻车到CICD最优解.md`。

### 构建（`pnpm build`）

- **`prebuild` 钩子先跑 `pnpm gen-all`**，从 `content/` 重新生成**全部派生索引**，共 10 步（顺序即依赖顺序）：

  | 命令                     | 产物                                                                                                 |
  | ------------------------ | ---------------------------------------------------------------------------------------------------- |
  | `gen-philo`              | `content/philosophy/*-data.ts` 搜索镜像                                                              |
  | `gen-econ`               | `content/economics/*-data.ts`                                                                        |
  | `gen-psych`              | `content/psychology/*-data.ts`                                                                       |
  | `gen-life`               | `content/life-science/*-data.ts`                                                                     |
  | `gen-physics-dialogues`  | 物理对话索引                                                                                         |
  | `gen-history-route-data` | `content/human-history/data/generated/*`（event/figure catalog，按时代分片）                         |
  | `gen-kb`                 | 各域 knowledge-base 索引                                                                             |
  | `gen-links`              | `lib/wiki-link-index.ts`、`lib/backlinks-index.ts`、`public/link-previews.json`、`generated/corpus*` |
  | `gen-search-index`       | `public/search-index.json`、`generated/search-stats.json`                                            |
  | `gen-content-images`     | `public/images/<id>-<w>.webp` + manifest                                                             |

  **改了内容就要 `pnpm gen-all`**（不是只跑 `gen-links`——corpus/搜索统计属另一层，漏跑会以"看似无关的测试失败"暴露）。CI 在干净 checkout 上跑同一条链并要求**工作区零差异**，所以重生的索引文件必须一并提交。

- 然后 `next build --turbopack`（生产构建用 **Turbopack**），带 `NODE_OPTIONS=--max-old-space-size=8192`（内容量大，否则 OOM）。

### ISR（关键：别把高基数路由全静态化）

- 各 `[slug]` 内容路由用 `generateStaticParams` 只返回**一小部分**精选 slug（或空数组）+ 默认 `dynamicParams: true` → 未覆盖的 slug **首次访问时生成并缓存到下次部署**，不在构建期全量产出（当前生产构建约 246 静态页）。
- 这是**刻意设计**：Vercel 部署有 **15000 文件上限**，~2500 篇内容 × 多路由若全静态会超限。**不要**给这些路由返回全部 slug、也别关掉 `dynamicParams`。
- 通用文章不设定时 ISR（内容随部署发布，定时重验证只增加函数重算）；首页/每日为 1 小时 ISR，连续体与知识汇流为 24 小时 ISR，用户档案类 POST 接口保持 `private, no-store`。契约由 `pnpm audit-rendering` 读生产产物强制。

### CI-CD（`.github/workflows/ci.yml`，push 到 `main` 触发）

- **触发**：push 到 `main`（`docs/` 目录下的改动被 `paths-ignore` 跳过，**不构建、不部署**）、面向 `main` 的 PR、手动 `workflow_dispatch`。
- **三个 job**：
  - **quality** — 生成索引幂等性（`gen-all` 后 `git status` 必须干净）→ `typecheck` → `lint` → `check-content` + 四项审计（`audit-graph-coverage` / `audit-learning-continuum` / `audit-subject-candidates` / `audit-linguistics-foundation`）→ `test`。
  - **build** — `pnpm build` → `audit-rendering` → `bundle-check --skip-build` → Lighthouse 预算 → Playwright 生产 smoke（`test:e2e:smoke`）。
  - **deploy** — 仅 `main` 且 quality+build 都过，`vercel pull` → `vercel build --prod` → **`vercel deploy --prebuilt --prod --archive=tgz`**。需仓库 secret `VERCEL_TOKEN`（org/project id 写在 workflow env 里，是资源标识不是凭证）。
- **为什么不用 Vercel 原生 git 集成**：`vercel.json` 的 `git.deploymentEnabled.main = false` 是**故意关掉**的——原生集成的 deploy 会拒绝 Next 的 serverless 函数去重**符号链接**；`--prebuilt --archive` 是当前唯一可靠路径（同时绕开 15000 文件上限的校验）。**别重新打开它。**

### 本地 pre-push 门禁（`.husky/pre-push`）

- 每次 `git push` 前自动跑 `pnpm prepush` 九条命令：`typecheck` → `lint` → `check-content` → `audit-graph-coverage` → `audit-learning-continuum` → `audit-subject-candidates` → `audit-linguistics-foundation` → `audit-image-rights` → `test`，镜像 CI `quality` job 的确定性部分。
- **pre-push 钩子刻意不跑** build job 那套（生产构建、包体、Lighthouse、Playwright 不适合阻塞每次本地 push）。但内容或前端轮次在请求 push 前，代理必须至少本地跑一次真实 Turbopack `pnpm build`，随后 `pnpm bundle-check -- --skip-build`。
- husky 已激活（`prepare` 脚本）。紧急绕过：`git push --no-verify`。
- ⚠️ `audit-graph-coverage` 目前**对未达覆盖率底线的域仍返回 0**（只有单元测试会拦），本地看到它"绿"不等于达标——以 `pnpm test` 为准。

### 代理注意事项（部署相关）

- **push = 生产部署**（受 quality+build 门禁）。按上方纪律，只在用户明确说 push / 部署 / 上线时执行。
- `pnpm lint = eslint . --max-warnings 0` 扫全仓；**自托管 / vendored 资产**（如 `public/` 下的压缩版 molstar.js）必须在 `eslint.config.mjs` 的 `ignores` 里排除，否则压缩代码会误报、挂 CI。
- 只改 `docs/**` 不触发部署；改 `CLAUDE.md`（根目录）或任何代码/内容则会。

---

## 第零节：代理自主接手协议（Agent Onboarding Protocol）

> 如果你是刚接手本仓库的自主代理，按以下顺序执行，不要跳过任何一步。

### 第一步：读文档（只读，不写代码）

```
1. 本文件（CLAUDE.md）                    ← 你现在读的
2. docs/README.md                        ← 文档索引，决定接下来读哪些
3. docs/聚焦方向.md                       ← ⭐ 项目方向与禁区
4. docs/任务清单.md                       ← 在办/待办真相源，找下一件事做
5. docs/工作日志.md（读末尾 2-3 条）       ← 上一个代理做了什么、留了什么坑
6. docs/工程原则.md                       ← 代码质量铁律
7. docs/叙事与引用规范.md                  ← ⭐ 写内容必读：四条叙事标准 + 引用结构 + 机器把关
```

写内容再加 `docs/知识精神.md`；新建领域再加 `docs/学科版图与导航架构.md` + `docs/新领域创作指南.md`。

### 第二步：运行自检命令

```bash
ls package.json next.config.ts tsconfig.json     # 单一应用，全在仓库根目录
ls apps packages turbo.json pnpm-workspace.yaml 2>/dev/null \
  && echo "⚠️ monorepo 残留" || echo "✅ 单一应用结构"
pnpm install 2>&1 | tail -5                      # 单包，Node 22（.nvmrc）
pnpm typecheck && pnpm test                      # 基线应全绿（当前 1054 测试 / 133 文件）
```

### 第三步：识别阻塞问题并记录

把发现的问题记进 `docs/工作日志.md`（格式见第七节）。有 P0 阻塞先解决阻塞；没有就按 `docs/任务清单.md` 优先级取第一个"待开始"任务。

### 第四步：执行任务（一次只做一件事）

每个任务完成后：① 跑第八节的验证命令；② 更新 `docs/任务清单.md` 状态；③ 在 `docs/工作日志.md` 追加会话记录。

**不要在一个会话里同时推进多个无关的大任务。**

---

## 1. 平台定位

**Episteme · 格致** 是面向大众的**知识即服务平台（Knowledge as a Service）**，以浏览器为唯一交付方式，用可视化、沉浸式的方式探索人类知识。当前 **18 个知识领域 · 2581 篇内容**（`content/` 下 `.md`/`.mdx` 实测，排除 `*.narration.md` 与 `CREDITS.md`）。

领域按 `docs/学科版图与导航架构.md` 的**六簇分类法**组织，`lib/data.tsx` 的 `DOMAINS`（含 `cluster` 字段）是**唯一真相源**，导航/首页/页脚/manifest 全部派生：

| 簇             | 领域（路由 · 篇数）                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **宇宙与自然** | 物理学 `/universe-physics` 175 · 宇宙学 `/cosmology` 165 · 地球科学 `/earth-science` 86 · 化学 `/chemistry` 100     |
| **生命与心灵** | 生命科学 `/life-science` 134 · 医学与公共卫生 `/medicine` 130 · 心理学 `/psychology` 225 · 语言学 `/linguistics` 61 |
| **社会与制度** | 社会学 `/sociology` 62 · 经济学 `/economics` 203 · 政治学 `/political-science` 178 · 法学 `/law` 48                 |
| **历史与文明** | 人类历史 `/human-history` 170                                                                                       |
| **人文与艺术** | 哲学思想 `/philosophy` 359 · 艺术、建筑与美学 `/arts` 54                                                            |
| **数理与技术** | 数学与逻辑 `/mathematics` 171 · 计算机科学 `/computer-science` 210 · 工程与技术 `/engineering` 50                   |

**跨领域与探索入口**：`/`（门户）· `/knowledge-graph`（力导向知识图谱）· `/read`（阅读路线）· `/search`（全站搜索）· `/daily`（每日知识）· `/curiosities`（奇趣知识）· `/molecules`（分子图鉴）· `/knowledge-confluence/[id]`（知识汇流）· `/<领域>/frontier`（研究前沿，18 域共 115 篇）。

**产品灵魂**：让任何人——大学生、上班族、好奇的老人——都能随时以美好的方式接触人类最重要的知识。门槛低、深度足、视觉美。

---

## 2. 仓库结构

**单一 Next.js 15 应用，应用代码直接位于仓库根目录**（不是 monorepo：无 `apps/`、`packages/`、`turbo.json`、`pnpm-workspace.yaml`）。

```
universe-knowledge/
├── app/                      ← App Router：18 领域 + 探索页 + API（330 个 page.tsx / 14 个 route handler）
│   ├── <domain>/             ← 每域：layout/globals.css/page + 各板块 list + [slug] + loading/error/not-found
│   ├── api/                  ← daily · search · learning-targets · knowledge-continuum/* · knowledge-frontier/* · og
│   └── read/ search/ daily/ curiosities/ molecules/ knowledge-graph/ knowledge-confluence/
├── components/               ← 共享组件
│   ├── ui/                   ← 通用基础组件
│   ├── <subject>/            ← 领域专属组件（medicine、law、arts…）
│   └── markdown/ search/ timeline/ frontier/ narration/ domain/ …
├── subjects/                 ← 12 个有专属前端逻辑的领域（@/subjects/<x>）
│   ├── physics history philosophy economics life-science mathematics
│   ├── psychology cosmology chemistry medicine linguistics knowledge-graph
│   └── <subject>/{components,lib,scenes,shaders,store,hooks}  领域间互相隔离
├── lib/                      ← 共享工具 + 内容加载器 + 知识编排
│   ├── knowledge-domain.ts   ← 通用领域引擎（读 content/<域>/<板块>/*.mdx）
│   ├── new-domains.ts        ← 引擎驱动域的配置（11 个：cs/ps/earth/medicine/chemistry/
│   │                            sociology/psychology-methods/linguistics/law/arts/engineering）
│   ├── data.tsx              ← DOMAINS 真相源（含 cluster）；domain-clusters.ts 为派生层
│   ├── graph-engine/         ← 力导向图引擎（Barnes-Hut + Web Worker）
│   ├── search/ search-index/ ← 中文 bigram 两层检索（Worker 索引 + 服务端 corpus 短语层）
│   ├── cross-links/ cross-domain-refs/ ← 跨领域链接与引用
│   ├── knowledge-*.ts        ← 连续体/汇流/地形/缺口/学习计划等编排层
│   ├── frontier.ts           ← 研究前沿加载器（FRONTIER_DOMAINS 当前 18 域）
│   ├── mdx.ts content-paths.ts content-schemas.ts citations.ts image-rights.ts
│   └── wiki-link-index.ts backlinks-index.ts  ← ⚠️ gen-links 生成，禁止手改
├── content/                  ← ⭐ 唯一内容目录，按领域分子目录
│   ├── <domain>/<section>/*.mdx|.md   ← 散文内容（运行时 fs 读取）
│   ├── <domain>/*-data.ts             ← 类型化数据/搜索镜像（部分由 gen-* 生成）
│   └── <domain>/frontier/*.md         ← 研究前沿（.md）
├── content-assets/images/    ← 内容图像原图 + 权利元数据（见 docs/图像管线指南.md）
├── generated/                ← corpus.txt / corpus-meta.json / search-stats.json（构建产物，已提交）
├── public/                   ← 静态资源（search-index.json、link-previews.json、images/、textures/）
├── scripts/                  ← 生成（gen-*）· 校验（check-content）· 审计（audit-*）· 性能（physics/、performance/）
├── e2e/                      ← Playwright（22 spec；CI 只跑 smoke.spec.ts）
├── docs/                     ← 平台文档（代理读写区；一次性报告在 docs/archive/）
├── reference/                ← 旧位置参考代码，禁止删除；已排除出 tsconfig/vitest/vercel
└── package.json next.config.ts tsconfig.json vercel.json vitest.config.ts playwright*.config.ts eslint.config.mjs
```

**关键规则**：`reference/` 是旧参考代码，保留供查阅，已在 `tsconfig.json` 的 `exclude`、`vitest.config.ts` 的 `exclude` 与 `.vercelignore` 中排除，**不参与构建、类型检查、测试与部署**。

---

## 3. 语言规则（强制）

| 场景                         | 语言                                         |
| ---------------------------- | -------------------------------------------- |
| 所有 `.md` 文档              | **中文**                                     |
| 与用户的对话、计划、汇报     | **中文**                                     |
| 代码、变量名、函数名、文件名 | **英文**                                     |
| commit message               | **英文**                                     |
| 网页用户可见内容             | **中文**（专有名词保留英文，如 WebGL、GSAP） |

---

## 4. 真相源优先级（文档冲突时）

前面的文档胜出：

1. `docs/任务清单.md` — 在办/待办、决策记录与已知问题（任务真相源）
2. `docs/工作日志.md` — 最新一次代理的发现与遗留问题
3. `docs/聚焦方向.md` — 项目方向与禁区
4. `docs/叙事与引用规范.md` — 内容创作与引用准则
5. `docs/学科版图与导航架构.md` — 领域分类、导航与新域接入路线
6. `docs/CI-CD与渲染策略.md` — 流水线与渲染契约
7. `docs/工程原则.md` — 平台工程铁律
8. 本文件（CLAUDE.md）

代码与文档冲突时，**以代码为准并修文档**（把结论写进 `任务清单.md` 或对应专题文档）。

---

## 5. 技术栈与命令速查

- **框架**：Next.js 15 App Router（dev/prod 均 Turbopack）· React 19 · Node 22（`.nvmrc`）
- **3D**：React Three Fiber + drei + postprocessing + Three.js｜**动画**：Framer Motion + GSAP
- **状态**：Zustand｜**样式**：Tailwind CSS v4 + CSS 变量 + next-themes（双主题：观测台/手记）
- **内容**：MDX + gray-matter + Zod｜**公式**：KaTeX（服务端渲染）｜**搜索**：MiniSearch + 自研 bigram 分词
- **语言**：TypeScript strict + `noUncheckedIndexedAccess`｜**包管理**：pnpm 10（单包）
- **测试**：Vitest + Testing Library + Playwright｜**部署**：Vercel（`--prebuilt --archive`）

```bash
pnpm install               # 单包安装
pnpm dev                   # ⚠️ localhost:3067（Turbopack）——不是 3000
pnpm start                 # 生产模式 localhost:3000（Lighthouse 用）
pnpm build                 # 生产构建（prebuild 自动 gen-all）
pnpm gen-all               # 重生全部派生索引（改内容后必跑）

pnpm typecheck             # tsc --noEmit
pnpm lint                  # eslint . --max-warnings 0
pnpm test                  # Vitest（1054 测试 / 133 文件）
pnpm check-content         # 内容质量校验（当前 0 error / 0 warning）
pnpm prepush               # 上面这些 + 五项审计，一条命令跑完本地门禁

pnpm bundle-check -- --skip-build   # JS/CSS/搜索索引预算（先跑过 build）
pnpm audit-rendering       # SSG/ISR 契约（读生产产物）
pnpm audit-cross-domain    # 跨域连接节达标口径
pnpm audit-image-rights    # 图像权利与性能预算
pnpm test:e2e:smoke        # Playwright 生产冒烟（CI 门禁同款）
pnpm wiki-slug <关键词>     # 查某篇文章的正确 wiki slug（写内链前用）
pnpm update-graph-snapshot # 图谱聚合快照（改图谱数据后必跑，测试读它）
```

---

## 6. 工程铁律与性能预算

1. **聚焦原则**：每次修改收敛到一个明确问题。禁止夹带无关重构。
2. **无防御性废代码**：框架能保证的地方不用 try/catch；只在系统边界（用户输入、外部 API、文件读取）校验。
3. **小文件**：单文件实质代码 > 300 行必须考虑拆分；函数 > 50 行必须拆分。
4. **命名胜于注释**：注释只写**为什么**，不写做什么。
5. **可访问性底线**：所有动画尊重 `prefers-reduced-motion`；WCAG A/AA serious/critical 违规为 0（36 入口 × 双主题 × 双视口扫描）。
6. **内容准确性**：历史与科学内容必须事实上经得起推敲、有来源（见 `docs/叙事与引用规范.md`）。

**性能预算**（`scripts/physics/bundle-check.mjs` 强制，超限即挂 CI）：

| 门禁                       | 预算              | 近期水位                                |
| -------------------------- | ----------------- | --------------------------------------- |
| 全平台共享初始 JS          | ≤ 180 KB gzip     | ~144.6 KB                               |
| 门户 / 领域路由 CSS        | ≤ 48 KB gzip      | ~42.4 KB                                |
| 通用文章路由 JS            | ≤ 220 KB gzip     | —                                       |
| 任一单 JS chunk            | ≤ 285 KB gzip     | ~179.4 KB                               |
| `public/search-index.json` | ≤ 640 KB brotli   | ~512.3 KB                               |
| 首页 RSC 原始体积          | ≤ 110 KB          | —                                       |
| 3D 路由初始 JS             | ≤ 180 KB gzip     | ~149 KB（`pnpm audit:physics-runtime`） |
| 单图最大变体 / 单篇图像    | ≤ 500 KB / 800 KB | —                                       |

提额必须在 `docs/任务清单.md` 的「决策记录」里写明依据与触发条件。详见 `docs/工程原则.md`、`docs/物理3D性能预算.md`。

---

## 7. 代理工作日志协议（强制）

**每次会话结束前，必须在 `docs/工作日志.md` 追加一条记录。**

```markdown
## [日期] 会话 #N — [任务标题]

**执行人**：[代理名称]
**任务**：[做了什么]

### 完成内容

- [具体操作，带文件路径]

### 发现的问题

- [新发现的 bug 或阻塞，带具体错误信息]

### 验证结果

- [跑了哪些命令、输出是什么]

### 下一步

- [下一个代理应该继续做的第一件事]

### 任务清单变更

- [T-XXX] 状态改为：已完成 / 进行中
```

---

## 8. 任务验证命令（自主代理必须执行）

不要只看代码写完了就算。全部在仓库根目录运行。

```bash
# 通用（任何改动）
pnpm prepush                                  # 九条本地门禁，必须全绿

# 改了内容
pnpm gen-all && git status --short            # 索引必须与内容一致，产物一并纳入改动
pnpm check-content                            # 0 error（warning 也应保持 0）
pnpm audit-cross-domain                       # 跨域连接节口径

# 改了图谱数据
pnpm update-graph-snapshot && pnpm test       # 快照与实际一致

# 改了前端 / 构建
pnpm build && pnpm bundle-check -- --skip-build
pnpm audit-rendering

# 渲染验证（改动页面/路由后）——注意端口 3067
pnpm dev
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3067/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3067/philosophy
```

---

## 9. 高频踩坑（血泪清单，动手前扫一眼）

新内容/新领域**注册链缺一环就有一个门禁失败**，且失败信息常常指向看似无关的地方：

1. **改内容只跑 `gen-links` 不够** —— `generated/corpus.txt` 等属另一层，必须 `pnpm gen-all`，否则 phrase corpus 测试以莫名其妙的名字失败。
2. **语言学是注册负担最重的域**：新文章要同时进 `lib/linguistics-subject-plan.ts`（板块 + 发布波）与 `lib/subject-candidate-matrix.ts`（计数），缺一即挂审计。（第三处「手写图谱节点」已于 #249 取消——节点现由 `mdx-derived-nodes.ts` 自动派生。）
3. **图谱前置必须同时是图上邻居** —— `cognitive-metadata` 要求 `prerequisiteIds` 既比自己低一级、又有对应的边；只设前置不加边 = 孤儿节点（这个坑踩过五次）。
4. **图谱节点已全域自动派生**（#249）：18 个文件型域的文章只要落在**已登记板块**里就自动入图，不必手写节点。代价是底线也全部提到了 **100%**（哲学 98%），所以新增**板块**却忘了登记 `derived-node-taxonomy.ts` 时，`audit-graph-coverage` 会立刻变红——这正是想要的行为。
5. **歧义 slug 会被索引整体丢弃**：同名文件（如 philosophy 下两个 `skepticism`）导致 `[[slug]]` 渲染成纯文本。写内链前用 `pnpm wiki-slug <关键词>` 查真实 slug。
6. **human-history 知识库路由是 `/human-history/knowledge/`**，不是 `/knowledge-base/`——按目录名猜路径会 404。
7. **`pnpm dev` 在 3067**，Lighthouse/`pnpm start` 在 3000。冒烟时别弄混。
8. **Tailwind v4 `@theme` 变量未分层后置输出**：分层的 print/主题重映射压不过它，需在文件末尾用未分层块 + `!important`。
9. **`app/globals.css` 是唯一允许 `@import "tailwindcss"` 的文件**，领域样式只能 `@reference`，否则每个新域生成一份完整工具类、路由 CSS 预算立刻爆。
10. **新增一个板块仍要登记三处**：`lib/new-domains.ts`（板块配置）→ `subjects/knowledge-graph/data/derived-node-taxonomy.ts`（板块名 + 层级 + 类型，漏了会被守卫测试 `derived-node-taxonomy.test.ts` 拦住）→ `content-reachability-audit.ts` 的 scope（否则该板块成为审计盲区）。`cognitive-metadata.ts` 的 `inferKnowledgeLevel` 只对策展节点生效了——派生节点自带层级；改它时仍**不要用子串匹配**，`writing-systems`/`operating-systems` 会被误伤。
11. **`check-content` 带 warning 时仍以 0 退出**，警告行会被 `pnpm prepush | tail` 的测试输出淹没。要确认内容质量，**单独跑 `pnpm check-content` 并读 `Warnings:` 计数**。

---

## 10. 禁止事项（代理不得自行做的事）

- ❌ 删除 `reference/` —— 需用户明确授权
- ❌ force push 到任何分支；未经授权改写历史
- ❌ 重新打开 Vercel 原生 git 集成（`vercel.json` 的 `deploymentEnabled.main`）
- ❌ 给高基数 `[slug]` 路由返回全部 slug 或关掉 `dynamicParams`
- ❌ 手改 `lib/wiki-link-index.ts`、`lib/backlinks-index.ts`、`public/search-index.json`、`public/images/` 等生成产物
- ❌ 在没有验证的情况下声称任务已完成
- ❌ 一次会话同时开多个无关的大任务
- ❌ 在 TypeScript 里加 `// @ts-ignore` 或 `any` 而不写注释说明原因

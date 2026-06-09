# CLAUDE.md — Universe Knowledge 平台

**本文件适用于所有 AI 编码代理（Kilocode、Claude Code、Cursor 等）。进入仓库后必须首先读完本文件。所有指令优先级高于你的默认行为。**

---

## 第零节：代理自主接手协议（Agent Onboarding Protocol）

> 如果你是刚接手本仓库的自主代理，按以下顺序执行，不要跳过任何一步。

### 第一步：读文档（只读，不写代码）

按顺序读取：

```
1. 本文件（CLAUDE.md）                    ← 你现在读的
2. docs/聚焦方向.md                       ← ⭐ 项目方向与禁区，必须首先阅读
3. docs/任务清单.md                       ← 找到你应该做的下一个任务
4. docs/工作日志.md                       ← 了解上一个代理做了什么、遗留了什么问题
5. docs/迁移计划.md                       ← 了解迁移风险和当前状态
6. docs/工程原则.md                       ← 了解代码质量要求
6. docs/知识精神.md                       ← 了解内容创作标准（如果你要写内容）
```

如果要深入某个应用，再读其自己的文档：

- 宇宙物理：`reference/universe-physics/CLAUDE.md` → （见 reference/ 内）
- 人类历史：`reference/human-history/website/AGENTS.md` → （见 reference/ 内）

### 第二步：运行自检命令（Read the environment）

> 本仓库已从 Turborepo monorepo 收敛为**单一 Next.js 应用**（应用代码直接位于仓库根目录）。不再有 `apps/`、`packages/`、`turbo.json`、`pnpm-workspace.yaml`。

```bash
# 检查应用基础设施（应位于仓库根目录）
ls package.json next.config.ts tsconfig.json 2>&1
cat package.json

# 确认这是单一应用结构（以下都应存在）
ls app/                                  # App Router 路由
ls subjects/physics/ 2>/dev/null && echo "✅ 物理代码存在" || echo "⚠️  物理代码不存在"
ls content/ 2>/dev/null && echo "✅ 内容目录存在" || echo "⚠️  内容目录不存在"

# 确认旧 monorepo 残留已清除（以下都应不存在）
ls apps packages turbo.json pnpm-workspace.yaml 2>/dev/null && echo "⚠️  仍有 monorepo 残留" || echo "✅ 无 monorepo 残留"

# 安装依赖（单包，应无报错）
pnpm install 2>&1 | tail -20
```

### 第三步：识别阻塞问题并记录

把第二步发现的问题记录到 `docs/工作日志.md`（格式见第七节），然后：

- 如果存在 P0 阻塞问题：**先解决阻塞，再做其他事**。
- 如果没有阻塞：按 `docs/任务清单.md` 的优先级从上往下取第一个"待开始"任务。

### 第四步：执行任务（一次只做一件事）

每个任务完成后：

1. 运行对应的**验证命令**（见第八节）确认真的完成了
2. 更新 `docs/任务清单.md`（把任务状态改为"已完成"）
3. 在 `docs/工作日志.md` 写本次会话记录

**不要在一个会话里同时推进多个无关的大任务。一个任务完成并验证后再开始下一个。**

---

## 1. 平台定位

**Universe Knowledge** 是一个面向大众的**知识即服务平台（Knowledge as a Service）**，以浏览器为唯一交付方式，用可视化、沉浸式的方式探索多个知识领域：

| 领域         | 路径                | 核心体验                                       |
| ------------ | ------------------- | ---------------------------------------------- |
| **宇宙物理** | `/universe-physics` | WebGL 3D 场景，从可见宇宙下钻到地球            |
| **人类历史** | `/human-history`    | 时间线 + Atlas + 人物 + SVG 地图，从远古到当代 |
| **哲学思想** | `/philosophy`       | 哲学家、流派、思想的文字驱动知识图谱           |
| **生命科学** | `/life-science`     | 40 亿年生命演化，物种/灭绝/科学家              |
| **宇宙学**   | `/cosmology`        | 宇宙学专题                                     |
| **数学**     | `/mathematics`      | 数学专题                                       |
| **经济学**   | `/economics`        | 经济学家、理论、案例与模拟实验                 |
| **心理学**   | `/psychology`       | 心理学家、实验、现象与认知偏差                 |
| **知识图谱** | `/knowledge-graph`  | 跨领域交互式知识图谱可视化                     |
| **门户**     | `/`                 | 平台主入口，导航与发现                         |

**产品灵魂**：让任何人——无论是大学生、上班族还是好奇的老人——都能随时以美好的方式接触到人类最重要的知识。门槛低、深度足、视觉美。

---

## 2. 仓库结构

**本仓库是一个单一的 Next.js 15 应用，应用代码直接位于仓库根目录**（不再是 monorepo）。

```
universe-knowledge/                  ← 单一 Next.js 应用根目录
├── app/                             ← App Router 路由（9 个知识领域 + 全局页面）
│   ├── universe-physics/            ← 宇宙物理路由
│   ├── human-history/               ← 人类历史路由
│   ├── philosophy/                  ← 哲学思想路由
│   ├── life-science/                ← 生命科学路由
│   ├── cosmology/                   ← 宇宙学路由
│   ├── mathematics/                 ← 数学路由
│   ├── economics/                   ← 经济学路由
│   ├── psychology/                  ← 心理学路由
│   ├── knowledge-graph/             ← 知识图谱路由
│   ├── daily/                       ← 每日知识路由
│   └── api/                         ← API 路由（daily、og 图）
├── components/                      ← 共享组件
│   ├── ui/                          ← 通用基础组件（原 @universe/ui：Button、Badge、Panel…）
│   ├── search/ timeline/ …          ← 跨领域功能组件
│   └── <subject>/                   ← 各领域专属组件（economics、life-science…）
├── subjects/                        ← 各领域前端逻辑（9 个领域），导入路径 @/subjects/<x>
│   ├── physics/ history/ philosophy/ economics/ life-science/
│   ├── mathematics/ psychology/ cosmology/ knowledge-graph/
│   └── <subject>/{components,lib,scenes,shaders,store,hooks}  领域间互相隔离
├── lib/                             ← 共享工具 + 内容加载器
│   ├── graph-engine/                ← 力导向图引擎（原 @universe/graph-engine）
│   ├── cross-links/                 ← 跨领域链接（原 @universe/content；api.ts 为公开入口）
│   ├── content.ts                   ← TierContent 等内容类型 barrel（@/lib/content）
│   ├── content-paths.ts             ← 从 <cwd>/content 读取内容
│   └── …                            ← mdx、search-index、daily-*、urls 等
├── content/                         ← ⭐ 唯一内容目录，按领域分子目录
│   ├── universe-physics/ human-history/ philosophy/ …
│   ├── *.ts / *.js                  ← 类型化内容数据模块（经 @/content/... 导入）
│   └── *.mdx / *.md                 ← 散文内容（由 lib/mdx.ts 在运行时按路径 fs 读取）
├── public/                          ← 静态资源（含 textures/planets）
├── scripts/                         ← check-content.ts + physics/（bundle-check、lighthouse 等）
├── e2e/                             ← Playwright E2E 测试
├── types/                           ← 全局类型声明
├── docs/                            ← 平台级文档（代理读写区，见下；含 DEPLOY.md、MIGRATION.md）
├── reference/                       ← 旧位置参考代码（universe-physics/、human-history/）
│                                       禁止删除；已排除出 tsconfig，不参与构建
├── package.json                     ← 单一应用清单（无 turbo、无 workspace）
├── next.config.ts  tsconfig.json  vercel.json
├── vitest.config.ts  playwright.config.ts  eslint.config.mjs  postcss.config.mjs
└── CLAUDE.md                        ← 本文件
```

`docs/` 内容：`任务清单.md`（任务真相源）、`工作日志.md`（会话记录）、`工程原则.md`、`知识精神.md`、`项目总览.md`。

**当前架构**：单一 Next.js 应用，`pnpm dev` 在 `localhost:3000` 启动。内容统一存放在根 `content/`；类型化数据用 `@/content/...` 直接导入，MDX 散文由 `lib/content-paths.ts` + `lib/mdx.ts` 在运行时从 `<cwd>/content` 用 fs 读取。

**关键规则**：`reference/` 下是旧的参考代码（`universe-physics/`、`human-history/`），保留供查阅，**已在 `tsconfig.json` 的 `exclude` 中排除**，不参与构建与类型检查。

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

1. `docs/任务清单.md` — 当前阶段有序任务与状态
2. `docs/工作日志.md` — 最新一次代理的发现与遗留问题
3. `docs/迁移计划.md` — 迁移步骤与风险
4. `reference/universe-physics/CLAUDE.md` — universe-physics 应用级规范
5. `reference/human-history/website/AGENTS.md` — human-history 应用级规范
6. `docs/工程原则.md` — 平台工程铁律
7. 本文件（CLAUDE.md）

---

## 5. 技术栈速查

### 单一应用（仓库根目录）

- **框架**：Next.js 15，App Router（Turbopack dev）
- **3D**：React Three Fiber + drei + postprocessing + Three.js
- **状态**：Zustand
- **动画**：Framer Motion + GSAP
- **样式**：Tailwind CSS v4 + CSS Custom Properties
- **内容**：MDX + gray-matter + Zod schema 校验
- **语言**：TypeScript（strict mode + noUncheckedIndexedAccess）
- **包管理**：pnpm 10（单包，无 Turborepo / 无 workspace）
- **测试**：Vitest + Testing Library + Playwright
- **部署**：Vercel 就绪（根目录即应用，无 rootDirectory）

### 知识领域路由

| 领域     | 路由前缀            | src 目录               | 技术特点                 |
| -------- | ------------------- | ---------------------- | ------------------------ |
| 宇宙物理 | `/universe-physics` | `subjects/physics/`         | R3F 3D + Shaders + LOD   |
| 人类历史 | `/human-history`    | `subjects/history/`         | Canvas + GSAP + SVG 地图 |
| 哲学思想 | `/philosophy`       | `subjects/philosophy/`      | MDX + 交叉引用           |
| 生命科学 | `/life-science`     | `subjects/life-science/`    | Zod schema + 系统发育树  |
| 宇宙学   | `/cosmology`        | `subjects/cosmology/`       | 专题内容                 |
| 数学     | `/mathematics`      | `subjects/mathematics/`     | 专题内容                 |
| 经济学   | `/economics`        | `subjects/economics/`       | MDX + 模拟实验           |
| 心理学   | `/psychology`       | `subjects/psychology/`      | MDX + 认知偏差           |
| 知识图谱 | `/knowledge-graph`  | `subjects/knowledge-graph/` | Canvas 2D 力导向图       |

### 开发命令（全部在仓库根目录运行）

```bash
pnpm install          # 安装依赖（单包，只在根目录）
pnpm dev              # localhost:3000（Turbopack）
pnpm build            # 生产构建
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint . --max-warnings 0
pnpm test             # Vitest 单元测试
pnpm test:e2e         # Playwright E2E
pnpm check-content    # 内容质量校验（scripts/check-content.ts）
```

### 旧版参考文档（仅供查阅，不再适用当前结构）

- `reference/universe-physics/CLAUDE.md`、`reference/human-history/website/AGENTS.md` — 旧独立应用的规范，部分设计思路仍有参考价值。

---

## 6. 工程铁律（所有应用通用）

1. **聚焦原则**：每次修改收敛到一个明确问题。禁止夹带无关重构。
2. **无防御性废代码**：框架能保证的地方不用 try/catch；只在系统边界（用户输入、外部 API）校验。
3. **小文件**：单文件实质代码 > 300 行必须考虑拆分；函数 > 50 行必须拆分。
4. **命名胜于注释**：注释只写**为什么**，不写做什么。
5. **性能预算**：universe-physics JS gzip ≤ 200KB；human-history JS gzip ≤ 200KB。
6. **可访问性底线**：所有动画必须尊重 `prefers-reduced-motion`。
7. **内容准确性**：历史与科学内容必须在事实上经得起推敲，有来源。

详见 `docs/工程原则.md`。

---

## 7. 代理工作日志协议（强制）

**每次会话结束前，必须在 `docs/工作日志.md` 追加一条记录。** 这是让下一个代理能直接接手的关键。

格式：

```markdown
## [日期] 会话 #N

**执行人**：[代理名称，如 Kilocode / Claude Code]
**任务**：[做了什么]

### 完成内容

- [具体操作，带文件路径]

### 发现的问题

- [新发现的 bug 或阻塞，带具体错误信息]

### 下一步

- [下一个代理应该继续做的第一件事]

### 任务清单变更

- [T-XXX] 状态改为：已完成 / 进行中
```

---

## 8. 任务验证命令（自主代理必须执行）

每个任务完成后，运行对应的验证命令确认真的完成了，不要只看代码写完了就算。全部在仓库根目录运行。

### 类型检查 + 构建（最重要）

```bash
pnpm typecheck 2>&1 | tail -10                    # tsc --noEmit 必须通过（exit 0）
pnpm build 2>&1 | tail -20                        # 生产构建必须通过
```

### 内容完整性验证

```bash
ls content/                                       # 各知识领域子目录
ls app/                                           # 路由目录与 content 对应
pnpm check-content 2>&1 | tail -10                # 内容质量校验
```

### 渲染验证（改动页面/路由后）

```bash
pnpm dev                                          # 启动后探测：
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000        # 应为 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/philosophy
```

---

## 9. 自主发现问题协议

代理在工作期间应主动发现并记录以下类型的问题：

### 9.1 基础设施问题（每次接手都检查）

```bash
# 检查依赖安装状态
pnpm install 2>&1 | grep -i "error" | head -5

# 构建与类型检查
pnpm build 2>&1 | tail -5
pnpm typecheck 2>&1 | tail -5
```

### 9.2 内容完整性问题（知识内容相关任务时检查）

```bash
# 检查统一内容目录（按领域）
ls content/

# 检查路由与内容对应关系
ls app/
```

### 9.3 TypeScript 类型问题（新功能任务时检查）

```bash
pnpm typecheck 2>&1 | head -20
```

### 9.4 发现问题的处理流程

1. 把问题记录到 `docs/工作日志.md` 当次会话的"发现的问题"里
2. 如果问题是 P0 阻塞（影响后续所有任务），立刻修复再继续
3. 如果问题不是当前任务的阻塞，在 `docs/任务清单.md` 的"已知问题"表格里添加一行，继续主任务

---

## 10. 禁止事项（代理不得自行做的事）

- ❌ 删除 `reference/`（含 `universe-physics/`、`human-history/` 旧参考代码）——需用户明确授权
- ❌ force push 到任何分支
- ❌ 在没有验证的情况下声称任务已完成
- ❌ 一次会话同时开多个无关的大任务
- ❌ 修改 `human-history/docs/` 的历史内容而不说明理由（这是知识库，不是随意改的）
- ❌ 在 TypeScript apps 里加 `// @ts-ignore` 或 `any` 类型而不写注释说明原因

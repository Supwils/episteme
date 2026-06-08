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

- 宇宙物理：`universe-physics/CLAUDE.md` → `universe-physics/docs/develop/06-phase-1-plan.md`
- 人类历史：`human-history/website/AGENTS.md` → `human-history/docs/开发规范.md`

### 第二步：运行自检命令（Read the environment）

```bash
# 检查工作区基础设施
ls package.json turbo.json pnpm-workspace.yaml 2>&1
cat package.json

# 检查 apps 目录实际状态
ls apps/
ls packages/ 2>/dev/null || echo "packages/ 目录不存在"
ls packages/ui/package.json 2>/dev/null || echo "⚠️  @universe/ui 不存在 — 这会导致 pnpm install 报错"

# 检查统一应用结构
ls apps/portal/app/
ls apps/portal/src-physics/ 2>/dev/null && echo "✅ 物理代码存在" || echo "⚠️  物理代码不存在"
ls content/ 2>/dev/null && echo "✅ 内容目录存在" || echo "⚠️  内容目录不存在"

# 尝试 pnpm install，发现真实报错
pnpm install 2>&1 | tail -20
```

### 第三步：识别阻塞问题并记录

把第二步发现的问题记录到 `docs/工作日志.md`（格式见第七节），然后：

- 如果存在 P0 阻塞问题（如 `@universe/ui` 缺失）：**先解决阻塞，再做其他事**。
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

```
universe-knowledge/                  ← Turborepo 根
├── apps/
│   └── portal/                      ← 唯一活跃应用（Next.js 15，统一入口）
│       ├── app/                     ← App Router 路由（8 个知识领域 + 全局页面）
│       │   ├── universe-physics/    ← 宇宙物理路由
│       │   ├── human-history/       ← 人类历史路由
│       │   ├── philosophy/          ← 哲学思想路由
│       │   ├── life-science/        ← 生命科学路由
│       │   ├── cosmology/           ← 宇宙学路由
│       │   ├── mathematics/         ← 数学路由
│       │   ├── economics/           ← 经济学路由
│       │   ├── psychology/          ← 心理学路由
│       │   ├── knowledge-graph/     ← 知识图谱路由
│       │   └── daily/               ← 每日知识路由
│       ├── src-physics/             ← 物理前端代码
│       ├── src-history/             ← 历史前端代码
│       ├── src-philosophy/          ← 哲学前端代码
│       ├── src-life-science/        ← 生命科学前端代码
│       ├── src-cosmology/           ← 宇宙学前端代码
│       ├── src-mathematics/         ← 数学前端代码
│       ├── src-economics/           ← 经济学前端代码
│       ├── src-psychology/          ← 心理学前端代码
│       ├── src-knowledge-graph/     ← 知识图谱前端代码
│       └── content/                 ← 应用内知识内容（TS/JS/MDX）
├── content/                         ← 平台级知识内容目录
├── packages/
│   ├── ui/                          ← @universe/ui（共享组件库，空壳）
│   └── content/                     ← @universe/content（跨应用链接）
├── docs/                            ← 平台级文档（代理读写区）
│   ├── 任务清单.md                  ← ⭐ 任务状态真相源，每次会话后必须更新
│   ├── 工作日志.md                  ← ⭐ 代理会话记录，每次会话后必须追加
│   ├── 迁移计划.md                  ← 迁移完成记录
│   ├── 工程原则.md                  ← 代码质量铁律
│   ├── 知识精神.md                  ← 内容创作标准
│   └── 项目总览.md                  ← 平台全景介绍
├── .archive/                        ← 旧应用归档（apps-universe-physics 等）
├── universe-physics/                ← 旧位置源码（参考用，禁止删除）
├── human-history/                   ← 旧位置源码 + 知识库（参考用，禁止删除）
├── CLAUDE.md                        ← 本文件
├── MIGRATION.md                     ← 英文草稿（归档），详见 docs/迁移计划.md
├── package.json                     ← 工作区根
├── turbo.json                       ← Turbo 流水线
└── pnpm-workspace.yaml              ← pnpm 工作区声明
```

**当前架构**：所有知识领域已合并为 `apps/portal/` 单一 Next.js 应用，通过 `localhost:3000` 统一访问。内容与代码解耦，存放在 `content/` 和 `apps/portal/content/`。

**关键规则**：`universe-physics/`（旧）和 `human-history/website/`（旧）是参考代码，迁移已完成但保留供查阅。

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
4. `universe-physics/CLAUDE.md` — universe-physics 应用级规范
5. `human-history/website/AGENTS.md` — human-history 应用级规范
6. `docs/工程原则.md` — 平台工程铁律
7. 本文件（CLAUDE.md）

---

## 5. 技术栈速查

### 统一应用（apps/portal/）

- **框架**：Next.js 15，App Router
- **3D**：React Three Fiber + drei + postprocessing + Three.js
- **状态**：Zustand
- **动画**：Framer Motion + GSAP
- **样式**：Tailwind CSS v4 + CSS Custom Properties
- **内容**：MDX + gray-matter + Zod schema 校验
- **语言**：TypeScript（strict mode + noUncheckedIndexedAccess）
- **包管理**：pnpm 10 + Turborepo
- **测试**：Vitest + Testing Library + Playwright
- **部署**：Vercel 就绪

### 知识领域路由

| 领域     | 路由前缀            | src 目录               | 技术特点                 |
| -------- | ------------------- | ---------------------- | ------------------------ |
| 宇宙物理 | `/universe-physics` | `src-physics/`         | R3F 3D + Shaders + LOD   |
| 人类历史 | `/human-history`    | `src-history/`         | Canvas + GSAP + SVG 地图 |
| 哲学思想 | `/philosophy`       | `src-philosophy/`      | MDX + 交叉引用           |
| 生命科学 | `/life-science`     | `src-life-science/`    | Zod schema + 系统发育树  |
| 宇宙学   | `/cosmology`        | `src-cosmology/`       | 专题内容                 |
| 数学     | `/mathematics`      | `src-mathematics/`     | 专题内容                 |
| 经济学   | `/economics`        | `src-economics/`       | MDX + 模拟实验           |
| 心理学   | `/psychology`       | `src-psychology/`      | MDX + 认知偏差           |
| 知识图谱 | `/knowledge-graph`  | `src-knowledge-graph/` | Canvas 2D 力导向图       |

### 应用级文档

- 物理板块：`universe-physics/CLAUDE.md`（旧版参考，部分规范仍适用）
- 历史板块：`human-history/website/AGENTS.md`（旧版参考，Vite 版规范）
- Portal：`apps/portal/CLAUDE.md`

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

每个任务完成后，运行对应的验证命令确认真的完成了，不要只看代码写完了就算。

### T-001：@universe/ui 创建完成验证

```bash
ls packages/ui/package.json                      # 文件必须存在
grep '"name"' packages/ui/package.json            # 必须包含 @universe/ui
pnpm install 2>&1 | grep -i "error" | head -5     # 不得有 @universe/ui 相关报错
```

### T-002：pnpm-workspace.yaml 验证

```bash
cat pnpm-workspace.yaml                           # 必须包含 apps/* 和 packages/*
```

### 统一应用验证

```bash
pnpm --filter @universe/portal build 2>&1 | tail -10  # 构建必须通过
pnpm --filter @universe/portal typecheck 2>&1 | tail -5  # 类型检查必须通过
```

### 内容完整性验证

```bash
ls content/                                       # 6 个知识领域目录
ls apps/portal/app/                               # 路由目录与 content 对应
```

### 通用：全工作区构建验证

```bash
pnpm build 2>&1 | tail -20                        # 所有 apps 构建通过
```

---

## 9. 自主发现问题协议

代理在工作期间应主动发现并记录以下类型的问题：

### 9.1 基础设施问题（每次接手都检查）

```bash
# 检查工作区 install 状态
pnpm install --dry-run 2>&1 | grep -i "error"

# 统一应用构建与类型检查
pnpm --filter @universe/portal build 2>&1 | tail -5
pnpm --filter @universe/portal typecheck 2>&1 | tail -5
```

### 9.2 内容完整性问题（知识内容相关任务时检查）

```bash
# 检查各领域内容目录
ls content/
ls apps/portal/content/

# 检查路由与内容对应关系
ls apps/portal/app/
```

### 9.3 TypeScript 类型问题（新功能任务时检查）

```bash
pnpm --filter @universe/portal typecheck 2>&1 | head -20
```

### 9.4 发现问题的处理流程

1. 把问题记录到 `docs/工作日志.md` 当次会话的"发现的问题"里
2. 如果问题是 P0 阻塞（影响后续所有任务），立刻修复再继续
3. 如果问题不是当前任务的阻塞，在 `docs/任务清单.md` 的"已知问题"表格里添加一行，继续主任务

---

## 10. 禁止事项（代理不得自行做的事）

- ❌ 删除 `universe-physics/`（旧位置）或 `human-history/website/`（旧 Vite 版本）——需用户明确授权
- ❌ force push 到任何分支
- ❌ 在没有验证的情况下声称任务已完成
- ❌ 一次会话同时开多个无关的大任务
- ❌ 修改 `human-history/docs/` 的历史内容而不说明理由（这是知识库，不是随意改的）
- ❌ 在 TypeScript apps 里加 `// @ts-ignore` 或 `any` 类型而不写注释说明原因

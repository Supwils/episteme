# Universe Knowledge — 人类知识图谱平台

> 让任何人随时以美好的方式接触到人类最重要的知识。

## 知识领域

| 领域     | 路径                | 技术栈                     | 内容                                 |
| -------- | ------------------- | -------------------------- | ------------------------------------ |
| 宇宙物理 | `/universe-physics` | R3F 3D + Shaders + LOD     | 8 宇宙层 + 9 物理层，WebGL 3D 可视化 |
| 人类历史 | `/human-history`    | Canvas + GSAP + SVG        | 219 事件、235 人物、104 知识库       |
| 哲学思想 | `/philosophy`       | MDX + 交叉引用             | 68 哲学家、38 流派、229 篇 MDX       |
| 生命科学 | `/life-science`     | Zod schema + Framer Motion | 84 物种、50 事件、23 科学家          |
| 宇宙学   | `/cosmology`        | 专题内容                   | 宇宙学专题                           |
| 数学     | `/mathematics`      | 专题内容                   | 数学专题                             |
| 知识图谱 | `/knowledge-graph`  | Canvas 2D 力导向图         | 跨领域交互式图谱                     |

**总计**：1650+ 知识单元，500+ 静态页面。

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式（统一端口）
pnpm dev

# 构建全部
pnpm build

# 类型检查
pnpm typecheck

# 测试
pnpm test
```

访问 http://localhost:3000 — 所有知识领域通过路径前缀统一访问。

## 架构

```
universe-knowledge/
├── apps/portal/               ← 唯一活跃应用（Next.js 15）
│   ├── app/                   ← App Router 路由
│   ├── src-physics/           ← 物理前端代码
│   ├── src-history/           ← 历史前端代码
│   ├── src-philosophy/        ← 哲学前端代码
│   ├── src-life-science/      ← 生命科学前端代码
│   ├── src-cosmology/         ← 宇宙学前端代码
│   ├── src-mathematics/       ← 数学前端代码
│   └── src-knowledge-graph/   ← 知识图谱前端代码
├── content/                   ← 知识内容（与代码解耦）
├── packages/                  ← 共享包（ui、content）
├── docs/                      ← 平台文档（代理读写区）
└── .archive/                  ← 旧应用归档
```

## 技术栈

- **框架**: Next.js 15 (App Router)
- **包管理**: pnpm 10 + Turborepo
- **样式**: Tailwind CSS v4 + CSS Custom Properties
- **3D**: React Three Fiber + Three.js
- **动画**: Framer Motion + GSAP
- **语言**: TypeScript (strict mode)
- **内容**: MDX + gray-matter + Zod
- **测试**: Vitest + Playwright
- **部署**: Vercel 就绪

## 文档

- [CLAUDE.md](CLAUDE.md) — AI 代理必读规范
- [任务清单](docs/任务清单.md) — 当前任务状态
- [工作日志](docs/工作日志.md) — 代理会话记录
- [工程原则](docs/工程原则.md) — 代码质量标准
- [知识精神](docs/知识精神.md) — 内容创作标准
- [项目总览](docs/项目总览.md) — 平台全景介绍

## 许可

私有项目，未开源。

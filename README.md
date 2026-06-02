# Universe Knowledge — 人类知识图谱平台

> 让任何人随时以美好的方式接触到人类最重要的知识。

## 四大应用

| 应用 | 路径 | 技术栈 | 内容 |
|------|------|--------|------|
| 宇宙物理 | `/universe-physics` | Next.js 16 + React Three Fiber | 8 宇宙层 + 9 物理层，WebGL 3D 可视化 |
| 人类历史 | `/human-history` | Next.js 15 + GSAP | 87+ 事件、202 人物、80+ 深度讲稿 |
| 哲学思想 | `/philosophy` | Next.js 15 + MDX | 45 哲学家、32 流派、21 主义、16 思想实验 |
| 门户 | `/portal` | Next.js 15 + Tailwind | 平台主入口与导航 |

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式（所有应用）
pnpm dev

# 构建全部
pnpm build

# 单个应用
pnpm --filter @universe/universe-physics dev
pnpm --filter @universe/human-history dev
pnpm --filter @universe/philosophy dev
```

访问 http://localhost:3000 通过门户统一入口访问所有应用。

## 架构

```
universe-knowledge/
├── apps/
│   ├── portal/              ← 主门户 (port 3000)
│   ├── universe-physics/    ← 宇宙物理 (port 3033)
│   ├── human-history/       ← 人类历史 (port 3001)
│   └── philosophy/          ← 哲学思想 (port 3002)
├── packages/
│   ├── ui/                  ← 共享 UI 组件
│   └── content/             ← 跨应用内容链接
└── docs/                    ← 平台文档
```

## 技术栈

- **框架**: Next.js 15/16 (App Router)
- **包管理**: pnpm + Turborepo
- **样式**: Tailwind CSS v4 + CSS Custom Properties
- **3D**: React Three Fiber + Three.js
- **动画**: Framer Motion + GSAP
- **语言**: TypeScript (strict mode)
- **内容**: MDX + gray-matter

## 文档

- [任务清单](docs/任务清单.md) — 当前任务状态
- [工作日志](docs/工作日志.md) — 代理会话记录
- [工程原则](docs/工程原则.md) — 代码质量标准
- [迁移计划](docs/迁移计划.md) — 迁移进度

## 许可

私有项目，未开源。

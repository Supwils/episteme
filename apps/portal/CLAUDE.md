# CLAUDE.md — Portal（统一应用）

## 项目定位

Portal 是 Universe Knowledge 平台的**唯一活跃应用**，包含所有知识领域的前端代码和路由。

**职责**：

- 平台首页展示所有知识领域
- 统一入口，通过路径前缀访问各领域
- 全局搜索（Ctrl+K）、跨领域链接、移动端导航
- Web Vitals 监控、SEO 元数据、安全头

## 技术栈

| 层级 | 技术                                           |
| ---- | ---------------------------------------------- |
| 框架 | Next.js 15 (App Router)                        |
| 样式 | Tailwind CSS v4 + CSS Custom Properties        |
| 3D   | React Three Fiber + Three.js                   |
| 动画 | Framer Motion + GSAP                           |
| 内容 | MDX + gray-matter + Zod                        |
| 语言 | TypeScript (strict + noUncheckedIndexedAccess) |
| 测试 | Vitest + Playwright                            |

## 目录结构

```
apps/portal/
├── app/                          # App Router 路由
│   ├── layout.tsx                # 根布局（导航、MobileNav、安全头）
│   ├── page.tsx                  # 首页（Server Component）
│   ├── universe-physics/         # 宇宙物理路由
│   ├── human-history/            # 人类历史路由
│   ├── philosophy/               # 哲学思想路由
│   ├── life-science/             # 生命科学路由
│   ├── cosmology/                # 宇宙学路由
│   ├── mathematics/              # 数学路由
│   ├── knowledge-graph/          # 知识图谱路由
│   └── daily/                    # 每日知识路由
├── src-physics/                  # 物理前端代码
├── src-history/                  # 历史前端代码
├── src-philosophy/               # 哲学前端代码
├── src-life-science/             # 生命科学前端代码
├── src-cosmology/                # 宇宙学前端代码
├── src-mathematics/              # 数学前端代码
├── src-knowledge-graph/          # 知识图谱前端代码
├── content/                      # 应用内知识内容
├── components/                   # 共享组件（GlobalSearch、MobileNav 等）
├── lib/                          # 工具库（urls、data、animations 等）
├── e2e/                          # Playwright E2E 测试
├── next.config.ts                # rewrites + 安全头 + MDX
├── tsconfig.json                 # TypeScript 配置
├── vitest.config.ts              # Vitest 配置
└── playwright.config.ts          # Playwright 配置
```

## 开发命令

```bash
pnpm dev           # port 3000（Turbopack）
pnpm build         # 生产构建
pnpm typecheck     # TypeScript 类型检查
pnpm lint          # ESLint（--max-warnings 0）
pnpm test          # Vitest 单元测试
pnpm test:e2e      # Playwright E2E 测试
```

## 架构约束

- 各领域的 src-\* 目录互相隔离，不直接引用
- 共享组件通过 `@universe/ui` 包（目前为空壳）
- 知识内容存放在 `content/` 和 `apps/portal/content/`，通过 `@/content/...` 导入
- 安全头（CSP/COOP/CORP）在 `next.config.ts` 中统一配置
- CSS 隔离通过板块特定的 root class（`.physics-root`、`.philosophy-root` 等）

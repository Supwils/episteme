# 部署指南

## Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. Framework Preset: Next.js
3. Root Directory: 仓库根目录
4. Build Command: `pnpm build`
5. Output Directory: `.next`
6. Install Command: `pnpm install`

## 环境变量

无需额外环境变量。所有内容内置于代码中。

## 当前部署结构

当前仓库已经不是 monorepo。Next.js 应用、`package.json`、`next.config.ts`、`vercel.json` 都在仓库根目录。GitHub Actions workflow 已按项目当前需求移除，部署以 Vercel 项目配置和本地 `pnpm` 质量命令为准。

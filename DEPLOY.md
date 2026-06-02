# 部署指南

## Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. Framework Preset: Next.js
3. Root Directory: `apps/portal`
4. Build Command: `cd ../.. && pnpm --filter @universe/portal build`
5. Output Directory: `.next`
6. Install Command: `pnpm install`

## 环境变量

无需额外环境变量。所有内容内置于代码中。

## Monorepo 备选方案

根目录 `vercel.json` 已配置为从 monorepo 根部署 portal 应用。如果从根目录部署，Vercel 会自动使用根 `vercel.json` 的配置。

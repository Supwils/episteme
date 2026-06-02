# CLAUDE.md — Portal

## 项目定位

Portal 是 Universe Knowledge 平台的主入口和统一导航门户。

**职责**：
- 平台首页展示三大知识领域
- 通过 Next.js rewrites 代理到各子应用
- 跨应用统一导航

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 样式 | Tailwind CSS v4 |
| 语言 | TypeScript (strict) |

## 目录结构

```
apps/portal/
├── app/
│   ├── layout.tsx         # 根布局（导航、MobileNav）
│   ├── page.tsx           # 首页（Server Component）
│   ├── globals.css        # 全局样式
│   ├── loading.tsx        # 加载状态
│   └── error.tsx          # 错误边界
├── components/
│   ├── DomainCard.tsx     # 领域卡片（Client）
│   ├── HeroSection.tsx    # Hero 区域（Client）
│   ├── FeatureGrid.tsx    # 特性网格（RSC）
│   ├── MobileNav.tsx      # 移动端导航（Client）
│   └── CornerMark.tsx     # 角标装饰（RSC）
├── lib/
│   ├── urls.ts            # 应用 URL 配置
│   └── data.tsx           # 页面数据常量
└── next.config.ts         # rewrites + 安全头
```

## 开发命令

```bash
pnpm dev           # port 3000
pnpm build
pnpm typecheck
```

## 注意事项

- Portal 作为根入口不设置 basePath
- 子应用链接使用 `<a>` 标签（非 `<Link>`）以正确跨 basePath
- 安全头在 next.config.ts 中配置

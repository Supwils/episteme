# universe-physics

> 一座可在浏览器里跨尺度漫游的「宇宙 + 物理」知识图谱站。
> 从可见宇宙的整体结构出发，一路下钻到地球；同时把人类已知的物理学按板块铺成一张可互文的网。

```
T0  Observable Universe   8.8 × 10²⁶ m
  ↓
T1  Cosmic Web            ~ 10²⁶ m   纤维 / 节点 / 空洞
  ↓
T2  Laniakea              160 Mpc    我们所在的引力盆地
  ↓
T3  Local Group           3 Mpc      MW + M31 + 矮成员
  ↓
T4  Milky Way             30 kpc     棒旋星系 + Sgr A*
  ↓
T5  Stellar Neighborhood  50 ly      近邻恒星 + 系外行星
  ↓
T6  Solar System          50 AU      8 行星真贴图 + 矮行星
  ↓
T7  Earth                 1 R⊕       Blue/Black Marble + 大气 + 月球
```

并行的物理板块 (`/physics/*`)：P0 经典力学 / P1 热力学 / P2 电磁 / P3 相对论 / P4 量子力学 / P5 原子分子 / P6 核-粒子 / P7 标准模型 / P8 前沿。

## 特性

- **持久 Canvas + 跨档过场** —— Tier 之间 zoom / dissolve / tunnel 三种动画，
  相机在共享 R3F Canvas 里连续 dolly，不卸载场景。
- **真实科学数据** —— 距离 / 质量 / 红移 / 结合能曲线 / α_s(Q) RGE 解
  / IMR GW chirp 全部来自 paper / agency 原始数据，不是 demo 数字。
- **行星真贴图** —— 8 行星 + 月球 + 土星环用 Solar System Scope (CC BY 4.0)
  的 2K 纹理；地球用自定义 day/night/clouds shader 沿太阳方向真混合，加
  Rayleigh-style limb glow。
- **手绘双轨** —— 同一份数据在 `/universe/handwritten/*` 与 `/physics/*` 下
  渲染为稿纸感 SVG，把"信息可读性"与"3D 震撼感"两条线分开。
- **百科级文字内容** —— 17 个 tier 共 3800+ 行 TypeScript content，每个
  tier 含 ≥ 10 dataCards / ≥ 5 narrative sections / ≥ 5 sources，
  Zod schema 强校验。
- **A11y 完整** —— skip-to-content / focus trap / aria-live / reduced-motion
  / WCAG AA 对比度全部覆盖。
- **CSP + 安全头** —— Content-Security-Policy、Permissions-Policy、X-Frame
  -Options、COOP/CORP 均在 `next.config.ts` 配置。

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:3033
```

构建与上线前自查：

```bash
pnpm build
pnpm check        # typecheck + lint + format:check + lint:content + test
pnpm bundle-check # 真"shared initial JS"预算检查
```

## 常用脚本

```bash
pnpm dev                  # 开发服务器 (port 3033)
pnpm build                # 生产构建
pnpm typecheck            # tsc --noEmit
pnpm lint                 # ESLint
pnpm format               # Prettier --write
pnpm format:check         # Prettier --check
pnpm lint:content         # Zod schema 校验全部 tier content
pnpm test                 # Vitest 单测 (67 cases)
pnpm bundle-check         # build + 预算检查
pnpm bundle-check --skip-build  # 复用现有 .next/，CI 模式
pnpm audit:lighthouse     # 本地起 server + headless Lighthouse
pnpm check                # CI 前自查全套
```

## 项目结构

```
src/
  app/                 # Next.js App Router
    universe/          # T0-T7 路由 + _shell (UniverseShell + R3F Canvas)
    physics/           # P0-P8 路由 + _shell (PhysicsShell + SVG)
    page.tsx           # splash 首屏
  scenes/              # 8 个 3D 场景 (Tier0Scene-Tier7Scene)
  scenes-handwritten/  # 17 个手绘 SVG 场景 (universe + physics)
  components/
    three/             # Planet / StarPoints / SaturnRings 等 R3F primitive
    post/              # PostFX EffectComposer
    volumetric/        # VolumeBillboard raymarch
    hud/               # TierRail / TopBar / SubjectCard / SkipLink ...
    knowledge/         # KnowledgePanel / DataCard / NarrativeSection
  shaders/             # 自定义 GLSL (star points / volume / earth)
  content/
    cosmos/            # T0-T7 内容 (TS module, Zod 校验)
    physics/           # P0-P8 内容
  lib/                 # tier / section / coords / planetTextures / quality / lod / perf-monitor
  store/               # Zustand: useSectionStore / useUiStore / useHandwrittenStore
  camera/              # CameraRig + 飞行/dissolve/tunnel 过场
  hooks/               # useSyncTier / useTierTransition / ...
public/textures/planets/  # 12 个 2K JPG/PNG 行星纹理 (CC BY 4.0)
scripts/                  # bundle-check / audit-lighthouse / prep-textures / lint-content
docs/                     # 设计 / 实现 / WORKLOG (中文)
```

## 技术栈

| 类别        | 技术                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router) · React 19 · TypeScript 5.7                                 |
| Styling     | Tailwind CSS v4 (PostCSS) · CSS Variables tokens                                    |
| 3D          | three.js · @react-three/fiber · @react-three/drei · postprocessing (EffectComposer) |
| Animation   | GSAP (camera flyTo) · Framer Motion (HUD)                                           |
| State       | Zustand (section / ui / handwritten 三 store)                                       |
| Validation  | Zod (content schema)                                                                |
| Test        | Vitest · @testing-library · happy-dom                                               |
| Lint/Format | ESLint 9 · typescript-eslint 8 · Prettier 3 · prettier-plugin-tailwindcss           |
| Bundler     | Turbopack (Next.js 内置)                                                            |
| Pkg Mgr     | pnpm 10                                                                             |

完整版本与决策见 [`docs/develop/01-tech-stack.md`](./docs/develop/01-tech-stack.md)。

## 性能预算

- Shared initial JS (root + polyfill) < 220 KB gzip
- 单 chunk < 260 KB gzip（容纳 Three.js）
- 各 Tier 稳态 60 fps (Desktop) / 30 fps (Mobile)
- 自动降级：连续 60 帧 < 45 fps → quality tier "low"（关 Bloom/Grain/CA）

详见 [`docs/develop/05-performance-budget.md`](./docs/develop/05-performance-budget.md)。

## 部署

- `next.config.ts` 已经包含完整 CSP + cache headers，可直接 Vercel 一键部署。
- 行星纹理放在 `public/textures/planets/`，已配置 `Cache-Control: immutable`。
- 路由全部 `○ Static`，无 server component runtime 依赖，可直接 static export。

## 资产 credits

12 个行星 / 月球 / 土星环纹理来自 [Solar System Scope](https://www.solarsystemscope.com/textures/)，
许可 **CC BY 4.0**。完整列表见
[`public/textures/planets/CREDITS.md`](./public/textures/planets/CREDITS.md)。

字体：

- **Fraunces** (display) — Google Fonts, OFL
- **JetBrains Mono** (mono) — Google Fonts, OFL

代码：MIT。

## 文档入口

按顺序读最省脑：

1. [`CLAUDE.md`](./CLAUDE.md) — AI 代理协作守则（人也建议读）
2. [`docs/design/01-vision-and-scope.md`](./docs/design/01-vision-and-scope.md) — 产品定位
3. [`docs/design/04-universe-experience.md`](./docs/design/04-universe-experience.md) — 核心 universe 体验
4. [`docs/design/09-physics-vision.md`](./docs/design/09-physics-vision.md) — physics 板块
5. [`docs/develop/01-tech-stack.md`](./docs/develop/01-tech-stack.md) — 技术决策
6. [`docs/develop/02-architecture-overview.md`](./docs/develop/02-architecture-overview.md) — 代码组织
7. [`docs/develop/06-phase-1-plan.md`](./docs/develop/06-phase-1-plan.md) — 任务清单（真相源）
8. [`docs/WORKLOG.md`](./docs/WORKLOG.md) — 最近会话接力点

## License

代码：MIT。
内容文字（`src/content/**`）：CC BY 4.0。
行星纹理：CC BY 4.0（Solar System Scope）。

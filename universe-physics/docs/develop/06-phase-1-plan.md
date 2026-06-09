# 06 — Phase 1 实施计划 (真相源)

> 文档冲突时这份最大。任何代理接手前先读它。

## 阶段定义

**Phase 1 = Universe Vertical Slice**：从 T0 (Observable Universe) 到 T7 (Earth) 跑通一条完整尺度链，每一层有可视化 + 知识面板。

完成判定 (Definition of Done)：

- 用户能从 `/universe/observable` 一路下钻到 `/universe/solar-system/earth`，每层都有 3D 场景、HUD、知识面板。
- 三种过场 (zoom / dissolve / tunnel) 都在用，且 prefers-reduced-motion 有降级。
- Desktop 中端机型上稳态 60 fps，Mobile 高端机 30 fps。
- 所有内容文件通过 `lint:content`。
- e2e 测试覆盖：进入 → 一路下钻 → 回退 → 切换面板，全 happy path 不挂。

## 任务清单 (有序)

> 标 ✓ 的为已完成。每次会话后更新本表 + WORKLOG。

### Stage 0 — Foundation

- [✓] 0.1 创建 `docs/` 骨架与首批文档
- [✓] 0.2 创建 `CLAUDE.md`
- [✓] 0.3 初始化 Next.js 16 + TS + Tailwind v4 + ESLint + Prettier 脚手架 (pnpm)
- [✓] 0.4 接入 React Three Fiber + drei + postprocessing + GSAP + Framer Motion + Zustand + Zod
- [✓] 0.5 设置 CI (typecheck / lint / format / test / build) — `.github/workflows/ci.yml`
- [✓] 0.6 设计 tokens (CSS variables) + 基础 UI 组件 (Button, Panel, Sheet, ScaleBar)

### Stage 1 — Tier infrastructure

- [✓] 1.1 实现 `lib/tier.ts` (TierId, TierMeta, 舒适距离表, `transitionKind`)
- [✓] 1.2 实现 `lib/coords.ts` 与单位格式化 (`lib/format.ts`)
- [✓] 1.3 搭 `<Canvas>` 持久化 layout (`/universe/layout.tsx` + `_shell/UniverseShell.tsx`)
- [✓] 1.4 实现 `CameraRig` + `flyTo` / `jumpTo` / `setUserControl` API (`cameraRegistry` 模块级注册表)
- [✓] 1.5 实现 `useTierTransition` 与三种过场 (dissolve 真交叉淡入 + 相机 dolly；tunnel DOM overlay + 相机环绕；zoom 真飞行；结束统一 `settleForTier` 落到舒适距离)
- [✓] 1.6 实现 `useUniverseStore` / `useUiStore`

### Stage 2 — Scenes (从大到小)

- [✓] 2.1 Tier 0 — Observable Universe (三层星壳 + trig-noise 簇团 + 蓝色等位环 + 慢自转)
- [✓] 2.2 Tier 1 — Cosmic Web (22 节点 + 最近邻边 + 沿边气体散点 + 背景空洞星点)
- [✓] 2.3 Tier 2 — Laniakea Supercluster (90 条 Catmull-Rom 流线收敛到 Great Attractor + 5 个已知锚点 + 背景星系散点)
- [✓] 2.4 Tier 3 — Local Group (MW + M31 + M33 真实银坐标 + LMC/SMC + 13 个矮星系 + 背景星系散点)
- [✓] 2.5 Tier 4 — Milky Way (4 条 log-spiral 旋臂 + 棒 + 凸核 + 球状星团晕 + 太阳标记 + Sgr A\* 标记)
- [✓] 2.6 Tier 5 — Stellar Neighborhood (25 颗硬编码 50 ly 内著名恒星 + 3000 procedural 背景场 + 光谱型色 + mag→size + Sun 2 层 bloom + 6 markers)
- [✓] 2.7 Tier 6 — Solar System (8 行星真 3D 球 + 4 矮行星 + 主带 + Kuiper 带 + 太阳 4 层 bloom + log 径向 warp + 6 markers)
- [✓] 2.8 Tier 7 — Earth (vertex-color SphereGeometry + FBM 海陆 + 冰盖 + 2 层 BackSide 大气 + Moon + geosync ring + 4 markers)

每个 Tier 完成判定：场景渲染 OK + 知识面板内容 + 进出过场可用。

### Stage 3 — HUD & 知识面板

- [✓] 3.1 顶部 HUD (fiducial logo + 元数据栏: frame / unit / tier / live transit 状态)
- [✓] 3.2 左下 Subject Card (Fraunces 学名 + 中文名 + tagline + whisper + 3 个 data chips + open-atlas 入口)
- [✓] 3.3 知识面板 (sticky header + Hero + 数据卡网格 + 编号叙事 + sources 列表 + footer + stagger reveal)
- [✓] 3.4 右侧纵向 Tier Rail (8 档可点击 + hover 标签滑入 + 当前态强调)
- [✓] 3.5 入站动画 (`/` splash) — 5–7 秒程序化入站：中心点脉冲 + 170 颗 DOM 星点放射扩散 + BrandMark / 标题 / 副文 / CTA stagger 进入 + 6.4s 后自动跳到 `/universe/observable`；右下 Skip 按钮 1.1s 后出现；`prefers-reduced-motion` 直接降到静态终态

### Stage 4 — 内容

- [✓] 4.1 写 `content/cosmos/*` 数据 — T0–T7 全部写完 (dataCards + narrative + sources + markers)
- [✓] 4.2 内容载体 — 用 TS 模块 (`src/content/cosmos/T*.ts` + `lib/content.ts` schema) 替代 MDX，Phase 1 不引 MDX 构建链
- [✓] 4.3 `scripts/lint-content.mjs` + Zod schemas (`src/lib/content-schema.ts` 双重把关：vitest 验 T0-T7 完整数据，schema unit 单测覆盖 slug / hex / URL / position 边界 / 重复 marker id 等规则；CI 与 `pnpm check` 都跑 `lint:content`)
- [ ] 4.4 资产 credits 文档

### Stage 5 — 响应式与可访问性

- [ ] 5.1 Tablet 布局
- [ ] 5.2 Mobile 章节模式
- [ ] 5.3 `prefers-reduced-motion` 全覆盖
- [ ] 5.4 键盘导航
- [ ] 5.5 对比度审计

### Stage 6 — 性能

- [ ] 6.1 `scripts/bundle-check.mjs`
- [ ] 6.2 Lighthouse CI 入 CI
- [ ] 6.3 自动降级策略上线
- [ ] 6.4 各 Tier 性能预算实测

### Stage 7 — 测试

- [ ] 7.1 `lib/*` 单测
- [ ] 7.2 UI 基础组件测试
- [ ] 7.3 e2e: 完整尺度链 happy path

### Stage 8 — 上线准备

- [ ] 8.1 Vercel 部署 + 自定义域 (可选)
- [ ] 8.2 CSP / 安全 header
- [ ] 8.3 README + 演示视频
- [ ] 8.4 灰度 / 内部体验邀请

## 风险与未决

- **跨 Tier 资源预热** 实现细节没敲死。Stage 1.5 实施时要做技术验证。
- **真实星表数据** (HYG / NED) 数据量大，可能需要 server-side 预处理脚本。Stage 2.6 之前要决定。
- **移动端性能** 是最大不确定性，Stage 2.5 之后做一次实测。

---

## Phase 1.5 — 双轨视觉（Session 12 起）

Phase 1 主结构已完成，**视觉债**与**第二条表达线**同时开工：

### 1.5.A — 3D 视觉升级（文档化）

视觉方向：[`docs/design/07-3d-visual-upgrade.md`](../design/07-3d-visual-upgrade.md)
实施清单：[`./07-3d-implementation-plan.md`](./07-3d-implementation-plan.md)

- [ ] P0-A 启用 EffectComposer 后处理（Bloom / Vignette / ACES tone mapping / SMAA）
- [ ] P0-B 自定义粒子 Shader（替换所有 `pointsMaterial`）
- [ ] P0-C SceneMarkers 四变体（HaloDisk / Diamond / StarPoint / PinNeedle）
- [ ] P1-A 体积光晕（T0 CMB / T4 银心 / T6 太阳）
- [ ] P1-B 真实贴图（T6 行星 + T7 地球 + 月球）+ Rayleigh 大气
- [ ] P2 GPU instancing / LOD / 自然现象彩蛋

### 1.5.B — 手绘宇宙板块（实施）

视觉方向：[`docs/design/08-handwritten-universe.md`](../design/08-handwritten-universe.md)
实施清单：[`./08-handwritten-implementation.md`](./08-handwritten-implementation.md)

- [ ] PR2 骨架与共享 primitive（HandwrittenDefs / WobbleCircle / InkPath / Marker / Label / Cartouche / Shell / ThemeToggle）
- [ ] PR3 场景批次 1（T0 / T1 / T6 / T7 手绘 SVG）
- [ ] PR4 场景批次 2（T2 / T3 / T4 / T5 手绘 SVG）
- [ ] PR5 收尾（reduced-motion / 移动适配 / Playwright e2e）

### 关键纪律

- 1.5.A 与 1.5.B 完全解耦：3D 升级不动手绘版，手绘版不动 3D 场景代码
- 共用：`content/cosmos/T*.ts`、`lib/tier.ts`、`store/useUniverseStore.ts`、`components/hud/*`、`components/knowledge/*`
- 1.5.A 当前阶段**只产出文档**（不动 3D 代码）；1.5.B 全 8 档落地

---

## Phase 2 — Physics 板块（Session 15 起）

CLAUDE.md 第一条就定义的第二顶层板块正式启动。

视觉与产品方向：[`docs/design/09-physics-vision.md`](../design/09-physics-vision.md)
实施指南：[`./09-physics-implementation.md`](./09-physics-implementation.md)
Section 抽象重构（先决条件）：[`docs/design/10-section-architecture.md`](../design/10-section-architecture.md) + [`./10-section-refactor.md`](./10-section-refactor.md)

### 2.A — Section 抽象重构（PR1）

- [ ] `lib/section.ts` + `lib/physics-tier.ts` 新建
- [ ] `lib/tier.ts` 通用化（保留 alias，零破坏现有 import）
- [ ] `useSectionStore` 上线，`useUniverseStore` 作 alias
- [ ] HUD 板块感知（TierRail / FloatingViewControl / TopBar）
- [ ] Hooks 板块感知（useSyncTier / useTierTransition / useHandwrittenTransition）
- [ ] content schema 接受 physics tier id；lint-content 扫两个目录
- [ ] Universe 板块零回归验证

### 2.B — Physics 骨架（PR2）

- [ ] `src/content/physics/*` 9 个 P\*.ts 占位 + index.ts
- [ ] `src/scenes-handwritten/physics/*` ActiveScene + 9 个最小 Scene
- [ ] `HandwrittenMarker` 加 `vector / wave / orbit` 三 variant
- [ ] `src/app/physics/*` 路由树（layout + page + \_shell + 9 子路由）
- [ ] 9 路由全 200 + TierRail 显示 P0-P8

### 2.C — P0 / P4 实体内容（PR3）

- [ ] P0 经典力学：dataCards / narrative / sources / markers + 手绘场景（单摆 + 弹簧 + 抛体 + 椭圆 + Lagrangian + 相空间）
- [ ] P4 量子力学：dataCards / narrative / sources / markers + 手绘场景（双缝 + 能级 + Bloch 球）

### 2.D — P1/P2/P3/P5/P6/P7/P8 内容（后续）

留待 Session 17 起按月迭代。每档由 9-physics-vision.md 的深度阶梯指导。

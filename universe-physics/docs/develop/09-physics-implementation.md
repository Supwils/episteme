# 09 — Physics 板块实施指南

> **读者**：要在 `/physics/*` 落地 Physics 板块的工程师。
> **读完能做什么**：精确知道目录结构、9 档主题文件契约、3 个新 marker variant 的 API、手绘场景构图骨架、与 Section 抽象层（见 [`10-section-refactor.md`](./10-section-refactor.md)）的对接点。视觉与产品方向见 [`design/09-physics-vision.md`](../design/09-physics-vision.md)。

## 1. 与现有板块的关系

| 维度                       | Universe 3D                                      | Universe 手绘             | Physics（本板块）             |
| -------------------------- | ------------------------------------------------ | ------------------------- | ----------------------------- |
| 路由根                     | `/universe/*`                                    | `/universe/handwritten/*` | `/physics/*`                  |
| 渲染层                     | R3F + WebGL                                      | JSX SVG + framer-motion   | **同上**（JSX SVG + framer）  |
| 内容数据                   | `src/content/cosmos/T*.ts`                       | 同上                      | `src/content/physics/P*.ts`   |
| Tier ID                    | `T0..T7`                                         | 同                        | `P0..P8`                      |
| Section                    | `universe`                                       | `universe`                | `physics`                     |
| 视图模式                   | `3d`                                             | `handwritten`             | `handwritten`（无 3D）        |
| HUD                        | TopBar / SubjectCard / TierRail / KnowledgePanel | 复用                      | 复用                          |
| FloatingViewControl 段控制 | Section · View · Canvas                          | 同                        | **同**（View 段 3D 选项灰态） |

## 2. 目录结构

```
src/
├── lib/
│   └── physics-tier.ts                       # PR1 已建：9 档 TierMeta + Routes
├── content/
│   └── physics/
│       ├── index.ts                          # registry + getPhysicsContent + hasPhysicsContent
│       ├── P0-classical-mechanics.ts         # PR3 实体
│       ├── P1-thermodynamics.ts              # 占位
│       ├── P2-electromagnetism.ts
│       ├── P3-relativity.ts
│       ├── P4-quantum-mechanics.ts           # PR3 实体
│       ├── P5-atomic-molecular.ts
│       ├── P6-nuclear-particle.ts
│       ├── P7-standard-model.ts
│       └── P8-frontier.ts
├── scenes-handwritten/
│   └── physics/
│       ├── ActivePhysicsHandwrittenScene.tsx  # tier → scene 路由器 + cross-fade
│       ├── p0-classical-mechanics-hw/Scene.tsx
│       ├── p1-thermodynamics-hw/Scene.tsx
│       ├── ... (P2-P7)
│       └── p8-frontier-hw/Scene.tsx
├── app/
│   └── physics/
│       ├── layout.tsx                        # 包 PhysicsShell
│       ├── page.tsx                          # 重定向到 /physics/classical-mechanics
│       ├── _shell/
│       │   └── PhysicsShell.tsx              # SVG canvas + HUD 注入（无 Canvas）
│       └── {9 个子路由}/page.tsx
```

## 3. `physics-tier.ts` 契约

```ts
// src/lib/physics-tier.ts

import type { TierMeta, TransitionKind } from "./tier";

export type PhysicsTierId = "P0" | "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7" | "P8";

export const PHYSICS_TIER_ORDER: readonly PhysicsTierId[] = [
  "P0",
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "P8",
] as const;

export const PHYSICS_TIERS: Record<PhysicsTierId, TierMeta> = {
  P0: {
    id: "P0",
    label: "Classical Mechanics",
    shortLabel: "经典力学",
    scaleMeters: 1,
    unit: "SI",
    cameraComfort: { min: 1, max: 1 },
  },
  P1: {
    id: "P1",
    label: "Thermo · Stat-Mech",
    shortLabel: "热力学",
    scaleMeters: 1,
    unit: "k_B",
    cameraComfort: { min: 1, max: 1 },
  },
  P2: {
    id: "P2",
    label: "Electromagnetism",
    shortLabel: "电磁与光",
    scaleMeters: 1,
    unit: "c",
    cameraComfort: { min: 1, max: 1 },
  },
  P3: {
    id: "P3",
    label: "Relativity",
    shortLabel: "相对论",
    scaleMeters: 1,
    unit: "γ",
    cameraComfort: { min: 1, max: 1 },
  },
  P4: {
    id: "P4",
    label: "Quantum Mechanics",
    shortLabel: "量子力学",
    scaleMeters: 1,
    unit: "ℏ",
    cameraComfort: { min: 1, max: 1 },
  },
  P5: {
    id: "P5",
    label: "Atomic · Molecular",
    shortLabel: "原子分子",
    scaleMeters: 1,
    unit: "a₀",
    cameraComfort: { min: 1, max: 1 },
  },
  P6: {
    id: "P6",
    label: "Nuclear · Particle",
    shortLabel: "核与粒子",
    scaleMeters: 1,
    unit: "GeV",
    cameraComfort: { min: 1, max: 1 },
  },
  P7: {
    id: "P7",
    label: "Standard Model · QFT",
    shortLabel: "标准模型",
    scaleMeters: 1,
    unit: "TeV",
    cameraComfort: { min: 1, max: 1 },
  },
  P8: {
    id: "P8",
    label: "Frontier",
    shortLabel: "前沿",
    scaleMeters: 1,
    unit: "?",
    cameraComfort: { min: 1, max: 1 },
  },
};

export const PHYSICS_TIER_ROUTES: Record<PhysicsTierId, string> = {
  P0: "classical-mechanics",
  P1: "thermodynamics",
  P2: "electromagnetism",
  P3: "relativity",
  P4: "quantum-mechanics",
  P5: "atomic-molecular",
  P6: "nuclear-particle",
  P7: "standard-model",
  P8: "frontier",
};

const ROUTE_TO_PTIER: Map<string, PhysicsTierId> = new Map(
  (Object.entries(PHYSICS_TIER_ROUTES) as Array<[PhysicsTierId, string]>).map(([t, slug]) => [
    slug,
    t,
  ]),
);

export function physicsTierFromSlug(slug: string): PhysicsTierId | null {
  return ROUTE_TO_PTIER.get(slug) ?? null;
}

export function physicsTierIndex(id: PhysicsTierId): number {
  return PHYSICS_TIER_ORDER.indexOf(id);
}

export function physicsTransitionKind(from: PhysicsTierId, to: PhysicsTierId): TransitionKind {
  // For now physics uses dissolve everywhere — no 3D camera, simple cross-fade
  if (from === to) return "dissolve";
  return "dissolve";
}
```

**注**：`scaleMeters` 与 `cameraComfort` 字段对物理板块无实际意义（没有 3D 相机），但保留为 1 以满足 `TierMeta` 类型一致性。`unit` 字段重新利用为"该档的代表性单位/符号"，在 TopBar 显示。

## 4. 三个新 marker variant 实现

修改 `src/scenes-handwritten/shared/HandwrittenMarker.tsx`，扩展 `variant` union：

```ts
variant?:
  | "halo" | "diamond" | "starpoint" | "pin"     // 已有
  | "vector" | "wave" | "orbit";                  // 新增
```

并新增三个内部组件：

### 4.1 VectorArrow

```tsx
function VectorArrow({ r, color }: { r: number; color: string }) {
  // 默认指向上方（北），调用方通过 marker 数据外层的 rotate 控制方向
  const len = r * 3;
  const headW = r * 0.8;
  const headH = r * 0.8;
  return (
    <>
      <line x1={0} y1={0} x2={0} y2={-len} stroke={color} strokeWidth={1.2} />
      <path
        d={`M ${-headW} ${-len + headH} L 0 ${-len} L ${headW} ${-len + headH}`}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </>
  );
}
```

调用方控制方向：在 marker.position 之外再传一个 `direction?: number` 角度（弧度）。或者用 `<g transform={`rotate(${deg})`}>` 包外层。

### 4.2 WaveCurve

```tsx
function WaveCurve({ r, color }: { r: number; color: string }) {
  const samples = 16;
  const width = r * 4;
  const amp = r * 0.8;
  const cycles = 1.5;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = -width / 2 + t * width;
    const y = -Math.sin(t * Math.PI * 2 * cycles) * amp;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return (
    <>
      <circle cx={0} cy={0} r={r * 1.6} fill={color} fillOpacity={0.08} />
      <path
        d={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        filter="url(#hw-wobble-tiny)"
      />
    </>
  );
}
```

可选扩展：把 `cycles` 改为 prop 让调用方控制（量子波包用 0.5 周期 + Gaussian 包络，光波用 2 周期纯正弦）。本期先固定 1.5 周期纯正弦，留 TODO。

### 4.3 OrbitRing

```tsx
function OrbitRing({ r, color }: { r: number; color: string }) {
  // 椭圆轨道 + 中心小核 + 一个轨道上的小点
  return (
    <>
      <ellipse
        cx={0}
        cy={0}
        rx={r * 2.4}
        ry={r * 1.3}
        fill="none"
        stroke={color}
        strokeWidth={0.9}
        filter="url(#hw-wobble-tiny)"
      />
      <circle cx={0} cy={0} r={r * 0.6} fill={color} fillOpacity={0.9} />
      <circle
        cx={r * 2.4}
        cy={0}
        r={r * 0.4}
        fill={color}
        stroke="var(--hw-ink)"
        strokeWidth={0.4}
      />
    </>
  );
}
```

### 4.4 调用模式

```tsx
<HandwrittenMarker
  marker={{
    id: "g-force",
    name: { primary: "g", latin: "Gravity" },
    position: [0, 0, 0],
    description: "...",
    color: "var(--hw-gold)",
  }}
  x={120}
  y={80}
  radius={6}
  variant="vector"
  delay={1.2}
/>
```

Marker 内 `<g transform="translate(x y)">` 包外层（已有逻辑），所以 variant 内部以 (0,0) 为基点即可。

## 5. `PhysicsShell.tsx` 契约

```tsx
"use client";

import type { ReactNode } from "react";
import { FloatingViewControl } from "@/components/hud/FloatingViewControl";
import { HoverTooltip } from "@/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/components/knowledge/KnowledgePanel";
import { SubjectCard } from "@/components/hud/SubjectCard";
import { TierRail } from "@/components/hud/TierRail";
import { TopBar } from "@/components/hud/TopBar";
import { HW_VIEWBOX_STRING } from "@/lib/handwritten-coords";
import { ActivePhysicsHandwrittenScene } from "@/scenes-handwritten/physics/ActivePhysicsHandwrittenScene";
import { HandwrittenDefs } from "@/scenes-handwritten/shared/HandwrittenDefs";
import { PaperBackground } from "@/scenes-handwritten/shared/PaperBackground";
import { useHandwrittenStore } from "@/store/useHandwrittenStore";

export function PhysicsShell({ children }: { children: ReactNode }) {
  const theme = useHandwrittenStore((s) => s.theme);
  return (
    <div
      data-hw-theme={theme}
      className="relative h-dvh w-full overflow-hidden"
      style={{ background: "var(--hw-bg)", color: "var(--hw-ink)" }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={HW_VIEWBOX_STRING}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Physics atlas scene"
      >
        <HandwrittenDefs />
        <PaperBackground />
        <ActivePhysicsHandwrittenScene />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex flex-1 flex-col justify-end px-5 pb-8 md:px-10 md:pb-10">
            <SubjectCard />
          </main>
          <TierRail />
        </div>
      </div>

      <HoverTooltip />
      <KnowledgePanel />
      <FloatingViewControl />

      <div className="hidden">{children}</div>
    </div>
  );
}
```

复用 HandwrittenShell 的全部基础，区别仅在：

- ActiveHandwrittenScene → ActivePhysicsHandwrittenScene（router → physics tier scenes）
- 不挂 `_shell/ThemeToggle.tsx`（已经合并到 FloatingViewControl）
- 不挂 Canvas（无 3D）

## 6. 9 档手绘场景构图骨架

每档场景应该独立 ~200-300 行，复用 primitive，结构遵循：

```tsx
"use client";

import { getPhysicsContent } from "@/content/physics";
import { hash01 } from "@/lib/handwritten-coords";
import { Cartouche } from "@/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/scenes-handwritten/shared/InkPath";
import { StarSpeck } from "@/scenes-handwritten/shared/StarSpeck";
import { WobbleCircle } from "@/scenes-handwritten/shared/WobbleCircle";

export function PXHwScene() {
  const content = getPhysicsContent("PX");
  const markers = content?.markers ?? [];

  return (
    <g>
      {/* (1) 背景星点（弱）or 不放 */}
      <StarSpeck seed={... } count={80} ... />

      {/* (2) 主构图：4 象限 / 三联画 / 中心圆等 */}
      {/* 用 InkPath + WobbleCircle 表达 */}

      {/* (3) 公式卷轴（左下或右上） */}
      <Cartouche cx={-260} cy={350} title="L = T − V" subtitle="Hamilton 原理" />

      {/* (4) markers */}
      {markers.map((m, i) => (
        <HandwrittenMarker key={m.id} marker={m} x={...} y={...}
                           radius={...} variant={...} delay={...} />
      ))}

      {/* (5) 主标题 cartouche */}
      <Cartouche cx={0} cy={-460}
                 title={content?.name.latin ?? "..."}
                 subtitle={content?.name.primary} />
    </g>
  );
}
```

具体 9 档构图脚本：

### P0 经典力学

- 四象限主构图（每象限 ~ 200×200 px）
  - 左上：单摆（绳 + 摆球 + 角度 θ 标注）
  - 右上：弹簧 + 块（多个 vertical line + 矩形）
  - 左下：抛体抛物线 InkPath
  - 右下：椭圆轨道（OrbitRing + 焦点 + Sun）
- 中央 cartouche：`L = T − V`
- 右上贴 vector marker：g↓ 向下箭头
- 右下相空间 portrait：q-p 坐标 + 椭圆轨迹 + 流场箭头

### P1 热力学

- 主图：卡诺循环 PV 图（4 条曲线，2 等温 + 2 绝热）
- 右上：Maxwell-Boltzmann 钟形 wave variant
- 左下：熵 S 增长箭头（vector 向右上）
- cartouche：`dS ≥ 0`

### P2 电磁

- 主图四象限：
  - 左上：Maxwell 四方程刻在卷轴
  - 右上：平面波（E 与 B 互相垂直，两个 wave variant 错相位）
  - 左下：电场线（中心电荷 + 8 条径向 InkPath）
  - 右下：衍射条纹（10+ 平行 InkPath）
- 中央 cartouche：`∇ × E = −∂B/∂t`

### P3 相对论

- 主图：闵可夫斯基光锥（光锥线 + 时间轴）
- 右下：时空弯曲网格（贝塞尔曲线变形）
- 左上：Schwarzschild 半径 + 黑洞（WobbleCircle 全黑 + 事件视界圈）
- cartouche：`G_μν = 8πG/c⁴ T_μν`

### P4 量子（详见 PR3）

- 主图三联：双缝干涉 + 势阱能级 + Bloch 球
- wave variant 标 ψ(x)
- orbit variant 标氢原子 1s

### P5 原子

- 中心：氢原子 1s 轨道（多层水彩 WobbleCircle）
- 周围：2s/2p/3d 各一个 OrbitRing variant
- 右下：周期表片段（5×3 网格，每格小元素符号 + 原子序数）
- 左上：Lyman / Balmer 系列光谱线（4 条彩色 InkPath）

### P6 核与粒子

- 主图：原子核（多个红色 / 蓝色 WobbleCircle 簇集团 = 质子 + 中子）
- 右上：α 衰变（vector 箭头 + He 核飞出）
- 左下：β 衰变（中子 → 质子 + e⁻ + ν̄_e）
- 右下：粒子动物园简表（lepton / quark 标签）

### P7 标准模型

- 主图：粒子表 3 代 × (2 quark + 2 lepton) = 12 种基本费米子 + 反粒子，按代分行排
- 右上：Feynman 图（顶点 + 内线 + 外线）
- 左下：Higgs 势 V(φ) 墨西哥帽形（profile 截面）
- cartouche：`SU(3) × SU(2) × U(1)`

### P8 前沿

- 拼贴四象限：弦论 / 拓扑相 / 暗物质 / 量子信息
- 每象限简化为一个标志性图形 + 短文字标题

## 7. 内容文件契约（占位 vs 实体）

### 占位（最小有效，通过 Zod schema）

```ts
// src/content/physics/P1-thermodynamics.ts
import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "P1" as any, // PR1 后这里改为 PhysicsTierId
  name: { primary: "热力学与统计力学", latin: "Thermodynamics & Statistical Mechanics" },
  tagline: "随机的优雅",
  whisper: "时间之矢的方向来自微观状态数。",
  dataCards: [
    { label: "Boltzmann 常数", latinLabel: "k_B", value: "1.381 × 10⁻²³", hint: "J / K" },
    { label: "Avogadro 数", latinLabel: "N_A", value: "6.022 × 10²³", hint: "/ mol" },
    { label: "气体常数", latinLabel: "R", value: "8.314", hint: "J / (mol·K)" },
    { label: "熵增第二定律", value: "dS ≥ 0", hint: "孤立系统熵不减" },
  ],
  narrative: [
    { heading: "Coming Soon", body: ["P1 完整内容写作中。先用 P0、P4 作为样板。"] },
    { heading: "锚定话题", body: ["卡诺循环 / 麦克斯韦分布 / 配分函数 / 相变 / 涨落定理"] },
    {
      heading: "参考文献入口",
      body: ["Reif《Fundamentals of Statistical and Thermal Physics》。Landau-Lifshitz Vol 5。"],
    },
  ],
  sources: [
    {
      label: "MIT 8.044 Statistical Physics I",
      url: "https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/",
      kind: "encyclopedia",
    },
    {
      label: "Wikipedia · Thermodynamics",
      url: "https://en.wikipedia.org/wiki/Thermodynamics",
      kind: "encyclopedia",
    },
  ],
  // markers 留空（占位档无需 markers）
};

export default content;
```

**最小有效占位**至少要：4 个 dataCards、3 个 narrative section、2 个 sources，否则 Zod schema 不过。

### 实体（P0 / P4）

详见 [`design/09-physics-vision.md`](../design/09-physics-vision.md) § 4 与本文 § 6 各档构图脚本。dataCards / narrative / sources / markers 全部填齐。

## 8. 与 Section 抽象层的对接

PR1 完成后，本板块依赖：

| 函数 / 工具                            | 来自                  | 用法                                 |
| -------------------------------------- | --------------------- | ------------------------------------ |
| `SectionId`                            | `lib/section.ts`      | type 引用                            |
| `getSectionFromPath(pathname)`         | 同上                  | shell / hud 判断                     |
| `getSectionConfig(section)`            | 同上                  | 拿到 tierOrder/tiers/routes/registry |
| `getSectionRoute(section, tier, view)` | `lib/tier.ts`         | router.push 构造路由                 |
| `useSectionStore`                      | `store/`              | 读 currentSection / currentTier      |
| `useSyncTier(section, tier)`           | `hooks/`              | 子路由页面同步                       |
| `useHandwrittenTransition()`           | `scenes-handwritten/` | tier 跨档过场                        |

**Physics 板块的页面（layout / page / 子路由）只读这些 API，不应直接 import `PHYSICS_TIERS`**（除非确实需要硬编码，例如 Active Scene 的 lazy import 表）。

## 9. PR 拆分

### PR 1（已在 [`10-section-refactor.md`](./10-section-refactor.md) 范围）

- 4 份文档（含本文）
- section 抽象 + physics-tier 模块
- HUD 板块感知
- Universe 零回归验证

### PR 2 · Physics 骨架（~1 天）

- `src/content/physics/*`（9 个 P\*.ts 占位 + index）
- `src/scenes-handwritten/physics/*`（ActiveScene + 9 个最小 Scene）
- `src/scenes-handwritten/shared/HandwrittenMarker.tsx` + 3 variant
- `src/app/physics/*`（layout + page + \_shell + 9 子路由）

**验证**：`/physics/classical-mechanics → /physics/frontier` 9 路由全 200，TierRail 显示 P0-P8，板块切换 OK。

### PR 3 · P0 + P4 实体（~1.5 天）

- `P0-classical-mechanics.ts` 实体（≥ 6 dataCards / 4 narrative / 4 sources / 5 markers）
- `P4-quantum-mechanics.ts` 实体（同上）
- `p0-...-hw/Scene.tsx` 完整构图：4 象限 + Lagrangian + 相空间
- `p4-...-hw/Scene.tsx` 完整构图：双缝 + 能级 + Bloch 球
- 至少 3 个新 variant marker 各被用过一次（vector / wave / orbit）
- WORKLOG Session 16 记录

## 10. 不要做的事

- ❌ 不在物理内容里使用 KaTeX / MathJax（公式用 Unicode）
- ❌ 不复制 Universe 的 cosmos content（physics 完全独立目录）
- ❌ 不强行让 PhysicsTier 与 UniverseTier 数值对齐（语义不同）
- ❌ 不修改 `src/scenes/*`（3D 场景）/ `src/content/cosmos/*`（universe 内容）
- ❌ 不在 SVG path d 内嵌业务数据（位置必须经几何工具计算）
- ❌ 不在物理内容里出现 emoji
- ❌ 不在 Physics 占位档塞凑数 narrative（明确写 "Coming Soon" + 锚定话题 + 参考入口）

## 11. DoD（Physics 板块整体）

完成时应满足：

- [ ] `pnpm check` + `pnpm build` 全绿
- [ ] `/physics/*` 9 路由全 200，且每条路由静态预渲染成功
- [ ] TierRail 在 Physics 下显示 P0-P8，P0/P4 高亮可点，其余 pending 灰态
- [ ] FloatingViewControl Section 段切换正常（Universe ↔ Physics），View 段 3D 选项在 Physics 下灰态
- [ ] P0 / P4 知识面板显示完整内容，至少 4 dataCards / 3 narrative / 2 sources / 4 markers
- [ ] P0 / P4 手绘场景含 Cartouche + ≥ 3 类视觉元素 + ≥ 1 个新 variant marker
- [ ] Universe 板块视觉与功能**零回归**
- [ ] WORKLOG Session 15/16 完整

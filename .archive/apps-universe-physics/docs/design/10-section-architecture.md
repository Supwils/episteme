# 10 — Section 抽象层 · 板块架构

> **读者**：项目架构、产品、工程师。需要理解为什么把 `Tier` 切到 `Section × Tier` 二维结构。
> **读完能做什么**：知道 `SectionId`、`SectionConfig`、`TierId × Section` 三层关系，以及未来加第三板块的接入图。重构实施细节见 [`develop/10-section-refactor.md`](../develop/10-section-refactor.md)。

## 1. 为什么需要 Section 抽象

`universe-physics` 项目 CLAUDE.md 第一条就定义了两个顶层板块：

- **Universe** — 宇宙地图
- **Physics** — 物理语言

Phase 1 只做了 Universe（3D + 手绘双轨），代码全程把 Tier 写成 `TierId = "T0"..."T7"` 的 union type，分布在约 100 处调用点：

- `lib/tier.ts`：`TIERS`、`TIER_ORDER`、`TIER_ROUTES`、`TIER_ROUTES_HANDWRITTEN`
- `store/useUniverseStore.ts`：`currentTier: TierId`
- `components/hud/{TierRail, FloatingViewControl, SubjectCard, TopBar}.tsx`
- `hooks/useSyncTier.ts`
- `camera/useTierTransition.ts`、`scenes-handwritten/useHandwrittenTransition.ts`
- `content/cosmos/index.ts`：`hasTierContent`、`getTierContent`
- `lib/content-schema.ts`：`tierIdSchema`

Phase 2 启动 Physics（9 档 P0..P8）后，**如果不做抽象**，会产生：

1. 两套并行的 tier 表、两套 store、两套 hook、两套 transition、HUD 内大量条件分支。
2. 加第三板块（如未来的 Mathematics）时再复制一次——技术债 N 次方增长。
3. content schema 双份维护，lint 脚本走两条路径。

**做了 Section 抽象后**：

- 一套通用接口，新板块只需配一份 `SectionConfig` + 一份 content 目录就接入。
- HUD 用 `useSectionStore` 读当前 section + tier；逻辑统一。
- 写新板块时认知成本接近 0。

## 2. 三层概念

```
       ┌─────────────────────────────────┐
       │              Section            │
       │  universe · physics · (more)    │
       └────────────┬────────────────────┘
                    │ has many
                    ▼
       ┌─────────────────────────────────┐
       │            Tier (Section-scoped) │
       │  T0..T7 (universe)              │
       │  P0..P8 (physics)               │
       └────────────┬────────────────────┘
                    │ rendered by
                    ▼
       ┌─────────────────────────────────┐
       │            View Mode            │
       │  3d · handwritten               │
       └─────────────────────────────────┘
```

**三层关系**：

- **Section** 是顶层板块身份。决定路由前缀、内容根目录、可用 view 模式。
- **Tier** 是 Section 内的尺度/主题层级。同名但语义不同：Universe 的 Tier 是物理空间尺度（从 10²⁶ m 到 10⁷ m），Physics 的 Tier 是理论主题深度（从经典力学到 QFT）。
- **View Mode** 是同一 Section + Tier 的不同表达媒介。Universe 同时支持 3D 与 handwritten；Physics 仅 handwritten。

### 2.1 Section × ViewMode 矩阵

|              | 3D                   | handwritten                      |
| ------------ | -------------------- | -------------------------------- |
| **universe** | ✓ `/universe/{slug}` | ✓ `/universe/handwritten/{slug}` |
| **physics**  | ✗（视图不支持）      | ✓ `/physics/{slug}`              |

注意：物理板块的 handwritten 没有 `/handwritten/` 路径段——因为它只有一种视图，路径无需 disambiguate。

### 2.2 Section × Tier 矩阵

| Section    | Tier IDs | Tier 数 | 默认 Tier | 路由前缀    |
| ---------- | -------- | ------- | --------- | ----------- |
| `universe` | T0..T7   | 8       | T0        | `/universe` |
| `physics`  | P0..P8   | 9       | P0        | `/physics`  |

## 3. `SectionConfig` 类型设计

```ts
// src/lib/section.ts

export type SectionId = "universe" | "physics";

export type ViewMode = "3d" | "handwritten";

/** 各 section 的统一配置 schema，让 HUD 与 store 不需要知道板块具体细节 */
export type SectionConfig<T extends string = string> = {
  id: SectionId;
  label: { primary: string; latin: string };

  /** 此 section 支持的视图模式（按显示顺序）。physics 仅 handwritten。 */
  viewModes: ViewMode[];
  defaultViewMode: ViewMode;

  /** Tier 层 */
  tierOrder: readonly T[];
  tiers: Record<T, TierMeta>;
  defaultTier: T;

  /** 路由 */
  routePrefix: string; // "/universe" or "/physics"
  tierRoutes: Record<T, string>; // tier → slug
  handwrittenRoutePrefix: string; // for 3D variant we drill into /handwritten
  hasHandwrittenSubpath: boolean; // universe yes, physics no

  /** 内容 */
  hasContent: (tier: T) => boolean;
  getContent: (tier: T) => TierContent | null;

  /** 过场（physics 没有 3D 相机的话仍返回 dissolve） */
  transitionKind: (from: T, to: T) => TransitionKind;
};

export const SECTIONS: Record<SectionId, SectionConfig> = {
  universe: {
    /* 由 lib/tier.ts 提供 */
  },
  physics: {
    /* 由 lib/physics-tier.ts 提供 */
  },
};

export function getSectionConfig(section: SectionId): SectionConfig {
  return SECTIONS[section];
}

export function getSectionFromPath(pathname: string): SectionId {
  if (pathname.startsWith("/physics")) return "physics";
  return "universe"; // default
}

export function viewModesForSection(section: SectionId): ViewMode[] {
  return SECTIONS[section].viewModes;
}

export function getSectionRoute(section: SectionId, tier: string, view: ViewMode): string {
  const cfg = SECTIONS[section];
  const slug = cfg.tierRoutes[tier as keyof typeof cfg.tierRoutes];
  if (view === "handwritten" && cfg.hasHandwrittenSubpath) {
    return `${cfg.routePrefix}/handwritten/${slug}`;
  }
  return `${cfg.routePrefix}/${slug}`;
}
```

## 4. AnyTierId 类型

为了让 store 与 HUD 接受 universe + physics 两种 tier id，定义 union：

```ts
// src/lib/tier.ts (or section.ts)
export type AnyTierId = UniverseTierId | PhysicsTierId;
```

调用 `getSectionConfig(section).tiers[tier]` 时由 TypeScript 静态检查（section 决定 tier id 范围）。

## 5. Store 形状

```ts
// src/store/useSectionStore.ts
type State = {
  section: SectionId;
  currentTier: AnyTierId;
  targetObjectId: string | null;
  transition: {
    active: boolean;
    from: AnyTierId | null;
    to: AnyTierId | null;
    kind: TransitionKind | null;
    progress: number;
  };
  setSection: (section: SectionId, tier?: AnyTierId) => void;
  setTier: (tier: AnyTierId) => void;
  // ...其他与原 useUniverseStore 一致
};
```

**重要规则**：

- 跨 section 切换时，调用方应同时给 `tier`（目标 section 的合法 tier id），否则 store 自动 fallback 到该 section 的 `defaultTier`。
- 同一 section 内切 tier 时不必传 section。

### 5.1 旧 useUniverseStore 兼容

为了避免一次性改 100+ 处 import，保留 `useUniverseStore` 作为薄壳：

```ts
// src/store/useUniverseStore.ts
import { useSectionStore } from "./useSectionStore";
import type { TierId } from "@/lib/tier";

/**
 * @deprecated Use useSectionStore. Kept for backward compatibility during
 * the section abstraction migration (Session 15).
 */
export const useUniverseStore = useSectionStore;
```

调用方代码 `useUniverseStore((s) => s.currentTier)` 仍然可工作（state shape 兼容，currentTier 字段保留）。新代码请走 `useSectionStore`。

## 6. HUD 组件的板块感知

### 6.1 TierRail

```tsx
const pathname = usePathname() ?? "";
const section = getSectionFromPath(pathname);
const cfg = getSectionConfig(section);

return (
  <ol>
    {cfg.tierOrder.map((id) => {
      const meta = cfg.tiers[id];
      const drillable = cfg.hasContent(id);
      const isActive = id === currentTier;
      // ... 渲染逻辑与现在一致
    })}
  </ol>
);
```

### 6.2 FloatingViewControl

```tsx
const section = getSectionFromPath(pathname);
const cfg = getSectionConfig(section);
const availableViews = cfg.viewModes;

// 三段：
//   1) Section: ["universe", "physics"]
//   2) View:    availableViews（universe 全开，physics 仅 handwritten）
//   3) Canvas:  theme (only in handwritten view)
```

### 6.3 TopBar

```tsx
const section = useSectionStore((s) => s.section);
const tier = useSectionStore((s) => s.currentTier);
const meta = getSectionConfig(section).tiers[tier];

// "tier · T0" → "tier · P4" 自动跟 section 走
// "frame · geocentric · Gpc" → "frame · mks · SI" 自动跟 section 走
```

## 7. 未来扩展：第三 / 第 N 板块

加入新板块（例 Mathematics、History）只需：

1. 创建 `src/lib/{newsection}-tier.ts`（定义 NewTierId、TIERS、ROUTES、transitionKind）
2. 在 `src/lib/section.ts` 的 `SECTIONS` 表新增条目
3. 创建 `src/content/{newsection}/` 目录与 P/M/H\*.ts 文件
4. 创建 `src/scenes-handwritten/{newsection}/` 与 ActiveScene + 各档 Scene
5. 创建 `src/app/{newsection}/` 路由树
6. 不需要改 HUD、不需要改 store、不需要改 ViewSwitcher

**零侵入**——这是 Section 抽象的目标。

## 8. 与现有 useHandwrittenStore 的关系

`useHandwrittenStore`（持久化 theme 与 flourishes）**跨 section 共享**——所有 handwritten 视图共用一个主题。理由：

- 用户的"喜欢深空底/蓝调底"是审美偏好，不应该按板块割裂
- 如果未来需要按 section 独立 theme，可以把 `theme` 改为 `Record<SectionId, Theme>`，本期不做

## 9. 与 useUiStore 的关系

`useUiStore`（KnowledgePanel 状态、hover marker、reducedMotion）**完全跨 section 通用**，不动。

## 10. 一句话决策树

- 加新 tier 给现有 section？→ 改 `lib/{section}-tier.ts`
- 加新 view mode 给现有 section？→ 改 `SectionConfig.viewModes` + 实施 shell
- 加新 section？→ 全新 namespace + section.ts 注册
- 改 HUD 行为？→ 改组件本身（板块感知逻辑已抽象）
- 改 schema？→ `lib/content-schema.ts` 单点

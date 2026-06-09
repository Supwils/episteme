# 10 — Section 抽象重构指南

> **读者**：执行 Section 抽象重构的工程师。
> **读完能做什么**：知道从 `useUniverseStore` + 硬编码 TierId 切到 `useSectionStore` + `SectionConfig` 的逐步路径、影响面清单、回归测试做什么。设计层背景见 [`design/10-section-architecture.md`](../design/10-section-architecture.md)。

## 1. 重构目标

把硬编码的 `Universe TierId = "T0".."T7"` 升级为 `Section × Tier` 二维参数化结构，让 Physics（P0..P8）和未来板块都能零侵入接入。

**纪律**：

- Universe 板块的 URL、视觉、交互、性能**零回归**。
- 重构与 Physics 内容写作解耦——本指南只管重构本身，Physics 实施见 [`09-physics-implementation.md`](./09-physics-implementation.md)。
- 保留旧 `useUniverseStore` import 路径作为 alias（避免一次性改 100+ 个 import）。

## 2. 影响面清单（按文件）

### 2.1 新建文件

```
src/lib/section.ts              # SectionId / SectionConfig / 工具函数
src/lib/physics-tier.ts          # P0..P8 元信息（虽给 Physics 用，但本 PR1 建好）
```

### 2.2 改造文件（结构性）

| 路径                                                 | 改动                                                                                                                                       | 行数预估   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `src/lib/tier.ts`                                    | 通用化 `TierId`/`TierMeta` 类型；保留 `UNIVERSE_TIERS`/`UNIVERSE_TIER_ORDER`/`UNIVERSE_TIER_ROUTES`；新增 `getViewMode`、`getSectionRoute` | +60        |
| `src/store/useUniverseStore.ts`                      | 升级为 `useSectionStore` + 旧 export 作 alias                                                                                              | 全文件改   |
| `src/components/hud/TierRail.tsx`                    | 用 `getSectionConfig(section).tierOrder` 替代 `TIER_ORDER`                                                                                 | ~30 行差量 |
| `src/components/hud/FloatingViewControl.tsx`         | 加 Section 段；按 `viewModesForSection` 控制 View 段                                                                                       | ~50 行差量 |
| `src/components/hud/TopBar.tsx`                      | tier 标签按 section 切（T0/P4），unit 同                                                                                                   | ~10 行差量 |
| `src/hooks/useSyncTier.ts`                           | 加 section 参数（可选向后兼容）                                                                                                            | ~10 行差量 |
| `src/camera/useTierTransition.ts`                    | 在 section !== "universe" 时 early-return noop                                                                                             | ~5 行      |
| `src/scenes-handwritten/useHandwrittenTransition.ts` | 路由构造改用 `getSectionRoute(section, tier, "handwritten")`                                                                               | ~10 行     |
| `src/content/cosmos/index.ts`                        | 加 `hasUniverseContent` / `getUniverseContent` 别名                                                                                        | +6         |
| `src/lib/content-schema.ts`                          | tierIdSchema 接受 universe + physics union；新增 sectionSchema                                                                             | ~30 行     |
| `scripts/lint-content.mjs`                           | 遍历 cosmos + physics 两目录                                                                                                               | ~20 行     |

### 2.3 不改的文件（验证）

下列文件应**不产生 git diff**：

- `src/scenes/*`（3D 场景）
- `src/content/cosmos/T*.ts`（universe 内容）
- `src/app/universe/observable/page.tsx` 等子路由 `useSyncTier("T0")` 调用 — 兼容签名不破坏
- 所有 handwritten primitive：`src/scenes-handwritten/shared/*`（除非 Physics 要扩 variant 时改 `HandwrittenMarker.tsx`）

## 3. 实施步骤（建议顺序）

### Step 1：`lib/section.ts` 与 `lib/physics-tier.ts` 新建

写完整两个文件，包括 SectionConfig 类型、SECTIONS 表（universe + physics）、所有工具函数（`getSectionConfig` / `getSectionFromPath` / `viewModesForSection` / `getSectionRoute`）。

**验证**：单测覆盖 `getSectionFromPath`（4 例：根路径 / universe / handwritten / physics）、`viewModesForSection`（2 例）、`getSectionRoute`（4 例：universe-3d / universe-handwritten / physics-handwritten / 不存在的 tier）。

### Step 2：`lib/tier.ts` 通用化

原：

```ts
export type TierId = "T0" | "T1" | ... | "T7";
export const TIERS: Record<TierId, TierMeta> = { ... };
export const TIER_ROUTES: Record<TierId, string> = { ... };
```

改后：

```ts
export type UniverseTierId = "T0" | ... | "T7";
export type PhysicsTierId = "P0" | ... | "P8";
export type AnyTierId = UniverseTierId | PhysicsTierId;
// 保留 TierId 为 UniverseTierId 的别名，避免改 100+ 个 import
export type TierId = UniverseTierId;

export const UNIVERSE_TIERS: Record<UniverseTierId, TierMeta> = { ... };
export const TIERS = UNIVERSE_TIERS;  // alias
// ...
```

`tierIndex` / `nextTier` / `prevTier` / `transitionKind` 改为接受 `AnyTierId`，逻辑上按 ID 前缀（T 或 P）查对应 SectionConfig。

### Step 3：`useUniverseStore` 升级为 `useSectionStore`

```ts
// src/store/useSectionStore.ts
type State = {
  section: SectionId;
  currentTier: AnyTierId;
  targetObjectId: string | null;
  transition: { ... };
  setSection: (section: SectionId, tier?: AnyTierId) => void;
  setTier: (tier: AnyTierId) => void;
  // 其他不变
};

export const useSectionStore = create<State>(...);
```

```ts
// src/store/useUniverseStore.ts
export { useSectionStore as useUniverseStore } from "./useSectionStore";
```

这样所有 `useUniverseStore((s) => s.currentTier)` 仍能工作（字段名兼容）。

**注意**：原 store 没有 `section` 字段。新 store 默认 `section: "universe"`，且当 `useSyncTier(tier)` 在 universe 子路由调用时不改 section（向后兼容）。

### Step 4：HUD 组件板块感知

#### 4.1 TierRail

把：

```tsx
import { TIERS, TIER_ORDER, TIER_ROUTES, ... } from "@/lib/tier";
```

改为：

```tsx
import { getSectionConfig, getSectionFromPath } from "@/lib/section";

const section = getSectionFromPath(pathname);
const cfg = getSectionConfig(section);
// 渲染时用 cfg.tierOrder 而非 TIER_ORDER；cfg.tiers[id]/cfg.tierRoutes[id]/cfg.hasContent(id)
```

#### 4.2 FloatingViewControl

把单一 `view` segment 拆为 `section` + `view` 两段：

```tsx
const section = getSectionFromPath(pathname);
const cfg = getSectionConfig(section);
const view = getViewMode(pathname); // "3d" | "handwritten"

// SegmentGroup #1 (Section)
options = [
  { id: "universe", label: "UNIVERSE" },
  { id: "physics", label: "PHYSICS" },
];

// SegmentGroup #2 (View) — physics 下只有 handwritten，3d 灰态
options = cfg.viewModes.map((v) => ({
  id: v,
  label: v === "3d" ? "3D · LIVE" : "HANDWRITTEN · ATLAS",
}));
// + 如果 cfg.viewModes.length === 1，3d 选项仍出现但 disabled
```

Section 切换时 router.push 到目标 section 的 defaultTier。

#### 4.3 TopBar

```tsx
const tier = useSectionStore((s) => s.currentTier);
const section = useSectionStore((s) => s.section);
const meta = getSectionConfig(section).tiers[tier];

<span>tier · <strong>{tier}</strong></span>   // T0 / P4 自动适配
<span>frame · {section === "universe" ? "geocentric" : "mks"} · {meta.unit}</span>
```

### Step 5：Hooks 板块感知

#### 5.1 useSyncTier

签名拓展为可选 section：

```ts
export function useSyncTier(tier: AnyTierId, section?: SectionId) {
  useEffect(() => {
    const store = useSectionStore.getState();
    if (store.transition.active) return;
    const target = section ?? inferSectionFromTier(tier);
    if (store.section !== target) store.setSection(target, tier);
    else if (store.currentTier !== tier) store.setTier(tier);
  }, [tier, section]);
}
```

`inferSectionFromTier`：根据 tier id 前缀（T / P）回推 section。

#### 5.2 useTierTransition

```ts
const section = useSectionStore((s) => s.section);
if (section !== "universe") {
  return useCallback(() => {
    /* no-op for non-3D sections */
  }, []);
}
// ... 现有 GSAP 相机逻辑
```

#### 5.3 useHandwrittenTransition

构造路由改用 `getSectionRoute`：

```ts
router.push(getSectionRoute(currentSection, target, "handwritten"));
```

### Step 6：content schema 扩展

```ts
// src/lib/content-schema.ts
const universeTierIdSchema = z.enum(["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"]);
const physicsTierIdSchema = z.enum(["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"]);
const tierIdSchema = z.union([universeTierIdSchema, physicsTierIdSchema]);
const sectionSchema = z.enum(["universe", "physics"]);

const tierContentSchema = z
  .object({
    tier: tierIdSchema,
    // ...其他不变
  })
  .superRefine((c, ctx) => {
    // marker id 唯一性等现有检查
  });
```

更新 `src/lib/content-schema.test.ts` 加 1-2 个 physics tier id 的边界例子（最低保留不影响现有 17 个 universe 例子）。

### Step 7：`scripts/lint-content.mjs` 扩

让脚本扫两个目录：`src/content/cosmos/` + `src/content/physics/`，全部按统一 schema 校验。

### Step 8：内容 registry 加别名

```ts
// src/content/cosmos/index.ts （已有 getTierContent / hasTierContent）
// 加：
export const getUniverseContent = getTierContent;
export const hasUniverseContent = hasTierContent;
```

未来如果有人用 `getUniverseContent` 来强调"这是 universe"，可读性更好。

### Step 9：UniverseShell 的 isHandwrittenPath

`src/app/universe/_shell/UniverseShell.tsx` 当前用 `isHandwrittenPath` 做 early-return。改用 `getViewMode(pathname) === "handwritten"`。

逻辑等价，但语义更强（"是否手绘模式"而非"是否手绘路径"，便于扩展更多视图）。

### Step 10：删除/标弃旧符号

- `isHandwrittenPath` 标 `@deprecated`，rename to `getViewMode`，保留旧 export 做 alias。
- 任何 `import { TIER_ROUTES_HANDWRITTEN } from "@/lib/tier"` 优先迁到 `getSectionRoute(section, tier, "handwritten")`，但本期不强制改全部（保留向后兼容）。

## 4. 回归测试清单

### 4.1 自动化（pnpm check）

- `pnpm typecheck`：零错（所有 TierId / AnyTierId / SectionId 类型链通）
- `pnpm lint`：零警告
- `pnpm test`：现有 53 个 + 新增 ≥ 6 个（section 工具单测）全过
- `pnpm lint:content`：universe + physics 占位 content 全过
- `pnpm format:check`：零问题
- `pnpm build`：21 universe 路由 + 11 physics 路由（含 layout + 9 tier + 1 redirect）全部静态预渲染

### 4.2 人工眼测（Universe 零回归）

- `/universe/observable` → 三层星壳 / CMB 同心环视觉与重构前一致
- `/universe/handwritten/laniakea` → 流线汇入 GA 视觉一致
- `/universe/handwritten/earth` → 月球椭圆轨视觉一致
- TopBar 显示 `tier · T0`、`frame · geocentric · Gpc` 等
- TierRail 8 档全显示，可点击切换、过场动画与重构前一致
- FloatingViewControl 拖动 + 展开 + 切 3D/Handwritten + Deep/Near 全部正常
- KnowledgePanel 滑入、ESC 关闭、点击外部关闭

### 4.3 人工眼测（Physics 占位）

- `/physics` → 重定向到 `/physics/classical-mechanics`
- `/physics/classical-mechanics` 到 `/physics/frontier` 9 路由全 200
- TopBar 显示 `tier · P0`、`frame · mks · SI`（或对应 section unit）
- TierRail 显示 P0-P8（点击切换正常）
- FloatingViewControl Section 段切换 universe ↔ physics 时 URL 正确跳转
- FloatingViewControl 在 physics 下 3D 选项灰态/禁用
- 任一 physics 路由的手绘场景至少能渲染 cartouche 与 tagline 占位

### 4.4 git diff 验证

```
git diff --stat src/scenes/         # 应为空
git diff --stat src/content/cosmos/ # 应为空（cosmos/index.ts 例外，加 alias）
git diff --stat src/app/universe/   # 应为空（除 _shell/UniverseShell.tsx isHandwrittenPath → getViewMode）
```

## 5. 风险与降级

| 风险                                                                                 | 影响                                                                     | 应对                                                               |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `useUniverseStore` 兼容 alias 让某些调用方拿到 physics 的 currentTier 当 universe 用 | TypeScript 类型放松到 `AnyTierId` 后，调用方原本期待 `TierId` 会编译失败 | 保留 `TierId = UniverseTierId` alias，编译期消化                   |
| Zod schema union 后旧 cosmos content 不严格                                          | 写入 physics tier id 到 cosmos 文件不会报错                              | 在 superRefine 里加 "cosmos files must use T\*" 跨字段约束（可选） |
| HUD pathname 判断不稳定（路由切换中间态）                                            | 用户切板块时短暂 HUD 闪烁                                                | TierRail / FloatingViewControl 用 transitionActive 阻止重复点击    |
| 新增 9 个 physics 占位路由让 build time 变长                                         | 微弱（< 1s）                                                             | 不应对                                                             |
| useSyncTier 接受 P\* 时旧调用 `useSyncTier("T0")` 必须仍兼容                         | 是                                                                       | section 参数可选；infer 函数兜底                                   |

## 6. 工程量估算

| 任务                                                                     | 行数            | 时间      |
| ------------------------------------------------------------------------ | --------------- | --------- |
| `lib/section.ts` + `lib/physics-tier.ts`                                 | 200             | 2 h       |
| `lib/tier.ts` 通用化                                                     | 60              | 1 h       |
| `useSectionStore` + `useUniverseStore` alias                             | 80              | 1 h       |
| HUD 组件改造（TierRail + FloatingViewControl + TopBar）                  | 120             | 2 h       |
| Hooks 改造（useSyncTier + useTierTransition + useHandwrittenTransition） | 50              | 1 h       |
| content schema 扩展 + lint script                                        | 50              | 1 h       |
| 单测新增（≥ 6）                                                          | 80              | 1 h       |
| 回归眼测 + 修补                                                          | —               | 2 h       |
| **总计**                                                                 | **~640 行差量** | **~11 h** |

## 7. 完成定义（PR1 整体）

- [ ] 4 份文档（09 design + 09 develop + 10 design + 10 develop）写完
- [ ] `lib/section.ts` + `lib/physics-tier.ts` 创建，含 ≥ 6 个单测
- [ ] `useSectionStore` 上线，`useUniverseStore` 作 alias
- [ ] 三个 HUD 组件（TierRail / FloatingViewControl / TopBar）改造完成
- [ ] 三个 hook（useSyncTier / useTierTransition / useHandwrittenTransition）板块感知
- [ ] content schema 接受 physics tier id
- [ ] `lint-content` 扫两个目录
- [ ] `pnpm check` + `pnpm build` 全绿
- [ ] Universe 板块视觉与功能**完全零回归**（人工 + 自动两道 check）
- [ ] WORKLOG Session 15 写完

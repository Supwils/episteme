# 08 — Handwritten Universe · 实施指南

> **读者**：要在 `/universe/handwritten` 落地 SVG 手绘宇宙的工程师。
> **读完能做什么**：精确知道目录结构、共享 primitive 组件契约、数据投影策略、过场实现、HUD 接线方式、PR 拆分。视觉规范见 [`design/08-handwritten-universe.md`](../design/08-handwritten-universe.md)。

## 1. 与 3D 板块的关系

| 维度        | 3D 版（已有）                     | 手绘版（本期新增）                                |
| ----------- | --------------------------------- | ------------------------------------------------- |
| 路由根      | `/universe/*`                     | `/universe/handwritten/*`                         |
| 渲染层      | React Three Fiber + WebGL         | JSX SVG + framer-motion                           |
| 数据        | `src/content/cosmos/T*.ts`        | **同一份**                                        |
| Tier 元信息 | `src/lib/tier.ts`                 | **同一份**（加新映射表）                          |
| HUD         | `src/components/hud/*`            | **同一份**，由 HandwrittenShell 注入              |
| 知识面板    | `src/components/knowledge/*`      | **同一份**                                        |
| 状态 store  | `useUniverseStore` / `useUiStore` | **同一份** + 新 `useHandwrittenStore`（theme 等） |
| 过场        | GSAP 操 Three 相机                | framer-motion 操 SVG opacity                      |

**关键纪律**：

- 不修改 `src/scenes/*`（3D 场景）
- 不修改 `src/store/useUniverseStore.ts` / `useUiStore.ts`
- `src/lib/tier.ts` 只**追加**新映射，不改现有字段
- `src/components/hud/TierRail.tsx` 加 pathname 感知，但 UI 结构不动

## 2. 目录结构

```
src/
├── app/universe/handwritten/
│   ├── layout.tsx                # SVG 持久画布容器
│   ├── page.tsx                  # 重定向 → /universe/handwritten/observable
│   ├── observable/page.tsx       # T0 入口（useSyncTier("T0")）
│   ├── cosmic-web/page.tsx       # T1
│   ├── laniakea/page.tsx         # T2
│   ├── local-group/page.tsx      # T3
│   ├── milky-way/page.tsx        # T4
│   ├── stellar-neighborhood/page.tsx  # T5
│   ├── solar-system/page.tsx     # T6
│   ├── earth/page.tsx            # T7
│   └── _shell/
│       ├── HandwrittenShell.tsx  # 主 SVG viewport + HUD 注入
│       ├── ThemeToggle.tsx       # 夜/日版切换按钮
│       └── ParchmentFrame.tsx    # 可选的卷轴边框（夜版）
│
├── scenes-handwritten/
│   ├── ActiveHandwrittenScene.tsx           # tier → scene 路由器 + cross-fade
│   ├── useHandwrittenTransition.ts          # 过场 hook（不动 useUniverseStore.transition）
│   ├── shared/
│   │   ├── HandwrittenDefs.tsx              # SVG <defs>: filter / pattern / gradient
│   │   ├── PaperBackground.tsx              # 纸张/夜空背景层
│   │   ├── WobbleCircle.tsx                 # 三层晕染圆 primitive
│   │   ├── InkPath.tsx                      # 墨线 path + pathLength 入场
│   │   ├── StarSpeck.tsx                    # 星点装饰
│   │   ├── HandwrittenMarker.tsx            # 手绘版 marker
│   │   ├── HandwrittenLabel.tsx             # Fraunces 引线 label
│   │   └── Cartouche.tsx                    # 标题卷轴 banner（夜版）
│   ├── tier0-observable-hw/Scene.tsx
│   ├── tier1-cosmic-web-hw/Scene.tsx
│   ├── tier2-laniakea-hw/Scene.tsx
│   ├── tier3-local-group-hw/Scene.tsx
│   ├── tier4-milky-way-hw/Scene.tsx
│   ├── tier5-stellar-neighborhood-hw/Scene.tsx
│   ├── tier6-solar-system-hw/Scene.tsx
│   └── tier7-earth-hw/Scene.tsx
│
├── lib/
│   ├── handwritten-coords.ts     # 3D position → 2D SVG viewBox 投影
│   ├── handwritten-theme.ts      # theme token 映射 + 切换工具
│   └── tier.ts                   # 加 TIER_ROUTES_HANDWRITTEN + isHandwrittenPath
│
└── store/
    └── useHandwrittenStore.ts    # { theme: "night" | "day", flourishesEnabled: boolean }
```

## 3. 数据投影策略

**核心**：所有 marker 都从 `getTierContent(tierId).markers` 直接读，**position 字段是 3D 空间的 [x, y, z]**，需要投影到 2D SVG viewBox。

### 3.1 viewBox 约定

所有 8 档场景使用统一 viewBox：

```
viewBox = "-500 -500 1000 1000"   # 1000×1000 单位，原点居中
```

实际渲染时由 `<svg>` 的 CSS 决定显示大小，viewBox 保持不变。

### 3.2 投影函数

```ts
// src/lib/handwritten-coords.ts
import type { Vec3 } from "./content";

export const HW_VIEWBOX = { x: -500, y: -500, w: 1000, h: 1000 } as const;

export type Projection = "orthographic" | "polar" | "ecliptic";

export function projectToSvg(
  position: Vec3,
  options?: { projection?: Projection; scale?: number },
): { x: number; y: number; depth: number } {
  const projection = options?.projection ?? "orthographic";
  const scale = options?.scale ?? 380; // 默认外圈半径

  if (projection === "orthographic") {
    // 直接用 [x, z] 做 2D，y 作为深度（用于绘制顺序/不透明度）
    return {
      x: position[0] * scale,
      y: position[2] * scale,
      depth: position[1],
    };
  }

  if (projection === "polar") {
    // 把 3D 投到球面，再展开为极坐标圆盘（T0 用）
    const [px, py, pz] = position;
    const r = Math.sqrt(px * px + py * py + pz * pz);
    const theta = Math.atan2(pz, px);
    return {
      x: Math.cos(theta) * r * scale,
      y: Math.sin(theta) * r * scale,
      depth: py,
    };
  }

  if (projection === "ecliptic") {
    // T6 太阳系用：把 3D 压扁到黄道面，y 几乎丢弃
    return {
      x: position[0] * scale,
      y: position[2] * scale,
      depth: position[1],
    };
  }

  return { x: 0, y: 0, depth: 0 };
}

export function depthToOpacity(depth: number, range = 1): number {
  // depth > 0 偏前（亮），depth < 0 偏后（暗）
  return 0.6 + 0.4 * Math.tanh(depth / range);
}
```

### 3.3 每档 Scene 用法

```tsx
// 任一 Scene 的 marker 渲染模式
import { getTierContent } from "@/content/cosmos";
import { projectToSvg } from "@/lib/handwritten-coords";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";

const content = getTierContent("T0");
const markers = content.markers ?? [];

return (
  <>
    {markers.map((m) => {
      const p = projectToSvg(m.position, { projection: "polar", scale: 380 });
      return (
        <HandwrittenMarker
          key={m.id}
          x={p.x}
          y={p.y}
          name={m.name.primary}
          color={m.color}
          size={m.size ?? 0.02}
          markerId={m.id}
        />
      );
    })}
  </>
);
```

## 4. 共享 Primitive 组件契约

### 4.1 HandwrittenDefs

```tsx
// 在 HandwrittenShell 内挂一次，所有 Scene 通过 url(#hw-...) 引用
export function HandwrittenDefs(): JSX.Element {
  return (
    <defs>
      {/* 3 级 wobble filter */}
      <filter id="hw-wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={2} seed={7} />
        <feDisplacementMap in="SourceGraphic" scale={6} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="hw-wobble-soft" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={13} />
        <feDisplacementMap scale={3} />
      </filter>
      <filter id="hw-wobble-tiny" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={22} />
        <feDisplacementMap scale={1.2} />
      </filter>
      {/* 纸张纹理 */}
      <pattern id="hw-paper" x={0} y={0} width={220} height={220} patternUnits="userSpaceOnUse">
        <rect width={220} height={220} fill="transparent" />
        <g opacity={0.35}>
          {PAPER_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="var(--hw-ink-faint)" />
          ))}
        </g>
      </pattern>
      {/* 墨水渐变 */}
      <linearGradient id="hw-ink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--hw-ink)" />
        <stop offset="100%" stopColor="var(--hw-ink-soft)" />
      </linearGradient>
    </defs>
  );
}
```

### 4.2 WobbleCircle

```tsx
type WobbleCircleProps = {
  cx: number;
  cy: number;
  r: number;
  hue?: string; // 默认 "var(--hw-ink)"
  strokeWidth?: number; // 默认 1.4
  wash?: "none" | "soft" | "strong"; // 三层晕染强度
  filterLevel?: "wobble" | "wobble-soft" | "wobble-tiny";
};

export function WobbleCircle(props: WobbleCircleProps): JSX.Element {
  // 三层晕：外圈 8% + 中圈 14% (错位 -2,2) + 主体（应用 filter）
}
```

### 4.3 InkPath

```tsx
type InkPathProps = {
  d: string;
  strokeWidth?: number;
  dasharray?: string;
  opacity?: number;
  delay?: number;       // 入场动画延迟（秒）
  animate?: boolean;    // 是否做 pathLength 入场
  filter?: "wobble" | "wobble-soft" | "wobble-tiny" | "none";
};

export function InkPath({ d, delay = 0, animate = true, ... }: InkPathProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={...}
      initial={reduce || !animate ? { opacity, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
      animate={{ opacity, pathLength: 1 }}
      transition={{ duration: reduce ? 0 : 0.9, delay, ease: "easeOut" }}
    />
  );
}
```

### 4.4 HandwrittenMarker

```tsx
type HandwrittenMarkerProps = {
  x: number;
  y: number;
  name: string;
  color?: string;
  size?: number; // 来自 marker.size，需映射到 px
  markerId: string; // 用于点击时打开知识面板
};

export function HandwrittenMarker(props: HandwrittenMarkerProps) {
  // hover: 套外圈虚线圆 + scale 1.15
  // click: useUiStore.openPanel(markerId) + useUiStore.setHoveredMarker(...)
}
```

### 4.5 HandwrittenLabel

```tsx
type HandwrittenLabelProps = {
  x: number;
  y: number;
  text: string;
  variant?: "title" | "subtitle" | "label-major" | "label-minor" | "caption";
  leader?: { fromX: number; fromY: number }; // 引线起点
  italic?: boolean;
};
```

字体直接走 CSS class（无需 SVG `<text>` 内 inline style）：

```css
.hw-label-title {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: 22px;
}
.hw-label-subtitle {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 14px;
}
.hw-label-major {
  font-size: 13px;
  font-style: italic;
}
.hw-label-minor {
  font-size: 11px;
}
.hw-label-caption {
  font-family: var(--font-mono);
  font-size: 10px;
}
```

### 4.6 Cartouche

夜版专用标题装饰框。日版自动隐藏。

```tsx
type CartoucheProps = {
  cx: number;
  cy: number;
  width: number;
  title: string;
  subtitle?: string;
};
```

### 4.7 StarSpeck

```tsx
type StarSpeckProps = {
  seed: number; // 用 hash01 生成确定性散点
  count: number;
  bounds: { x: number; y: number; w: number; h: number };
  hue?: string; // 默认 --hw-ink-soft
  maxRadius?: number; // 默认 0.7
};
```

## 5. 状态与主题切换

### 5.1 useHandwrittenStore

```ts
// src/store/useHandwrittenStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HandwrittenTheme = "night" | "day";

type State = {
  theme: HandwrittenTheme;
  flourishesEnabled: boolean; // 是否显示装饰（罗盘、卷轴等）
  setTheme: (t: HandwrittenTheme) => void;
  toggleTheme: () => void;
  setFlourishes: (b: boolean) => void;
};

export const useHandwrittenStore = create<State>()(
  persist(
    (set) => ({
      theme: "night",
      flourishesEnabled: true,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "night" ? "day" : "night" })),
      setFlourishes: (b) => set({ flourishesEnabled: b }),
    }),
    { name: "universe-physics-handwritten" },
  ),
);
```

### 5.2 主题 CSS 变量

```css
/* src/app/globals.css 追加 */
:root {
  --hw-bg: #0b0a14;
  --hw-bg-edge: #15101a;
  --hw-ink: #f5e7c8;
  --hw-ink-soft: #c8b896;
  --hw-ink-faint: #7d6f50;
  --hw-gold: #ffb45a;
  --hw-blue: #6ad0ff;
  --hw-red: #d05a4a;
}

[data-hw-theme="day"] {
  --hw-bg: #faf7f2;
  --hw-bg-edge: #f0eadd;
  --hw-ink: #1a1916;
  --hw-ink-soft: #5b5852;
  --hw-ink-faint: #8a867d;
  --hw-gold: #b5481c;
  --hw-blue: #2c5a7a;
  --hw-red: #b5481c;
}
```

### 5.3 切换实现

```tsx
// HandwrittenShell 内
const theme = useHandwrittenStore((s) => s.theme);
return (
  <div data-hw-theme={theme} className="h-full w-full bg-[var(--hw-bg)]">
    <svg viewBox="-500 -500 1000 1000" ...>
      <HandwrittenDefs />
      <PaperBackground />
      <ActiveHandwrittenScene />
    </svg>
    <HudOverlay />
    <ThemeToggle />
  </div>
);
```

## 6. HUD 注入策略

HandwrittenShell 不直接 mount `<HudShell>`（那是给 3D 版用的），而是按需挑选 HUD 子组件，**绝对定位**到 SVG 容器之上：

```tsx
// HandwrittenShell.tsx
import { TopBar } from "@/components/hud/TopBar";
import { SubjectCard } from "@/components/hud/SubjectCard";
import { TierRail } from "@/components/hud/TierRail";
import { KnowledgePanel } from "@/components/knowledge/KnowledgePanel";
import { HoverTooltip } from "@/components/knowledge/HoverTooltip";

export function HandwrittenShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-hw-theme={theme}
      className="relative h-screen w-screen overflow-hidden bg-[var(--hw-bg)]"
    >
      <svg
        className="absolute inset-0"
        viewBox="-500 -500 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <HandwrittenDefs />
        <PaperBackground />
        {children} {/* ActiveHandwrittenScene */}
      </svg>

      {/* HUD 复用 */}
      <TopBar />
      <SubjectCard />
      <TierRail />
      <KnowledgePanel />
      <HoverTooltip />

      {/* 手绘版独有 */}
      <ThemeToggle />
    </div>
  );
}
```

TierRail 需要小幅扩展（**只增**）让它识别当前在哪个板块：

```tsx
// 在 TierRail 内
const pathname = usePathname();
const isHandwritten = pathname.startsWith("/universe/handwritten");
const routeFor = (t: TierId) => (isHandwritten ? TIER_ROUTES_HANDWRITTEN[t] : TIER_ROUTES[t]);
```

## 7. 过场实现

### 7.1 useHandwrittenTransition

```ts
// src/scenes-handwritten/useHandwrittenTransition.ts
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUniverseStore } from "@/store/useUniverseStore";
import { TIER_ROUTES_HANDWRITTEN, transitionKind } from "@/lib/tier";
import type { TierId } from "@/lib/tier";

export function useHandwrittenTransition() {
  const router = useRouter();
  const currentTier = useUniverseStore((s) => s.currentTier);
  const startTransition = useUniverseStore((s) => s.startTransition);
  const finishTransition = useUniverseStore((s) => s.finishTransition);
  const setTransitionProgress = useUniverseStore((s) => s.setTransitionProgress);

  return useCallback(
    (target: TierId) => {
      if (target === currentTier) return;
      const kind = transitionKind(currentTier, target);

      startTransition(currentTier, target, kind);

      // 触发路由（保持当前板块前缀）
      router.push(`/universe/handwritten/${TIER_ROUTES_HANDWRITTEN[target]}`);

      // 简化过场：固定 1500ms 线性 progress
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1500);
        setTransitionProgress(p);
        if (p < 1) requestAnimationFrame(tick);
        else finishTransition();
      };
      requestAnimationFrame(tick);
    },
    [currentTier, router, startTransition, setTransitionProgress, finishTransition],
  );
}
```

### 7.2 ActiveHandwrittenScene cross-fade

```tsx
// src/scenes-handwritten/ActiveHandwrittenScene.tsx
const { currentTier, transition } = useUniverseStore();
const oldTier = transition.active ? transition.from : null;
const newTier = transition.active ? transition.to : currentTier;
const progress = transition.progress;

return (
  <>
    {oldTier && (
      <g style={{ opacity: 1 - progress, transition: "opacity 50ms linear" }}>
        {sceneFor(oldTier)}
      </g>
    )}
    {newTier && <g style={{ opacity: transition.active ? progress : 1 }}>{sceneFor(newTier)}</g>}
  </>
);
```

## 8. lib/tier.ts 扩展

**只增不破坏**。在文件末尾追加：

```ts
export const TIER_ROUTES_HANDWRITTEN: Record<TierId, string> = {
  T0: "observable",
  T1: "cosmic-web",
  T2: "laniakea",
  T3: "local-group",
  T4: "milky-way",
  T5: "stellar-neighborhood",
  T6: "solar-system",
  T7: "earth",
};

export function isHandwrittenPath(pathname: string): boolean {
  return pathname.startsWith("/universe/handwritten");
}
```

## 9. 性能监控点

```
入场动画期间 → DevTools Performance Profile：
- pathLength 入场 framer 调度：< 30ms / 总入场
- 三级 wobble filter 占用：< 5ms / 帧（首帧后稳定）
- 主线程 long task：≤ 0

稳态：
- DOM 节点数：见 design 文档 § 10
- 切 Tier 总时长：≤ 1800ms（含路由 + 入场）
```

测试方法：

```ts
// scripts/handwritten-dom-budget.mjs（PR 5 加）
// puppeteer 跑过 8 档，每档统计 document.querySelectorAll("svg *").length
```

## 10. PR 拆分

### PR 1 · 文档（已交付）

四份新文档 + 索引 + WORKLOG。

### PR 2 · 骨架（~1 天）

- `src/lib/handwritten-coords.ts` + 单测（≥ 8 例边界）
- `src/lib/handwritten-theme.ts`
- `src/lib/tier.ts` 加 TIER_ROUTES_HANDWRITTEN + isHandwrittenPath（+ 单测）
- `src/store/useHandwrittenStore.ts`
- `src/scenes-handwritten/shared/*`（8 个 primitive 组件）
- `src/scenes-handwritten/ActiveHandwrittenScene.tsx`
- `src/scenes-handwritten/useHandwrittenTransition.ts`
- `src/app/universe/handwritten/layout.tsx` + `page.tsx` + `_shell/*`
- 全 8 个子路由 page.tsx 占位（render `<Tier?Hw />` placeholder）
- `src/components/hud/TierRail.tsx` 扩展为 pathname 感知
- globals.css 加 `--hw-*` 变量与 `[data-hw-theme]` 切换

**验证**：`/universe/handwritten/observable` 可访问，看到纸张背景 + 占位 + HUD + ThemeToggle 切夜/日。

### PR 3 · 场景批次 1（T0 / T1 / T6 / T7，~2 天）

四档构图差异最大的先做。

### PR 4 · 场景批次 2（T2 / T3 / T4 / T5，~2 天）

### PR 5 · 收尾（~0.5 天）

- prefers-reduced-motion 全板块降级（写 `usePrefersReducedMotion` hook，所有 InkPath / WobbleCircle 入场尊重）
- 移动端响应式：SVG `preserveAspectRatio` + KnowledgePanel 移动端切 bottom-sheet（复用 3D 版逻辑）
- Playwright happy path：`/universe/handwritten/observable` → ... → `/earth` 全程不挂
- `scripts/handwritten-dom-budget.mjs`：CI 检查节点数

## 11. 不要做的事

- ❌ 不修改 3D 场景 `src/scenes/*`
- ❌ 不修改 `useUniverseStore.ts` / `useUiStore.ts` 已有字段（只读、只调 setter）
- ❌ 不引入新依赖（zustand persist 用现有版本、framer-motion 已有）
- ❌ 不复制粘贴 marker 坐标——必须 `getTierContent(t).markers`
- ❌ 不在 SVG path d 内嵌业务数据（位置必须经 projectToSvg）
- ❌ 不写 SVG `<text>` 时 inline `font-family`——走 CSS class
- ❌ 不在 `motion.*` 用 layout animation（SVG 内 layout 动画性能很差）
- ❌ 不重写 HUD（HandwrittenShell 注入已有组件）

## 12. DoD（本指南整体）

- [ ] `pnpm typecheck && pnpm lint && pnpm format:check && pnpm test && pnpm lint:content && pnpm build` 全绿
- [ ] `/universe/handwritten/observable → /earth` 全 8 档可访问，HUD + 知识面板 + ThemeToggle 正常工作
- [ ] 3D 版（`/universe/observable`...）功能与视觉**完全不变**（人工眼测 + git diff `src/scenes/`/`src/store/` 应空）
- [ ] reduced-motion 系统设置下，所有 pathLength / fade 入场立即态
- [ ] 每档 SVG DOM 节点 < 1500（脚本验证）
- [ ] mobile Safari/Chrome 实测可用（不要求像素级完美）
- [ ] WORKLOG 写到 Session 12/13/14（按 PR 拆）

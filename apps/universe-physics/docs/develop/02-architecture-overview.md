# 02 — 架构概览

## 1. 仓库结构 (规划)

```
universe-physics/
├── CLAUDE.md
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts                # v4 也可以全用 CSS, 视实际而定
├── docs/                             # 本文档体系
├── public/
│   ├── fonts/
│   ├── textures/                     # 行星纹理等
│   └── icons/
├── src/
│   ├── app/                          # Next App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # /
│   │   └── universe/
│   │       ├── layout.tsx            # 板块级 layout (持久 Stage)
│   │       ├── page.tsx              # /universe 入口
│   │       ├── observable/page.tsx
│   │       ├── cosmic-web/page.tsx
│   │       ├── laniakea/page.tsx
│   │       ├── local-group/page.tsx
│   │       ├── milky-way/page.tsx
│   │       ├── solar-system/
│   │       │   ├── page.tsx
│   │       │   └── [planet]/page.tsx
│   │       └── _components/          # 板块私有组件
│   │
│   ├── scenes/                       # 3D 场景 (Tier 一一对应)
│   │   ├── tier0-observable/
│   │   ├── tier1-cosmic-web/
│   │   ├── tier2-supercluster/
│   │   ├── tier3-cluster/
│   │   ├── tier4-galaxy/
│   │   ├── tier5-stellar-neighborhood/
│   │   ├── tier6-solar-system/
│   │   └── tier7-planet/
│   │
│   ├── camera/                       # 相机系统
│   │   ├── CameraRig.tsx
│   │   ├── transitions/              # 三种过场实现 (zoom / dissolve / tunnel)
│   │   └── useCameraTimeline.ts
│   │
│   ├── components/
│   │   ├── ui/                       # 基础 UI (Button, Panel, Sheet, ...)
│   │   ├── hud/                      # Stage 上的 HUD
│   │   ├── knowledge/                # 知识面板
│   │   ├── motion/                   # Framer Motion 封装
│   │   └── layout/
│   │
│   ├── content/                      # 静态内容 (见 design/05)
│   │   ├── cosmos/
│   │   └── stories/
│   │
│   ├── lib/
│   │   ├── tier.ts                   # Tier 元信息与切换逻辑
│   │   ├── coords.ts                 # 各 Tier 局部坐标工具
│   │   ├── format.ts                 # 数字 / 单位格式化
│   │   ├── content.ts                # MDX/JSON 加载与校验
│   │   └── schemas/                  # Zod schemas
│   │
│   ├── store/                        # Zustand stores
│   │   ├── useUniverseStore.ts
│   │   └── useUiStore.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css                # CSS variables
│   │
│   └── types/                        # 全局共享类型
│
├── scripts/                          # 内容 lint、bundle check、etc.
├── tests/
│   ├── unit/                         # vitest
│   └── e2e/                          # playwright
└── .github/
    └── workflows/                    # CI
```

## 2. 模块边界

四层不可串味：

| 层                                                  | 职责                            | 不允许                      |
| --------------------------------------------------- | ------------------------------- | --------------------------- |
| **Data** (`content/`, `lib/schemas`, `lib/content`) | 加载、校验、暴露数据            | 不依赖 React/Three          |
| **Domain** (`lib/tier`, `lib/coords`, `lib/format`) | 业务逻辑：尺度、单位、坐标      | 不渲染、不订阅 store        |
| **State** (`store/`)                                | 当前 Tier / 相机意图 / 面板开关 | 不直接读 Three 对象         |
| **View** (`scenes/`, `components/`, `app/`)         | 渲染与交互                      | 不写业务规则；规则调 Domain |

如果一段代码同时跨两层，就拆。

## 3. 状态模型

```ts
// useUniverseStore — 全局唯一
type UniverseState = {
  currentTier: TierId; // 当前所在 Tier
  targetObjectId: string | null; // 正在聚焦的对象
  transition: {
    active: boolean;
    from: TierId | null;
    to: TierId | null;
    kind: "zoom" | "dissolve" | "tunnel" | null;
    progress: number; // 0..1
  };
};

// useUiStore
type UiState = {
  panelOpen: boolean;
  panelContentId: string | null;
  reducedMotion: boolean;
};
```

相机本身的 transform **不进 store**，避免高频 re-render。相机由 R3F + GSAP 直接管，store 只持 "意图"。

## 4. 路由 / 场景的对应关系

App Router 的 `layout.tsx` 在 `/universe` 这一层挂持久的 R3F `<Canvas>`。子路由切换时**Canvas 不卸载**，只是切场景组件。这是跨页保持相机动画连续的关键。

```
/universe/* (layout.tsx)
  └── <Canvas>
        <SceneSwitcher tier={currentTier} />
        <CameraRig />
        <PostFx />
      </Canvas>
  └── <HUD />
  └── <KnowledgePanel />
```

页面级 `page.tsx` 只做两件事：

1. 读 URL 决定要切到哪个 Tier。
2. 用 `useEffect` 把 store 的 `currentTier` 同步过去。

不在 page 里直接渲染 3D。

## 5. 资源加载策略

- 每个 Tier 的资源 (纹理、模型、点云) 放在自己的 `scenes/tierN-*/assets.ts`。
- 用 `React.lazy` + `Suspense` 按 Tier 切片代码。
- 进入新 Tier 之前 ~ 200ms 预热下一 Tier 的资源 (在过场 tunnel/dissolve 期间)。
- 第一屏只加载 T0 + 入站动画所需，初始 JS 预算见 `05-performance-budget.md`。

## 6. 错误处理

边界：

- 内容 JSON 校验失败 → 构建时报错 (Zod parse)，不让 ship 上线。
- 资源加载失败 → 在该 Tier 内渲染 fallback (低多边形占位 + 一个 toast)，**不**白屏。
- WebGL 不可用 → 全站降级到一个简化 SVG/Canvas 版的 "scale ladder explorer"。Phase 2 再做。

## 7. 国际化

Phase 1：单语 (中文为主，英文专有名词并列)。**不**引入 i18n 框架。
Phase 2：再评估 next-intl / paraglide。

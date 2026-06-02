# 03 — 工程规范

## 1. 命名

- 文件：`kebab-case.ts`、组件文件 `PascalCase.tsx`。
- 类型 / 接口：`PascalCase`，不要 `I` 前缀。
- 变量 / 函数：`camelCase`。
- 常量：`UPPER_SNAKE_CASE` 仅用于真常量；运行时配置一律 camelCase。
- React Hook：`use*`。
- Zustand store：`useXxxStore`。
- 自定义事件名：`tier:enter`、`camera:settle` —— 冒号分组。

## 2. 文件大小与拆分

软上限：

- 组件 `.tsx`：300 行。
- 工具 `.ts`：300 行。
- Scene 文件：500 行 (含 useFrame 等紧密耦合逻辑)。

超过就拆。**不要**用「private 内部函数」逻辑模拟模块边界；该建文件就建文件。

## 3. 组件分类

| 类型                                      | 命名          | 位置                        |
| ----------------------------------------- | ------------- | --------------------------- |
| **UI primitive** (Button / Panel / Sheet) | 基础名        | `src/components/ui/`        |
| **HUD piece** (TierIndicator, ScaleBar)   | 描述名        | `src/components/hud/`       |
| **Panel section** (KnowledgePanelHeader)  | 描述名        | `src/components/knowledge/` |
| **Scene** (Tier3Cluster)                  | TierN + 内容  | `src/scenes/tierN-*/`       |
| **App-level** (Page)                      | Next 文件约定 | `src/app/.../page.tsx`      |

一个组件做一件事。需要 > 6 个 props 时考虑拆或者用 context。

## 4. Props 与可读性

- 必填在前，可选在后。
- 布尔 prop 名要肯定式：`open` 不是 `notOpen`。
- 同一 prop 不要既接受 string 又接受 enum；选一种。
- 用 discriminated unions 表达"几种模式"，不要 `if (modeA) {...} else {...}`。

## 5. Three / R3F 规约

- 所有 R3F 节点放在 `'use client'` 文件里，且通过 `next/dynamic({ ssr: false })` 引入到 page。
- **不**在 `useFrame` 里 setState；用 ref 直接改对象。
- 几何体 / 材质能 `useMemo` 就 memo，避免每帧重建。
- 卸载时释放 GPU 资源 (`dispose()` / `drei` 的 helper)。
- 单位约定写在 scene 的顶部注释里 (例：`// All distances in Mpc. Camera at (0,0,12).`)。

## 6. 动画规约

详见 `04-animation-strategy.md`。简版规则：

- Camera / Three 对象 → **GSAP**。
- DOM / HUD / Panel → **Framer Motion**。
- 缓动统一 `cubic-bezier(0.22, 0.61, 0.36, 1)`，例外要写明理由。
- 所有 > 200ms 的动画必须支持 `prefers-reduced-motion` (跳切版本)。

## 7. 注释

默认**不写**。需要写时只回答：

- **为什么** (业务约束、外部 bug workaround、性能权衡)。
- **不变量** (这个数组永远长度为 3，因为 ...)。

**禁止**写"这个函数干什么"——名字就该说清。

## 8. Git

- 主分支：`main`。功能分支：`feat/short-name`、修：`fix/short-name`、文档：`docs/short-name`、内容：`content/short-name`。
- Commit 信息英文，Conventional Commits：`feat:` / `fix:` / `docs:` / `refactor:` / `perf:` / `chore:`。
- PR 模板需要：变更摘要、截图/录屏 (如果是 UI/动画)、测试方式。
- 不强制 squash；保留分支历史，方便回看决策。

## 9. 测试

| 类型     | 工具                     | 范围                                             |
| -------- | ------------------------ | ------------------------------------------------ |
| 单测     | Vitest                   | `lib/*` 中的纯函数 (单位换算、tier 工具、schema) |
| 组件测试 | Vitest + Testing Library | UI 基础组件 (Button, Panel)                      |
| e2e      | Playwright               | 关键尺度切换 happy path                          |
| 视觉回归 | 暂不做                   | Phase 2 评估                                     |

Phase 1 没 100% 覆盖率指标，但 `lib/*` 单测必须有。

## 10. 内容校验

- `scripts/lint-content.mjs` 用 Zod 校验 `src/content/cosmos/**/*.json`。
- 校验项：见 `docs/design/05-content-and-data-model.md` §7。
- CI 必跑。

## 11. CI

GitHub Actions：

1. `pnpm install --frozen-lockfile`
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm lint:content`
5. `pnpm test`
6. `pnpm build`

任何一步失败 → 红。`main` 分支强制 PR + 至少 1 个 review (单人项目时也保留 self-review)。

## 12. 性能门槛

详见 `05-performance-budget.md`。

提交大改动 (新 Tier 场景、新动画) 前自查：

- Chrome DevTools Performance 录 5s 主交互，主线程 frame > 16.6ms 帧数 < 5%。
- 进入 Tier 的 LCP < 2.5s (mid-tier laptop, throttled to "Fast 3G")。

## 13. 安全 / 隐私

- 静态站，无后端，无用户数据 — 但仍然：
  - CSP header (Vercel 配置)。
  - 没有第三方追踪脚本。Phase 1 不接 Analytics。Phase 2 引入 plausible / vercel analytics (匿名)。
  - 不在仓库里放任何 secret；不需要 `.env` 也不要创建。

# 05 — 性能预算

## 1. 设备基线

| 等级           | 代表设备                | 目标 fps                 |
| -------------- | ----------------------- | ------------------------ |
| Desktop (high) | M2 MacBook Pro, RTX 30+ | 60                       |
| Desktop (mid)  | M1 Air, integrated GPU  | 60 (允许部分场景降到 45) |
| Tablet         | iPad Air 5              | 60                       |
| Mobile (high)  | iPhone 13+              | 30                       |
| Mobile (mid)   | Pixel 6a                | 30 (允许 24, 启用降级)   |

低端移动设备允许"降级体验"，但**不允许白屏**。

## 2. 初始加载预算

第一屏 (`/`, splash + 即将切到 `/universe/observable`)：

| 类型                              | 上限      | 备注                                        |
| --------------------------------- | --------- | ------------------------------------------- |
| HTML                              | < 20 KB   |                                             |
| **Shared initial JS** (gzip)      | < 220 KB  | `build-manifest.json` 的 root+polyfill 总和 |
| Single chunk max (gzip)           | < 260 KB  | 容纳 Three.js / R3F 必然偏大的合并 chunk    |
| Total chunks (warn)               | < 1500 KB | 全 app surface，超过仅警告，不挂 CI         |
| Initial CSS (gzip)                | < 30 KB   | Tailwind v4 内联，多数路由为 0 KB           |
| Fonts (subset)                    | < 80 KB   |                                             |
| Initial textures                  | < 200 KB  | Splash / T0 不加载行星贴图                  |
| **Time to first frame** (Desktop) | < 1.5 s   |                                             |
| **LCP** (Desktop)                 | < 2.5 s   |                                             |
| **LCP** (Mobile)                  | < 3.5 s   |                                             |

口径说明：旧版「Initial JS < 250 KB」其实是路由共享 chunk 的合理上限；现版的
`scripts/bundle-check.mjs` 读 Next.js build manifest 的 `rootMainFiles` +
`polyfillFiles`（真正的 shared by all），所以比直接把 `.next/static/chunks/`
全加起来要准确得多。`Total chunks (warn)` 是兜底警告，不挂 CI。

Three / R3F / GSAP 等大块体积通过 dynamic boundary 推到 `/universe/*` 与
`/physics/*` 路由，避免污染 splash 的 shared chunk。

## 3. 单 Tier 预算

| Tier           | Draw calls | 顶点数          | 纹理总和           | 内存 (GPU) |
| -------------- | ---------- | --------------- | ------------------ | ---------- |
| T0/T1 (大尺度) | < 30       | < 200k (点云)   | < 5 MB             | < 80 MB    |
| T2/T3          | < 80       | < 500k          | < 15 MB            | < 150 MB   |
| T4 (星系)      | < 60       | < 1M (主要点云) | < 20 MB            | < 200 MB   |
| T6 (太阳系)    | < 100      | < 800k          | < 40 MB (行星纹理) | < 250 MB   |
| T7 (行星)      | < 40       | < 200k          | < 30 MB            | < 200 MB   |

超出预算 → review 必拦。

## 4. 帧率保证

- 主线程 long task (> 50ms) ≤ 1 / 5 秒。
- 每帧 Three render 时间 < 8ms (Desktop) / < 16ms (Mobile)。
- `useFrame` 内部禁止 `JSON.parse` / 大数组分配 / `setState`。
- 频繁更新的 attribute 用 `setUsage(THREE.DynamicDrawUsage)`。

## 5. 资源处理流程

1. 纹理：用 **`sharp` / `squoosh`** 预压缩到 KTX2 (basis) 或 WebP。
   - Diffuse：1024×1024 (近距用 2048)。
   - Normal：512×512。
2. 模型：glTF → `gltfpack` (Draco 压缩，去无用 mesh)。
3. 字体：subset 中文常用 3500 字 + ASCII，分片按需加载。
4. JS：Next 自动 code-split + tree-shake。手动检查 `dynamic` 边界。

## 6. 监控

开发期：

- React Profiler (commit < 16ms)
- Three stats overlay (开关由 `?stats=1` query 控制)
- Lighthouse CI on PR (脚本待加)

生产期 (Phase 2)：

- Vercel Analytics web-vitals
- 自建 RUM (轻量) 收集 fps 分布、tier 切换耗时

## 7. 降级策略

自动触发条件 (任一)：

- 连续 60 帧 fps < 45 (Desktop) / < 24 (Mobile)
- `navigator.deviceMemory` < 4
- `navigator.hardwareConcurrency` < 4 (Mobile)

触发后：

1. 关闭 Bloom / DoF
2. DPR 上限 1
3. 粒子数 ×0.5
4. Post-processing → 只保留 Vignette
5. 通知用户 (右下小 toast)，可一键切回 (本会话有效)

## 8. 性能回归红线

- 任何 PR 让 initial JS 增加 > 20 KB → 需要 ADR 说明。
- 任何 PR 让某 Tier 的稳态帧率下降 > 10% → 必须修。
- Lighthouse Performance 分数下降 > 5 → 必须修。

## 9. 监测脚本 (待实现)

- `scripts/bundle-check.mjs` — 跑 next build，按路由解析 chunk 大小，超阈值报错。
- `scripts/audit-lighthouse.mjs` — 起本地 server，跑 lighthouse，输出 JSON。
- `scripts/perf-snapshot.mjs` — 录 5s 关键交互，输出 fps / long task / draw call 报告。
- `scripts/handwritten-dom-budget.mjs` — puppeteer 跑过 `/universe/handwritten/*` 8 档，统计每档 `<svg>` 子节点数，超阈值（默认 1500）报错。

## 10. 手绘宇宙板块预算

`/universe/handwritten/*` 是纯 SVG + framer-motion，不走 WebGL。预算分项：

| 项                                               | 上限                               |
| ------------------------------------------------ | ---------------------------------- |
| 单档 SVG DOM 节点                                | < 1500 个 element                  |
| 单档 `<path>` 元素数                             | < 200                              |
| 单档 framer `motion.*` 包裹元素                  | < 80（其余用 `motion.g` 批量调度） |
| Bundle JS gzip (`/universe/handwritten/*` chunk) | < 80 KB（不含 framer-motion）      |
| 入场动画总时长                                   | ≤ 2000ms                           |
| 帧率（入场动画期间）                             | desktop ≥ 50fps / mobile ≥ 24fps   |
| reduced-motion 系统设置下                        | 所有动画立即态、无中间过渡         |

降级触发条件复用 § 7：低端设备自动 `useHandwrittenStore.setFlourishes(false)`，关闭罗盘 / 卷轴 / 装饰动画，只保留主体与 marker。

## 11. 3D 升级（Phase 1.5）后的预算调整

P0 / P1 完成后，单 Tier 预算变化（详见 [`07-3d-implementation-plan.md`](./07-3d-implementation-plan.md) § 10）：

| Tier | 旧 Draw Call | 新（P0 后） | GPU 内存（P1 后）                                  |
| ---- | ------------ | ----------- | -------------------------------------------------- |
| T0   | < 30         | < 35        | < 85 MB                                            |
| T6   | < 100        | < 110       | < 290 MB（含 8 行星贴图 KTX2）                     |
| T7   | < 40         | < 45        | < 230 MB（含 Blue Marble + Black Marble + Clouds） |

T6/T7 的真贴图体积**异步加载**，不计入初始 bundle；进入 `/universe/solar-system` 或 `/universe/earth` 路由时按需 fetch。

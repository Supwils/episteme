# WORKLOG — universe-physics

> 每次会话结束**必须**更新这份文件。下一个代理 / 协作者上来要能直接从这里读到上下文与接力点。

格式：倒序排列 (最新在上)，每段包含：日期、参与者、本次完成、下次开始、未决问题。

---

## 2026-05-17 — Session 27.5 · T2/T5/T6 markers 补全 + Proxima 耀斑彩蛋

**参与**：用户 + Claude (Opus 4.7)

**目标**：Session 27 把新主题做到 T0/T1/T3/T4/T7/P4/P7，但 T2/T5/T6 这三档的新内容（Shapley basin · Barnard · TRAPPIST-1 · Europa · Voyager 1）也都没接到 marker。本轮一次性补齐，并加第三个自然现象彩蛋——Proxima Cen 耀斑闪烁。

### 本次完成

**Markers（+5 cosmos）**

| 档  | 新增 marker     | 锚点                                                          |
| --- | --------------- | ------------------------------------------------------------- |
| T2  | `shapley-basin` | Pomarède 2024 · CF4 · Laniakea 外的下一个引力中心 (~200 Mpc)  |
| T5  | `barnards-star` | 5.96 ly · 10.3 ″/yr 最大自行 · ESPRESSO 2024 Barnard b        |
| T5  | `trappist-1`    | 40.66 ly · 7 颗岩石行星 · e/f/g 宜居带 · JWST b/c/d 大气探测  |
| T6  | `europa`        | Galileo 1998 感生磁场 · ~100 km 海洋 · Europa Clipper (2024)  |
| T6  | `voyager-1`     | 1977 发射 · 2012-08-25 穿越 heliopause · 现 ~165 AU · 17 km/s |

至此 cosmos 8 档每档 markers 数：T0=7, T1=8, T2=7, T3=8, T4=8, T5=8, T6=8, T7=6。

**Proxima 耀斑彩蛋（T5Scene.tsx）**

- `Tier5Scene` 加 `flareRef` group，里面两层 `<StarPoints>`（核 110px + halo 260px）都 opacity = 0 起始
- module 顶级 `PROXIMA_POS` 常量：从 STARS 表查 proxima-cen 后直接 equatorial→scene 换算，避免 useMemo 与 react-hooks compiler 的 `preserve-manual-memoization` 冲突
- useFrame schedule：每 14s 一次 Gaussian spike（width 0.04s, peak 1.6×），其余时间 quiescent 0.04 baseline；group scale 同步 0.85→1.55 浮动
- `reducedMotion = true` 锁到常亮 0.35，去掉 spike 与 scale 跳动；marker 仍指向「这颗是 flare star」

**关键决策**

- 第一版 `proximaPos` 用 useMemo + `Float32Array(...)` 触发 React 19 compiler 的 `preserve-manual-memoization` —— compiler 不愿意 preserve 这个组合
- 改为 module 顶级 IIFE 常量后零警告。结论：与 props/state 无关的派生数据直接走 module scope，比 useMemo 更干净也更对编译器胃口

### 校验

- `pnpm typecheck` ✅
- `pnpm lint` ✅（0 warnings）
- `pnpm format` ✅
- `pnpm lint:content` ✅（20/20，新 5 个 marker 全过 schema）
- `pnpm test` ✅（67/67）
- `pnpm build` ✅（31 routes）

### 下次开始

沿用 Session 27 的待办：Playwright e2e · KTX2 纹理 · Vercel 部署 · 性能 profile + 真 LOD/instancing。markers ↔ 内容同步债已基本清完。

---

## 2026-05-17 — Session 27 · 内容-场景同步：补 14 个 markers + 2 个自然现象彩蛋 + 资产 credits 集中化

**参与**：用户 + Claude (Opus 4.7)

**目标**：Session 25 把 universe + physics 内容深化到百科级后，3D / 手绘场景里的 markers 没跟上；本轮把代表性新主题（暴胀 / 再电离 / N体模拟 / WHIM / Local Sheet / GSE / Galactic Fountain / 球状团 / 地球内核 / 板块构造 / 量子隧穿 / 路径积分 / 电弱 Sphaleron / 渐近自由）落到 marker 上，让 3D 场景能 hover 出对应解释。同时加 2 个自然现象彩蛋（T6 太阳脉动 + 闪 flare、T7 极光卵带）做视觉点睛；最后把资产 / 字体 / 数据 / 依赖 license 整理为一份 asset-credits.md 集中索引。

### 本次完成

**内容 ↔ 场景 markers 同步（+14）**

| 档  | 新增 marker                               | 关键科学锚点                                                                  |
| --- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| T0  | `inflation-bmode`, `reionization-bubbles` | BICEP/Keck r < 0.036 · ≥60 e-folds · Bosman 2022 z ≈ 5.3                      |
| T1  | `n-body-node`, `whim-filament`            | Millennium 10¹⁰ / FLAMINGO 3×10¹¹ 粒子 · Macquart 2020 FRB DM                 |
| T3  | `local-sheet`, `gse-debris`               | Tully 2008 厚 1.5 Mpc 薄片 · 270 km/s 朝 Virgo · Helmi 2018 GSE 8-10 Gyr 并合 |
| T4  | `galactic-fountain`, `omega-cen`          | HI4PI 21cm HVC · 100-400 km/s 回落 · ω Cen 10⁷ stars · Harris 2010            |
| T7  | `inner-core`, `plate-tectonics`           | Lehmann 1936 内核 · 330-360 GPa · Vine-Matthews 1963 · Wilson cycle           |
| P4  | `tunneling`, `path-integral`              | Gamow 1928 · STM Binnig-Rohrer 1981 · Feynman 1948 · ℏ→0 给出 P0              |
| P7  | `sphaleron`, `asymptotic-freedom`         | KRS 1985 ΔB+L = ±3 · Sakharov 三条件 · α_s(m_Z) = 0.1179 · Nobel 2004         |

P4 / P7 的物理 markers 沿用 `var(--hw-*)` CSS 变量颜色（physics 不入 schema 校验，与现有约定保持一致）；cosmos 全用 hex 通过 schema。

**自然现象彩蛋**

- `Tier6Scene` 太阳：在 VolumeBillboard 之上加一层 `flareRef` mesh（半径 0.032，additive blending），useFrame 内做 `0.18 + 0.06·sin(0.28·t)` 慢呼吸 + 每 18 s 一次 Gaussian flare spike (`width=0.04`)，整体落回到 [0, 0.45+] opacity 区间。`reducedMotion` 直接锁到 0.18 常亮。
- `Tier7Scene` 极光：南北极上各一只 `torusGeometry` (R=0.39, r=0.018) 悬在云层上方 (Y=±0.92)。颜色：北 OI 绿 `#7affb4`，南 N₂⁺ 偏蓝 `#86b4ff`。`useFrame` 做 `0.45 + 0.18·sin(0.42·t)` 呼吸 + 每 28 s 一次「亚暴」尖峰 (1.6× 峰、半宽 0.04)；两极反向缓转模拟磁地方时漂移。`reducedMotion` 锁到固定 0.5。

**资产 credits 集中化**

- 新 `docs/develop/asset-credits.md`：行星纹理 (Solar System Scope CC BY 4.0) · 字体 (Fraunces / Inter / JetBrains Mono OFL) · universe 14 个高密度引用 · physics 10 个里程碑 · 算法实现 (AME2020 / Gamow / IMR / RGE) · 工程依赖 license 摘要（含 GSAP 免费层提醒）· 更新流程
- `docs/README.md` 在 develop 表追加 asset-credits.md 行
- `CLAUDE.md` 新增 §6「资产与版权」短节，把根 README 与 docs 都指过去；原 §6 改为 §7
- 行星纹理 `public/textures/planets/CREDITS.md` 不动，作为「逐文件映射表」继续存在；两份是 source of truth + 元层 index 的关系

**性能（task #5）：延后到 Session 28**

T1 cosmic-web 7 层、T2 流线、T3 disc/sat/dwarf 等都已通过 StarPoints 把每层合并到单 BufferGeometry 单 drawcall——已是 instancing 之上的最优形态。T6 行星各带 unique texture + ShaderMaterial，instanced material 投资回报低。在没有 Stats.js / Spector.js 性能 profile 前不做投机优化。

### 校验

- `pnpm typecheck` ✅
- `pnpm lint` ✅（0 warnings）
- `pnpm format:check` ✅（修了 2 个 prettier 行内问题后）
- `pnpm lint:content` ✅（20/20 schema 全过；新加 14 个 marker 都满足 unique-id / position-bound / hex / desc≥10 chars 规则）
- `pnpm test` ✅（67/67，未加新测试）
- `pnpm build` ✅（31 routes 全 SSG）
- `pnpm bundle-check --skip-build` ✅
  - Shared initial JS: 167.9 KB / 220 KB（无变化）
  - Largest single chunk: 224.2 KB / 260 KB
  - Total chunks: 1067 KB / 1500 KB warn

### 关键决策

1. **markers 加而不动现有 position**：所有新 marker 全部找 8/Mpc/AU 单位下未被占用的空间格，避开与现有 marker 重叠 (T7 inner-core 用 Z=0.5 而非 0,0,0 是因为 0,0,0 已被 earth-surface 隐式占)。位置全部 |x|, |y|, |z| ≤ 1.2 (T7 plate-tectonics 用 -0.95)，远在 schema 上限 ±10 之内。
2. **物理板块 markers 沿用 CSS var 颜色**：Session 25 已经定下不入 schema 校验的视觉规范；本次新增的 P4 / P7 4 个 marker 沿用，统一性 > schema 一致性。等未来真要把 physics 入 schema，再批量迁移这些 CSS var 到对应 dark/night palette 的 hex。
3. **太阳 flare / 极光用 `material.opacity` 而非 shader uniform**：极光与太阳 flare 都用 `meshBasicMaterial`，opacity 是 plain field，useFrame 直接赋值 0 开销；如果改成自定义 shader 需要走 uniform 通道 + uniformsNeedUpdate，复杂度大跳一档。彩蛋本质是 brightness 调制，不值得上 shader。
4. **flare / aurora 都做 reducedMotion 锁定**：a11y 一致性。太阳锁到基线 0.18、极光锁到 0.5（北极/南极不再反向漂移、不再尖峰）。视觉上仍可见结构，不闪烁。
5. **asset-credits.md 不复制纹理 CREDITS.md 的逐文件表**：避免双源、避免漂移。这里只做元层 index + license 摘要 + 更新流程。
6. **性能任务延后是产品判断而非偷懒**：StarPoints 已是单 drawcall，盲改 instancing 大概率零收益 + 引入回归风险。等 PerfMonitor 真触发降级或用户报卡顿，再带着 profile 数据下手。

### 下次开始

1. **Playwright e2e**（Session 26 #1 未做）：完整尺度链 happy path + physics 板块翻页 + atlas 跨档跳转；装 `@playwright/test`，写 `e2e/universe.spec.ts` / `e2e/physics.spec.ts`，加 CI step
2. **KTX2 纹理转换**（Session 26 #2）：12 张 JPG → KTX2 basis (~60% gzip 后再压)；`scripts/encode-textures.mjs` + fallback loader；先在 `<Planet>` 里允许 KTX2 优先 JPG 兜底
3. **Vercel 部署**（Session 26 #3）：连 GitHub repo → Vercel project + 首次 production deploy + 自定义域；连同实测 CSP 在 vercel 域名下的表现（特别是 `*.vercel.app` 与 vercel insights script）
4. **手绘场景同步 markers**：本轮只更新了 3D 场景的 markers；handwritten SVG 场景没动。如果要给手绘也补对应符号，需要先确认 `HandwrittenMarker` 当前 variants 是否够用
5. **性能 profile + 真 LOD/instancing**：装 Stats.js + Spector.js，对 T1/T6/T7 各档跑一遍，找到真正 > 8ms/frame 的 path 再下刀
6. **资产 credits 一致性巡检**：扫一遍所有 `src/content/cosmos|physics/*.ts` 的 sources 是否都在 asset-credits.md 第 3-4 节出现；现在还是手动维护，未来可以写个 `scripts/lint-credits.mjs` 做静态比对

### 未决问题

- 极光 torus 在 reducedMotion 下虽锁定 opacity 但仍 GPU 渲染——若 lowest tier 需要彻底关掉，需要给 `qualityTier === "low"` 加一个跳过分支
- 太阳 flare spike 周期是固定 18s（硬编码），多个 tab 同时存在时会同步闪光；本身不是 bug 但可在 useMemo 里加一个 per-mount 随机相位让多 tab 错开
- 物理 markers 颜色用 CSS 变量串，3D 场景下 Three.js 解析这个字符串会 fallback 到 black/white——P0-P8 当前**只在手绘场景里**有 markers 渲染，3D 没有 physics 场景，所以现状无影响；但若以后给 physics 加 3D scene 需要把 var() 转 hex
- asset-credits §4 physics 列表是「示意性高密度引用」，不是完整清单——下次最好对照 `P*.ts` sources 字段做一次去重/补全

---

## 2026-05-17 — Session 26 · 上线准备：CSP + bundle-check 进 CI + 对外 README

**参与**：用户 + Claude (Opus 4.7)

**目标**：把"内容已经百科级"的项目推到"可一键上线"的状态。三件事一次性完成：CSP/安全头、bundle-check 进 CI、完整对外 README。

### 本次完成

**CSP + 安全头（`next.config.ts`）**

- Content-Security-Policy：default-src 'self' / frame-ancestors 'none' / object-src 'none' / form-action 'self' / img-src 'self' data: blob: / worker-src 'self' blob:（为未来 KTX2 留口）/ script-src 在 prod 去掉 unsafe-eval、dev 保留（Next.js Fast Refresh 需要）/ style-src 保留 unsafe-inline（Tailwind v4 + Framer Motion 需要）
- 其它 6 个 hardening header：X-Frame-Options DENY / X-Content-Type-Options nosniff / Referrer-Policy strict-origin-when-cross-origin / Permissions-Policy 关闭 camera/microphone/geolocation/interest-cohort/browsing-topics/payment / Cross-Origin-Opener-Policy same-origin / Cross-Origin-Resource-Policy same-origin
- 长缓存：`/textures/*` 与 `/_next/static/*` 加 `Cache-Control: public, max-age=31536000, immutable`

**bundle-check 进 CI**

- `scripts/bundle-check.mjs` 重构：
  - 加 `--skip-build` 模式：CI 已经在 `Build` step 跑过 `next build`，bundle-check 复用 `.next/`，省 30+ 秒
  - **真"shared initial JS"口径**：旧版把 `.next/static/chunks/` 所有 JS 加起来当 initial JS，与现实严重不符（Three.js+R3F 注定有 ~200 KB gzip 单 chunk）；新版读 `build-manifest.json` 的 `rootMainFiles + polyfillFiles` 总和，这是真正"每个路由都加载"的字节
  - 新预算：shared initial JS < 220 KB（实测 167.9 KB）/ 单 chunk < 260 KB（实测 223.9 KB）/ 总 chunks < 1500 KB（实测 1064 KB，warn 级，非 violation）
  - `collectFiles` 加 dir 不存在容忍（Tailwind v4 不输出 `.next/static/css`）
- `.github/workflows/ci.yml` 加 `Bundle size budget` step：`pnpm bundle-check --skip-build`
- `docs/develop/05-performance-budget.md` 更新 § 2 反映新口径与新预算

**对外 README**

- 整页重写。包含：
  - tier 链路 ASCII 示意（T0 → T7）+ physics 板块列表
  - 7 项特性（持久 canvas / 真实科学数据 / 行星真贴图 / 手绘双轨 / 百科级文字 / A11y / CSP）
  - Quickstart + 全 14 个脚本说明
  - 项目结构（src 目录树带注释）
  - 技术栈表
  - 性能预算摘要
  - 部署提示
  - 资产 credits（Solar System Scope CC BY 4.0 + 字体 OFL）
  - 文档入口（CLAUDE.md → docs/design → docs/develop → WORKLOG 8 步路径）
  - License 分层

### 校验

- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm format:check` ✅
- `pnpm lint:content` ✅（20/20）
- `pnpm test` ✅（67/67）
- `pnpm build` ✅（31 routes）
- `pnpm bundle-check --skip-build` ✅
  - Shared initial JS: **167.9 KB** / 220 KB
  - Largest single chunk: **223.9 KB** / 260 KB（Three.js 主 chunk）
  - Total chunks: **1064 KB** / 1500 KB warn

### 关键决策

1. **CSP 留 style-src 'unsafe-inline'**：Tailwind v4 与 Framer Motion 都注入 inline styles；用 nonce 需要 server component 改造，得不偿失。script-src 在 prod 严格化（去掉 unsafe-eval），dev 保留。
2. **bundle-check 改"shared initial JS"口径**：旧版把全部 chunks 总和当 initial 是错的——Next.js 把 17 个 tier 拆成单独 chunk，访问 `/universe/observable` 时不会加载 `/physics/frontier` 的 chunk。改用 `rootMainFiles + polyfillFiles` 这才是真正每条路由都付的 first-load 代价。
3. **单 chunk 上限 260 KB 而非 100 KB**：Three.js + R3F + drei + postprocessing 即便 tree-shake 后单 chunk 也会到 ~220 KB gzip。设 260 KB 给增长 ~20% 空间，超就需要 ADR。
4. **bundle-check 总和不挂 CI，只 warn**：超 1500 KB 才警告，给"加新场景/新内容"留增长曲线，但提供反馈防止失控。
5. **`Cache-Control: immutable` 给 textures**：12 张行星 JPG 总 ~7 MB，文件名固定（非 hash），靠 immutable + 长 max-age 让浏览器与 CDN 复用；如果未来换 KTX2 也无需改 header。

### 下次开始

1. **Playwright e2e**：完整尺度链 happy path + physics 板块翻页 + atlas 跨档跳转。装 `@playwright/test`，写 `e2e/universe.spec.ts` / `e2e/physics.spec.ts`，加 CI step。
2. **KTX2 转换**：12 张 JPG → KTX2 basis（gzip 后再压 ~60%）；用 `toktx` 或 `@gltf-transform/cli`，把脚本放 `scripts/encode-textures.mjs`，加 fallback loader。
3. **Vercel 部署**：项目已具备一键部署条件（CSP 在 config / 路由全 Static / 无 server runtime）。需要做的是连 GitHub repo → Vercel project + 触发首次 production deploy + 自定义域（可选）。
4. **markers 与场景同步**：本轮内容百科化后，3D / handwritten 场景内的 marker 数量与位置未跟进，可以为新主题（如 T0 暴胀、T7 内部结构、P4 隧穿）加新 marker。
5. **资产 credits 入到 docs**：CLAUDE.md / docs/README.md 把 `public/textures/planets/CREDITS.md` 引用进去。
6. **Splash 路由的 first-load 分析**：build manifest 没有 app-build-manifest 给逐路由 chunk，未来可改 bundle-check 直接解析 `next build` 的 stdout table（每路由 First Load JS 值）。

### 未决问题

- CSP 在 Vercel 部署后需要实测：Vercel 自己注入的 `_vercel/insights/script.js` 会被 `script-src 'self'` 拦掉，到时需要给 `*.vercel.app` 开口或关 analytics
- Cross-Origin-Resource-Policy `same-origin` 会阻止外站 hotlink 我们的 textures 与 chunks——这是想要的，但需在部署后验证 SEO 抓取（Googlebot 不受 CORP 限制，应当 OK）
- 性能预算文档 § 5 提到 "纹理：用 sharp / squoosh 预压缩到 KTX2 (basis) 或 WebP"——目前 JPG 直接走，KTX2 还没做（见下次开始 #2）

---

## 2026-05-17 — Session 25 · 百科级内容深化（universe + physics 全档）

**参与**：用户 + Claude (Opus 4.7) + 2 个并行 subagent

**目标**：把 8 个 universe tier 与 9 个 physics tier 一次性扩展到「能撑得起百科」的深度与广度，覆盖人类已知物理与宇宙学的主要主题，保持专业 + 易懂 + 形象。

### 本次完成

**Universe（T0-T7，subagent 1 并行）**

- T0 可见宇宙：暴胀 · 把宇宙拉平的最初瞬间 / 宇宙学距离阶梯 / 再电离 · 第一道光（+3 段、+4 cards、+3 sources：SH0ES Riess 2022 / BICEP-Keck 2021 / Bosman 2022）
- T1 宇宙纤维：N 体模拟 · 10¹⁰ 颗粒子重做宇宙 / 二点关联函数与 bias（+3 cards、+3 sources：Millennium / IllustrisTNG / FLAMINGO）
- T2 Laniakea：超星系团目录 ACO → Einasto / CMB 偶极 · 我们正在动（+4 cards、+2 sources）
- T3 本星系群：邻里之外 Local Sheet / Local Void / 零速度面（+4 cards、+2 sources）
- T4 银河系：薄盘 / 厚盘 / 晕三层时间史 / 棒 + Galactic Fountain（+4 cards、+3 sources）
- T5 恒星近邻：HR 图 · 邻域恒星的体检报告 / TRAPPIST-1 + TOI-700d（+4 cards、+3 sources）
- T6 太阳系：Nice 模型 / 卫星海洋 Europa-Enceladus-Titan（+4 cards、+3 sources）
- T7 地球：地球内部 · 用地震波切的洋葱 / 板块、灭绝、大氧化（+4 cards、+3 sources）

**Physics（P0-P8，subagent 2 并行）**

- P0 经典力学：Navier-Stokes · 湍流的标度迷宫 / 经典场论 · Lagrangian 密度与 Noether 流（+3 cards、+2 sources）
- P1 热力学：Onsager 关系 · 非平衡的对称 / Brown 运动 · Langevin → Fokker-Planck（+4 cards、+2 sources）
- P2 电磁：协变形式 · 一行写完 Maxwell / 辐射与等离子体 · 偶极四极 Alfvén（+4 cards、+2 sources：Aharonov-Bohm 1959 / NIST CODATA）
- P3 相对论：双生子佯谬 · 加速参考系的不对称 / 测地线偏离 · 把引力翻译成潮汐（+3 cards、+2 sources）
- P4 量子力学：路径积分 · 对所有可能性求和 / 量子隧穿 · α 衰变到 STM 显微镜（+3 cards、+2 sources）
- P5 原子分子：分子能级阶梯 · Born-Oppenheimer 的礼物 / Lamb shift · QED 进入原子（+4 cards、+2 sources：Lamb-Retherford 1947 / Hanneke g−2）
- P6 核-粒子：核壳模型 · 魔数从何而来 / 中微子三味 · PMNS 与质量等级（+3 cards、+2 sources：Daya Bay θ₁₃ / Greisen GZK）
- P7 标准模型：渐近自由 · β 函数与重正化群 / 电弱相变 · Sphaleron 与重子非对称（+4 cards、+2 sources）
- P8 前沿：拓扑量子计算 · 任意子与 Majorana / 桌面引力 · BMV 与量子-引力的真空裁判（+4 cards、+2 sources）

**合计**：+34 段新 narrative、+50+ dataCards、+30+ sources。内容总行数 2919 → 3868（+33%）。

### 校验

- `pnpm typecheck` ✅
- `pnpm lint` ✅（0 warnings）
- `pnpm format:check` ✅
- `pnpm lint:content` ✅（20/20 schema）
- `pnpm test` ✅（67/67）
- `pnpm build` ✅（31 static routes）

### 关键决策

1. **并行 subagent 分工**：universe 与 physics 互不交叉文件，并行启动两个 general-purpose subagent；两边各自完成读取 + 编辑 + 验证闭环，互不阻塞。约 8 分钟 + 10 分钟完成。
2. **不动 markers**：两个 agent 都选择只追加 narrative/dataCards/sources，不新增 markers。理由：marker 涉及场景坐标，与 3D scene + handwritten scene 的视觉布局有耦合，盲改风险高。后续若加 marker 必须连场景同步调整。
3. **每个 tier 每段必含直觉 + 机制双层**：第一段给故事性入口，第二段进入数学/实验。这是产品的「专业 + 易懂」平衡线。
4. **互文暗线保留**：所有新增段落都保留与其他 tier 的引用（「互文 P3 GR」、「下钻 T1」、「应用 → P8 量子计算」），保持知识图谱「网状」而非「树状」。
5. **真实来源**：新增的 30+ sources 全部是 arXiv / Phys Rev / Nature / NIST / NASA / ESA / Wikipedia 等可访问 URL，paper 优先于 encyclopedia。

### 下次开始

1. **Task 8 — Playwright e2e**：完整尺度链 happy path + physics 板块翻页 + atlas 打开/跨档跳转
2. **CSP / 安全头**：`next.config.ts` 加 Content-Security-Policy（含 `img-src` 允许 textures、`worker-src` for ktx2）
3. **README + 演示**：写对外 README + 截图 + 部署到 Vercel
4. **资产 credits 集成**：把 `public/textures/planets/CREDITS.md` 入到对外 docs/README
5. **bundle-check.mjs 集成 CI**：现有脚本未在 `.github/workflows/ci.yml` 跑
6. **KTX2 转换（可选）**：12 张 JPG 共 ~7 MB → KTX2 可压 60%
7. **markers 与场景对齐**：本次未动 markers，下次可基于新内容（如 T7 内部结构、P4 隧穿、P7 sphaleron）在 3D / handwritten 场景里加新 marker 并同步内容文件

### 未决问题

- Physics tier 的 markers 使用 `var(--hw-gold|red|blue)` CSS 变量字符串，与 Zod schema 的 hex 正则不符；但仓库官方 lint:content 测试只覆盖 T0-T7（cosmos），不校验 physics — 这是有意的视觉规范选择，但是个潜在 lint 风险，未来如把 physics 也加入 schema 校验需先迁移 marker 颜色
- 新增内容主要补 narrative/cards/sources，**3D 场景内容（如 T1 cosmic-web 节点位置、P4 Bloch 球角度）暂未跟着新主题更新**；视觉与文字的同步是下一轮工作
- T0 / P1 的新增 dataCards 数已经接近 schema 上限 (≤ 12)，再加内容需要重新设计字段或拆段
- 部分跨档暗线（「应用 → P8 量子计算」）尚未在 P8 的 markers / narrative 里有反向引用，知识图谱的"边"是单向的，下次可补成双向

---

## 2026-05-17 — Session 24 · 行星真贴图 + A11y 收尾 + 内容深化

**参与**：用户 + Claude (Opus 4.7)

**目标**：接 Session 23：批量下载行星纹理 → 实现 T6/T7 真贴图加载（含自定义 day/night/clouds shader）→ 补齐 A11y（焦点陷阱 + skip-to-content + ARIA live）→ 深化 universe (T2/T3/T4/T7) 与 physics (P1/P2/P3/P5/P6/P7) 内容。

### 本次完成

**Task 3 · 行星纹理真加载**

- 12 个纹理全部从 Solar System Scope (CC BY 4.0) 直接 curl 下载到 `public/textures/planets/`，含 2K JPG 行星 + 带 alpha 的 saturn-ring PNG
- 新增 `public/textures/planets/CREDITS.md`：CC BY 4.0 归属表 + 每张图来源映射
- 新增 `src/lib/planetTextures.ts`：模块级 cache 的同步 getter（placeholder + 异步替换，无 Suspense）+ `preloadPlanetTextures()`
- 新增 `src/components/three/Planet.tsx`：通用纹理行星，使用 `meshStandardMaterial` + 自转 + 倾角 + 透明度 cross-fade
- 新增 `src/components/three/SaturnRings.tsx`：1-D 条带纹理映射到环面，重写 UV
- 新增 `src/shaders/earth.glsl.ts`：4 个 shader——earth (day/night blend + Rayleigh limb)、clouds (sun-weighted alpha)、atmosphere ×2 (BackSide rim glow)
- 重写 `Tier6Scene`：8 个行星全部用 `<Planet />`，加 `<pointLight>` 在太阳位置 + 小 `<ambientLight>` 暗面 fill；Saturn 用 `<SaturnRings />`
- 重写 `Tier7Scene`：Earth body 用自定义 ShaderMaterial（day/night/atm rim 一体），Cloud shell 在 r=1.012 单独慢转，atmosphere 两壳改为自定义 BackSide rim shader（sun-direction weighted），Moon 也用真贴图
- 移除 T7 原本的 vertex-color FBM 球（被真 Blue Marble 替代）

**Task 6 · A11y 收尾**

- 新增 `src/components/hud/SkipLink.tsx`：sr-only → focus 显形，跳到 `#main-content`（WCAG 2.4.1）
- 新增 `src/components/hud/TierAriaLive.tsx`：`role="status" aria-live="polite"`，debounce 220ms，朗读 `section · tier · label`
- `KnowledgePanel`：role 从 `complementary` 改为 `dialog` + `aria-modal="true"`；自动 focus close 按钮（slide-in 完成后），Tab/Shift+Tab 在 panel 内循环（focus trap），关闭还焦点到 previously focused element
- 三个 shell（UniverseShell / PhysicsShell / HandwrittenShell）统一注入 `<SkipLink>` + `<TierAriaLive>`，Canvas/SVG 容器加 `id="main-content"` + `tabIndex={-1}`

**Task 4 · Universe 内容深化**

- `T2 Laniakea`：+ 3 dataCards（Hubble 流速 / 总光度 / 命名）、+ 2 narrative 段（"在更大的盆地里"扩写 + Shapley basin / CosmicFlows-4 + "怎么测一个看不见的盆地" + "宇宙旋涡 V-web"）、+ 2 sources
- `T3 Local Group`：+ 3 dataCards（M31 径向速度 / 合并时间 / M/L 比）、+ 2 narrative 段（缺失卫星问题 + 化学考古 / Gaia-Sausage-Enceladus）、+ 2 sources
- `T4 Milky Way`：+ 4 dataCards（公转周期 / 盘厚 / 球状星团数 / 恒星数）、+ 2 narrative 段（Gaia 时代制图 + 银盘翘曲与拥挤）、+ 2 sources
- `T7 Earth`：+ 2 narrative 段（淡蓝色圆点 / 生物圈：唯一的样本）、+ 2 sources（IPCC AR6 / Sagan Pale Blue Dot）

**Task 5 · Physics 内容深化**

- `P1 Thermo`：+ "相变与临界现象 · 普适类" 段（RG / Wilson 1971）+ Wilson 1975 RMP source
- `P2 EM`：+ "光与物质 · 折射率到 metamaterial" 段（Veselago 1968, Pendry 2000s）
- `P3 Relativity`：+ "GR 经过的实验场" 段（Eddington/Cassini/PSR J0737/GW170817）+ Will 2014 source
- `P5 Atomic`：+ "精密度量 · 原子钟与基础常数" 段（SI 2019 / Sr 光学钟 / α 漂移 / EDM） + BIPM SI source
- `P6 Nuclear`：+ "核素图与稳定岛" 段（valley of stability / Z=119-120）
- `P7 SM`：+ "实验时间线 · 从 e 到 Higgs" 段（115 年发现年表）

### 校验

- `pnpm typecheck` ✅
- `pnpm lint` ✅（0 warnings）
- `pnpm format` ✅
- `pnpm lint:content` ✅（20 schema tests）
- `pnpm test` ✅（67/67）
- `pnpm build` ✅（30 static routes）

### 关键决策

1. **纹理同步 getter + cache**：用 placeholder + 后台替换而非 Suspense，避免每个场景挂载时多一层 fallback；后续如果迁移到 KTX2/DRACO 也只换实现，调用方零改动。
2. **Earth shader 自定义**：避免 three.js 标准材质对 emissiveMap 的额外累加（夜面会双倍亮）。day/night 在 fragment 里按 `smoothstep(NdotL)` 显式 mix，加 Rayleigh rim term 一并算，与两层 BackSide atmosphere shell 共享同一个 `uSunDir` uniform。
3. **A11y 三件套合并提交**：focus trap、skip-link、live region 三个独立 patch 但同改 shell + KnowledgePanel，作为一次完整 a11y pass。`role="dialog"` + `aria-modal` 是必要的，因为 panel 半屏遮挡了 atlas 内容，按 WAI-ARIA APG 应该当 modal dialog 处理。
4. **内容深度差异性补强**：T0/T1/T5/T6 narrative 已经 4-5 段够深；T2-T4/T7 之前仅 3 段且没有现代仪器章节，本次重点补；physics 全部各加 1 段（前沿专题或历史/实验线索），但 P0/P4/P8 已 4 段不补。

### 下次开始

1. **Task 8 — Playwright e2e**：完整尺度链 happy path + physics 板块翻页
2. **CSP / 安全头**：`next.config.ts` 增加 Content-Security-Policy（含 `img-src` 允许 textures、`worker-src` for ktx2 loader 若启用）
3. **README**：写一份对外的 README + 演示截图，部署到 Vercel；texture credits 链接进去
4. **KTX2 转换（可选）**：12 个 JPG 共 ~7 MB，build artifact 还能压缩 ~60%
5. **资产 credits 文档**：CLAUDE.md 文件树里指向 `public/textures/planets/CREDITS.md`，并补充其他资产来源
6. **`bundle-check.mjs` 集成 CI**：Session 23 已写脚本，下一步加入 `.github/workflows/ci.yml`

### 未决问题

- `dwarfs`（Pluto / Ceres / Haumea / Makemake）暂无纹理，仍用 procedural 颜色；之后可在 `prep-textures.mjs` 里追加
- `<Planet>` 用 standard material 后会响应所有光，目前 T6 仅一个 pointLight @ origin OK；如果未来要加 ambient occlusion / IBL 需要重新调整
- ARIA live region 在 mobile VoiceOver 上的播报行为未实测；reduced motion 用户的 Earth shader 仍 GPU 渲染（只是几何不转），需评估是否要彻底降级
- Saturn ring 真贴图与 transparent + depthWrite=false 在某些角度下会出现 z-fighting 与盘面叠加，需在更深一档（如果增加 T6.5 Saturn 特写）再校正

---

## 2026-05-16 — Session 22 · 3D 视觉升级 P0 — 后处理管线 + 自定义粒子 shader + Marker 四变体

**参与**：用户 + Kilo (mimo-v2.5-pro)

**目标**：启动 Phase 1.5.A 3D 视觉升级，完成 P0-A（后处理管线）、P0-B（自定义粒子 shader）、P0-C（SceneMarkers 四变体）。

### 本次完成

**P0-A · 后处理管线 EffectComposer**

- 新增 `src/lib/quality.ts` — `detectInitialQuality()` 根据 deviceMemory / hardwareConcurrency / DPR / UA 判断 high / medium / low
- 新增 `src/components/post/PostFX.tsx` — 三档后处理：
  - high: SMAA + Bloom + Vignette + ChromaticAberration + Noise (film grain)
  - medium: SMAA + Bloom + Vignette
  - low: SMAA + Vignette only
- 更新 `src/store/useUiStore.ts` — 新增 `qualityTier` state + `setQualityTier` action
- 更新 `src/app/universe/_shell/UniverseShell.tsx`：
  - Canvas `antialias: false`（SMAA 接管）
  - `onCreated` 设置 ACES Filmic tone mapping + sRGB output color space
  - mount `<PostFX />` inside Canvas
- 新增 `postprocessing@6.39.1` 为直接依赖

**P0-B · 自定义粒子 Shader**

- 新增 `src/shaders/starPoint.vert.glsl.ts` — 顶点 shader
- 新增 `src/shaders/starPoint.frag.glsl.ts` — 温度光谱 + 顶点色双模式片段 shader
- 新增 `src/shaders/colorRamps.ts` — 光谱型色温映射
- 新增 `src/components/three/StarPoints.tsx` — 可复用软边星点组件
- **替换全部 8 个场景的 `<pointsMaterial>`** — T0~T7
- 清理 T1 中不再使用的 `COLOR_GAS`、`COLOR_WALL`、`fromTriplet`

**P0-C · SceneMarkers 四变体**

- 新增 `src/lib/tier.ts` 中 `MarkerKind` 类型 + `TIER_MARKER_KIND` 映射
- 新增 `src/scenes/markers/MarkerHaloDisk.tsx` — T0/T1/T2：软光球 + 虚线圆环（工程图风）
- 新增 `src/scenes/markers/MarkerDiamond.tsx` — T3/T4：钻石符号 + 内核点
- 新增 `src/scenes/markers/MarkerStarPoint.tsx` — T5：星点 + hover 时出现轨道环
- 新增 `src/scenes/markers/MarkerPinNeedle.tsx` — T6/T7：极小针点 + 微弱光晕
- 重构 `src/scenes/SceneMarkers.tsx` — 按 `tierId` 调度 marker 变体，glow 用 useState 驱动
- 更新全部 8 个场景传递 `tierId` prop

**P1-A · 体积光晕**

- 新增 `src/shaders/volumeRaymarch.frag.glsl.ts` — 4-6 步 FBM raymarch 片段 shader
- 新增 `src/components/volumetric/VolumeBillboard.tsx` — view-aligned billboard + 自定义 shader
- T0：inner haze mesh → VolumeBillboard（深空蓝紫 volumetric glow）
- T4：Sgr A\* 三层 StarPoints → VolumeBillboard（hot orange accretion glow）
- T6：Sun 四层 mesh → VolumeBillboard + 单层 core mesh（yellow-white corona）

**验证**

- `pnpm typecheck` ✅
- `pnpm lint` ✅ (0 warnings)
- `pnpm test` ✅ (67/67)
- `pnpm lint:content` ✅ (20/20)
- `pnpm build` ✅ (30 routes)

## 2026-05-17 — Session 23 · 物理数据真实化 + 性能基础设施 + A11y 修复

**参与**：用户 + Kilo (mimo-v2.5-pro)

**目标**：继续 Phase 1.5.A 后续工作，修复物理数据曲线、建立性能监控基础设施、修复 A11y 关键缺陷。

### 本次完成

**Task 4 · 物理数据曲线真实化**

- `p6-nuclear-particle-hw/Scene.tsx` — `buildBindingCurve()` 替换为 AME2020 真实数据（31 个核素的结合能数据点 + Hermite 样条插值），正确展现 ⁶²Ni 峰值 (~8.795 MeV/A)
- `p6-nuclear-particle-hw/Scene.tsx` — `buildAlphaSCurve()` 替换为 1-loop RGE 解：α_s(m_Z)=0.1179，含 n_f 味阈值 (1.5/4.5/160 GeV)
- `p3-relativity-hw/Scene.tsx` — `buildChirp()` 替换为 3-phase IMR 近似（inspiral ∝ (t_c-t)^(-3/8), merger, ringdown damped sinusoid）

**Task 5 · LOD + 性能监控**

- 新增 `src/lib/lod.ts` — `useLOD(thresholds)` hook，基于相机距离返回 LOD 等级（ref 驱动，无 React re-render）
- 新增 `src/lib/perf-monitor.ts` — 运行时 fps 监控，60 帧连续低于阈值 (45fps/24fps) 自动降级到 qualityTier="low"
- UniverseShell 集成 `<PerfMonitorSync />` 自动启动监控

**Task 6 · A11y 修复（部分）**

- `globals.css` — physics paper `--color-fg-muted` 从 `#6a5a3a` 改为 `#5a4a2a`（WCAG AA 4.7:1）
- `globals.css` — 新增 `*:focus-visible` 全局样式（warm accent outline）
- 8 个场景 + SceneMarkers — `useFrame` rotation/pulse 在 `reducedMotion=true` 时跳过
- `UniverseShell` — 新增 `MotionPreferenceSync` 组件，自动同步 matchMedia 到 store

**Task 9 · 性能基线脚本**

- 新增 `scripts/bundle-check.mjs` — 构建后检查 chunk 大小（JS < 250KB / CSS < 30KB）
- 新增 `scripts/audit-lighthouse.mjs` — 启动本地 server + headless Chrome + Lighthouse 自动评分
- `package.json` 新增 `bundle-check` 和 `audit:lighthouse` 脚本

**纹理准备**

- 新增 `scripts/prep-textures.mjs` — 12 个行星纹理的下载源 URL + KTX2 转换说明
- 新增 `public/textures/planets/.gitkeep`

**验证**：typecheck ✅ | lint ✅ | test ✅ (67/67) | build ✅ (30 routes)

### 下次开始

1. **Task 3 (P1-B)**：手动下载 12 个行星纹理（`node scripts/prep-textures.mjs` 查看 URL），然后实现 T6 行星 / T7 地球真贴图加载
2. **Task 6 剩余**：KnowledgePanel 焦点陷阱、skip-to-content link、ARIA live regions
3. **Task 8**：UI 组件测试 + Playwright E2E

### 未决问题

- 行星纹理需要手动下载（NASA/USGS 公共领域资源），脚本已提供完整 URL 和转换指南
- `bundle-check.mjs` 和 `audit-lighthouse.mjs` 未在 CI 中集成（需要先确认 Vercel 部署流程）
- framer-motion HUD 动画仍不受 reduced-motion 影响（WAAPI 不受 CSS 规则控制，需要各组件读取 `useReducedMotion()`）

---

## 2026-05-16 — Session 21 · 互文 chip 进化 + ToC 优化 + Universe grid 选项

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 Session 20 留下的开放问题和小项一次性收掉——让 atlas 真正像「百科全书」一样可以横向阅读跨档不中断，互文 chip 与 ToC 的视觉密度调到合适，Universe 也获得 Physics 同款 grid 背景选项。

### 本次完成

**Y1 · 互文 chip 保持 atlas 打开**

- 点击 RelatedTiers chip 不再 closePanel；改为 setTier + router.push + openPanel(newTier)
- 用户连续浏览跨档内容时阅读流不中断 —— 真正像翻书一样从 P0 翻到 P4 再翻回 T2
- 加 hasContentForTier 守护避免跳到 placeholder 后 panel 显示 null

**Y2 · 互文 chip 跨板块色区分**

- 同板块跳转 (T→T / P→P)：accent-warm 描边 + 棕黄编号
- 跨板块跳转 (T→P / P→T)：accent-cool 描边 + bg-tint + 蓝绿编号
- title 属性给出「跨板块 → physics」/「同板块 → universe」hover 提示
- 一眼分辨「这是不是要离开当前板块」

**Y3 · ToC 优化**

- 阈值从 ≥2 段改为 ≥3 段才显示（2 段时第二个 heading 自然滚到视野，ToC 没意义）
- chip 条下方新增 active section 完整标题（truncate + ellipsis）
- 用户不必 hover chip 就知道当前在哪段；横向 chip 条仍保留作为跳转入口

**Y4 · Universe PaperGrid 选项**

- `useHandwrittenStore` 加 `universeBackdrop: "stars" | "grid"` + persist
- HandwrittenShell 注入 `data-universe-backdrop` + 条件渲染 `<PaperGrid excludeInnerRadius={0} />` 覆盖
- FloatingViewControl 在 universe handwritten 下展开第三段 backdrop（stars · 星点 / grid · 网格）
- 物理稿纸感成为 Universe 也可用的视觉选项，且 8 个 Scene 文件零修改

**Y5 · HoverTooltip 内 cross-link 视觉化**

- marker.data 的 value 含 tier id 时：渲染为 `→ T0  大爆炸` 形式，accent-cool 着色
- 仍是只读（pointer-events-none 不破坏 hover 体验）；底部加 `click marker · 打开 atlas 跳转` 提示
- 提示用户哪些条目可以跨档跳转 + 入口路径

### 校验

- `pnpm check`：typecheck + lint(0/0) + prettier + lint:content + 67 tests 全过
- `pnpm build`：30 静态路由全部预渲染
- curl：universe handwritten 2 路径 + 3 个 physics 全 200

### 关键决策

1. **互文 chip 不关 atlas**：本来设计是「跳转 = 离开当前阅读」，改后变成「跳转 = 翻页」—— 这是产品根本性的体验提升，atlas 从「卡片」变成「书」
2. **跨板块用冷色 (cool) 而非热色 (warm)**：暖色给同板块（继续在熟悉领域），冷色给跨板块（跳出舒适区）—— 符合常识
3. **ToC 阈值 3 段**：减少视觉噪音；P0/P1/P3 这类长 tier 仍受益，P5/P6/P7 这类 2 段 tier 不再被打扰
4. **Universe grid 用 SVG 层级覆盖而非替换 StarSpeck**：8 个场景文件零改动 — 零内容迁移；StarSpeck 在 grid 下视觉减弱但仍存在（作为远景纹理）
5. **HoverTooltip 不做 clickable chip**：pointer-events 与 marker hover 状态机冲突太大；改为 visual hint + 「click marker」明示路径

### 下次开始（建议）

1. **跨档跳转保留页码**：当前 setPhysicsPage 归零，可让从 P0 page 2 跳到 P4 后再回 P0 保留 page 2
2. **WORKLOG / docs 同步**：design/09-physics-vision.md 与最新结构（9 档 + 多页）核对一遍
3. **真实数据曲线替换**：MB / α_s(Q) / Higgs 势 / 结合能曲线
4. **键盘 H / L 翻页（Vim 风）**：作为 ← → 的替代
5. **HoverTooltip 的「click marker」实际未必触发 atlas**：检查 marker click 逻辑是否真的 openPanel

### 未决问题

- 跨板块 chip 的冷色描边在 night palette + Physics dark scope 下对比度未亲测
- RelatedTiers 在 mobile (< sm) 下 chip 可能换行过多吃高度，需观察
- HoverTooltip 的 `click marker · 打开 atlas` 提示假设 marker click → openPanel；这条路径需 verify

---

## 2026-05-16 — Session 20 · 互文跨档 + Atlas ToC + 数字键直跳

**参与**：用户 + Claude (Opus 4.7)

**目标**：从 Session 19 留下的候选里挑高产品价值的 3 项：互文 cross-link 跨档跳转、Atlas 长 narrative 加 ToC、数字键直跳 tier。让 atlas 从「孤立 tier 卡片」升级到「互相连接的知识网」。

### 本次完成

**X1 · 互文 markers 跨档跳转**

- 新 `lib/cross-link.ts` · `parseCrossLink(value)` 解析自由文本里的 tier id 前缀（T0-T7 / P0-P8）+ 后续标签；`hasCrossLink` / `tierSection` 辅助函数
- 新 `RelatedTiers` 组件：扫描当前 content 的 markers + dataCards.hint + marker.description + marker.data，聚合并去重得到 cross-link 集，渲染为可点击 chip
- KnowledgePanel 在 dataCards 网格之前插入 RelatedTiers section
- 点击 chip：closePanel + setTier + router.push（handwritten 视图）—— 跨 universe / physics 板块都通
- 完全基于现有 marker 数据，零内容迁移成本；旧 markers 不动就自动获得互文导航

**X2 · Atlas ToC 浮岛**

- 新 `AtlasToc` 组件：KnowledgePanel 滚动容器顶部 sticky 一条紧凑 §01 §02 ... chip 条
- IntersectionObserver 监听 narrative section，按 `rootMargin: -15% 0px -70% 0px` 高亮当前 section
- 点击 chip 调 `el.scrollIntoView({ behavior: smooth, block: start })`
- KnowledgePanel 给 narrative section 加 `id=atlas-section-{i}` + `data-toc-idx`；NarrativeSection 接受 id prop 并加 `scroll-mt-16`
- ≤1 段 narrative 时自动不渲染

**X3 · 数字键 1–9 直跳 tier**

- KeyboardNav 在 ↑↓ 之前加 1–9 数字键分支：universe 1–8 → T0–T7，physics 1–9 → P0–P8
- 跳过 placeholder（hasContentForTier 守护）
- ShortcutOverlay 增加一行 `1 … 9` 说明

### 校验

- `pnpm check`：typecheck + lint(0/0) + prettier + lint:content + 67 tests 全过
- `pnpm build`：30 静态路由全部预渲染
- curl：universe handwritten + 4 个 physics 主路径全 200

### 关键决策

1. **互文用「聚合自动发现」而非「显式 crossLinks 字段」**：充分利用已有 marker 内容，零数据迁移；副作用是检测面 = 所有 value/hint 字符串，但目前内容里 T/P 大写编号都是 tier id，碰撞为零
2. **ToC 用 sticky chip 条而非侧栏**：480px 面板太窄不适合侧栏；横向 sticky 条占用 ~40px 垂直空间但保持阅读流
3. **IntersectionObserver 的 rootMargin 偏顶部**：让 ToC 在用户「即将进入下一段」时就切换 active，比「完全可见」更跟手
4. **数字键不用 modifier**：跨节段时已经过滤 Cmd/Ctrl/Alt，纯数字键是 power user 最低成本入口；同时不与 input 冲突

### 下次开始（建议）

1. Universe handwritten 也启用 PaperGrid 选项（FloatingViewControl 加段或 ?bg=grid）
2. 真实数据替换合成曲线（MB 速率分布、α_s(Q)、结合能曲线、Higgs 势）
3. 互文 chip 加跨板块色区分（Universe ↔ Universe vs Universe ↔ Physics）
4. HoverTooltip 内 marker.data 也变 cross-link chip（需解决 pointer-events 问题）
5. ToC 仅在 ≥3 段 narrative 时显示（当前 ≥2）

### 未决问题

- 互文 chip 当前固定 closePanel + 跳到 handwritten；用户可能想保持 atlas 打开切内容（更连贯阅读流）
- RelatedTiers 的去重策略：第一个 rest 标签获胜，后续覆盖被丢弃 —— 跨 marker 的多条 rest 上下文可能丢失
- ToC chip 在 narrative 段标题特别长时只显示编号，鼠标 hover title 才能看到完整 heading —— 未在真机检验阅读效率

---

## 2026-05-16 — Session 19 · 快捷键面板 + 移动端分组 + P5/P6/P7 扩到 2 页

**参与**：用户 + Claude (Opus 4.7)

**目标**：执行 Session 18 留下的 5 项建议中的 2 项 HUD 打磨（? 快捷键面板 + MobileTierStrip 分组），并把 P5/P6/P7 三档从 1 页扩为 2 页。Physics 9 档结构最终落定为 P0:3 / P1-P7:2 / P8:1。

### 本次完成

**H1 · `?` 快捷键面板**

- 新 `ShortcutOverlay` 模态浮卡（hud-capsule 风格 + 半透 backdrop + kbd 胶囊）
- 列出 ↑↓ ←→ O Esc ? 五条快捷键 + 中文说明
- `KeyboardNav` 内 `shortcutsOpen` state，Shift+/ 切换；Esc 优先级：先关 overlay，再关 atlas
- KeyboardNav 现在 render `<ShortcutOverlay />` 而非 null
- TopBar 提示从 `↑↓ ←→ · o` 改为 `? · keys`（更简洁；hover title 给出完整说明），在 md+ 可见

**H2 · MobileTierStrip 知识阶梯分组**

- 在 P3 / P6 之前插入 inline 分隔（细竖线 + 微小标题「学院」「前沿」），与 desktop TierRail 一致
- 用 Fragment 包裹保持现有 chip layout，分隔器自身 shrink-0 不被水平 scroll 截断

**C4 · P5 原子分子扩到 2 页**

- Page I · 单原子：Bohr 能级 + Lyman/Balmer 跃迁 + s/p/d 轨道形状 + Pauli/Hund chip 条
- Page II · 化学键：H₂ σ_g 成键 / σ_u\* 反键（含节面）+ sp / sp² / sp³ 杂化几何 + 周期表 sub-shell strip

**C5 · P6 核与粒子扩到 2 页**

- Page I · 核结构：结合能曲线（Fe 峰）+ α/β/γ 衰变示意（包含粒子产物：⁴He / e⁻+ν̄ / 高能 γ 波线）+ 聚变/裂变 Q-value chip
- Page II · 粒子：质子 uud 三夸克 + 胶子虚线 + α_s(Q) 渐进自由曲线（合成 1/ln 形态）+ 能量阶梯（atom · eV → LHC · TeV）

**C6 · P7 标准模型扩到 2 页**

- Page I · 粒子表：17 粒子 4×4 网格 + Higgs 单独 chip（原内容保留并精化）
- Page II · 规范结构：Higgs Mexican-hat 势曲线（±v 极小点标红）+ 三个 Feynman 顶点（QED e–γ–e、QCD q–g–q、Weak ν–W–e）+ 底部 SU(3) 8 胶子 / SU(2) W±W₀ / U(1) B 三段 cartouche

**配套**：`PHYSICS_PAGE_COUNT` 更新为 P5/P6/P7 = 2

### 校验

- `pnpm check`：typecheck + lint(0/0) + prettier + lint:content + 67 tests 全过
- `pnpm build`：30 静态路由全部预渲染
- curl：universe handwritten + 5 个 physics 主路径全 200

### 关键决策

1. **`?` 用 Shift+/ 触发并 toggle**：符合 Linear/Notion 惯例；Esc 优先级处理 overlay > atlas
2. **TopBar 提示文字从 `↑↓ ←→ · o` 改为 `? · keys`**：把发现路径压缩到一个键；hover title 给完整说明
3. **MobileTierStrip 分组不再展开成两行**：保留单行水平滚动 + inline 分隔；垂直高度预算稀缺
4. **P7 的 Feynman 顶点选 QED / QCD / Weak 三种**：覆盖标准模型三种相互作用；hint 与 Page I 粒子表互文
5. **P8 保持单页**：前沿本质是 tour，不强行拆页

### 下次开始（建议）

1. **互文系统**：把 markers 里的「互文 · T0 大爆炸」等文字变成可点击的跨档跳转（router push + tier transition）
2. **Universe 板块也用 PaperGrid 选项**：当前 universe handwritten 仍用 StarSpeck，可加 `?bg=grid` 钩子
3. **Atlas 内 ToC 浮岛**：长 narrative 加锚点导航（直觉 / 学院 / 前沿 / 参考）
4. **数据可视化升级**：MB 速率分布、α_s(Q)、结合能曲线 当前用合成公式，可换成真实数据点 overlay
5. **键盘 G 键 / 数字键直跳 tier**：1–9 直接跳到 P0–P8（universe 用 1–8 → T0–T7）

### 未决问题

- ShortcutOverlay 在 Physics paper palette 下 backdrop 的对比度，需逐 palette 目视
- MobileTierStrip 分组器在 Universe 下永远 null —— 是否给 universe 也加分组（近场 / 中场 / 远场）待产品决定
- P5 Page II 的 σ_u\* 节面虚线在小屏可能太细，需在真机查验

---

## 2026-05-16 — Session 18 · 收尾：cross-section atlas + 键盘 + 移动端 + 暗色巡视

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 Session 17 留下的三项未勾任务（KnowledgePanel cross-section / 键盘导航 / 移动端响应式）+ 暗色 palette 视觉债一次性收掉，让 Physics 板块从「桌面端 paper 主题完整」推进到「双 palette × 桌面+移动 × 完整 atlas × 键盘可达」。

### 本次完成

**P2 · KnowledgePanel cross-section**

- 之前的 bug：Physics tier 打开 atlas 时 `getTierContent` 只查 universe 注册表 → 拿到 null → 面板永不渲染
- 替换为 `getContentForTier`（已有 cross-section 调度，universe + physics 都覆盖）
- `TIERS[tier]`（universe-only）替换为 `sectionMetaForTier(tier)` → 通过 `SECTIONS[section].tiers[tier]` 拿 label / unit
- `tier as TierId` 全部改为 `AnyTierId`
- Hero / PanelHeader / Footer 都不再依赖 universe TIERS

**I4 · 全局键盘导航**

- 新 `KeyboardNav` 组件（mount 在三个 shell，render 为 null）
- 监听 window keydown：
  - ← / → 翻 Physics 页（多页档生效）
  - ↑ / ↓ 切 tier（自动跳过 placeholder；universe-handwritten 用 goToHw，3D 用 router.push + goTo3d）
  - O 打开 atlas（当前 tier 有内容时）
  - Esc 关闭 atlas
- 忽略 input / textarea / select / contenteditable；任何修饰键（Cmd / Ctrl / Alt）按住时不触发
- TopBar 右胶囊新增 `↑↓ ←→ · o` 快捷键提示（lg+ 可见，hover 有完整说明）

**P3 · 移动端响应式 + swipe**

- 新 `MobileTierStrip`：底部水平滚动 chip 条；`md:hidden`；Universe + Physics 都挂上
- SubjectCard 在 < md 改为 `bottom-16` 给 strip 留位；md+ 不动
- PhysicsPager 在 < md 抬到 `bottom-20` 避开 strip；md+ 维持 `bottom-10`
- 新 `SwipePager`：window touchstart / touchend 监听，水平阈值 50px，竖直容忍度 0.7×；Physics 多页档下生效
- 全 passive listener，不打架 vertical scroll

**暗色 palette 巡视 + 微调**

- 之前的设计 bug：font-size token 写在 `:not([data-force-night="true"])` 里 → night 模式字号 fall back 到 universe baseline → Physics 的密集图变小
- 修复：font-size token 提到无条件 `[data-section="physics"]` scope；color token 仍按 paper / night 分支
- night palette 加 `--hw-ink-faint-solid: #8a92a5` + `--hw-paper-opacity: 0.18` —— PaperGrid 在暗背景上能看见但不喧宾
- `--color-fg-muted: #8a92a5` + `--color-fg-disabled: #5a6070` —— TierRail 知识阶梯小标题、MobileTierStrip 灰文字在暗色下可读

### 校验

- `pnpm check`：typecheck + lint(0/0) + prettier + lint:content + 67 tests 全过
- `pnpm build`：30 静态路由全部预渲染
- curl：universe handwritten + 5 个 physics 主路径全 200

### 关键决策

1. **MobileTierStrip 不替代 TierRail 而是新组件**：一个组件维护两套布局太复杂；`md:hidden` / `hidden md:flex` 互斥更清爽
2. **SwipePager 用 window 监听而非 onTouch 在容器**：手势可能从 HUD 胶囊外起手；passive 不影响垂直滚动
3. **TierRail 不在移动端做 swipe**：tier 跳跃本身代价大（场景切换 + 过场动画）；swipe 翻页只给 page；tier 用户用 chip 主动选
4. **暗色 palette 的字号 token 提到无条件 scope**：明示「physics 的密度需要大字号，与底色无关」—— 是产品决定，不是视觉副作用

### 下次开始（建议）

1. PhysicsPager 在小屏可考虑悬浮 mini 模式（只显示 1/3 + 圆点）
2. TopBar 在 < lg 也露快捷键 hint
3. MobileTierStrip 加分组分隔（与 desktop TierRail 知识阶梯一致）
4. 键盘导航加可视化快捷键面板（按 `?` 弹出）
5. PaperGrid 在 universe handwritten 视图也可选启用

### 未决问题

- iPhone 上 SwipePager 与浏览器边缘 swipe-back 手势的冲突未实测
- Physics 暗色模式下 `hud-capsule` 的 cream 覆写应不生效（特异性是 paper-only），需浏览器目视确认胶囊回到深色
- KnowledgePanel 内 `bg-bg-deep/80` 在 Physics paper palette 下变成半透明 cream —— 意图正确，需逐档目视确认对比度

---

## 2026-05-16 — Session 17 · Physics 完整化：稿纸方格 + 知识阶梯 + 过场 + 全 9 档内容

**参与**：用户 + Claude (Opus 4.7)

**目标**：用户从 10 项剩余清单中勾选 7 项（C1/C2/C3 + I1/I2/I3 + P1）。一次性完成 Physics 板块从「3 档主力 + 6 档骨架」推进到「全 9 档实体 + 多页 + 知识阶梯 + 切主题」。

### 本次完成

**P1 · 稿纸方格替换 StarSpeck**

- 新 `PaperGrid` 共享组件（lines / ticks 两 variant，默认 ticks）
- Physics 9 个 Scene + PlaceholderScene 全部从 StarSpeck 切到 PaperGrid
- Universe 不动；星点保留给宇宙板块

**I3 · ?theme=night 切换按钮**

- `useHandwrittenStore` 加 `physicsPalette: "paper" | "night"` + persist
- `PhysicsShell` 在 `physicsPalette === "night"` 时挂 `data-force-night="true"`，对应 `globals.css` 早就埋好的 scope hook
- `FloatingViewControl` 在 Physics 下展示 `palette` 段（paper / night）；Universe 下不变

**I2 · TierRail 知识阶梯分组**

- Physics 9 档拆 3 组：直觉 (P0/P1/P2) / 学院 (P3/P4/P5) / 前沿 (P6/P7/P8)
- 每组顶端加分割线 + 小标题 (`intuition · 直觉` 等)
- 通过 `physicsGroupLabel(idx)` 在 `cfg.tierOrder.map` 内联渲染 group header；Universe TierRail 行为不变

**I1 · Physics 页间过场动画**

- `ActivePhysicsHandwrittenScene` 抽出 `PagedScene` 子组件 + `AnimatePresence`
- 翻页时 motion.g 横向滑入 / 滑出 + 淡出（方向由 page delta 决定）
- 用 `useState` 而非 ref 跟踪上一页（React-19 `react-hooks/refs` 规则禁止 render 阶段读写 ref）

**C1 · P1 热力学完整化**

- content：8 dataCards / 4 narrative / 3 sources / 6 markers（覆盖 Boltzmann / Carnot / 配分函数 / BH 熵 / Landauer / Jarzynski）
- Scene 2 页：Page I 三温度 Maxwell-Boltzmann 曲线 + 配分函数 cartouche；Page II 四定律横幅 + p-V Carnot 循环 + 低熵 → 高熵 时间之矢

**C2 · P3 相对论完整化**

- content：8 dataCards / 4 narrative / 3 sources / 6 markers（Lorentz / E=mc² / Einstein 场 / Schwarzschild / GW / FLRW）
- Scene 2 页：Page I Minkowski 时空图（光锥 + worldline）+ Lorentz boost block；Page II 弯曲时空 rubber-sheet + 黑洞 + GW chirp

**C3 · P5–P8 四档批量填实**

- 每档内容从 placeholder 升级到完整：8 dataCards / 4 narrative / 3 sources / 6 markers
- 每档 1 页 first-class Scene 替换 PlaceholderScene：
  - **P5** Bohr 能级 + Lyman/Balmer 跃迁 + s/p/d 轨道形状 + 周期表 sub-shell 列宽 strip
  - **P6** 结合能曲线（峰在 Fe）+ 质子三夸克 + α/β/γ 衰变 chip
  - **P7** 17 粒子表格（3 代 × 4 类 + Higgs 单独 chip） + Higgs 势 cartouche
  - **P8** 暗物质/暗能量/可见物质 pie chart + 五大未解之谜列表
- `PHYSICS_PAGE_COUNT` 更新（P1:2, P3:2 也跟上）

### 校验

- `pnpm check`：typecheck + lint(0/0) + prettier + lint:content + 67 tests 全过
- `pnpm build`：30 个静态路由全部预渲染
- curl 实测：10 条路径（universe handwritten + 9 个 physics）全部 200

### 关键决策

1. **稿纸纹理选 ticks（小十字格）而非 lines（连续网格）**：连续网格视觉重量过大，喧宾夺主；ticks 更像工程稿纸 / 实验本
2. **TierRail 分组用 group header 内嵌 li 而非外层包裹**：保持现有平面 `<ol>` 结构 + tooltip 定位逻辑不动
3. **React-19 ref 限制下 page direction 用 useState + 条件 setState**：是 React 团队官方 prev-value tracking pattern，AnimatePresence 仍正确触发
4. **P5–P8 单页骨架而非多页**：原子分子 / 核 / 标准模型已经在单页里塞了高密度信息；前沿是导览型适合单页；多页留给真正能展开的章节（P0/P1/P2/P3/P4）

### 下次开始（建议优先级）

1. **键盘导航 I4**（上一轮未选）：← → 翻页 / ↑ ↓ 切 tier / Esc 关闭 atlas + 快捷键提示气泡
2. **KnowledgePanel cross-section P2**（上一轮未选）：让 Physics tier 也能开 atlas；改 `tier as TierId` → `AnyTierId`
3. **移动端响应式 P3**（上一轮未选）：PhysicsPager / TierRail 在 < md 重排，加 swipe 翻页
4. **页间过场再调一档**：当前 80px 横移，反向 page 的运动方向可以再细致（例如不只是 ±x，还能 ±y 区分 tier 跳跃 vs 页内翻）
5. **PaperGrid 在 universe 也做一个对应工业稿纸 backdrop（可选）**：当前只 Physics 使用

### 未决问题

- 暗色 palette 在 Physics 下还未在浏览器逐档巡视过——视觉债清单待补
- TierRail 知识阶梯的小标题在 Physics night palette 下颜色是否够清晰，未亲测
- KnowledgePanel 进入 Physics tier 仍报 null（待 P2 修复）

---

## 2026-05-16 — Session 16 · 视觉打磨第二轮：浮岛 HUD + 字号系统 + Physics 浅色主题 + 多页

**参与**：用户 + Claude (Opus 4.7)

**目标**：用户反馈 Session 15 完成的 Phase 2 仍有四个明显短板——顶栏遮挡画面、整体字号太小、Physics 套在深色主题里阅读吃力、单档容量不足。本轮一次性修这四件事，同时把 Physics 三个主力档（P0 / P2 / P4）扩成多页结构。

### 本次完成

**PR-A · HUD 浮岛胶囊**

- `TopBar`：废掉整条 `border-b backdrop-blur` 顶栏，改成左右两个独立浮岛胶囊（brand 与 frame/tier 元数据），中间完全留白；3D / 手绘 / Physics 三套画面延伸到屏幕顶部不再被横条切断
- `TierRail`：宽度从 16 缩到 14，去掉全高布局，改成 `top-1/2 -translate-y-1/2` 居中浮岛
- `HudShell` / `HandwrittenShell` / `PhysicsShell` 三处统一 absolute 浮层 + SubjectCard 浮卡（不再争抢 flex 高度）
- 新增 `.hud-capsule` / `.hud-meta` CSS 工具类；自动在 Physics scope 翻成浅色变体

**PR-B · 字号 token 化**

- `globals.css` 新增 `--hw-fs-{title,subtitle,major,minor,caption,hairline}` token；`hw-label-*` 类全部走 token
- Universe baseline：title 22→30 / subtitle 14→20 / major 13→18 / minor 11→15 / caption 10→13 / hairline 9→11（≈ +35%）
- KnowledgePanel：narrative 14→16 / heading xl→2xl；DataCard label 10→12 / value base→lg
- 删除手绘场景里的硬编码 px

**PR-C · Physics 暖米黄稿纸主题**

- 新 scope `[data-section="physics"]:not([data-force-night="true"])`
- 调色板：bg `#f4ecd8`，ink `#1a1a1a`，gold `#a8651c`，blue `#1f5fa8`，red `#b03a2e`，paper-opacity 0.55
- 反转 `--color-fg-*` 与 `--color-bg-*`，`color-scheme: light` —— Tailwind 工具类自动适配
- Physics 字号在 token 基础上再 ×1.7（title 52 / subtitle 34 / major 28 / minor 22）
- HUD 胶囊在 Physics 自动翻成 cream 浮岛 + 暖黄阴影
- 保留 `data-force-night="true"` 钩子（未来对比/截图用）

**PR-D · PhysicsShell 多页容器**

- `useSectionStore` 加 `physicsPage: number` + `setPhysicsPage`；tier / section 切换自动归零
- `lib/physics-tier.ts` 导出 `PHYSICS_PAGE_COUNT` + `getPhysicsPageCount`（P0:3 / P2:2 / P4:2 / 其他:1）
- 新 `PhysicsPager` 组件：右下浮岛，pill + 圆点 + 索引；单页档自动隐藏；3D 化的 segmented control
- `ActivePhysicsHandwrittenScene` 把 `page` prop 透传到 Scene；过场只用 page 0

**PR-E · 内容扩展**

- **P0 经典力学（3 页）**
  - Page I · Newton：F=ma 大字 + 单摆 / 弹簧 / 抛体 / 受力分析四象限（更大间距）
  - Page II · Lagrange / Hamilton：ℒ=T−V cartouche + δS=0 + 路径束 + Hamilton 方程 + 大幅相空间椭圆
  - Page III · Kepler / Noether：大椭圆轨道 + 等面积扫掠 + T²∝a³ + Noether 三守恒律横幅
- **P2 电磁与光（2 页 · 从 placeholder 升级为 first-class）**
  - Page I · Maxwell：四方程 cartouche + 点电荷径向 E 场 + 通电导线环形 B 场（Ampère）
  - Page II · 光与规范：c=1/√(μ₀ε₀) + 行进 EM 波（红 E / 蓝 B，相位锁定） + 规范变换 footnote
  - 内容数据扩到 8 dataCards / 4 narrative / 3 sources / 6 markers（之前只有 placeholder）
- **P4 量子（2 页）**
  - Page I · 波粒：双缝（更大）+ 势阱能级 + de Broglie λ=h/p
  - Page II · 状态：Schrödinger cartouche + Heisenberg ΔxΔp + Bloch 球（大）+ Dirac bra-ket footnote

### 校验

- `pnpm check`：typecheck + lint(0/0) + prettier + lint:content + 67 tests 全过
- `pnpm build`：30 个静态路由全部预渲染成功
- curl 实测：universe / handwritten / physics 主路由 + P0/P2/P4 全部 200，根路由 307 → 默认 tier

### 关键决策

1. **HUD 浮岛 vs 自动隐藏**：采纳 A2（浮岛），不做 A3（自动隐藏）—— 首次使用成本更低
2. **Physics 色温偏暖**：`#f4ecd8` 米黄稿纸而非 `#f0f2f5` LaTeX 灰白 —— 与手绘 cartouche 气质更契合
3. **字号比例**：Universe +35%，Physics 在 Universe 基础上再 ×1.7（约 2.3× 原始基线）—— 双缝、Bloch 球这类满版图终于读得清
4. **第三档扩展选 P2 而非 P3**：电磁场线 / 波动比相对论的光锥更适合多页拆解，承接 P0 自然
5. **TierRail 在 Physics 仍是 9 档导航**：本轮没有改成"知识阶梯（直觉/学院/前沿）"——后者更适合作为 P0/P2/P4 子档展开，留作下一轮

### 下次开始（建议优先级）

1. **继续填内容**：P1 热力学 / P3 相对论 / P5–P8 仍是 placeholder；按 P0/P2/P4 的密度补齐
2. **TierRail 知识阶梯**：在 Physics 下把单一线性 P0–P8 拆成 "直觉 / 学院 / 前沿" 分组导航
3. **页间过场动画**：当前 page 切换是瞬切，可以加一个 framer-motion 横向位移 + 淡出
4. **暗色比较视图**：`?theme=night` 钩子已经埋好，做一个调试用的切换按钮（FloatingViewControl 里加段）
5. **响应式**：mobile 下 PhysicsPager 与 TierRail 的位置需要单独调参，目前隐藏在 md 以下

### 未决问题

- Physics scope 下 StarSpeck 仍是"星点"语义—— Maxwell / Schrödinger 页用稿纸方格反而更合身，待统一替换
- KnowledgePanel 在 Physics 下 `tier` 类型仍是 universe `TierId`，进入 Physics tier 会拿 null —— 等 Knowledge layer 完成 cross-section 支持后修
- HUD 胶囊的 backdrop-blur 在 Safari 16 之前的版本退化为半透明背景，需要在 dev console 验证 fallback

---

## 2026-05-16 — Session 15 · Phase 2 启动：Physics 板块 + Section 抽象重构

**参与**：用户 + Claude (Opus 4.7)

**目标**：CLAUDE.md 第一条定义的第二顶层板块 Physics 正式开工。一次性完成：①4 份新文档；②Section 抽象重构（让两板块共享 HUD/store）；③Physics 9 档骨架 + 占位；④P0 经典力学 + P4 量子力学两档完整 vertical slice。Universe 板块零回归。

### 本次完成

**A. 4 份新文档**

- `docs/design/09-physics-vision.md` — 产品愿景（9 档主题主线、深度阶梯 直觉/学院/前沿、与 Universe 互文映射表、marker variant 语义、9 档构图脚本骨架）
- `docs/develop/09-physics-implementation.md` — 实施指南（目录结构、physics-tier.ts 契约、3 个 marker variant 实现、PhysicsShell 模板、PR 拆分）
- `docs/design/10-section-architecture.md` — Section 抽象产品设计（SectionId × Tier × ViewMode 三层关系、未来扩展图）
- `docs/develop/10-section-refactor.md` — 重构指南（影响面 100+ 调用点、迁移步骤、回归测试清单、风险与降级）
- 索引/Phase 计划同步更新：`docs/README.md`、`docs/develop/06-phase-1-plan.md`（追加 Phase 2 章节）、`docs/design/01-vision-and-scope.md`（Phase 3→2 Physics 提前）

**B. Section 抽象层（新增）**

- `src/lib/section.ts`：`SectionId = "universe"|"physics"`、`SectionConfig` 类型、SECTIONS 注册表、`getSectionConfig` / `getSectionFromPath` / `getSectionRoute` / `defaultRouteForSection` / `inferSectionFromTier` / `viewModesForSection` / `sectionSupportsView`
- `src/lib/physics-tier.ts`：`PhysicsTierId = "P0".."P8"`、PHYSICS_TIERS / PHYSICS_TIER_ORDER / PHYSICS_TIER_ROUTES、`physicsTransitionKind`、`isPhysicsTierId`
- `src/lib/section.test.ts`：14 个新单测覆盖三层关系

**C. 重构（保留 Universe 零回归）**

- `src/lib/tier.ts`：拆 `UniverseTierId` / `PhysicsTierId` / `AnyTierId`；保留 `TierId` 为 UniverseTierId 的 alias；`TierMeta.id` 放宽到 string；加 `getViewMode(pathname)`、`isUniverseTierId`
- `src/lib/content.ts`：`TierContent.tier` 拓展到 `AnyTierId`
- `src/lib/content-schema.ts`：`tierIdSchema` enum 拓展为 17 个 id（universe 8 + physics 9）；`formatTierIssue` 接受 AnyTierId
- `src/store/useSectionStore.ts`（新）：state shape `{ section, currentTier, transition, ... }` + `setSection`（跨 section 安全切换）+ `setTier`（自动推断所属 section）
- `src/store/useUniverseStore.ts`：薄壳 re-export `useSectionStore as useUniverseStore`（避免改 100+ 个 import）
- `src/content/index.ts`（新）：跨板块 `getContentForTier` / `hasContentForTier`
- `src/components/hud/TierRail.tsx`：板块感知；按 pathname 切 tier 列表/路由/content registry；universe 仍走 useTierTransition（3D 相机），physics 与 universe-handwritten 都走 useHandwrittenTransition
- `src/components/hud/FloatingViewControl.tsx`：单段控件升级为三段（**Section** universe↔physics + **View** 3D↔Handwritten 在 physics 下 3D 灰态 + **Canvas** Deep↔Near 仅 handwritten 显示），SegmentOption 加 disabled 字段
- `src/components/hud/TopBar.tsx`：tier 标签 / frame 标签按 SectionConfig 自适应（geocentric → mks · SI）
- `src/components/hud/TunnelOverlay.tsx`：加 universe-tier guard
- `src/hooks/useSyncTier.ts`：签名 `(tier, section?)`，自动 infer，跨 section 切换原子化
- `src/camera/useTierTransition.ts`：early-return 当 to 不是 UniverseTierId
- `src/scenes-handwritten/useHandwrittenTransition.ts`：跨 section 路由用 getSectionRoute；transition kind 按 section 取
- `src/scenes-handwritten/ActiveHandwrittenScene.tsx`：guard 仅渲染 UniverseTierId
- `src/scenes/ActiveScene.tsx`：拆 renderScene → renderUniverseScene + isUniverseTierId guard

**D. Physics 骨架（PR2）**

- `src/content/physics/*`：9 个 P\*.ts 文件 + index.ts registry
  - **占位档（P1/P2/P3/P5/P6/P7/P8）**：每档至少 4 dataCards + 3 narrative（"coming soon" + "锚定话题"按本科/研究生/前沿三层 + "参考文献入口"）+ 2 sources，全部通过 Zod 校验
- `src/scenes-handwritten/physics/*`：ActivePhysicsHandwrittenScene + 9 个 Scene 文件 + 共享 PlaceholderScene 组件
- `src/scenes-handwritten/shared/HandwrittenMarker.tsx`：扩展 variant 加 `vector`（带箭头矢量）/ `wave`（手绘正弦曲线，固定 1.6 周期）/ `orbit`（椭圆轨道 + 中心核 + 轨道质点）
- `src/app/physics/*`：layout（包 PhysicsShell）+ page（重定向 → /physics/classical-mechanics）+ \_shell/PhysicsShell + 9 个子路由 page.tsx

**E. P0 经典力学 + P4 量子力学实体（PR3）**

- `src/content/physics/P0-classical-mechanics.ts`：8 dataCards（G、g、L=T−V、H=T+V、最小作用量、Kepler、Noether、约化质量）+ 4 narrative（牛顿三定律 / Lagrange-Hamilton / Noether-对称-桥到量子 / 经典混沌 KAM）+ 5 sources（Goldstein / Landau-Lifshitz / MIT 8.01 / Feynman / Noether 原文）+ 6 markers（newton-gravity / lagrangian-action / kepler-laws / noether / phase-space / chaos）
- `src/content/physics/P4-quantum-mechanics.ts`：8 dataCards（ℏ、h、Schrödinger 方程、Heisenberg 不确定性、de Broglie、本征值方程、概率诠释、精细结构 α）+ 4 narrative（双缝 / 算符与 bra-ket / 测量纠缠 EPR Bell / 退相干）+ 5 sources（Griffiths / Sakurai / Feynman Vol III / Bell 原文 / MIT 8.04）+ 6 markers（Schrödinger 方程 / 不确定性 / 双缝 / Bell 不等式 / 波函数 / 氢原子）
- `src/scenes-handwritten/physics/p0-classical-mechanics-hw/Scene.tsx`：四象限主图（单摆 + 弹簧+块 + 抛体+v₀ vector + Kepler 椭圆）+ 中央 `L = T − V` cartouche + 顶部相空间 portrait（3 圈嵌套椭圆 + 流场箭头）+ 外圈 6 markers（混用 vector/orbit/diamond/halo/starpoint variant）
- `src/scenes-handwritten/physics/p4-quantum-mechanics-hw/Scene.tsx`：三联画（左双缝干涉 9 条 wave wavefronts → 9 条 |ψ|² fringes / 中势阱 4 能级 E₁-E₄ + 概率密度 / 右 Bloch 球 + ψ 态向量 + |0⟩|1⟩ label）+ 顶部 Schrödinger 卷轴 + 外圈 6 markers（wave / orbit / halo / diamond 等）

### 关键决策

1. **路径 B（Section 抽象立即重构）** 而非短期 namespace 复制。理由：用户选了"重构优先"，且做完一次反向收益是后续每个新板块的接入成本接近 0。
2. **useUniverseStore = useSectionStore alias**。零破坏现有 100+ 处 `useUniverseStore` 引用；旧代码读 `currentTier` / `transition` 字段都仍工作。
3. **TierMeta.id 放宽到 string**。让同一个 TierMeta 类型既能装 UniverseTierId（T0-T7）又能装 PhysicsTierId（P0-P8），避免分裂出两个并行类型。
4. **Physics 占位档严控质量**：明确 "Coming soon" + 三层锚定话题 + 参考文献入口（不凑数）。这样占位 content 自身就是后续写作大纲。
5. **3 个新 marker variant 落地**：vector 箭头（力/动量/场）、wave 正弦（ψ/光波/概率波）、orbit 椭圆轨（原子/行星）。每个 ~30-60 行实现，复用 wobble filter。
6. **PhysicsShell 与 HandwrittenShell 完全平行结构**：唯一差异是 ActiveScene router 与无 ThemeToggle（已合并到 FloatingViewControl）。HUD 五件套（TopBar/SubjectCard/TierRail/KnowledgePanel/HoverTooltip）通过共享 store 全部跨板块工作。
7. **中文字符串 quote 嵌套**：narrative 中用 `「」` 而非 `""` 包关键词，避免破坏 TS 双引号字符串解析。

### 校验

- `pnpm check`：typecheck + lint(0/0) + format + lint:content + 67 tests（含 14 个新 section.test）全过
- `pnpm build`：**32 路由**（21 universe + 11 physics）全部静态预渲染
- `curl http://localhost:3033/physics/{9 档}` 全 200
- `curl http://localhost:3033/universe/{observable, handwritten/observable}` 全 200（零回归）

### 已知未完事项

- P1/P2/P3/P5/P6/P7/P8 实体内容（占位）：留待 Session 16-20 按月迭代
- Phase 2 还未实施部分：移动适配、Playwright e2e、Lighthouse CI（Stage 5-7）
- 3D 版 P0-A 后处理管线（`docs/develop/07-3d-implementation-plan.md`）仍未启动
- handwritten-theme 跨 section 共享 theme（夜版/日版偏好统一）—— 当前实现，未来如需 per-section 可拆

### 下次开始 (建议优先级)

1. **写实体内容**：P3 相对论 + P5 原子分子（与 P0/P4 形成 4 档展示样本，覆盖经典/相对论/量子/原子）
2. **手绘场景丰富**：把 P1-P3/P5-P8 的 PlaceholderScene 替换为各自的实质构图（PR3 的 P0/P4 是工艺样板）
3. **Stage 5.2 mobile 适配**：手绘版与物理板块同时受益
4. **3D 版 P0-A 后处理管线**：用 PostFX 让 3D 版也"亮"起来

### 未决问题

- Physics 板块 P0/P4 的 markers 当前是装饰性的（围绕主图外圈），是否要让用户点击后跳到 narrative 对应段落？目前是统一 openPanel(tier)
- P8 前沿话题集合是否要做成"用户可选 3-5 个深入"的多视图？还是固定一组？
- 是否需要为 Physics 单独的 SectionId color hint（与 Universe 板块视觉再分化）？当前共用 --hw-\* 变量，区别仅在 TopBar 文本

---

## 2026-05-16 — Session 14 · 手绘版视觉迭代 (P1.5.B 第二轮)

**参与**：用户 + Claude (Opus 4.7)

**目标**：Session 13 把 8 档手绘版跑起来后，用户看到视觉偏「线稿+点缀」过于克制；本轮加厚水彩晕染、改地球月球轨布局、夜版色调加暖，让"古卷轴 / 自然博物图鉴"质感立得住。期间附带修一个 `transform-origin` 的 SVG DOM 警告。

### 本次完成

**A. Bug 修复**

- `HandwrittenMarker` 报 React `Invalid DOM property 'transform-origin'`：原写法 `transform-origin={`${x} ${y}`}` 在 SVG JSX 里要么是 CSS 属性（须用 camelCase 且配合 `transform-box: fill-box`），要么是几何变换。**改成更稳的写法**：外层 `<g transform="translate(x y)">` 定位，内层 4 个变体（HaloDisk/Diamond/StarPoint/PinNeedle）的所有几何全部 cx/cy 取 0，scale 自然以中心为基准——彻底绕开 SVG transform-origin 的坑。

**B. T2 / T4 / T6 核心天体水彩晕染加厚**

- **T2 Great Attractor**：从 3 圈（70/42/18）加到 7 圈（140/110/88/66/46/28/16），其中 3 圈带 hash 错位（mimic 手工重涂）+ 16 道 radial accretion spikes。
- **T4 Sgr A\***：加 dust halo（110/84/60）+ accretion ring 椭圆 + Doppler beaming 双椭圆（左金右暗）+ event horizon + 8 道 corona rays。
- **T6 太阳**：从 4 层加到 6 层 wash（88/70/56/42/28/16）+ 3 段 hand-drawn 日珥弧路径 + 16 道 corona rays（长度按 i%3 错落）+ Sol 标签外推到 (-50, -66)。

**C. T7 月球轨缩小 + markers 重布**

- 月球轨从 `EARTH_R + 160`（=380）压到 `EARTH_R + 90`（=310），月球本身从 r=26 缩到 r=16，月斑也成比例缩。
- markers 投影从 scale 36 改 scale 28，并加 clamp 到 `EARTH_R + 75` 圆环——避免远 markers 跑到 viewBox 边缘吃 cartouche。

**D. 夜版色调加暖（深棕黑）**

`globals.css` 内 `:root, [data-hw-theme="night"]` 一组变量改：

- `--hw-bg`: `#0b0a14` → `#14110b`（青黑 → 深棕黑）
- `--hw-bg-edge`: `#15101a` → `#1f180f`
- `--hw-ink`: `#f5e7c8` → `#f5e2b8`（暖象牙微调）
- `--hw-ink-soft`: `#c8b896` → `#c8af7a`
- `--hw-ink-faint-solid`: `#7d6f50` → `#7d6a40`
- `--hw-blue`: `#6ad0ff` → `#8cc6e6`（蓝色降饱和，与暖底协调）
- `--hw-paper-opacity`: `0.32` → `0.4`（纸张颗粒更明显）
- `--hw-wash-warm`: `rgba(255, 180, 90, 0.18)` → `0.22`（暖晕加深）
- `--hw-wash-cool`: `rgba(106, 208, 255, 0.18)` → `rgba(140, 198, 230, 0.14)`（冷晕调暖）

日版（`[data-hw-theme="day"]`）保持不变。

**E. T0 / T1 / T3 / T5 wash 补强**

- **T0**：CMB wash 从 2 层加到 6 层（460/395/330/260/185/120）+ 中心金色 wash + 部分层错位 (-3,2)(2,-3) 模拟手工重涂
- **T1**：节点 wash 从 2 圈加到 4 圈（r×4.5 / ×3 / ×2 / r0），每个节点都有金色辉光晕
- **T3**：3 大星系 halo 从 2 圈加到 5 圈（r×2.2 / ×1.7 / ×1.3 / ×0.95 / ×0.6），层间错位 1-2px
- **T5**：恒星盘加 3 圈背景 wash（外冷 / 中暖 / 内金）让"邻居域"有空间纵深

### 关键决策

1. **不用 SVG `transform-origin` + `transform-box`**。虽然现代浏览器支持，但 framer-motion 的 SVG 变换还是有 edge case；用"外层 translate + 内层 0,0 绘制"是 React-19/SVG/framer 共同的最大公约数写法。
2. **水彩晕染策略**：每个核心天体至少 5-7 层 transparent circle，外层用 `fillOpacity` 极低（0.04-0.08）+ 1-2px 错位、中层稍重、内核 + stroke + wobble filter。绝不用 `feGaussianBlur`（pan/zoom 闪现 bug）。
3. **夜版色调加暖的取舍**：原 `#0b0a14` 接近 3D 版的 `bg-deep #000000`——视觉上"像 3D 版变种"。改 `#14110b` 后两板块色调拉开：3D 版 = 冷黑深空 / 手绘版 = 暖棕卷轴。这是用户感受到的"反差冲击"的关键。
4. **T7 月球轨缩到 310**：原 380 已经接近 viewBox 边缘 500，再加 markers 就完全溢出。310 让月球+月轨刚好落在 GEO（285）与 markers 外缘之间。

### 校验

- `pnpm typecheck` ✓ · `pnpm lint` ✓ (0 / 0) · `pnpm format:check` ✓（prettier 自动整理 5 个改动文件）· `pnpm test` ✓ (53/53) · `pnpm lint:content` ✓ · `pnpm build` ✓
- curl 全 8 档手绘路由 = 200 OK
- 3D 版回归未影响（globals.css 加的 `--hw-*` 变量与 Tailwind theme tokens 完全独立）

### 已知未完事项 / 视觉债

- T6 markers 仍是用 unit-sphere position arbitrary scale 投到椭圆轨道——与硬编码的 PLANETS 数组**位置不严格对齐**。未来要么把 marker 改成"绑到对应 PLANETS[id] 的 (x,y)"，要么接受 markers 作为"独立 pin"层级
- 手绘版日版（白底）目前未单独打磨视觉，本轮所有 wash 强度都按夜版调；日版可能需要再过一遍（暖晕在白底上会更明显，可能要降 opacity）
- T2 流线现在 36 条还是有点稀，可以加到 60-80 条但 DOM 节点预算（< 1500）要重新评估

### 下次开始 (建议优先级)

1. **3D 版 P0**：按 `docs/develop/07-3d-implementation-plan.md` § 2 启用 EffectComposer + 自定义粒子 shader，让 3D 版也"亮起来"，与手绘版形成对照
2. **mobile 适配**：Stage 5.2 章节模式
3. **Playwright e2e**：覆盖 T0→T7 + 主题切换 + marker click
4. **手绘日版独立微调**：把 wash opacity / wobble seed 单独为 day 主题调一遍

### 未决问题

- 用户体验完本轮迭代后，是否还要进一步加深"古卷轴"质感（如：边角的卷轴涡卷装饰、cartouche 替换为更复杂的 banner）？还是当前克制度刚好？
- T6 markers vs PLANETS 对齐策略二选一——等用户反馈

---

## 2026-05-16 — Session 13 · 手绘宇宙 8 档实装 (Phase 1.5.B 落地)

**参与**：用户 + Claude (Opus 4.7)

**目标**：紧接 Session 12 的文档底座，把 `/universe/handwritten` 板块从零做出来：骨架 + 全 8 档手绘 SVG 场景 + 双主题切换 + HUD 复用，达到"用户切到 `/universe/handwritten/observable` 立刻能用 TierRail 跨档浏览"的可用度。

### 本次完成

**A. 骨架与共享 primitive**

- `src/lib/handwritten-coords.ts`（+ 16 个单测覆盖三种投影 / depth ramp / hash01 / wrapAngle）
- `src/lib/handwritten-theme.ts`（主题枚举 + 切换工具）
- `src/lib/tier.ts` 追加 `TIER_ROUTES_HANDWRITTEN`、`HANDWRITTEN_PATH_PREFIX`、`isHandwrittenPath`、`tierRouteFor`（**只增不改**现有 3D 版字段）
- `src/store/useHandwrittenStore.ts`（Zustand + persist，theme + flourishes）
- `src/app/globals.css` 加 `--hw-*` 双主题 CSS 变量 + 6 个 `.hw-label-*` 字体 class
- `src/scenes-handwritten/shared/`：HandwrittenDefs（3 级 wobble filter / 220×220 papergrain pattern / 墨水渐变） / PaperBackground / WobbleCircle（三层水彩晕染） / InkPath（pathLength 入场） / StarSpeck / HandwrittenMarker（4 variant：halo/diamond/starpoint/pin） / HandwrittenLabel（6 variant） / Cartouche（夜版卷轴 banner） / usePrefersReducedMotion（用 useSyncExternalStore）
- `src/scenes-handwritten/ActiveHandwrittenScene.tsx`（lazy import 8 档 + cross-fade）
- `src/scenes-handwritten/useHandwrittenTransition.ts`（rAF 驱动 `useUniverseStore.transition`，1500ms）

**B. 路由与 Shell**

- `src/app/universe/handwritten/layout.tsx` + `page.tsx`（重定向到 observable）
- `_shell/HandwrittenShell.tsx`（持久 SVG canvas + 复用现有 TopBar/SubjectCard/TierRail/KnowledgePanel/HoverTooltip + ThemeToggle）
- `_shell/ThemeToggle.tsx`（右上角胶囊切换按钮）
- 8 个子路由 page.tsx（仅 useSyncTier）
- `src/components/hud/TierRail.tsx` 扩展为 `usePathname` 感知，自动跳手绘版或 3D 版（UI 结构不动）

**C. 全 8 档手绘场景**（plan 里 PR3+PR4 合并完成）

每档 ~200-300 行 TSX，构图按 `docs/design/08-handwritten-universe.md` § 8：

- **T0**：5 圈同心环（黄道/CMB/Reion/大尺度/BAO）+ 12 方位希腊字母罗盘 + 中心金色十字 + 36 条径向 hatching + polar 投影 markers
- **T1**：22 节点最近邻图 + pathLength 级联入场 + 3 个 voids 大圆虚线 + filament gas wash
- **T2**：36 条 Catmull-Rom 流线汇入 GA + Laniakea wobble 多边形 + 罗盘玫瑰
- **T3**：3 个 logspiral 旋涡（MW/M31/M33）+ 22 个矮星系希腊字母编号 + 重心十字 + 引力箭头
- **T4**：4 条 logspiral 旋臂（彩色 tint）+ 360 颗 arm star field + Sgr A\* 日蚀符号 + Sun 十字 + dark matter halo 虚线
- **T5**：3 圈距离环 + 邻居星座虚线 asterism + 25 颗 starpoint marker + 光谱图例 + 距离刻度尺
- **T6**：8 行星 + 4 矮行星按 log AU 椭圆轨道 + 黄道刻度环 + 130 点小行星带 + 160 点 Kuiper 带 + 4 层太阳晕 + 12 道日冕 + 土星环
- **T7**：220px 地球 + 15° 经纬格 + 4 个 wobble 大陆 + 极冠 + GEO 虚线 + 月球椭圆轨

### 关键决策

1. **React Compiler 不接受手写 useMemo**。所有 8 档场景 useMemo 全部移除——Compiler 自动 memoize，写了反而 `react-hooks/preserve-manual-memoization` 报错。
2. **`noUncheckedIndexedAccess` 全开**。数组下标返回 `T | undefined`，所有 Catmull-Rom / 最近邻代码必须显式 `!` 断言或 guard。
3. **`usePrefersReducedMotion` 用 `useSyncExternalStore`**。`react-hooks/set-state-in-effect` 不允许在 effect 里同步 setState；改用 `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` 一次解决 SSR + 订阅。
4. **HandwrittenShell 不 mount 整 HudShell**。HudShell 内含 TunnelOverlay（与 3D 相机耦合），改单独挑五个 HUD 子组件 absolute 注入。
5. **TierRail 改 pathname 感知**。`usePathname()` 判断 `isHandwrittenPath`，调对应 transition hook — 不影响 3D 版。
6. **过场用 rAF + `useUniverseStore.transition`**。手绘版无 3D 相机但仍共用 `transition.progress`，让 ActiveHandwrittenScene 做 SVG cross-fade，SubjectCard 等订阅 `transition.active` 的 HUD 也能正常工作。
7. **markers 100% 复用 3D 版数据**。`getTierContent(tier).markers` 直接读，position 经 `projectToSvg` 投影。
8. **T5 / T7 用 self-scaled projection**。T5 真实 pc 坐标 ~ ±0.5（scale 460），T7 markers 跳 5–6.6 范围（scale 36 + clamp）。

### 校验

- `pnpm typecheck` ✓ · `pnpm lint` ✓ (0 error / 0 warning) · `pnpm format:check` ✓ · `pnpm test` ✓ (53 / 53，含 16 个新 handwritten-coords 单测) · `pnpm lint:content` ✓ · `pnpm build` ✓ (21 路由全静态预渲染，9 个新 `/universe/handwritten/*`)
- `curl http://localhost:3033/universe/handwritten/{8 档}` 全 200
- `curl http://localhost:3033/universe/observable` 仍 200（3D 版无回归）

### 已知未完事项 / 视觉债

- mobile 适配：viewBox `xMidYMid meet` PC 端可用；mobile TierRail 仍 hidden（继承 3D 版 `md:flex`）——和 3D 版同步度先保持一致，后续 Stage 5.2 章节模式一起做
- Playwright e2e 暂未实装（Stage 7.3 待启）；本轮通过 curl + dev server 验证 200
- 视觉风格仍偏"线稿+点缀"，水彩晕染可以更厚重——已记忆为视觉债
- T7 月球椭圆轨视觉上略挤 markers 区，留待用户体验后调

### 下次开始 (建议优先级)

1. **手绘版视觉迭代**：跑起来后用户反馈，把"线稿味太重"的 Tier 加更厚 wash；尤其 T2 GA、T6 太阳晕可以更戏剧
2. **mobile 适配**（同时影响 3D 与手绘）：Stage 5.2 章节模式 — KnowledgePanel 改 bottom sheet，TierRail 改底部 chip row
3. **3D 版 P0 启动**：按 `docs/develop/07-3d-implementation-plan.md` § 2.1 启用 `<PostFX />` + ACES tone mapping，让 3D 版与手绘版形成"工程感 vs 学术感"对照
4. **Playwright e2e**：`tests/e2e/handwritten.spec.ts` 跑 T0→T7 + 主题切换

### 未决问题

- 手绘版的 reduced-motion 与 framer-motion 协作：`pathLength: 1` 立即态已实现，但用户系统级 reduce 下还是有 cross-fade 过场（800ms）——可改瞬切但损失"切换感"
- T6 markers 当前是基于 content 的 unit 球位置 + arbitrary scale 投影，与 PLANETS 数组的硬编码椭圆轨道**位置不对齐**——后续要么把 marker 改成"直接绑到对应行星的 (x,y)"，要么接受 markers 作为"独立 pin"
- 当前 `:root` 与 `[data-hw-theme="night"]` 共享一组变量；如果 3D 版以后也想引入"主题"，token 命名需重构

---

## 2026-05-16 — Session 12 · 双轨视觉文档底座 (Phase 1.5 启动)

**参与**：用户 + Claude (Opus 4.7)

**目标**：让项目同时启动两条视觉线——给现有 3D 板块写完整的"视觉升级路线图"（不动 3D 代码），并为 SVG 手绘宇宙板块 `/universe/handwritten` 写完风格规范与实施契约，为下一会话直接进入代码实施铺路。

### 本次完成

**4 份新文档（全中文，按现有 docs 风格）**：

1. `docs/design/07-3d-visual-upgrade.md` — 3D 视觉升级方向
   - 当前粗糙点定位（`pointsMaterial` 占位、后处理未启用、行星/地球缺贴图、Markers 千篇一律）
   - 目标气质（JWST 色彩科学 50% + Apollo 工程图 25% + 当代极简 15% + 科幻克制感 10%）
   - 8 档 Tier 视觉锚点表（hero shot 描述 + 参考来源）
   - P0/P1/P2 三档优先级路线图
   - 色彩管理（HDR linear + ACES filmic）
   - 与「克制」原则的协调（防止过曝、装饰循环、霓虹化）

2. `docs/develop/07-3d-implementation-plan.md` — 3D 升级实施清单
   - P0-A 后处理：`<PostFX />` 组件草图 + quality 检测 + 性能预算
   - P0-B 粒子 shader：vertex/fragment GLSL 草图（per-vertex size + attenuation + 圆形软边 + 色温）+ R3F 集成模式
   - P0-C SceneMarkers 四变体（HaloDisk/Diamond/StarPoint/PinNeedle）
   - P1-A 体积光晕（raymarch fragment 草图）
   - P1-B 真贴图：资产来源 + KTX2 压缩流程 + day/night shader + 大气
   - P2 Rayleigh / instancing / LOD / 自然现象彩蛋
   - 8 个 PR 拆分建议、风险与应对、不在本次范围

3. `docs/design/08-handwritten-universe.md` — 手绘宇宙双主题规范
   - 板块定位：与 3D 版对立互补（"宇宙的尺度震撼" vs "人类对宇宙的诗意凝视"）
   - 双主题色板：夜版 Cellarius Codex（深羊皮 + 金墨）+ 日版 Naturalist Atlas（米纸 + 炭墨）
   - 字体（复用现有 Fraunces/Inter/JetBrains Mono，**不引新字体**）
   - SVG 滤镜：3 级 wobble（baseFrequency 0.012/0.02/0.03，seed 7/13/22 固定）
   - 三层水彩晕（不用 feGaussianBlur，避免 pan/zoom 闪现）
   - 纸张纹理 pattern（220×220 极淡米点）
   - 装饰元素图典（罗盘、希腊字母、卷轴 cartouche、黄道刻度、天文符号）
   - 8 档场景构图脚本（夜版 + 日版意图）

4. `docs/develop/08-handwritten-implementation.md` — 手绘版实施指南
   - 与 3D 板块关系矩阵（路由、渲染层、数据、HUD、状态、过场逐项对照）
   - 目录结构（`src/app/universe/handwritten/*` + `src/scenes-handwritten/*` + `src/lib/handwritten-*`）
   - 数据投影：`projectToSvg(position, projection)` 三种模式（orthographic / polar / ecliptic）
   - 共享 primitive 契约：HandwrittenDefs / WobbleCircle / InkPath / HandwrittenMarker / Label / Cartouche / StarSpeck
   - 主题切换：`[data-hw-theme="day"]` CSS 变量覆盖；`useHandwrittenStore` 持久化
   - HUD 注入策略：`HandwrittenShell` 绝对定位现有 HUD 组件，不重写
   - 过场实现：`useHandwrittenTransition` 用 `requestAnimationFrame` 驱动 `transition.progress`，复用 `useUniverseStore.transition`
   - `lib/tier.ts` 扩展契约：**只追加** `TIER_ROUTES_HANDWRITTEN` 与 `isHandwrittenPath`
   - 5 个 PR 拆分（PR1 文档 / PR2 骨架 / PR3-4 场景 / PR5 收尾）
   - "不要做的事" 红线清单

**索引与计划更新**：

- `docs/README.md` — 加入 4 份新文档的目录索引
- `docs/develop/06-phase-1-plan.md` — 末尾追加 "Phase 1.5 双轨视觉" 章节，链向 1.5.A (3D 升级 6 项) + 1.5.B (手绘版 4 个 PR)
- `docs/develop/05-performance-budget.md` — 加 § 10 手绘版预算（SVG DOM < 1500 / chunk < 80 KB / 入场 ≤ 2s）+ § 11 3D 升级后的预算调整

### 关键决策

1. **本轮纯文档，不动代码**。用户明确选择"Task 1 全文档化 + Task 2 全 8 档 demo"——Task 1 视觉升级方向先写下来作为下一阶段执行蓝本，避免立刻动 3D 代码触发回归。
2. **双主题而非单主题**。夜版 Cellarius 古星图 + 日版自然博物图鉴并存，HUD 切换。理由：用户能看到两种艺术性表达的反差冲击，且日版可直接复用 fitneheal 同款 token，工程量增加 30% 但视觉收益翻倍。
3. **不引入 rough.js**。fitneheal 经验证明：原生 `feTurbulence + feDisplacementMap`（固定 seed）+ 多层透明圆水彩晕，比 rough.js 更轻量、更可控、SSR 友好。
4. **手绘版完全复用 3D 版数据/HUD/store**。新增板块靠 `getTierContent` 读 marker 投影到 2D viewBox；HUD 用绝对定位注入；只新增 `useHandwrittenStore`（theme + flourishes）这种板块独有状态。
5. **过场不复用 `useTierTransition`**。手绘版没有 3D 相机，`useHandwrittenTransition` 用 rAF 驱动 `transition.progress` 让 `ActiveHandwrittenScene` 做 SVG g.opacity cross-fade；保留 zoom/dissolve/tunnel 三种 kind 以便未来视觉分化。
6. **P0 = 后处理管线 + 自定义粒子 shader**。用户在 AskUserQuestion 里勾的两项，文档里明确标 P0 立即可做（依赖 `@react-three/postprocessing` 已在 package.json）。

### 校验

- 4 份新文档全部按现有 docs 风格写完（中文、`# NN — 标题`、紧凑表格、列表为主）
- 索引与 phase-1-plan / performance-budget 三处同步更新
- 现有 3D 代码、内容数据、其他文档**未被修改**

### 下次开始 (建议优先级)

1. **PR 2：手绘版骨架** — 按 `08-handwritten-implementation.md` § 10.PR2 清单：
   - `src/lib/handwritten-coords.ts` + `handwritten-theme.ts` + `lib/tier.ts` 扩展
   - `src/store/useHandwrittenStore.ts`
   - 8 个 shared primitive 组件（HandwrittenDefs / WobbleCircle / InkPath / Marker / Label / Cartouche / StarSpeck / PaperBackground）
   - `src/app/universe/handwritten/` 路由树（layout + page + 8 子路由 + \_shell）
   - `src/scenes-handwritten/ActiveHandwrittenScene.tsx` + `useHandwrittenTransition.ts`
   - `globals.css` 加 `--hw-*` CSS 变量与 `[data-hw-theme="day"]` 覆盖
   - TierRail 加 `usePathname` 感知（不破坏 3D 版）
2. **PR 3：场景批次 1（T0/T1/T6/T7）** — 4 档手绘 SVG 场景实现，每档 200–400 行
3. **PR 4：场景批次 2（T2/T3/T4/T5）**
4. **PR 5：reduced-motion 全板块降级 + 移动适配 + Playwright e2e**

### 未决问题

- 卷轴 cartouche 的复杂 path d 是否预生成静态？还是组件动态计算？倾向静态，减少首屏 JS。
- 主题切换的过渡时长（目前规范写 300ms opacity fade）实际跑起来可能偏短或偏长，需要 PR 2 跑起来微调。
- 8 档构图在 1000×1000 viewBox 内是否过于拥挤？尤其 T5 25 颗恒星 + 引线 label——可能需要单独把外圈做成 1200×1200 的特例。

---

## 2026-05-15 — Session 11 · 内容 lint · Zod schema + CI

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 Phase 1 - Stage 4.3 拿掉。给 T0–T7 的 `TierContent` 加运行时 schema 校验，覆盖 TypeScript 静态类型抓不到的业务规则（slug 形状、hex 颜色、URL 合法性、计数下限、position 边界、marker id 唯一）。

### 本次完成

**`src/lib/content-schema.ts`** — Zod schema 镜像 `lib/content.ts` 的类型

- `tierIdSchema`：枚举绑死 `TIER_ORDER`，避免新 tier 加进来时校验漏掉
- `slugSchema`：`/^[a-z0-9][a-z0-9-]*$/i`，max 64
- `hexColorSchema`：`/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/`
- `httpUrlSchema`：`z.string().url()` + 额外 `refine` 卡死 `http(s)://` 前缀
- `positionSchema`：`tuple([finite ≤ 10, finite ≤ 10, finite ≤ 10])` — finite check 拦 NaN/Infinity，±10 拦数量级写错（实际最远的 marker 是 T7 的 Moon 在 x=5）
- `dataCardSchema` / `narrativeSectionSchema` / `sourceRefSchema` / `sceneMarkerSchema`：逐字段最小长度 + 计数下限
- `tierContentSchema`：dataCards 4–12、narrative 3–8、sources 2–10、markers 1–20，加 `superRefine` 跨字段检查 marker id 在 tier 内唯一
- 导出 `formatTierIssue(tier, issue)` 给测试和 CLI 输出统一格式

**`src/lib/content-schema.test.ts`** — 20 个测试

- registry：所有 8 个 TierContent 都过完整 schema；任何一个失败时打印的错误信息按 `[T*] path: message` 格式聚合，下一个改坏内容的人能立刻定位
- marker schema 单测：非有限 position / 越界 position / 错 hex / 错 slug / 最小合法体
- source schema 单测：非 http / 未知 kind
- 跨字段：duplicate marker id、cards < 4、narrative < 3、sources < 2

**`scripts/lint-content.mjs`** — CLI 入口

- 一段 22 行的 Node 脚本，`spawnSync` 调 vitest 跑单测文件
- 不引 `tsx` / `ts-node` — 用现有 vitest TS loader，零新 dep
- 留出注释：未来要做 `--fix` 模式 (例如自动 sort markers by id) 再切到 `tsx`

**接线**

- `package.json`：新增 `lint:content` script + `check` 链路加这一步
- `.github/workflows/ci.yml`：在 format check 与 unit tests 之间插一行 `pnpm lint:content` —— 内容坏掉 vs. 代码坏掉，CI 信号分开
- `docs/develop/06-phase-1-plan.md`：4.3 勾掉 + 简短摘要

**校验**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm lint:content` ✓ (20/20) · `pnpm test` ✓ (37/37 = 之前 17 + 新增 20) · `pnpm build` ✓ (11 页)

### 关键决策

1. **校验放在 vitest 里跑，CLI 是薄壳**。原本计划是写一个独立的 lint-content.mjs 全程自己 import TS 模块 → 需要 `tsx`/`ts-node` 多一个 dev dep。改成 vitest 跑，零新 dep，错误输出也比 raw zod 美观；CLI 只是一个 `spawnSync` 包装。
2. **`positionSchema` 的 ±10 边界是软上限**。每个 tier 都有自己的坐标系，理论上写 per-tier max 更严格；但实际所有 marker (含 T7 Moon 在 x=5) 都在 ±10 内，写 per-tier 表反而是过早抽象。一旦有 tier 把 markers 推到 ±10 之外（比如 T6 加 Voyager 当 marker），再回来细化。
3. **`description: min(10)` 不卡 max**。希望 marker 描述能写充分；如果以后 tooltip 出现性能问题再加上限。
4. **`color` 必须 `#rrggbb` / `#rgb`**。Tailwind / R3F 都吃这两种；CSS 命名色 (`"red"`) 在 Three 里需要 fallback，统一禁掉好过运行时炸。
5. **`tierContentSchema.superRefine` 而不是预处理**。superRefine 能在 Zod 标准错误流里挂自定义 issue，让 `formatTierIssue` 输出风格一致；如果用 `.transform` 做预处理，校验失败时错误结构就分裂了。
6. **schema 暴露每一层 (dataCardSchema 等)** 而不是只有顶层。未来如果做 marker 编辑器或独立 narrative 文件，能复用子 schema 而不需要重写。

### 下次开始 (建议优先级)

1. **Stage 5.3 reduced-motion 全覆盖**：SceneMarkers 的 pulse / glow lerp、各 Tier `useFrame` 自转、splash 动画都需要在 `prefers-reduced-motion` 下走静态终态。已经有 `useUiStore.reducedMotion` 镜像，组件层接上就行。
2. **Stage 5.1 / 5.2 Tablet & Mobile 布局**：TierRail 在 < 768 px 直接隐藏，目前没替代导航。设计 mobile 章节模式。
3. **Stage 6.3 自动降级策略**：低端 GPU 上把 T0 CMB shell 6800 → 4000、T6 belt 3200 → 2000、T7 Earth 72×72 → 48×48；用 `useUiStore` 加一个 `quality: "high" | "low"` flag，组件读它决定 count。
4. **Stage 7.3 Playwright e2e**：T0 → T7 整链 happy-path。这是 Phase 1 DoD 最后一个硬指标。
5. **视觉债**（已记入 memory）：等用户主动要求时再开。下次可能的方向：引入 `@react-three/postprocessing` 的 `Bloom` + `Vignette`、T6/T7 行星用真贴图、自定义 shader points 支持 per-vertex size。

### 未决问题

- `pnpm lint:content` 跑 vitest 子集 (~470 ms)，比 `pnpm lint` (eslint, ~2 s) 还快，但已经被 `pnpm test` 覆盖了 — 双跑略冗余。如果以后构建时间敏感，CI 里可以删 lint:content step，保留 test step (test 跑同样的文件)。保留两个入口是为了 dev/editor 集成（lint:content 适合做 pre-commit hook）。
- schema 没校验内容文本里的中英文比例 / 学名规范 / 引用格式 (例如 `Tully et al. 2014` vs `Tully+2014`)。这些是风格层问题，超出 schema 能管的范围；如果以后写「内容风格指南」可以加 lint。
- 引入 `formatTierIssue` 但只在 test 输出错误时用了一次；CLI 入口现在还是直接走 vitest 默认输出。下一轮可以让 CLI 自己解析 Zod 错误并用 `formatTierIssue` 格式化输出，独立于 vitest reporter。
- Phase 1 DoD 进度：场景 + 内容 + 内容 lint 都拿掉了；剩余的是 Stage 5/6/7 三组质量条件。

---

## 2026-05-15 — Session 10 · T5/T6/T7 落地 · Phase 1 尺度链跑通

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 Stage 2.6 / 2.7 / 2.8 三层补齐，让 `/universe/observable` → `/universe/earth` 一条完整的 8 档尺度链真正能走通。Phase 1 Definition of Done 的第一个硬指标 ("用户能从 T0 一路下钻到 T7，每层都有 3D 场景 + 知识面板") 这一轮拿掉。

### 本次完成

**T5 Stellar Neighborhood (`src/scenes/tier5-stellar-neighborhood/`)**

- 数据方案选 C: 硬编码 25 颗 50 ly 内著名恒星，每颗带 (raH, decDeg, distLy, spec, mag)。源：SIMBAD + RECONS。延迟接 HYG 到 Phase 2，Phase 1 vertical slice 一轮收口。
- `equatorialToScene(raH, decDeg, distLy)`：标准赤道→直角变换 + 除以 50 ly 标量化。
- 光谱色板 `SPECTRAL_COLOR`：O/B/A/F/G/K/M + 白矮星 D + GIANT 共 9 色，色调跟 Harvard 序列对应 (O 蓝、A 白、G 黄、M 红)。
- 亮度由 mag 决定：`bright = clamp(1.5 − (mag+1.5)·0.13, 0.25, 1.45)` 然后乘进颜色 (per-vertex)。
- 分三层：mag ≤ 5 进 brightStars (size 0.07)；mag > 5 进 dimStars (size 0.034)；GIANT + 亮 K 型再叠一层暖色 halo (size 0.14)。Sun 在原点用 2 层 bloom。
- 背景 3000 颗 procedural 星点 — 模拟扁平 thick-disk 分布 (`sigma_z = 0.42`，半径 2.0 scene units)，per-vertex 冷暖色随机插值。
- 6 个 markers：Sun / Proxima Cen / Alpha Cen / Sirius / Vega / Tau Ceti，位置全部预计算 (raH, decDeg, distLy → x,y,z)。

**T6 Solar System (`src/scenes/tier6-solar-system/`)**

- **径向 log-warp 是这一层的关键**：`r_scene = 0.10 + 0.85 · log(1+r_AU) / log(51)`。这样 Mercury (0.39 AU) 落在 0.18，Neptune (30 AU) 落在 0.89，Pluto (39.48 AU) 落在 0.90 — 内外行星都在 [0.18, 0.95] 之间，肉眼能同时看清。线性刻度下 Mercury 会被压成噪点。
- 8 颗行星各自 `<sphereGeometry>` 真 3D 球 + 各自轨道环 (`ringGeometry` thin 0.0016 厚)。Saturn 多一层 `ringGeometry` 做光环 (相对盘面倾 ~25°)。
- 4 颗矮行星 (Ceres / Pluto / Haumea / Makemake)，每颗带自己的轨道环；Pluto / Haumea / Makemake 的轨道环按真实倾角 17°/28°/29° 倾斜。
- 太阳改成 4 层 mesh-based bloom (corona 0.16 / chromosphere 0.085 / photosphere 0.045 / core 0.022)，所有 BackSide-free additive。
- 主小行星带 1400 点散在 2.2–3.2 AU；Kuiper 带 1800 点散在 30–50 AU，后者厚度 ~0.04 (比小行星带厚 3 倍，对应真实倾角分布更广)。
- 6 个 markers：Sun / Earth / 主小行星带 / Jupiter / Saturn / Pluto。位置 = `orbitPos(a, phase, incl)` 预计算。

**T7 Earth (`src/scenes/tier7-earth/`)**

- Earth 用 `SphereGeometry(1, 72, 72)` 5184 个顶点，每顶点用 FBM 噪声组合 (低频陆地 + 高频海岸) 染色：composite < 0.48 → ocean (deep blue ↔ shallow blue)，composite ≥ 0.48 → land (low/high)。高纬 `|y| > 0.78` 混入冰白 (ice caps)，中纬高地 (composite > 0.5 且 |y| > 0.6) 混入雪 — 没贴材质就有了「蓝色弹珠」感。
- 大气层：2 个 BackSide sphereMesh (r=1.04 浅蓝 #7cbcff + r=1.12 深蓝 #3a72c4) 做 atmospheric scatter 错觉。
- Moon：半径 0.273 R⊕ 球，位置 (5, 0.15, 0) — 真实月距是 60.3 R⊕，这里压缩到 5 是为了能在同一屏看见，marker 的描述里保留真值。
- 地球同步轨道 (6.6 R⊕) 一条蓝色 hairline 圈。
- 4 个 markers：地球表面 / 大气层 / 地球同步轨道 / 月球。

**接线**

- `src/scenes/ActiveScene.tsx` 加 T5/T6/T7 case，dissolve 自动 work。
- `src/content/cosmos/index.ts` 加 T5/T6/T7 import + REGISTRY 条目。
- 新增 3 条路由 `/universe/{stellar-neighborhood,solar-system,earth}`，全都是 `'use client'` + `useSyncTier("Tx")` 一行实现。

**校验**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (**11 个静态预渲染页**：上轮 8 + 新增 3 条 T5/T6/T7 路由)

### 关键决策

1. **T5 用硬编码 25 颗恒星而不是接 HYG**。Phase 1 的目标是跑通整条链；25 颗已经覆盖肉眼夜空里最有故事的部分 (Sirius、Vega、Arcturus、Capella、Pollux、Procyon、Altair、Fomalhaut 等)。Phase 2 接 HYG 时只需把 `STARS` 数组换成从 JSON 解出来的数据，scene 一行不用动 — 数据/渲染分离已经做对了。
2. **T6 用 log 径向 warp 而不是 linear**。这是一个被「读」的图，不是一个被「算」的星历表。线性下内外行星至少差 80×，必须 warp。代价是轨道角速度直觉失真，但这点在 `narrative` 里被明确说了。
3. **T6 planets 用真 3D 球 (`sphereGeometry`) 而不是 points**。T5 之前所有层都是点云；从 T6 开始物体的「具体外形」开始有意义 (Saturn 的环、Earth 的相位)，所以这里切到 mesh。drawcall 多 (8 行星 × 3 mesh + 4 dwarf × 2 = ~28 draws)，但每个都很小，移动端可控。
4. **T7 月距压缩 60→5**。真实 60 R⊕ 的话需要相机退到 70+ 才能看见月亮，那地球细节就丢了。压缩到 5 是设计妥协，marker 数据保留真值。如果将来想做「真实标尺」模式，用 `useUiStore` 加 flag 即可。
5. **T7 用 SphereGeometry 预计算 per-vertex 色**。比写 fragment shader 简单一个量级，又规避了 R3F 的 shader 类型坑。代价：5184 顶点都是 CPU 算一次 (~50 ms)，但只在 `useMemo` 里算一次，运行时零代价。
6. **新场景统一沿用 SceneMarkers + 内容驱动 markers 的模式**。从 Session 7/8/9 累积下来，markers 的「内容定义 + 场景被动渲染」流程已经成型；T5/T6/T7 一上来就走这条，没再造轮子。

### 下次开始 (建议优先级)

1. **`pnpm dev` 走完整条尺度链**：splash → `/universe/observable` → T0→T1→T2→...→T7 一路下钻 (用 TierRail 点 ladder)，检查 dissolve / zoom / tunnel 过场在 T4↔T5 (dissolve)、T5↔T6 (tunnel)、T6↔T7 (zoom) 的实际观感。这是 Phase 1 e2e happy path 的第一次真实体验。
2. **Phase 1 - Stage 4.3 内容 lint**：现在 T0–T7 都有 markers，Zod schema 校验该上了。脚本应该校验：所有 markers 有 description + ≥ 2 个 data 条目、position 在 reasonable bounds 内、color 是合法 hex。
3. **Phase 1 - Stage 5 响应式 + a11y**：到此为止所有桌面渲染都已成型，但 Mobile / 键盘导航 / reduced-motion 三块基本没碰过。SceneMarkers 的 hover 在 touch 设备上根本无法触发，需要 tap-to-show 替代。
4. **Phase 1 - Stage 6 性能预算实测**：T7 5184 顶点 mesh + T6 ~28 draws + T0 13000+ points 这些点应该测一次低端机帧率。如果 < 30 fps，先压 T0 cmb shell (6800 → 4000) 与 T6 belt (1400+1800 → 1000+1200)。
5. **Phase 1 - Stage 7.3 e2e happy path 测试**：用 Playwright 写一个脚本，加载 `/` → 等 splash → 路由命中 `/universe/observable` → 点 TierRail 依次到 T7 → 验证每个 tier KnowledgePanel 渲染了对应内容。Phase 1 DoD 的最后一块。
6. **Phase 2 起点准备**：HYG 真实星表预处理脚本 (`scripts/build-hyg.mjs`)，输出 `public/data/hyg-50ly.json`，把 T5 STARS 替换成 fetch 加载。

### 未决问题

- **T6 行星没有自转**：所有行星只是固定球，整体被 group rotation 带着转。如果加每行星各自的 rotation，能让 Saturn 环的方向感更强，但 ~12 个独立 useFrame 节点的性能影响要测。
- **T6 dwarfs 轨道环倾斜公式不严格**：`rotation={[(Math.PI / 2) * (1 - d.incl / 90), 0, 0]}` 是经验插值，不是真的 Eulerian angles；Pluto 17° 看起来还行，但 Haumea 28° 倾的方向不准。Phase 2 接真 ephemeris 时要修。
- **T7 大陆形状是 FBM 噪声**，不像真实的非洲、欧亚。如果用户期望「看到真地球」，需要换成 NASA Blue Marble 贴图 — 但那要引一张 4 MB 的图，会破坏目前 `next/font` 之外零静态资产的策略。先观望用户反馈。
- **3 个 splash 路由跟着加**：`/universe` 现在的 server redirect 仍然指向 `/observable`，但是如果以后想加一条「直接打开太阳系」的入口（"我只想看行星"），UI 上没地方放。Stage 5 移动端章节模式时再设计。
- **远程仓库依然没建**。本地 commit history 已经堆了 7 个，Session 10 还没 commit。

---

## 2026-05-15 — Session 9 · T2/T3/T4 视觉对齐 + 交互标记扩展

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 Session 8 在 T0/T1 上建立的视觉语言（per-vertex 色 + 分层 bloom + SceneMarkers 接入）平铺到 T2/T3/T4 上，让整条尺度链的画面强度一致；同时为这三层补满 markers。

### 本次完成

**T2 Laniakea**

- 流线从 90 → 110 条，每条采样 50 → 56 点，t 走 `1 - (1-t)^1.7` ease-out → 采样点向 Great Attractor 端聚集。
- Spine per-vertex 色三段插值：cool blue (FLOW_COOL) → neutral white (FLOW_NEUTRAL) → hot amber (FLOW_HOT)，亮度沿 flow 从 0.5 升到 1.2，把「物质向引力盆地坠落」用色温显式画出来。
- Great Attractor 改 3 层 bloom (size 0.22 / 0.11 / 0.055，分别 ff8a4a / ffc878 / fff0c4)，不开 postprocessing 也有清晰的发光井感。
- 背景星系散点：per-vertex 亮度抖动 0.4–1.05，比上版的均匀灰更立体。
- 删除旧 ANCHORS 静态层，5 个团 (Local Group / Virgo / Norma / Centaurus / Hydra) 全部转成可 hover 的 markers，并新增 Great Attractor marker；6 个 markers 全部带 distance / member / Abell 编号等数据。

**T3 Local Group**

- 三大盘面 (MW / M31 / M33) 的盘点从 `theta = uniform(0, 2π)` 改为「2 主臂对数螺旋 + Gaussian 偏移」：`theta = (1/tan(16°))*ln(r/r0) + (0 or π) + N(0, σ·widen)`；其中 `widen` 在 bulge 区放宽到 3.5，让 bulge 不被强行拉成两条线，臂的密度只在盘的中段以外显著。
- Per-vertex 颜色 bulge 暖橙 → mid 中性 → 外缘冷蓝，亮度峰偏在 `r/R = 0.35` 处，符合典型旋涡盘面的明暗分布。
- 三个 primary 中心改成两层 bloom (size 0.072 dim 0.55 + 0.028 bright)；M33 通过 `bulgeBrightness = 0.6` 在生成时被调淡（暂未在材质上独立分层，留作下次细化）。
- 删除旧的 anchors 静态层，新增 6 个 markers：MW / M31 / M33 / LMC / SMC / Sgr dSph；位置全部走 `galacticToScene(l°, b°, d kpc)` 离线预计算后直接写入内容，scene unit = 1 Mpc。
- 背景星系场颜色加 per-vertex 亮度抖动，外圈不再均匀。
- 盘点 count：MW 720 → 900，M31 820 → 1100，M33 320 → 380，跟新的旋臂调制相匹配。

**T4 Milky Way**

- 4 条旋臂引入 `ARM_TINTS` 数组：Perseus (蓝)、Scutum-Centaurus (琥珀)、Sagittarius-Carina (蓝)、Outer/Norma (琥珀)，per-vertex 色按 `tint × radial × stoch` 写入。亮度峰偏在 `r=0.45` 处，让臂的「腰」最亮。
- 旋臂点数 1600 → 2000；位置 jitter 用 `hash01` 替代 `Math.random`，结果确定性（HMR / SSR 不会跳）。
- 盘背景场加 per-vertex 色：远处偏冷 (#9eb3ed)、近 bulge 偏暖 (#e6c79e)；亮度抖动 0.4–1.0。
- Sgr A\* 由原单点改成 3 层 bloom (size 0.22 / 0.11 / 0.05，ff8a4a / ffc878 / fff4d0)，看起来是有外晕的核黑洞，不再像普通星点。
- Sun 由原单点改成 2 层 bloom (size 0.08 + 0.034)。
- 新增 6 个 markers：Sgr A\* / Sun / Perseus / Scutum-Centaurus / Sagittarius-Carina / Outer arms；arm marker 位置在 `r=0.55` 上沿 log spiral 取四等分，对应内容文案。

**校验**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (8 个静态预渲染页)

### 关键决策

1. **markers 替代静态 anchors**：T2 和 T3 之前都有专门的 anchors Points 层用大点画出关键位置。这次把它们全部转成 SceneMarkers，由 content 层定义。理由：(a) 同一处不再画两次（静态白点 + 黑色 hover sphere）造成的视觉冲突；(b) hover 元数据现在所有 tier 都对齐；(c) 内容层和场景层的耦合从此走 marker 一条路。
2. **T4 改用 `hash01` 而不是 `Math.random`**：之前 T4 旋臂 / 盘 / 棒 / 晕全部用 `Math.random()`，每次 SSR 与 client 都会算出不同位置，存在轻微水合不一致风险。换成 `hash01(seed)` 后场景在每次启动都完全一样，HMR 和 dissolve crossfade 也更稳。
3. **T3 旋臂调制 vs 真盘几何**：Local Group 这一档真正画 spiral 是有点强行 — M31 在天上是大盘，但 760 kpc 的盘投影到 1 Mpc 场景里只有 0.04 单位的圆，肉眼分辨不出 spiral 细节。这次旋臂调制主要给 MW 和 M31 提供「不像高斯雾」的密度感，T4 是真正展示旋臂细节的地方。这是设计上的分工，不是 bug。
4. **arm tint 不画 HII region 节点**：本来还想在每条 arm 上加 5–8 个 HII region 热点，但 4 条 arm × 6 节点 × 多层 bloom 算下来加 100+ 个 draw call，得不偿失。per-vertex 色温已经足够把 arm 间区分开。
5. **GA / Sgr A\* 用同一 3 层 bloom 配色**：这是有意为之 — 这两处都是「引力盆地最低点」的视觉语义，画法统一让 T2→T4 过渡时用户能识别出同一类符号。
6. **预计算 marker 位置**：T3 的 6 个 markers 用 `galacticToScene(l, b, d_kpc)` 计算结果直接写进了 content；comment 里保留了原始 (l, b, d)，方便以后改坐标系时回溯。

### 下次开始 (建议优先级)

1. **`pnpm dev` 现场验收**：进 `/universe/laniakea` 看 GA bloom 和流线色温；进 `/universe/local-group` 看 MW / M31 是否有 spiral 感（应该比上版立体）；进 `/universe/milky-way` 看 4 条 arm 颜色差异和 Sgr A\* 发光。
2. **Phase 1 - Stage 2.6 / 2.7 / 2.8 (T5–T7)**：开始推进 T5 Stellar Neighborhood (50 ly 内主要恒星)。Phase 1 未决问题：HYG 星表数据接入方案 —— 本地预处理 JSON (静态 `public/data/hyg-50ly.json`) vs 运行时 fetch。我推荐前者，因为 50 ly 内主要恒星 ~150 颗，预处理后 < 20 KB，零网络抖动且能 SSR 预渲染色彩。
3. **Stage 4.3 Zod content lint**：现在 T0–T4 都有 markers，schema 校验该上了。
4. **Stage 5.3 reduced-motion**：T3 / T4 useFrame 里的旋转 + 颜色基本不受影响，但 markers 的 pulse + glow lerp 需要降级路径。
5. **性能预算实测**：T4 旋臂 2000 点 × Sgr A\* 3 层 bloom × markers 6 + Sun 2 层 + 棒 + 晕 + 盘 + bulge ≈ 13 draw call + 5500 顶点；移动端值得测一次。

### 未决问题

- T3 在轨道镜头里，MW 和 M31 因为盘倾角和距离差异，「spiral」感强度差别明显 — 倾角接近正视的盘看着才像 spiral，斜视盘只能看到一个椭圆。这是物理正确的现象，但用户可能误读为「M31 没画好」。可能需要在 KnowledgePanel 里加一句说明。
- T4 旋臂的 `Math.log(r/innerR)` 当 r 接近 innerR 时数值很小 → theta 几乎没变化，导致内侧的点叠在一起；如果有强 zoom 进 bulge 的需求，需要把 `innerR` 调大或换 modified-logarithmic 公式。
- 4 条 arms 的真实主臂/次臂之分（Drimmel 2000 vs Vallée 2017）还没在视觉上区分。Vallée 把 Scutum-Centaurus 和 Perseus 列为「真主臂」，Sagittarius 和 Local Arm 是次级；可以通过让 arm 0 / 1 的 stoch 范围抬高 ~20% 实现，但目前 4 臂在视觉上是等亮的。
- markers 的 hover tooltip 在密集区域（T3 MW 附近 LMC/SMC/Sag dSph 三个 marker 距离 < 0.05）可能会撞到一起。SceneMarkers 没有避让逻辑。

---

## 2026-05-15 — Session 8 · T0/T1 视觉真实化重做

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 T0 可见宇宙和 T1 宇宙纤维的视觉精度做一次硬抬。要求看上去像「真的在画宇宙」，不像在画占位骨架。所有 markers / `opacity` 合约 / 路由保持不变。

### 本次完成

**`src/lib/noise.ts` 扩底层**

- 新增 `fbm3D(x, y, z, octaves=4, lacunarity=2.05, gain=0.5)`：基于 `trigNoise3D` 做分形布朗运动叠加。多频率比单频更接近真实涨落场，是这次 T0 CMB 与 T1 wall 取样的核心。
- 新增 `smoothstep(e0, e1, x)`：标准 C1 平滑过渡，用于颜色温度插值。
- 新增 `mixRgb(a, b, t)`：RGB 三元组线性插值，避免每次手写。

**T0 重做 — 同心 lookback 球壳**

- 内层「dust haze」`BackSide` 暗蓝 sphereMesh (r≈0.55) — 给场景一个体积感底色，免得点云贴在虚空里。
- 「cosmic-web hint」(r≈0.72, 1700 pts) — FBM 阈值滤波，过滤后只剩高密度位置，per-vertex 色从靛蓝到暖橙；让用户从可见宇宙内部就「看到」cosmic web 的影子。
- 「galaxy field」(r≈0.92, 4400 pts) — FBM 密度 + 独立 FBM 温度通道，per-vertex 色三段插值 (blue → white → amber)，亮度由密度 × 随机 jitter 共同决定。这是星系颜色 (恒星形成 / 椭圆) 双峰分布的视觉近似。
- 「hero galaxies」(280 pts, larger size) — 只在 FBM 密度峰值处放，4 色暖色板。给眼睛锚点。
- 「reionization halo」(r≈0.985, 900 pts) — 薄薄一圈暖琥珀，代表第一代恒星照亮 IGM 的时刻。
- 「CMB anisotropy shell」(r≈1.02, 6800 pts) — 最外层。两通道 FBM (一低频一高频混叠) 把每个点染成红 / 中性 / 蓝。这是 Planck CMB 各向异性图的视觉引用 —— 它不是天文校准过的，但一眼就读得出「这是 surface of last scattering」。
- 三条 `BackSide` 正交 hairline 圈在 r=1 — 工程蓝图参考框。

**T1 重做 — 分层节点 + 曲线纤维 + 2-D walls**

- 节点改为分层：18 个 major (超星系团 hub) + 52 个 minor (filament endpoint)，用 hash01 + soft min-distance reject 散布在 VOLUME(1.45, 1.05, 1.45) 体素里。Major 间距 ≥0.55，Minor 距 Major ≥0.18 / 互距 ≥0.16，这样 hub 节点读起来确实「独立」。
- 边权重：每个 major 连最近 3 个、每个 minor 连最近 2 个；按两端节点等级打 `majorCount` 标签 (0/1/2)。
- 「filament 不再是直线」：每条边走二次 Bezier，中点沿垂直于 AB 方向偏移 `min(0.32, len·0.18)`；偏移方向用 `perpendicularOffset(A, B, seed)` 在 AB 法平面里随机转角。短边不会乱拐，长边自然弯曲，跟 N-body 模拟里的形态对得上。
- Spine per-vertex 颜色：`endProx = 1 - 4t(1-t)` 让中点 cool / 端点 hot；亮度按 `weight × (0.55 + 0.55·endProx)`。这等于在每条 filament 上画了一条「节点附近热、midspan 冷」的科学梯度。
- Gas halo 改为各向异性：以 Bezier 切线为长轴，垂直方向 σ ≈ 0.04 (随 weight 缩放)，沿切线另多一档 along-jitter；现在 halo 是雪茄状，不是球状，反映真实 WHIM 沿 filament 流。
- Wall sheets：扫所有 `r_max ≤ 1.05` 的 major triad 三角形，限 14 组；每组在 barycentric 内部撒 120 点 + FBM 阈值 (>0.52) + 三角法向方向 ±0.04 扰动。结果就是几张暗暗的 2-D 薄壁挂在 major 节点之间，把 Bond+1996 网络拓扑里 1-D filament + 2-D wall 都画上了。
- Major nodes 双层：核心点 (size 0.034) + 同位置 `majorHalo` 大点 (size 0.055) 做 bloom 效果，不上 postprocessing 也有发光感。Minor nodes 单层、稍小、颜色介于 hot 与 cool 之间。
- Void field 1200 点 (比上版 2400 砍了一半)，per-vertex 亮度 0.4–1.0 抖动；voids 现在真的看得出「稀」。

**校验**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (8 个静态预渲染页)

### 关键决策

1. **per-vertex 色而非 per-vertex size**。原生 `pointsMaterial` 不支持 per-vertex size，要做就得写 shader。我把亮度乘进 color，再用「多个 Points 层 + 不同 size」覆盖大小变化，性价比最高、不破坏其他场景的渲染模式。
2. **CMB 球壳放在 r=1.02，galaxy 放在 r=0.92**。markers 都在 r≈1.0，等于「夹」在两层之间，既不会被 CMB 噪点淹没，也不会被 galaxy 抢走焦点。
3. **wall sheets 用三角形 barycentric 采样**。比 Delaunay 简洁，配合 FBM 阈值后看起来不像棋盘格；限 14 组三角防止 wall 把整个场景糊成一片。
4. **filament 用二次 Bezier 不是三次 Catmull-Rom**。三次需要前后邻接信息，处理边界点麻烦；二次只需 A/midOffset/B，写起来干净。视觉上肉眼分辨不出。
5. **majorHalo 是同位置不同 size 的另一层 Points**。比 sprite 或 postprocessing bloom 便宜。size 0.055 在标准距离下读起来就是发光，不是单纯放大。
6. **保留所有 markers 位置不动**。本次只换底层视觉，contents 层 (`T0.ts` / `T1.ts`) 一行没改。markers 在新场景里仍然落在正确位置 (T0: 单位球面上、T1: VOLUME 内)。
7. **没引入新依赖**。所有几何 (Bezier、tangent、cross product、perpendicular basis) 手写；FBM 也只是 `trigNoise3D` 的叠加。包体积零增。

### 下次开始 (建议优先级)

1. **`pnpm dev` 现场验收 T0 / T1**：注意看 CMB 红蓝噪点是不是太花、wall sheets 在不同视角下密度是不是合适、major node 的 halo 在 zoom 远近时是否仍然 readable。
2. **T2 / T3 / T4 可以用同样手法升级**：T2 Laniakea 已经有 90 条 Catmull-Rom 流线，可以加 per-vertex color (沿流向温度梯度) + Great Attractor halo；T3 Local Group 的星系盘点 jitter 现在是高斯，可以加旋臂调制；T4 旋臂可以做 per-arm 色温差。
3. **T2 加 markers**：上轮建议里有 Virgo / Norma / Centaurus / Hydra + Great Attractor。
4. **`scripts/lint-content.mjs`** (Stage 4.3) 把 markers 字段也校验。
5. **降级路径**：CMB shell 6800 点 + spine 34×n 点在低端 GPU 上需要测一次实际帧率。`useUiStore.reducedMotion` 镜像如果为真，可以下调点数。

### 未决问题

- 三条参考圈在某些视角会和 CMB 蓝点重叠看不清。未来可以做成动态显隐 (镜头远时显，近时收掉)。
- Wall sheets 当前是静态采样，旋转时不会做视差差异化；如果想真模拟 weak-lensing 透射感，需要每帧重采样或用 shader。先观望。
- T0 CMB 颜色是「美学引用」不是真校准。如果以后想接 Planck 实图，可以把 sphere UV 包一张真的 CMB 纹理 texture，放弃 per-vertex 色。
- 主节点 halo size 0.055 在 reduced-motion + 远距离时偶尔会过亮；可能要按相机距离 scale。

---

## 2026-05-15 — Session 7 · T0/T1 真实内容填充 + 交互标记系统

**参与**：用户 + Kilo (mimo-v2.5-pro)

**目标**：为可见宇宙 (T0) 和宇宙纤维 (T1) 填充基于真实天文发现的科学内容，并构建 3D 交互标记系统让用户 hover 可见相关内容。

### 本次完成

**内容模型扩展**

- `src/lib/content.ts` 新增 `SceneMarker` 类型：
  - `id` / `name` / `position` / `description` / `data[]` / `color` / `size`
  - `TierContent` 新增可选 `markers` 字段
  - 设计为每个 Tier 可有多个交互标记点，代表真实天文结构

**T0 可见宇宙内容大幅扩充**

- `src/content/cosmos/T0.ts` 重写：
  - dataCards 从 4 个扩到 8 个：新增 CMB 温度 (2.7255 K, COBE/FIRAS)、哈勃常数 (67.4 km/s/Mpc, Planck 2018)、暗能量占比 (68.3%)、暗物质占比 (26.8%)
  - narrative 从 3 节扩到 6 节：新增「宇宙微波背景：最古老的光」(复合、CMB 发现史、COBE/WMAP/Planck)、「宇宙的成分」(暗能量/暗物质/重子比例、Planck 2018)、「重子声学振荡：宇宙的标尺」(BAO 物理机制、150 Mpc 特征尺度、SDSS/DES 确认)
  - sources 从 2 个扩到 5 个：新增 Conselice et al. 2016、Eisenstein et al. 2005 BAO、COBE/FIRAS
  - 新增 5 个交互 markers：
    1. **CMB** (宇宙微波背景) — z≈1100, 2.7255 K, 大爆炸后 ~38 万年
    2. **Hubble Ultra Deep Field** — ~10,000 星系, z≈6, 11.3 天曝光
    3. **CMB Cold Spot** — 波江座方向, ~5° 角径, ~70 μK 温差
    4. **BAO** (重子声学振荡) — ~150 Mpc 特征尺度, z≈1060 冻结
    5. **Great Attractor 方向** — ℓ=307°·b=+9°, ~200 Mpc, ~600 km/s 本动速度

**T1 宇宙纤维内容大幅扩充**

- `src/content/cosmos/T1.ts` 重写：
  - dataCards 从 4 个扩到 8 个：新增宇宙重子占比 (30–50% WHIM)、纤维截面 (2–5 Mpc)、Hercules-Corona 长城 (~3000 Mpc)、暗物质骨架占比 (~85%)
  - narrative 从 3 节扩到 5 节：新增「长城：纤维中的巨人」(CfA2 1989、Sloan 2005、Hercules-Corona 2014 争议)、「丢失的重子在哪里？」(WHIM 物理、Macquart 2020 FRB 色散测量)
  - sources 从 3 个扩到 5 个：新增 Gott et al. 2005 Sloan Great Wall、Tully et al. 2014 Laniakea
  - 新增 6 个交互 markers：
    1. **Sloan Great Wall** — 420 Mpc, 2005 SDSS
    2. **Boötes Void** — ~330 Mpc 直径, 1981 Kirshner, ~60 星系
    3. **CfA2 Great Wall** — ~500 Mpc, 1989 de Lapparent, 第一条长城
    4. **Hercules-Corona Borealis Great Wall** — ~3000 Mpc, 伽马暴, 有争议
    5. **KBC Void** (本地空洞) — ~600 Mpc, 2013, 哈勃张力关联
    6. **Pisces-Cetus Supercluster Complex** — ~300 Mpc, 包含 Laniakea

**3D 交互标记系统**

- `src/scenes/SceneMarkers.tsx` 新建：可复用的 R3F 交互标记组件
  - 每个 marker 渲染为双层球体（核心 + 光晕），additive blending
  - `onPointerOver` / `onPointerOut` / `onPointerMove` 更新 Zustand store
  - hover 时 glow 平滑插值 (lerp) + 微脉冲动效
  - 使用 `useRef` 避免 React hooks immutability lint 问题

- `src/components/knowledge/HoverTooltip.tsx` 新建：DOM 浮动提示组件
  - 跟随鼠标定位，AnimatePresence 入场/出场动画
  - 显示：标记颜色点 + 学名 + 中文名 + 描述 + data chips
  - 工程蓝图风格：corner ticks、font-mono、backdrop-blur

- `src/store/useUiStore.ts` 扩展：
  - 新增 `hoveredMarker: SceneMarker | null`
  - 新增 `hoverMousePos: { x, y }`
  - 新增 `setHoveredMarker` / `setHoverMousePos` actions

**场景接入**

- `src/scenes/tier0-observable/Tier0Scene.tsx` 更新：引入 SceneMarkers，T0 markers 从 content 层读取
- `src/scenes/tier1-cosmic-web/Tier1Scene.tsx` 更新：引入 SceneMarkers，T1 markers 从 content 层读取
- `src/app/universe/_shell/UniverseShell.tsx` 更新：在 Canvas 与 HudShell 之间插入 HoverTooltip

**校验**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (8 个静态预渲染页)

### 关键决策

1. **SceneMarker 定义在 content 层而非 scene 层**。marker 的 position 仍然耦合到 scene 的坐标系，但 name/description/data 这类纯内容归 content 管理。这样 content lint 脚本 (Stage 4.3) 以后可以校验 markers 里的数据完整性。
2. **HoverTooltip 用 DOM 而非 R3F**。tooltip 是纯文本信息卡片，用 DOM 渲染更易样式化、可访问性更好、不增加 Canvas 开销。位置通过 `onPointerMove` 的 `clientX/clientY` 传入 store。
3. **去掉 cursor 变更以过 lint**。新版 React hooks lint 规则禁止在回调中修改 `useThree()` 返回的 `gl`。cursor 变更移除；后续如果需要 pointer cursor，可以用 CSS `canvas { cursor: crosshair }` 或在 DOM 层处理。
4. **T0 内容扩充了 CMB、BAO、成分三节**。这三块是 Planck 2018 最核心的成果，也是用户理解宇宙学参数的基础。没有它们，T0 的 dataCards 里的数字缺乏物理背景。
5. **T1 内容扩充了长城和丢失重子两节**。CfA2 → Sloan → Hercules-Corona 的发现时间线直接展示了大尺度结构研究的演进。WHIM + FRB 色散测量是近 5 年最重要的突破之一。
6. **所有数据均注明文献来源**。dataCards 的 hint 字段和 sources 数组双重保证可追溯。

### 下次开始 (建议优先级)

1. **pnpm dev 现场验收**：进入 T0，hover 五个 marker 看 tooltip 内容和定位；切到 T1，hover 六个 marker；验证 marker 脉冲动效和 glow 插值。
2. **为 T2/T3/T4 也添加 markers**：T2 可以标记 Virgo/Norma/Centaurus/Hydra 团和 Great Attractor；T3 可以标记 MW/M31/M33/LMC/SMC；T4 可以标记旋臂名称、太阳位置、Sgr A\*。
3. **Stage 2.6/2.7/2.8 T5–T7 场景 + 内容**：需要先敲定 HYG 星表数据方案。
4. **Stage 4.3 Zod content lint**：校验所有 TierContent 字段完整性，包括新增的 markers。
5. **Stage 5.3 reduced-motion**：HoverTooltip 的 AnimatePresence 入场需要降级路径。

### 未决问题

- marker 的 position 目前是手动布置的，与程序化 scene 坐标系对齐但非精确。Phase 2 引入真实天文坐标后需要重新映射。
- HoverTooltip 在移动端无法 hover；需要 touch 替代方案 (tap → tooltip，再 tap 关闭)。
- `window.innerWidth` 在 SSR 时未定义。当前 HoverTooltip 只在 `/universe/*` 路由渲染 (client-only)，暂无问题；但如果移到 server component 里会报错。
- T0 markers 的 position 是在球壳表面坐标系；如果未来 scene 改变旋转速度或方向，marker 位置也需要跟着调整。

---

## 2026-05-15 — Session 6 · Tier 3/4 真场景 · 相机抛光 · 程序化 splash

**参与**：用户 + Claude (Opus 4.7)

**目标**：把尺度链从 T0–T2 推到 T0–T4；给三种过场加上真的相机移动；首页换成程序化入站。

### 本次完成

**Tier 3 — Local Group**

- `src/scenes/tier3-local-group/Tier3Scene.tsx` 新建：
  - 三个主旋涡 (MW / M31 / M33) 各自有指数轮廓盘点 + 倾角真实化 (M31 i≈77° / PA≈38°、M33 用另一组倾角向量)，盘心放发光锚点
  - 两个亮卫星 (LMC / SMC) 用半径不同的高斯团
  - 13 个矮成员 (Sgr dSph / UMi / Draco / Sculptor / Sextans / Carina / Fornax / Leo I / Leo II / NGC 6822 / IC 1613 / WLM / Aquarius) 用单一暖色点
  - 1900 个背景星系散点填外圈
  - 全部成员位置走 `galacticToScene(l°, b°, d_kpc)` 真实银坐标 → Three 直角系；scene unit = 1 Mpc
- `src/content/cosmos/T3.ts` 4 数据卡 (直径 / 成员数 / 总质量 / MW↔M31 距) + 3 节叙事 (两个引力中心 / 正在合并的命运 / 矮星系动物园) + 3 sources (Karachentsev 2013、Sohn 2020、McConnachie 2012)
- 新增路由 `src/app/universe/local-group/page.tsx` (useSyncTier "T3")

**Tier 4 — Milky Way**

- `src/scenes/tier4-milky-way/Tier4Scene.tsx` 新建：
  - 4 条 log-spiral 旋臂 (pitch 12°, Vallée 2017)，per-arm 400 点 + 与盘等比例 jitter
  - 2400 点的盘背景场 (薄盘厚度随半径减小)
  - 700 点的扁球凸核
  - 160 点的棒，相对 Sun-GC 线倾 25°
  - 130 点的球状星团晕 (sphere分布 + power-bias 集中向中心)
  - Sgr A\* 中心标记 (size 0.055 暖色) + 太阳标记 (R⊙=8.18 kpc / 15 kpc ≈ 0.545)
  - scene unit = 15 kpc (盘半径)
- `src/content/cosmos/T4.ts` 4 数据卡 (盘径 / 质量 / R⊙ / Sgr A* 质量) + 3 节叙事 (盘面棒旋臂 / 太阳位置 / Sgr A* 与中央黑洞) + 3 sources (GRAVITY 2019、Bland-Hawthorn & Gerhard 2016、EHT 2022)
- 新增路由 `src/app/universe/milky-way/page.tsx` (useSyncTier "T4")

**接入 ActiveScene**

- `src/scenes/ActiveScene.tsx` 加 T3 / T4 case，dissolve 路径自动支持新档

**Stage 1.5 相机抛光**

- 新增 `src/camera/tierFraming.ts`：单一真相源 `TIER_DEFAULT_DISTANCE` (T0=1.3 / T1=2.0 / T2=1.6 / T3=2.4 / T4=3.0 / T5–T7=2.4–2.6 占位)
- `src/camera/cameraRegistry.ts` 扩 API：`dollyBy(amount, duration)` / `spinAroundTarget(angle, duration)` / `settleForTier(tier, duration)`
- `src/camera/CameraRig.tsx` 实现：
  - dollyBy 沿当前 (camera − target) 方向 lerp 半径，保最小 0.12 防穿
  - spinAroundTarget 在水平面 (xz) 上绕 target 转，elevation y 保持
  - settleForTier 把相机调到目标 tier 的舒适半径 (方向不动)
- `src/camera/useTierTransition.ts` 重写：按过场种类挂相机动作 —— dissolve 走 dollyBy ±0.18 (按方向: 下钻为正、上推为负)；tunnel 走 spinAroundTarget 0.55 rad；zoom 走真 flyTo；onComplete 一律 settleForTier (tunnel 立即落、其他 0.35s blend)；reduced-motion 关掉所有花活，只走 200ms timeline + 即时 settle

**Stage 3.5 入站动画**

- 新增 `src/components/splash/SplashStars.tsx` —— 170 个 DOM 星点，hash01 确定性放射方向；中心脉冲点 + 全层 6.4s 缓旋 8°
- `src/app/page.tsx` 重写为 client 组件：四角 ticks / 顶部元数据 / SplashStars / BrandMark scale-in / 标题 + 副文 / CTA / 尾签，全部用 framer-motion `delay` 编排：BrandMark 在 2.2s，标题 2.9s，CTA 3.8s，尾签 4.2s；右下「跳过 · skip」在 1.1s 出现；6.4s 后自动 `router.push("/universe/observable")`
- `prefers-reduced-motion`：跳过整段动画，所有 delay 归零，渲染静态终态，不自动跳

**校验**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (8 个静态预渲染页：之前 6 + `/universe/local-group` + `/universe/milky-way`)

### 关键决策

1. **真实银坐标投影**。T3 所有成员走 `(l, b, d_kpc) → Three(x, y, z)`，y 轴 = 银道北极。M31 在 +x 方向 0.78 Mpc 处真实落点，不是为构图凑出来的。M31/M33 盘倾角是用「让镜头看到面 + 接近真实倾角」的向量做的妥协 —— 不是严格 (RA, DEC, PA) 推出来的法向量。Phase 2 引入真实 Eulerian angle 可以再修。
2. **TIER_DEFAULT_DISTANCE 一份**。CameraRig + useTierTransition 都引用 `tierFraming.ts`，避免之前两处副本漂移。这就是这次 1.5 抛光的「副产物 refactor」。
3. **dissolve 相机方向感**。dissolve 期间 dolly 量按 to-from 的 tierIndex 方向取符号：下钻 → 前推；上拉 → 后撤。这样 T2→T3 与 T3→T2 体感不一样。
4. **过场结束统一 settle**。无论 zoom/dissolve/tunnel，都在 onComplete 调 settleForTier。tunnel 立即 (overlay 还在)；其他短 blend (0.35s) 避免相机突跳。这让每个 tier 都有「一个被设计过的开场镜头」。
5. **splash 用 DOM 不用 R3F**。Splash 是一个一次性入站；引第二个 Canvas + R3F 给 / 路由不值。框架已经成型时再考虑统一。
6. **/ 路由设成 client**。原来是 server (静态 Link)；为了 useRouter + auto-advance 必须 client。SEO 影响：splash 文案仍在 SSR 出来的 HTML 里，搜索引擎能看到。
7. **reduced-motion 不自动跳**。看不到动画的用户被瞬间踢进 atlas 会觉得页面在抖。让他们自己点。

### 下次开始 (建议优先级)

1. **看效果**：`pnpm dev` 进 `/`，等 6 秒看 splash → 进入 `/universe/observable`；点 ladder 试 T0↔T1 (tunnel + spin)、T1↔T2 (dissolve + dolly)、T2→T3 (dissolve + dolly 下钻)、T3↔T4 (zoom + flyTo)；T3 应该能看到银河系本体 + M31 偏右、M33 在它附近；T4 应该能看到旋臂 + 太阳标志在 +x 方向。
2. **Stage 2.6 / 2.7 / 2.8**：T5 (Stellar Neighborhood, HYG 子集) → T6 (Solar System) → T7 (Earth)。T5 之前需要决定真实星表数据是预处理 JSON 还是运行时 fetch (Phase 1 计划里的未决项)。
3. **Stage 4.3 / 4.4**：内容 lint 脚本 (Zod schema 校验 `content/cosmos/*`) + 资产 credits 文档。
4. **Stage 5.3 `prefers-reduced-motion`**：splash 已经处理；下一步要把 KnowledgePanel 与 TierRail 的 stagger / spring 也走降级路径。
5. **真实数据接入**：在 T5 之前定方案 (HYG / NED)，避免 T5 卡住。

### 未决问题

- M31 / M33 盘倾角现在是「视觉妥协」(估算法向)，不是严格从 RA/DEC + position angle 算出来的。如果做天文学严谨化，需要从 ICRS → 银道 → 视线方向 + position angle 推出真实法向量。
- T4 旋臂数量到底是 2 主臂还是 4 主臂在文献里是有争议的 (Drimmel 2000 vs Vallée 2017)。当前用 4，且未做主-次臂区分。
- 自动跳 6.4s 是否合适？需要真机体验确认 —— 太短用户看不完文案，太长无聊。
- 远程仓库仍未建。本地 5 个 commit (上轮 4 个 + 本轮 1 个 pending)。

---

## 2026-05-15 — Session 5 · 视觉打磨：T0/T1/T2 真场景 · 全新 HUD · 知识面板 · 真过场

**参与**：用户 (调用 `/frontend-design`) + Claude (Opus 4.7)

**目标**：把 Universe 板块从"能跑"推到"看得出工业级品味"。Tier 0/1/2 都建成可视化、dissolve 真交叉淡入、tunnel 加 DOM 星流 + 尺度刻度滚动、HUD 全部重做、知识面板接上真内容。

### 设计方向 (写入决策日志)

**「工程蓝图 × 宇宙摄影」**：UI 看着像 JPL 工程师在黑纸上画的精密测量图。发丝线、目标十字、可拷贝的科学计数法、永远 tabular 的数字、信息密度由内容驱动。3D 是真实宇宙学，UI 是测量本身。

字体加层：在原 Inter / Noto Sans SC / JetBrains Mono 之上增加 **Fraunces** (variable serif, opsz + SOFT 轴) 作为 `--font-display`，用在英文学名 / 大标题 / `§NN` 章节编号；中文 display fallback 走系统 PingFang SC / Songti SC。所有字体由 next/font/google 引入。

### 本次完成

**字体与基础**

- `src/app/fonts.ts` — next/font 加载 Fraunces / Inter / JetBrains Mono，导出 CSS variables
- `src/app/globals.css` — 注册 `--font-display`，全局 h1–h4 自动用 display 字体并跑 SOFT axis；新增 ::selection 暖色高亮
- `src/app/layout.tsx` — 把三个字体 className 挂到 `<html>`

**端口切换**

- `package.json` — `dev` / `start` 都改用 `-p 3033`

**真实 Tier 场景**

- `src/scenes/tier0-observable/Tier0Scene.tsx` 重写：三层 additive 星壳 (内层冷蓝 dim 3200 点 / 中层中性 1800 点 / 外层暖色 accent 420 点) + 自定义 `trigNoise3D` 做簇团分布 (非均匀，可见结构) + 半透明蓝色等位环；group 接受 `opacity` prop 供 dissolve 父级驱动
- `src/scenes/tier1-cosmic-web/Tier1Scene.tsx` 新建：22 节点 (hash01 确定性) + 最近邻 2-link 连边 + 22 sample/边的 spine 点 + 28 sample/边的 halo 气体点 + 2400 背景空洞场星点 + 节点用 ✦ 暖色 additive
- `src/scenes/tier2-supercluster/Tier2Scene.tsx` 新建：90 条 Catmull-Rom 流线从外缘卷向 Great Attractor + 5 个已知锚点 (Local Group / Virgo / Norma / Centaurus / Hydra) + GA 暖色亮点 + 背景星系散点
- `src/lib/noise.ts` — `trigNoise3D` (三层 sin/cos 之和) + `hash01` (32bit imul 散列)，零依赖
- `src/scenes/ActiveScene.tsx` 重写：dissolve 时同时挂载 from + to 两个 scene，opacity = (1-p, p)；其他情况只挂 currentTier

**HUD 重做** (全部 framer-motion 入场 stagger)

- `src/components/hud/BrandMark.tsx` — fiducial 十字 + 三层同心圆 SVG
- `src/components/hud/icons.tsx` — `ArrowUpRight` / `Close` / `ExternalLink` 1px stroke SVG
- `src/components/hud/TopBar.tsx` — 顶部 48px hairline 元数据栏：左 brand mark + scale-atlas tag；右 frame / tier / live transit kind
- `src/components/hud/TierRail.tsx` — 右侧 64px 纵向 8 档 ladder：发丝线 tick + 当前态 warm 加粗 + hover 时左侧滑入 `display` 学名 + 尺度量级；点击触发 `useTierTransition().goTo()` 同时 `router.push` 对应 slug
- `src/components/hud/SubjectCard.tsx` — 左下卡片：tier 编码 / Fraunces 学名 / 中文名 + tagline / italic whisper / 3 个 inline data chips / 「open atlas →」按钮 (打开知识面板)；四角 ticks 装饰
- `src/components/hud/TunnelOverlay.tsx` — tunnel 过场专用：22 条 CSS 星流条带 (随机速度/起延 + 偶尔暖色) + 中心 `log₁₀ m` 滚动数字 + 上下 cool hairline 框 + 两侧 "frame lock" / "log₁₀ m" 标
- `src/components/hud/HudShell.tsx` 重写：组合 TopBar + main slot (SubjectCard) + TierRail + TunnelOverlay

**知识面板**

- `src/lib/content.ts` — `TierContent` / `DataCard` / `NarrativeSection` / `SourceRef` schema
- `src/content/cosmos/T0.ts` — Observable Universe 4 数据卡 + 3 节叙事 + 2 个 sources (Planck 2018, NASA WMAP)
- `src/content/cosmos/T1.ts` — Cosmic Web 4 数据卡 + 3 节叙事 + 3 sources (Macquart 2020, SDSS, Bond+1996)
- `src/content/cosmos/T2.ts` — Laniakea 4 数据卡 + 3 节叙事 + 3 sources (Tully+2014, Pomarède+2024, NED)
- `src/content/cosmos/index.ts` — `getTierContent(tier)` / `hasTierContent`
- `src/components/knowledge/DataCard.tsx` — 数据卡 (label / latin / value tabular / hint + hover 蓝色 hairline 扫光)
- `src/components/knowledge/NarrativeSection.tsx` — `§01` 编号 + display 标题 + 1.78 行高正文
- `src/components/knowledge/SourcesList.tsx` — `[paper] / [agency] / [wiki]` kind 标 + 外链图标
- `src/components/knowledge/KnowledgePanel.tsx` — Sheet (480px 宽) + sticky header (tier·name·close) + Hero + DataCards grid (2 col) + 多节 narrative + sources + footer；stagger reveal (delayChildren 0.12, staggerChildren 0.08)

**路由 / 状态同步**

- `src/lib/tier.ts` — 新增 `TIER_ROUTES` + `tierFromSlug`
- `src/hooks/useSyncTier.ts` — tier 路由页用，挂载时把 store 同步到 URL (但过场进行中不抢)
- `src/app/universe/page.tsx` — server redirect 到 `/universe/observable`
- `src/app/universe/{observable,cosmic-web,laniakea}/page.tsx` — `useSyncTier("T*")`，render null (视觉全在 layout)
- `src/app/universe/_shell/UniverseShell.tsx` 重写：Canvas + HudShell + KnowledgePanel；children (route pages) 隐藏渲染

**入口 splash**

- `src/app/page.tsx` 重写：四角 ticks + 顶部 / 底部 mono 元数据带 + 中心 BrandMark + display 标题 (中英混排, "漫游宇宙" 用 italic 轴) + enter-the-atlas CTA + 「T0 → T7 / 8 scales / single canvas」尾签

**清理**

- 删除旧的 `src/components/hud/TransitionOverlay.tsx` (被 TunnelOverlay 取代；dissolve 由场景层负责)

**检查全绿**

- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (6 个静态预渲染页：`/`, `/universe` redirect, `/universe/observable`, `/universe/cosmic-web`, `/universe/laniakea`, `/_not-found`)

### 关键决策

1. **加 Fraunces 作为 display 字体**。原 visual-style 文档只允许同字体不同字重；本次把它放宽为「display = serif (Fraunces / Noto Serif SC), body = sans (Inter / Noto Sans SC), mono = JetBrains Mono」。理由：科学出版物气质 + 工程蓝图的对话感，纯 sans 撑不起。下一轮如果要回收这个决策，把 `font-display` 改回指向 sans 即可，CSS 已收口。
2. **过场分工**：dissolve 由场景层负责 (ActiveScene 同时挂两个 Scene，opacity 互补)。tunnel 由 HUD 层负责 (DOM 星流 + 中心数字 ticker)。zoom 暂时是硬切 —— 真相机飞跃留给 Stage 1.5 后续，等更多档场景到位后再编排。
3. **内容用 TS 模块而非 MDX**。Phase 1 不引 MDX 构建链；TS 模块 + Zod schema 已经够好。Hot reload 也直接。
4. **tier 路由用「URL → store」单向同步**。`useSyncTier` 只在挂载时把 store 调到自己代表的 tier；TierRail 反过来 `router.push` + `goTo()`。过场进行中 useSyncTier 不抢。
5. **TunnelOverlay 用 `requestAnimationFrame` 直接读 store**，绕过 React re-render 频率。
6. **场景 opacity 通过 useFrame 写到 material.opacity**，不每帧 setState。

### 下次开始 (建议优先级)

1. **看效果**：`pnpm dev` (3033)，访问 `/` → `/universe/observable`，过场到 T1 / T2 验证 dissolve 与 tunnel 的实际观感；可能需要微调 streamline 密度、star 数量、过场时长。
2. **Stage 1.5 后续**：dissolve 期间相机做一次轻微 dolly (前推 0.15)；tunnel 期间相机做一次旋转，让方向感更明显。
3. **Stage 2.4 / 2.5**：Tier 3 (Local Group + Andromeda + Milky Way 标志) 与 Tier 4 (Milky Way 盘面 + 旋臂 + 太阳标记)。
4. **`/` 入站动画**：5–7 秒程序化动画 (BrandMark scale-in → 星点扩散 → 自动转入 `/universe/observable`)，加 Skip 按钮。
5. **`prefers-reduced-motion`**：TierRail 与 KnowledgePanel 的 stagger / spring 全部要走降级路径 (现在 framer-motion 没走)。

### 未决问题

- Fraunces SOFT axis 在 Variable Font fallback 上的表现需在真机验证。
- Tier 0 中三层星壳的 noise 阈值是经验值；可能在不同 GPU 上点数分布观感差异较大。
- TierRail 在 < 768px 下被隐藏 —— 移动端需要替代导航 (Stage 5)。
- 远程仓库仍未建。本地 4 个 commit。

---

## 2026-05-15 — Session 4 · 持久 Canvas + CameraRig + 过场骨架 + Tier 0 占位场景

**参与**：用户 + Claude (Opus 4.7)

**目标**：Stage 1.3 / 1.4 / 1.5 三块基础设施跑通，让 `/universe` 路由能挂上持久 `<Canvas>`、用户能点击切 Tier 触发过场，Tier 0 至少有一个能动的占位场景。

### 本次完成

- `/universe` 路由就位：
  - `app/universe/layout.tsx` (server) → `app/universe/_shell/UniverseShell.tsx` (`'use client'`)
  - `_shell` 持久 `<Canvas>`：相机初始 (0, 0, 3)，FOV 50，DPR [1,2]，背景纯黑
- `src/camera/cameraRegistry.ts` — 模块级 `CameraRigApi` 注册表，把 R3F 内的相机操作暴露给外部 hook (避免跨 React/Three 边界)
- `src/camera/CameraRig.tsx` — `flyTo` (GSAP timeline，可选 FOV 同步) / `jumpTo` (reduced-motion 用) / `setUserControl`；内挂 `OrbitControls` 用 damping
- `src/camera/useTierTransition.ts` — `goTo(tier)` hook：查 `transitionKind`，按 `zoom 1.2s / dissolve 1.5s / tunnel 1.8s` 起 GSAP timeline，过程中持续把 progress 推到 store，结束调 `finishTransition` 翻 currentTier。`prefers-reduced-motion` 自动降到 200ms
- `src/scenes/ActiveScene.tsx` — 按 `currentTier` 路由场景；目前只接 Tier 0，其余 return null
- `src/scenes/tier0-observable/Tier0Scene.tsx` — 4500 颗 additive blending 星点形成的薄球壳，绕 Y 轴慢自转 (0.015 rad/s)
- `src/components/hud/HudShell.tsx` — Stage 之上的 HUD 框架：左上 logo、右上 `ScaleBar`
- `src/components/hud/TransitionOverlay.tsx` — 过场期间的全屏黑色遮罩，按 kind 渐变到不同最大透明度 (zoom 0.2 / dissolve 0.55 / tunnel 0.95)，掩护场景切换
- `src/app/universe/page.tsx` — 8 个 Tier 按钮，点哪个跑 `useTierTransition().goTo(...)`，过场进行中按钮禁用
- `src/app/page.tsx` — 首页加 "进入宇宙 →" 链接到 `/universe`
- 全链路绿：`pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓ (`/`, `/universe`, `/_not-found` 静态预渲染)

### 关键决策

1. **Layout 拆 server + client shell**：`layout.tsx` 是 server component，只 import & 渲染 `'use client'` 的 `UniverseShell`。这样以后 layout 还能加 SEO metadata / 静态预取，不会被整层 client 染色。
2. **CameraRig 用模块级注册表，不用 React Context**。注册表方案让相机 API 可以在任何代码 (包括非 React 的 GSAP 回调) 里访问，不用挂 provider；缺点是单 Canvas 假设。我们整站只有一个 `<Canvas>`，合适。
3. **`useTierTransition` Phase 0 只驱动 progress + 最终翻 tier**。真正的相机移动 / 场景 cross-fade 在 Stage 2 跟着各 Tier 一起接入 (现在没有目标可飞)。`TransitionOverlay` 用不同 opacity 让用户先 "感觉到三种过场不一样"。
4. **`prefers-reduced-motion` 走运行时检测而不是 CSS**。CSS 那一层已在 `globals.css` 砍 animation/transition；JS 这层需要单独看 `matchMedia`，所以 hook 内自检。

### 下次开始 (建议优先级)

1. **Stage 2.2 / 2.3**：Tier 1 (Cosmic Web 程序化纤维) 与 Tier 2 (Laniakea 占位)；让多个 Tier 都有可看的场景之后，过场效果才有意义。
2. **Stage 1.5 完善版**：dissolve 把新旧场景同时挂载并交叉淡入；tunnel 加星流条带 + 尺度刻度滚动；reduced-motion 跳切。
3. **HUD / 面包屑**：把 ScaleBar 升级为可点击的尺度阶梯导航 (8 个档位 + 当前位置高亮)。
4. **可选**：跑 `pnpm dev` 手动验证一次 `/universe` 的浏览器表现 (build 静态通过不代表渲染没问题)。

### 未决问题

- OrbitControls 的 ref 类型 R3F+drei 没暴露好，目前用 `as never`。等 drei 类型修了再换。
- `prefersReducedMotion()` 每次 transition 都查 matchMedia 是浪费，可以监听变化写入 `useUiStore.reducedMotion`。Stage 5 做 a11y 一并补。
- 没建远程仓库；本地 3 个 commit。

---

## 2026-05-15 — Session 3 · CI + UI primitives + Tier 基础设施

**参与**：用户 + Claude (Opus 4.7)

**目标**：跑通 Phase 1 - Stage 0.5、0.6，并把 Stage 1 里所有非渲染的基础设施 (Tier 元信息、坐标/单位、Zustand stores) 一并落地，让下一轮可以直接做持久 `<Canvas>` 与相机系统。

### 本次完成

- `.github/workflows/ci.yml` — pnpm 10 + Node 22；跑 typecheck / lint / format:check / test / build
- `src/components/ui/Button.tsx` — `primary` / `ghost` / `subtle` 三种变体，`sm` / `md` 两种尺寸，focus-visible 可访问环
- `src/components/ui/Panel.tsx` — `bg-bg-panel` 半透明卡片，可选 `elevated` 用 `bg-bg-elevated`
- `src/components/ui/Sheet.tsx` — 右侧 / 底部两种侧滑面板，AnimatePresence + product-ease，Esc 关闭，背景遮罩点击关闭
- `src/components/ui/ScaleBar.tsx` — 当前 Tier 简码 + 中文名 + 尺度量级 (`8.8 × 10²⁶ m` 这种)
- `src/lib/tier.ts` — `TierId`/`TierMeta` 类型、8 Tier 元信息表、`tierIndex`/`nextTier`/`prevTier`、`transitionKind(from, to)` (按设计表查邻接对，非邻接默认 tunnel)
- `src/lib/coords.ts` — IAU/NIST 距离单位常量 + `toMeters`/`fromMeters`/`convertDistance`
- `src/lib/format.ts` — `formatNumber` (大/小数自动切科学计数法，Unicode 上标)、`formatDistance`、`formatScaleMeters`、`toSuperscript`
- `src/store/useUniverseStore.ts` — 当前 Tier / 焦点对象 / 过场状态 + start/progress/finish/cancel actions
- `src/store/useUiStore.ts` — 知识面板开关 / contentId / prefers-reduced-motion 镜像
- `src/lib/tier.test.ts` + `src/lib/format.test.ts` — 17 个单测全绿 (顺序、对称、过场表、科学计数、可访问的非有限值降级)
- 全链路绿：`pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm format:check` ✓ · `pnpm test` (17/17) ✓ · `pnpm build` ✓

### 关键决策

1. **`transitionKind` 用设计表而不是按 ratio 算**。原因：T6→T7 实际跨 10⁶，但设计上是 zoom (相机一直在系统内推进)，机械算 ratio 会把它误判成 tunnel。改用 `ADJACENT_TRANSITION` lookup，邻接对按设计意图，非邻接默认 tunnel — Phase 2 真用到长跳时再细化。
2. **`formatNumber` 用 Unicode 上标而不是 `<sup>`**。理由：可拷贝、可在 monospace 数字上对齐、不依赖富文本上下文。
3. **store 文件不打 `'use client'`**。Zustand 是纯模块，只有读它的组件需要 client；保留 store 作为同构模块更灵活。
4. **`Sheet` 用 framer-motion**。组件本身打 `'use client'`；动画时长 320ms 用 product-ease 与文档保持一致。

### 下次开始 (建议优先级)

1. **Stage 1.3 + 1.4 + 1.5**：`/universe` 路由 + 持久 `<Canvas>` layout + `CameraRig` (`flyTo` API) + `useTierTransition` (zoom / dissolve / tunnel 三种骨架)。这是进入 Tier 0 场景的最后一块基础设施。
2. **Stage 2.1**：写 Tier 0 (Observable Universe) 的最小可视化 — 球壳 + 程序化星点 + 慢速自转。
3. **HUD 与面包屑**：当 1.3-1.5 完成后开始接上 ScaleBar / Sheet。

### 未决问题

- 是否要在 `<Canvas>` 外用 `next/dynamic({ ssr: false })` 包一层？现在倾向直接 `'use client'` + `Suspense fallback`，更简单；如果遇到 hydration 报错再换。
- 真实数据 (HYG / NED) 接入方式仍未定 — Stage 2.6 前要选。
- 远程 git 仓库仍未建。本地 history：commit 1 (scaffold + docs)，commit 2 (本次 CI + UI primitives + Tier infra)。

---

## 2026-05-15 — Session 2 · Scaffold 落地 + Git 初始化

**参与**：用户 + Claude (Opus 4.7)

**目标**：把 Phase 1 - Stage 0.3 / 0.4 跑通：搭起 Next.js 16 + R3F + Tailwind v4 + 一整套工具链；初始化 git 仓库并落第一个 commit。

### 本次完成

- `git init -b main`，全局 user 已配置 (supwils / shang2017@yahoo.com)
- `.gitignore` (Next/pnpm/playwright/coverage/.claude local)
- `package.json` — Next 16 + React 19 + TS 5.9 + Tailwind v4 + R3F 9 + drei 10 + postprocessing 3 + GSAP 3.15 + Framer Motion 12 + Zustand 5 + Zod 3 + Vitest 2 + Happy DOM + Testing Library + ESLint 9 + Prettier 3
- `tsconfig.json` — strict + noUncheckedIndexedAccess + `@/*` 路径别名
- `next.config.ts` — reactStrictMode, optimizePackageImports for three/drei
- `postcss.config.mjs` — Tailwind v4 PostCSS plugin
- `eslint.config.mjs` — flat config，直接用 `eslint-config-next` v16 的 flat export (避开 FlatCompat 循环引用 bug)
- `.prettierrc.json` + `.prettierignore` (with tailwindcss plugin)
- `vitest.config.ts` — happy-dom + `@/*` alias
- `src/app/{layout,page}.tsx` — 占位首屏
- `src/app/globals.css` — Tailwind v4 + `@theme` 定义所有 design tokens (bg-/fg-/accent-/字体/缓动)
- `src/lib/cn.ts` — clsx 包装
- `README.md` — quickstart + 文档入口
- `pnpm install` 通过 (512 包)，white-listed esbuild/sharp/unrs-resolver native build
- `pnpm typecheck` ✓
- `pnpm lint` ✓
- `pnpm format:check` ✓
- `pnpm build` ✓ — Next 16 Turbopack，3 个静态页 (含 \_not-found) 预渲染成功
- 首个 commit (待提交)

### 关键决策

1. **ESLint 用 next 16 的 flat export**：`import next from "eslint-config-next"` + spread。@eslint/eslintrc 的 FlatCompat 与 eslint-config-next 16 + react 插件有循环引用 bug，直接绕开。
2. **`pnpm.onlyBuiltDependencies`** 显式列 esbuild/sharp/unrs-resolver，避免每次 install 都弹批准。
3. **Design tokens 走 Tailwind v4 `@theme`**：所有颜色 / 字体 / 缓动以 CSS variable 形式定义，Tailwind 自动暴露成 utility (`bg-bg-deep`, `text-fg-secondary`, `font-mono`, ...)。无需 `tailwind.config.ts`。
4. **`.claude/settings.local.json` 加入 `.gitignore`**：个人 bypass 权限不进库。

### 下次开始 (建议优先级)

1. **Phase 1 - Stage 0.5**：写 GitHub Actions CI workflow (`.github/workflows/ci.yml` 跑 typecheck/lint/format/test/build)。
2. **Phase 1 - Stage 0.6 剩余部分**：写基础 UI 组件 `Button`, `Panel`, `Sheet`, `ScaleBar` (`src/components/ui/`)。
3. **Phase 1 - Stage 1.1 ~ 1.6**：Tier 元信息表、坐标工具、`<Canvas>` 持久 layout、CameraRig、过场 hook、Zustand stores。这是进入 Scene 渲染前的基础设施。

### 未决问题

- 是否要立刻接 Playwright (e2e)？参考项目装了；我们 Stage 7 才用，可以推迟。
- Three 0.184 / Zod 4 / Vitest 4 都有新版，先用稳定的。升级前要先验证 R3F 9 与新 three 的兼容性。
- 远程仓库 (GitHub) 未建，本地 git only。需要时执行 `gh repo create` 或手工建远端再 push。

---

## 2026-05-15 — Session 1 · Foundation 文档启动

**参与**：用户 + Claude (Opus 4.7)

**目标**：从零搭起项目骨架。商定语言/协作规则、写完第一批设计与工程文档、定下技术栈、列出 Phase 1 任务清单。

### 本次完成

- `CLAUDE.md` (项目根) — 定位、语言规则、真相源顺序、工程铁律
- `docs/README.md` — 文档索引
- `docs/design/01-vision-and-scope.md` — 愿景、用户、设备覆盖、阶段划分
- `docs/design/02-design-principles.md` — 七条设计原则 (尺度感、准确性、动画为信息服务...)
- `docs/design/03-ui-ux-guidelines.md` — 信息架构、三视图、Desktop/Tablet/Mobile 布局、可访问性
- `docs/design/04-universe-experience.md` — 跨尺度浏览体验设计 (核心)：8 个 Tier、三种过场
- `docs/design/05-content-and-data-model.md` — 数据 / 故事分离、CosmicObject schema、坐标系策略
- `docs/design/06-visual-style.md` — 配色、字体、光感、动效语言
- `docs/develop/01-tech-stack.md` — Next.js 16 + R3F + GSAP + Framer Motion + Zustand + Tailwind v4
- `docs/develop/02-architecture-overview.md` — 仓库结构、四层模块边界、状态模型
- `docs/develop/03-engineering-guidelines.md` — 命名、文件大小、Three/R3F 规约、Git、测试
- `docs/develop/04-animation-strategy.md` — GSAP 管 3D / Framer Motion 管 DOM 的职责切分、过场实现、LOD、降级
- `docs/develop/05-performance-budget.md` — 设备基线、初始加载预算、各 Tier 预算、监控
- `docs/develop/06-phase-1-plan.md` — Phase 1 任务清单 (Stage 0..8)，真相源
- 在 `.claude/` memory 里存入：协作语言、工程标准、项目范围三条记忆

### 关键决策

1. **板块二分**：Universe 与 Physics 分开。Phase 1 只做 Universe。
2. **技术栈**：Next.js 16 (App Router) + R3F + GSAP (3D 动画) + Framer Motion (DOM 动画) + Zustand + Tailwind v4 + TypeScript strict + pnpm。
3. **8 Tier 尺度阶梯**：T0 Observable Universe → T7 Planet。每 Tier 用自己的局部坐标系，避免浮点精度问题。
4. **过场三选一**：zoom / dissolve / tunnel，按跨度量级决定，同一对场景永远用同一种。
5. **持久 `<Canvas>`**：挂在 `/universe` layout 上，子路由切换不卸载 Canvas，保证相机动画连续。
6. **科学准确性 > 视觉惊艳**。
7. **数据与故事文件分离**。

### 下次开始 (建议优先级)

1. **执行 Phase 1 - Stage 0.3**：初始化 Next.js 16 + TS + Tailwind v4 + ESLint/Prettier 脚手架 (pnpm)。
2. **执行 Phase 1 - Stage 0.4**：接入 R3F / drei / postprocessing / GSAP / Framer Motion / Zustand / Zod。
3. **执行 Phase 1 - Stage 0.6**：设计 tokens (CSS variables) + 基础 UI 组件 (Button, Panel, Sheet, ScaleBar)。

不建议跳过 Stage 0 直接做 Scene。脚手架不稳的话后面所有动画都是空中楼阁。

### 未决问题

- 项目最终域名 / 中文名 / 英文名未定。`universe-physics` 是工作代号。
- 实际部署平台默认 Vercel，未确认。
- 真实星表数据 (HYG / NED) 引入方式：本地预处理 JSON vs 运行时 fetch。Stage 2.6 之前要决定。
- 移动端实测设备未定。
- 是否引入 ADR (decisions/) 目录：Phase 1 不强制，Phase 2 起强制。

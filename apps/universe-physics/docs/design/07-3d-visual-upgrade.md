# 07 — 3D 视觉升级方案

> **读者**：负责现有 `/universe/*` 3D 板块视觉升级的工程师与设计师。
> **读完能做什么**：知道当前 3D 视觉粗糙在哪里、目标气质是什么、每档 Tier 要往哪个视觉锚点走、效果分级如何排优先级。具体改动落点见 [`develop/07-3d-implementation-plan.md`](../develop/07-3d-implementation-plan.md)。

## 1. 现状定位

Phase 1 已经把 T0–T7 八档尺度链跑通，所有场景、HUD、知识面板、内容校验都到位。但**视觉表现仍停留在「占位级」**——这是当前最大的一块视觉债。

具体粗糙点（按破坏感强弱排序）：

| 位置                         | 现状                                                        | 用户视角的观感                                     |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| 全场景后处理                 | `@react-three/postprocessing` 已装但未启用                  | 缺少 bloom 与 tone mapping，整体亮度发灰、缺乏光感 |
| 所有 `Points` 粒子           | `pointsMaterial` 默认实现，方形像素、无软边、无 attenuation | 近看就是「一堆小方块」                             |
| T6 行星                      | 硬编码反照率纯色球，无贴图、无大气、无昼夜分界              | 像幼教 3D 模型                                     |
| T7 地球                      | 顶点色 FBM 噪声，72×72 分辨率，"大陆"形状抽象               | 看得出是地球但不像照片                             |
| T4 银河中心、T6 太阳、T0 CMB | 多层 sphere 硬拼出"光晕"                                    | 边界硬，缺体积感                                   |
| SceneMarkers (所有 Tier)     | 双层 sphere + meshBasicMaterial，纯色                       | 8 档场景里所有 marker 长得一样                     |
| 整体抗锯齿与色彩管理         | 默认 sRGB + 默认 antialias，无 ACES tone mapping            | 高光容易爆白、暗部噪点重                           |

**不是**性能不够，**是**视觉语言没建立。本文档要解决的就是「视觉语言」。

## 2. 目标气质

参考心象，按权重排：

1. **JWST / Hubble 深空照片的色彩科学**（50%）——HDR linear pipeline + ACES filmic + 高光辉但不爆 + 暗部冷调。
2. **Apollo 时代任务工程图**（25%）——克制的辅助线、网格、刻度，工程图风格的辅助元素。
3. **当代极简产品 UI**（15%）——HUD 留白、信息层次清晰、UI 不与场景争夺注意力。
4. **科幻电影质感**（10%）——非常克制的 bloom 拖尾、轻微的 chromatic aberration、film grain，营造"在看天文台数据"的氛围。

**禁区**（重申 [`02-design-principles.md`](./02-design-principles.md) 与 [`06-visual-style.md`](./06-visual-style.md) 的红线）：

- 卡通插画化 / 教科书化 / cyberpunk 霓虹
- 装饰性动画循环（旋转 logo、波纹背景）
- 渐变背景、玻璃拟物
- 任何不基于真实数据的颜色

## 3. 视觉锚点（每档 Tier 想给用户留下的"一帧"）

> 每个 Tier 都应该有**一帧 hero shot**——即使关掉 HUD 也能让用户瞬间懂"我在哪个尺度"。下面是每档的目标锚点。

| Tier | 视觉锚点                                                                                      | 灵感参考                           |
| ---- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| T0   | CMB 球壳外淡淡的 BAO 同心环 + 内部三层星壳呈深空蓝的 HDR 辉光                                 | Planck 全天图 + JWST UDF           |
| T1   | 暖橙 → 冷蓝渐变的 filament 沿 Catmull-Rom 曲线发光，节点处用柔光球 puff                       | IllustrisTNG / Millennium sim 渲染 |
| T2   | Laniakea 流线像被 Great Attractor 吸进去的金色丝带，背景星系作冷淡星点                        | Tully 2014 streamline 图           |
| T3   | MW / M31 / M33 三个旋涡星系俯视图，旋臂用 emissive shader 发暖光，盘外暗物质晕用极淡冷雾      | Hubble extreme deep field          |
| T4   | 四条旋臂用真实色温 tint（Perseus 偏蓝、Sag 偏暖），银心 Sgr A\* 用 raymarched accretion disk  | ESO 银河俯视艺术图 + EHT Sgr A\*   |
| T5   | 太阳作为 G 型黄白主序星，其他 24 颗按光谱色（M 红、O 蓝）按真实方向飞散，比例尺隐式表达 50 ly | Hipparcos 邻近恒星图 + Sky-Map     |
| T6   | 太阳 raymarched corona + 8 行星用真贴图（NASA/USGS）+ 土星环 + 轨道环细如发丝                 | Solar System Scope screenshots     |
| T7   | 地球真贴图（Blue Marble / VIIRS 夜景）+ 大气 Rayleigh 散射 + 终结线柔光 + 月球真贴图          | NASA Blue Marble + Astro 拍片      |

## 4. 效果分级与优先级

升级方案拆三档（P0/P1/P2），按 ROI（视觉冲击 ÷ 工程量）排序。

### P0 · 立刻做（高 ROI / 低风险）

**P0 完成后所有 8 档同时受益，工程量集中、风险可控。**

#### 4.1 启用后处理管线 EffectComposer

- 已装 `@react-three/postprocessing`，**仅需启用**。
- **必开**：ACES filmic tone mapping、HDR linear pipeline、SMAA、Bloom（threshold 1.0 / intensity 0.6 / radius 0.4）、Subtle Vignette（offset 0.5 / darkness 0.4）。
- **可选**：Film grain（intensity 0.02 / opacity 0.15）、Chromatic Aberration（offset [0.0005, 0.0005]，仅 desktop 高端启用）。
- **移动端关 Bloom**（保留 Vignette + SMAA）。
- 性能预算见 `develop/05-performance-budget.md` § 7（自动降级触发后关 Bloom）。

#### 4.2 自定义粒子 Shader（替换所有 `pointsMaterial`）

替换 T0/T1/T4/T5/T6/T7 中所有 `Points + pointsMaterial` 的实例。

**Vertex shader 职责**：

- per-vertex size 属性（让英雄星点比背景星点大）
- 按相机距离 attenuate：`gl_PointSize = aSize * (1.0 / -mvPosition.z) * uPixelRatio`
- per-vertex `aTemp`（色温 0–1）传给 fragment

**Fragment shader 职责**：

- 圆形软边：`alpha = smoothstep(0.5, 0.4, length(gl_PointCoord - 0.5))`
- 内核高亮 + 外圈柔光（双 smoothstep）
- 按色温在调色板内插值（O/B/A/F/G/K/M 已在视觉规范定义）

直接结果：所有"小方块"消失，星点变软、有大小层次、有色温差异。

#### 4.3 SceneMarkers 视觉重写

当前所有 Tier marker 长一样。改为按 Tier 上下文调度：

- **T0/T1/T2**（大尺度）：marker = 软光球 + 外圈虚线圆环（工程图风），label 在外圈外
- **T3/T4**（星系尺度）：marker = 钻石符号（旋转 45° 的方块外框），label 用引线
- **T5**（恒星）：marker 本身就是星点，hover 高亮内 4× scale + 加 ring
- **T6/T7**（行星）：marker = 极小针点（≤2px），label 一直显示

### P1 · 第二批（中 ROI / 中等工程量）

#### 4.4 体积光晕（CMB / 星系核心 / 太阳 / Sgr A\*）

把目前的"多层 sphere 硬拼"换成 **view-aligned billboard + 自定义 raymarch-lite shader**：

- Fragment 内对 3D 噪声做 4–6 步 raymarch，输出体积感伪密度。
- T0 CMB：低频 FBM 噪声，色温接近 2.7K 红外（暖白偏粉）。
- T4 银心：高密度核 + 旋转流场。
- T6 太阳：plasma turbulent + 日冕外延。
- T6 Sgr A\*（如果加 marker）：accretion disk + Doppler beaming（一侧偏蓝一侧偏红）。

直接结果：「光晕硬边」消失，体积感与温度感建立。

#### 4.5 T6 行星真贴图（PBR-lite）

引入 NASA / USGS 公共贴图（Diffuse + Normal + Emissive 三套）：

- **必加贴图**：水星、金星、地球、火星、木星、土星、天王星、海王星 8 颗。
- **格式**：Diffuse 1024² KTX2，Normal 512² KTX2。预算 ~30 MB GPU。
- **大气**：金星、地球、火星、海王星加 Rayleigh shell（fragment shader 算单次散射，详见 4.7）。
- **土星环**：用 PNG alpha + ring shader（径向密度分带）。

#### 4.6 T7 地球升级

- Blue Marble (NASA) Diffuse 2048² KTX2 + VIIRS Black Marble 夜景 emissive 2048².
- 昼夜分界：`mix(dayMap, nightMap, smoothstep(-0.1, 0.1, dot(N, L)))`。
- 大气：fragment shader 算 Rayleigh + Mie 单次散射，外圈光环。
- 月球：LRO 贴图 1024².
- 总资产体积 ~6–8 MB，**异步加载**，T7 mount 时才拉。

### P2 · 第三批（高质量但工程量大）

#### 4.7 Rayleigh / Mie 大气散射 shader

把 4.5/4.6 用的简单 atmosphere shell 升级到真物理：

- 单次散射近似（Nishita 1993 简化版）即可。
- 控制 4 个 uniform：`uPlanetRadius`、`uAtmosphereRadius`、`uRayleighCoefficients`、`uMieCoefficients`。
- 输出 Volumetric scattering color。

#### 4.8 GPU instancing 替代多个 Points

每个 Tier 当前用 2–6 个独立 `Points`。改为单一 `InstancedMesh` + per-instance attribute（color、size、type）：

- Draw call 从 ~30 降到 ~10。
- 移动端帧率收益最大。

#### 4.9 自动 LOD（Level of Detail）

按相机距离切换粒子密度：

- T0 CMB：相机 < 0.7 时 4000 点，> 0.7 时 6800 点。
- T6 主小行星带：相机 < 5 时 1400 点，> 5 时 800 点。
- T6 Kuiper 带：相机 < 8 时 1800 点，> 8 时 1000 点。

#### 4.10 自然现象（彩蛋级）

- T6 加流星雨（每 30s 一次，沿黄道面贯穿）。
- T7 地球加云层（独立 sphere + cloud texture，慢自转）。
- T0 → T1 tunnel 过场时加 starfield motion blur。

## 5. 实施顺序建议

> 细节路线图见 [`develop/07-3d-implementation-plan.md`](../develop/07-3d-implementation-plan.md)。

| 阶段 | 范围                         | 工程量 | 视觉收益                  |
| ---- | ---------------------------- | ------ | ------------------------- |
| P0-A | 后处理管线 + tone mapping    | 半天   | ★★★★★ 所有 8 档一起亮起来 |
| P0-B | 粒子 shader + SceneMarkers   | 1–2 天 | ★★★★★ 粗糙感最大改善      |
| P1-A | 体积光晕（T0/T4/T6/Sgr A\*） | 2 天   | ★★★★                      |
| P1-B | T6 行星贴图 + T7 地球贴图    | 2 天   | ★★★★★                     |
| P2-A | Rayleigh 大气                | 1 天   | ★★★                       |
| P2-B | GPU instancing + LOD         | 1–2 天 | ★★（性能侧收益更大）      |
| P2-C | 自然现象彩蛋                 | 1 天   | ★★（玩味）                |

**建议**：P0 一气做完出一版，让用户在浏览器里看到立刻的飞跃；P1/P2 分批迭代。

## 6. 色彩管理与 tone mapping 规范

P0 启用后，整个项目从默认 sRGB 渲染切到 HDR linear pipeline：

```ts
// app/universe/_shell/UniverseShell.tsx 内 <Canvas> props
gl={{
  outputColorSpace: THREE.SRGBColorSpace,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.0,  // 默认 1.0，可在 Subject Card 加 ±0.2 微调
  antialias: false,           // SMAA 接管
  powerPreference: "high-performance",
}}
```

**所有现有颜色（包括 content/cosmos/T\*.ts 中的 marker color）保持不变**——它们是 sRGB hex，three.js 在 linear pipeline 下会自动正确转换。

**新增 emissive shader 时**：lit color 必须用 linear 空间常量，例如 `vec3(1.2, 0.8, 0.4)` 而不是 `#ffcc66` 直接代入。

## 7. 与「克制」原则的协调

视觉升级最大的风险是**走向反面：太多 bloom 太多特效 → 像 winamp 可视化**。所以本方案必须遵守：

1. **任何新效果默认 intensity 50%，再视觉对比拉到 100%**。
2. **Bloom threshold ≥ 1.0**——不让暗部发光。
3. **Vignette darkness ≤ 0.5**——不让边缘黑死。
4. **不加任何"装饰性循环"**：星点不闪烁、CMB 不脉冲、轨道不动。
5. **过场动画不变**——P0/P1/P2 都不动 `useTierTransition`。视觉升级不动节奏。

## 8. 验收 Checklist

P0 完成后逐项验收：

- [ ] 8 档场景关掉 HUD 截图，任意两档放一起，能在 1 秒内辨识尺度
- [ ] 任何 `Points + pointsMaterial` 字符串已从代码中消失
- [ ] desktop 中端设备稳态 60fps
- [ ] mobile 高端 30fps（关闭 Bloom 后）
- [ ] 现有 e2e 测试不挂、内容 lint 不挂

P1/P2 单独章节再写验收（落地时补到 develop/07-\* 文档）。

## 9. 参考图谱（实施前必看）

> 列出实施时应**先打开看一遍**的真实图，建立视觉肌肉记忆。

- JWST: SMACS 0723、Cartwheel Galaxy、Carina Nebula
- Hubble: UDF 2014、Pillars of Creation 2014
- ESO: Milky Way panoramic VST、Eta Carinae
- NASA: Blue Marble (Apollo 17 + Suomi NPP)、Mars Reconnaissance Orbiter
- 模拟数据：IllustrisTNG、Millennium、SDSS large-scale structure visualization
- Solar System Scope（行星贴图来源）
- USGS Astrogeology（行星 normal map）
- 学术绘图：Tully 2014 Laniakea streamline figure

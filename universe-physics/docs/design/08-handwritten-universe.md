# 08 — Handwritten Universe · 手绘宇宙视觉规范

> **读者**：负责 `/universe/handwritten` 手绘 SVG 板块的设计师与前端工程师。
> **读完能做什么**：理解为什么要做手绘版（产品定位）、夜版/日版的色板与字体、SVG 滤镜与多层晕染参数、装饰元素图典、八档场景的构图脚本。落地代码契约见 [`develop/08-handwritten-implementation.md`](../develop/08-handwritten-implementation.md)。

## 1. 为什么要做手绘版

主 3D 板块表达"宇宙的尺度震撼"。手绘版与之**对立互补**——表达"人类对宇宙的诗意凝视"。

参考心象：

- 17 世纪 Cellarius《Harmonia Macrocosmica》古星图
- 18 世纪自然博物图鉴（Audubon、Haeckel）
- 现代手绘信息图（Edward Tufte / Bret Victor explorables）
- 教科书边缘插图

**唯一差异化**：用同一份科学准确的数据（`src/content/cosmos/T*.ts`），换一种**艺术语言**重画。让用户在 3D 与手绘版之间切换时感觉是"同一座宇宙的两种凝视"。

## 2. 板块结构

- 路由根：`/universe/handwritten`
- 子路由：`/observable` … `/earth`，与 3D 版完全对齐（Tier 表共用）
- HUD 完全复用 3D 版（TopBar / SubjectCard / TierRail / KnowledgePanel）
- 内容数据复用 `src/content/cosmos/T*.ts` 100%
- **新增**：右上角 ThemeToggle 切换夜版/日版

## 3. 双主题

### 3.1 夜版 · Cellarius Codex

气质：深夜书房翻开的古星图卷轴。**默认主题**。

```
背景:    --hw-night-bg          #0b0a14   # 深羊皮夜色
背景边:  --hw-night-bg-edge     #15101a   # 卷轴边缘暗紫
主墨:    --hw-night-ink         #f5e7c8   # 暖白象牙
次墨:    --hw-night-ink-soft    #c8b896   # 淡化墨
弱墨:    --hw-night-ink-faint   #7d6f50   # 极淡（辅助线、远景）

强调金:  --hw-night-gold        #ffb45a   # 复用 --accent-warm
强调蓝:  --hw-night-blue        #6ad0ff   # 复用 --accent-cool
强调红:  --hw-night-red         #d05a4a   # 仅用于警示标注（极限）

水彩晕（layer3): rgba(255, 180, 90, 0.04 / 0.10 / 0.18)  # 8/14/20% 加宽
```

### 3.2 日版 · Naturalist Atlas

气质：自然博物学家的笔记本，泛黄米纸 + 炭墨手绘。

```
背景:    --hw-day-bg            #faf7f2   # 暖米纸
背景边:  --hw-day-bg-edge       #f0eadd   # 边缘旧
主墨:    --hw-day-ink           #1a1916   # 深炭墨
次墨:    --hw-day-ink-soft      #5b5852   # 淡墨
弱墨:    --hw-day-ink-faint     #8a867d   # 极淡

强调暖:  --hw-day-warm          #b5481c   # 陶土红
强调冷:  --hw-day-cool          #2f5d3a   # 植物绿
强调蓝:  --hw-day-blue          #2c5a7a   # 水彩深蓝

水彩晕（layer3): 各天体所属光谱色的 8% / 14% / 20%
```

### 3.3 共享光谱色（两主题通用）

```
spectrum-O   #a6c8ff
spectrum-B   #a6c8ff
spectrum-A   #cfd9ff
spectrum-F   #f8f7ff
spectrum-G   #fff4d8
spectrum-K   #ffd089
spectrum-M   #ff8a5a
```

行星色按真实反照率，两主题共用：

```
mercury #8c7a6b
venus   #d4b67a
earth   #4f7fae
mars    #b25a3f
jupiter #c9b481
saturn  #d8c89a
uranus  #88c1cc
neptune #4f6dae
```

### 3.4 主题切换的硬规定

- **所有颜色走 CSS 变量**（`--hw-ink` 等），组件里**禁止**写 hex
- 切换通过给 `<svg>` 根加 `data-theme="night|day"`，CSS 内根据 `[data-theme="day"]` 重定义变量
- 切换有 300ms `opacity` cross-fade（仅装饰元素），背景立即换
- ThemeToggle 状态进 `useHandwrittenStore.theme`，localStorage 持久化

## 4. 字体

完全复用现有字体栈，**不引新字体**：

| 用途                       | 字体                       | 风格             |
| -------------------------- | -------------------------- | ---------------- |
| 标题（学名、tier name）    | Fraunces italic 600        | 衬线斜体，学术感 |
| 正文（narrative、tooltip） | Inter 400/500              | 中性无衬线       |
| 数字 / 数据（坐标、距离）  | JetBrains Mono 400         | 等宽             |
| 装饰编号（希腊字母 α β γ） | Fraunces italic 500        | 与标题统一       |
| 中文                       | Noto Sans SC / PingFang SC | 跟现有体系       |

**字号阶梯**（SVG `<text font-size>`）：

```
title:       28px (T0 大标题) / 22px (其他 Tier)
subtitle:    14px italic
label-major: 13px italic
label-minor: 11px
caption:     10px mono
hairline:    9px mono
```

## 5. SVG 滤镜与多层晕染（手绘感的核心引擎）

参考 `swil-fitneheal` 项目的 `AtlasDefs.tsx`。本项目实现见 `src/scenes-handwritten/shared/HandwrittenDefs.tsx`。

### 5.1 三级 wobble 滤镜

```xml
<filter id="hw-wobble" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7"/>
  <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G"/>
</filter>

<filter id="hw-wobble-soft" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="13"/>
  <feDisplacementMap scale="3"/>
</filter>

<filter id="hw-wobble-tiny" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="22"/>
  <feDisplacementMap scale="1.2"/>
</filter>
```

**用法**：

- 大形态（海岸线、星系外缘、轨道环）→ `hw-wobble`
- 中等元素（节点圆、行星轮廓）→ `hw-wobble-soft`
- 装饰元素（编号框、罗盘刻度）→ `hw-wobble-tiny`

**所有 seed 必须固定**，保证 SSR 与客户端一致，避免重新渲染时抖动重画。

### 5.2 三层水彩晕染（替代 feGaussianBlur）

> 不用 `feGaussianBlur`——pan/zoom 时会出现闪现 bug。改用三层透明圆叠加。

```xml
<g class="hw-wash">
  <!-- 外圈，最淡 -->
  <circle cx="0" cy="0" r="r * 1.67" fill="var(--hue)" fill-opacity="0.08"/>
  <!-- 中圈，错位 2-3px 模仿手工重涂 -->
  <circle cx="-2" cy="2" r="r * 1.33" fill="var(--hue)" fill-opacity="0.14"/>
  <!-- 主体，应用 wobble 滤镜 -->
  <circle cx="0" cy="0" r="r" stroke="var(--hw-ink)" stroke-width="1.4" filter="url(#hw-wobble-tiny)"/>
</g>
```

### 5.3 纸张纹理 pattern

```xml
<pattern id="hw-paper" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
  <rect width="220" height="220" fill="transparent"/>
  <g opacity="0.35">
    <circle cx="40" cy="60" r="0.6" fill="var(--hw-ink-faint)"/>
    <circle cx="150" cy="30" r="0.5" fill="var(--hw-ink-faint)"/>
    <!-- 8 个随机分布的 0.4–0.7px 圆点 -->
  </g>
</pattern>
```

**用法**：每个 Scene 顶部铺一层 `<rect fill="url(#hw-paper)" opacity="0.45"/>`，给纸张颗粒感。

### 5.4 墨水渐变（夜版金色 / 日版炭墨）

```xml
<linearGradient id="hw-ink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="var(--hw-ink)"/>
  <stop offset="100%" stop-color="var(--hw-ink-soft)"/>
</linearGradient>
```

用于主笔画 stroke——避免纯单色显得太硬。

## 6. 线条规范

| 用途                  | stroke-width | linecap/linejoin | dasharray | opacity         |
| --------------------- | ------------ | ---------------- | --------- | --------------- |
| 主体轮廓（星系/行星） | 1.4–2        | round            | 实线      | 1.0             |
| 辅助参考（坐标轴）    | 0.8          | round            | `2 6`     | 0.5             |
| 引线（label 连线）    | 0.6          | round            | 实线      | 0.7             |
| 关系线（filament）    | 1.2          | round            | 实线      | 0.55→1（hover） |
| 调节线（虚标注）      | 1.0          | round            | `1 4`     | 0.6             |
| 警示标注              | 1.2          | round            | `5 4`     | 0.8             |
| 网格线                | 0.5          | round            | `1 6`     | 0.06–0.08       |

## 7. 装饰元素图典

每档场景按需挑选下列装饰，**不堆砌**。一档不超过 3–4 类装饰。

### 7.1 罗盘 / 方位玫瑰

12 等分圆周，N/E/S/W 用 Fraunces italic，副方位用希腊字母。仅用于 T0/T2/T6 的"全景类"场景。

### 7.2 希腊字母编号 (α β γ δ ε ζ ...)

用于标注次要天体或锚点。Fraunces italic 11px，颜色 `--hw-ink-soft`。

### 7.3 卷轴 cartouche（标题装饰框）

仅夜版用。绕住 Tier 标题，模仿古地图 banner。

```
   ╔════════════╗
  ╱  OBSERVABLE  ╲
 ╱    UNIVERSE    ╲
  ╲              ╱
   ╚════════════╝
```

### 7.4 黄道刻度环

T0 黄道带、T6 行星轨道用。圆环 360° 每 30° 一道粗刻度、每 10° 一道细刻度。

### 7.5 行星天文符号

T6 专用。直接用 Unicode：

```
☉ Sun     ☿ Mercury  ♀ Venus   ♁ Earth
♂ Mars    ♃ Jupiter  ♄ Saturn  ⛢ Uranus
♆ Neptune ☽ Moon     ⚳ Ceres   ♇ Pluto
```

### 7.6 星座连线 / asterism

T5 邻居恒星之间用细虚线连出"邻居星座"——纯艺术处理，不是真星座。

### 7.7 引力箭头

T3 标注矮星系受 MW/M31 引力影响的方向。手绘风箭头（曲线 + 三角箭头）。

### 7.8 植物式涡卷（日版限定）

日版日版自然博物图鉴风的边角装饰。绝不用在夜版。

### 7.9 数字标尺

T5/T6/T7 显式标距离。`---|---|---|---|` 风格，文字 JetBrains Mono。

## 8. 八档场景构图脚本

> 每档给出夜版与日版两种构图意图。详细几何坐标由实施时根据 `src/content/cosmos/T*.ts` 数据投影生成。

### Tier 0 · Observable Universe（同心圆星盘）

```
        +-------------------------+
        |       CARTOUCHE         |
        |   "Observable Universe" |
        +-------------------------+

              · · α   · · β
            (12 方位罗盘环)
         ┌─────────────────────┐
        ╱  ─ ─ ─ BAO ─ ─ ─    ╲
       │   ╱ ─ CMB ─ ╲          │
       │  │ ╱─Reion─╲│         │
       │  │ │  ⊕   │ │  ← 中心十字 "我们在这里"
       │  │ ╲─────╱ │         │
       │   ╲       ╱          │
        ╲   ─ ─ ─ ─          ╱
         └─────────────────────┘
              · γ · δ · ε
```

- 5 圈同心环代表 BAO / 再电离 / 大尺度结构 / 暗能量主导 / 黄道带（外）
- markers（CMB、Great Attractor、Hubble Deep Field、Cold Spot、BAO Ring）按 3D 数据的 [x,y,z] 投影到 2D 圆盘
- **夜版**：金墨刻度、靛底
- **日版**：炭墨刻度、米底，每圈用淡水彩晕一层

### Tier 1 · Cosmic Web（网络流图）

- 22 节点按 3D 坐标投影到 viewport
- 节点间连线用 `pathLength` 级联入场（从中心向外辐射，每条 50ms 延迟）
- 主要超星系团节点用 wobble 圆 + 名称标签（引线）
- 大空洞用稀疏点画表示，文字 "Boötes Void" 等
- **夜版**：filament 用金色发光线，节点暖色发光
- **日版**：filament 用炭墨细线，节点用绿/红水彩晕，更像数据图

### Tier 2 · Laniakea Supercluster（流线水文图）

- 110 条 Catmull-Rom 流线（夜版冷暖渐变金/蓝；日版水彩深蓝/陶土红）
- Great Attractor 用旋涡符号（Archimedean spiral）
- 5 个锚点（Virgo, Norma, Pavo-Indus, Centaurus, Antlia-Hydra）用 wobble 圆 + 引线 label
- 边界用虚线封闭多边形（Laniakea outline）
- **夜版**：流线像金色丝带
- **日版**：流线像 17 世纪洋流图

### Tier 3 · Local Group（三大星系）

- MW / M31 / M33 用手绘旋涡（log-spiral 路径，2 条旋臂）
- 矮星系（LMC/SMC/Sculptor/Fornax 等）用小圆点 + 希腊字母编号
- 重心十字 + 引力箭头（指向 M31）
- **夜版**：旋臂金色，背景星点稀疏
- **日版**：旋臂淡水彩晕，标注用拉丁名

### Tier 4 · Milky Way（俯视手绘）

- 4 条旋臂用 log-spiral，每条用不同 hatching pattern 区分（点画 / 平行线 / 交叉 / 实心）
- Sgr A\* 用日蚀符号（外白圆 + 内黑圆 + 外延射线）
- 太阳位置用十字 + "☉ Sol" 标签
- 球状星团晕用稀疏小圆点
- **夜版**：旋臂金色 + 暗物质晕极淡冷雾
- **日版**：旋臂用 4 种 hatching，像 19 世纪天文图鉴

### Tier 5 · Stellar Neighborhood（邻居星座）

- 25 颗硬编码恒星按真实方向投影到 2D 圆盘
- 每颗按光谱色（O/B 蓝、M 红）画圆
- 视觉上连线成"邻居星座"（虚线，纯艺术）
- 名称用拉丁化（Sirius、Procyon、Vega）
- 距离刻度尺（外圈 50 ly 标注）
- **夜版**：金墨字 + 光谱色软光球
- **日版**：水彩晕 + 黑墨字 + 颜色图例小卡

### Tier 6 · Solar System（古机械星仪 / orrery）

- 8 行星 + 4 矮行星按对数径向 warp 排在椭圆轨道上
- 椭圆轨道用细虚线（外行星更淡）
- 行星用真彩水彩晕 + 天文符号
- 主小行星带 / Kuiper 带用点画
- 黄道带刻度环（最外层）
- 太阳用四层水彩晕 + 射线（古星图风）
- **夜版**：金色刻度 + 行星金圈
- **日版**：博物图鉴风，每颗行星下方有学名 + 轨道周期标注

### Tier 7 · Earth（半透手绘地球仪）

- 圆形地球，大陆轮廓用 wobble filter（夸张抖动）
- 经纬线每 15° 一格（虚线）
- 北/南极极冠用白色（夜）/ 极淡蓝（日）水彩
- 月球用椭圆轨道 + 小灰圆 + 月相符号
- 地球同步轨用虚线圆 + "GEO" 标签
- 6 个 markers（International Space Station、Hubble Telescope、JWST 投影位置、Kármán Line 等）
- **夜版**：海洋深靛、大陆暖白
- **日版**：海洋水彩淡蓝、大陆陶土色

## 9. 入场与过场动画规范

### 9.1 入场（每档场景 mount 时）

总时长 1500–2000ms：

1. 0–200ms：背景纸张 + cartouche 立即出
2. 200–800ms：主体外轮廓 `pathLength: 0 → 1`
3. 600–1200ms：水彩晕染 fade in（`opacity: 0 → 1`）
4. 1000–1800ms：装饰元素（罗盘、希腊字母、引线）级联出现，间隔 30–60ms

**全部尊重** `prefers-reduced-motion`——直接到终态、无动画。

### 9.2 过场（Tier 切换）

不使用 GSAP / 相机，因为没有 3D 相机。改为：

- 旧场景：`opacity: 1 → 0`（800ms `power3.in`）
- 新场景：延迟 400ms 后开始入场（见 9.1）
- 三种 kind（zoom/dissolve/tunnel）暂时**视觉效果一致**——都是 cross-fade。未来可分化：tunnel 加径向 mask、zoom 加 viewBox 缩放。

### 9.3 hover / click 微动效

- hover marker：水彩晕 scale 1.0 → 1.15（200ms `power2.out`）+ 外圈虚线圆出现
- click marker：调用现有 `useUiStore.openPanel(marker.id)`，复用 3D 版的知识面板滑入

## 10. 性能规范

| 项                                          | 上限                                        |
| ------------------------------------------- | ------------------------------------------- |
| 单档 SVG DOM 节点                           | < 1500 个 element                           |
| 单档 `path` 元素                            | < 200                                       |
| 单档 `motion.*` 包裹元素                    | < 80（其余用 `motion.g` 批量调度）          |
| Bundle JS gzip（`/universe/handwritten/*`） | < 80 KB（不含 framer-motion，它已在 3D 版） |
| 入场动画总时长                              | ≤ 2000ms                                    |
| 帧率（动画期间）                            | desktop ≥ 50fps，mobile ≥ 24fps             |

## 11. 禁区

- 不引入 emoji / 卡通图（即使是装饰，希腊字母 + 天文符号已经足够）
- 不引入 rough.js / D3 / svg.js / 任何 SVG 库——所有路径都手写 JSX SVG
- 不在 path d 中嵌入业务数据（如时间戳）——位置全由 `handwritten-coords.projectToSvg` 计算
- 不在组件里硬编码 hex 颜色（必须走 CSS 变量）
- 不为了"好看"乱改 marker 位置（必须用 `content/cosmos/T*.ts` 的数据）
- 不在过场动画里改变 viewBox 比例（导致整个 SVG 重新布局，性能炸）

## 12. 可访问性

- 所有 marker `<circle>` 加 `role="button"` + `tabindex="0"` + `aria-label={marker.name.primary}`
- 键盘 Tab 顺序按 `markers` 数组顺序
- ThemeToggle 按钮加 `aria-label="切换到日版/夜版"` 与状态属性
- 颜色对比度：夜版主墨 vs. 背景对比度 ≥ 7:1（已验证 #f5e7c8 / #0b0a14 = 14.8:1）；日版 #1a1916 / #faf7f2 = 15.6:1

## 13. 参考图

实施前必看的真实参考：

- Andreas Cellarius, _Harmonia Macrocosmica_ (1660)——黄道带、行星轨道、卷轴
- John Bevis, _Uranographia Britannica_ (1750)——星座连线
- Ernst Haeckel, _Kunstformen der Natur_ (1904)——日版博物图鉴风
- Edward Tufte, _Envisioning Information_——克制的辅助线与刻度
- Tully et al. 2014 _Nature_ Laniakea figure——T2 流线参考
- swil-fitneheal `src/components/atlas/RegionMap.tsx`——滤镜 + 晕染实操

# 01 — 项目愿景与范围

## 1. 一句话定位

> 一座可在浏览器里跨尺度漫游的「宇宙 + 物理」知识图谱站。当前先做**宇宙**。

## 2. 我们到底在做什么

universe-physics 是一个 web 应用，用户打开它会看到**当前可见宇宙的整体结构**，然后用鼠标 / 触控**逐层下钻**：

```
可见宇宙 (Observable Universe)
   ↓
大尺度纤维结构 (Cosmic Web — filaments, voids)
   ↓
超星系团 (Laniakea, Perseus–Pisces, Shapley, ...; Great Attractor 区域)
   ↓
本星系群 / 邻近星系团 (Local Group, Virgo Cluster, ...)
   ↓
银河系 / 邻近星系 (Milky Way, Andromeda, ...)
   ↓
太阳系 (Sun, planets, dwarf planets, major moons, asteroid belt, Kuiper belt, Oort cloud)
   ↓
单个行星 / 卫星 / 天体 (Earth, Mars, Europa, ...)
```

每一层都有：

- **可视化层**：用 WebGL 渲染的 3D 场景或 2D 投影，强调结构、相对位置、方向。
- **知识层**：覆盖该尺度下的关键对象、它们的数据 (质量、距离、年龄、温度等)、以及科学叙事。
- **过渡层**：相邻尺度之间用动画衔接，让用户**感受**到「我从 10²⁶ m 移到了 10²² m」。

## 3. 谁是用户

主要：

- **天文爱好者** — 已经知道一些概念，想要直观对比与漂亮的可视化。
- **学生 / 自学者** — 高中到本科水平，正在建立宇宙尺度的直觉。
- **科普读者** — 对宇宙有兴趣但不爱读公式，靠视觉与故事进入。

次要：

- 老师 / 内容创作者 — 想截图、引用、嵌入。

## 4. 设备覆盖

| 目标                 | 优先级      | 说明                                           |
| -------------------- | ----------- | ---------------------------------------------- |
| Desktop (≥ 1280px)   | P0 — 主战场 | 大屏才撑得起跨尺度体验                         |
| Laptop (1024–1279px) | P0          | 主流尺寸，必须流畅                             |
| Tablet (768–1023px)  | P1          | 可用，但 UI 简化、动画降级                     |
| Mobile (≤ 767px)     | P1          | 必须能看；性能不达标时降为「精选场景幻灯」模式 |

详见 `docs/design/03-ui-ux-guidelines.md` 的响应式策略。

## 5. 不在范围内

显式排除，避免范围蔓延：

- **物理板块** — Phase 1 不动。架构留口子，代码不写。
- **用户账户 / 收藏 / 评论** — 一律不做，至少 Phase 1 之前。
- **多语言** — 默认中文界面，专有名词中英并列。其他语言以后再说。
- **实时数据接入** (例如 NASA Horizons) — 用静态快照即可。引入实时 API 的复杂度对当前目标没有正向贡献。
- **VR / AR 模式** — 不在 Phase 1。
- **物理引擎 (碰撞、N 体仿真)** — 不做。我们展示的是**结构与位置**，不是模拟。

## 6. 阶段划分

### Phase 0 — Foundation (现在)

- 文档骨架 ✓
- 技术栈定稿
- 项目脚手架 (Next.js / R3F / Tailwind)
- 一个最小可用原型：**可见宇宙球 → 一次下钻到 Laniakea 区域**，动画顺滑、相机可控。

### Phase 1 — Universe Vertical Slice

完整跑通一条尺度链：**可见宇宙 → 纤维结构 → Laniakea → 本星系群 → 银河系 → 太阳系 → 地球**。每一层有可视化 + 知识面板。

### Phase 2 — Breadth

增加其他超星系团、其他行星、知名星系、特殊天体 (黑洞、中子星、系外行星 highlights)。引入索引/搜索。

### Phase 2 — Physics 板块启动（提前到 Session 15）

CLAUDE.md 第一条定义的第二顶层板块正式启动，先于 Phase 2 的"宇宙板块横向扩展"开工。

- **范围**：9 档主题主线（P0 经典 → P8 前沿），纯 SVG 手绘表达（无 3D）
- **顺手重构**：把硬编码 `TierId` 升级为 `Section × Tier` 二维结构，为未来板块零侵入扩展铺路
- **详见**：[`09-physics-vision.md`](./09-physics-vision.md) · [`10-section-architecture.md`](./10-section-architecture.md) · [`../develop/09-physics-implementation.md`](../develop/09-physics-implementation.md) · [`../develop/10-section-refactor.md`](../develop/10-section-refactor.md)

### Phase 3 — 跨板块互文 / 内容横向扩展

Physics 全 9 档完成后启动：

- 把 Universe ↔ Physics 互文 link 全部接通（如 T6 太阳系 ↔ P0 Kepler 定律）
- 移动适配、可访问性、Lighthouse CI 等收尾

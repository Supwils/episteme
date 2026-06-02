# 03 — UI / UX 指南

## 1. 信息架构

```
/                         首页 — 入口动画 + 导航
/universe                 宇宙板块入口
/universe/observable      可见宇宙
/universe/cosmic-web      大尺度纤维结构
/universe/laniakea        Laniakea (示例; 超星系团尺度的路由模式)
/universe/local-group     本星系群
/universe/milky-way       银河系
/universe/solar-system    太阳系
/universe/solar-system/earth   行星详情 (示例)
/about                    关于
```

子尺度路由用 `slug` 而不是数字层级，方便深链分享与扩展。

## 2. 三种核心视图

每个尺度页面由三种视图组合：

1. **Stage** (主舞台) — 占据屏幕主体的 3D / 2D 可视化。
2. **Heads-up overlay** (HUD) — 漂浮在 Stage 上的轻量信息：尺度标尺、当前对象名、提示按钮。
3. **Knowledge panel** (知识面板) — 默认隐藏，点击主体或专用按钮后从右侧滑入；包含数据卡、叙事段落、相关阅读。

不要把这三层混在一起。任何元素归属哪一层，必须明确。

## 3. 标准布局 (Desktop ≥ 1024px)

```
+----------------------------------------------------------+
|  [logo]                          [scale]   [help] [menu] |  <- top HUD (24px padding)
|                                                          |
|                                                          |
|                                                          |
|                    STAGE (3D/2D scene)                   |
|                                                          |
|                                                          |
|                                                          |
|  [zoom-out hint]                       [→ knowledge]     |  <- bottom HUD
+----------------------------------------------------------+

(panel slides in from right, 420px wide, semi-transparent background)
```

- 顶部 HUD 高度固定 56px，半透明黑底，渐隐边缘。
- 底部提示常驻但低对比 (opacity 0.5)，鼠标进入提升到 1。
- 知识面板宽度 420px (≥ 1280px)，1024–1279 缩到 360px。

## 4. 标准布局 (Tablet 768–1023px)

- 知识面板改为底部 sheet (高度 60vh)，从下方上滑。
- 顶部 HUD 精简到只剩 logo + 当前尺度名 + 菜单按钮。
- Stage 仍是全屏。

## 5. 标准布局 (Mobile ≤ 767px)

- 默认禁用连续相机控制，改为"章节模式"：左右滑动切换尺度。
- 知识面板默认占满全屏，stage 缩为顶部 40vh 预览。
- Post-processing 禁用，粒子数减半。

## 6. 导航与下钻

四种触发尺度切换的方式：

1. **双击 / 点击主体** — 进入下一层。
2. **滚轮 / 触控板捏合** — 连续缩放 (Desktop)。在到达"层临界点"时自动吸附到下一层场景。
3. **顶部尺度面包屑** — 跳跃式切换。
4. **键盘 `[` `]`** — 上下层切换。

**禁用**：纯滚动驱动的强制下钻 (Apple AirPods 那种)。理由：用户需要在每一层停下来读。

## 7. 交互反馈

- 鼠标悬停在可下钻对象上 → 光晕 + 鼠标指针变为「+」+ 显示对象名 tooltip。
- 切换尺度时 → 屏幕中心短暂出现尺度刻度动画 (例如 "10²² m → 10²⁰ m")。
- 加载新尺度资源时 → 底部细线性进度条，**不**用全屏 spinner。

## 8. 排版

- 中文：思源黑体 / Noto Sans SC，正文 14–16px，标题 24–48px。
- 英文 / 数字：Inter (Variable)，等宽数据用 JetBrains Mono。
- 行距：正文 1.7，标题 1.2。
- 数字带单位时强制 `tabular-nums`，避免跳动。

## 9. 配色

详见 `06-visual-style.md`。一句话：**暗色主导，强调色控制在 2 种以内**。

## 10. 可访问性 (A11y)

- 所有动画提供 `prefers-reduced-motion` 降级路径：相机跳切而不是过渡，过场动画时长 → 0。
- 颜色不是唯一信息载体：每个分类用颜色 + 形状 / 图标 / 文字三重编码。
- 键盘导航全覆盖：Tab 顺序合理，Enter / Space 触发主操作，Esc 退出当前面板。
- 关键文字对比度 ≥ 4.5:1 (AAA 优先)。

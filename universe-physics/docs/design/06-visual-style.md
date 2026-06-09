# 06 — 视觉风格

## 1. 调性

**冷、深、克制、有光感**。

参考心象：Hubble / JWST 真实照片的色彩科学 + Apollo 时代的工程图绘风 + 当代极简产品 UI (Linear / Vercel)。

避免：

- 卡通插画风
- 霓虹色泛滥的 cyberpunk
- 教科书图示的扁平蓝绿配色

## 2. 配色

### 2.1 背景

```
--bg-deep        #000000     # 主背景 (大尺度场景)
--bg-near        #060814     # 近尺度背景 (太阳系、行星)
--bg-panel       rgba(8, 10, 18, 0.72)   # 半透明面板
--bg-elevated    #0f1320     # 浮起卡片
```

### 2.2 文字

```
--fg-primary     #f5f6fa
--fg-secondary   #a8adbd
--fg-muted       #6b7080
--fg-disabled    #3a3e4a
```

### 2.3 强调色 (限制 2 种)

```
--accent-warm    #ffb45a     # 主强调 — 用于关键交互、主体光晕
--accent-cool    #6ad0ff     # 次强调 — 用于数据、链接、辅助高亮
```

**不要**再随手加颜色。任何"我想用绿色标这个"的冲动都先停下来问：能不能用 warm + cool + 透明度搞定？基本都能。

### 2.4 天体颜色 (基于真实光谱)

恒星按光谱型：

```
O / B   #a6c8ff
A       #cfd9ff
F       #f8f7ff
G       #fff4d8     # 太阳类
K       #ffd089
M       #ff8a5a     # 红矮星
```

行星色按真实可见反照率，不调。

## 3. 字体栈

```
正文中文: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif
正文英文: "Inter Variable", "Inter", sans-serif
等宽数据: "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace
标题:    同正文，加重字重 (600–700)
```

正文字号 14–16px。标题用 modular scale (1.25)。

## 4. 间距与栅格

8px 基础栅格。常用值：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96。

页面级内边距 (Desktop)：64px；面板内边距：24px。

## 5. 圆角

- 小元素 (按钮 / chip)：6px
- 卡片 / 面板：12px
- 大型容器：16px
- **不要**用胶囊全圆角，除非是 tag。

## 6. 阴影

暗色背景上谨慎用阴影。优先用**光晕 (glow)** 表达层级：

```
--glow-soft    0 0 16px rgba(106, 208, 255, 0.18)
--glow-warm    0 0 24px rgba(255, 180, 90, 0.25)
```

阴影只用在浅色场景 (基本不会有)。

## 7. 粒子与光感

### 7.1 星点

- 大尺度星点：白色 + 极轻 cool tint，size 1–2px (DPR-aware)。
- 近尺度恒星：按光谱色，size 与亮度挂钩。

### 7.2 Bloom

- 仅对 emissive 材质生效。
- 阈值高一点 (luminance > 1.0)，避免整屏发糊。
- 移动端关闭。

### 7.3 Volumetric / 雾

- 仅 T2 / T3 用一点点雾来表达星系团边界。**不要**做星云特效式的浓雾。

## 8. 动效语言

- 缓动默认：`cubic-bezier(0.22, 0.61, 0.36, 1)` (出场轻快、收尾克制)。
- UI 微动效时长：120–240ms。
- 尺度切换过场：1200–1800ms (具体见 `04-universe-experience.md`)。
- 数字滚动用 `tabular-nums` + `transition: --num 200ms linear`。

## 9. 图标

- 线性图标，1.5px stroke。
- 单色，默认 `--fg-secondary`，悬停 `--fg-primary`。
- 不引入大型图标库；按需手画或从 Lucide 拷贝裁剪。

## 10. 不允许的事

- 渐变背景 (除非有非常具体的科学理由)
- 玻璃拟物 (frosted glass) 之外的拟物效果
- 表情符号 emoji
- 动态背景视频
- 装饰性 GIF

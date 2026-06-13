---
title: 大质量恒星演化
titleEn: Massive Star Evolution
category: 恒星物理
tags: [大质量恒星, 超新星, 恒星演化, 核燃烧, 洋葱壳结构, 沃尔夫-拉叶星, 红超巨星]
updated: 2026-06-13
---

# 大质量恒星演化：燃烧的快速人生

## 概述

质量超过约 $8\,M_\odot$ 的恒星走的是一条与太阳截然不同的道路。它们的核心温度高、核燃烧快，主序寿命仅有几百万到几千万年（相比太阳的 $\sim 10$ Gyr）。更重要的是，它们在死亡时不会变成白矮星，而是以**核心坍缩超新星**的方式剧烈爆炸，留下中子星或黑洞。这些恒星是宇宙中绝大多数重元素（从碳到铁的所有中等质量元素）的主要来源，是宇宙化学演化的核心驱动者。

大质量恒星虽然在数量上稀少，但其辐射能量、恒星风和超新星爆炸在星系演化中占有压倒性的作用。一颗 $25\,M_\odot$ 恒星释放的总能量，相当于数十亿颗太阳数十亿年的总辐射。

## 主序阶段：氢燃烧

大质量恒星在零龄主序（ZAMS）上燃烧氢时，核心温度足够高，以至于 **CNO 循环**（而非 pp 链）主导氢燃烧：

$${}^{12}\text{C} + p \rightarrow {}^{13}\text{N} + \gamma \rightarrow \cdots \rightarrow {}^{12}\text{C} + {}^{4}\text{He}$$

CNO 循环的速率对温度极为敏感（$\propto T^{16}$ 至 $T^{20}$），产能高度集中在核心，驱动大尺度**对流**。这导致大质量恒星的氢燃烧核心是充分混合的，一旦核心氢耗尽，氢壳层点燃非常迅速。

主序寿命的粗略估计：

$$t_{MS} \approx \frac{0.007 M c^2}{L} \approx 10^{10} \text{ yr} \times \left(\frac{M}{M_\odot}\right)^{-2.5}$$

对 $25\,M_\odot$ 恒星约为 $6$ Myr，对 $100\,M_\odot$ 恒星约为 $3$ Myr（Woosley, Heger & Weaver 2002）。

## 主序后演化：洋葱壳结构

大质量恒星在离开主序后相继点燃越来越重的燃料，形成经典的**洋葱壳结构**：

| 燃烧阶段           | 核心温度                 | 主要产物   | 时标      |
| ------------------ | ------------------------ | ---------- | --------- |
| 氢燃烧             | $\sim 4 \times 10^7$ K   | 氦         | 数 Myr    |
| 氦燃烧（三阿尔法） | $\sim 2 \times 10^8$ K   | 碳、氧     | 数十万年  |
| 碳燃烧             | $\sim 6 \times 10^8$ K   | 氖、镁、钠 | 约 600 yr |
| 氖燃烧（光致蜕变） | $\sim 1.2 \times 10^9$ K | 氧、镁     | 约 1 yr   |
| 氧燃烧             | $\sim 2 \times 10^9$ K   | 硅、硫、氩 | 约 6 个月 |
| 硅燃烧             | $\sim 4 \times 10^9$ K   | 铁族元素   | 约 1 天   |

数据参考：Woosley, Heger & Weaver (2002), _Reviews of Modern Physics_, 74, 1015。

### 铁核——核燃烧的终点

铁（${}^{56}$Fe）的核子平均结合能在所有元素中最高，因此铁核燃烧不产生能量而消耗能量。一旦核心积累的铁核质量超过**钱德拉塞卡质量**（约 $1.4\,M_\odot$，考虑有限温度和中子化后修正为约 $1.2$–$1.5\,M_\odot$），电子简并压无法再维持流体静力学平衡，铁核在约 **0.1 秒**内坍缩，速度达到光速的 $\sim 25\%$。

## 质量损失：决定命运的关键变量

大质量恒星在整个生命期都经历强烈的**辐射驱动恒星风**：

- OB 型星主序恒星：$\dot{M} \sim 10^{-9}$–$10^{-5}\,M_\odot\,\text{yr}^{-1}$
- 沃尔夫-拉叶（WR）星：$\dot{M} \sim 10^{-5}$–$10^{-4}\,M_\odot\,\text{yr}^{-1}$
- 亮蓝变星（LBV）爆发期：$\dot{M}$ 可达 $10^{-1}\,M_\odot\,\text{yr}^{-1}$

金属丰度对质量损失率有强烈影响（$\dot{M} \propto Z^{0.7}$，Vink et al. 2001），因此高红移宇宙中（低金属丰度）的大质量恒星质量损失更少，更容易形成更大质量的致密残骸。这对引力波天文学意义重大——LIGO/Virgo 探测到的大质量黑洞并合事件可能来自低金属丰度环境。

## 演化路径：一张简化的分叉图

初始质量决定了大质量恒星的演化路径（这张图是高度简化的；金属丰度、自转、双星相互作用都会改变结果）：

```
初始质量 M_ZAMS
├── 8–25 M_sun：红超巨星（RSG） → 核心坍缩 → 中子星 + II-P 型超新星
├── 25–40 M_sun：RSG 或 WR（取决于金属丰度和质量损失）→ 中子星或黑洞
├── 40–100 M_sun（高 Z）：WR 星 → 黑洞，可能 Ib/Ic 型超新星
└── >100 M_sun（低 Z）：极不稳定，可能对不稳定超新星（PISN）
```

目前学界对于"恒星何时形成中子星、何时形成黑洞"仍有争议。2015 年对红超巨星 N6946-BH1 的观测可能揭示了一次"失败的超新星"——恒星直接坍缩为黑洞而几乎没有光学爆炸（Adams et al. 2017，_ApJ_, 840, 42），但这一解释仍需更多证据。

## 对流与混合的不确定性

大质量恒星内部有多个对流区，对流边界的精确位置（超射/overshoot 参数）对演化路径有显著影响：

- 较大的超射参数意味着更大的对流氢燃烧核心，延长主序寿命，增加氦核质量
- 超射参数的不确定性是恒星演化理论中最大的系统误差来源之一（Claret & Torres 2019）

对流混合的不确定性也影响超新星前体预测：我们对超新星爆炸前 $\sim 10$ 年内红超巨星的表面性质（光度、温度）与核心结构之间的对应关系，了解得仍然非常有限。

## 元素合成的贡献

大质量恒星是**r 过程以外所有核燃烧产物**的主要来源：

- **碳和氧**：来自氦燃烧（三阿尔法过程 + ${}^{12}\text{C}(\alpha,\gamma){}^{16}\text{O}$）
- **氖、镁、硅、硫、氩、钙**：来自碳、氖、氧燃烧
- **铁族元素（Cr、Mn、Fe、Ni）**：来自硅燃烧和爆炸性核合成
- **弱 s 过程元素**：氦燃烧和碳燃烧壳层中的慢中子捕获（$90 \lesssim A \lesssim 90$）

超新星爆炸期间，冲击波经过氧、硅层时触发**爆炸性核合成**，产生大量的 ${}^{56}$Ni，后者衰变为 ${}^{56}$Co 再衰变为 ${}^{56}$Fe，驱动超新星的光曲线。1987A 超新星对 $\gamma$ 射线的直接探测（Matz et al. 1988，_Nature_，331，416）证实了这一机制。

## 跨领域连接

- **沃尔夫-拉叶星**（`wolf-rayet-stars.md`）：大质量恒星剧烈质量损失后暴露核心的阶段
- **红超巨星与蓝超巨星**（`red-blue-supergiants.md`）：大质量恒星主序后的典型形态
- **核坍缩超新星**（`core-collapse-supernovae.md`）：大质量恒星的最终爆炸
- **引力波天文学**（`../引力波天文学.md`）：大质量恒星留下的黑洞/中子星是 LIGO 波源
- **恒星核合成**（`../恒星核合成.md`）：大质量恒星对星系化学演化的核心贡献

## 参考文献

- Woosley, S.E., Heger, A., & Weaver, T.A. (2002). The Evolution and Explosion of Massive Stars. _Reviews of Modern Physics_, 74, 1015–1071.
- Langer, N. (2012). Presupernova Evolution of Massive Single and Binary Stars. _Annual Review of Astronomy and Astrophysics_, 50, 107–164.
- Vink, J.S., de Koter, A., & Lamers, H.J.G.L.M. (2001). Mass-loss rates of Very Massive Stars. _Astronomy & Astrophysics_, 369, 574–588.
- Adams, S.M. et al. (2017). The Search for Failed Supernovae with the Large Binocular Telescope. _The Astrophysical Journal_, 840, 42.
- Heger, A. et al. (2003). How Massive Single Stars End Their Life. _The Astrophysical Journal_, 591, 288–300.

## 延伸阅读

- Smartt, S.J. (2009). Progenitors of Core-Collapse Supernovae. _Annual Review of Astronomy and Astrophysics_, 47, 63–106. — 超新星前体的观测约束
- de Mink, S.E. & Mandel, I. (2016). The chemically homogeneous evolutionary channel for binary black hole mergers. _Monthly Notices of the Royal Astronomical Society_, 460, 3545. — 低金属丰度双星演化与 LIGO 波源
- Maeder, A. & Meynet, G. (2000). The Evolution of Rotating Stars. _Annual Review of Astronomy and Astrophysics_, 38, 143. — 自转对大质量恒星演化的影响

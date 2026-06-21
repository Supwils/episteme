---
title: 原初黑洞
titleEn: Primordial Black Holes
category: 宇宙学前沿
tags: [原初黑洞, PBH, 暗物质候选, 霍金辐射, LIGO, 引力透镜, 早期宇宙]
updated: 2026-06-13
---

# 原初黑洞：早期宇宙压缩的遗迹

## 概述

大多数我们谈论的黑洞是恒星死亡的产物——质量大于约 $3\,M_\odot$ 的致密残骸。然而，理论物理学家在 20 世纪 70 年代就提出，宇宙早期的剧烈密度涨落可能直接将物质压缩形成黑洞，无需经过恒星演化。这类黑洞被称为**原初黑洞**（Primordial Black Holes, PBH）。

原初黑洞的吸引力在于其质量范围极宽——从远小于一颗小行星到数千个太阳质量均可能存在，涵盖了从亚原子到宇宙规模的惊人跨度。更重要的是，原初黑洞是**暗物质的候选者**之一：它们不发光，只有引力效应，可能构成暗物质的全部或一部分。

2016 年 LIGO 首次探测到引力波（GW150914），其源头是两个约 $30\,M_\odot$ 的黑洞并合——这个质量范围令部分研究者重新认真对待原初黑洞作为暗物质的可能性。

## 形成机制

### 密度扰动的直接坍缩

宇宙早期密度场的局部扰动，若其密度超出某个阈值（约 $\delta \rho / \rho \gtrsim 0.4$–$0.7$，取决于具体模型），就会在进入因果视界时直接坍缩形成黑洞，不经过恒星形成。

形成时间决定了 PBH 的质量——坍缩时视界内的质量约为：

$$M_{PBH} \approx M_H(t) = \frac{c^3 t}{G} \approx 10^{15} \text{ g} \left(\frac{t}{10^{-23} \text{ s}}\right)$$

因此：

| 形成时间     | PBH 质量                       |
| ------------ | ------------------------------ |
| $10^{-23}$ s | $\sim 10^{15}$ g（小行星质量） |
| $10^{-5}$ s  | $\sim M_\odot$（太阳质量）     |
| $10^{-3}$ s  | $\sim 10^3\,M_\odot$           |

### 宇宙暴胀产生的增强功率谱

标准宇宙学的近尺度不变功率谱产生的密度扰动幅度太小（$\delta \sim 10^{-5}$），无法直接形成 PBH。但若暴胀势在某些尺度上有特殊的平坦区域（"超平坦段"，ultra slow-roll inflation），功率谱在对应尺度的振幅可以被放大到 $\sim 10^{-2}$–$10^{-1}$，从而产生可观的 PBH 数目。

这类模型还预言**随机引力波背景**（Stochastic Gravitational Wave Background, SGWB）：密度扰动二阶效应产生的标量感应引力波，可被 LISA、PTA（脉冲星计时阵）等探测。

### 其他形成机制

- **相变气泡碰撞**：一阶相变（如电弱相变）的气泡碰撞可产生局部高密度区域
- **宇宙弦网络**：弦拓扑缺陷碰撞坍缩
- **QCD 相变**：QCD 相变附近状态方程的暂时软化使视界质量尺度（$\sim M_\odot$）上的 PBH 更容易形成

## 霍金辐射与质量下限

1974 年，史蒂芬·霍金（Stephen Hawking）推导出黑洞的热辐射公式（**霍金辐射**）：

$$T_{Hawking} = \frac{\hbar c^3}{8 \pi G M k_B} \approx 6 \times 10^{-8} \text{ K} \left(\frac{M_\odot}{M}\right)$$

黑洞质量越小，温度越高，辐射越强，蒸发越快。蒸发时标约为：

$$t_{evap} \approx \frac{5120 \pi G^2 M^3}{\hbar c^4} \approx 4 \times 10^{20} \text{ s} \left(\frac{M}{10^{15} \text{ g}}\right)^3$$

令 $t_{evap}$ 等于宇宙年龄（$\approx 4.3 \times 10^{17}$ s），得到**今天仍存在的 PBH 的质量下限**：

$$M_{PBH} \gtrsim 5 \times 10^{14} \text{ g} \approx 5 \times 10^{-19}\,M_\odot$$

质量小于此值的 PBH 已经在宇宙历史中完全蒸发。在蒸发的最后阶段（约 $10^{-23}$ 秒量级），PBH 会以极高温度辐射出所有标准模型粒子，可能产生可观测的 $\gamma$ 射线爆发。INTEGRAL 卫星等对这类 $\gamma$ 射线特征（约 $100$ MeV 以下的扩散辐射）设置了约束（Carr et al. 2010）。

## 作为暗物质的约束

PBH 作为暗物质的可能性受到来自多个方向的约束，目前只有**小行星质量范围**（约 $10^{17}$–$10^{22}$ g）的"质量窗口"允许 PBH 构成全部暗物质：

| 质量范围               | 主要约束方法                                            | 结论                     |
| ---------------------- | ------------------------------------------------------- | ------------------------ |
| $< 5 \times 10^{14}$ g | 霍金蒸发（$\gamma$ 射线）                               | 已完全蒸发，不存在       |
| $10^{15}$–$10^{17}$ g  | 宇宙 $\gamma$ 射线背景（INTEGRAL）                      | 丰度 $f_{PBH} < 0.01$    |
| $10^{17}$–$10^{22}$ g  | 中子星、白矮星的微引力透镜（EROS-2, MACHO, Subaru/HSC） | 部分区间开放             |
| $10^{23}$–$10^{26}$ g  | 小行星质量，小天体碰撞率                                | 约束较弱，**可能的窗口** |
| $1$–$100\,M_\odot$     | 微引力透镜（EROS-2, MACHO）；CMB 加热；x 射线双星       | 丰度 $< 0.1$–$10\%$      |
| $> 100\,M_\odot$       | CMB 各向异性吸积效应；Lyman-$\alpha$ 森林               | 高度受限                 |

**小行星质量窗口**（约 $10^{17}$–$10^{23}$ g）目前受约束最少，PBH 可以占暗物质的全部——但探测这一质量范围极为困难（引力透镜需要纳微引力透镜的分辨率，超出当前设施能力）。

### LIGO/Virgo 事件的 PBH 解释

GW150914（约 $36 + 29\,M_\odot$ 黑洞并合）等 LIGO 事件引发了是否来自 PBH 的讨论：

- $30\,M_\odot$ 级黑洞在低金属丰度恒星演化中可以自然形成
- PBH 起源需要这个质量的 PBH 占暗物质约 $0.1\%$–$1\%$，并以特定并合率形成双星

分析 LIGO O3 的并合质量分布和质量间隙（$2$–$5\,M_\odot$ 之间几乎无事件，$5$–$30\,M_\odot$ 之间有丰度分布）与 PBH 理论预言的对比，目前不能排除部分 LIGO 事件来自 PBH（Carr et al. 2021，_Reports on Progress in Physics_，84，116902）。

## 观测探测手段

- **微引力透镜**（Microlensing）：PBH 通过银河系中心方向时短暂放大背景恒星的亮度。EROS-2、OGLE、Subaru 超宽相机（HSC）等实验对不同质量范围设置了约束
- **动力学加热**：PBH 的引力扰动会加热矮星系和球状星团中的恒星，约束 PBH 质量和丰度
- **CMB 各向异性**：大质量 PBH 在复合时期的吸积会加热星际气体，影响 CMB 功率谱和光学深度
- **引力波背景**：双 PBH 并合产生的随机引力波背景（可被 LISA 探测）
- **脉冲星计时阵（PTA）**：2023 年，NANOGrav 等 PTA 发现了可能的随机引力波背景（Agazie et al. 2023），其振幅和谱型与 PBH 增强功率谱引起的标量感应引力波相容（尽管还有其他解释）

## 跨领域连接

- **暗物质直接探测**（`dark-matter-direct-detection.md`）：PBH 是粒子暗物质之外的替代暗物质候选
- **黑洞热力学与霍金辐射**（`../黑洞热力学与霍金辐射.md`）：霍金辐射决定了 PBH 的寿命
- **引力波天文学**（`../引力波天文学.md`）：PBH 双星可产生可观测的引力波信号
- **宇宙暴胀**（`../cosmic-inflation.md`）：PBH 的形成机制与暴胀功率谱直接相关

## 参考文献

- Hawking, S.W. (1974). Black hole explosions? _Nature_, 248, 30–31.
- Carr, B., Kohri, K., Sendouda, Y., & Yokoyama, J. (2010). New constraints on primordial black holes. _Physical Review D_, 81, 104019.
- Carr, B. et al. (2021). Constraints on Primordial Black Holes. _Reports on Progress in Physics_, 84, 116902.
- Agazie, G. et al. (NANOGrav Collaboration) (2023). The NANOGrav 15 yr Data Set: Evidence for a Gravitational-wave Background. _The Astrophysical Journal Letters_, 951, L8.
- Green, A.M. & Kavanagh, B.J. (2021). Primordial Black Holes as a dark matter candidate. _Journal of Physics G_, 48, 043001.

## 延伸阅读

- Carr, B. & Kühnel, F. (2022). Primordial Black Holes as Dark Matter: Recent Developments. _Annual Review of Nuclear and Particle Science_, 70, 355. — 最近进展综述
- Escrivà, A. et al. (2022). Primordial Black Holes. _arXiv:2211.05767_. — 2022 年全面综述
- Sasaki, M. et al. (2018). Primordial black holes — perspectives in gravitational wave astronomy. _Classical and Quantum Gravity_, 35, 063001. — 从引力波视角看原初黑洞

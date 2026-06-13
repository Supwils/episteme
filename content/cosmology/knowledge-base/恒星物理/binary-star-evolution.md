---
title: 双星演化与质量转移
titleEn: Binary Star Evolution and Mass Transfer
category: 恒星物理
tags: [双星, 质量转移, 洛希瓣, Ia型超新星, X射线双星, 共包层演化, 引力波]
updated: 2026-06-13
---

# 双星演化与质量转移：恒星之间的引力博弈

## 概述

银河系中约有 $40\%$–$70\%$ 的类太阳恒星处于双星或多星系统中（Raghavan et al. 2010，_ApJS_，190，1）；对于大质量 O 型星，这一比例超过 $70\%$（Sana et al. 2012，_Science_，337，444）。因此，大多数恒星并非孤立演化，而是与伴星共享引力束缚系统，它们的生命历程深刻地受到相互作用的影响。

双星相互作用不仅创造了宇宙中一些最壮观的天象（Ia 型超新星、X 射线双星、毫秒脉冲星、引力波事件），也是宇宙化学演化的重要驱动力——Ia 型超新星是银河系铁元素的主要来源，而中子星并合提供了 r 过程元素。理解双星演化，是现代天体物理学的核心课题之一。

## 洛希瓣几何：双星系统的引力边界

描述双星相互作用的核心概念是**洛希瓣**（Roche lobe）——每颗恒星的引力势占主导的空间区域。在同步旋转双星系统中，等势面形成两个相接的泪滴形区域，两颗星各占一个。两个泪滴的接触点称为**拉格朗日点 L1**，物质可以通过 L1 从一颗星流向另一颗星。

洛希瓣半径的经典近似（Eggleton 1983）：

$$\frac{R_L}{a} = \frac{0.49 q^{2/3}}{0.6 q^{2/3} + \ln(1 + q^{1/3})}$$

其中 $a$ 是轨道分离，$q = M_1/M_2$ 是质量比。当一颗恒星演化膨胀（如进入巨星阶段）并充满洛希瓣，物质开始通过 L1 流向伴星，称为**洛希瓣溢流**（Roche lobe overflow, RLOF）。

## 质量转移类型

根据驱动质量转移的物理机制，RLOF 分为三种情况（Case A/B/C）：

| 情况       | 发生时机                                 | 转移前施主星状态       |
| ---------- | ---------------------------------------- | ---------------------- |
| **Case A** | 主序阶段氢燃烧期间                       | 主序星，两星轨道很近   |
| **Case B** | 主序后氢燃烧壳层期（亚巨星或红巨星阶段） | 有氢壳层但核心未燃烧氦 |
| **Case C** | 氦核燃烧后（AGB 阶段）                   | 碳氧核外的氦燃烧壳层   |

质量转移的稳定性取决于两颗星的质量比和施主星的状态。如果质量转移速率过快，受主星无法处理流入的物质，系统可能进入**共包层演化**（Common Envelope Evolution, CEE）。

## 共包层演化：轨道急剧收缩

当质量转移变得不稳定（通常发生在大质量比 $q \gg 1$ 的系统或巨星的热时标上的快速 RLOF），施主星的整个外包层可能迅速膨胀并包裹伴星，形成**共包层**。在共包层中：

1. 伴星（和施主星的核心）在致密包层中旋转
2. 动力学摩擦将轨道动能转移给包层
3. 包层被逐渐加热并可能被驱逐出去
4. 如果包层成功驱逐，留下一个轨道大幅收缩的紧密双星（致密残骸+伴星）

能量守恒近似（$\alpha_{CE}$ 参数化）：

$$\alpha_{CE} \cdot \left(\frac{G M_{d,c} M_a}{2 a_f} - \frac{G M_d M_a}{2 a_i}\right) = E_{bind}$$

其中 $\alpha_{CE}$ 是包层驱逐效率（$0 < \alpha_{CE} \leq 1$），$a_i$ 和 $a_f$ 是初始和最终轨道分离。

共包层演化是产生紧密双致密星系统（如双白矮星、白矮星+中子星）的关键机制，是引力波波源（如 LIGO 探测到的双黑洞、双中子星）形成的必要步骤（Ivanova et al. 2013，_A&A Review_，21，59）。共包层演化的物理机制至今尚未完全理解，$\alpha_{CE}$ 参数的不确定性是双致密星种群合成的最大误差来源。

## Ia 型超新星：白矮星的两种死法

Ia 型超新星是宇宙距离测量的标准烛光，也是银河系中铁族元素的主要来源。它们被认为来自**白矮星在双星系统中积累质量至钱德拉塞卡极限附近**。但"给白矮星喂质量"的机制存在两种主要竞争理论：

### 单简并模型（Single Degenerate, SD）

白矮星从正常伴星（主序星、巨星）通过 RLOF 积累氢/氦，在表面燃烧后逐渐增加碳氧核质量，最终在质量接近 $M_{Ch} \approx 1.4\,M_\odot$ 时发生热核爆炸。

- **优点**：概念清晰，有直接物理机制
- **问题**：观测上从未在 Ia 型超新星遗迹中找到预期的幸存伴星；SD 模型预测的新星活动也难以解释 Ia 型超新星的实际发生率

### 双简并模型（Double Degenerate, DD）

两颗白矮星在引力波辐射驱动下轨道衰减并最终并合，如果总质量超过钱德拉塞卡极限，则引发爆炸。

- **优点**：双白矮星系统已有直接观测；与某些超亮和亚亮 Ia 型超新星的观测特征吻合
- **问题**：质量比的并合可能产生轻度吸积诱导坍缩（AIC）形成中子星，而不是热核爆炸

目前学界共识是 Ia 型超新星可能来自**多种前体系统**（"多前体通道"，Maoz, Mannucci & Nelemans 2014，_ARA&A_，52，107），不同环境和时标对应不同渠道。

## X 射线双星：活跃的质量转移系统

**X 射线双星**（X-ray Binary, XRB）是质量转移正在进行的双星系统，其中致密天体（中子星或黑洞）从伴星吸积物质，物质落入的引力势能转化为 X 射线辐射：

$$L_X \sim \frac{G M \dot{M}}{R} \approx 10^{38} \left(\frac{\dot{M}}{10^{-8}\,M_\odot\,\text{yr}^{-1}}\right) \text{ erg/s}$$

X 射线双星分为两类：

- **高质量 X 射线双星（HMXB）**：伴星为 OB 型大质量星，通过恒星风吸积（如 Cyg X-1）
- **低质量 X 射线双星（LMXB）**：伴星为低质量星，通过 RLOF 吸积盘吸积（如半人马座 X-4）

LMXB 中的中子星可以被吸积物质自旋加速到毫秒级旋转周期——这就是**毫秒脉冲星**（MSP）的形成机制，有时称为"再生脉冲星"（recycled pulsar）。毫秒脉冲星的自转极为稳定，可用作高精度时钟，在脉冲星计时阵列中探测引力波背景（PTA 计划）。

## 双星对引力波天文学的贡献

LIGO/Virgo/KAGRA 探测到的引力波事件几乎全部来自双致密星系统的并合：

- **BBH（双黑洞并合）**：来自大质量双星演化，经历共包层演化或类共包层演化（化学均一演化）
- **BNS（双中子星并合）**：GW170817 + AT2017gfo 千新星——中子星并合产生 r 过程元素的直接证据
- **NSBH（中子星+黑洞并合）**：2021 年首次探测（GW200105、GW200115）

截至 2023 年，LIGO/Virgo/KAGRA 第三次观测运行（O3）共检测到约 90 个引力波候选事件（GWTC-3），为双星演化理论提供了前所未有的约束（Abbott et al. 2023，_Physical Review X_，13，041039）。

## 跨领域连接

- **大质量恒星演化**（`massive-star-evolution.md`）：大质量双星是 BBH 和 NSBH 的前体
- **白矮星**（`white-dwarfs.md`）：白矮星在 SD 和 DD 通道中是 Ia 型超新星前体
- **中子星与脉冲星**（`../中子星与脉冲星.md`）：双星吸积产生毫秒脉冲星
- **引力波天文学**（`../引力波天文学.md`）：双致密星并合是主要引力波波源
- **恒星金属丰度与化学演化**（`stellar-metallicity-chemical-evolution.md`）：Ia 型超新星和中子星并合是 Fe 和 r 过程元素的来源

## 参考文献

- Raghavan, D. et al. (2010). A Survey of Stellar Families: Multiplicity of Solar-type Stars. _The Astrophysical Journal Supplement Series_, 190, 1–42.
- Sana, H. et al. (2012). Binary Interaction Dominates the Evolution of Massive Stars. _Science_, 337, 444–446.
- Eggleton, P.P. (1983). Approximations to the radii of Roche lobes. _The Astrophysical Journal_, 268, 368.
- Ivanova, N. et al. (2013). Common Envelope Evolution: Where we stand and how we can move forward. _Astronomy & Astrophysics Review_, 21, 59.
- Maoz, D., Mannucci, F., & Nelemans, G. (2014). Observational Clues to the Progenitors of Type Ia Supernovae. _Annual Review of Astronomy and Astrophysics_, 52, 107–170.
- Abbott, R. et al. (LIGO/Virgo/KAGRA Collaboration) (2023). GWTC-3: Compact Binary Coalescences Observed by LIGO and Virgo during the Second Part of the Third Observing Run. _Physical Review X_, 13, 041039.

## 延伸阅读

- de Mink, S.E. et al. (2014). The Rotation Rates of Massive Stars: The Role of Binary Interaction. _The Astrophysical Journal_, 782, 7. — 双星相互作用对大质量恒星自转的影响
- Postnov, K.A. & Yungelson, L.R. (2014). The Evolution of Compact Binary Star Systems. _Living Reviews in Relativity_, 17, 3. — 双致密星演化的权威综述
- Tauris, T.M. & van den Heuvel, E.P.J. (2023). _Physics of Binary Star Evolution_. Princeton University Press. — 双星演化领域最新权威教材

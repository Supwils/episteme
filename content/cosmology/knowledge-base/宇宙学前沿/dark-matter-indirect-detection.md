---
title: 暗物质间接探测
titleEn: Indirect Detection of Dark Matter
category: 宇宙学前沿
tags: [暗物质, 间接探测, 伽马射线, 正电子, 反质子, AMS-02, Fermi-LAT, 信号与本底]
updated: 2026-06-13
---

# 暗物质间接探测：从宇宙射线中寻找湮灭的痕迹

## 概述

如果暗物质粒子（如 WIMP）是它自己的反粒子，或者暗物质与反暗物质在宇宙中共存，那么当两个暗物质粒子相遇时，它们会发生**湮灭**，产生标准模型粒子——伽马射线、正电子、反质子、中微子，以及各种次级粒子。在暗物质密度较高的区域（银河系中心、矮球状星系、星系团），这种湮灭产生的粒子流应当比普通天体物理来源更强。

**间接探测**就是通过观测这些粒子流中的异常——超出天体物理预期本底的信号——来推断暗物质的存在和性质。与直接探测相比，间接探测不需要把探测器放在地下，但面临的最大困难是如何区分暗物质信号和各种正常的天体物理来源（脉冲星、超新星遗迹、宇宙线传播等）。

## 理论基础：湮灭截面与信号强度

WIMP 对的湮灭率与暗物质密度的平方成正比：

$$\Phi \propto \langle \sigma v \rangle \int \rho_\chi^2 \, dl$$

其中 $\langle \sigma v \rangle$ 是热平均湮灭截面（对于 WIMP 的正确热遗迹，典型值约 $\langle \sigma v \rangle \sim 3 \times 10^{-26}$ cm$^3$ s$^{-1}$），$\int \rho_\chi^2 dl$ 称为**J 因子**，是视线方向暗物质密度平方的积分，决定了信号的强度。

银河系中心的 J 因子最大（密度最高），但本底也最复杂。**矮球状星系**（矮椭球星系，dSph）的 J 因子较小，但本底极为干净（几乎没有正常天体物理来源），是当前最干净的间接探测靶场。

## 伽马射线：最清晰的信号道

伽马射线不受磁场偏折，保留了方向信息，是间接探测最直接的手段。

### Fermi-LAT：轨道伽马射线望远镜

**费米伽马射线空间望远镜（Fermi-LAT）**自 2008 年运行至今，是当前灵敏度最高的 MeV–TeV 伽马射线观测设备（Atwood et al. 2009，_ApJ_，697，1071）。

**矮球状星系联合分析**：矮球状星系是 Fermi-LAT 暗物质搜索的核心靶场。对 45 个矮球状星系的联合分析（Ackermann et al. 2015，_Physical Review Letters_，115，231301）在整个 $2$ GeV–$10$ TeV 质量范围内未发现超过本底的信号，将湮灭截面约束在热遗迹值（$3 \times 10^{-26}$ cm$^3$ s$^{-1}$）以下（对 $\lesssim 100$ GeV 的 WIMP）。

**银河中心伽马射线超出（GCE）**：Fermi-LAT 在银河中心方向发现了一个在约 $1$–$10$ GeV 的伽马射线超出，其能谱和空间分布与约 $30$–$40$ GeV WIMP 湮灭（$b\bar{b}$ 通道）的预期一致（Goodenough & Hooper 2009；Gordon & Macías 2013）。这一"GCE"引发了广泛讨论。

然而，后续研究表明，GCE 可以被**未分解的毫秒脉冲星群**（MSP）所解释：大量 $\sim 10^4$–$10^5$ 颗未分解的 MSP 叠加产生的伽马射线可以精确模拟 GCE 的能谱（Cholis et al. 2015；Bartels et al. 2016，_Nature Physics_，12，133）。GCE 的起源至今尚无定论：天体物理起源（MSP 主导）或暗物质湮灭均未被排除。

### 地面切伦科夫望远镜

**H.E.S.S.**（纳米比亚）、**MAGIC**（西班牙）和 **VERITAS**（美国亚利桑那）在 TeV 以上能段探测伽马射线，对重 WIMP（$m_\chi > 1$ TeV）更灵敏。

即将运行的 **CTA**（切伦科夫望远镜阵列）将灵敏度提高约一个数量级，有望在银河中心和麦哲伦云中将 WIMP 搜索推进到中微子本底以下。

## 正电子与反质子：来自宇宙的异常

带电粒子在银河系磁场中偏转，失去方向信息，但其能谱仍可携带暗物质信号。

### AMS-02 正电子比例超出

国际空间站上的 **AMS-02**（Alpha Magnetic Spectrometer-02）从 2011 年持续测量宇宙射线成分。在 $\sim 10$–$300$ GeV 能段，正电子比例（$e^+/(e^+ + e^-)$）远高于标准宇宙射线传播模型的预测（Aguilar et al. 2013，_Physical Review Letters_，110，141102）。这一"正电子超出"最初被认为是暗物质湮灭的信号。

然而，**脉冲星**（尤其是近邻年轻脉冲星如 Geminga 和 Monogem）也是强烈的正电子源。HAWC 高海拔水切伦科夫观测站（Lopez-Cobia et al. 2017，_Science_，358，911）对 Geminga 和 Monogem 周围 TeV 电子/正电子云（TeV 光晕）的观测，揭示了脉冲星可以产生足够解释 AMS-02 超出的正电子通量。目前，脉冲星起源和暗物质湮灭仍是正电子超出的两种竞争解释。

### AMS-02 反质子

AMS-02 还发现约 $300$–$400$ GeV 处的反质子谱可能存在超出（Cuoco et al. 2017；Cui et al. 2017）。如果确认，这可能对应约 $50$–$100$ GeV WIMP 的湮灭信号。然而，反质子谱的解释高度依赖于宇宙射线传播模型（扩散系数、核反应截面等）中的不确定性，信号的统计显著性受到质疑。

## 中微子：穿透最强的信使

如果 WIMP 聚集在太阳中心并湮灭，产生的高能中微子（$\gtrsim 100$ GeV）可以穿透太阳被地面探测器检测到。**IceCube**（南极冰下中微子探测器）和 **ANTARES**（地中海深海中微子望远镜）搜索来自太阳和银河中心方向的高能中微子超出，目前均未发现 WIMP 信号，对自旋依赖（SD）截面的约束已超过直接探测实验。

## 主要争议：天体物理模型的不确定性

间接探测面临的最核心挑战是**本底建模**。几乎所有"超出信号"都可以被正常天体物理来源解释：

- 脉冲星（正电子超出、GCE）
- 超新星遗迹（宇宙射线增速）
- 弥漫伽马射线发射（星际介质相互作用）
- 核反应截面不确定性（反质子超出）

没有一个间接探测"超出"已经达到不可争辩的暗物质信号水平。这并不意味着实验无价值——每一次测量都对 WIMP 参数空间（质量、截面、湮灭通道）给出更严格的上限，逐渐压缩 WIMP 的"生存空间"。

## 跨领域连接

- **暗物质直接探测实验**（`dark-matter-direct-detection.md`）：与间接探测互补的搜索方法
- **暗物质候选粒子**（`../宇宙学基础/暗物质候选粒子WIMP与轴子.md`）：WIMP 的理论背景
- **中子星与脉冲星**（`../中子星与脉冲星.md`）：脉冲星是正电子超出和 GCE 的主要天体物理竞争解释
- **多信使天文学**（`../多信使天文学.md`）：伽马射线、宇宙线、中微子联合搜索

## 参考文献

- Atwood, W.B. et al. (Fermi-LAT Collaboration) (2009). The Large Area Telescope on the Fermi Gamma-Ray Space Telescope Mission. _The Astrophysical Journal_, 697, 1071.
- Ackermann, M. et al. (Fermi-LAT Collaboration) (2015). Searching for Dark Matter Annihilation from Milky Way Dwarf Spheroidal Galaxies with Six Years of Fermi Large Area Telescope Data. _Physical Review Letters_, 115, 231301.
- Aguilar, M. et al. (AMS Collaboration) (2013). First Result from the Alpha Magnetic Spectrometer on the International Space Station: Precision Measurement of the Positron Fraction in Primary Cosmic Rays. _Physical Review Letters_, 110, 141102.
- Bartels, R., Krishnamurthy, S., & Weniger, C. (2016). Strong support for the millisecond pulsar origin of the Galactic center GeV excess. _Nature Physics_, 12, 133.
- Lopez-Cobia, H.A. et al. (HAWC Collaboration) (2017). Observation of the Geminga pulsar wind nebula above 100 TeV with HAWC. _Science_, 358, 911.

## 延伸阅读

- Conrad, J. & Reimer, O. (2017). Indirect dark matter searches in gamma and cosmic rays. _Nature Physics_, 13, 224. — 间接探测方法综述
- Slatyer, T.R. (2021). Indirect Detection of Dark Matter. In _Theoretical Advanced Study Institute in Elementary Particle Physics: Journeys Through the Precision Frontier_. — 理论基础与实验状态的综合综述
- Profumo, S. (2017). _An Introduction to Particle Dark Matter_. World Scientific. — 包括直接、间接探测和对撞机搜索的教材

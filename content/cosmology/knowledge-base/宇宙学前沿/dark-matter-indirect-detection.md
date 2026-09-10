---
title: 暗物质间接探测
titleEn: Indirect Detection of Dark Matter
category: 宇宙学前沿
tags: [暗物质, 间接探测, 伽马射线, 正电子, 反质子, AMS-02, Fermi-LAT, 信号与本底]
updated: 2026-09-07
---

# 暗物质间接探测：从宇宙射线中寻找湮灭的痕迹

## 概述

如果暗物质粒子（如 WIMP）是它自己的反粒子，或者暗物质与反暗物质在宇宙中共存，那么当两个暗物质粒子相遇时，它们会发生**湮灭**，产生标准模型粒子——伽马射线、正电子、反质子、中微子，以及各种次级粒子。在暗物质密度较高的区域（银河系中心、矮球状星系、星系团），这种湮灭产生的粒子流应当比普通天体物理来源更强。

**间接探测**就是通过观测这些粒子流中的异常——超出天体物理预期本底的信号——来推断暗物质的存在和性质。与直接探测相比，间接探测不需要把探测器放在地下，但面临的最大困难是如何区分暗物质信号和各种正常的天体物理来源（脉冲星、超新星遗迹、宇宙线传播等）。

间接探测、地下直接探测和对撞机生产，是同一套 [[暗物质候选粒子WIMP与轴子|WIMP]] 假说的三条腿。直接探测等的是核反冲。对撞机等的是失踪能量。间接探测等的是湮灭或衰变后的标准模型产物。

三条腿切出的参数空间并不重合。太阳内部的自旋依赖散射、氙靶上的自旋无关散射、伽马射线给出的湮灭截面，约束的是不同组合。

至今没有一条间接探测通道达到不可争辩的发现标准。PAMELA 与 AMS-02 看到的正电子超出、Fermi-LAT 看到的银心 GeV 超出，都仍允许天体物理解释。把「未发现」写成「已经看到[[暗物质]]」，是这类叙述里最常见的误读。

## 理论基础：湮灭截面与信号强度

WIMP 对的湮灭率与暗物质密度的平方成正比：

$$\Phi \propto \langle \sigma v \rangle \int \rho_\chi^2 \, dl$$

其中 $\langle \sigma v \rangle$ 是热平均湮灭截面（对于 WIMP 的正确热遗迹，典型值约 $\langle \sigma v \rangle \sim 3 \times 10^{-26}$ cm$^3$ s$^{-1}$），$\int \rho_\chi^2 dl$ 称为**J 因子**，是视线方向暗物质密度平方的积分，决定了信号的强度。

银河系中心的 J 因子最大（密度最高），但本底也最复杂。**矮球状星系**（矮椭球星系，dSph）的 J 因子较小，但本底极为干净（几乎没有正常天体物理来源），是当前最干净的间接探测靶场。

J 因子对[[dark-matter-halo|暗物质晕]]轮廓的依赖很陡。同一座矮星系，中心若是尖核还是有核，视线积分可以差出一个数量级以上。银河系中心的名义信号最强，也正因为如此，气体、恒星与未分辨点源把本底抬到几乎无法建模。

[[dwarf-galaxies|矮球状星系]]把预期信号换小，换来的是几乎没有星形成、几乎没有弥漫伽马射线的干净视场。Fermi-LAT 对它们的联合分析给出的，因此主要是上限而不是发现。

湮灭产物并不只有伽马射线。正电子、反质子、中微子是另外三条信使。带电产物在银河磁场里走随机路径，方向信息丢失，只留下能谱。

中微子保留方向，但相互作用极弱，要靠立方公里级的靶。三条信使互相不能替代：能谱形状、空间形态、以及能否穿透致密天体，回答的是不同的问题。

## 伽马射线：最清晰的信号道

伽马射线不受磁场偏折，保留了方向信息，是间接探测最直接的手段。

### Fermi-LAT：轨道伽马射线望远镜

**费米伽马射线空间望远镜（Fermi-LAT）**自 2008 年运行至今，是当前灵敏度最高的 MeV–TeV 伽马射线观测设备（Atwood et al. 2009，_ApJ_，697，1071）。

费米于 2008 年 6 月 11 日发射。LAT 覆盖大约 20 MeV 到 300 GeV 以上，视场约占全天的五分之一，以巡天模式反复扫过整片天空。对暗物质搜索而言，巡天比单次指向更重要：矮星系、银心、星系团和银晕可以在同一套数据里、用同一套响应函数来分析。

伽马射线不受磁场偏折，所以超出一旦出现，方向可以指回天体。这是它比[[宇宙射线]]里的带电成分更清晰的原因。

**矮球状星系联合分析**：矮球状星系是 Fermi-LAT 暗物质搜索的核心靶场。对 45 个矮球状星系的联合分析（Ackermann et al. 2015，_Physical Review Letters_，115，231301）在整个 $2$ GeV–$10$ TeV 质量范围内未发现超过本底的信号，将湮灭截面约束在热遗迹值（$3 \times 10^{-26}$ cm$^3$ s$^{-1}$）以下（对 $\lesssim 100$ GeV 的 WIMP）。

后来的分析把 DES 新发现的卫星星系加进样本，靶场变多，结论的形态没有变（Albert et al. 2017，_ApJ_，834，110）。所谓「排除」，意思是：若该质量、该湮灭通道、该密度轮廓为真，Fermi-LAT 应当已经看到超出；它没有看到。排除的是参数点，不是暗物质这个概念。热遗迹截面附近、主要湮灭到夸克的轻到中等质量 WIMP，被这条干净靶场压得最紧。

**银河中心伽马射线超出（GCE）**：Fermi-LAT 在银河中心方向发现了一个在约 $1$–$10$ GeV 的伽马射线超出，其能谱和空间分布与约 $30$–$40$ GeV WIMP 湮灭（$b\bar{b}$ 通道）的预期一致（Goodenough & Hooper 2009；Gordon & Macías 2013）。这一"GCE"引发了广泛讨论。

然而，后续研究表明，GCE 可以被**未分解的毫秒脉冲星群**（MSP）所解释：大量 $\sim 10^4$–$10^5$ 颗未分解的 MSP 叠加产生的伽马射线可以精确模拟 GCE 的能谱（Cholis et al. 2015；Bartels et al. 2016，_Nature Physics_，12，133）。GCE 的起源至今尚无定论：天体物理起源（MSP 主导）或暗物质湮灭均未被排除。

2012 年前后，有人从 Fermi-LAT 数据里读出一条约 130 GeV 的单色谱线（Weniger 2012）。线状谱几乎无法由普通连续过程伪造，一度被视为最接近「烟枪」的候选。后续用独立事件选择与更新的仪器响应重做，这条线没有站稳（Fermi-LAT Collaboration 2013）。

它留下的教训比信号本身更有用：间接探测里，任何看起来太干净的特征，都要先过本底与系统误差这一关。银心超出可以争论；一条站不住的线，不能写成发现。

### 地面切伦科夫望远镜

**H.E.S.S.**（纳米比亚）、**MAGIC**（西班牙）和 **VERITAS**（美国亚利桑那）在 TeV 以上能段探测伽马射线，对重 WIMP（$m_\chi > 1$ TeV）更灵敏。

即将运行的 **CTA**（切伦科夫望远镜阵列）将灵敏度提高约一个数量级，有望在银河中心和麦哲伦云中将 WIMP 搜索推进到中微子本底以下。

这三台阵列都利用高能伽马射线在大气中引发的电磁簇射。簇射粒子速度超过空气中的光速，发出切伦科夫闪光，地面镜面把它成像。立体观测用多台望远镜同时看同一簇射，用来压低强子本底、重建入射方向与能量。H.E.S.S. 在纳米比亚霍马斯高地，MAGIC 在加那利群岛拉帕尔马的罗克德洛斯穆查乔斯，VERITAS 在美国亚利桑那的惠普尔天文台。

它们的有效面积远大于轨道仪器，代价是只能在无月晴夜工作，并且能量阈值一般高于 Fermi-LAT。对质量超过 TeV 的 WIMP，地面阵列更灵敏；对 GeV 级 WIMP，关系反过来。H.E.S.S. 对内银晕十年数据的搜索，同样没有给出湮灭信号（H.E.S.S. Collaboration 2016）。

切伦科夫望远镜阵列天文台（CTAO）把北址放在拉帕尔马、南址放在智利帕拉纳尔。第一批大尺寸望远镜已在北址出光，全阵仍在建设。它不是已经完成的发现机器。现有约束仍然来自 H.E.S.S.、MAGIC、VERITAS 与 Fermi-LAT 的联合图景，而不是尚未落成的阵列。

## 正电子与反质子：来自宇宙的异常

带电粒子在银河系磁场中偏转，失去方向信息，但其能谱仍可携带暗物质信号。

正电子超出并不是 AMS-02 先看到的。PAMELA（Payload for Antimatter Matter Exploration and Light-nuclei Astrophysics）于 2006 年随俄罗斯「资源-DK1」卫星升空，2009 年在《自然》报告：在约 1.5–100 GeV，正电子比例随能量上升，而次级产生的标准预期是下降（Adriani et al. 2009）。

这一结果迫使宇宙线传播模型与暗物质模型同时改写。[[中子星与脉冲星|脉冲星]]注入与暗物质湮灭都能制造上升的正电子比例。PAMELA 单独无法裁决。

### AMS-02 正电子比例超出

国际空间站上的 **AMS-02**（Alpha Magnetic Spectrometer-02）从 2011 年持续测量宇宙射线成分。在 $\sim 10$–$300$ GeV 能段，正电子比例（$e^+/(e^+ + e^-)$）远高于标准宇宙射线传播模型的预测（Aguilar et al. 2013，_Physical Review Letters_，110，141102）。这一"正电子超出"最初被认为是暗物质湮灭的信号。

然而，**脉冲星**（尤其是近邻年轻脉冲星如 Geminga 和 Monogem）也是强烈的正电子源。HAWC 高海拔水切伦科夫观测站（Abeysekara et al. 2017，_Science_，358，911）对 Geminga 和 Monogem 周围 TeV 电子/正电子云（TeV 光晕）的观测，揭示了脉冲星可以产生足够解释 AMS-02 超出的正电子通量。目前，脉冲星起源和暗物质湮灭仍是正电子超出的两种竞争解释。

AMS-02 于 2011 年 5 月装上国际空间站，主持人为丁肇中。它用永磁体把正负电子、质子与反质子在径迹上分开，再以穿越辐射探测器与量能器压低质子误判。空间站轨道意味着探测器在大气之上，但并不在银河磁场之外：到达的带电粒子方向早已被打乱。

AMS-02 的优势是高统计、宽能段和粒子鉴别，不是定位源。正电子超出被它从 PAMELA 的能段延伸到更高能量，争议却没有因此结束。暗物质解释仍要求湮灭主要进入轻子通道，并同时应付反质子与伽马射线通道上已经很紧的上限。两条叙事目前仍然并存。

### AMS-02 反质子

AMS-02 还发现约 $300$–$400$ GeV 处的反质子谱可能存在超出（Cuoco et al. 2017；Cui et al. 2017）。如果确认，这可能对应约 $50$–$100$ GeV WIMP 的湮灭信号。然而，反质子谱的解释高度依赖于宇宙射线传播模型（扩散系数、核反应截面等）中的不确定性，信号的统计显著性受到质疑。

反质子与正电子不同。普通宇宙线质子与星际气体碰撞会生成次级反质子，这个本底比正电子本底更容易从核截面算出来，也因此对核反应数据更敏感。所谓高能处可能的超出，统计上从未达到发现阈值。

传播系数与产生截面一变，凸起可以消失。它最多是需要继续盯住的能段，不是已经成立的暗物质证据。[[超新星遗迹]]加速的宇宙线本身就会改写本底形状，必须与暗物质模板一起拟合，而不能先假定本底再谈超出。

## 中微子：穿透最强的信使

如果 WIMP 聚集在太阳中心并湮灭，产生的高能中微子（$\gtrsim 100$ GeV）可以穿透太阳被地面探测器检测到。**IceCube**（南极冰下中微子探测器）和 **ANTARES**（地中海深海中微子望远镜）搜索来自太阳和银河中心方向的高能中微子超出，目前均未发现 WIMP 信号，对自旋依赖（SD）截面的约束已超过直接探测实验。

IceCube 在南极冰盖下埋设约一立方公里的光学模块阵列，2010 年 12 月完工。WIMP 若在太阳内部被质子散射而俘获，会在核心累积并湮灭；除了[[neutrino-physics|中微子]]，其他产物都出不来。IceCube 用 79 弦配置对准太阳方向搜索，未发现超出（IceCube Collaboration 2013）。ANTARES 在地中海同样给出空结果。

因为太阳主要由氢构成，这条路径对自旋依赖散射特别敏感，恰与氙靶直接探测主要约束的自旋无关截面互补。银河中心的中微子搜索同样给出的是上限。中微子通道的代价是事例率极低，优势是源的方向清楚，并且能看见不透明天体的内部。

## 主要争议：天体物理模型的不确定性

间接探测面临的最核心挑战是**本底建模**。几乎所有"超出信号"都可以被正常天体物理来源解释：

- 脉冲星（正电子超出、GCE）
- 超新星遗迹（宇宙射线增速）
- 弥漫伽马射线发射（星际介质相互作用）
- 核反应截面不确定性（反质子超出）

没有一个间接探测"超出"已经达到不可争辩的暗物质信号水平。这并不意味着实验无价值——每一次测量都对 WIMP 参数空间（质量、截面、湮灭通道）给出更严格的上限，逐渐压缩 WIMP 的"生存空间"。

间接探测的上限仍然有用。热遗迹 WIMP 若主要湮灭到夸克或 W 玻色子，GeV 至 TeV 的参数空间已被伽马射线与反质子切掉一大块。剩下的缝多半要求轻子主导的通道、速度依赖的湮灭，或根本不是弱尺度的粒子。

与地下直接探测、对撞机失踪能量放在一起读，WIMP 的「自然」角落在缩小。缩小不是发现。下一代地面伽马射线阵列若仍是空结果，弱尺度热遗迹作为默认图像会更难维持；若出现无法用脉冲星或毫秒脉冲星群复制的空间—能谱结构，争论才会从「上限」转到「信号」。

## 跨域连接

- **[[dwarf-galaxies|矮星系]]**：信号强度按视线上暗物质密度**平方**的积分走，于是平方把轮廓假设的影响放大了。推论是矮球状星系换来的是干净而不是强：本底低意味着一旦有超出就可信，但预期信号本来就弱，因此它给出的通常是上限而不是发现。
- **[[clinical-diagnosis|临床诊断]]**：所有超出都能被正常来源解释——脉冲星、超新星遗迹、宇宙线传播；这在诊断学里叫特异性不足：查到异常却指不出病因。推论是提高灵敏度不解决特异性，要解决它必须找能区分病因的指标，例如能谱与空间分布的形状差异。
- **[[probability|概率]]**：一大群未分辨的点源和一片真正弥散的发射，在平均强度上可以完全一样，区别在涨落——点源叠加会让每个像素的光子计数分布更宽。推论是判决银心超出的关键量是计数的高阶统计而不是总通量，因此"能谱吻合"本身不足以定案。
- **[[earths-magnetic-field|地球磁场]]**：带电粒子沿磁场螺旋运动，方向信息在传播中被打乱——宇宙线到达地球前被银河系磁场搅乱，与地磁把太阳风导向极区是同一件事。推论是正电子超出只能用能谱形状论证、不能用方向定源；而中性的伽马射线与中微子保留方向，这才是它们成为最清晰信号道的原因。
- **[[neutrino-physics|中微子物理]]**：中微子几乎不与物质作用，因此能从太阳中心穿出来；同一性质既让它成为唯一能探查致密天体内部的信使，也让它极难被捕获。推论是这条路给出的是自旋依赖截面的约束，与直接探测的自旋无关约束并不重复，而是互补。

## 参考文献

- Atwood, W.B. et al. (Fermi-LAT Collaboration) (2009). The Large Area Telescope on the Fermi Gamma-Ray Space Telescope Mission. _The Astrophysical Journal_, 697, 1071.
- Ackermann, M. et al. (Fermi-LAT Collaboration) (2015). Searching for Dark Matter Annihilation from Milky Way Dwarf Spheroidal Galaxies with Six Years of Fermi Large Area Telescope Data. _Physical Review Letters_, 115, 231301.
- Aguilar, M. et al. (AMS Collaboration) (2013). First Result from the Alpha Magnetic Spectrometer on the International Space Station: Precision Measurement of the Positron Fraction in Primary Cosmic Rays. _Physical Review Letters_, 110, 141102.
- Bartels, R., Krishnamurthy, S., & Weniger, C. (2016). Strong support for the millisecond pulsar origin of the Galactic center GeV excess. _Nature Physics_, 12, 133.
- Abeysekara, A.U. et al. (HAWC Collaboration) (2017). Extended gamma-ray sources around pulsars constrain the origin of the positron flux at Earth. _Science_, 358, 911–914.
- Adriani, O. et al. (PAMELA Collaboration) (2009). An anomalous positron abundance in cosmic rays with energies 1.5–100 GeV. _Nature_, 458, 607–609.
- Albert, A. et al. (Fermi-LAT and DES Collaborations) (2017). Searching for Dark Matter Annihilation in Recently Discovered Milky Way Satellites with Fermi-LAT. _The Astrophysical Journal_, 834, 110.
- Weniger, C. (2012). A tentative gamma-ray line from Dark Matter annihilation at the Fermi Large Area Telescope. _Journal of Cosmology and Astroparticle Physics_, 08, 007.
- Fermi-LAT Collaboration (2013). Search for Gamma-ray Spectral Lines with the Fermi Large Area Telescope and Dark Matter Implications. _Physical Review D_, 88, 082002.
- H.E.S.S. Collaboration (2016). Search for dark matter annihilations towards the inner Galactic halo from 10 years of observations with H.E.S.S. _Physical Review Letters_, 117, 111301.
- IceCube Collaboration (2013). Search for dark matter annihilations in the Sun with the 79-string IceCube detector. _Physical Review Letters_, 110, 131302.

## 延伸阅读

- Conrad, J. & Reimer, O. (2017). Indirect dark matter searches in gamma and cosmic rays. _Nature Physics_, 13, 224. — 间接探测方法综述
- Slatyer, T.R. (2021). Indirect Detection of Dark Matter. In _Theoretical Advanced Study Institute in Elementary Particle Physics: Journeys Through the Precision Frontier_. — 理论基础与实验状态的综合综述
- Profumo, S. (2017). _An Introduction to Particle Dark Matter_. World Scientific. — 包括直接、间接探测和对撞机搜索的教材

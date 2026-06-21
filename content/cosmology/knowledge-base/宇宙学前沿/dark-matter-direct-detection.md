---
title: 暗物质直接探测实验
titleEn: Dark Matter Direct Detection Experiments
category: 宇宙学前沿
tags: [暗物质, 直接探测, WIMP, LUX-ZEPLIN, XENON, PandaX, 核反冲, 地下实验室]
updated: 2026-06-13
---

# 暗物质直接探测实验：在地下等待宇宙信使

## 概述

宇宙中约 $27\%$ 的能量密度以**暗物质**的形式存在——它有引力效应，但不发光、不吸光。然而，我们至今不知道暗物质是什么粒子。几十年来，最流行的候选者是**弱相互作用大质量粒子**（Weakly Interacting Massive Particle, WIMP），质量约为 $1$–$10^4$ GeV，与普通物质通过弱力相互作用。

如果 WIMP 真的存在，银河系晕的 WIMP 就在我们周围穿行——平均密度约 $0.3$ GeV/cm$^3$，每秒钟穿过人体的 WIMP 数量约为 $10^7$–$10^8$（大部分毫无感觉地穿越）。**直接探测实验**的目标，就是捕捉极为罕见的一次：一个 WIMP 与探测器中的原子核发生碰撞，留下约 $1$–$100$ keV 的能量沉积。

这是一项极端困难的实验：信号极弱，而宇宙射线、放射性本底等噪声极强。为此，探测器必须放在深地下（屏蔽宇宙射线），材料必须极为纯净（减少放射性本底）。

## 核反冲：探测原理

WIMP 与探测器靶核发生弹性散射，核反冲能量为：

$$E_R = \frac{\mu^2 v^2 (1 - \cos\theta)}{m_N}$$

其中 $\mu = m_\chi m_N / (m_\chi + m_N)$ 是约化质量，$v \sim 200$–$300$ km/s 是 WIMP 速度（银河系逃逸速度约束），$m_N$ 是靶核质量，$\theta$ 是散射角。

对于质量 $\sim 100$ GeV 的 WIMP 与氙核（$m_{Xe} \approx 131$ GeV）散射，典型核反冲能量约为 $10$–$50$ keV。探测器需要在极低本底下分辨这一量级的能量沉积，灵敏度要求达到每 kg 探测材料每年不到一个事例（$\text{events}/(\text{kg}\cdot\text{year})$）。

WIMP-核散射可以是：

- **自旋无关（Spin-Independent, SI）**散射：与靶核质量数 $A^2$ 成正比，大核素（如 Xe、Ge）有显著优势
- **自旋依赖（Spin-Dependent, SD）**散射：仅与核自旋相关，对奇数核子的靶核敏感

## 主要实验技术与现状

### 液氙探测器

液态氙（Liquid Xenon, LXe）时间投影腔（TPC）是目前最灵敏的 WIMP 探测技术：

- **原理**：WIMP-核反冲在液氙中产生闪烁光（S1 信号）和电离电子（电子漂移到顶部在气氙中产生次级闪烁光 S2 信号）；S1/S2 比值区分核反冲（WIMP信号）与电子反冲（本底）
- **主要实验**：
  - **LUX-ZEPLIN（LZ）**：位于南达科他州霍姆斯特克地下实验室（约 $1480$ m 深），$10$ 吨液氙；2022 年首次运行结果（LZ Collaboration 2022，_Physical Review Letters_，131，041002），SI 截面上限 $\sigma_{SI} < 9.2 \times 10^{-48}$ cm$^2$（$36$ GeV WIMP）
  - **XENONnT**：位于意大利格兰萨索地下实验室（约 $1400$ m 深），$8.3$ 吨液氙活性体积；与 LZ 并列为当前世界最灵敏实验
  - **PandaX-4T**：位于中国四川锦屏地下实验室（约 $2400$ m 深，世界最深），$3.7$ 吨液氙；2021 年 Science 发表首次运行结果

三个实验均达到了类似的灵敏度量级，SI 截面上限在 $\sim 40$ GeV WIMP 处约为 $10^{-47}$ cm$^2$。

### 液氩探测器

**DarkSide-50**（格兰萨索）和下一代 **DarkSide-20k** 使用低放射性的地下氩（depleted argon），主要优势是液氩的价格低廉，适合吨级以上规模。

### 固体探测器（低温量热计）

**SuperCDMS**（加拿大 SNOLAB）使用冷却到约 $50$ mK 的硅（Si）和锗（Ge）晶体，通过声子和电离信号同时测量区分信号与本底。对**轻质量 WIMP**（$1$–$10$ GeV）灵敏度远高于液氙实验。

### 卤化钠晶体：DAMA/LIBRA 的争议

意大利 DAMA/LIBRA 实验长期声称观测到**年调制信号**（annual modulation）：信号随季节变化，与地球在银河系晕中的运动（夏季迎向 WIMP 流，冬季背向）一致。这被解释为 WIMP 信号的间接证据。

然而，COSINE-100（韩国）、ANAIS-112（西班牙）等使用相同材料的实验，在 DAMA 声称的参数区间内，均未看到调制信号（Adhikari et al. 2019）。两者的不一致至今未解决，是暗物质探测领域最持久的争议之一。

## 无信号的含义：中微子本底与实验极限

经过数十年的搜索，直接探测实验至今**没有发现令人信服的 WIMP 信号**。每次新实验均将 SI 截面上限下推约一个数量级。

目前的限制曲线已逼近**中微子本底**（neutrino floor / neutrino fog）：太阳、大气和宇宙中微子与靶核的相干散射（coherent elastic neutrino-nucleus scattering, CE$\nu$NS）产生不可区分的背景。这一背景对于 $m_\chi \sim 6$ GeV 处的 SI 截面约为 $\sim 10^{-48}$ cm$^2$。

超越中微子本底需要：

1. 方向敏感探测器（区分来自太阳方向的中微子与各向同性的 WIMP）
2. 年调制或日调制信号分析
3. 多靶核比较（WIMP 和中微子产生的核反冲谱形不同）

下一代实验（DARWIN，$50$ 吨液氙）计划在多数 WIMP 质量范围内探索到中微子本底，届时无论是否发现信号，都将对 WIMP 的"生存空间"做出根本性约束。

## 与LHC和间接探测的互补

直接探测不是寻找暗物质的唯一途径：

- **LHC 对撞机**：通过"缺失能量"（missing transverse energy）寻找 WIMP 产生，对低质量 WIMP 更敏感
- **间接探测**（见 `dark-matter-indirect-detection.md`）：寻找 WIMP 湮灭产生的 $\gamma$ 射线、正电子、反质子
- **宇宙学观测**：CMB 和大尺度结构对暗物质相互作用截面有独立约束

三条线索的互补构成了暗物质搜索的完整图景。目前，三个方向均未发现超出标准模型的信号，对 WIMP 参数空间构成了越来越强的约束，正在促使理论家认真对待非 WIMP 暗物质（如轴子、轻暗光子、原初黑洞）。

## 跨领域连接

- **暗物质与暗能量**（`../暗物质与暗能量.md`）：暗物质的宇宙学证据
- **暗物质候选粒子**（`../宇宙学基础/暗物质候选粒子WIMP与轴子.md`）：WIMP 和轴子的理论基础
- **暗物质间接探测**（`dark-matter-indirect-detection.md`）：与直接探测互补的搜索方法
- **修改引力理论 MOND**（`modified-gravity-mond.md`）：不借助暗物质粒子解释相同现象的替代框架

## 参考文献

- LZ Collaboration (2022). First Dark Matter Search Results from the LUX-ZEPLIN (LZ) Experiment. _Physical Review Letters_, 131, 041002.
- PandaX-4T Collaboration (2021). Dark Matter Search Results from the PandaX-4T Commissioning Run. _Science_, 373, 1012.
- Adhikari, P. et al. (COSINE-100) (2019). An experiment to search for dark-matter interactions using sodium iodide detectors. _Nature_, 564, 83–86.
- Schumann, M. (2019). Direct Detection of WIMP Dark Matter: Concepts and Status. _Journal of Physics G: Nuclear and Particle Physics_, 46, 103003.

## 延伸阅读

- Goodman, M.W. & Witten, E. (1985). Detectability of certain massive neutrinos in the universe. _Physical Review D_, 31, 3059. — 直接探测的奠基性论文
- Liu, J., Chen, X. & Ji, X. (2017). Current status of direct dark matter detection experiments. _Nature Physics_, 13, 212. — 综述直接探测的主要方法与结果
- Billard, J. et al. (2022). Direct detection of dark matter — APPEC committee report. _Reports on Progress in Physics_, 85, 056201.

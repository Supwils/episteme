---
title: 暗物质候选粒子：WIMP 与轴子
titleEn: Dark Matter Candidates - WIMPs and Axions
category: 宇宙学基础
tags: [暗物质, WIMP, 轴子, 弱相互作用, 直接探测, LHC, 强CP问题]
updated: 2026-06-13
status: published
---

# 暗物质候选粒子：WIMP 与轴子

## 概述

宇宙中约 27% 的能量密度（Planck 2018：$\Omega_c h^2 = 0.1200 \pm 0.0012$）由暗物质构成。暗物质不与电磁力耦合，不发光，但其引力效应在星系旋转曲线、引力透镜、CMB 功率谱和大尺度结构中都有明确观测。

然而，暗物质的粒子本质至今未知。在众多候选粒子中，**弱相互作用大质量粒子（WIMP）**和**轴子（axion）**是理论动机最充分、实验探索最广泛的两类。

## WIMP：最受关注的候选者

### 什么是 WIMP

弱相互作用大质量粒子（Weakly Interacting Massive Particle，WIMP）是一类质量在 $1$-$1000$ GeV 量级、与标准模型粒子仅通过弱相互作用（或类弱强度的力）耦合的粒子。

WIMP 之所以成为最受关注的候选者，是因为"WIMP 奇迹"（WIMP Miracle）：

- 假设 WIMP 在早期宇宙中热平衡产生，当宇宙冷却到 $T \sim m_\chi / 20$（$m_\chi$ 是 WIMP 质量）时，湮灭速率低于膨胀速率，粒子数目"冻结"
- 冻结丰度的计算给出：$\Omega_\chi h^2 \approx \frac{0.1 \text{ pb}}{<\sigma v>}$
- 对于弱相互作用强度（$<\sigma v> \sim 3 \times 10^{-26}$ cm$^3$/s，对应 $m_\chi \sim 100$ GeV），冻结丰度自动给出 $\Omega_\chi h^2 \approx 0.1$，与观测值高度吻合

这种"不谋而合"——弱相互作用的自然强度恰好给出正确的暗物质丰度——被称为 WIMP 奇迹，是 WIMP 假说最主要的理论动机。

超对称理论（SUSY）自然地预言了最轻的超对称粒子（LSP，通常是中性微子 neutralino——注意它是费米子超伴侣的混合态，与中子无关）作为 WIMP 候选者，其质量和耦合强度恰好在 WIMP 奇迹的范围内。

### WIMP 的探测策略

三类互补的探测方法：

**直接探测（Direct Detection）**：在深地下实验室用高灵敏探测器等待 WIMP 与原子核碰撞产生的核反冲。当前最灵敏实验：

- LUX-ZEPLIN（LZ，美国）：约 10 吨液氙，2023 年结果将 WIMP-核子截面上限降至约 $10^{-47}$ cm²（$m_\chi = 40$ GeV）
- XENON1T/XENONnT（意大利格兰萨索实验室）：类似规模，互补约束
- PandaX-4T（中国锦屏深地实验室）：4 吨液氙

迄今未探测到 WIMP 信号，且已排除了大部分自然 SUSY 预言的参数空间。

**间接探测（Indirect Detection）**：寻找 WIMP 相互湮灭产生的高能粒子（$\gamma$ 射线、正电子、反质子、中微子）：

- Fermi-LAT 在银河系中心和矮椭球星系方向寻找 $\gamma$ 射线超出
- AMS-02 在国际空间站测量宇宙线正电子谱（2013 年发现正电子超出，但脉冲星可能是非暗物质解释）

**对撞机产生（Collider Production）**：在大型强子对撞机（LHC）等加速器中尝试直接产生 WIMP（表现为"丢失横动量"信号）：

- LHC 的单喷流+丢失横动量搜寻对 WIMP 的耦合强度给出约束
- 目前未发现超对称粒子（在 LHC Run 1+2 中，简化模型下 neutralino（中性微子）质量约束已推至约 1 TeV 量级以上）

**当前状态**：三类探测均未发现 WIMP，已使大部分传统 WIMP 参数空间被排除，促使学界重新思考暗物质候选者。下一代实验（XLZD 合作，20 吨级液氙）将在 2030 年代覆盖"有效"WIMP 参数空间的接近全部区域，至"中微子地板"——届时 WIMP 或被发现，或被基本排除。

## 轴子：强 CP 问题的优雅解

### 强 CP 问题

量子色动力学（QCD，描述强相互作用）的拉格朗日量含有一个参数 $\bar{\theta}$，它控制 CP 破缺（电荷-宇称对称性破缺）的强度。理论允许 $\bar{\theta}$ 取 $0$ 到 $2\pi$ 之间的任意值，但实验测量中子电偶极矩给出上限：

$$\bar{\theta} < 10^{-10}$$

为什么 $\bar{\theta}$ 如此接近于零而非某个自然量级（约 1）？这是粒子物理中的"强 CP 问题"。

### Peccei-Quinn 机制与轴子

1977 年，佩斯奇（Roberto Peccei）和奎因（Helen Quinn）提出引入一个新的全局对称性 U(1)$_{PQ}$，该对称性在某个能量尺度 $f_a$（Peccei-Quinn 尺度）自发破缺。破缺产生的 Nambu-Goldstone 玻色子——即**轴子**——的势能最小值恰好在 $\bar{\theta} = 0$ 处，自然地解释了强 CP 问题。

轴子的质量由 QCD 非微扰效应决定：

$$m_a \approx \frac{m_\pi f_\pi}{f_a} \approx 6 \times 10^{-6} \text{ eV} \cdot \left(\frac{10^{12} \text{ GeV}}{f_a}\right)$$

宇宙学和天体物理约束将 $f_a$ 限制在约 $10^9$-$10^{12}$ GeV，对应轴子质量约 $10^{-6}$-$10^{-3}$ eV（即 $\mu$eV 到 meV 量级）。

### 轴子作为暗物质

早期宇宙中，轴子场偏离其 CP 守恒的最小值（"错位角" $\theta_i$），随后在宇宙冷却时发生相干振荡，产生轴子的非热丰度（"错位机制"，Misalignment Mechanism）：

$$\Omega_a h^2 \approx 0.18 \left(\frac{f_a}{10^{12} \text{ GeV}}\right)^{7/6} \theta_i^2$$

对于 $f_a \sim 10^{12}$ GeV 和 $\theta_i \sim 1$，自然给出 $\Omega_a h^2 \sim 0.1$，与观测值吻合。这是轴子暗物质的另一个"奇迹"。

轴子的关键特性：极轻（$\mu$eV 量级）、非热产生（冷暗物质）、与光子有微弱耦合（通过 Primakoff 过程：轴子在强磁场中转化为光子）。

### 轴子探测实验

轴子与光子的耦合 $g_{a\gamma} = \frac{\alpha}{2\pi f_a} c_{a\gamma}$（$c_{a\gamma}$ 是模型依赖的系数）提供了探测手段：

| 实验                   | 原理                                   | 状态                                                  |
| ---------------------- | -------------------------------------- | ----------------------------------------------------- |
| ADMX（轴子暗物质实验） | 微腔谐振器 + 强磁场，轴子→光子共振转换 | 已覆盖约 $2$-$4$ $\mu$eV，排除 KSVZ/DFSZ 模型部分参数 |
| HAYSTAC                | 类似 ADMX，量子噪声极限                | 运行中                                                |
| ABRACADABRA            | 感应拾取轴子振荡磁场                   | 灵敏度快速提升                                        |
| CASPEr                 | NMR（核磁共振）探测                    | 针对超轻轴子                                          |
| IAXO（国际轴子天文台） | 太阳轴子转化为 X 射线                  | 建设中，灵敏度比 CAST 提升 $\sim 100$ 倍              |

"轴子暗物质窗口"（约 $1$-$100$ $\mu$eV）将在 2030 年代被新一代实验（ADMX-G2、ALPHA）全面覆盖。

## 其他候选粒子概览

| 候选粒子            | 质量范围              | 主要特征                   |
| ------------------- | --------------------- | -------------------------- |
| WIMP（neutralino）  | $10$-$1000$ GeV       | 热丰度，弱耦合             |
| 轴子                | $\mu$eV-meV           | 非热丰度，极轻，强 CP 问题 |
| 惰性中微子          | keV-GeV               | "温暗物质"，X 射线信号     |
| 原初黑洞            | $10^{17}$-$10^{23}$ g | 非粒子，引力微透镜约束     |
| 超轻轴子/模糊暗物质 | $\sim 10^{-22}$ eV    | 量子压力抑制小尺度结构     |

## 为什么这很重要

暗物质是宇宙中最大的已知"未解问题"之一——我们知道它存在（引力效应无可辩驳），但不知道它是什么。发现暗物质的粒子本质将是粒子物理和宇宙学的革命性突破，不仅解答关于宇宙组成的基本问题，还可能揭示标准模型之外的新物理。WIMP 奇迹和轴子对强 CP 问题的优雅解决，使这两类候选粒子成为最有理论依据的方向，而即将到来的新一代实验将在未来十年内对它们进行决定性检验。

## 延伸阅读

- Feng, J.L. (2010). Dark Matter Candidates from Particle Physics and Methods of Detection. _Annual Review of Astronomy and Astrophysics_, 48, 495.
- Peccei, R.D. & Quinn, H.R. (1977). CP Conservation in the Presence of Pseudoparticles. _Physical Review Letters_, 38, 1440.
- Aalbers, J., Akerib, D.S. et al. (LUX-ZEPLIN Collaboration, 2023). First Dark Matter Search Results from the LUX-ZEPLIN (LZ) Experiment. _Physical Review Letters_, 131, 041002.
- Preskill, J., Wise, M.B. & Wilczek, F. (1983). Cosmology of the Invisible Axion. _Physics Letters B_, 120, 127.
- Planck Collaboration (2018). Planck 2018 results. VI. Cosmological parameters. _A&A_, 641, A6.

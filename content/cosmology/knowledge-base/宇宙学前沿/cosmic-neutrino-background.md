---
title: 宇宙学中微子背景
titleEn: Cosmic Neutrino Background
category: 宇宙学前沿
tags: [宇宙中微子背景, CνB, 中微子质量, 中微子退耦, 有效中微子数, PTOLEMY]
updated: 2026-06-13
---

# 宇宙学中微子背景：看不见的宇宙海洋

## 概述

宇宙大爆炸留下了两种遗迹辐射：被精确观测的**宇宙微波背景**（CMB，光子），和至今尚未被直接探测到的**宇宙中微子背景**（Cosmic Neutrino Background, C$\nu$B）。C$\nu$B 在宇宙诞生后约 $1$ 秒时形成，那时中微子从热等离子体中退耦，此后自由流动至今。今天，宇宙中每立方厘米约有 $336$ 个 C$\nu$B 中微子（每种味各 $56$ 个粒子 $+ 56$ 个反粒子），温度约 $1.95$ K——比 CMB 光子（$2.725$ K）还低。

C$\nu$B 的存在已经通过 CMB 功率谱和大尺度结构的间接方式得到了强有力的确认，但由于中微子的极弱相互作用，**直接探测 C$\nu$B** 是现代物理学最具挑战性的实验目标之一。

## 破除误解：它比 CMB 更古老，却几乎不可能被探测到

宇宙微波背景（[[宇宙微波背景|CMB]]）是"最古老的光"，来自宇宙 38 万岁。**宇宙中微子背景（CνB）比它老得多——来自宇宙第 1 秒左右**。

为什么反而至今没被直接探测到？原因恰好也是它古老的原因：**中微子几乎不与任何东西相互作用**。这是一条对称的代价。正因为中微子在第 1 秒就脱耦（不再与等离子体碰撞），它才保留了那一刻的信息；也正因为它不与物质作用，今天的探测器也抓不住它。**光子好探测但被囚禁到 38 万年，中微子第 1 秒就自由但没人能拦下它。**

数字更能说明处境：CνB 的现今温度约 1.95 K，对应每个中微子的能量在**亚毫电子伏**量级——比放射性衰变产生的中微子低了十几个数量级，比任何粒子探测器的能量阈值都低得多。所以标准的"看中微子撞出信号"这条路完全走不通。

**但它并非不可见。** CνB 已经通过**引力效应**被间接确认了：这些中微子贡献了早期宇宙的能量密度，从而改变了膨胀率，进而改变了[[大爆炸理论|太初核合成]]的产额与 CMB 声学峰的位置。这两处观测给出的"有效相对论性物种数" $N_{\text{eff}} \approx 3$，与三代中微子的预期一致。

**这是一个值得记住的认识论区分**：我们对 CνB 的存在有很强的证据，但那是**它对别的东西做了什么**的证据，不是它本身的证据。天体物理里大量结论都属于这一类——包括[[暗物质]]。

## 现场：一个称重量的实验

有一条思路能把 CνB 从"间接"推向"直接"：**用氚。**

原理是氚的 β 衰变有一个已知的最高电子能量（端点能量）。如果一个 CνB 中微子被氚核**俘获**（而不是衰变放出中微子），产生的电子能量会略高于这个端点——高出的量正好是中微子质量对应的能量。于是在能谱端点之上会出现一个**孤立的小峰**，那是普通 β 衰变原理上无法产生的。

PTOLEMY 是为此提出的实验概念：用大量氚（吸附在石墨烯上以控制能量分辨率），寻找端点之外的那个峰。难度在哪：预期事件率极低（每年个位数量级甚至更少），而且要求电子能量分辨率达到亚电子伏——这比目前最好的中微子质量实验（KATRIN）还要苛刻一个量级以上。**目前 PTOLEMY 仍处于原理验证阶段，尚无探测结果。**

这个实验值得关注的原因不只是 CνB：它需要的技术（超高分辨的电子能谱）与中微子质量测量、乃至无中微子双β衰变搜索都相通。**很多时候一个看似不可能的目标之所以被认真追求，是因为通往它的路上每一步都独立有用。**

## 中微子退耦：C$\nu$B 的形成

宇宙早期（$t \ll 1$ s），中微子通过弱相互作用（如 $\nu + e^- \leftrightarrow \nu + e^-$）与其他粒子保持热平衡。弱相互作用速率随温度降低而迅速减小（$\Gamma \propto G_F^2 T^5$），而宇宙膨胀率 $H \propto T^2$（辐射主导）。当 $\Gamma \approx H$ 时（温度约 $\sim 2$–$3$ MeV，$t \approx 0.1$–$1$ s），中微子退耦：

$$T_{\nu,dec} \approx 2 \text{ MeV}$$

退耦后，中微子自由流动，温度随宇宙膨胀以 $T_\nu \propto a^{-1}$ 降低。

### 正负电子湮灭后的温度比

中微子退耦发生在正负电子湮灭（$T \approx 0.5$ MeV）之前。湮灭将 $e^+e^-$ 的熵转移给光子（加热光子），但不加热已退耦的中微子。利用熵守恒：

$$\frac{T_\nu}{T_\gamma} = \left(\frac{4}{11}\right)^{1/3}$$

因此，今天中微子温度 $T_\nu = (4/11)^{1/3} \times T_{CMB} \approx 0.714 \times 2.725 \text{ K} \approx 1.945 \text{ K}$。

## C$\nu$B 的宇宙学影响

尽管 C$\nu$B 从未被直接探测，其存在在宇宙学中留下了多种可观测印记。

### 有效中微子数 $N_{eff}$

宇宙中的相对论性中微子增加了辐射能量密度：

$$\rho_{rad} = \rho_\gamma \left[1 + \frac{7}{8}\left(\frac{4}{11}\right)^{4/3} N_{eff}\right]$$

标准模型预言 $N_{eff} = 3.044$（考虑中微子退耦不完全和 QED 修正，非整数 $3$）。Planck 2018 数据给出 $N_{eff} = 2.99^{+0.34}_{-0.33}$，与标准值完美一致。任何超出标准模型的"额外辐射"（如轻的立体中微子、暗辐射、热化暗物质粒子）会使 $N_{eff}$ 偏离 $3.044$。下一代 CMB 实验（如 Simons Observatory；原计划的旗舰 CMB-S4 已于 2025 年 7 月被 DOE/NSF 取消）有望将 $N_{eff}$ 的测量精度提高至 $\sigma(N_{eff}) \sim 0.03$，对超出标准模型物理提供约束。

### 对 CMB 功率谱的影响

中微子作为相对论性自由流动粒子（free-streaming）在宇宙早期对引力势有独特贡献。C$\nu$B 的自由流动抑制了小于自由流程的密度扰动，在 CMB 功率谱的高 $\ell$ 端和大尺度结构的功率谱中留有特征性相移（Forero et al. 2021）。Follin 等人（2015，_Physical Review Letters_，115，091301）通过分析 CMB 功率谱在某些声学峰的精确相位，首次独立于 BBN 约束，确认了 C$\nu$B 在宇宙早期的自由流动效应，证明 $N_{eff} = 3$ 优于 $N_{eff} = 0$ 的假设，置信度超过 $5\sigma$。

### 中微子质量对大尺度结构的影响

即使中微子质量极小（标准模型外的扩展），作为**热暗物质**（hot dark matter, HDM）的 C$\nu$B 也会抑制小尺度结构的形成。质量为 $m_\nu$ 的中微子自由流程尺度（Jeans 长度）约为：

$$\lambda_J \approx 40 \text{ Mpc} \left(\frac{m_\nu}{1 \text{ eV}}\right)^{-1}$$

振荡实验测量的中微子质量平方差（$\Delta m^2_{atm} \approx 2.5 \times 10^{-3}$ eV$^2$，$\Delta m^2_{sol} \approx 7.4 \times 10^{-5}$ eV$^2$）给出中微子质量下限约 $\sum m_\nu \gtrsim 0.06$ eV（正常质量顺序）或 $\gtrsim 0.1$ eV（倒置顺序）。宇宙学（CMB + BAO + 大尺度结构）给出中微子质量总和的上限：$\sum m_\nu < 0.12$ eV（Planck 2018，$95\%$ C.L.），是目前**宇宙学给出的最强中微子质量上限**，远优于实验室测量（最佳的实验室直接上限来自 KATRIN：2022 年为 $m_\nu < 0.8$ eV，2025 年基于 259 天数据进一步收紧到 $m_\nu < 0.45$ eV，均为 $90\%$ C.L.，Aker et al. 2025，_Science_）。

## 直接探测 C$\nu$B 的挑战

C$\nu$B 直接探测面临极端困难：

- **能量极低**：C$\nu$B 中微子能量约 $k_B T_\nu \approx 1.7 \times 10^{-4}$ eV，远低于核反应阈值
- **截面极小**：弱相互作用截面 $\sigma \propto E_\nu^2$，C$\nu$B 能量下截面约 $10^{-62}$ cm$^2$，比太阳中微子低约 $20$ 个数量级
- **密度虽然不低**（$\sim 56/\text{cm}^3$ 每味），但每个中微子的动量极小

### PTOLEMY 实验

**PTOLEMY**（Princeton Tritium Observatory for Light, Early-universe, Massive-Neutrino Yield）是目前唯一处于实验阶段的 C$\nu$B 直接探测方案。

原理：如果 C$\nu$B 中微子具有有限质量，则它们的捕获（$\nu_e + {}^3\text{H} \rightarrow {}^3\text{He} + e^-$）会在氚的 $\beta$ 衰变终点能谱之上产生一个超出峰，峰的位置超出终点能量 $2m_\nu$：

$$\Delta E = 2 m_\nu \approx 0.1\text{–}0.2 \text{ eV（如果 } m_\nu \sim 0.05\text{–}0.1 \text{ eV}）$$

预期每年捕获事例率约 $4$ 个（对 $100$ g 氚，$m_\nu = 0.1$ eV）——这需要革命性的能量分辨率（$\Delta E < 0.1$ eV）和氚样品操控技术。PTOLEMY 原理验证阶段正在进行（Long et al. 2014，_Physical Review D_，91，092003）。目前的技术挑战是如何在实验装置中均匀束缚足够量的氚而不损失分辨率。

## 如果中微子是马约拉纳粒子

C$\nu$B 的性质在中微子是**狄拉克粒子**（粒子与反粒子不同）还是**马约拉纳粒子**（粒子即是反粒子）之间有微妙差别。

- 如果是**马约拉纳粒子**：宇宙中只有一种中微子（无"右旋"反中微子），C$\nu$B 密度不变，但马约拉纳粒子的捕获截面有额外增强
- 如果是**狄拉克粒子**：右旋反中微子在退耦后不与其他粒子相互作用，可能作为"惰性"组分存在，但不产生可测信号

无中微子双 $\beta$ 衰变（$0\nu\beta\beta$）实验（如 KamLAND-Zen、GERDA、CUORE）正在寻找马约拉纳性质的证据，目前最严格上限给出 $m_{\beta\beta} < 0.036$–$0.156$ eV（取决于核矩阵元的不确定性，KamLAND-Zen 2023）。

## 跨域连接

- **[[中微子探测器|中微子探测器]]**：难探测的原因与它古老的原因是同一条。**因为几乎不相互作用，它在宇宙第一秒就脱耦并保留了那一刻的信息；也正因如此，今天的探测器拦不住它**。现有装置的阈值远高于它的能量，"看它撞出信号"这条常规路整体走不通。
- **[[neutrino-physics|中微子物理]]**：截面随能量平方下降，到这个温度已比太阳中微子低约二十个数量级。**数密度并不低，每味每立方厘米几十个，短板全在单个粒子的动量太小**——这也解释了为什么它的存在只能靠引力效应来确认。
- **[[carbon-allotropes|碳的同素异形体]]**：唯一在推进的方案是氚俘获：若中微子有质量，俘获事件会在贝塔衰变端点之上冒出一个孤立小峰。**难点是要把大量氚固定住又不损失能量分辨率**，把氚吸附在石墨烯上正是为此——材料选择直接决定这个实验能否成立。
- **[[probability|概率论]]**：预期事件率约每年个位数，泊松分布下相对涨落按事件数平方根倒数下降。**因此做到发现级别所需的年数可以直接算出来**，这个数字本身就说明方案为何停在原理验证阶段：它要求的分辨率比现有最好的质量实验还严一个量级以上。
- **[[epistemology|认识论]]**：对它存在的证据很强，但那是"它对别的东西做了什么"的证据——它贡献的能量密度改变早期膨胀率，从而改变轻元素产额与声学峰位置。**天体物理里一大类结论都是这个形态**，与直接探测混为一谈会高估已知的部分。

## 参考文献

- Follin, B. et al. (2015). First Detection of the Acoustic Oscillation Phase Shift Expected from the Cosmic Neutrino Background. _Physical Review Letters_, 115, 091301.
- Planck Collaboration (2020). Planck 2018 results. VI. Cosmological parameters. _A&A_, 641, A6.
- Aker, M. et al. (KATRIN Collaboration) (2022). Direct neutrino-mass measurement with sub-electronvolt sensitivity. _Nature Physics_, 18, 160–166.（$m_\nu < 0.8$ eV）
- Aker, M. et al. (KATRIN Collaboration) (2025). Direct neutrino-mass measurement based on 259 days of KATRIN data. _Science_, 388, eadq9592.（$m_\nu < 0.45$ eV）
- Long, A.J. et al. (2014). Detecting non-relativistic cosmic neutrinos by capture on tritium: Phenomenology and physics potential. _Physical Review D_, 91, 092003.
- KamLAND-Zen Collaboration (2023). Search for the Majorana Nature of Neutrinos in the Inverted Mass Ordering Region with KamLAND-Zen. _Physical Review Letters_, 130, 051801.

## 延伸阅读

- Lesgourgues, J. & Pastor, S. (2006). Massive neutrinos and cosmology. _Physics Reports_, 429, 307. — 中微子质量对宇宙学的影响综述
- Long, A.J. & Lunardini, C. (2014). A note on the observational signatures of the cosmic neutrino background. _Journal of Cosmology and Astroparticle Physics_, 2014, 012. — C$\nu$B 可观测效应综述
- Betts, S. et al. (2013). Development of a Relic Neutrino Detection Experiment at PTOLEMY. _arXiv:1307.4738_. — PTOLEMY 实验设计

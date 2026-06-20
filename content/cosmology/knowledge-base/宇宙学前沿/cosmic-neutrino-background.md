---
title: 宇宙学中微子背景
titleEn: Cosmic Neutrino Background
category: 宇宙学前沿
tags: [宇宙中微子背景, CνB, 中微子质量, 中微子退耦, 有效中微子数, PTOLEMY]
updated: 2026-06-13
---

# 宇宙学中微子背景：看不见的宇宙海洋

## 概述

宇宙大爆炸留下了两种遗迹辐射：被精确观测的**宇宙微波背景**（CMB，光子），和至今尚未被直接探测到的**宇宙中微子背景**（Cosmic Neutrino Background, C$\nu$B）。

C$\nu$B 在宇宙诞生后约 $1$ 秒时形成，那时中微子从热等离子体中退耦，此后自由流动至今。今天，宇宙中每立方厘米约有 $336$ 个 C$\nu$B 中微子（每种味各 $56$ 个粒子 $+ 56$ 个反粒子），温度约 $1.95$ K——比 CMB 光子（$2.725$ K）还低。

C$\nu$B 的存在已经通过 CMB 功率谱和大尺度结构的间接方式得到了强有力的确认，但由于中微子的极弱相互作用，**直接探测 C$\nu$B** 是现代物理学最具挑战性的实验目标之一。

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

标准模型预言 $N_{eff} = 3.044$（考虑中微子退耦不完全和 QED 修正，非整数 $3$）。Planck 2018 数据给出 $N_{eff} = 2.99^{+0.34}_{-0.33}$，与标准值完美一致。

任何超出标准模型的"额外辐射"（如轻的立体中微子、暗辐射、热化暗物质粒子）会使 $N_{eff}$ 偏离 $3.044$。下一代 CMB 实验（如 Simons Observatory；原计划的旗舰 CMB-S4 已于 2025 年 7 月被 DOE/NSF 取消）有望将 $N_{eff}$ 的测量精度提高至 $\sigma(N_{eff}) \sim 0.03$，对超出标准模型物理提供约束。

### 对 CMB 功率谱的影响

中微子作为相对论性自由流动粒子（free-streaming）在宇宙早期对引力势有独特贡献。C$\nu$B 的自由流动抑制了小于自由流程的密度扰动，在 CMB 功率谱的高 $\ell$ 端和大尺度结构的功率谱中留有特征性相移（Forero et al. 2021）。

Follin 等人（2015，_Physical Review Letters_，115，091301）通过分析 CMB 功率谱在某些声学峰的精确相位，首次独立于 BBN 约束，确认了 C$\nu$B 在宇宙早期的自由流动效应，证明 $N_{eff} = 3$ 优于 $N_{eff} = 0$ 的假设，置信度超过 $5\sigma$。

### 中微子质量对大尺度结构的影响

即使中微子质量极小（标准模型外的扩展），作为**热暗物质**（hot dark matter, HDM）的 C$\nu$B 也会抑制小尺度结构的形成。质量为 $m_\nu$ 的中微子自由流程尺度（Jeans 长度）约为：

$$\lambda_J \approx 40 \text{ Mpc} \left(\frac{m_\nu}{1 \text{ eV}}\right)^{-1}$$

振荡实验测量的中微子质量平方差（$\Delta m^2_{atm} \approx 2.5 \times 10^{-3}$ eV$^2$，$\Delta m^2_{sol} \approx 7.4 \times 10^{-5}$ eV$^2$）给出中微子质量下限约 $\sum m_\nu \gtrsim 0.06$ eV（正常质量顺序）或 $\gtrsim 0.1$ eV（倒置顺序）。

宇宙学（CMB + BAO + 大尺度结构）给出中微子质量总和的上限：$\sum m_\nu < 0.12$ eV（Planck 2018，$95\%$ C.L.），是目前**宇宙学给出的最强中微子质量上限**，远优于实验室测量（最佳实验室上限来自 KATRIN，$m_\nu < 0.45$ eV，$90\%$ C.L.，Aker et al. 2022）。

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

无中微子双 $\beta$ 衰变（$0\nu\beta\beta$）实验（如 KamLAND-Zen、GERDA、CUORE）正在寻找马约拉纳性质的证据，目前最严格上限给出 $m_{\beta\beta} < 0.036$–$0.156$ eV（取决于核矩阵元的不确定性，KamLAND-Zen 2022）。

## 跨领域连接

- **太初核合成**（`../宇宙学基础/太初核合成.md`）：C$\nu$B 中微子脱耦与 BBN 的关系
- **宇宙的热历史**（`../宇宙学基础/cosmic-thermal-history.md`）：中微子退耦在热历史中的位置
- **暗物质候选粒子**（`../宇宙学基础/暗物质候选粒子WIMP与轴子.md`）：大质量中微子作为热暗物质的历史
- **宇宙微波背景**（`../宇宙微波背景.md`）：CMB 对 $N_{eff}$ 和 $\sum m_\nu$ 的宇宙学约束

## 参考文献

- Follin, B. et al. (2015). First Detection of the Acoustic Oscillation Phase Shift Expected from the Cosmic Neutrino Background. _Physical Review Letters_, 115, 091301.
- Planck Collaboration (2020). Planck 2018 results. VI. Cosmological parameters. _A&A_, 641, A6.
- Aker, M. et al. (KATRIN Collaboration) (2022). Direct neutrino-mass measurement with sub-electronvolt sensitivity. _Nature Physics_, 18, 160.
- Long, A.J. et al. (2014). Detecting non-relativistic cosmic neutrinos by capture on tritium: Phenomenology and physics potential. _Physical Review D_, 91, 092003.
- KamLAND-Zen Collaboration (2022). Search for the Majorana Nature of Neutrinos. _Physical Review Letters_, 130, 051801.

## 延伸阅读

- Lesgourgues, J. & Pastor, S. (2006). Massive neutrinos and cosmology. _Physics Reports_, 429, 307. — 中微子质量对宇宙学的影响综述
- Long, A.J. & Lunardini, C. (2014). A note on the observational signatures of the cosmic neutrino background. _Journal of Cosmology and Astroparticle Physics_, 2014, 012. — C$\nu$B 可观测效应综述
- Betts, S. et al. (2013). Development of a Relic Neutrino Detection Experiment at PTOLEMY. _arXiv:1307.4738_. — PTOLEMY 实验设计

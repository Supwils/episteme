---
title: 宇宙射线
titleEn: Cosmic Rays
category: 多信使天文学
tags: [宇宙射线, GZK截断, 极高能宇宙射线, Auger, 费米加速, 超新星遗迹]
updated: 2026-06-13
---

# 宇宙射线：穿越亿年时空的高能信使

## 概述

**宇宙射线**（cosmic rays）是来自宇宙空间的高能带电粒子流，包括质子（约 $90\%$）、氦核（约 $9\%$）、重核（约 $1\%$）和少量电子、反质子。其能量范围跨越约 $14$ 个数量级——从 $10^9$ eV（GeV）到最高记录的约 $3 \times 10^{20}$ eV（$300$ EeV，"哦，上帝"粒子——Oh-My-God Particle，犹他大学 Fly's Eye 探测器 1991 年记录）。

宇宙射线打在大气层上产生粒子级联（空气簇射），是 20 世纪前半叶高能物理的主要实验场所：正电子、$\mu$ 子、$\pi$ 介子都首先在宇宙射线研究中发现。然而，宇宙射线最高能量端的来源，至今仍是天文学和粒子物理最大的未解谜题之一。

## 能谱：从 GeV 到 ZeV

宇宙射线能谱约遵循幂律分布 $\phi(E) \propto E^{-\gamma}$，但在几个关键能量处发生明显变化：

### 膝（Knee，$\sim 10^{15}$ eV = 1 PeV）

谱指数从 $\gamma \approx 2.7$ 变为 $\gamma \approx 3.0$。膝的位置对应银河系加速机制的上限：

目前主流认为：**超新星遗迹**（SNR）中的费米 I 型扩散激波加速（DSA）能将银河系宇宙射线加速到约 PeV 量级（"PeVatron"），而膝以上银河系加速机制基本达到上限，需要河外或更高效的加速机制。

LHAASO 在 2021 年首次明确证认了 PeVatron 的存在：在蟹状星云等 12 个超高能 $\gamma$ 射线源中，发现能量超过 $100$ TeV 的光子，间接证明了其中有能量超过 PeV 的宇宙射线加速粒子（LHAASO Collaboration 2021，_Nature_，594，33）。

### 踝（Ankle，$\sim 3 \times 10^{18}$ eV = 3 EeV）

谱指数回硬到约 $\gamma \approx 2.6$。踝被广泛认为是河外宇宙射线（来自银河系以外）开始主导的标志。踝以上的粒子回旋半径超过银河系尺度，无法被银河系磁场约束（回旋半径 $r_L = E/(ZeB) > 1\,\text{kpc}$），必须来自河外。

### GZK截断（$\sim 5 \times 10^{19}$ eV = 50 EeV）

1966 年，格里森（Greisen）和扎采宾-库兹明（Zatsepin-Kuzmin）独立预言：能量超过约 $5 \times 10^{19}$ eV 的质子在穿越宇宙空间时，会与**宇宙微波背景（CMB）光子**发生光核反应，产生 $\Delta^+$ 共振衰变：

$$p + \gamma_{CMB} \to \Delta^+ \to p + \pi^0 \quad \text{或} \quad n + \pi^+$$

这一过程的能量损失自由程约 $50$–$100$ Mpc，意味着我们能观测到的能量超过 GZK 截断的宇宙射线，其来源必须在约 $100$ Mpc 以内。

2007–2008 年，HiRes 实验（Abbasi et al. 2008，_Physical Review Letters_，100，101101）和 Pierre Auger Observatory（Abraham et al. 2008，_Physical Review Letters_，101，061101）均独立探测到 GZK 截断（或"压制"）的统计证据，确认了极高能宇宙射线必须来自宇宙学邻域。

## 加速机制：费米加速

主流理论认为宇宙射线通过**费米加速**（Fermi acceleration）获得能量：

**I 型（扩散激波加速，Diffusive Shock Acceleration，DSA）**：粒子在激波面两侧多次穿越，每次穿越获得一次能量提升 $\Delta E/E \approx 4v_s/(3c)$（$v_s$ 是激波速度）。大量穿越统计上产生幂律谱 $N(E) \propto E^{-\gamma}$，$\gamma = (r+2)/(r-1)$（$r$ 是激波压缩比，强激波 $r = 4$，给出 $\gamma = 2$，与观测基本吻合）。

超新星遗迹（SNR）被认为是银河系宇宙射线的主要加速场所，理由：

1. SNR 激波速度 $v_s \sim 10^4$ km/s，足以加速质子到 PeV
2. 银河系 SNR 每 $30$–$50$ 年发生一次，能量输出与观测到的宇宙射线能量密度一致（前提是约 $10\%$ 的超新星爆发能量转化为宇宙射线）
3. HESS、MAGIC、VERITAS 等伽马射线望远镜在多个 SNR 中探测到 TeV 伽马射线，间接证明了高能粒子加速

**II 型（随机费米加速）**：粒子随机地与磁云碰撞，平均而言也能获得能量，但效率低，加速时间长，对极高能端可能有补充作用。

## 极高能宇宙射线与来源

### Pierre Auger Observatory（PAO）

**皮埃尔·奥热天文台**位于阿根廷，由 $1600$ 个水切伦科夫探测器阵列（$3000\,\text{km}^2$）和 $27$ 台荧光望远镜组成，是世界最大的宇宙射线探测器（Auger Collaboration 2008；建造：1999-2008 年）。

主要发现：

- 能量超过 $55$ EeV 的事件数目（约 $70$ 个事件，截至 2023 年）
- **各向异性**：极高能宇宙射线（$> 8$ EeV）的到达方向有微弱但统计显著的偏向活动星系核方向（可能是活动星系核的角关联，Auger Collaboration 2017，_Science_，357，1266），超出各向同性分布置信度约 $5.2\sigma$，但具体来源仍有争议
- **成分**：极高能端（$> 50$ EeV）的宇宙射线成分偏向重核（铁、氧），而非纯质子。这与某些"纯质子"GZK 模型不符，使极高能宇宙射线的来源问题更加复杂

### Telescope Array（TA）

**望远镜阵列**位于美国犹他州，是北半球最大的极高能宇宙射线实验，与 PAO 互相补充（覆盖北半球天空）。TA 的成分分析倾向于质子或轻核主导，与 PAO 的结果存在一定分歧，可能反映了南北半球观测方向上真实的各向异性，也可能是系统误差。

**"热点"**：TA 在大熊座方向发现约 $20°$ 的过密度（Abbasi et al. 2014，_The Astrophysical Journal Letters_，790，L21），超过各向同性预期约 $3.4\sigma$，可能对应一个局域加速源（如$\sim 100$ Mpc 内的活动星系核），但尚无定论。

## 宇宙射线与多信使天文学

宇宙射线本身不是"信使"（它们是带电粒子，会被磁场偏转，不能直接指向来源），但通过多信使关联可以约束来源：

**中微子**：高能宇宙射线与物质（pp 碰撞）或光子（p$\gamma$ 碰撞）相互作用产生 $\pi$ 介子，后者衰变产生高能中微子（和伽马射线）。IceCube 中微子天文台已探测到宇宙学来源的弥散高能中微子（TeV–PeV 量级，IceCube Collaboration 2013，_Science_，342，1242），并在 NGC 1068（活动星系核）和银河系平面方向发现了中微子超出信号，为宇宙射线加速提供了直接证据。

**伽马射线**：中性 $\pi^0$ 衰变产生的 $\gamma$ 射线光子是中性粒子，不受磁场偏转，可以直接追溯来源。Fermi-LAT 和地面大气切伦科夫望远镜（HESS、MAGIC、VERITAS、LHAASO）探测到的 TeV–PeV 伽马射线源是寻找宇宙射线加速场所的关键。

## 为什么这很重要

宇宙射线是从宇宙深处传来的高能物质样本，携带着关于极端天体物理过程（超新星、AGN、GRB）的直接信息。它们的能量远超人类建造的任何粒子加速器（LHC 最高能量约 $14$ TeV，而 GZK 粒子能量约 $300$ EeV），是研究超高能粒子物理的唯一窗口。解开极高能宇宙射线来源之谜，将需要宇宙射线、中微子和伽马射线三种信使的联合分析——这正是多信使天文学的精髓。

## 跨领域连接

- **超新星与恒星核合成**（`../../恒星物理/恒星核合成.md`）：超新星遗迹是银河系宇宙射线的主要加速场所
- **伽马射线暴**（`伽马射线暴.md`）：GRB 是极高能宇宙射线的候选来源之一
- **引力波探测器与多信使**（`引力波探测器LIGO与LISA.md`）：宇宙射线与中微子联合构成非电磁信使天文学
- **宇宙大尺度结构**（`../../宇宙大尺度结构.md`）：GZK 截断限制了极高能宇宙射线的来源宇宙学距离

## 参考文献

- LHAASO Collaboration (2021). Identification of twelve sources as PeVatrons in the Milky Way. _Nature_, 594, 33–36.
- Abraham, J. et al. (Pierre Auger Collaboration) (2008). Observation of the suppression of the flux of cosmic rays above $4 \times 10^{19}$ eV. _Physical Review Letters_, 101, 061101.
- Auger Collaboration (2017). Observation of a large-scale anisotropy in the arrival directions of cosmic rays above $8 \times 10^{18}$ eV. _Science_, 357, 1266–1270.
- IceCube Collaboration (2013). Evidence for high-energy extraterrestrial neutrinos at the IceCube detector. _Science_, 342, 1242856.
- Greisen, K. (1966). End to the cosmic-ray spectrum? _Physical Review Letters_, 16, 748–750.

## 延伸阅读

- Blasi, P. (2013). The origin of galactic cosmic rays. _The Astronomy and Astrophysics Review_, 21, 70. — 银河系宇宙射线起源的理论综述
- Alves Batista, R. et al. (2019). Open questions in cosmic-ray research at ultrahigh energies. _Frontiers in Astronomy and Space Sciences_, 6, 23. — 极高能宇宙射线开放问题综述
- Kampert, K.H. & Unger, M. (2012). Measurements of the cosmic ray composition with air shower experiments. _Astroparticle Physics_, 35, 660–678.

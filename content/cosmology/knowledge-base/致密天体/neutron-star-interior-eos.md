---
title: 中子星内部与状态方程
titleEn: Neutron Star Interior and Equation of State
category: 致密天体物理学
tags: [中子星, 状态方程, 核物质, 夸克物质, 中子星并合, 引力波]
updated: 2026-06-13
---

# 中子星内部：人类无法直接触碰的最密实验室

## 概述

中子星是已知宇宙中密度最高的稳定天体。一颗典型中子星质量约为 $1.4\,M_\odot$（太阳质量），半径约 $10$–$13$ km，中心密度可达核饱和密度 $\rho_0 \approx 2.8 \times 10^{14}\,\text{g/cm}^3$ 的 $2$–$8$ 倍。这种密度下，物质状态从根本上超出了实验室物理的检验范围。中子星因此成为天然的极端物质实验室，而**状态方程**（equation of state, EOS）——描述物质压强与密度关系的函数——则是解开中子星内部秘密的核心钥匙。

近年来，引力波观测（尤其是 GW170817 双中子星并合事件）和 NICER 望远镜的质量-半径测量，正在将状态方程的研究从纯理论推向可观测约束的新时代。

## 中子星的层状结构

中子星并非均匀的"中子球"，而是拥有明确的分层结构，每一层的物理规律都不同：

### 大气层与包层（Atmosphere and Envelope）

最外层的一薄层（厚约数厘米到数米），由高度简并的正常物质组成（主要是氢、氦或重元素，取决于中子星历史）。温度约 $10^6$–$10^7$ K，辐射出软 X 射线，是 X 射线望远镜直接探测到的区域。大气层的化学组成对 X 射线谱的拟合至关重要——不同元素的大气模型会给出不同的温度和半径估计。

### 外壳（Outer Crust）

深约 $0$–$300$ m，密度 $\rho < 4 \times 10^{11}\,\text{g/cm}^3$（"中子滴出"密度），由密堆积的原子核与简并电子气体组成。随着密度增大，原子核变得越来越富中子（通过电子俘获），从铁核逐渐演变为极富中子的铷、镍等同位素。

### 内壳（Inner Crust）

密度 $4 \times 10^{11}$–$\sim 2 \times 10^{14}\,\text{g/cm}^3$。当密度超过"中子滴出"点时，中子从原子核中溢出形成自由中子气体，同时仍存在由质子和中子组成的原子核点阵。这一区域可能存在奇特的几何结构——"核子意大利面"（nuclear pasta）：原子核在强大的核力和库仑力竞争下可能形成板状、管状、蜂窝状等拓扑结构，统称为"核意大利面相"（Ravenhall et al. 1983，_Physical Review Letters_，50，2066）。

核意大利面若存在，其粘滞性和电阻率会显著影响中子星的热演化和磁场演化，并可能影响中子星并合过程中引力波波形的高频细节。

### 外核（Outer Core）

密度约 $\rho_0$–$2\rho_0$，主要成分是超流中子、超导质子和简并电子。中子以**BCS 型配对**（Cooper pair）形式进入超流态，质子则形成 II 型超导体。这两种效应对中子星冷却速率和脉冲星"星震"（glitch）的物理都有深刻影响。

### 内核（Inner Core）

密度 $> 2\rho_0$，是中子星内部最神秘的区域，理论上可能存在多种奇特物质状态：

- **超子物质**（Hyperon Matter）：$\Lambda$、$\Sigma$、$\Xi$ 等超子在高密度下能量上变得有利，可能大量出现。然而超子的出现会软化状态方程，导致中子星最大质量理论值下降到约 $1.4\,M_\odot$，与已观测到的 $2\,M_\odot$ 中子星矛盾——这就是著名的"超子问题"（hyperon puzzle）
- **夸克物质**（Quark Matter）：在极端密度下，重子之间的夸克可能解禁闭，形成**夸克-胶子等离子体**的低温版本——色超导夸克物质（color superconducting quark matter）。夸克物质的存在会改变状态方程，并可能以"夸克星"或"混合星"的形式出现
- **玻色-爱因斯坦凝聚**：介子（如 $\pi$ 介子或 $K$ 介子）可能在高密度下形成玻色-爱因斯坦凝聚，进一步改变物质性质

## 状态方程：压强与密度的关系

**状态方程**（EOS）$P(\rho)$ 或 $P(\varepsilon)$（$\varepsilon$ 为能量密度）完全决定了中子星的宏观性质：

- 给定 EOS，通过求解**TOV 方程**（Tolman-Oppenheimer-Volkoff equation）即可得到中子星的质量-半径关系
- 不同的 EOS 预言不同的 $M$-$R$ 曲线：硬 EOS（高压强）给出大半径、高最大质量；软 EOS 给出小半径、低最大质量

$$\frac{dP}{dr} = -\frac{(\varepsilon + P)(M + 4\pi r^3 P / c^2)}{r^2(1 - 2GM/rc^2)}$$

这是广义相对论版本的流体静力学平衡方程，反映了广义相对论引力与物质压强的平衡。

## 观测对状态方程的约束

### 质量测量：$2\,M_\odot$ 下限

最关键的约束是高质量中子星的发现：

- **PSR J0348+0432**：质量 $2.01 \pm 0.04\,M_\odot$（Antoniadis et al. 2013，_Science_，340，448），通过白矮星伴星的光谱视向速度和轨道参数测量
- **PSR J0740+6620**：质量 $2.08 \pm 0.07\,M_\odot$（Fonseca et al. 2021，_The Astrophysical Journal Letters_，915，L12），目前已确认的最重中子星之一

$2\,M_\odot$ 的下限直接排除了大多数软 EOS，要求核物质在高密度下能提供足够大的压强来抵抗引力坍缩。这对超子物质和某些夸克物质模型构成严重挑战。

### NICER 的质量-半径测量

**NICER**（Neutron star Interior Composition Explorer，2017 年发射至国际空间站）通过探测毫秒脉冲星表面热点的 X 射线脉冲轮廓，进行"脉冲轮廓建模"，同时约束质量和半径：

- **PSR J0030+0451**：$M = 1.34^{+0.15}_{-0.16}\,M_\odot$，$R = 12.71^{+1.14}_{-1.19}$ km（Riley et al. 2019，_The Astrophysical Journal Letters_，887，L21）
- **PSR J0740+6620**：$M \approx 2.08\,M_\odot$，$R = 12.39^{+1.30}_{-0.98}$ km（Riley et al. 2021，_The Astrophysical Journal Letters_，918，L27）

这些测量表明中子星半径约为 $11$–$13$ km，有力排除了极软的 EOS。

### GW170817：引力波约束潮汐形变率

2017 年 8 月 17 日，LIGO/Virgo 探测到首个双中子星并合引力波事件 GW170817。在并合前的旋近阶段，引力波波形中编码了**潮汐形变率**（tidal deformability）$\Lambda$ 的信息：中子星在伴星引力场中被潮汐拉伸的程度取决于 EOS——硬 EOS 的中子星更难压缩，$\Lambda$ 更大。

GW170817 给出的约束：$\tilde{\Lambda} \lesssim 800$（Abbott et al. 2017，_Physical Review Letters_，119，161101），后续精化分析给出 $70 \le \tilde{\Lambda} \le 580$（Abbott et al. 2018，_Physical Review Letters_，121，161101）。

结合质量测量、半径测量和潮汐形变率，各研究组使用贝叶斯推断给出的综合约束：$R_{1.4} \approx 11.1$–$13.4$ km（不同分析方法有所不同），与 NICER 结果一致。

## 核物质的不确定性：对称能与饱和点

状态方程的不确定性在低密度端和高密度端各有不同来源：

在**核饱和密度**附近（$\rho_0$），核物质性质可以从核物理实验直接约束：

- **核对称能**（nuclear symmetry energy）$S$：描述将质子换成中子时能量的变化，约 $S \approx 31.7 \pm 3.2$ MeV（来自铅核散射和同位旋扩散实验，Tsang et al. 2012，_Physical Review C_，86，015803）
- **对称能斜率参数** $L$：描述对称能随密度的变化率，约束范围约 $L = 20$–$115$ MeV，是 EOS 在中等密度下不确定性的主要来源之一

在**超核饱和密度**区域（$> 2\rho_0$），实验室核物理无能为力，只能依靠天文观测和理论（量子色动力学计算、手征有效场论外推）。这正是中子星成为不可替代实验室的原因。

## 夸克物质与混合星

目前学界对于中子星内核是否含有夸克物质存在真正的争议。"混合星"（hybrid star）模型认为中子星存在由强子相到夸克相的一阶相变，表现为 $M$-$R$ 曲线上的"第二支"——一组混合星解存在于普通中子星支之外，中间由不稳定区域分隔。

如果这一相变存在，并合时的引力波信号可能包含相变引发的独特印记。第三代引力波探测器（爱因斯坦望远镜、宇宙探索者）将有望探测到这种精细结构。

## 为什么这很重要

中子星内部物理将核物理、量子多体理论、广义相对论和天文观测紧密结合。理解中子星状态方程不只是"知道中子星里有什么"，而是理解在我们无法在实验室创造的极端密度下，物质的基本规律如何运作。双中子星并合事件 GW170817 开创了通过引力波和电磁观测联合约束状态方程的时代，未来十年的观测将大幅缩小 EOS 的不确定性。

## 跨领域连接

- **双中子星并合与千新星**（`双中子星并合与千新星.md`）：并合过程直接取决于 EOS，潮汐形变率影响并合时机和碎片盘质量
- **脉冲星计时阵列**（`脉冲星计时阵列.md`）：高精度脉冲计时可能探测到星震引发的计时噪声，约束内壳物理
- **引力波探测器 LIGO 与 LISA**（`../多信使天文学/引力波探测器LIGO与LISA.md`）：旋近波形中的潮汐形变率信息是约束 EOS 的关键
- **磁星**（`magnetars.md`）：极端磁场下物质的电磁性质也依赖于 EOS

## 参考文献

- Antoniadis, J. et al. (2013). A massive pulsar in a compact relativistic binary. _Science_, 340, 448.
- Abbott, B.P. et al. (2017). GW170817: Observation of gravitational waves from a binary neutron star inspiral. _Physical Review Letters_, 119, 161101.
- Abbott, B.P. et al. (2018). GW170817: Measurements of neutron star radii and equation of state. _Physical Review Letters_, 121, 161101.
- Riley, T.E. et al. (2019). A NICER view of PSR J0030+0451. _The Astrophysical Journal Letters_, 887, L21.
- Ozel, F. & Freire, P. (2016). Masses, radii, and the equation of state of neutron stars. _Annual Review of Astronomy and Astrophysics_, 54, 401–440.

## 延伸阅读

- Lattimer, J.M. & Prakash, M. (2016). The equation of state of hot, dense matter and neutron stars. _Physics Reports_, 621, 127–164. — 状态方程理论与观测综述的权威参考
- Baym, G. et al. (2018). From hadrons to quarks in neutron stars: A review. _Reports on Progress in Physics_, 81, 056902. — 从强子到夸克物质的相变综述
- Fonseca, E. et al. (2021). Refined mass and geometric measurements of the high-mass PSR J0740+6620. _The Astrophysical Journal Letters_, 915, L12.

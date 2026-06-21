---
title: 黑洞自旋测量
titleEn: Black Hole Spin Measurement
category: 致密天体物理学
tags: [黑洞, 克尔时空, 自旋参数, 铁线法, 连续谱法, ISCO, 引力波]
updated: 2026-06-13
---

# 黑洞自旋测量：旋转如何改写时空

## 概述

根据广义相对论，一个完全由质量和角动量描述的孤立黑洞是**克尔黑洞**（Kerr black hole）。其无量纲自旋参数定义为：

$$a^* = \frac{Jc}{GM^2}$$

其中 $J$ 是角动量，$M$ 是质量，取值范围 $0 \le a^* \le 1$（$a^* = 0$ 为不旋转的史瓦西黑洞，$a^* = 1$ 为极端克尔黑洞）。黑洞自旋不只是描述黑洞的一个参数——它决定了最内稳定圆轨道（ISCO）的位置，从而决定了吸积效率、喷流功率和吸积盘谱形，是理解所有黑洞天体物理现象的关键。

真正精确测量宇宙中真实黑洞的自旋，是过去三十年天体物理学的重大挑战。目前主要有三种独立方法：X 射线连续谱拟合法、铁 K$\alpha$ 线轮廓法（"铁线法"），以及通过引力波测量黑洞并合后的最终自旋。

## 为什么自旋重要：ISCO 与吸积效率

**最内稳定圆轨道**（Innermost Stable Circular Orbit，ISCO）是在克尔时空中能够维持稳定圆形轨道的最小半径：

|  自旋参数 $a^*$  |  ISCO 半径 $r_{ISCO}$  | 吸积效率 $\epsilon$ |
| :--------------: | :--------------------: | :-----------------: |
|  $0$（史瓦西）   |      $6\,GM/c^2$       |      $5.72\%$       |
|      $0.5$       | $\approx 4.23\,GM/c^2$ |    $\approx 8\%$    |
|      $0.9$       | $\approx 2.32\,GM/c^2$ |  $\approx 15.6\%$   |
| $0.998$（最大）  | $\approx 1.24\,GM/c^2$ |   $\approx 32\%$    |
| $-1$（逆向最大） |      $9\,GM/c^2$       |   $\approx 3.8\%$   |

这意味着：一颗极度自旋的黑洞，其吸积能量转化效率可以达到不旋转黑洞的 $5$–$6$ 倍。在活动星系核中，这意味着极大差异的光度和宇宙学影响。

同时，**喷流功率**依赖于自旋（Blandford-Znajek 机制：$P_{BZ} \propto a^{*2} \Phi_B^2$），因此喷流强度、延伸和形态都与黑洞自旋密切相关。

## 方法一：X 射线连续谱拟合法

**X 射线连续谱拟合法**（continuum-fitting method，Zhang et al. 1997）适用于**X 射线双星**中的恒星级黑洞。基本思路：

吸积盘的内边缘位于 ISCO 处，盘的多温黑体谱由 ISCO 半径（自旋）、黑洞质量 $M$、吸积率 $\dot{M}$ 和距离 $D$ 共同决定：

$$T_{peak} \propto \left(\frac{M}{\dot{M}}\right)^{-1/4} \cdot f(a^*)$$

如果 $M$、$D$、轨道倾角 $i$ 已知（来自光学观测），则通过拟合 X 射线热谱的峰值温度和光度可以约束 ISCO 半径，进而推算自旋 $a^*$。

**已测量的 X 射线双星黑洞自旋（连续谱法）：**

- **GRS 1915+105**：$a^* > 0.98$（McClintock et al. 2006，_The Astrophysical Journal_，652，518）——迄今测量最高的黑洞自旋之一
- **Cygnus X-1**：$a^* > 0.95$（3σ，Gou et al. 2011，_The Astrophysical Journal_，742，85），2014 年用更高质量数据进一步收紧到 $a^* > 0.983$（Gou et al. 2014，_ApJ_，790，29）——近极端克尔黑洞
- **A0620-00**：$a^* = 0.12 \pm 0.19$（Gou et al. 2010）——相对较低的自旋

**该方法的局限性**：需要精确已知黑洞质量、距离和倾角，这些量本身有不确定性；且仅适用于热软 X 射线谱状态（标准薄盘状态），硬态黑洞无法使用。

## 方法二：铁 K$\alpha$ 线轮廓法（铁线法）

当吸积盘附近硬 X 射线照射到相对论速度运动的吸积盘内区时，铁原子（Fe）的 K 壳层被电离后发出 $6.4$ keV 的荧光谱线（铁 K$\alpha$ 线）。由于内盘气体以接近光速运动，且处于强引力场中，观测到的谱线被严重展宽和不对称畸变——这就是**相对论展宽铁线**（relativistically broadened iron line）。

线的轮廓同时包含：

- **多普勒展宽**：接近观测者的内盘区蓝移，远离的红移
- **引力红移**：内盘深引力阱中光子损失能量
- **横向多普勒效应**：相对论性运动的时间膨胀

这三种效应的综合决定了线的形状，而 ISCO 位置（自旋）控制着红翼延伸的截止位置——自旋越高，盘内边越靠近黑洞，红翼延伸越长。

**已测量的自旋（铁线法）：**

- **MCG-6-30-15**（超大质量黑洞）：$a^* > 0.98$（Brenneman & Reynolds 2006，_The Astrophysical Journal_，652，1028）——早期确认 SMBH 高自旋的关键结果
- **1H 0707-495**：极宽铁线，暗示 $a^* \approx 0.99$
- **GX 339-4**（X 射线双星）：$a^* \approx 0.93$

两种方法对同一天体的测量互为验证。对于 Cyg X-1，连续谱法和铁线法均给出 $a^* > 0.97$，增强了互相的可信度。

## 方法三：准周期振荡（QPO）

X 射线双星的 X 射线流量中有时观测到**准周期振荡**（Quasi-Periodic Oscillations，QPO），频率可高达 $100$–$450$ Hz（高频 QPO）。这些振荡被认为来自内盘物质的轨道共振，与 ISCO 处的轨道频率相关。

如果 QPO 的物理机制确定，从频率可以直接推算 $M/a^*$，结合质量约束即可得到自旋。然而，QPO 的物理机制至今仍有争议（多种模型均能解释频率比，但对不同天体的适用性不同），导致该方法目前不如前两种方法稳健。

## 方法四：引力波——并合最终自旋

2015 年 LIGO 首次探测到引力波事件 GW150914（两个黑洞并合）。引力波波形的**衰荡阶段**（ringdown）——并合后最终黑洞的准简正模振荡——直接编码了最终黑洞的质量和自旋：

$$M_f = (62 \pm 4)\,M_\odot, \quad a^*_f = 0.67 \pm 0.05 \quad (\text{GW150914, Abbott et al. 2016})$$

此外，**旋进波形**的相位演化依赖于两个并合前黑洞各自的自旋参数（体现在**有效自旋参数** $\chi_{eff}$）：

$$\chi_{eff} = \frac{m_1 a_1^* \cos\theta_1 + m_2 a_2^* \cos\theta_2}{m_1 + m_2}$$

其中 $\theta$ 是自旋轴与轨道角动量的夹角。来自 LIGO/Virgo 的 O1/O2/O3 观测轮次已发布数十个双黑洞并合事件（GWTC-3，Abbott et al. 2023，_Physical Review X_），统计上大多数恒星级黑洞的 $\chi_{eff}$ 接近零，可能反映了双黑洞系统的起源（场双星 vs. 动力学形成）。

## 黑洞自旋的天体物理起源

黑洞自旋如何形成？目前学界有两种基本机制：

**吸积自旋**（Accretion spin-up）：长期吸积可以将黑洞自旋从零加速到接近 $1$。假设吸积盘有序，自旋增长效率高——这解释了为什么某些超大质量黑洞（如 MCG-6-30-15）具有极高自旋：它们可能经历了长期有序的吸积。

**并合自旋**（Merger spin）：两个黑洞并合后，最终自旋由两者的质量比和各自自旋决定。若两个等质量、不旋转黑洞并合，最终黑洞自旋约 $a^* \approx 0.69$（角动量守恒）。

统计上，X 射线双星中高自旋黑洞较多（如 GRS 1915+105、Cyg X-1），可能反映了这些系统中吸积或诞生机制的特殊性。而引力波事件中 $\chi_{eff}$ 分布峰值接近零，与动力学形成机制（无优先方向的随机配对）一致。

## 事件视界望远镜与自旋

EHT 对 M87* 的图像中，亮环的不对称性（南侧比北侧亮约 $1.2$ 倍）与多普勒增亮一致，暗示了内盘旋转方向（顺时针，在图像平面上）。目前基于 EHT 数据的自旋约束仍相对宽松，但 $a^* > 0$ 是确定的，最新 GRMHD 模型与 $a^* \sim 0.9$ 更吻合（Event Horizon Telescope Collaboration 2021，_The Astrophysical Journal Letters_，910，L13）。

Sgr A* 的 EHT 图像也表明盘存在，对自旋的直接约束尚在分析中（由于 Sgr A* 快速变化，数据分析更复杂）。

## 为什么这很重要

黑洞自旋是广义相对论中最难测量的基本参数之一，也是检验克尔度规、理解吸积效率和喷流起源的核心。三种完全独立的测量方法（连续谱、铁线、引力波）收敛给出一致结果，极大地加强了我们对克尔黑洞物理的信心。随着 LISA 在 $2030$ 年代的升空，极质量比旋进（EMRI）事件将提供对单个 SMBH 自旋的最精确测量。

## 跨领域连接

- **黑洞吸积盘与相对论喷流**（`accretion-disks-relativistic-jets.md`）：ISCO 位置（由自旋决定）控制吸积效率；BZ 机制中喷流功率正比于 $a^{*2}$
- **事件视界望远镜**（`../多信使天文学/事件视界望远镜.md`）：EHT 图像的不对称性提供对 SMBH 自旋的直接约束
- **引力波探测器 LIGO 与 LISA**（`../多信使天文学/引力波探测器LIGO与LISA.md`）：并合波形和衰荡阶段直接测量最终黑洞自旋

## 参考文献

- Zhang, S.N. et al. (1997). Black hole spin in X-ray binaries: Observational consequences. _The Astrophysical Journal Letters_, 482, L155.
- Brenneman, L.W. & Reynolds, C.S. (2006). Constraining black hole spin via X-ray spectroscopy. _The Astrophysical Journal_, 652, 1028–1043.
- Abbott, B.P. et al. (LIGO Scientific Collaboration and Virgo Collaboration) (2016). Binary black hole mergers in the first Advanced LIGO observing run. _Physical Review X_, 6, 041015.
- Event Horizon Telescope Collaboration (2021). First M87 Event Horizon Telescope Results. VIII. Magnetic field structure near the event horizon. _The Astrophysical Journal Letters_, 910, L13.
- Reynolds, C.S. (2021). Observational constraints on black hole spin. _Annual Review of Astronomy and Astrophysics_, 59, 117–154.

## 延伸阅读

- McClintock, J.E. & Remillard, R.A. (2006). Black hole binaries. In _Compact Stellar X-ray Sources_. Cambridge University Press. — X 射线双星黑洞自旋综述
- Dauser, T. et al. (2013). Irradiation of an accretion disc by a jet. _Monthly Notices of the Royal Astronomical Society_, 430, 1694–1708. — 铁线轮廓建模细节
- Middleton, M. (2016). Black hole spin: Theory and observation. In _Astrophysics of Black Holes_. Springer. — 系统介绍自旋测量的各种方法

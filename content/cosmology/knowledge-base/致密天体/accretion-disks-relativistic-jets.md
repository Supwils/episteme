---
title: 黑洞吸积盘与相对论喷流
titleEn: Black Hole Accretion Disks and Relativistic Jets
category: 致密天体物理学
tags: [吸积盘, 相对论喷流, 黑洞, AGN, X射线双星, 磁流体动力学]
updated: 2026-06-13
---

# 黑洞吸积盘与相对论喷流：宇宙中最高效的能量转化机器

## 概述

**吸积**（accretion）是宇宙中最重要的能量转化机制之一：物质在引力作用下落向致密天体（黑洞、中子星、白矮星），将引力势能转化为辐射能量。黑洞吸积的效率约为 $6$–$42\%$（取决于黑洞自旋），远高于核聚变（约 $0.7\%$）和化学反应（约 $10^{-9}\%$）。如果物质不能直接径向落入，而是携带角动量形成**吸积盘**（accretion disk），系统将变得更加复杂和有趣：吸积盘成为辐射强烈的热等离子体，同时可能产生沿旋转轴方向喷出的**相对论喷流**（relativistic jets）。理解吸积过程，是理解类星体、活动星系核（AGN）、X 射线双星和伽马射线暴的关键。

## 吸积的基本物理

### 爱丁顿光度

任何吸积系统都受**爱丁顿光度**（Eddington luminosity）限制：当辐射压力等于引力时，吸积无法继续增大：

$$L_{Edd} = \frac{4\pi G M c}{\kappa_{es}} \approx 1.26 \times 10^{38}\,\text{erg/s} \times \left(\frac{M}{M_\odot}\right)$$

其中 $\kappa_{es}$ 是电子散射不透明度（对完全电离的氢，$\kappa_{es} \approx 0.34$ cm$^2$/g）。

实际吸积系统可以短暂超过爱丁顿光度（超爱丁顿吸积），此时物质通过吸积盘内的辐射泡被推走，形成"超临界吸积"状态，在某些超亮 X 射线源（Ultra-Luminous X-ray Sources, ULX）中可能存在。

### 吸积效率

从无穷远落向黑洞的物质所释放的引力势能约为：

$$\epsilon = \frac{G M}{R_{ISCO} c^2} = \frac{1}{2 r_{ISCO}/r_g}$$

其中 $R_{ISCO}$ 是**最内稳定圆轨道**（Innermost Stable Circular Orbit, ISCO）半径，$r_g = GM/c^2$ 是引力半径。

- 非自旋（史瓦西）黑洞：$R_{ISCO} = 6\,r_g$，$\epsilon \approx 6\%$（或确切值 $1 - \sqrt{8/9} \approx 5.72\%$）
- 极度顺向自旋（极端克尔）黑洞：$R_{ISCO} \to r_g$，$\epsilon \to 42\%$
- 极度逆向自旋黑洞：$R_{ISCO} = 9\,r_g$，$\epsilon \approx 3.8\%$

这就是为什么黑洞自旋测量至关重要——自旋决定了黑洞系统辐射效率和喷流功率。

## 标准薄盘模型（Shakura-Sunyaev 模型）

1973 年，尼古拉·沙库拉（Nikolai Shakura）和拉什德·苏尼亚耶夫（Rashid Sunyaev）提出了第一个自洽的吸积盘模型（Shakura & Sunyaev 1973，_Astronomy & Astrophysics_，24，337），奠定了吸积盘理论的基础。

**标准薄盘**（Shakura-Sunyaev disk，或 $\alpha$ 盘）的基本假设：

- 盘在垂直方向厚度远小于半径（几何薄盘，$H/R \ll 1$）
- 气体以近圆轨道绕黑洞旋转（开普勒旋转）
- 粘滞（viscosity）将角动量向外输运，使物质向内螺旋落入
- 粘滞产生的热量在局部辐射出去（光学厚，黑体辐射）

薄盘的温度分布（忽略辐射压，对 $r \gg R_{ISCO}$）：

$$T(r) \approx 6.3 \times 10^5\,\text{K} \left(\frac{\dot{M}}{\dot{M}_{Edd}}\right)^{1/4} \left(\frac{M}{M_\odot}\right)^{-1/4} \left(\frac{r}{r_g}\right)^{-3/4}$$

（其中 $\dot{M}$ 是吸积率，$\dot{M}_{Edd}$ 是对应爱丁顿光度的吸积率）

薄盘的积分谱是多温黑体（multi-color blackbody，MCD）叠加，峰值温度：

- 恒星级黑洞（$10\,M_\odot$）：约 $10^7$ K，峰值在软 X 射线（约 $1$ keV）
- 超大质量黑洞（$10^8\,M_\odot$）：约 $10^5$ K，峰值在紫外（约 $10$ eV）

**粘滞参数 $\alpha$**：薄盘无法从第一原理确定粘滞机制，Shakura & Sunyaev 引入参数化粘滞 $\nu = \alpha c_s H$（$c_s$ 是声速，$H$ 是盘高），$\alpha \approx 0.01$–$0.4$ 需要由观测拟合。这一自由参数反映了理论的不完整性——实际粘滞机制直到 1991 年才由**磁旋转不稳定性**（MRI，Balbus & Hawley 1991）给出物理解释。

## 超临界吸积与辐射低效吸积

标准薄盘只是吸积的一种状态。不同的吸积率对应不同的物理模式：

### 辐射低效吸积流（RIAF/ADAF）

当吸积率极低（$\dot{M} \ll \dot{M}_{Edd}$）时，盘密度很低，光子平均自由程超过盘厚，辐射无法有效冷却气体。热量积累在等离子体中（"辐射低效"），气体形成厚盘或热晕。**吸积主导的吸积流**（ADAF，Narayan & Yi 1994，_The Astrophysical Journal_，428，L13）是此状态的典型模型，解释了银河系中心 Sgr A\* 的低光度。

### 超爱丁顿吸积（超临界盘）

当 $\dot{M} \gg \dot{M}_{Edd}$ 时，辐射压力强到无法忽略，盘变厚（$H/R \sim 1$），辐射通过"吹走"盘内侧物质泄压（radiative driven outflow），系统光度接近但不大幅超过 $L_{Edd}$。

## 相对论喷流的物理机制

**相对论喷流**（relativistic jets）是吸积盘系统最引人注目的现象之一——沿旋转轴方向喷出的准直等离子体流，洛伦兹因子 $\Gamma = 10$–$50$（某些情况下更高），携带大量能量向数百万光年之外传播。

### 喷流的产生：Blandford-Znajek 机制

目前最广泛接受的喷流驱动机制是 **Blandford-Znajek（BZ）机制**（Blandford & Znajek 1977，_Monthly Notices of the Royal Astronomical Society_，179，433）：

**旋转黑洞的自旋能量**通过磁场提取，转化为喷流的动能：

1. 大尺度磁场穿过黑洞视界
2. 旋转黑洞（克尔黑洞）的"帧拖曳效应"（frame dragging）带动磁场旋转
3. 旋转的磁场产生电动势，向外驱动高度准直的相对论等离子体流

BZ 功率正比于黑洞自旋的平方和穿过视界的磁通量：

$$P_{BZ} \propto a^2 \Phi_B^2$$

其中 $a$ 是自旋参数（$0 \le a \le 1$），$\Phi_B$ 是通过黑洞视界的磁通量。这意味着喷流的强弱依赖于黑洞自旋和吸积盘中的磁场积累程度。

近年来的一般相对论磁流体动力学（GRMHD）数值模拟（如 HARM 代码，Gammie et al. 2003）支持 BZ 机制，并发现"磁遏制吸积盘"（Magnetically Arrested Disk, MAD）状态下喷流效率最高（接近甚至超过吸积能量释放，因为提取了黑洞自旋能量）。

### 内部冲击与同步辐射

喷流内部的等离子体以不均匀速度喷出，快速流体追上慢速流体时发生**内部冲击**（internal shocks），将动能转化为辐射。被加速的相对论性电子在喷流磁场中产生**同步辐射**（synchrotron radiation），从射电到 X 射线都有贡献。

## 观测：M87* 和 Sgr A*

**事件视界望远镜**（Event Horizon Telescope, EHT）在 2019 年和 2022 年分别发布了 M87* 和 Sgr A* 的黑洞"照片"——实际上是吸积盘的热辐射经引力透镜扭曲后的毫米波图像：

- **M87\***：质量约 $6.5 \times 10^9\,M_\odot$（Event Horizon Telescope Collaboration 2019，_The Astrophysical Journal Letters_，875，L1），图像显示清晰的亮环（光子轨道）和南北不对称（来自多普勒增亮），与 GRMHD 模拟吻合良好。M87 的喷流延伸超过 $5{,}000$ 光年，是研究喷流结构的最佳靶标
- **Sgr A\***：质量约 $4.15 \times 10^6\,M_\odot$（Event Horizon Telescope Collaboration 2022），吸积率极低（约 $10^{-9}\,M_\odot$/yr），处于 RIAF 状态

这两个结果是广义相对论强引力场区域的直接检验，均与 GR 预言高度吻合。

## 黑洞吸积在宇宙学中的角色

黑洞吸积不只是局部物理，而是宇宙演化的关键驱动：

- **AGN 反馈**：超大质量黑洞的喷流和辐射风将大量能量注入宿主星系的气体，抑制恒星形成（"负反馈"），解释了为什么大质量椭圆星系几乎没有年轻恒星
- **宇宙 X 射线背景**：遍布宇宙的 AGN（类星体）吸积辐射构成了宇宙 X 射线背景的大部分
- **重子物质循环**：吸积将气体"燃烧"为辐射，而喷流将能量和物质输送到数百万光年外的星系际介质（ICM）

## 为什么这很重要

黑洞吸积盘和喷流将极端物理（强引力、强磁场、相对论等离子体）与宇宙学尺度的反馈连接起来。吸积是宇宙中效率最高的能量转化过程，在激活类星体、驱动宇宙射线、维持星系演化平衡方面扮演中心角色。EHT 对 M87* 和 Sgr A* 的直接成像，将长期作为理论模型的关键约束。

## 跨领域连接

- **超大质量黑洞**（`supermassive-black-holes.md`）：超大质量黑洞的吸积盘是类星体和 AGN 的能量来源
- **潮汐瓦解事件**（`tidal-disruption-events.md`）：恒星被黑洞潮汐力撕碎后形成临时吸积盘，产生明亮的多波段爆发
- **引力波天文学**（`../引力波天文学.md`）：引力波测量黑洞质量和自旋，与吸积盘模型对比
- **星系形成与演化**（`../星系形成与演化.md`）：AGN 反馈（通过喷流和辐射）是调控星系质量上限的关键机制

## 参考文献

- Shakura, N.I. & Sunyaev, R.A. (1973). Black holes in binary systems. Observational appearance. _Astronomy & Astrophysics_, 24, 337–355.
- Blandford, R.D. & Znajek, R.L. (1977). Electromagnetic extraction of energy from Kerr black holes. _Monthly Notices of the Royal Astronomical Society_, 179, 433–456.
- Narayan, R. & Yi, I. (1994). Advection-dominated accretion: A self-similar solution. _The Astrophysical Journal_, 428, L13–L16.
- Event Horizon Telescope Collaboration (2019). First M87 Event Horizon Telescope Results. I. _The Astrophysical Journal Letters_, 875, L1.
- Balbus, S.A. & Hawley, J.F. (1991). A powerful local shear instability in weakly magnetized disks. _The Astrophysical Journal_, 376, 214–222.

## 延伸阅读

- Frank, J., King, A., & Raine, D. (2002). _Accretion Power in Astrophysics_ (3rd ed.). Cambridge University Press. — 吸积物理的标准参考教材
- Blandford, R., Meier, D., & Readhead, A. (2019). Relativistic Jets from Active Galactic Nuclei. _Annual Review of Astronomy and Astrophysics_, 57, 467–509.
- Bambi, C. (2017). _Black Holes: A Laboratory for Testing Strong Gravity_. Springer.

---
title: 造父变星与变星
titleEn: Cepheid Variables and Variable Stars
category: 恒星物理
tags: [造父变星, 变星, 周光关系, 宇宙距离, 哈勃常数, 不稳定带]
updated: 2026-06-13
---

# 造父变星与变星：宇宙的节拍器

## 概述

**造父变星**（Cepheid variable stars，或 Cepheids）是一类以周期性脉动为特征的超巨星，其光度随时间规律性起伏，周期从约 $1$ 天到约 $100$ 天不等。它们的重要性远超一颗闪烁的星星：1908年，亨利埃塔·勒维特（Henrietta Swan Leavitt）发现造父变星存在严格的**周光关系**——亮度越高、脉动周期越长——这一关系成为宇宙距离测量的基础，直接导致了河外星系的发现，推动了现代宇宙学的诞生。时至今日，造父变星仍是校准宇宙距离阶梯、测量哈勃常数的关键工具，置身于"哈勃张力"这一当代宇宙学核心争议的中心。

## 变星的物理机制：κ 机制

恒星为什么会脉动？恒星内部的热核反应是稳定的，不会自然产生脉动——必须存在某种**驱动机制**将能量转化为相干振荡。

对于造父变星，主导机制是**κ机制**（kappa mechanism，$\kappa$ 是不透明度的符号）：

1. 当恒星包层被压缩时，氦的部分电离区（位于约 $10{,}000$–$40{,}000$ K 的温度范围）变得更**不透明**（$\kappa$ 增大），吸收辐射而非让其通过
2. 积聚的辐射热量使包层受热膨胀，如同受压气体推开活塞
3. 膨胀中包层降温，不透明度降低，辐射得以逃逸，驱动减弱
4. 重力将包层拉回，压缩再次开始，循环重复

这一过程的关键在于：部分电离区的不透明度对温度和密度的响应方式，使压缩时不透明度增大（而非减小）——这与正常气体相反，因此能积聚能量驱动振荡，而非耗散能量阻尼振荡。

天文学家将赫罗图上造父变星等脉动变星存在的区域称为**不稳定带**（instability strip），位于约 $T_{eff} \approx 5{,}000$–$8{,}000$ K 的垂直带状区域，贯穿从主序（$\delta$ 盾型变星）到白矮星前身（ZZ Ceti 型变星）的多种脉动变星。

## 勒维特定律：周光关系

**亨利埃塔·勒维特**（Henrietta Swan Leavitt，1868–1921）是哈佛天文台的"人工计算员"（computers）——一个主要由女性组成的团队，负责系统分析天文底片。1908年，勒维特在研究小麦哲伦云中的 $1{,}777$ 颗变星时，注意到 $25$ 颗造父变星呈现出明显的规律：**星等越亮，周期越长**。

由于小麦哲伦云中所有恒星到地球的距离近似相等（约 62 kpc），视亮度差异直接反映绝对光度差异。勒维特在 1912 年将这一关系量化为线性规律（Leavitt & Pickering 1912）。

现代校准的造父变星**周光关系**（Leavitt Law）形式为（以 $V$ 波段为例）：

$$M_V = -2.81 \log_{10}(P/\text{day}) - 1.43 \pm 0.05 \quad \text{(经金属丰度修正)}$$

（Freedman et al. 2001，_The Astrophysical Journal_，553，47；基于哈勃空间望远镜大麦哲伦云造父变星校准）

近红外（$H$ 波段和 $W_H$ 带）的周光关系斜率更陡、离散更小，尘埃消光影响更弱，是现代测量首选（Monson & Pierce 2011，_The Astrophysical Journal Supplement Series_，193，12）。

## 造父变星的分类

造父变星并非单一类型，而是包含几个不同的子群：

### 经典造父变星（Classical Cepheids，I 型）

**经典造父变星**（Cepheid Ia 或 I 型）是大质量、年轻的超巨星（质量 $4$–$20\,M_\odot$，年龄 $10^7$–$10^8$ yr），位于薄盘和旋臂中。它们的脉动模式主要是径向基模（fundamental mode）。

造父座 $\delta$（$\delta$ Cephei）是原型星，周期 $5.366$ 天，亮度在 $V$ 波段从 $3.48$ 到 $4.37$ 等之间变化，距离约 $273$ pc（Gaia 视差测量，Benedict et al. 2007）。

### W Vir 型（II 型造父变星）

**II 型造父变星**（Cepheid II 或 Population II Cepheids）是低金属丰度的老年恒星（质量约 $0.5$–$0.6\,M_\odot$，年龄 $> 10^{10}$ yr），主要出现在球状星团和晕中。**关键区别**：在相同周期下，II 型造父变星比经典（I 型）造父变星暗约 $1.5$–$2$ 等。

历史上，混淆 I 型和 II 型造父变星导致了严重的距离标度错误。1952 年，沃尔特·巴德（Walter Baade）发现仙女座大星云（M31）中的造父变星是 I 型而非 II 型，由此将 M31 的距离修正为原来的约两倍，宇宙年龄估计也相应修正（Baade 1952）。

### RR Lyrae 型

**RR Lyrae 型变星**是脉动的老年水平支恒星（质量约 $0.6$–$0.8\,M_\odot$），周期约 $0.2$–$1$ 天。它们同样遵循近似的光度-周期关系（光度几乎一致，$M_V \approx 0.5$ mag，因此也可用作标准烛光），但只能用于银河系内和近邻星系（比造父变星更暗约 $2$–$3$ 等）。

球状星团因含大量 RR Lyrae 型变星而成为校准这类标准烛光的天然实验室（Cacciari & Clementini 2003，_Stellar Candles for the Extragalactic Distance Scale_）。

### $\delta$ 盾型（Delta Scuti）变星

**$\delta$ 盾型变星**是主序上 A–F 型恒星的径向和非径向脉动，周期约 $0.01$–$0.3$ 天，振幅较小（约 $0.003$–$0.9$ mag）。开普勒卫星发现了数千颗，正在用于**星震学**精确测定恒星内部结构（Murphy et al. 2019，_Monthly Notices of the Royal Astronomical Society_，485，2380）。

### 长周期变星（Mira 型）

**米拉型变星**（Mira variables）是 AGB 巨星的大振幅脉动（振幅 $> 2.5$ mag，周期 $100$–$1{,}000$ 天），是晚期恒星演化的重要阶段，与大量尘粒驱动的质量损失密切相关。鲸鱼座 $o$（Mira，刍藁增二）是原型星，周期约 $332$ 天，距离约 $92$ pc。

## 哈勃常数测量与哈勃张力

造父变星是当代宇宙学最核心争议的主角之一——**哈勃张力**（Hubble tension）。

### 距离阶梯路径

宇宙距离阶梯（cosmic distance ladder）从造父变星出发：

$$\underbrace{\text{视差}}_{\text{盖亚}} \rightarrow \underbrace{\text{造父变星}}_{\text{大麦哲伦云/银河系}} \rightarrow \underbrace{\text{遥远星系造父变星}}_{\text{HST/JWST}} \rightarrow \underbrace{\text{Ia型超新星}}_{\text{宇宙学}} \rightarrow H_0$$

2022 年，Riess 等人（SH0ES 团队）利用 HST 校准的 42 个宿主星系造父变星，结合 Ia 型超新星距离，得到 $H_0 = 73.04 \pm 1.04$ km/s/Mpc（Riess et al. 2022，_The Astrophysical Journal Letters_，934，L7）。

### CMB 路径的张力

独立地，Planck 卫星通过宇宙微波背景的声学峰测量，在 $\Lambda$CDM 框架下给出 $H_0 = 67.4 \pm 0.5$ km/s/Mpc（Planck 2018）。

两者之间约 $5\sigma$ 的差异——"哈勃张力"——是当代宇宙学最严峻的挑战之一。可能的原因包括：

- 造父变星测量的系统误差（尘埃消光、金属丰度效应、周光关系的非线性）
- 声学峰分析中的系统误差
- 超越 $\Lambda$CDM 的新物理（早期暗能量、超流暗物质等）

2024 年，詹姆斯·韦伯太空望远镜（JWST）开始独立校准近红外造父变星（Freedman et al. 2024，_The Astrophysical Journal_，961，L16），初步结果给出 $H_0 \approx 69$–$72$ km/s/Mpc，暗示 HST 造父变星可能存在一定系统误差，但哈勃张力尚未完全解决。

## 为什么造父变星如此重要

造父变星的故事是科学史上最精彩的章节之一。一个约 $10{,}000$ K 的恒星表层不断收缩和膨胀的物理过程，竟然成为测量宇宙大小的标尺。哈勃（Edwin Hubble）于 1924 年用威尔逊山望远镜在仙女座"星云"中找到造父变星，计算出其距离约 $100$ 万光年（远超银河系大小），一举证明宇宙中存在其他星系——这是 20 世纪最重大的天文发现之一。

勒维特的发现来自对大量底片的系统分析，她却未能活到哈勃用她的工具改变宇宙观的那一天（1921 年去世）。1925 年，诺贝尔奖委员会曾联系哈佛天文台，希望提名勒维特，却被告知她已逝世。诺贝尔奖从不追授，但历史记住了她。

## 跨领域连接

- **宇宙距离阶梯**（`../宇宙距离阶梯.md`）：造父变星是距离阶梯中间的关键梯级，连接视差和 Ia 型超新星
- **赫罗图**（`hertzsprung-russell-diagram.md`）：造父变星位于赫罗图的不稳定带，是恒星演化轨迹跨越不稳定带时产生的脉动现象
- **星系形成与演化**（`../星系形成与演化.md`）：哈勃利用造父变星确认河外星系的存在，开创了现代星系天文学
- **宇宙微波背景**（`../宇宙微波背景.md`）：CMB 给出的哈勃常数与造父变星链测量的哈勃常数存在"哈勃张力"

## 银河系内造父变星的精确校准

随着盖亚（Gaia）卫星提供高精度视差数据，银河系内约 $2{,}500$ 颗经典造父变星的距离已被精确测量到 $1$–$5\%$ 的精度（Ripepi et al. 2023，_Astronomy & Astrophysics_，674，A17），极大地改善了周光关系的零点校准：

- **视差几何校准**：对于距离 $< 5$ kpc 的造父变星，盖亚视差可以直接定标周光关系，消除了对大麦哲伦云（LMC）距离中间步骤的依赖
- **大麦哲伦云几何距离**：DEBs（分离双食双星）在 LMC 中提供了几何距离 $49.59 \pm 0.09 \pm 0.54$ kpc（Pietrzyński et al. 2019，_Nature_，567，200），结合 LMC 中的造父变星，进一步锚定周光关系的零点
- **金属丰度修正**：不同金属丰度的造父变星在周光关系上有系统偏差，约 $-0.2$–$-0.4$ mag/dex，在比较不同环境的造父变星时必须修正

这些改进使哈勃常数的系统误差在 $2030$ 年代有望降至 $1\%$ 以下，届时哈勃张力是否仍然存在将有明确答案。

## 造父变星的脉动模式

除基模（fundamental mode）脉动外，造父变星还可以以**泛音模**（overtone modes）脉动：

- **第一泛音造父变星**（First Overtone Cepheids）：脉动振幅较小、周期较短，在赫罗图上的不稳定带内位于较蓝的区域。周光关系斜率与基模不同，需分开处理
- **拍造父变星**（Beat Cepheids）：同时以两种模式脉动，光变曲线显示复杂的拍频图案，可提供星震学约束

## 参考文献

- Leavitt, H.S. & Pickering, E.C. (1912). Periods of 25 Variable Stars in the Small Magellanic Cloud. _Harvard College Observatory Circular_, 173, 1–3.
- Freedman, W.L. et al. (2001). Final Results from the Hubble Space Telescope Key Project. _The Astrophysical Journal_, 553, 47–72.
- Riess, A.G. et al. (2022). A Comprehensive Measurement of the Local Value of the Hubble Constant. _The Astrophysical Journal Letters_, 934, L7.
- Freedman, W.L. et al. (2024). Status Report on the Chicago-Carnegie Hubble Program (CCHP): Three Independent Estimates of the Hubble Constant Using JWST. _The Astrophysical Journal_, 961, L16.
- Planck Collaboration (2020). Planck 2018 results. VI. Cosmological parameters. _Astronomy & Astrophysics_, 641, A6.

## 延伸阅读

- Catelan, M. & Smith, H.A. (2015). _Pulsating Stars_. Wiley-VCH. — 脉动变星物理的全面参考书
- Pietrzyński, G. et al. (2019). A distance to the Large Magellanic Cloud that is precise to one per cent. _Nature_, 567, 200–203. — LMC 几何距离的里程碑测量
- Di Valentino, E. et al. (2021). In the realm of the Hubble tension — a review of solutions. _Classical and Quantum Gravity_, 38, 153001. — 哈勃张力及可能解决方案的综述

---
title: 快速射电暴FRB
titleEn: Fast Radio Bursts
category: 多信使天文学
tags: [快速射电暴, FRB, 磁星, CHIME, 射电瞬变, 色散量]
updated: 2026-06-13
---

# 快速射电暴：宇宙中最神秘的毫秒闪光

## 概述

**快速射电暴**（Fast Radio Burst，FRB）是持续时间约 $0.1$–$100$ 毫秒的强烈宇宙射电脉冲，能量约 $10^{38}$–$10^{46}$ erg，等效亮度比太阳高约 $10^{30}$ 倍。自 2007 年首个 FRB 被发现以来，它们神秘的来源和极端的物理性质让整个射电天文学界着迷。目前已发现超过 $800$ 个 FRB，其中约 $50$ 个是**重复 FRB**——同一来源多次爆发，这基本排除了这类源来自灾难性不可逆的单次事件（如并合）。

主流观点认为**磁星**是（至少大多数）FRB 的来源，这一观点在 2020 年由银河系内磁星 SGR 1935+2154 产生的射电暴所支持。但 FRB 现象的多样性可能意味着多种起源机制共存。

## 发现史

### 洛里默爆发（Lorimer Burst，2007 年）

2007 年，邓肯·洛里默（Duncan Lorimer）和马修·麦克劳克林（Matthew McLaughlin）在分析 Parkes 射电望远镜 2001 年的存档数据时，发现了一个异常信号：

- 持续时间约 $5$ 毫秒
- **色散量**（Dispersion Measure，DM）= $375\,\text{pc}\,\text{cm}^{-3}$，远超银河系自由电子贡献（$\sim 30\,\text{pc}\,\text{cm}^{-3}$），意味着它来自宇宙学距离（$z \approx 0.3$）
- 当时亮度约 $30$ Jy·ms

这是第一个记录在案的 FRB（FRB 010724，Lorimer et al. 2007，_Science_，318，777）。最初学界对"宇宙学来源"存疑（担心是人为干扰），但随后越来越多的 FRB 以相同特征被发现，逐渐确认了这是真实的宇宙现象。

### CHIME 的爆发式发现

**加拿大氢强度测绘实验**（Canadian Hydrogen Intensity Mapping Experiment，**CHIME**）自 2018 年开始运行，以其宽视场和对 $400$–$800$ MHz 频率的覆盖，成为迄今最高效的 FRB 发现机器。CHIME 每天可以探测到约 $1$–$3$ 个 FRB，已发布包含 $536$ 个 FRB（来自 $492$ 个来源）的第一批次目录（CHIME/FRB Collaboration 2021，_The Astrophysical Journal Supplement Series_，257，59）。

## FRB 的核心物理

### 色散量（DM）：测量宇宙中的自由电子

射电波在穿过电离介质时，低频成分比高频成分慢（色散），时延正比于 $\nu^{-2}$：

$$\Delta t = \frac{e^2}{2\pi m_e c} \cdot \text{DM} \cdot \left(\frac{1}{\nu_1^2} - \frac{1}{\nu_2^2}\right)$$

**色散量** DM $= \int_0^d n_e\,dl$（单位 pc·cm$^{-3}$）是沿视线方向自由电子密度的积分。对于宇宙学距离的 FRB：

$$\text{DM}_{obs} = \text{DM}_{MW} + \text{DM}_{halo} + \text{DM}_{IGM}(z) + \text{DM}_{host}/(1+z)$$

其中 $\text{DM}_{IGM}$ 正比于红移 $z$（大约 $\text{DM}_{IGM} \approx 1000 \cdot z\,\text{pc}\,\text{cm}^{-3}$，取决于宇宙再电离历史）。因此，DM 可用于估计 FRB 的宇宙学距离，甚至用于**测量宇宙重子密度**和宇宙电离历史——这是 FRB 在宇宙学应用上的独特优势。

### 亮度温度：极端相干辐射

FRB 的等效亮度温度约 $T_b \sim 10^{35}$–$10^{37}$ K，远超热辐射上限（约 $10^{12}$ K），因此必须是**相干辐射**（coherent radiation），类似脉冲星的相干辐射机制（但能量尺度高出许多数量级）。这要求辐射区域极小（约数千千米），且物理机制必须产生相位相干的电磁波。

## 重复与非重复：两种群体？

FRB 样本中约 $5\%$–$10\%$ 是重复暴，其余（目前）仅探测到一次。重复暴与非重复暴在特征上存在统计差异：

- **重复 FRB**：单次爆发持续时间更长（数十 ms 而非数 ms）、谱宽更窄（"向下漂移"子结构）、活动窗口有时呈现**周期性**
- **非重复 FRB**：持续时间更短、谱更宽

最著名的重复 FRB：

- **FRB 20121102A**（也称 FRB 121102）：首个定位到宿主星系的 FRB（Chatterjee et al. 2017，_Nature_，541，58），来自红移 $z = 0.19$ 的矮星系，已产生超过 $1000$ 次探测到的爆发。其持续时间的规律性活动窗口（周期约 $157$ 天，Rajwade et al. 2020）暗示可能有轨道或进动周期
- **FRB 20201124A**：活动性极强的重复 FRB，来自红移 $z \approx 0.098$ 的螺旋星系，2021 年被 FAST 在一个月内探测超过 $1000$ 次爆发（Xu et al. 2022，_Nature_，609，685）

## 磁星：目前最强的证据

### SGR 1935+2154 的历史性射电暴

2020 年 4 月 28 日，**银河系磁星 SGR 1935+2154** 在 X 射线活跃期间，CHIME 和 STARE2 望远镜同时探测到一个极亮射电暴（$\sim 1.5\,\text{MJy}$，持续约 $3$ ms），同时 INTEGRAL 和 Insight-HXMT 探测到 X 射线耀发（CHIME/FRB Collaboration 2020，_Nature_，587，54；Bochenek et al. 2020，_Nature_，587，59）。

此射电暴的亮度（如果放到宇宙学距离）与暗弱 FRB 兼容，是**首次将 FRB 与磁星活动直接联系起来**的直接观测证据。

然而，SGR 1935+2154 的射电暴比最亮的宇宙学 FRB 弱约 $3$–$4$ 个数量级，表明磁星可能需要处于特殊的高活跃状态，或者非重复 FRB 需要特别强的磁星发动机。

## 已定位 FRB 的宿主星系

干涉阵列（如 ASKAP CRAFT、VLA、VLBI）对少数 FRB 实现了角秒到亚角秒精度的定位，确认了宿主星系：

- 矮星系（如 FRB 20121102A）：与长伽马射线暴宿主星系类似，暗示与大质量恒星形成相关
- 大质量演化星系（如 FRB 20200120E，位于 M81 星系球状星团！Bhardwaj et al. 2021，_The Astrophysical Journal Letters_，910，L18）：表明至少某些 FRB 来自年老致密天体系统（在球状星团中形成的磁星？）
- 螺旋星系（如 FRB 20201124A）

宿主星系的多样性暗示 FRB 可能有**多种起源机制**，或同一机制（磁星）可在不同星系环境中产生。

## 未解之谜与未来

**当前争议与开放问题**：

1. **重复与非重复是否本质不同？** 还是只是观测时间不足导致非重复 FRB 被认为是单次事件？
2. **发射机制具体是什么？** 目前有几十个竞争模型（曲率辐射、同步切伦科夫辐射、激射等），尚无定论
3. **如何用 FRB DM 精确测量宇宙重子密度和哈勃常数？** 需要精确的 DM-z 关系和宿主星系 DM 统计

**未来展望**：FAST（已在高效探测 FRB）、DSA-2000（深度巡天阵列，$\sim 2028$ 年）、SKA（$2030$ 年代）将把 FRB 样本扩大到数万个，实现宇宙学应用。

## 为什么这很重要

FRB 是过去二十年射电天文学中最重要的发现之一。它们提供了：探索宇宙重子物质分布的新工具（通过 DM-z 关系）、研究磁星极端物理的窗口、检验星系际介质性质的探针，以及（可能）测量哈勃常数的独立方法。FRB 的多样性还提醒我们：宇宙中的极端天体物理可能比我们想象的更加丰富。

## 跨领域连接

- **磁星耀发**（`../致密天体/magnetars.md`）：银河系磁星 SGR 1935+2154 将 FRB 与磁星直接联系起来
- **伽马射线暴**（`伽马射线暴.md`）：FRB 与磁星活动的关联与短 GRB-磁星模型存在交叉
- **脉冲星计时阵列**（`../致密天体/pulsar-timing-array.md`）：都使用毫秒时间分辨率射电时域天文学技术
- **宇宙大尺度结构**（`../../宇宙大尺度结构.md`）：FRB DM 积分反映宇宙大尺度重子分布

## 参考文献

- Lorimer, D.R. et al. (2007). A bright millisecond radio transient. _Science_, 318, 777–780.
- Chatterjee, S. et al. (2017). A direct localization of a fast radio burst and its host. _Nature_, 541, 58–62.
- CHIME/FRB Collaboration (2020). A bright millisecond-duration radio transient from a Galactic magnetar. _Nature_, 587, 54–58.
- CHIME/FRB Collaboration (2021). The first CHIME/FRB Fast Radio Burst catalog. _The Astrophysical Journal Supplement Series_, 257, 59.
- Xu, H. et al. (2022). A fast radio burst source at a complex magnetized site in a barred galaxy. _Nature_, 609, 685–688.

## 延伸阅读

- Petroff, E., Hessels, J.W.T., & Lorimer, D.R. (2022). Fast radio bursts at the dawn of the 2020s. _The Astronomy and Astrophysics Review_, 30, 2. — FRB 观测和理论的最新综述
- Zhang, B. (2023). _The Physics of Fast Radio Bursts_. Cambridge University Press. — 第一本 FRB 专著
- Cordes, J.M. & Chatterjee, S. (2019). Fast radio bursts: An extragalactic enigma. _Annual Review of Astronomy and Astrophysics_, 57, 417–465.

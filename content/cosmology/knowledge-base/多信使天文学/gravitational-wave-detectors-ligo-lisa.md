---
title: 引力波探测器LIGO与LISA
titleEn: Gravitational Wave Detectors LIGO and LISA
category: 多信使天文学
tags: [引力波, LIGO, LISA, 干涉仪, 黑洞并合, 多信使天文学, 时空涟漪]
updated: 2026-06-13
---

# 引力波探测器LIGO与LISA：倾听时空的震动

## 概述

**[[引力波]]**（gravitational waves）是质量加速运动时激发的时空曲率涟漪，以光速传播。爱因斯坦 1916 年在[[广义相对论]]发表一年后即预言了引力波的存在，但预测其振幅极小——即使是宇宙中最剧烈的碰撞，在地球处产生的空间应变（strain）也仅约 $h \sim 10^{-21}$，相当于在 $4$ 光年（地球到最近恒星的距离）的尺度上，长度变化约 $1$ 个质子直径。

探测如此微弱的信号，被爱因斯坦本人认为几乎不可能实现。但在整整 $100$ 年后的 2015 年 9 月 14 日，**LIGO**（激光干涉仪引力波天文台）实现了这一创举，开启了**引力波天文学**的新纪元。

## LIGO的原理与结构

**LIGO**（Laser Interferometer Gravitational-Wave Observatory）是迈克尔逊干涉仪的超大尺度精密版。美国运营两台相同的探测器：LIGO Hanford（华盛顿州）和 LIGO Livingston（路易斯安那州），彼此相距约 $3000$ km。

### 基本工作原理

当引力波通过时，时空的应变使探测器两臂的长度交替伸缩，产生干涉条纹的移动：

$$h = \frac{\Delta L}{L} = \frac{L_x - L_y}{L}$$

对于 $h \sim 10^{-21}$ 和臂长 $L = 4$ km，需要探测的长度变化约为 $\Delta L \sim 4 \times 10^{-18}$ m——约是质子直径的 $1/1000$。

### 噪声压制技术

实现这一精度需要极致的噪声控制：

- **激光功率**：腔内激光功率约 $750$ kW（通过法布里-珀罗谐振腔增强），降低散粒噪声（shot noise）
- **悬挂系统**：测试质量（镜子）悬挂在多级摆（"超级衰减器"），隔离地面振动（地震噪声）在 $10$ Hz 以上有效
- **真空系统**：臂管道维持约 $10^{-9}$ Pa 的超高真空，消除气体分子散射
- **挤压光**（squeezed light）：利用量子光学中的正交相位压缩，降低高频段的量子噪声（已在 O3 run 中实现，提升灵敏度约 $15\%$）
- **热噪声**：镜面材料（熔融石英）和悬丝（熔融石英纤维）的选择降低热涨落

LIGO Advanced（高新 LIGO，2015 年升级后）在最灵敏频段（约 $100$–$300$ Hz）的应变灵敏度约 $h \sim 10^{-23}/\sqrt{\text{Hz}}$。

## 首次探测：GW150914

**2015 年 9 月 14 日 09:50:45 UTC**，LIGO Hanford 和 Livingston 在 $7$ ms 的间隔内（与引力波传播速度和两台探测器距离一致）同时探测到一个信号，持续约 $0.2$ 秒，频率从约 $35$ Hz 快速啁啾到约 $150$ Hz，应变峰值约 $10^{-21}$。

数据分析给出来源：

- **两个黑洞并合**：初始质量约 $36\,M_\odot$ 和 $29\,M_\odot$，最终黑洞约 $62\,M_\odot$，辐射约 $3\,M_\odot c^2 \approx 5.4 \times 10^{47}$ J 的引力波能量
- **距离**：约 $410$ Mpc（$z \approx 0.09$）
- **信噪比**：约 $24$，置信度超过 $5\sigma$

（Abbott et al. 2016，_Physical Review Letters_，116，061102）

这是人类首次直接探测到引力波，也是首次观测到黑洞并合。Kip Thorne、Rainer Weiss 和 Barry Barish 因 LIGO 的理论和实验工作荣获 **2017 年诺贝尔物理学奖**。

## LIGO-Virgo-KAGRA 全球网络

单台探测器无法精确确定引力波的天空来源方向。多台探测器组成全球网络：

- **Virgo**（意大利，与法国合作）：臂长 $3$ km，2017 年 O2 第三轮开始加入联合观测；GW170817 的精确天空定位（$28\,\text{deg}^2$）正是由三台探测器联合实现
- **KAGRA**（日本，地下探测器，利用冷却镜面进一步降低热噪声）：2019 年完工，2023 年 O4 加入联合观测
- **LIGO India**（规划中）：预计 $2030$ 年代投入运行

O3 观测轮（2019–2020 年）发布的 **GWTC-3** 目录包含约 $90$ 个引力波事件（Abbott et al. 2023，_Physical Review X_，13，041039），包括双黑洞（BBH）、双中子星（BNS）和黑洞-中子星（NSBH）并合。

## 目前探测的主要类别

### 双黑洞并合（BBH）

GWTC-3 中最多的类型（约 $80$ 个）。质量范围约 $3$–$100\,M_\odot$，发现了若干"质量间隙"（$2$–$5\,M_\odot$）和超大质量事件（如 GW190521，质量约 $85\,M_\odot + 66\,M_\odot$，最终约 $142\,M_\odot$——进入"中等质量黑洞"范畴）。

### 双中子星并合（BNS）

GW170817（2017 年，已描述）和 GW190425（2019 年，总质量约 $3.4\,M_\odot$，较重，无电磁对应体识别）。

### 黑洞-中子星并合（NSBH）

GW200105 和 GW200115 是首次置信度较高的 NSBH 候选事件（Abbott et al. 2021，_The Astrophysical Journal Letters_，915，L5）。

## LISA：空间引力波探测器

地面 LIGO 探测的引力波频段约 $10$–$10000$ Hz，但更低频段（毫赫兹级，$10^{-4}$–$10^{-1}$ Hz）蕴藏着另一类丰富的引力波源——超大质量黑洞双星、极质量比旋进（EMRI）和宇宙早期相变信号。

**LISA**（Laser Interferometer Space Antenna，激光干涉仪空间天线）是 ESA 主导（NASA 参与）的空间引力波探测任务，计划于 $2035$ 年前后发射：

- 三颗卫星组成等边三角形，臂长约 $250$ 万 km（是 LIGO 的 $625000$ 倍）
- 在绕太阳的日心轨道上运行，位于地球后方约 $50$–$65°$
- 目标频段：$10^{-4}$–$10^{-1}$ Hz，对应毫秒到几分钟周期的引力波

### LISA 的主要科学目标

**超大质量黑洞双星**：当两个星系并合，其[[supermassive-black-holes|超大质量黑洞]]（$10^6$–$10^9\,M_\odot$）最终形成双星并发射 mHz 级引力波，LISA 能在并合前数年到数天发出"警报"，允许多信使联合观测。

**极质量比旋进（EMRI）**：恒星级黑洞（$\sim 10\,M_\odot$）螺旋进入超大质量黑洞（$\sim 10^6\,M_\odot$），在数年的旋进过程中发射数万个轨道周期的引力波信号，精确编码了中心黑洞的质量、自旋和时空几何——是检验广义相对论"无毛定理"的黄金实验。

**双白矮星**：银河系中约 $10^7$ 个双[[white-dwarfs|白矮星]]是 LISA 的确定信号来源，将形成连续的"引力波混响"背景。

**早期宇宙信号**：宇宙相变、宇宙弦等早期宇宙物理在 mHz 频段产生的随机引力波背景。

LISA 的技术验证任务 **LISA Pathfinder**（2015–2017 年）已成功验证了关键技术（自由落体残余加速度达到设计指标的 $10$ 倍以上，远超需求，Armano et al. 2016，_Physical Review Letters_，116，231101）。

## 引力波与时间延迟的精确测量

引力波（光速传播）和光（光速传播）从同一事件出发理论上同时到达——但 GW170817 中观测到引力波比伽马射线早约 $1.7$ 秒。原因：

- 伽马射线暴的喷流形成、穿越中子星物质需要约 $1$–$2$ 秒的延迟时间（不是光子在传播中慢了）
- 引力子和光子质量均为零，两者传播速度一致，差异 $\Delta v/c < 10^{-15}$——对引力波速度的精确测量（Boran et al. 2018）

这是对爱因斯坦等效原理和引力波色散的直接检验。

## 为什么这很重要

引力波天文学打开了宇宙的全新观测窗口：它不受电磁波的吸收和散射限制，能穿越尘埃、恒星、甚至宇宙的"暗物质"，直接携带黑洞、中子星的最私密信息。LIGO 的发现开创了多信使天文学的新纪元，LISA 将把这一窗口扩展到宇宙中最大质量的天体，并有望揭示早期宇宙相变的遗迹。

## 跨领域连接

- **双中子星并合与千新星**（`binary-neutron-star-merger-kilonova.md`）：GW170817 是迄今最丰富的多信使事件
- **脉冲星计时阵列**（`../致密天体/pulsar-timing-array.md`）：PTA 与 LIGO、LISA 覆盖互补的引力波频率窗口
- **黑洞自旋测量**（`../致密天体/black-hole-spin-measurement.md`）：引力波波形精确测量并合黑洞自旋
- **事件视界望远镜**（`事件视界望远镜.md`）：引力波定位 + EHT 多波段联合是未来多信使的方向

## 参考文献

- Abbott, B.P. et al. (LIGO Scientific Collaboration and Virgo Collaboration) (2016). Observation of gravitational waves from a binary black hole merger. _Physical Review Letters_, 116, 061102.
- Abbott, B.P. et al. (2017). GW170817: Observation of gravitational waves from a binary neutron star inspiral. _Physical Review Letters_, 119, 161101.
- Armano, M. et al. (2016). Sub-femto-g free fall for space-based gravitational wave observatories. _Physical Review Letters_, 116, 231101.
- Abbott, R. et al. (GWTC-3) (2023). GWTC-3: Compact binary coalescences observed by LIGO and Virgo during the second part of the third observing run. _Physical Review X_, 13, 041039.
- Amaro-Seoane, P. et al. (2017). Laser Interferometer Space Antenna. arXiv:1702.00786.

## 延伸阅读

- Maggiore, M. (2007). _Gravitational Waves: Theory and Experiments_ (Vol. 1). Oxford University Press. — 引力波理论的经典教材
- Sathyaprakash, B.S. & Schutz, B.F. (2009). Physics, astrophysics and cosmology with gravitational waves. _Living Reviews in Relativity_, 12, 2. — 引力波科学目标综述
- Robson, T., Cornish, N.J., & Liu, C. (2019). The construction and use of LISA sensitivity curves. _Classical and Quantum Gravity_, 36, 105011. — LISA 灵敏度和科学能力详细分析

---
title: 脉冲星计时阵列
titleEn: Pulsar Timing Array
category: 致密天体物理学
tags: [脉冲星, 计时阵列, 引力波背景, NANOGrav, IPTA, 纳赫兹引力波]
updated: 2026-06-13
---

# 脉冲星计时阵列：用星际时钟倾听引力波的低音

## 概述

毫秒脉冲星（millisecond pulsar，MSP）是自然界最稳定的时钟之一：它们自转周期介于 $1$ 到 $30$ 毫秒，长期稳定性与原子钟相当，甚至在某些时间尺度上超越原子钟。**脉冲星计时阵列**（Pulsar Timing Array，PTA）利用数十颗分布在银河系各方向的毫秒脉冲星，将整个银河系变成一台引力波探测器。

其原理是：穿过地球与各颗脉冲星之间空间的引力波，会系统性地延迟或提前脉冲到达时间，且不同方向上的延迟存在特征性的角关联——**赫尔宾斯-道-里曼（Hellings-Downs）曲线**。2023 年，全球多个 PTA 团队同时宣布，首次以置信度超过 $4\sigma$ 的水平探测到疑似**纳赫兹引力波背景**（gravitational wave background, GWB）的信号，引发了广泛关注。

## 毫秒脉冲星：被"回收"的宇宙时钟

普通脉冲星（旋转周期约 $0.1$–$10$ 秒）由于电磁辐射和粒子风的制动，自转逐渐减慢，寿命约数百万至数千万年。然而，约 $10\%$ 的脉冲星却是每秒旋转数百圈的**毫秒脉冲星**（MSP），它们来自**"回收"过程**（recycling）：

在双星系统中，中子星通过从伴星（通常是低质量恒星）吸积物质和角动量，被加速到毫秒级自转周期，同时自转减慢率极低（$\dot{P} \sim 10^{-20}$ s/s）。被回收的毫秒脉冲星仿佛被"再次点燃"，具有极低的特征年龄（$\tau_c = P/(2\dot{P})$）和极高的自转稳定性。

脉冲星计时的精度用**到达时间残差**（timing residual）来衡量——即观测到达时间与精确模型预测到达时间的差异。最佳毫秒脉冲星的计时残差可低至约 $50$–$100$ ns（纳秒），这为探测引力波引起的微小时间延迟（纳秒量级）提供了可能。

## Hellings-Downs 曲线：引力波的特征指纹

引力波经过后，空间发生应变，沿不同方向传播的光（或无线电波）被推迟或提前。来自不同方向的脉冲星对，其计时残差之间的相关性由**赫尔宾斯-道-里曼关系**（Hellings & Downs 1983，_The Astrophysical Journal Letters_，265，L39）给出：

$$\Gamma(\theta) = \frac{3}{2}x\ln x - \frac{x}{4} + \frac{1}{2} + \frac{1}{2}\delta(\hat{n}_1, \hat{n}_2)$$

其中 $x = (1-\cos\theta)/2$，$\theta$ 是两颗脉冲星在天球上的角间距。Hellings-Downs 曲线预言：

- 同一方向（$\theta = 0$）：最大正相关（$+1$）
- 约 $\theta \approx 90°$：接近零相关
- 约 $\theta \approx 120°$：最大负相关（$-1/2$）
- 对径（$\theta = 180°$）：约 $+1/4$ 的正相关

这种特殊的角关联是**各向同性引力波背景**的独特标志，任何其他共同系统误差（如时钟误差、地球自转模型误差）都不会产生完全相同的模式。

## 2023 年的突破性探测

2023 年 6 月至 7 月，全球四个主要 PTA 团队几乎同步公布了探测到纳赫兹引力波背景的证据：

- **NANOGrav**（北美纳赫兹引力波天文台）：分析 15 年、68 颗脉冲星的数据，以 $> 3\sigma$ 水平发现 Hellings-Downs 相关（Agazie et al. 2023，_The Astrophysical Journal Letters_，951，L8）
- **EPTA**（欧洲脉冲星计时阵列）：使用 25 年数据，独立发现一致信号（Antoniadis et al. 2023，_Astronomy & Astrophysics_，678，A50）
- **PPTA**（澳大利亚 Parkes 脉冲星计时阵列）：同期发布类似结果（Reardon et al. 2023，_The Astrophysical Journal Letters_，951，L6）
- **CPTA**（中国脉冲星计时阵列，基于 FAST）：使用 57 颗脉冲星数据，同样发现相似信号（Xu et al. 2023，_Research in Astronomy and Astrophysics_，23，075024）

四个团队的结果在信号特征（频谱斜率、振幅）上高度一致，且 Hellings-Downs 角相关性的检测置信度约为 $2$–$4\sigma$（各团队估算略有差异）。这是纳赫兹引力波天文学的历史性时刻，但绝大多数研究者认为目前尚不足以宣称"确认"探测，因为 Hellings-Downs 相关的显著性仍需更多数据提升。

## 纳赫兹引力波的可能来源

探测到的引力波背景（如果确认）频率约为 $1$–$100$ nHz（对应周期约 $10$–$1000$ 年），远低于 LIGO 探测的赫兹到千赫兹频段。其可能来源包括：

### 超大质量黑洞双星并合背景（最可能的解释）

宇宙中无数个超大质量黑洞双星（质量 $10^7$–$10^{10}\,M_\odot$）在画廊漫长的轨道衰减过程中，持续发射纳赫兹引力波，叠加形成随机背景。这是目前最受支持的解释，也与信号振幅量级基本一致（Phinney 2001，_The Astrophysical Journal Letters_，554，L37）。

然而，信号的**谱形**与简单的超大质量黑洞双星背景预测有微小偏差（信号功率谱可能比预期更平坦），暗示可能还有其他物理效应（如环境相互作用使双星轨道衰减加快）或不同的信号来源。

### 宇宙早期相变

宇宙在冷却过程中可能发生的一阶相变（如宇宙电弱相变或 QCD 相变）会产生随机引力波背景，频率取决于相变温度。

### 宇宙弦网络

如果宇宙早期存在拓扑缺陷（宇宙弦），弦环在振荡和自我交叉过程中发射引力波，形成功率律谱的背景。

### 原初引力波背景

暴胀时期产生的引力波可能延伸到纳赫兹频段，但标准慢滚暴胀的预测幅度通常远低于当前探测水平。

## FAST 与未来的 PTA

中国 500 米口径球面射电望远镜 **FAST**（Five-hundred-meter Aperture Spherical Telescope）于 2016 年竣工，是目前世界上最大、最灵敏的单口径射电望远镜，其观测能力将大幅提升 CPTA 的精度。FAST 能够发现更多适合计时的毫秒脉冲星，并对现有计时脉冲星进行更高精度的测量（时间残差有望低至 $\sim 10$ ns）。

**平方千米阵列**（Square Kilometre Array，SKA）建成后（核心部分预计 2030 年代），将使全球 PTA 灵敏度提升一到两个数量级，有望在纳赫兹引力波天文学领域实现：

- 精确重建引力波背景的频谱
- 探测单个超大质量黑洞双星系统的持续引力波
- 可能分辨引力波背景的各向异性（不同天区亮度不同）

## 为什么这很重要

脉冲星计时阵列打开了引力波天文学的低频窗口。LIGO/Virgo 探测恒星级天体在最后时刻的并合，而 PTA 探测的是宇宙中最大质量天体（超大质量黑洞双星）的长期演化，以及宇宙早期相变的遗迹。如果 2023 年的信号得到确认，它将是继 LIGO 首次探测引力波（2015 年）之后，引力波天文学的第二次重大革命——而且是在完全不同的频率窗口和物理机制下实现的。

## 跨领域连接

- **引力波探测器 LIGO 与 LISA**（`../多信使天文学/引力波探测器LIGO与LISA.md`）：PTA 探测纳赫兹段，LIGO 探测赫兹到千赫兹段，LISA 探测毫赫兹段，三者覆盖互补的引力波频率范围
- **超大质量黑洞**（`../致密天体/supermassive-black-holes.md`）：超大质量黑洞双星是 PTA 信号的最可能来源
- **星系形成与演化**（`../星系形成与演化.md`）：星系并合导致超大质量黑洞双星的形成，是 PTA 引力波的上游过程
- **中子星与脉冲星**（`../致密天体/中子星与脉冲星.md`）：PTA 所用的毫秒脉冲星是中子星的一个特殊子类

## 参考文献

- Hellings, R.W. & Downs, G.S. (1983). Upper limits on the isotropic gravitational radiation background from pulsar timing analysis. _The Astrophysical Journal Letters_, 265, L39–L42.
- Agazie, G. et al. (NANOGrav Collaboration) (2023). The NANOGrav 15-year data set: Evidence for a gravitational-wave background. _The Astrophysical Journal Letters_, 951, L8.
- Reardon, D.J. et al. (2023). Search for an isotropic gravitational-wave background with the Parkes Pulsar Timing Array. _The Astrophysical Journal Letters_, 951, L6.
- Xu, H. et al. (2023). Searching for the nano-Hertz stochastic gravitational-wave background with the Chinese Pulsar Timing Array. _Research in Astronomy and Astrophysics_, 23, 075024.
- Phinney, E.S. (2001). A practical theorem on gravitational wave backgrounds. _The Astrophysical Journal Letters_, 554, L37–L40.

## 延伸阅读

- Burke-Spolaor, S. et al. (2019). The astrophysics of nanohertz gravitational waves. _The Astronomy and Astrophysics Review_, 27, 5. — PTA 引力波天文学的全面科普综述
- Verbiest, J.P.W. et al. (2016). The International Pulsar Timing Array: First data release. _Monthly Notices of the Royal Astronomical Society_, 458, 1267–1288. — IPTA 数据的标准参考
- Sesana, A. (2013). Gravitational wave emission from massive black hole binaries. _Classical and Quantum Gravity_, 30, 224014. — 超大质量黑洞双星引力波背景理论综述

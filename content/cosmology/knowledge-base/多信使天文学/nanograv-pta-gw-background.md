---
title: NANOGrav与纳赫兹引力波背景
titleEn: NANOGrav and the Nanohertz Gravitational Wave Background
category: 多信使天文学
tags: [NANOGrav, 脉冲星计时, 引力波背景, 超大质量黑洞, nHz引力波, IPTA]
updated: 2026-06-13
---

# NANOGrav与纳赫兹引力波背景：宇宙最低频的回响

## 概述

**NANOGrav**（North American Nanohertz Observatory for Gravitational Waves，北美纳赫兹引力波天文台）是美国和加拿大天文学家利用 Arecibo 射电望远镜（2020 年前）和绿岸望远镜（GBT）长期监测毫秒脉冲星计时的合作计划，自 2004 年起持续运行。

2023 年 6 月 29 日，NANOGrav 发布了基于 **15 年数据集**（包含 68 颗毫秒脉冲星）的分析结果，以超过 $3\sigma$ 的显著性报告发现**赫尔宾斯-道-里曼（Hellings-Downs）角相关性**——引力波背景最关键的"指纹"（Agazie et al. 2023，_The Astrophysical Journal Letters_，951，L8）。同期，欧洲（EPTA）、澳大利亚（PPTA）和中国（CPTA）的三个独立 PTA 团队也发布了一致的结果，共同构成了纳赫兹引力波天文学的历史性时刻。

## NANOGrav 的发展历史

### 从 Arecibo 到 GBT

NANOGrav 的核心观测工具是：

**Arecibo 望远镜**（305 米口径，波多黎各）：世界最大的单口径射电望远镜之一，直到 2020 年 12 月坍塌前，是 NANOGrav 灵敏度最高的观测平台。其极高灵敏度使得对毫秒脉冲星的每次脉冲计时能达到约 $100$–$200$ ns 的残差精度（最好的脉冲星）。

**绿岸望远镜（GBT）**（$100$ 米×$110$ 米，美国西弗吉尼亚）：Arecibo 坍塌后成为 NANOGrav 的主力望远镜。

**CHIME**（2018 年加入）：拓展了南天覆盖，并提供了多个新毫秒脉冲星的日常监测。

### 数据集的演化

| 数据集        | 发布年份 | 脉冲星数 | 时间跨度 | 主要发现                           |
| ------------- | -------- | -------- | -------- | ---------------------------------- |
| 5 年数据集    | 2013     | 17 颗    | 5 年     | 引力波上限                         |
| 9 年数据集    | 2015     | 37 颗    | 9 年     | 共同红噪声初步证据                 |
| 11 年数据集   | 2018     | 45 颗    | 11 年    | 共同谱红噪声                       |
| 12.5 年数据集 | 2020     | 47 颗    | 12.5 年  | 共同红噪声（$\sim 3.7\sigma$）     |
| 15 年数据集   | 2023     | 68 颗    | 15 年    | Hellings-Downs 相关（$> 3\sigma$） |

从 2020 年的 12.5 年数据集起，NANOGrav 就已探测到所有脉冲星共同的低频红噪声，但当时尚未明确看到 Hellings-Downs 角相关——这是区分引力波背景和其他共同误差（如时钟误差）的关键。

## 15年数据集：Hellings-Downs 相关的探测

### 信号特征

2023 年数据分析的主要结果（Agazie et al. 2023，_The Astrophysical Journal Letters_，951，L8）：

**功率谱**：在频率 $f \approx 1/T$（约 $1/15$ yr$^{-1}$，即约 $2$ nHz）到约 $10$–$20$ nHz 的范围内，探测到一个红噪声功率谱，可用幂律描述：

$$S(f) = \frac{A_{GWB}^2}{12\pi^2} \left(\frac{f}{f_{ref}}\right)^{-\gamma} f_{ref}^{-3}$$

拟合给出振幅 $\log_{10}(A_{GWB}) \approx -14.7$（在 $f_{ref} = 1/\text{yr}$ 处的应变振幅），谱指数 $\gamma \approx 3.2$（对应的空间应变功率谱斜率）。

**Hellings-Downs 相关**：对 68 颗脉冲星两两组合（约 $2278$ 对），计算不同角间距 $\theta$ 的计时残差相关性，结果与 Hellings-Downs 曲线的吻合显著性约 $2$–$4\sigma$（不同统计方法）。

### 与超大质量黑洞双星模型的比较

最自然的解释是宇宙中无数超大质量黑洞双星（SMBBH）发射的引力波叠加形成随机背景。对于圆轨道、引力波驱动衰减的 SMBBH，理论预言功率谱斜率 $\gamma = 13/3 \approx 4.33$（Phinney 2001）。

观测值 $\gamma \approx 3.2$ 比理论预言更平坦，意味着谱形在高频端偏平（相对于纯 GW 驱动的 SMBBH 预言）。可能的解释：

1. **环境效应**：SMBBH 的轨道衰减除引力波外，还受到星系中心恒星（"硬化"）和气体的影响，可能在低频端（长周期）加快衰减，改变谱形
2. **SMBBH 参数分布**：若 SMBBH 质量函数、红移分布、偏心率分布偏离假设，谱斜率会变化
3. **不同来源**：谱的平坦化也可能部分来自宇宙相变、宇宙弦等非 SMBBH 信号

## 其他PTA团队的同期结果

### EPTA（欧洲脉冲星计时阵列）

使用欧洲多台射电望远镜（WSRT/MeerKAT、Effelsberg、Lovell、Nançay、SRT），数据跨度约 $25$ 年，$24$ 颗毫秒脉冲星。DR2 数据集同样发现一致的引力波背景证据（Antoniadis et al. 2023，_Astronomy & Astrophysics_，678，A50），且与 NANOGrav 信号特征高度一致。

### PPTA（帕克斯脉冲星计时阵列）

使用澳大利亚 Parkes 64 米望远镜（2020 年后主要使用 MeerKAT 阵列增强），DR3 数据集结果（Reardon et al. 2023，_The Astrophysical Journal Letters_，951，L6）同样显示 Hellings-Downs 相关的证据，振幅与其他团队一致。

### CPTA（中国脉冲星计时阵列）

使用中国 FAST 500 米望远镜，对 57 颗脉冲星的约 $5$ 年数据进行分析（Xu et al. 2023，_Research in Astronomy and Astrophysics_，23，075024）。尽管数据时间跨度较短，FAST 的极高灵敏度使得单颗脉冲星计时精度极高（约 $50$–$100$ ns），在较短时间内已达到可与其他 PTA 竞争的灵敏度。

### IPTA（国际脉冲星计时阵列）

IPTA 是 NANOGrav、EPTA、PPTA 的联合体，合并数据可进一步提升灵敏度。对四个团队数据的联合分析将是下一步关键。

## 科学意义

### 超大质量黑洞双星演化

如果信号确认为 SMBBH 背景，它将是：

- 第一次**直接探测**到超大质量黑洞双星在引力波驱动下的轨道演化（而非单次并合事件）
- 对 SMBBH 质量函数、并合率和宇宙学演化的约束——反映了星系并合历史的"引力波档案"
- 对"最后秒差距问题"（last-parsec problem，SMBBH 如何从 $\sim 1$ pc 进一步收紧以发射引力波）的约束

### 早期宇宙物理（如果不是 SMBBH）

若信号的谱形不符合 SMBBH 预期，可能暗示宇宙早期的新物理：

- **宇宙弦**：网络拓扑缺陷的振荡产生特定幂律引力波背景（$\gamma \neq 13/3$）
- **一阶宇宙相变**：如果宇宙在冷却时经历了某个一阶相变（电弱、QCD 或新物理相变），碰撞的相变气泡产生引力波，谱型与 SMBBH 不同
- **原初引力波**：暴胀期间放大的张量扰动，通常在 nHz 频段太弱，但某些非标准暴胀模型可能有显著信号

### 对哈勃张力的潜在贡献

若 SMBBH 背景的振幅和谱与对宇宙 SMBBH 质量函数的精确模型结合，未来可以约束宇宙合并率随时间的演化，进而约束宇宙学参数（$H_0$、$\Omega_m$ 等），提供独立于 CMB 和造父变星的新方法。

## 未来展望

**FAST 的主导角色**：FAST 每年对约 $60$–$80$ 颗毫秒脉冲星进行计时，灵敏度比 Arecibo 高 $3$–$5$ 倍，未来 $5$–$10$ 年的数据积累将大幅提升 Hellings-Downs 相关的置信度，并开始分辨引力波背景的各向异性（不同天区背景强度不同）。

**SKA 的变革**：平方千米阵列建成后，PTA 灵敏度提升约一个数量级，预计可以：

- 将 Hellings-Downs 相关置信度提升到 $> 10\sigma$
- 探测单个近距 SMBBH 系统的持续引力波
- 可能分辨背景各向异性，重建引力波背景的"天图"

## 为什么这很重要

NANOGrav 的 2023 年结果是引力波天文学的第二次大革命——在完全不同的频率窗口（nHz vs. 百 Hz）和完全不同的物理来源（宇宙背景 vs. 单次并合）上实现。LIGO 打开了"高频"窗口，PTA 打开了"低频"窗口，而 LISA 将在未来打开"中频"毫赫兹窗口。三个窗口合在一起，形成覆盖 $10^{-9}$–$10^3$ Hz 的完整引力波天文学频谱，每个窗口都有其独特的宇宙信息。

## 跨域连接

- **[[星系合并与相互作用|星系合并与相互作用]]**：观测到的谱指数比纯引力波驱动的圆轨道双星预言更平，把星系核里恒星与气体对双星轨道的作用加进来会改变低频端的衰减速率。推论是：谱形不是黑洞的性质，而是"黑洞怎么被星系送到一起"的性质，纳赫兹背景因此变成对星系并合史的一次测量。
- **[[meta-analysis-evidence-synthesis|元分析与证据综合]]**：同一份数据换一种统计方法，角相关的吻合显著性就在两到四个标准差之间移动；而四个团队用四套独立数据、四条独立管线得到了方向一致的信号。推论是：**判据不在数字大小，而在系统误差是否独立——这就是社区称其为"证据"而非"发现"的理由**。
- **[[stochastic-process|随机过程]]**：随机背景是海量不可分辨源的叠加，只能用功率谱和两点相关来描述；单个双星则是一条相位连贯的窄带信号。推论是：两者的判别方式完全不同，背景靠角相关，单源靠周期性——所以找到一个电磁对应体，是把统计结论钉成个案的唯一途径。
- **[[phase-transitions-and-critical-phenomena|相变与临界现象]]**：如果宇宙早期某次相变是一阶的，碰撞的相变气泡会辐射引力波，谱形与黑洞双星背景不同。推论是：这扇窗口同时是一台对撞机替代品，能约束远超地面加速器能量的早期物理；**但目前的谱形既容得下黑洞双星，也容得下宇宙弦或相变，来源之争没有定论**。
- **[[monte-carlo-methods|蒙特卡洛方法]]**：要从几十颗星的残差里同时解出逐星噪声、公共谱与角相关，是一个高维贝叶斯采样问题，报出来的显著性本身也是采样估计的产物。推论是：换一组噪声先验，数字就会移动，这也是它与对撞机那种阈值不可直接对比的根本原因。

## 参考文献

- Agazie, G. et al. (NANOGrav Collaboration) (2023). The NANOGrav 15-year data set: Evidence for a gravitational-wave background. _The Astrophysical Journal Letters_, 951, L8.
- Antoniadis, J. et al. (EPTA Collaboration) (2023). The second data release from the European Pulsar Timing Array. _Astronomy & Astrophysics_, 678, A50.
- Reardon, D.J. et al. (2023). Search for an isotropic gravitational-wave background with the Parkes Pulsar Timing Array. _The Astrophysical Journal Letters_, 951, L6.
- Xu, H. et al. (2023). Searching for the nano-Hertz stochastic gravitational-wave background with the Chinese Pulsar Timing Array. _Research in Astronomy and Astrophysics_, 23, 075024.
- Phinney, E.S. (2001). A practical theorem on gravitational wave backgrounds. _The Astrophysical Journal Letters_, 554, L37.

## 延伸阅读

- Burke-Spolaor, S. et al. (2019). The astrophysics of nanohertz gravitational waves. _The Astronomy and Astrophysics Review_, 27, 5.
- Sesana, A. et al. (2016). Measuring the expansion of the universe with gravitational-wave standard sirens. _Physical Review Letters_, 116, 231102.
- Arzoumanian, Z. et al. (NANOGrav Collaboration) (2020). The NANOGrav 12.5-year data set: Search for an isotropic stochastic gravitational-wave background. _The Astrophysical Journal Letters_, 905, L34.

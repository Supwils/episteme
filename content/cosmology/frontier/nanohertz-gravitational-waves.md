---
title: 纳赫兹引力波背景：脉冲星阵列开启引力波天文学新窗口
title_en: The Nanohertz Gravitational-Wave Background — Pulsar Timing Arrays Open a New Window
status: published
updated: 2026-06-12
category: 引力波天文学
horizon: 2020s
order: 4
tags:
  - 引力波
  - 脉冲星计时阵列
  - NANOGrav
  - 超大质量黑洞
  - 随机引力波背景
researchers:
  - NANOGrav Collaboration
  - PPTA（澳大利亚脉冲星计时阵列）
  - EPTA（欧洲脉冲星计时阵列）
  - InPTA（印度脉冲星计时阵列）
  - CPTA（中国脉冲星计时阵列）
institutions:
  - West Virginia University / Cornell University（NANOGrav 核心机构）
  - Parkes 射电望远镜（澳大利亚）
  - 中国天眼（FAST，贵州）
  - 欧洲射电网络（EPTA）
related:
  - hubble-tension
  - desi-dark-energy
---

# 纳赫兹引力波背景：脉冲星阵列开启引力波天文学新窗口

2023年6月29日，人类同时在四大洲宣布了同一件事。

NANOGrav（北美）、PPTA（澳大利亚）、EPTA+InPTA（欧洲与印度）、CPTA（中国）四个脉冲星计时阵列合作组，在同一天各自发布论文，宣布独立发现了**纳赫兹频段随机引力波背景**的证据。[^pta2023]

这是引力波天文学的第二扇大门被推开的时刻。

2015年，LIGO 首次探测到双黑洞并合产生的短暂引力波脉冲，引力波天文学诞生。这些波的频率在人耳能听到的范围（约数十到数百赫兹）。

而脉冲星计时阵列探测的，是频率比这低十亿倍的引力波——纳赫兹（$10^{-9}$ Hz），对应数十年甚至数百年的振荡周期。它们的来源，可能是宇宙中最重的双星系统：相互绕转的**超大质量黑洞对**，质量可达数亿到数百亿倍太阳质量。

## 破除误解：脉冲星是一把"银河系级别的尺子"

许多人以为引力波只能用干涉仪（像 LIGO 那样的激光臂）探测。对于高频引力波确实如此。但纳赫兹频段的波，波长以光年计，任何地面仪器都无法囊括——你需要一把大得多的尺子。

宇宙恰好提供了这样的尺子：**毫秒脉冲星（millisecond pulsars）**。

毫秒脉冲星是快速旋转的中子星，每秒自转数百次，每转一圈发射一束精确的射电脉冲。它们是宇宙中最精确的自然时钟之一，某些毫秒脉冲星的计时精度可达微秒级，长期稳定性甚至优于部分原子钟。

当引力波通过地球附近时，它会轻微拉伸或压缩时空，使地球到脉冲星的距离出现微小周期性变化，导致脉冲到达时间（pulse arrival time）出现系统性偏差——这就是脉冲星计时阵列（Pulsar Timing Array，PTA）探测引力波的基本原理。

关键在于：随机引力波背景会在所有脉冲星上留下**有特定空间相关性的信号**。这个相关性的形状（"Hellings-Downs 曲线"，由脉冲星对的角间距决定）是引力波本质的指纹——它预言了当两颗脉冲星位于某个角度时，它们的计时残差应该有怎样的正相关或负相关。

## 现场：2023年的里程碑

### NANOGrav 15年数据集

NANOGrav 的关键论文基于**15年**的观测数据，监测了67颗毫秒脉冲星。[^nanograv15]

结论的核心是两点：

1. **检测到公共谱噪声（common spectrum process）**：所有脉冲星的计时残差共享一个功率谱形状，这是随机引力波背景的特征之一。

2. **检测到 Hellings-Downs 角相关**：脉冲星对之间的计时残差相关性与角间距的关系，符合 Hellings-Downs 曲线预言，统计显著性约 **4σ**（贝叶斯因子超过 $10^{14}$：有 HD 相关的模型相对纯噪声模型的证据比）。[^nanograv15]

### 国际联合：四大 PTA 同步发布

与 NANOGrav 同日，其他三个 PTA 合作组发表了各自的独立分析：

| PTA          | 主要望远镜                    | 数据集长度 | 大约显著性          |
| ------------ | ----------------------------- | ---------- | ------------------- |
| NANOGrav     | Arecibo / GBT / CHIME         | 15年       | ~4σ                 |
| PPTA         | Parkes                        | 18年       | ~3.5σ               |
| EPTA + InPTA | Effelsberg / 南班克等 / uGMRT | 24年       | ~3σ（联合）         |
| CPTA         | FAST（500米口径）             | 3.4年      | ~4.6σ（强大灵敏度） |

四个完全独立的数据集、四种不同的分析管线、四套独立的系统误差，得到了方向一致的结论。这是最强力的交叉验证之一。

国际脉冲星计时阵列（IPTA）在2023年6月28日发表联合声明，将此定性为引力波天文学的重要里程碑。[^ipta_statement]

### 这个背景从哪里来？

Hellings-Downs 相关是引力波背景的必要条件，但不是充分条件——它没有直接告诉我们背景的来源。

目前最主流的候选源是**超大质量黑洞双星（SMBHB）的叠加**：

宇宙中，星系并合时中心的超大质量黑洞也会配对，逐渐螺旋向内，每绕转一圈损失一点引力辐射能量。在最后并合之前，它们在纳赫兹频段辐射引力波，而宇宙中大量这样的系统叠加，就产生了随机背景。

NANOGrav 的信号振幅和谱形状与超大质量黑洞双星群体模型**大体一致**，但细节尚有争议：

- 信号的振幅比某些模型预言的略高，可能意味着超大质量黑洞双星合并率比预期更高；
- 信号在低频端的谱斜率也提供了关于星系并合历史的线索。

**另一类候选解释——早期宇宙起源**，也正在认真讨论中：

- **宇宙弦网络（cosmic strings）**：拓扑缺陷，在宇宙相变中形成，振荡产生引力波；
- **一阶相变（first-order phase transitions）**：宇宙早期的相变如果是一阶，会产生强烈的引力波背景；
- **原初引力波谱的低频延伸**：暴胀期间产生的引力波，若谱足够"红"，也可能在纳赫兹贡献。

区分这些来源，是未来几年 PTA 科学的核心任务。

## 谁在做、做到了哪一步

### FAST 的加入改变格局

中国天眼（FAST）口径500米，是世界上最大的射电望远镜，灵敏度约为 Arecibo 的三倍。CPTA 仅用3.4年的数据就达到了约 4.6σ 的显著性，显示 FAST 将在未来 PTA 科学中扮演核心角色。

随着 FAST 数据积累，预计在未来5–10年内，CPTA 的单独结果将达到 5σ 确认级别，并开始能够分辨背景的角分布（即各向异性）。

### MeerKAT 与下一代望远镜

南非的 MeerKAT 射电望远镜阵列正在开展 MeerTime 计划，监测高质量毫秒脉冲星样本。平方公里阵列（SKA，计划2030年代初运行）将彻底改变这个领域的精度，将显著性远推 5σ 以上，并开始提供引力波背景来源的统计信息。

### 寻找单个双星

与随机背景的探测并行，NANOGrav 也在寻找**单个超大质量黑洞双星**的周期性引力波信号，这将是与光学或 X 射线观测交叉确认的关键机会。目前尚无确认的个体源，但搜索在继续。

## 代价与争议

### 4σ 不是发现

PTA 社区明确表示，当前结果是"证据"（evidence），而非"发现"（detection）。发现的标准通常要求 5σ，且被独立确认。

争议点之一在于：PTA 的"4σ"与粒子物理实验的"5σ"在统计意义上有本质区别——脉冲星计时数据中的系统误差（色散量变化、脉冲星自身噪声、星际介质色散）估计本身就存在不确定性，使得真实的显著性难以精确量化。

### 单脉冲星噪声建模

每颗脉冲星的"自身噪声"（intrinsic noise）必须被单独建模并从数据中减去，再寻找跨脉冲星的公共信号。这个减法过程的可靠性，是影响结果稳健性的关键技术挑战。不同分析策略对单脉冲星噪声的建模差异，是目前各 PTA 结果细节上不一致的重要原因。

### 来源之争：超大质量黑洞 vs. 早期宇宙

目前超大质量黑洞双星是最自然、也是社区内最有共识的解释，但早期宇宙信号的可能性并未被排除。区分两者的关键判据包括：

- **背景谱的精确测量**：不同来源预言不同的功率谱形状；
- **背景的各向异性**：不同来源的各向异性程度不同；
- **与电磁波段观测的交叉关联**：若能找到一个已知的超大质量黑洞双星对应体，将是强力证据。

## 未知的边界

- 目前4个 PTA 的结果在**振幅**上存在约 1.5–2σ 的不一致，这可能是统计涨落，也可能指向各组系统误差处理的不同——未来国际 PTA（IPTA）的联合数据集将是关键。
- 引力波背景是**各向同性还是各向异性**？若来自超大质量黑洞双星，理论上会有轻微各向异性（少数近邻双星贡献不均匀）；若来自宇宙弦或相变，各向异性特征不同。
- 能否探测到**单个周期性信号源**，并与电磁观测交叉确认？这是未来十年的核心目标之一。
- SKA 建成后，PTA 灵敏度将提升约10倍，届时才真正进入精密引力波宇宙学的时代。

## 跨域连接

- **天体物理**：脉冲星计时阵列的信号与星系并合历史深度耦合——宇宙中有多少星系经历了并合，并合时两个黑洞是否真的会"配对"，这些都是开放的星系演化问题。
- **广义相对论**：Hellings-Downs 曲线的形状是广义相对论预言的引力波极化模式的直接推论——PTA 的发现也是对广义相对论在超大尺度上的一项新检验。
- **宇宙学早期历史**：若背景中存在宇宙弦或相变成分，将提供超出当前粒子对撞机能量范围的宇宙早期相变信息，是粒子物理与宇宙学的交汇点。
- **数据科学**：PTA 的数据分析依赖复杂的贝叶斯推断，需要在高维参数空间中采样，是应用机器学习和统计推断方法的重要现实案例。

---

## 延伸阅读

- NANOGrav Collaboration. _The NANOGrav 15-year Data Set: Evidence for a Gravitational-Wave Background._ ApJL 951, L8 (2023). arXiv:2306.16213.
- NANOGrav Collaboration. _The NANOGrav 15-year Data Set: Constraints on Supermassive Black Hole Binaries from the Gravitational Wave Background._ ApJL 951, L50 (2023). arXiv:2306.16220.
- Reardon, D. J. et al. (PPTA). _Search for an Isotropic Gravitational-wave Background with the Parkes Pulsar Timing Array._ ApJL 951, L6 (2023). arXiv:2306.16215.
- EPTA Collaboration + InPTA Collaboration. _The second data release from the European Pulsar Timing Array._ A&A 678, A50 (2023). arXiv:2306.16214.
- Xu, H. et al. (CPTA). _Searching for the Nano-Hertz Stochastic Gravitational Wave Background with the Chinese Pulsar Timing Array._ Research in Astronomy and Astrophysics 23, 075024 (2023). arXiv:2306.16216.
- Hellings, R. W. & Downs, G. S. _Upper limits on the isotropic gravitational radiation background from pulsar timing analysis._ ApJL 265, L39 (1983).（Hellings-Downs 曲线的原始论文）
- IPTA 官方联合声明（2023-06-28）：https://ipta4gw.org/news/2023/06/28/IPTA_statement_on_PTA_results.html

[^pta2023]: 2023年6月29日，NANOGrav（arXiv:2306.16213）、PPTA（arXiv:2306.16215）、EPTA+InPTA（arXiv:2306.16214）、CPTA（arXiv:2306.16216）同步发布各自对纳赫兹引力波背景的独立证据。

[^nanograv15]: NANOGrav 15年数据集：67颗脉冲星，Hellings-Downs 相关约 4σ，贝叶斯因子 >$10^{14}$（arXiv:2306.16213）。

[^ipta_statement]: IPTA 国际脉冲星计时阵列 2023年6月28日联合声明。

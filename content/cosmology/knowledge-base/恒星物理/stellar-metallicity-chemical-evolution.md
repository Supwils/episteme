---
title: 恒星金属丰度与化学演化
titleEn: Stellar Metallicity and Chemical Evolution
category: 恒星物理
tags: [金属丰度, 化学演化, IMF, 闭箱模型, 银河系考古学, 超新星, 恒星产率]
updated: 2026-06-13
---

# 恒星金属丰度与化学演化：宇宙如何铸造重元素

## 概述

大爆炸只留下了氢（约 $75\%$）、氦（约 $25\%$）以及极少量的氘和锂-7。宇宙中所有更重的元素——从碳到铀——都是在随后几十亿年的恒星演化和超新星爆炸中合成的。追踪这些元素如何积累、扩散、被再次收纳进新一代恒星，是**宇宙化学演化**（Galactic Chemical Evolution, GCE）的核心问题。

通过分析不同年龄恒星（用金属丰度代理年龄）的化学组成，天文学家可以重建银河系的"化学考古记录"——就像地质学家从岩层中读取地球历史一样，只是时间尺度是数十亿年，地点是整个银河系。

## 破除误解：天文学里的"金属"包括氧和碳

天文学家说的**金属**（metallicity）指的是**比氦重的所有元素**——氧、碳、氮、氖全算金属，尽管化学上它们是非金属。

这不是术语上的马虎，它反映了一个物理事实：**宇宙一开始只有氢和氦**（见[[大爆炸理论|太初核合成]]），此后所有其他元素都由恒星制造。所以对天文学来说，唯一有意义的划分是"原初的"与"后天造的"，而不是化学周期表上的金属性。

由此还有一条容易混淆的记法：**金属丰度 $Z$ 的绝大部分其实是氧**。太阳的 $Z \approx 0.014$（按质量约 1.4%），其中氧就占了将近一半。人们说"这颗恒星金属丰度低"，实际主要是在说它含氧少。

**第二个误解：金属丰度不是年龄。** 常听到"金属丰度越低越古老"，这在同一个星系的同一处大致成立，但作为普遍规律是错的。原因是化学增丰**不是全宇宙同步的**——它取决于局部的恒星形成史。一个恒星形成极其活跃的星系，可能在很早的宇宙里就把金属丰度拉得很高；而一个至今几乎不形成恒星的矮星系，其恒星今天仍然极度金属贫乏。

所以严格说来，金属丰度测的是**这团气体在形成这颗恒星之前，经历过多少代恒星的加工**，而不是过了多少年。**它是一个"世代计数器"，不是时钟。**

## 现场：一张 α/Fe 图如何还原星系的一生

化学演化最有力的工具是一张二维图：横轴是铁丰度 $[\mathrm{Fe/H}]$，纵轴是 α 元素与铁的比 $[\alpha/\mathrm{Fe}]$（α 元素指氧、镁、硅、钙这类由 α 粒子逐个堆叠而成的核）。

之所以有用，是因为**两类超新星的时间尺度差了两个数量级**：

- **核心坍缩超新星**（大质量恒星，寿命几百万年）：主要抛出 **α 元素**，铁较少。它们在恒星形成开始后**几百万年**就登场。
- **[[标准烛光与Ia超新星测距|Ia 型超新星]]**（白矮星吸积到临界质量爆炸）：主要抛出**铁族元素**。但白矮星要先由中低质量恒星演化而来，所以要**等上亿到十亿年**才开始大量出现。

于是这张图上出现一条特征形状：

1. **早期**：只有核心坍缩超新星在工作，气体被富 α 的物质增丰 → 图上是一条**高 $[\alpha/\mathrm{Fe}]$ 的平台**。
2. **约十亿年后**：Ia 超新星开始批量供铁，$[\mathrm{Fe/H}]$ 上升而 $[\alpha/\mathrm{Fe}]$ 下降 → 曲线出现一个**下折的膝部（knee）**。

**膝部的位置直接读出这个星系形成恒星有多快。** 恒星形成剧烈而短暂的系统（如银河系厚盘、椭圆星系），在 Ia 超新星赶到之前就把铁丰度推得很高，膝部出现在高 $[\mathrm{Fe/H}]$ 处；而形成缓慢的矮星系，膝部出现得很早、很靠左。

**这就是"银河系考古学"的核心方法**：今天测一批恒星的化学成分，就能反推出它们诞生时那团气体的历史，从而重建星系过去上百亿年的恒星形成史——**不需要看到过去，只需要读懂化石**。近年盖亚卫星（见[[宇宙学观测--天体测量与盖亚卫星|天体测量与盖亚卫星]]）把运动学数据与化学丰度结合，正是靠这套方法识别出了银河系早期并合留下的恒星族群。

## 元素合成的核心机制

不同元素有不同的合成渠道：

| 元素类别                                  | 主要来源                       | 时标                |
| ----------------------------------------- | ------------------------------ | ------------------- |
| H、He                                     | 大爆炸（BBN）                  | $< 20$ 分钟         |
| C、N、O（部分）                           | 中低质量 AGB 恒星 + 大质量恒星 | $10^8$–$10^{10}$ yr |
| $\alpha$ 元素（O、Ne、Mg、Si、S、Ar、Ca） | 核坍缩超新星（CC-SN）          | $\sim 10^7$ yr      |
| Fe 族元素（Cr、Mn、Fe、Ni）               | Ia 型超新星（主要）+ CC-SN     | $10^8$–$10^{10}$ yr |
| 弱 s 过程（Sr、Y、Zr）                    | 大质量恒星碳/氦燃烧壳层        | $10^7$ yr           |
| 强 s 过程（Ba、La、Ce、Pb）               | 中低质量 AGB 恒星              | $10^8$–$10^9$ yr    |
| r 过程（Eu、Au、Pt、U 等）                | 中子星并合（和/或罕见 CC-SN）  | $10^6$–$10^9$ yr    |

这一图景在 2017 年得到了突破性证实：引力波事件 GW170817（中子星并合）的同步千新星（kilonova）光谱显示了 r 过程元素（尤其是 Sr、La 等）的特征（Smartt et al. 2017，_Nature_，551，75）。

## 简单闭箱模型

最基础的 GCE 框架是**简单闭箱模型**（Simple Closed-Box Model），假设：

1. 系统初始无金属（$Z = 0$）
2. 气体在内部转化为恒星，无流入或流出
3. 恒星即时增丰（瞬时回收近似）

在这些假设下，金属丰度 $Z$ 与气体质量分数 $\mu = M_{gas}/(M_{gas}+M_{stars})$ 的关系为：

$$Z = -p \ln \mu$$

其中 $p$ 是**产率**（yield），即每形成 $1\,M_\odot$ 恒星所向星际介质返还的金属质量。

**简单闭箱模型的重要预言**：在 $Z < Z_\odot / 2$ 的星族中，恒星数量应当随金属丰度降低而增加。然而，在太阳邻域观测到的金属贫乏恒星数目远少于预测——这就是著名的"G矮星问题"（G-dwarf Problem）。

**G矮星问题的解决**：简单闭箱假设的"无流入"是问题所在。银河系在形成过程中持续有低金属丰度气体流入，稀释了星际介质，使得贫金属恒星形成率低于预期。纳入气体流入的**流入模型**（infall model，如 Chiappini et al. 1997 的双内流模型）可以自然解释 G 矮星分布（Chiappini, Matteucci & Gratton 1997，_ApJ_，477，765）。

## $[\alpha/\text{Fe}]$-$[\text{Fe}/\text{H}]$ 图：化学演化的指纹

$[\alpha/\text{Fe}]$ vs. $[\text{Fe}/\text{H}]$ 图是 GCE 研究中最信息丰富的诊断工具之一：

- **低金属丰度端（$[\text{Fe}/\text{H}] \lesssim -1$）**：$[\alpha/\text{Fe}] \approx +0.3$ 至 $+0.5$，反映早期仅有 CC-SN 增丰
- **膝点（knee）约在 $[\text{Fe}/\text{H}] \sim -1$**：Ia 型超新星开始大量贡献 Fe，$[\alpha/\text{Fe}]$ 开始下降
- **高金属丰度端（$[\text{Fe}/\text{H}] \sim 0$）**：$[\alpha/\text{Fe}] \approx 0$，CC-SN 和 Ia-SN 贡献趋于平衡

这张图在不同星系环境中表现不同：

- **椭圆星系**：由于星形成历史短暂且强烈，即使在高金属丰度时也保持高 $[\alpha/\text{Fe}]$
- **矮球状星系**：星形成缓慢，Ia 型超新星来得及在低金属丰度时就贡献 Fe，导致"膝点"出现在更低的 $[\text{Fe}/\text{H}]$（约 $-2$）

这意味着，银河系晕的金属贫乏恒星**不太可能**是从这些矮球状星系并入的（其 $[\alpha/\text{Fe}]$ 模式不匹配），对银河系晕的组装历史有直接约束（Tolstoy et al. 2009，_ARA&A_，47，371）。

## 银河系考古学：从当下推算过去

"**银河系考古学**"（Galactic Archaeology）是利用今天仍存在的恒星的化学成分来重建银河系的形成历史。核心思想：

- **低质量恒星寿命超过宇宙年龄**（$1\,M_\odot$ 主序寿命约 $10$ Gyr），因此今天银晕中的贫金属恒星是宇宙最早期的化学"化石"
- 一颗恒星的化学成分在主序阶段基本不改变（轻微混合除外），忠实记录了其形成时星际介质的化学状态

近年来大规模分光巡天（APOGEE、GALAH、Gaia-ESO 等）已经系统测量了数十万颗恒星的详细元素丰度，使 GCE 进入"精确化学考古"时代：

- **APOGEE**（Apache Point Observatory Galactic Evolution Experiment）：为超过 $600{,}000$ 颗恒星测量了约 20 个元素的丰度（Majewski et al. 2017）
- **GALAH**（GALactic Archaeology with HERMES）：约 $600{,}000$ 颗恒星，约 30 个元素（De Silva et al. 2015）

### 化学标签（Chemical Tagging）

同一个原始气体云中形成的恒星应具有相同的化学成分——这是"化学标签"假说（Freeman & Bland-Hawthorn 2002）的基础。通过精确的多元素丰度，原则上可以识别出在银河系历史中已经被动力学混合打散的恒星群体的"化学家族"。然而，实践中化学标签在高金属丰度区域受到简并问题的困扰，目前争议较大（Ness et al. 2022）。

## 初始质量函数（IMF）对化学演化的影响

**初始质量函数**（Initial Mass Function, IMF）描述了单次星形成事件中不同质量恒星的数量分布，对 GCE 结果有深刻影响：

$$\xi(m) \propto m^{-\Gamma}$$

- **Salpeter IMF（1955）**：$\Gamma = 2.35$，适用于 $m > 0.5\,M_\odot$
- **Kroupa IMF（2001）**：分段幂律，低质量段变平
- **Chabrier IMF（2003）**：在低质量端更平缓，包括系统误差的对数正态形式

大质量恒星的比例（IMF 高质量端）决定了 CC-SN 的频率，直接影响 $\alpha$ 元素的增丰效率。某些高红移星暴星系的观测暗示 IMF 可能随环境变化（"top-heavy" IMF），这将深刻影响对这些星系化学演化的推断（Kroupa et al. 2013，_A&A_，549，A71）。

## 跨领域连接

- **星族I与星族II恒星**（[[stellar-populations|星族I与星族II恒星]]）：金属丰度是两类星族的定义特征
- **双星演化与质量转移**（[[binary-star-evolution|双星演化与质量转移]]）：Ia 型超新星来自双星演化，是 Fe 增丰的主要来源
- **太初核合成**（[[太初核合成]]）：BBN 提供了 GCE 的初始化学条件
- **恒星核合成**（[[恒星核合成]]）：各核合成渠道的产率是 GCE 模型的输入

## 参考文献

- Chiappini, C., Matteucci, F., & Gratton, R. (1997). The Chemical Evolution of the Galaxy: The Two-Infall Model. _The Astrophysical Journal_, 477, 765–780.
- Smartt, S.J. et al. (2017). A kilonova as the electromagnetic counterpart to a gravitational-wave source. _Nature_, 551, 75–79.
- Tolstoy, E., Hill, V., & Tosi, M. (2009). Star-Formation Histories, Abundances, and Kinematics of Dwarf Galaxies in the Local Group. _Annual Review of Astronomy and Astrophysics_, 47, 371–425.
- Majewski, S.R. et al. (2017). The Apache Point Observatory Galactic Evolution Experiment (APOGEE). _Astronomical Journal_, 154, 94.
- Freeman, K. & Bland-Hawthorn, J. (2002). The New Galaxy. _Annual Review of Astronomy and Astrophysics_, 40, 487.
- Kroupa, P. et al. (2013). The stellar and sub-stellar initial mass function of simple and composite populations. _A&A_, 549, A71.

## 延伸阅读

- Matteucci, F. (2021). Chemical Evolution of Galaxies. _Astronomy & Astrophysics Review_, 29, 5. — 最新综述
- Kobayashi, C., Karakas, A.I. & Lugaro, M. (2020). The Origin of Elements from Carbon to Uranium. _The Astrophysical Journal_, 900, 179. — 综合 GCE 模型与元素来源
- De Silva, G.M. et al. (2015). The GALAH survey: scientific motivation. _Monthly Notices of the Royal Astronomical Society_, 449, 2604. — GALAH 巡天概述

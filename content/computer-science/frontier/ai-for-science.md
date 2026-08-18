---
title: AI 驱动的科学发现：从蛋白质到天气再到数学
title_en: AI for Science — Machine Learning as an Instrument of Discovery
status: published
updated: 2026-08-16
category: 人工智能
horizon: 2020s
order: 10
tags:
  - AI4Science
  - AlphaFold
  - 图神经网络
  - 科学发现
  - 可复现性
researchers:
  - John Jumper 与 Demis Hassabis（Google DeepMind，AlphaFold）
  - Remi Lam 等（Google DeepMind，GraphCast）
  - Amil Merchant 与 Ekin Dogus Cubuk（Google DeepMind，GNoME）
  - Trieu Trinh 与 Thang Luong（Google DeepMind，AlphaGeometry）
  - Gerbrand Ceder（UC Berkeley / LBNL，A-Lab）
institutions:
  - Google DeepMind
  - 欧洲中期天气预报中心（ECMWF）
  - 劳伦斯伯克利国家实验室（LBNL）
  - Materials Project
related:
  - large-language-models
  - protein-design-revolution
  - computational-materials-design
---

# AI 驱动的科学发现：从蛋白质到天气再到数学

2024 年 10 月，诺贝尔化学奖一半授予 David Baker，另一半授予 Demis Hassabis 与 John Jumper——表彰计算蛋白质设计与蛋白质结构预测。一个本质上是机器学习系统的成果拿到了科学最高奖，这在诺贝尔奖历史上没有先例。同年 5 月，AlphaFold 3 登上 _Nature_，把预测范围从单个蛋白质扩展到蛋白质与核酸、小分子、离子的复合物。

这类工作现在有一个共同的名字：AI for Science（AI4Science）。它的主张很大胆——机器学习不只是科学的数据处理工具，而是一种新的科学仪器，能在人力无法穷举的空间里直接定位候选答案。2020 年代的一系列突破让这个主张第一次有了过硬的证据，但围绕它的争议同样真实：预测不等于验证，排行榜不等于发现。

## 破除误解：AI 不是"替科学家算得更快"

把 AI4Science 理解成"用 GPU 加速原有计算"是低估了它。传统科学计算求解的是**正向问题**：给定方程与初值，算出结果。天气预报解流体力学方程，量子化学解薛定谔方程的近似形式。这条路线的瓶颈是算力——方程越精确，网格越细，代价越高。

数据驱动模型走的是另一条路：**不学方程，学映射**。GraphCast 不求解纳维-斯托克斯方程，它从四十年的再分析气象数据里直接学习"今天的全球大气状态 → 六小时后的状态"这个映射；GNoME 不逐个做密度泛函理论（DFT）计算，它从已有的 DFT 结果里学习"晶体结构 → 能量与稳定性"的映射。学到的模型一旦训好，做一次预测的代价远低于跑一遍正向模拟——GraphCast 在一台 TPU 上不到一分钟就能给出十天预报，而传统数值预报需要超算运行数小时。

这个区别决定了 AI4Science 的真正价值所在：**它擅长的是筛选，而不是终审**。把百万级候选压到千级，再把最贵的实验或精确计算留给少数候选——发现的速度因此改变。把预测当成结论，是这条路上最常见的误用。

## 现场：四条已经立住的前沿

**蛋白质结构。** AlphaFold 2（2021 年发表于 _Nature_）在 CASP14 评测中把蛋白质结构预测的精度推到接近实验方法的水平，此后 AlphaFold 数据库免费开放了超过两亿个预测结构。AlphaFold 3（Abramson 等，2024，_Nature_ 630 卷）换用扩散模型架构，能统一预测蛋白质、核酸、小分子配体组成的复合物，在蛋白-配体相互作用上显著超过此前的专用对接工具。它对药物设计的意义直接：过去解析一个复合物结构可能耗时数年，现在以分钟计。

**天气预报。** GraphCast（Lam 等，2023 年发表于 _Science_）用图神经网络做中期全球预报，论文报告在 1380 个验证目标的 90% 上精度超过 ECMWF 的 HRES——后者是数值天气预报的黄金标准。华为的 Pangu-Weather 同年发表于 _Nature_。更重要的是落地速度：ECMWF 在 2025 年 2 月把自己开发的数据驱动模型 AIFS 投入业务运行，与物理模式并列提供官方预报。这是 AI 模型第一次进入国家级别的业务预报链路。

**材料发现。** GNoME（Merchant 等，2023 年发表于 _Nature_）用图神经网络配合主动学习，预测了 220 万个新晶体，其中约 38 万个被判定为热力学稳定——论文称这相当于把人类已知稳定无机晶体的目录扩大了近一个数量级。约 38 万个候选已并入公开的 Materials Project 数据库。

**数学。** AlphaGeometry（Trinh 等，2024 年发表于 _Nature_）把神经语言模型与符号演绎引擎结合，解出 30 道国际数学奥林匹克几何题中的 25 道。2024 年 7 月，AlphaProof 与 AlphaGeometry 2 的组合在 IMO 题目上达到银牌水平（解出 6 题中的 4 题，按 IMO 计分得 28/42）。FunSearch（2023 年发表于 _Nature_）则用大语言模型搜索程序空间，在组合数学的 cap set 问题上给出了几十年来首个改进的下界构造。

## 谁在做，做到了哪一步

| 方向         | 代表系统（年份）                       | 机构                       | 已验证的结果                             |
| ------------ | -------------------------------------- | -------------------------- | ---------------------------------------- |
| 结构生物学   | AlphaFold 2/3（2021/2024）             | Google DeepMind            | CASP 评测达实验级精度；数据库超 2 亿结构 |
| 天气预报     | GraphCast（2023）、AIFS（2025 业务化） | DeepMind、ECMWF            | 多数指标超 HRES；进入业务预报            |
| 材料         | GNoME（2023）、A-Lab（2023）           | DeepMind、LBNL/UC Berkeley | 38 万稳定候选入库；自主合成出目标化合物  |
| 数学         | AlphaGeometry/AlphaProof（2024）       | DeepMind                   | IMO 银牌水平；形式化证明可被机器核查     |
| 等离子体控制 | 托卡马克磁控制（2022）                 | DeepMind + EPFL            | 强化学习实时控制等离子体形状（_Nature_） |

值得注意的共同点：这些成果几乎全部来自少数拥有大规模算力与高质量数据的机构。AI4Science 目前是一个资源高度集中的领域。

## 代价与争议：预测、验证与可复现性

**稳定不等于存在。** GNoME 的 38 万"稳定材料"是模型与 DFT 判定的结果。2024 年，UC Santa Barbara 的材料学家公开质疑其中相当比例的结构既不新颖也未必可合成；DeepMind 回应称批评者误读了论文的目标。这场争论至今没有干净的裁决，它暴露的是标准问题："发现一个材料"到底意味着什么——算出稳定、合成出来、还是做出器件？三者之间隔着数量级的时间与成本。

**自主实验室的教训更直接。** LBNL 的 A-Lab（2023 年发表于 _Nature_）让机器人在 17 天里自主完成实验，论文称合成了 41 种"新颖"化合物。2024 年有团队在 _PRX Energy_ 发表分析，质疑其 X 射线衍射的解读方式；2026 年 _Nature_ 刊出作者更正，承认原文对材料"新颖性"的表述容易引起误解。一个被广泛报道为"AI 自主做科学"的标杆工作，最终在同行压力下修正了核心表述。这不是说自主实验室方向错了，而是说明：**自动化的合成没有自动化的验证可靠，而验证恰恰是更难自动化的那一半。**

**开放程度的拉锯。** AlphaFold 3 发表时只提供网页服务器、不开放代码与权重，引来数百名科学家联署批评；DeepMind 在 2024 年 11 月改为向非商用研究开放模型参数。科学共同体对"发表即可复现"的期待，与企业的商业与安全考虑之间，张力不会消失。

**数据壁垒是隐性天花板。** 成功案例几乎都在数据富裕的领域：蛋白质有 PDB 五十年积累，气象有 ECMWF 的再分析数据，材料有 Materials Project 的百万级 DFT 计算。而科学的大部分地区没有这样的数据——失败实验不发表，负结果躺在实验室笔记本里。模型学到的映射只能覆盖数据覆盖的空间，这解释了为什么 AI4Science 的捷报集中在少数几个领域。

## 未知的边界

- 数据驱动模型在训练分布之外的可靠性有多大？对天气而言，这直接关系到它能否预报超出历史记录的极端事件——而这恰是气候变化时代最需要的预报。
- "AI 提出假设、人类验证"的分工能否进一步压缩？自主实验室已经证明闭环可行，但 A-Lab 的更正表明验证环节的自动化远未成熟。
- 材料与药物领域，从"预测候选"到"临床/器件验证"的转化率是多少？目前没有任何团队公布过经得起审计的数字。
- AI 在数学上找到的构造与证明，能否反过来教会人类新的直觉，而不只是给出答案？FunSearch 的程序是人类可读的，这是少数乐观的线索。

## 跨域连接

- **[[蛋白质折叠|蛋白质折叠]]**：AlphaFold 解决的正是这个半个世纪的老问题，但要点常被说反——它解决的是"从序列预测结构"这个**映射**，而不是折叠的物理机制本身。蛋白质如何在毫秒内找到天然构象，仍是生命科学的开放问题；AI 绕过了机制直接给出了答案，这既是它的力量，也是它留给科学的债务。
- **[[climate-modeling|气候建模]]**：GraphCast 们学的是四十年再分析数据里的天气，而气候问题问的是**没见过的世界**——更高 CO₂ 浓度下的稳态与极端。数据驱动预报的成功不能自动迁移到气候预估，气候建模依然是物理模式的主场；两者的分工边界，是今后十年地球科学最重要的方法论问题之一。
- **[[computational-materials-design|计算材料设计]]**：GNoME 本质上是把计算材料设计的"筛选"环节加速了三个数量级，但"稳定候选 → 可合成 → 有性能 → 可量产"这条漏斗的后面几段并没有被加速。材料发现的瓶颈正在从计算转移到验证，这正是化学领域自主实验室兴起的背景。
- **[[formal-verification|形式化验证]]**：AlphaProof 的路线揭示了一个不对称——证明的**生成**很难，证明的**检查**却可以被 Lean 这样的系统机械化。正是这个不对称让数学成为 AI 最诚实的试验场：没有评审意见可以被说服，证明要么通过内核检查，要么不成立。
- **[[philosophy-of-science|科学哲学]]**：AI4Science 把"理解"与"预测"的古老张力推到了台前。一个不解方程、不懂机制、却能给出正确答案的模型，算不算科学进步？工具主义者说算，实在论者说它缺了解释。AlphaFold 们的实际影响是：科学共同体正在被迫重新谈判"一个理论要满足什么条件才算成立"。

---

## 参考文献

- Abramson, J. et al. _Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3._ Nature 630, 493–500 (2024). DOI: 10.1038/s41586-024-07487-w.
- Lam, R. et al. _Learning Skillful Medium-Range Global Weather Forecasting._ Science 382, 1416–1421 (2023). DOI: 10.1126/science.adi2336.（GraphCast）
- Merchant, A. et al. _Scaling Deep Learning for Materials Discovery._ Nature 624, 80–85 (2023). DOI: 10.1038/s41586-023-06735-9.（GNoME）
- Trinh, T. H., Wu, Y., Le, Q. V., He, H. & Luong, T. _Solving Olympiad Geometry Without Human Demonstrations._ Nature 625, 476–482 (2024). DOI: 10.1038/s41586-023-06747-5.（AlphaGeometry）
- Szymanski, N. J. et al. _An Autonomous Laboratory for the Accelerated Synthesis of Novel Materials._ Nature 624, 86–91 (2023). DOI: 10.1038/s41586-023-06734-w.（A-Lab，含 2026 年作者更正）

## 延伸阅读

- Jumper, J. et al. _Highly Accurate Protein Structure Prediction with AlphaFold._ Nature 596, 583–589 (2021). DOI: 10.1038/s41586-021-03819-2.
- Romera-Paredes, B. et al. _Mathematical Discoveries from Program Search with Large Language Models._ Nature 625, 468–475 (2023).（FunSearch）
- Degrave, J. et al. _Magnetic Control of Tokamak Plasmas Through Deep Reinforcement Learning._ Nature 602, 414–419 (2022).
- Leeman, J. et al. _Commentary on Autonomous Materials Synthesis Claims._ PRX Energy (2024).（对 A-Lab 的质疑）

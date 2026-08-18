---
title: 球堆积与编码：Viazovska 之后
title_en: Sphere Packing and Codes after Viazovska
status: published
updated: 2026-08-16
category: 离散几何
horizon: 2020s
order: 7
tags:
  - 球堆积
  - 格
  - 纠错码
  - 模形式
  - 高维几何
researchers:
  - Maryna Viazovska（洛桑联邦理工学院 EPFL）
  - Henry Cohn（微软研究院）
  - Boaz Klartag（魏茨曼科学研究所）
institutions:
  - 洛桑联邦理工学院（EPFL）
  - 微软研究院（新英格兰）
  - 魏茨曼科学研究所
related:
  - ramsey-and-combinatorics-progress
  - kakeya-conjecture
---

# 球堆积与编码：Viazovska 之后

2025 年 4 月，魏茨曼科学研究所的 Boaz Klartag 在 arXiv 上贴出一篇只有十几页的论文（arXiv:2504.05042），标题是"用一个随机演化的椭球做高维格球堆积"。他证明了：在任意维数 $n$ 中，存在密度至少 $cn^2 \cdot 2^{-n}$ 的**格**球堆积（$c$ 为绝对常数），而此前所有已知构造——包括非格堆积——都到不了 $Cn\log n \cdot 2^{-n}$ 以上。

这条新闻距离 Maryna Viazovska 2016 年惊天动地的 8 维球堆积精确解正好九年。九年里，这个领域没有停下：它一边在少数"魔幻维数"上把答案写到极致精确，一边在无穷维的渐近世界里把下界一寸寸抬高。球堆积是少数同时活着"精确解"与"渐近界"两套前沿的数学问题。

## 破除误解：这不是"码橘子"的问题

**误解一：球堆积是三维问题。** 三维情形（Kepler 猜想，1611 年提出）确实直到 1998 年才由 Thomas Hales 以大规模计算机辅助证明解决，2014 年又完成形式化验证（Flyspeck 项目，2017 年正式发表）。但现代前沿几乎不在三维：三维已解决，4 到 7 维悬而未决，8 维和 24 维意外地被精确攻克，而更高维是一个完全不同的、渐近的世界。

**误解二：高维球堆积是纯几何游戏。** 恰恰相反，它最深刻的动机来自通信。在高维空间中放一个半径受限的码本，使码字两两距离尽量大，数学上就是让等径球互不重叠——**好的纠错码就是好的球堆积**。香农的信道编码定理、Golay 码与 Leech 格、以及今天的后量子格密码，都是同一个几何问题的不同化身。

## 现场：这个问题在问什么

在 $\mathbb{R}^n$ 中放置互不重叠的等径球，使它们占据空间体积的最大比例 $\Delta_n$。两个问题：

1. **精确问题**：给定维数 $n$，$\Delta_n$ 等于多少？由什么构型实现？
2. **渐近问题**：$n \to \infty$ 时 $\Delta_n$ 的增长率是多少？目前已知的只是 $cn^2 \cdot 2^{-n} \leq \Delta_n \leq 2^{-0.599n+o(n)}$，上下界之间是指数级的深渊。

难在何处？低维里你可以把球一个个摆出来验证局部接触；高维里没有任何"摆法"的直觉可用——一个 $n$ 维球的大部分体积集中在表面附近，随机两点几乎总是相距 $\sqrt{2}$ 倍半径左右，几何问题被迫变成概率问题。这正是渐近前沿近年的关键转向：下界一侧的每次突破（Venkatesh 的分圆对称、Campos 等人的图论方法、Klartag 的随机椭球），本质都是**设计一种受控的随机过程**，再证明它以正概率产出好堆积。

精确问题在 2016 年 3 月被撕开一道口子：当时在柏林洪堡大学的 Maryna Viazovska 构造出一个"魔幻函数"——一个用模形式精心调制的径向 Schwartz 函数，它与它的傅里叶变换在指定点同时取零——代入 Cohn–Elkies 线性规划框架，立刻证明 $E_8$ 格是 8 维最优堆积。一周之内，她与 Cohn、Kumar、Miller、Radchenko 合作，用同样方法解决 24 维：Leech 格最优。2022 年 Viazovska 因此获菲尔兹奖。

## 谁在做、做到了哪一步

### 精确解的版图（截至 2026 年）

| 维数 | 状态   | 关键结果                                                                         |
| ---- | ------ | -------------------------------------------------------------------------------- |
| 2    | 已解决 | 六方最密堆积（Thue，1890s）                                                      |
| 3    | 已解决 | 面心立方，Hales 1998 年宣布、2006 年发表，Flyspeck 形式化 2017                   |
| 8    | 已解决 | $E_8$ 格，Viazovska（2016；Ann. of Math. 185, 2017）                             |
| 24   | 已解决 | Leech 格，Cohn–Kumar–Miller–Radchenko–Viazovska（2016；Ann. of Math. 185, 2017） |
| 其余 | 开放   | 4–7 维有强候选（如 $D_4$），无线性规划意义上的证明                               |

为什么偏偏是 8 和 24？深层原因是这两个维数住着两个"过于对称"的格：$E_8$ 由扩展 Hamming 码 $(8,4)$ 经"构造 A"生成，Leech 格由二元 Golay 码 $(24,12)$ 生成——纠错码里最完美的两个对象恰好对应堆积里最完美的两个对象。2022 年，Cohn、Kumar、Miller、Radchenko、Viazovska 进一步证明 $E_8$ 与 Leech 格是**万有最优**的（universal optimality，Ann. of Math. 196, 2022）：不只对硬球堆积最优，对一大类相互作用势下的能量极小化也最优。这解释了为什么这两个格在弦论、编码、组合设计中反复出现。

主流猜想是：其他维数**不存在**这样的魔幻函数。魔幻函数方法可能是一次只对 8 和 24 开放的奇迹，而不是通用武器——这是精确解前沿最诚实的自我评估。

### 渐近下界的军备竞赛

- **1905 / 1940s**：Minkowski–Hlawka 定理给出 $\Delta_n \gtrsim 2 \cdot 2^{-n}$；Rogers 1947 年改进到约 $cn \cdot 2^{-n}$。此后七十多年，渐近下界几乎没有本质变化。
- **2013**：Akshay Venkatesh 利用分圆整数环上的格，在无穷多个维数上得到 $cn\log\log n \cdot 2^{-n}$。
- **2023**：Campos–Jenssen–Michelen–Sahasrabudhe（正是拉姆齐数突破的同一批人中的几位，arXiv:2312.10026）用图论独立集方法处理"随机取点 + 删冲突"的精细分析，得到 $(1/2-o(1))\,n\log n \cdot 2^{-n}$——第一次把 log 因子打进下界。
- **2025**：Klartag 的随机演化椭球让**格**堆积（结构上更受约束、密码学上更有用的那一类）直接跳到 $cn^2 \cdot 2^{-n}$。
- **2026**：Abuya–Gargava–Zhao（arXiv:2606.05105）把 Venkatesh 的分圆对称性嫁接进 Klartag 的过程，在无穷多个维数上得到 $cN^2\log\log N \cdot 2^{-N}$。

### 上界一侧的沉寂

上界的纪录仍属于 1978 年 Kabatiansky–Levenshtein 的 $2^{-0.599n}$ 量级；Cohn–Elkies 2003 年的线性规划界统一并小幅改进了它，但底数二十多年来没有实质性下降。**下界每年在动，上界纹丝不动**——渐近前沿的不对称本身就是最大的悬念。

## 代价与争议

**构造性赤字。** 从 Minkowski 到 Klartag，所有高密度堆积下界都是存在性证明：没有给出任何可以写下来的格。编码理论需要的是显式、可译码的构造，渐近最优的存在性定理对工程实践几乎不直接可用。

**"奇迹维数"的方法论争议。** Viazovska 的方法极度依赖模形式的特殊算术，批评者担心这让 8 维和 24 维的证明成为"不可外推的孤例"；支持者则指出，魔幻函数背后的"傅里叶插值公式"已经在信号不确定性原理等方向开枝散叶，方法论价值独立于球堆积本身。

**形式化的先例与代价。** Hales 的 Flyspeck 花了约二十年才把 Kepler 证明变成机器可核验代码，既是形式化运动的里程碑，也暴露了成本：Viazovska 式证明（远短于 Hales 的）目前尚无完整形式化版本，社区对"何时值得形式化"没有共识。

## 未知的边界

- **4 维的 $D_4$ 是全局最优吗？** 有强力的数值与线性规划证据，但缺少魔幻函数，证明无门。
- **渐近上界的底数能降吗？** 0.599 这个指数近五十年没被实质撼动；任何改进都可能需要超越线性规划/傅里叶方法的新框架。
- **格与非格在高维会分道扬镳吗？** 低维里最优堆积都是格；渐近世界里 Klartag 2025 已让格追平甚至反超非格构造，但没人知道这种反超是否持续到最优。
- **为什么只有 8 和 24？** 这个问题的答案可能藏在模形式与顶点算子代数的深处（Leech 格与"月光理论"同源），是数学内部最诱人的结构之谜之一。

## 跨域连接

- **[[error-correcting-codes|纠错码]]**：二元码经"构造 A"提升为格——Hamming $(8,4)$ 码生成 $E_8$，Golay $(24,12)$ 码生成 Leech 格。推论：离散世界里"最抗噪的码"与连续世界里"最致密的堆积"是同一批对象——**编码理论每一次找到好码，都可能在几何里投下一个好格的影子**。
- **[[post-quantum-cryptography|后量子密码]]**：格基密码（如基于 Module-LWE 的标准算法）的安全性归约到格上最短向量等难题，而球堆积密度正是"格能多好"的基准。推论：堆积下界不直接威胁密码，但它划定了格结构优劣的全景图——**理解格的极限，是评估格密码安全的前提性知识**。
- **[[fourier-analysis|傅里叶分析]]**：Cohn–Elkies 上界与 Viazovska 魔幻函数的核心，都是把一个函数与其傅里叶变换的符号、零点同时锁死。推论：堆积问题变成了"对偶约束下的函数构造"——**几何最优性被翻译成了傅里叶对偶性的竞赛**。
- **[[phase-transitions-and-critical-phenomena|相变与临界现象]]**：硬球体系在密度增加时的"堵塞"（jamming）转变是统计物理的活跃问题，数学家证明的密度界正是物理学家模拟的上限。推论：**同一个密度轴上，数学家在两端证明界，物理学家在中间观察相变**。
- **[[number-theory|数论]]**：魔幻函数由模形式搭建，而模形式是朗兰兹纲领的核心演员。推论：球堆积的精确解之所以恰好落在 8 与 24，深层原因是这两个维数放大了自守形式的对称性——**离散几何的问题，答案写在数论的对称性里**。

## 参考文献

- Viazovska, M. "The sphere packing problem in dimension 8." _Annals of Mathematics_ 185 (2017), 991–1015. DOI: 10.4007/annals.2017.185.3.7.
- Cohn, H., Kumar, A., Miller, S. D., Radchenko, D. & Viazovska, M. "The sphere packing problem in dimension 24." _Annals of Mathematics_ 185 (2017), 1017–1033.
- Klartag, B. "Lattice packing of spheres in high dimensions using a stochastically evolving ellipsoid." arXiv:2504.05042 (2025).
- Campos, M., Jenssen, M., Michelen, M. & Sahasrabudhe, J. "A new lower bound for sphere packing." arXiv:2312.10026 (2023).
- Cohn, H., Kumar, A., Miller, S. D., Radchenko, D. & Viazovska, M. "Universal optimality of the $E_8$ and Leech lattices and interpolation formulas." _Annals of Mathematics_ 196 (2022), 983–1082.
- Hales, T. et al. "A formal proof of the Kepler conjecture." _Forum of Mathematics, Pi_ 5 (2017), e2. DOI: 10.1017/fmp.2017.1.

## 延伸阅读

- Cohn, H. "A conceptual breakthrough in sphere packing." _Notices of the AMS_ 64 (2017), 102–115.（Viazovska 方法的最佳通俗化讲解）
- Torquato, S. & Stillinger, F. H. 等关于硬球堵塞与无序堆积的物理综述（_Nature Reviews Physics_, 2026）。

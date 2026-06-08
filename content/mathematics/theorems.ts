import type { Theorem } from "./types";

export const THEOREMS: Theorem[] = [
  {
    id: "pythagorean",
    name: { zh: "勾股定理", en: "Pythagorean Theorem" },
    mathematician: "pythagoras",
    field: "几何学",
    statement: "直角三角形两直角边的平方和等于斜边的平方：a² + b² = c²",
    significance:
      "几何学中最基本的定理之一，连接了代数与几何。已有400多种证明方法，是数学中被证明次数最多的定理。",
    proofSketch: "通过面积法：在直角三角形三边上分别构造正方形，证明两直角边上正方形面积之和等于斜边上正方形的面积。",
    historicalContext:
      "虽然以毕达哥拉斯命名，但巴比伦人在公元前1800年就已知道这一关系。《周髀算经》中记载了中国数学家商高在公元前1000年左右提出的'勾三股四弦五'。这一定理在多个古代文明中独立发现，是人类数学智慧的共同结晶。",
    applications: [
      "GPS定位与导航系统中的距离计算",
      "建筑与工程中的角度和距离测量",
      "计算机图形学中的向量运算与碰撞检测",
      "物理学中的矢量合成与分解",
    ],
  },
  {
    id: "euclid-primes",
    name: { zh: "素数无穷多", en: "Euclid's Infinitude of Primes" },
    mathematician: "euclid",
    year: -300,
    field: "数论",
    statement: "素数有无穷多个。",
    significance:
      "数论中最优美的证明之一。用反证法仅用几行就证明了素数的无穷性，展示了数学证明的力量和美。",
    proofSketch: "假设素数有限，将所有素数相乘再加1，得到的新数不能被任何素数整除，矛盾。",
    historicalContext:
      "欧几里得在《几何原本》第九卷中给出了这一证明，距今已有2300多年。这是数学史上第一个关于无穷的严格证明，其简洁与深刻至今令人叹服。",
    applications: [
      "现代密码学（RSA加密）依赖于大素数的存在性",
      "数论研究的基石，催生了解析数论等分支",
      "随机数生成器的设计",
    ],
  },
  {
    id: "fundamental-algebra",
    name: { zh: "代数基本定理", en: "Fundamental Theorem of Algebra" },
    mathematician: "gauss",
    year: 1799,
    field: "代数学",
    statement: "每个次数大于零的复系数多项式在复数域中至少有一个根。",
    significance:
      "代数学的基石。保证了n次多项式恰好有n个复根（计重数）。高斯给出了第一个严格证明。",
  },
  {
    id: "euler-identity",
    name: { zh: "欧拉恒等式", en: "Euler's Identity" },
    mathematician: "euler",
    year: 1748,
    field: "分析学",
    statement: "e^{iπ} + 1 = 0",
    significance:
      "被誉为"最美丽的数学公式"。将五个最重要的数学常数（e, i, π, 1, 0）用一个简洁的等式联系起来。",
    historicalContext:
      "欧拉在1748年的《无穷分析引论》中首次发表了这一恒等式。它是欧拉公式 e^{ix} = cos(x) + i·sin(x) 在 x = π 时的特例。高斯曾说：'如果一个人看到这个公式而不感到兴奋，那他一定不是真正的数学家。'",
    applications: [
      "交流电路分析中的相量表示",
      "量子力学中的波函数描述",
      "信号处理中的傅里叶变换",
      "控制理论中的频域分析",
    ],
  },
  {
    id: "euler-polyhedron",
    name: { zh: "欧拉多面体公式", en: "Euler's Polyhedron Formula" },
    mathematician: "euler",
    year: 1758,
    field: "拓扑学",
    statement: "对于任意凸多面体，顶点数 - 棱数 + 面数 = 2，即 V - E + F = 2",
    significance: "拓扑学的开端。这一公式不依赖于几何度量，只依赖于拓扑结构，开辟了全新的数学视角。",
  },
  {
    id: "fundamental-calculus",
    name: { zh: "微积分基本定理", en: "Fundamental Theorem of Calculus" },
    mathematician: "newton",
    year: 1668,
    field: "分析学",
    statement: "微分和积分互为逆运算。若 F'(x) = f(x)，则 ∫[a,b] f(x)dx = F(b) - F(a)",
    significance:
      "连接了微分学和积分学，是整个分析学的基础。使得面积和变化率的计算变得系统化。",
    historicalContext:
      "牛顿和莱布尼茨在17世纪各自独立发现了微积分基本定理，引发了著名的优先权之争。这一定理将古希腊以来的求面积问题（积分）与瞬时变化率问题（微分）统一起来，是数学史上最伟大的综合之一。",
    applications: [
      "物理学中功和能量的计算",
      "工程中的累积量分析（如流量、电量）",
      "概率论中概率密度函数的积分",
      "经济学中的消费者剩余和生产者剩余计算",
    ],
    proofSketch:
      "设 F(x) = ∫[a,x] f(t)dt，由导数定义：F'(x) = lim[h→0] (F(x+h) - F(x))/h = lim[h→0] ∫[x,x+h] f(t)dt / h = f(x)，因此 F 是 f 的原函数。",
  },
  {
    id: "central-limit",
    name: { zh: "中心极限定理", en: "Central Limit Theorem" },
    mathematician: "laplace",
    year: 1810,
    field: "概率论",
    statement: "独立同分布随机变量的均值，在样本量足够大时，近似服从正态分布。",
    significance:
      "统计学中最重要的定理之一。解释了为什么正态分布在自然界中如此普遍。是现代统计推断的理论基础。",
    historicalContext:
      "拉普拉斯在1810年给出了初步形式，但直到1920年代波利亚和林德伯格才给出了现代严格表述。这一定理解释了为什么大量独立随机因素的叠加效应总是趋向正态分布，是统计学的理论基石。",
    applications: [
      "民意调查和市场研究中的置信区间计算",
      "工业质量控制中的过程能力分析",
      "金融风险管理中的投资组合分析",
      "医学临床试验中的统计显著性检验",
    ],
    proofSketch:
      "利用特征函数：n个独立同分布随机变量之和的特征函数等于各特征函数的乘积。标准化后取对数展开到二阶项，当n→∞时收敛到标准正态分布的特征函数 e^{-t²/2}。",
  },
  {
    id: "cantor-diagonal",
    name: { zh: "康托尔对角线论证", en: "Cantor's Diagonal Argument" },
    mathematician: "cantor",
    year: 1891,
    field: "集合论",
    statement: "实数集是不可数的——实数比自然数"更多"。",
    significance:
      "证明了无穷有不同的大小，彻底改变了人类对无穷的理解。开创了集合论和基数理论。",
    proofSketch: "假设实数可数，构造一个与列表中每个数都不同的新数，产生矛盾。",
  },
  {
    id: "godel-incompleteness",
    name: { zh: "哥德尔不完备定理", en: "Gödel's Incompleteness Theorems" },
    mathematician: "godel",
    year: 1931,
    field: "数理逻辑",
    statement:
      "第一不完备定理：任何包含自然数算术的一致公理系统都包含不可判定命题。第二不完备定理：这样的系统不能证明自身的一致性。",
    significance:
      "终结了希尔伯特的公理化纲领，证明了数学的完备性是不可能的。是20世纪最深刻的数学发现之一。",
    historicalContext:
      "1930年代，希尔伯特试图将全部数学建立在有限步可验证的公理系统之上。哥德尔用精妙的自指构造打破了这一梦想。图灵后来从计算角度重新证明了类似结论，丘奇则从λ演算出发得出了等价结果。",
    applications: [
      "计算机科学中程序验证的理论极限",
      "人工智能中自动定理证明的能力边界",
      "哲学中关于数学基础和真理本质的讨论",
      "密码学中形式化安全证明的局限性",
    ],
    proofSketch:
      "通过哥德尔编码，将关于数论命题的元数学陈述编码为自然数算术命题。构造自指命题G：'G不可证'。若G可证则系统不一致；若G不可证则G为真但不可证，系统不完备。",
  },
  {
    id: "halting-problem",
    name: { zh: "停机问题", en: "The Halting Problem" },
    mathematician: "turing",
    year: 1936,
    field: "计算理论",
    statement: "不存在一个算法能够判定任意程序在给定输入下是否会终止。",
    significance:
      "证明了计算的极限。奠定了可计算性理论的基础，暗示了某些问题本质上是不可解的。",
    proofSketch: "假设存在这样的判定器H，构造程序D：若H说D会停机则D不停机，反之亦然，矛盾。",
    historicalContext:
      "图灵在1936年的论文《论可计算数》中提出了这一结果，该论文也是图灵机模型的诞生地。同时期丘奇用λ演算独立得到了类似结论。这篇论文不仅解决了希尔伯特的判定问题，还为现代计算机科学奠定了理论基础。",
    applications: [
      "软件工程中程序终止性验证的不可行性",
      "病毒检测的本质局限（无法判定任意程序是否为恶意软件）",
      "编译器优化中某些优化问题的不可判定性",
      "网络安全中恶意代码分析的理论边界",
    ],
  },
  {
    id: "fermat-last",
    name: { zh: "费马大定理", en: "Fermat's Last Theorem" },
    mathematician: "fermat",
    year: 1637,
    field: "数论",
    statement: "当 n > 2 时，方程 x^n + y^n = z^n 没有正整数解。",
    significance:
      "困扰数学家358年，1995年由安德鲁·怀尔斯证明。证明过程发展了模形式和椭圆曲线的深刻理论。",
    historicalContext:
      "费马在阅读丢番图的《算术》时在页边写下了这一猜想，并声称有一个'美妙的证明'但页边太窄写不下。此后358年间无数数学家试图证明它，发展出了代数数论、理想理论等重要分支。怀尔斯秘密工作七年最终证明了谷山-志村猜想的特殊情况，从而解决了费马大定理。",
    applications: [
      "椭圆曲线密码学的理论发展",
      "模形式理论在数论中的应用",
      "推动了代数几何与数论的交叉融合",
    ],
    proofSketch:
      "怀尔斯证明了半稳定椭圆曲线的谷山-志村猜想：每条有理数域上的椭圆曲线都是模的。而弗雷曾指出，若费马大定理不成立，则存在一条非模的椭圆曲线，矛盾。",
  },
  {
    id: "four-color",
    name: { zh: "四色定理", en: "Four Color Theorem" },
    mathematician: "appel",
    year: 1976,
    field: "图论",
    statement: "任何平面地图都可以用四种颜色着色，使得相邻区域颜色不同。",
    significance:
      "第一个借助计算机证明的数学定理，引发了关于"什么是证明"的哲学讨论。",
  },
  {
    id: "poincare-conjecture",
    name: { zh: "庞加莱猜想", en: "Poincaré Conjecture" },
    mathematician: "perelman",
    year: 2003,
    field: "拓扑学",
    statement: "每个单连通的闭三维流形都同胚于三维球面。",
    significance:
      "千禧年七大问题之一。佩雷尔曼用里奇流方法证明，拒绝了菲尔兹奖和百万美元奖金。",
  },
  {
    id: "green-tao",
    name: { zh: "格林-陶定理", en: "Green–Tao Theorem" },
    mathematician: "tao",
    year: 2004,
    field: "数论",
    statement: "素数序列包含任意长度的等差数列。",
    significance:
      "将组合数学和解析数论结合，展示了素数分布的深层结构。是21世纪数论的重大突破。",
  },
  {
    id: "noether-theorem",
    name: { zh: "诺特定理", en: "Noether's Theorem" },
    mathematician: "noether",
    year: 1918,
    field: "理论物理 / 代数学",
    statement: "每一个连续对称性都对应一个守恒律。",
    significance:
      "将数学中的对称性与物理学中的守恒律联系起来。能量守恒来自时间平移对称性，动量守恒来自空间平移对称性。是理论物理学的基石。",
    historicalContext:
      "艾米·诺特在1918年证明了这一定理，当时她因性别歧视无法在哥廷根大学获得正式教职。爱因斯坦和希尔伯特为她的任命据理力争。这一定理后来成为粒子物理学标准模型的理论基础。",
    applications: [
      "粒子物理标准模型中规范对称性与基本力的对应",
      "能量守恒、动量守恒、角动量守恒的统一解释",
      "拉朗日力学和哈密顿力学的理论基础",
      "凝聚态物理中对称性破缺与相变理论",
    ],
    proofSketch:
      "给定拉格朗日量L在连续变换 q → q + εδq 下不变（对称性），由最小作用量原理 δS = 0 推出对应的守恒量 Q = ∂L/∂q̇ · δq 满足 dQ/dt = 0。",
  },
  {
    id: "bayes-theorem",
    name: { zh: "贝叶斯定理", en: "Bayes' Theorem" },
    mathematician: "bayes",
    year: 1763,
    field: "概率论",
    statement: "P(A|B) = P(B|A) · P(A) / P(B)",
    significance:
      "概率论和统计学的基石。提供了根据新证据更新信念的数学框架。在机器学习、医学诊断、法律推理中有广泛应用。",
    historicalContext:
      "托马斯·贝叶斯的论文在他去世后由朋友理查德·普莱斯于1763年提交给皇家学会。拉普拉斯在不知道贝叶斯工作的情况下独立发展了类似理论。贝叶斯方法在20世纪曾因主观性争议而被打入冷宫，直到计算机算力提升后在1990年代强势复兴。",
    applications: [
      "垃圾邮件过滤（朴素贝叶斯分类器）",
      "医学诊断中的疾病概率更新",
      "搜索引擎中的文档相关性排序",
      "自动驾驶中的传感器融合与环境感知",
      "金融风控中的违约概率估计",
    ],
    proofSketch:
      "由条件概率定义 P(A|B) = P(A∩B)/P(B) 和 P(B|A) = P(A∩B)/P(A)，消去 P(A∩B) 即得 P(A|B) = P(B|A)·P(A)/P(B)。",
  },
  {
    id: "gauss-bonnet",
    name: { zh: "高斯-博内定理", en: "Gauss–Bonnet Theorem" },
    mathematician: "gauss",
    year: 1848,
    field: "微分几何",
    statement: "紧致二维曲面的总曲率等于 2π 乘以欧拉示性数。",
    significance:
      "将局部几何性质（曲率）与整体拓扑性质（欧拉示性数）联系起来。是微分几何中最深刻的结果之一。",
  },
  {
    id: "galois-theorem",
    name: { zh: "伽罗瓦定理", en: "Galois' Theorem" },
    mathematician: "galois",
    year: 1832,
    field: "代数学",
    statement: "五次及以上一般代数方程没有根式解。",
    significance:
      "用群论解决了困扰数学家三个世纪的问题。伽罗瓦理论将方程的可解性转化为群的结构性质，开创了抽象代数。",
  },
  {
    id: "riemann-hypothesis",
    name: { zh: "黎曼猜想", en: "Riemann Hypothesis" },
    mathematician: "riemann",
    year: 1859,
    field: "数论",
    statement: "黎曼ζ函数的所有非平凡零点的实部都等于 1/2。",
    significance:
      "数学中最重要的未解问题之一。与素数分布密切相关。是克雷数学研究所七大千禧年问题之一，悬赏100万美元。",
    historicalContext:
      "黎曼在1859年提交给柏林科学院的仅有的数论论文中提出了这一猜想。他将ζ函数从实数域解析延拓到复平面，发现其零点分布与素数计数函数 π(x) 的精确公式密切相关。至今已有超过十万亿个零点被验证满足猜想，但一般性证明仍未找到。",
    applications: [
      "素数分布的精确估计（密码学安全性分析）",
      "随机矩阵理论在量子物理中的应用",
      "编码理论中纠错码的设计",
      "数论中各类渐近公式的精确化",
    ],
  },
  {
    id: "stokes-theorem",
    name: { zh: "斯托克斯定理", en: "Stokes' Theorem" },
    mathematician: "stokes",
    year: 1854,
    field: "微分几何 / 向量分析",
    statement: "流形上的微分形式在边界上的积分等于其外微分在整个流形上的积分。",
    significance:
      "统一了向量微积分中的格林定理、高斯散度定理和经典斯托克斯定理。是现代微分几何和物理学的基本工具。",
  },

  // ===== 新增定理 =====

  {
    id: "thales-theorem",
    name: { zh: "泰勒斯定理", en: "Thales' Theorem" },
    mathematician: "thales",
    year: -585,
    field: "几何学",
    statement: "半圆上的圆周角是直角。即：若A、B是圆的直径两端点，C是圆上任意一点（非A、B），则∠ACB = 90°。",
    significance:
      "被认为是数学史上第一个需要证明的定理，标志着数学从经验归纳走向逻辑推理的转折点。泰勒斯因此被尊为'希腊数学之父'。",
    proofSketch:
      "设圆心为O，连接OC。因为OA = OB = OC（均为半径），所以△OAC和△OBC都是等腰三角形。设∠OAC = α，∠OBC = β，则∠AOC = 180° - 2α，∠BOC = 180° - 2β。由于∠AOC + ∠BOC = 180°（平角），解得α + β = 90°，因此∠ACB = 90°。",
  },
  {
    id: "zeno-paradox",
    name: { zh: "芝诺悖论", en: "Zeno's Paradoxes" },
    mathematician: "zeno",
    year: -450,
    field: "分析学 / 哲学",
    statement: "阿基里斯追不上乌龟：每当阿基里斯到达乌龟之前的位置，乌龟已经又前进了一段距离，因此他永远追不上乌龟。",
    significance:
      "揭示了无穷级数求和的直觉困难，推动了极限理论和实数严格化的发展。虽然结论错误，但其深刻性促使数学家花了一千多年才完全解决。",
    proofSketch:
      "悖论的谬误在于假设'无穷多个正数之和一定是无穷大'。设阿基里斯速度为v₁，乌龟速度为v₂（v₁ > v₂），领先距离为d。追赶时间 = d/v₁ + d·v₂/(v₁²) + ... = d/v₁ · 1/(1 - v₂/v₁) = d/(v₁ - v₂)，是有限值。",
  },
  {
    id: "eratosthenes-sieve",
    name: { zh: "埃拉托斯特尼筛法", en: "Sieve of Eratosthenes" },
    mathematician: "eratosthenes",
    year: -240,
    field: "数论 / 计算数学",
    statement: "通过逐步筛除已知素数的倍数，可以高效地找出不超过n的所有素数。",
    significance:
      "人类历史上第一个系统性的素数生成算法。其思想至今仍是数论计算和算法设计的基础，时间复杂度为O(n log log n)。",
    proofSketch:
      "从2开始，将每个素数的所有倍数标记为合数。对n以内的每个未被标记的数，它一定是素数（因为它的所有真因数都已被更小的素数筛除）。",
  },
  {
    id: "chinese-remainder",
    name: { zh: "中国剩余定理", en: "Chinese Remainder Theorem" },
    mathematician: "sunzi",
    year: 300,
    field: "数论",
    statement: "设 m₁, m₂, ..., mₖ 两两互素，则同余方程组 x ≡ a₁ (mod m₁), x ≡ a₂ (mod m₂), ..., x ≡ aₖ (mod mₖ) 在模 M = m₁m₂...mₖ 下有唯一解。",
    significance:
      "数论中的基本定理，由中国数学家孙子（孙算经）首先提出。在密码学、计算机科学和编码理论中有广泛应用。是模运算和环论的重要基础。",
    proofSketch:
      "令 Mᵢ = M/mᵢ，由于 mᵢ 两两互素，Mᵢ 与 mᵢ 互素，存在逆元 yᵢ 使 Mᵢyᵢ ≡ 1 (mod mᵢ)。则 x = ΣaᵢMᵢyᵢ 即为解。唯一性由模M的剩余系保证。",
  },
  {
    id: "binomial-theorem",
    name: { zh: "二项式定理", en: "Binomial Theorem" },
    mathematician: "newton",
    year: 1665,
    field: "代数学 / 组合数学",
    statement: "(a + b)ⁿ = Σ[k=0 to n] C(n,k) · aⁿ⁻ᵏ · bᵏ，其中 C(n,k) = n! / (k!(n-k)!)",
    significance:
      "将代数展开与组合数联系起来，是代数学和组合数学的桥梁。牛顿将其推广到分数和负数指数，为幂级数理论奠定了基础。",
    proofSketch:
      "用数学归纳法：n=1时显然成立。假设n时成立，(a+b)ⁿ⁺¹ = (a+b)·(a+b)ⁿ，展开后利用组合恒等式 C(n,k) + C(n,k-1) = C(n+1,k) 合并同类项即得。",
  },
  {
    id: "taylor-theorem",
    name: { zh: "泰勒定理", en: "Taylor's Theorem" },
    mathematician: "taylor",
    year: 1715,
    field: "分析学",
    statement: "若函数f在点a处n+1次可微，则 f(x) = Σ[k=0 to n] f⁽ᵏ⁾(a)/k! · (x-a)ᵏ + Rₙ(x)，其中Rₙ(x)为余项。",
    significance:
      "将光滑函数用多项式逼近，是数值分析、物理学和工程学的基础工具。泰勒级数是函数论和特殊函数理论的核心。",
    proofSketch:
      "定义余函数 g(t) = f(x) - Σf⁽ᵏ⁾(t)/k!·(x-t)ᵏ - (x-a)ⁿ⁺¹/(n+1)!·M，其中M由Rolle定理的推广确定。反复应用Rolle定理即得余项表达式。",
  },
  {
    id: "euler-formula",
    name: { zh: "欧拉公式", en: "Euler's Formula" },
    mathematician: "euler",
    year: 1748,
    field: "分析学 / 复分析",
    statement: "e^{ix} = cos(x) + i·sin(x)，对所有实数x成立。",
    significance:
      "将指数函数与三角函数统一在复数域中，是复分析的基石。当x=π时即得欧拉恒等式。被誉为'数学中最伟大的公式之一'。",
    proofSketch:
      "将e^{ix}、cos(x)、sin(x)分别展开为麦克劳林级数：e^{ix} = Σ(ix)ⁿ/n!，分离实部和虚部，恰好对应cos(x)和sin(x)的级数展开。",
  },
  {
    id: "lagrange-theorem",
    name: { zh: "拉格朗日定理（群论）", en: "Lagrange's Theorem (Group Theory)" },
    mathematician: "lagrange",
    year: 1771,
    field: "抽象代数",
    statement: "有限群G的子群H的阶整除G的阶，即 |H| 整除 |G|。",
    significance:
      "有限群论的第一个基本定理，建立了子群阶与群阶之间的整除关系。由此推出：群中任意元素的阶整除群的阶（费马小定理的推广）。",
    proofSketch:
      "定义G上关于H的左陪集等价关系：a~b当且仅当a⁻¹b∈H。每个陪集恰好有|H|个元素，且不同陪集不相交。G被划分为若干个陪集的并，因此|G|是|H|的倍数。",
  },
  {
    id: "green-theorem",
    name: { zh: "格林定理", en: "Green's Theorem" },
    mathematician: "green",
    year: 1828,
    field: "向量分析 / 微分几何",
    statement: "设D是平面上的有界闭区域，∂D是其正向边界，P和Q在D上连续可微，则 ∮_∂D (Pdx + Qdy) = ∬_D (∂Q/∂x - ∂P/∂y) dA",
    significance:
      "将曲线积分与二重积分联系起来，是向量微积分的基本定理之一。是斯托克斯定理在二维的特例，也是流体力学和电磁学的基本工具。",
    proofSketch:
      "对区域D进行简单化（分为x型或y型区域），将二重积分化为累次积分，再利用微积分基本定理逐次计算，边界上的线积分恰好等于内部分量的差。",
  },
  {
    id: "divergence-theorem",
    name: { zh: "散度定理", en: "Divergence Theorem (Gauss's Theorem)" },
    mathematician: "gauss",
    year: 1813,
    field: "向量分析 / 微分几何",
    statement: "设V是三维空间中的有界闭区域，∂V是其外法向边界，则 ∭_V (∇·F) dV = ∬_∂V F·n dS",
    significance:
      "将体积分与面积分联系起来，是向量微积分的核心定理。在电磁学中对应高斯定律，在流体力学中表示流出量等于源的总强度。",
    proofSketch:
      "将向量场F分解为三个分量，对每个分量分别应用微积分基本定理。例如对F₁分量：∭∂F₁/∂x dV = ∬F₁ n₁ dS，这由累次积分和牛顿-莱布尼茨公式得到。",
  },
  {
    id: "cantor-theorem",
    name: { zh: "康托尔定理", en: "Cantor's Theorem" },
    mathematician: "cantor",
    year: 1891,
    field: "集合论",
    statement: "对任意集合A，A的幂集P(A)的基数严格大于A的基数，即 |A| < |P(A)|。",
    significance:
      "证明了不存在最大的无穷——总可以构造更大的无穷基数。由此产生了无穷基数的层级：ℵ₀, ℵ₁, ℵ₂, ...，彻底改变了人类对无穷的认识。",
    proofSketch:
      "用反证法：假设存在满射 f: A → P(A)。令 B = {a ∈ A : a ∉ f(a)}，则B∈P(A)。若B = f(b)，则 b∈B ⟺ b∉f(b) = B，矛盾。因此不存在满射，|A| < |P(A)|。",
  },
  {
    id: "brouwer-fixed-point",
    name: { zh: "布劳威尔不动点定理", en: "Brouwer Fixed Point Theorem" },
    mathematician: "brouwer",
    year: 1910,
    field: "拓扑学",
    statement: "从n维闭球到自身的任意连续映射至少有一个不动点。",
    significance:
      "拓扑学中最直观且应用最广的定理之一。直觉上：搅拌一杯咖啡后，至少有一点在搅拌前后位置不变。",
    proofSketch:
      "用同调论：假设没有不动点，可以构造从球面到自身的连续映射 f(x) = (g(x)-x)/|g(x)-x|，其中g是原映射。但恒等映射与常值映射在同调群上诱导不同的映射，矛盾。",
  },
  {
    id: "heisenberg-uncertainty",
    name: { zh: "海森堡不确定性原理", en: "Heisenberg Uncertainty Principle" },
    mathematician: "heisenberg",
    year: 1927,
    field: "数学物理 / 泛函分析",
    statement: "对于任意量子态，位置x和动量p的不确定度满足 Δx · Δp ≥ ℏ/2，其中ℏ = h/(2π)。",
    significance:
      "量子力学的基本原理，揭示了微观世界的内在随机性。在数学上，它是傅里叶分析中关于函数与其傅里叶变换的带宽-时间不确定关系的物理诠释。",
    proofSketch:
      "利用柯西-施瓦茨不等式和对易关系 [x̂, p̂] = iℏ：设 f = (x̂ - ⟨x̂⟩)ψ，g = (p̂ - ⟨p̂⟩)ψ，则 |⟨f,g⟩|² ≤ ||f||²·||g||²，结合 Re⟨f,g⟩² + Im⟨f,g⟩² = |⟨f,g⟩²| 和 Im⟨f,g⟩ = ℏ/2 即得。",
  },
  {
    id: "shannon-theorem",
    name: { zh: "香农信道编码定理", en: "Shannon's Channel Coding Theorem" },
    mathematician: "shannon",
    year: 1948,
    field: "信息论",
    statement: "对于信道容量为C的有噪信道，当信息传输率R < C时，存在编码方案使错误概率任意接近零；当R > C时，不存在这样的编码方案。",
    significance:
      "开创了信息论，定义了信道容量的概念。证明了可靠通信在理论上是可能的，即使信道存在噪声。奠定了现代通信系统的理论基础。",
    proofSketch:
      "香农使用随机编码论证：随机选取码本，对典型序列进行联合典型解码。当码长趋于无穷时，错误概率趋于零（只要R < C）。证明是非构造性的——它证明了好的编码存在，但没有给出具体构造。",
  },
  {
    id: "nash-equilibrium",
    name: { zh: "纳什均衡存在定理", en: "Nash Equilibrium Existence Theorem" },
    mathematician: "nash",
    year: 1950,
    field: "博弈论",
    statement: "每个有限博弈（有限个参与者，每个参与者有限个纯策略）都至少存在一个混合策略纳什均衡。",
    significance:
      "博弈论的基石定理。纳什均衡是分析战略互动的标准解概念，广泛应用于经济学、政治学、生物学和计算机科学。纳什因此获得1994年诺贝尔经济学奖。",
    proofSketch:
      "将混合策略纳什均衡的存在性转化为不动点问题。每个参与者的最优反应对应构成从混合策略空间到自身的映射，由角谷不动点定理（Brouwer不动点定理的集值推广）保证不动点（即均衡）存在。",
  },
  {
    id: "finite-simple-groups",
    name: { zh: "有限单群分类定理", en: "Classification of Finite Simple Groups" },
    mathematician: "many",
    year: 1983,
    field: "抽象代数",
    statement: "每个有限单群都同构于以下四类之一：循环群 Zₚ（p为素数）、交错群 Aₙ（n≥5）、李型群、或26个散在群之一（包括魔群）。",
    significance:
      "20世纪数学最宏伟的定理之一。证明跨越500多篇论文、上万页，涉及上百位数学家。被称为'数学中最庞大的证明'。它是群论的终极分类，如同化学中的元素周期表。",
    proofSketch:
      "证明分为多个阶段：先处理特征2型群和奇特征型群的分类，再确定散在群。核心工具包括局部分析、信号函子法、分支定理等。证明的简化工作仍在进行中。",
  },
  {
    id: "pigeonhole-principle",
    name: { zh: "鸽巢原理", en: "Pigeonhole Principle" },
    mathematician: "dirichlet",
    year: 1834,
    field: "组合数学",
    statement: "如果n+1个物体放入n个盒子，则至少有一个盒子包含两个或更多物体。",
    significance:
      "组合数学中最基本也最强大的证明工具之一。虽然原理极其简单，但可以用来证明许多深刻的结论。狄利克雷将其系统应用于数论问题。",
    proofSketch:
      "反证法：若每个盒子最多放一个物体，则n个盒子最多放n个物体，与有n+1个物体矛盾。",
  },
  {
    id: "boltzmann-entropy",
    name: { zh: "玻尔兹曼熵公式", en: "Boltzmann Entropy Formula" },
    mathematician: "boltzmann",
    year: 1877,
    field: "统计力学 / 数学物理",
    statement: "S = k_B · ln(W)，其中S是熵，k_B是玻尔兹曼常数，W是系统的微观状态数。",
    significance:
      "连接了微观统计与宏观热力学，是统计力学的基石。公式被刻在玻尔兹曼的墓碑上，深刻揭示了熵的统计本质——无序度的度量。",
    proofSketch:
      "由热力学第二定律 dS = δQ/T 和统计力学中可及微观状态数W的定义，通过最概然分布的拉格朗日乘子法推导出S与ln(W)的正比关系。",
  },
  {
    id: "no-free-lunch",
    name: { zh: "没有免费午餐定理", en: "No Free Lunch Theorem" },
    mathematician: "wolpert",
    year: 1997,
    field: "优化理论 / 机器学习",
    statement: "对所有可能的问题分布取平均，任何优化/学习算法的性能都相同。没有一个算法在所有问题上都优于其他算法。",
    significance:
      "深刻揭示了算法的本质局限：不存在'万能'的优化或学习算法。算法的有效性总是依赖于对问题结构的先验假设。",
    proofSketch:
      "对所有可能的目标函数取平均时，任何两个搜索算法的总性能相等。因为对每个使算法A优于B的函数，都存在一个使B优于A的函数（通过重排列）。",
  },
  {
    id: "rsa-theorem",
    name: { zh: "RSA加密原理", en: "RSA Encryption Principle" },
    mathematician: "rivest",
    year: 1977,
    field: "密码学 / 数论",
    statement: "设p、q为大素数，n=pq，e与φ(n)=(p-1)(q-1)互素，d满足 ed ≡ 1 (mod φ(n))。则对消息m：(m^e)^d ≡ m (mod n)。",
    significance:
      "第一个实用的公钥加密算法，基于大数分解的计算困难性。开启了现代公钥密码学时代，是互联网安全通信（HTTPS、数字签名）的理论基础。",
    proofSketch:
      "由欧拉定理 m^{φ(n)} ≡ 1 (mod n)（当gcd(m,n)=1），ed = 1 + kφ(n)，因此 (m^e)^d = m^{ed} = m^{1+kφ(n)} = m · (m^{φ(n)})^k ≡ m (mod n)。对gcd(m,n)≠1的情形需分别验证。",
  },
];

export function getTheoremById(id: string): Theorem | null {
  return THEOREMS.find((t) => t.id === id) ?? null;
}

export const THEOREM_IDS = THEOREMS.map((t) => t.id);

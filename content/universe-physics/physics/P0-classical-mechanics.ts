import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "P0",
  name: { primary: "经典力学", latin: "Classical Mechanics" },
  tagline: "三百年依然管用的脚手架",
  whisper: "牛顿写下 F = ma 的那个下午，给了我们一根可拆装宇宙的扳手。",

  dataCards: [
    { label: "万有引力常数", latinLabel: "G", value: "6.674 30 × 10⁻¹¹", hint: "N · m² / kg²" },
    { label: "重力加速度", latinLabel: "g", value: "9.806 65", hint: "m / s²（标准值）" },
    { label: "Lagrangian", latinLabel: "L", value: "L = T − V", hint: "动能 − 势能" },
    { label: "Hamiltonian", latinLabel: "H", value: "H = T + V", hint: "总能量（守恒系统）" },
    {
      label: "最小作用量",
      value: "δS = δ∫L dt = 0",
      hint: "Hamilton 原理：自然走最短路径",
    },
    { label: "Kepler 第三定律", value: "T² ∝ a³", hint: "周期² 正比于半长轴³" },
    {
      label: "Noether 定理",
      value: "对称 ⇒ 守恒",
      hint: "时间平移 ⇒ 能量；空间平移 ⇒ 动量；旋转 ⇒ 角动量",
    },
    { label: "二体约化质量", latinLabel: "μ", value: "m₁m₂ / (m₁+m₂)", hint: "把两体化为单体问题" },
    {
      label: "Reynolds 数",
      latinLabel: "Re",
      value: "ρ v L / μ",
      hint: "无量纲 · 惯性力 / 粘性力之比",
    },
    {
      label: "Kolmogorov 标度",
      value: "E(k) ∝ k^(−5/3)",
      hint: "三维各向同性湍流惯性子区 · 1941",
    },
    {
      label: "Hohmann 转移 Δv",
      value: "≈ 3.94 km/s",
      hint: "LEO → GTO（理想椭圆双脉冲）",
    },
    {
      label: "三体问题数值记录",
      value: "≥ 2000+",
      hint: "周期轨道族 · 2024 年数值新族仍在增长",
    },
    {
      label: "Lorenz 吸引子参数",
      value: "σ=10, ρ=28, β=8/3",
      hint: "经典混沌 · 1963 · 蝴蝶效应",
    },
    {
      label: "湍流直接数值模拟",
      value: "Re_λ ≈ 1000+",
      hint: "2024 年最大 DNS · 超算前沿",
    },
  ],

  narrative: [
    {
      heading: "牛顿三定律 · 三百年的脚手架",
      body: [
        "1687 年，牛顿在《自然哲学的数学原理》里给出三条公理：惯性、F = ma、作用与反作用。这三条看似朴素，却把当时分裂的「天上的运动」与「地上的运动」缝合成同一套语言——苹果落地与月亮绕地用的是同一条引力定律。",
        "几乎所有工程学（航天、建筑、机械）至今仍站在这三条定律的肩膀上。牛顿力学的「失效域」很明确：当速度接近光速时让位给狭义相对论（P3），当尺度接近 ℏ 时让位给量子力学（P4），但在中间地带它精确到惊人。",
      ],
    },
    {
      heading: "拉格朗日 / 哈密顿 · 从轨迹到相空间",
      body: [
        "Lagrange 在 1788 年的《Mécanique analytique》里完全用代数取代了几何作图。他定义 L = T − V，宣称物体的真实轨迹是让作用量 S = ∫L dt 取极值的那条路径。这套**变分原理**比牛顿方程更普适，可以毫不费力地处理约束运动、转动坐标、广义坐标。",
        "Hamilton 1833 年又把视角拉到 (q, p) 相空间——位置 q 与共轭动量 p 一起。Hamilton 方程 dq/dt = ∂H/∂p, dp/dt = −∂H/∂q 是一对完全对称的一阶方程，每一步在相空间里画出一条流线。这套语言后来直接被量子力学借用：算符代数里的 [q̂, p̂] = iℏ 几乎是 Poisson 括号的逐字翻译。",
        "实操层面：搞航天轨道、固体物理声子、等离子体磁约束、AI 中的 Hamiltonian Monte Carlo——全部都说 Hamilton 语言。学好它，就是给后面所有物理铺路。",
      ],
    },
    {
      heading: "守恒律 · 对称性 · Noether 定理（桥到量子的暗线）",
      body: [
        "Emmy Noether 1918 年证明：连续对称性必然对应守恒律。时间平移对称 ⇒ 能量守恒；空间平移 ⇒ 动量守恒；旋转 ⇒ 角动量；规范变换 ⇒ 电荷守恒。这条定理把「为什么会守恒」从神秘性变成了几何性。",
        "Noether 定理在经典力学里只是优雅，但到了量子场论（P7）它是发动机——粒子物理整个标准模型本质上就是把对称性写成 Lagrangian 然后让 Noether 自动产生守恒流。从 P0 走到 P7，跟着这条「对称 ⇒ 守恒」的暗线走就不会迷路。",
      ],
    },
    {
      heading: "经典混沌 · 三体不可解 · KAM 定理",
      body: [
        "Poincaré 1890 年代发现：三体引力问题没有解析解，且对初始条件极度敏感。这就是「经典混沌」的源头——一个完全确定（每一步可算）的系统可以表现出长期完全不可预测的行为。",
        "20 世纪 50–60 年代 Kolmogorov-Arnold-Moser 三人给出 KAM 定理：在弱扰动下大多数准周期轨道仍然存活，但混沌区域随扰动放大而扩张。今天的太阳系演化、湍流转捩、神经动力学全部依赖这套现代经典力学。",
      ],
    },
    {
      heading: "Navier-Stokes · 湍流的标度迷宫",
      body: [
        "把牛顿第二定律写给一团连续的流体，就得到不可压缩 Navier-Stokes 方程 ρ(∂_t u + u·∇u) = −∇p + μ∇²u。这条 PDE 是飞机机翼、心血管血流、海洋环流共用的剧本；但它的三维光滑解是否在有限时间内必然存在，仍是 Clay 千禧难题之一。",
        "Reynolds 数 Re = ρvL/μ 决定了流动的性格：Re ≪ 1 时粘性主导，方程接近 Stokes 蠕流；Re ≫ 10³ 后惯性主导，能量从最大尺度 L 注入，在惯性子区按 Kolmogorov 1941 的能谱 E(k) ∝ ε^(2/3) k^(−5/3) 级联到耗散尺度 η = (ν³/ε)^(1/4)，再被粘性烧成热。这个看似简洁的 −5/3 标度，是宇宙中从星际介质到一杯搅动咖啡都遵循的「随机的秩序」。",
      ],
    },
    {
      heading: "Navier-Stokes 千禧难题 · 湍流的终极问题",
      body: [
        "2000 年 Clay 数学研究所把 Navier-Stokes 方程光滑解的存在性与唯一性列为七大千禧难题之一，悬赏 100 万美元。问题本身很简洁：给定光滑初始速度场和适当的边界条件，三维不可压缩 Navier-Stokes 方程的解是否在所有时间保持光滑？还是会在有限时间内产生奇点（速度或导数发散）？",
        "这个问题之所以困难，是因为非线性对流项 u·∇u 可以把能量从大尺度「聚焦」到小尺度，理论上可能在有限时间内产生无穷大的速度梯度。1934 年 Leray 证明了弱解的存在性，但弱解的唯一性和正则性至今未解决。",
        "与物理的关系：如果光滑解总存在，意味着湍流不会产生真正的数学奇点——所有尺度上的速度场都保持有界。如果奇点可以形成，则意味着 Navier-Stokes 方程在描述极端湍流时需要「新物理」修正。2022 年 Terence Tao 提出了一个「平均化」版本的 Navier-Stokes 方程并证明了有限时间爆破，虽然原始方程仍未解决，但揭示了非线性对流项的危险本质。",
      ],
    },
    {
      heading: "三体问题 · 混沌与量子力学诠释的实验前沿",
      body: [
        "三体引力问题是混沌的经典范例：三个天体在相互引力作用下的运动没有通用解析解，且对初始条件极度敏感。2013 年 Šuvakov 和 Dmitrašinović 用数值方法找到了 13 个新的周期轨道族，2024 年中国学者用 GPU 集群又发现了数百个新族——三体问题的「解空间」远比想象中丰富。",
        "量子力学诠释的实验检验是另一个前沿。传统 Copenhagen 诠释、Many-Worlds 诠释和 Bohmian 力学在经验上完全等价，但近年来出现了可以区分它们的实验方案。2019 年一项使用量子计算机模拟波函数坍缩的实验首次在多体系统中检验了退相干过程，结果与 decoherence 理论预言一致。2023 年的「弱测量」实验开始探测波函数的「本体论」结构——是物理实在还是纯信息？",
      ],
    },
    {
      heading: "经典场论 · Lagrangian 密度与 Noether 流",
      body: [
        "把离散坐标 q_i(t) 换成场 φ(x, t)，Lagrange 力学就升级为经典场论：作用量 S = ∫ ℒ(φ, ∂_μφ) d⁴x，欧拉-拉格朗日方程变成 ∂_μ(∂ℒ/∂(∂_μφ)) = ∂ℒ/∂φ。弹性介质的波动方程、Maxwell 电磁场、广义相对论都能装进同一个变分框架里。",
        "Noether 在场论版本里给出更强的结论：每条连续对称性都对应一条**守恒流** j^μ，∂_μ j^μ = 0，体积积分给出守恒荷。能量-动量张量 T^μν 来自时空平移对称性；电荷流来自 U(1) 规范对称；这条「对称 → 流」的桥直接把 P0 焊到 P7 的标准模型——后者本质上就是把规范对称写成 Lagrangian 密度后让 Noether 自动给出色荷、弱同位旋、超荷守恒。",
      ],
    },
  ],

  sources: [
    {
      label: "Goldstein · Classical Mechanics（研究生标准）",
      url: "https://en.wikipedia.org/wiki/Classical_Mechanics_(Goldstein_book)",
      kind: "encyclopedia",
    },
    {
      label: "Landau-Lifshitz Vol 1 · Mechanics",
      url: "https://en.wikipedia.org/wiki/Course_of_Theoretical_Physics",
      kind: "encyclopedia",
    },
    {
      label: "MIT 8.01 Classical Mechanics (OCW)",
      url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      kind: "encyclopedia",
    },
    {
      label: "Feynman Lectures · Vol I",
      url: "https://www.feynmanlectures.caltech.edu/I_toc.html",
      kind: "encyclopedia",
    },
    {
      label: "Noether's Theorem · 原文",
      url: "https://en.wikipedia.org/wiki/Noether%27s_theorem",
      kind: "encyclopedia",
    },
    {
      label: "Clay · Navier-Stokes Millennium Problem",
      url: "https://www.claymath.org/millennium/navier-stokes-equation/",
      kind: "encyclopedia",
    },
    {
      label: "Frisch 1995 · Turbulence (Kolmogorov legacy)",
      url: "https://www.cambridge.org/core/books/turbulence/2A55D32FB137F7F44CDF8F4475DC1AE3",
      kind: "encyclopedia",
    },
    {
      label: "Clay Mathematics Institute — Navier-Stokes Millennium Problem",
      url: "https://www.claymath.org/millennium/navier-stokes-equation/",
      kind: "agency",
    },
    {
      label:
        "Šuvakov & Dmitrašinović 2013 — Three Classes of Newtonian Three-Body Planar Periodic Orbits",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.110.114301",
      kind: "paper",
    },
  ],

  markers: [
    {
      id: "newton-gravity",
      name: { primary: "万有引力", latin: "Universal Gravitation" },
      position: [-0.6, 0, -0.4],
      description:
        "F = G m₁m₂ / r²。牛顿 1687 年的「宇宙引擎」——同一个力既让苹果落地，也让月亮绕地。",
      data: [
        { label: "G", value: "6.674 × 10⁻¹¹" },
        { label: "年份", value: "1687" },
        { label: "互文", value: "T6 太阳系 · Kepler" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "lagrangian-action",
      name: { primary: "最小作用量", latin: "Principle of Least Action" },
      position: [0.4, 0, 0.5],
      description:
        "δS = δ∫(T − V) dt = 0。自然界总是选择让作用量取极值的路径。这条原理一直走到量子场论的路径积分。",
      data: [
        { label: "提出", value: "Maupertuis 1744" },
        { label: "形式化", value: "Lagrange 1788" },
        { label: "互文", value: "P4 量子 · 路径积分" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "kepler-laws",
      name: { primary: "Kepler 三定律", latin: "Kepler's Laws" },
      position: [0.7, 0, -0.1],
      description:
        "(1) 椭圆轨道，(2) 等面积定律（角动量守恒），(3) T² ∝ a³。1609–1619 给出，比牛顿引力早 68 年——经验先于理论。",
      data: [
        { label: "椭圆", value: "焦点在中心天体" },
        { label: "T²∝a³", value: "周期定律" },
      ],
      color: "var(--hw-gold)",
      size: 0.03,
    },
    {
      id: "noether",
      name: { primary: "Noether 定理", latin: "Noether's Theorem" },
      position: [-0.5, 0, 0.6],
      description:
        "每一个连续对称性都生出一条守恒律。这条 1918 年的定理是从经典走到标准模型的暗线。",
      data: [
        { label: "时间平移", value: "→ 能量" },
        { label: "空间平移", value: "→ 动量" },
        { label: "旋转", value: "→ 角动量" },
      ],
      color: "var(--hw-blue)",
      size: 0.032,
    },
    {
      id: "phase-space",
      name: { primary: "相空间", latin: "Phase Space" },
      position: [-0.2, 0, -0.7],
      description:
        "(q, p) 坐标系。每一个动力学态都是相空间里的一个点；时间演化是一条流线。后面量子力学的密度矩阵和经典力学的 Liouville 定理共用这个底子。",
      data: [
        { label: "Liouville", value: "相体积守恒" },
        { label: "辛流形", value: "现代几何视角" },
      ],
      color: "var(--hw-gold)",
      size: 0.028,
    },
    {
      id: "chaos",
      name: { primary: "经典混沌", latin: "Classical Chaos" },
      position: [0.1, 0, 0.8],
      description:
        "确定但不可预测。Poincaré 1890 年代发现三体问题对初值极度敏感；KAM 定理把这种敏感性变成了定量理论。",
      data: [
        { label: "Lyapunov 指数", value: "λ > 0 即混沌" },
        { label: "KAM", value: "Kolmogorov-Arnold-Moser" },
      ],
      color: "var(--hw-red)",
      size: 0.025,
    },
  ],
};

export default content;

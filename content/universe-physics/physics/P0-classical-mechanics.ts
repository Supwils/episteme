import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P0",
  name: { primary: "经典力学", latin: "Classical Mechanics" },
  tagline: "三百年依然管用的脚手架",
  whisper: "从苹果落地到月球绕行，同一套运动定律把天地连在一起。",

  dataCards: [
    { label: "万有引力常数", latinLabel: "G", value: "6.674 30 × 10⁻¹¹", hint: "N · m² / kg²" },
    { label: "重力加速度", latinLabel: "g", value: "9.806 65", hint: "m / s²（标准值）" },
    { label: "Lagrangian", latinLabel: "L", value: "L = T − V", hint: "动能 − 势能" },
    {
      label: "Hamiltonian",
      latinLabel: "H",
      value: "H = Σ pᵢq̇ᵢ − L",
      hint: "通常的自然系统中等于 T + V；不显含时间时守恒",
    },
    {
      label: "驻定作用量",
      value: "δS = δ∫L dt = 0",
      hint: "Hamilton 原理：固定端点时一阶变分为零，不保证最小",
    },
    {
      label: "Kepler 第三定律",
      value: "T² ∝ a³",
      hint: "牛顿二体近似下，总质量相同时比较周期与半长轴",
    },
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
      value: "≈ 3.93 km/s",
      hint: "约 200 km 圆形近地轨道 → GEO；共面双脉冲总量，未计倾角修正",
    },
    {
      label: "三体周期轨道",
      value: "13 条不同周期轨道",
      hint: "Šuvakov 与 Dmitrašinović，2013；按后续分类属 11 个新族，非当前总数",
    },
    {
      label: "Lorenz 吸引子参数",
      value: "σ=10, ρ=28, β=8/3",
      hint: "经典混沌 · 1963 · 蝴蝶效应",
    },
    {
      label: "Kolmogorov 耗散尺度",
      value: "η = (ν³/ε)^(1/4)",
      hint: "ν 为运动黏度；ε 为单位质量平均能量耗散率",
    },
  ],

  narrative: [
    {
      heading: "牛顿三定律 · 三百年的脚手架",
      body: [
        "1687 年，牛顿在《自然哲学的数学原理》里提出三条运动定律：惯性、运动量的变化与外力的关系、作用与反作用。对质量恒定的质点，第二定律在现代记号下写成 F = ma。这套框架把当时分裂的「天上的运动」与「地上的运动」缝合成同一套语言——苹果落地与月亮绕地用的是同一条引力定律。",
        "航天、建筑、机械至今大量使用牛顿力学。当速度接近光速时需要相对论（P3），当相关作用量与约化普朗克常数 ℏ 可比时，通常需要量子描述（P4）；ℏ 是作用量单位，不是一把长度尺。经典近似的精度要由具体系统和测量要求判断。",
      ],
    },
    {
      heading: "拉格朗日 / 哈密顿 · 从轨迹到相空间",
      body: [
        "Lagrange 在 1788 年的《Mécanique analytique》里系统发展了分析力学，强调用代数和广义坐标处理运动。现代写法中，许多保守系统可取 L = T − V；固定起止时刻和位置，真实轨迹满足作用量 S = ∫L dt 的一阶变分 δS = 0。这个 Hamilton 原理的条件是**驻定**，可能是局部最小，也可能是鞍点；它不要求路程最短。完整约束可以通过选择广义坐标处理，非完整约束则须另作分析。",
        "Hamilton 在 1834、1835 年的动力学论文中发展了这套方法。相空间把广义坐标 q 与共轭动量 p 一起使用；在通常的正则条件下，Hamilton 方程 dq/dt = ∂H/∂p、dp/dt = −∂H/∂q 描述一条相空间流线。这套语言后来成为量子理论的重要出发点：[q̂, p̂] = iℏ 与经典正则 Poisson 括号相呼应，但任意经典可观测量之间的括号不能一律精确替换成算符对易子。",
        "实操层面：搞航天轨道、固体物理声子、等离子体磁约束、AI 中的 Hamiltonian Monte Carlo——全部都说 Hamilton 语言。学好它，就是给后面所有物理铺路。",
      ],
    },
    {
      heading: "守恒律 · 对称性 · Noether 定理（桥到量子的暗线）",
      body: [
        "Emmy Noether 在 1918 年发表的第一定理，把作用量的连续全局对称性与运动方程成立时的守恒量联系起来。时间平移对称 ⇒ 能量守恒；空间平移 ⇒ 动量守恒；旋转 ⇒ 角动量守恒。在带电物质场的例子里，全局 U(1) 相位对称对应电荷流。",
        "Noether 定理也是量子场论（P7）的核心工具。这里必须区分全局对称与局部规范冗余：后者还涉及 Noether 第二定理、场方程之间的恒等式和约束，不能简单理解成每个规范参数都产生一个独立可观测守恒荷。量子理论还要检查反常等条件。",
      ],
    },
    {
      heading: "经典混沌 · 三体的非可积性 · KAM 定理",
      body: [
        "Poincaré 在三体问题研究中揭示了非可积性与复杂轨道结构。三体问题存在特殊的精确解和大量周期轨道，却没有像牛顿二体问题那样通用而简便的解析求解法。在混沌区域，初值误差会被迅速放大，使有限精度下的长期预报受到限制；这不等于所有三体轨道都混沌，也不等于未来完全不能计算。",
        "20 世纪 50–60 年代 Kolmogorov、Arnold、Moser 建立 KAM 理论：在足够光滑、非退化等条件下，可积 Hamilton 系统受到足够小的扰动后，许多非共振不变环面仍然存在。它说明规则运动怎样在扰动中存活；共振附近的复杂运动还需要其他工具分析，混沌区域也不保证随扰动强度单调扩大。",
      ],
    },
    {
      heading: "Navier-Stokes · 湍流的标度迷宫",
      body: [
        "把动量守恒应用于常密度、常黏度的不可压缩牛顿流体，在不计体积力时得到 ρ(∂_t u + u·∇u) = −∇p + μ∇²u，并须同时满足 ∇·u = 0。它是航空、血流和海洋建模的重要基础，具体应用还可能需要体积力、旋转或可压缩性等修正。三维光滑解能否在所有时间保持光滑，是 Clay 千禧难题之一。",
        "Reynolds 数 Re = ρvL/μ 衡量惯性与黏性的相对作用。低 Re 的缓慢流动常可近似为 Stokes 蠕流；高 Re 允许丰富的惯性效应，但转捩阈值取决于几何、扰动和边界条件。在充分发展的三维湍流中，Kolmogorov 1941 理论在局部各向同性等假设下预言惯性子区能谱 E(k) ∝ ε^(2/3) k^(−5/3)，耗散尺度为 η = (ν³/ε)^(1/4)。这是一套有适用条件的标度理论，不能照搬到所有二维、可压缩或磁流体湍流。",
      ],
    },
    {
      heading: "Navier-Stokes 千禧难题 · 湍流的终极问题",
      body: [
        "2000 年 Clay 数学研究所把 Navier-Stokes 方程光滑解的存在性与唯一性列为七大千禧难题之一，悬赏 100 万美元。问题本身很简洁：给定光滑初始速度场和适当的边界条件，三维不可压缩 Navier-Stokes 方程的解是否在所有时间保持光滑？还是会在有限时间内产生奇点（速度或导数发散）？",
        "困难在于非线性对流与黏性耗散的竞争：现有能量估计不足以排除三维解的某些小尺度集中。Leray 在 1934 年建立了全局弱解理论，但满足适当能量不等式的三维解能否由光滑初值始终保持光滑，仍未解决。这里的解类、初值和外力条件很重要，不能把所有所谓「弱解」的存在与唯一性混为一谈。",
        "数学奇点与流体模型的物理适用性是两个问题：即使证明某种奇点，也不能单凭这一结果断言需要什么新物理。Tao 于 2014 年发表预印本、2016 年正式刊出的工作，为一种修改了非线性项的「平均化」三维 Navier-Stokes 方程构造了有限时间爆破。它说明某些能量估计本身不足以解决问题，并没有证明原始 Navier-Stokes 方程发生爆破。",
      ],
    },
    {
      heading: "三体周期轨道 · 混沌中的规则岛屿",
      body: [
        "2013 年 Šuvakov 和 Dmitrašinović 数值找到了 13 条不同的等质量、零总角动量平面三体周期轨道，分属 11 个新族，并按拓扑结构分类。这是特定条件下的数值发现，不是三体问题全部解的计数，更不意味着所有这些轨道都稳定。",
        "周期轨道提供了理解复杂相空间的骨架。研究者既要检查数值闭合误差，也要分析扰动是否增长；一条漂亮的封闭轨迹和一套能长期稳定存在的运动，并不是同一个结论。从这里进入量子世界时，也应区分数学表示、近似方法和可观测预言，不能仅凭诠释名称就声称实验已经分辨了不同世界观。",
      ],
    },
    {
      heading: "经典场论 · Lagrangian 密度与 Noether 流",
      body: [
        "把离散坐标 q_i(t) 换成场 φ(x, t)，Lagrange 力学就升级为经典场论：作用量 S = ∫ ℒ(φ, ∂_μφ) d⁴x，欧拉-拉格朗日方程变成 ∂_μ(∂ℒ/∂(∂_μφ)) = ∂ℒ/∂φ。弹性介质的波动方程、Maxwell 电磁场、广义相对论都能装进同一个变分框架里。",
        "对作用量的连续全局对称性，Noether 第一定理给出在场方程成立时满足 ∂_μj^μ = 0 的**守恒流**。体积积分只有在边界没有净流出等条件下才是守恒荷。平直时空中的平移对称给出能量—动量张量，全局 U(1) 相位对称给出电荷流。标准模型进一步采用局部规范结构来组织相互作用；其中局部冗余、对称性破缺和量子反常都需要分别处理，不能压缩为「所有规范荷自动守恒」一句话。",
      ],
    },
  ],

  sources: [
    {
      label: "David Morin · Classical Mechanics，第 6 章：Lagrangian Method",
      url: "https://davidmorin.physics.fas.harvard.edu/files/2023/11/cmchap6.pdf",
      kind: "encyclopedia",
    },
    {
      label: "Hamilton · On a General Method in Dynamics（1834–1835 原文）",
      url: "https://www.maths.tcd.ie/pub/HistMath/People/Hamilton/Dynamics/",
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
      label: "Noether · Invariant Variation Problems（1918 原文的 Tavel 英译）",
      url: "https://arxiv.org/abs/physics/0503066",
      kind: "paper",
    },
    {
      label: "Frisch 1995 · Turbulence (Kolmogorov legacy)",
      url: "https://www.cambridge.org/highereducation/books/turbulence/FD8C5E35E5F1CA850E017461942A59AC",
      kind: "encyclopedia",
    },
    {
      label:
        "Tao · Finite time blowup for an averaged three-dimensional Navier-Stokes equation（2014 / 2016）",
      url: "https://arxiv.org/abs/1402.0290",
      kind: "paper",
    },
    {
      label: "Ansys STK · Hohmann Transfer（两次脉冲与速度增量计算）",
      url: "https://help.agi.com/stk/12.7.1/Content/training/tq-hohmann.htm",
      kind: "agency",
    },
    {
      label: "David Tong · Quantum Field Theory，§1.3：Symmetries and Conservation Laws",
      url: "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S1.html",
      kind: "encyclopedia",
    },
    {
      label: "Gotay · On the Groenewold–Van Hove problem for R²ⁿ（1999）",
      url: "https://arxiv.org/abs/math-ph/9809015",
      kind: "paper",
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
      name: { primary: "驻定作用量", latin: "Stationary Action" },
      position: [0.4, 0, 0.5],
      description:
        "δS = δ∫(T − V) dt = 0。固定端点下真实轨迹使作用量驻定，不保证是最小值，也不要求路程最短。它连接经典变分法与量子路径积分的驻相近似。",
      data: [
        { label: "历史前身", value: "Maupertuis 的作用量思想" },
        { label: "动力学发展", value: "Hamilton 1834–1835" },
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
        "行星运动的椭圆轨道与等面积定律发表于 1609 年，周期定律发表于 1619 年。第三定律比牛顿 1687 年的《原理》早 68 年；在牛顿二体近似中，T²/a³ 还取决于两体总质量。",
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
        "作用量的连续全局对称性对应运动方程成立时的守恒量。Noether 在 1918 年发表的这条定理，是从经典走到场论的一条线索。",
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
        "确定性动力学也能放大初值误差，限制有限精度下的长期预报。KAM 理论说明许多非共振不变环面怎样在足够小的扰动中存活，并非所有三体轨道都混沌。",
      data: [
        { label: "Lyapunov 指数", value: "最大指数 > 0：混沌的重要诊断" },
        { label: "KAM", value: "Kolmogorov-Arnold-Moser" },
      ],
      color: "var(--hw-red)",
      size: 0.025,
    },
  ],
};

export default content;

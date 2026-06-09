import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P7",
  name: { primary: "标准模型与量子场论", latin: "Standard Model & QFT" },
  tagline: "已知物理学的完整草图",
  whisper: "三代物质 + 四种力 + 一个 Higgs：宇宙的乐高目录。",
  dataCards: [
    { label: "Higgs 质量", latinLabel: "m_H", value: "≈ 125.25", hint: "GeV / c²" },
    { label: "W 玻色子", latinLabel: "m_W", value: "≈ 80.4", hint: "GeV / c²" },
    { label: "Z 玻色子", latinLabel: "m_Z", value: "≈ 91.2", hint: "GeV / c²" },
    { label: "规范群", value: "SU(3) × SU(2) × U(1)", hint: "强 + 弱 + 电磁" },
    { label: "顶夸克质量", latinLabel: "m_t", value: "≈ 173", hint: "GeV / c² · 最重粒子" },
    { label: "基本粒子数", value: "17", hint: "12 费米子 + 5 玻色子" },
    { label: "Higgs 发现", value: "2012", hint: "ATLAS + CMS · LHC" },
    { label: "Cabibbo 角", latinLabel: "θ_C", value: "≈ 13.0°", hint: "CKM 混合" },
    {
      label: "QCD β 一环",
      value: "β₀ = (33 − 2n_f) / 3",
      hint: "n_f = 6 时 β₀ > 0 → 渐近自由",
    },
    {
      label: "Higgs 真空期望值",
      latinLabel: "v",
      value: "≈ 246.22",
      hint: "GeV · 电弱破缺标度",
    },
    {
      label: "Higgs 自耦合",
      latinLabel: "λ",
      value: "≈ 0.13",
      hint: "m_H² = 2 λ v² · 直接测 HH 需 HL-LHC + FCC",
    },
    {
      label: "see-saw 质量量级",
      value: "m_ν ≈ m_D² / M_R",
      hint: "M_R ~ 10¹⁴ GeV 解释 ν 质量微小",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 粒子表的几何",
      body: [
        "物质 = 3 代轻子（e, μ, τ 与对应中微子） + 3 代夸克（u/d, c/s, t/b）；力的载体 = γ（电磁）、W±/Z⁰（弱）、g（强）；Higgs 玻色子 H 给其他粒子质量。每个粒子还有反粒子。",
        "「代」之间只有质量不同——没人知道为什么自然界要 3 代，也不知道为什么质量比这么悬殊（m_t / m_e ≈ 10⁵.⁵）。这是标准模型留下最大的「为什么」之一。",
      ],
    },
    {
      heading: "学院 · 规范场论 + 自发对称性破缺",
      body: [
        "标准模型是建立在规范群 SU(3)_c × SU(2)_L × U(1)_Y 上的量子场论。SU(3) 管强相互作用，SU(2) × U(1) 在低能下混合成 U(1)_em 与弱中性流——电弱统一（Glashow-Weinberg-Salam, Nobel 1979）。",
        "Higgs 机制：势 V(φ) = −μ² |φ|² + λ |φ|⁴ 在 |φ| = v/√2 处取极小，对称性自发破缺；W/Z 「吃掉」 Goldstone 玻色子获得质量。所有费米子的质量通过 Yukawa 耦合 y · φ · ψ̄ψ 给出。",
        "Feynman 图是微扰展开的图形语言：顶点对应相互作用项，传播子是 propagator。截断重整化把表观发散吸收进物理参数；这套机制让 QED 给出 12 位有效数字的预言。",
      ],
    },
    {
      heading: "前沿 · 缺失的拼图",
      body: [
        "已知缺口：中微子质量（标准模型本来认为它们无质量）、暗物质（占宇宙物质 ~ 85%）、暗能量（~ 70% 的能量密度）、物质-反物质不对称、量子引力。",
        "推广方向：超对称（SUSY，每个粒子有一个超伴；LHC 至今未见）、大统一（GUT，把 3 个规范群合并）、轴子（解决强 CP 问题且可能是暗物质）。",
        "实验前线：LHC Run 3 + HL-LHC、电子-正电子 Higgs 工厂（FCC-ee / CEPC）、未来 100 TeV 对撞机、地面 / 空间引力波 + 中微子 + 暗物质多信使探测网络。",
      ],
    },
    {
      heading: "实验时间线 · 从 e 到 Higgs",
      body: [
        "1897 Thomson 发现电子 → 1932 中子 (Chadwick) → 1947 π/K 介子 (宇宙线) → 1956 ν_e (Reines) → 1964 夸克模型 (Gell-Mann) → 1974 J/ψ (c 夸克) → 1977 Υ (b) → 1983 W±/Z⁰ (UA1, CERN) → 1995 顶夸克 (CDF/D0, Fermilab) → 2000 τ 中微子直接探测 → 2012 Higgs (ATLAS/CMS, LHC)。",
        "标准模型 17 个粒子的完整发现耗时 115 年，从一个阴极射线管到一个 27 km 周长的对撞机。每一次新粒子出现都伴随一次能量前沿的跃迁 —— 而下一个跃迁还没到来。",
      ],
    },
    {
      heading: "渐近自由 · β 函数与重正化群",
      body: [
        "QCD 的耦合常数 g_s 在不同能标下并不相同——它跑（running）。一环 β 函数 β(g) = −β₀ g³ / (16π²) + …，其中 β₀ = (11 N_c − 2 n_f)/3，对 SU(3) + 6 味夸克为 7 > 0：能标越高耦合越弱，这就是 Gross-Politzer-Wilczek 1973 发现的「渐近自由」（Nobel 2004）。深度非弹性散射看到的「准自由夸克」与质子内部的「永不出现的自由夸克」由同一条 β 函数同时解释——这是 20 世纪物理学最反直觉的成果之一。",
        "QED 走相反方向：β > 0，耦合在高能处变大，Landau 极在 ~10²⁸⁶ GeV，远超普朗克能标但提示 QED 不是完备理论。把 SM 三个规范耦合一起跑到高能，它们在 ~10¹⁵ GeV 附近几乎汇聚——这是 GUT 的最早动机；加入 SUSY 后三条线几乎精确相交，曾是 SUSY 最强的「美学论证」之一（虽然 LHC 至今未见。）。重正化群把「跑」变成了 P1 凝聚态 RG、P5 原子物理光-物质耦合、P7 标准模型的共用语言。",
      ],
    },
    {
      heading: "电弱相变 · Sphaleron 与重子非对称",
      body: [
        "在早期宇宙 T ≈ 100 GeV，Higgs 场的真空期望值从 0 演化到 246 GeV——电弱相变。在标准模型里这条相变是平滑的 crossover（m_H = 125 GeV 太重），但若有 BSM 新场把它逼成强一阶相变，相变中产生的气泡壁就能驱动 Sakharov 三条件中的第三条——失衡。这是「电弱重子起源 (electroweak baryogenesis)」的核心剧本。",
        "Sphaleron 是 SU(2)_L 真空之间的「鞍点」，在高温下被热激发，每跳一次同时改变 ΔB = ΔL = 3——B+L 因此不守恒，但 B−L 守恒。这条非微扰过程把任何在 GUT 标度产生的 B+L 不对称冲洗掉，留下的只能由 B−L 不为零或电弱相变本身产生。今天 LHC 测到的 Higgs 截面与 W 质量精度都已经把 SM 强一阶相变排除，所以宇宙的 n_b / n_γ ≈ 6 × 10⁻¹⁰ 必须来自 SM 之外——可能是 leptogenesis（重 Majorana 中微子衰变，P6 互文）或第二个 Higgs。一个数字钉住了一片 BSM 模型空间。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "Peskin & Schroeder《An Introduction to QFT》是博士标配；Schwartz《Quantum Field Theory and the Standard Model》现代化；Srednicki 是替代。Particle Data Group 是数据真相源。",
      ],
    },
  ],
  sources: [
    {
      label: "ATLAS Experiment · CERN",
      url: "https://atlas.cern/",
      kind: "agency",
    },
    {
      label: "CMS Experiment · CERN",
      url: "https://cms.cern/",
      kind: "agency",
    },
    {
      label: "Particle Data Group",
      url: "https://pdg.lbl.gov/",
      kind: "agency",
    },
    {
      label: "Gross & Wilczek 1973 — Ultraviolet Behavior of Non-Abelian Gauge Theories",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.30.1343",
      kind: "paper",
    },
    {
      label: "Sakharov 1967 — Violation of CP Invariance & Baryon Asymmetry",
      url: "https://inspirehep.net/literature/51345",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "higgs-boson",
      name: { primary: "Higgs 玻色子", latin: "Higgs Boson" },
      position: [0, 0, -0.6],
      description:
        "125 GeV 标量粒子，2012 年 ATLAS + CMS 同时发现。它的真空期望值 v ≈ 246 GeV 给所有费米子和 W/Z 提供了质量。",
      data: [
        { label: "m_H", value: "125.25 GeV" },
        { label: "Nobel", value: "2013" },
      ],
      color: "var(--hw-gold)",
      size: 0.045,
    },
    {
      id: "gauge-symmetry",
      name: { primary: "规范对称", latin: "Gauge Symmetry" },
      position: [-0.5, 0, -0.3],
      description:
        "标准模型的骨架 SU(3) × SU(2) × U(1)。规范群决定了相互作用的形态——这是 Yang-Mills 1954 的遗产。",
      data: [
        { label: "SU(3)", value: "8 胶子" },
        { label: "SU(2) × U(1)", value: "W±, Z, γ" },
      ],
      color: "var(--hw-blue)",
      size: 0.04,
    },
    {
      id: "three-generations",
      name: { primary: "三代物质", latin: "Three Generations" },
      position: [0.5, 0, -0.4],
      description:
        "e/μ/τ 与 u-d / c-s / t-b 三代结构。为什么是三代？标准模型回答不了，是当下最大的「为什么」之一。",
      data: [
        { label: "费米子", value: "12 个" },
        { label: "互文", value: "P5 原子 · 周期表" },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
    {
      id: "feynman-diagrams",
      name: { primary: "Feynman 图", latin: "Feynman Diagrams" },
      position: [-0.4, 0, 0.5],
      description:
        "微扰展开的图形语言。顶点 = 相互作用项，线 = 传播子。把复杂积分换成可数的拓扑组合。",
      data: [
        { label: "提出", value: "Feynman 1948" },
        { label: "互文", value: "P2 QED" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "ckm-matrix",
      name: { primary: "CKM 矩阵 · CP 破缺", latin: "CKM / CP Violation" },
      position: [0.5, 0, 0.4],
      description:
        "夸克在弱相互作用下混合的 3×3 幺正矩阵；它的复相位是标准模型里唯一的 CP 破缺源——但远不足以解释宇宙的物质过剩。",
      data: [
        { label: "Nobel", value: "Kobayashi-Maskawa 2008" },
        { label: "θ_C", value: "13.0°" },
      ],
      color: "var(--hw-gold)",
      size: 0.035,
    },
    {
      id: "beyond-sm",
      name: { primary: "超出 SM", latin: "Beyond Standard Model" },
      position: [-0.6, 0, 0.2],
      description:
        "SUSY / GUT / 轴子 / 复合 Higgs / 额外维度 / 引力对偶——所有候选答案都还没在 LHC 露面。",
      data: [
        { label: "暗物质", value: "~ 85% 物质" },
        { label: "互文", value: "P8 前沿" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
    {
      id: "sphaleron",
      name: { primary: "电弱 Sphaleron", latin: "Electroweak Sphaleron" },
      position: [-0.2, 0, -0.6],
      description:
        "电弱真空的拓扑非平凡构型，能在高温下绕过 B+L 守恒势垒、把重子数与轻子数同时改变 3 单位 (Kuzmin-Rubakov-Shaposhnikov 1985)。它给「物质 / 反物质不对称」开了一道理论上的窗：CP 破缺 + 偏离热平衡 + Sphaleron-driven B 违反 = 完整的 Sakharov 三条件。但 SM 里 CP 破缺太弱、电弱相变太软，定量上不足以解释宇宙的重子过剩 —— 互文 T0 / P8 仍是开放问题。",
      data: [
        { label: "能量", value: "~ 9 TeV" },
        { label: "破坏", value: "Δ(B+L) = ±3" },
        { label: "互文", value: "T0 / P8 baryogenesis" },
      ],
      color: "var(--hw-blue)",
      size: 0.038,
    },
    {
      id: "asymptotic-freedom",
      name: { primary: "渐近自由", latin: "Asymptotic Freedom" },
      position: [0.6, 0, -0.05],
      description:
        "QCD 的 β 函数为负 —— 高能下耦合 α_s(Q) 自动变小，夸克在短距离上几乎是自由粒子；低能下 α_s 反而暴涨成限制 (confinement)，把夸克锁在强子里。Gross / Wilczek / Politzer 1973 的发现 (Nobel 2004) 让强相互作用与微扰展开和解 —— 没有它，整个 LHC 数据分析无从下笔。",
      data: [
        { label: "α_s(m_Z)", value: "0.1179" },
        { label: "β₀", value: "(33 − 2 n_f)/12π" },
        { label: "Nobel", value: "2004" },
      ],
      color: "var(--hw-gold)",
      size: 0.036,
    },
  ],
};

export default content;

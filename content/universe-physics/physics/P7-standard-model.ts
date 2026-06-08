import type { TierContent } from "@/lib/content";

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
    {
      label: "电弱混合角",
      latinLabel: "sin²θ_W",
      value: "≈ 0.231",
      hint: "在 Z 质量处 · PDG 2023",
    },
    {
      label: "胶子质量",
      value: "0",
      hint: "规范玻色子无质量 · 但有效质量 ~1 GeV（禁闭）",
    },
    {
      label: "Higgs → γγ 信号强度",
      value: "1.00 ± 0.07",
      hint: "ATLAS+CMS 联合 · 与 SM 预言一致",
    },
    {
      label: "WIMP 暗物质截面上限",
      value: "< 10⁻⁴⁷",
      hint: "cm² · XENONnT 2023 · 自旋无关 · 40 GeV 处",
    },
    {
      label: "重子不对称 n_b/n_γ",
      value: "≈ 6.1 × 10⁻¹⁰",
      hint: "Planck 2018 · SM CP 破缺不足以解释",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 粒子表的几何",
      body: [
        "物质 = 3 代轻子（e, μ, τ 与对应中微子） + 3 代夸克（u/d, c/s, t/b）；力的载体 = γ（电磁）、W±/Z⁰（弱）、g（强）；Higgs 玻色子 H 给其他粒子质量。每个粒子还有反粒子。",
        "「代」之间只有质量不同——没人知道为什么自然界要 3 代，也不知道为什么质量比这么悬殊（m_t / m_e ≈ 10⁵.⁵）。这是标准模型留下最大的「为什么」之一。",
        "力的载体（规范玻色子）也有结构：光子无质量 → 电磁力无限远；W±/Z⁰ 很重（~80–91 GeV）→ 弱力只在 10⁻¹⁸ m 内有效；胶子无质量但自耦合 → 强力在短距离弱（渐进自由）、长距离强（禁闭）。电弱混合角 sin²θ_W ≈ 0.231 决定了 Z 和 W 的质量比，以及中性流和带电流的相对强度。",
        "所有已知粒子的性质（质量、自旋、电荷、色荷、衰变模式）都被 19 个自由参数确定：3 个规范耦合常数、6 个夸克质量、3 个轻子质量、Higgs 质量和真空期望值、QCD θ 角、CKM 4 参数。为什么是这些数字？标准模型回答不了——它们是实验输入，不是理论输出。找到这些数字的起源是超越标准模型的核心动机之一。",
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
        "W 玻色子质量（~80.4 GeV）和 Z 玻色子质量（~91.2 GeV）是电弱统一的关键验证：它们的比值精确给出 sin²θ_W，与标准模型预言一致。2022 年 CDF II 测到 m_W = 80.433 GeV，与标准模型偏差 7σ——但 ATLAS 和 LHCb 的后续测量更接近标准模型值。这个「W 质量异常」如果确认，将是新物理的第一个信号。",
        "Higgs 玻色子的发现（2012, 125.25 GeV）完成了标准模型的最后一块拼图。它的性质（自旋 0、宇称偶、与费米子和玻色子的耦合正比于质量）全部与标准模型预言吻合。但 Higgs 自耦合（λ ≈ 0.13，决定 Higgs 势的形状）尚未被直接测量——HL-LHC（2029+）和 FCC-ee 将尝试通过双 Higgs 产生来约束它。如果 λ 偏离预言，意味着 Higgs 势在高能下有新结构，可能连到电弱相变和重子起源（P8）。",
      ],
    },
    {
      heading: "渐近自由 · β 函数与重正化群",
      body: [
        "QCD 的耦合常数 g_s 在不同能标下并不相同——它跑（running）。一环 β 函数 β(g) = −β₀ g³ / (16π²) + …，其中 β₀ = (11 N_c − 2 n_f)/3，对 SU(3) + 6 味夸克为 7 > 0：能标越高耦合越弱，这就是 Gross-Politzer-Wilczek 1973 发现的「渐近自由」（Nobel 2004）。",
        "深度非弹性散射看到的「准自由夸克」与质子内部的「永不出现的自由夸克」由同一条 β 函数同时解释——这是 20 世纪物理学最反直觉的成果之一。α_s(Q) 从 Z 质量处的 0.118 跑到 ~1 GeV 时变成 ~1，微扰论失效，夸克被禁闭。",
        "QED 走相反方向：β > 0，耦合在高能处变大，Landau 极在 ~10²⁸⁶ GeV，远超普朗克能标但提示 QED 不是完备理论。把 SM 三个规范耦合一起跑到高能，它们在 ~10¹⁵ GeV 附近几乎汇聚——这是 GUT 的最早动机；加入 SUSY 后三条线几乎精确相交，曾是 SUSY 最强的「美学论证」之一（虽然 LHC 至今未见。）。",
        "重正化群把「跑」变成了 P1 凝聚态 RG、P5 原子物理光-物质耦合、P7 标准模型的共用语言。Wilson 的贡献是把多尺度物理变成了一套递归方程——每一步「粗粒化」中，无关项指数衰减，相关项停在固定点。从临界现象到 QCD，从原子物理到宇宙学，RG 是贯穿整个物理学的概念工具。",
      ],
    },
    {
      heading: "电弱相变 · Sphaleron 与重子非对称",
      body: [
        "在早期宇宙 T ≈ 100 GeV，Higgs 场的真空期望值从 0 演化到 246 GeV——电弱相变。在标准模型里这条相变是平滑的 crossover（m_H = 125 GeV 太重），但若有 BSM 新场把它逼成强一阶相变，相变中产生的气泡壁就能驱动 Sakharov 三条件中的第三条——失衡。这是「电弱重子起源 (electroweak baryogenesis)」的核心剧本。",
        "Sphaleron 是 SU(2)_L 真空之间的「鞍点」，在高温下被热激发，每跳一次同时改变 ΔB = ΔL = 3——B+L 因此不守恒，但 B−L 守恒。这条非微扰过程把任何在 GUT 标度产生的 B+L 不对称冲洗掉，留下的只能由 B−L 不为零或电弱相变本身产生。",
        "今天 LHC 测到的 Higgs 截面与 W 质量精度都已经把 SM 强一阶相变排除，所以宇宙的 n_b / n_γ ≈ 6 × 10⁻¹⁰ 必须来自 SM 之外——可能是 leptogenesis（重 Majorana 中微子衰变，P6 互文）或第二个 Higgs。一个数字钉住了一片 BSM 模型空间。",
        "Higgs 自耦合 λ 的精确测量是判断电弱相变性质的关键：如果 λ 在高能下变负（当前测量暗示可能如此），Higgs 势在 ~10¹⁰ GeV 处有第二个极小——宇宙可能是亚稳态的。HL-LHC 和 FCC-ee 将通过双 Higgs 产生截面约束 λ，回答「我们的真空是否稳定」这个存在性问题。Higgs 不仅给了粒子质量，还决定了宇宙的最终命运。",
      ],
    },
    {
      heading: "规范对称 · Yang-Mills 的遗产",
      body: [
        "标准模型的骨架是规范群 SU(3)_c × SU(2)_L × U(1)_Y。Yang-Mills 1954 年把 Maxwell 的 U(1) 规范对称推广到非阿贝尔群 SU(N)：规范场 A^μ 不再是一个数，而是一个矩阵；场强 F^μν = ∂^μ A^ν − ∂^ν A^μ + g [A^μ, A^ν] 多了对易子项——这意味着规范玻色子自耦合。胶子之间有相互作用（QCD），光子之间没有（QED）——这个差异是强力所有奇异性质的根源。",
        "SU(2)_L × U(1)_Y 的电弱统一是 Glashow（1961）、Weinberg（1967）、Salam（1968）的杰作。SU(2)_L 只作用于左手费米子——这就是「弱力违反宇称」的数学表述。Higgs 机制把 SU(2)_L × U(1)_Y 破缺到 U(1)_em，W 和 Z 获得质量，光子保持无质量。这个「对称性自发破缺」的模式后来被推广到所有规范理论：大统一（GUT）假设 SU(5) 或 SO(10) 在更高能标破缺到 SM。",
        "规范对称性也是「为什么没有自由夸克」的数学原因：QCD 的真空不是空的，而是充满了瞬子（instanton）和凝聚（condensate），这些非微扰结构把夸克永远锁在色单态里。从外面看，我们只能看到 hadron（质子、中子、介子），看不到自由夸克——这就是色禁闭，至今没有严格的数学证明，但格点 QCD 的数值模拟强烈支持它。",
        "Yang-Mills 理论的数学结构也催生了现代几何：纤维丛（fiber bundle）是规范场的自然语言，Chern-Simons 不变量是拓扑量子场论的核心。从物理学的粒子分类到数学的低维拓扑分类，Yang-Mills 是 20 世纪理论物理最深远的概念贡献之一。Clay 千禧难题之一就是证明 SU(N) Yang-Mills 理论存在质量间隙——这仍是数学和物理的共同前沿。",
      ],
    },
    {
      heading: "Higgs 耦合精密测量 · 确认 SM 还是寻找偏差",
      body: [
        "Higgs 玻色子 2012 年发现后，核心任务转为精密测量它与所有粒子的耦合强度。标准模型预言 Higgs 与费米子的 Yukawa 耦合正比于费米子质量（y_f = √2 m_f / v），与规范玻色子的耦合正比于玻色子质量的平方。LHC Run 2 + Run 3 已经测到 Higgs 与 τ、b、t、W、Z 的耦合，精度 5–20%，全部与 SM 一致。",
        "Higgs → γγ 是最重要的发现通道之一，也是精密测量通道：Higgs 不直接与光子耦合，而是通过 W 环和顶夸克环的虚过程衰变为双光子。这个「圈图」通道对 BSM 粒子极度敏感——任何带电且与 Higgs 耦合的新粒子都会贡献额外的环路。当前信号强度 μ = σ_obs / σ_SM = 1.00 ± 0.07（ATLAS+CMS 联合），没有看到偏差。",
        "Higgs 自耦合 λ 是最关键的未知量：它决定了 Higgs 势的形状（V(φ) = λ(φ² − v²/2)²）。双 Higgs 产生（pp → HH）截面极小（~33 fb at 14 TeV），HL-LHC（3000 fb⁻¹）预期把 λ 的精度约束到 −0.4 < κ_λ < 6.5（95% CL），FCC-ee/HH 可达 ~10%。如果 λ 偏离 SM 预言，Higgs 势在高能下有新结构，可能暗示电弱相变是一阶的——这直接关系到重子起源。",
        "Higgs 扇区也可能是暗物质的窗口：Higgs portal 模型假设暗物质通过 Higgs 与标准模型耦合（L_int = λ_HS S² H†H），当前 LHC 和暗物质直接探测实验已经把轻暗物质（< 60 GeV）的参数空间大幅压缩。HL-LHC 和下一代对撞机将进一步覆盖或发现 Higgs 扇区的新物理。Higgs 不仅是标准模型的最后一块拼图，也可能是通向新物理的第一扇门。",
      ],
    },
    {
      heading: "暗物质直接探测 · WIMP 范式的兴衰",
      body: [
        "WIMP（Weakly Interacting Massive Particle）暗物质范式的逻辑优美：如果暗物质粒子质量 ~10–1000 GeV 且通过弱力与普通物质耦合，其热退耦遗迹密度恰好是 Ω_DM ≈ 0.27——「WIMP 奇迹」。但 40 年的实验搜索正在把这个「奇迹」逼入困境。",
        "XENONnT（2023）用 5.9 吨液氙探测器把自旋无关 WIMP-核子散射截面上限推到 < 10⁻⁴⁷ cm²（40 GeV 处），LZ（LUX-ZEPLIN）给出了类似限制。PandaX-4T（中国锦屏地下实验室）也达到了同等灵敏度。这些实验的本底已经低到每个探测器每年只有几个事件——技术上接近极限。下一代实验（DARWIN, 40 吨液氙）将把灵敏度再提升一个数量级，进入中微子雾（neutrino fog）——太阳中微子和大气中微子的相干散射将构成不可消除的本底。",
        "WIMP 范式的压力推动了暗物质候选者的多元化：轴子（ADMX 2023 在 2.66–4.2 μeV 范围给出新上限）、暗光子（LDMX 实验设计中）、轻暗物质（MeV 量级，Belle II / LHCb 搜索中）、原初黑洞（微引力透镜和 CMB 约束）、以及非热产生的暗物质（如 sterile neutrino, X-ray 搜索中）。没有一个候选者占据绝对优势——暗物质的本质仍是粒子物理和宇宙学的最大悬案。",
        "间接探测（Fermi-LAT 看银河中心 γ 超、AMS-02 看正电子超）给出了有趣的异常，但天体物理本底的不确定性太大，无法确认暗物质起源。多信使天文学（γ 射线、中微子、引力波、宇宙线）的联合分析是下一个方向——暗物质信号如果存在，应该在多个独立信道中一致出现。WIMP 不是唯一的答案，但暗物质的问题必须被回答——无论答案是什么。",
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
    {
      label:
        "ATLAS & CMS Collaborations 2012 — Observation of a new particle consistent with the Higgs boson",
      url: "https://www.sciencedirect.com/science/article/pii/S0370269312008571",
      kind: "paper",
    },
    {
      label: "Yang & Mills 1954 — Conservation of Isotopic Spin and Isotopic Gauge Invariance",
      url: "https://journals.aps.org/pr/abstract/10.1103/PhysRev.96.191",
      kind: "paper",
    },
    {
      label: "Weinberg 1967 — A Model of Leptons",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.19.1264",
      kind: "paper",
    },
    {
      label:
        "Aprile et al. (XENONnT) 2023 — First Dark Matter Search with Nuclear Recoils from XENONnT",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.131.041003",
      kind: "paper",
    },
    {
      label:
        "ATLAS & CMS 2016 — Measurements of the Higgs boson production and decay rates and constraints on its couplings (Run 1 combination)",
      url: "https://arxiv.org/abs/1606.02266",
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
  discussionQuestions: [
    "标准模型有 19 个自由参数——为什么是这些数字？如果找到它们的起源，是否意味着物理学的「终结」？",
    "Higgs 场的真空期望值给所有粒子提供了质量——如果 v = 0，宇宙会是什么样子？",
    "WIMP 暗物质范式正在被实验排除——如果暗物质完全不通过弱力耦合，我们还有什么办法找到它？",
  ],
};

export default content;

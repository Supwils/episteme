import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "P8",
  name: { primary: "前沿物理", latin: "Frontier Physics" },
  tagline: "下一个百年的入口",
  whisper: "今天正在被追问、正在被回答、且尚未被关闭的问题。",
  dataCards: [
    { label: "暗物质占比", value: "26.8%", hint: "Planck 2018 · 只通过引力与普通物质耦合 · 本质未知" },
    { label: "暗能量占比", value: "68.3%", hint: "Planck 2018 · 驱动宇宙加速膨胀 · 可能随时间演化" },
    { label: "可见物质", value: "≈ 4.9%", hint: "全部 baryon · 我们熟悉的一切仅占宇宙的不到 5%" },
    { label: "量子比特纪录", value: "1000+", hint: "超导 / 离子阱（2024）· IBM Condor 首破千比特大关" },
    { label: "AdS/CFT", value: "Maldacena 1997", hint: "全息对偶 · 把高维引力等价为低维量子场论 · 弦论最深刻的结果" },
    { label: "Hubble 张力", value: "~ 5σ", hint: "局部 ~73 vs CMB ~67 km/s/Mpc · 8 年未消失 · 可能需要新物理" },
    { label: "g−2 muon", value: "4.2σ", hint: "Fermilab E989 (2023) · 与标准模型预言的持久偏差" },
    { label: "误码率门槛", value: "~ 10⁻⁴", hint: "Surface code 容错阈值 · Google Willow 2024 首次达标" },
    {
      label: "Bekenstein bound",
      value: "S ≤ 2π k_B R E / (ℏ c)",
      hint: "给定区域内最大信息量 · 把信息论与引力焊接 · 全息原理的基石",
    },
    {
      label: "FRB 已编目",
      value: "5 000+",
      hint: "CHIME / ASKAP / Parkes 2018-2025 · 快速射电暴 · 宇宙学新探针",
    },
    {
      label: "BMV 引力诱导纠缠",
      value: "~10⁻¹⁴",
      hint: "kg · 两块介观物体相干叠加目标质量 · 桌面检验引力是否量子化",
    },
    {
      label: "MoTe₂ 莫尔填隙",
      value: "ν = −2/3, −3/5",
      hint: "分数反常量子 Hall · 2023 (Cornell/UW) · 拓扑物态新前沿",
    },
    {
      label: "暗能量状态方程",
      latinLabel: "w",
      value: "≈ −1 ± 0.05",
      hint: "w = −1 即宇宙学常数 · DESI 2024 暗示可能随红移演化",
    },
    {
      label: "量子退相干时间",
      value: "10⁻⁶ – 10⁻³",
      hint: "s · 超导 transmon 典型值 · 量子计算规模的核心瓶颈",
    },
    {
      label: "弦论额外维度",
      value: "10 或 11",
      hint: "超弦 10D · M 理论 11D · 6/7 个紧致化到 ~10⁻³⁴ m",
    },
    {
      label: "弦景观真空数",
      value: "~ 10⁵⁰⁰",
      hint: "Bousso-Polchinski 2000 · 如果永恒暴胀正确 · 我们的宇宙只是无数口袋之一",
    },
  ],
  narrative: [
    {
      heading: "宇宙学张力 · 不止 ΛCDM",
      body: [
        "宇宙 95% 的成分我们不知道是什么——这不是修辞，是精确的观测事实。暗物质占 26.8%，暗能量占 68.3%，我们熟悉的原子只占 4.9%。物理学最成功的宇宙学模型 ΛCDM 正在被自己的精度反噬：两个最精确的测量之间出现了 5σ 的裂痕。",
        "ΛCDM 仍是描述宇宙演化的最佳模型，但 Hubble 张力（局部 ~ 73 km/s/Mpc vs CMB ~ 67）和 S₈ 张力暗示要么观测系统误差未排除，要么模型需要扩展（额外辐射、相互作用暗能量、早期暗能量）。",
        "暗能量状态方程 w 的精确测量是下一个十年的核心目标。如果 w = −1（宇宙学常数），暗能量密度恒定，宇宙永远加速膨胀；如果 w > −1（quintessence），暗能量密度随时间减小，膨胀可能减速；如果 w < −1（phantom energy），密度增加，宇宙最终被撕碎（Big Rip）。DESI 2024 年数据暗示 w 可能在演化——如果确认，将推翻宇宙学常数假说。",
        "Euclid（2023+）、Vera Rubin LSST（2025+）、Roman、CMB-S4 几年内会把统计精度提升一个数量级——张力是缩小还是变成断裂，这是下一个 5 年的悬念。",
        "Hubble 张力的解决方案可能涉及新物理：额外中微子（ΔN_eff ~ 0.2–0.5）、早期暗能量（在 recombination 前短暂激活）、衰变暗物质、或修改引力。每一种方案都面临其他观测的约束——解开这个结需要多信使、多探针的联合分析。宇宙学正在从「发现加速膨胀」走向「精确测量暗能量性质」的新阶段。为什么这很重要？因为我们正处在宇宙学可能被改写的历史节点——暗能量的性质将决定宇宙的终极命运。",
    },
    {
      heading: "量子引力 · 全息 · 黑洞信息",
      body: [
        "Maldacena 1997 的 AdS/CFT 把一个高维引力理论等价为低一维边界上的 conformal 场论——「全息原理」的具体实现。它把黑洞熵的微观计数变成了 CFT 态计数。",
        "Penrose 图 + 蒙面（islands） 在 2019–2022 重塑了 Hawking 蒸发的信息流：黑洞内部其实可以编码到外部辐射里，信息悖论似乎在「半经典 + 蒙面」框架下被解决——但完整量子引力描述仍未到。",
        "弦论 / 圈量子引力 / 因果集 / 渐近安全是几条尚在角力的候选道路。",
      ],
    },
    {
      heading: "量子信息 · 容错 · 量子优势",
      body: [
        "超导（Google Willow 2024）与离子阱（IonQ / Quantinuum）都把单比特错误率压到 10⁻³–10⁻⁴。Surface code、LDPC code 与 cat-qubit 是几条容错路线；Willow 的 distance-7 surface code 第一次显示了「错误抑制随码距指数下降」。",
        "「量子优势」的实验声明（Sycamore 2019、Jiuzhang 2020、Zuchongzhi 2021）仍在被经典算法挑战；真正改变工业的「实用量子优势」可能要等到 100 万比特规模与算法-硬件协同设计。",
      ],
    },
    {
      heading: "凝聚态 · 拓扑 · 高温超导",
      body: [
        "拓扑相（Quantum Hall、拓扑绝缘体、Weyl 半金属、Majorana 边模）把对称性 + 几何变成新的物质相分类工具。Nobel 2016 表彰的是这套语言。",
        "高温超导（铜氧化物、铁基、镍氧化物）的机制至今未达成共识。镍氧化物薄膜（2019+）与 LK-99（2023，未被复现）持续刷新讨论；常压室温超导仍是圣杯。",
        "AI for science：神经网络求解 Schrödinger（FermiNet, PauliNet）、AlphaFold 类工具进入材料发现，已经在催化与电池领域产出可验证候选。",
      ],
    },
    {
      heading: "拓扑量子计算 · 任意子与 Majorana",
      body: [
        "二维系统里允许的不止是费米子和玻色子：交换两次得到的相位可以是任意值 e^(iθ)（任意子）或一个非平凡幺正变换（非阿贝尔任意子）。后者把量子比特编码到拓扑简并基态里，局域噪声碰不到全局拓扑数——这就是 Kitaev 2003 提出的拓扑量子计算路线，原生容错。",
        "最热的候选是 Majorana zero mode：半导体纳米线 + 超导邻近效应 + 强磁场下，理论预言线两端会出现成对的 Majorana 零模。微软 2023 的 InAs/Al 设备给出了「拓扑能隙协议」通过的报告；2024 后续 Microsoft Quantum 持续在改进度量。",
        "拓扑量子计算的理论优势是容错率：逻辑错误率随温度指数下降（而非代数下降），理论上不需要复杂的纠错码。但工程挑战巨大：需要极低温（~10 mK）、极纯材料、极强磁场，且 Majorana 的实验信号容易被安德reev 反射等背景效应混淆。微软的 Topological Qubit 路线图指向 2028 年演示第一个拓扑逻辑比特。",
        "这条路线和超导 transmon、Rydberg 阵列 (P5) 一起，构成「量子比特动物园」里最反直觉但也最优雅的一支。如果拓扑量子计算成功，它将把量子纠错从软件问题变成硬件问题——这对百万比特规模的实用量子计算至关重要。",
      ],
    },
    {
      heading: "桌面引力 · BMV 与量子-引力的真空裁判",
      body: [
        "我们没有量子引力理论的实验证据——但 Bose-Marletto-Vedral 2017 提出一个轻巧到工程师可以做的判决实验：把两块 ~10⁻¹⁴ kg 的介观物体各自制备成空间叠加态，让它们仅通过引力相互作用 ~1 秒，然后测它们是否纠缠。若引力是量子的，自然在两态间生成纠缠；若引力是经典的（LOCC 通道），按 Bell-类型论证，纠缠不可能产生。",
        "实验难度集中在「保住相干」：要求介观物体在 ~100 μm 量级的叠加里维持 ~1 s 量级的退相干时间，约比目前最好的纳米机械振子记录还高几个数量级。退相干时间是量子力学与经典世界的分界线——超导 transmon ~100 μs，离子阱 ~1 s，光力学振子 ~10 ns。BMV 实验需要介观物体的退相干时间达到 ~1 s，这在当前技术极限之外。",
        "维也纳、伦敦帝国、剑桥、麻省理工的多个组都在追这条线，预计 2030 年代有第一次决定性结果。这是历史上第一次有人尝试用桌面实验直接问「引力到底量子吗」——一个 P3 与 P4 七十年悬而未决的问题，或许将由一根光镊里的硅球回答。",
        "如果 BMV 实验得到阳性结果（纠缠被确认），将直接排除所有经典引力理论，强烈暗示引力必须量子化。这不会告诉我们量子引力的具体形式（弦论、LQG、还是别的），但会给我们一个明确的方向：引力不是时空的几何，而是量子信息的涌现。这条线索可能比任何理论论证都更有力。",
      ],
    },
    {
      heading: "量子计算 · 从 Sycamore 到 Willow",
      body: [
        "IBM Condor（2023）突破 1000 量子比特大关，采用 heavy-hex 拓扑降低 crosstalk；Google Willow（2024）首次证明 surface code 码距从 3 增到 5 再到 7 时，逻辑错误率以指数级下降——这是容错量子计算里程碑。离子阱阵营（Quantinuum H2、IonQ Forte）以更高的保真度与全连接拓扑追赶。",
        "纠错路线之争仍白热化：surface code 门槛 ~10⁻³ 物理错误率，LDPC code 可在更少物理比特下编码更多逻辑比特但工程难度更大，cat-qubit 用玻色码在硬件层面指数压低 bit-flip。实用量子优势（drug discovery、材料模拟、组合优化）可能要到百万物理比特与算法-硬件协同设计阶段才能实现。",
        "量子退相干时间是制约量子计算规模的核心瓶颈：超导 transmon ~100 μs，离子阱 ~1–10 s，NV 中心 ~1 ms（室温）。每次门操作需要 ~10–100 ns，所以单比特操作 ~10⁴ 次后退相干。要实现 Shor 算法破解 RSA-2048，需要 ~4000 个逻辑比特 × ~10³ 物理比特/逻辑比特 = ~400 万物理比特，每个都要在退相干时间内完成纠错循环。",
        "IBM Quantum 路线图指向 2029 年 100,000+ qubit 系统，最终目标是模块化量子超级计算机。Google 的目标是在 2030 年前实现第一个有用的纠错量子计算。中国的「祖冲之」和「九章」系列也在快速追赶。量子计算的竞赛不仅是技术之争，更是对量子力学极限的工程化挑战。",
      ],
    },
    {
      heading: "暗能量巡天 · 宇宙大尺度结构的精密测量",
      body: [
        "Dark Energy Survey（DES）用 Blanco 4 米望远镜 + DECam 对南天银冠区 5000 deg² 做了 6 年成像，记录了超过 1 亿个星系的形状与红移。其核心科学目标是用弱引力透镜（cosmic shear）、星系团计数、星系聚类与 BAO 四种独立探针联合约束暗能量状态方程 w(z)。",
        "DES Y3（2022）的 cosmic shear 分析在 S₈ ≡ σ₈(Ωm/0.3)^0.5 上给出了比 Planck CMB 预言偏低 ~2σ 的结果——这与 KiDS-1000、HSC Y1 一致，形成了「S₈ 张力」。虽然统计显著性仅 ~2–3σ 不足以宣称新物理，但它与 Hubble 张力一起暗示 ΛCDM 可能需要修正。",
        "DESI（Dark Energy Spectroscopic Instrument, 2024）用 5000 根光纤同时测量星系红移，第一年数据暗示 w 可能在 z ~ 0.5–1 之间从 −1 向 −0.8 演化——如果确认，这将是暗能量不是宇宙学常数的第一个证据。但系统误差（如星系 bias、红移标定）仍在被仔细审查。",
        "DES Y6 最终数据与即将到来的 Vera Rubin LSST（2025+，将观测 200 亿个星系）将以更高精度裁决。Rubin 的 10 年巡天将把弱引力透镜的统计误差降低到 ~1%，足以区分 w = −1 和 w(z) 演化模型。暗能量的本质——真空能、动力学场、还是修改引力——可能在未来 10 年内有定论。",
      ],
    },
    {
      heading: "中微子质量 · 从振荡到绝对标度",
      body: [
        "Super-Kamiokande（1998）和 SNO（2001）发现中微子振荡，证明中微子有非零质量——这是超越标准模型的第一个确凿证据。振荡实验测到的是质量平方差 |Δm²|（大气 ~2.5×10⁻³ eV²、太阳 ~7.5×10⁻⁵ eV²），但无法给出绝对质量标度。",
        "KATRIN（2022）用氚 β 衰变端点谱直接约束电子反中微子有效质量 < 0.8 eV（90% CL），是迄今最严格的直接测量上限。未来 KATRIN 最终目标 ~0.2 eV 与 Project 8（CRES 技术）有望进一步收紧。宇宙学约束（Planck + BAO）给出 Σmν < 0.12 eV。",
        "若中微子是 Majorana 粒子（即自身是反粒子），无中微子双 β 衰变（0νββ）将成为确认这一性质的唯一实验途径。nEXO（5 吨液氙）、LEGEND（纯锗）等实验正在逼近 Majorana 中微子有效质量 ~10⁻²⁵ eV 的灵敏度——如果发现，将直接证明轻子数不守恒，并支持 see-saw 机制（P7）。",
        "中微子质量的起源——Dirac 还是 Majorana、跷跷板机制还是辐射生成——仍是粒子物理最深刻的开放问题之一。中微子也是暗物质候选之一（keV 量级的 sterile neutrino），且中微子 CP 破缺可能解释宇宙的物质-反物质不对称（leptogenesis）。一个质量 < 0.1 eV 的粒子，可能掌握着宇宙中物质存在的终极答案。",
      ],
    },
    {
      heading: "多重宇宙 · 弦景观与人择原理",
      body: [
        "多重宇宙（multiverse）不是一个理论，而是多个理论的推论。永恒暴胀（eternal inflation）预言：暴胀场在不同区域停止的时间不同，每个停止的区域就是一个「口袋宇宙」——我们的可观测宇宙只是其中之一。弦论的 landscape（~10⁵⁰⁰ 种真空）提供了这些口袋宇宙可能具有不同物理常数的理论基础。",
        "人择原理（anthropic principle）在这个框架下获得了新含义：我们观测到的物理常数（如宇宙学常数 Λ ~ 10⁻¹²² 普朗克单位）之所以「恰好适合生命」，是因为在 10⁵⁰⁰ 种可能中，只有那些允许恒星、行星和复杂分子形成的真空里才会有观测者。这不是解释，而是选择效应——就像「为什么地球离太阳恰好不太远」的答案是「否则我们不会在这里问」。",
        "多重宇宙的科学争议在于可证伪性：如果其他口袋宇宙永远不可观测，它们的存在对物理学有什么意义？支持者（如 Susskind、Weinberg）认为它解释了宇宙学常数的精细调节问题；反对者（如 Steinhardt、Ellis）认为它放弃了物理学的核心标准——可检验的预言。弦论 landscape 至今没有给出一个可检验的唯一预言，这让多重宇宙的科学地位持续争议。",
        "实验上，某些多重宇宙模型会留下痕迹：bubble collision 在 CMB 中的圆环特征（已搜索但未发现）、弦论 cosmic string 的引力波信号（LISA 可能探测）、或暗能量状态方程的特定演化模式。如果这些信号被找到，将为多重宇宙提供间接证据；如果全部排除，永恒暴胀的最简单版本将面临困难。多重宇宙是物理学与形而上学的边界——科学方法能否触及「不可观测的其他宇宙」，这个问题本身可能比答案更重要。",
      ],
    },
    {
      heading: "量子引力两条路 · 弦论 vs 圈量子引力",
      body: [
        "量子引力的核心矛盾是：广义相对论把时空当作连续光滑的流形，量子力学要求一切物理量在普朗克尺度（l_P = 1.6 × 10⁻³⁵ m, t_P = 5.4 × 10⁻⁴⁴ s）上量子化。如何把引力纳入量子框架，是 21 世纪物理学最大的未解问题。两条主要路线——弦论和圈量子引力（LQG）——走了截然不同的路。",
        "弦论把基本粒子看作一维弦的不同振动模式（开弦 / 闭弦），引力子是闭弦的零质量自旋-2 振动态。它自然地统一了引力与量子力学，且给出了有限的量子引力散射振幅（无紫外发散）。代价是：需要 10 维时空（6 个紧致化到 ~10⁻³⁴ m 的 Calabi-Yau 流形）、超对称、以及 ~10⁵⁰⁰ 种可能的真空（landscape）。弦论至今没有给出一个可检验的唯一预言——这是它最大的科学弱点。",
        "圈量子引力走的是「背景无关」路线：不引入新粒子或额外维度，直接把广义相对论的相空间量子化。时空本身被量子化为 spin network——一张边带 SU(2) 自旋标签、节点带 intertwiner 的图。面积和体积有最小量子（A_min = 8π γ l_P² √(j(j+1))），时空在普朗克尺度上是离散的「原子」。LQG 的预言包括黑洞熵的微观计数（与 Bekenstein-Hawking 公式一致）和宇宙学反弹（Big Bounce 替代 Big Bang）。",
        "两条路线各有强弱：弦论在高能散射和 AdS/CFT 对偶方面有不可替代的成果，LQG 在背景无关性和宇宙学应用方面更直接。Loop quantum cosmology（LQG 的宇宙学版本）预言了宇宙大爆炸之前的状态——一个经典宇宙收缩到普朗克密度后「弹」回来。弦论的 inflation 模型预言了特定的原初引力波谱（B-mode 偏振）。CMB-S4（2030+）和 LISA（2035+）的观测可能在两条路线之间做出裁决——或者揭示两者都不完整。",
      ],
    },
    {
      heading: "意识的硬问题 · 物理学的边界",
      body: [
        "哲学家 David Chalmers 1995 年区分了意识的「简单问题」（解释认知功能：注意力、记忆、报告）和「硬问题」（解释主观体验：为什么看到红色有一种特定的「感觉」）。简单问题是神经科学可以逐步攻克的工程问题；硬问题涉及「感质」（qualia）——主观体验的内在性质——目前没有任何科学理论能解释它为什么存在。",
        "Integrated Information Theory（IIT, Tononi 2004）试图用物理量 Φ（整合信息）量化意识：Φ > 0 的系统有某种程度的意识，Φ 越大意识越丰富。IIT 的核心主张是意识 = 信息整合——这把意识从生物学提升到了物理学层面。但 Φ 的计算在实践中是 NP-hard 的，对大脑规模的系统无法精确求解。IIT 也做出了激进的预言：简单的反馈回路（如光电二极管阵列）也有微小的意识——这被批评为泛心论（panpsychism）。",
        "Penrose-Hameroff 的 Orch-OR 理论（1996）走得更远：意识来自神经元微管中量子叠加态的客观坍缩——坍缩不是测量导致的，而是量子引力的自发过程。这个理论被主流神经科学和物理学广泛质疑（大脑温度太高，量子退相干时间 ~10⁻¹³ s 远短于神经计算时间 ~10⁻³ s），但 2022 年有实验在微管中观测到了量子振动信号——虽然这不等于证实 Orch-OR，但至少说明「大脑中完全没有量子效应」这个假设需要被重新审视。",
        "物理学能为意识问题提供的不是答案，而是框架：信息、熵、因果结构、量子纠缠——这些概念可以精确定义「观察者」在物理过程中的角色，而不诉诸「意识」这个模糊概念。量子力学的测量问题（P4）最终可能与意识问题交织——但这不意味着意识「导致」波函数坍缩，而意味着「测量」是一个需要更精确物理定义的过程。意识问题的最终答案可能需要物理学、神经科学和哲学的真正融合——这在 21 世纪仍然是一个开放的智识前沿。",
      ],
    },
    {
      heading: "意识与物理学 · 观察者的角色",
      body: [
        "量子力学的测量问题把「观察者」推到了物理学的核心。Copenhagen 诠释说测量导致波函数坍缩——但什么是「测量」？需要意识吗？Wigner 1961 年提出：意识可能是坍缩的原因。这个观点在大多数物理学家看来过于激进，但它提出了一个严肃的问题：物理学定律是否需要包含观察者的概念？",
        "退相干理论（P4）提供了部分回答：不需要意识，只需要系统与环境的不可逆信息交换。但退相干只解释了「为什么看不到叠加」，不解释「为什么得到这个特定结果」。意识是否在这个「选择」中起作用，取决于你采用哪种诠释——Copenhagen、Many-Worlds、QBism（量子贝叶斯主义）各有不同的回答。",
        "神经科学与物理学的交叉正在产生新的实验方向：大脑中的量子效应（如微管中的量子振动，Penrose-Hameroff 的 Orch-OR 理论）是否对认知有影响？大多数神经科学家认为大脑温度太高、退相干太快，量子效应不可能在神经计算中起作用——但某些光合作用系统（FMO 复合体）确实在室温下利用量子相干性提高能量传输效率。",
        "意识问题最终可能不是物理学能独立回答的——它需要神经科学、认知科学和哲学的共同努力。但物理学能做的是精确定义「观察者」在物理过程中的角色：信息获取、不可逆记录、环境耦合。这些概念可以用物理量（熵、互信息、退相干率）量化，而不诉诸「意识」这个模糊概念。物理学不需要解释意识是什么，但需要解释意识在物理理论中为什么看起来「有效」。",
      ],
    },
  ],
  sources: [
    {
      label: "arXiv",
      url: "https://arxiv.org/",
      kind: "paper",
    },
    {
      label: "Quanta Magazine",
      url: "https://www.quantamagazine.org/",
      kind: "encyclopedia",
    },
    {
      label: "Reviews of Modern Physics",
      url: "https://journals.aps.org/rmp/",
      kind: "paper",
    },
    {
      label: "Bose et al. 2017 — Spin Entanglement Witness for Quantum Gravity",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.119.240401",
      kind: "paper",
    },
    {
      label: "Kitaev 2003 — Fault-tolerant QC by anyons",
      url: "https://arxiv.org/abs/quant-ph/9707021",
      kind: "paper",
    },
    {
      label: "IBM Quantum Roadmap",
      url: "https://www.ibm.com/quantum/roadmap",
      kind: "agency",
    },
    {
      label: "Google — Suppressing quantum errors by scaling a surface code logical qubit (Nature 2023)",
      url: "https://www.nature.com/articles/s41586-022-05434-1",
      kind: "paper",
    },
    {
      label: "DES Collaboration — Dark Energy Survey Year 3 results (Phys. Rev. D 2022)",
      url: "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.105.023520",
      kind: "paper",
    },
    {
      label: "KATRIN Collaboration — Direct neutrino-mass measurement with sub-eV sensitivity (Nature Physics 2022)",
      url: "https://www.nature.com/articles/s41567-021-01463-1",
      kind: "paper",
    },
    {
      label: "Arute et al. (Google) 2019 — Quantum supremacy using a programmable superconducting processor (Sycamore)",
      url: "https://www.nature.com/articles/s41586-019-1666-5",
      kind: "paper",
    },
    {
      label: "Chalmers 1995 — Facing up to the problem of consciousness",
      url: "https://www.consciousness.arizona.edu/chalmers-1995-facing-problem-consciousness",
      kind: "paper",
    },
    {
      label: "Rovelli 2008 — Loop Quantum Gravity (Living Reviews in Relativity)",
      url: "https://link.springer.com/article/10.12942/lrr-2008-5",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "dark-sector",
      name: { primary: "暗物质 + 暗能量", latin: "Dark Sector" },
      position: [0, 0, -0.6],
      description:
        "宇宙 95% 的能量我们不知道是什么。暗物质三大候选：WIMP / 轴子 / 原初黑洞；暗能量可能是真空能，也可能是动力学场（quintessence）。",
      data: [
        { label: "Ω_DM", value: "0.268" },
        { label: "Ω_Λ", value: "0.683" },
      ],
      color: "var(--hw-red)",
      size: 0.045,
    },
    {
      id: "ads-cft",
      name: { primary: "AdS/CFT · 全息对偶", latin: "Holography" },
      position: [-0.5, 0, -0.3],
      description:
        "高维引力 ↔ 低维 CFT。把黑洞熵的微观计数变成 CFT 态计数；是「时空 = 量子纠缠」愿景最具体的实现。",
      data: [
        { label: "Maldacena", value: "1997" },
        { label: "互文", value: "P3 GR / 黑洞" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "fault-tolerant-qc",
      name: { primary: "容错量子计算", latin: "Fault-Tolerant QC" },
      position: [0.5, 0, -0.3],
      description:
        "Surface code / LDPC code / cat-qubit。Willow 2024 第一次显示码距越大错误率越低——容错正在变得可验证。",
      data: [
        { label: "门槛", value: "~ 10⁻⁴" },
        { label: "互文", value: "P5 Rydberg 阵列" },
      ],
      color: "var(--hw-blue)",
      size: 0.04,
    },
    {
      id: "hubble-tension",
      name: { primary: "Hubble 张力", latin: "Hubble Tension" },
      position: [-0.4, 0, 0.5],
      description:
        "局部 Cepheid+SNe Ia 测出 H₀ ≈ 73；Planck CMB 推出 ≈ 67——5σ 分歧持续了 8 年没消失。",
      data: [
        { label: "ΔH₀", value: "~ 6 km/s/Mpc" },
        { label: "互文", value: "T0 可见宇宙" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "topological-matter",
      name: { primary: "拓扑物质", latin: "Topological Matter" },
      position: [0.5, 0, 0.4],
      description:
        "整数 / 分数量子 Hall、拓扑绝缘体、Majorana 边模。把对称性 + 几何变成物质相分类的新语言。",
      data: [
        { label: "Nobel", value: "2016" },
        { label: "互文", value: "P5 / P7 对称性破缺" },
      ],
      color: "var(--hw-gold)",
      size: 0.035,
    },
    {
      id: "ai-for-science",
      name: { primary: "AI for Science", latin: "AI for Science" },
      position: [-0.6, 0, 0.2],
      description:
        "神经网络求解 Schrödinger（FermiNet）、AlphaFold 类工具进入材料 / 催化 / 蛋白质设计——计算物理范式正在改写。",
      data: [
        { label: "工具", value: "FermiNet / PauliNet / GNS" },
        { label: "落地", value: "电池 / 催化 / 药物" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
  ],
  discussionQuestions: [
    '宇宙 95% 是暗物质和暗能量——我们对宇宙的「理解」是否只建立在 5% 的事实上？这对科学认识论意味着什么？',
    '如果量子引力实验（如 BMV）证实引力是量子的，这会如何改变我们对时空本质的理解？时空是「涌现」的还是「基本」的？',
    '弦论有 ~10⁵⁰⁰ 种可能的真空态——如果理论允许这么多可能，它还能算「预言」了什么吗？这是否让多重宇宙假说变得不可证伪？',
  ],
};

export default content;

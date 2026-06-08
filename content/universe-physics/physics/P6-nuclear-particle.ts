import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "P6",
  name: { primary: "原子核与粒子", latin: "Nuclear & Particle Physics" },
  tagline: "把物质再砸碎一点",
  whisper: "质量的 99% 来自胶子场的能量，不是夸克本身——物质的「重」是束缚的产物。",
  dataCards: [
    { label: "质子质量", latinLabel: "m_p", value: "938.272", hint: "MeV / c² · 比电子重 1836 倍 · 但 99% 来自胶子场能量" },
    { label: "中子质量", latinLabel: "m_n", value: "939.565", hint: "MeV / c² · 比质子仅重 1.3 MeV · 自由中子 10 分钟衰变" },
    { label: "强耦合常数", latinLabel: "α_s(m_Z)", value: "≈ 0.118", hint: "在 Z 质量处 · 高能变小（渐进自由）· 低能变大（禁闭）" },
    { label: "费米单位", value: "1 fm", hint: "= 10⁻¹⁵ m · 原子核的典型尺度 · 质子电荷半径 ≈ 0.84 fm" },
    { label: "氘结合能", value: "2.224", hint: "MeV · 最弱的核束缚 · 仅一个质子+一个中子" },
    { label: "²³⁵U 裂变", value: "~ 200", hint: "MeV / 反应 · 一个铀核裂变释放的能量相当于 200 万吨 TNT 的百万亿分之一" },
    { label: "DD 聚变 Q", value: "3.65", hint: "MeV · 氘-氘聚变 · 太阳与未来聚变堆的能量来源" },
    { label: "LHC 能量", value: "13.6", hint: "TeV (Run 3) · 27 km 周长 · 质子转 11245 圈/秒" },
    {
      label: "核壳魔数",
      value: "2 / 8 / 20 / 28 / 50 / 82 / 126",
      hint: "Mayer-Jensen 1949 · 核子填满这些壳层时核异常稳定 · 与周期表的惰性气体类似",
    },
    {
      label: "PMNS θ₁₃",
      value: "≈ 8.6°",
      hint: "Daya Bay / RENO / Double Chooz 2012 · 中微子三味混合的关键角",
    },
    {
      label: "GZK 截断",
      value: "≈ 5 × 10¹⁹",
      hint: "eV · 宇宙线质子在 CMB 光子上的能量上限 · 超过此能量质子会被减速",
    },
    {
      label: "上夸克质量",
      latinLabel: "m_u",
      value: "≈ 2.16",
      hint: "MeV / c² · PDG 2023 · 最轻的夸克 · 质子质量仅 2% 来自它",
    },
    {
      label: "中微子 Δm²₃₂",
      value: "≈ 2.5 × 10⁻³",
      hint: "eV² · 大气中微子振荡 · Super-K 1998 · 证明中微子有质量的第一个证据",
    },
    {
      label: "质子电荷半径",
      value: "0.8409 ± 0.0004",
      hint: "fm · μ子氢光谱 · 与电子氢 0.877 fm 差 5σ · 「质子半径之谜」",
    },
    {
      label: "μ子反常磁矩 a_μ",
      value: "(g−2)/2 = 0.001 165 920 59",
      hint: "Fermilab E989 · 与 SM 预言偏差 ~4.2σ · 可能是新物理信号",
    },
    {
      label: "中微子质量等级",
      value: "未知",
      hint: "Normal (m₁ < m₂ < m₃) vs Inverted (m₃ < m₁ < m₂) · JUNO 2025+ 将尝试回答",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 核稳定与衰变 · 放射性的发现",
      body: [
        "你身体里每秒钟有约 8000 个钾-40 原子核在衰变——放射性不是实验室里的事，它就发生在你体内。原子核是一个你永远无法直接「看到」的世界，但它决定了恒星的燃烧、元素的诞生、以及你存在的物质基础。",
        "原子核由质子和中子（统称 nucleon）通过强相互作用束缚。结合能曲线（Weizsäcker 半经验公式）在 ⁵⁶Fe 附近最大——所以聚变（轻核合并）和裂变（重核裂开）都释放能量。",
        "不稳定核通过 α / β / γ 衰变回到稳定区。半衰期跨越 26 个数量级——从 ²¹²Po 的 0.3 μs 到 ¹²⁸Te 的 2.2 × 10²⁴ yr。¹²⁸Te 的半衰期比宇宙年龄长 16 个数量级，但仍在被地球上的辐射探测器（XENON1T）观测到——这是实验灵敏度的奇迹。",
        "放射性是 Becquerel 1896 年偶然发现的：他把铀盐放在照相底片旁边，底片感光了。Curie 夫妇随后分离出钋和镭，Rutherford 用 α 粒子散射实验（1911）发现原子核——一个直径仅 ~10 fm 的致密核心，集中了 99.97% 的原子质量。从此「原子」不再是不可分的最小单位。",
        "核力的短程性（~1 fm）和饱和性让核物理与原子物理有质的不同：原子的大小由电磁力决定，可以任意扩展（Rydberg 原子 n ~ 100）；原子核的大小由强力决定，密度恒定 ~2.3 × 10¹⁷ kg/m³——一茶匙核物质重 60 亿吨。这种密度差异是中子星存在的物理基础。为什么这很重要？因为理解核力就是理解物质为什么不会坍缩——以及恒星为什么会发光。",
    },
    {
      heading: "学院 · 夸克模型与 QCD",
      body: [
        "质子 = uud，中子 = udd。夸克带分数电荷与「色」荷（red/green/blue），靠胶子交换的强相互作用束缚。色禁闭：自由夸克不存在，永远裹在「白」色单态里。",
        "QCD（量子色动力学）的耦合在高能处变小（渐进自由），低能处变大（红外奴役）。这解释了为什么深度非弹性散射看得到点状夸克，但又没人见过自由夸克。",
        "Yukawa 1935 用 π 介子交换解释核力，现代视角下核力是 QCD 在低能的剩余相互作用——类似分子间力对原子内电磁力的关系。",
      ],
    },
    {
      heading: "前沿 · QGP / 中微子 / 暗物质实验",
      body: [
        "RHIC / LHC ALICE 重离子碰撞制造 trillion 度的「夸克-胶子等离子体」——大爆炸后 1 μs 的物质相，几乎是完美流体。",
        "中微子振荡（Super-Kamiokande 1998, SNO 2002）证明它们有质量；尝试解释这点的 see-saw 机制可能与重子非对称（为什么宇宙是物质多于反物质）相关。",
        "直接探测暗物质（LUX-ZEPLIN / PandaX）尚未捕获信号——参数空间不断被排除，新模型层出不穷。",
      ],
    },
    {
      heading: "核素图与「稳定岛」",
      body: [
        "把所有已知核素（截至 2025 约 3300 个）按 N（中子数）和 Z（质子数）画在 N-Z 平面上，就是 Segré 图。稳定核挤在「稳定谷 (valley of stability)」上 —— 轻核 N≈Z，重核 N/Z≈1.5；远离这条谷的核以 β+ / β− / α / 自发裂变迅速回到稳定区。",
        "理论预测在 Z ≈ 114-126、N ≈ 184 附近存在「超重稳定岛 (island of stability)」—— 那里壳层效应让寿命可能从微秒延长到分钟、小时甚至更久。GSI / JINR / RIKEN 正在合成更重的核 (Z=119/120) 来逼近这座岛 —— 这是元素周期表的边境探险。",
        "核合成（恒星内部聚变、超新星 r-过程、中子星并合）产生了宇宙中除氢和氦以外的所有元素。铁（⁵⁶Fe）是最稳定的核，比铁轻的元素在恒星聚变中产生，比铁重的需要中子俘获——s-过程（慢，恒星内部）和 r-过程（快，超新星/并合）。2017 年 GW170817 中子星并合的光学对应体（kilonova）直接证实了 r-过程是金、铂、铀等重元素的主要来源。",
        "Weizsäcker 半经验公式 B(A,Z) = a_V A − a_S A^(2/3) − a_C Z(Z−1)/A^(1/3) − a_A (A−2Z)²/A + δ(A,Z) 把结合能拆成体积项、表面项、库仑项、不对称项和配对项。五项就能精确拟合 ~2000 个已知核素的结合能——这是核物理中「简单模型捕获本质」的典范。",
      ],
    },
    {
      heading: "核壳模型 · 魔数从何而来",
      body: [
        "Mayer 与 Jensen 1949 注意到：核子数取 2、8、20、28、50、82、126 时核异常稳定——这些「魔数」直接对应 ⁴He、¹⁶O、⁴⁰Ca、²⁰⁸Pb 等双魔核的结合能尖峰。要解释它们必须引入强自旋-轨道耦合项 ξ(r) L·S，把简谐振子能级劈成 j = ℓ ± 1/2 两支，闭壳重新落在实验观察到的间隙处，1963 年 Nobel。",
        "魔数之外还有集体激发：核被光子激发时，质子云相对中子云做整体反向振荡——巨偶极共振 (GDR)，能量 E_GDR ≈ 78 A^(−1/3) MeV，是核「呼吸」的第一个简正模式。形变核 (²³⁸U) 还出现转动谱 E_J = ℏ² J(J+1) / (2 I_eff)，看上去就像分子转动 (P5) 在 ×10⁶ 倍能标上的回声。",
        "壳模型解决了「为什么稳定」，集体模型解决了「为什么会震动」。现代核结构理论把两者统一：从壳模型基态出发，用 RPA（随机相位近似）计算集体激发，用 GCM（生成坐标法）处理形变和裂变路径。从 ²⁰⁸Pb 的闭壳到 ²⁴⁰Pu 的裂变位垒，同一套框架覆盖了整个核素图。",
        "核力的微观起源在 QCD：核子之间的 π 介子交换是 QCD 在低能的有效描述，就像 Van der Waals 力是电磁力的有效描述。格点 QCD 已经能从第一性原理算出核力的中程吸引和短程排斥，但计算成本极高——这是「从夸克到核」的理论桥梁，仍在建造中。",
      ],
    },
    {
      heading: "中微子三味 · PMNS 与质量等级",
      body: [
        "Pontecorvo 1957 + Maki-Nakagawa-Sakata 1962 提出：弱本征态 (ν_e, ν_μ, ν_τ) 与质量本征态 (ν₁, ν₂, ν₃) 是不同的，二者由幺正矩阵 U_PMNS 联系，含三个混合角 θ₁₂, θ₁₃, θ₂₃ 与一个 CP 相位 δ_CP。一束 ν_μ 飞 L 公里后变成 ν_e 的概率约 sin²(2θ_{13}) sin²(Δm²_{31} L / 4E)——这就是振荡，且只在 ν 有质量时才发生。",
        "三个角今天都被测出：θ₁₂ ≈ 33°（太阳与 KamLAND）、θ₂₃ ≈ 45°（大气与 T2K/NOvA）、θ₁₃ ≈ 8.6°（反应堆 Daya Bay 2012 关键测出）。两个 |Δm²| 也被锁定，但中微子绝对质量、质量等级（normal vs inverted）、CP 相位 δ_CP、是否是自身反粒子（Majorana 还是 Dirac？无中微子双 β 衰变在找答案）这四个核心问题至今未解。",
        "中微子质量的微小（< 0.8 eV，比电子轻 10⁶ 倍）暗示它可能有特殊的产生机制。See-saw 机制假设存在重 Majorana 中微子（M_R ~ 10¹⁴ GeV），普通中微子质量 m_ν ≈ m_D² / M_R 自然地被压低——这把中微子物理直接连到 GUT 能标（P7）。",
        "中微子 CP 破缺（δ_CP ≠ 0 或 π）如果被 DUNE（2030+）和 Hyper-Kamiokande（2027+）确认，将为宇宙的物质-反物质不对称提供关键线索——因为 leptogenesis 机制需要 CP 破缺的中微子衰变来产生轻子不对称，再通过 Sphaleron（P7）转化为重子不对称。一个 < 1 eV 的粒子可能解释为什么宇宙中存在物质——这是粒子物理与宇宙学最深刻的交汇点。",
      ],
    },
    {
      heading: "粒子加速器 · 从 Cockcroft 到 LHC",
      body: [
        "1932 年 Cockcroft 和 Walton 用 700 kV 高压加速质子轰击锂-7，实现了第一次人工核反应：⁷Li + p → 2 ⁴He。这是 Rutherford「用粒子当子弹打原子核」思路的工程实现——从此核物理有了实验工具。Cockcroft-Walton 加速器的基本原理是逐级升压，但电压越高绝缘越难，能量上限 ~1 MeV。",
        "回旋加速器（Lawrence 1929）用磁场让粒子做螺旋运动，每半圈被电场加速一次——频率恒定（cyclotron frequency），不依赖能量。同步加速器（1940s+）让磁场随能量增加，保持轨道半径恒定——LHC 的 27 km 环就是同步加速器。质子在 LHC 里转 11,245 圈/秒，每圈获得 ~5 MeV，从注入到满能量 6.5 TeV 需要 ~20 分钟。",
        "对撞机比固定靶更高效：两束 6.5 TeV 质子对撞，质心能量 13.6 TeV；而 6.5 TeV 质子打静止靶只有 √(2 × 6.5 × 0.938) ≈ 3.5 TeV。这就是为什么 LHC 选择对撞模式——在同样的束流能量下，对撞机的质心能量高出一个数量级。但代价是对撞亮度低（因为两束必须精确重叠），需要长时间积累数据。",
        "从 Cockcroft 的 0.7 MeV 到 LHC 的 13.6 TeV，加速器能量提升了 7 个数量级。每一代新粒子的发现都伴随一次能量跃迁：π 介子（宇宙线 ~GeV）、J/ψ（SPEAR ~5 GeV）、W/Z（SPS ~500 GeV）、顶夸克（Tevatron ~2 TeV）、Higgs（LHC ~14 TeV）。下一个跃迁可能是 FCC（100 TeV）或正负电子 Higgs 工厂——取决于哪个先获得资金批准。",
      ],
    },
    {
      heading: "质子半径之谜 · μ子氢 vs 电子氢",
      body: [
        "质子不是一个点粒子——它有内部结构，电荷分布在 ~1 fm 的范围内。传统方法用电子-质子散射和氢原子光谱测量质子电荷半径，给出 r_p ≈ 0.877 ± 0.005 fm（CODATA 2010）。这个值用了几十年，没人觉得有问题。",
        "2010 年 Pohl 等人用 μ子氢（μ⁻p）激光光谱测到 r_p = 0.84184 ± 0.00067 fm——比电子氢测量值小 5σ（4%）。μ子比电子重 207 倍，轨道半径更小，对质子结构更敏感。这个差异不应该出现——如果量子电动力学（QED）是对的，质子半径不应该依赖于用哪种轻子去探它。",
        "后续实验分成了两派：μ子氢和电子散射新实验（PRad 2019）支持小半径（~0.84 fm），旧氢光谱和部分散射实验仍偏大半径（~0.88 fm）。2022 年 CREMA 团队用 μ子氘的 2S-4P 跃迁进一步确认小半径。现在主流认为「旧」值可能有系统误差——但具体是哪些实验有误差，仍不清楚。质子半径之谜不是新物理的信号（QED 的不确定性远大于 4%），而是精密测量系统学的教训：即使在最简单的原子系统里，实验精度也比想象中更难控制。",
        "这场争论推动了新一代精密实验：PRad II（Jefferson Lab）、muCap（PSI）、以及未来 μ子对撞机上的 μ 源。质子结构的精确理解不仅影响原子物理常数，还影响暗物质直接探测的核物理输入——探测器的灵敏度依赖于质子的电磁形状因子。一个看似无聊的「量尺寸」问题，牵动着从基础物理到应用物理的多条线索。",
      ],
    },
    {
      heading: "μ子 g−2 · 标准模型的裂痕",
      body: [
        "μ子的反常磁矩 a_μ = (g−2)/2 是标准模型最精密的可测物理量之一。理论预言来自 QED（~10⁵ 个 Feynman 图的贡献）、强子（真空极化 + 光子-光子散射）和电弱三部分。标准模型的最新综合预言（2020 白皮书）给出 a_μ(SM) = 116 591 810(43) × 10⁻¹¹——精确度 0.37 ppm。",
        "Fermilab E989 实验（2021, 2023）用 μ 子储存环把测量精度推到 0.20 ppm：a_μ(Exp) = 116 592 059(22) × 10⁻¹¹。与理论预言的偏差 Δa_μ = (249 ± 48) × 10⁻¹¹，对应 4.2σ——这是「持久的张力」，但还没达到 5σ 发现阈值。",
        "如果偏差是真实的，它意味着标准模型缺了一块：可能是新的轻粒子（如暗光子、轻子夸克）、超对称伙伴、或复合 Higgs 结构的贡献。但强子贡献的理论计算有争议：用 e⁺e⁻ 数据（dispersive method）得到的理论值与实验偏差 4.2σ，而用 lattice QCD（BMW 2021）得到的值更接近实验。这两种方法的差异（~3σ）本身就是未解决的理论问题。",
        "J-PARC 的新实验（E34）将用完全不同的技术（μ 束注入 + 磁场测量）交叉检验。如果 E34 也看到偏差，g−2 将成为 BSM 物理的第一个确凿信号；如果 E34 与标准模型吻合，问题就在强子理论计算上。无论哪种结果，μ子 g−2 都在教我们：标准模型在 0.1% 的精度上是否仍然成立——答案将指向 P7 的新物理或 P6 的强子物理。",
      ],
    },
  ],
  sources: [
    {
      label: "CERN",
      url: "https://home.cern/",
      kind: "agency",
    },
    {
      label: "Particle Data Group",
      url: "https://pdg.lbl.gov/",
      kind: "agency",
    },
    {
      label: "ATLAS open data",
      url: "https://atlas.cern/Resources/Opendata",
      kind: "agency",
    },
    {
      label: "Daya Bay 2012 — Observation of θ₁₃",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.108.171803",
      kind: "paper",
    },
    {
      label: "Greisen 1966 — End to the cosmic-ray spectrum (GZK)",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.16.748",
      kind: "paper",
    },
    {
      label: "Gross & Wilczek 1973 — Ultraviolet Behavior of Non-Abelian Gauge Theories (asymptotic freedom)",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.30.1343",
      kind: "paper",
    },
    {
      label: "Fukuda et al. (Super-Kamiokande) 1998 — Evidence for oscillation of atmospheric neutrinos",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.81.1562",
      kind: "paper",
    },
    {
      label: "Adams et al. (RHIC) 2005 — Experimental and theoretical challenges in quark-gluon plasma",
      url: "https://www.bnl.gov/newsroom/news.php?a=119878",
      kind: "agency",
    },
    {
      label: "Pohl et al. 2010 — The size of the proton (μ hydrogen spectroscopy)",
      url: "https://www.nature.com/articles/nature09250",
      kind: "paper",
    },
    {
      label: "Abi et al. (Muon g−2) 2021 — Measurement of the Positive Muon Anomalous Magnetic Moment to 0.46 ppm",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.126.141801",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "binding-energy",
      name: { primary: "结合能曲线", latin: "Binding Energy Curve" },
      position: [-0.5, 0, -0.3],
      description: "每核子结合能 vs A，峰在 ⁵⁶Fe。聚变 / 裂变都释放能量都从这条曲线读出。",
      data: [
        { label: "峰值", value: "⁵⁶Fe ~ 8.8 MeV/A" },
        { label: "互文", value: "P3 相对论 · E = mc²" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "quark-model",
      name: { primary: "夸克模型", latin: "Quark Model" },
      position: [0.3, 0, -0.5],
      description:
        "u / d / s / c / b / t 六味夸克。质子 = uud，中子 = udd。所有强子都是「白色」组合。",
      data: [
        { label: "Gell-Mann", value: "1964" },
        { label: "color", value: "SU(3)" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
    {
      id: "qcd-confinement",
      name: { primary: "色禁闭 · 渐进自由", latin: "Color Confinement" },
      position: [0.6, 0, 0.1],
      description: "QCD 耦合高能小、低能大。Nobel 2004 表彰渐进自由；色禁闭把夸克永远关在强子里。",
      data: [
        { label: "α_s(m_Z)", value: "0.118" },
        { label: "互文", value: "P7 标准模型 · SU(3)" },
      ],
      color: "var(--hw-blue)",
      size: 0.04,
    },
    {
      id: "neutrino-oscillation",
      name: { primary: "中微子振荡", latin: "Neutrino Oscillation" },
      position: [-0.4, 0, 0.5],
      description: "中微子在三味之间振荡——证明它们有质量。SK 1998 + SNO 2002 → Nobel 2015。",
      data: [
        { label: "Δm²", value: "~ 10⁻³ eV²" },
        { label: "互文", value: "P7 标准模型 · 质量起源" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "fusion-fission",
      name: { primary: "聚变 / 裂变", latin: "Fusion / Fission" },
      position: [0.5, 0, 0.4],
      description:
        "太阳里 DD/DT 聚变给我们光与热；地球反应堆里 ²³⁵U 裂变发电。两者都是结合能曲线两端的产物。",
      data: [
        { label: "DT 聚变 Q", value: "17.6 MeV" },
        { label: "²³⁵U Q", value: "~ 200 MeV" },
      ],
      color: "var(--hw-gold)",
      size: 0.035,
    },
    {
      id: "qgp",
      name: { primary: "夸克-胶子等离子体", latin: "Quark-Gluon Plasma" },
      position: [-0.6, 0, 0.2],
      description:
        "极高温度下夸克与胶子从核子里挣脱——大爆炸后 1 μs 的物质相，几乎是完美流体（η/s 接近 KSS bound）。",
      data: [
        { label: "T", value: "~ 10¹² K" },
        { label: "互文", value: "T0 大爆炸 · 1 μs" },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
  ],
  discussionQuestions: [
    '质子质量的 99% 来自胶子场的能量而非夸克本身——这对你理解「质量」这个概念有什么启发？E = mc² 在这里如何体现？',
    '如果中微子有质量且是 Majorana 粒子（自身即反粒子），为什么宇宙中物质多于反物质的问题可能得到解答？',
    'μ子 g-2 实验与标准模型预言偏差 4.2σ——在宣称「发现新物理」之前，你觉得需要多高的置信度？为什么粒子物理学选择 5σ 作为标准？',
  ],
};

export default content;

import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "P6",
  name: { primary: "原子核与粒子", latin: "Nuclear & Particle Physics" },
  tagline: "把物质再砸碎一点",
  whisper: "质量的 99% 来自胶子场的能量，不是夸克本身——物质的「重」是束缚的产物。",
  dataCards: [
    { label: "质子质量", latinLabel: "m_p", value: "938.272", hint: "MeV / c²" },
    { label: "中子质量", latinLabel: "m_n", value: "939.565", hint: "MeV / c²" },
    { label: "强耦合常数", latinLabel: "α_s(m_Z)", value: "≈ 0.118", hint: "在 Z 质量处" },
    { label: "费米单位", value: "1 fm", hint: "= 10⁻¹⁵ m" },
    { label: "氘结合能", value: "2.224", hint: "MeV · 最弱核" },
    { label: "²³⁵U 裂变", value: "~ 200", hint: "MeV / 反应" },
    { label: "DD 聚变 Q", value: "3.65", hint: "MeV" },
    { label: "LHC 能量", value: "13.6", hint: "TeV (Run 3)" },
    {
      label: "核壳魔数",
      value: "2 / 8 / 20 / 28 / 50 / 82 / 126",
      hint: "Mayer-Jensen 1949 · 自旋-轨道耦合解释",
    },
    {
      label: "PMNS θ₁₃",
      value: "≈ 8.6°",
      hint: "Daya Bay / RENO / Double Chooz 2012",
    },
    {
      label: "GZK 截断",
      value: "≈ 5 × 10¹⁹",
      hint: "eV · 质子在 CMB 上的能量上限",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 核稳定与衰变",
      body: [
        "原子核由质子和中子（统称 nucleon）通过强相互作用束缚。结合能曲线（Weizsäcker 半经验公式）在 ⁵⁶Fe 附近最大——所以聚变（轻核合并）和裂变（重核裂开）都释放能量。",
        "不稳定核通过 α / β / γ 衰变回到稳定区。半衰期跨越 26 个数量级——从 ²¹²Po 的 0.3 μs 到 ¹²⁸Te 的 2.2 × 10²⁴ yr。",
        "如果把原子核比作一滴带电的水珠，那强核力就是表面张力——它拼命把核子拉在一起，而质子间的 Coulomb 排斥力就像往水珠里注入了膨胀气体。轻核里表面张力占上风，所以合并（聚变）释放能量；重核里 Coulomb 排斥越积越多，所以拆开（裂变）释放能量。⁵⁶Fe 是表面张力与排斥力完美平衡的巅峰——宇宙中所有的恒星燃烧，最终都指向这座铁的山峰。",
      ],
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
      heading: "恒星核聚变 · 点燃宇宙的火种",
      body: [
        "恒星是宇宙中最大的核聚变反应堆。在太阳核心（温度 ~1500 万 K，密度 ~150 g/cm³），质子-质子链反应 (pp chain) 每秒将约 6 亿吨氢聚变为氦，质量亏损 Δm ≈ 0.7% 以能量形式释放——E = mc² 每秒输出 3.846 × 10²⁶ W。pp 链的第一步是两个质子聚变为氘 (²H) 并释放正电子和中微子，这一步涉及弱相互作用，概率极低——平均一个质子要等约 90 亿年才能成功聚变，这就是太阳能稳定燃烧 100 亿年而不是爆炸的原因。",
        "质量更大的恒星（> 8 M☉）通过 CNO 循环和后续的氦燃烧、碳燃烧、氧燃烧、硅燃烧一路合成到铁 (⁵⁶Fe)。硅燃烧阶段仅持续约 1 天——一旦铁核形成，聚变不再释放能量（结合能曲线已达峰值），核心在不到 1 秒内坍缩为中子星或黑洞，外层以超新星爆发的形式将合成的重元素抛入星际介质。比铁更重的元素（金、铂、铀）主要通过中子俘获过程 (r-process 和 s-process) 合成：r-process 的主要场所被 2017 年 GW170817 双中子星并合事件的千新星光谱直接证实——你手指上的金戒指很可能诞生于两颗中子星的碰撞。恒星核聚变不仅点亮了夜空，更铸造了构成行星、生命和我们身体的几乎每一个原子。",
      ],
    },
    {
      heading: "核素图与「稳定岛」",
      body: [
        "把所有已知核素（截至 2025 约 3300 个）按 N（中子数）和 Z（质子数）画在 N-Z 平面上，就是 Segré 图。稳定核挤在「稳定谷 (valley of stability)」上 —— 轻核 N≈Z，重核 N/Z≈1.5；远离这条谷的核以 β+ / β− / α / 自发裂变迅速回到稳定区。",
        "理论预测在 Z ≈ 114-126、N ≈ 184 附近存在「超重稳定岛 (island of stability)」—— 那里壳层效应让寿命可能从微秒延长到分钟、小时甚至更久。GSI / JINR / RIKEN 正在合成更重的核 (Z=119/120) 来逼近这座岛 —— 这是元素周期表的边境探险。",
      ],
    },
    {
      heading: "核壳模型 · 魔数从何而来",
      body: [
        "Mayer 与 Jensen 1949 注意到：核子数取 2、8、20、28、50、82、126 时核异常稳定——这些「魔数」直接对应 ⁴He、¹⁶O、⁴⁰Ca、²⁰⁸Pb 等双魔核的结合能尖峰。要解释它们必须引入强自旋-轨道耦合项 ξ(r) L·S，把简谐振子能级劈成 j = ℓ ± 1/2 两支，闭壳重新落在实验观察到的间隙处，1963 年 Nobel。",
        "魔数之外还有集体激发：核被光子激发时，质子云相对中子云做整体反向振荡——巨偶极共振 (GDR)，能量 E_GDR ≈ 78 A^(−1/3) MeV，是核「呼吸」的第一个简正模式。形变核 (²³⁸U) 还出现转动谱 E_J = ℏ² J(J+1) / (2 I_eff)，看上去就像分子转动 (P5) 在 ×10⁶ 倍能标上的回声——壳模型解决了「为什么稳定」，集体模型解决了「为什么会震动」。",
      ],
    },
    {
      heading: "中微子三味 · PMNS 与质量等级",
      body: [
        "Pontecorvo 1957 + Maki-Nakagawa-Sakata 1962 提出：弱本征态 (ν_e, ν_μ, ν_τ) 与质量本征态 (ν₁, ν₂, ν₃) 是不同的，二者由幺正矩阵 U_PMNS 联系，含三个混合角 θ₁₂, θ₁₃, θ₂₃ 与一个 CP 相位 δ_CP。一束 ν_μ 飞 L 公里后变成 ν_e 的概率约 sin²(2θ_{13}) sin²(Δm²_{31} L / 4E)——这就是振荡，且只在 ν 有质量时才发生。",
        "三个角今天都被测出：θ₁₂ ≈ 33°（太阳与 KamLAND）、θ₂₃ ≈ 45°（大气与 T2K/NOvA）、θ₁₃ ≈ 8.6°（反应堆 Daya Bay 2012 关键测出）。两个 |Δm²| 也被锁定，但中微子绝对质量、质量等级（normal vs inverted）、CP 相位 δ_CP、是否是自身反粒子（Majorana 还是 Dirac？无中微子双 β 衰变在找答案）这四个核心问题至今未解；任何一个有定论，都直接连到 P7 的 see-saw 机制与 P8 的重子非对称起源。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "Krane《Introductory Nuclear Physics》本科级；Halzen & Martin《Quarks and Leptons》研究生入门；Peskin-Schroeder 是 QFT 圣经；Wong《Introductory Nuclear Physics》给壳模型 / 集体模型平衡视角。",
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
};

export default content;

import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "P8",
  name: { primary: "前沿物理", latin: "Frontier Physics" },
  tagline: "下一个百年的入口",
  whisper: "今天正在被追问、正在被回答、且尚未被关闭的问题。",
  dataCards: [
    { label: "暗物质占比", value: "26.8%", hint: "Planck 2018" },
    { label: "暗能量占比", value: "68.3%", hint: "Planck 2018" },
    { label: "可见物质", value: "≈ 4.9%", hint: "全部 baryon" },
    { label: "量子比特纪录", value: "1000+", hint: "超导 / 离子阱（2024）" },
    { label: "AdS/CFT", value: "Maldacena 1997", hint: "全息对偶" },
    { label: "Hubble 张力", value: "~ 5σ", hint: "局部 vs CMB 测量分歧" },
    { label: "g−2 muon", value: "4.2σ", hint: "Fermilab E989 (2023)" },
    { label: "误码率门槛", value: "~ 10⁻⁴", hint: "Surface code 容错阈值" },
    {
      label: "Bekenstein bound",
      value: "S ≤ 2π k_B R E / (ℏ c)",
      hint: "给定区域内最大信息量",
    },
    {
      label: "FRB 已编目",
      value: "5 000+",
      hint: "CHIME / ASKAP / Parkes 2018-2025",
    },
    {
      label: "BMV 引力诱导纠缠",
      value: "~10⁻¹⁴",
      hint: "kg · 两块介观物体相干叠加目标质量",
    },
    {
      label: "MoTe₂ 莫尔填隙",
      value: "ν = −2/3, −3/5",
      hint: "分数反常量子 Hall · 2023 (Cornell/UW)",
    },
    {
      label: "DESI 暗能量演化",
      value: "w(z)",
      hint: "2024 年 DESI 数据暗示暗能量可能随时间演化",
    },
    {
      label: "NANOGrav 引力波背景",
      value: "nHz",
      hint: "2023 年脉冲星计时阵列发现的纳赫兹引力波背景",
    },
  ],
  narrative: [
    {
      heading: "宇宙学张力 · 不止 ΛCDM",
      body: [
        "ΛCDM 仍是描述宇宙演化的最佳模型，但 Hubble 张力（局部 ~ 73 km/s/Mpc vs CMB ~ 67）和 S₈ 张力暗示要么观测系统误差未排除，要么模型需要扩展（额外辐射、相互作用暗能量、早期暗能量）。",
        "Euclid（2023+）、Vera Rubin LSST（2025+）、Roman、CMB-S4 几年内会把统计精度提升一个数量级——张力是缩小还是变成断裂，这是下一个 5 年的悬念。",
        "想象你用两把不同的尺子测量同一张桌子的长度——一把从桌面直接量，另一把通过桌腿的影子用三角函数反推——两把尺子给出了不同的结果。差 5σ 意味着：如果两把尺子都是对的，这种差异偶然发生的概率不到三百万分之一。问题要么出在某把尺子的刻度上（系统误差），要么出在我们对桌子形状的理解上（ΛCDM 模型不完整）。无论哪种答案，这都是当代宇宙学最锋利的开放问题。",
      ],
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
        "最热的候选是 Majorana zero mode：半导体纳米线 + 超导邻近效应 + 强磁场下，理论预言线两端会出现成对的 Majorana 零模。微软 2023 的 InAs/Al 设备给出了「拓扑能隙协议」通过的报告；2024 后续 Microsoft Quantum 持续在改进度量。这条路线和超导 transmon、Rydberg 阵列 (P5) 一起，构成「量子比特动物园」里最反直觉但也最优雅的一支。",
      ],
    },
    {
      heading: "暗能量 · 推开宇宙的隐形之手",
      body: [
        "1998 年，两个独立超新星观测队——Supernova Cosmology Project (Perlmutter) 与 High-z Supernova Search Team (Riess, Schmidt)——发现远处 Ia 型超新星比预期暗淡，意味着宇宙膨胀正在加速而非减速。这个发现震惊了整个物理学界，三人因此共享 2011 年 Nobel 物理学奖。暗能量占据了宇宙总能量密度的约 68%，却如同一位隐形的魔术师：你看不见它的手，但舞台上的每一颗星都在被它推开。",
        "最简单的候选者是爱因斯坦 1917 年引入的宇宙学常数 Λ——真空本身蕴含的能量密度，恒定不变，状态方程参数 w = −1。DESI 2024 年的最新数据给出 w = −1.03 ± 0.03，与 Λ 几乎完美吻合，但也留下一丝 w 随时间演化的可能性。如果 w < −1（所谓 phantom energy），宇宙将在有限时间内被撕碎——「大撕裂 (Big Rip)」——先是星系团，再是星系，再是恒星，最后是原子本身。这个末日剧本虽然极端，但目前数据还不能排除。",
        "暗能量的本质是 21 世纪物理学最深的谜之一。一种思路是它来自真空量子涨落的零点能——但把量子场论算出的真空能与观测值一比，差了 120 个数量级，这是「宇宙学常数问题」，被称为「物理学史上最糟糕的预言」。另一种思路是 quintessence——一个缓慢滚动的标量场，类似暴胀子但在低能标下运作。无论答案是什么，暗能量正在决定宇宙的终极命运：它将以指数膨胀把可观测宇宙变成一座永恒的孤岛。",
      ],
    },
    {
      heading: "DESI 2024 · 暗能量正在演化？",
      body: [
        "暗能量光谱巡天仪器 (DESI) 是安装在 Kitt Peak 国家天文台 Mayall 4 米望远镜上的第五代光谱巡天设备，拥有 5000 根可独立定位的光纤，每晚能获取数千个星系和类星体的光谱。2024 年 4 月，DESI 合作组发布了第一年观测数据的宇宙学结果——基于超过 600 万个星系和类星体的重子声学振荡 (BAO) 测量，覆盖红移 0.1 到 4.2 的广阔范围。",
        "结果令宇宙学界为之一振：DESI 的 BAO 数据，结合 CMB 和 Ia 型超新星数据，暗示暗能量的状态方程参数 w 可能不是一个常数，而是在过去 10 亿年里从 w ≈ −0.8 逐渐演化到今天的 w ≈ −1。如果这一趋势在后续数据中得到确认，它将直接排除宇宙学常数 Λ，因为 Λ 的 w 严格等于 −1 且不随时间变化。取而代之的将是某种动力学暗能量场——quintessence、phantom field、或者某种更奇异的理论框架。",
        "科学界对此结果仍持审慎态度。统计显著性约为 2.5σ 至 3.9σ（取决于数据组合方式），尚未达到粒子物理学「发现」的 5σ 门槛。DESI 目前仅使用了 5 年观测计划中第一年的数据，后续 4 年的数据量将是第一年的 4 倍以上，统计精度将大幅提升。如果 w(z) 演化的趋势在 2026–2028 年的数据中持续增强，这将是自 1998 年发现宇宙加速膨胀以来宇宙学领域最重大的突破——暗能量不是爱因斯坦的 Λ，而是某种活的、在演化的实体。",
      ],
    },
    {
      heading: "纳赫兹引力波 · 宇宙最大尺度的动力学",
      body: [
        "2023 年 6 月，全球五大脉冲星计时阵列 (PTA) 团队——NANOGrav、EPTA、PPTA、CPTA (中国 FAST) 和 IPTA——联合宣布在纳赫兹 (nHz) 频段发现了引力波背景的决定性证据。脉冲星计时阵列的原理如同一个银河系尺度的引力波探测器：毫秒脉冲星是自然界最精确的时钟（稳定性可达 10⁻¹⁵），引力波经过时会拉伸和压缩地球与脉冲星之间的空间，导致脉冲到达时间出现特征性的四极相关偏移——Hellings-Downs 关联。",
        "NANOGrav 15 年数据集中，68 颗毫秒脉冲星的计时残差表现出与引力波背景一致的频谱特征，统计显著性超过 3σ。最可能的来源是宇宙历史上所有超大质量黑洞双星 (10⁶–10¹⁰ M☉) 的并合所产生的引力波叠加——当两个星系合并时，它们中心的超大质量黑洞最终会形成双星并辐射引力波，在宇宙 138 亿年历史中无数次这样的事件叠加在一起，形成了遍布宇宙的 nHz 频段引力波背景。",
        "这打开了一扇全新的天文学窗口。LIGO/Virgo 探测的是恒星级黑洞并合的「高频」引力波（10–10³ Hz），而 nHz 引力波背景反映的是宇宙最大尺度结构的动力学——星系合并率的演化历史、超大质量黑洞的增长路径、甚至早期宇宙的相变或宇宙弦都可能贡献其中。未来的 SKA（平方公里阵列）将把脉冲星计时精度提升一个数量级，有望从「背景」中分辨出单个超大质量黑洞双星的确定信号——届时我们将能够「听到」宇宙中每一对正在跳舞的巨人。",
      ],
    },
    {
      heading: "桌面引力 · BMV 与量子-引力的真空裁判",
      body: [
        "我们没有量子引力理论的实验证据——但 Bose-Marletto-Vedral 2017 提出一个轻巧到工程师可以做的判决实验：把两块 ~10⁻¹⁴ kg 的介观物体各自制备成空间叠加态，让它们仅通过引力相互作用 ~1 秒，然后测它们是否纠缠。若引力是量子的，自然在两态间生成纠缠；若引力是经典的（LOCC 通道），按 Bell-类型论证，纠缠不可能产生。",
        "实验难度集中在「保住相干」：要求介观物体在 ~100 μm 量级的叠加里维持 ~1 s 量级的退相干时间，约比目前最好的纳米机械振子记录还高几个数量级。维也纳、伦敦帝国、剑桥、麻省理工的多个组都在追这条线，预计 2030 年代有第一次决定性结果。这是历史上第一次有人尝试用桌面实验直接问「引力到底量子吗」——一个 P3 与 P4 七十年悬而未决的问题，或许将由一根光镊里的硅球回答。",
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
      label: "Riess et al. 1998 — Observational Evidence from SNe Ia for an Accelerating Universe",
      url: "https://arxiv.org/abs/astro-ph/9805201",
      kind: "paper",
    },
    {
      label: "DESI 2024 — Dark Energy Spectroscopic Instrument results",
      url: "https://arxiv.org/abs/2404.03002",
      kind: "paper",
    },
    {
      label: "DESI 2024 — Extended Baryon Oscillation Spectroscopic Survey (eBOSS) BAO",
      url: "https://arxiv.org/abs/2404.03000",
      kind: "paper",
    },
    {
      label: "NANOGrav 2023 — Evidence for a gravitational-wave background",
      url: "https://arxiv.org/abs/2306.16213",
      kind: "paper",
    },
    {
      label: "Perlmutter et al. 1999 — Measurements of Ω and Λ from 42 SNe Ia",
      url: "https://arxiv.org/abs/astro-ph/9812133",
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
};

export default content;

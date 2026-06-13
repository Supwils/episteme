import type { TierContent } from "@/subjects/physics/lib/content";

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
    {
      label: "g−2 muon",
      value: "≈0σ（已消解）",
      hint: "Fermilab 2025 终值 127ppb；晶格 QCD 与实验一致",
    },
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
  ],
  narrative: [
    {
      heading: "宇宙学张力 · 不止 ΛCDM",
      body: [
        "ΛCDM 仍是描述宇宙演化的最佳模型，但 Hubble 张力（局部 ~ 73 km/s/Mpc vs CMB ~ 67）和 S₈ 张力暗示要么观测系统误差未排除，要么模型需要扩展（额外辐射、相互作用暗能量、早期暗能量）。",
        "Euclid（2023+）、Vera Rubin LSST（2025+）、Roman、CMB-S4 几年内会把统计精度提升一个数量级——张力是缩小还是变成断裂，这是下一个 5 年的悬念。",
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

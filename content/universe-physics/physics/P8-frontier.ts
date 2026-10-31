import type { TierContent } from "@/subjects/physics/lib/content";
import { frontierComposition } from "./frontier-data";

const content: TierContent = {
  tier: "P8",
  name: {
    primary: "前沿物理",
    latin: "Frontier Physics",
  },
  tagline: "下一个百年的入口",
  whisper: "今天正在被追问、正在被回答、且尚未被关闭的问题。",
  dataCards: [
    {
      label: "冷暗物质占比",
      value: frontierComposition[1].value,
      hint: "今日能量密度 · Planck2018平直ΛCDM中心值示例",
    },
    {
      label: "暗能量占比",
      value: frontierComposition[0].value,
      hint: "同一数据组合与模型；非直接称量暗能量",
    },
    {
      label: "重子物质占比",
      value: frontierComposition[2].value,
      hint: "包含恒星与气体等，不能等同可见光物质",
    },
    {
      label: "Willow芯片",
      value: "105物理比特",
      hint: "2024实验；距7表面码使用其中101个物理比特",
    },
    {
      label: "AdS/CFT",
      value: "1997预印本 / 1998刊印",
      hint: "特定反德西特背景与共形场论的对偶猜想",
    },
    {
      label: "H₀比较示例",
      value: "73.04 / 67.36",
      hint: "km/s/Mpc · SH0ES2022 / Planck2018平直ΛCDM",
    },
    {
      label: "缪子g−2比较示例",
      value: "约0.6σ",
      hint: "TI2025v3晶格HVP平均对世界实验平均；非所有理论输入已统一",
    },
    {
      label: "容错阈值",
      value: "依噪声模型与编码",
      hint: "还需指定解码器；逻辑每周期错误率与物理门误差须分开",
    },
    {
      label: "Bekenstein熵界",
      value: "S ≤ 2πkRE/(ℏc)",
      hint: "k为Boltzmann常数；须限定完整有界系统与熵的定义",
    },
    {
      label: "首份CHIME/FRB目录",
      value: "536次爆发",
      hint: "2021发表；观测期2018-07至2019-07，不是当前全世界总数",
    },
    {
      label: "引力诱导纠缠方案",
      value: "~10⁻¹⁴ kg",
      hint: "Bose等2017方案示例目标质量；不代表已实现",
    },
    {
      label: "MoTe₂莫尔填充因子",
      value: "ν=−2/3、−3/5",
      hint: "2023零磁场分数反常量子Hall测量；负号采用空穴约定",
    },
  ],
  narrative: [
    {
      heading: "宇宙学 · 比例与张力都带着模型条件",
      body: [
        "图中用Planck2018的TT,TE,EE+lowE+lensing、平直六参数ΛCDM作为一个明确示例。表2给出ΩΛ=0.6847、Ωc h²=0.1200、Ωb h²=0.02237、H₀=67.36km/s/Mpc；把后两项用h²约化，今日冷暗物质和重子密度约为26.5%与4.9%。中微子、辐射等小分量和舍入余差另列，重子也包含并不明亮的气体，不能把它们统称“可见物质”。",
        "一个经常讨论的比较，是SH0ES2022造父变星–Ia超新星距离阶梯的H₀=73.04±1.04，与Planck2018在平直ΛCDM下推得的67.36±0.54km/s/Mpc。前者论文报告约5σ差异；这是指定数据与模型之间的比较，不能把“5σ”当成任何局部测量、任何新数据都适用的恒定标签。S₈等结构增长比较也须说明巡天、系统误差与模型。",
        "巡天状态同样要带日期。Euclid名义六年广域与深场调查继续绘制大尺度结构；LSST:UK记录Rubin十年LSST于2026年6月29日启动，NASA记录Roman于2026年8月30日发射。CMB-S4原站则公告DOE/NSF于2025年7月停止支持、项目有序关闭。它们不能一起沿用“几年内全部投入、精度必升十倍”的旧预测。",
      ],
    },
    {
      heading: "精密检验 · 缪子磁矩的比较怎样改变",
      body: [
        "Fermilab2025新数据与过去数据组合的aμ=1165920705(148)×10⁻¹²，对应127ppb；加入BNL等数据的世界平均为1165920715(145)×10⁻¹²、124ppb。这是两个不同的平均，不能把一个数值接到另一个精度上。",
        "理论倡议2025更新v3采用晶格QCD的最低阶强子真空极化平均，给aμ标准模型值116592033(62)×10⁻¹¹。对当时世界实验平均，差为38(63)×10⁻¹¹，约0.6σ，在该输入下没有显著张力。原文也指出e⁺e⁻截面数据驱动评估之间存在难以合并的分歧；因此“与这一理论平均相容”不能扩写为所有强子输入已一致、问题永久关闭。",
      ],
    },
    {
      heading: "量子引力 · 对偶与岛公式回答了哪一层问题",
      body: [
        "Maldacena1997预印本、1998刊印的工作提出特定反德西特背景中的弦/M理论与边界共形场论对偶。代表性例子联系AdS₅×S⁵上的IIB弦论和四维N=4超Yang–Mills；这给量子引力提供受控工具，并非已经证明任意引力理论、尤其真实宇宙，都与某个边界CFT等价。",
        "2019年起的岛公式进展把量子极值面和广义熵用于蒸发辐射的精细熵，在可控模型里恢复与幺正演化相容的Page曲线。这里的island是“岛”，不是“蒙面”。熵公式并不直接交出完整辐射量子态、逐比特解码过程，也不能算作真实四维天体黑洞的全部信息问题已获实验解决。",
        "Bekenstein界把完整有界系统的熵、能量与尺度联系起来，常写为S≤2πkRE/(ℏc)（k为Boltzmann常数）；原论证使用明确的系统与引力条件。量子场子区域的纠缠熵还有真空与边界问题，不能把这条式子直接当作任意空间盒子的普适存储容量。弦论、圈量子引力等路线仍面对不同的理论与实验挑战。",
      ],
    },
    {
      heading: "量子信息 · 物理比特、逻辑比特与任务优势",
      body: [
        "容错要说明编码、噪声、解码器与实验指标。2023年Google已比较距3与距5表面码的逻辑错误；2024年在线发表的Willow结果进一步展示低于阈值的缩放。105是芯片物理比特数，距7码用101个物理比特；该实验报告每周期逻辑错误率0.143±0.003%，不是“105个可用逻辑比特”。",
        "表面码与量子LDPC码是纠错编码方案，cat-qubit则是玻色模式的一种编码与硬件保护策略，它们可以组合，不能只按品牌横向排名。阈值不是统一10⁻⁴；必须按具体噪声模型、操作与解码方案求出，低于阈值也仍需要开销和反复纠错。",
        "量子优势声明对应特定任务、设备与当时最好的经典算法。随机线路采样、玻色采样与工业上有用的计算并不等价；经典算法改善也会改变比较。不存在一个对所有算法都适用的“到100万比特即实用”门槛。",
      ],
    },
    {
      heading: "凝聚态与计算 · 新物相需要新的证据",
      body: [
        "2016年诺贝尔物理学奖表彰拓扑相变与拓扑物态的理论发现，不能把后来所有Weyl或Majorana器件都算成已被该奖确认。2023年扭转双层MoTe₂在ν=−2/3、−3/5等空穴填充处报告零磁场分数反常量子Hall平台；填充因子描述占据，不能写成“填隙”。输运平台为分数化研究提供证据，也不自动等于已完成非阿贝尔编织。",
        "铜氧化物、铁基与镍氧化物超导的材料机制仍有开放问题。2019年无限层镍氧化物薄膜报告超导；LK-99的2023室温常压声明则未建立可靠超导证据，复现实验将部分电阻异常归于Cu₂S杂相的结构转变。不同材料、压力、温度和证据类型需要分别比较。",
        "FermiNet与PauliNet用神经网络构造反对称波函数，并通过变分量子Monte Carlo优化，是有精度与系统规模条件的电子结构近似，不能说已精确求解一切Schrödinger方程。GNoME以图网络和DFT评价寻找晶体候选；理论稳定、可合成和器件性能仍是不同关卡。AlphaFold主要研究蛋白质结构，把它的名字直接放到电池材料成果上，会混淆研究对象与证据。",
      ],
    },
    {
      heading: "拓扑量子计算 · 交换、编织与噪声条件",
      body: [
        "二维任意子的统计由编织群描述。阿贝尔情形一次选定方向交换可带来exp(iθ)，同方向交换两次为exp(2iθ)；非阿贝尔情形则作用于融合简并空间，编织次序一般不可交换。Kitaev工作的预印本出于1997年、期刊版于2003年，它提出利用这种结构存储与操控量子信息。",
        "拓扑保护依赖能隙、空间分离、低温与操作条件，不能说局域噪声永远碰不到信息。Majorana零模是候选实现；固定总奇偶性的一个零模对不提供任意两态逻辑编码，常见编码需要更多零模。中毒、有限重叠和读出误差仍要控制，Majorana编织本身也不是任意通用门集。",
        "2025年的InAs–Al奇偶读出原论文讨论拓扑平凡与非平凡两种解释。单次费米子奇偶测量是器件进展，仍须与已证明的非阿贝尔融合/编织、完整受保护逻辑比特分别叙述；未来测试架构不等于这些目标已经完成。",
      ],
    },
    {
      heading: "桌面引力 · 纠缠见证的条件",
      body: [
        "2017年Bose等与Marletto、Vedral分别提出利用两块质量物体间的引力诱导纠缠，探测引力中介的非经典性质。Bose方案讨论过约10⁻¹⁴kg、百微米量级距离和秒量级相互作用的示例；这些是方案参数，不是已经实现的实验纪录。",
        "论证依赖两体系通过局域中介相互作用等假设：只有经典可通信自由度的中介，不能从最初可分的两体系制造纠缠。实验因而要验证叠加与纠缠，并排除电磁耦合和环境造成的替代解释。它不要求直接探测一个实引力子，也不是一次普通Bell检验。",
        "大质量的空间相干、真空、热辐射、杂散力与读出共同构成困难。单个量子物体在经典引力势中出现相位，早已有干涉实验研究；不能把新的纠缠见证说成历史上第一次研究引力与量子。完成时间取决于实验进展，不能给“2030年代必有决定性结果”作保证。",
      ],
    },
  ],
  sources: [
    {
      label: "Planck2018 VI · 表2，平直ΛCDM参数",
      url: "https://arxiv.org/abs/1807.06209",
      kind: "paper",
    },
    {
      label: "Riess等2022 · SH0ES距离阶梯与H₀",
      url: "https://arxiv.org/abs/2112.04510",
      kind: "paper",
    },
    {
      label: "Euclid Consortium · 广域与深场调查",
      url: "https://www.euclid-ec.org/public/data/surveys/",
      kind: "agency",
    },
    {
      label: "LSST:UK · 十年巡天与数据处理",
      url: "https://www.lsst.ac.uk/technology/processing-lsst-data",
      kind: "agency",
    },
    {
      label: "NASA · Roman发射（2026年8月）",
      url: "https://science.nasa.gov/mission/roman-space-telescope/roman-launch/",
      kind: "agency",
    },
    {
      label: "CMB-S4 · 原项目停资与有序关闭公告",
      url: "https://cmb-s4.org/",
      kind: "agency",
    },
    {
      label: "Muon g−2 Theory Initiative2025 v3 · 标准模型更新",
      url: "https://arxiv.org/abs/2505.21476",
      kind: "paper",
    },
    {
      label: "Muon g−2 Collaboration2025 · Fermilab127ppb结果",
      url: "https://arxiv.org/abs/2506.03069",
      kind: "paper",
    },
    {
      label: "Maldacena · AdS/CFT原提案（1997/1998）",
      url: "https://arxiv.org/abs/hep-th/9711200",
      kind: "paper",
    },
    {
      label: "Almheiri等2021 · Hawking辐射熵与岛公式综述",
      url: "https://doi.org/10.1103/RevModPhys.93.035002",
      kind: "paper",
    },
    {
      label: "Bekenstein1981 · 有界系统熵能比界",
      url: "https://doi.org/10.1103/PhysRevD.23.287",
      kind: "paper",
    },
    {
      label: "Google Quantum AI2023 · 增加码距的逻辑错误比较",
      url: "https://doi.org/10.1038/s41586-022-05434-1",
      kind: "paper",
    },
    {
      label: "Google Quantum AI2024在线/2025刊印 · 低于阈值的纠错",
      url: "https://doi.org/10.1038/s41586-024-08449-y",
      kind: "paper",
    },
    {
      label: "CHIME/FRB2021 · 首份536爆发目录",
      url: "https://arxiv.org/abs/2106.04352",
      kind: "paper",
    },
    {
      label: "Nature2023 · MoTe₂分数量子化反常Hall",
      url: "https://doi.org/10.1038/s41586-023-06536-0",
      kind: "paper",
    },
    {
      label: "2016诺贝尔物理学奖 · 拓扑相变与物态",
      url: "https://www.nobelprize.org/prizes/physics/2016/ceremony-speech/",
      kind: "agency",
    },
    {
      label: "Li等2019 · 无限层镍氧化物超导",
      url: "https://doi.org/10.1038/s41586-019-1496-5",
      kind: "paper",
    },
    {
      label: "Zhu等2023 · LK-99中Cu₂S的一阶转变",
      url: "https://arxiv.org/abs/2308.04353",
      kind: "paper",
    },
    {
      label: "Pfau等2020 · FermiNet变分电子结构",
      url: "https://doi.org/10.1103/PhysRevResearch.2.033429",
      kind: "paper",
    },
    {
      label: "Hermann等2020 · PauliNet波函数",
      url: "https://arxiv.org/abs/1909.08423",
      kind: "paper",
    },
    {
      label: "Merchant等2023 · GNoME材料候选与DFT",
      url: "https://doi.org/10.1038/s41586-023-06735-9",
      kind: "paper",
    },
    {
      label: "Kitaev1997预印本/2003刊印 · 任意子容错计算",
      url: "https://arxiv.org/abs/quant-ph/9707021",
      kind: "paper",
    },
    {
      label: "Karzig等2017 · Majorana编码与测量架构",
      url: "https://arxiv.org/abs/1610.05289",
      kind: "paper",
    },
    {
      label: "Microsoft Quantum2025 · InAs–Al单次奇偶测量",
      url: "https://doi.org/10.1038/s41586-024-08445-2",
      kind: "paper",
    },
    {
      label: "Bose等2017 · 引力纠缠自旋见证方案",
      url: "https://doi.org/10.1103/PhysRevLett.119.240401",
      kind: "paper",
    },
    {
      label: "Marletto与Vedral2017 · 引力诱导纠缠与中介非经典性",
      url: "https://arxiv.org/abs/1707.06036",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "dark-sector",
      name: {
        primary: "暗物质 + 暗能量",
        latin: "Dark Sector",
      },
      position: [0, 0, -0.6],
      description:
        "以Planck2018平直ΛCDM为示例，今日能量密度约68.5%为暗能量、26.5%为冷暗物质，重子约4.9%。这些是模型下的推断；重子不等于可见光物质，中微子与辐射等小分量另计。暗物质粒子本性与暗能量机制仍待检验。",
      data: [
        {
          label: "Ω_c",
          value: "≈0.265",
        },
        {
          label: "Ω_Λ",
          value: "≈0.685",
        },
        {
          label: "模型示例",
          value: "Planck2018平直ΛCDM",
        },
      ],
      color: "var(--hw-red)",
      size: 0.045,
    },
    {
      id: "ads-cft",
      name: {
        primary: "AdS/CFT · 全息对偶",
        latin: "Holography",
      },
      position: [-0.5, 0, -0.3],
      description:
        "特定反德西特背景中的引力/弦理论与边界共形场论的对偶，为量子引力和黑洞熵提供受控研究工具；不能把它当成任意真实宇宙时空都已获得的实验证明。岛公式的熵结果也不等于已交出完整辐射量子态。",
      data: [
        {
          label: "Maldacena",
          value: "1997",
        },
        {
          label: "互文",
          value: "P3 GR / 黑洞",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "fault-tolerant-qc",
      name: {
        primary: "容错量子计算",
        latin: "Fault-Tolerant QC",
      },
      position: [0.5, 0, -0.3],
      description:
        "编码、噪声模型与解码器共同决定阈值。2023年已有距3/距5逻辑错误比较；Willow2024进一步展示低于阈值的缩放。105物理比特芯片与距7码101个物理比特，均不等于同数目逻辑比特。",
      data: [
        {
          label: "阈值",
          value: "需指定模型与解码器",
        },
        {
          label: "距7实验",
          value: "0.143±0.003% /周期",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.04,
    },
    {
      id: "hubble-tension",
      name: {
        primary: "Hubble 张力",
        latin: "Hubble Tension",
      },
      position: [-0.4, 0, 0.5],
      description:
        "SH0ES2022距离阶梯给H₀=73.04±1.04，Planck2018平直ΛCDM推断67.36±0.54km/s/Mpc；该比较约5σ。显著性依数据、误差处理与模型，不能对所有局部测量一概套用。",
      data: [
        {
          label: "对比数据",
          value: "SH0ES2022 / Planck2018",
        },
        {
          label: "性质",
          value: "直接距离阶梯 / 模型推断",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "topological-matter",
      name: {
        primary: "拓扑物质",
        latin: "Topological Matter",
      },
      position: [0.5, 0, 0.4],
      description:
        "拓扑相变、量子Hall与拓扑物态给物质分类增加新的结构。2016奖项表彰特定理论发现；MoTe₂的分数反常Hall输运证据不自动等于非阿贝尔编织或可用拓扑量子计算已完成。",
      data: [
        {
          label: "Nobel",
          value: "2016",
        },
        {
          label: "互文",
          value: "P5 / P7 对称性破缺",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.035,
    },
    {
      id: "ai-for-science",
      name: {
        primary: "AI for Science",
        latin: "AI for Science",
      },
      position: [-0.6, 0, 0.2],
      description:
        "FermiNet与PauliNet构造变分电子波函数，GNoME结合图网络与DFT筛选晶体候选。计算精度、热力学稳定、实际合成和器件功能是不同证据层次；AlphaFold的主要对象是蛋白质结构。",
      data: [
        {
          label: "电子结构",
          value: "FermiNet / PauliNet",
        },
        {
          label: "材料筛选",
          value: "GNoME + DFT",
        },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
  ],
};

export default content;

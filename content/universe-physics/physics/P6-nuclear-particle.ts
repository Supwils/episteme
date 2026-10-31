import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P6",
  name: {
    primary: "原子核与粒子",
    latin: "Nuclear & Particle Physics",
  },
  tagline: "把物质再砸碎一点",
  whisper: "核子的绝大部分质量来自强相互作用的量子动力学；只把三个轻夸克的质量相加，远远不够。",
  dataCards: [
    {
      label: "质子质量",
      latinLabel: "m_p",
      value: "938.272",
      hint: "MeV / c²",
    },
    {
      label: "中子质量",
      latinLabel: "m_n",
      value: "939.565",
      hint: "MeV / c²",
    },
    {
      label: "强耦合常数",
      latinLabel: "αₛ(MZ)",
      value: "0.1180 ± 0.0009",
      hint: "PDG 2026 收录的2025平均 · 修正最小减除方案 · Z质量能标",
    },
    {
      label: "费米单位",
      value: "1 fm",
      hint: "= 10⁻¹⁵ m",
    },
    {
      label: "氘结合能",
      value: "≈ 2.22457",
      hint: "MeV · 质子与中子束缚为氘的总结合能",
    },
    {
      label: "²³⁵U 裂变",
      value: "~ 200",
      hint: "MeV / 反应",
    },
    {
      label: "DD 聚变 Q",
      value: "3.27 / 4.03",
      hint: "MeV · ³He+n / ³H+p 两个主要分支",
    },
    {
      label: "LHC 能量",
      value: "13.6",
      hint: "TeV · Run 3 质子–质子碰撞质心能量",
    },
    {
      label: "核壳魔数",
      value: "2 / 8 / 20 / 28 / 50 / 82 / 126",
      hint: "传统球形闭壳序列 · 不等于每种组合都稳定",
    },
    {
      label: "PMNS θ₁₃",
      value: "≈ 8.5°–8.6°",
      hint: "三味拟合量级 · 2012 Daya Bay关键测量",
    },
    {
      label: "GZK 衰减能标",
      value: "≈ 5 × 10¹⁹",
      hint: "eV · 超高能质子与CMB相互作用；不是硬能量上限",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 核稳定与衰变",
      body: [
        "质子与中子由低能强相互作用束缚成核。AME2020 表中的每核子结合能峰在铁、镍附近，⁶²Ni 约8.7946 MeV，略高于⁵⁶Fe的8.7904 MeV。轻核的一些聚变反应与重核的一些裂变反应能释放能量，因为产物总质量更低；是否放能仍要对指定反应计算Q值，曲线不能替代电荷、核子数守恒和反应势垒。",
        "衰变可改变核素或激发态：α 带走两个质子与两个中子，β 改变质子/中子比例，γ 通常只降低核的激发能。并非每次衰变都一步到稳定核。NUBASE2020 给出²¹²Po基态半衰期294.4(8) ns；¹²⁸Te的双β衰变半衰期则是10²⁴年量级。把单位统一后，这两个半衰期相隔约38个数量级。",
      ],
    },
    {
      heading: "学院 · 夸克模型与 QCD",
      body: [
        "质子uud、中子udd是价夸克量子数的记账；真实强子还包含胶子和海夸克。夸克的分数电荷与色荷是不同的量子属性，色也不是可见颜色。可观测的孤立强子是色单态；至今没有把单个自由夸克作为可独立收集的粒子观察到。",
        "QCD 的重整化耦合随能标变化：高动量转移时较小，称为渐进自由；约1 GeV及以下通常需要非微扰处理。不能把低能微扰公式的发散当成禁闭的完整证明，也不能说夸克在所有温度下都永远关在三个小球组成的核子里。",
        "Yukawa 1935 年提出用一种尚未发现的有质量介子传递核力；π介子到1947年才被识别。现代低能理论中，长程核力可用π交换描述，更短程相互作用和多核子项也重要。核子之间的力是QCD在复合强子层次上的表现，并非把夸克间的胶子交换照搬一遍。",
      ],
    },
    {
      heading: "前沿 · QGP / 中微子 / 暗物质实验",
      body: [
        "RHIC 与 LHC 的重离子碰撞研究夸克–胶子等离子体。实验通过流动、喷注能损等信号重建短寿命火球的性质，发现它具有很小的黏滞性；“近乎完美流体”不表示黏滞严格为零，也不表示无相互作用的自由气体。它联系早期宇宙最初数微秒的高温物质研究，不能把碰撞火球当成整个早期宇宙的完整复刻。",
        "大气与太阳中微子的味变换证据，包括Super-Kamiokande1998和SNO2001–2002结果，在三味混合框架中要求非零质量平方差。振荡并不直接给出每个质量；see-saw只是可能的质量机制之一，若进一步联系轻子产生或重子非对称，还需要额外模型与实验检验。",
        "暗物质直接探测必须区分候选事件、统计迹象和发现。LZ在2026年9月的预印本中报告扩展反冲能窗内一个高能事件，对所检模型与仅背景假设的张力为全局2.6σ；作者同时讨论稀有背景。这不构成暗物质的确认发现，也不能继续笼统写成“没有任何候选信号”。限制或迹象都依赖相互作用模型、质量范围和背景处理。",
      ],
    },
    {
      heading: "核素图与「稳定岛」",
      body: [
        "把核素按中子数N和质子数Z排列，便得到核素图。稳定及较长寿命的核素沿一条带状区域分布：轻稳定核常接近N=Z，较重稳定核需要相对更多中子。偏离这一区域时，可能发生β衰变、核子发射、α衰变或裂变；寿命跨度极大，不能一概说会迅速回到稳定谷。",
        "超重核的壳层效应可能提高裂变势垒并延长寿命，这就是稳定岛设想。常讨论的中子闭壳N≈184及候选质子闭壳位置具有模型依赖；“稳定”指相对寿命增强，不保证像铅那样稳定不衰变。制造这些核素还要面对极小合成截面和竞争裂变，不能从一个预言的魔数直接推出某个元素已被发现。",
      ],
    },
    {
      heading: "核壳模型 · 魔数从何而来",
      body: [
        "1949年前后，Goeppert Mayer 与 Haxel、Jensen、Suess 的工作以强自旋–轨道耦合解释传统魔数2、8、20、28、50、82、126。核子轨道的j=ℓ±1/2分支重新排序，形成闭壳间隙；分离能与激发谱等显示其特征。⁴He、¹⁶O、⁴⁰Ca、²⁰⁸Pb是常用双魔核例子，但不是所有每核子结合能的最高点，也不是所有闭壳组合都稳定。壳层结构是1963年诺贝尔物理学奖表彰的贡献之一。",
        "集体模型描述另一层结构：巨偶极共振涉及质子和中子系统的反相集体运动；径向“呼吸”对应巨单极模式，两者不能混称。形变核还可出现转动带，低激发近似为Eⱼ=ℏ²J(J+1)/(2I有效)，配对及转动惯量变化会带来偏离。这与分子转动共享角动量语言，具体能量尺度仍需按系统判断。",
      ],
    },
    {
      heading: "中微子三味 · PMNS 与质量排序",
      body: [
        "弱相互作用产生的味态νe、νμ、ντ与质量本征态ν₁、ν₂、ν₃由PMNS矩阵联系。在三种Dirac中微子框架中，矩阵含三个混合角和一个Dirac CP相位；若为Majorana粒子，还可有两个不影响通常振荡概率的额外相位。令ℏ=c=1，忽略太阳质量差与物质效应时，νμ→νe的主导项为sin²θ₂₃ sin²(2θ₁₃) sin²(Δm²₃₁L/(4E))；这不是所有基线和介质中的通式。",
        "PDG2026综述中的三味拟合给出θ₁₂约33°–34°、θ₁₃约8.5°–8.6°；θ₂₃接近45°，具体象限仍待确定。太阳与大气两组质量平方差的尺度约为7.5×10⁻⁵和2.5×10⁻³ eV²。绝对质量尺度、质量排序、CP相位与Dirac/Majorana性质仍需不同实验协同约束；某种排序的统计偏好不能直接写成已定论。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "核质量与每核子结合能见AME2020原表，半衰期和基态/同质异能态标记见NUBASE2020；壳层与集体模型可读Mayer、Jensen的1963年讲演。QCD与三味中微子采用标明版本的PDG2026综述；近期LZ结果链接到2026年9月原预印本。原论文、评价表和模型各回答不同的问题，引用时应保留其适用范围。",
      ],
    },
  ],
  sources: [
    {
      label: "PDG2026 · Cosmic Rays：传播损失与GZK效应",
      url: "https://ccwww.kek.jp/pdg/2026/reviews/rpp2026-rev-cosmic-rays.pdf",
      kind: "paper",
    },
    {
      label: "Nobel 委员会 · Yukawa介子预言与1947发现",
      url: "https://www.nobelprize.org/prizes/themes/the-nobel-prize-in-physics-1901-2000/",
      kind: "agency",
    },
    {
      label: "AME2020 · 原始质量与每核子结合能表",
      url: "https://amdc.impcas.ac.cn/web/masseval.html",
      kind: "agency",
    },
    {
      label: "Kondev 等 · NUBASE2020核数据评价",
      url: "https://hepnp.ihep.ac.cn/article/doi/10.1088/1674-1137/abddae",
      kind: "paper",
    },
    {
      label: "Goeppert Mayer 1963 · The Shell Model",
      url: "https://www.nobelprize.org/uploads/2018/06/mayer-lecture.pdf",
      kind: "paper",
    },
    {
      label: "Jensen 1963 · 核结构理论史",
      url: "https://www.nobelprize.org/uploads/2018/06/jensen-lecture.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · Quantum Chromodynamics",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-qcd.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · Neutrino Masses, Mixing, and Oscillations",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-neutrino-mixing.pdf",
      kind: "paper",
    },
    {
      label: "Dürr 等 · 格点QCD与轻强子质量",
      url: "https://arxiv.org/abs/0906.3599",
      kind: "paper",
    },
    {
      label: "CERN · 重离子与夸克–胶子等离子体",
      url: "https://home.cern/science/physics/heavy-ions-and-quark-gluon-plasma/",
      kind: "agency",
    },
    {
      label: "CERN 2022 · Run 3的13.6TeV质心能量",
      url: "https://home.cern/third-run-large-hadron-collider-has-successfully-started/",
      kind: "agency",
    },
    {
      label: "OpenStax · 聚变分支与太阳质子–质子链",
      url: "https://openstax.org/books/college-physics/pages/32-5-fusion",
      kind: "agency",
    },
    {
      label: "LZ 2026年9月 · 扩展核反冲能窗搜索",
      url: "https://arxiv.org/abs/2609.02823",
      kind: "paper",
    },
    {
      label: "Daya Bay 2012 · 非零θ₁₃",
      url: "https://doi.org/10.1103/PhysRevLett.108.171803",
      kind: "paper",
    },
    {
      label: "Greisen 1966 · End to the Cosmic-Ray Spectrum?",
      url: "https://doi.org/10.1103/PhysRevLett.16.748",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "binding-energy",
      name: {
        primary: "结合能曲线",
        latin: "Binding Energy Curve",
      },
      position: [-0.5, 0, -0.3],
      description:
        "每核子结合能在铁镍附近最高，⁶²Ni略高于⁵⁶Fe；反应是否放能仍需比较指定初末态质量。",
      data: [
        {
          label: "AME2020峰区",
          value: "⁶²Ni ≈8.7946 MeV/核子",
        },
        {
          label: "互文",
          value: "P3 相对论 · E = mc²",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "quark-model",
      name: {
        primary: "夸克模型",
        latin: "Quark Model",
      },
      position: [0.3, 0, -0.5],
      description:
        "uud/udd表示核子的价夸克量子数；真实强子含胶子与海夸克。孤立强子为色单态，色不是可见颜色。",
      data: [
        {
          label: "Gell-Mann",
          value: "1964",
        },
        {
          label: "color",
          value: "SU(3)",
        },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
    {
      id: "qcd-confinement",
      name: {
        primary: "色禁闭 · 渐进自由",
        latin: "Color Confinement",
      },
      position: [0.6, 0, 0.1],
      description:
        "高动量转移的渐进自由与低能禁闭是不同层次的问题。2004年诺贝尔奖表彰渐进自由，低能区不能直接套用微扰公式。",
      data: [
        {
          label: "αₛ(MZ)",
          value: "0.1180 ±0.0009",
        },
        {
          label: "互文",
          value: "P7 标准模型 · SU(3)",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.04,
    },
    {
      id: "neutrino-oscillation",
      name: {
        primary: "中微子振荡",
        latin: "Neutrino Oscillation",
      },
      position: [-0.4, 0, 0.5],
      description:
        "味变换在三味框架中要求非零质量平方差；绝对质量不能只靠振荡得到。SK1998与SNO2001–2002是关键证据。",
      data: [
        {
          label: "Δm²",
          value: "~ 10⁻³ eV²",
        },
        {
          label: "互文",
          value: "P7 标准模型 · 质量起源",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "fusion-fission",
      name: {
        primary: "聚变 / 裂变",
        latin: "Fusion / Fission",
      },
      position: [0.5, 0, 0.4],
      description:
        "太阳主要靠质子–质子链把氢转成氦；地面聚变常研究D–T等反应。核裂变与聚变是否放能，都须比较初末态质量。",
      data: [
        {
          label: "DT 聚变 Q",
          value: "17.6 MeV",
        },
        {
          label: "²³⁵U Q",
          value: "~ 200 MeV",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.035,
    },
    {
      id: "qgp",
      name: {
        primary: "夸克-胶子等离子体",
        latin: "Quark-Gluon Plasma",
      },
      position: [-0.6, 0, 0.2],
      description:
        "高温高密度下可形成退禁闭的夸克–胶子物质。流动与喷注等实验信号约束其性质，低黏滞不等于无相互作用。",
      data: [
        {
          label: "温度量级",
          value: "10¹² K及以上，随条件而变",
        },
        {
          label: "互文",
          value: "T0 大爆炸 · 1 μs",
        },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
  ],
};

export default content;

import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P7",
  name: {
    primary: "标准模型与量子场论",
    latin: "Standard Model & QFT",
  },
  tagline: "把粒子与三种相互作用写进同一套场论",
  whisper: "三代费米子、规范场与Higgs场：精密有效，也仍有缺口。",
  dataCards: [
    {
      label: "Higgs质量",
      latinLabel: "m_H",
      value: "≈125",
      hint: "GeV/c² · 已发现的标量玻色子",
    },
    {
      label: "W玻色子",
      latinLabel: "m_W",
      value: "≈80.4",
      hint: "GeV/c² · 带电弱作用载体",
    },
    {
      label: "Z玻色子",
      latinLabel: "m_Z",
      value: "≈91.2",
      hint: "GeV/c² · 中性弱作用载体",
    },
    {
      label: "规范群",
      value: "SU(3) × SU(2) × U(1)",
      hint: "含色、弱同位旋和弱超荷；不含引力",
    },
    {
      label: "顶夸克质量",
      latinLabel: "m_t",
      value: "≈173",
      hint: "GeV/c² · 质量精值依提取方案",
    },
    {
      label: "粒子表常用分类",
      value: "17类",
      hint: "12费米子 + g、γ、W、Z、H；未逐计色与反粒子",
    },
    {
      label: "Higgs发现",
      value: "2012",
      hint: "ATLAS与CMS · LHC",
    },
    {
      label: "Cabibbo角",
      latinLabel: "θ_C",
      value: "≈13.0°",
      hint: "夸克带电弱流混合",
    },
    {
      label: "QCD一圈系数",
      value: "β₀=(33−2n_f)/3",
      hint: "β(g_s)=−β₀g_s³/(16π²)+…；六味时为7",
    },
    {
      label: "Higgs真空期望值",
      latinLabel: "v",
      value: "≈246",
      hint: "GeV · 零温电弱标度",
    },
    {
      label: "Higgs势参数",
      latinLabel: "λ",
      value: "≈0.13",
      hint: "树级λ=m_H²/(2v²)推得；自耦合仍待精测",
    },
    {
      label: "I型seesaw示例",
      value: "m_ν≈m_D²/M_R",
      hint: "单代、M_R≫m_D的近似；未确认的质量机制",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 粒子表列的是场的类别",
      body: [
        "标准模型描述六味夸克、六种轻子，以及强、弱、电磁三种规范相互作用。夸克按u/d、c/s、t/b分为三代；轻子有e、μ、τ及对应的中微子味。γ、W±、Z和八种胶子承担规范相互作用，Higgs场则参与电弱质量项的形成。引力尚未包含在这套模型里。",
        "常见的“17种粒子”是一种表格分类：六夸克、六轻子，加g、γ、W、Z、H五栏。它把八种胶子归为g、W的正负两种归为一栏，也没有把夸克色自由度和所有反粒子逐项展开。光子、Z与H等是自身的反粒子；中微子究竟是否为Majorana粒子仍待检验。",
        "三代中对应场的规范量子数相同，质量、Yukawa耦合和味混合结构却不相同。标准模型把这些参数与实验联系起来，没有从第一性原理算出为什么恰好三代、为什么电子与顶夸克质量差如此悬殊。",
      ],
    },
    {
      heading: "学院 · 规范结构怎样连接质量与相互作用",
      body: [
        "完整规范群写作SU(3)c × SU(2)L × U(1)Y。Higgs双重态在零温真空中取非零期望值后，电弱部分留下U(1)em；W¹、W²组合成W±，W³和B混合成Z与光子。三个原本的Goldstone自由度对应有质量W/Z的纵向极化，物理谱里还留下一种中性标量H。",
        "采用V(Φ)=−μ²Φ†Φ+λ(Φ†Φ)²且μ²、λ>0的记号，最低点满足Φ†Φ=v²/2；在选定规范下可把中性分量写成(v+H)/√2。图中的双阱只是这个实方向的截面，±v不是两个可直接区分的物理真空。树级有m_H²=2λv²，v约246GeV；这些关系的高精度使用还需圈修正与参数方案。",
        "带电轻子与夸克的质量来自Higgs场与左右手费米子场的Yukawa耦合。最小可重整化标准模型没有右手中微子，也不给中微子质量；振荡事实要求扩展。质子、中子的质量主要反映QCD动力学，不能说Higgs玻色子给了宇宙中一切质量。",
      ],
    },
    {
      heading: "计算 · Feynman图与重整化",
      body: [
        "Feynman图给微扰展开中的积分记账：顶点对应拉格朗日量的相互作用项，内线对应传播子，闭合圈带来动量积分。一个顶点图不是一次可单独发生的完整反应，也不是虚粒子沿一条可拍摄轨迹飞行。电荷、能量动量等约束仍要在完整振幅与过程上满足。",
        "正则化先让发散表达式得到一致定义；重整化再用规定条件定义质量、耦合和场归一化，并加入对应反项。它不等于随意截掉大数。红外发散还要对足够包容的可观测量处理实辐射与虚修正。电子磁矩是精密检验实例，但实验精度、理论截断与外部精细结构常数的不确定度必须分别报告，不能用一句“QED吻合12位”代替比较。",
      ],
    },
    {
      heading: "发现史 · 模型提出与探测证据各有日期",
      body: [
        "1897年的阴极射线实验是电子史的重要起点。1956年Cowan、Reines等用反应堆探测电子反中微子；1964年Gell-Mann与Zweig独立提出夸克模型，这个年份指理论分类，不能当成自由夸克已被收集。中子和介子是复合粒子，它们的发现史也不等同于基本粒子表逐格填满。",
        "1983年UA1与UA2发现W/Z；1995年CDF与DZero发现顶夸克；2012年ATLAS与CMS报告Higgs质量区间的新玻色子，后续测量检验其性质。每项发现依赖不同信号、背景与统计判断；提高碰撞能量很重要，精度、亮度、宇宙线和反应堆探测也各有作用。",
      ],
    },
    {
      heading: "尺度 · 渐近自由与统一的条件",
      body: [
        "在微扰适用的高能区，QCD满足β(g_s)=−β₀g_s³/(16π²)+…，SU(3)中β₀=(33−2n_f)/3。六味时β₀=7，能标升高使耦合减弱，这就是Gross、Politzer、Wilczek于1973年揭示的渐近自由。低能禁闭需要非微扰物理；把一圈公式外推到发散处，不能算完成禁闭证明。",
        "QED在相应微扰范围的耦合随能标增大；把近似β函数外推会遇到Landau极，但其形式位置依赖粒子阈值与外推假设，不能当作已知宇宙中的一个精确能量。标准模型三种规范耦合也没有自行精确汇聚；在特定MSSM粒子谱及阈值修正下可以改善统一，这为建模提供线索，还不是超对称或大统一已被观测的证据。",
      ],
    },
    {
      heading: "早期宇宙 · 平滑交叉过渡与重子数",
      body: [
        "物理Higgs质量下，标准模型的电弱热演化是平滑交叉过渡。格点研究按Higgs凝聚量易感率峰定义的温度约159.5±1.5GeV；246GeV则是零温的v，两者不是同一个量，也不是在某个温度从0瞬间跳到246。通常的电弱重子起源需要强一阶过渡的非平衡动力学，因此要考虑标准模型之外的场或机制。",
        "电弱手征反常把重子数B、轻子数L的变化联系到规范场的拓扑变化。三代模型中，单位拓扑跃迁给ΔB=ΔL=±3，所以Δ(B+L)=±6，而B−L保持。高温下sphaleron过程若处于热平衡，会重新分配或洗掉某些不对称；具体保留下什么取决于初始B−L、同时有效的反应和宇宙演化，不能对任何模型一概断言全部消失。",
        "CKM相位解释标准模型味改变过程中的CP破缺；QCD还允许受电偶极矩强烈约束的θ项。通常的标准模型电弱重子起源不足以产生观测的不对称，不是某一次W质量或Higgs截面测量单独推出的结论。轻子起源、额外标量等仍是待检验方案。",
      ],
    },
    {
      heading: "前沿 · 已检验的理论怎样留下问题",
      body: [
        "中微子质量机制、暗物质本性、宇宙物质过剩和量子引力仍未解决。I型seesaw加入重的规范单态中微子；在重质量远大于Dirac质量的单代近似中，轻质量约m_D²/M_R。选不同输入会得到不同尺度，10¹⁴GeV不是实验已经测得的重中微子质量。",
        "Higgs自耦合是检验势形状的重要目标。PDG2026综述区分由m_H和v推得的树级λ，与通过双Higgs等过程直接施加的实验约束；后者还没有达到精密测量。HL-LHC继续提高灵敏度。CERN2026年5月把FCC-ee列为下一旗舰首选方向，建设决定预期在2028年前后作出；规划和可行性研究不等于项目已经获批。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "粒子与参数采用标明年份的PDG综述；Higgs势、CKM、seesaw与QCD分别看相应章节。电弱热过渡与sphaleron数值链接到格点原论文，未来设施状态读CERN当前公告。研究结论、模型条件和历史发现应分别对应具体来源。",
      ],
    },
  ],
  sources: [
    {
      label: "PDG2026 · 电弱模型与正则化/重整化（§10.1–10.2）",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-standard-model.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · Higgs势、Yukawa与自耦合（§11.2、11.3.6）",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-higgs-boson.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · CKM矩阵（§12.1）",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-ckm-matrix.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · 中微子与seesaw（§14.2.2）",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-neutrino-mixing.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · QCD与耦合跑动",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-qcd.pdf",
      kind: "paper",
    },
    {
      label: "PDG2026 · 大统一与阈值条件（§92.5）",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-guts.pdf",
      kind: "paper",
    },
    {
      label: "D’Onofrio与Rummukainen · 标准模型交叉过渡（2016）",
      url: "https://doi.org/10.1103/PhysRevD.93.025003",
      kind: "paper",
    },
    {
      label: "D’Onofrio等 · sphaleron率与B/L关系（2014）",
      url: "https://arxiv.org/abs/1404.3565",
      kind: "paper",
    },
    {
      label: "Fan等2023 · 电子磁矩测量与精细结构常数比较",
      url: "https://doi.org/10.1103/PhysRevLett.130.071801",
      kind: "paper",
    },
    {
      label: "Fermilab · 标准模型发现史（按具体条目查读）",
      url: "https://www.fnal.gov/pub/science/inquiring/matter/ww_discoveries/index.html",
      kind: "agency",
    },
    {
      label: "Cowan等1956 · 自由中微子探测确认",
      url: "https://doi.org/10.1126/science.124.3212.103",
      kind: "paper",
    },
    {
      label: "CERN · UA1/UA2与1983年的W发现",
      url: "https://home.cern/carrying-weak-force-thirty-years-w-boson/",
      kind: "agency",
    },
    {
      label: "CERN · 标准模型与2012年Higgs发现",
      url: "https://home.cern/science/physics/standard-model",
      kind: "agency",
    },
    {
      label: "CERN2026年5月22日 · 欧洲粒子物理战略与FCC-ee决策条件",
      url: "https://home.cern/the-cern-council-decided-to-update-the-european-strategy-for-particle-physics/",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "higgs-boson",
      name: {
        primary: "Higgs 玻色子",
        latin: "Higgs Boson",
      },
      position: [0, 0, -0.6],
      description:
        "2012年ATLAS与CMS发现约125GeV的标量玻色子。Higgs场的零温真空期望值约246GeV，参与W/Z及带电费米子质量项；复合核子质量主要来自QCD动力学。最小标准模型不产生中微子质量。",
      data: [
        {
          label: "m_H",
          value: "≈125 GeV/c²",
        },
        {
          label: "Nobel",
          value: "2013",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.045,
    },
    {
      id: "gauge-symmetry",
      name: {
        primary: "规范对称",
        latin: "Gauge Symmetry",
      },
      position: [-0.5, 0, -0.3],
      description:
        "SU(3)c × SU(2)L × U(1)Y约束强与电弱相互作用。电弱破缺后W³与B混合成Z和光子，留下U(1)em；这套规范群没有包含引力。",
      data: [
        {
          label: "SU(3)",
          value: "8 胶子",
        },
        {
          label: "SU(2) × U(1)",
          value: "W±, Z, γ",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.04,
    },
    {
      id: "three-generations",
      name: {
        primary: "三代物质",
        latin: "Three Generations",
      },
      position: [0.5, 0, -0.4],
      description:
        "三代对应场有相同的规范表示，Yukawa耦合、质量与味混合却不同。为什么有三代、参数为何如此，仍是标准模型未从第一原理解释的问题。",
      data: [
        {
          label: "费米子类别",
          value: "6夸克 + 6轻子",
        },
        {
          label: "互文",
          value: "P5 原子 · 周期表",
        },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
    {
      id: "feynman-diagrams",
      name: {
        primary: "Feynman 图",
        latin: "Feynman Diagrams",
      },
      position: [-0.4, 0, 0.5],
      description:
        "微扰展开的图形记账：顶点对应相互作用项，内线对应传播子。单个顶点不是一次完整可发生的反应，内部线也不是被探测到的粒子轨迹。",
      data: [
        {
          label: "提出",
          value: "Feynman 1948",
        },
        {
          label: "互文",
          value: "P2 QED",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "ckm-matrix",
      name: {
        primary: "CKM 矩阵 · CP 破缺",
        latin: "CKM / CP Violation",
      },
      position: [0.5, 0, 0.4],
      description:
        "三代夸克带电弱流中的3×3幺正混合矩阵，含三个角和一个物理CP相位，支配标准模型味改变CP效应。QCD还允许受EDM约束的强CP项；通常的标准模型电弱重子起源仍不足。",
      data: [
        {
          label: "Nobel",
          value: "Kobayashi-Maskawa 2008",
        },
        {
          label: "θ_C",
          value: "13.0°",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.035,
    },
    {
      id: "beyond-sm",
      name: {
        primary: "超出 SM",
        latin: "Beyond Standard Model",
      },
      position: [-0.6, 0, 0.2],
      description:
        "中微子质量、暗物质本性、重子不对称和量子引力仍是缺口。超对称、大统一、轴子等是待检验模型；尚无公认的超对称伴粒子或暗物质粒子发现，不能把候选方案画成已证实答案。",
      data: [
        {
          label: "已知缺口",
          value: "中微子质量机制等",
        },
        {
          label: "互文",
          value: "P8 前沿",
        },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
    {
      id: "sphaleron",
      name: {
        primary: "电弱 Sphaleron",
        latin: "Electroweak Sphaleron",
      },
      position: [-0.2, 0, -0.6],
      description:
        "电弱规范场拓扑跃迁关联重子数与轻子数。三代模型单位跃迁给ΔB=ΔL=±3，即Δ(B+L)=±6，保持B−L。高温平衡中的洗出、冻结和不对称转化依赖反应与宇宙学条件；物理Higgs质量下的SM热演化为交叉过渡。",
      data: [
        {
          label: "单位跃迁",
          value: "ΔB=ΔL=±3",
        },
        {
          label: "B+L变化",
          value: "±6；B−L保持",
        },
        {
          label: "SM交叉温度",
          value: "约160GeV",
        },
      ],
      color: "var(--hw-blue)",
      size: 0.038,
    },
    {
      id: "asymptotic-freedom",
      name: {
        primary: "渐近自由",
        latin: "Asymptotic Freedom",
      },
      position: [0.6, 0, -0.05],
      description:
        "QCD在微扰高能区β(g_s)<0，能标升高时耦合减弱。低能禁闭是非微扰问题，不能把一圈公式的形式发散当作完整证明。PDG2026所列2025世界平均α_s(mZ)=0.1180±0.0009，采用规定的修正最小减除方案。",
      data: [
        {
          label: "α_s(m_Z)",
          value: "0.1180±0.0009",
        },
        {
          label: "β₀（六味）",
          value: "7；对应β(g_s)",
        },
        {
          label: "Nobel",
          value: "2004",
        },
      ],
      color: "var(--hw-gold)",
      size: 0.036,
    },
  ],
};

export default content;

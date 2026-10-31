import type { TierContent } from "@/subjects/physics/lib/content";
import { frontierComposition } from "../physics/frontier-data";

const content: TierContent = {
  tier: "T0",
  name: {
    primary: "可见宇宙",
    latin: "Observable Universe",
  },
  tagline: "我们所能看到的全部",
  whisper: "光从最远处走来，用去了几乎宇宙年龄那么久。",
  dataCards: [
    {
      label: "共动直径",
      latinLabel: "Comoving diameter",
      value: "8.8 × 10²⁶ m",
      hint: "≈ 93 Gly · 28.5 Gpc",
    },
    {
      label: "宇宙年龄",
      latinLabel: "Age",
      value: "13.797 Gyr",
      hint: "±0.023 · Planck2018 TT,TE,EE+lowE+lensing，平直ΛCDM",
    },
    {
      label: "z≤8星系数估算",
      latinLabel: "Galaxies",
      value: "≈2.0 × 10¹²",
      hint: "Conselice2016 · 恒星质量下限10⁶M☉的外推",
    },
    {
      label: "临界密度",
      latinLabel: "Critical density",
      value: "≈8.52 × 10⁻²⁷ kg/m³",
      hint: "由H₀=67.36 km/s/Mpc与ρc=3H₀²/(8πG)计算",
    },
    {
      label: "CMB 温度",
      latinLabel: "CMB temperature",
      value: "2.7255 K",
      hint: "±0.0006 · Fixsen2009文献合并值，非单次FIRAS读数",
    },
    {
      label: "哈勃常数",
      latinLabel: "Hubble constant",
      value: "67.36 km/s/Mpc",
      hint: "±0.54 · 同一Planck2018基线模型",
    },
    {
      label: "暗能量占比",
      latinLabel: "Dark energy",
      value: frontierComposition[0].value,
      hint: "今日能量密度 · 同一平直ΛCDM示例",
    },
    {
      label: "冷暗物质占比",
      latinLabel: "Dark matter",
      value: frontierComposition[1].value,
      hint: "同一中心值近似；中微子等小分量另计",
    },
    {
      label: "再电离尾声证据",
      latinLabel: "End of reionization",
      value: "z≈5.3",
      hint: "Bosman2022 · Lyα透射波动的模型比较",
    },
    {
      label: "暴胀 e-folds",
      latinLabel: "Inflation e-folds",
      value: "依能标与再加热史",
      hint: "所需膨胀量不是普遍固定的60",
    },
    {
      label: "暗能量状态方程",
      latinLabel: "Dark energy w",
      value: "w=−1",
      hint: "宇宙学常数的模型性质；不是DESI2024的普遍测量结果",
    },
    {
      label: "H₀ 张力",
      latinLabel: "Hubble tension",
      value: "约5σ（指定比较）",
      hint: "SH0ES2022距离阶梯与Planck2018平直ΛCDM",
    },
  ],
  narrative: [
    {
      heading: "每位观察者都有自己的可观测范围",
      body: [
        "可观测宇宙是以观察者为中心、原则上有信号来得及到达的区域，不是全宇宙的物质边缘，也不意味着地球位于宇宙中心。它涉及过去光锥与粒子视界；今天能接收到过去发出的光，也不保证那里今天新发出的信号将来都能到达。",
        "在接近标准ΛCDM的模型中，今日可观测范围的共动半径约460亿光年、直径约930亿光年，即约8.8×10²⁶m。宇宙年龄约138亿年，与这个距离并不矛盾：光传播期间空间尺度在变化，今日共动距离不能直接用光行时间乘c代替。CMB来自一个最后散射面，整个可观测范围却不是只有一层球壳。",
      ],
    },
    {
      heading: "微波背景：最后散射面的光",
      body: [
        "大爆炸后约38万年，温度降到约3000K时，原初等离子体逐渐复合，光子的散射率随自由电子密度下降而降低。复合与光子退耦有时间宽度，不能读成所有氢原子在同一瞬间首次形成。那一时期的最后散射光，因宇宙膨胀红移成今天的微波背景。",
        "Fixsen2009综合文献的CMB温度为2.72548±0.00057K；这是合并估计，不能全部归为单次COBE/FIRAS测量。COBE于1992年报告原初大角尺度温度各向异性，WMAP与Planck后续改进全天多频图。约10⁻⁵的温度涨落与初始扰动有关，但天区温度高低和局部物质密度并非简单一一同号。",
      ],
    },
    {
      heading: "宇宙成分：先说明模型与数据组合",
      body: [
        "这里以Planck2018的TT,TE,EE+lowE+lensing、平直六参数ΛCDM为基线。它给出年龄13.797±0.023Gyr、H₀=67.36±0.54km/s/Mpc；加上BAO的另一列给13.787±0.020Gyr，不能把两列数字混作同一套参数。",
        "按同一基线中心值近似，今日暗能量约68.5%、冷暗物质约26.5%、重子约4.9%，中微子、辐射等小分量与舍入余项另计。这些是根据CMB及模型推断的能量密度分配。重子包括恒星、气体和行星，不等同于肉眼可见物质；宇宙学常数的w=−1则是Λ模型的性质。",
      ],
    },
    {
      heading: "从初始扰动到宇宙网络",
      body: [
        "今天的星系分布在局部很不均匀，纤维、片状结构、星系团与空洞构成宇宙网。暗物质引力势与气体动力学共同影响结构形成；这不妨碍在足够大尺度上用统计均匀的宇宙学模型描述总体。",
        "宇宙学巡天常使用共动距离比较不同时期的结构；太阳系、恒星邻域等局域系统则使用适当的物理距离。图中的同心圈表示回望时期与结构层次，距离、标记位置和颜色经过示意处理，不能当作统一比例的巡天坐标图。",
      ],
    },
    {
      heading: "重子声学振荡：统计相关中的标尺",
      body: [
        "早期光子与重子耦合，压力与引力共同产生声学振荡。光子最后散射与重子停止受到显著光子拖曳不是完全相同的时刻：所用Planck基线中，z*约1090、声视界约144Mpc，拖曳结束z约1060、声视界约147Mpc。通常所说约150Mpc的BAO标尺对应后一尺度。",
        "BAO表现为星系相关函数或功率谱的统计特征，不是一圈围绕地球的实体壳。2005年SDSS亮红星系相关函数与2dFGRS功率谱分别给出相关声学证据；比较角向和视线方向的尺度，可约束距离与膨胀历史。",
      ],
    },
    {
      heading: "暴胀：待检验的早期加速膨胀框架",
      body: [
        "暴胀模型通过早期加速膨胀，缓解视界、曲率和某些遗迹问题。所需e-fold数取决于能标与再加热历史，不能把10⁻³⁶到10⁻³²秒、至少60个e-folds写成一切模型共享的实测时间表。许多模型用缓滚场产生标量扰动，具体机制仍需检验。",
        "原初张量扰动可能留下CMB的B模偏振。BICEP/Keck2021采用截至2018年的观测、连同WMAP/Planck和前景模型，给r在0.05Mpc⁻¹枢轴处小于0.036的95%上限；这是明确版本的限制，不能将未检出解读为所有暴胀都已排除。CMB-S4原项目于2025年停资并有序关闭，未来灵敏度也不能沿用过时的确定时间表。",
      ],
    },
    {
      heading: "距离阶梯与哈勃常数",
      body: [
        "局部距离阶梯把几何距离、造父变星和Ia型超新星标定连接起来；CMB和BAO则在指定宇宙学模型中约束距离与膨胀。它们不是同一把仪器的重复读数，每条方法都有自己的系统误差、标定与模型条件。",
        "SH0ES2022使用HST造父变星、Gaia视差等资料，给H₀=73.04±1.04km/s/Mpc，约1.4%的总误差；不能把后来的JWST观测写进这篇论文。与Planck2018平直ΛCDM的67.36±0.54相比约5σ，差异来源仍待厘清，显著性不能对所有数据组合通用。",
      ],
    },
    {
      heading: "首批天体与再电离",
      body: [
        "复合之后、首批恒星形成之前的黑暗时代，缺少恒星光源，但并非没有背景辐射。首批天体何时形成、紫外光怎样使星系际氢逐渐重新电离，依赖结构形成与辐射传输。它是分布不均且延续一段时间的过程，不是在一个红移上把全部空间瞬间“烧穿”。",
        "Bosman等2022比较67条高信噪比类星体视线的Lyα透射分布，发现与再电离有关的波动至少延续到z≈5.3；紫外背景、残余中性氢与温度均可能贡献。这支持较晚结束的图景，不是直接拍到了所有中性岛。JWST的早期星系也不自动等于已直接确认第三星族恒星。",
      ],
    },
  ],
  sources: [
    {
      label: "Planck2018 VI · 表2，同一数据组合与模型",
      url: "https://arxiv.org/abs/1807.06209",
      kind: "paper",
    },
    {
      label: "Davis与Lineweaver2004 · 粒子视界、事件视界与距离",
      url: "https://arxiv.org/abs/astro-ph/0310808",
      kind: "paper",
    },
    {
      label: "Conselice等2016 · 带质量下限的星系数外推",
      url: "https://arxiv.org/abs/1607.03909",
      kind: "paper",
    },
    {
      label: "Fixsen2009 · CMB温度的文献合并估计",
      url: "https://arxiv.org/abs/0911.1955",
      kind: "paper",
    },
    {
      label: "NASA LAMBDA · COBE数据与文档",
      url: "https://lambda.gsfc.nasa.gov/product/cobe/",
      kind: "agency",
    },
    {
      label: "Eisenstein等2005 · SDSS声学峰",
      url: "https://arxiv.org/abs/astro-ph/0501171",
      kind: "paper",
    },
    {
      label: "Cole等2005 · 2dFGRS功率谱中的重子振荡",
      url: "https://arxiv.org/abs/astro-ph/0501174",
      kind: "paper",
    },
    {
      label: "Riess等2022 · SH0ES距离阶梯",
      url: "https://arxiv.org/abs/2112.04510",
      kind: "paper",
    },
    {
      label: "PDG2026 · 暴胀模型与e-fold条件",
      url: "https://pdg.lbl.gov/2026/reviews/rpp2026-rev-inflation.pdf",
      kind: "paper",
    },
    {
      label: "BICEP/Keck2021 · 原初张量扰动限制",
      url: "https://arxiv.org/abs/2110.00483",
      kind: "paper",
    },
    {
      label: "Bosman等2022 · 再电离尾声的Lyα透射统计",
      url: "https://arxiv.org/abs/2108.03699",
      kind: "paper",
    },
    {
      label: "ESA/Hubble2004 · ACS超深场图像与曝光记录",
      url: "https://esahubble.org/images/heic0406a/",
      kind: "agency",
    },
    {
      label: "Cruz等2005 · WMAP冷斑的小波分析",
      url: "https://arxiv.org/abs/astro-ph/0405341",
      kind: "paper",
    },
    {
      label: "Tully等2014 · 星系本动速度与拉尼亚凯亚",
      url: "https://arxiv.org/abs/1409.0880",
      kind: "paper",
    },
    {
      label: "CMB-S4 · 停资与有序关闭公告",
      url: "https://cmb-s4.org/",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "cmb",
      name: {
        primary: "宇宙微波背景",
        latin: "CMB",
      },
      position: [0, 1.02, 0],
      description:
        "来自大爆炸后约38万年最后散射时期的光，今天红移为约2.7255K的微波背景。约10⁻⁵温度各向异性提供初始扰动与宇宙学参数信息；图中颜色并非可见光实拍，温度和密度也不能逐点简单同号对应。",
      data: [
        {
          label: "温度",
          value: "2.7255 K",
        },
        {
          label: "红移",
          value: "z ≈ 1100",
        },
        {
          label: "发射时间",
          value: "大爆炸后 ~38 万年",
        },
      ],
      color: "#c5d5ff",
      size: 0.035,
    },
    {
      id: "hubble-deep-field",
      name: {
        primary: "哈勃超深场",
        latin: "Hubble Ultra Deep Field",
      },
      position: [0.85, 0.48, -0.18],
      description:
        "2004年公布的ACS哈勃超深场，汇集2003年9月至2004年1月的800次曝光，累计11.3天，在天炉座小天区展示约万座星系。当时最暗红的候选被用于研究宇宙约8亿年时的星系；光学样本、后续红外样本与光谱确认应分别讨论。",
      data: [
        {
          label: "星系数量",
          value: "约10000（图像样本）",
        },
        {
          label: "相机",
          value: "Hubble ACS",
        },
        {
          label: "累计曝光",
          value: "11.3天",
        },
      ],
      color: "#ffd29a",
      size: 0.025,
    },
    {
      id: "cmb-cold-spot",
      name: {
        primary: "CMB 冷斑",
        latin: "CMB Cold Spot",
      },
      position: [-0.7, -0.5, 0.5],
      description:
        "WMAP首年数据中被球面小波分析突出的低温区域。Cruz等2005将先前的异常统计信号定位到银河坐标l≈209°、b≈−57°附近；约10°的天区尺度依滤波定义。它的物理解释与统计意义仍需区分，不能直接视作一个已证实超空洞的温度图。",
      data: [
        {
          label: "天区尺度",
          value: "约10°，依滤波定义",
        },
        {
          label: "分析方法",
          value: "球面小波",
        },
        {
          label: "方向",
          value: "波江座附近",
        },
      ],
      color: "#6ad0ff",
      size: 0.02,
    },
    {
      id: "bao-ring",
      name: {
        primary: "重子声学振荡",
        latin: "BAO",
      },
      position: [-0.45, 0.75, -0.35],
      description:
        "光子–重子声学扰动留下的统计相关标尺，所用Planck基线的拖曳声视界约147Mpc，常近似说150Mpc。它不是围绕地球的实体光环；拖曳结束也不完全等同于光子最后散射。2005年SDSS与2dFGRS分别报告相关证据。",
      data: [
        {
          label: "拖曳声视界",
          value: "约147Mpc（共动）",
        },
        {
          label: "2005证据",
          value: "SDSS / 2dFGRS",
        },
        {
          label: "拖曳结束",
          value: "z≈1060",
        },
      ],
      color: "#e6e9f0",
      size: 0.02,
    },
    {
      id: "great-attractor-dir",
      name: {
        primary: "巨引源方向",
        latin: "Great Attractor",
      },
      position: [0.92, -0.1, 0.28],
      description:
        "巨引源是近邻宇宙本动速度研究中的汇聚区域，位于银河遮蔽带附近。观测星系速度须先处理宇宙膨胀，并考虑更大范围密度分布与长程流；不能把本星系群相对CMB的合速度全部归为朝一个天体自由坠落。图中标记为研究主题入口。",
      data: [
        {
          label: "观测线索",
          value: "星系本动速度场",
        },
        {
          label: "对象",
          value: "大尺度质量分布",
        },
        {
          label: "边界",
          value: "依速度重建方法",
        },
      ],
      color: "#ffb45a",
      size: 0.022,
    },
    {
      id: "inflation-bmode",
      name: {
        primary: "暴胀 · B-mode 窗口",
        latin: "Inflation / B-mode",
      },
      position: [-0.32, 0.62, 0.7],
      description:
        "早期加速膨胀是缓解视界、曲率和遗迹问题的模型框架，持续时间与所需e-fold数有模型依赖。原初张量扰动可能产生B模；BK2021报告r_0.05<0.036的95%限制，前景与透镜信号必须处理。原CMB-S4项目2025年已停资，不能保证它于2030年代交付某一灵敏度。",
      data: [
        {
          label: "e-fold数",
          value: "依能标与再加热史",
        },
        {
          label: "BK2021上限",
          value: "r_0.05<0.036，95%",
        },
        {
          label: "观测内容",
          value: "B模与前景/透镜区分",
        },
      ],
      color: "#a48bff",
      size: 0.024,
    },
    {
      id: "reionization-bubbles",
      name: {
        primary: "再电离 · 首批天体与气体",
        latin: "Reionization",
      },
      position: [-0.55, -0.7, 0.42],
      description:
        "首批天体的辐射逐渐使星系际氢重新电离，过程并不均匀。Bosman2022的67条类星体视线支持与再电离有关的透射波动至少持续到z≈5.3，紫外背景、温度与中性比例均可贡献。早期星系观测不等于已直接确认第三星族恒星。",
      data: [
        {
          label: "尾声证据",
          value: "相关波动至z≈5.3",
        },
        {
          label: "首批天体",
          value: "时间与性质仍在研究",
        },
        {
          label: "探针",
          value: "Lyα透射 / 星系观测",
        },
      ],
      color: "#ffb088",
      size: 0.02,
    },
  ],
  relatedArticles: [
    {
      href: "/cosmology/knowledge-base/大爆炸理论",
      title: "大爆炸理论",
    },
    {
      href: "/cosmology/knowledge-base/宇宙微波背景",
      title: "宇宙微波背景",
    },
    {
      href: "/cosmology/knowledge-base/宇宙大尺度结构",
      title: "宇宙大尺度结构",
    },
  ],
};

export default content;

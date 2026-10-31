import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "T1",
  name: {
    primary: "宇宙纤维",
    latin: "Cosmic Web",
  },
  tagline: "宇宙的骨架",
  whisper: "物质沿引力的脊线流淌，沉积成星系的串珠。",
  dataCards: [
    {
      label: "典型纤维长度",
      latinLabel: "Filament length",
      value: "依识别方法与样本",
      hint: "不同层级的纤维不共用一个固定长度范围",
    },
    {
      label: "牧夫座原始红移缺口",
      latinLabel: "Boötes redshift gap",
      value: "6000 km/s",
      hint: "Kirshner1981 · 约60 h⁻¹ Mpc的视线深度，h以100定义",
    },
    {
      label: "Sloan 长城",
      latinLabel: "Sloan Great Wall",
      value: "1.37 × 10⁹ ly",
      hint: "≈ 420 Mpc · Gott et al. 2005",
    },
    {
      label: "纤维气体温度",
      latinLabel: "Warm-hot gas",
      value: "10⁵ – 10⁷ K",
      hint: "WHIM定义范围；不是每条纤维全部气体的温度",
    },
    {
      label: "WHIM模拟重子份额",
      latinLabel: "Baryons in WHIM",
      value: "30–40%",
      hint: "Davé2001的当代宇宙模型估计；分母为全部重子",
    },
    {
      label: "CfA长城原论文尺寸",
      latinLabel: "CfA Great Wall",
      value: "≥60 × 170 h⁻¹ Mpc",
      hint: "Geller与Huchra1989 · h=H₀/(100 km/s/Mpc)",
    },
    {
      label: "Hercules-Corona 长城",
      latinLabel: "Herc-Corona Borealis Wall",
      value: "2000–3000 Mpc（声称）",
      hint: "Horváth2015的GRB聚集尺度；连续结构与显著性有争议",
    },
    {
      label: "冷暗物质/冷暗物质加重子",
      latinLabel: "CDM / (CDM + baryons)",
      value: "约84.3%",
      hint: "Planck2018基线Ωch²/(Ωch²+Ωbh²)，非单条纤维的测量",
    },
    {
      label: "线性偏置因子",
      latinLabel: "Galaxy bias b",
      value: "ξgg ≈ b² ξmm",
      hint: "大尺度线性近似；b依星系样本、红移和尺度",
    },
    {
      label: "Millennium 仿真粒子",
      latinLabel: "Millennium N-body",
      value: "1.008 × 10¹⁰",
      hint: "Springel 2005 · 500 Mpc/h 盒",
    },
    {
      label: "IllustrisTNG-300 体积",
      latinLabel: "TNG300 box",
      value: "(302.6 Mpc)³",
      hint: "项目数据表 · 共动盒边长302.6 Mpc",
    },
  ],
  narrative: [
    {
      heading: "从初始扰动到宇宙网络",
      body: [
        "早期的密度与引力势扰动，在引力作用下逐渐长成团块、片状结构、纤维与空洞。CMB的约10⁻⁵温度各向异性提供初始扰动信息，但温度包含多种物理贡献，不能把每个较热方向直接等同于较高物质密度。",
        "纤维交汇处常有暗物质晕、星系群与星系团；节点不全等于超星系团。Bond、Kofman与Pogosyan1996讨论原初潮汐场怎样塑造网络，论文写作时观测与数值模拟已经显示类似结构，不能称它首次用N体模拟预言了宇宙网。",
      ],
    },
    {
      heading: "空洞：先说如何划定边界",
      body: [
        "空洞是相对于选定示踪物较低密度的区域，不是绝对没有物质。它的大小和体积分数随星系样本、红移、边界与识别算法变化；不能把一个固定直径范围和密度比例通用于全部空洞。",
        "Kirshner等1981在三个天区的133个红移中发现6000 km/s的显著缺口，视线深度约60 h⁻¹ Mpc、横向间距约80 h⁻¹ Mpc，h以100 km/s/Mpc定义。这个牧夫座早期结果不能写成确定直径330 Mpc。KBC2013则根据近邻K波段光度密度提出约300 Mpc尺度的低密度解释；它依赖光与质量关系等条件，不等于已证实我们住在一个足以解决哈勃张力的球形空洞。",
      ],
    },
    {
      heading: "长城：单位、边界与争议",
      body: [
        "Geller与Huchra1989从红移巡天报告CfA长城，原摘要的最低横向尺寸为60 h⁻¹ × 170 h⁻¹ Mpc。h的约定、结构边界和投影方向都影响数字；引用尺寸时应保留原论文的h约定。Gott等2003预印本、2005正式论文描述的Sloan长城约13.7亿光年，即420 Mpc。",
        "Horváth等2015用GRB样本支持z约1.6–2.1处、约2000–3000 Mpc的聚集；Christian2020的蒙特卡洛重分析认为原显著性被高估。稀疏示踪物的聚集、连续的物质长城和独立统计确认是不同层次。这样的声称不能直接写成已证实最大的实体，也不自动证明宇宙大尺度统计均匀性失效。",
      ],
    },
    {
      heading: "丢失重子：低密度气体的观测难题",
      body: [
        "重子清点比较的是核合成、CMB等推断的总体预算与各种气体、恒星库存，不是说重子真的消失。Davé等2001的六组流体模拟估计，当代约30%–40%的重子位于10⁵–10⁷ K的温热星系际介质中；这是指定时期的模型结果，不能写成每条纤维现已实测的固定比例。",
        "这类气体很稀，信号微弱；可以用紫外或软X射线吸收、发射以及热Sunyaev–Zeldovich效应等探针研究。Macquart等2020借助FRB的色散测量沿视线自由电子柱密度，约束弥散重子预算；它不单独测温，也不把所有重子逐一定位到某条纤维。",
      ],
    },
    {
      heading: "多种探针各自测什么",
      body: [
        "红移巡天以星系位置和光谱红移重建三维分布；红移转距离依赖宇宙学模型与本动速度处理。弱引力透镜约束投影总质量，X射线与热SZ则对气体温度、密度和压力有不同权重，合起来才能比较星系、质量与气体的联系。",
        "光学红移巡天不会凭自身取得X射线图像。若讨论某一条纤维的热气体，必须交代实际的X射线或微波仪器、样本与统计方法；不能把2MoST等光学项目的名字直接当成热气体已被其直接拍到的证据。这里展示的是结构示意，标记是阅读入口，不是这些真实对象的巡天坐标。",
      ],
    },
    {
      heading: "计算机中的宇宙：比较模型与观测",
      body: [
        "Millennium2005用2160³个无碰撞暗物质粒子、500 h⁻¹ Mpc的共动立方盒研究结构增长，再用半解析方法处理可见星系。IllustrisTNG引入磁流体与星系形成模型；TNG300共动盒边长302.6 Mpc。这些粒子是数值质量元，并非基本粒子。",
        "FLAMINGO2023的最大流体模拟使用约3×10¹¹个粒子、2.8 Gpc共动盒，并以恒星质量函数和星系团气体份额等校准反馈。不同模拟的物理过程、分辨率和校准资料不同，不能说三代都直接解了同一套磁流体，也不能把校准量吻合当成所有预测已达百分级。",
      ],
    },
    {
      heading: "二点相关与星系偏置",
      body: [
        "二点相关函数ξ(r)描述相距r的对象对，相对于随机分布有多少额外的出现概率。约150 Mpc的BAO特征是一种统计偏好，不是每对星系的固定间隔，更不是图上任意两节点的真实尺度。",
        "星系分布与总物质分布相关，却不是无偏的逐点描摹。在大尺度、近似确定的线性偏置下，密度扰动δg≈bδm，因此自相关ξgg≈b²ξmm；两个相关函数之比对应b²，不能直接叫b。b会随样本、红移和尺度变化，小尺度还需更完整的非线性与随机性描述。",
      ],
    },
  ],
  sources: [
    {
      label: "Bond等1996 · 初始潮汐场与宇宙网",
      url: "https://arxiv.org/abs/astro-ph/9512141",
      kind: "paper",
    },
    {
      label: "Kirshner等1981 · 牧夫座原始红移缺口与h约定",
      url: "https://articles.adsabs.harvard.edu/pdf/1981ApJ...248L..57K",
      kind: "paper",
    },
    {
      label: "Geller与Huchra1989 · CfA长城的原始摘要与尺寸",
      url: "https://ntrs.nasa.gov/citations/19900029036",
      kind: "paper",
    },
    {
      label: "Gott等2005 · Sloan长城与距离图",
      url: "https://arxiv.org/abs/astro-ph/0310571",
      kind: "paper",
    },
    {
      label: "Horváth等2015 · 支持武仙–北冕聚集的GRB分析",
      url: "https://arxiv.org/abs/1510.01933",
      kind: "paper",
    },
    {
      label: "Christian2020 · 对武仙–北冕聚集显著性的复核",
      url: "https://arxiv.org/abs/2006.00141",
      kind: "paper",
    },
    {
      label: "Davé等2001 · WHIM重子份额的流体模拟",
      url: "https://arxiv.org/abs/astro-ph/0007217",
      kind: "paper",
    },
    {
      label: "Macquart等2020 · FRB色散与重子预算",
      url: "https://arxiv.org/abs/2005.13161",
      kind: "paper",
    },
    {
      label: "Millennium项目 · 暗物质模拟与半解析目录",
      url: "https://wwwmpa.mpa-garching.mpg.de/galform/virgo/millennium/index.shtml",
      kind: "agency",
    },
    {
      label: "IllustrisTNG项目 · 模型说明与盒尺寸",
      url: "https://www.tng-project.org/data/docs/background/",
      kind: "agency",
    },
    {
      label: "IllustrisTNG项目 · TNG300数据表",
      url: "https://www.tng-project.org/data/",
      kind: "agency",
    },
    {
      label: "Schaye等2023 · FLAMINGO规模与反馈校准",
      url: "https://arxiv.org/abs/2306.04024",
      kind: "paper",
    },
    {
      label: "Keenan等2013 · 近邻K波段光度密度",
      url: "https://arxiv.org/abs/1304.2884",
      kind: "paper",
    },
    {
      label: "Tully1988 · 双鱼–鲸鱼复合体会议摘要",
      url: "https://doi.org/10.1017/S0074180900136101",
      kind: "paper",
    },
    {
      label: "Tully等2014 · Laniakea速度流域边界",
      url: "https://arxiv.org/abs/1409.0880",
      kind: "paper",
    },
    {
      label: "Hadzhiyska等2021 · §3.5偏置与二点相关的定义",
      url: "https://academic.oup.com/mnras/article/508/1/698/6368874",
      kind: "paper",
    },
    {
      label: "Planck2018 VI · 指定基线的重子与冷暗物质密度",
      url: "https://arxiv.org/abs/1807.06209",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "sloan-great-wall",
      name: {
        primary: "Sloan 长城",
        latin: "Sloan Great Wall",
      },
      position: [0.95, 0.15, -0.3],
      description:
        "Gott等2003预印本、2005正式论文用SDSS资料描述的长城，尺度约13.7亿光年（420 Mpc）。这个数字来自特定结构边界与距离约定；不能据此把它等同于双鱼–鲸鱼复合体或宣称它覆盖后者的大部分。",
      data: [
        {
          label: "论文尺度",
          value: "约420 Mpc",
        },
        {
          label: "论文版本",
          value: "2003预印本 / 2005发表",
        },
        {
          label: "资料",
          value: "SDSS",
        },
      ],
      color: "#ffd29a",
      size: 0.04,
    },
    {
      id: "bootes-void",
      name: {
        primary: "牧夫座空洞",
        latin: "Boötes Void",
      },
      position: [-0.75, 0.4, 0.45],
      description:
        "Kirshner等1981在三个天区的红移中报告稀少星系区：缺口6000 km/s，按论文h约定约60 h⁻¹ Mpc的视线深度，横向天区间距约80 h⁻¹ Mpc。早期稀疏样本并非完整边界或所有星系的清点，不能从它给出精确直径330 Mpc或固定星系总数。",
      data: [
        {
          label: "原始红移缺口",
          value: "6000 km/s",
        },
        {
          label: "视线深度",
          value: "约60 h⁻¹ Mpc",
        },
        {
          label: "h定义",
          value: "H₀/(100 km/s/Mpc)",
        },
      ],
      color: "#7884a8",
      size: 0.05,
    },
    {
      id: "cfa2-great-wall",
      name: {
        primary: "CfA2 长城",
        latin: "CfA2 Great Wall",
      },
      position: [0.3, -0.65, 0.55],
      description:
        "Geller与Huchra1989报告的CfA长城，原摘要给最低横向尺寸60 h⁻¹ × 170 h⁻¹ Mpc。它揭示了显著的片状大尺度结构，但单个有限结构不自动推翻足够大尺度的统计均匀性。",
      data: [
        {
          label: "最低横向尺寸",
          value: "60 × 170 h⁻¹ Mpc",
        },
        {
          label: "论文作者",
          value: "Geller / Huchra",
        },
        {
          label: "发表年份",
          value: "1989",
        },
      ],
      color: "#f4e3c1",
      size: 0.035,
    },
    {
      id: "hercules-corona-wall",
      name: {
        primary: "武仙-北冕长城",
        latin: "Hercules-Corona Borealis Great Wall",
      },
      position: [-0.5, -0.3, -0.7],
      description:
        "Horváth等从GRB分布提出并在2015样本中支持的大尺度聚集声称，估计2000–3000 Mpc。Christian2020指出选择效应与统计检验可能高估显著性。它是否对应连续的物质结构仍有争议，不能说已确认，或把它写成接近今日粒子视界大小。",
      data: [
        {
          label: "2015声称尺度",
          value: "2000–3000 Mpc",
        },
        {
          label: "示踪物",
          value: "伽马暴",
        },
        {
          label: "证据状态",
          value: "统计解释有争议",
        },
      ],
      color: "#ffb45a",
      size: 0.045,
    },
    {
      id: "kbc-void",
      name: {
        primary: "KBC低密度区假说",
        latin: "KBC Void",
      },
      position: [0, 0, 0],
      description:
        "Keenan、Barger与Cowie2013比较近邻K波段光度密度，讨论约300 Mpc尺度的低密度解释。把光度密度转换为总质量密度需要假设；它不是已证实能解决哈勃张力的唯一模型，也不同于近邻星系分布中另称Local Void的空洞。",
      data: [
        {
          label: "研究尺度",
          value: "约300 Mpc",
        },
        {
          label: "观测量",
          value: "K波段光度密度",
        },
        {
          label: "性质",
          value: "低密度解释，具模型条件",
        },
      ],
      color: "#6ad0ff",
      size: 0.035,
    },
    {
      id: "piscs-cetus",
      name: {
        primary: "双鱼座-鲸鱼座超星系团复合体",
        latin: "Pisces-Cetus Supercluster Complex",
      },
      position: [0.55, 0.6, -0.45],
      description:
        "Tully1988会议摘要讨论约50个富星系团、跨度约300 h₇₅⁻¹ Mpc的复合体，h₇₅以75 km/s/Mpc定义。这种按星系团分布识别的连结，和Laniakea按本动速度流域划界的方法不同，不能把两种目录直接画成已证实的严格嵌套层级。",
      data: [
        {
          label: "会议摘要尺度",
          value: "约300 h₇₅⁻¹ Mpc",
        },
        {
          label: "h₇₅定义",
          value: "H₀/(75 km/s/Mpc)",
        },
        {
          label: "识别线索",
          value: "富星系团空间分布",
        },
      ],
      color: "#e6e9f0",
      size: 0.03,
    },
    {
      id: "n-body-node",
      name: {
        primary: "N 体模拟节点",
        latin: "N-body Simulation Node",
      },
      position: [-0.15, -0.55, -0.4],
      description:
        "这里示意引力形成的高密度节点。Millennium使用无碰撞暗物质N体计算并结合半解析星系模型；TNG使用磁流体；FLAMINGO比较流体与反馈模型。模拟能检验结构统计，但其盒尺寸、物理过程和拟合精度不能混成一条统一的实测结论。",
      data: [
        {
          label: "Millennium粒子",
          value: "2160³",
        },
        {
          label: "TNG300盒边长",
          value: "302.6 Mpc（共动）",
        },
        {
          label: "FLAMINGO最大流体盒",
          value: "2.8 Gpc（共动）",
        },
      ],
      color: "#b89aff",
      size: 0.034,
    },
    {
      id: "whim-filament",
      name: {
        primary: "丢失重子 · WHIM",
        latin: "Warm-Hot IGM",
      },
      position: [0.65, -0.18, -0.05],
      description:
        "WHIM指约10⁵–10⁷ K的温热星系际气体，低密度使其难观测，但并非不能产生X射线信号。Davé2001的模拟重子份额与Macquart2020的FRB弥散电子预算是不同测量/推断，不能合并成已定位并测温全部丢失重子的直接照片。",
      data: [
        {
          label: "温度范围",
          value: "10⁵–10⁷ K",
        },
        {
          label: "2001模拟重子份额",
          value: "30–40%",
        },
        {
          label: "FRB色散探针",
          value: "沿视线自由电子柱密度",
        },
      ],
      color: "#94c8ff",
      size: 0.028,
    },
  ],
  relatedArticles: [
    {
      href: "/cosmology/knowledge-base/暗物质与暗能量",
      title: "暗物质与暗能量",
    },
    {
      href: "/cosmology/knowledge-base/宇宙大尺度结构",
      title: "宇宙大尺度结构",
    },
    {
      href: "/cosmology/knowledge-base/星系形成与演化",
      title: "星系形成与演化",
    },
  ],
};

export default content;

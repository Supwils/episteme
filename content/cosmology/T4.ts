import type { TierContent } from "./types";

const content: TierContent = {
  tier: "T4",
  name: {
    primary: "银河系",
    latin: "Milky Way · Via Lactea",
  },
  tagline: "我们脚下的这个旋臂盘",
  whisper: "银河如练——我们从盘内望向自己的星系；图中旋臂仅作结构示意。",
  dataCards: [
    {
      label: "恒星盘参考直径",
      latinLabel: "Disk diameter",
      value: "≈ 30 kpc",
      hint: "约10万光年；外盘无唯一锐利边缘",
    },
    {
      label: "总质量量级",
      latinLabel: "Total mass",
      value: "~10¹² M⊙",
      hint: "含暗晕；依外推半径、示踪体与动力学模型",
    },
    {
      label: "太阳距银心",
      latinLabel: "R⊙",
      value: "8.178 kpc",
      hint: "GRAVITY2019：±13 pc统计、±22 pc系统",
    },
    {
      label: "Sgr A*质量量级",
      latinLabel: "Central BH",
      value: "≈4 × 10⁶ M⊙",
      hint: "恒星轨道约束；不能把EHT影像当独立精密称重",
    },
    {
      label: "公转周期",
      latinLabel: "Galactic year",
      value: "≈ 230 Myr",
      hint: "太阳绕银心一周",
    },
    {
      label: "薄盘指数标高",
      latinLabel: "Thin disk",
      value: "≈300 pc",
      hint: "太阳邻域老薄盘；不是HWHM或总厚度",
    },
    {
      label: "球状星团",
      latinLabel: "Globulars",
      value: "约150（历史编目）",
      hint: "数量随新发现和分类变化，非当前精确总数",
    },
    {
      label: "恒星质量",
      latinLabel: "Stars",
      value: "(6.08±1.14) × 10¹⁰ M⊙",
      hint: "Licquia–Newman2015；Kroupa初始质量函数",
    },
    {
      label: "厚盘指数标高",
      latinLabel: "Thick disk scale height",
      value: "≈900 pc",
      hint: "几何分解示例；随所选星族与模型变化",
    },
    {
      label: "棒模式角速度示例",
      latinLabel: "Bar pattern speed",
      value: "41±3 km/s/kpc",
      hint: "Sanders等2019近侧数据；系统误差可更大",
    },
    {
      label: "全银河恒星形成率",
      latinLabel: "Galactic SFR",
      value: "1.65±0.19 M⊙/yr",
      hint: "Licquia–Newman2015；非太阳邻域局部值",
    },
    {
      label: "长棒半长示例",
      latinLabel: "Bar half-length",
      value: "5.0±0.2 kpc",
      hint: "Wegg等2015；半长不能写成全长",
    },
    {
      label: "气体旋臂模型",
      latinLabel: "Spiral tracers",
      value: "四条主臂图景",
      hint: "Reid2019脉泽视差；恒星与气体示踪可呈现不同结构",
    },
    {
      label: "共转半径定义",
      latinLabel: "Corotation",
      value: "R_CR=v_c(R_CR)/Ωb",
      hint: "当地圆轨道角速度等于棒模式速度；须指定旋转曲线",
    },
    {
      label: "Gaia光谱数据",
      latinLabel: "Spectral products",
      value: "依产品与星等选样",
      hint: "BP/RP低分辨率、RVS及化学参数不是每个源都具备",
    },
    {
      label: "Gaia DR4计划",
      latinLabel: "Data Release 4",
      value: "预计2026年12月",
      hint: "2026-10核对ESA，覆盖66个月观测；尚未发布",
    },
    {
      label: "Sgr A*自旋推断",
      latinLabel: "Spin inference",
      value: "依吸积与辐射模型",
      hint: "轨道质量、Schwarzschild进动与黑洞自旋须区分",
    },
    {
      label: "Fermi气泡角高度",
      latinLabel: "Gamma-ray bubbles",
      value: "银心上下各约50°",
      hint: "Su2010对称几何示例上延约10kpc；非各25kpc",
    },
    {
      label: "eROSITA X射线气泡",
      latinLabel: "X-ray bubbles",
      value: "上下各约14kpc",
      hint: "Predehl2020模型尺度；比γ射线泡更大，不是同一条边界",
    },
  ],
  narrative: [
    {
      heading: "盘面、棒、旋臂",
      body: [
        "银河系是带棒旋涡星系。红团巨星计数的一组模型给长棒半长5.0±0.2 kpc，与太阳—银心视线的夹角约28°—33°（Wegg等2015）。这里的长度是半长，且依示踪星族与消光修正，不能把“4 kpc长”当成唯一精确尺度。",
        "射电脉泽的视差与自行支持四条主要气体旋臂的图景（Reid等2019），但不同示踪体、臂段连接与远侧遮挡仍带来不确定性。恒星密度与气体造星区描出的臂也未必一样；Outer与Norma不是可不加模型说明就互换的名字。本图的四条曲线和臂标记是结构示意，不是完整实测平面地图。",
        "恒星晕与暗物质晕必须分开：前者稀薄，Deason等2019在特定密度与质光比模型下估计其恒星质量约(1.4±0.4)×10⁹ M⊙，远少于恒星盘。后者支配更大尺度的动力学总质量；总质量约10¹² M⊙的量级需要注明外推范围与模型，不能用晕中恒星的亮度直接称量。",
        "棒的模式速度Ωb与当地圆轨道角速度相等处叫共转半径，满足Ωb=v_c(R_CR)/R_CR，即R_CR=v_c(R_CR)/Ωb。这个定义需要旋转曲线；将Ωb除以线速度，单位会变成长度的倒数。棒引起的非圆运动、共振和气体力矩，能够影响局部速度分布，但具体共振位置取决于所选动力学模型。",
      ],
    },
    {
      heading: "太阳的位置",
      body: [
        "太阳在Local Arm（本地臂、猎户臂）一带，位于人马臂与英仙臂之间。Xu等2016的VLBA测量表明，这段结构比过去认为的短小支臂更显著；它的长度、螺距与造星活动值得独立研究，而不是已确定的一小段断臂。",
        "GRAVITY2019结合S2的角位置、光谱速度和轨道模型，得到银心距离8178±13（统计）±22（系统）pc。只保留±13 pc会漏掉系统误差。用太阳距离与约几百km/s的绕转速度作近圆估算，一个银河年约两亿多年；230 Myr只是量级示例，回看约2.3亿年前是三叠纪、早期恐龙出现的时代，并非恐龙时代尾声。",
        "太阳的实际轨道还包含径向与垂直运动。相对局部静止标准的瞬时速度分量，与棒和旋臂长期改变轨道角动量所说的径向迁移，并非同一个量。盘中的波纹和卫星扰动也需用大样本速度来检验，不能仅凭两个看起来接近的周期，就推定银河运动与地球气候之间存在因果联系。",
      ],
    },
    {
      heading: "Sgr A* 与中央黑洞",
      body: [
        "银心恒星轨道要求中心有一个约四百万太阳质量的极致致密天体，黑洞是这些证据支持的解释。2020年诺贝尔物理学奖的一半授予Genzel与Ghez，奖词是发现银河系中心的超大质量致密天体；另一半授予Penrose。",
        "EHT于2022年公布Sgr A*的视界尺度射电图像：明亮发射环围绕中央亮度降低区域，与黑洞阴影预期相容。这是M87*之后第二个获此类成像的目标；光来自周围等离子体，不是黑洞表面或事件视界本身。S2近心速度约为光速的几个百分点，使其轨道与光谱可检验引力红移等相对论效应。",
        "S2近心点约距中心120天文单位，观测到的引力红移和Schwarzschild轨道进动，首先检验质量主导的相对论效应。黑洞自旋引起的拖曳是另一类、更细小的效应；把前一种进动检测直接换成精确自旋值，会跨过尚需模型与观测检验的一步。银心耀斑的解释同样要结合等离子体和磁场演化。",
      ],
    },
    {
      heading: "Gaia 时代的银河系制图",
      body: [
        "Gaia于2013年发射，主要科学观测从2014年持续到2025年1月。DR3在2022年发布、汇总论文于2023年刊印，延续约18亿源的测光与位置数据；其中约14.6亿源有完整天体测量解，约3380万颗恒星有径向速度。不能写成18亿颗都拥有完整六维位置速度，精度也随亮度、颜色与观测条件变化。",
        "这类数据把星流、盘面翘曲、棒引起的非圆运动与化学丰度放进可共同分析的坐标系。旧文献仍有价值，但Drimmel–Spergel的相关盘结构论文是2001年，不能改成2022年Gaia新发现。本地臂的射电视差证据则见Xu等2016，二者的数据与结论不应混成同一研究。",
      ],
    },
    {
      heading: "银盘的翘曲与拥挤",
      body: [
        "银盘不是理想平面。中性氢与造父变星描出的外盘都显示翘曲、外张和扭转。Chen等2019用1339颗造父变星建立模型，显示恒星外盘至少延伸到20 kpc，翘曲的大小随半径和方位改变；用单一“±0.5 kpc”代表所有半径和星族会误导。",
        "不同示踪体的距离误差、选择函数与年龄也不同。卫星星系扰动、内盘力矩及暗晕耦合都是讨论中的机制；某张形状图本身不能唯一确认起因。一个被扰动而仍在振荡的盘是有用图像，但还需速度场与动力学模型检验。",
        "形状与运动提供互补证据：同样的翘曲外观，可能对应不同的进动、振荡或受扰状态。比较年轻恒星、老年星族和中性氢时，应保留它们各自的年龄、距离与选样误差。物理机制需要同时解释这些差异，而不是从一个星族的幅度趋势便替所有成因作结论。",
      ],
    },
    {
      heading: "薄盘 · 厚盘 · 晕：三层时间史",
      body: [
        "太阳邻域常用两个指数垂直分布概括老薄盘与厚盘，示例标高约300与900 pc；标高表示密度衰减的尺度，不是半高半宽，也不是清晰边界。年轻星形成层可薄得多，不同星族的标高会变化。恒星晕通常更老、更贫金属，但薄盘、厚盘、晕的年龄和化学分布存在重叠，不能按8或12 Gyr画绝对分界。",
        "Bovy等2016研究APOGEE单丰度星族，发现高α族群较中央集中，低α星族的厚度与径向结构更复杂；这不是首次发现薄厚盘。化学、年龄与轨道共同约束吸积、盘加热和气体沉降。Gaia–Enceladus等古老并合是重要线索，但不能把所有厚盘和内晕都归为一次已定量定案的事件，也不能把z≈2与8 Gyr无条件等同。",
      ],
    },
    {
      heading: "棒、Galactic Fountain · 银河系的循环系统",
      body: [
        "棒的模式速度描述整体图案的转动，不是每颗恒星都以相同角速度运动。Sanders等2019用近侧自行得到41±3 km/s/kpc的示例统计结果，并指出系统差异可能达到5—10 km/s/kpc。棒可改变气体与恒星轨道；Hercules速度结构和共振解释仍依赖棒速度与动力学模型，不能把某一种外林德布拉德共振说成唯一答案。",
        "银河喷泉描述超新星反馈把部分盘气体推高、冷却并回落的循环。高速度云有多种可能来源，不能全部认作喷泉回落；循环本身也不创造新燃料，持续造星还涉及外来吸积与质量损失。HI4PI是全天中性氢光谱巡天，GALFA-HI仅覆盖Arecibo可见天区，二者不是“全部高速度云的完整全天目录”。Licquia–Newman2015给全银河当前恒星形成率1.65±0.19 M⊙/yr，并不证明这个速率数十亿年恒定。",
        "喷泉中的气体可以在上升、混合、冷却和回落过程中改变电离态，21cm、紫外吸收与X射线对这些气体有不同的敏感性。CO又主要用来间接追踪分子氢。把不同相的质量和流率放在一起时，需要转换因子、覆盖和几何模型；一次观测中的相关结构，不足以规定所有超新星能量都以固定比例抬升气体。",
      ],
    },
    {
      heading: "Fermi与eROSITA：不同波段描出的气泡",
      body: [
        "Su、Slatyer与Finkbeiner2010年在Fermi-LAT数据中识别出银心上下各延约50°的γ射线双叶结构，具有较硬的频谱和清晰边缘。在其关于银面与银河短轴对称的几何示例中，采用太阳距银心8.5kpc，最外边缘上延到约10kpc。角尺度直接来自天空图，物理高度则还需要距离和几何假设。",
        "Predehl等2020年的eROSITA研究报告了更大范围的软X射线气泡，估计向银心上下各延约14kpc，并将其尖锐边缘解释为激波。它们与γ射线结构有联系，却不共享完全相同的边界。X射线主要揭示热气体，γ射线又涉及高能粒子及辐射过程，多波段轮廓因此包含不同信息。",
        "过去银心黑洞活动与集中成星产生的能量注入，是研究中的候选解释。气体密度、速度、粒子输运与辐射模型会影响所推的能量和年龄；南北两叶也不等于已经测定两次独立爆发。今日Sgr A*较暗，并不证明它过去始终安静，气泡为重建银河反馈提供了可继续检验的线索。",
      ],
    },
    {
      heading: "旋臂之谜：形状相似，动力学未必相同",
      body: [
        "旋臂可以被比作盘中传播的密度增强，恒星和气体穿过其中，而不是像风车叶片一样永远由同一批恒星组成。讨论长期密度波、瞬态结构或摆动放大，需要区分图案运动和物质运动；一张此刻的漂亮旋涡图，并不直接给出图案能维持多久。",
        "从银河内部观察尤其困难：尘埃遮挡远侧，不同示踪体记录不同星族和时间。Reid等2019年的脉泽视差与自行支持主要气体旋臂的定位，Xu等2016年又展示本地臂比过去短小支臂印象更显著。恒星密度、分子气体与年轻造星区可相互比较，却未必在所有位置描出同一条脊线。",
        "要判断旋臂怎样演化，需要联合位置、非圆速度、年龄和化学，再与具有同样选择函数的动力学模型比较。长期与瞬态机制也可能在不同半径或时段共同作用。将每个模型的示踪体和预测写清楚，比把某份资料宣布为所有旋臂每一亿年必定重组的证据，更接近当前问题的实质。",
      ],
    },
    {
      heading: "数据规模与参数精度：Gaia和银心研究的下一步",
      body: [
        "Gaia数据发布包含多种产品，位置、完整天体测量解、径向速度、BP/RP光谱、RVS光谱与化学参数的适用样本不同。2013年发射与2014年起的主要科学观测也应分开。到2026年10月，ESA列出的DR4计划仍为2026年12月，覆盖66个月观测；扩大样本并不意味着每个源都会获得同等精度的六维信息和丰度。",
        "银心方面，EHT2022论文V用时变广义相对论磁流体模型及辐射转移，对照毫米到X射线的11项约束。在它测试的模型库中，每个模型至少有一项未满足，光变尤其难以重现；部分低倾角、强磁场模型只在变率等约束上存在问题。模型库中的偏好因此不是脱离吸积假设的独立几何自旋测量。",
        "轨道、影像、偏振与光变增加的是不同信息。S2给质量与相对论轨道的精密约束，周围等离子体发射图则受磁场、电子分布和时变结构影响。未来更好的观测与模型可缩小参数范围，但一个预期中的仪器或数据发布，不应被写成已经测得a*>0.9的结果。",
      ],
    },
  ],
  sources: [
    {
      label: "GRAVITY2018 — S2近心点与引力红移",
      url: "https://arxiv.org/abs/1807.09409",
      kind: "paper",
    },
    {
      label: "GRAVITY2019 · S2几何距离与统计/系统误差",
      url: "https://arxiv.org/abs/1904.05721",
      kind: "paper",
    },
    {
      label: "Wegg等2015 · 长棒半长与方位",
      url: "https://arxiv.org/abs/1504.01401",
      kind: "paper",
    },
    {
      label: "Reid等2019 · 高质量造星区视差与旋臂",
      url: "https://arxiv.org/abs/1910.03357",
      kind: "paper",
    },
    {
      label: "Xu等2016 · 本地旋臂的射电视差",
      url: "https://arxiv.org/abs/1610.00242",
      kind: "paper",
    },
    {
      label: "Bland-Hawthorn–Gerhard2016 · 银河结构综述",
      url: "https://arxiv.org/abs/1602.07702",
      kind: "paper",
    },
    {
      label: "Deason等2019 · 恒星晕质量",
      url: "https://arxiv.org/abs/1908.02763",
      kind: "paper",
    },
    {
      label: "Deason等2021 · 100kpc内质量及外推条件",
      url: "https://arxiv.org/abs/2010.13801",
      kind: "paper",
    },
    {
      label: "EHT2022 · Sgr A*发射环与阴影",
      url: "https://doi.org/10.3847/2041-8213/ac6674",
      kind: "paper",
    },
    {
      label: "2020诺贝尔物理学奖科学说明",
      url: "https://www.nobelprize.org/uploads/2020/10/advanced-physicsprize2020.pdf",
      kind: "agency",
    },
    {
      label: "Gaia DR3汇总原论文",
      url: "https://arxiv.org/abs/2208.00211",
      kind: "paper",
    },
    {
      label: "ESA · Gaia任务观测时间",
      url: "https://www.esa.int/Science_Exploration/Space_Science/Gaia",
      kind: "agency",
    },
    {
      label: "Chen等2019 · 造父变星与银盘翘曲",
      url: "https://arxiv.org/abs/1902.00998",
      kind: "paper",
    },
    {
      label: "Bovy等2016 · 单丰度星族结构",
      url: "https://arxiv.org/abs/1509.05796",
      kind: "paper",
    },
    {
      label: "Sanders等2019 · 棒模式速度与系统差异",
      url: "https://arxiv.org/abs/1903.02009",
      kind: "paper",
    },
    {
      label: "Putman–Peek–Joung2012 · 多相气体晕和喷泉",
      url: "https://ned.ipac.caltech.edu/level5/Sept12/Putman/Putman4.html",
      kind: "paper",
    },
    {
      label: "HI4PI2016 · 全天中性氢光谱巡天",
      url: "https://arxiv.org/abs/1610.06175",
      kind: "paper",
    },
    {
      label: "Licquia–Newman2015 · 当前SFR与恒星质量",
      url: "https://arxiv.org/abs/1407.1078",
      kind: "paper",
    },
    {
      label: "NASA/ESA · Omega Centauri星团说明",
      url: "https://science.nasa.gov/asset/hubble/core-of-omega-centauri/",
      kind: "agency",
    },
    {
      label: "Su等2010 — Fermi双叶γ射线结构与起源问题",
      url: "https://arxiv.org/abs/1005.5480",
      kind: "paper",
    },
    {
      label: "Predehl等2020 — eROSITA银河晕X射线气泡",
      url: "https://arxiv.org/abs/2012.05840",
      kind: "paper",
    },
    {
      label: "EHT2022论文V — Sgr A*吸积模型与多波段约束",
      url: "https://eventhorizontelescope.org/publications/first-sagittarius-event-horizon-telescope-results-iv-variability-morphology-and-0",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "sgr-a-star",
      name: {
        primary: "人马座 A* (银心黑洞)",
        latin: "Sagittarius A*",
      },
      position: [0, 0, 0],
      description:
        "银心约四百万太阳质量的致密天体，恒星轨道和EHT视界尺度成像共同支持超大质量黑洞解释。S2近心速度约为光速几个百分点，可检验引力红移和轨道进动。2022图中的光环来自周围等离子体，中央暗区与黑洞阴影相容，不是黑洞表面发光。",
      data: [
        {
          label: "质量量级",
          value: "~4 × 10⁶ M⊙",
        },
        {
          label: "Schwarzschild尺度",
          value: "~1.2 × 10¹⁰ m（非旋转参考）",
        },
        {
          label: "首次此类成像",
          value: "EHT 2022",
        },
      ],
      color: "#fff4d0",
      size: 0.022,
    },
    {
      id: "sun",
      name: {
        primary: "太阳",
        latin: "Sol",
      },
      position: [0.545, 0.001, 0],
      description:
        "太阳距银心8178±13（统计）±22（系统）pc，是GRAVITY2019的S2轨道几何结果。太阳在本地臂一带；本地臂比过去小支臂图景更显著，精细结构仍在测绘。绕银心一周约两亿多年。",
      data: [
        {
          label: "R⊙",
          value: "8.178 kpc（含统计/系统误差）",
        },
        {
          label: "公转周期",
          value: "~230 Myr",
        },
        {
          label: "所在旋臂",
          value: "Local Arm",
        },
      ],
      color: "#fff3c4",
      size: 0.02,
    },
    {
      id: "arm-perseus",
      name: {
        primary: "英仙臂",
        latin: "Perseus Arm",
      },
      position: [0.027, 0, -0.549],
      description:
        "英仙臂是太阳外侧的一条重要造星旋臂。视差、自行与气体谱线用于识别不同臂段；具体距离随银经而变，不宜把整条臂写成离太阳恰好2 kpc的一条线。本图点位只代表这类结构的入口。",
      data: [
        {
          label: "图中位置",
          value: "旋臂结构示意，非独立测距点",
        },
        {
          label: "测绘依据",
          value: "射电脉泽视差等多种示踪体",
        },
      ],
      color: "#bcd5ff",
      size: 0.022,
    },
    {
      id: "arm-scutum-centaurus",
      name: {
        primary: "盾牌-半人马臂",
        latin: "Scutum-Centaurus Arm",
      },
      position: [0.549, 0, 0.026],
      description:
        "盾牌—半人马臂是银河系的重要旋臂段，含年轻大质量恒星与电离氢区。它与棒末端和远侧臂段的连接需要观测模型；这里不把“全银河最活跃”的排名当作已证事实。",
      data: [
        {
          label: "图中位置",
          value: "旋臂结构示意，非独立测距点",
        },
        {
          label: "测绘依据",
          value: "射电脉泽视差等多种示踪体",
        },
      ],
      color: "#ffc878",
      size: 0.022,
    },
    {
      id: "arm-sagittarius-carina",
      name: {
        primary: "人马-船底臂",
        latin: "Sagittarius-Carina Arm",
      },
      position: [-0.027, 0, 0.549],
      description:
        "人马—船底臂是太阳内侧的重要造星结构，可由年轻恒星、分子气体与电离氢区追踪。气体与老恒星描绘的臂结构不同，“主臂/次臂”分类需说明示踪体；图中点位是示意入口。",
      data: [
        {
          label: "图中位置",
          value: "旋臂结构示意，非独立测距点",
        },
        {
          label: "测绘依据",
          value: "射电脉泽视差等多种示踪体",
        },
      ],
      color: "#d4e2ff",
      size: 0.02,
    },
    {
      id: "arm-outer",
      name: {
        primary: "外旋臂",
        latin: "Outer Arm",
      },
      position: [-0.549, 0, -0.026],
      description:
        "外旋臂指银河外盘的一组旋臂结构；它与内侧Norma等臂段如何连接，依赖具体旋臂模型。不能直接把Outer与Norma当无条件同义词，也不能因为位于外盘就称其仅由老恒星组成。四臂图形只是示意。",
      data: [
        {
          label: "图中位置",
          value: "旋臂结构示意，非独立测距点",
        },
        {
          label: "测绘依据",
          value: "射电脉泽视差等多种示踪体",
        },
      ],
      color: "#ffb86a",
      size: 0.02,
    },
    {
      id: "galactic-fountain",
      name: {
        primary: "银河喷泉",
        latin: "Galactic Fountain",
      },
      position: [0.32, 0.18, 0],
      description:
        "超新星反馈可把部分盘气体推入晕，冷却后回落，构成银河喷泉。高速度云还可能来自吸积、卫星星系或其他过程，非全部喷泉。HI4PI提供全天HI数据；循环、外来补给和造星率需分开测量。",
      data: [
        {
          label: "性质",
          value: "反馈与气体循环模型",
        },
        {
          label: "高度",
          value: "可达kpc量级，依气相而变",
        },
        {
          label: "观测",
          value: "HI4PI等光谱/吸收线数据",
        },
      ],
      color: "#a0d4ff",
      size: 0.024,
    },
    {
      id: "omega-cen",
      name: {
        primary: "半人马 ω 球状星团",
        latin: "ω Centauri / NGC 5139",
      },
      position: [-0.21, -0.12, 0.03],
      description:
        "Omega Centauri是银河系最庞大的球状星团之一，约千万颗恒星，距太阳约5 kpc。多星族与化学丰度分布使它成为银河考古目标；被剥离矮星系核心是重要解释，不能只由成员数量直接证明。图中离盘位置为结构示意。",
      data: [
        {
          label: "距太阳",
          value: "5.2 kpc",
        },
        {
          label: "成员",
          value: "~10⁷ stars",
        },
        {
          label: "总数",
          value: "~150 (Harris 2010)",
        },
      ],
      color: "#ffd29a",
      size: 0.018,
    },
  ],
  discussionQuestions: [
    "怎样用不同星族、气体和自行数据区分旋臂的形状与动力学机制？",
    "γ射线与X射线气泡的边界为何不同？推断能量和年龄需要哪些假设？",
    "Gaia的数据产品与银心轨道、EHT影像各自限制哪些参数？如何判断模型偏好与独立测量之间的差别？",
  ],
};

export default content;

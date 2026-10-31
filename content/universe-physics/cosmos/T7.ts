import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "T7",
  name: {
    primary: "地球",
    latin: "Earth · Terra",
  },
  tagline: "我们站着的这颗",
  whisper: "蓝白色的薄壳，挂在百亿光年深的黑里。",
  dataCards: [
    {
      label: "赤道半径",
      latinLabel: "Equatorial radius",
      value: "6378.137 km",
      hint: "WGS84",
    },
    {
      label: "质量",
      latinLabel: "Mass",
      value: "5.972 × 10²⁴ kg",
    },
    {
      label: "全球地表增温",
      latinLabel: "Global surface warming",
      value: "≈+1.1 °C",
      hint: "2011–2020 相对1850–1900 · IPCC AR6",
    },
    {
      label: "公转周期",
      latinLabel: "Orbital period",
      value: "365.256 d",
    },
    {
      label: "自转周期",
      latinLabel: "Sidereal day",
      value: "23h 56m 4.1s",
    },
    {
      label: "大气主要成分",
      latinLabel: "Atmosphere",
      value: "N₂ 78% · O₂ 21%",
      hint: "干空气体积分数；水汽含量另随环境变化",
    },
    {
      label: "月球轨道半径",
      latinLabel: "Lunar distance",
      value: "60.3 R⊕",
      hint: "384 399 km",
    },
    {
      label: "地球年龄",
      latinLabel: "Age",
      value: "4.54 Gyr",
      hint: "放射性测年，误差约1%以内",
    },
    {
      label: "内核半径",
      latinLabel: "Inner core radius",
      value: "1 221 km",
      hint: "现代地震模型的近似值；Lehmann于1936年提出内核",
    },
    {
      label: "大氧化事件",
      latinLabel: "Great Oxidation Event",
      value: "≈ 2.4 Gya",
      hint: "约24亿年前的氧化转变，非瞬时事件",
    },
    {
      label: "最近一次地磁反转",
      latinLabel: "Brunhes–Matuyama",
      value: "0.78 Mya",
      hint: "反转间隔不规则，并非周期钟表",
    },
    {
      label: "五大灭绝最严重",
      latinLabel: "End-Permian extinction",
      value: "≈ 252 Mya",
      hint: "二叠纪末；损失比例依分类与估计而异",
    },
  ],
  narrative: [
    {
      heading: "薄到不可思议的家",
      body: [
        "把海洋、大气和浅层岩石放在一起看，生命活跃的近地表环境相对约6378 km的地球半径十分薄。海洋平均深度只有几千米，日常天气主要发生在十几千米厚的对流层。但平均海深和对流层顶并不是生命的严格上下界，深部岩石圈中也存在微生物，它们各自记录不同的生态环境。",
        "从苹果果皮到地球表层，这个比喻帮助我们感受脆弱，却不能取代生态系统的深度分布。直径约1.28万km的这颗行星，容纳了目前唯一已确认的生物圈；生命与环境的交换还连着地下岩石、深海以及头顶的大气。",
      ],
    },
    {
      heading: "大气是颜色，也是护盾",
      body: [
        "海洋并非只是在反射蓝天。水会较强吸收可见光中的红光，清洁海水返回的光因而偏蓝；悬浮颗粒与生物也会改变海色。大气中的Rayleigh散射则让短波长可见光更容易被散射，形成蓝天和地球边缘的蓝色光晕。本图把云层和大气光晕厚度夸张了，便于看见，并非等比例的高度剖面。",
        "氧和臭氧吸收全部太阳UV-C以及大部分UV-B，UV-A更容易到达地面；吸收程度随波长、太阳高度与臭氧总量变化。磁层则改变太阳风带电粒子的运动，日侧边界会随太阳风压力伸缩。空气、磁场和辐射防护各有作用，也没有一个绝对挡住所有粒子的硬壳。",
      ],
    },
    {
      heading: "月球：潮汐相连的同伴",
      body: [
        "月球质量约为地球的1/81，在八大行星的卫星中，相对母行星而言很大。巨撞击是月球起源的主要模型：早期大天体与地球碰撞，抛出的物质参与成月。Hartmann与Davis在1975年讨论过这一路径；撞击者的性质、混合程度以及地月同位素相似性仍是研究问题。月球并非没有铁核，而是有一个相对较小的富铁核心。",
        "自Apollo时代以来的月球激光测距显示，当前地月平均距离每年增加约3.8 cm。地球自转、海洋潮汐和月球轨道之间交换角动量，同时耗散机械能；这个速度受海盆形状等条件影响，不能按常数倒推全部历史，也不能据此保证遥远未来一定达到某种最终锁定。",
      ],
    },
    {
      heading: "我们离开过这里",
      body: [
        "1961年Gagarin首次进入地球轨道，1969年Apollo 11把人送到月面。Artemis I于2022年11月16日至12月11日完成无人试飞。2026年4月1日至10日，Artemis II的四人乘组完成载人绕月飞行，让人类在Apollo时代之后再次从月球附近回望家园。",
        "国际空间站自2000年起持续有人驻守，轨道高度约400 km。轨道飞行与亚轨道飞行不同：Crew Dragon可以执行绕地轨道任务，Blue Origin的New Shepard旅游飞行则是亚轨道往返。回望地球的视角取决于距离、视场和航迹，没有一个「超过600 km就一定看见完整地球圆盘」的通用门槛。",
      ],
    },
    {
      heading: "「淡蓝色圆点」",
      body: [
        "1990年2月14日，Voyager 1在距太阳约60亿公里处回望地球，拍下「淡蓝色圆点」。地球没有在图中铺开可辨认的大陆与海洋，而是落在散射阳光条纹中的微小亮点。拍摄距离的参考原点是太阳，不能把这个数无条件标成精确地月系统距离。",
        "Carl Sagan用这张照片提醒读者：我们熟悉的人与历史，全部发生在这个遥远视角下几乎无法分辨的世界。沿尺度阶梯走到这里，地图重新变成家园；这不是关于地球不重要的测量，而是把人与行星的关系放进了同一个视野。",
      ],
    },
    {
      heading: "生物圈：唯一的样本",
      body: [
        "Drake方程把恒星、行星、生命与文明的若干条件相乘，但未知参数很多，不能把「一到百万个文明」写成观测给出的数量区间。寻找地外生命至今仍面对同一个事实：我们拥有的已确认生命样本只有地球。关于生命有多常见的推断，必须和已经探测到生命分开。",
        "环境变化也需要说明时间窗与基线。IPCC在2023年综合报告中评估，2011–2020年全球地表温度比1850–1900年约高1.1°C；这不是2026年的即时温度。1.5°C与2°C是相对同一工业化前基线的长期增温水平，风险随每一分增温增加。观测年代、统计窗口和情景假设共同决定了数字的含义，读懂它们才能把全球平均变化与当地生态风险联系起来。",
      ],
    },
    {
      heading: "地球内部 · 从地震波重建层次",
      body: [
        "直接钻探只进入地球很浅的一层，地震波是认识深部结构的关键证据，此外还结合重力、岩石化学、高压实验和物理模型。P波可在固体和液体中传播，体S波不能在普通液体中传播；反射、折射、波速变化与阴影区共同约束层界。Lehmann在1936年从P波记录推断外核之内还有性质不同的内核，不是直接拍到了一个固态铁球。",
        "现代模型给出内核半径约1221 km，主要为固态富铁合金；它外面的液态外核厚约2200–2300 km，导电流体运动维持地磁发电机。地幔厚约2900 km，总体为固态岩石，却能在地质时间中缓慢变形。岩石圈由地壳和上地幔最外部组成，不能等同于几十千米厚的地壳。内核温度为数千K且估计有差异；高压下的熔点改变解释了为何中心固态与外层液态可以并存。",
      ],
    },
    {
      heading: "板块、大氧化与人类影响",
      body: [
        "大陆漂移到板块构造的建立经历了几十年的证据积累。Vine与Matthews在1963年把海底磁异常条带、海底扩张与地磁反转联系起来，是其中的重要一环。Wilson循环描述洋盆开合及大陆聚散；不同洋盆的历史不同，超大陆重组也不是每5亿年必然敲响一次的钟表。地质灾变还需要分别讨论火山活动、气候和来自地外的撞击：大陆运动只是这部历史的一部分。",
        "约24亿年前的大氧化转变也不是「海里的铁一次氧化完，氧才涌入空气」的单步过程。Bekker等人2004年根据南非约23.2亿年前沉积物中的硫同位素等证据，论证当时大气已存在显著氧气；不同记录约束的是复杂转变的不同部分。至于「人类世」，IUGS与ICS在2024年批准否决将其立为正式地质年代单位的提案；这个词仍广泛用于描述人类对地球系统的影响。",
      ],
    },
  ],
  sources: [
    {
      label: "USGS — Geomagnetic reversals: irregular intervals and latest reversal",
      url: "https://www.usgs.gov/faqs/it-true-earths-magnetic-field-occasionally-reverses-its-polarity",
      kind: "agency",
    },
    {
      label: "Blue Origin — New Shepard: suborbital flight",
      url: "https://www.blueorigin.com/new-shepard",
      kind: "agency",
    },
    {
      label: "NASA — Earth Fact Sheet: radii, periods and dry-air composition",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html",
      kind: "agency",
    },
    {
      label: "NASA — Earth facts: surface and structure",
      url: "https://science.nasa.gov/earth/facts/",
      kind: "agency",
    },
    {
      label: "USGS — Age of the Earth",
      url: "https://pubs.usgs.gov/gip/geotime/age.html",
      kind: "agency",
    },
    {
      label: "NOAA — Why is the ocean blue?",
      url: "https://oceanservice.noaa.gov/facts/oceanblue.html",
      kind: "agency",
    },
    {
      label: "WMO / NOAA — Twenty Questions About the Ozone Layer, 2022 update, Q2",
      url: "https://csl.noaa.gov/assessments/ozone/2022/twentyquestions/",
      kind: "agency",
    },
    {
      label: "NASA — Moon facts: formation and small iron core",
      url: "https://science.nasa.gov/moon/facts/",
      kind: "agency",
    },
    {
      label:
        "Hartmann & Davis 1975 — Satellite-sized planetesimals and lunar origin, Icarus 24, 504–515",
      url: "https://doi.org/10.1016/0019-1035(75)90070-6",
      kind: "paper",
    },
    {
      label: "JPL — Lunar laser ranging and 3.8 cm/year recession",
      url: "https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/",
      kind: "agency",
    },
    {
      label: "NASA — Artemis I: 2022 uncrewed flight",
      url: "https://www.nasa.gov/mission/artemis-i/",
      kind: "agency",
    },
    {
      label: "NASA — Artemis II: 2026 completed crewed mission",
      url: "https://www.nasa.gov/mission/artemis-ii/",
      kind: "agency",
    },
    {
      label: "NASA — Voyager’s Pale Blue Dot, 1990-02-14",
      url: "https://science.nasa.gov/resource/voyager-pale-blue-dot-download/",
      kind: "agency",
    },
    {
      label: "IPCC 2023 — AR6 Synthesis, Summary for Policymakers, A.1 / B.2",
      url: "https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf",
      kind: "agency",
    },
    {
      label: "USGS — Inside the Earth: crust, mantle, core and lithosphere",
      url: "https://pubs.usgs.gov/gip/dynamic/inside.html",
      kind: "agency",
    },
    {
      label: "Lehmann 1936 — P′, reprinted with commentary in Episodes 24, 262–267 (2001)",
      url: "https://courses.seas.harvard.edu/climate/eli/Courses/EPS281r/Sources/Inner-Core/Lehmann-1936-extracts%2Binterpretation.pdf",
      kind: "paper",
    },
    {
      label: "Vine & Matthews 1963 — Magnetic Anomalies Over Oceanic Ridges, Nature 199, 947–949",
      url: "https://courses.washington.edu/ess502/Vine_Matthews.pdf",
      kind: "paper",
    },
    {
      label: "Bekker et al. 2004 — Dating the rise of atmospheric oxygen, Nature 427, 117–120",
      url: "https://pubmed.ncbi.nlm.nih.gov/14712267/",
      kind: "paper",
    },
    {
      label: "IUGS / ICS — Joint statement approving rejection of a formal Anthropocene epoch",
      url: "https://stratigraphy.org/news/152",
      kind: "agency",
    },
    {
      label: "ESA — Orbits: conditions and altitude of geostationary orbit",
      url: "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Orbits",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "earth-surface",
      name: {
        primary: "地球表面",
        latin: "Earth Surface",
      },
      position: [0, 1, 0],
      description:
        "地表附近的海洋、大气和岩石环境承载着已知生物圈。海洋约占表面积71%，陆地约29%；这不是一个以固定高度划出的严格生命边界。",
      data: [
        {
          label: "海洋占比",
          value: "71%",
        },
        {
          label: "陆地占比",
          value: "29%",
        },
        {
          label: "已确认生物圈",
          value: "地球",
        },
      ],
      color: "#a3c9ff",
      size: 0.08,
    },
    {
      id: "atmosphere",
      name: {
        primary: "大气层",
        latin: "Atmosphere",
      },
      position: [0, 0, 1.12],
      description:
        "近地面干空气约含78%氮气、21%氧气及约1%的其他气体，水汽另随地点与天气变化。Rayleigh散射参与形成蓝天与边缘光晕，氧和臭氧吸收全部UV-C及大部分UV-B。本图大气壳为视觉夸张；100 km的Kármán线是常用空间边界约定，不表示空气在那里突然消失。",
      data: [
        {
          label: "干空气 N₂ / O₂",
          value: "≈78% / 21%",
        },
        {
          label: "Kármán 线约定",
          value: "100 km",
        },
        {
          label: "外侧边界",
          value: "逐渐稀薄，无硬边缘",
        },
      ],
      color: "#7cbcff",
      size: 0.1,
    },
    {
      id: "geostationary",
      name: {
        primary: "地球静止轨道",
        latin: "Geostationary Orbit",
      },
      position: [6.6, 0, 0],
      description:
        "赤道上空约35 786 km的顺行圆轨道，距地心约42 164 km，即6.6 R⊕。公转周期为一个恒星日，因而相对地面近似保持固定方位。仅周期相同的地球同步轨道还可能倾斜或偏心，并不都能悬停。GOES等气象卫星与许多通信卫星使用这种轨道。",
      data: [
        {
          label: "距地心半径",
          value: "6.6 R⊕",
        },
        {
          label: "高度",
          value: "35 786 km",
        },
        {
          label: "周期",
          value: "23h 56m 4s",
        },
      ],
      color: "#6ad0ff",
      size: 0.12,
    },
    {
      id: "moon",
      name: {
        primary: "月球",
        latin: "Moon · Luna",
      },
      position: [5, 0.15, 0],
      description:
        "地球的天然卫星，半径约1737 km（0.273 R⊕），月地质量比约1:81。巨撞击是主要起源模型，月球仍有小型富铁核心。激光测距测得当前平均距离每年增加约3.8 cm，这不是整个地月历史中的固定速率。本图把平均月距从约60.3 R⊕压缩到约5 R⊕，标记数据保留真实尺度。",
      data: [
        {
          label: "平均地心距离",
          value: "60.3 R⊕ (384 399 km)",
        },
        {
          label: "半径",
          value: "0.273 R⊕",
        },
        {
          label: "起源",
          value: "巨撞击模型",
        },
      ],
      color: "#e6e6f0",
      size: 0.32,
    },
    {
      id: "inner-core",
      name: {
        primary: "内核",
        latin: "Inner Core",
      },
      position: [0, 0, 0.5],
      description:
        "Lehmann在1936年从P波记录推断外核之内存在性质不同的区域。现代模型给出的内核半径约1221 km，主要为固态富铁合金；外核是液态导电金属，其运动维持地磁发电机。内核温度估计为数千K，固液状态要同时考虑压力与成分。本标记是说明入口，图中位置不代表实际内核深度。",
      data: [
        {
          label: "半径",
          value: "≈1221 km",
        },
        {
          label: "状态",
          value: "固态富铁合金",
        },
        {
          label: "外核状态",
          value: "液态",
        },
        {
          label: "地震学推断",
          value: "Lehmann 1936",
        },
      ],
      color: "#ffb066",
      size: 0.12,
    },
    {
      id: "plate-tectonics",
      name: {
        primary: "板块构造",
        latin: "Plate Tectonics",
      },
      position: [-0.95, 0.18, -0.25],
      description:
        "海底磁异常条带、地磁反转与扩张速率之间的对应，为板块构造提供了关键证据。Wilson循环描述洋盆的张开与闭合，并不是严格500 Myr的超大陆时钟；未来大陆布局也依赖模型。大型火山活动与天体撞击的成因不同，不能统称为板块边界引发的大灭绝。",
      data: [
        {
          label: "Wilson 循环",
          value: "洋盆开合，非固定周期",
        },
        {
          label: "岩石圈",
          value: "地壳 + 最外层地幔",
        },
        {
          label: "关键磁条带论文",
          value: "Vine–Matthews 1963",
        },
      ],
      color: "#c3a880",
      size: 0.085,
    },
  ],
  relatedArticles: [
    {
      href: "/cosmology/knowledge-base/太阳系--terrestrial-planets",
      title: "类地行星",
    },
    {
      href: "/cosmology/knowledge-base/太阳系--planetary-moons",
      title: "行星的卫星",
    },
  ],
};

export default content;

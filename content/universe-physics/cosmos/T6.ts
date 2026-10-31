import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "T6",
  name: {
    primary: "太阳系",
    latin: "Solar System",
  },
  tagline: "我们的恒星和它的行星",
  whisper: "八颗行星、一群矮行星、海量的冰碎屑。",
  dataCards: [
    {
      label: "已知行星",
      latinLabel: "Planets",
      value: "8",
      hint: "Pluto 2006 改判矮行星",
    },
    {
      label: "矮行星",
      latinLabel: "Dwarf planets",
      value: "5 个获 IAU 承认",
      hint: "Ceres / Pluto / Eris / Haumea / Makemake",
    },
    {
      label: "Kuiper 带主体范围",
      latinLabel: "Kuiper Belt",
      value: "30 – 50 AU",
      hint: "4.5 – 7.5 × 10¹² m",
    },
    {
      label: "Oort 云外缘估计",
      latinLabel: "Oort cloud edge",
      value: "≈ 100 000 AU",
      hint: "模型范围可达 ≈1.6 ly，未直接成像",
    },
    {
      label: "太阳质量占比",
      latinLabel: "Sun's mass share",
      value: "99.86%",
    },
    {
      label: "木星 / 土星合占",
      latinLabel: "Jupiter + Saturn",
      value: "≈92.5% 行星总质量",
      hint: "仅以八颗行星质量之和为分母",
    },
    {
      label: "太阳系形成",
      latinLabel: "Age",
      value: "≈4.6 Gyr",
      hint: "形成经历一段过程，并非单一瞬间",
    },
    {
      label: "八大行星轨道倾角",
      latinLabel: "Coplanar within",
      value: "≤ 7°",
      hint: "相对黄道面；矮行星可有更大倾角",
    },
    {
      label: "太阳活动周期",
      latinLabel: "Solar cycle",
      value: "≈ 11 yr",
      hint: "活动周期长短会变化",
    },
    {
      label: "海王星轨道半长轴",
      latinLabel: "Neptune semimajor axis",
      value: "≈30 AU",
    },
    {
      label: "Europa 海洋深度",
      latinLabel: "Europa subsurface ocean",
      value: "估计 60–150 km",
      hint: "结构模型推断，尚待探测约束",
    },
    {
      label: "Voyager 1 越过日球层顶",
      latinLabel: "Heliopause crossing",
      value: "2012-08-25",
      hint: "当时距太阳约122 AU",
    },
  ],
  narrative: [
    {
      heading: "四个岩石 + 两个气巨 + 两个冰巨",
      body: [
        "太阳系内圈是水星、金星、地球、火星四颗岩石行星，轨道半长轴约0.39–1.52 AU。外圈的木星、土星是气态巨行星，天王星、海王星归为冰巨行星，轨道半长轴约5–30 AU。这里的「冰巨」是组成分类，不表示它们内部全是固态冰。",
        "火星与木星之间分布着主小行星带。这张示意图取2.2–3.2 AU的一段环带代表它，没有画出全部轨道。海王星外的Kuiper带主体约在30–50 AU，此外还有更远的散射盘等族群；不能把图中每个点当作一颗已编目的天体。更远的Oort云是由长周期彗星等线索推断的近球状储库，外缘可能达到十万AU量级，尚未被直接拍成一张云的照片。",
      ],
    },
    {
      heading: "为什么这张图用对数刻度",
      body: [
        "地球轨道半长轴约为水星的2.6倍，海王星约为地球的30倍。按线性刻度同时放下内外行星，地球就会挤进最内侧的1/30。3D与手绘两版都用对数方式压缩轨道半长轴，给内行星留出阅读空间；各自采用不同的绘图半径，让Mercury（0.39 AU）与Neptune（约30 AU）能在同一画面被辨认。",
        "行星大小、轨道倾斜的竖向幅度和相位也为可读性做了处理；画面缓慢转动是在展示布局，没有按真实公转周期播放。真实水星约88个地球日绕日一圈，海王星约165个地球年一圈。屏幕上的间距、角度与转速都不能直接拿来做天体力学测量。",
      ],
    },
    {
      heading: "Pluto 的重新分类",
      body: [
        "2006年IAU把Pluto归为矮行星。定义除要求绕太阳运行、依靠自身引力接近圆球外，还要求行星在轨道邻域占据动力学主导地位。这里的「清除邻域」不等于轨道里一颗小天体也没有。Pluto属于海王星外小天体族群；Eris等相近世界的发现促使天文学家重新讨论分类边界。",
        "2015年7月14日New Horizons飞掠Pluto，拍到了氮冰平原、稀薄大气和心形Tombaugh Regio。改变分类不会改变这颗世界的复杂性。IAU目前承认Ceres、Pluto、Haumea、Makemake与Eris五个矮行星，另有候选者；「五个」是已获承认的名单，不是太阳系矮行星的最终总数。",
      ],
    },
    {
      heading: "我们去过哪里",
      body: [
        "Voyager 1于1977年发射，是飞得最远的人造物。团队结合粒子、磁场和等离子体波数据，把它跨越日球层顶的日期确定为2012年8月25日，当时距太阳约122 AU。这是太阳风主导环境与周围星际介质的边界，不是太阳引力的终点；进入星际空间也不等于已穿过远得多的Oort云。",
        "New Horizons先后飞掠Pluto（2015）与Arrokoth（2019）；Hayabusa2在2020年送回Ryugu样本，OSIRIS-REx在2023年送回Bennu样本。无人探测器曾在金星、火星、月球和Titan等天体软着陆，水星则经历了飞掠与绕轨探测，尚无软着陆器。Voyager 2在1986年飞掠天王星、1989年飞掠海王星，仍是唯一近访这两颗行星的探测器。",
      ],
    },
    {
      heading: "Nice 与 Grand Tack · 迁移的两种阶段",
      body: [
        "今天的轨道未必就是巨行星出生时的轨道。Tsiganis等人在2005年提出的Nice模型，让巨行星与残余小天体盘交换能量和角动量；在其模拟中，木星与土星越过周期比2:1的共振后，行星轨道发生重排，产生接近今天的半长轴、偏心率和相互倾角。这是受观测约束的动力学模型，具体初始布局、迁移时刻与撞击史仍需检验。",
        "Walsh等人2011年的Grand Tack研究更早的气体盘阶段：模型中的木星先向内迁至约1.5 AU，再与土星共同向外迁移，截短内侧固体盘，帮助解释火星质量偏小及小行星带的成分混合。它与Nice讨论的阶段和迁移机制不同。某次模拟能重现今天的结构，不代表太阳系一定按那一个剧本演过；更不能据此断言所有大型月盆都形成于同一场晚期轰炸。",
      ],
    },
    {
      heading: "卫星海洋 · 冰下的水仍在被测量",
      body: [
        "Galileo测到Europa附近的感生磁场，是地下导电咸水层的重要证据，但没有直接量出一层精确100 km深的海。结构模型常给出约60–150 km的海洋深度。NASA于2026年公布的Juno微波结果，在已观测区域用纯水冰模型估计冷硬导热层约29 km；盐分或下方对流层会改变对总冰壳厚度的解释。Enceladus羽流中的微小二氧化硅颗粒与分子氢则支持海底水岩反应和热液活动；相关分析并非都来自一次2014年观测，也不是发现生命的证明。",
        "Titan的稠密大气以氮气为主，地面湖海主要是甲烷和乙烷。它是否拥有全球地下水海仍有争论：2025年Cassini数据重分析提出冰泥层与局部液水袋的替代解释。寻找宜居环境需要继续测量。Europa Clipper于2024年10月14日发射；截至2026年10月的NASA计划，是2030年4月抵达木星、绕木星运行并49次近距离飞掠Europa。它要判断潜在宜居条件，不是直接去Europa着陆或宣布生命已经存在。",
      ],
    },
  ],
  sources: [
    {
      label: "NASA — Sun Fact Sheet: mass, radius, luminosity and activity cycle",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html",
      kind: "agency",
    },
    {
      label: "NASA — Planetary Fact Sheet",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
      kind: "agency",
    },
    {
      label: "NASA — Solar System facts",
      url: "https://science.nasa.gov/solar-system/solar-system-facts/",
      kind: "agency",
    },
    {
      label: "NASA — Dwarf planets and the IAU definition",
      url: "https://science.nasa.gov/dwarf-planets/",
      kind: "agency",
    },
    {
      label: "NASA — Kuiper Belt facts",
      url: "https://science.nasa.gov/solar-system/kuiper-belt/facts/",
      kind: "agency",
    },
    {
      label: "NASA — Oort Cloud facts and estimated extent",
      url: "https://science.nasa.gov/solar-system/oort-cloud/facts/",
      kind: "agency",
    },
    {
      label: "NASA — Asteroid facts",
      url: "https://science.nasa.gov/solar-system/asteroids/facts/",
      kind: "agency",
    },
    {
      label: "NASA — Voyager 1: mission and historical milestones",
      url: "https://science.nasa.gov/mission/voyager/voyager-1/",
      kind: "agency",
    },
    {
      label: "NASA — Ed Stone: heliopause crossing date and distance",
      url: "https://science.nasa.gov/mission/voyager/questions-and-answers-with-dr-ed-stone/",
      kind: "agency",
    },
    {
      label: "NASA — Voyager 2: Uranus and Neptune flybys",
      url: "https://science.nasa.gov/mission/voyager/voyager-2/",
      kind: "agency",
    },
    {
      label: "NASA — Mercury exploration",
      url: "https://science.nasa.gov/mercury/exploration/",
      kind: "agency",
    },
    {
      label: "Tsiganis et al. 2005 — Origin of the orbital architecture, Nature 435, 459–461",
      url: "https://pubmed.ncbi.nlm.nih.gov/15917800/",
      kind: "paper",
    },
    {
      label:
        "Walsh et al. 2011 — A low mass for Mars from Jupiter’s early gas-driven migration, Nature 475, 206–209",
      url: "https://www.oca.eu/images/LAGRANGE/pages_perso/morby/papers/P128.pdf",
      kind: "paper",
    },
    {
      label: "NASA — Europa Up Close: ocean evidence and model estimates",
      url: "https://science.nasa.gov/mission/europa-clipper/why-europa-europa-up-close/",
      kind: "agency",
    },
    {
      label: "NASA — Juno’s Europa ice-shell result, 2026-01-27",
      url: "https://www.nasa.gov/missions/juno/nasas-juno-measures-thickness-of-europas-ice-shell/",
      kind: "agency",
    },
    {
      label: "NASA — Europa Clipper: current mission plan (2026-09-10 update)",
      url: "https://science.nasa.gov/mission/europa-clipper/",
      kind: "agency",
    },
    {
      label: "NASA — Cassini evidence for hydrothermal activity",
      url: "https://science.nasa.gov/missions/cassini/hydrothermal-activity/",
      kind: "agency",
    },
    {
      label: "NASA — Titan facts",
      url: "https://science.nasa.gov/saturn/moons/titan/facts/",
      kind: "agency",
    },
    {
      label: "JPL — Titan ocean reanalysis, 2025-12-17",
      url: "https://www.jpl.nasa.gov/news/nasa-study-suggests-saturns-moon-titan-may-not-have-global-ocean/",
      kind: "agency",
    },
    {
      label: "NASA — Saturnian Rings Fact Sheet (radii measured from center)",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/satringfact.html",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "sun",
      name: {
        primary: "太阳",
        latin: "Sol",
      },
      position: [0, 0, 0],
      description:
        "G2V 主序星，半径 6.96 × 10⁸ m，光度 3.83 × 10²⁶ W。占太阳系总质量 99.86%。下一档 T7 是它的第三颗行星。",
      data: [
        {
          label: "质量",
          value: "1.988 × 10³⁰ kg",
        },
        {
          label: "半径",
          value: "696 000 km",
        },
        {
          label: "下钻",
          value: "T7",
        },
      ],
      color: "#fff3c4",
      size: 0.034,
    },
    {
      id: "earth",
      name: {
        primary: "地球",
        latin: "Earth",
      },
      position: [-0.234, 0, -0.088],
      description:
        "太阳系唯一已知拥有地表液态水海洋与生物圈的行星，轨道半长轴约1 AU。它是T7的主角。",
      data: [
        {
          label: "轨道半长轴",
          value: "1.000 AU",
        },
        {
          label: "恒星公转周期",
          value: "365.256 d",
        },
        {
          label: "下钻",
          value: "T7",
        },
      ],
      color: "#6ab0f7",
      size: 0.028,
    },
    {
      id: "asteroid-belt",
      name: {
        primary: "主小行星带",
        latin: "Asteroid Belt",
      },
      position: [0.383, 0, 0],
      description:
        "火星与木星之间的小天体群；本图用2.2–3.2 AU的示意环带表示，没有画出其全部范围。Ceres是其中的矮行星。木星的共振与引力扰动塑造了带内轨道分布，图中的点数不对应已知天体数。",
      data: [
        {
          label: "图示环带",
          value: "2.2–3.2 AU",
        },
        {
          label: "成员示例",
          value: "Ceres / Vesta",
        },
        {
          label: "总质量",
          value: "远小于月球",
        },
      ],
      color: "#b9a482",
      size: 0.022,
    },
    {
      id: "jupiter",
      name: {
        primary: "木星",
        latin: "Jupiter",
      },
      position: [0.327, 0.003, 0.372],
      description:
        "太阳系最大的行星，质量约为其余七颗行星总和的2.5倍。它的引力与共振塑造了小行星和彗星的轨道，既可能抛出小天体，也可能把它们送向内侧，不能简单视作替地球挡灾的守门员。Io、Europa、Ganymede、Callisto四颗伽利略卫星各有不同的地质环境。",
      data: [
        {
          label: "轨道半长轴",
          value: "5.20 AU",
        },
        {
          label: "质量",
          value: "1.898 × 10²⁷ kg",
        },
        {
          label: "伽利略卫星",
          value: "4 颗",
        },
      ],
      color: "#d6a87a",
      size: 0.04,
    },
    {
      id: "saturn",
      name: {
        primary: "土星",
        latin: "Saturn",
      },
      position: [-0.523, 0.005, 0.314],
      description:
        "太阳系第二大行星，环主要由冰颗粒与少量岩石、尘埃构成。亮的C、B、A主环距土星中心约7.47万至13.68万km，典型竖向厚度为数米至数十米；更暗的环延伸得更远，不能把所有环都视作同一厚度。Cassini在2004–2017年绕土星探测，Huygens于2005年降落Titan。",
      data: [
        {
          label: "轨道半长轴",
          value: "≈9.58 AU",
        },
        {
          label: "C/B/A 主环半径",
          value: "74 658–136 780 km",
        },
        {
          label: "卫星示例",
          value: "Titan / Enceladus",
        },
      ],
      color: "#e3c590",
      size: 0.036,
    },
    {
      id: "pluto",
      name: {
        primary: "冥王星",
        latin: "Pluto",
      },
      position: [0.153, 0.104, 0.887],
      description:
        "Kuiper 带最大已知矮行星 (半径 1188 km)。轨道倾角 17°、偏心率 0.25，所以在这张图里它明显抬出黄道面。2015 年 New Horizons 飞掠拍到了它的氮冰平原、心形 Tombaugh Regio 与氮气大气。",
      data: [
        {
          label: "轨道半长轴",
          value: "39.48 AU",
        },
        {
          label: "倾角",
          value: "17.2°",
        },
        {
          label: "飞掠任务",
          value: "New Horizons 2015",
        },
      ],
      color: "#d2b58a",
      size: 0.018,
    },
    {
      id: "europa",
      name: {
        primary: "木卫二 · 欧罗巴",
        latin: "Europa",
      },
      position: [0.335, 0.022, 0.395],
      description:
        "木星的四颗伽利略卫星之一，半径约1561 km。Galileo感生磁场等证据支持冰下咸水海，但冰壳厚度与海洋深度仍依赖模型。2026年Juno结果把观测区域的纯冰冷硬导热层估为约29 km，不能当作全球统一厚度。Europa Clipper已于2024年发射，现计划2030年4月抵达木星并49次飞掠Europa，研究其潜在宜居条件。",
      data: [
        {
          label: "海洋深度估计",
          value: "60–150 km",
        },
        {
          label: "海洋证据",
          value: "感生磁场等",
        },
        {
          label: "Clipper 计划飞掠",
          value: "49 次",
        },
      ],
      color: "#cee0ff",
      size: 0.02,
    },
    {
      id: "voyager-1",
      name: {
        primary: "旅行者 1 号",
        latin: "Voyager 1 · Interstellar",
      },
      position: [0.95, 0.05, 0.18],
      description:
        "1977年发射、迄今飞得最远的人造物。团队把2012年8月25日确定为它跨越日球层顶的日期，当时距太阳约122 AU，进入周围星际介质主导的环境。它仍受太阳引力及部分太阳活动影响，尚未飞出遥远的Oort云。金唱片保存了地球的声音与影像。图中位置是边缘示意标记，不是当前星历。",
      data: [
        {
          label: "跨越时日心距离",
          value: "≈122 AU（2012）",
        },
        {
          label: "穿越日球层顶",
          value: "2012-08-25",
        },
        {
          label: "发射日期",
          value: "1977-09-05",
        },
      ],
      color: "#aed4ff",
      size: 0.022,
    },
  ],
  relatedArticles: [
    {
      href: "/cosmology/knowledge-base/太阳系--terrestrial-planets",
      title: "类地行星",
    },
    {
      href: "/cosmology/knowledge-base/太阳系--gas-giants",
      title: "气态巨行星",
    },
    {
      href: "/cosmology/knowledge-base/太阳系--solar-structure-activity",
      title: "太阳结构与活动",
    },
  ],
};

export default content;

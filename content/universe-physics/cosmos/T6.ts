import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "T6",
  name: { primary: "太阳系", latin: "Solar System" },
  tagline: "我们的恒星和它的行星",
  whisper: "八颗行星、几个被开除的、海量的冰碎屑。",
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
      value: "5 已确认",
      hint: "Ceres / Pluto / Eris / Haumea / Makemake",
    },
    {
      label: "Kuiper 带范围",
      latinLabel: "Kuiper Belt",
      value: "30 – 50 AU",
      hint: "4.5 – 7.5 × 10¹² m",
    },
    {
      label: "Oort 云外缘",
      latinLabel: "Oort cloud edge",
      value: "≈ 100 000 AU",
      hint: "≈ 1.6 ly",
    },
    {
      label: "太阳质量占比",
      latinLabel: "Sun's mass share",
      value: "99.86%",
    },
    {
      label: "木星 / 土星合占",
      latinLabel: "Jupiter + Saturn",
      value: "~90% 非太阳质量",
    },
    {
      label: "日心系年龄",
      latinLabel: "Age",
      value: "4.568 Gyr",
      hint: "Bouvier & Wadhwa 2010 (CAI)",
    },
    {
      label: "黄道倾角分布",
      latinLabel: "Coplanar within",
      value: "≤ 7°",
      hint: "Pluto 例外，i = 17°",
    },
    {
      label: "太阳活动周期",
      latinLabel: "Solar cycle",
      value: "≈ 11 yr",
      hint: "极性翻转 22 yr · Hale 周期",
    },
    {
      label: "已知 TNO 数",
      latinLabel: "Trans-Neptunian Objects",
      value: "> 5000",
      hint: "MPC 2024 编目",
    },
    {
      label: "Europa 海洋深度",
      latinLabel: "Europa subsurface ocean",
      value: "~100 km",
      hint: "Galileo 磁场 1998",
    },
    {
      label: "Oort 云估计天体数",
      latinLabel: "Oort cloud members",
      value: "≈ 10¹¹ – 10¹²",
      hint: "Dones 2015",
    },
    {
      label: "主小行星带总质量",
      latinLabel: "Asteroid belt mass",
      value: "≈ 3 × 10²¹ kg",
      hint: "~4% 月球质量 · Kuchynka 2011",
    },
    {
      label: "Kuiper 带总质量",
      latinLabel: "Kuiper Belt mass",
      value: "≈ 0.02–0.1 M⊕",
      hint: "Fuentes & Holman 2008",
    },
    {
      label: "晚期重轰炸",
      latinLabel: "Late Heavy Bombardment",
      value: "≈ 4.1–3.8 Gya",
      hint: "月球撞击盆地年龄集中 · Tera 1974",
    },
    {
      label: "地球水的碳质球粒陨石来源",
      latinLabel: "D/H ratio match",
      value: "D/H ≈ 1.5 × 10⁻⁴",
      hint: "与碳质球粒陨石一致 · Alexander 2012",
    },
    {
      label: "Enceladus 海洋磷含量",
      latinLabel: "Enceladus ocean phosphorus",
      value: "磷已检出",
      hint: "Cassini 粒尘分析 · Postberg et al. 2023",
    },
    {
      label: "Europa Clipper 巡飞次数",
      latinLabel: "Europa Clipper flybys",
      value: "49 次巡飞",
      hint: "2024 年 10 月发射 · 2030 年抵达",
    },
    {
      label: "天王星轨道器优先级",
      latinLabel: "Uranus Orbiter priority",
      value: "Decadal 最高优先",
      hint: "National Academies 2023 · 2030s 发射目标",
    },
    {
      label: "Europa Clipper 发射日期",
      latinLabel: "Europa Clipper launch",
      value: "2024-10-14",
      hint: "SpaceX Falcon Heavy · 2030 年 4 月抵达",
    },
  ],
  narrative: [
    {
      heading: "四个岩石 + 四个气巨 + 一个冰储藏室",
      body: [
        "太阳系内圈是水星、金星、地球、火星四颗岩石行星，它们的轨道全部挤在 1.5 AU 以内。外圈是木星、土星、天王星、海王星四颗气体/冰巨星，分布在 5 到 30 AU。这种「内小外大」的结构跟我们目前找到的大多数系外行星系统并不一致 — 太阳系反而是个少数派。",
        "在内外行星之间，是 2.2 到 3.2 AU 的主小行星带：~10⁶ 颗大于 1 km 的小行星，总质量只有月球的 4%。海王星外是 Kuiper 带：~10⁵ 颗冰质天体在 30 到 50 AU 范围内，Pluto 是它最大的常驻成员。",
        "这种结构是太阳系形成历史的「冻结快照」。经典核心吸积模型 (Pollack et al. 1996) 认为：岩石行星在雪线 (~3 AU) 以内由硅酸盐和金属颗粒逐级碰撞长成；木星和土星在雪线外先凝聚 ~10 M⊕ 的固态核心，再在核心引力足够强时快速吸积周围气体 (runaway gas accretion)；天王星和海王星因为形成更慢、气体盘已消散，只保留了厚冰壳包着岩核的结构。但 KEPLER 和 TESS 的系外行星统计显示，super-Earth (1–4 R⊕) 和 mini-Neptune (4–10 R⊕) 在 0.05–1 AU 范围内极为常见——这类行星在太阳系里完全没有。这暗示太阳系的形成历史可能受到了木星「大迁徙」(Grand Tack) 的特殊影响，把内系统的 super-Earth 原料清空或推到了外系统。",
      ],
    },
    {
      heading: "为什么这张图用对数刻度",
      body: [
        "地球轨道半径是水星的 2.5 倍，但海王星轨道是地球的 30 倍。如果按线性刻度画 0–30 AU 的太阳系，内行星会全部挤在最里面 1/30 的位置变成噪点。这张图把径向距离做了对数变换 (r_scene = 0.10 + 0.85 · log(1+r_AU) / log(51))，让 Mercury (0.39 AU) 与 Neptune (30 AU) 都能在同一张图上读出位置。",
        "代价是「轨道速度直觉」失真 — 真实的太阳系里 Mercury 一年绕日一圈，Neptune 要 165 年。视觉化是为了结构识别，不是为了做天体力学。",
        "对数刻度还揭示了一个有趣的规律：Bode-Titius 法则 (1766) 注意到行星轨道间距近似等比级数 (a_n ≈ 0.4 + 0.3 × 2^n AU)。在对数轴上，这对应等距排列。虽然这更多是巧合而非物理定律 (Laskar 2008 证明了它在动力学上不是必然)，但它确实反映了行星形成过程中引力共振清空间隙的统计倾向。小行星带的 Kirkwood 空隙 (在木星 3:1、5:2、2:1 共振处) 和 Kuiper 带的冥族 (Plutinos，在海王星 3:2 共振处) 都是共振雕刻结构的直接证据——对数图上这些共振间距看起来像均匀的刻度线。",
      ],
    },
    {
      heading: "Pluto 的「被开除」",
      body: [
        "2006 年 IAU 把 Pluto 从「行星」改判为「矮行星」，主要理由是 Pluto 还没「清除其轨道附近的其它天体」(criterion #3) — 它和 Kuiper 带其他天体共享轨道空间。同一次决议把 Eris 也排除了，因为 Eris (2005 发现) 比 Pluto 还重，再不画规则的话太阳系行星会越发现越多。",
        "2015 年 New Horizons 飞掠 Pluto，把它从「一个像素的远点」变成了一颗有冰盖、氮气大气和心形 Tombaugh Regio 的真实世界。它仍然不是行星，但毫无疑问是太阳系最有故事的天体之一。",
        "关于「行星」定义的争论至今未息。Stern & Levison (2002) 提出的「流体静力学平衡」标准把 ~100 个天体划入行星；IAU 的「清除轨道」标准更严格，只留 8 个。两种标准反映了不同的科学哲学：前者强调天体本身的物理性质 (圆不圆)，后者强调天体与周围环境的动力学关系 (独不独)。New Horizons 的数据让 Pluto 的复杂性远超预期：Sputnik Planitia 是一个 ~1000 km 宽的氮冰盆地，对流速率 ~cm/yr 意味着 Pluto 表面地质活跃度堪比地球；大气层薄但分层清晰，有 ~20 层甲烷雾霾。2029 年 New Horizons 将飞越下一个 KBO 目标——届时 Pluto 的故事还将继续书写。",
      ],
    },
    {
      heading: "我们去过哪里",
      body: [
        "Voyager 1/2 是迄今走得最远的人造物 — Voyager 1 在 2012 年穿越了日球层顶 (heliopause)，技术上进入了星际空间，距离约 165 AU。Pioneer 10/11 早就停止通讯但仍在飞行。New Horizons (2015 Pluto / 2019 Arrokoth) 是 Kuiper 带的唯一访客。",
        "返回样本任务里，Hayabusa2 带回了 Ryugu (2020)，OSIRIS-REx 带回了 Bennu (2023)。无人着陆器到过水星、金星、火星、月球、Titan，但暂时还没有去过 Uranus / Neptune 的 orbiter — 1986 (U) / 1989 (N) 之后这两个行星再没人靠近。",
        "2023 年是太阳系探索的丰收年：OSIRIS-REx 把 ~121 g 的 Bennu 样品带回地球，发现其含水量和有机物含量超出预期；Jupiter Icy Moons Explorer (JUICE, ESA) 在 4 月发射前往木星系统；Europa Clipper (NASA) 在 2024 年 10 月发射。中国的天问二号 (2025 发射) 将访问近地小行星 Kamoʻoalewa 并返回样品。但最令人遗憾的空白仍然是天王星和海王星：2023 年行星科学十年调查 (Decadal Survey) 把「Uranus Orbiter and Probe」列为最高优先级旗舰任务，如果资金到位将在 2030 年代发射、2040 年代抵达。在那之前，我们关于冰巨星的认知仍停留在 Voyager 2 单次飞掠的 ~6 小时数据上。",
      ],
    },
    {
      heading: "Nice 模型 · 行星挪过位置",
      body: [
        "太阳系不是从一开始就长这样。Nice 模型 (Tsiganis 等 2005, 因法国尼斯天文台得名) 给出一个戏剧性的剧本：太阳系诞生头几亿年里，木星—土星陷入 2:1 平运动共振，引力踢动让海王星和天王星向外迁移，海王星甚至跑到了天王星之外（早期它们的顺序可能是反的）。这场轨道大洗牌把残余 Kuiper 带砸入内系统，引发约 39 亿年前的「晚期重轰炸 (LHB)」，月球上多数大型撞击盆地的年龄都聚集在这个时刻。",
        "改进版「Grand Tack」(Walsh 2011) 进一步提出木星在还没远迁之前先朝太阳俯冲到 ~1.5 AU 再被土星拽回 —— 这能解释为什么火星比理论预测的小，也能解释主小行星带的双族群混合 (C 型外族 + S 型内族)。这些模型把行星科学从「初始条件直接演化」推到了「轨道剧情可以颠覆」的认识。",
        "Nice 模型的核心预言是 LHB——月球样品的放射性同位素年代学 (Tera et al. 1974, Turner 1977) 确实显示 Apollo 样品中 ~3.9 Gyr 前的撞击年龄集中。但最新质疑也在积累：Boehnke & Bell (2016) 指出样品可能受到月球本身的地质改造 (退火效应)，真实年龄分布可能更宽。如果 LHB 不是尖锐的「轰炸」而是更平缓的「持续轰击」，Nice 模型中木星-土星共振的时间就需要调整。另一个挑战来自系外行星统计：热木星 (hot Jupiters) 和逆行轨道的巨行星暗示巨行星迁移在宇宙中非常普遍，但迁移路径多种多样——太阳系的 Nice/Grand Tack 剧本可能不是唯一解，而是众多可能性中的一个特定实现。",
      ],
    },
    {
      heading: "卫星海洋 · 太阳系里隐藏的水体",
      body: [
        "把视线从行星本身挪到外行星卫星，会发现一连串「冰壳下藏着海」的世界。Europa (木卫二) 表层下 ~15 km 的冰层下有一层 ~100 km 深的液态咸水海，总水量约地球的两倍 (Galileo 磁感应 1998)。Enceladus (土卫二) 南极喷出富含 H₂、有机分子和硅酸盐颗粒的羽流 (Cassini 2014)，直接指向一个能维持热液活动的全球海洋。",
        "Titan (土卫六) 是太阳系唯一拥有稠密氮气大气并在地表稳定有液体的卫星 —— 不过那是甲烷和乙烷的液体湖。冰壳下也有水海。Triton (海王星卫一) 的逆行轨道暗示它原本是被海王星俘获的 Kuiper 带天体，Voyager 2 在 1989 拍到它表面的氮气间歇泉。这些海洋世界是寻找太阳系内地外生命的首要目标 ——「Europa Clipper」(NASA 2024 发射) 与「JUICE」(ESA 2023 发射) 是当前最大两笔投入。",
        "Enceladus 的羽流分析 (Postberg et al. 2018, Nature) 发现了 > 2 nm 的硅酸盐纳米颗粒，只有在 > 90°C 的碱性热液喷口才能形成——这是除地球外第一个直接的热液活动证据。H₂ 的存在 (Waite et al. 2017, Science) 意味着海底可能正在进行蛇纹石化反应产氢，这在地球上支撑了不依赖阳光的深海微生物群落。Europa Clipper 将在 2030 年代用 ~50 次飞掠 (最近距 25 km) 详细测量冰壳厚度、海洋盐度和磁场响应。如果在 Enceladus 的羽流或 Europa 的冰壳裂缝中检测到氨基酸或脂质分子，那将不仅是天体生物学的里程碑，更将回答一个自古以来的问题：生命是地球的专利，还是宇宙的常态？",
      ],
    },
    {
      heading: "Enceladus 海洋化学：生命原料的清单在拉长",
      body: [
        "2023 年 Postberg et al. (Nature) 在 Cassini 宇宙尘分析器 (CDA) 数据中做出了关键突破：在 Enceladus 羽流冰粒中检测到了磷酸钠 (Na₃PO₄) 的质谱信号——这是首次在地球外的海洋中直接探测到磷元素。磷是 DNA、RNA、ATP 和细胞膜磷脂的关键组成元素，在此前的所有 Enceladus 海洋化学模型中都是最不确定的变量。这个发现意味着 Enceladus 的海洋拥有生命所需的全部六种关键元素 (C、H、N、O、S、P)——CHNOPS 在碱性热液环境中同时可用，这是天体生物学上的一道分水岭。",
        "更早的 Cassini 数据已经确认了 Enceladus 羽流中的 H₂ (Waite et al. 2017)、CO₂、CH₄、复杂有机分子 (Postberg et al. 2018b，分子量 > 200 Da)、和硅酸盐纳米颗粒 (Hsu et al. 2015)。H₂ 的存在意味着海底正在进行蛇纹石化反应 (serpentinization)：橄榄石 + 水 → 蛇纹石 + H₂，这是地球上深海热液生态系统 (不依赖阳光) 的能量来源。如果 Enceladus 海底有类似黑烟囱的热液喷口，它们的温度可能在 90–200°C 之间 (硅酸盐纳米颗粒的形成温度约束)，化学环境可能类似地球太古宙的海洋——恰好是生命可能起源的条件。Cassini 已于 2017 年坠入土星大气，但它的数据仍在产出新发现。下一个 Enceladus 探测任务尚未立项，但 Decadal Survey 2023 把「Enceladus orbilander」列为 New Frontiers 级别的候选——如果它被选中，将在 2040 年代直接采样羽流并寻找生物标志物。",
      ],
    },
    {
      heading: "天王星与海王星：被遗忘的冰巨星",
      body: [
        "自 1986 年 (Voyager 2 飞掠天王星) 和 1989 年 (Voyager 2 飞掠海王星) 以来，人类再没有派探测器靠近过这两颗冰巨星。2023 年 National Academies 的行星科学十年调查 (Origins, Worlds, and Life) 把「Uranus Orbiter and Probe (UOP)」列为最高优先级旗舰任务——这是自 1970 年代以来冰巨星首次获得这样的地位。UOP 计划在 2030 年代发射 (如果 NASA 按计划拨款)，2040 年代抵达天王星系统，进行轨道环绕 + 大气探针的组合探测。",
        "为什么天王星如此重要？Voyager 2 的 6 小时飞掠只覆盖了天王星的一侧，发现了令人困惑的低热流 (几乎没有内部热源) 和异常倾斜的磁场 (磁轴偏移自转轴 59°)。哈勃望远镜的长期监测 (1990s–2024) 发现天王星的大气季节性变化比预期剧烈得多——它的 84 年公转周期意味着「季节」持续 21 年，而 Voyager 2 刚好赶上了南半球夏至的特殊视角。JWST 在 2023 年拍摄的天王星红外图像 (Hammel et al. 2023) 揭示了前所未见的大气环流细节：亮白色的极冠、暗色的风暴带、和环系统的红外散射。天王星和海王星的内部结构也存在根本性的未解问题：它们是「冰巨星」(水、氨、甲烷的超临界流体层 > 10 000 km 厚) 还是「岩石巨核 + 稀薄气体层」？钻石雨 (diamond rain) 在高温高压下是否真的发生？这些问题只有轨道器才能回答。UOP 的成功将填补太阳系探索地图上最大的空白。",
      ],
    },
    {
      heading: "最新发现：Enceladus 磷检出与 Europa Clipper 起航",
      body: [
        "2023 年 Postberg et al. (Nature) 在 Cassini 宇宙尘分析器 (CDA) 存档数据中做出了突破性发现：在 Enceladus 羽流冰粒中检测到磷酸钠 (Na₃PO₄) 的质谱信号——这是首次在地球外的液态水体中直接探测到磷元素。磷是 DNA、RNA、ATP 和细胞膜磷脂的关键组成元素，在此前所有 Enceladus 海洋化学模型中都是最不确定的变量。这个发现意味着 Enceladus 的海洋拥有生命所需的全部六种关键元素 (C、H、N、O、S、P)——CHNOPS 在碱性热液环境中同时可用，这是天体生物学上的一道分水岭。Cassini 已于 2017 年坠入土星大气，但它的数据仍在产出新发现——这证明了长期存档数据的科学价值。",
        "2024 年 10 月 14 日，NASA Europa Clipper 搭载 SpaceX Falcon Heavy 从肯尼迪航天中心成功发射，开始了前往木星系统的 6 年巡航 (预计 2030 年 4 月抵达)。这是 NASA 有史以来建造的最大的行星探测器：太阳能电池板展开后跨度 30.5 m，质量 6065 kg，携带 9 台科学仪器。它将在木星系统中进行 ~49 次 Europa 飞掠 (最近距 25 km)，用冰穿透雷达 (REASON) 测量冰壳厚度和结构，用磁力计 (ICEMAG) 约束海洋盐度和深度，用红外光谱仪 (MISE) 和紫外光谱仪 (Europa-UVS) 分析冰壳表面的非冰成分，用尘埃分析仪 (SUDA) 直接采样可能的冰壳喷出物。如果 Europa 存在与海底热液活动相关的化学信号，Clipper 有能力在冰壳表面的裂缝和暗斑区域检测到。Clipper 与 ESA JUICE (2023 年发射，2031 年抵达) 将在 2030 年代形成对木星冰卫星的协同探测——JUICE 侧重 Ganymede 的轨道环绕，Clipper 侧重 Europa 的多次飞掠。",
      ],
    },
  ],
  sources: [
    {
      label: "NASA Planetary Fact Sheet",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
      kind: "agency",
    },
    {
      label: "IAU Resolution B5 (2006) — Definition of a planet",
      url: "https://www.iau.org/static/resolutions/Resolution_GA26-5-6.pdf",
      kind: "agency",
    },
    {
      label: "Bouvier & Wadhwa 2010 — Age of the solar system",
      url: "https://www.nature.com/articles/ngeo941",
      kind: "paper",
    },
    {
      label: "JPL Horizons system",
      url: "https://ssd.jpl.nasa.gov/horizons/",
      kind: "agency",
    },
    {
      label: "Tsiganis et al. 2005 — Origin of the orbital architecture (Nice model)",
      url: "https://www.nature.com/articles/nature03539",
      kind: "paper",
    },
    {
      label: "Walsh et al. 2011 — Grand Tack scenario",
      url: "https://www.nature.com/articles/nature10201",
      kind: "paper",
    },
    {
      label: "Hsu et al. 2015 — Hydrothermal activity at Enceladus",
      url: "https://www.nature.com/articles/nature14262",
      kind: "paper",
    },
    {
      label: "Postberg et al. 2018 — Nanosilica in Enceladus plumes",
      url: "https://www.nature.com/articles/s41586-018-0249-8",
      kind: "paper",
    },
    {
      label: "Waite et al. 2017 — H₂ in Enceladus ocean",
      url: "https://www.science.org/doi/10.1126/science.aai8703",
      kind: "paper",
    },
    {
      label: "National Academies 2023 — Origins, Worlds, and Life Decadal Survey",
      url: "https://nap.nationalacademies.org/catalog/26522",
      kind: "agency",
    },
    {
      label: "Postberg et al. 2023 — Phosphorus in Enceladus ocean (Nature)",
      url: "https://www.nature.com/articles/s41586-023-06646-x",
      kind: "paper",
    },
    {
      label: "Hammel et al. 2023 — JWST imaging of Uranus",
      url: "https://arxiv.org/abs/2312.15349",
      kind: "paper",
    },
    {
      label: "NASA Europa Clipper Mission (2024 launch)",
      url: "https://europa.nasa.gov/",
      kind: "agency",
    },
  ],
  // Marker positions match orbitPos(a, phase, incl) from Tier6Scene; the
  // log-warp + phase angles are fixed so positions are deterministic.
  markers: [
    {
      id: "sun",
      name: { primary: "太阳", latin: "Sol" },
      position: [0, 0, 0],
      description:
        "G2V 主序星，半径 6.96 × 10⁸ m，光度 3.83 × 10²⁶ W。占太阳系总质量 99.86%。下一档 T7 是它的第三颗行星。",
      data: [
        { label: "质量", value: "1.989 × 10³⁰ kg" },
        { label: "半径", value: "696 000 km" },
        { label: "下钻", value: "T7" },
      ],
      color: "#fff3c4",
      size: 0.034,
    },
    {
      id: "earth",
      name: { primary: "地球", latin: "Earth" },
      position: [-0.234, 0, -0.088],
      description:
        "太阳系唯一已知拥有液态水海洋与生物圈的行星，轨道半径 1.000 AU。它是 T7 的主角。",
      data: [
        { label: "轨道半径", value: "1.000 AU" },
        { label: "公转周期", value: "365.25 d" },
        { label: "下钻", value: "T7" },
      ],
      color: "#6ab0f7",
      size: 0.028,
    },
    {
      id: "asteroid-belt",
      name: { primary: "主小行星带", latin: "Asteroid Belt" },
      position: [0.383, 0, 0],
      description:
        "Mars 与 Jupiter 之间 2.2–3.2 AU 的小天体集合。总质量约月球的 4%，最大成员 Ceres (940 km，2006 起被归为矮行星)。Jupiter 的引力扰动抑制了这里成行的过程，留下了一带未完成的行星砖块。",
      data: [
        { label: "范围", value: "2.2 – 3.2 AU" },
        { label: "已知 > 1 km", value: "~10⁶ 颗" },
        { label: "总质量", value: "~4% 月球" },
      ],
      color: "#b9a482",
      size: 0.022,
    },
    {
      id: "jupiter",
      name: { primary: "木星", latin: "Jupiter" },
      position: [0.327, 0.003, 0.372],
      description:
        "最大的行星，质量是其余 7 颗行星总和的 2.5 倍。强引力扫除了太阳系内圈大部分残骸 (包括压制小行星带成行)，被视为内行星的「守门员」。已知至少 95 颗卫星，Galileo 1610 发现的四颗 (Io, Europa, Ganymede, Callisto) 至今仍是研究重点。",
      data: [
        { label: "轨道半径", value: "5.20 AU" },
        { label: "质量", value: "1.898 × 10²⁷ kg" },
        { label: "卫星", value: "≥ 95" },
      ],
      color: "#d6a87a",
      size: 0.04,
    },
    {
      id: "saturn",
      name: { primary: "土星", latin: "Saturn" },
      position: [-0.523, 0.005, 0.314],
      description:
        "次大的行星，最显著的环系：主环跨越 7000 – 80000 km 厚度仅 ~10 m，由 99% 水冰组成。Cassini–Huygens (2004–2017) 把它从望远镜里的小点变成了拥有 145+ 颗卫星 (含 Titan、Enceladus) 的复杂系统。",
      data: [
        { label: "轨道半径", value: "9.58 AU" },
        { label: "环范围", value: "67k – 480k km" },
        { label: "卫星", value: "≥ 145" },
      ],
      color: "#e3c590",
      size: 0.036,
    },
    {
      id: "pluto",
      name: { primary: "冥王星", latin: "Pluto" },
      position: [0.153, 0.104, 0.887],
      description:
        "Kuiper 带最大已知矮行星 (半径 1188 km)。轨道倾角 17°、偏心率 0.25，所以在这张图里它明显抬出黄道面。2015 年 New Horizons 飞掠拍到了它的氮冰平原、心形 Tombaugh Regio 与氮气大气。",
      data: [
        { label: "轨道半径", value: "39.48 AU" },
        { label: "倾角", value: "17.2°" },
        { label: "飞掠任务", value: "New Horizons 2015" },
      ],
      color: "#d2b58a",
      size: 0.018,
    },
    {
      id: "europa",
      name: { primary: "木卫二 · 欧罗巴", latin: "Europa" },
      // Co-located with Jupiter marker but slight offset so hover doesn't collide.
      position: [0.335, 0.022, 0.395],
      description:
        "木星第六颗已知卫星，半径 1561 km（略小于月球）。表层 ~15 km 冰壳之下，Galileo 探测器 1998 用感生磁场推断存在一层 ~100 km 深的液态咸水海，总水量约地球两倍。NASA Europa Clipper 2024 年发射，将在 2030 年抵达进行 50+ 次飞掠。它是太阳系内寻找地外生命的首要目标。",
      data: [
        { label: "海洋深度", value: "~100 km" },
        { label: "总水量", value: "~2× 地球" },
        { label: "探测", value: "Clipper (2024 发射)" },
      ],
      color: "#cee0ff",
      size: 0.02,
    },
    {
      id: "voyager-1",
      name: { primary: "旅行者 1 号", latin: "Voyager 1 · Interstellar" },
      // Beyond Pluto's marker, at scene edge to signal interstellar departure.
      // Real Voyager 1 distance ≈ 165 AU → rScene(165) ≈ 0.97
      position: [0.95, 0.05, 0.18],
      description:
        "迄今走得最远的人造物，发射于 1977 年。2012 年 8 月 25 日穿越日球层顶 (heliopause) — 太阳风停止主导而星际介质接手的边界——技术上进入星际空间。当前距离 ~165 AU、以 17 km/s 飞行；它的金唱片携带了 1977 年地球的声音与影像，是人类有意识送出太阳系最远处的「漂流瓶」。",
      data: [
        { label: "当前距离", value: "~165 AU" },
        { label: "穿越 heliopause", value: "2012-08-25" },
        { label: "速度", value: "17 km/s" },
      ],
      color: "#aed4ff",
      size: 0.022,
    },
  ],
  discussionQuestions: [
    "太阳系的「内小外大」结构在系外行星中反而是少数派——这对我们理解太阳系的形成历史有什么启示？",
    "Enceladus 的海洋拥有生命所需的全部六种元素（CHNOPS）——如果在那里发现微生物，人类该如何应对？",
    "天王星和海王星自 1989 年以来再没有探测器访问——为什么冰巨星的探索如此滞后？",
  ],
};

export default content;

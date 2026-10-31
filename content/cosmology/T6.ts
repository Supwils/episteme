import type { TierContent } from "./types";

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
    {
      label: "奥尔特云成员估计",
      latinLabel: "Oort cloud population",
      value: "依尺寸下限与模型",
      hint: "由彗星等线索推断；不是已逐颗编目的人口普查",
    },
    {
      label: "主小行星带总质量",
      latinLabel: "Asteroid belt mass",
      value: "远小于月球",
      hint: "当前残余质量，不代表形成初期固体盘的总质量",
    },
    {
      label: "早期撞击史",
      latinLabel: "Bombardment history",
      value: "峰值与时间仍有争论",
      hint: "月样品年代与选样共同约束；不是Nice模型必然唯一时间表",
    },
    {
      label: "水的来源线索",
      latinLabel: "Isotopic tracers",
      value: "D/H等同位素比",
      hint: "须联合来源分布、混合与动力学，单一匹配不是唯一来源证明",
    },
    {
      label: "土卫二磷酸盐",
      latinLabel: "Enceladus phosphates",
      value: "2023年发表检出",
      hint: "Cassini CDA盐富冰粒＋实验/地球化学推断；非生命检测",
    },
    {
      label: "Clipper计划飞掠",
      latinLabel: "Europa flybys",
      value: "49次",
      hint: "绕木星运行，多次近访Europa；抵达计划为2030年4月",
    },
    {
      label: "天王星探测优先级",
      latinLabel: "Uranus Orbiter and Probe",
      value: "十年战略首项新旗舰",
      hint: "2023–2032战略建议；不等于已经承诺发射日期",
    },
    {
      label: "Clipper发射日期",
      latinLabel: "Launch date",
      value: "2024-10-14",
      hint: "Falcon Heavy；9台科学仪器，另含无线电重力调查",
    },
  ],
  narrative: [
    {
      heading: "四个岩石 + 两个气巨 + 两个冰巨",
      body: [
        "太阳系内圈是水星、金星、地球、火星四颗岩石行星，轨道半长轴约0.39–1.52 AU。外圈的木星、土星是气态巨行星，天王星、海王星归为冰巨行星，轨道半长轴约5–30 AU。这里的「冰巨」是组成分类，不表示它们内部全是固态冰。",
        "火星与木星之间分布着主小行星带。这张示意图取2.2–3.2 AU的一段环带代表它，没有画出全部轨道。海王星外的Kuiper带主体约在30–50 AU，此外还有更远的散射盘等族群；不能把图中每个点当作一颗已编目的天体。更远的Oort云是由长周期彗星等线索推断的近球状储库，外缘可能达到十万AU量级，尚未被直接拍成一张云的照片。",
        "核心吸积图景中，固体先成长为能继续吸积气体的核心，盘的供料与消散时间影响最后留下多少气体。水等物质的凝结温度随盘内压力和位置变化，雪线也会移动。因此今天内外行星的组成差异记录了温度、吸积和迁移共同作用，不能把冰巨行星简单画成厚固体冰壳包着岩核，更不能把当前结构视为从未变化的出生照片。",
        "为早期事件排序，陨石中的富钙铝包体提供重要的放射性时钟。Bouvier与Wadhwa2010对一个包体报告约4568.2百万年的铅同位素年龄；这应放回具体样品和校准方法，而不是把四位有效数字当作太阳点火、所有行星形成同时发生的瞬间。不同矿物记录的结晶、封闭与后续改造，还须彼此对照。",
      ],
    },
    {
      heading: "为什么这张图用对数刻度",
      body: [
        "地球轨道半长轴约为水星的2.6倍，海王星约为地球的30倍。按线性刻度同时放下内外行星，地球就会挤进最内侧的1/30。3D与手绘两版都用对数方式压缩轨道半长轴，给内行星留出阅读空间；各自采用不同的绘图半径，让Mercury（0.39 AU）与Neptune（约30 AU）能在同一画面被辨认。",
        "行星大小、轨道倾斜的竖向幅度和相位也为可读性做了处理；画面缓慢转动是在展示布局，没有按真实公转周期播放。真实水星约88个地球日绕日一圈，海王星约165个地球年一圈。屏幕上的间距、角度与转速都不能直接拿来做天体力学测量。",
        "图上能认出的结构，还包括被共振塑造的族群：小行星带中某些周期比附近出现Kirkwood空隙，Pluto则是海王星3:2共振成员。共振角的振荡、交会几何与长期稳定性共同决定轨道怎样演化；它并不是把所有轨道排成统一等比数列的普遍定律。对数刻度帮助看清位置，动力学判断仍需回到真实距离和周期。",
      ],
    },
    {
      heading: "Pluto 的重新分类",
      body: [
        "2006年IAU把Pluto归为矮行星。定义除要求绕太阳运行、依靠自身引力接近圆球外，还要求行星在轨道邻域占据动力学主导地位。这里的「清除邻域」不等于轨道里一颗小天体也没有。Pluto属于海王星外小天体族群；Eris等相近世界的发现促使天文学家重新讨论分类边界。",
        "2015年7月14日New Horizons飞掠Pluto，拍到了氮冰平原、稀薄大气和心形Tombaugh Regio。改变分类不会改变这颗世界的复杂性。IAU目前承认Ceres、Pluto、Haumea、Makemake与Eris五个矮行星，另有候选者；「五个」是已获承认的名单，不是太阳系矮行星的最终总数。",
        "分类方式决定我们比较什么：绕太阳的动力学地位，与天体自身是否近似圆球、具有何种地质，回答的是不同问题。New Horizons展示的氮冰对流、山地与雾霾，使Pluto成为研究低温世界的重要样本；地质复杂并不自动改变现行IAU分类，也不能仅凭一项活动速度与地球的整体地质活跃度作高下比较。",
      ],
    },
    {
      heading: "我们去过哪里",
      body: [
        "Voyager 1于1977年发射，是飞得最远的人造物。团队结合粒子、磁场和等离子体波数据，把它跨越日球层顶的日期确定为2012年8月25日，当时距太阳约122 AU。这是太阳风主导环境与周围星际介质的边界，不是太阳引力的终点；进入星际空间也不等于已穿过远得多的Oort云。",
        "New Horizons先后飞掠Pluto（2015）与Arrokoth（2019）；Hayabusa2在2020年送回Ryugu样本，OSIRIS-REx在2023年送回Bennu样本。无人探测器曾在金星、火星、月球和Titan等天体软着陆，水星则经历了飞掠与绕轨探测，尚无软着陆器。Voyager 2在1986年飞掠天王星、1989年飞掠海王星，仍是唯一近访这两颗行星的探测器。",
        "探索也包含取样而非仅仅飞得更远。返回地面的样品能够用不同实验室的方法重复分析，仪器灵敏度提高后还可重查旧材料；远程光谱与原位测量则给出样品以外的全球背景。把两者结合，才能判断一块陨石或一个取样点在整个母体中是否具有代表性。",
      ],
    },
    {
      heading: "Nice 与 Grand Tack · 迁移的两种阶段",
      body: [
        "今天的轨道未必就是巨行星出生时的轨道。Tsiganis等人在2005年提出的Nice模型，让巨行星与残余小天体盘交换能量和角动量；在其模拟中，木星与土星越过周期比2:1的共振后，行星轨道发生重排，产生接近今天的半长轴、偏心率和相互倾角。这是受观测约束的动力学模型，具体初始布局、迁移时刻与撞击史仍需检验。",
        "Walsh等人2011年的Grand Tack研究更早的气体盘阶段：模型中的木星先向内迁至约1.5 AU，再与土星共同向外迁移，截短内侧固体盘，帮助解释火星质量偏小及小行星带的成分混合。它与Nice讨论的阶段和迁移机制不同。某次模拟能重现今天的结构，不代表太阳系一定按那一个剧本演过；更不能据此断言所有大型月盆都形成于同一场晚期轰炸。",
        "早期月球撞击是否出现短而尖锐的高峰，是另一道需要年代学和动力学共同回答的问题。样品可能来自同一盆地的抛射物，也可能被后续撞击加热重置时钟。确认迁移机制、确定迁移发生的时间，以及解释每座撞击盆地的年龄，并不是同一个检验；模型需要同时满足多个独立约束。",
      ],
    },
    {
      heading: "卫星海洋 · 冰下的水仍在被测量",
      body: [
        "Galileo测到Europa附近的感生磁场，是地下导电咸水层的重要证据，但没有直接量出一层精确100 km深的海。结构模型常给出约60–150 km的海洋深度。NASA于2026年公布的Juno微波结果，在已观测区域用纯水冰模型估计冷硬导热层约29 km；盐分或下方对流层会改变对总冰壳厚度的解释。Enceladus羽流中的微小二氧化硅颗粒与分子氢则支持海底水岩反应和热液活动；相关分析并非都来自一次2014年观测，也不是发现生命的证明。",
        "Titan的稠密大气以氮气为主，地面湖海主要是甲烷和乙烷。它是否拥有全球地下水海仍有争论：2025年Cassini数据重分析提出冰泥层与局部液水袋的替代解释。寻找宜居环境需要继续测量。Europa Clipper于2024年10月14日发射；截至2026年10月的NASA计划，是2030年4月抵达木星、绕木星运行并49次近距离飞掠Europa。它要判断潜在宜居条件，不是直接去Europa着陆或宣布生命已经存在。",
        "对冰下世界而言，海洋存在、长期能源、可利用化学物质与实际生命是不同层次的证据。羽流让内部物质能够抵达太空，便于探测器取样，却也会在上升、沸腾、冻结与撞击过程中改变成分比例。地表裂缝中的物质又可能受辐射改造；从样品回推海洋，必须保留运输过程和仪器响应这两层解释。",
      ],
    },
    {
      heading: "Enceladus海洋化学：从一颗冰粒到内部环境",
      body: [
        "Postberg等2023在Cassini宇宙尘分析器的存档中识别出含磷酸盐的盐富冰粒。研究使用了土星E环中来自Enceladus喷流的颗粒，并与实验室质谱比较，支持其中存在不同形式的钠磷酸盐。仪器实际接触的是飞过探测器的冰粒，海洋中的正磷酸盐供应量则需要结合喷流来源和地球化学解释。",
        "这些结果为生命化学所需的磷提供了重要线索，却没有显示每一颗冰粒都代表均匀的全球海水。颗粒类型、富集过程、海水碱度和碳酸盐平衡，都会影响由颗粒反推的浓度。论文中的实验和模型允许磷酸盐在寒冷海底或中温热液环境中保持较高可溶性，因而磷检出本身不是唯一确定热液温度的温度计。",
        "其他线索来自不同仪器和年代。Hsu等2015的纳米二氧化硅分析结合实验与输运模型，支持高温水岩反应；Waite等2017通过INMS测得喷流分子氢，认为持续水岩反应是很可能的来源。Postberg等2018研究的是大分子有机物。把硅颗粒、分子氢、有机物和磷酸盐并列，可以检验能源与原料是否兼容，但有机分子和可用能量都不是生物存在的充分条件。",
        "未来如何寻找生命，还须设计能区分生物与非生物解释的测量。《2023–2032行星科学十年战略》把Enceladus Orbilander列为第二优先的新旗舰任务；另列的New Frontiers主题则包括多次飞掠Enceladus。任务级别、建议优先顺序和实际立项不是同一件事，科学问题不能由一个尚未兑现的发射年份来回答。",
      ],
    },
    {
      heading: "天王星与海王星：内部结构仍待拼合",
      body: [
        "Voyager 2仍是唯一近访两颗冰巨行星的探测器，分别在1986和1989年飞掠。一次飞掠提供的引力、磁场、粒子与成像数据极为珍贵，却不能覆盖完整轨道或各种太阳风状态。此后的地面、Hubble和JWST观测增加了季节、云层和环的信息，我们的认识并未停留在飞掠当天；长期绕轨测量仍可补上不同类型的空白。",
        "天王星的内部热流曾因早期误差范围而难以确定。Wang等2025结合观测与模型，重建一个公转周期的能量收支，得到0.078±0.018W/m²的内热通量估计。这里的全周期包含模型外推，并非已经连续观测完1946—2030的每一天；结果也采用辐射功率季节变化的假设。低热流与没有任何内部能量，不能视作同一个结论。",
        "质量与半径并不足以唯一给出内部水、岩石和氢氦的比例。Neuenschwander等2024一类结构研究显示，非绝热区域、自转周期与所采用的温度分布会改变组成推断。“冰巨”是约定的组成类别，不表示已直接看见一层固定厚度的固态冰。进一步测量引力场、磁场与大气成分，可以缩小这些相互牵连的模型空间。",
        "《2023–2032十年战略》因此将Uranus Orbiter and Probe列为最高优先的新旗舰建议，用长期轨道巡测与大气探针研究内部、大气、磁层和卫星环系。科学优先级说明问题有多重要，能否实施还取决于任务设计与资源。它不应被写成已经确定的2030年代发射、2040年代抵达承诺。",
      ],
    },
    {
      heading: "Europa Clipper：用互补仪器拼出海洋世界",
      body: [
        "Europa Clipper于2024年10月14日发射，截至2026年10月的NASA计划为2030年4月抵达木星，再通过49次近距离Europa飞掠开展调查。绕木星的大椭圆轨道让它能够反复收集不同位置的数据，并减少长期停留在Europa附近强辐射环境的时间。它研究的是潜在宜居条件，机上没有专门用于直接寻找生命的仪器。",
        "雷达REASON探查冰壳内部结构；磁力计ECM与等离子体仪PIMS共同区分环境扰动和感生磁场；无线电重力调查则提供另一种内部结构约束。不同技术对冰壳、海洋厚度和导电性的敏感性不同，联合分析比把某一种仪器当作可直接量出所有参数的尺子更有约束力。",
        "MISE用红外光谱绘制冰、盐与有机物等分布，Europa-UVS研究紫外波段的表面和稀薄大气线索；MASPEX分析气体，SUDA分析尘粒。采到的尘埃既可能来自微小撞击抛射的表面物质，也可能涉及喷流，不能先假定全部直通海底。器件、取样位置与辐射加工历史，都会影响化学解释。",
        "ESA的Juice则计划在2031年抵达木星系统，最终于2034年末进入Ganymede轨道。它与Clipper通过不同目标与观测方式提供比较：为什么同在木星系统，有些卫星可能保有深海、不同冰壳和磁场？回答需要把各世界作为物理系统比较，而不是仅把“有水”当作相同环境的标签。",
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
    {
      label: "Bouvier与Wadhwa2010 · 特定CAI的Pb–Pb年龄",
      url: "https://www.nature.com/articles/ngeo941",
      kind: "paper",
    },
    {
      label: "Hsu等2015 · 纳米硅颗粒与热液反应",
      url: "https://pubmed.ncbi.nlm.nih.gov/25762281/",
      kind: "paper",
    },
    {
      label: "Waite等2017 · Enceladus喷流分子氢",
      url: "https://pubmed.ncbi.nlm.nih.gov/28408597/",
      kind: "paper",
    },
    {
      label: "Postberg等2018 · Enceladus大分子有机物",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6027964/",
      kind: "paper",
    },
    {
      label: "Postberg等2023 · Enceladus来源磷酸盐",
      url: "https://www.nature.com/articles/s41586-023-05987-9",
      kind: "paper",
    },
    {
      label: "NASA2023 · E环冰粒、磷酸盐与海洋推断",
      url: "https://www.nasa.gov/missions/cassini/nasa-cassini-data-reveals-building-block-for-life-in-enceladus-ocean/",
      kind: "agency",
    },
    {
      label: "National Academies · 2023–2032十年战略任务优先级",
      url: "https://nap.nationalacademies.org/resource/26522/interactive/",
      kind: "agency",
    },
    {
      label: "Wang等2025 · 天王星内部热流与季节能量收支",
      url: "https://ntrs.nasa.gov/citations/20250009573",
      kind: "paper",
    },
    {
      label: "Neuenschwander等2024 · 天王星复杂内部结构模型",
      url: "https://arxiv.org/abs/2401.11769",
      kind: "paper",
    },
    {
      label: "NASA · Europa Clipper科学仪器与互补测量",
      url: "https://science.nasa.gov/mission/europa-clipper/spacecraft-instruments/",
      kind: "agency",
    },
    {
      label: "ESA · Juice的冰卫星比较与Ganymede轨道计划",
      url: "https://www.esa.int/Science_Exploration/Space_Science/Juice/The_moons_of_Jupiter_What_will_Juice_discover",
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
  discussionQuestions: [
    "巨行星迁移的模型怎样同时接受轨道、小天体分布和撞击年代的检验？",
    "从Enceladus喷流中的化学物质推回海洋，再讨论生命，分别还缺哪些证据？",
    "为什么冰巨行星的一次飞掠、长期遥测与未来绕轨任务各自提供不同信息？",
  ],
};

export default content;

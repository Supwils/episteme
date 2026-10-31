import type { TierContent } from "./types";

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
    {
      label: "地磁发电机",
      latinLabel: "Geodynamo",
      value: "液态外核中的导电流体",
      hint: "对流、旋转与磁场耦合；地表磁场随地点和时间变化",
    },
    {
      label: "板块运动",
      latinLabel: "Plate motions",
      value: "通常每年数厘米",
      hint: "速率与方向依板块边界及参考框架，GNSS可直接测量",
    },
    {
      label: "Mauna Loa年度CO₂",
      latinLabel: "Atmospheric CO₂",
      value: "427.35 ppm（2025）",
      hint: "NOAA 2026-10-09数据版；干空气年均摩尔分数，非全球即时值",
    },
    {
      label: "海表平均pH量级",
      latinLabel: "Surface ocean pH",
      value: "约8.1",
      hint: "NOAA通俗概览；空间、深度与季节变化不能由单值替代",
    },
    {
      label: "已确认地外生物圈",
      latinLabel: "Confirmed extraterrestrial biospheres",
      value: "尚无",
      hint: "潜在宜居轨道、吸收分子与实际生命检测是不同证据",
    },
    {
      label: "Laschamp地磁漂移",
      latinLabel: "Laschamp excursion",
      value: "约4.1万年前",
      hint: "短暂大幅偏离后恢复；与最近完整极性反转有别",
    },
    {
      label: "内核相对转动",
      latinLabel: "Inner-core motion",
      value: "时间变化与解释仍在研究",
      hint: "以地幔为参考；差速与局部结构变化需共同检验",
    },
    {
      label: "最内内核",
      latinLabel: "Innermost inner core",
      value: "各向异性分区的模型",
      hint: "Pham/Tkalčić2023；中心数百公里，过渡深度仍待约束",
    },
  ],
  narrative: [
    {
      heading: "薄到不可思议的家",
      body: [
        "把海洋、大气和浅层岩石放在一起看，生命活跃的近地表环境相对约6378 km的地球半径十分薄。海洋平均深度只有几千米，日常天气主要发生在十几千米厚的对流层。但平均海深和对流层顶并不是生命的严格上下界，深部岩石圈中也存在微生物，它们各自记录不同的生态环境。",
        "从苹果果皮到地球表层，这个比喻帮助我们感受脆弱，却不能取代生态系统的深度分布。直径约1.28万km的这颗行星，容纳了目前唯一已确认的生物圈；生命与环境的交换还连着地下岩石、深海以及头顶的大气。",
        "这一环境还连接着更大的动力系统：太阳辐射驱动天气和海洋循环，内部热量与板块运动重塑大陆，生命又改变大气和岩石的化学。它们各有不同响应时间，突发磁暴、季节变化和百万年的地质演化因此不能只因同时发生就被归为同一种扰动。宜居性需要理解这些交换怎样相互作用。",
      ],
    },
    {
      heading: "大气是颜色，也是护盾",
      body: [
        "海洋并非只是在反射蓝天。水会较强吸收可见光中的红光，清洁海水返回的光因而偏蓝；悬浮颗粒与生物也会改变海色。大气中的Rayleigh散射则让短波长可见光更容易被散射，形成蓝天和地球边缘的蓝色光晕。本图把云层和大气光晕厚度夸张了，便于看见，并非等比例的高度剖面。",
        "氧和臭氧吸收全部太阳UV-C以及大部分UV-B，UV-A更容易到达地面；吸收程度随波长、太阳高度与臭氧总量变化。磁层则改变太阳风带电粒子的运动，日侧边界会随太阳风压力伸缩。空气、磁场和辐射防护各有作用，也没有一个绝对挡住所有粒子的硬壳。",
        "现代干空气的约21%氧气，是生物与地球化学长期共同作用的结果。大氧化事件记录了早期地表氧化状态的重要转变，光合作用的产氧、还原性气体与岩石的消耗、埋藏和再循环都参与其中。地球历史上氧含量并非单调上升，大气的“护盾”也不是在某一天一次建成的。",
      ],
    },
    {
      heading: "月球：潮汐相连的同伴",
      body: [
        "月球质量约为地球的1/81，在八大行星的卫星中，相对母行星而言很大。巨撞击是月球起源的主要模型：早期大天体与地球碰撞，抛出的物质参与成月。Hartmann与Davis在1975年讨论过这一路径；撞击者的性质、混合程度以及地月同位素相似性仍是研究问题。月球并非没有铁核，而是有一个相对较小的富铁核心。",
        "自Apollo时代以来的月球激光测距显示，当前地月平均距离每年增加约3.8 cm。地球自转、海洋潮汐和月球轨道之间交换角动量，同时耗散机械能；这个速度受海盆形状等条件影响，不能按常数倒推全部历史，也不能据此保证遥远未来一定达到某种最终锁定。",
        "巨撞击模型必须同时解释质量、角动量、月球相对较小的富铁核心与地月同位素关系。不同撞击几何、物质混合和凝结过程会产生不同预测；同位素接近是重要约束，却不单独测出撞击者从哪里来。月球影响潮汐及地球自转轴动力学，但复杂生命是否必须拥有类似月球的伴星，仍不是这个单一样本能够决定的问题。",
      ],
    },
    {
      heading: "我们离开过这里",
      body: [
        "1961年Gagarin首次进入地球轨道，1969年Apollo 11把人送到月面。Artemis I于2022年11月16日至12月11日完成无人试飞。2026年4月1日至10日，Artemis II的四人乘组完成载人绕月飞行，让人类在Apollo时代之后再次从月球附近回望家园。",
        "国际空间站自2000年起持续有人驻守，轨道高度约400 km。轨道飞行与亚轨道飞行不同：Crew Dragon可以执行绕地轨道任务，Blue Origin的New Shepard旅游飞行则是亚轨道往返。回望地球的视角取决于距离、视场和航迹，没有一个「超过600 km就一定看见完整地球圆盘」的通用门槛。",
        "从近地轨道到月球，飞行并不只在跨越距离。推进、往返航迹、辐射、热控与生命维持共同限制任务；远距离通信和无法立即返回又增加了操作难度。试飞、绕月与着陆检验不同的系统，已完成一项并不自动保证后续任务会按某个固定日期完成。",
      ],
    },
    {
      heading: "「淡蓝色圆点」",
      body: [
        "1990年2月14日，Voyager 1在距太阳约60亿公里处回望地球，拍下「淡蓝色圆点」。地球没有在图中铺开可辨认的大陆与海洋，而是落在散射阳光条纹中的微小亮点。拍摄距离的参考原点是太阳，不能把这个数无条件标成精确地月系统距离。",
        "Carl Sagan用这张照片提醒读者：我们熟悉的人与历史，全部发生在这个遥远视角下几乎无法分辨的世界。沿尺度阶梯走到这里，地图重新变成家园；这不是关于地球不重要的测量，而是把人与行星的关系放进了同一个视野。",
        "未分辨的点光源仍能携带颜色、光谱与随时间变化的信息。要分辨行星圆盘、检测行星总光，或寻找人造信号，需要的角分辨率、对比度与灵敏度各不相同。“看不清表面细节”并不等于没有可观测信息；射电、光学与其他波段的技术特征搜寻，也都属于电磁观测。",
      ],
    },
    {
      heading: "生物圈：唯一的样本",
      body: [
        "Drake方程把恒星、行星、生命与文明的若干条件相乘，但未知参数很多，不能把「一到百万个文明」写成观测给出的数量区间。寻找地外生命至今仍面对同一个事实：我们拥有的已确认生命样本只有地球。关于生命有多常见的推断，必须和已经探测到生命分开。",
        "环境变化也需要说明时间窗与基线。IPCC在2023年综合报告中评估，2011–2020年全球地表温度比1850–1900年约高1.1°C；这不是2026年的即时温度。1.5°C与2°C是相对同一工业化前基线的长期增温水平，风险随每一分增温增加。观测年代、统计窗口和情景假设共同决定了数字的含义，读懂它们才能把全球平均变化与当地生态风险联系起来。",
        "CO₂与海水酸化则需要另一套清楚的量。NOAA在2026年10月发布的数据表列Mauna Loa的2025干空气CO₂年均值为427.35ppm，这是一座背景站的年度统计。海表平均pH的概览量级约8.1；较工业化前下降约0.1，意味着氢离子活度按对数刻度增加，海水总体仍偏碱性。不同地点、深度和季节的化学环境并不相同。",
      ],
    },
    {
      heading: "地球内部 · 从地震波重建层次",
      body: [
        "直接钻探只进入地球很浅的一层，地震波是认识深部结构的关键证据，此外还结合重力、岩石化学、高压实验和物理模型。P波可在固体和液体中传播，体S波不能在普通液体中传播；反射、折射、波速变化与阴影区共同约束层界。Lehmann在1936年从P波记录推断外核之内还有性质不同的内核，不是直接拍到了一个固态铁球。",
        "现代模型给出内核半径约1221 km，主要为固态富铁合金；它外面的液态外核厚约2200–2300 km，导电流体运动维持地磁发电机。地幔厚约2900 km，总体为固态岩石，却能在地质时间中缓慢变形。岩石圈由地壳和上地幔最外部组成，不能等同于几十千米厚的地壳。内核温度为数千K且估计有差异；高压下的熔点改变解释了为何中心固态与外层液态可以并存。",
        "地震学还会比较“同一路径在不同时间怎样变化”。如果两次震源相近的地震产生的波形不再一致，原因可能涉及传播路径上的运动或局部结构演化。分辨这些解释，需要台站、震源位置、频带和参考模型的共同控制；一次波速变化并不是深处某个物体已经被直接拍到转动的录像。",
      ],
    },
    {
      heading: "板块、大氧化与人类影响",
      body: [
        "大陆漂移到板块构造的建立经历了几十年的证据积累。Vine与Matthews在1963年把海底磁异常条带、海底扩张与地磁反转联系起来，是其中的重要一环。Wilson循环描述洋盆开合及大陆聚散；不同洋盆的历史不同，超大陆重组也不是每5亿年必然敲响一次的钟表。地质灾变还需要分别讨论火山活动、气候和来自地外的撞击：大陆运动只是这部历史的一部分。",
        "约24亿年前的大氧化转变也不是「海里的铁一次氧化完，氧才涌入空气」的单步过程。Bekker等人2004年根据南非约23.2亿年前沉积物中的硫同位素等证据，论证当时大气已存在显著氧气；不同记录约束的是复杂转变的不同部分。至于「人类世」，IUGS与ICS在2024年批准否决将其立为正式地质年代单位的提案；这个词仍广泛用于描述人类对地球系统的影响。",
        "板块将风化、火山释放与俯冲回收连接到长期碳循环，但地表环境还受太阳演化、陆海分布、生命过程与大气组成影响。地球过去经历过极端气候，不能据今天有液态水便断言45亿年中始终保持同一状态。把地球与金星、火星比较，可以提出机制问题；各行星不同的质量、初始物质和演化，也使单一因素难以包办所有差异。",
      ],
    },
    {
      heading: "Laschamp地磁漂移：记录、机制与环境假说",
      body: [
        "地磁极性反转是长期主导方向发生改变，地磁漂移则是偏离后又恢复的短暂事件。约4.1万年前的Laschamp事件属于后者，晚于约78万年前的Brunhes–Matuyama完整反转。火山岩、沉积物与宇生核素各记录了磁场方向、强度或屏蔽变化的一部分，联合定年后才能比较事件的进程。",
        "Cooper等2021在Science利用新西兰古贝壳杉年轮建立大气放射性碳记录，并结合模型讨论磁场极弱与太阳活动低谷对臭氧和环流的潜在影响。年轮中的¹⁴C、岩石中的剩磁和冰芯中的宇生核素，不是同一种物理记录；核素浓度还受生产、输送和沉积条件影响，解释时需要相应校正。",
        "该研究进一步提出环境与人类史的广泛后果，但正式评论对其考古、古人类与灭绝记录的选取和因果联系提出了质疑。确认磁场曾显著减弱，与证明它导致某次物种灭绝，是两项证据要求不同的结论。跨领域比较还必须检查年代误差、空间对应和独立机制，不能仅凭时间接近就把事件串成确定的全球灾难链。",
        "今天的南大西洋异常区同样反映磁场的空间变化，却不是下一次反转的倒计时。USGS强调，单凭当前磁场状态预测反转极为困难；过去反转间隔也不规则。连续观测对卫星运行和地磁模型很有用，但没有一个再等十到二十年就必然能判定反转日期的门槛。",
      ],
    },
    {
      heading: "内核相对转动：比较同一路径的地震波",
      body: [
        "讨论内核“反转”，首先要说明参考系。Yang与Song2023研究重复地震的波形变化，提出内核相对地幔的差速转动在近年变化很小，并与约七十年的振荡图景联系起来。即使相对地幔的速率由正变负，也不表示内核在惯性空间里停止随地球自转、再改向反转。",
        "这类推断以结构能够被旋转带过相近射线路径为解释之一，参数受到震源分布、时间覆盖和内部非均匀性的影响。Wu等2026利用较长期地震序列，在两组路径上得到支持多十年差速变化的结果；Zhang与Wen2026则认为局部内核表面的时变结构，能够解释其研究的资料而无须整体差速。不同数据处理与物理解释仍需比较。",
        "因此，内核转动不能被写成已经确定的七十年机械钟。数年与多十年的日长、磁场信号也不应只因都有周期便直接合并为同一机制。电磁、引力与流体耦合提供可研究的联系，但若要证明共同原因，还需在频率、相位、振幅及力矩预算上给出一致预测。",
      ],
    },
    {
      heading: "最内内核：各向异性揭示的中心线索",
      body: [
        "同一种材料中，弹性波速度可以随传播方向变化，这叫各向异性。晶体取向、变形与温度历史等都可能影响这种性质；各向异性分区因而不必等同于突然出现另一种化学元素构成的新壳层。中心很难被足够多方向的射线采样，正是这一研究的主要限制。",
        "Pham与Tkalčić2023在Nature Communications利用穿过地球直径多次的P波，报告沿地球直径最多五次穿越的波形，并讨论中心与外侧内核不同的各向异性。其图示模型使用约650km半径的中心区域，但这不是单凭该组波形独立精确量出的新边界；论文也指出，对过渡深度与性质的刻画仍需进一步约束。",
        "在作者所比较的模型中，中心区域的慢方向相对地球自转轴处于倾斜角度，与外侧弱各向异性图景不同。数据对中心方向性很敏感，却未必同样敏感于每个深度参数。把采样能力与参数假设一起说明，才能看出观测增强了哪条证据，以及哪些量仍靠模型选择。",
        "不同结晶或生长阶段、内部变形与外核热化学条件，都可被用来解释这些差别；波形并没有直接测定一场五亿年前事件的年代。地球深处像时间档案，却需要矿物物理、动力学和地震学相互校验，才能从今天的弹性性质谨慎重建它的成长史。",
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
    {
      label: "NOAA GML · Mauna Loa年度CO₂原始数据（2026-10-09版）",
      url: "https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.txt",
      kind: "agency",
    },
    {
      label: "NOAA · 海洋酸化与海表pH的含义",
      url: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
      kind: "agency",
    },
    {
      label: "Cooper等2021 · 4.2万年前环境危机假说",
      url: "https://pubmed.ncbi.nlm.nih.gov/33602851/",
      kind: "paper",
    },
    {
      label: "2021正式评论 · 考古、古人类与遗传证据的限制",
      url: "https://pubmed.ncbi.nlm.nih.gov/34793212/",
      kind: "paper",
    },
    {
      label: "Hawks2021 · 灭绝与人类文化变化的因果质疑",
      url: "https://pubmed.ncbi.nlm.nih.gov/34793232/",
      kind: "paper",
    },
    {
      label: "USGS · 预测地磁反转的困难",
      url: "https://www.usgs.gov/faqs/are-we-about-have-a-magnetic-reversal",
      kind: "agency",
    },
    {
      label: "Yang与Song2023 · 内核相对转动的多十年变化",
      url: "https://www.nature.com/articles/s41561-022-01112-z",
      kind: "paper",
    },
    {
      label: "Yang与Song2023 · 作者会议摘要与物理解释",
      url: "https://meetingorganizer.copernicus.org/EGU23/EGU23-2826.html",
      kind: "paper",
    },
    {
      label: "Wu等2026 · 长期地震序列支持的差速图景",
      url: "https://doi.org/10.1029/2025GL119295",
      kind: "paper",
    },
    {
      label: "Zhang与Wen2026 · 局部内核表面变化的替代解释",
      url: "https://doi.org/10.1029/2026JB034595",
      kind: "paper",
    },
    {
      label: "Pham与Tkalčić2023 · 多次穿心P波与最内核各向异性",
      url: "https://www.nature.com/articles/s41467-023-36074-2",
      kind: "paper",
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
  discussionQuestions: [
    "生物圈、磁场、月球和板块各提供哪些宜居性线索？单一样本能够支持怎样的因果推断？",
    "地磁事件与灭绝的时间相关，怎样才能进一步变成可以检验的机制？",
    "研究者为何能对同一类内核波形提出不同解释？新的观测该怎样区分它们？",
  ],
};

export default content;

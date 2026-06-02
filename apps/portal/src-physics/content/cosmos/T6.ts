import type { TierContent } from "@/src-physics/lib/content";

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
      label: "已确认系外行星",
      latinLabel: "Confirmed exoplanets",
      value: "> 5700",
      hint: "NASA Archive 2025",
    },
    {
      label: "银河系行星数估算",
      latinLabel: "Planets in Milky Way",
      value: "≥ 1000 亿",
      hint: "Kepler 统计外推",
    },
    {
      label: "宜居带岩石行星",
      latinLabel: "Habitable rocky planets",
      value: "~30 颗候选",
      hint: "Kepler + TESS · 半径 < 2 R⊕",
    },
    {
      label: "小行星带总质量",
      latinLabel: "Asteroid belt mass",
      value: "~4% 月球",
      hint: "≈ 3 × 10²¹ kg",
    },
    {
      label: "冰巨星",
      latinLabel: "Ice giants",
      value: "2",
      hint: "天王星和海王星 — 太阳系最神秘的行星",
    },
  ],
  narrative: [
    {
      heading: "四个岩石 + 四个气巨 + 一个冰储藏室",
      body: [
        "太阳系内圈是水星、金星、地球、火星四颗岩石行星，它们的轨道全部挤在 1.5 AU 以内。外圈是木星、土星、天王星、海王星四颗气体/冰巨星，分布在 5 到 30 AU。这种「内小外大」的结构跟我们目前找到的大多数系外行星系统并不一致 — 太阳系反而是个少数派。",
        "在内外行星之间，是 2.2 到 3.2 AU 的主小行星带：~10⁶ 颗大于 1 km 的小行星，总质量只有月球的 4%。海王星外是 Kuiper 带：~10⁵ 颗冰质天体在 30 到 50 AU 范围内，Pluto 是它最大的常驻成员。",
        "主小行星带是太阳系的「宇宙碎片场」——一颗行星未能诞生的遗骸。木星巨大的引力在 45 亿年里反复扰动这个区域，把原本可能聚合成第五颗岩石行星的原材料搅成了一盘碎石。最大的碎片 Ceres (940 km) 勉强靠自身引力抟成球形，但其他绝大多数都是不规则的岩块——从 Vesta (525 km) 到数以百万计的千米级碎石，再到无数尘粒。它们以 5–25 km/s 的速度在各自的轨道上运行，偶尔碰撞产生新的碎片家族，偶尔被引力弹弓甩向内太阳系——这就是我们看到的流星。",
      ],
    },
    {
      heading: "系外行星：太阳系之外的世界",
      body: [
        "1995 年 Mayor 和 Queloz 发现了第一颗围绕类日恒星公转的系外行星 51 Pegasi b——一颗「热木星」，轨道周期仅 4.2 天。这个发现彻底颠覆了行星形成理论：此前没人相信气态巨行星能出现在如此靠近恒星的地方。2019 年 Nobel 物理学奖表彰了这项开创性工作。",
        "截至 2025 年，NASA 系外行星档案已确认超过 5700 颗系外行星。开普勒太空望远镜 (2009–2018) 的统计表明，银河系中平均每颗恒星至少拥有一颗行星——行星才是常态，没有行星的恒星才是异类。TESS (2018–) 和 JWST (2021–) 正在把搜索范围从「发现」推进到「表征」：测量系外行星大气的化学成分（H₂O、CO₂、CH₄）以寻找生命迹象。TRAPPIST-1 系统（7 颗岩石行星，其中 3 颗在宜居带内）是这一搜索的灯塔目标。",
      ],
    },
    {
      heading: "为什么这张图用对数刻度",
      body: [
        "地球轨道半径是水星的 2.5 倍，但海王星轨道是地球的 30 倍。如果按线性刻度画 0–30 AU 的太阳系，内行星会全部挤在最里面 1/30 的位置变成噪点。这张图把径向距离做了对数变换 (r_scene = 0.10 + 0.85 · log(1+r_AU) / log(51))，让 Mercury (0.39 AU) 与 Neptune (30 AU) 都能在同一张图上读出位置。",
        "代价是「轨道速度直觉」失真 — 真实的太阳系里 Mercury 一年绕日一圈，Neptune 要 165 年。视觉化是为了结构识别，不是为了做天体力学。",
      ],
    },
    {
      heading: "Pluto 的「被开除」",
      body: [
        "2006 年 IAU 把 Pluto 从「行星」改判为「矮行星」，主要理由是 Pluto 还没「清除其轨道附近的其它天体」(criterion #3) — 它和 Kuiper 带其他天体共享轨道空间。同一次决议把 Eris 也排除了，因为 Eris (2005 发现) 比 Pluto 还重，再不画规则的话太阳系行星会越发现越多。",
        "2015 年 New Horizons 飞掠 Pluto，把它从「一个像素的远点」变成了一颗有冰盖、氮气大气和心形 Tombaugh Regio 的真实世界。它仍然不是行星，但毫无疑问是太阳系最有故事的天体之一。",
      ],
    },
    {
      heading: "我们去过哪里",
      body: [
        "Voyager 1/2 是迄今走得最远的人造物 — Voyager 1 在 2012 年穿越了日球层顶 (heliopause)，技术上进入了星际空间，距离约 165 AU。Pioneer 10/11 早就停止通讯但仍在飞行。New Horizons (2015 Pluto / 2019 Arrokoth) 是 Kuiper 带的唯一访客。",
        "返回样本任务里，Hayabusa2 带回了 Ryugu (2020)，OSIRIS-REx 带回了 Bennu (2023)。无人着陆器到过水星、金星、火星、月球、Titan，但暂时还没有去过 Uranus / Neptune 的 orbiter — 1986 (U) / 1989 (N) 之后这两个行星再没人靠近。",
      ],
    },
    {
      heading: "Nice 模型 · 行星挪过位置",
      body: [
        "太阳系不是从一开始就长这样。Nice 模型 (Tsiganis 等 2005, 因法国尼斯天文台得名) 给出一个戏剧性的剧本：太阳系诞生头几亿年里，木星—土星陷入 2:1 平运动共振，引力踢动让海王星和天王星向外迁移，海王星甚至跑到了天王星之外（早期它们的顺序可能是反的）。这场轨道大洗牌把残余 Kuiper 带砸入内系统，引发约 39 亿年前的「晚期重轰炸 (LHB)」，月球上多数大型撞击盆地的年龄都聚集在这个时刻。",
        "改进版「Grand Tack」(Walsh 2011) 进一步提出木星在还没远迁之前先朝太阳俯冲到 ~1.5 AU 再被土星拽回 —— 这能解释为什么火星比理论预测的小，也能解释主小行星带的双族群混合 (C 型外族 + S 型内族)。这些模型把行星科学从「初始条件直接演化」推到了「轨道剧情可以颠覆」的认识。",
      ],
    },
    {
      heading: "冰巨星 · 太阳系最神秘的行星",
      body: [
        "天王星和海王星被归为「冰巨星」，以区别于木星和土星这样的「气巨星」。它们的内部结构主要由水 (H₂O)、氨 (NH₃) 和甲烷 (CH₄) 组成的高压冰相物质构成，而非气巨星那样的纯氢/氦。这两颗行星占了太阳系外行星质量的大部分（仅次于木星和土星），但人类对它们的了解却出奇地少——唯一的近距离飞掠是 Voyager 2：天王星在 1986 年、海王星在 1989 年。此后近 40 年再无探测器造访。",
        "天王星最反常的特征是它的极端轴向倾斜——自转轴倾角 97.8°，几乎是「躺着」绕太阳公转，一种假说认为这是远古时期一次地球大小天体撞击的结果。海王星的卫星 Triton（海卫一）同样令人困惑：它是太阳系大卫星中唯一逆行的（即公转方向与海王星自转方向相反），表面覆盖着氮冰，有活跃的氮气间歇泉（Voyager 2 1989 年拍摄到），这强烈暗示它原本是 Kuiper 带天体被海王星引力俘获——换句话说，Triton 可能是一颗被捕获的矮行星。",
        "冰巨星内部最戏剧性的物理过程是「钻石雨」：在数百万大气压和数千开尔文的条件下，甲烷分子被分解，碳原子在高压下结晶成钻石并沉降到行星深处。这一理论由 Ross 1981 年首次提出，2017 年 SLAC 国家实验室用高功率激光在聚苯乙烯上直接复现了这一过程——在约 150 GPa 和 5000 K 的条件下，碳确实形成了纳米级钻石晶体。这意味着天王星和海王星内部可能有一层液态碳氢化合物的「钻石海洋」，钻石像雨滴一样不断下沉。NASA 的 Uranus Orbiter and Probe 任务已被美国天文学十年调查 (Astro2020) 列为最高优先级旗舰任务，预计 2030 年代发射。",
      ],
    },
    {
      heading: "卫星海洋 · 太阳系里隐藏的水体",
      body: [
        "把视线从行星本身挪到外行星卫星，会发现一连串「冰壳下藏着海」的世界。Europa (木卫二) 表层下 ~15 km 的冰层下有一层 ~100 km 深的液态咸水海，总水量约地球的两倍 (Galileo 磁感应 1998)。Enceladus (土卫二) 南极喷出富含 H₂、有机分子和硅酸盐颗粒的羽流 (Cassini 2014)，直接指向一个能维持热液活动的全球海洋。",
        "Titan (土卫六) 是太阳系唯一拥有稠密氮气大气并在地表稳定有液体的卫星 —— 不过那是甲烷和乙烷的液体湖。冰壳下也有水海。Triton (海王星卫一) 的逆行轨道暗示它原本是被海王星俘获的 Kuiper 带天体，Voyager 2 在 1989 拍到它表面的氮气间歇泉。这些海洋世界是寻找太阳系内地外生命的首要目标 ——「Europa Clipper」(NASA 2024 发射) 与「JUICE」(ESA 2023 发射) 是当前最大两笔投入。",
        "如果把太阳系比作一栋房子，我们长久以来只在客厅（内行星）里找钥匙，却不知道地下室（冰卫星）里藏着一整个游泳池。Europa 的海洋水量是地球的两倍，Enceladus 的热液喷口温度和地球深海热泉惊人地相似——而地球深海热泉正是生命起源的热门候选场所。也许太阳系里最重大的发现不在火星的干涸河床上，而在这些冰壳之下那片黑暗、温暖、充满化学能的海洋深处。",
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
      label: "Mayor & Queloz 1995 — 51 Pegasi b discovery",
      url: "https://www.nature.com/articles/378355a0",
      kind: "paper",
    },
    {
      label: "NASA Kepler & TESS — Exoplanet statistics",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
      kind: "agency",
    },
    {
      label: "Ross 1981 — The ice layer in Uranus and Neptune",
      url: "https://www.nature.com/articles/292435a0",
      kind: "paper",
    },
    {
      label: "Kraus et al. 2017 — Formation of diamonds in dense planetary interiors",
      url: "https://www.nature.com/articles/s41550-017-0219-9",
      kind: "paper",
    },
    {
      label: "National Academies 2022 — Astro2020 Decadal Survey: Uranus Orbiter and Probe",
      url: "https://nap.nationalacademies.org/catalog/26453/pathways-to-discovery-in-astronomy-and-astrophysics-for-the-2020s",
      kind: "encyclopedia",
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
};

export default content;

import type { TierContent } from "@/subjects/physics/lib/content";

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
  ],
  narrative: [
    {
      heading: "四个岩石 + 四个气巨 + 一个冰储藏室",
      body: [
        "太阳系内圈是水星、金星、地球、火星四颗岩石行星，它们的轨道全部挤在 1.5 AU 以内。外圈是木星、土星、天王星、海王星四颗气体/冰巨星，分布在 5 到 30 AU。这种「内小外大」的结构跟我们目前找到的大多数系外行星系统并不一致 — 太阳系反而是个少数派。",
        "在内外行星之间，是 2.2 到 3.2 AU 的主小行星带：~10⁶ 颗大于 1 km 的小行星，总质量只有月球的 4%。海王星外是 Kuiper 带：~10⁵ 颗冰质天体在 30 到 50 AU 范围内，Pluto 是它最大的常驻成员。",
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
      heading: "卫星海洋 · 太阳系里隐藏的水体",
      body: [
        "把视线从行星本身挪到外行星卫星，会发现一连串「冰壳下藏着海」的世界。Europa (木卫二) 表层下 ~15 km 的冰层下有一层 ~100 km 深的液态咸水海，总水量约地球的两倍 (Galileo 磁感应 1998)。Enceladus (土卫二) 南极喷出富含 H₂、有机分子和硅酸盐颗粒的羽流 (Cassini 2014)，直接指向一个能维持热液活动的全球海洋。",
        "Titan (土卫六) 是太阳系唯一拥有稠密氮气大气并在地表稳定有液体的卫星 —— 不过那是甲烷和乙烷的液体湖。冰壳下也有水海。Triton (海王星卫一) 的逆行轨道暗示它原本是被海王星俘获的 Kuiper 带天体，Voyager 2 在 1989 拍到它表面的氮气间歇泉。这些海洋世界是寻找太阳系内地外生命的首要目标 ——「Europa Clipper」(NASA 2024 发射) 与「JUICE」(ESA 2023 发射) 是当前最大两笔投入。",
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

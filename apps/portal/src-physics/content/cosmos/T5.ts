import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "T5",
  name: { primary: "恒星邻域", latin: "Stellar Neighborhood" },
  tagline: "50 光年以内",
  whisper: "天空中肉眼可数的，几乎全在这里。",
  dataCards: [
    {
      label: "区域半径",
      latinLabel: "Radius",
      value: "50 ly",
      hint: "≈ 15.3 pc · 4.7 × 10¹⁷ m",
    },
    {
      label: "已知恒星系统",
      latinLabel: "Known systems",
      value: "≈ 1300",
      hint: "RECONS 2024 普查",
    },
    {
      label: "最近恒星",
      latinLabel: "Closest star",
      value: "Proxima Cen",
      hint: "4.246 ly",
    },
    {
      label: "最亮恒星",
      latinLabel: "Brightest (V mag)",
      value: "Sirius A",
      hint: "−1.46 mag · 8.6 ly",
    },
    {
      label: "光谱型分布",
      latinLabel: "Spectral mix",
      value: "M ~75% · K 12% · 其余 13%",
      hint: "矮星主导",
    },
    {
      label: "已确认系外行星 (50 ly)",
      latinLabel: "Confirmed exoplanets",
      value: "≈ 250",
    },
    {
      label: "系外行星总数 (全天空)",
      latinLabel: "Exoplanets total",
      value: "≈ 5700+",
      hint: "NASA Exoplanet Archive 2025",
    },
    {
      label: "TRAPPIST-1 宜居带行星",
      latinLabel: "TRAPPIST-1 habitable zone",
      value: "e / f / g",
      hint: "Gillon 2017 · 40.7 ly",
    },
    {
      label: "中子星密度",
      latinLabel: "Neutron star density",
      value: "≈ 10¹⁷",
      hint: "kg/m³ · 一茶匙重 60 亿吨",
    },
    {
      label: "已知脉冲星",
      latinLabel: "Known pulsars",
      value: "≈ 3300",
      hint: "ATNF Pulsar Catalogue",
    },
    {
      label: "磁星磁场",
      latinLabel: "Magnetar field",
      value: "10⁹ – 10¹¹",
      hint: "T · 地球磁场的千万亿倍",
    },
    {
      label: "白矮星",
      latinLabel: "White dwarfs",
      value: "~20",
      hint: "Sirius B / Procyon B 等",
    },
    {
      label: "邻域空间密度",
      latinLabel: "Stellar density",
      value: "~0.14 / pc³",
    },
    {
      label: "棕矮星估算",
      latinLabel: "Brown dwarfs",
      value: "≈ 30 已确认",
      hint: "WISE / Y-T-L 谱型 · 10 pc 内",
    },
    {
      label: "双星/聚星比例",
      latinLabel: "Multiplicity",
      value: "M ~26% · G ~46%",
      hint: "Duchêne & Kraus 2013",
    },
    {
      label: "JWST 系外行星大气",
      latinLabel: "JWST exoplanet atmospheres",
      value: "K2-18b",
      hint: "2023 年探测到二甲基硫醚 — 可能的生物标志气体",
    },
    {
      label: "保守宜居带 (太阳)",
      latinLabel: "CHZ around Sun",
      value: "0.95 – 1.37 AU",
      hint: "Kopparapu 2013",
    },
    {
      label: "近邻已确认行星宿主",
      latinLabel: "Planet hosts (<50 ly)",
      value: "≈ 90 颗恒星",
      hint: "NASA Exoplanet Archive",
    },
    {
      label: "中子星典型质量",
      latinLabel: "NS mass",
      value: "1.4 – 2.1 M☉",
      hint: "Chandrasekhar 极限以上",
    },
    {
      label: "中子星典型半径",
      latinLabel: "NS radius",
      value: "~10–12 km",
      hint: "仅一座城市大小",
    },
    {
      label: "脉冲星自转纪录",
      latinLabel: "Fastest pulsar",
      value: "716 Hz",
      hint: "PSR J1748-2446ad · 每秒 716 圈",
    },
  ],
  narrative: [
    {
      heading: "近邻是被矮星统治的",
      body: [
        "把太阳和它周围 50 光年内的所有恒星摊在一张图上，会发现一个反直觉的事实：占绝对多数的不是太阳这样的 G 型黄矮星，而是更小、更冷、更暗的 M 型红矮星——它们占了恒星总数的约四分之三。",
        "我们之所以从来不在天上「看到」红矮星，是因为它们太暗：50 光年内最近的红矮星 Proxima Centauri 的视星等是 11.13，比肉眼极限暗了 6 等以上。我们能看到的所有星座主角，都是更稀少的 F / A / 巨星这一类亮星。",
      ],
    },
    {
      heading: "等级森严的视亮度",
      body: [
        "肉眼夜空大约只能分辨 6000 颗左右的恒星，绝大多数都来自这 50 ly 的小球。Sirius A（A1V，8.6 ly）是其中最亮的，视星等 −1.46。它附近的 Sirius B 是首个被确认的白矮星 (Bessel 1844 推测、Adams 1925 光谱证实)。",
        "Vega、Altair、Fomalhaut 三颗 A 型恒星形成了北半球的「夏季三角」，距离都在 16–25 ly 之间，是同一波恒星形成的活跃 A 型主序星。",
      ],
    },
    {
      heading: "恒星摇篮 · 分子云与原行星盘",
      body: [
        "恒星并非在虚空中凭空诞生，而是在巨分子云 (GMC) 的致密核心中坍缩形成——这些分子云质量可达 10⁴–10⁶ M⊙，温度仅 10–20 K，内部密度不均匀的「团块」在自引力超过热压与磁压时开始坍缩。猎户座大星云 (M42) 距离约 1344 pc，是距我们最近的大质量恒星形成区之一；其中的 Trapezium 星团年龄不到 200 万年，用 JWST 中红外相机可以看到嵌在气体中的数百颗原恒星。",
        "坍缩中的原恒星周围会形成一个旋转的「原行星盘」(protoplanetary disk)，直径 50–500 AU，质量约 0.01–0.1 M⊙。ALMA 亚毫米波阵列在 HL Tau (2014) 等目标上拍到了盘内清晰的环与间隙结构——这些间隙很可能是正在形成中的行星扫清轨道上的尘埃所致。从分子云坍缩到行星系统成形，整个过程约需 1–10 百万年；我们的太阳系 46 亿年前也经历了同样的过程，而今天 50 光年邻域内的 TWA、β Pic、AU Mic 等年轻恒星群就是这个过程正在进行的现场直播。",
      ],
    },
    {
      heading: "Alpha Centauri：太阳的引力邻居",
      body: [
        "Alpha Centauri 是一个三合星系统：Alpha Cen A 与太阳几乎是双胞胎 (G2V, 1.1 M⊙)；Alpha Cen B 是稍小的 K 型；Proxima Centauri 是远在 0.2 ly 外的小 M5.5V，绕 A/B 双星运转。",
        "Proxima 拥有已知最近的潜在宜居行星 Proxima b (Anglada-Escudé 2016, 1.27 R⊕)，但其母星的强 X 射线耀斑可能让它的大气难以稳定存在。Breakthrough Starshot 计划 (2016 起) 希望用激光帆 20 年内把 1 g 的探测器送到这里。",
      ],
    },
    {
      heading: "类太阳目标",
      body: [
        "想找「另一个太阳」的工程在邻域里有几个明显候选：Tau Ceti (G8V, 11.9 ly)、Epsilon Eridani (K2V, 10.5 ly)、61 Cygni A (K5V, 11.4 ly) 是 SETI Project Phoenix 与 Allen Telescope Array 的主要监听对象。Tau Ceti 在 2017 年被确认有 4 颗已知行星，其中两颗轨道边缘宜居带。",
      ],
    },
    {
      heading: "HR 图 · 邻域恒星的体检报告",
      body: [
        "把这 50 ly 内 1300 个系统按表面温度 (横轴) 与光度 (纵轴) 画到 Hertzsprung-Russell 图上，会发现绝大多数都老老实实贴在「主序带」上 —— 那是恒星一辈子里最长的一段稳定燃氢期。太阳坐在主序中段；右下角密密麻麻的红点是 M 矮星；左下角孤立的几个蓝白点是密度 ~10⁹ kg/m³ 的白矮星，比如 Sirius B 和 Procyon B。",
        "比主序更冷更暗的还有一族「失败的恒星」：棕矮星。它们质量 13–80 M_J，核心从未达到稳定氢聚变温度，只能短暂地烧氘。WISE 卫星在 10 pc 内发现了约 30 颗这样的天体，按温度从高到低分为 L、T、Y 三个晚型谱型 —— Y 型最冷可降到 ~250 K，比室温还低。一颗 Y 型棕矮星离我们最近的是 WISE 0855-0714 (距离 7.27 ly)，温度 ~250 K，是已知最冷的「准恒星」。",
      ],
    },
    {
      heading: "中子星 · 宇宙的灯塔",
      body: [
        "当一颗质量 8–25 M☉ 的恒星耗尽核燃料，核心塌缩成一颗直径仅约 10 公里的中子星——密度高达 ~10¹⁷ kg/m³，一茶匙物质重约 60 亿吨。物质在这里被压缩到原子核的密度，电子被压入质子形成中子，整颗星几乎完全由中子组成。这是已知宇宙中除黑洞外密度最大的天体。",
        "快速自转的中子星就是脉冲星——它们的强磁场 (10⁸–10¹⁵ G) 把带电粒子沿磁极加速成辐射束，像灯塔一样扫过太空。1967 年 Bell 和 Hewish 发现了第一颗脉冲星 PSR B1919+21（最初被戏称为「小绿人」信号），Hewish 因此获 1974 年 Nobel 奖。最快的脉冲星 PSR J1748-244ad 每秒自转 716 圈——表面速度接近光速的 25%。中子星还是宇宙中最强的磁场实验室：磁星 (magnetar) 的磁场可达 10¹⁵ G，是地球磁场的千万亿倍，一次磁星耀斑释放的能量可在几毫秒内超过太阳 10 万年的总输出。",
      ],
    },
    {
      heading: "近邻行星 · TRAPPIST-1 与 TOI-700d",
      body: [
        "近邻 50 ly 内目前已确认约 250 颗系外行星，其中 TRAPPIST-1 (距离 40.7 ly) 是最戏剧的一个：一颗 M8V 红矮星，周围七颗大小近似地球的岩石行星 (Gillon 2017)，其中三颗 (e/f/g) 落在保守宜居带内。JWST 已对 b/c/d 做过中红外辐射测光，2023 年的结果暗示 b 几乎没有大气。",
        "更新的发现还有 TOI-700d (M2V, 101 ly，TESS 2020) 与 Proxima b。Kopparapu 2013 的保守宜居带定义把 M 矮星周围的 CHZ 内边界推到比太阳系窄得多 (因为大气 H₂O 损失阈值随光谱型变化)，让「红矮星宜居」从希望变得更现实 —— 也让红矮星耀斑的剥离效应成为热门研究问题。",
      ],
    },
    {
      heading: "系外行星 · 超乎想象的世界",
      body: [
        "在 1995 年之前，我们连一颗围绕其他恒星运转的行星都找不到。那一年，Michel Mayor 和 Didier Queloz 用径向速度法发现了 51 Pegasi b——一颗质量约为木星一半、却在 4 天内就绕完一圈的「热木星」。这完全颠覆了当时的行星形成理论，因为没有模型预言巨行星能如此靠近恒星。2019 年 Nobel 物理学奖表彰了这项开创性发现。今天，NASA 系外行星档案已确认超过 5700 颗系外行星，而银河系中估计至少有 1000 亿颗行星——比地球上所有海滩的沙粒还多。",
        "Kepler 空间望远镜 (2009-2018) 用凌日法一网打尽：它盯着天鹅座一小块天区里 15 万颗恒星，等行星从恒星前方经过时记录微小的亮度下降。Kepler 发现了 2662 颗确认行星，揭示了行星多样性远超预期：超级地球（1.5-2 倍地球半径）是最常见的类型，太阳系反而成了异类。迷你海王星、逆行轨道行星、环双星行星（围绕两颗恒星运转，像《星球大战》里的塔图因）——每一种发现都在重写教科书。TESS (2018 起) 和未来的 PLATO (ESA, ~2026) 将把搜索范围扩展到全天，覆盖更亮的恒星，为 JWST 的大气表征提供最佳目标。",
        "寻找另一个地球的终极目标是直接成像——拍到系外行星的「照片」并分析其大气光谱。JWST 已在 TRAPPIST-1 b 和 K2-18 b 等目标上检测到 CO₂ 和 CH₄ 的迹象。如果在一颗宜居带行星的大气中同时发现 O₂、O₃、H₂O 和 CH₄ 的热力学不平衡组合——即所谓「生物标志气体 (biosignature gases)」——那将是人类历史上最重大的发现之一。我们正站在回答「宇宙中我们是否孤独」这个问题的门槛上。",
      ],
    },
    {
      heading: "JWST · 系外行星大气的革命",
      body: [
        "JWST 的红外光谱能力彻底改变了系外行星科学的范式。2022 年 7 月发布的首批科学数据中，WASP-96b 的透射光谱清晰地展示了水蒸气吸收特征和云层的存在；GJ 1214b 的热发射相位曲线暗示了一种富含气溶胶的高金属含量大气。这些结果仅仅是个开始——JWST 的 6.5 米主镜和 0.6–28.5 μm 的波长覆盖让它能够探测到其他望远镜无法触及的分子指纹。",
        "2023 年，JWST 在 K2-18b（一颗距地球 124 光年的亚海王星，位于红矮星宜居带内）的大气中探测到了二氧化碳和甲烷，更重要的是，它检测到了二甲基硫醚 (DMS) 的微弱信号——在地球上，DMS 几乎只由海洋浮游植物产生。如果这一发现得到确认，K2-18b 将成为目前已知最有可能存在生物活动的系外行星。当然，科学界对此仍持审慎态度：DMS 信号较弱，可能存在其他非生物来源，需要更多观测时间来验证。但无论如何，JWST 已经把系外行星研究从「发现」推进到了「表征」时代——我们不再只是数行星，而是在读它们的大气成分表。",
      ],
    },
    {
      heading: "中子星 · 宇宙中最极端的物质",
      body: [
        "当一颗质量 8-25 倍太阳的恒星耗尽核燃料后，核心在超新星爆发中被压缩到直径仅约 20 公里——一座城市大小——但质量却超过太阳。这就是中子星：一茶匙的中子星物质重约 60 亿吨，密度达到原子核的密度 (~10¹⁷ kg/m³)。它是除黑洞外已知最致密的天体，引力之强让表面的「山」只能高出几毫米。如果把地球压缩到同等密度，它的直径会缩小到一个足球场大小。",
        "1967 年 Jocelyn Bell Burnell 在剑桥的射电望远镜中发现了一个周期 1.337 秒的精确脉冲信号——最初被戏称为「小绿人 (LGM-1)」，后来被确认为第一颗脉冲星，即快速旋转的中子星，像一座宇宙灯塔用磁极发出的辐射束扫过太空。Hewish 因此获 1974 年 Nobel 物理学奖（Bell 未获提名，这一遗漏至今被视为 Nobel 历史上的遗憾之一）。目前已知约 3300 颗脉冲星，其中毫秒脉冲星的自转周期短到 1.4 毫秒——每秒旋转 716 次——是自然界中最精确的时钟之一，精度堪比原子钟。",
        "中子星家族中最极端的成员是磁星 (magnetar)：磁场强度达到 10⁹–10¹¹ 特斯拉，是地球磁场的千万亿倍。在如此极端的磁场下，原子被拉成铅笔状的细丝，光子分裂成正负电子对，真空本身变成了双折射晶体。磁星的「星震 (starquake)」会释放出巨量伽马射线暴——1979 年 3 月 5 日探测到的那次来自大麦哲伦云方向的强烈伽马暴，让全球的太空探测器同时过载，现在被认为是银河系内一次磁星爆发事件。2017 年 GW170817 双中子星并合事件中，引力波与千新星的同时探测直接证实了中子星并合是宇宙中比铁更重的元素（金、铂、铀等）的主要工厂——你手指上的金戒指很可能诞生于两颗中子星的碰撞。",
      ],
    },
  ],
  sources: [
    {
      label: "RECONS — Research Consortium On Nearby Stars",
      url: "http://www.recons.org/",
      kind: "agency",
    },
    {
      label: "SIMBAD astronomical database",
      url: "https://simbad.cds.unistra.fr/simbad/",
      kind: "agency",
    },
    {
      label: "Anglada-Escudé et al. 2016 — Proxima b discovery",
      url: "https://www.nature.com/articles/nature19106",
      kind: "paper",
    },
    {
      label: "Gaia DR3 — ESA",
      url: "https://www.cosmos.esa.int/web/gaia/dr3",
      kind: "agency",
    },
    {
      label: "Gillon et al. 2017 — Seven Earth-sized planets at TRAPPIST-1",
      url: "https://www.nature.com/articles/nature21360",
      kind: "paper",
    },
    {
      label: "Kopparapu et al. 2013 — Habitable zones around main-sequence stars",
      url: "https://arxiv.org/abs/1301.6674",
      kind: "paper",
    },
    {
      label: "Mayor & Queloz 1995 — 51 Pegasi b discovery",
      url: "https://www.nature.com/articles/378355a0",
      kind: "paper",
    },
    {
      label: "LIGO/Virgo 2017 — GW170817 neutron star merger",
      url: "https://arxiv.org/abs/1710.05834",
      kind: "paper",
    },
    {
      label: "Madhusudhan et al. 2023 — Carbon-bearing molecules and possible DMS in K2-18b atmosphere",
      url: "https://www.nature.com/articles/s41586-023-06497-0",
      kind: "paper",
    },
    {
      label: "JWST — NASA/ESA/CSA James Webb Space Telescope",
      url: "https://webbtelescope.org/",
      kind: "agency",
    },
    {
      label: "ATNF Pulsar Catalogue",
      url: "https://www.atnf.csiro.au/research/pulsar/psrcat/",
      kind: "agency",
    },
    {
      label: "NASA Exoplanet Archive",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
      kind: "agency",
    },
    {
      label: "Manchester et al. — ATNF Pulsar Catalogue",
      url: "https://www.atnf.csiro.au/research/pulsar/psrcat/",
      kind: "agency",
    },
    {
      label: "Hewish et al. 1968 — Observation of a Rapidly Pulsating Radio Source",
      url: "https://www.nature.com/articles/217709a0",
      kind: "paper",
    },
  ],
  // Marker positions are equatorialToScene(raH, decDeg, distLy) with
  // scene unit = 50 ly, precomputed offline.
  markers: [
    {
      id: "sun",
      name: { primary: "太阳", latin: "Sol" },
      position: [0, 0, 0],
      description:
        "G2V 主序星，年龄约 46 亿年，预计还有 ~50 亿年留在主序上。它是 50 光年内为数不多的 G 型恒星之一。下一档 T6 是它整个行星系。",
      data: [
        { label: "类型", value: "G2V" },
        { label: "年龄", value: "4.6 Gyr" },
        { label: "下钻", value: "T6" },
      ],
      color: "#fff3c4",
      size: 0.04,
    },
    {
      id: "proxima-cen",
      name: { primary: "比邻星", latin: "Proxima Centauri" },
      position: [-0.031, -0.075, -0.023],
      description:
        "距离太阳最近的恒星，4.246 ly。M5.5V 红矮星，质量仅太阳的 12%。绕 Alpha Centauri A/B 双星运转 (周期 ~55 万年)。拥有 1.27 R⊕ 的岩石行星 Proxima b，位于宜居带边缘，但母星的耀斑活动剧烈。",
      data: [
        { label: "距离", value: "4.246 ly" },
        { label: "类型", value: "M5.5V" },
        { label: "行星", value: "Proxima b" },
      ],
      color: "#ff8866",
      size: 0.06,
    },
    {
      id: "alpha-cen",
      name: { primary: "南门二", latin: "Alpha Centauri A/B" },
      position: [-0.033, -0.076, -0.027],
      description:
        "由 G2V (Alpha A) 和 K1V (Alpha B) 组成的双星，距离 4.367 ly，相互绕转周期约 80 年。Alpha A 是与太阳最相似的恒星之一 (1.1 M⊙, 1.5 L⊙)。Proxima 是这个系统外环的第三星。",
      data: [
        { label: "距离", value: "4.367 ly" },
        { label: "A 型", value: "G2V" },
        { label: "B 型", value: "K1V" },
      ],
      color: "#fff4d8",
      size: 0.05,
    },
    {
      id: "sirius",
      name: { primary: "天狼星", latin: "Sirius A/B" },
      position: [-0.032, -0.05, 0.162],
      description:
        "夜空中视亮度最高的恒星 (V = −1.46)。Sirius A 是 A1V 主序星，2 M⊙；Sirius B 是首个被发现的白矮星 (Adams 1925)，密度 ~10⁹ kg/m³。两者周期 50.1 年。距离 8.6 ly。",
      data: [
        { label: "距离", value: "8.6 ly" },
        { label: "A 型", value: "A1V" },
        { label: "B 型", value: "DA2 (WD)" },
      ],
      color: "#d4dcff",
      size: 0.055,
    },
    {
      id: "vega",
      name: { primary: "织女星", latin: "Vega" },
      position: [0.062, 0.314, -0.385],
      description:
        "天琴座 α，A0V 主序星，距离 25.04 ly。曾在公元前 12000 年是地球北极星（章动周期 ~26000 年）。Vega 是首颗被测量距离的恒星 (Struve 1837)，也是恒星视差与现代星等系统的零点参考。其周围有一圈类似 Kuiper 带的尘埃盘 (IRAS 1983 发现)。",
      data: [
        { label: "距离", value: "25.04 ly" },
        { label: "类型", value: "A0V" },
        { label: "标志", value: "光度零点" },
      ],
      color: "#e8eeff",
      size: 0.055,
    },
    {
      id: "tau-ceti",
      name: { primary: "天仓五", latin: "Tau Ceti" },
      position: [0.206, -0.065, 0.1],
      description:
        "11.9 ly 处的 G8V 主序星，是最近的类太阳单星。Frank Drake 1960 年的 Project Ozma —— 人类首次系统化的 SETI 项目 —— 监听的两个目标之一。已知至少 4 颗行星 (Tuomi et al. 2017)，其中两颗位于宜居带边缘。",
      data: [
        { label: "距离", value: "11.9 ly" },
        { label: "类型", value: "G8V" },
        { label: "行星", value: "≥ 4" },
      ],
      color: "#fff0c4",
      size: 0.045,
    },
    {
      id: "barnards-star",
      name: { primary: "巴纳德星", latin: "Barnard's Star" },
      // equatorialToScene(17.9633h, 4.6928°, 5.96 ly) / SCENE_LY
      position: [-0.108, 0.01, 0.052],
      description:
        "距离 5.96 ly 的 M4V 红矮星，是太阳的第二近恒星（Proxima 之后）。E.E. Barnard 1916 测出它有创纪录的自行：10.3 角秒/年 —— 100 年内能在天空移动满月直径的三分之一，是任何已知恒星的最大自行。年龄约 70-120 亿年，几乎与银河系同寿。2024 年 ESPRESSO 数据确认一颗小行星 Barnard b (0.4 M⊕)，再添系外行星候选。",
      data: [
        { label: "距离", value: "5.96 ly" },
        { label: "自行", value: "10.3 ″/yr (最大)" },
        { label: "年龄", value: "~7-12 Gyr" },
      ],
      color: "#ff9a66",
      size: 0.04,
    },
    {
      id: "trappist-1",
      name: { primary: "TRAPPIST-1", latin: "TRAPPIST-1" },
      // equatorialToScene(23.1h, -5.04°, 40.66 ly) / SCENE_LY
      position: [-0.788, -0.071, -0.157],
      description:
        "40.7 ly 处的 M8V 红矮星，周围有 7 颗大小近似地球的岩石行星 (Gillon 2017)，其中 e/f/g 三颗落在保守宜居带。JWST 已对 b/c/d 中红外辐射测光，2023 年的结果暗示 b 几乎没有大气。这是迄今 best-characterized 的多行星系统，也是近邻「红矮星宜居性」研究的灯塔目标。",
      data: [
        { label: "距离", value: "40.66 ly" },
        { label: "类型", value: "M8V" },
        { label: "行星", value: "7 (b–h)" },
        { label: "宜居带", value: "e / f / g" },
      ],
      color: "#ff7755",
      size: 0.05,
    },
    {
      id: "crab-pulsar",
      name: { primary: "蟹状星云脉冲星", latin: "Crab Pulsar / PSR B0531+21" },
      position: [0.35, 0.22, -0.15],
      description:
        "1054 年超新星爆发的遗迹核心，距离约 6500 ly（不在 50 ly 内但作为代表标注）。每秒旋转 30 次的年轻脉冲星，驱动蟹状星云的同步辐射。它是脉冲星标准模型的基准天体，也是伽马射线天文学的标志性源。",
      data: [
        { label: "周期", value: "33 ms" },
        { label: "年龄", value: "~970 yr" },
        { label: "超新星", value: "SN 1054" },
      ],
      color: "#88ccff",
      size: 0.04,
    },
    {
      id: "51-pegasi-b",
      name: { primary: "飞马座 51b", latin: "51 Pegasi b" },
      position: [-0.45, 0.05, 0.38],
      description:
        "1995 年 Mayor & Queloz 发现的首颗太阳型恒星周围的系外行星，距离约 50.9 ly。这颗热木星质量约 0.47 M_J，轨道周期仅 4.23 天——如此靠近恒星的巨行星完全出乎理论预期，彻底改变了行星形成理论的认知。2019 年 Nobel 物理学奖。",
      data: [
        { label: "距离", value: "50.9 ly" },
        { label: "质量", value: "0.47 M_J" },
        { label: "轨道周期", value: "4.23 d" },
        { label: "Nobel", value: "2019" },
      ],
      color: "#ffd4aa",
      size: 0.035,
    },
  ],
};

export default content;

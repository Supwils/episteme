import type { TierContent } from "@/subjects/physics/lib/content";

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
      heading: "近邻行星 · TRAPPIST-1 与 TOI-700d",
      body: [
        "近邻 50 ly 内目前已确认约 250 颗系外行星，其中 TRAPPIST-1 (距离 40.7 ly) 是最戏剧的一个：一颗 M8V 红矮星，周围七颗大小近似地球的岩石行星 (Gillon 2017)，其中三颗 (e/f/g) 落在保守宜居带内。JWST 已对 b/c/d 做过中红外辐射测光，2023 年的结果暗示 b 几乎没有大气。",
        "更新的发现还有 TOI-700d (M2V, 101 ly，TESS 2020) 与 Proxima b。Kopparapu 2013 的保守宜居带定义把 M 矮星周围的 CHZ 内边界推到比太阳系窄得多 (因为大气 H₂O 损失阈值随光谱型变化)，让「红矮星宜居」从希望变得更现实 —— 也让红矮星耀斑的剥离效应成为热门研究问题。",
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
      label: "NASA Exoplanet Archive",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
      kind: "agency",
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
  ],
  relatedArticles: [
    { href: "/cosmology/knowledge-base/恒星物理--main-sequence-stars", title: "主序星" },
    { href: "/cosmology/knowledge-base/恒星物理--star-formation", title: "恒星形成" },
    {
      href: "/cosmology/knowledge-base/恒星物理--stellar-structure-hydrostatic-equilibrium",
      title: "恒星结构与流体静力平衡",
    },
  ],
};

export default content;

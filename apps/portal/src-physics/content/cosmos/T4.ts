import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "T4",
  name: { primary: "银河系", latin: "Milky Way · Via Lactea" },
  tagline: "我们脚下的这个旋臂盘",
  whisper: "银河如练 —— 我们看到的是侧切自己的那条带。",
  dataCards: [
    {
      label: "盘面直径",
      latinLabel: "Disk diameter",
      value: "≈ 30 kpc",
      hint: "≈ 100 000 ly",
    },
    {
      label: "总质量",
      latinLabel: "Total mass",
      value: "≈ 1.5 × 10¹² M⊙",
      hint: "含暗物质晕",
    },
    {
      label: "太阳距 GC",
      latinLabel: "R⊙",
      value: "8.178 kpc",
      hint: "GRAVITY 2019, ±13 pc",
    },
    {
      label: "Sgr A*",
      latinLabel: "Central BH",
      value: "4.30 × 10⁶ M⊙",
      hint: "EHT / GRAVITY 2022",
    },
    {
      label: "公转周期",
      latinLabel: "Galactic year",
      value: "≈ 230 Myr",
      hint: "太阳绕银心一周",
    },
    {
      label: "盘面厚度",
      latinLabel: "Thin disk",
      value: "≈ 300 pc",
      hint: "薄盘 (HWHM)",
    },
    {
      label: "球状星团",
      latinLabel: "Globulars",
      value: "≈ 150",
      hint: "Harris 2010 编目",
    },
    {
      label: "恒星数",
      latinLabel: "Stars",
      value: "(1–4) × 10¹¹",
      hint: "Gaia DR3 估算下限",
    },
    {
      label: "厚盘标高",
      latinLabel: "Thick disk scale height",
      value: "≈ 900 pc",
      hint: "Bovy 2016 化学分解",
    },
    {
      label: "棒角速度",
      latinLabel: "Bar pattern speed",
      value: "Ωb ≈ 38 km/s/kpc",
      hint: "Sanders 2019",
    },
    {
      label: "局部恒星形成率",
      latinLabel: "Galactic SFR",
      value: "≈ 1.6 M⊙/yr",
      hint: "Licquia & Newman 2015",
    },
    {
      label: "恒星质量黑洞估算",
      latinLabel: "Stellar BH estimate",
      value: "~10⁸ – 10⁹",
      hint: "银河系内 · 质量 ~5–100 M☉",
    },
    {
      label: "Sgr A* Schwarzschild 半径",
      latinLabel: "Sgr A* r_s",
      value: "~0.08 AU",
      hint: "≈ 1200 万公里 · 比水星轨道小",
    },
    {
      label: "EHT 角分辨率",
      latinLabel: "EHT resolution",
      value: "~20 μas",
      hint: "相当于在地球上看月球上的一张报纸",
    },
    {
      label: "盘面年龄-金属丰度",
      latinLabel: "[Fe/H] gradient",
      value: "−0.06 dex/kpc",
      hint: "薄盘径向梯度",
    },
  ],
  narrative: [
    {
      heading: "盘面、棒、旋臂",
      body: [
        "银河系是一个带棒的旋涡星系。中心是一根长约 4 kpc 的恒星棒，相对太阳—银心连线倾斜约 25°。棒外是盘面，盘面上能识别出四条主要旋臂 —— Perseus、Scutum–Centaurus、Sagittarius–Carina、Outer (Norma) —— 它们的螺距角约 12° (Vallée 2017)。",
        "盘面之外是球状的恒星晕，里面散落着约 150 个球状星团，质量与盘面相当，但密度低得多。再往外是质量是恒星部分十倍的暗物质晕。",
        "如果能从数百万光年外看银河系，它就像一座旋转的宇宙大教堂：中心的恒星棒是祭坛，四条旋臂是从祭坛向外延伸的彩绘回廊，每一根旋臂上镶嵌着数以万计的蓝色年轻恒星和粉红色的电离氢区——它们是大教堂窗棂上的彩色玻璃。而我们坐在距离祭坛约 26000 光年的一根次级回廊（Local Arm）上，如同坐在教堂侧廊的长椅里，仰头望不到穹顶的全貌，只能看到一条横贯天空的光带——那就是我们从盘面内部侧视自己家园的视角。",
      ],
    },
    {
      heading: "太阳的位置",
      body: [
        "太阳系坐在 Local Arm 上 —— 一段相对短的、夹在 Sagittarius 与 Perseus 之间的旋臂段。R⊙ = 8.178 ± 0.013 kpc 是由 GRAVITY 干涉仪用恒星 S2 在 Sgr A* 周围的精确轨道几何测出的，这是迄今最直接的银心距离测量。",
        "太阳绕银心一周约 230 Myr，距上一次完成「银河年」时，地球上还是恐龙时代的尾声。",
      ],
    },
    {
      heading: "Sgr A* 与中央黑洞",
      body: [
        "银心 Sgr A* 是一个质量约 430 万倍太阳的超大质量黑洞，2020 年 Nobel 物理学奖颁给了用它周围恒星轨道直接测得其质量的工作 (Genzel & Ghez)。事件视界望远镜在 2022 年公布的它的「阴影」图像 (EHT 2022) 是历史上第二张直接拍到的黑洞图像。",
        "围绕它的恒星——比如 S2——以接近光速 3% 的近心速度高速运转，是验证广义相对论的最干净实验室之一。",
      ],
    },
    {
      heading: "黑洞 · 物理学崩溃的地方",
      body: [
        "黑洞是宇宙中最极端的天体——在这里，广义相对论的时空曲率趋近无穷大，我们所知的物理定律在「奇点」处彻底失效。事件视界 r_s = 2GM/c² 是一条单向边界：任何进入的物质、光线、信息都无法返回。对于 Sgr A* 这个质量，视界半径约 0.08 AU（约 1200 万公里），比水星轨道还小——整个银河系的质量被压缩进一个太阳系内行星轨道尺度的空间里。",
        "黑洞不止一种。恒星质量黑洞（~5–100 M☉）由大质量恒星核心塌缩产生，银河系内估计有数亿个；超大质量黑洞（10⁶–10¹⁰ M☉）盘踞在几乎所有大星系中心，其形成机制至今成谜——可能是种子黑洞通过吸积和并合成长，也可能涉及早期宇宙的直接塌缩。中等质量黑洞（10²–10⁵ M☉）是缺失的一环，2019 年 LIGO 的 GW190521 事件探测到了 85 + 66 M☉ 的并合，产物落入了这个「质量间隙」。黑洞不是终点，而是理解量子引力、信息悖论、时空本质的钥匙——P3 相对论和 P8 前沿物理会继续深入这个主题。",
      ],
    },
    {
      heading: "银河宜居带 · 金发姑娘区",
      body: [
        "银河系并非处处适合生命——「银河宜居带 (Galactic Habitable Zone, GHZ)」的概念由 Gonzalez et al. 2001 首次系统提出。太靠近银心（R < 4 kpc），超新星爆发频率过高、恒星潮汐扰动剧烈、重元素丰度虽高但辐射环境恶劣；太远离银心（R > 10 kpc），金属丰度不足以形成类地行星。综合恒星形成率、超新星威胁、金属丰度和引力扰动四项因素，宜居带大致位于距银心 6–10 kpc 的环形区域内——太阳系恰好坐在 8.2 kpc 处，离最佳位置不远。",
        "后续研究 (Lineweaver et al. 2004, Gowanlock et al. 2011) 加入了时间维度：银河系早期的高超新星率让宜居窗口直到约 80 亿年前才真正打开，而且宜居带随恒星化学富集而缓慢向外扩展。这意味着银河系内复杂生命可能需要同时满足空间（金属丰度够但辐射不过量）和时间（避开早期超新星密集期）两个「金发姑娘」条件，大幅缩小了潜在宜居世界的搜索范围。",
      ],
    },
    {
      heading: "Gaia 时代的银河系制图",
      body: [
        "ESA Gaia 卫星 (2014–2025) 测出了约 18 亿颗恒星的视差、自行与径向速度，把银河系内的恒星运动学第一次变成了一份精确到 μas 级的数据库。DR3 (2022) 让无数次研究成为可能：星流化石、银盘翘曲、棒动力学、近邻恒星的化学考古。",
        "也是 Gaia 把「银河系是不是有四条主臂」的争论推到下一阶段 —— Drimmel & Spergel (2022) 的恒星密度图显示太阳所在的 Local Arm 比想象中更显著，可能其实是一条 minor 主臂。",
      ],
    },
    {
      heading: "银盘的翘曲与拥挤",
      body: [
        "银盘并非完美的平面 —— 它在外缘以「翘曲 (warp)」和「波纹 (corrugation)」存在变形。21cm 中性氢和 Gaia 红巨星都独立测到 ±0.5 kpc 的翘曲幅度，外加几 kpc 尺度的「鱼鳍」结构 (Cepheid 巡天 2019, 2022)。",
        "成因仍在讨论：可能是 Sagittarius 矮星系几亿年前掠过引发的振铃，也可能是与暗物质子晕的相互作用。无论如何，「盘子」这个比喻已经不够 —— 银河系更像一个被拍过一下的果冻，还在摇晃。",
      ],
    },
    {
      heading: "薄盘 · 厚盘 · 晕：三层时间史",
      body: [
        "银河系不是一个单一的盘 —— 它至少由三层结构叠合：薄盘 (标高 ~300 pc，年龄 < 8 Gyr，金属丰度高 [α/Fe] 低)、厚盘 (标高 ~900 pc，年龄 8–12 Gyr，[α/Fe] 高)、和恒星晕 (球状散布，年龄 > 12 Gyr，金属极贫)。每一层的运动学与化学指纹都不一样，对应一段不同的形成史。",
        "Bovy 2016 用 APOGEE 红巨星首次按化学拆出薄/厚盘，发现厚盘其实是「α-高」族群，而非简单的几何更厚。当下主流叙事是：厚盘在 z ~ 2 的湍流期就地形成；GSE 在 z ≈ 2 (8–10 Gyr 前) 砸进来，加热薄盘原始版本并贡献了大部分内晕；冷却的气体慢慢沉积出我们今天看到的薄盘 —— 这就是「inside-out + upside-down」生长模型。",
      ],
    },
    {
      heading: "棒、Galactic Fountain · 银河系的循环系统",
      body: [
        "银河系中部的恒星棒不是装饰：长约 4 kpc、模式速度 Ωb ≈ 38 km/s/kpc (Sanders 2019)，它把内盘气体扫向中心，是银心 ~0.4 M⊙/yr 恒星形成的主要补给。棒还在外盘产生 OLR (外林德布拉德共振)，可能正是「Hercules stream」这类局部速度团块的成因。",
        "在更大尺度上，盘面与晕之间在循环：超新星把热气体推到几 kpc 高度 (galactic fountain)，冷却后再以 HVC (high-velocity cloud) 的方式回落。HI4PI 与 GALFA-HI 21cm 全天巡天 (2016, 2018) 给出了这些云团的完整目录。这套循环让银河系既能持续造星又不至于把气耗尽 —— 今天的 SFR ~1.6 M⊙/yr 已经维持了几十亿年。",
        "把银河系想象成一座活着的城市：恒星棒是中心商务区的引力引擎，把郊区的「原材料」（气体）扫进核心；旋臂是主干道，年轻的大质量恒星沿路点亮像霓虹灯；银河喷泉是城市的水循环——超新星是蒸发海洋的太阳，把热气推上天，冷却后又以「雨」的形式落回盘面。银河系不是一座静态的建筑，而是一个不断吐纳、不断生长的有机体，46 亿年来维持着精密的物质平衡。",
      ],
    },
  ],
  sources: [
    {
      label: "GRAVITY Collaboration 2019 — Geometric distance to Sgr A*",
      url: "https://arxiv.org/abs/1904.05721",
      kind: "paper",
    },
    {
      label: "Bland-Hawthorn & Gerhard 2016 — The Galaxy in Context (ARA&A)",
      url: "https://arxiv.org/abs/1602.07702",
      kind: "paper",
    },
    {
      label: "EHT Collaboration 2022 — First image of Sgr A*",
      url: "https://iopscience.iop.org/issue/2041-8205/930/2",
      kind: "agency",
    },
    {
      label: "Gaia Collaboration 2023 — DR3 release paper",
      url: "https://arxiv.org/abs/2208.00211",
      kind: "paper",
    },
    {
      label: "Drimmel & Spergel 2001 — Three-dimensional structure of the Galaxy",
      url: "https://arxiv.org/abs/astro-ph/0101259",
      kind: "paper",
    },
    {
      label: "Bovy 2016 — Stellar populations in chemo-orbital space",
      url: "https://arxiv.org/abs/1610.07610",
      kind: "paper",
    },
    {
      label: "HI4PI Collaboration 2016 — All-sky HI 21cm survey",
      url: "https://arxiv.org/abs/1610.06175",
      kind: "paper",
    },
    {
      label: "Licquia & Newman 2015 — Galactic SFR & stellar mass",
      url: "https://arxiv.org/abs/1407.1078",
      kind: "paper",
    },
  ],
  // Arm marker positions are sampled at r=0.55 on each log spiral
  // (pitch 12°, innerR 0.2, 4-fold symmetry). Scene unit ≈ 15 kpc.
  markers: [
    {
      id: "sgr-a-star",
      name: { primary: "人马座 A* (银心黑洞)", latin: "Sagittarius A*" },
      position: [0, 0, 0],
      description:
        "银河系中心的超大质量黑洞，质量 4.30 × 10⁶ M⊙。S2 等恒星以接近光速 3% 的近心速度高速绕它运转，是验证广义相对论最干净的实验场。EHT 在 2022 年公布了它的「阴影」直接图像，是 M87* 之后第二个被直接拍到的黑洞。",
      data: [
        { label: "质量", value: "4.30 × 10⁶ M⊙" },
        { label: "Schwarzschild 半径", value: "~1.3 × 10¹⁰ m" },
        { label: "首次成像", value: "EHT 2022" },
      ],
      color: "#fff4d0",
      size: 0.022,
    },
    {
      id: "sun",
      name: { primary: "太阳", latin: "Sol" },
      position: [0.545, 0.001, 0],
      description:
        "G2V 主序星，距银心 R⊙ = 8.178 ± 0.013 kpc (GRAVITY 2019)。坐在 Local Arm (猎户臂) 上 —— 一段夹在 Sagittarius 与 Perseus 之间的次级旋臂。绕银心一周约 230 Myr。",
      data: [
        { label: "R⊙", value: "8.178 kpc" },
        { label: "公转周期", value: "~230 Myr" },
        { label: "所在旋臂", value: "Local Arm" },
      ],
      color: "#fff3c4",
      size: 0.02,
    },
    {
      id: "arm-perseus",
      name: { primary: "英仙臂", latin: "Perseus Arm" },
      // r=0.55, thetaOffset=0
      position: [0.027, 0, -0.549],
      description:
        "银河系最显著的两条主臂之一，距太阳约 2 kpc，含 Perseus OB 协会、NGC 869/884 双星团等大量年轻恒星。CO 巡天 (Dame 2001) 给出它清晰的对数螺旋轮廓。",
      data: [
        { label: "螺距角", value: "~12°" },
        { label: "距太阳", value: "~2 kpc" },
        { label: "类型", value: "主臂" },
      ],
      color: "#bcd5ff",
      size: 0.022,
    },
    {
      id: "arm-scutum-centaurus",
      name: { primary: "盾牌-半人马臂", latin: "Scutum-Centaurus Arm" },
      // r=0.55, thetaOffset=π/2
      position: [0.549, 0, 0.026],
      description:
        "另一条主要旋臂，从银心棒末端起，向太阳系内侧延伸。Spitzer GLIMPSE 红外巡天 (Churchwell 2009) 揭示它富含年轻大质量恒星与 HII 区，是银河系恒星形成最活跃的旋臂。",
      data: [
        { label: "螺距角", value: "~12°" },
        { label: "起点", value: "棒末端" },
        { label: "类型", value: "主臂" },
      ],
      color: "#ffc878",
      size: 0.022,
    },
    {
      id: "arm-sagittarius-carina",
      name: { primary: "人马-船底臂", latin: "Sagittarius-Carina Arm" },
      // r=0.55, thetaOffset=π
      position: [-0.027, 0, 0.549],
      description:
        "太阳内侧的次级旋臂，含 Eta Carinae、Carina 星云、Lagoon (M8)、Trifid (M20) 等知名 HII 区。在夏夜南天作为银河系最亮的部分肉眼可见。",
      data: [
        { label: "螺距角", value: "~12°" },
        { label: "代表天体", value: "Eta Car / M8 / M20" },
        { label: "类型", value: "次臂" },
      ],
      color: "#d4e2ff",
      size: 0.02,
    },
    {
      id: "arm-outer",
      name: { primary: "外旋臂 / 矩尺臂", latin: "Outer (Norma) Arm" },
      // r=0.55, thetaOffset=3π/2
      position: [-0.549, 0, -0.026],
      description:
        "银河系最外的主臂，距银心约 16 kpc。恒星形成已显著减弱，主要由较老的恒星与扩散气体组成。Drimmel (2000) 用 K 波段恒星计数图认为银河系实际只有 2 条主臂，但其他研究 (Vallée 2017) 仍维持 4 主臂。",
      data: [
        { label: "螺距角", value: "~12°" },
        { label: "距银心", value: "~16 kpc" },
        { label: "争议", value: "2 或 4 主臂" },
      ],
      color: "#ffb86a",
      size: 0.02,
    },
    {
      id: "galactic-fountain",
      name: { primary: "银河喷泉", latin: "Galactic Fountain" },
      // Above the disc plane (Y), near the sun's radial direction.
      position: [0.32, 0.18, 0],
      description:
        "超新星把热气体推到几 kpc 高度，冷却后再以 HVC (high-velocity cloud) 的方式回落 —— 这套「喷泉」让银河系既能持续造星又不至于把气耗尽。HI4PI 与 GALFA-HI (2016/2018) 21cm 全天巡天给出了 HVC 的完整目录；今天的 SFR ≈ 1.6 M⊙/yr 已经被这套循环维持了几十亿年。",
      data: [
        { label: "回落速度", value: "100–400 km/s" },
        { label: "高度", value: "几 kpc" },
        { label: "全天巡天", value: "HI4PI 2016" },
      ],
      color: "#a0d4ff",
      size: 0.024,
    },
    {
      id: "omega-cen",
      name: { primary: "半人马 ω 球状星团", latin: "ω Centauri / NGC 5139" },
      // Galactic halo: r ~ 5 kpc (Z plane, off-disc).
      position: [-0.21, -0.12, 0.03],
      description:
        "银河系最大的球状星团，含约 10⁷ 颗恒星 — 比典型球状团重一个数量级。多次星族与重元素弥散度暗示它可能是被剥皮的矮椭球核心，是研究恒星化学考古的标杆。M13 (北天)、47 Tuc (南天) 是另外两颗常被科普的代表，整个银河晕里共 ~150 颗球状团 (Harris 2010)。",
      data: [
        { label: "距太阳", value: "5.2 kpc" },
        { label: "成员", value: "~10⁷ stars" },
        { label: "总数", value: "~150 (Harris 2010)" },
      ],
      color: "#ffd29a",
      size: 0.018,
    },
  ],
};

export default content;

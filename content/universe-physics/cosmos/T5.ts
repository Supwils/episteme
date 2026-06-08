import type { TierContent } from "@/lib/content";

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
      label: "比邻星b",
      latinLabel: "Proxima Centauri b",
      value: "1.3 M⊕",
      hint: "距太阳系最近的系外行星，位于宜居带内",
    },
    {
      label: "恒星金属丰度范围",
      latinLabel: "Metallicity spread",
      value: "[Fe/H] ≈ −0.5 to +0.3",
      hint: "邻域 G/K 型星 · 与太阳对比",
    },
    {
      label: "邻域恒星年龄范围",
      latinLabel: "Age spread",
      value: "0.01 – 12 Gyr",
      hint: "从 TWA 到 Barnard's Star",
    },
    {
      label: "JWST 系外行星大气光谱",
      latinLabel: "JWST exoplanet spectra",
      value: "20+ 颗已观测",
      hint: "透射/发射光谱 · 2022–2025",
    },
    {
      label: "TRAPPIST-1 b/c 大气约束",
      latinLabel: "TRAPPIST-1 atmosphere limits",
      value: "b 无厚大气 (95%)",
      hint: "JWST MIRI 4.5 μm · Greene et al. 2023",
    },
    {
      label: "星际天体",
      latinLabel: "Interstellar objects",
      value: "2 已知",
      hint: "'Oumuamua (2017) / 2I Borisov (2019)",
    },
    {
      label: "K2-18b DMS 候选信号",
      latinLabel: "K2-18b dimethyl sulfide",
      value: "DMS 2.6σ 候选",
      hint: "JWST NIRSpec · Madhusudhan et al. 2025",
    },
  ],
  narrative: [
    {
      heading: "近邻是被矮星统治的",
      body: [
        "把太阳和它周围 50 光年内的所有恒星摊在一张图上，会发现一个反直觉的事实：占绝对多数的不是太阳这样的 G 型黄矮星，而是更小、更冷、更暗的 M 型红矮星——它们占了恒星总数的约四分之三。",
        "我们之所以从来不在天上「看到」红矮星，是因为它们太暗：50 光年内最近的红矮星 Proxima Centauri 的视星等是 11.13，比肉眼极限暗了 6 等以上。我们能看到的所有星座主角，都是更稀少的 F / A / 巨星这一类亮星。",
        "这个分布不是邻域的特殊性——它反映的是整个银河系的初始质量函数 (IMF)。Salpeter 1955 年首次测出 IMF 在 > 1 M⊙ 区间遵循 dN/dM ∝ M^(-2.35)，后来 Kroupa (2001) 和 Chabrier (2003) 把它修正到更低质量，显示 IMF 在 ~0.2 M⊙ 处有个峰值——M 矮星恰好在峰值附近。这意味着：恒星质量越小越多，但 0.08 M⊙ 以下 (氢燃烧极限) 就变成棕矮星。宇宙中 ~75% 的「恒星」是 M 矮星，但它们贡献的总光度不到 5%；真正照亮夜空的，是那些稀少的大质量恒星的光。邻域普查 (RECONS, Gaia) 之所以重要，正是因为只有最近的 M 矮星才能被完整计数——越远越暗的 M 矮星越容易被遗漏。",
      ],
    },
    {
      heading: "等级森严的视亮度",
      body: [
        "肉眼夜空大约只能分辨 6000 颗左右的恒星，绝大多数都来自这 50 ly 的小球。Sirius A（A1V，8.6 ly）是其中最亮的，视星等 −1.46。它附近的 Sirius B 是首个被确认的白矮星 (Bessel 1844 推测、Adams 1925 光谱证实)。",
        "Vega、Altair、Fomalhaut 三颗 A 型恒星形成了北半球的「夏季三角」，距离都在 16–25 ly 之间，是同一波恒星形成的活跃 A 型主序星。",
        "视亮度的等级森严可以用数字直观感受：Sirius A 的绝对星等 +1.42，Proxima Centauri 的绝对星等 +15.5，两者相差 14 个星等——即光度差约 40 万倍。但因为距离差只有 2 倍 (8.6 vs 4.2 ly)，视亮度差就扩大到了 ~10 亿倍。夜空的「主角」之所以是 A/F 型亮星，不是因为它们数量多，而是因为它们在光度函数的高端——每一颗亮星的光都抵得上十万颗 M 矮星。这就是为什么肉眼夜空和真实恒星人口之间存在巨大的选择效应偏差。Gaia 的意义之一正是克服这个偏差：它测到的 ~18 亿颗恒星中，绝大多数是 M 矮星，是通过视差和光度函数的统计校正才把它们「看全」的。",
      ],
    },
    {
      heading: "Alpha Centauri：太阳的引力邻居",
      body: [
        "Alpha Centauri 是一个三合星系统：Alpha Cen A 与太阳几乎是双胞胎 (G2V, 1.1 M⊙)；Alpha Cen B 是稍小的 K 型；Proxima Centauri 是远在 0.2 ly 外的小 M5.5V，绕 A/B 双星运转。",
        "Proxima 拥有已知最近的潜在宜居行星 Proxima b (Anglada-Escudé 2016, 1.27 R⊕)，但其母星的强 X 射线耀斑可能让它的大气难以稳定存在。Breakthrough Starshot 计划 (2016 起) 希望用激光帆 20 年内把 1 g 的探测器送到这里。",
        "Alpha Centauri 系统的科学价值不仅在于「最近」，更在于它提供了一个可以与太阳做逐项对比的基准。Alpha Cen A (G2V, 1.1 M⊙, 1.5 L⊙, [Fe/H] ≈ +0.2) 的化学丰度和年龄 (~6 Gyr) 与太阳极为相似，但金属丰度略高——这可能是为什么它的行星形成历史与太阳系不同的线索之一。2021 年 ALMA 在 Alpha Cen A 周围探测到毫米波连续谱辐射，暗示可能存在冷尘埃盘 (类柯伊伯带)，但后续更灵敏的观测 (2023) 未能确认。TESS 和未来的 PLATO 任务将继续监测这个系统，寻找凌日信号。如果 Breakthrough Starshot 的 100 GW 激光帆真的在 2050 年代起航，它将在 ~2070 年代飞越 Alpha Centauri，以 0.2c 的速度拍摄比邻星系的图像并传回地球——这将是人类第一次用物理探测器触达另一个恒星系统。",
      ],
    },
    {
      heading: "类太阳目标",
      body: [
        "想找「另一个太阳」的工程在邻域里有几个明显候选：Tau Ceti (G8V, 11.9 ly)、Epsilon Eridani (K2V, 10.5 ly)、61 Cygni A (K5V, 11.4 ly) 是 SETI Project Phoenix 与 Allen Telescope Array 的主要监听对象。Tau Ceti 在 2017 年被确认有 4 颗已知行星，其中两颗轨道边缘宜居带。",
        "这些候选之所以被 SETI 优先关注，不仅因为距离近，还因为它们的恒星类型 (G/K 型) 代表了「类太阳条件」：寿命足够长 (5–15 Gyr)，光度足够稳定 (无剧烈耀斑)，宜居带位置合理 (0.5–1.5 AU)。Tau Ceti 的金属丰度 [Fe/H] ≈ −0.5，比太阳低一半——低金属丰度意味着形成行星的原料较少，但并不排除行星存在。Tau Ceti e 和 f 的最小质量约 3–4 M⊕，可能处于超级地球到迷你海王星的过渡区。",
        "Epsilon Eridani 是邻域中最近的 K 型星之一，有一颗已确认的行星 Eps Eri b (~0.7 M_J, 3.4 AU) 和一个类似柯伊伯带的冷尘埃盘 (COBE 1998 首次探测)。它的年龄 (~0.8 Gyr) 远小于太阳，恒星活动更剧烈——这让它在宜居性评估中失分，但也让它成为研究年轻恒星周围行星系统演化的好样本。SETI 在这些方向上的监听虽然从未检测到信号，但它们代表了「搜索策略」与「恒星物理学」的交叉——每颗候选星都是一个假设的实验室，检验「类太阳条件 → 可能的文明」这条推理链的每一步。",
      ],
    },
    {
      heading: "HR 图 · 邻域恒星的体检报告",
      body: [
        "把这 50 ly 内 1300 个系统按表面温度 (横轴) 与光度 (纵轴) 画到 Hertzsprung-Russell 图上，会发现绝大多数都老老实实贴在「主序带」上 —— 那是恒星一辈子里最长的一段稳定燃氢期。太阳坐在主序中段；右下角密密麻麻的红点是 M 矮星；左下角孤立的几个蓝白点是密度 ~10⁹ kg/m³ 的白矮星，比如 Sirius B 和 Procyon B。",
        "比主序更冷更暗的还有一族「失败的恒星」：棕矮星。它们质量 13–80 M_J，核心从未达到稳定氢聚变温度，只能短暂地烧氘。WISE 卫星在 10 pc 内发现了约 30 颗这样的天体，按温度从高到低分为 L、T、Y 三个晚型谱型 —— Y 型最冷可降到 ~250 K，比室温还低。一颗 Y 型棕矮星离我们最近的是 WISE 0855-0714 (距离 7.27 ly)，温度 ~250 K，是已知最冷的「准恒星」。",
        "HR 图上还有一个关键特征：主序的「转折点 (main-sequence turnoff)」。在球状星团中，转折点的位置直接给出星团年龄——因为更重的恒星先耗尽核心氢、离开主序。但在邻域样本中，恒星年龄不统一 (从 10 Myr 的 TWA 星协到 12 Gyr 的 Barnard's Star)，所以 HR 图上的「主序散布」反映的是不同年龄恒星的位置叠加。Gaia 的高精度视差让每一颗邻域恒星都有了精确的绝对星等，从而使年龄估计可以依赖「等时线拟合 (isochrone fitting)」——把观测点叠到不同年龄的理论等时线上，看哪条最吻合。这正是 gyrochronology (自转年龄学) 和 asteroseismology (星震学) 在 Gaia 时代的应用场景。",
      ],
    },
    {
      heading: "近邻行星 · TRAPPIST-1 与 TOI-700d",
      body: [
        "近邻 50 ly 内目前已确认约 250 颗系外行星，其中 TRAPPIST-1 (距离 40.7 ly) 是最戏剧的一个：一颗 M8V 红矮星，周围七颗大小近似地球的岩石行星 (Gillon 2017)，其中三颗 (e/f/g) 落在保守宜居带内。JWST 已对 b/c/d 做过中红外辐射测光，2023 年的结果暗示 b 几乎没有大气。",
        "更新的发现还有 TOI-700d (M2V, 101 ly，TESS 2020) 与 Proxima b。Kopparapu 2013 的保守宜居带定义把 M 矮星周围的 CHZ 内边界推到比太阳系窄得多 (因为大气 H₂O 损失阈值随光谱型变化)，让「红矮星宜居」从希望变得更现实 —— 也让红矮星耀斑的剥离效应成为热门研究问题。",
        "TRAPPIST-1 系统的特殊之处在于它的七颗行星间距极紧密——最远的 h 轨道半径也只有 0.06 AU，整个行星系挤在水星轨道以内。这种紧凑排列可能是 M 矮星周围行星形成的常态：低质量恒星的原行星盘更小更冷，行星在冰线以内就能形成岩石世界。JWST 在 2023–2024 年的透射光谱观测是第一次在宜居带岩石行星上搜索大气的关键尝试。如果 TRAPPIST-1 e 或 f 被发现有含 CO₂ 或 O₃ 的大气，那将是「红矮星宜居性」争论的转折点。如果所有七颗行星都被确认没有大气（像 b 那样），那么红矮星的持续耀斑活动可能确实是一道难以逾越的屏障——这将把宜居行星的搜索重心推回到更安静的 K 型和 G 型恒星周围。",
      ],
    },
    {
      heading: "比邻星b · 最近的系外宜居候选",
      body: [
        "2016 年 Anglada-Escudé 等人利用 HARPS 光谱仪对比邻星长达 16 年的径向速度监测，发现了周期 11.2 天、最小质量 1.27 M⊕ 的信号——这就是 Proxima b，距我们仅 4.24 光年的岩石行星，位于其母星保守宜居带内缘。它是离太阳系最近的系外行星，也是 SETI 与直接成像的首要目标。",
        "然而「宜居」二字远未坐实：比邻星是一颗活跃的 M5.5V 红矮星，频繁的 X 射线与极紫外耀斑可能在数亿年内剥离行星大气。2022 年 JWST 未能在 TRAPPIST-1 b 上探测到大气，加剧了对红矮星宜居带行星的悲观情绪。Breakthrough Starshot 计划（2016 年启动）设想用 100 GW 地面激光阵列把 1 g 的光帆加速到 0.2c，约 20 年抵达比邻星——这是目前唯一以现有物理定律框架内可想象的方式触达最近系外行星的工程愿景。",
        "Proxima b 的大气问题在 2024 年有了新进展：JWST 在 4.5 μm 波段对 Proxima b 的二次食 (secondary eclipse) 做了上界约束，排除了厚 CO₂ 大气的可能性，但无法排除薄 N₂ 大气 (类地大气)。比邻星的耀斑频率约为太阳的 10–100 倍，每次耀斑在 EUV 波段释放 ~10³⁰ erg，可以直接加热行星上层大气并驱动大气逃逸。数值模拟 (Dong et al. 2017, 2018) 显示，如果 Proxima b 拥有地球强度的磁场 (偶极矩 ~10²⁵ A·m²)，它可以保护大气免受最严重耀斑的剥离——但磁场强度本身不可观测，只能靠间接约束。Proxima c (2020 发现，~7 M⊕，~5.2 AU 周期 1900 天) 和 Proxima d (2022 发现，~0.26 M⊕，~0.029 AU) 让这个系统变得更加复杂——它是小型多行星系统的典型代表，每颗行星的宜居性需要单独评估。",
      ],
    },
    {
      heading: "JWST 透射光谱革命：红矮星行星的大气审判",
      body: [
        "JWST 在 2022–2025 年间对 ~20 颗系外行星进行了透射光谱和发射光谱观测，开启了「系外行星大气表征」的新时代。其中最具里程碑意义的是对 TRAPPIST-1 b 和 c 的 MIRI 4.5 μm 观测：Greene et al. (2023, Nature) 报告 TRAPPIST-1 b 的 4.5 μm 二次食深度与裸岩大气一致，以 95% 置信度排除了厚 CO₂ 大气 (> 1 bar)。Lim et al. (2023) 对 TRAPPIST-1 c 的类似观测也排除了厚 CO₂ 主导大气，但允许薄 CO₂ 或 N₂ 主导大气存在。",
        "这些结果对红矮星宜居性争论产生了深远影响。TRAPPIST-1 b/c 是系统中最内侧的两颗行星（0.011/0.015 AU），不在宜居带内，所以它们没有大气并不意外——但它们的「裸岩」结果强化了一个担忧：M 矮星的持续耀斑活动可能在数十亿年内系统性地剥离所有行星的大气。TRAPPIST-1 e/f/g（宜居带行星）的大气观测需要更高的信噪比，JWST 的 Cycle 3–4 时间分配已经包含了这些目标。在更远的距离上，JWST 还对 K2-18 b（124 ly，2.6 R⊕，~8.6 M⊕）的透射光谱中探测到了 CH₄ 和 CO₂ (Madhusudhan et al. 2023, Nature)，这是首次在宜居带系外行星上探测到碳基分子——虽然 K2-18 b 更可能是迷你海王星而非岩石行星，但这个结果证明 JWST 有能力在亚海王星质量行星上识别大气成分。JWST 的系外行星大气光谱正在从「能不能探测到」转向「能不能定量约束」——下一步是用多波段联合拟合约束大气的温度-压力剖面和化学丰度。",
      ],
    },
    {
      heading: "星际天体：太阳系外的漂流物",
      body: [
        "2017 年 10 月，Pan-STARRS1 望远镜发现了一个以 hyperbolic 轨道 (e ≈ 1.2) 穿越太阳系的天体——'Oumuamua (1I/2017 U1)。它是人类首次确认的星际天体。它的光变曲线暗示长条形或薄饼形的形态 (长宽比 > 5:1)，但质量太小无法被引力测量。最引人注目的是它在离开太阳系时出现了非引力加速 (Micheli et al. 2018)，不能用太阳辐射压完全解释——Loeb (2018) 甚至提出了太阳帆假说 (alien artifact)，但主流解释是挥发性物质 (N₂ 或 CO 冰) 的排气 (outgassing)。",
        "2019 年 8 月，业余天文学家 Gennadiy Borisov 发现了第二个星际天体 2I/Borisov。与 'Oumuamua 不同，2I/Borisov 有明显的彗发和彗尾——它的光谱成分与太阳系彗星几乎无法区分 (Jewitt & Luu 2019)，说明彗星在恒星际空间的形成和演化过程可能比预想的更统一。'Oumuamua 和 2I/Borisov 的发现频率暗示银河系中星际天体的密度约 ~0.2 AU⁻³ (Do et al. 2018)，如果这个估计正确，那么太阳系内随时可能有 ~1–10 个星际天体正在穿越——Vera C. Rubin Observatory (LSST, 2025 起全面运行) 预计每年将发现 1–10 个新的星际天体。研究它们的成分、形态和轨道将直接回答一个问题：其他恒星系统的原行星盘残留物与我们的太阳系有什么不同？",
      ],
    },
    {
      heading: "最新发现：K2-18b 大气中的二甲基硫候选信号",
      body: [
        "K2-18b (124 ly, 2.6 R⊕, ~8.6 M⊕) 在 2023 年因 Madhusudhan et al. (Nature) 探测到 CH₄ 和 CO₂ 而成为头条——这是首次在宜居带系外行星上发现碳基分子。2025 年初，同一团队用 JWST NIRSpec 的后续观测 (2024 年 Cycle 2 数据) 报告了一个更惊人的信号：在 ~3.4 μm 处出现了一个与二甲基硫 (dimethyl sulfide, DMS) 吸收特征一致的谱线，信噪比约 2.6σ。DMS 在地球上几乎只由浮游植物产生——如果确认，它将成为第一个潜在的系外行星生物标志气体 (biosignature gas)。",
        "然而必须强调 2.6σ 不是 5σ 发现阈值。DMS 的吸收特征与乙烷 (C₂H₆) 和某些光化学产物的谱线重叠，当前光谱分辨率和信噪比不足以排除这些替代解释。Madhusudhan et al. 2025 (submitted) 把 K2-18b 归类为「Hycean world」——一个富水海洋 + 富氢大气的亚海王星——在这类行星上 DMS 的光化学产生路径 (非生物来源) 尚未被充分研究。更关键的是，K2-18b 的质量 (~8.6 M⊕) 和半径 (2.6 R⊕) 意味着它很可能有一个厚重的气体包层，而非裸露的岩石表面——即使海洋存在，它也可能被 ~100 km 厚的高压冰层隔开。JWST Cycle 3 已批准对 K2-18b 的多波段高分辨率光谱观测，预计 2025 年底给出更确定的结果。无论 DMS 最终被确认还是被排除，K2-18b 已经成为「宜居带行星大气表征」的标杆案例——它证明 JWST 有能力在亚海王星质量行星上逐分子地解析大气成分。",
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
    {
      label: "Kroupa 2001 — The initial mass function of stars",
      url: "https://arxiv.org/abs/astro-ph/0009005",
      kind: "paper",
    },
    {
      label: "Dong et al. 2017 — Atmospheric escape from Proxima b",
      url: "https://arxiv.org/abs/1705.09920",
      kind: "paper",
    },
    {
      label: "Greene et al. 2023 — Thermal emission from TRAPPIST-1 b (JWST)",
      url: "https://www.nature.com/articles/s41586-023-06232-z",
      kind: "paper",
    },
    {
      label: "Madhusudhan et al. 2023 — Carbon-bearing molecules in K2-18 b atmosphere",
      url: "https://www.nature.com/articles/s41586-023-06497-y",
      kind: "paper",
    },
    {
      label: "Madhusudhan et al. 2025 — DMS candidate signal in K2-18 b atmosphere",
      url: "https://arxiv.org/abs/2501.01500",
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
  ],
  discussionQuestions: [
    "75% 的恒星是 M 矮星但我们肉眼看不到——我们的直觉在多大程度上被「选择效应」扭曲了？",
    "TRAPPIST-1 b 几乎没有大气——这对红矮星宜居带行星的前景意味着什么？生命需要什么样的恒星？",
    "星际天体 ʻOumuamua 的非引力加速至今没有完全解释——你觉得最可能的解释是什么？",
  ],
};

export default content;

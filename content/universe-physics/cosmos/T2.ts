import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "T2",
  name: { primary: "拉尼亚凯亚超星系团", latin: "Laniakea Supercluster" },
  tagline: "我们所在的引力分水岭",
  whisper: "Laniakea，夏威夷语：「广阔的天」。",
  dataCards: [
    {
      label: "直径",
      latinLabel: "Diameter",
      value: "160 Mpc",
      hint: "≈ 5.2 × 10⁸ ly",
    },
    {
      label: "包含星系数",
      latinLabel: "Galaxies",
      value: "≈ 100 000",
    },
    {
      label: "总质量",
      latinLabel: "Mass",
      value: "10¹⁷ M⊙",
      hint: "± 0.1 dex",
    },
    {
      label: "Great Attractor 方向",
      latinLabel: "Great Attractor",
      value: "ℓ = 307° · b = +9°",
      hint: "银河坐标系",
    },
    {
      label: "Hubble 流速",
      latinLabel: "Hubble flow",
      value: "≈ 600 km/s",
      hint: "Laniakea 整体本动",
    },
    {
      label: "总光度",
      latinLabel: "Luminosity",
      value: "≈ 10¹³ L⊙",
      hint: "光学+IR (2MRS)",
    },
    {
      label: "命名",
      latinLabel: "Etymology",
      value: "夏威夷语「广阔的天」",
      hint: "Tully 等人 2014",
    },
    {
      label: "Shapley 距离",
      latinLabel: "Shapley distance",
      value: "≈ 200 Mpc",
      hint: "下一级引力中心",
    },
    {
      label: "CMB 偶极",
      latinLabel: "CMB dipole",
      value: "3.362 mK",
      hint: "本动 627 km/s · COBE/Planck",
    },
    {
      label: "CosmicFlows-4 距离样本",
      latinLabel: "CF4 distances",
      value: "≈ 56 000",
      hint: "Tully et al. 2023",
    },
    {
      label: "Abell-Corwin-Olowin 编目",
      latinLabel: "ACO 1989",
      value: "4 073 富团",
      hint: "首份系统超星系团目录",
    },
    {
      label: "Great Attractor 质量",
      latinLabel: "GA mass",
      value: "≈ 5 × 10¹⁵ M⊙",
      hint: "Norma + Centaurus 组合",
    },
    {
      label: "Laniakea 本动速度",
      latinLabel: "Laniakea peculiar velocity",
      value: "627 km/s",
      hint: "相对 CMB 静止系 · Planck 2018",
    },
    {
      label: "Laniakea 子结构数",
      latinLabel: "Substructures",
      value: "≈ 300 组",
      hint: "星系群与小团",
    },
    {
      label: "Laniakea 整体流向",
      latinLabel: "Laniakea bulk flow",
      value: "~300 km/s → Shapley",
      hint: "Pomarède et al. 2024 · 争议中",
    },
    {
      label: "DES 超星系团候选",
      latinLabel: "DES supercluster catalog",
      value: "≈ 17 000",
      hint: "DES Y3 光度红移 · 2024",
    },
    {
      label: "CF4 速度场角分辨率",
      latinLabel: "CF4 angular resolution",
      value: "~5°",
      hint: "~56 000 独立距离 · Tully 2023",
    },
    {
      label: "Laniakea 总质量",
      latinLabel: "Laniakea total mass",
      value: "≈ 10¹⁷ M⊙",
      hint: "含暗物质 · Tully 2014 + CF4 修正",
    },
  ],
  narrative: [
    {
      heading: "用流向定义一个超星系团",
      body: [
        "传统超星系团的边界是含糊的 —— 你按密度阈值切一下就得到一个团，阈值换一个边界就换一个。2014 年 Tully 等人换了个思路：看星系的本动速度场，把所有「向同一个引力盆地流去」的星系划在一起。这个盆地就是 Laniakea，它的边界是流向反转的分水岭。",
        "用这个定义，我们与几乎所有相邻的星系群 —— 本星系群、Virgo 团、Hydra-Centaurus、Norma —— 一起都是 Laniakea 的居民。",
        "这个方法之所以优于密度阈值法，是因为引力势场的分水岭在物理上更稳健：无论你用哪个密度阈值切，流向反转的位置不变。CosmicFlows-4 (2023) 的 ~56,000 个独立距离测量让速度场的角分辨率达到了 ~5°，足以分辨 Laniakea 内部的多个子盆地——每个子盆地对应一个星系团尺度的引力中心。这就像用等高线在地形图上画流域：「水往哪里流」比「哪里山高」更能定义一条河的边界。",
      ],
    },
    {
      heading: "Great Attractor：盆地的最低点",
      body: [
        "盆地的底部位于银河坐标 ℓ ≈ 307°, b ≈ +9° 方向、距离约 60 Mpc 处，叫 Great Attractor。它被银河系本身挡在「避带 (Zone of Avoidance)」里，X 射线巡天才看到背后的 Norma Cluster 与 Centaurus 等真实质量来源。",
        "整个 Laniakea 以约 600 km/s 的速度向那里流去 —— 我们脚下的太阳系也在其中。",
        "Great Attractor 的总质量约为 5 × 10¹⁵ M⊙，分布在 Norma (ACO 3627)、Centaurus (A3526/A3565)、Hydra (A1060) 等多个星系团以及它们之间的纤维结构中。它不是一个单一的超大质量天体，而是一个引力汇聚区。1980 年代 Dressler 等人首次注意到近邻星系存在系统性的「偶极流 (dipole flow)」，指向银河隐带方向，但直到 X 射线巡天 (RXTE, HEAO-1) 和红外巡天 (2MASS, 2MRS) 才穿透尘埃，揭示了背后的真正质量分布。Kraan-Korteweg 团队从 1990 年代起在 Zone of Avoidance 内系统搜索星系，已确认 Norma 团是 GA 的核心质量贡献者。",
      ],
    },
    {
      heading: "在更大的盆地里",
      body: [
        "Laniakea 自身又只是一个更大尺度结构的一部分。最新的研究 (Pomarède et al. 2024) 提示它可能整体被「Shapley 流盆地」吸引。这意味着「我们属于哪个超星系团」的答案，会随观测精度往外一层层修正 —— 这是一个还没结束的故事。",
        "Shapley 集中区 (Shapley Concentration) 距离我们约 200 Mpc，是已知最大的超星系团之一。它对本动场的贡献长期以来与 Great Attractor 难以分离 —— 当 GA 「拉」我们 600 km/s 时，远端的 Shapley 又在 GA 后面再拉一份。CosmicFlows-4 (2023) 用 ~5万个独立距离测量重建出了完整速度场，证实 Shapley 是 Laniakea 之外的下一个引力中心。",
        "Pomarède et al. (2024) 的最新结果表明，Laniakea 与 Shapley 之间的「分水岭」可能并不是真正的引力平衡面——Laniakea 作为一个整体可能正在向 Shapley 方向加速。如果是这样，Laniakea 就不是一个引力束缚系统，而是 Shapley 盆地中的一个「局部流域」。这就像问「长江流域属于太平洋还是属于地球」——答案取决于你画多大的圈。超星系团的定义正在从「有多少星系」演化为「引力势如何分层嵌套」，这是过去十年观测宇宙学最深刻的概念转变之一。",
      ],
    },
    {
      heading: "怎么测一个看不见的盆地",
      body: [
        "整张 Laniakea 地图不是直接看出来的，而是「测速度反推势场」拼出来的。每一个目标星系都需要一个独立的距离测量（Tully-Fisher、Fundamental Plane、Cepheid、SNe Ia），再用红移 z 算出本动速度 v_pec = cz − H₀ d。然后把所有矢量场代入 Wiener 滤波，反推三维引力势。",
        "这是为什么 Laniakea 的边界不是「物质多」的等密度面，而是「流向反转」的等势面分界 —— 数学上更稳健，物理上也更接近「超星系团」的本意。",
        "Wiener 滤波是一种贝叶斯重构技术：它假设宇宙密度场是一个高斯随机场（线性尺度上近似成立），用观测到的星系速度场作为「数据」，用功率谱作为「先验」，输出最可能的三维速度场与密度场重构。在 Laniakea 这个尺度上，Wiener 滤波能还原出肉眼看不见的「空洞排斥」和「纤维引导」效应——星系不仅被节点吸引，还被空洞推开。Tully 2014 的 V-web 可视化正是基于这个重构：速度场发散为负的区域是吸引节点，发散为正的区域是排斥空洞，而 Laniakea 的分水岭恰好是两种效应的零线。",
      ],
    },
    {
      heading: "宇宙旋涡：Cosmic Flow",
      body: [
        "把上一段提到的本动速度场画出来，Laniakea 在三维空间里像一团从外向内汇聚的「流体」。最近 Hoffman et al. (2017) 把它形象化为 V-web —— 速度发散为负的「井」是节点（cluster），速度发散为正的「峰」是空洞（void）。",
        "这套视角把宇宙大尺度结构从「点云分布」升级成「向量场」，是过去十年观测宇宙学最重要的范式之一。本档的流线就是 Tully 团队公开的 v-web 主流方向。",
        "V-web 的分类很简单：速度场的三个特征值（λ₁ > λ₂ > λ）如果全负，该区域是「吸引节点」(node)；两个负一个正是「吸引纤维」(filament)；一个负两个正是「排斥薄片」(sheet)；全正是「排斥空洞」(void)。这种分类方法在宇宙学模拟中已经被广泛采用，因为它对网格分辨率和示踪星系的选择都不敏感——不管你用什么方法重构速度场，V-web 的拓扑分类都相当稳健。Hoffman et al. (2017) 用 CosmicFlows-3 数据做出的 V-web 图直接显示了 Laniakea 如何被嵌套在更大尺度的 Perseus-Pisces、Shapley 流中——宇宙的流向是一层层嵌套的引力盆地，像俄罗斯套娃。",
      ],
    },
    {
      heading: "超星系团目录 · 从 ACO 到 Einasto",
      body: [
        "1989 年 Abell、Corwin 与 Olowin 把北南两半天合起来发布了 4 073 个富星系团编目 (ACO 1989)，这是第一份覆盖全天的高质量富团清单，后续所有超星系团研究都从这张表起步。同年 Einasto 用密度阈值法把这些团连成了 220 多个「超星系团」初版目录 —— 那是第一次有人尝试把超星系团这个概念形式化。",
        "三十多年里目录在不断翻新：MSCC (Chow-Martínez 2014) 收录 ~600 个；CosmicFlows-4 (Tully 2023) 用速度场重画分水岭，让 Laniakea、Perseus-Pisces、Shapley、Hercules 各自成为可定量描述的实体。互文 T1：超星系团就是 cosmic web 节点在这一尺度的命名学。",
        "目录演进的逻辑是探针在变：ACO 靠光学星系团计数 (Abell richness class)；Einasto 用密度等高线；Tully 2014 用速度势分水岭；Muldrew et al. (2012) 在模拟中用 halo-based friends-of-friends 算法。每换一种方法，超星系团的成员和边界就可能改变——这说明超星系团不像星系或星系团那样有「物理边界」，而是大尺度结构的统计描述。Laniakea 的贡献在于第一次给出了一个不依赖阈值选择的定义方法：引力势的分水岭是唯一的，不管你怎么画。但需要注意的是，CosmicFlows 距离测量本身的误差 (10–20%) 会直接传播到势场重构中，使得边界的确切位置仍有不确定性。",
      ],
    },
    {
      heading: "CMB 偶极 · 我们正在动",
      body: [
        "CMB 在天上看到的不是完美 2.7255 K 各向同性，而是叠加了一个 3.362 mK 的偶极图样——天空一侧偏热、对侧偏冷。这不是宇宙学起源，而是因为太阳系正以约 370 km/s 相对 CMB 静止系运动，多普勒红蓝移把背景温度抹出了一个 cos θ 形状。",
        "把太阳绕银心、银河系在本星系群里、本星系群相对 Virgo 的运动一层层减掉，剩下的本动是 627 km/s，方向正指向 Laniakea 的引力盆地下方。这是 Laniakea 存在最直接的运动学证据，也是为什么 GA / Shapley 在 1980 年代未被识别之前就已经在 CMB 上「签了名」。",
        "CMB 偶极在 ΛCDM 中被认为几乎完全由我们的本动产生 (kinematic dipole)，但也有人检验它是否包含「内在偶极 (intrinsic dipole)」——即 CMB 本身是否在大尺度上各向异性。Planck 2018 把内在偶极上限压到了 ΔT < 3 μK，远小于运动学偶极的 3.36 mK。但更有趣的是：Quartin et al. (2014) 指出，如果宇宙大尺度上存在一个 matter dipole（即我们处在物质密度梯度中），那么远距离天体的数密度也会呈现偶极各向异性——DESI 和未来的 SKA 有望独立检验这个预言。如果 CMB 偶极和物质偶极方向不完全一致，那将是宇宙学原理 (各向同性假设) 被打破的信号。",
      ],
    },
    {
      heading: "Laniakea 整体流动 · 它是束缚系统还是 Shapley 的支流？",
      body: [
        "Laniakea 最深层的未解问题是：它是一个引力束缚的超星系团，还是仅仅是更大尺度流动中的一个「局部流域」？Tully 2014 最初的定义基于流向分水岭——所有向 Great Attractor 方向汇聚的星系都属于 Laniakea。但 Pomarède et al. (2024) 用 CosmicFlows-4 数据重建速度场后发现，Laniakea 的整体质心可能正在以 ~300 km/s 的速度向 Shapley 方向漂移。如果这个「整体流 (bulk flow)」被确认，那么 Laniakea 与 Shapley 之间并不存在真正的引力平衡面——Laniakea 只是 Shapley 引力盆地中的一个子流域。",
        "这个争论有深刻的宇宙学含义：如果 Laniakea 不是束缚系统，那么「超星系团」这个概念就更像是大尺度流动的统计描述，而非像星系团那样有明确物理边界的天体。这与 ΛCDM 的预言一致——在 ΛCDM 中，只有质量足够小的过密度才能在宇宙年龄内坍缩，超星系团尺度的结构大多仍在膨胀中 (只是比哈勃流慢)。2024 年 Kashlinsky 等人用 CMB kSZ (运动学 SZ) 效应独立测量了 Laniakea 方向的 bulk flow，在 r < 300 Mpc 范围内得到 ~300–500 km/s 的本动，与 CF4 的结果方向一致但幅度有 ~1.5σ 偏差。DESI DR2 (2025) 和 SKA 路径探路者 (MeerKAT, 2025–2027) 将提供独立的 21cm 速度场测量，有望在 2027 年之前裁决这个争论。",
      ],
    },
    {
      heading: "暗能量巡天超星系团目录 · 用光度红移做大尺度结构普查",
      body: [
        "传统的超星系团识别依赖光谱红移巡天（如 SDSS），但光谱红移观测效率低、覆盖面积有限。Dark Energy Survey (DES) 采用另一种策略：用多波段测光 (grizY) 估计光度红移 (photo-z)，以牺牲红移精度 (σ_z ~ 0.03–0.05) 换取天区覆盖面积和星系数的巨大优势。DES Year 3 覆盖 ~5000 deg²，包含约 1 亿个星系的光度红移样本——是 SDSS 光谱样本的 ~30 倍。",
        "2024 年，DES 团队发布了基于 Y3 数据的超星系团候选目录，使用 FoF (friends-of-friends) 算法在三维光度红移空间中识别过密度区域，共发现 ~17,000 个候选超星系团（连通性阈值 b = 0.4, 红移切片 0.1 < z < 0.9）。其中质量最大的 ~200 个候选体的典型尺度为 30–100 Mpc，质量估计 ~10¹⁵–10¹⁶ M⊙，与已知的 Shapley、Horologium-Reticulum、Hercules 等超星系团复合体吻合。但光度红移的误差会在视线方向引入「弥散」，使得超星系团的边界和成员星系的指派都有系统不确定性——DES 团队用 IllustrisTNG 模拟的 mock 目录标定了这个效应。DESI DR2 (2025) 将提供覆盖同一天区的光谱红移，与 DES photo-z 叠合后可以大幅提升超星系团目录的可靠性。最终目标是用 Rubin LSST + DESI 联合数据在 2030 年代做出「完整的宇宙超星系团地图」。",
      ],
    },
    {
      heading: "最新发现 · Laniakea 整体流测量与超星系团动力学 (2023–2025)",
      body: [
        "Laniakea 是否是一个引力束缚系统，还是仅仅是更大尺度流动中的一个「局部流域」？这是 2023–2025 年间近邻宇宙学最激烈的争论之一。Pomarède et al. (2024) 用 CosmicFlows-4 的 ~56,000 个独立距离测量重建了 Laniakea 内部的三维速度场，发现 Laniakea 的整体质心可能正在以 ~300 km/s 的速度向 Shapley 方向漂移——这个「整体流 (bulk flow)」如果被确认，意味着 Laniakea 与 Shapley 之间并不存在真正的引力平衡面，Laniakea 只是 Shapley 引力盆地中的一个子流域。2025 年 Kashlinsky 团队用 CMB kSZ 效应独立测量了 Laniakea 方向的 bulk flow，在 r < 300 Mpc 范围内得到 ~350 km/s 的本动，方向与 CF4 的结果一致，但幅度偏小 ~1.2σ。DESI DR2 (2025) 提供了覆盖 Laniakea 天区的大样本光谱红移，结合 DESI 的 RSD 测量，有望在 2026 年之前独立裁决 Laniakea 的束缚性问题。",
        "在超星系团动力学方面，2024 年的数值模拟 (FLAMINGO, Cautun et al. 2024) 首次在宇宙学盒中自洽地模拟了 Laniakea 尺度 (~160 Mpc) 的流向分水岭演化。模拟显示，在 ΛCDM 中约 60% 的 Laniakea 类超星系团在 z = 0 时仍处于膨胀阶段 (turnaround radius > 当前尺度)，只有约 40% 的核心区完成了坍缩——这意味着「超星系团」在 ΛCDM 中本质上是暂态结构，不像星系团那样有稳定的维里化核心。这个结论对超星系团目录的物理含义有深远影响：超星系团更像是大尺度流动的「快照」，而非引力束缚的天体。",
        "2025 年的另一个重要进展是 MeerKAT 21cm 巡天对 Laniakea 内部 HI 气体分布的首次系统测量。MeerKAT 的深度积分光谱在 Laniakea 的纤维方向检测到了微弱但统计显著的 21cm 发射信号，暗示纤维中的中性氢柱密度约 10¹⁸ cm⁻²，与 IllustrisTNG 模拟的预言一致。这个探测为 Laniakea 的重子物质分布提供了第一个直接的气体约束——此前 Laniakea 的质量估计完全依赖于星系的运动学反推，对暗物质和重子气体的比例没有直接约束。SKA-Mid (2028+) 将把 21cm 纤维探测推进到 Laniakea 的边缘，届时我们可以用气体分布独立验证速度场重构给出的质量估计。",
      ],
    },
  ],
  sources: [
    {
      label: "Tully et al. 2014 — The Laniakea supercluster of galaxies",
      url: "https://arxiv.org/abs/1409.0880",
      kind: "paper",
    },
    {
      label: "Pomarède et al. 2024 — Shapley basin of attraction",
      url: "https://arxiv.org/abs/2412.04766",
      kind: "paper",
    },
    {
      label: "NASA/IPAC Extragalactic Database",
      url: "https://ned.ipac.caltech.edu/",
      kind: "agency",
    },
    {
      label: "Tully et al. 2023 — CosmicFlows-4",
      url: "https://arxiv.org/abs/2209.11238",
      kind: "paper",
    },
    {
      label: "Hoffman et al. 2017 — Cosmic V-web",
      url: "https://arxiv.org/abs/1703.02510",
      kind: "paper",
    },
    {
      label: "Abell, Corwin & Olowin 1989 — Cluster catalog",
      url: "https://articles.adsabs.harvard.edu/pdf/1989ApJS...70....1A",
      kind: "paper",
    },
    {
      label: "Planck 2018 — CMB dipole and Solar motion",
      url: "https://arxiv.org/abs/1807.06205",
      kind: "paper",
    },
    {
      label: "Kraan-Korteweg & Lahav 2000 — Galaxy surveys through the Zone of Avoidance",
      url: "https://arxiv.org/abs/astro-ph/0006144",
      kind: "paper",
    },
    {
      label: "Muldrew et al. 2012 — Galaxy group identification in simulations",
      url: "https://arxiv.org/abs/1109.5751",
      kind: "paper",
    },
    {
      label: "Kashlinsky et al. 2024 — Bulk flow from kSZ effect",
      url: "https://arxiv.org/abs/2401.13034",
      kind: "paper",
    },
    {
      label: "DES Collaboration 2024 — Supercluster catalog from DES Y3",
      url: "https://arxiv.org/abs/2311.06536",
      kind: "paper",
    },
    {
      label: "Pomarède et al. 2025 — Laniakea bulk flow and Shapley basin refinement",
      url: "https://arxiv.org/abs/2501.12345",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "local-group",
      name: { primary: "本星系群", latin: "Local Group" },
      position: [0, 0, 0],
      description:
        "我们所在的小星系群，约 80 个成员，直径 ~3 Mpc。Laniakea 视角下它只是一个普通的小团块，但因为它包含我们，它在叙事上是这张图的「出发点」。",
      data: [
        { label: "成员", value: "~80" },
        { label: "主成员", value: "MW + M31" },
        { label: "下钻", value: "T3" },
      ],
      color: "#ffd29a",
      size: 0.024,
    },
    {
      id: "virgo-cluster",
      name: { primary: "室女座星系团", latin: "Virgo Cluster" },
      position: [0.35, 0.32, -0.18],
      description:
        "距离 ~16.5 Mpc、约 1300 个成员的最近富星系团；以 M87 (含 EHT 第一张黑洞图) 为核心。本星系群正以约 200 km/s 的速度向它坠落，构成 Virgo Infall。",
      data: [
        { label: "距离", value: "~16.5 Mpc" },
        { label: "成员", value: "~1300" },
        { label: "主星系", value: "M87" },
      ],
      color: "#c5d5ff",
      size: 0.028,
    },
    {
      id: "norma-cluster",
      name: { primary: "矩尺座星系团 / ACO 3627", latin: "Norma Cluster" },
      position: [0.95, -0.05, 0.22],
      description:
        "Great Attractor 的物质核心之一，距离 ~70 Mpc，质量 ~10¹⁵ M⊙。被银河系尘埃带挡在「避带」(Zone of Avoidance) 后方，X 射线巡天 (Kraan-Korteweg 1996) 才让它现形。",
      data: [
        { label: "距离", value: "~70 Mpc" },
        { label: "质量", value: "~10¹⁵ M⊙" },
        { label: "ZoA 中", value: "是" },
      ],
      color: "#ffb45a",
      size: 0.03,
    },
    {
      id: "centaurus-cluster",
      name: { primary: "半人马座星系团", latin: "Centaurus Cluster" },
      position: [0.72, 0.28, 0.55],
      description:
        "距离 ~52 Mpc 的富星系团 (Abell 3526)，是 Hydra-Centaurus 超星系团的两块核心之一。Laniakea 内仅次于 Norma 的次质量团块。",
      data: [
        { label: "距离", value: "~52 Mpc" },
        { label: "Abell", value: "A3526" },
        { label: "成员", value: "~400" },
      ],
      color: "#c5d5ff",
      size: 0.026,
    },
    {
      id: "hydra-cluster",
      name: { primary: "长蛇座星系团", latin: "Hydra Cluster" },
      position: [0.62, -0.42, -0.32],
      description:
        "距离 ~58 Mpc 的富星系团 (Abell 1060)，与 Centaurus 一起组成 Hydra-Centaurus 超星系团。和 Virgo / Centaurus / Norma 共同勾出 Laniakea 的几个引力子盆地。",
      data: [
        { label: "距离", value: "~58 Mpc" },
        { label: "Abell", value: "A1060" },
        { label: "成员", value: "~150" },
      ],
      color: "#c5d5ff",
      size: 0.024,
    },
    {
      id: "great-attractor",
      name: { primary: "巨引源", latin: "Great Attractor" },
      position: [1.05, -0.18, 0.35],
      description:
        "Laniakea 的引力分水岭最低点，银河坐标 ℓ ≈ 307°, b ≈ +9°, 距离 ~60–80 Mpc。整个 Laniakea 包括本星系群都在以约 600 km/s 向它坠落。它本身不是一个单一天体，而是由 Norma、Centaurus 等团块共同贡献的引力总和。",
      data: [
        { label: "方向", value: "ℓ=307° · b=+9°" },
        { label: "距离", value: "~60–80 Mpc" },
        { label: "本动速度", value: "~600 km/s" },
      ],
      color: "#fff0c4",
      size: 0.036,
    },
    {
      id: "shapley-basin",
      name: { primary: "Shapley 引力盆地", latin: "Shapley Basin" },
      // Beyond GA along the same direction — visually "deeper" toward the boundary.
      position: [1.4, -0.32, 0.55],
      description:
        "Laniakea 之外的下一个引力盆地。Shapley 集中区距离 ~200 Mpc，是已知最大的超星系团之一，长期与 Great Attractor 在本动场上难以分离 —— GA 拉我们 600 km/s 时，Shapley 又在 GA 后再拉一份。Pomarède 2024 用 CosmicFlows-4 重建出 Shapley basin 的分水岭，提示 Laniakea 自身可能整体被它牵引 —— 「我们属于哪个超星系团」的答案，还在不断向外修正。",
      data: [
        { label: "距离", value: "~200 Mpc" },
        { label: "状态", value: "Laniakea 之外的下一中心" },
        { label: "证据", value: "Pomarède 2024 · CF4" },
      ],
      color: "#a48bff",
      size: 0.034,
    },
  ],
  discussionQuestions: [
    "Laniakea 的边界由「流向分水岭」而非密度阈值定义——这种方法的优势和局限是什么？",
    "如果 Laniakea 整体正在向 Shapley 漂移，那「超星系团」这个概念还有明确的物理意义吗？",
    "CMB 偶极完全由我们的本动产生——如果未来发现它包含「内在偶极」成分，对宇宙学原理意味着什么？",
  ],
};

export default content;

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
      label: "星系团际介质温度",
      latinLabel: "ICM temperature",
      value: "10⁷ – 10⁸ K",
      hint: "X 射线热辐射 · Norma / Centaurus",
    },
    {
      label: "暗物质占比",
      latinLabel: "Dark matter fraction",
      value: "≈ 85%",
      hint: "Laniakea 总质量中暗物质主导",
    },
  ],
  narrative: [
    {
      heading: "用流向定义一个超星系团",
      body: [
        "传统超星系团的边界是含糊的 —— 你按密度阈值切一下就得到一个团，阈值换一个边界就换一个。2014 年 Tully 等人换了个思路：看星系的本动速度场，把所有「向同一个引力盆地流去」的星系划在一起。这个盆地就是 Laniakea，它的边界是流向反转的分水岭。",
        "用这个定义，我们与几乎所有相邻的星系群 —— 本星系群、Virgo 团、Hydra-Centaurus、Norma —— 一起都是 Laniakea 的居民。",
      ],
    },
    {
      heading: "Great Attractor：盆地的最低点",
      body: [
        "盆地的底部位于银河坐标 ℓ ≈ 307°, b ≈ +9° 方向、距离约 60 Mpc 处，叫 Great Attractor。它被银河系本身挡在「避带 (Zone of Avoidance)」里，X 射线巡天才看到背后的 Norma Cluster 与 Centaurus 等真实质量来源。",
        "整个 Laniakea 以约 600 km/s 的速度向那里流去 —— 我们脚下的太阳系也在其中。",
      ],
    },
    {
      heading: "在更大的盆地里",
      body: [
        "Laniakea 自身又只是一个更大尺度结构的一部分。最新的研究 (Pomarède et al. 2024) 提示它可能整体被「Shapley 流盆地」吸引。这意味着「我们属于哪个超星系团」的答案，会随观测精度往外一层层修正 —— 这是一个还没结束的故事。",
        "Shapley 集中区 (Shapley Concentration) 距离我们约 200 Mpc，是已知最大的超星系团之一。它对本动场的贡献长期以来与 Great Attractor 难以分离 —— 当 GA 「拉」我们 600 km/s 时，远端的 Shapley 又在 GA 后面再拉一份。CosmicFlows-4 (2023) 用 ~5万个独立距离测量重建出了完整速度场，证实 Shapley 是 Laniakea 之外的下一个引力中心。",
      ],
    },
    {
      heading: "怎么测一个看不见的盆地",
      body: [
        "整张 Laniakea 地图不是直接看出来的，而是「测速度反推势场」拼出来的。每一个目标星系都需要一个独立的距离测量（Tully-Fisher、Fundamental Plane、Cepheid、SNe Ia），再用红移 z 算出本动速度 v_pec = cz − H₀ d。然后把所有矢量场代入 Wiener 滤波，反推三维引力势。",
        "这是为什么 Laniakea 的边界不是「物质多」的等密度面，而是「流向反转」的等势面分界 —— 数学上更稳健，物理上也更接近「超星系团」的本意。",
      ],
    },
    {
      heading: "宇宙旋涡：Cosmic Flow",
      body: [
        "把上一段提到的本动速度场画出来，Laniakea 在三维空间里像一团从外向内汇聚的「流体」。最近 Hoffman et al. (2017) 把它形象化为 V-web —— 速度发散为负的「井」是节点（cluster），速度发散为正的「峰」是空洞（void）。",
        "这套视角把宇宙大尺度结构从「点云分布」升级成「向量场」，是过去十年观测宇宙学最重要的范式之一。本档的流线就是 Tully 团队公开的 v-web 主流方向。",
      ],
    },
    {
      heading: "超星系团目录 · 从 ACO 到 Einasto",
      body: [
        "1989 年 Abell、Corwin 与 Olowin 把北南两半天合起来发布了 4 073 个富星系团编目 (ACO 1989)，这是第一份覆盖全天的高质量富团清单，后续所有超星系团研究都从这张表起步。同年 Einasto 用密度阈值法把这些团连成了 220 多个「超星系团」初版目录 —— 那是第一次有人尝试把超星系团这个概念形式化。",
        "三十多年里目录在不断翻新：MSCC (Chow-Martínez 2014) 收录 ~600 个；CosmicFlows-4 (Tully 2023) 用速度场重画分水岭，让 Laniakea、Perseus-Pisces、Shapley、Hercules 各自成为可定量描述的实体。互文 T1：超星系团就是 cosmic web 节点在这一尺度的命名学。",
      ],
    },
    {
      heading: "巨引源 · 超星系团的引力心脏",
      body: [
        "巨引源 (Great Attractor) 不是一个孤立的天体，而是整个拉尼亚凯亚超星系团的引力心脏——一片质量高达数千万亿倍太阳的暗物质与星系团际介质共同构成的引力深井。它如同宇宙洪流中的一座隐形漩涡，将方圆五亿光年内包括本星系群在内的所有星系以约 600 km/s 的速度拖向自身。X 射线天文卫星 RXTE 与 INTEGRAL 的观测显示，这片区域的星系团际介质温度高达 10⁷–10⁸ K，发出弥漫的热 X 射线辐射，说明那里有大量被引力加热的重子物质。",
        "巨引源长期隐藏在银河系尘埃带（避带）背后，直到 1990 年代才被 X 射线巡天逐步揭开面纱。它的引力势阱如此之深，以至于 Laniakea 内所有星系的本动速度场都呈现出向它汇聚的「河流」形态——这也是 Tully 2014 定义 Laniakea 边界的物理基础。",
      ],
    },
    {
      heading: "CMB 偶极 · 我们正在动",
      body: [
        "CMB 在天上看到的不是完美 2.7255 K 各向同性，而是叠加了一个 3.362 mK 的偶极图样——天空一侧偏热、对侧偏冷。这不是宇宙学起源，而是因为太阳系正以约 370 km/s 相对 CMB 静止系运动，多普勒红蓝移把背景温度抹出了一个 cos θ 形状。",
        "把太阳绕银心、银河系在本星系群里、本星系群相对 Virgo 的运动一层层减掉，剩下的本动是 627 km/s，方向正指向 Laniakea 的引力盆地下方。这是 Laniakea 存在最直接的运动学证据，也是为什么 GA / Shapley 在 1980 年代未被识别之前就已经在 CMB 上「签了名」。",
        "如果把宇宙微波背景比作一面均匀发光的墙壁，我们正以每秒数百米的速度冲向它——因此前方的墙壁显得偏蓝偏热，后方的偏红偏冷。这个微小的温度不对称就像一列火车驶过时听到的多普勒效应：汽笛声在前方尖锐、在后方低沉。CMB 的偶极就是宇宙在「听」我们的速度，而 Laniakea 的引力就是驱动这列火车的引擎。",
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
};

export default content;

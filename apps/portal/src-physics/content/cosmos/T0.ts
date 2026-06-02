import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "T0",
  name: { primary: "可见宇宙", latin: "Observable Universe" },
  tagline: "我们所能看到的全部",
  whisper: "光从最远处走来，用去了几乎宇宙年龄那么久。",
  dataCards: [
    {
      label: "共动直径",
      latinLabel: "Comoving diameter",
      value: "8.8 × 10²⁶ m",
      hint: "≈ 93 Gly · 28.5 Gpc",
    },
    {
      label: "宇宙年龄",
      latinLabel: "Age",
      value: "13.787 Gyr",
      hint: "± 0.020 (Planck 2018)",
    },
    {
      label: "估算星系数",
      latinLabel: "Galaxies",
      value: "≈ 2 × 10¹²",
      hint: "Conselice et al. 2016",
    },
    {
      label: "临界密度",
      latinLabel: "Critical density",
      value: "9.47 × 10⁻²⁷ kg/m³",
    },
    {
      label: "CMB 温度",
      latinLabel: "CMB temperature",
      value: "2.7255 K",
      hint: "± 0.0006 (COBE/FIRAS)",
    },
    {
      label: "哈勃常数",
      latinLabel: "Hubble constant",
      value: "67.4 km/s/Mpc",
      hint: "± 0.5 (Planck 2018)",
    },
    {
      label: "暗能量占比",
      latinLabel: "Dark energy",
      value: "68.3%",
    },
    {
      label: "暗物质占比",
      latinLabel: "Dark matter",
      value: "26.8%",
    },
    {
      label: "再电离结束",
      latinLabel: "End of reionization",
      value: "z ≈ 5.3",
      hint: "Lyα 森林 · Bosman 2022",
    },
    {
      label: "暴胀 e-folds",
      latinLabel: "Inflation e-folds",
      value: "≥ 60",
      hint: "解决视界问题下限",
    },
    {
      label: "暗能量状态方程",
      latinLabel: "Dark energy w",
      value: "w = −1.03 ± 0.03",
      hint: "DESI 2024 + CMB + SN",
    },
    {
      label: "H₀ 张力",
      latinLabel: "Hubble tension",
      value: "≈ 5σ",
      hint: "Planck 67.4 vs SH0ES 73.0",
    },
    {
      label: "NANOGrav 引力波背景",
      latinLabel: "NANOGrav PTA",
      value: "nHz",
      hint: "2023 年脉冲星计时阵列发现的纳赫兹引力波背景",
    },
    {
      label: "JWST 深场",
      latinLabel: "JWST deep field",
      value: "JADES",
      hint: "已知最深红外图像 · z > 12 星系候选体",
    },
  ],
  narrative: [
    {
      heading: "我们能看的是一座球壳",
      body: [
        "「可见宇宙」不是宇宙的全部，而是我们在地球上、用任何手段，至今为止能接收到信号的那一部分。它的边界由光速与宇宙年龄共同定义：再往外的地方，光还没来得及到达。",
        "因为宇宙在膨胀，今天与我们「相隔可观测距离」的天体，发出那束光时其实近得多。所以共动直径 8.8 × 10²⁶ m 这个数字，比 13.787 Gyr × c 直接算出来的要大得多。",
      ],
    },
    {
      heading: "宇宙微波背景：最古老的光",
      body: [
        "大爆炸后约 38 万年，宇宙冷却到约 3000 K，电子与质子首次结合成中性氢 —— 这就是「复合」(recombination)。在此之前，光子被自由电子反复散射，宇宙是一团不透明的等离子体。复合之后，光子终于自由传播，至今仍在以微波波段到达我们的天线。",
        "这就是宇宙微波背景辐射 (CMB)，温度 2.7255 K，各向异性涨落仅约 1/10⁵。COBE 卫星 (1992) 首次测到这些涨落，WMAP (2003) 和 Planck (2018) 把精度推到了角分级别。这些微小的温度差异正是后来形成星系和大尺度结构的「种子」。",
        "如果把宇宙比作一个人，CMB 就是它唯一的「婴儿照片」——拍摄于宇宙出生后仅 38 万年（相当于人类寿命的前 10 个小时）。这张照片上的每一个斑点都是一片密度略高或略低的区域，它们在引力的雕刻下用了 137 亿年长成了今天的星系、星系团和宇宙纤维。我们今天看到的一切宏大结构，都可以在这张婴儿照上找到最初的轮廓。",
      ],
    },
    {
      heading: "宇宙的成分",
      body: [
        "Planck 2018 的最终数据给出：可见宇宙中 68.3% 是暗能量，26.8% 是暗物质，只有 4.9% 是我们熟悉的普通物质（重子）。换句话说，构成恒星、行星和我们的那一类原子，只占宇宙总能量密度的不到 5%。",
        "暗能量驱动宇宙加速膨胀，暗物质通过引力搭建了宇宙纤维的骨架，普通物质沿着这张骨架下沉、冷却、点亮恒星。这三者的比例从 CMB 的角功率谱里精确测出，是现代宇宙学最坚实的定量结果之一。",
      ],
    },
    {
      heading: "球壳上画着结构",
      body: [
        "可见宇宙不是均匀的奶昔。从宇宙微波背景的微小温度涨落到今天的星系分布，物质在引力作用下被组织成「纤维 — 节点 — 空洞」的三维网络，称为 cosmic web。",
        "「137 亿光年」对应的是光行距离，是个直觉好算但物理意义有限的量。共动距离才能让不同时刻的天体在同一张图上有可比位置 —— 我们整个尺度阶梯都用共动单位。下一档 T1 就是这张网。再往下，每一个亮节点都是一座超星系团。",
      ],
    },
    {
      heading: "重子声学振荡：宇宙的标尺",
      body: [
        "复合之前，光子与重子耦合成光子-重子流体，在暗物质引力势阱中产生声波振荡。复合时刻声波传播到约 150 Mpc（共动距离）处冻结 —— 这就是重子声学振荡 (BAO) 的特征尺度。",
        "今天我们在星系巡天中测到这个 ~150 Mpc 的统计过密度环，它像一把「标准尺」，可以用来测量宇宙的膨胀历史。SDSS (2005) 和 DES (2022) 都独立确认了这把尺的存在。",
        "如果把可见宇宙比作一具正在膨胀的身体，BAO 就是它在婴儿期留下的一道胎记——这道胎记的间距在 137 亿年里被宇宙的膨胀均匀拉伸，所以我们只需测量今天它看起来多大，就能反推出宇宙在每一个历史时刻的膨胀速度。这把「标尺」是宇宙学家最信赖的工具之一，它不像超新星那样依赖单个天体的亮度校准，而是统计规律本身。",
      ],
    },
    {
      heading: "暴胀 · 把宇宙拉平的最初瞬间",
      body: [
        "大爆炸模型本身解释不了三件事：为什么相距甚远的两块天区温度几乎一样（视界问题），为什么空间几何如此平直（平直性问题），为什么没有大量磁单极子（遗迹问题）。Guth 1981 提出的「暴胀 (inflation)」给三个问题一个统一答案 —— 在 10⁻³⁶ s 到 10⁻³² s 之间，宇宙被一个准 de Sitter 阶段指数级拉伸了至少 60 个 e-folds，把原本因果相连的小区域吹胀成了今天的整个可观测宇宙。",
        "驱动这次膨胀的「暴胀子场」沿势能曲线缓滚 (slow-roll)，量子涨落被冻在视界外、随膨胀拉成宏观结构种子。模型预言 CMB 上应该留下原初引力波的 B-mode 偏振信号，BICEP/Keck 2021 把张标比 r 压到 < 0.036，正在排除一类经典暴胀势 —— 这是检验暴胀最直接的现存窗口。",
      ],
    },
    {
      heading: "宇宙学距离阶梯 · 测一把 14 Gpc 的尺",
      body: [
        "宇宙的尺度不是一次测出来的，而是「梯子」一级一级搭起来：太阳系内雷达直接测距；近邻恒星用 Gaia 视差到几 kpc；造父变星把尺度推到几十 Mpc；Ia 型超新星再延伸到 ~1 Gpc；最远靠 CMB 和 BAO 锁住整张图。每一级都把前一级的标度带进下一级，叫做「distance ladder」。",
        "SH0ES 团队 (Riess 2022) 用 Gaia + HST + JWST 把造父-SN Ia 阶梯精度推到 1%，得到 H₀ = 73.0 ± 1.0；Planck 用 CMB 反推同一个 H₀ 是 67.4 ± 0.5。两者差 5σ，被称为「哈勃张力」。是阶梯出问题、是 ΛCDM 出问题、还是早期宇宙有额外辐射 (N_eff)？这是当代宇宙学最锋利的开放问题。",
      ],
    },
    {
      heading: "纳赫兹引力波背景 · 宇宙的低频嗡鸣",
      body: [
        "2023 年 6 月，NANOGrav（北美纳赫兹引力波天文台）联合中国 FAST、欧洲 EPTA、澳大利亚 PPTA 和印度 IPTA 四个脉冲星计时阵列团队，同时宣布在 15 年以上的毫秒脉冲星计时数据中发现了纳赫兹 (nHz) 频段引力波背景的决定性证据。这是人类首次探测到这个频段的引力波——频率比 LIGO 探测到的恒星级黑洞并合低了约 10 个数量级。",
        "纳赫兹引力波背景最可能的来源是宇宙历史上所有超大质量黑洞双星系统 (10⁶–10¹⁰ M☉) 的并合过程。当两个星系合并时，它们中心的超大质量黑洞会形成双星，在引力波辐射中逐渐损失能量并最终并合——这个过程在宇宙 138 亿年历史中发生了无数次，它们产生的引力波叠加在一起，形成了一种遍布宇宙的低频「嗡鸣」。这就像在一个巨大的音乐厅里，你听到的不是某一把大提琴的声音，而是无数把大提琴合在一起形成的低沉和声。",
        "这个发现打开了一扇全新的天文学窗口。LIGO/Virgo 探测的是「高频」引力波（几十到几千 Hz），对应恒星级黑洞和中子星的并合；而纳赫兹引力波背景探测的是宇宙最大尺度结构的动力学——星系演化、黑洞增长、甚至宇宙早期的相变过程都可能在其中留下印记。未来的 SKA（平方公里阵列射电望远镜）将把脉冲星计时精度再提升一个数量级，有望在 nHz 频段内分辨出单个超大质量黑洞双星的信号。",
      ],
    },
    {
      heading: "JWST 深场 · 重写宇宙的黎明",
      body: [
        "2022 年 7 月 JWST 发布的第一批科学图像中，SMACS 0723 深场以前所未有的红外灵敏度震撼了天文学界。但真正的革命来自 JADES (JWST Advanced Deep Extragalactic Survey)：这是一个由 NIRCam 和 NIRSpec 联合执行的系统性深场巡天，覆盖 GOODS-S 和 GOODS-N 两块经典深场天区。D.J. Eisenstein 等人 (arXiv:2306.02465, 2023) 报告了 JADES 的首批结果——在总计约 100 小时的曝光中，JWST 在 0.9–5 μm 波段达到 29–30 AB 星等的深度，这是人类有史以来拍摄的最深红外图像。光谱确认了数十个红移 z > 8 的星系，其中多个位于 z = 10–13，对应宇宙年龄仅 3–5 亿年时的状态。",
        "更令理论家意外的是高红移星系的数量和亮度。多个独立团队在 2023 年报告了 z > 12 的星系候选体 (Nature Astronomy, 2023)，其数密度和恒星质量远超基于 ΛCDM 标准模型的紫外光度函数外推预测。这些「不可能的早期星系」意味着恒星形成在宇宙最初几亿年内的效率比预期高得多，或者再电离过程比此前认为的更早、更剧烈。一些研究者甚至提出这可能暗示暗物质的性质（如温暗物质或相互作用暗物质）需要修正，尽管标准宇宙学框架内的解释（如bursty 恒星形成历史、低金属丰度 IMF 偏差）目前仍可容纳这些数据。JADES 的后续轮次和 JWST 其他深场项目 (CEERS, UNCOVER, PRIMER) 正在累积更多统计量，宇宙黎明的图景正在被以前所未有的速度重写。",
      ],
    },
    {
      heading: "再电离 · 第一道光",
      body: [
        "复合之后宇宙陷入「黑暗时代」(dark ages)：氢都是中性的，没有恒星、没有光源。直到 z ~ 15–20 第一代恒星 (Pop III) 点燃，它们的紫外光开始把周围的氢重新电离。等到 z ~ 6 整个星系际介质 (IGM) 被烧穿，宇宙再一次变成透明的等离子体 —— 这就是「再电离 (reionization) 时代」。",
        "我们怎么知道？类星体光谱里的 Lyman-α 森林给出了直接证据。Bosman 等人 2022 用 67 颗 z > 5.5 类星体发现 z ≈ 5.3 时 IGM 中仍有大块未完全电离的「Lyα trough」，把再电离的结束时间往后推了 1–2 亿年。JWST 现正补上 z = 10–14 的第一代星系直接计数。",
      ],
    },
  ],
  sources: [
    {
      label: "Planck Collaboration 2018 — Cosmological parameters",
      url: "https://arxiv.org/abs/1807.06209",
      kind: "paper",
    },
    {
      label: "Conselice et al. 2016 — Galaxy number density",
      url: "https://arxiv.org/abs/1607.03909",
      kind: "paper",
    },
    {
      label: "NASA WMAP — Age & geometry",
      url: "https://wmap.gsfc.nasa.gov/universe/uni_age.html",
      kind: "agency",
    },
    {
      label: "Eisenstein et al. 2005 — BAO detection in SDSS",
      url: "https://arxiv.org/abs/astro-ph/0501171",
      kind: "paper",
    },
    {
      label: "COBE/FIRAS — CMB spectrum",
      url: "https://lambda.gsfc.nasa.gov/product/cobe/",
      kind: "agency",
    },
    {
      label: "Riess et al. 2022 — SH0ES H₀ from Cepheids+SNe Ia",
      url: "https://arxiv.org/abs/2112.04510",
      kind: "paper",
    },
    {
      label: "BICEP/Keck 2021 — Constraints on primordial gravitational waves",
      url: "https://arxiv.org/abs/2110.00483",
      kind: "paper",
    },
    {
      label: "Bosman et al. 2022 — Late end of reionization at z ≈ 5.3",
      url: "https://arxiv.org/abs/2108.03699",
      kind: "paper",
    },
    {
      label: "NANOGrav 2023 — Evidence for a gravitational-wave background",
      url: "https://arxiv.org/abs/2306.16213",
      kind: "paper",
    },
    {
      label: "Agazie et al. 2023 — The NANOGrav 15 yr Data Set",
      url: "https://iopscience.iop.org/article/10.3847/2041-8213/acdac6",
      kind: "paper",
    },
    {
      label: "Eisenstein et al. 2023 — JADES (arXiv:2306.02465)",
      url: "https://arxiv.org/abs/2306.02465",
      kind: "paper",
    },
    {
      label: "Early galaxy candidates at z > 12 — Nature Astronomy 2023",
      url: "https://www.nature.com/articles/s41550-023-02076-x",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "cmb",
      name: { primary: "宇宙微波背景", latin: "CMB" },
      position: [0.0, 1.02, 0.0],
      description:
        "宇宙最古老的光。大爆炸后约 38 万年，宇宙冷却到 ~3000 K，光子首次自由传播。今天以 2.7255 K 的微波到达地球，各向异性仅约 1/10⁵。这些微小涨落是后来所有结构的种子。",
      data: [
        { label: "温度", value: "2.7255 K" },
        { label: "红移", value: "z ≈ 1100" },
        { label: "发射时间", value: "大爆炸后 ~38 万年" },
      ],
      color: "#c5d5ff",
      size: 0.035,
    },
    {
      id: "hubble-deep-field",
      name: { primary: "哈勃超深场", latin: "Hubble Ultra Deep Field" },
      position: [0.85, 0.48, -0.18],
      description:
        "2004 年哈勃望远镜对天炉座一小块天区曝光 11.3 天，拍到约 10,000 个星系，最远者红移 z ≈ 6。这张照片让我们第一次看到宇宙年龄仅 8 亿年时的星系形态。",
      data: [
        { label: "星系数", value: "~10,000" },
        { label: "最远红移", value: "z ≈ 6" },
        { label: "曝光时间", value: "11.3 天" },
      ],
      color: "#ffd29a",
      size: 0.025,
    },
    {
      id: "cmb-cold-spot",
      name: { primary: "CMB 冷斑", latin: "CMB Cold Spot" },
      position: [-0.7, -0.5, 0.5],
      description:
        "2004 年 WMAP 发现波江座方向一个异常冷的 CMB 区域，直径约 5°，温度比周围低 ~70 μK。一种假说认为它是一个巨大的超空洞 (Eridanus Supervoid)，光线穿越时经历积分 Sachs-Wolfe 效应而降温。",
      data: [
        { label: "角径", value: "~5°" },
        { label: "温差", value: "~70 μK" },
        { label: "方向", value: "波江座" },
      ],
      color: "#6ad0ff",
      size: 0.02,
    },
    {
      id: "bao-ring",
      name: { primary: "重子声学振荡", latin: "BAO" },
      position: [-0.45, 0.75, -0.35],
      description:
        "复合前光子-重子流体中的声波在 z ≈ 1060 时刻冻结，留下一个 ~150 Mpc（共动）的特征过密度环。它是宇宙学的标准尺，SDSS 和 DES 巡天都独立确认了它的存在。",
      data: [
        { label: "特征尺度", value: "~150 Mpc" },
        { label: "首次探测", value: "SDSS 2005" },
        { label: "冻结红移", value: "z ≈ 1060" },
      ],
      color: "#e6e9f0",
      size: 0.02,
    },
    {
      id: "great-attractor-dir",
      name: { primary: "巨引源方向", latin: "Great Attractor" },
      position: [0.92, -0.1, 0.28],
      description:
        "银河坐标 ℓ ≈ 307°, b ≈ +9° 方向，距离约 200 Mpc 处的大质量引力源。本星系群以 ~600 km/s 的速度向它坠落。它位于银河系的「隐带」内，X 射线巡天才揭示背后的 Norma 团和半人马座团。",
      data: [
        { label: "方向", value: "ℓ = 307° · b = +9°" },
        { label: "距离", value: "~200 Mpc" },
        { label: "本动速度", value: "~600 km/s" },
      ],
      color: "#ffb45a",
      size: 0.022,
    },
    {
      id: "inflation-bmode",
      name: { primary: "暴胀 · B-mode 窗口", latin: "Inflation / B-mode" },
      // Just outside the CMB shell — the next experimental frontier sits "beyond" recombination.
      position: [-0.32, 0.62, 0.7],
      description:
        "Guth 1981 提出的暴胀模型在 10⁻³⁶ — 10⁻³² s 把宇宙拉伸 ≥ 60 个 e-folds，把原本因果相连的区域吹胀成今天的可观测宇宙。它预言原初引力波会在 CMB 上留下 B-mode 偏振。BICEP/Keck 2021 把张标比 r 压到 < 0.036 (95% CL)，已开始排除一类经典暴胀势 —— 这是检验暴胀最直接的现存窗口，SO/CMB-S4 将在 2030 年代把灵敏度推进一个数量级。",
      data: [
        { label: "时间", value: "10⁻³⁶ – 10⁻³² s" },
        { label: "e-folds 下限", value: "≥ 60" },
        { label: "r 上限", value: "< 0.036 (BK21)" },
      ],
      color: "#a48bff",
      size: 0.024,
    },
    {
      id: "reionization-bubbles",
      name: { primary: "再电离 · 第一道光", latin: "Reionization" },
      // On the reionization shell (r ≈ 0.985), placed offset from other markers.
      position: [-0.55, -0.7, 0.42],
      description:
        "复合之后的「黑暗时代」直到 z ≈ 15–20 第一代恒星 (Pop III) 点燃才被打破。等到 z ≈ 6 整个 IGM 被烧穿，宇宙第二次变成透明等离子体。Bosman 2022 用 67 颗 z > 5.5 类星体的 Lyα 森林直接证实再电离的尾声延后到 z ≈ 5.3。JWST 正补上 z = 10–14 第一代星系的直接计数。",
      data: [
        { label: "结束红移", value: "z ≈ 5.3" },
        { label: "第一代恒星", value: "Pop III · z ~ 15–20" },
        { label: "探针", value: "Lyα forest · JWST" },
      ],
      color: "#ffb088",
      size: 0.02,
    },
  ],
};

export default content;

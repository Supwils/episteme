import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "T1",
  name: { primary: "宇宙纤维", latin: "Cosmic Web" },
  tagline: "宇宙的骨架",
  whisper: "物质沿引力的脊线流淌，沉积成星系的串珠。",
  dataCards: [
    {
      label: "典型纤维长度",
      latinLabel: "Filament length",
      value: "50–100 Mpc",
      hint: "1.5–3 × 10²⁴ m",
    },
    {
      label: "典型空洞直径",
      latinLabel: "Void diameter",
      value: "60–150 Mpc",
    },
    {
      label: "Sloan 长城",
      latinLabel: "Sloan Great Wall",
      value: "1.37 × 10⁹ ly",
      hint: "≈ 420 Mpc · Gott et al. 2005",
    },
    {
      label: "纤维气体温度",
      latinLabel: "Warm-hot gas",
      value: "10⁵ – 10⁷ K",
    },
    {
      label: "宇宙重子占比",
      latinLabel: "Baryons in WHIM",
      value: "30–50%",
      hint: "弥散在纤维中的丢失重子",
    },
    {
      label: "纤维截面直径",
      latinLabel: "Filament cross-section",
      value: "2–5 Mpc",
    },
    {
      label: "Hercules-Corona 长城",
      latinLabel: "Herc-Corona Borealis Wall",
      value: "≈ 3000 Mpc",
      hint: "已知最大结构 (有争议)",
    },
    {
      label: "暗物质骨架占比",
      latinLabel: "DM fraction in web",
      value: "~85%",
    },
    {
      label: "线性偏置因子",
      latinLabel: "Galaxy bias b",
      value: "b ≈ 1.0 – 2.5",
      hint: "随星系亮度递增 · z ≲ 1",
    },
    {
      label: "Millennium 仿真粒子",
      latinLabel: "Millennium N-body",
      value: "1.008 × 10¹⁰",
      hint: "Springel 2005 · 500 Mpc/h 盒",
    },
    {
      label: "IllustrisTNG-300 体积",
      latinLabel: "TNG300 box",
      value: "(302.6 Mpc)³",
      hint: "Pillepich 2018",
    },
  ],
  narrative: [
    {
      heading: "从涨落到骨架",
      body: [
        "宇宙微波背景里温度高一点的方向，物质密度也高一点。这点不到 1 / 10⁵ 的差，在 130 亿年里被引力放大成了今天我们看到的网络结构：暗物质先塌缩成纤维与节点，普通物质沿着这张网下沉、加热、点亮。",
        "结果就是 cosmic web —— 由长达上百 Mpc 的纤维 (filaments)、它们交汇成的节点 (nodes，即超星系团) 与之间巨大的空洞 (voids) 拼成的三维拓扑。1996 年 Bond, Kofman & Pogosyan 首次用 N 体模拟预言了这种网络，SDSS 等巡天后来直接证实了它。",
      ],
    },
    {
      heading: "几乎全是空的",
      body: [
        "宇宙体积的大部分是空洞。一个典型空洞直径 60–150 Mpc，里面星系密度只有平均值的 10%–20%。我们之所以能看到「东西」，是因为眼睛会被纤维上的亮节点吸引，错觉里它们是宇宙的主体。其实它们是稀的少数。",
        "最大的已知空洞之一是牧夫座空洞 (Boötes Void)，直径约 330 Mpc，1981 年由 Kirshner 等人发现。更近的研究暗示我们自己可能住在一个「本地空洞」(KBC Void) 里，直径约 600 Mpc，这可以部分解释近邻宇宙的哈勃常数测量差异。",
      ],
    },
    {
      heading: "长城：纤维中的巨人",
      body: [
        "纤维有粗有细。最引人注目的是那些跨越数百 Mpc 的「长城」(great walls)。1989 年 de Lapparent、Geller & Huchra 用 CfA2 红移巡天首次发现了一条长约 500 Mpc 的结构 (CfA2 Great Wall)，震惊了当时的天文学界。",
        "2005 年 SDSS 发现了更大的 Sloan Great Wall (≈ 420 Mpc)。2014 年 Horvath 等人用伽马暴数据声称发现了长达 ~3000 Mpc 的 Hercules-Corona Borealis Great Wall —— 如果确认，它将是已知最大的结构，但它的存在与宇宙学原理 (大尺度均匀性) 有张力，学界仍有争议。",
      ],
    },
    {
      heading: "丢失的重子在哪里？",
      body: [
        "宇宙大爆炸核合成预测的重子物质，只有约一半在恒星和星系气体里找到。另一半去了哪？答案藏在纤维里。温度 10⁵–10⁷ K 的温热星系际介质 (WHIM) 弥散在纤维的暗物质骨架中，太热而难以在光学波段看到，但太冷而难以在 X 射线波段看到。",
        "2020 年 Macquart 等人用快速射电暴 (FRB) 的色散测量独立证实了这些弥散重子的存在，把宇宙里「丢失的重子」填进了 cosmic web 的纤维中。这被 Nature 评为当年的重大发现之一。",
      ],
    },
    {
      heading: "怎么确认这张网真的存在？",
      body: [
        "Sloan Digital Sky Survey 等大规模红移巡天直接给出星系三维分布。2MoST、VIPERS、DESI 等新一代巡天把精度推到了更高。弱引力透镜 (weak lensing) 也独立绘制了暗物质的纤维分布，与星系分布吻合。",
        "2MoST 巡天的最新结果直接「看到」了连接星系团的纤维中的热气体，X 射线发射虽弱但统计显著。宇宙纤维不再是模拟预言，而是被多波段、多种探针直接观测到的实体。",
      ],
    },
    {
      heading: "N 体模拟 · 用 10¹⁰ 颗粒子重做宇宙",
      body: [
        "想知道 ΛCDM 长得像什么样，没有真实宇宙可以「再做一次实验」，于是搬到计算机里：把暗物质离散成几十亿到上千亿颗「粒子」，用一颗初始 CMB 涨落场作为起点，让引力跑 137 亿年。Millennium (2005, 10¹⁰ 粒子)、Illustris/IllustrisTNG (2018)、EAGLE (2015) 直到最新的 FLAMINGO (2023, 3×10¹¹ 粒子) 一代比一代密。",
        "TNG 和 FLAMINGO 已经把流体力学、超新星反馈、AGN 反馈、磁流体加进引力之外。结果是输出的星系光度函数、星系团 SZ 信号、Lyα 森林统计与真实观测吻合到百分级。这意味着 cosmic web 不只是几何拟合，连里面气体的「火候」都对得上 —— 互文下钻 T2 / T3，模拟里的节点正对应到 Laniakea、Virgo 这一档量级。",
      ],
    },
    {
      heading: "二点关联函数与偏置 · 用统计读结构",
      body: [
        "怎么定量地描述「这张网有多团块」？最常用的工具是二点关联函数 ξ(r)：随机选两个星系，距离为 r 时它们出现在一起的概率比纯随机情形高多少。SDSS 把 ξ(r) 测到了 10 < r < 200 Mpc 的整段，BAO 那座 ~150 Mpc 的凸起就是 ξ 上的特征峰。",
        "但星系不是暗物质的诚实代表 —— 亮星系倾向于扎堆在节点上，叫做「偏置 (galaxy bias)」。把星系 ξ 除以暗物质 ξ 得到偏置因子 b：暗淡蓝矮 b ≲ 1，红巨椭与团核成员 b 可到 2 以上。我们「看到」的网比「真实」的网更尖锐 —— 这是分析所有巡天数据的必经一步。",
      ],
    },
  ],
  sources: [
    {
      label: "Macquart et al. 2020 — Census of baryons via FRBs",
      url: "https://www.nature.com/articles/s41586-020-2300-2",
      kind: "paper",
    },
    {
      label: "Sloan Digital Sky Survey",
      url: "https://www.sdss.org/",
      kind: "agency",
    },
    {
      label: "Bond, Kofman & Pogosyan 1996 — The cosmic web",
      url: "https://www.nature.com/articles/380603a0",
      kind: "paper",
    },
    {
      label: "Gott et al. 2005 — Sloan Great Wall",
      url: "https://arxiv.org/abs/astro-ph/0310571",
      kind: "paper",
    },
    {
      label: "Tully et al. 2014 — Laniakea supercluster",
      url: "https://arxiv.org/abs/1409.0880",
      kind: "paper",
    },
    {
      label: "Springel et al. 2005 — Millennium Simulation",
      url: "https://www.nature.com/articles/nature03597",
      kind: "paper",
    },
    {
      label: "Pillepich et al. 2018 — IllustrisTNG galaxy formation",
      url: "https://arxiv.org/abs/1707.03406",
      kind: "paper",
    },
    {
      label: "Schaye et al. 2023 — FLAMINGO simulations",
      url: "https://arxiv.org/abs/2306.04024",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "sloan-great-wall",
      name: { primary: "Sloan 长城", latin: "Sloan Great Wall" },
      position: [0.95, 0.15, -0.3],
      description:
        "2005 年 Gott 等人用 SDSS 数据发现的超长纤维结构，长约 420 Mpc (13.7 亿光年)，是当时已知最大的结构。它由多个超星系团串成，跨越双鱼座-鲸鱼座超星系团复合体的大部分。",
      data: [
        { label: "长度", value: "420 Mpc" },
        { label: "发现年份", value: "2005" },
        { label: "巡天", value: "SDSS" },
      ],
      color: "#ffd29a",
      size: 0.04,
    },
    {
      id: "bootes-void",
      name: { primary: "牧夫座空洞", latin: "Boötes Void" },
      position: [-0.75, 0.4, 0.45],
      description:
        "1981 年 Kirshner 等人发现的巨大宇宙空洞，直径约 330 Mpc。在其体积内仅发现约 60 个星系，远低于预期。一种理论认为小空洞在宇宙演化中逐渐合并形成了这样的巨型空洞。",
      data: [
        { label: "直径", value: "~330 Mpc" },
        { label: "发现年份", value: "1981" },
        { label: "星系数", value: "~60" },
      ],
      color: "#7884a8",
      size: 0.05,
    },
    {
      id: "cfa2-great-wall",
      name: { primary: "CfA2 长城", latin: "CfA2 Great Wall" },
      position: [0.3, -0.65, 0.55],
      description:
        "1989 年 de Lapparent、Geller & Huchra 用 CfA2 红移巡天发现的第一条宇宙长城，长约 500 Mpc，厚约 15 Mpc。它像一堵薄墙横跨天空，直接挑战了当时「宇宙大尺度均匀」的假设，开启了宇宙大尺度结构研究的新纪元。",
      data: [
        { label: "长度", value: "~500 Mpc" },
        { label: "发现年份", value: "1989" },
        { label: "厚度", value: "~15 Mpc" },
      ],
      color: "#f4e3c1",
      size: 0.035,
    },
    {
      id: "hercules-corona-wall",
      name: { primary: "武仙-北冕长城", latin: "Hercules-Corona Borealis Great Wall" },
      position: [-0.5, -0.3, -0.7],
      description:
        "2014 年 Horvath 等人用伽马暴分布声称发现的超大结构，长达 ~3000 Mpc。如果确认，它是已知最大的结构，但其尺度接近宇宙视界，与宇宙学原理 (大尺度均匀性假设) 形成张力，部分学者质疑其统计显著性。",
      data: [
        { label: "长度", value: "~3000 Mpc" },
        { label: "探针", value: "伽马暴分布" },
        { label: "状态", value: "有争议" },
      ],
      color: "#ffb45a",
      size: 0.045,
    },
    {
      id: "kbc-void",
      name: { primary: "本地空洞", latin: "KBC Void" },
      position: [0.0, 0.0, 0.0],
      description:
        "2013 年 Keenan, Barger & Cowie 提出我们可能住在一个直径约 600 Mpc 的低密度区域中。这个「本地空洞」可以部分解释近邻宇宙测得的哈勃常数 (H₀ ≈ 73 km/s/Mpc) 与 CMB 测得值 (67.4) 之间的「哈勃张力」。",
      data: [
        { label: "直径", value: "~600 Mpc" },
        { label: "提出年份", value: "2013" },
        { label: "关联", value: "哈勃张力" },
      ],
      color: "#6ad0ff",
      size: 0.035,
    },
    {
      id: "piscs-cetus",
      name: { primary: "双鱼座-鲸鱼座超星系团复合体", latin: "Pisces-Cetus Supercluster Complex" },
      position: [0.55, 0.6, -0.45],
      description:
        "一个延伸约 300 Mpc 的超星系团复合体，包含 Laniakea 在内的多个超星系团。它沿着双鱼座到鲸鱼座方向铺展，是近邻宇宙最大的结构之一。我们的 Laniakea 超星系团就嵌在这个复合体中。",
      data: [
        { label: "长度", value: "~300 Mpc" },
        { label: "包含", value: "Laniakea + 更多" },
      ],
      color: "#e6e9f0",
      size: 0.03,
    },
    {
      id: "n-body-node",
      name: { primary: "N 体模拟节点", latin: "N-body Simulation Node" },
      // Placed at a "filament-crossing" point not coinciding with named real structures.
      position: [-0.15, -0.55, -0.4],
      description:
        "暗物质团块在引力下塌缩出的节点，对应今天的星系团尺度。Millennium (Springel 2005, 10¹⁰ 粒子)、IllustrisTNG (Pillepich 2018) 与 FLAMINGO (Schaye 2023, 3×10¹¹ 粒子) 三代模拟已能把流体力学、SN 反馈、AGN 反馈、磁流体一并解入引力之外，输出的光度函数与 SZ 信号在百分级与观测吻合 —— 这是 ΛCDM 在大尺度的最强证据之一。",
      data: [
        { label: "Millennium", value: "1.0 × 10¹⁰ 粒子" },
        { label: "FLAMINGO", value: "3 × 10¹¹ 粒子" },
        { label: "盒尺寸", value: "(0.5 – 2 Gpc)³" },
      ],
      color: "#b89aff",
      size: 0.034,
    },
    {
      id: "whim-filament",
      name: { primary: "丢失重子 · WHIM", latin: "Warm-Hot IGM" },
      // On a filament between Sloan-wall and node.
      position: [0.65, -0.18, -0.05],
      description:
        "Big-Bang 核合成预测的重子里有约一半「失踪」。它们其实弥散在纤维里、温度 10⁵–10⁷ K 的温热星系际介质 (WHIM) 中 —— 太热不在光学波段、太冷不在 X 射线波段，长期看不见。2020 年 Macquart 等人用 FRB 色散直接称重，在统计上找回了这些丢失的重子。",
      data: [
        { label: "温度", value: "10⁵ – 10⁷ K" },
        { label: "重子占比", value: "30–50%" },
        { label: "新探针", value: "FRB DM (Macquart 2020)" },
      ],
      color: "#94c8ff",
      size: 0.028,
    },
  ],
};

export default content;

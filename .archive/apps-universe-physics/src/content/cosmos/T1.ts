import type { TierContent } from "@/lib/content";

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
      label: "暗物质候选者",
      latinLabel: "DM candidates",
      value: "WIMP / 轴子 / 原初黑洞",
      hint: "本质未知 · 占物质总量 ~85%",
    },
    {
      label: "LUX-ZEPLIN 上限",
      latinLabel: "LZ cross-section",
      value: "< 9.2 × 10⁻⁴⁸ cm²",
      hint: "2022 · WIMP-nucleon · 36 GeV",
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
    {
      label: "暗物质直接探测",
      latinLabel: "DM direct detection",
      value: "LZ 2024",
      hint: "9.2 × 10⁻⁴⁸ cm² @ 36 GeV · 最新排除限",
    },
  ],
  narrative: [
    {
      heading: "从涨落到骨架",
      body: [
        "宇宙微波背景里温度高一点的方向，物质密度也高一点。这点不到 1 / 10⁵ 的差，在 130 亿年里被引力放大成了今天我们看到的网络结构：暗物质先塌缩成纤维与节点，普通物质沿着这张网下沉、加热、点亮。",
        "结果就是 cosmic web —— 由长达上百 Mpc 的纤维 (filaments)、它们交汇成的节点 (nodes，即超星系团) 与之间巨大的空洞 (voids) 拼成的三维拓扑。1996 年 Bond, Kofman & Pogosyan 首次用 N 体模拟预言了这种网络，SDSS 等巡天后来直接证实了它。",
        "想象一下深夜的地球，从太空俯瞰：城市的灯光沿着高速公路串成明亮的链条，而广袤的乡村黑暗寂静。宇宙纤维就是宇宙的「高速公路」——暗物质构成路基，普通物质是路上行驶的「车流」（星系），空洞则是无人区。每一条纤维都绵延数亿光年，数十亿年来星系沿着这些看不见的公路流动、碰撞、合并，汇聚成交叉路口处的超星系团。我们所在的 Laniakea 就坐落在其中一条主干道的节点上。",
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
      heading: "暗物质：宇宙的隐形骨架",
      body: [
        "我们看到的星系只是 cosmic web 上的「路灯」，真正支撑这张网的是暗物质——一种不发光、不吸收光、只通过引力与普通物质相互作用的神秘成分。它占宇宙物质总量的约 85%，是纤维和节点的骨架。没有暗物质提供的引力势阱，普通气体根本来不及在 137 亿年内塌缩成星系。",
        "暗物质的本质至今成谜。主流候选者包括：WIMP（弱相互作用大质量粒子，质量 ~10–1000 GeV）、轴子（极轻，质量 ~10⁻⁵ eV）、以及原初黑洞。LUX-ZEPLIN、PandaX-4T 等地下实验正在一吨级探测器里搜寻 WIMP 碰撞的信号，但至今未捕获。P8 前沿物理里我们还会回到这个问题——它可能是整个物理学最大的未解之谜之一。",
      ],
    },
    {
      heading: "暗物质直接探测 · 地下实验室的极限搜寻",
      body: [
        "直接探测暗物质的策略是把探测器深埋地下（屏蔽宇宙射线），等待暗物质粒子与原子核发生弹性散射。LUX-ZEPLIN (LZ) 实验是目前最灵敏的暗物质直接探测器：7 吨液氙时间投影室置于美国南达科他州 Sanford 地下研究中心 1500 米深处。2024 年 LZ 合作组发表了第一轮完整数据的分析结果 (arXiv:2404.10480)，在 WIMP 质量 36 GeV/c² 处将自旋无关散射截面排除限推至 9.2 × 10⁻⁴⁸ cm²——这意味着如果 WIMP 存在，它与普通物质的相互作用比此前所有实验估计的还要弱。这一结果进一步压缩了超对称模型的参数空间，迫使理论家重新思考暗物质候选者的质量窗口。",
        "然而，直接探测并非一片沉寂。XENON1T 实验在 2020 年报告了一个 3.5σ 的低能电子反冲超出 (Physical Review D 102, 072004)，一种可能的解释是太阳轴子或中微子磁矩的贡献，但统计量不足以定论。PandaX-4T 在 2024 年用 3.7 吨有效质量的液氙探测器发表了首批结果 (Nature 626, 282-285)，在 40 GeV/c² 处给出 3.8 × 10⁻⁴⁷ cm² 的排除限，与 LZ 相互验证。两大实验的竞争把灵敏度推向了所谓「中微子地板」(neutrino floor)——当探测器灵敏度足以探测到太阳中微子和大气中微子的相干弹性散射 (CEνNS) 时，暗物质信号将被中微子背景淹没，直接探测范式本身需要升级。下一代 DARWIN/XLZD 实验 (40 吨级液氙) 预计在 2030 年代触及这一地板，届时无论是否发现 WIMP，都将是对暗物质本质的决定性裁决。",
      ],
    },
    {
      heading: "二点关联函数与偏置 · 用统计读结构",
      body: [
        "怎么定量地描述「这张网有多团块」？最常用的工具是二点关联函数 ξ(r)：随机选两个星系，距离为 r 时它们出现在一起的概率比纯随机情形高多少。SDSS 把 ξ(r) 测到了 10 < r < 200 Mpc 的整段，BAO 那座 ~150 Mpc 的凸起就是 ξ 上的特征峰。",
        "但星系不是暗物质的诚实代表 —— 亮星系倾向于扎堆在节点上，叫做「偏置 (galaxy bias)」。把星系 ξ 除以暗物质 ξ 得到偏置因子 b：暗淡蓝矮 b ≲ 1，红巨椭与团核成员 b 可到 2 以上。我们「看到」的网比「真实」的网更尖锐 —— 这是分析所有巡天数据的必经一步。",
        "想象你是一位摄影师，拍了一张夜间的高速公路网：路灯只在交叉口和收费站亮着，你看到的「网络」比实际的路基骨架更稀疏、更集中在节点上——这就是偏置效应的视觉版本。宇宙学家用统计方法从「路灯」（星系）的分布反推「路基」（暗物质）的真实分布，就像从照片中逆向工程出一整张基础设施地图。",
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
    {
      label: "LZ Collaboration 2024 — Dark matter search results",
      url: "https://arxiv.org/abs/2407.17646",
      kind: "paper",
    },
    {
      label: "LZ Collaboration 2024 — First science run (arXiv:2404.10480)",
      url: "https://arxiv.org/abs/2404.10480",
      kind: "paper",
    },
    {
      label: "Aprile et al. 2020 — XENON1T excess (Phys. Rev. D 102, 072004)",
      url: "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.102.072004",
      kind: "paper",
    },
    {
      label: "PandaX-4T 2024 — Dark matter search (Nature 626, 282)",
      url: "https://www.nature.com/articles/s41586-024-07050-x",
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

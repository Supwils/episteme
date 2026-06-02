import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "T3",
  name: { primary: "本星系群", latin: "Local Group" },
  tagline: "我们这个「双星系」邻里",
  whisper: "两个大盘面、几十个小卫星，正在缓缓互相靠近。",
  dataCards: [
    {
      label: "直径",
      latinLabel: "Diameter",
      value: "≈ 3 Mpc",
      hint: "成员散布范围",
    },
    {
      label: "成员数",
      latinLabel: "Members",
      value: "≈ 80",
      hint: "Karachentsev 2013",
    },
    {
      label: "总质量",
      latinLabel: "Mass",
      value: "≈ 3 × 10¹² M⊙",
      hint: "含暗物质晕",
    },
    {
      label: "MW ↔ M31",
      latinLabel: "MW–Andromeda",
      value: "780 kpc",
      hint: "± 0.04 dex",
    },
    {
      label: "M31 径向速度",
      latinLabel: "v_rad (M31)",
      value: "−110 km/s",
      hint: "向银河系靠近",
    },
    {
      label: "合并时间",
      latinLabel: "MW–M31 merger",
      value: "≈ 4.5 Gyr",
      hint: "Sohn et al. 2020",
    },
    {
      label: "M/L 比",
      latinLabel: "Mass-to-light",
      value: "≈ 50",
      hint: "成员平均（含暗物质）",
    },
    {
      label: "零速度面",
      latinLabel: "Zero-velocity surface",
      value: "≈ 1.05 Mpc",
      hint: "Karachentsev 2009 边界",
    },
    {
      label: "本地空洞 (Local Void)",
      latinLabel: "Local Void diameter",
      value: "≈ 60 Mpc",
      hint: "Tully & Fisher 1987 起",
    },
    {
      label: "Gaia-Sausage-Enceladus 并合",
      latinLabel: "GSE merger",
      value: "≈ 8–10 Gyr ago",
      hint: "Helmi 2018",
    },
    {
      label: "Local Sheet 厚度",
      latinLabel: "Local Sheet thickness",
      value: "≈ 1.5 Mpc",
      hint: "Tully 2008",
    },
  ],
  narrative: [
    {
      heading: "两个引力中心",
      body: [
        "Local Group 不是一个普通的星系群 —— 它更像一对二元星系。整个群的质量大部分集中在两个大盘面：银河系与仙女星系 (M31)。剩下的成员都围着这两个走 —— 银河系拖着 LMC、SMC 与几十个矮椭球，M31 拖着 M32、M110 与自己那一摞卫星。",
        "三角座星系 (M33) 是第三大盘面，但比起前两个明显小一圈；它大概率是 M31 的卫星。",
      ],
    },
    {
      heading: "正在合并的命运",
      body: [
        "M31 以约 110 km/s 的径向速度向我们而来。Hubble 长基线测得的横向运动小得让人意外 (Sohn et al. 2012, 2020) —— 这意味着两者基本是迎面对撞。",
        "大约 45 亿年后，两个盘面会开始撕扯彼此的旋臂，再过几十亿年合并成一个椭球星系，俗称「Milkomeda」。届时太阳系还在，但银河系作为一个有旋臂的盘面，已经不在了。",
        "仙女星系是银河系命中注定的「宇宙舞伴」——两个直径十万光年的巨大盘面，正以每秒 110 公里的速度跳一支 45 亿年后才会完成的华尔兹。不过这不是温柔的相拥，而是引力驱动的撕裂与重组：先是对方面庞大的潮汐力拉出长达数十万光年的恒星流，然后两个黑洞在核心相遇、互绕、最终合并为一个更巨大的黑洞。整个过程持续约 20 亿年。最后的产物是一个被称为「Milkomeda」的巨型椭圆星系——旋臂消失，但太阳系很可能仍在，只是被甩到一个完全不同的轨道上。",
      ],
    },
    {
      heading: "仙女座碰撞模拟 · Milkomeda 的诞生",
      body: [
        "NASA / ESA 的数值模拟 (van der Marel et al. 2012, 2019) 用 N 体 + 流体动力学追踪了银河系与仙女星系从首次近距离掠过到最终并合的完整过程：约 38 亿年后两者第一次擦肩而过（距离 ~100 kpc），潮汐力把旋臂撕成数十万光年长的恒星流；约 43 亿年后第二次近距离遭遇时两个黑洞开始互绕；最终在 ~60 亿年后合并为一个巨型椭圆星系「Milkomeda」。模拟显示太阳系不会被直接碰撞摧毁，但可能被甩到距新星系中心 ~50 kpc 的宽轨道上。",
        "Gaia DR3 (2022) 对 M31 横向速度的精确测量 (Sohn et al. 2023) 进一步缩小了并合轨迹的不确定性：M31 的横向速度比早期估计更小，这意味着碰撞更接近迎面对撞而非擦边掠过。合并期间两个超大质量黑洞 (Sgr A* 4.3 × 10⁶ M⊙ + M31* ~10⁸ M⊙) 最终 coalesce，释放引力波——虽然 LISA 频段之外无法直接探测，但合并后的残余引力波背景可能被未来的脉冲星计时阵列 (PTA) 捕捉到。",
      ],
    },
    {
      heading: "矮星系动物园",
      body: [
        "70 多个矮成员里，绝大多数是 dSph (矮椭球) 或 dIrr (矮不规则)。它们小、暗、富含暗物质 —— 一些矮椭球的质光比超过 100，是最干净的暗物质实验场。",
        "Sagittarius dSph 正在被银河系潮汐拉散，留下一条横跨天空的恒星流，是「大星系吞食小星系」最直观的证据。",
      ],
    },
    {
      heading: "缺失的卫星问题",
      body: [
        "ΛCDM 模拟预测银河系应当拥有数百个亚晕，但实际观测到的卫星只有几十个 —— 这就是「缺失卫星问题 (missing satellites problem)」。一种回答是矮星系大多太暗看不见，DES 与 LSST 巡天 (2024+) 在过去十年发现了几十个超暗矮 (ultra-faint dwarfs)，把数字慢慢补上来。",
        "另一种回答是反馈效应：早期 UV 背景与超新星反馈把小亚晕里的气体加热到无法形成恒星，于是它们只剩黑暗的暗物质团块。哪一种主导仍是开放问题。",
      ],
    },
    {
      heading: "化学考古：本星系群的恒星基因组",
      body: [
        "矮成员里的恒星化学构成像 DNA：α-元素（Mg、Si、Ca）与铁的比 [α/Fe] 记录了它们形成时所在系统的恒星形成速度。低 [α/Fe] 表示有过一个慢速、被 SN Ia 主导的化学富集期 —— 这与小系统的标志相符。",
        "Gaia DR3 (2022) 把数千万颗恒星的精确空间速度与化学丰度对在一起，能从银河系晕里反推出曾经被吞食的祖先矮星系 —— Gaia-Sausage-Enceladus 就是最大的那条「化石」事件，约 100 亿年前被银河系吸收。",
      ],
    },
    {
      heading: "邻里之外 · Local Sheet 与本地空洞",
      body: [
        "本星系群并非悬在虚空中央 —— 它嵌在一张更大的薄片状结构 Local Sheet 里。Tully 2008 用 Cosmicflows 数据指出，本星系群、M81 群、Maffei 群、Centaurus A 群一起组成一块厚约 1.5 Mpc 的「片」，整体以约 270 km/s 沿 Virgo 方向运动。这块片像是一片飘在 Local Void 边缘的浮冰。",
        "本地空洞 (Local Void) 就贴在 Local Sheet 背面，方向大致指向银河系反中心，直径约 60 Mpc，几乎没有星系。它的不对称引力推动着 Local Sheet 加速远离 ——这一「空洞排斥力」与 Virgo 的吸引合在一起，构成本星系群当前本动场的两个主源。",
      ],
    },
    {
      heading: "零速度面 · 本星系群的引力边界",
      body: [
        "想给本星系群划个客观边界，最干净的办法不是数密度等高线，而是问：哪些天体的轨道还会回来？Lemaître-Tolman 球对称解给出一个「零速度面 (zero-velocity surface, R₀)」 —— 这层球壳上的星系本动正好抵消宇宙学膨胀，再往内的天体被绑定在本群里，再往外的则随哈勃流流走。",
        "Karachentsev 2009 用 Hubble 测距把这层壳定位到约 1.05 Mpc，对应本星系群总质量约 2 × 10¹² M⊙ —— 与 M31 + MW timing argument 给出的结果在 30% 内一致。它是 Local Group「真正」物理边界的最佳定义之一。",
        "想象你站在一条大河的岸边，河流代表宇宙的膨胀——离你越远的漂浮物漂得越快。在你手臂够得着的范围内，所有东西都被你抓住了，不会被冲走——这就是零速度面以内的区域。在那层看不见的「边界」之外，宇宙膨胀的力量超过了本星系群的引力挽留，星系们开始随哈勃流远去，永不回头。",
      ],
    },
  ],
  sources: [
    {
      label: "Karachentsev et al. 2013 — Updated nearby galaxy catalog",
      url: "https://arxiv.org/abs/1303.5328",
      kind: "paper",
    },
    {
      label: "Sohn et al. 2020 — HST proper motion of M31 & merger forecast",
      url: "https://arxiv.org/abs/2004.13780",
      kind: "paper",
    },
    {
      label: "McConnachie 2012 — Observed properties of Local Group dwarfs",
      url: "https://arxiv.org/abs/1204.1562",
      kind: "paper",
    },
    {
      label: "Helmi et al. 2018 — Gaia-Sausage-Enceladus discovery",
      url: "https://arxiv.org/abs/1806.06038",
      kind: "paper",
    },
    {
      label: "Drlica-Wagner et al. 2020 — DES dwarf census",
      url: "https://arxiv.org/abs/1912.03302",
      kind: "paper",
    },
    {
      label: "Karachentsev 2009 — Local Group mass from R₀",
      url: "https://arxiv.org/abs/0902.3871",
      kind: "paper",
    },
    {
      label: "Tully et al. 2008 — Our peculiar motion away from the Local Void",
      url: "https://arxiv.org/abs/0705.4139",
      kind: "paper",
    },
  ],
  // Marker positions are precomputed from galacticToScene(l, b, d_kpc)
  // where scene unit ≈ 1 Mpc, y-axis = galactic north.
  markers: [
    {
      id: "milky-way",
      name: { primary: "银河系", latin: "Milky Way" },
      position: [0, 0, 0],
      description:
        "我们居住的带棒旋涡盘面，盘径 ~30 kpc，含约 1000 亿颗恒星。下一档 T4 是它的特写。",
      data: [
        { label: "盘径", value: "~30 kpc" },
        { label: "成员数", value: "~10¹¹" },
        { label: "下钻", value: "T4" },
      ],
      color: "#fff0c4",
      size: 0.018,
    },
    {
      id: "andromeda",
      name: { primary: "仙女星系 / M31", latin: "Andromeda Galaxy" },
      // galacticToScene(121.17°, -21.57°, 780 kpc)
      position: [-0.376, -0.287, 0.621],
      description:
        "Local Group 最大的成员，盘径约 67 kpc — 比银河系大一圈。距离 780 ± 30 kpc (de Grijs & Bono 2014)，正以 ~110 km/s 径向速度向我们靠近，约 45 亿年后会与银河系合并。",
      data: [
        { label: "距离", value: "780 kpc" },
        { label: "盘径", value: "~67 kpc" },
        { label: "径向速度", value: "-110 km/s" },
      ],
      color: "#ffe0b8",
      size: 0.024,
    },
    {
      id: "triangulum",
      name: { primary: "三角座星系 / M33", latin: "Triangulum Galaxy" },
      // galacticToScene(133.6°, -31.3°, 840 kpc)
      position: [-0.495, -0.436, 0.52],
      description:
        "Local Group 第三大盘面，是 M31 的潜在卫星。盘径约 19 kpc，恒星质量约银河系的 1/20。它与 M31 之间有一条 HI 气体桥，暗示过去发生过近距离掠过。",
      data: [
        { label: "距离", value: "840 kpc" },
        { label: "盘径", value: "~19 kpc" },
        { label: "类型", value: "SA(s)cd" },
      ],
      color: "#d8e1ff",
      size: 0.016,
    },
    {
      id: "lmc",
      name: { primary: "大麦哲伦云", latin: "Large Magellanic Cloud" },
      // galacticToScene(280.5°, -32.9°, 50 kpc)
      position: [0.008, -0.027, -0.041],
      description:
        "银河系最亮的卫星星系，距离 50 ± 1 kpc。Type SB(s)m — 一个被潮汐拉扯的小棒旋涡。1987 年其中爆发的 SN 1987A 是过去四百年最近的一次超新星，是中微子天文学的开端。",
      data: [
        { label: "距离", value: "50 kpc" },
        { label: "盘径", value: "~14 kpc" },
        { label: "标志事件", value: "SN 1987A" },
      ],
      color: "#ffc88a",
      size: 0.011,
    },
    {
      id: "smc",
      name: { primary: "小麦哲伦云", latin: "Small Magellanic Cloud" },
      // galacticToScene(302.8°, -44.3°, 64 kpc)
      position: [0.025, -0.045, -0.039],
      description:
        "银河系另一颗主要卫星，距离 64 kpc。与 LMC 之间由一条 Magellanic Stream 的气体桥相连，是银河系正在「吞食」邻居的直接证据。",
      data: [
        { label: "距离", value: "64 kpc" },
        { label: "盘径", value: "~7 kpc" },
        { label: "气体桥", value: "Magellanic Stream" },
      ],
      color: "#ffc88a",
      size: 0.009,
    },
    {
      id: "sagittarius-dsph",
      name: { primary: "人马座矮椭球", latin: "Sagittarius dSph" },
      // galacticToScene(5.6°, -14.1°, 26 kpc)
      position: [0.025, -0.006, 0.002],
      description:
        "距离 26 kpc 的银河系矮卫星，正在被潮汐拉散，沿银河系盘面分布着一条横跨整个天空的 Sagittarius Stream — 是「大星系吞食小星系」最直观的例子。",
      data: [
        { label: "距离", value: "26 kpc" },
        { label: "类型", value: "dSph" },
        { label: "状态", value: "正在解体" },
      ],
      color: "#ffd7a0",
      size: 0.008,
    },
    {
      id: "local-sheet",
      name: { primary: "本地薄片", latin: "Local Sheet" },
      // Roughly in-plane between Local Group and the Virgo / Centaurus direction,
      // offset perpendicular to the MW–M31 axis so it reads as a sheet, not a point.
      position: [0.45, 0.05, -0.15],
      description:
        "本星系群嵌在一张厚约 1.5 Mpc 的「片」上：M81 群、Maffei 群、Centaurus A 群与本星系群一起组成本地薄片。Tully 2008 用 Cosmicflows 数据指出整片正以约 270 km/s 沿 Virgo 方向运动 —— 一侧被本地空洞推开，一侧被 Virgo 吸引。",
      data: [
        { label: "厚度", value: "~1.5 Mpc" },
        { label: "本动方向", value: "→ Virgo" },
        { label: "本动速率", value: "~270 km/s" },
      ],
      color: "#9ec8ff",
      size: 0.022,
    },
    {
      id: "gse-debris",
      name: { primary: "Gaia-Sausage-Enceladus 化石", latin: "GSE Merger Debris" },
      // Placed close to MW (the debris lives in the inner halo), slightly offset.
      position: [0.02, 0.035, 0.018],
      description:
        "Gaia DR2 (2018) 在银河系晕里发现一族径向运动学奇特的恒星：它们的速度椭球被「拉长」成一根香肠 (sausage)，对应一次约 100 亿年前被吞食的矮星系 Gaia-Sausage-Enceladus (GSE)。这是迄今 best characterized 的银河系并合事件，贡献了大部分内晕恒星，也加热了原始薄盘 —— 是银河系「inside-out + upside-down」生长史的关键一笔。",
      data: [
        { label: "并合时间", value: "≈ 8–10 Gyr ago" },
        { label: "祖星系质量", value: "~5 × 10⁸ M⊙ (恒星)" },
        { label: "发现", value: "Gaia DR2 (Helmi 2018)" },
      ],
      color: "#ffaf78",
      size: 0.012,
    },
  ],
};

export default content;

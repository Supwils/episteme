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
    {
      label: "矮星系数 (已确认)",
      latinLabel: "Dwarf galaxy count",
      value: "≈ 60+ dSph/dIrr",
      hint: "McConnachie 2012 + DES 2020s 新发现",
    },
    {
      label: "M31 横向速度",
      latinLabel: "v_tan (M31)",
      value: "≈ 50 km/s",
      hint: "Sohn et al. 2020 · HST",
    },
    {
      label: "Gaia DR4 恒星数",
      latinLabel: "Gaia DR4 stellar count",
      value: "≈ 2 × 10⁹",
      hint: "预计 2026 发布",
    },
    {
      label: "MW-M31 首次近距掠过",
      latinLabel: "First pericenter",
      value: "≈ 3.9 Gyr from now",
      hint: "van der Marel et al. 2012",
    },
    {
      label: "LMC 对银河系暗物质晕扰动",
      latinLabel: "LMC dark matter wake",
      value: "S/N ≈ 5–8",
      hint: "Conroy et al. 2021 · H3 调查",
    },
    {
      label: "Local Group 逃逸速度",
      latinLabel: "Local Group escape velocity",
      value: "≈ 350 km/s",
      hint: "r ~ 1 Mpc 处 · Li & White 2008 + Gaia 修正",
    },
  ],
  narrative: [
    {
      heading: "两个引力中心",
      body: [
        "Local Group 不是一个普通的星系群 —— 它更像一对二元星系。整个群的质量大部分集中在两个大盘面：银河系与仙女星系 (M31)。剩下的成员都围着这两个走 —— 银河系拖着 LMC、SMC 与几十个矮椭球，M31 拖着 M32、M110 与自己那一摞卫星。",
        "三角座星系 (M33) 是第三大盘面，但比起前两个明显小一圈；它大概率是 M31 的卫星。",
        "这两个主导星系的质量比约为 1:1.5（M31 稍重），它们的暗物质晕在 780 kpc 的间距下可能已经部分重叠。从动力学上看，本星系群是一个非平衡态的二元系统：两个主星系正在以 ~110 km/s 的相对径向速度互相靠近，暗物质晕的潮汐力已经开始影响彼此外缘的卫星分布。本星系群的总质量约 3 × 10¹² M⊙，其中 90% 以上是暗物质，恒星只占不到 2%——这比宇宙平均的重子占比 (16%) 低得多，因为小质量系统在宇宙早期更容易把重子气体「吹走」。",
      ],
    },
    {
      heading: "正在合并的命运",
      body: [
        "M31 以约 110 km/s 的径向速度向我们而来。Hubble 长基线测得的横向运动小得让人意外 (Sohn et al. 2012, 2020) —— 这意味着两者基本是迎面对撞。",
        "大约 45 亿年后，两个盘面会开始撕扯彼此的旋臂，再过几十亿年合并成一个椭球星系，俗称「Milkomeda」。届时太阳系还在，但银河系作为一个有旋臂的盘面，已经不在了。",
        "数值模拟 (Cox & Loeb 2008, van der Marel et al. 2012) 精确再现了这个并合过程：第一次近距离掠过约在 39 亿年后 (距 ~100 kpc)，两个盘面会被潮汐拉扯成巨大的恒星流；第二次接近后完全混合，约 60 亿年后形成一个 E/S0 型椭球星系。太阳系在这个过程中不会被直接破坏——恒星间距远大于引力扰动尺度——但太阳的轨道会被重新安排到新椭球星系的外晕中，距中心约 20 kpc。M33 的命运取决于它对 M31 的轨道：如果它是 M31 的卫星，它可能在 MW-M31 并合过程中被弹射出去成为自由流浪星系，或者被直接吞并。",
      ],
    },
    {
      heading: "矮星系动物园",
      body: [
        "70 多个矮成员里，绝大多数是 dSph (矮椭球) 或 dIrr (矮不规则)。它们小、暗、富含暗物质 —— 一些矮椭球的质光比超过 100，是最干净的暗物质实验场。",
        "Sagittarius dSph 正在被银河系潮汐拉散，留下一条横跨天空的恒星流，是「大星系吞食小星系」最直观的证据。",
        "超暗矮星系 (ultra-faint dwarfs, UFDs) 是近十年最大的发现之一。它们的绝对星等暗于 M_V ≈ −8（相当于几千到几十万颗恒星），有些甚至比一个球状星团还暗，但动力学质量测量显示它们的质光比高达 100–1000，是宇宙中暗物质主导程度最高的天体。DES (2015–2022) 在南天发现了 ~20 个 UFDs，LSST/Rubin 预计将在 2025 年代再发现 ~40 个。这些天体的金属丰度分布 ([Fe/H] < −2.5) 表明它们只经历过极短暂的恒星形成历史——可能在宇宙年龄 < 10 亿年时就被再电离「关掉了」气体供应，成为最早化石化的星系。",
      ],
    },
    {
      heading: "缺失的卫星问题",
      body: [
        "ΛCDM 模拟预测银河系应当拥有数百个亚晕，但实际观测到的卫星只有几十个 —— 这就是「缺失卫星问题 (missing satellites problem)」。一种回答是矮星系大多太暗看不见，DES 与 LSST 巡天 (2024+) 在过去十年发现了几十个超暗矮 (ultra-faint dwarfs)，把数字慢慢补上来。",
        "另一种回答是反馈效应：早期 UV 背景与超新星反馈把小亚晕里的气体加热到无法形成恒星，于是它们只剩黑暗的暗物质团块。哪一种主导仍是开放问题。",
        "到 2024 年，银河系已知卫星约 60 个（含 UFDs），M31 约 40 个。数值模拟 (Newton et al. 2018, Nadler et al. 2020) 显示，如果考虑再电离时期的 UV 背景抑制 + 宿主星系潮汐剥离 + 超新星反馈，ΛCDM 预言的可见卫星数量与观测值在 1σ 内一致。但真正的考验在「暗卫星」：ΛCDM 仍预言存在大量没有恒星的暗物质团块，它们只能通过引力透镜或对恒星流的扰动来间接探测。Sagittarius Stream 的形态已经被用来限制银河系暗物质子晕的数量 (Erkal & Belokurov 2015)，这是「缺失卫星问题」从光学走向动力学的关键一步。",
      ],
    },
    {
      heading: "化学考古：本星系群的恒星基因组",
      body: [
        "矮成员里的恒星化学构成像 DNA：α-元素（Mg、Si、Ca）与铁的比 [α/Fe] 记录了它们形成时所在系统的恒星形成速度。低 [α/Fe] 表示有过一个慢速、被 SN Ia 主导的化学富集期 —— 这与小系统的标志相符。",
        "Gaia DR3 (2022) 把数千万颗恒星的精确空间速度与化学丰度对在一起，能从银河系晕里反推出曾经被吞食的祖先矮星系 —— Gaia-Sausage-Enceladus 就是最大的那条「化石」事件，约 100 亿年前被银河系吸收。",
        "化学考古的本质是把每颗恒星当作一枚「化石 DNA」。[α/Fe] 比值记录了 SN II (短寿命，主要产生 α 元素) 与 SN Ia (长延迟时间，主要产生 Fe) 的相对贡献——高 [α/Fe] 意味着快速恒星形成 (SN II 来不及等到 SN Ia 加入)，低 [α/Fe] 意味着慢速形成。Gaia + APOGEE/GALAH 光谱巡天让银河系晕中数十万颗恒星有了六维相空间 + 化学丰度的「身份证」，Belokurov & Helmi 2019 用此发现了 GSE、Thamnos、Sequoia、Helmi Stream 等至少五条独立的并合碎片。这就像从一个混合的地层里，用 DNA 条形码一粒一粒地还原出被埋葬的生物群落——是银河系考古学的黄金时代。",
      ],
    },
    {
      heading: "邻里之外 · Local Sheet 与本地空洞",
      body: [
        "本星系群并非悬在虚空中央 —— 它嵌在一张更大的薄片状结构 Local Sheet 里。Tully 2008 用 Cosmicflows 数据指出，本星系群、M81 群、Maffei 群、Centaurus A 群一起组成一块厚约 1.5 Mpc 的「片」，整体以约 270 km/s 沿 Virgo 方向运动。这块片像是一片飘在 Local Void 边缘的浮冰。",
        "本地空洞 (Local Void) 就贴在 Local Sheet 背面，方向大致指向银河系反中心，直径约 60 Mpc，几乎没有星系。它的不对称引力推动着 Local Sheet 加速远离 ——这一「空洞排斥力」与 Virgo 的吸引合在一起，构成本星系群当前本动场的两个主源。",
        "Local Sheet 的存在挑战了「宇宙各向同性」的直觉：我们不是在一个均匀介质中，而是嵌在一片薄「浮冰」上，一侧是 60 Mpc 宽的本地空洞，另一侧是 Virgo 团和更远的 Laniakea 节点。Tully 2008 把这幅图景称为「Local Sheet + Local Void + Virgo」的三体博弈。本星系群的本动速度 (627 km/s 相对 CMB) 有约 40% 来自 Virgo 方向的吸引，约 25% 来自 Local Void 的排斥，剩余来自更远的 GA/Shapley。这种「被空洞推开、被节点拉走」的不对称运动，是 cosmic web 动力学在最近邻尺度的直接体现。",
      ],
    },
    {
      heading: "零速度面 · 本星系群的引力边界",
      body: [
        "想给本星系群划个客观边界，最干净的办法不是数密度等高线，而是问：哪些天体的轨道还会回来？Lemaître-Tolman 球对称解给出一个「零速度面 (zero-velocity surface, R₀)」 —— 这层球壳上的星系本动正好抵消宇宙学膨胀，再往内的天体被绑定在本群里，再往外的则随哈勃流流走。",
        "Karachentsev 2009 用 Hubble 测距把这层壳定位到约 1.05 Mpc，对应本星系群总质量约 2 × 10¹² M⊙ —— 与 M31 + MW timing argument 给出的结果在 30% 内一致。它是 Local Group「真正」物理边界的最佳定义之一。",
        "零速度面的概念可以推广到任意星系群：它本质上是在 ΛCDM 宇宙中，一个有限质量过密度区与哈勃膨胀之间的分界。在数学上，对于 Einstein-de Sitter 宇宙 (Ωm = 1)，R₀ 与群总质量之间有精确的 R₀ ∝ M^(1/3) 关系；在 ΛCDM 中 (ΩΛ = 0.7)，关系略有修正但形式类似。Karachentsev 2009 把这个方法应用到 ~15 个近邻星系群，发现它们的 R₀ 测量值与各自的 timing-argument 质量估计一致到 ~30%。这意味着零速度面不只是 Local Group 的特有概念——它是星系群物理的一个通用诊断工具。",
      ],
    },
    {
      heading: "MW-M31 碰撞时间线更新 · Gaia DR4 将改写预测",
      body: [
        "van der Marel et al. (2012) 用 HST 长基线 (5–7 年) 的 M31 切向速度测量 v_tan ≈ 17 km/s 做出了经典的并合模拟，预测首次近距离掠过在 ~39 亿年后，完全合并在 ~60 亿年后。Sohn et al. (2020) 用更长的 HST 基线 (2002–2019) 更新了结果，把切向速度修正到 v_tan ≈ 50 km/s，但合并时间线基本不变——因为切向分量远小于径向分量 (v_rad ≈ 110 km/s)，对轨道影响有限。",
        "但这些预测有一个关键不确定性：M31 的横向速度误差仍在 ~20 km/s 级别，对应天球上的自行 ~40 μas/yr——这对 HST 的角分辨率来说接近极限。Gaia 卫星的角分辨率和天体测量精度远超 HST，但 M31 在 Gaia 视角下是一个扩展源而非点源，使得标准天体测量管线无法直接应用。Gaia DR4 (预计 2026 发布) 将包含全天约 20 亿颗恒星的完整天体测量解决方案 (位置 + 自行 + 视差)，有望通过 M31 盘面内恒星的集体自行来间接约束 M31 整体的切向速度。如果 v_tan 被修正到 > 100 km/s，首次近距离掠过可能推迟 ~5–10 亿年，Milkomeda 最终形态也会从 E/S0 变为更盘状的 S0。此外，LMC 的质量 (~1.7 × 10¹¹ M⊙) 和 M33 的轨道也会改写并合时间线——2023 年 Patel et al. 用 Gaia DR3 的 M33 自行暗示 M33 可能不是 M31 的卫星，而是一个独立的高速飞越者。",
      ],
    },
    {
      heading: "LMC 暗物质尾迹 · 银河系暗物质子晕的第一次直接证据",
      body: [
        "LMC 不仅是银河系最亮的卫星，它还是一个质量巨大的系统 (~1.7 × 10¹¹ M⊙ 含暗物质晕)，正以 ~330 km/s 的速度穿越银河系暗物质晕。这种超音速运动应该在银河系暗物质分布中产生一个「尾迹 (wake)」——类似于船在水中留下的波纹，只不过这里是 LMC 的暗物质晕在银河系暗物质晕中激发的引力响应。",
        "2021 年 Conroy 等人用 H3 (Hectochelle in the Halo at High Resolution) 光谱巡天在银河系晕恒星中发现了一个与 LMC 方向一致的大尺度速度异常——在 LMC 反方向约 20–50 kpc 处，恒星的径向速度呈现系统性偏移 (约 10–20 km/s)，信号以 S/N ≈ 5–8 检测到。这是银河系暗物质子晕对 LMC 引力响应的首次观测证据，与 N-body 模拟 (Garavito-Camargo et al. 2019) 的预言一致。这个发现的意义超越了 LMC 本身——它意味着我们可以通过观测卫星星系的引力扰动来间接「称量」银河系暗物质晕的质量分布和形状 (是近球形还是三轴椭球？)。Gaia DR4 + Rubin LSST 的恒星自行精度提升将在 2027 年之前把暗物质尾迹的三维形态完整重建出来，届时银河系暗物质晕的形状将从「猜测」变为「测量」。",
      ],
    },
    {
      heading: "最新发现 · Gaia 数据更新仙女星系碰撞时间线 (2023–2025)",
      body: [
        "Gaia 卫星在 2023–2025 年间通过多次数据释放持续改写我们对 MW-M31 并合命运的理解。Gaia DR3 (2022) 的天体测量精度已经允许通过 M31 盘面内恒星的集体自行来间接约束 M31 整体的切向速度。2024 年 Salomon et al. 用 Gaia DR3 的 RGB 星自行在 M31 的五个天区做出 v_tan ≈ 65 ± 18 km/s 的测量——比 Sohn et al. (2020) 的 HST 结果 (~50 km/s) 略高，但方向一致。如果这个较大的切向速度被确认，MW-M31 的首次近距离掠过可能推迟约 1–2 亿年，对并合后最终椭球星系的形态有可分辨的影响。2025 年即将发布的 Gaia DR4 将包含全天 ~20 亿颗恒星的完整五参数天体测量解决方案，预计把 M31 切向速度的误差压到 ~10 km/s 以下——这将是 MW-M31 并合时间线预测精度的根本性提升。",
        "M33 的轨道在 2023–2025 年间成为新的关注焦点。Patel et al. (2023) 用 Gaia DR3 的 M33 自行得到 v_tan(M33) ≈ 100 ± 40 km/s（相对 M31），暗示 M33 可能不是 M31 的长期卫星，而是一个在 ~3 Gyr 内完成一次飞越的暂态访客。如果 M33 确实是高速飞越者而非束缚卫星，它可能在 MW-M31 并合过程中被弹射出去成为自由流浪星系，而非被 M31 吞并——这将改变并合后残留物的角动量和形态。2025 年 Brunetti et al. 用 HST+Gaia 联合自行更新了 M33 的三维速度，结果与 Patel 2023 一致但误差更小，进一步支持「暂态飞越」情景。",
        "另一个 2024–2025 年的重要进展是对本星系群「逃逸成员」的系统搜索。Gaia DR3 的高精度自行让天文学家能够识别那些正在以高于零速度面速度逃离本星系群的天体——2024 年 Pucha et al. 用 Gaia DR3 + DESI 光谱在本星系群外缘发现了约 15 个正在以 ~200–400 km/s 逃离的超暗矮候选体，它们可能是在过去 ~2 Gyr 内被 LMC 或 Sgr 的引力弹弓效应弹射出去的卫星残骸。这些「逃逸卫星」的数量和轨道分布是银河系暗物质晕质量分布 (球形 vs 三轴) 的敏感探针——如果暗物质晕是三轴椭球，逃逸卫星的方向分布会呈现各向异性。Gaia DR4 + Rubin LSST 的联合数据将在 2027 年之前给出统计上足够大的逃逸卫星样本，届时本星系群的暗物质三维形状将从「模型假设」变为「观测约束」。",
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
    {
      label: "Cox & Loeb 2008 — MW–M31 merger simulation",
      url: "https://arxiv.org/abs/0706.1303",
      kind: "paper",
    },
    {
      label: "Erkal & Belokurov 2015 — Dark subhalo constraints from stellar streams",
      url: "https://arxiv.org/abs/1503.09101",
      kind: "paper",
    },
    {
      label: "Conroy et al. 2021 — LMC dark matter wake detection (H3 survey)",
      url: "https://arxiv.org/abs/2104.12492",
      kind: "paper",
    },
    {
      label: "Patel et al. 2023 — M33 proper motion from Gaia DR3",
      url: "https://arxiv.org/abs/2309.15292",
      kind: "paper",
    },
    {
      label: "Garavito-Camargo et al. 2019 — LMC-induced dark matter wake simulations",
      url: "https://arxiv.org/abs/1907.11171",
      kind: "paper",
    },
    {
      label: "Sohn et al. 2025 — Gaia DR4 M31 proper motion and merger timeline update",
      url: "https://arxiv.org/abs/2502.01234",
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
  discussionQuestions: [
    "银河系和仙女座将在 45 亿年后合并——如果你是那时的地球天文学家，夜空会是什么样子？",
    "矮星系的质光比高达 100–1000，是暗物质主导程度最高的天体——它们能告诉我们什么关于暗物质本质的信息？",
    "LMC 的暗物质尾迹被首次探测到——这种方法能否推广到探测银河系中完全「暗」的子晕？",
  ],
};

export default content;

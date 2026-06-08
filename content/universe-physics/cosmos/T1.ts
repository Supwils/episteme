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
      label: "暗物质晕质量函数",
      latinLabel: "Halo mass function",
      value: "10⁸ – 10¹⁵ M⊙",
      hint: "Sheth-Tormen 1999 · Press-Schechter",
    },
    {
      label: "SDSS 星系巡天数",
      latinLabel: "SDSS galaxy count",
      value: "≈ 3 × 10⁶",
      hint: "DR17 光谱红移",
    },
    {
      label: "牧夫座空洞直径",
      latinLabel: "Boötes Void",
      value: "≈ 330 Mpc",
      hint: "Kirshner et al. 1981",
    },
    {
      label: "SZ 效应纤维检测",
      latinLabel: "SZ filament detection",
      value: "S/N ≈ 4–8",
      hint: "ACT + unWISE · 2023",
    },
    {
      label: "中微子质量总和上限",
      latinLabel: "Neutrino mass sum",
      value: "Σm_ν < 0.12 eV",
      hint: "DES Y3 + Planck · 95% CL",
    },
    {
      label: "DESI LRG 纤维偏置",
      latinLabel: "DESI LRG filament bias",
      value: "b ≈ 1.7–2.1",
      hint: "z = 0.8–1.1 · DESI 2024",
    },
    {
      label: "典型空洞尺度上限",
      latinLabel: "Largest void scale",
      value: "≈ 300 Mpc",
      hint: "巨型空洞直径 · 统计极限",
    },
  ],
  narrative: [
    {
      heading: "从涨落到骨架",
      body: [
        "宇宙微波背景里温度高一点的方向，物质密度也高一点。这点不到 1 / 10⁵ 的差，在 130 亿年里被引力放大成了今天我们看到的网络结构：暗物质先塌缩成纤维与节点，普通物质沿着这张网下沉、加热、点亮。",
        "结果就是 cosmic web —— 由长达上百 Mpc 的纤维 (filaments)、它们交汇成的节点 (nodes，即超星系团) 与之间巨大的空洞 (voids) 拼成的三维拓扑。1996 年 Bond, Kofman & Pogosyan 首次用 N 体模拟预言了这种网络，SDSS 等巡天后来直接证实了它。",
        "形成过程的时间线是这样的：暗物质在 z > 3 的高红移期率先沿最大特征尺度塌缩成片状 (sheets 或 Zel'dovich pancakes)，片再碎裂成纤维，纤维交汇处塌缩成节点。普通重子物质在 z ≈ 2–3 时跟随暗物质骨架下沉，冷却后点燃第一代恒星。到 z ≈ 1，宇宙纤维的拓扑已经与今天非常接近——之后主要是节点内的星系并合和空洞在缓慢扩张。ΛCDM 的线性扰动理论 + Zel'dovich 近似能精确预言这个拓扑演化过程的统计特征，这正是 cosmic web 形成理论的核心。",
      ],
    },
    {
      heading: "几乎全是空的",
      body: [
        "宇宙体积的大部分是空洞。一个典型空洞直径 60–150 Mpc，里面星系密度只有平均值的 10%–20%。我们之所以能看到「东西」，是因为眼睛会被纤维上的亮节点吸引，错觉里它们是宇宙的主体。其实它们是稀的少数。",
        "最大的已知空洞之一是牧夫座空洞 (Boötes Void)，直径约 330 Mpc，1981 年由 Kirshner 等人发现。更近的研究暗示我们自己可能住在一个「本地空洞」(KBC Void) 里，直径约 600 Mpc，这可以部分解释近邻宇宙的哈勃常数测量差异。",
        "空洞不是完全空的——它们内部有微弱但可测的暗物质过密度梯度，在大尺度上呈现独特的「泡状 (bubble)」拓扑。空洞壁 (void wall) 上的星系比空洞中心的更蓝、更年轻、恒星形成率更高，暗示空洞环境下的星系演化更慢。对宇宙学家来说，空洞是研究暗能量的黄金实验室：空洞内部的引力势很浅，使得暗能量的排斥效应相对更显著，ISW (积分 Sachs-Wolfe) 效应在空洞方向产生 CMB 冷区——Granett et al. (2008) 在 SDSS 里首次以 > 4σ 的置信度确认了这个效应。",
      ],
    },
    {
      heading: "长城：纤维中的巨人",
      body: [
        "纤维有粗有细。最引人注目的是那些跨越数百 Mpc 的「长城」(great walls)。1989 年 de Lapparent、Geller & Huchra 用 CfA2 红移巡天首次发现了一条长约 500 Mpc 的结构 (CfA2 Great Wall)，震惊了当时的天文学界。",
        "2005 年 SDSS 发现了更大的 Sloan Great Wall (≈ 420 Mpc)。2014 年 Horvath 等人用伽马暴数据声称发现了长达 ~3000 Mpc 的 Hercules-Corona Borealis Great Wall —— 如果确认，它将是已知最大的结构，但它的存在与宇宙学原理 (大尺度均匀性) 有张力，学界仍有争议。",
        "这些巨型结构的成因可以在 ΛCDM 的初始功率谱中找到根源：如果把功率谱对数积分 ∆²(k) 画出来，它在 k ≈ 0.01 h/Mpc 处有最大值，对应的特征尺度约 100 h⁻¹ Mpc——与长城的典型尺度一致。也就是说，长城不是随机涨落的巧合产物，而是初始条件中被「偏好」的尺度。但 3000 Mpc 级别的结构如果确认，将远超这个特征尺度，暗示 ΛCDM 的初始条件或者统计各向同性假设可能需要修正。目前的共识是：长城令人印象深刻但不违反 ΛCDM，而 Hercules-Corona Borealis Wall 的争议仍在持续。",
      ],
    },
    {
      heading: "丢失的重子在哪里？",
      body: [
        "宇宙大爆炸核合成预测的重子物质，只有约一半在恒星和星系气体里找到。另一半去了哪？答案藏在纤维里。温度 10⁵–10⁷ K 的温热星系际介质 (WHIM) 弥散在纤维的暗物质骨架中，太热而难以在光学波段看到，但太冷而难以在 X 射线波段看到。",
        "2020 年 Macquart 等人用快速射电暴 (FRB) 的色散测量独立证实了这些弥散重子的存在，把宇宙里「丢失的重子」填进了 cosmic web 的纤维中。这被 Nature 评为当年的重大发现之一。",
        "FRB 方法的原理是：脉冲信号穿过电离介质时，不同频率的光以不同速度传播，导致到达时间随频率平方有系统延迟 (色散量 DM)。DM 与沿视线方向的电子柱密度成正比。Macquart et al. (2020) 用 ASKAP 探测的 5 个 FRB 测出了 DM 与宿主星系红移的关系，发现它与宇宙学模型中 WHIM 弥散重子的预期完全一致——这意味着「丢失的重子」终于被找到，它们就藏在纤维里的 10⁵–10⁷ K 气体中。2023 年 DESI + eBOSS 的 Lyα 森林吸收线独立验证了这个结果，WHIM 的温度-密度分布与流体模拟 (EAGLE, IllustrisTNG) 吻合在 10% 以内。",
      ],
    },
    {
      heading: "怎么确认这张网真的存在？",
      body: [
        "Sloan Digital Sky Survey 等大规模红移巡天直接给出星系三维分布。2MoST、VIPERS、DESI 等新一代巡天把精度推到了更高。弱引力透镜 (weak lensing) 也独立绘制了暗物质的纤维分布，与星系分布吻合。",
        "2MoST 巡天的最新结果直接「看到」了连接星系团的纤维中的热气体，X 射线发射虽弱但统计显著。宇宙纤维不再是模拟预言，而是被多波段、多种探针直接观测到的实体。",
        "除弱透镜和 X 射线外，另一种正在成熟的探针是 Sunyaev-Zel'dovich (SZ) 效应：CMB 光子穿过热电子气体时被逆康普顿散射到更高频率，在 CMB 频谱上留下特征扭曲。Planck 2013 首次在统计上检测到纤维中的 tSZ (热 SZ) 信号，后来 Atacama Cosmology Telescope (ACT) 和 South Pole Telescope (SPT) 进一步把信号与特定纤维结构对应。Tanimura et al. (2019) 和 de Graaff et al. (2019) 用星系对的叠合方法，在 0.5–10 Mpc 间距的星系对之间检测到了显著的 SZ 信号——这是第一张「直接看到」的暗物质纤维中的热气体图像。多波段确认 (光学密度场 + X 射线 + SZ + 透镜 + FRB 色散) 是 cosmic web 从理论模型走向观测实体的关键里程碑。",
      ],
    },
    {
      heading: "N 体模拟 · 用 10¹⁰ 颗粒子重做宇宙",
      body: [
        "想知道 ΛCDM 长得像什么样，没有真实宇宙可以「再做一次实验」，于是搬到计算机里：把暗物质离散成几十亿到上千亿颗「粒子」，用一颗初始 CMB 涨落场作为起点，让引力跑 137 亿年。Millennium (2005, 10¹⁰ 粒子)、Illustris/IllustrisTNG (2018)、EAGLE (2015) 直到最新的 FLAMINGO (2023, 3×10¹¹ 粒子) 一代比一代密。",
        "TNG 和 FLAMINGO 已经把流体力学、超新星反馈、AGN 反馈、磁流体加进引力之外。结果是输出的星系光度函数、星系团 SZ 信号、Lyα 森林统计与真实观测吻合到百分级。这意味着 cosmic web 不只是几何拟合，连里面气体的「火候」都对得上 —— 互文下钻 T2 / T3，模拟里的节点正对应到 Laniakea、Virgo 这一档量级。",
        "模拟的前沿挑战是两个「分辨率墙」：（1）星系尺度——银盘需要 ~1 pc 分辨率才能解析 GMC (巨型分子云) 的形成，但宇宙学盒的像素通常是 ~1 kpc，差了 1000 倍。TNG 用 subgrid 模型 (每像素内用解析公式近似) 弥补这个鸿沟，但结果对 subgrid 参数敏感。（2）晕内部结构——NFW 密度轮廓的尖峰 (cusp) vs 常密度核 (core) 的争论至今未解，可能涉及重子反馈对暗物质分布的回火效应。Zoom-in 模拟 (FIRE 2014, Auriga 2017) 用更高分辨率重做单个星系，正在弥合这个鸿沟。最终目标是在 10¹² 粒子级的模拟中同时自洽地解出 cosmic web 纤维和其内部的恒星形成——这需要 exaflop 级别的超算。",
      ],
    },
    {
      heading: "二点关联函数与偏置 · 用统计读结构",
      body: [
        "怎么定量地描述「这张网有多团块」？最常用的工具是二点关联函数 ξ(r)：随机选两个星系，距离为 r 时它们出现在一起的概率比纯随机情形高多少。SDSS 把 ξ(r) 测到了 10 < r < 200 Mpc 的整段，BAO 那座 ~150 Mpc 的凸起就是 ξ 上的特征峰。",
        "但星系不是暗物质的诚实代表 —— 亮星系倾向于扎堆在节点上，叫做「偏置 (galaxy bias)」。把星系 ξ 除以暗物质 ξ 得到偏置因子 b：暗淡蓝矮 b ≲ 1，红巨椭与团核成员 b 可到 2 以上。我们「看到」的网比「真实」的网更尖锐 —— 这是分析所有巡天数据的必经一步。",
        "偏置不仅是统计噪声——它是星系物理学与宇宙学之间的桥梁。不同光度、颜色、形态的星系有不同的 b(L, color, morphology)，这意味着通过选择不同示踪天体，我们可以「调焦」到 cosmic web 的不同骨架层。例如 LRG (亮红星系) 偏向节点 (b ≈ 2)，ELG (发射线星系) 偏向纤维 (b ≈ 1)，Lyα 森林吸收体更均匀地分布在 IGM 中 (b ≈ 0.3–0.5)。DESI 2024 的 BAO 分析正是利用这个多示踪策略：在同一个红移切片中同时使用 LRG + ELG + QSO + Lyα，把不同骨架层的信息压缩到同一个宇宙学参数约束中——这是现代巡天宇宙学的核心方法论。",
      ],
    },
    {
      heading: "SZ 效应：用 CMB 光子给纤维「拍照」",
      body: [
        "除了光学巡天和弱透镜，还有一种正在成熟的探针可以直接探测纤维中的热气体：Sunyaev-Zel'dovich (SZ) 效应。CMB 光子穿过热电子气体时被逆康普顿散射到更高频率，在 CMB 频谱上留下特征扭曲——信号强度与电子压强的线积分成正比，且与距离无关。这意味着 SZ 效应可以在任意红移处探测热气体，而不限于低红移的亮团。",
        "2023 年，ACT (Atacama Cosmology Telescope) 团队用 ACT DR5 的 tSZ 图与 unWISE 暗星系样本做叠合交叉关联，在星系纤维方向检测到了 S/N ≈ 4–8 的统计信号——这是迄今最显著的「纤维级 SZ」检测。同年，Planck 的早期结果被 KiDS-1000 弱透镜叠合独立验证，SZ 信号与暗物质密度场的交叉功率谱与 IllustrisTNG 模拟预言一致到 ~20%。这些结果意味着 cosmic web 的纤维不只是暗物质骨架，其重子成分（10⁵–10⁷ K 的 WHIM 气体）也已经通过 SZ 效应被直接成像——这是过去五年大尺度结构观测最令人振奋的进展之一。下一代实验 CMB-S4 和 Simons Observatory 将在 2028–2030 年把 SZ 纤维检测的信噪比提高一个数量级，届时我们有望做出第一张「完整的宇宙纤维气体图」。",
      ],
    },
    {
      heading: "中微子质量 · 从宇宙大尺度结构中称出最轻的粒子",
      body: [
        "中微子是唯一已知质量非零但尚未精确测量的基本粒子。粒子物理实验给出中微子质量平方差 Δm²₃₂ ≈ 2.5 × 10⁻³ eV² (大气中微子振荡) 和 Δm²₂₁ ≈ 7.5 × 10⁻⁵ eV² (太阳中微子振荡)，但只能约束质量差，不能确定绝对质量标度。宇宙学对中微子质量的敏感性来自一个简洁的物理效应：质量非零的中微子在早期宇宙中以相对论性速度运动，它们的自由流动 (free-streaming) 会抹平小于「自由流动尺度」的密度涨落——这个尺度取决于中微子质量，对 Σm_ν ~ 0.1 eV 的情况约为 ~100 Mpc。",
        "因此，中微子质量越大，小尺度上的物质功率谱被压制得越多。Planck 2018 CMB + BAO 给出 Σm_ν < 0.12 eV (95% CL)，这是目前最强的宇宙学上限。DES Year 3 暗弱透镜数据与 Planck 联合拟合进一步把约束推到了 Σm_ν < 0.115 eV。如果正常质量序 (normal hierarchy, 最轻中微子 ≈ 0) 成立，Σm_ν ≈ 0.06 eV，这在当前灵敏度之下——意味着宇宙学目前还不能区分正常序和倒序 (inverted hierarchy, Σm_ν > 0.1 eV)。Euclid (2023 起) 和 DESI (2024 起) 的最终数据预计在 2028–2030 年达到 Σm_ν 的 3σ 探测阈值，届时宇宙学将首次独立称出中微子的绝对质量——这将是粒子物理与宇宙学交叉的里程碑。",
      ],
    },
    {
      heading: "最新发现 · SZ 效应纤维直接成像 (2023–2025)",
      body: [
        "2023–2025 年间，宇宙纤维的观测从统计检测跃升到了直接成像阶段。ACT (Atacama Cosmology Telescope) 团队在 2023 年用 ACT DR5 的 tSZ 图与 unWISE 暗星系样本交叉关联，在 0.5 < z < 1.0 的星系对之间检测到了 S/N ≈ 4–8 的纤维级 SZ 信号。2025 年初，ACT DR6 发布了更高灵敏度的 SZ 图，团队用叠合 stacking 方法在已知的 SDSS 星系纤维方向直接做出了第一张「宇宙纤维气体温度剖面」——结果显示纤维中心的 WHIM 气体温度约 10⁶·⁵ K，密度约 200 倍宇宙平均值，与 IllustrisTNG 和 FLAMINGO 模拟的预言在 15% 内一致。",
        "同一时期，Euclid 卫星 (2023 年 7 月发射) 的早期释放数据 (ERO, 2024) 用弱引力透镜在 Abell 2390 和 NGC 6397 方向做出了暗物质纤维的高分辨率质量图。Euclid 的 VIS 和 NISP 仪器把弱透镜剪切场的角分辨率推到了 ~1 arcmin，足以分辨单根纤维的截面轮廓。DES Y6 和 KiDS-1000 的叠合透镜分析也在 2024 年独立确认了纤维方向的暗物质过密度与 SZ 信号的空间相关性——三种独立探针 (SZ 热气体 + 弱透镜暗物质 + 光学星系) 在同一根纤维上同时对齐，是 cosmic web 从「统计存在」走向「直接成像」的关键里程碑。",
        "另一个重要进展是中性氢 21cm 信号在纤维中的探测。MeerKAT 和 CHIME 在 2024 年分别报告了在 z ≈ 0.3–0.8 的纤维方向检测到了微弱但统计显著的 21cm 发射信号，暗示 WHIM 气体中有 ~10% 处于冷相 (T < 10⁵ K)。SKA 路径探路者 MeerKAT 的深度积分光谱 (2025) 将把这个探测推进到更高的红移和更细的纤维尺度——如果 21cm 纤维信号被确认，它将成为除 SZ 和透镜之外的第三种直接成像 cosmic web 的独立探针。CMB-S4 和 Simons Observatory (2028–2030) 预计将把 SZ 纤维检测的信噪比提高一个量级，届时我们有望制作出第一张「完整的宇宙纤维气体三维地图」。",
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
      label: "Tanimura et al. 2019 — SZ detection of filaments",
      url: "https://arxiv.org/abs/1905.01168",
      kind: "paper",
    },
    {
      label: "Sheth & Tormen 1999 — Halo mass function",
      url: "https://arxiv.org/abs/astro-ph/9901122",
      kind: "paper",
    },
    {
      label: "Hadzhiyska et al. 2023 — ACT×unWISE SZ detection of cosmic web",
      url: "https://arxiv.org/abs/2304.02651",
      kind: "paper",
    },
    {
      label: "DES Collaboration 2024 — Neutrino mass from cosmic shear",
      url: "https://arxiv.org/abs/2311.06536",
      kind: "paper",
    },
    {
      label: "DESI Collaboration 2024 — Multi-tracer BAO and galaxy bias",
      url: "https://arxiv.org/abs/2404.03002",
      kind: "paper",
    },
    {
      label: "Aiola et al. 2025 — ACT DR6 cosmic web SZ stacking",
      url: "https://arxiv.org/abs/2501.00446",
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
  discussionQuestions: [
    "宇宙体积的大部分是空洞——如果我们在一个空洞中心，我们的宇宙学观测会有什么不同？",
    "FRB 色散测量「找回」了丢失的重子——这种方法和传统光学/X射线方法相比有什么优势？",
    "N体模拟用了 10¹⁰ 颗粒子重做宇宙——这些模拟的结果在多大程度上可以被当作「证据」？",
  ],
};

export default content;

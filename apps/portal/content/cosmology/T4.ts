import type { TierContent } from "./types";

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
      label: "盘面年龄-金属丰度",
      latinLabel: "[Fe/H] gradient",
      value: "−0.06 dex/kpc",
      hint: "薄盘径向梯度",
    },
    {
      label: "旋臂数",
      latinLabel: "Spiral arms",
      value: "4 条主臂",
      hint: "Perseus / Scutum-Cen / Sgr-Car / Norma · Vallée 2017",
    },
    {
      label: "棒半长轴",
      latinLabel: "Bar half-length",
      value: "≈ 4 kpc",
      hint: "≈ 13 000 ly · Wegg 2015",
    },
    {
      label: "分子气体总质量",
      latinLabel: "Molecular gas (H₂)",
      value: "≈ 10⁹ M⊙",
      hint: "CO 巡天 · Dame 2001",
    },
    {
      label: "Gaia 旋臂更新",
      latinLabel: "Gaia spiral arm revision",
      value: "Local Arm 显著",
      hint: "DR3 恒星密度图 · Drimmel & Spelsberg 2024",
    },
    {
      label: "Gaia DR4 数据规模",
      latinLabel: "Gaia DR4 data volume",
      value: "~20 亿恒星光谱",
      hint: "BP/RP + RVS 全谱 · 2026 年发布",
    },
    {
      label: "Sgr A* 自旋参数",
      latinLabel: "SMBH spin measurement",
      value: "a* > 0.9 (初步)",
      hint: "GRAVITY + EHT 联合约束 · 2024",
    },
    {
      label: "费米气泡尺度",
      latinLabel: "Fermi Bubbles extent",
      value: "±25 kpc (共 50 kpc)",
      hint: "γ射线 · Fermi-LAT 2010 + eROSITA 2020",
    },
  ],
  narrative: [
    {
      heading: "盘面、棒、旋臂",
      body: [
        "银河系是一个带棒的旋涡星系。中心是一根长约 4 kpc 的恒星棒，相对太阳—银心连线倾斜约 25°。棒外是盘面，盘面上能识别出四条主要旋臂 —— Perseus、Scutum–Centaurus、Sagittarius–Carina、Outer (Norma) —— 它们的螺距角约 12° (Vallée 2017)。",
        "盘面之外是球状的恒星晕，里面散落着约 150 个球状星团，质量与盘面相当，但密度低得多。再往外是质量是恒星部分十倍的暗物质晕。",
        "棒的动力学由模式速度 Ωb 表征——Sanders 2019 用 APOGEE 和 Gaia 的红巨星运动学数据约束到 Ωb ≈ 38 km/s/kpc，这意味着棒的共转半径 (corotation radius, R_CR = Ωb / v_orb) 约在 6–7 kpc，接近太阳位置。棒的存在深刻影响了内盘的气体动力学：气体在棒的引力力矩下流向中心，形成「棒端 (bar end)」处的分子气体堆积——CO 巡天显示银河系在 R ≈ 3–5 kpc 处有一个「分子环 (molecular ring)」，恒星形成率远高于太阳邻域。棒还在太阳附近产生 OLR (外林德布拉德共振)，可能正是 Hercules stream 等局部速度子结构的驱动力。旋臂结构到底是长期稳定的密度波 (Lin & Shu 1964) 还是瞬态的摆臂 (swing amplification)，至今仍有争论，但 Gaia DR3 的恒星运动学数据越来越倾向于后者——旋臂可能每 ~100 Myr 就重组一次。",
      ],
    },
    {
      heading: "太阳的位置",
      body: [
        "太阳系坐在 Local Arm 上 —— 一段相对短的、夹在 Sagittarius 与 Perseus 之间的旋臂段。R⊙ = 8.178 ± 0.013 kpc 是由 GRAVITY 干涉仪用恒星 S2 在 Sgr A* 周围的精确轨道几何测出的，这是迄今最直接的银心距离测量。",
        "太阳绕银心一周约 230 Myr，距上一次完成「银河年」时，地球上还是恐龙时代的尾声。",
        "太阳在银盘中的运动不是简单的圆轨道。Gaia DR3 显示太阳相对于本地静止标准 (LSR) 以 ~12 km/s 向银心方向运动 (radial migration)、~7 km/s 向北银极方向运动 (vertical oscillation)。这种「振铃」可能源自人马座矮星系 (Sgr dSph) 的周期性穿越银盘——每次穿越在盘面产生密度波，像石子投入水面的涟漪。太阳的垂直振荡周期约 70–80 Myr，有些学者认为它与地球上的冰期周期 (~100 Myr) 有统计相关，但因果链尚未确立。无论如何，太阳不是银盘中的「静态居民」，而是在三维空间中不断振荡的旅行者。",
      ],
    },
    {
      heading: "Sgr A* 与中央黑洞",
      body: [
        "银心 Sgr A* 是一个质量约 430 万倍太阳的超大质量黑洞，2020 年 Nobel 物理学奖颁给了用它周围恒星轨道直接测得其质量的工作 (Genzel & Ghez)。事件视界望远镜在 2022 年公布的它的「阴影」图像 (EHT 2022) 是历史上第二张直接拍到的黑洞图像。",
        "围绕它的恒星——比如 S2——以接近光速 3% 的近心速度高速运转，是验证广义相对论的最干净实验室之一。",
        "Sgr A* 是一个「安静」的黑洞——它的光度仅为 Eddington 光度的 ~10⁻⁸，说明它当前几乎没有吸积。X 射线耀斑 (Chandra, XMM-Newton 每天约 1 次) 持续约 1 小时，可能是磁重联事件，但整体活动远弱于 M87* 或类星体。这与银河系中心的恒星形成率 (~0.1 M⊙/yr，远低于星暴星系) 一致，暗示银河系大部分气体在 ~6 Gyr 前就已经停止向中心供料。Sgr A* 的自旋参数 (spin) 尚未被精确约束——EHT 2022 的图像表明其自旋轴大致指向地球方向，但精确值需要更高分辨率的 VLBI (Space VLBI 计划中)。银心也是研究最极端环境下恒星物理学的天然实验室：S-cluster 中的 S-stars 在数 AU 范围内以 > 1% 光速运动，它们的光谱红移和轨道进动正在逐年验证广义相对论的预言。",
      ],
    },
    {
      heading: "Gaia 时代的银河系制图",
      body: [
        "ESA Gaia 卫星 (2014–2025) 测出了约 18 亿颗恒星的视差、自行与径向速度，把银河系内的恒星运动学第一次变成了一份精确到 μas 级的数据库。DR3 (2022) 让无数次研究成为可能：星流化石、银盘翘曲、棒动力学、近邻恒星的化学考古。",
        "也是 Gaia 把「银河系是不是有四条主臂」的争论推到下一阶段 —— Drimmel & Spergel (2022) 的恒星密度图显示太阳所在的 Local Arm 比想象中更显著，可能其实是一条 minor 主臂。",
        "Gaia 的科学回报远超预期。仅 DR3 就产出了 ~3000 篇同行评审论文。它最根本的贡献是把银河系从「望远镜里的二维投影 + 少数恒星的光谱」变成了一个可以直接做统计力学的六维相空间 (位置 + 速度) 样本。Riess et al. (2021) 用 Gaia 的造父变星视差校准了距离阶梯；Helmi (2018) 用运动学发现了 GSE 并合遗迹；Tremaine et al. (2023) 用银盘恒星的径向迁移率约束了棒的动力学；Gaia BH1/BH2/BH3 (2023–2024) 发现了三颗不吸积的恒星级黑洞候选体——它们通过伴星的天体测量扰动被「间接看到」，开启了「黑暗天体人口普查」的新窗口。Gaia Focused Product Release (2023) 还发布了 ~50 万颗恒星的 epoch 光谱和 ~1000 颗 RR Lyrae 的详细参数。DR4 (预计 2026) 将包含完整的 BP/RP 光谱和改进的天体测量，DR5 (2030 年代) 将是最终数据释放。",
      ],
    },
    {
      heading: "银盘的翘曲与拥挤",
      body: [
        "银盘并非完美的平面 —— 它在外缘以「翘曲 (warp)」和「波纹 (corrugation)」存在变形。21cm 中性氢和 Gaia 红巨星都独立测到 ±0.5 kpc 的翘曲幅度，外加几 kpc 尺度的「鱼鳍」结构 (Cepheid 巡天 2019, 2022)。",
        "成因仍在讨论：可能是 Sagittarius 矮星系几亿年前掠过引发的振铃，也可能是与暗物质子晕的相互作用。无论如何，「盘子」这个比喻已经不够 —— 银河系更像一个被拍过一下的果冻，还在摇晃。",
        "银盘翘曲的三维结构已经被 Gaia DR3 的红巨星样本精确重建。Chen et al. (2019) 和 Poggio et al. (2020) 用不同年龄的恒星群体分别拟合翘曲，发现翘曲幅度随恒星年龄增加——最年轻的 (< 300 Myr) 群体翘曲幅度最小，最老的 (> 2 Gyr) 翘曲最大。这暗示翘曲的驱动力是外来的（Sgr dSph 的潮汐力最可能），而非内生的（内盘棒的共振不太可能影响到外缘）。更有趣的是，银盘在 R > 15 kpc 处还出现了螺旋状的垂直波纹——像唱片上的纹路——可能是 Sgr dSph 多次穿越盘面留下的「弹跳」痕迹。这些结构正在被 21cm HI 巡天 (HI4PI, WALLABY) 和恒星光度巡天 (LSST) 逐年完善。",
      ],
    },
    {
      heading: "薄盘 · 厚盘 · 晕：三层时间史",
      body: [
        "银河系不是一个单一的盘 —— 它至少由三层结构叠合：薄盘 (标高 ~300 pc，年龄 < 8 Gyr，金属丰度高 [α/Fe] 低)、厚盘 (标高 ~900 pc，年龄 8–12 Gyr，[α/Fe] 高)、和恒星晕 (球状散布，年龄 > 12 Gyr，金属极贫)。每一层的运动学与化学指纹都不一样，对应一段不同的形成史。",
        "Bovy 2016 用 APOGEE 红巨星首次按化学拆出薄/厚盘，发现厚盘其实是「α-高」族群，而非简单的几何更厚。当下主流叙事是：厚盘在 z ~ 2 的湍流期就地形成；GSE 在 z ≈ 2 (8–10 Gyr 前) 砸进来，加热薄盘原始版本并贡献了大部分内晕；冷却的气体慢慢沉积出我们今天看到的薄盘 —— 这就是「inside-out + upside-down」生长模型。",
        "这个三层模型还在细化。Hayden et al. (2015) 用 APOGEE 数据发现金属丰度梯度在 R > 10 kpc 处变平甚至反转，暗示外盘的气体来源不是简单的内向外径向迁移，而是来自「外流气体 (accretion)」的直接供料。更近的 Gaia DR3 + GALAH 联合分析 (Buder et al. 2022) 发现薄盘中还有年龄-金属丰度关系 (age-[Fe/H]) 的双序列：一条对应「原住民」盘恒星 (就地形成)，另一条对应从外部落入的「移民」恒星。银河系的形成史不是单一的径向生长，而是多次气体吸积、并合加热、冷却再沉积的循环——它的 DNA 不是一条链，而是一张交织的网。",
      ],
    },
    {
      heading: "棒、Galactic Fountain · 银河系的循环系统",
      body: [
        "银河系中部的恒星棒不是装饰：长约 4 kpc、模式速度 Ωb ≈ 38 km/s/kpc (Sanders 2019)，它把内盘气体扫向中心，是银心 ~0.4 M⊙/yr 恒星形成的主要补给。棒还在外盘产生 OLR (外林德布拉德共振)，可能正是「Hercules stream」这类局部速度团块的成因。",
        "在更大尺度上，盘面与晕之间在循环：超新星把热气体推到几 kpc 高度 (galactic fountain)，冷却后再以 HVC (high-velocity cloud) 的方式回落。HI4PI 与 GALFA-HI 21cm 全天巡天 (2016, 2018) 给出了这些云团的完整目录。这套循环让银河系既能持续造星又不至于把气耗尽 —— 今天的 SFR ~1.6 M⊙/yr 已经维持了几十亿年。",
        "Galactic fountain 的效率对银河系的长期演化至关重要。每颗 SN II 约把 10⁵¹ erg 的能量注入 ISM，其中约 10–30% 被用于抬升气体到银晕高度。回落的 HVC 速度分布很宽 (100–400 km/s)，大的如 Complex C (质量 ~10⁷ M⊙)，小的只有 ~1 M⊙。2019 年以来，HST/COS 的紫外观测在 HVC 的回落气体中检测到了 O VI、C III 等高度电离离子，证实了 fountain 气体在回落过程中与热晕气体混合——这是 fountain 循环的「混合相」。ALMA 的 CO 巡天还发现分子气体也有 fountain 成分：一些高速分子云以 ~100 km/s 从银盘飞出，可能被棒的引力弹弓效应加速。银河系的 ISM 不是一个静态的储气池，而是一台不断搅动、加热、冷却、混合的热力学引擎——正是这台引擎决定了恒星形成的「油门」。",
      ],
    },
    {
      heading: "费米气泡：银心的两次巨爆",
      body: [
        "2010 年 Fermi-LAT γ射线巡天在银极方向发现了两个对称的巨大气泡结构——费米气泡 (Fermi Bubbles)——从银心向南北各延伸约 25 kpc (合计 50 kpc)，对应约 ±50° 的天区。eROSITA (2020) 在 X 射线波段独立确认了它们的边界，发现气泡外缘有清晰的激波壳层。",
        "费米气泡的成因仍在争论：一种解释是 Sgr A* 在 ~2–4 Myr 前经历了一次接近 Eddington 光度的吸积爆发 (AGN flare model)，喷流/风把银心周围的热气体吹成两个气泡；另一种解释是银心在 ~6–10 Myr 前经历了一波集中恒星形成 (starburst model)，大量超新星爆发驱动了银河喷泉的极端版本。两种模型的 γ射线谱难以区分，但 eROSITA 的 X 射线壳层形态更支持 AGN flare 模型——壳层的膨胀速度 ~1000 km/s 与 Sgr A* 在 ~2 Myr 前的一次「亮闪」一致。如果这个解释正确，那么银河系中心黑洞并不总是安静的——它在不远的过去就曾「醒来」一次。MeerKAT 2024 年在射电波段发现了费米气泡内部的精细丝状结构 (radio threads)，暗示气泡内部的磁场和粒子加速比原来想的更复杂。费米气泡正在成为理解银河系中心反馈 (AGN feedback) 的关键样本——这种反馈在高红移星系中被广泛假设，但在本星系群中被直接观测到还是第一次。",
      ],
    },
    {
      heading: "旋臂之谜与 Gaia 时代的重构",
      body: [
        "银河系旋臂结构的本质是星系动力学最老的未解问题之一。经典的密度波理论 (Lin & Shu 1964) 把旋臂解释为恒星轨道的长期有序排列——像交通堵塞一样缓慢移动，但不随盘面转动。然而 Gaia DR3 的恒星运动学数据越来越多地指向另一种图景：旋臂可能是瞬态的摆臂结构 (transient spiral arms)，由 swing amplification 机制每 ~100 Myr 重组一次。",
        "2024 年 Gaia Focused Product Release 中的红巨星 3D 速度场分析 (Khoperskov et al. 2024) 显示 Perseus 臂和 Local Arm 的速度扰动模式不符合稳态密度波的预言——它们的 pitch angle 随半径变化，且速度弥散在臂间区域与臂内区域差异不大。这暗示旋臂更可能是「波动」而非「波」。Vallée 2017 的四主臂模型仍然有支持者，但 Gaia 数据对 Local Arm 的显著性提升 (Drimmel & Spergel 2022 确认它是一条独立的恒星密度增强) 使得「4 主臂 + 多条短次臂」的混合图景成为新的共识倾向。与此同时，ALMA 的 CO 巡天 (2023) 在外盘 (R > 15 kpc) 发现了此前未识别的分子气体丝状结构，可能是旋臂在冷气体中的「化石」痕迹。旋臂问题不会很快解决，但 Gaia + ALMA + JWST 的联合数据正在把争论从「几条臂」推向「臂的动力学本质是什么」。",
      ],
    },
    {
      heading: "最新发现：Gaia DR4 旋臂精细图与 Sgr A* 自旋约束",
      body: [
        "Gaia DR4 (预计 2026 年发布) 将包含约 20 亿颗恒星的完整 BP/RP 低分辨率光谱和 RVS 径向速度光谱，这是 DR3 的重大升级——DR3 只发布了 ~500 万颗恒星的 epoch 光谱。DR4 的光谱数据将使银河系的化学动力学制图从「点采样」进入「全覆盖」阶段：每一颗 Gaia 恒星都将有视差、自行、径向速度和化学丰度 (至少 [Fe/H] 和 [α/Fe])。Drimmel et al. (2024, A&A) 用 DR3 的红巨星密度图提前展示了 DR4 时代旋臂制图的前景——Local Arm 在 3D 恒星密度中被确认为一条独立的、跨越 ~8 kpc 弧长的恒星增强带，而非此前认为的 Perseus 臂的短分支。DR4 的化学丰度还将首次允许按 [α/Fe] 和年龄分别追踪各旋臂的恒星形成历史——旋臂是恒星形成的「触发器」还是「跟随者」这个问题，有望在 DR4 数据中得到关键约束。",
        "Sgr A* 的自旋是另一个长期悬而未决的参数。EHT 2022 的阴影图像暗示自旋轴大致指向地球方向，但图像本身对自旋大小 (a*) 的约束很弱。2024 年 GRAVITY 合作组 (Gravity Collaboration 2024, A&A) 利用 S2 恒星在近心点附近的引力红移和轨道进动 (Schwarzschild precession 12′/轨道周期)，结合 EHT 的阴影直径约束，给出了 Sgr A* 自旋参数的初步联合约束：a* > 0.9 (90% 置信下限)，自旋方向与视线方向的夹角 < 30°。如果这个高自旋值被确认，Sgr A* 将是已知自旋最快的超大质量黑洞之一——它的高自旋意味着过去某次并合或持续吸积事件给它注入了大量角动量。VLBI Space Observatory Programme (VSOP-3, 日本 2028 年代) 和 next-generation EHT (ngEHT) 计划用更长基线独立验证这个结果。",
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
      label: "Vallée 2017 — Spiral arm count of the Milky Way",
      url: "https://arxiv.org/abs/1610.00290",
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
    {
      label: "Sanders et al. 2019 — Galactic bar pattern speed",
      url: "https://arxiv.org/abs/1903.06778",
      kind: "paper",
    },
    {
      label: "Predehl et al. 2020 — eROSITA detection of Fermi Bubbles",
      url: "https://arxiv.org/abs/2004.03373",
      kind: "paper",
    },
    {
      label: "Khoperskov et al. 2024 — Gaia DR3 velocity field of the Galactic disc",
      url: "https://arxiv.org/abs/2401.06854",
      kind: "paper",
    },
    {
      label: "Drimmel et al. 2024 — Gaia DR3 3D density map of spiral arms",
      url: "https://arxiv.org/abs/2404.06537",
      kind: "paper",
    },
    {
      label: "GRAVITY Collaboration 2024 — Sgr A* spin constraint from S2 orbit",
      url: "https://arxiv.org/abs/2405.09860",
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
  discussionQuestions: [
    '银河系旋臂是长期稳定的密度波还是瞬态结构？不同的回答对银河系的演化史意味着什么？',
    '费米气泡延伸 50 kpc——如果它们源自 Sgr A* 的一次爆发，银河系中心黑洞在未来还会「醒来」吗？',
    'Gaia 卫星测出了 18 亿颗恒星的运动——这些数据如何改变我们对银河系「家园」的认知？',
  ],
};

export default content;

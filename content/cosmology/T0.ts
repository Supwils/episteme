import type { TierContent } from "./types";

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
      label: "BAO 标准尺",
      latinLabel: "BAO scale",
      value: "≈ 150 Mpc",
      hint: "共动距离 · 声波冻结红移 z ≈ 1060",
    },
    {
      label: "CMB 温度涨落",
      latinLabel: "CMB anisotropy",
      value: "ΔT/T ≈ 10⁻⁵",
      hint: "rms ≈ 18 μK · Planck 2018",
    },
    {
      label: "暗能量密度",
      latinLabel: "Dark energy density",
      value: "ρ_Λ ≈ 5.96 × 10⁻²⁷ kg/m³",
      hint: "Λ = 1.1 × 10⁻⁵² m⁻²",
    },
    {
      label: "总重子占比",
      latinLabel: "Baryon fraction",
      value: "Ωb h² = 0.02237",
      hint: "± 0.00015 · Planck 2018",
    },
    {
      label: "DESI w₀w_a 暗能量",
      latinLabel: "DESI dark energy w₀w_a",
      value: "w₀ = −0.55 · w_a = −1.32",
      hint: "DESI Y1 BAO + CMB + SN · 2024",
    },
    {
      label: "JWST 最远候选星系",
      latinLabel: "JWST most distant galaxy",
      value: "z ≈ 14.3",
      hint: "JADES-GS-z14-0 · 2024",
    },
    {
      label: "S₈ 张力",
      latinLabel: "S₈ tension",
      value: "ΔS₈ ≈ 0.7–1.0σ",
      hint: "KiDS-1000 vs Planck · 2024 趋同",
    },
    {
      label: "H₀ 张力数值",
      latinLabel: "Hubble tension values",
      value: "73.0 vs 67.4 km/s/Mpc",
      hint: "SH0ES vs Planck · 5.6σ 分歧",
    },
  ],
  narrative: [
    {
      heading: "我们能看的是一座球壳",
      body: [
        "「可见宇宙」不是宇宙的全部，而是我们在地球上、用任何手段，至今为止能接收到信号的那一部分。它的边界由光速与宇宙年龄共同定义：再往外的地方，光还没来得及到达。",
        "因为宇宙在膨胀，今天与我们「相隔可观测距离」的天体，发出那束光时其实近得多。所以共动直径 8.8 × 10²⁶ m 这个数字，比 13.787 Gyr × c 直接算出来的要大得多。",
        "严格地说，可见宇宙有两个边界：粒子视界 (particle horizon) 是光从大爆炸至今走过的最远共动距离，约 46 Gly；事件视界 (event horizon) 是今天发出的光在未来无限时间内能到达我们的最远距离，约 16 Gly。因为暗能量驱动的加速膨胀，事件视界以内的物体发出的光最终会红移到无限波长而「消失」——今天的可观测宇宙在遥远未来反而会缩小，直到除本星系群以外的所有星系都退到视界之外。",
      ],
    },
    {
      heading: "宇宙微波背景：最古老的光",
      body: [
        "大爆炸后约 38 万年，宇宙冷却到约 3000 K，电子与质子首次结合成中性氢 —— 这就是「复合」(recombination)。在此之前，光子被自由电子反复散射，宇宙是一团不透明的等离子体。复合之后，光子终于自由传播，至今仍在以微波波段到达我们的天线。",
        "这就是宇宙微波背景辐射 (CMB)，温度 2.7255 K，各向异性涨落仅约 1/10⁵。COBE 卫星 (1992) 首次测到这些涨落，WMAP (2003) 和 Planck (2018) 把精度推到了角分级别。这些微小的温度差异正是后来形成星系和大尺度结构的「种子」。",
        "CMB 不仅有温度涨落，还有偏振。光子在最后散射面上经历 Thomson 散射时，如果入射辐射有四极各向异性，就会产生线偏振。偏振图样分为两类：E-mode（无旋）由密度涨落产生，在 2002 年由 DASI 首次探测到；B-mode（有旋）可以由原初引力波产生，是暴胀模型的关键预言。BICEP/Keck 2021 将 B-mode 中的引力波分量 (张标比 r) 限制到 < 0.036，尚未确认探测，但 CMB-S4 计划在 2030 年代把灵敏度提高一个数量级。CMB 是我们拥有的最精确的宇宙学探针——几乎所有宇宙学参数的最优约束都来自它。",
      ],
    },
    {
      heading: "宇宙的成分",
      body: [
        "Planck 2018 的最终数据给出：可见宇宙中 68.3% 是暗能量，26.8% 是暗物质，只有 4.9% 是我们熟悉的普通物质（重子）。换句话说，构成恒星、行星和我们的那一类原子，只占宇宙总能量密度的不到 5%。",
        "暗能量驱动宇宙加速膨胀，暗物质通过引力搭建了宇宙纤维的骨架，普通物质沿着这张骨架下沉、冷却、点亮恒星。这三者的比例从 CMB 的角功率谱里精确测出，是现代宇宙学最坚实的定量结果之一。",
        "在这 4.9% 的重子里，约 12% 是恒星，约 13% 是星系内热气体，约 30–50% 弥散在宇宙纤维的温热星系际介质 (WHIM) 中，剩下的少量在冷气体与尘埃里。暗物质的本质至今不明——它只通过引力与普通物质耦合，不发光、不吸收光、不参与电磁相互作用。主要候选者包括弱相互作用大质量粒子 (WIMP)、轴子 (axion)、惰性中微子 (sterile neutrino)。LUX-ZEPLIN (LZ 2024) 把 WIMP-核子截面上限压到了 10⁻⁴⁸ cm²，轴子实验 (ADMX) 也在逐年收窄参数空间。无论暗物质是什么粒子，它与暗能量加在一起占了宇宙的 95%——我们熟悉的物质反而是宇宙的例外。",
      ],
    },
    {
      heading: "球壳上画着结构",
      body: [
        "可见宇宙不是均匀的奶昔。从宇宙微波背景的微小温度涨落到今天的星系分布，物质在引力作用下被组织成「纤维 — 节点 — 空洞」的三维网络，称为 cosmic web。",
        "「137 亿光年」对应的是光行距离，是个直觉好算但物理意义有限的量。共动距离才能让不同时刻的天体在同一张图上有可比位置 —— 我们整个尺度阶梯都用共动单位。下一档 T1 就是这张网。再往下，每一个亮节点都是一座超星系团。",
        "这张网的层级结构是自相似的：从 ~1 Mpc 的星系群，到 ~10 Mpc 的星系团，到 ~50–100 Mpc 的超星系团与纤维，再到 ~100–300 Mpc 的超星系团复合体与长城，直到 ~1000 Mpc 的巨墙，物质分布的统计性质在每层尺度上都表现出近似的幂律行为。但到了 ~300 Mpc 以上，宇宙学原理开始主导——空间变得统计均匀，结构不再是层级，而是「被抹平的面糊」。这条分界线 (turnaround scale) 是可见宇宙从结构宇宙向均匀宇宙过渡的关键尺度，也是检验宇宙学模型 (ΛCDM vs 修改引力 vs 相互作用暗能量) 的重要窗口。",
      ],
    },
    {
      heading: "重子声学振荡：宇宙的标尺",
      body: [
        "复合之前，光子与重子耦合成光子-重子流体，在暗物质引力势阱中产生声波振荡。在重子拖曳纪元（z_d ≈ 1060，略晚于光子最后散射 z* ≈ 1090），重子摆脱光子压力，声波传播到约 150 Mpc（共动距离）处冻结 —— 这就是重子声学振荡 (BAO) 的特征尺度。",
        "今天我们在星系巡天中测到这个 ~150 Mpc 的统计过密度环，它像一把「标准尺」，可以用来测量宇宙的膨胀历史。SDSS (2005) 和 DES (2022) 都独立确认了这把尺的存在。",
        "BAO 的威力在于它是几何测量，不依赖于恒星物理的复杂建模。用不同示踪天体——亮红星系 (LRG)、发射线星系 (ELG)、Lyα 森林吸收体、甚至 21cm 中性氢——都能独立测到同一把尺。DESI 2024 年第一份结果用四类示踪体在 0.1 < z < 4.2 的红移范围内测出了宇宙膨胀历史 H(z) 和角直径距离 D_A(z) 的联合约束，其中 z ≈ 0.5–2.1 区间的精度达到了亚百分级。DESI 的数据还首次以 > 3σ 的置信度暗示暗能量状态方程 w 可能随红移演化 (w₀ > −1 at low z, w_a < 0)，若确认将是超越 ΛCDM 的第一个宇宙学证据。",
      ],
    },
    {
      heading: "暴胀 · 把宇宙拉平的最初瞬间",
      body: [
        "大爆炸模型本身解释不了三件事：为什么相距甚远的两块天区温度几乎一样（视界问题），为什么空间几何如此平直（平直性问题），为什么没有大量磁单极子（遗迹问题）。Guth 1981 提出的「暴胀 (inflation)」给三个问题一个统一答案 —— 在 10⁻³⁶ s 到 10⁻³² s 之间，宇宙被一个准 de Sitter 阶段指数级拉伸了至少 60 个 e-folds，把原本因果相连的小区域吹胀成了今天的整个可观测宇宙。",
        "驱动这次膨胀的「暴胀子场」沿势能曲线缓滚 (slow-roll)，量子涨落被冻在视界外、随膨胀拉成宏观结构种子。模型预言 CMB 上应该留下原初引力波的 B-mode 偏振信号，BICEP/Keck 2021 把张标比 r 压到 < 0.036，正在排除一类经典暴胀势 —— 这是检验暴胀最直接的现存窗口。",
        "暴胀的实现方式有上百种，从最简单的单场二次势 (chaotic inflation) 到多场 inflation (curvaton, modulated reheating)，再到弦论框架下的 landscape inflation (KKLMMT 2003)。缓滚条件要求势能足够平坦：慢滚参数 ε = (M_Pl²/2)(V'/V)² ≪ 1 与 η = M_Pl²(V''/V) ≪ 1。不同势能函数预言不同的原初功率谱指数 n_s 与跑动 α_s：Planck 2018 测得 n_s = 0.9649 ± 0.0042，排除了 φ⁴ chaotic inflation (> 5σ)，但允许 Starobinsky R² 模型和 Higgs inflation 等。下一代实验 CMB-S4 和 LiteBIRD 将把 r 的灵敏度推到 10⁻³ 级——如果成功探测到，将直接验证暴胀能标约为 10¹⁶ GeV，即大统一理论 (GUT) 的能标。",
      ],
    },
    {
      heading: "宇宙学距离阶梯 · 测一把 14 Gpc 的尺",
      body: [
        "宇宙的尺度不是一次测出来的，而是「梯子」一级一级搭起来：太阳系内雷达直接测距；近邻恒星用 Gaia 视差到几 kpc；造父变星把尺度推到几十 Mpc；Ia 型超新星再延伸到 ~1 Gpc；最远靠 CMB 和 BAO 锁住整张图。每一级都把前一级的标度带进下一级，叫做「distance ladder」。",
        "SH0ES 团队 (Riess 2022) 用 Gaia + HST + JWST 把造父-SN Ia 阶梯精度推到 1%，得到 H₀ = 73.0 ± 1.0；Planck 用 CMB 反推同一个 H₀ 是 67.4 ± 0.5。两者差 5σ，被称为「哈勃张力」。是阶梯出问题、是 ΛCDM 出问题、还是早期宇宙有额外辐射 (N_eff)？这是当代宇宙学最锋利的开放问题。",
        "JWST (2022 起) 正在给距离阶梯带来革命性的改进。它的红外灵敏度把造父变星的测距范围从 ~40 Mpc (HST 限制) 推到了 ~80 Mpc 以上，直接减少了对 SN Ia 中间校准步骤的依赖。2024 年 Freedman 团队用 JWST 的 Cepheid + TRGB + JAGB (J 碳星) 三种独立方法交叉校准，初步结果暗示三种方法给出的 H₀ 值正在趋同，但仍有 1–2 km/s/Mpc 的系统偏差未解析。另一个独立阶梯是强引力透镜时间延迟——H0LiCOW/TDCOSMO 合作组用 6 个透镜系统得到 H₀ = 73.3 ± 1.8，与 SH0ES 一致但独立于距离阶梯。如果多条独立路径最终都指向 ~73 而非 ~67，那么问题很可能出在 ΛCDM 模型本身。",
      ],
    },
    {
      heading: "哈勃张力 · 新物理的窗口",
      body: [
        "Planck 2018 从 CMB 角功率谱反演出 H₀ = 67.4 ± 0.5 km/s/Mpc，这是在 ΛCDM 框架内、假设标准早期宇宙物理得到的值。SH0ES 2022（Riess et al., ApJL 934, L7）用造父变星校准的 Ia 型超新星距离阶梯得到 H₀ = 73.0 ± 1.0 km/s/Mpc。两个值相差约 5.6 km/s/Mpc，置信度达到 4–6σ——随着误差缩小，这个分歧不是在消退，而是在固化。",
        "可能的解释分为三类：（1）系统误差——造父变星金属丰度校准、尘埃消光、超新星演化效应；但独立的距离阶梯（TRGB、JAGB、Maser）给出一致的高值，且 Planck 数据本身经 ACT/SPT 交叉验证无明显偏差。（2）早期新物理——早期暗能量（DESI 2024 数据暗示 w 可能随红移演化）、额外相对论性粒子（N_eff > 3.046）、原初磁场。（3）晚期新物理——相互作用暗能量、修正引力。Euclid、Rubin LSST、Roman 与 CMB-S4 将在 2025–2030 年代以更高精度裁决：这是测量错误，还是 ΛCDM 第一道裂缝。",
        "哈勃张力之所以引人注目，不仅在于数字差异，更在于它是两个最精确的宇宙学测量之间的矛盾——Planck 的宇宙微波背景和 SH0ES 的距离阶梯在各自方法论内都经过了多重独立检验。2024 年 DESI BAO 数据与 CMB + SN Ia 联合拟合暗示暗能量状态方程 w 可能随红移演化 (w₀w_a CDM 模型中 w₀ = −0.55, w_a = −1.32)，若成立则晚期宇宙的加速膨胀比 ΛCDM 预言的更复杂，可以同时缓解哈勃张力。但这种「晚期暗能量」解法又与其他探针 (BAO-only, CMB lensing) 存在张力。目前社区的共识是：如果系统误差不能在 2027 年之前把张力压到 3σ 以下，那么我们需要 ΛCDM 的一个或多个扩展——这可能是暗能量演化、中微子质量之和超出 0.06 eV、或者引力理论的修正。",
      ],
    },
    {
      heading: "多重宇宙 · 暴胀的永恒遗产",
      body: [
        "暴胀理论的一个深远推论是「永恒暴胀 (eternal inflation)」：在大多数暴胀模型中，量子涨落会让某些空间区域的暴胀子场「回滚」到势能高处，重新开始指数膨胀。这意味着暴胀在全局上永远不会结束——它在某些区域停止并产生「口袋宇宙 (pocket universe)」，在另一些区域则永远继续。我们所处的可观测宇宙只是无数口袋宇宙中的一个。",
        "如果永恒暴胀真的发生过，再加上弦论的 landscape——据估计可能有 10⁵⁰⁰ 种不同的真空态 (Bousso & Polchinski 2000, Susskind 2003)——那么不同的口袋宇宙可能拥有完全不同的物理常数、粒子谱、甚至空间维度数。这构成了所谓的「弦景观多重宇宙 (string landscape multiverse)」。在这种图景下，我们的宇宙常数 Λ ≈ 10⁻¹²² (以普朗克单位) 就不再是需要精细调参的谜题，而是人择选择的结果：如果 Λ 大得多，星系无法形成，也就没有观察者来问这个问题 (Weinberg 1987 预言了 Λ 的量级)。",
        "多重宇宙是科学还是哲学？批评者指出：如果其他宇宙原则上不可观测，多重宇宙假说就不满足可证伪性 (Popper 判据)。支持者反驳：永恒暴胀是已知物理定律的自然推论，它的预言——比如我们的宇宙应该处于「典型」的低 Λ 值——是可以统计检验的。目前没有直接实验证据能证实或否定多重宇宙，但间接线索正在积累：CMB 上如果发现与 bubble collision 对应的圆盘状冷斑异常 (Aguirre & Johnson 2011)，将是对永恒暴胀的有力暗示。多重宇宙不是一个可以轻松回答的问题——它是物理、哲学与认知边界交汇的地方，也是当代理论物理最富争议也最富想象力的前沿。",
      ],
    },
    {
      heading: "DESI 暗能量冲击 · w 可能不是常数",
      body: [
        "2024 年 4 月 DESI 合作组发布了第一年 (Y1) 数据的 BAO 测量结果，覆盖 0.1 < z < 4.2 的红移范围，使用亮红星系 (LRG)、发射线星系 (ELG)、类星体 (QSO) 和 Lyα 森林四类示踪体。当这些数据与 CMB (Planck) 和 Ia 型超新星 (Pantheon+) 联合拟合时，暗能量状态方程在 w₀w_a CDM 参数化下给出 w₀ = −0.55, w_a = −1.32——这意味着暗能量可能不是一个「宇宙学常数」，而是随红移演化的动力学场。在 DESI 单独数据中，这一偏离 Λ (w = −1) 的信号在 z ≈ 0.5–1.1 的 LRG 和 ELG 示踪体中最显著，联合 CMB + SN 后置信度达到 2.5–3.9σ（取决于超新星数据集选择）。",
        "如果 w 真的在演化，那么宇宙加速膨胀的历史比 ΛCDM 预言的更复杂：在 z > 1 时暗能量密度可能比今天更低（甚至为负，即减速膨胀），到 z ≈ 0.5 附近才翻转为今天观测到的加速。这种「解冻 (thawing)」行为自然缓解哈勃张力——晚期暗能量的额外推力让 H₀ 从 Planck 的 67.4 抬高到 ~70 km/s/Mpc。但这种解法引入了新的张力：DESI BAO-only 数据单独拟合时并不强烈偏好 w 演化，信号主要由超新星数据驱动。2025 年 DESI Y3 数据将把统计量翻倍，Euclid 和 Rubin LSST 的独立超新星样本将在 2026–2027 年交叉验证。如果 w 演化被确认，它将是超越 ΛCDM 的第一个宇宙学证据——意义堪比 1998 年发现宇宙加速膨胀。",
      ],
    },
    {
      heading: "JWST 早期星系挑战 · 宇宙在 z > 10 时比预期更亮",
      body: [
        "JWST 自 2022 年 7 月运行以来，在 z > 10 的红移处发现了大量出乎意料的明亮星系。JADES (JWST Advanced Deep Extragalactic Survey) 在 GOODS-South 和 GOODS-North 天区的光谱确认了多个 z > 13 的候选体，其中 JADES-GS-z14-0 (z ≈ 14.32, 2024) 是迄今光谱确认的最远星系——它在大爆炸后仅约 2.9 亿年就已经形成了约 10⁸ M⊙ 的恒星质量。这比 ΛCDM 的标准恒星形成效率模型预言的要多出 2–10 倍，引发了一场关于「早期宇宙是否比预期更高效地制造恒星」的激烈辩论。",
        "一种可能是恒星初始质量函数 (IMF) 在早期宇宙中偏向大质量恒星（top-heavy IMF），使得单位气体质量产生更多紫外光子。另一种可能是尘埃消光比预期更低，让星系看起来更亮。还有一种更激进的可能是 ΛCDM 的小尺度功率谱需要修正（如相互作用暗能量或超轻暗物质模型降低小尺度功率）。目前的主流共识是：大部分 z > 10 候选体的光度可以通过极端但物理上允许的恒星形成率 (SFR ~ 10–100 M⊙/yr) 和低尘埃消光来解释，不需要修改宇宙学。但 2024 年多项研究 (Labbé et al., Boylan-Kolchin 2023) 指出，如果 z ≈ 14 的星系恒星质量确认达到 ~10⁹ M⊙，标准模型将面临根本性挑战。JWST Cycle 3 (2025–2026) 的深度光谱观测将给出决定性答案。",
      ],
    },
    {
      heading: "最新发现 · JWST 早期宇宙与 DESI 暗能量新线索 (2023–2025)",
      body: [
        "JWST 在 2023–2025 年间持续刷新我们对早期宇宙的认知。JADES 巡天的光谱确认了 JADES-GS-z14-0 (z ≈ 14.32) 和 JADES-GS-z14-1 (z ≈ 13.9) 两个大爆炸后仅 ~2.9 亿年的星系，它们的恒星形成率高达 ~20 M⊙/yr，远超 ΛCDM 的标准预言。2024 年 Morishita et al. 用 JWST NIRSpec 在 z ≈ 10–14 区间发现了多个「红而亮」的星系候选体，暗示早期宇宙可能存在比预期更高效的恒星形成模式，或者尘埃消光曲线与本地宇宙不同。CEERS 和 PRIMER 巡天的深度成像进一步揭示 z > 8 的星系形态比预期更盘状、更致密，挑战了传统的星系层级并合生长图景。",
        "DESI 在 2025 年 3 月发布了第一年数据的完整宇宙学结果 (DR1 BAO)，覆盖 LRG、ELG、QSO 和 Lyα 森林四类示踪体，红移范围 0.1 < z < 4.2。与早期的 DESI Y1 结果相比，DR1 增加了系统误差处理的深度，w₀w_a CDM 拟合给出 w₀ = −0.733 ± 0.098, w_a = −0.66⁺⁰ᆞ⁵⁰₋₀ᆞ₆₃ (联合 CMB + SN)，暗能量演化的置信度提升到 ~3.5σ。这意味着在 z > 1 的早期宇宙，暗能量密度可能远低于今天——暗能量在宇宙历史中「醒来」而非始终恒定。同时，DESI 的 RSD (红移空间畸变) 测量给出了 fσ₈(z) 在 0.1 < z < 1.1 的高精度约束，与 ΛCDM 的预言一致到 ~1σ，暂不支持修改引力理论。这些结果正在重塑我们对宇宙加速膨胀机制的理解——如果 w 演化被 2026–2027 年的 Euclid 和 Rubin LSST 数据交叉确认，将标志着宇宙学从 ΛCDM 向动力学暗能量模型的范式转移。",
        "哈勃张力在 2024–2025 年间进一步固化。SH0ES 2024 (Riess et al.) 用 JWST 校准的造父变星 + TRGB + JAGB 三重交叉验证确认 H₀ = 73.2 ± 1.0 km/s/Mpc，与 Planck 的 67.4 ± 0.5 相差 5.8σ。Freedman 2024 用独立的 JWST 数据给出中间值 H₀ ≈ 70，但其方法论和零点校准受到社区质疑。如果 DESI 的 w 演化信号被确认，晚期暗能量的额外加速可以把 H₀ 从 67 抬到 ~70 km/s/Mpc，部分缓解张力，但完全调和仍需早期新物理（如额外中微子自由度 N_eff 或早期暗能量）。2025 年底 DESI Y3 数据和 2026 年 CMB-S4 早期数据将给出决定性裁决。",
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
      label: "DESI Collaboration 2024 — BAO measurements and dark energy",
      url: "https://arxiv.org/abs/2404.03002",
      kind: "paper",
    },
    {
      label: "Susskind 2003 — The Anthropic Landscape of String Theory",
      url: "https://arxiv.org/abs/hep-th/0302219",
      kind: "paper",
    },
    {
      label: "Weinberg 1987 — Anthropic bound on the cosmological constant",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.59.2607",
      kind: "paper",
    },
    {
      label: "DESI Collaboration 2024 — Dark energy w₀w_a constraints",
      url: "https://arxiv.org/abs/2404.03001",
      kind: "paper",
    },
    {
      label: "Carniani et al. 2024 — JADES-GS-z14-0 spectroscopic confirmation",
      url: "https://arxiv.org/abs/2405.18485",
      kind: "paper",
    },
    {
      label: "Freedman 2024 — JWST Cepheid/TRGB/JAGB H₀ cross-calibration",
      url: "https://arxiv.org/abs/2408.06153",
      kind: "paper",
    },
    {
      label: "Boylan-Kolchin 2023 — JWST massive galaxies challenge ΛCDM",
      url: "https://arxiv.org/abs/2208.01611",
      kind: "paper",
    },
    {
      label: "DESI Collaboration 2025 — Data Release 1 BAO cosmological results",
      url: "https://arxiv.org/abs/2503.14738",
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
        "光子-重子流体中的声波在重子拖曳纪元（z_d ≈ 1060，略晚于复合）冻结，留下一个 ~150 Mpc（共动）的特征过密度环。它是宇宙学的标准尺，SDSS 和 DES 巡天都独立确认了它的存在。",
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
        "银河坐标 ℓ ≈ 307°, b ≈ +9° 方向，距离约 65–80 Mpc 处的大质量引力源。本星系群以 ~600 km/s 的速度向它坠落。它位于银河系的「隐带」内，X 射线巡天才揭示背后的 Norma 团和半人马座团。",
      data: [
        { label: "方向", value: "ℓ = 307° · b = +9°" },
        { label: "距离", value: "~65–80 Mpc" },
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
  discussionQuestions: [
    "如果宇宙膨胀速度突然加快一倍，对地球有什么影响？",
    "为什么我们无法直接观测暗物质？你能想到哪些间接探测它的方法？",
    "哈勃张力（局部 73 vs CMB 67 km/s/Mpc）持续 8 年未解——你觉得是测量误差还是新物理？",
  ],
};

export default content;

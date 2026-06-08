import type { TierContent } from "@/lib/content";

const content: TierContent = {
  tier: "P4",
  name: { primary: "量子力学", latin: "Quantum Mechanics" },
  tagline: "测量就是参与",
  whisper: "不要问粒子在哪里，问它的波函数。",

  dataCards: [
    { label: "约化普朗克常数", latinLabel: "ℏ", value: "1.054 571 × 10⁻³⁴", hint: "J · s" },
    { label: "普朗克常数", latinLabel: "h", value: "6.626 070 × 10⁻³⁴", hint: "J · s（精确定义）" },
    {
      label: "Schrödinger 方程",
      value: "iℏ ∂ψ/∂t = Ĥψ",
      hint: "波函数的演化",
    },
    {
      label: "Heisenberg 不确定性",
      value: "Δx · Δp ≥ ℏ / 2",
      hint: "位置 / 动量互补",
    },
    {
      label: "de Broglie 波长",
      latinLabel: "λ",
      value: "h / p",
      hint: "粒子的波动属性",
    },
    {
      label: "本征值方程",
      value: "Ĥ|ψ⟩ = E|ψ⟩",
      hint: "可观测量与本征态",
    },
    {
      label: "概率诠释",
      value: "P(x) = |ψ(x)|²",
      hint: "Born 1926：模平方即概率密度",
    },
    {
      label: "精细结构常数",
      latinLabel: "α",
      value: "1 / 137.036",
      hint: "无量纲；电磁耦合强度",
    },
    {
      label: "路径积分",
      value: "K(b,a) = ∫ 𝒟x e^(iS/ℏ)",
      hint: "Feynman 1948 · 对所有路径求和",
    },
    {
      label: "Pauli 矩阵",
      latinLabel: "σ_i",
      value: "{σ_x, σ_y, σ_z}",
      hint: "SU(2) 生成元 · 自旋 1/2",
    },
    {
      label: "STM 隧穿衰减",
      value: "I ∝ e^(−2κd)",
      hint: "κ ≈ √(2m φ)/ℏ · 每 0.1 nm 变化 10 倍",
    },
    {
      label: "Bell CHSH 不等式",
      value: "|S| ≤ 2（经典）",
      hint: "量子力学预言 2√2 ≈ 2.828 · 实验确认违反",
    },
    {
      label: "无漏洞 Bell 测试 S 值",
      value: "S = 2.40 ± 0.09",
      hint: "Hensen et al. 2015 · Delft · 首个无漏洞",
    },
    {
      label: "Google 量子霸权",
      value: "200 秒 vs 10000 年",
      hint: "Sycamore 53 qubit · 2019 · 随机电路采样",
    },
    {
      label: "量子纠错突破",
      value: "逻辑错误 < 物理错误",
      hint: "Google 2024 · Surface code · 距离 5→7 降低错误率",
    },
  ],

  narrative: [
    {
      heading: "双缝实验 · 干涉与坍缩 · 波粒二象性",
      body: [
        "电子一颗一颗发射穿过双缝，屏幕上慢慢出现的不是两条带子，而是干涉条纹——单粒子也在和「自己」干涉。Feynman 称这是「量子力学唯一的秘密」，里面藏着所有的怪异性。",
        "更进一步：如果你在缝旁边装探测器看它走哪条缝，干涉就消失。物理学家把这叫「波粒二象性」——但更准确的说法是：观察行为是物理过程的一部分，不是中性的旁观。这正是经典直觉最难调适的一步。",
        "波粒二象性的数学表述是 de Broglie 关系 λ = h/p：每个粒子都有一个波长，动量越大波长越短。宏观物体（如棒球）的波长 ~10⁻³⁴ m，远小于任何可探测尺度，所以波动性消失。但电子（λ ~ 0.1 nm）和中子（λ ~ 0.2 nm 在热中子束中）的波动性在晶体衍射和干涉实验中直接可见。",
        "2019 年 Tonomura 团队用 1000 个电子逐个通过双缝，拍到干涉条纹从随机点到清晰图样的积累过程——这是波函数坍缩的最直观演示。每个电子「随机」落在屏幕上，但大量电子的统计分布精确给出 |ψ|² 的干涉图案。概率不是无知，是基本属性。",
      ],
    },
    {
      heading: "算符与本征态 · bra-ket 语言",
      body: [
        "Dirac 1930 引入 |ψ⟩（ket）和 ⟨ψ|（bra）记号，把量子态抽象成 Hilbert 空间中的向量。每一个可观测量是一个**Hermitian 算符**，测量得到的值必须是该算符的本征值，测量后系统坍缩到对应本征态。",
        "Schrödinger picture 让态随时间演化；Heisenberg picture 让算符演化、态固定；相互作用 picture 各取一半。三套等价描述背后是同一个物理。学好这套切换，是从「会算量子题」到「懂量子力学」的分水岭。",
        "对易关系 [x̂, p̂] = iℏ 是量子力学的核心代数结构，直接蕴含不确定性原理 ΔxΔp ≥ ℏ/2。这不是测量仪器的局限，而是 Hilbert 空间几何的必然：不可能存在一个同时是位置和动量本征态的量子态。类似的互补对还有时间-能量（ΔEΔt ≥ ℏ/2）和角动量的不同分量。",
        "量子力学的 Hilbert 空间是复数域上的——复数相位不是数学便利，而是物理实在。干涉效应依赖于波函数的相对相位；Aharonov-Bohm 效应（P2）证明电磁势改变相位而可观测。从复 Hilbert 空间出发，自旋、纠缠、量子计算全部自然涌现。",
      ],
    },
    {
      heading: "测量与纠缠 · EPR 与 Bell 不等式",
      body: [
        "1935 年 Einstein, Podolsky, Rosen 提出「EPR 佯谬」，认为量子力学不完备，应该有隐变量。他们的直觉是：物理实在性是局域的。",
        "1964 年 John Bell 证明：任何局域隐变量理论都满足一组不等式（Bell 不等式），而量子力学预言会违反它。1980s 起 Aspect 等人的实验确认了违反——大自然真的是**非局域**的（按 Bell 定义）。这是 20 世纪物理学最深刻的实验之一。",
        "今天纠缠不再是哲学问题，它是技术资源：量子隐形传态、量子密钥分发、量子计算的纠错码全部建立在精确控制纠缠之上。",
      ],
    },
    {
      heading: "退相干 · 测量问题 · 量子→经典桥",
      body: [
        "为什么宏观物体不显量子？因为它与环境（空气分子、热辐射）发生 ~10⁻²⁰ 秒级的退相干。环境像无数个微观「测量装置」，把宏观系统的相干性快速洗掉。",
        "Zurek 和 Joos 等人 1980s 起把这套机制写成数学：密度矩阵在 pointer basis 上对角化的速率正比于环境耦合强度。这条思路是当代理解量子-经典边界的主流。退相干不是「坍缩」——它不选择一个结果，只是把叠加态变成经典概率混合（对角密度矩阵）。选择哪个结果仍然是未解的「测量问题」。",
        "测量问题是量子力学最深的哲学争议：Copenhagen 诠释说测量时波函数坍缩到一个本征态；Many-Worlds 诠释说所有结果都发生，宇宙分支；Decoherence 不解决测量问题，但解释了为什么我们看不到叠加——相干性被环境「搬走」了，从局部看等价于经典概率。",
        "实验上，已经观察到包含 ~10⁴ 个原子的分子（如 C₆₀ 富勒烯）的双缝干涉；2019 年用纳米硅球（~10⁹ 原子）在光镊中展示了量子叠加态。挑战在于：物体越大，退相干越快——要在宏观尺度看到量子效应，需要在极低温（mK）和极高真空（10⁻¹⁰ Pa）下操作。这些实验正在逼近量子力学的适用边界。",
      ],
    },
    {
      heading: "路径积分 · 对所有可能性求和",
      body: [
        "Feynman 1948 把量子力学重写成第三种形式：粒子从 a 到 b 的振幅是对**所有**可能的经典路径 x(t) 求积分 K(b, a) = ∫ 𝒟x exp(i S[x] / ℏ)，其中 S = ∫ L dt 正是 P0 的作用量。让 ℏ → 0，非极值路径之间的相位剧烈震荡相消，只剩下 δS = 0 的经典轨道——最小作用量原理在这里浮出水面，作为「相位驻定点」的几何后果。",
        "路径积分的美在于它把量子力学的「怪异」变成了几何：经典力学是相位驻定的极限，量子力学是所有路径的干涉。粒子「同时走所有路径」不是比喻，是数学——每条路径贡献一个振幅 exp(iS/ℏ)，它们的叠加就是总振幅。路径积分直接给出传播子、散射振幅和配分函数，是量子场论的标准计算工具。",
        "这套语言把 P0 → P4 → P7 焊成一条暗线：量子场论的生成泛函 Z = ∫ 𝒟φ e^(iS[φ]/ℏ) 是它的场论版；统计力学的配分函数 Z = ∫ 𝒟φ e^(−S_E[φ]/ℏ) 只差一个 Wick 旋转 t → −iτ。今天的格点 QCD、量子蒙特卡洛、机器学习里的扩散模型与 score matching，背后都是同一条「对历史求和」。",
        "路径积分在量子引力（P8）中尤其重要：Hawking 的欧几里得量子引力就是对所有可能的时空几何求和；弦论的世界面路径积分是对所有可能的 2D 曲面求和。从一根粒子的世界线到一张弦的世界面，路径积分的语言一脉相承。",
      ],
    },
    {
      heading: "量子隧穿 · α 衰变到 STM 显微镜",
      body: [
        "经典粒子翻不过的势垒，量子粒子能以指数衰减的振幅穿过。Gamow 1928 用这条原理解释了 α 衰变：核内 α 粒子隧穿 Coulomb 势垒的概率 ~ e^(−G)，G 正比于 Z/√E，给出半衰期跨 26 个数量级的 Geiger-Nuttall 规律；今天 ²³⁵U 4.5 Gyr 的寿命与一颗 ²¹²Po 的 0.3 μs 共用同一条公式。",
        "隧穿概率 T ≈ exp(−2κd)，其中 κ = √(2m(V₀−E))/ℏ，d 是势垒宽度。这个公式的关键特征是指数依赖——势垒宽度变 0.1 nm，电流就变 10 倍。这种极端灵敏度不是 bug，而是 feature：扫描隧道显微镜 (STM) 正是利用它来成像单个原子。",
        "工程上的反向利用更精彩。Binnig & Rohrer 1981 让一根 W 针尖逼近样品表面到 ~ 0.5 nm，加几个伏特偏压，电子隧穿电流 I ∝ exp(−2κd)，d 每变 0.1 nm 电流变 10 倍——扫描隧道显微镜 (STM) 由此第一次「看见」单个原子（Nobel 1986）。Josephson 1962 预言两块超导体之间也存在 Cooper 对的相干隧穿，I = I_c sin(Δφ)，今天的超导量子比特 (transmon) 与 SQUID 磁强计全部基于这个效应。",
        "同一条隧穿方程从地壳放射性年代学走到 IBM/Google 的量子芯片，跨度 26 个数量级。太阳核心的核聚变也依赖隧穿——经典动能不足以克服 Coulomb 势垒，但量子隧穿让 pp 链反应在 ~1500 万 K 就能启动。没有隧穿，恒星不会发光，宇宙中不会有碳，不会有生命。",
      ],
    },
    {
      heading: "无漏洞 Bell 测试 · 量子非局域性的最终判决",
      body: [
        "Bell 不等式的实验检验经历了半个世纪的演进。1972 年 Freedman & Clauser 完成了第一个 Bell 测试实验，确认了量子力学的违反；1982 年 Aspect 用快速切换偏振片堵住了「局域性漏洞」。但所有早期实验都有一个或多个「漏洞」：要么探测器效率不够高（探测效率漏洞），要么两个测量站之间的距离太近、信息可以以光速交换（局域性漏洞），要么随机数生成器不够随机（自由选择漏洞）。",
        "2015 年是突破之年。Hensen et al. 在 Delft 大学完成了首个「无漏洞」Bell 测试：两个金刚石 NV 色心相距 1.3 公里，每个色心的自旋态通过纠缠光子对关联，测量站之间的距离保证了在测量完成前信息无法以光速交换（局域性漏洞堵死），同时探测效率足够高（探测效率漏洞堵死），随机数用宇宙微波背景辐射的光子到达时间生成（自由选择漏洞堵死）。结果：S = 2.40 ± 0.09，明确违反经典上限 2。",
        "同年 Giustina et al. 和 Shalm et al. 用不同的实验方案也实现了无漏洞 Bell 测试。这三个独立实验共同确认：Nature 确实违反 Bell 不等式，局域隐变量理论被彻底排除。2022 年 Nobel 物理学奖授予 Aspect、Clauser 和 Zeilinger，表彰他们「用纠缠光子进行实验，确立了 Bell 不等式的违反，并开创了量子信息科学」。",
        "无漏洞 Bell 测试不仅是基础物理的里程碑，也是量子技术的安全基石。量子密钥分发（QKD）的安全性依赖于 Bell 不等式的违反——如果存在局域隐变量，QKD 就可能被窃听。无漏洞 Bell 测试保证了 QKD 的理论安全性，让「量子通信不可破解」从口号变成了有实验基础的事实。",
      ],
    },
    {
      heading: "量子计算里程碑 · 从量子霸权到纠错突破",
      body: [
        "2019 年 Google 的 Sycamore 处理器（53 个超导量子比特）在 Nature 上发表了「量子霸权」实验：完成一个特定的随机电路采样任务，量子计算机用了 200 秒，而当时最强的经典超级计算机估计需要 10000 年。2020 年中国「九章」光量子计算机用另一种方案（玻色子采样）也展示了量子优势。这些实验证明了量子计算在特定任务上确实可以超越经典——但这些任务没有实用价值，真正的挑战是做有用的事。",
        "量子计算最大的敌人是退相干和噪声。每个物理量子比特都不断与环境耦合，信息以 ~100 μs 的时间尺度丢失。量子纠错码（特别是 surface code）通过把一个「逻辑量子比特」编码到多个物理量子比特上来对抗噪声——但这需要大量冗余。2024 年 Google 团队在 Nature 上发表了突破性成果：用 surface code（distance 5 → 7）首次实现了「逻辑错误率低于物理错误率」——编码越大，错误越少。这是量子纠错从理论走向实用的关键转折点。",
        "量子计算的技术路线仍在竞争：超导量子比特（Google、IBM）、离子阱（IonQ、Quantinuum）、光量子（Xanadu、PsiQuantum）、拓扑量子比特（Microsoft，2025 年首次实现 Majorana 零模）、中性原子（Atom Computing、QuEra）。每种方案各有优劣，目前超导和离子阱最成熟，但拓扑方案如果成功，可能用更少的物理比特实现纠错。",
        "量子计算的实际应用前景：量子化学模拟（分子基态能量、药物设计）、优化问题（组合优化、机器学习）、密码学（Shor 算法分解大数，威胁 RSA）。IBM 的路线图目标是 2029 年实现容错量子计算机（~100000 物理比特）。无论最终哪种技术路线胜出，量子计算都将是 21 世纪计算范式的一次根本性变革——从经典比特到量子比特，从确定性到概率性，从局域性到纠缠性。",
      ],
    },
  ],

  sources: [
    {
      label: "Griffiths · Introduction to Quantum Mechanics",
      url: "https://en.wikipedia.org/wiki/Introduction_to_Quantum_Mechanics_(book)",
      kind: "encyclopedia",
    },
    {
      label: "Sakurai · Modern Quantum Mechanics",
      url: "https://en.wikipedia.org/wiki/J._J._Sakurai",
      kind: "encyclopedia",
    },
    {
      label: "Feynman Lectures · Vol III (Quantum)",
      url: "https://www.feynmanlectures.caltech.edu/III_toc.html",
      kind: "encyclopedia",
    },
    {
      label: "John Bell · On the EPR Paradox（论文）",
      url: "https://cds.cern.ch/record/111654",
      kind: "paper",
    },
    {
      label: "MIT 8.04 Quantum Physics I (OCW)",
      url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
      kind: "encyclopedia",
    },
    {
      label: "Feynman 1948 — Space-Time Approach to Non-Relativistic QM",
      url: "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.20.367",
      kind: "paper",
    },
    {
      label: "Binnig & Rohrer 1982 — Surface Studies by STM (Nobel work)",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.57",
      kind: "paper",
    },
    {
      label:
        "Aspect, Dalibard & Roger 1982 — Experimental Test of Bell's Inequalities Using Time-Varying Analyzers",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.1804",
      kind: "paper",
    },
    {
      label:
        "Nobel Prize 2022 — Aspect, Clauser, Zeilinger for experiments with entangled photons and Bell inequalities",
      url: "https://www.nobelprize.org/prizes/physics/2022/summary/",
      kind: "agency",
    },
    {
      label:
        "Hensen et al. 2015 — Loophole-free Bell inequality violation using electron spins (Nature)",
      url: "https://www.nature.com/articles/nature15759",
      kind: "paper",
    },
    {
      label:
        "Google Quantum AI 2024 — Quantum error correction below the surface code threshold (Nature)",
      url: "https://www.nature.com/articles/s41586-024-08449-y",
      kind: "paper",
    },
  ],

  markers: [
    {
      id: "schrodinger-eq",
      name: { primary: "Schrödinger 方程", latin: "Schrödinger Equation" },
      position: [0, 0, -0.6],
      description:
        "iℏ ∂ψ/∂t = Ĥψ。1926 年 Schrödinger 写下的非相对论量子力学核心方程。从此波函数有了演化规则。",
      data: [
        { label: "ℏ", value: "1.055 × 10⁻³⁴ J·s" },
        { label: "年份", value: "1926" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "uncertainty",
      name: { primary: "不确定性原理", latin: "Uncertainty Principle" },
      position: [0.7, 0, 0.2],
      description:
        "Δx · Δp ≥ ℏ/2。Heisenberg 1927 指出：互补可观测量不能同时精确测量。这不是仪器局限，是基本属性。",
      data: [
        { label: "提出", value: "Heisenberg 1927" },
        { label: "下界", value: "ℏ/2" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "double-slit",
      name: { primary: "双缝干涉", latin: "Double-slit Interference" },
      position: [-0.7, 0, 0.1],
      description:
        "「量子力学唯一的秘密」（Feynman）。单粒子穿过双缝时与自身干涉；放探测器则坍缩为粒子。",
      data: [
        { label: "首次单电子", value: "1961 (Jönsson)" },
        { label: "Feynman 评价", value: "All the mystery" },
      ],
      color: "var(--hw-gold)",
      size: 0.038,
    },
    {
      id: "bell-inequality",
      name: { primary: "Bell 不等式", latin: "Bell's Inequality" },
      position: [-0.3, 0, 0.7],
      description:
        "1964 Bell 证明：局域隐变量理论必满足某不等式，量子力学预言违反它。1980s Aspect 实验确认违反——自然非局域。",
      data: [
        { label: "提出", value: "Bell 1964" },
        { label: "实验确认", value: "Aspect 1982" },
        { label: "Nobel", value: "Aspect/Clauser/Zeilinger 2022" },
      ],
      color: "var(--hw-red)",
      size: 0.034,
    },
    {
      id: "wave-function",
      name: { primary: "波函数 ψ(x)", latin: "Wave Function" },
      position: [0.2, 0, 0.5],
      description:
        "Born 1926：|ψ|² 给出概率密度。量子态的核心载体；坍缩与演化两条规则共同决定它如何变。",
      data: [
        { label: "诠释", value: "Born 1926" },
        { label: "Hilbert 空间", value: "复数域" },
      ],
      color: "var(--hw-blue)",
      size: 0.032,
    },
    {
      id: "h-atom",
      name: { primary: "氢原子", latin: "Hydrogen Atom" },
      position: [0.5, 0, -0.4],
      description:
        "量子力学第一个完整解：1s/2s/2p/3d... 轨道，能级 E_n = −13.6/n² eV。Schrödinger 1926 用它对 Bohr 模型作精确推广，证明量子力学。",
      data: [
        { label: "Bohr 半径", value: "5.29 × 10⁻¹¹ m" },
        { label: "电离能", value: "13.606 eV" },
        { label: "互文", value: "P5 原子分子" },
      ],
      color: "var(--hw-gold)",
      size: 0.03,
    },
    {
      id: "tunneling",
      name: { primary: "量子隧穿", latin: "Quantum Tunneling" },
      position: [-0.5, 0, -0.5],
      description:
        "经典粒子翻不过的势垒，量子粒子能以指数衰减的振幅穿过。Gamow 1928 用此解释 α 衰变 (半衰期跨 26 个数量级的 Geiger-Nuttall 规律)；Binnig & Rohrer 1981 反向利用 I ∝ exp(−2κd) 做出 STM (Nobel 1986)；Josephson 1962 预言两块超导体之间的 Cooper 对相干隧穿，是 transmon 量子比特与 SQUID 的根基。同一条隧穿方程跨越 26 个数量级。",
      data: [
        { label: "α 衰变", value: "Gamow 1928" },
        { label: "STM", value: "0.1 nm → 10×" },
        { label: "应用", value: "→ P8 量子计算" },
      ],
      color: "var(--hw-red)",
      size: 0.036,
    },
    {
      id: "path-integral",
      name: { primary: "路径积分", latin: "Feynman Path Integral" },
      position: [0.45, 0, 0.6],
      description:
        "Feynman 1948 把量子力学重写成第三种形式：振幅 = ∫ 𝒟x exp(i S[x]/ℏ)，对所有可能路径求和。让 ℏ → 0，非极值路径相位震荡相消，只剩 δS = 0 的经典轨道 —— P0 的最小作用量原理在这里浮出水面。Wick 旋转 t → −iτ 又把它焊到统计力学的配分函数上，今天的格点 QCD、扩散模型都共用这条暗线。",
      data: [
        { label: "提出", value: "Feynman 1948" },
        { label: "极限", value: "ℏ → 0 给出 P0" },
        { label: "Wick", value: "→ 统计力学 P1" },
      ],
      color: "var(--hw-gold)",
      size: 0.033,
    },
  ],
  discussionQuestions: [
    "双缝实验中，观察行为本身改变了结果——「观察」在物理上到底意味着什么？需要意识吗？",
    "Bell 不等式被违反意味着自然是「非局域」的——这对你理解「现实」和「因果」有什么冲击？",
    "量子计算机在 200 秒内完成经典计算机需要 10000 年的任务——但任务本身没有实用价值。你觉得「有用」的量子优势何时到来？",
  ],
};

export default content;

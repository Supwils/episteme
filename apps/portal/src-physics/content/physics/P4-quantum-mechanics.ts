import type { TierContent } from "@/src-physics/lib/content";

/**
 * Cross-domain links for this tier (see @universe/content cross-links):
 *   → philosophy/determinism: 量子不确定性挑战经典决定论
 */

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
      label: "Bell 不等式实验",
      latinLabel: "Bell test experiments",
      value: "2022 诺贝尔奖",
      hint: "Aspect · Clauser · Zeilinger",
    },
  ],

  narrative: [
    {
      heading: "双缝实验 · 干涉与坍缩",
      body: [
        "电子一颗一颗发射穿过双缝，屏幕上慢慢出现的不是两条带子，而是干涉条纹——单粒子也在和「自己」干涉。Feynman 称这是「量子力学唯一的秘密」，里面藏着所有的怪异性。",
        "更进一步：如果你在缝旁边装探测器看它走哪条缝，干涉就消失。物理学家把这叫「波粒二象性」——但更准确的说法是：观察行为是物理过程的一部分，不是中性的旁观。这正是经典直觉最难调适的一步。",
      ],
    },
    {
      heading: "算符与本征态 · bra-ket 语言",
      body: [
        "Dirac 1930 引入 |ψ⟩（ket）和 ⟨ψ|（bra）记号，把量子态抽象成 Hilbert 空间中的向量。每一个可观测量是一个**Hermitian 算符**，测量得到的值必须是该算符的本征值，测量后系统坍缩到对应本征态。",
        "Schrödinger picture 让态随时间演化；Heisenberg picture 让算符演化、态固定；相互作用 picture 各取一半。三套等价描述背后是同一个物理。学好这三套切换，是从「会算量子题」到「懂量子力学」的分水岭。",
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
      heading: "量子纠缠 · 鬼魅般的超距作用",
      body: [
        "1935 年 Einstein、Podolsky、Rosen 联名发表了一篇试图「杀死」量子力学的论文——EPR 佯谬。他们的逻辑是：如果两个粒子处于纠缠态，测量其中一个就能瞬间确定另一个的状态，无论它们相距多远。爱因斯坦称之为「鬼魅般的超距作用 (spooky action at a distance)」，认为这说明量子力学缺少某些「隐变量」，是不完备的理论。",
        "1964 年 John Bell 用一个简洁的不等式终结了这场争论：任何满足局域实在性的隐变量理论都会遵守一组统计上限，而量子力学预言会突破它。从 1982 年 Aspect 的首次实验到 2015 年的无漏洞 Bell 测试（同时关闭局域性和探测效率两个漏洞），每一次实验都站在量子力学一边——大自然真的存在非局域关联。2022 年 Nobel 物理学奖颁给了 Aspect、Clauser 和 Zeilinger，表彰他们用实验「纠缠住了」这场持续近一个世纪的哲学论战。",
        "纠缠已经从哲学好奇变成了技术资源。量子隐形传态 (quantum teleportation) 1997 年由 Zeilinger 团队首次实现：用一对纠缠光子和经典通信，把一个量子态从 A 传到 B，而量子态本身从未经过 A-B 之间的路径。量子密钥分发 (QKD) 利用纠缠保证通信的绝对安全——任何窃听都会破坏纠缠关联而被发现。量子计算机的核心操作——CNOT 门、纠缠门——本质上就是在制造和操控多比特纠缠态。今天 Google、IBM、中国的「九章」团队正在把数十到数百个量子比特纠缠在一起，走向量子纠错和实用量子优势。Einstein 最不愿接受的那个「鬼魅」，正在成为下一代技术革命的引擎。",
      ],
    },
    {
      heading: "退相干 · 量子→经典桥",
      body: [
        "为什么宏观物体不显量子？因为它与环境（空气分子、热辐射）发生 ~10⁻²⁰ 秒级的退相干。环境像无数个微观「测量装置」，把宏观系统的相干性快速洗掉。",
        "Zurek 和 Joos 等人 1980s 起把这套机制写成数学：密度矩阵在 pointer basis 上对角化的速率正比于环境耦合强度。这条思路是当代理解量子-经典边界的主流。",
        "1935 年 Schrödinger 提出了他那只著名的思想实验猫：把一只猫关在箱子里，里面有一个放射性原子、一个盖革计数器和一瓶毒气。如果原子衰变（量子事件，概率 50%），计数器触发打碎毒瓶，猫死；如果不衰变，猫活。按照量子力学的规则，打开箱子之前，原子处于「衰变 + 未衰变」的叠加态，那猫也应该处于「死 + 活」的叠加态——这显然是荒谬的。Schrödinger 设计这个实验不是为了支持量子力学，而是为了暴露它的荒谬：微观量子规则推广到宏观世界时会产生悖论。答案是退相干：猫与周围环境（空气分子、热辐射、猫自己的身体）的相互作用在 ~10⁻²⁰ 秒内就把叠加态洗成了经典的「非死即活」。薛定谔猫从不是一个真实实验，而是量子与经典之间那道边界最生动的思想标记。",
      ],
    },
    {
      heading: "路径积分 · 对所有可能性求和",
      body: [
        "Feynman 1948 把量子力学重写成第三种形式：粒子从 a 到 b 的振幅是对**所有**可能的经典路径 x(t) 求积分 K(b, a) = ∫ 𝒟x exp(i S[x] / ℏ)，其中 S = ∫ L dt 正是 P0 的作用量。让 ℏ → 0，非极值路径之间的相位剧烈震荡相消，只剩下 δS = 0 的经典轨道——最小作用量原理在这里浮出水面，作为「相位驻定点」的几何后果。",
        "这套语言把 P0 → P4 → P7 焊成一条暗线：量子场论的生成泛函 Z = ∫ 𝒟φ e^(iS[φ]/ℏ) 是它的场论版；统计力学的配分函数 Z = ∫ 𝒟φ e^(−S_E[φ]/ℏ) 只差一个 Wick 旋转 t → −iτ。今天的格点 QCD、量子蒙特卡洛、机器学习里的扩散模型与 score matching，背后都是同一条「对历史求和」。",
      ],
    },
    {
      heading: "Bell 不等式实验 · 判决非局域性的四十年",
      body: [
        "1982 年 Alain Aspect 在巴黎光学研究所完成了里程碑式的实验：用钙原子级联辐射产生纠缠光子对，以极快的声光开关随机切换测量基矢方向，验证了 CHSH 不等式被违反 5 个标准差 (Physical Review Letters 49, 91)。这个实验首次在几乎同时关闭「局域性漏洞」——测量选择与光子飞行方向的空间分离确保了信息不能以光速以下的速度在两个测量站之间传递。在此之前，John Clauser 1972 年的首次 Bell 测试 (用钙-40 源) 已经观察到违反，但仍留有局域性漏洞；Aspect 的实验把这一漏洞大幅收窄。这些工作奠定了量子信息科学的实验基础，三位先驱——Clauser、Aspect、Zeilinger——因此共享 2022 年 Nobel 物理学奖。",
        "Bell 测试并未止步于实验室。2017 年中国「墨子号」量子科学实验卫星实现了 1200 公里级别的星地纠缠分发 (Ji-Gang Ren et al., Nature 549, 70, 2017)，把纠缠光子对从太空送到地面两个相距超过 1000 公里的接收站，以超过 12σ 的置信度违反了 CHSH 不等式——在前所未有的距离上排除了局域性漏洞。结合此前 2015 年的三组「无漏洞」Bell 测试 (Delft、Vienna、NIST) 同时关闭局域性和探测效率两大漏洞，量子力学的非局域性预言已在所有可想象的实验条件下得到验证。纠缠不再是哲学争论，而是被精确工程化的物理资源——它支撑着量子密钥分发的安全性证明、量子隐形传态的协议正确性、以及未来量子互联网的全部架构。",
      ],
    },
    {
      heading: "量子计算 · 从叠加态到计算革命",
      body: [
        "经典计算机的比特只能是 0 或 1，而量子比特 (qubit) 可以处于 |0⟩ 和 |1⟩ 的叠加态 α|0⟩ + β|1⟩，其中 |α|² + |β|² = 1。n 个量子比特能同时表示 2ⁿ 个状态的叠加——这就是量子并行性的来源。但真正的威力来自纠缠：当多个 qubit 纠缠在一起时，对其中一个的操作会瞬间影响所有纠缠伙伴，使得量子算法能在指数大的状态空间中找到巧妙的捷径。Shor 1994 年证明量子计算机可以在多项式时间内分解大整数（经典计算机需要指数时间），直接威胁 RSA 加密体系；Grover 1996 年给出无序搜索的平方根加速。",
        "实现量子计算的最大障碍是退相干——环境噪声在 ~10⁻²⁰ 秒内就会破坏脆弱的量子叠加态。量子纠错 (surface code、color code) 用冗余编码保护信息，但代价是需要上千个物理量子比特来编码一个逻辑量子比特。截至 2025 年，Google Willow (105 qubits, 2024) 首次实验证明了增加量子比特数反而能降低错误率的「低于阈值」里程碑；IBM Condor 达到 1121 qubits 但纠错能力有限。实用量子优势——即解决一个有商业价值的问题且超越经典超级计算机——仍是尚未攻克的目标，但量子模拟（用可控量子系统模拟其他量子系统，如分子基态能量、材料相变）被认为是最可能率先突破的方向。",
      ],
    },
    {
      heading: "量子隧穿 · α 衰变到 STM 显微镜",
      body: [
        "经典粒子翻不过的势垒，量子粒子能以指数衰减的振幅穿过。Gamow 1928 用这条原理解释了 α 衰变：核内 α 粒子隧穿 Coulomb 势垒的概率 ~ e^(−G)，G 正比于 Z/√E，给出半衰期跨 26 个数量级的 Geiger-Nuttall 规律；今天 ²³⁵U 4.5 Gyr 的寿命与一颗 ²¹²Po 的 0.3 μs 共用同一条公式。",
        "工程上的反向利用更精彩。Binnig & Rohrer 1981 让一根 W 针尖逼近样品表面到 ~ 0.5 nm，加几个伏特偏压，电子隧穿电流 I ∝ exp(−2κd)，d 每变 0.1 nm 电流变 10 倍——扫描隧道显微镜 (STM) 由此第一次「看见」单个原子（Nobel 1986）。Josephson 1962 预言两块超导体之间也存在 Cooper 对的相干隧穿，I = I_c sin(Δφ)，今天的超导量子比特 (transmon) 与 SQUID 磁强计全部基于这个效应。同一条隧穿方程从地壳放射性年代学走到 IBM/Google 的量子芯片，跨度 26 个数量级。",
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
      label: "Aspect et al. 1982 — Bell inequality violation (PRL 49, 91)",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.91",
      kind: "paper",
    },
    {
      label: "Ren et al. 2017 — Ground-to-satellite entanglement (Nature 549, 70)",
      url: "https://www.nature.com/articles/nature23675",
      kind: "paper",
    },
    {
      label: "Nobel Prize 2022 — Aspect, Clauser, Zeilinger",
      url: "https://www.nobelprize.org/prizes/physics/2022/",
      kind: "agency",
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
};

export default content;

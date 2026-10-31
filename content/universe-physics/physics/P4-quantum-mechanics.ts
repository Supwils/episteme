import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P4",
  name: { primary: "量子力学", latin: "Quantum Mechanics" },
  tagline: "振幅相加，概率显现",
  whisper: "一次探测留下一个落点，许多次探测显出波的结构。",

  dataCards: [
    {
      label: "约化普朗克常数",
      latinLabel: "ℏ",
      value: "≈ 1.054 571 817 × 10⁻³⁴",
      hint: "J · s · ℏ = h / 2π",
    },
    {
      label: "普朗克常数",
      latinLabel: "h",
      value: "6.626 070 15 × 10⁻³⁴",
      hint: "J · s（精确定义）",
    },
    {
      label: "Schrödinger 方程",
      value: "iℏ ∂ψ/∂t = Ĥψ",
      hint: "波函数的演化",
    },
    {
      label: "Heisenberg 不确定性",
      value: "Δx · Δp ≥ ℏ / 2",
      hint: "同一制备态的位置与动量标准差",
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
      value: "ρ(x) = |ψ(x)|²",
      hint: "归一化位置波函数的概率密度；区域概率须积分",
    },
    {
      label: "精细结构常数",
      latinLabel: "α",
      value: "1 / 137.036",
      hint: "无量纲；电磁耦合强度",
    },
    {
      label: "路径积分",
      value: "K(b,a) = ∫𝒟x exp(iS/ℏ)",
      hint: "Feynman 1948 · 对所有路径求和",
    },
    {
      label: "自旋 1/2 算符",
      latinLabel: "σᵢ",
      value: "Sᵢ = ℏσᵢ / 2",
      hint: "σᵢ / 2 为 SU(2) 生成元",
    },
    {
      label: "STM 隧穿衰减",
      value: "I ∝ exp(−2κd)",
      hint: "κ ≈ √(2mφ)/ℏ · 简化势垒、低偏压近似",
    },
    {
      label: "无漏洞 Bell 测试 S 值",
      value: "S = 2.42 ± 0.20",
      hint: "Hensen 2015 · 245 次试验 · 检验 p ≤ 0.039",
    },
    {
      label: "Sycamore 采样基准",
      value: "53 个量子比特",
      hint: "2019 · 特定随机电路采样任务",
    },
    {
      label: "表面码错误抑制",
      value: "Λ = 2.14 ± 0.02",
      hint: "2024 年在线发表 · 码距每增加 2 的抑制因子",
    },
  ],

  narrative: [
    {
      heading: "双缝实验 · 落点与概率振幅",
      body: [
        "在相干单粒子实验中，每次探测留下一个局部事件，许多次相同制备才显出干涉分布。两路都开放时，先相加的是振幅：P ∝ |ψ₁ + ψ₂|²，其中包含交叉项。只把两种单缝分布相加，通常得不到这个结果。",
        "若路径与完全可区分的探测器或环境记录关联，不区分记录的屏幕分布中交叉项消失。这里改变的是物理关联和可获取的路径信息，人的意识或事后有没有读记录并不决定干涉。部分可区分的路径还可以保留部分条纹。",
      ],
    },
    {
      heading: "算符与本征态 · bra-ket 语言",
      body: [
        "Dirac 在 1939 年的专文中引入 bra 与 ket 记号。归一化的 |ψ⟩ 表示纯态，⟨φ|ψ⟩ 给出相应投影的概率振幅。可观测量由自伴算符描述；在离散谱的理想投影测量中，结果是本征值，测量后的态投影到对应本征子空间。连续谱、混态和一般测量还需要更完整的表述。",
        "Schrödinger 绘景把时间演化放在态上，Heisenberg 绘景把演化放在算符上。相互作用绘景先把 Hamiltonian 分成两部分，再分配两种演化；三个绘景给出相同的可观测预言，分配并不是各取一半。",
      ],
    },
    {
      heading: "测量与纠缠 · EPR 与 Bell 不等式",
      body: [
        "EPR 在 1935 年用局域性与实在性判据论证量子描述不完备。Bell 在 1964 年把相关假设转为可检验的限制：满足局域因子分解、测量设置与隐藏变量统计独立等条件的模型，要遵守相应 Bell 不等式。量子理论则预言某些纠缠态和测量组合会违反这些限制。",
        "违反 Bell 不等式揭示了经典局域模型的局限，不能据此通过纠缠传递可控的超光速消息。量子隐形传态仍需经典通信；纠缠也成为计算、通信和精密测量中可控制的资源。",
      ],
    },
    {
      heading: "退相干 · 干涉为何难以维持",
      body: [
        "系统与空气、光子或其他自由度相互作用后，相位关系会进入系统与环境的关联。只看系统的约化密度矩阵，一些基底中的非对角项受到抑制，干涉因而难以观察。退相干时间取决于系统尺寸、态的分离程度、耦合和环境谱，没有适用于所有宏观物体的统一秒数。",
        "环境诱导的稳定基底帮助解释经典记录如何出现，但退相干本身没有从整体叠加态中选出唯一测量结果。它澄清了量子到经典的部分机制，测量问题的其余部分仍与量子理论的诠释相联系。",
      ],
    },
    {
      heading: "路径积分 · 对路径叠加振幅",
      body: [
        "Feynman 1948 年系统阐述路径积分：从 a 到 b 的传播振幅可写成 K(b,a) = ∫𝒟x exp(iS[x]/ℏ)。积分包括不满足经典运动方程的路径。作用量相对 ℏ 很大、且驻相近似适用时，邻近路径的相位相消使驻定作用量的轨道成为重要贡献；δS = 0 不保证作用量一定最小。",
        "在合适条件下，虚时间路径积分还可表示量子统计的配分函数 Tr exp(−βĤ)，虚时间区间长度为 βℏ，边界条件随统计类型变化。这把量子动力学和统计方法连接起来；实时间振荡权重与虚时间统计权重的差别，也是计算时必须面对的问题。",
      ],
    },
    {
      heading: "量子隧穿 · 从核衰变到表面成像",
      body: [
        "低于势垒的量子态在势垒内部仍可有衰减的振幅，并在有限厚度势垒另一侧出现透射。1928 年 Gamow 以及 Gurney、Condon 分别用隧穿解释 α 衰变。不同核素的势垒和衰变能可带来很大的半衰期差异；²³⁵U 的半衰期约 7.04 亿年，约 44.7 亿年的是 ²³⁸U。核结构和 α 团簇形成概率也影响定量计算。",
        "扫描隧道显微镜利用针尖与导电样品间的隧穿电流。简化势垒模型中 I ∝ exp(−2κd)，κ 依赖有效势垒高度，因此距离变化对应的电流倍数不是普适常数。Binnig、Rohrer 团队于 1981 年发展 STM，1982 年发表早期表面研究，1983 年报告 Si(111) 的 7 × 7 重构实空间图像。图像反映表面形貌与电子态密度的共同作用。超导 Josephson 结则利用相干的 Cooper 对输运，成为 SQUID 和 transmon 等器件的重要元件。",
      ],
    },
    {
      heading: "无漏洞 Bell 测试 · 怎样收紧实验条件",
      body: [
        "Freedman 与 Clauser 在 1972 年、Aspect 团队在 1982 年的实验推进了 Bell 检验。2015 年 Hensen 等人用相距约 1.3 千米的金刚石电子自旋，在同一实验中处理探测效率与局域性漏洞：245 次试验得到 S = 2.42 ± 0.20，原文的局域模型零假设检验给出 p ≤ 0.039。这里的无漏洞针对主要实验漏洞，仍以明确的测量独立性等前提为基础。",
        "2022 年物理学 Nobel 奖表彰了 Aspect、Clauser、Zeilinger 对纠缠实验和量子信息的贡献。Bell 违反可用于设备无关的随机数和密钥协议；普通 BB84 等密钥分发方案也有其他安全证明，不能把所有 QKD 的安全性都归结为直接观察 Bell 违反。",
      ],
    },
    {
      heading: "量子计算 · 比较什么，纠正什么",
      body: [
        "Google 的 2019 年 Sycamore 实验在 53 个量子比特上执行特定随机电路采样。200 秒对约一万年的比较，后一个数是团队当时对经典算法的估计；同年的 IBM 团队已提出按天计的替代模拟方案。基准必须同时说明任务、精度、硬件和经典算法版本，才能讨论计算优势，不能外推为所有任务都加速。",
        "2024 年 12 月在线发表、编入 Nature 2025 年卷期的 Willow 表面码研究，比较了码距 3、5、7 的量子存储器。码距每增加 2，逻辑错误率约降低 Λ = 2.14 ± 0.02 倍；101 个物理比特的码距 7 存储器，每纠错周期错误率为 (0.143 ± 0.003)%。其逻辑存储寿命也超过构成它的最佳物理比特。达到这一存储指标是进展，完整的通用容错计算仍需要可靠的逻辑门、解码与规模扩展。",
      ],
    },
  ],

  sources: [
    {
      label: "BIPM · SI 定义常数（h 的精确值）",
      url: "https://www.bipm.org/en/measurement-units/si-defining-constants",
      kind: "agency",
    },
    {
      label: "Feynman 讲义 III.1 · 单次探测、振幅叠加与路径记录",
      url: "https://www.feynmanlectures.caltech.edu/III_01.html",
      kind: "agency",
    },
    {
      label: "Dirac 1939 · A New Notation for Quantum Mechanics",
      url: "https://doi.org/10.1017/S0305004100021162",
      kind: "paper",
    },
    {
      label: "Bell 1964 · On the Einstein–Podolsky–Rosen Paradox",
      url: "https://cds.cern.ch/record/111654",
      kind: "paper",
    },
    {
      label: "Schlosshauer · Decoherence, the Measurement Problem, and Interpretations",
      url: "https://arxiv.org/abs/quant-ph/0312059",
      kind: "paper",
    },
    {
      label: "Feynman 1948 · Space-Time Approach to Non-Relativistic Quantum Mechanics",
      url: "https://doi.org/10.1103/RevModPhys.20.367",
      kind: "paper",
    },
    {
      label: "NIST 2017 · SRM 4321d（Table 1：铀同位素半衰期）",
      url: "https://doi.org/10.6028/jres.122.044",
      kind: "agency",
    },
    {
      label: "Gurney & Condon 1928 · Wave Mechanics and Radioactive Disintegration",
      url: "https://doi.org/10.1038/122439a0",
      kind: "paper",
    },
    {
      label: "Nobel 委员会 2022 · 纠缠与 Bell 实验的科学背景",
      url: "https://www.nobelprize.org/uploads/2026/05/advanced-physicsprize-2022-5.pdf",
      kind: "agency",
    },
    {
      label: "Binnig et al. 1982 · Surface Studies by Scanning Tunneling Microscopy",
      url: "https://doi.org/10.1103/PhysRevLett.49.57",
      kind: "paper",
    },
    {
      label: "Binnig et al. 1983 · Si(111) 7 × 7 Reconstruction Resolved in Real Space",
      url: "https://doi.org/10.1103/PhysRevLett.50.120",
      kind: "paper",
    },
    {
      label: "Hensen et al. 2015 · Loophole-free Bell Inequality Violation",
      url: "https://doi.org/10.1038/nature15759",
      kind: "paper",
    },
    {
      label: "Arute et al. 2019 · Quantum Supremacy Using a Programmable Superconducting Processor",
      url: "https://doi.org/10.1038/s41586-019-1666-5",
      kind: "paper",
    },
    {
      label: "Pednault et al. 2019 · Classical Simulation Using Secondary Storage",
      url: "https://arxiv.org/abs/1910.09534",
      kind: "paper",
    },
    {
      label:
        "Google Quantum AI · Quantum Error Correction Below the Surface Code Threshold（2024 在线 / 2025 卷期）",
      url: "https://doi.org/10.1038/s41586-024-08449-y",
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
        "Δx · Δp ≥ ℏ/2，Δ 是同一制备态的测量分布标准差。这种制备不确定关系不同于泛指一次测量的误差与扰动。",
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
        "相干两路的振幅相加，单次落点累积出干涉分布。完全可区分的路径记录消除屏幕分布中的交叉项；不由意识决定。",
      data: [
        { label: "相干分布", value: "|ψ₁ + ψ₂|²" },
        { label: "可区分路径", value: "|ψ₁|² + |ψ₂|²" },
      ],
      color: "var(--hw-gold)",
      size: 0.038,
    },
    {
      id: "bell-inequality",
      name: { primary: "Bell 不等式", latin: "Bell's Inequality" },
      position: [-0.3, 0, 0.7],
      description:
        "在局域性、测量设置独立等条件下，经典隐藏变量模型满足相应不等式。纠缠实验违反其限制，同时仍不能传递超光速消息。",
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
        "归一化位置波函数的模平方是概率密度；区域概率由积分得到。纯态还可用基底无关的 ket 表示，混态需密度算符。",
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
        "非相对论 Coulomb 模型给出离散轨道与近似能级 E_n ≈ −13.6/n² eV；有限核质量、相对论和辐射修正会进一步改变能级。",
      data: [
        { label: "Bohr 半径", value: "5.29 × 10⁻¹¹ m" },
        { label: "氢电离能", value: "约 13.598 eV" },
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
        "有限势垒下的透射振幅帮助解释 α 衰变和 STM 隧穿电流。电流随针尖距离指数变化的速率依赖有效势垒；Josephson 结利用超导相干输运。",
      data: [
        { label: "α 衰变解释", value: "1928" },
        { label: "STM", value: "I ∝ exp(−2κd)" },
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
        "振幅以 exp(iS/ℏ) 为权重对路径叠加。驻相近似适用时，δS = 0 的经典轨道给出重要贡献；虚时间形式还联系量子统计。",
      data: [
        { label: "提出", value: "Feynman 1948" },
        { label: "半经典", value: "驻定作用量 → P0" },
        { label: "Wick", value: "→ 统计力学 P1" },
      ],
      color: "var(--hw-gold)",
      size: 0.033,
    },
  ],
};

export default content;

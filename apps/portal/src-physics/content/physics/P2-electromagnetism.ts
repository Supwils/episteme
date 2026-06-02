import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "P2",
  name: { primary: "电磁与光", latin: "Electromagnetism & Optics" },
  tagline: "看不见的力，照亮的世界",
  whisper: "Maxwell 的四行方程把电、磁、光合一——把宇宙的速度上限刻进了真空本身。",
  dataCards: [
    { label: "真空光速", latinLabel: "c", value: "299 792 458", hint: "m / s（精确定义）" },
    { label: "真空介电常数", latinLabel: "ε₀", value: "8.854 × 10⁻¹²", hint: "F / m" },
    { label: "真空磁导率", latinLabel: "μ₀", value: "1.257 × 10⁻⁶", hint: "H / m" },
    { label: "基本电荷", latinLabel: "e", value: "1.602 × 10⁻¹⁹", hint: "C" },
    { label: "Maxwell 方程", value: "4", hint: "微分 / 积分 / 张量等价" },
    { label: "电子静质能", latinLabel: "mₑ c²", value: "0.511", hint: "MeV" },
    { label: "精细结构常数", latinLabel: "α", value: "≈ 1 / 137.036", hint: "无量纲" },
    { label: "可见光波长", latinLabel: "λ", value: "380–780", hint: "nm" },
    {
      label: "电磁场张量",
      latinLabel: "F^μν",
      value: "∂^μ A^ν − ∂^ν A^μ",
      hint: "Maxwell 协变形式 · Lorentz 不变",
    },
    {
      label: "Poynting 矢量",
      latinLabel: "S",
      value: "E × B / μ₀",
      hint: "W / m² · 电磁能流密度",
    },
    {
      label: "Bohr 磁子",
      latinLabel: "μ_B",
      value: "9.274 010 × 10⁻²⁴",
      hint: "J / T · 电子自旋磁矩量级",
    },
    {
      label: "经典电子半径",
      latinLabel: "r_e",
      value: "2.817 940 × 10⁻¹⁵",
      hint: "m · α² a₀",
    },
  ],
  narrative: [
    {
      heading: "直觉 · Coulomb 与 Ampère",
      body: [
        "静电场围着电荷向外辐射，按 1/r² 衰减；磁场围着电流绕圈，按 1/r 衰减。前者是 Coulomb 1785 年发现的，后者是 Ampère 1820 年量化的。",
        "Faraday 在 1831 年观察到：变化的磁通会感生电流——电与磁不再是两件事，而是同一张「场」的两面。",
        "Maxwell 的四行方程就像一首四行诗，把电、磁、光用一个速度 c 统一在一起。在 Maxwell 之前，人类分别研究了静电（琥珀摩擦吸引碎屑）、静磁（指南针指向北方）、光（棱镜分出彩虹）三种看似不同的现象。1865 年那四行方程揭示它们是同一种基本实体——电磁场——的四种表现。这个统一是物理学的美学范例：最深刻的真理往往看起来最简洁。",
      ],
    },
    {
      heading: "学院 · Maxwell 四方程",
      body: [
        "Gauss·E：电场的源是电荷；Gauss·B：磁单极不存在；Faraday：变化的 B 生 E；Ampère-Maxwell：电流与变化的 E 生 B。",
        "把 Maxwell 的位移电流 ∂E/∂t 加进 Ampère 之后，方程组在真空里允许一个自维持的横波解，速度 c = 1/√(μ₀ε₀)——这正是当时已知的光速。",
        "矢势 A 与标势 φ 是更深一层的描述：可观测的 E、B 在规范变换 A → A + ∇χ、φ → φ − ∂χ/∂t 下不变。规范不变性后来直接孕育出 Yang-Mills 与标准模型。",
      ],
    },
    {
      heading: "前沿 · 等离子体 · 非线性光学 · QED",
      body: [
        "宇宙中 99% 的可见物质是等离子体（带电气体），太阳风、聚变堆、加速器都靠 Vlasov-Maxwell 框架描述。",
        "强激光与物质相互作用进入非线性光学：倍频、参量放大、自聚焦——这是 Nobel 2018（chirped pulse amplification）的舞台。",
        "把光量子化后得到量子电动力学（QED），精细结构常数 α 是它的耦合常数；Lamb shift 与 anomalous magnetic moment 是 20 世纪精度最高的预言。",
      ],
    },
    {
      heading: "光与物质 · 折射率到 metamaterial",
      body: [
        "光在物质中的速度由介电常数 ε(ω) 和磁导率 μ(ω) 决定，折射率 n = √(εμ)。介电响应又分极化（束缚电荷）、电导（自由电荷）、磁化（自旋）三个通道，所有「颜色」、「透明 vs 反光」、「金属光泽」都由这三个通道的频率依赖性决定。",
        "把 ε、μ 同时设计为负（在工程频段内）就得到「左手材料」/ metamaterial —— 群速度与相速度反向，是 Veselago 1968 想象的奇异介质。2000 年代 Pendry / Smith 把它做了出来；今天它催生了「隐身斗篷」、超分辨成像、可重构天线阵列，都是经典 EM 在工程层面的当代延伸。",
      ],
    },
    {
      heading: "电磁波谱 · 天文学的多信使窗口",
      body: [
        "电磁波谱从最长的射电波（米级波长）到最短的伽马射线（皮米级），跨越约 15 个数量级的频率范围。每一个波段都打开了一扇独特的天文窗口：射电波穿透尘埃揭示冷气体与脉冲星；红外辐射追踪恒星摇篮中的原行星盘；可见光呈现恒星表面与星系形态；紫外锁定热年轻恒星；X 射线窥探黑洞吸积盘与超新星遗迹中的百万度等离子体；伽马射线则来自宇宙中最剧烈的爆发事件。没有哪一个波段能讲述完整的故事——多波段联合观测是现代天体物理学的基本方法论。",
        "Maxwell 的伟大统一在这里找到了最直接的应用：天文学家用来观测宇宙的几乎每一个工具——从 Arecibo 射电望远镜到 JWST 红外相机，从 Chandra X 射线天文台到 Fermi 伽马射线卫星——本质上都是在收集电磁波谱不同波段的光子。2017 年 GW170817 双中子星并合事件中，全球 70 多台望远镜从射电到伽马射线同时跟踪了这场宇宙烟火——这是「多信使天文学」的里程碑，也是电磁波谱全景式应用于天文学的巅峰时刻。",
      ],
    },
    {
      heading: "协变形式 · 一行写完 Maxwell",
      body: [
        "把 E 和 B 装进同一个反对称四张量 F^μν = ∂^μ A^ν − ∂^ν A^μ，Maxwell 四方程立刻塌缩成两行：∂_μ F^μν = μ₀ J^ν 给出 Gauss 与 Ampère-Maxwell，∂_[α F_βγ] = 0 自动给出 Gauss·B 与 Faraday。E、B 之间的「互换」不再是巧合——它就是在不同惯性系下看同一个 F^μν 的不同时空切片，从而 P3 的相对论是 P2 的不可避免后果。",
        "更深一层的是矢势 A^μ 本身：Aharonov-Bohm 1959 提出，把电子分到一段被磁通管挡住的双狭缝里，即使电子从未进入 B ≠ 0 区域，干涉条纹仍随磁通 Φ 周期性偏移 ΔΦ = h/e。这条实验（Tonomura 1986 用相干电子显微镜确认）说明 A 本身是物理实在的载体，而非可有可无的数学辅助——这是规范场论 (P7) 整个上层建筑的本体论起点。",
      ],
    },
    {
      heading: "辐射与等离子体 · 偶极、四极、Alfvén",
      body: [
        "Larmor 公式 P = q² a² / (6π ε₀ c³) 告诉我们：电磁辐射的最低阶是偶极。引力波 (P3) 不存在偶极辐射，必须四极起步——这是「单极禁戒于电荷守恒，偶极禁戒于动量守恒」的几何后果。LIGO 一次事件辐射的能量可相当于数个太阳的静质能，但因为只能走四极通道，振幅仍然只有 h ~ 10⁻²¹。",
        "宇宙 99% 的可见物质是等离子体，集体行为远比单粒子动力学奇异。三大模式：Langmuir 振荡（频率 ω_p = √(n_e e² / m_e ε₀)，电子的简谐回声）、离子声波（电子做屏蔽，慢的离子被压缩传声）、Alfvén 波（沿磁力线滑行的横波，v_A = B / √(μ₀ ρ)）。从太阳风、磁层亚暴到托卡马克 ITER 的湍流抑制，工程师天天和这三种波打交道。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "Griffiths《Introduction to Electrodynamics》是本科金标准；Jackson《Classical Electrodynamics》是研究生圣经；Feynman Lectures Vol II 给出最优雅的物理直觉；Born & Wolf《Principles of Optics》给最完整的光学版本。",
      ],
    },
  ],
  sources: [
    {
      label: "MIT 8.02 Physics II Electricity & Magnetism (OCW)",
      url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/",
      kind: "encyclopedia",
    },
    {
      label: "Wikipedia · Maxwell's equations",
      url: "https://en.wikipedia.org/wiki/Maxwell%27s_equations",
      kind: "encyclopedia",
    },
    {
      label: "Feynman Lectures Vol II",
      url: "https://www.feynmanlectures.caltech.edu/II_toc.html",
      kind: "encyclopedia",
    },
    {
      label: "Aharonov & Bohm 1959 — Significance of EM potentials in QM",
      url: "https://journals.aps.org/pr/abstract/10.1103/PhysRev.115.485",
      kind: "paper",
    },
    {
      label: "NIST CODATA · Fundamental physical constants",
      url: "https://physics.nist.gov/cuu/Constants/",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "maxwell-equations",
      name: { primary: "Maxwell 方程组", latin: "Maxwell's Equations" },
      position: [0, 0, 0],
      description:
        "四个 PDE 把电、磁、光合一。位移电流 ∂E/∂t 是 Maxwell 自己加的修正，正是这个修正让真空里出现了光速。",
      data: [
        { label: "年份", value: "1865" },
        { label: "方程数", value: "4" },
        { label: "互文", value: "P3 相对论 · 协变形式" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "coulomb-law",
      name: { primary: "Coulomb 定律", latin: "Coulomb's Law" },
      position: [-0.6, 0, -0.2],
      description: "F = k q₁q₂/r²。与万有引力同形——平方反比律在自然界反复出现。",
      data: [
        { label: "k", value: "8.99 × 10⁹ N·m²/C²" },
        { label: "年份", value: "1785" },
      ],
      color: "var(--hw-red)",
      size: 0.03,
    },
    {
      id: "faraday-induction",
      name: { primary: "Faraday 电磁感应", latin: "Faraday Induction" },
      position: [0.5, 0, -0.4],
      description:
        "ε = −dΦ/dt。变化的磁通激发电场。发电机、变压器、感应充电——现代电力工业全建立在这一行公式上。",
      data: [
        { label: "年份", value: "1831" },
        { label: "互文", value: "applied · 电网与无线充电" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "lorentz-force",
      name: { primary: "Lorentz 力", latin: "Lorentz Force" },
      position: [0.3, 0, 0.5],
      description: "F = q(E + v × B)。把粒子动力学嵌入电磁场——是粒子加速器与回旋共振的基础。",
      data: [
        { label: "形式", value: "向量积" },
        { label: "互文", value: "P6 粒子物理 · 加速器" },
      ],
      color: "var(--hw-gold)",
      size: 0.03,
    },
    {
      id: "gauge-symmetry",
      name: { primary: "规范不变", latin: "Gauge Invariance" },
      position: [-0.5, 0, 0.5],
      description:
        "A → A + ∇χ 不改变物理。这条对称性后来推广为 Yang-Mills 规范场论，是标准模型的骨架。",
      data: [
        { label: "对称", value: "U(1) 局部" },
        { label: "互文", value: "P7 标准模型 · SU(3)×SU(2)×U(1)" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "qed",
      name: { primary: "量子电动力学", latin: "Quantum Electrodynamics" },
      position: [0.7, 0, 0.1],
      description:
        "把光场量子化得到 QED。精细结构常数 α ≈ 1/137 是它的耦合强度；电子反常磁矩理论与实验吻合到 12 位有效数字。",
      data: [
        { label: "α", value: "1 / 137.036" },
        { label: "Feynman / Tomonaga / Schwinger", value: "Nobel 1965" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
  ],
};

export default content;

import type { TierContent } from "@/lib/content";

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
    {
      label: "地球磁场强度",
      value: "25 – 65",
      hint: "μT · 地表 · 偶极场近似",
    },
    {
      label: "电磁波谱范围",
      value: "10⁻¹² – 10⁴",
      hint: "m · 从 γ 射线到极低频无线电",
    },
    {
      label: "超导体最高 T_c（常压）",
      value: "≈ 133 K",
      hint: "HgBa₂Ca₂Cu₃O₈ · 铜氧化物 · 1993",
    },
    {
      label: "超导体最高 T_c（高压）",
      value: "≈ 288 K (15°C)",
      hint: "LaH₁₀ · 170 GPa · 2019 · 接近室温",
    },
    {
      label: "负折射率 metamaterial",
      value: "ε < 0, μ < 0",
      hint: "Veselago 1968 预言 · Smith 2000 实现",
    },
  ],
  narrative: [
    {
      heading: "直觉 · Coulomb 与 Ampère",
      body: [
        "静电场围着电荷向外辐射，按 1/r² 衰减；磁场围着电流绕圈，按 1/r 衰减。前者是 Coulomb 1785 年发现的，后者是 Ampère 1820 年量化的。",
        "Faraday 在 1831 年观察到：变化的磁通会感生电流——电与磁不再是两件事，而是同一张「场」的两面。这条电磁感应定律是发电机、变压器、无线充电的物理基础；现代文明的电力基础设施本质上就是大规模操控 Faraday 定律。",
        "地球本身就是一个巨大的磁偶极子，表面磁场约 25–65 μT，由外核液态铁的对流运动（地磁发电机）产生。地磁场偏转太阳风中的带电粒子，保护大气层不被剥离——没有它，地球表面的辐射剂量将致命。地磁北极每隔几十万年翻转一次，翻转期间磁场减弱，宇宙射线直达地表。",
        "电磁波谱从 γ 射线（λ ~ 10⁻¹² m）一直延伸到极低频无线电（λ ~ 10⁴ m），跨越 16 个数量级。可见光只是其中一个极窄的窗口（380–780 nm）。每一段波长对应不同的物理机制和工程应用：X 射线透视人体、微波加热食物、红外遥控电视、紫外线杀菌——全是同一组 Maxwell 方程在不同频率下的表现。",
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
        "色散关系 n(ω) 决定了棱镜分光、光纤中的脉冲展布、大气中的彩虹。正常色散（dn/dω > 0）让蓝光比红光折射更多；反常色散（dn/dω < 0）出现在吸收线附近，对应介质对特定频率的强烈响应。牛顿用棱镜把白光分成七色——但他不知道颜色的本质是电磁波频率。",
        "把 ε、μ 同时设计为负（在工程频段内）就得到「左手材料」/ metamaterial —— 群速度与相速度反向，是 Veselago 1968 想象的奇异介质。2000 年代 Pendry / Smith 把它做了出来；今天它催生了「隐身斗篷」、超分辨成像、可重构天线阵列，都是经典 EM 在工程层面的当代延伸。",
        "从光纤通信（1.55 μm 低损耗窗口）到太赫兹安检（0.1–1 THz），从激光手术（CO₂ 10.6 μm）到射电天文（21 cm 氢线），电磁波与物质的相互作用是现代技术的基础。理解 ε(ω) 和 μ(ω) 的频率依赖性，就是理解光如何与世界互动。",
      ],
    },
    {
      heading: "协变形式 · 一行写完 Maxwell",
      body: [
        "把 E 和 B 装进同一个反对称四张量 F^μν = ∂^μ A^ν − ∂^ν A^μ，Maxwell 四方程立刻塌缩成两行：∂_μ F^μν = μ₀ J^ν 给出 Gauss 与 Ampère-Maxwell，∂_[α F_βγ] = 0 自动给出 Gauss·B 与 Faraday。E、B 之间的「互换」不再是巧合——它就是在不同惯性系下看同一个 F^μν 的不同时空切片，从而 P3 的相对论是 P2 的不可避免后果。",
        "协变形式的美在于它暴露了 Maxwell 方程的对称性结构。Lorentz 变换下 F^μν 作为一个整体变换，E 和 B 的混合是自动的——不需要额外假设。一个纯电场在运动参考系里会「长出」磁场分量，反之亦然。这解释了为什么一根通电导线在静止参考系里只有磁场，在跟着电子一起运动的参考系里只有电场——同一张 F^μν，不同的切片。",
        "更深一层的是矢势 A^μ 本身：Aharonov-Bohm 1959 提出，把电子分到一段被磁通管挡住的双狭缝里，即使电子从未进入 B ≠ 0 区域，干涉条纹仍随磁通 Φ 周期性偏移 ΔΦ = h/e。这条实验（Tonomura 1986 用相干电子显微镜确认）说明 A 本身是物理实在的载体，而非可有可无的数学辅助——这是规范场论 (P7) 整个上层建筑的本体论起点。",
        "从工程角度看，协变形式让粒子加速器的设计变得系统化：在同步加速器里，粒子以接近光速运动，必须用相对论电磁学计算辐射损失（同步辐射功率 ∝ γ⁴）、束流动力学（横向 betatron 振荡）和腔体设计。没有协变 Maxwell，就没有 LHC。",
      ],
    },
    {
      heading: "辐射与等离子体 · 偶极、四极、Alfvén",
      body: [
        "Larmor 公式 P = q² a² / (6π ε₀ c³) 告诉我们：电磁辐射的最低阶是偶极。引力波 (P3) 不存在偶极辐射，必须四极起步——这是「单极禁戒于电荷守恒，偶极禁戒于动量守恒」的几何后果。LIGO 一次事件辐射的能量可相当于数个太阳的静质能，但因为只能走四极通道，振幅仍然只有 h ~ 10⁻²¹。",
        "宇宙 99% 的可见物质是等离子体，集体行为远比单粒子动力学奇异。三大模式：Langmuir 振荡（频率 ω_p = √(n_e e² / m_e ε₀)，电子的简谐回声）、离子声波（电子做屏蔽，慢的离子被压缩传声）、Alfvén 波（沿磁力线滑行的横波，v_A = B / √(μ₀ ρ)）。从太阳风、磁层亚暴到托卡马克 ITER 的湍流抑制，工程师天天和这三种波打交道。",
        "同步辐射是相对论性电子在磁场中做圆周运动时发出的辐射，功率 ∝ γ⁴ B²。宇宙中的同步辐射源包括蟹状星云（TeV 电子在 μG 磁场中旋转）、活动星系核的喷流、以及人造的同步辐射光源（如 ESRF、Spring-8）——后者是材料科学和结构生物学的核心工具，X 射线晶体学的大部分蛋白质结构都靠它解出。",
        "等离子体物理也是聚变能源的瓶颈：磁约束（托卡马克、仿星器）和惯性约束（激光聚变 NIF）都要在极端条件下维持等离子体稳定。ITER（预计 2035 年首次等离子体）将尝试实现 Q = 10（输出能量是输入的 10 倍），这需要精确控制等离子体不稳定性、边界局域模和等离子体-壁相互作用——全是 Maxwell 方程在高温电离气体中的非线性行为。",
      ],
    },
    {
      heading: "室温超导之争 · 从 LK-99 到高压氢化物",
      body: [
        "超导的「圣杯」是室温常压超导体——如果实现，将彻底改变电力传输、磁悬浮、量子计算等领域。2023 年韩国团队声称合成了 LK-99（一种铜掺杂铅磷灰石），在常压下表现出室温超导性。这一声明在全球引发了「复现热潮」，但最终被多个独立实验证伪：观察到的「悬浮」来自铁磁性杂质，电阻下降来自硫化亚铜杂质的相变。LK-99 事件是一个科学传播的经典案例——社交媒体放大了初步结果，而同行评审的冷静最终给出了正确答案。",
        "高压氢化物超导是真正有实验支持的方向。2019 年 Drozdov 等人在 Nature 上报道 LaH₁₀ 在 170 GPa 压力下 T_c ≈ 288 K（15°C），首次接近室温。2023 年 N-W-H 三元氢化物在更低压（约 100 GPa）下也展示了接近室温的超导。这些结果被多个独立组复现，但挑战在于：100 GPa 以上的压力只有金刚石对顶砧才能实现，距离实用化（常压室温超导）仍有巨大鸿沟。",
        "理论方面，BCS 框架被扩展到「非常规配对」机制：铜氧化物的 d 波配对可能由自旋涨落介导，铁基超导体可能是 s± 波配对，氢化物则接近传统 BCS 但声子频率极高。理解非常规超导机制是凝聚态物理最大的未解问题之一——如果能解决，可能指明通往常压室温超导的路径。",
        "超导的应用也在快速推进：2020 年代的高温超导带材（REBCO）已经可以制成数千米长的线圈，用于紧凑型聚变反应堆（如 SPARC / CFS）和下一代粒子加速器。量子计算中的 transmon 比特在 20 mK 工作，其相干时间从 2010 年的 ~1 μs 提升到 2024 年的 ~500 μs——超导量子比特正在从实验室走向工程化。",
      ],
    },
    {
      heading: "电磁隐身 · Metamaterial 与变换光学",
      body: [
        "电磁隐身——让光线绕过物体再恢复原方向，使物体「不可见」——长期被认为是科幻。2006 年 Pendry 和 Leonhardt 独立提出「变换光学」理论：通过设计空间中每一点的 ε 和 μ 张量，可以弯曲光的路径就像引力弯曲时空。Pendry 的方案用 metamaterial 实现了 2D 微波频段的圆柱形隐身斗篷（Schurig et al. 2006, Science），验证了理论的可行性。",
        "核心思想是坐标变换：把一个球形区域「压缩」到一个壳层里，壳层中的 ε 和 μ 按特定规律分布，使光线绕过内部区域后恢复原来的传播方向。数学上这等价于把一个「洞」从时空中挖掉——与广义相对论中的引力透镜用的是同一套几何语言。区别在于：GR 的折射率由引力场决定，而 metamaterial 的折射率由人工微结构决定。",
        "实际挑战在于：(1) 理想隐身需要 ε 和 μ 都是各向异性的且随位置连续变化，工程实现极其困难；(2) 频率依赖性——一个频段的隐身材料在另一个频段可能完全失效；(3) 带宽限制——目前的隐身斗篷只在窄频段工作。2012 年 Chen et al. 用「地毯式隐身」（把物体压平在一个导电面上方）在光频段实现了宽带隐身，是目前最接近实用的方案。",
        "超越隐身：变换光学的思想被推广到声学（声学隐身）、热力学（热隐身——控制热流路径）、甚至地震学（地震波偏转）。2014 年 Lee et al. 实现了热隐身斗篷，让热流绕过一个区域而不留下任何热学痕迹。这些「隐身」虽然不涉及光，但用的是同一套坐标变换的数学——Maxwell 方程的结构在不同物理领域反复出现，变换光学就是利用这种数学统一性的典范。",
      ],
    },
    {
      heading: "超导 · 零电阻与 Meissner 效应",
      body: [
        "1911 年 Onnes 发现汞在 4.2 K 以下电阻突然消失——超导。这不是「电阻很小」，而是严格为零：电流在超导环里可以流几十年不衰减。同时超导体排斥内部磁场（Meissner 效应），这是它与「完美导体」的本质区别——磁通被完全排出，而非被「冻住」。",
        "BCS 理论（Bardeen-Cooper-Schrieffer, 1957）解释了微观机制：电子通过声子交换形成 Cooper 对，这些玻色子凝聚到同一量子态，形成宏观波函数。能隙 Δ ~ 1 meV 保护了凝聚态不受低能散射破坏。Josephson 1962 年预言两块超导体之间的 Cooper 对隧穿效应——今天是 SQUID 磁强计和超导量子比特的物理基础。",
        "高温超导（铜氧化物，1986 年发现，T_c 最高 ~ 133 K）的机制至今未完全理解——电子配对可能由自旋涨落而非声子介导，强关联效应让微扰论失效。这是凝聚态物理最大的未解问题之一。镍氧化物超导体（2019+）提供了新的研究平台，但距离室温超导仍有巨大鸿沟。",
        "超导的应用已经深入日常：MRI 用 NbTi 超导磁体产生 1.5–3 T 的均匀磁场；粒子加速器 LHC 用 1232 块超导偶极磁体弯转质子束；磁悬浮列车用高温超导体的钉扎效应悬浮。量子计算中的 transmon 比特本质上就是一个超导 LC 振荡器——超导从电磁学的一个分支变成了量子技术的核心使能者。",
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
    {
      label:
        "Maxwell 1865 — A Dynamical Theory of the Electromagnetic Field (Phil. Trans. R. Soc.)",
      url: "https://en.wikipedia.org/wiki/A_Dynamical_Theory_of_the_Electromagnetic_Field",
      kind: "encyclopedia",
    },
    {
      label: "Tonomura et al. 1986 — Evidence for Aharonov-Bohm effect with magnetic field",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.56.792",
      kind: "paper",
    },
    {
      label: "Drozdov et al. 2019 — Superconductivity at 250 K in lanthanum hydride (Nature)",
      url: "https://www.nature.com/articles/s41586-019-1681-7",
      kind: "paper",
    },
    {
      label:
        "Pendry et al. 2006 — Controlling Electromagnetic Fields (transformation optics, Science)",
      url: "https://www.science.org/doi/10.1126/science.1125907",
      kind: "paper",
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
  discussionQuestions: [
    "Maxwell 方程预言了电磁波的存在——在实验验证之前，你认为理论预言的可信度有多高？",
    "负折射率材料（metamaterial）可以弯曲光线绕过物体实现「隐身」——这种技术的伦理边界在哪里？",
    "超导体的零电阻和完全抗磁性（Meissner 效应）是两个独立现象——为什么它们总是同时出现？",
  ],
};

export default content;

import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P2",
  name: { primary: "电磁与光", latin: "Electromagnetism & Optics" },
  tagline: "看不见的力，照亮的世界",
  whisper: "电荷与电流产生场，场的变化以有限速度传播；真空光速连接电磁学与相对论。",
  dataCards: [
    { label: "真空光速", latinLabel: "c", value: "299 792 458", hint: "m / s（精确定义）" },
    {
      label: "真空介电常数",
      latinLabel: "ε₀",
      value: "8.854 × 10⁻¹²",
      hint: "F / m · CODATA 2022近似值",
    },
    {
      label: "真空磁导率",
      latinLabel: "μ₀",
      value: "1.257 × 10⁻⁶",
      hint: "H / m · 2019后不再为定义精确值",
    },
    { label: "基本电荷", latinLabel: "e", value: "1.602 176 634 × 10⁻¹⁹", hint: "C · SI精确值" },
    { label: "Maxwell 方程", value: "4", hint: "现代矢量形式 · 两组协变关系" },
    { label: "电子静质能", latinLabel: "mₑ c²", value: "0.511", hint: "MeV" },
    { label: "精细结构常数", latinLabel: "α", value: "≈ 1 / 137.036", hint: "无量纲" },
    { label: "可见光波长", latinLabel: "λ", value: "380–780", hint: "nm · 常用范围，边界随定义" },
    {
      label: "电磁场张量",
      latinLabel: "F^μν",
      value: "∂^μ A^ν − ∂^ν A^μ",
      hint: "反对称张量 · 分量按Lorentz变换",
    },
    {
      label: "Poynting 矢量",
      latinLabel: "S",
      value: "E × B / μ₀",
      hint: "W / m² · 真空电磁能流",
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
      hint: "m · α² a₀，非电子硬球尺寸",
    },
    {
      label: "铜氧化物 T_c 实例",
      value: "≈ 133 K",
      hint: "HgBa₂Ca₂Cu₃O₈₊δ · 常压 · 1993",
    },
    {
      label: "高压氢化物 T_c 实例",
      value: "≈ 250 K (−23°C)",
      hint: "LaH₁₀ · 约170 GPa · 2019报告",
    },
    {
      label: "双负超材料实例",
      value: "Re ε < 0, Re μ < 0",
      hint: "指定微波频带 · 有效介质模型",
    },
  ],
  narrative: [
    {
      heading: "直觉 · Coulomb 与 Ampère",
      body: [
        "孤立静止点电荷在真空中的场按1/r²变化；无限长直导线的稳恒磁场按I/r变化。不同几何有不同距离依赖，实际电路还需计入回流路径。Coulomb1785年的扭秤、Ørsted1820年的磁针，以及Ampère的实验与理论，分别提供了联系的不同环节。",
        "Faraday1831年研究感应电流。固定回路中的变化磁通与环流电场相关；运动导体也可能在静磁场中产生动生电动势。是否有电流还取决于回路、负载和其他条件。",
      ],
    },
    {
      heading: "学院 · Maxwell 四方程",
      body: [
        "现代E、B形式的高斯定律以总电荷为源；磁场散度为零表示这套经典理论没有磁荷源项，不是证明所有可能的磁单极理论都不成立。Faraday与Ampère–Maxwell关系还把场的空间旋度与时间变化、电流联系起来。",
        "真空无源区的方程允许横向平面行波，c=1/√(μ₀ε₀)。Maxwell将电磁测量得到的速度尺度与当时光速测量比较，提出光的电磁理论；今天c的精确SI值属于后来的单位定义。",
        "矢势和标势满足A→A+∇χ、φ→φ−∂χ/∂t时，E与B不变。规范自由度使不同势可描述同一物理场；非阿贝尔规范理论在此基础上进一步发展。",
      ],
    },
    {
      heading: "前沿 · 等离子体 · 非线性光学 · QED",
      body: [
        "恒星内部、太阳风和磁层存在广泛的等离子体。无碰撞动理学可采用Vlasov–Maxwell模型，碰撞、强耦合或流体尺度则需要相应的其他近似；不把“宇宙99%”作为未定义质量口径的精确统计。",
        "强光响应可能出现倍频、自相位调制等非线性。CPA先展宽脉冲、放大、再压缩，以控制放大过程的峰值强度；2018年物理学奖的一半授予Mourou与Strickland的相关方法，并非把全部非线性光学归于这一项技术。",
        "QED量子化电磁场及其与带电物质场的相互作用。Lamb位移和电子磁矩是重要精密检验；2023年电子磁矩实验的0.13 ppt测量不确定度，不等于所有QED理论预言都有相同精度，理论还依赖α等输入。",
      ],
    },
    {
      heading: "光与物质 · 折射率到 metamaterial",
      body: [
        "在线性、均匀、各向同性、局域响应模型中，折射率满足n²=εᵣμᵣ；这里使用相对介电常数和相对磁导率，SI绝对量不能直接代入。吸收介质中这些量可为复数，分支、频率、各向异性和空间色散都需说明。",
        "Smith等人2000年的微波复合结构在特定频带表现出同时为负的有效介电常数与磁导率。弱损耗、适用的各向同性模型可有相位传播与能流方向相反；群速度、能流和信号速度在一般耗散色散介质中不能简单等同。",
      ],
    },
    {
      heading: "协变形式 · 电场与磁场的共同描述",
      body: [
        "把E与B写成反对称电磁场张量，可将现代Maxwell方程压缩为两组协变关系。张量分量会随惯性参考系改变；“协变”不是每个分量都保持不变。不同系中的电磁场描述服从同一套Lorentz变换，而完整相对论还包括时空与物质动力学的结构。",
        "Aharonov与Bohm1959年提出量子相位效应；Tonomura等人1986年用被超导层包覆的环形铁磁体及电子全息检验了电子路径避开磁场区时的相位差。可观测的是规范不变的相对相位，磁效应的相位含qΦ/ℏ，电子对应的磁通周期为h/e；这不把任意规范中的A数值单独变成可测量量。",
      ],
    },
    {
      heading: "辐射与等离子体 · 从模型选择到集体运动",
      body: [
        "非相对论点电荷的Larmor辐射功率为q²a²/(6πε₀c³)。局域源的电磁多极展开通常从电偶极项考虑，但特定对称性可以令它消失，随后还可能有磁偶极或电四极等项；不能把所有辐射都归为同一种偶极模型。",
        "电子等离子体振荡、离子声波与Alfvén波描述不同的集体模式。冷电子振荡、低阻尼离子声波或理想磁流体横波各有温度、碰撞、磁场与波长条件；它们不是涵盖全部等离子体现象的三个通用解。",
      ],
    },
    {
      heading: "超导证据 · 温度、压力与可重复性",
      body: [
        "常压与高压的转变温度需要分别比较。1993年Hg–Ba–Ca–Cu–O体系的磁性和电阻测量报告约133 K；Drozdov等人2019年的LaH₁₀报告约250 K、170 GPa，并非288 K，更不是常压结果。这里列的是具体实验实例，不是截至今日的无条件纪录。",
        "判断新材料超导需要连同样品、电阻、磁响应、温度、压力及独立复核一起评价。局部悬浮或单一电阻异常并不独自构成完整证据。超导线材的可用性还受临界电流、场强、低温与制造约束，即使材料成立，也不能直接推导所有电力或量子器件问题已经解决。",
      ],
    },
    {
      heading: "变换光学 · 有边界的电磁操控",
      body: [
        "Pendry等人2006年用坐标变换构造相应的材料参数分布。Schurig等人的微波实验用人工结构减小铜圆柱在特定配置下的散射和阴影；它是有限频段、偏振与几何下的演示，不是任意视角、可见光和所有物体的完美隐身。",
        "相似的数学思路可帮助构造其他波动或扩散问题，但每个领域仍要满足自身的方程、边界和材料条件。热扩散、声波与电磁波不是因为共享变换方法就成为完全相同的物理过程。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "入门可从Feynman第二卷与MIT电磁学课程开始；数值和单位定义分别查NIST与BIPM。下面另列原始实验论文，便于核对AB装置、超导温压、超材料频段及精密测量的具体条件。",
      ],
    },
  ],
  sources: [
    {
      label: "Feynman Vol. II · 电磁学原著",
      url: "https://www.feynmanlectures.caltech.edu/II_toc.html",
      kind: "encyclopedia",
    },
    {
      label: "NIST · 2022 CODATA常数及不确定度",
      url: "https://physics.nist.gov/cuu/pdf/all.pdf",
      kind: "agency",
    },
    {
      label: "BIPM · SI第9版，光速、电荷与μ₀的定义地位",
      url: "https://www.bipm.org/en/publications/si-brochure",
      kind: "agency",
    },
    {
      label: "Aharonov & Bohm 1959 · 量子势与相位",
      url: "https://doi.org/10.1103/PhysRev.115.485",
      kind: "paper",
    },
    {
      label: "Tonomura et al. 1986 · 屏蔽磁场的AB实验",
      url: "https://doi.org/10.1103/PhysRevLett.56.792",
      kind: "paper",
    },
    {
      label: "Fan et al. 2023 · 电子磁矩测量及α输入限制",
      url: "https://doi.org/10.1103/PhysRevLett.130.071801",
      kind: "paper",
    },
    {
      label: "Schilling et al. 1993 · Hg–Ba–Ca–Cu–O体系约133 K",
      url: "https://doi.org/10.1038/363056a0",
      kind: "paper",
    },
    {
      label: "Drozdov et al. 2019 · LaH₁₀约250 K与170 GPa",
      url: "https://doi.org/10.1038/s41586-019-1201-8",
      kind: "paper",
    },
    {
      label: "Smith et al. 2000 · 微波双负有效介质",
      url: "https://doi.org/10.1103/PhysRevLett.84.4184",
      kind: "paper",
    },
    {
      label: "Pendry et al. 2006 · Controlling Electromagnetic Fields",
      url: "https://doi.org/10.1126/science.1125907",
      kind: "paper",
    },
    {
      label: "Schurig et al. 2006 · 有限配置的微波隐身实验",
      url: "https://doi.org/10.1126/science.1133628",
      kind: "paper",
    },
    {
      label: "Nobel 2018 · CPA与激光物理授奖说明",
      url: "https://www.nobelprize.org/prizes/physics/2018/press-release/",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "maxwell-equations",
      name: { primary: "Maxwell 方程组", latin: "Maxwell's Equations" },
      position: [0, 0, 0],
      description:
        "现代四个矢量关系连接电荷、电流与场。真空位移电流密度为ε₀∂E/∂t，无源区允许光速行波；现代记号不同于1865年原稿。",
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
      description: "真空静止点电荷的力大小为k|q₁q₂|/r²，方向沿两者连线；有限分布还需积分。",
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
        "固定回路有ε=−dΦ/dt；运动导体还需计入v×B与路径条件。线圈磁链包含匝数，回路是否有电流取决于负载。",
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
      description: "A→A+∇χ、φ→φ−∂χ/∂t共同保持E、B不变。可观测相位也须按规范不变的方式比较。",
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
        "QED描述量子电磁场与带电物质场的相互作用，α控制微扰展开。电子磁矩的实验不确定度与依赖α输入的理论比较精度须分开。",
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

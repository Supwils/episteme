import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P5",
  name: { primary: "原子与分子", latin: "Atomic & Molecular Physics" },
  tagline: "化学的物理根源",
  whisper: "轨道的容量给出周期表的骨架；相互作用与能量排序，决定电子怎样把它填满。",
  dataCards: [
    { label: "Bohr 半径", latinLabel: "a₀", value: "5.292 × 10⁻¹¹", hint: "m" },
    { label: "Rydberg 常数", latinLabel: "R∞", value: "1.097 × 10⁷", hint: "/ m" },
    { label: "氢电离能", value: "≈ 13.5984", hint: "eV · 中性氢基态；13.606 是无限核近似尺度" },
    { label: "精细结构常数", latinLabel: "α", value: "1 / 137.036", hint: "无量纲" },
    { label: "已知元素", value: "118", hint: "IUPAC 已命名 · Z = 1–118" },
    { label: "Hartree 能量单位", value: "27.211", hint: "eV" },
    { label: "1995 铷气体 BEC 起始", value: "≈ 170", hint: "nK · Anderson 等；临界温度随系统而变" },
    { label: "化学键能量量级", value: "1–10", hint: "eV · 共价 / 离子" },
    {
      label: "Lamb shift",
      value: "≈ 1057.8",
      hint: "MHz · 氢 2S₁/₂ vs 2P₁/₂ · QED 标志",
    },
    {
      label: "氢超精细分裂",
      value: "≈ 1 420.405 752",
      hint: "MHz · 21 cm 谱线（射电天文标尺）",
    },
    {
      label: "Cs-133 时基",
      value: "9 192 631 770",
      hint: "Hz · SI 秒的定义",
    },
    {
      label: "光学钟不确定度",
      value: "8.1 × 10⁻¹⁹",
      hint: "2024 Sr 晶格钟 · 相对频率系统不确定度",
    },
  ],
  narrative: [
    {
      heading: "直觉 · Bohr 与谱线",
      body: [
        "1913 年 Bohr 用定态与频率条件把氢光谱写成能量差：hν = E初 − E末。模型给出近似 Eₙ = −13.6 eV/n²，统一了 Balmer 等谱线系；向低能态跃迁可以发射光，吸收则反向进行。定态轨道是历史模型，现代轨道是波函数，不是电子绕核的已知路线。",
        "在独立粒子近似中，一个空间轨道可容纳自旋投影相反的两个电子；不相容原理禁止相同的完整单电子态被重复占据。量子数 (n, ℓ, mℓ, ms) 给出每个亚层 2(2ℓ + 1) 个位置，s/p/d/f 容量依次为 2/6/10/14。周期表还取决于屏蔽、交换与能量排序，不能仅从 Pauli 原理推出每一项组态。",
      ],
    },
    {
      heading: "学院 · 多电子原子与分子轨道",
      body: [
        "忽略自旋、相对论与辐射修正的两体库仑模型可解析求解，空间本征态分成径向函数与球谐函数。s 态球对称，实 p 轨道常画成两瓣；d 轨道有多种形状，d 的 z² 型还带环带。多电子问题通常要近似：Hartree–Fock 使用反对称的单行列式，包含交换，但仍遗漏部分电子关联；组态相互作用、耦合簇、密度泛函等方法各有适用范围。",
        "LCAO 把分子轨道展开在原子轨道基组中。对 H₂ 的最小 1s 基组，同相组合给出 σg 成键轨道，反相组合给出 σu* 反键轨道；成键还要比较电子占据、核间排斥与总能量。sp、sp²、sp³ 杂化是描述局域键方向的有用基组，分别联系线性、平面三角和四面体几何；苯的离域 π 电子还需单独处理。",
        "分子常有电子、振动、转动三组能量尺度，约为 eV、0.1 eV、meV 量级，对应频段随分子和跃迁而变。Born–Oppenheimer 近似先分离电子与核运动，谐振子、刚性转子等近似再给出常用能级阶梯；这不是三种精确且处处等间距的谱。",
      ],
    },
    {
      heading: "前沿 · 冷原子 / BEC / 量子模拟",
      body: [
        "激光冷却可把适当原子降到 μK 量级，蒸发冷却进一步降低温度。1995 年 Anderson、Ensher、Matthews、Wieman 与 Cornell 在铷气体中观察到凝聚组分，起始约 170 nK；同年 Davis 等人在钠气体中实现 BEC。凝聚表示某个单粒子态被宏观占据，不要求有限温度下全部原子都进基态，也不与超流完全等同。",
        "光晶格中的原子可模拟 Hubbard 等模型；光镊 Rydberg 阵列利用可调相互作用研究自旋系统。Ebadi 等人 2021 年的二维阵列达到 256 个原子，并研究了与 (2+1) 维 Ising 转变一致的临界动力学。这是有特定模型与读出条件的模拟实验，原子数并不直接等于可容错的逻辑比特数。",
      ],
    },
    {
      heading: "精密度量 · 原子钟与基础常数",
      body: [
        "2019 年修订的 SI 固定七个定义常数：秒关联 Cs-133 未受扰动基态超精细跃迁频率，米关联真空光速，千克和安培分别关联 h 与 e；它们不能统称为原子常数。2024 年 Aeppli 等人的锶光学晶格钟报告相对频率系统不确定度 8.1 × 10⁻¹⁹。把这个量级乘以约 138 亿年得到约 0.35 秒，只是比例类比，不是钟已连续运行整个宇宙年龄的实测误差。",
        "原子、分子、离子和俘获电子提供了不同的精密探针：比较不同钟频率可约束常数随时间的变化，极性分子与原子可用于电偶极矩搜索，Penning 阱则测电子磁矩。每种结果都有自己的系统误差与理论输入，不能把一种钟的不确定度套用给所有基础物理检验。",
      ],
    },
    {
      heading: "分子能级阶梯 · Born-Oppenheimer 的礼物",
      body: [
        "质子质量约为电子的 1836 倍，更重的原子核质量比还要大。Born–Oppenheimer 近似利用电子与核的尺度差异：对给定核坐标先解电子问题，再在包含核间排斥的势能面上处理核运动。势能面的极小值联系平衡几何，鞍点联系反应势垒；电子态接近简并或存在圆锥交叉时，非绝热耦合可能使单势能面近似失效。",
        "在双原子分子势阱底部，谐振近似给出 Eᵥ ≈ ℏω(v + 1/2)；更高激发时，非谐性与解离不能忽略。刚性转子近似给出 Eⱼ = ℏ²J(J+1)/(2I)，I 是转动惯量。谱线还须满足跃迁矩阵元和选择定则：振动、转动或电子激发并不自动产生可见的吸收线。实际分子的多种振动模、转振耦合与碰撞展宽，使能级计算转成可以比对的光谱指纹。",
      ],
    },
    {
      heading: "Lamb shift · QED 进入原子",
      body: [
        "纯库仑场中的理想 Dirac 模型使氢 2S₁/₂ 与 2P₁/₂ 简并。Lamb 与 Retherford 1947 年初报的间隔约为 1000 MHz；约 1058 MHz 是后续精密结果的尺度，不能倒写成初报数值。解释这一差异需要束缚态辐射修正，并在精密比较时计入反冲和核结构。Bethe 同年的计算给出重要的非相对论估计，电子自能与质量重整化是关键，而不只是一个笼统的真空涨落故事。",
        "电子磁矩提供另一项精密检验。Fan 等人 2023 年测得 g/2 = 1.00115965218059(13)，相对不确定度为 0.13 ppt；反常部分是 aₑ = (g−2)/2。标准模型预测还依赖独立输入的精细结构常数 α，原论文明确指出不同 α 测量的分歧限制了比较。实验不确定度、理论不确定度和二者是否吻合是三件事，不能把小误差直接说成理论吻合到同样多位。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "氢原子与周期表可从 Feynman 第三卷第19章和 NIST 的态、壳层与组态说明入手；分子基组和 Born–Oppenheimer 框架见 MIT 5.61 第28–29讲，刚性转子见第17讲。凝聚、原子阵列、钟与磁矩的数值分别链接到对应原论文，读实验条件比记住一个纪录数字更重要。",
      ],
    },
  ],
  sources: [
    {
      label: "NIST · CODATA 2022 常数表",
      url: "https://physics.nist.gov/cuu/pdf/all.pdf",
      kind: "agency",
    },
    {
      label: "OpenStax · 杂化轨道与空间几何",
      url: "https://openstax.org/books/chemistry-2e/pages/8-2-hybrid-atomic-orbitals",
      kind: "agency",
    },
    {
      label: "OpenStax · 成键、反键与分子轨道",
      url: "https://openstax.org/books/chemistry-2e/pages/8-4-molecular-orbital-theory",
      kind: "agency",
    },
    {
      label: "NIST · 氢原子电离能",
      url: "https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?context=frames&element=1",
      kind: "agency",
    },
    {
      label: "Feynman 讲义 III.19 · 氢原子与周期表",
      url: "https://www.feynmanlectures.caltech.edu/III_19.html",
      kind: "agency",
    },
    {
      label: "NIST · 原子态、壳层与组态",
      url: "https://www.nist.gov/pml/atomic-spectroscopy-atomic-states-shells-and-configurations",
      kind: "agency",
    },
    {
      label: "IUPAC · 元素周期表",
      url: "https://iupac.org/what-we-do/periodic-table-of-elements/",
      kind: "agency",
    },
    {
      label: "MIT 5.61 · 第28–29讲：电子结构与分子基组",
      url: "https://www.ocw.mit.edu/courses/5-61-physical-chemistry-fall-2017/0d07e780a9ba9181bb949c7618d3c99e_MIT5_61F17_lec28_29_notes.pdf",
      kind: "agency",
    },
    {
      label: "MIT 5.61 · 第17讲：刚性转子",
      url: "https://www.ocw.mit.edu/courses/5-61-physical-chemistry-fall-2017/f2514d59fda2b1c87813dfe303dbf49d_MIT5_61F17_lec17.pdf",
      kind: "agency",
    },
    {
      label: "Anderson 等 1995 · 铷气体 BEC",
      url: "https://doi.org/10.1126/science.269.5221.198",
      kind: "paper",
    },
    {
      label: "Davis 等 1995 · 钠气体 BEC",
      url: "https://doi.org/10.1103/PhysRevLett.75.3969",
      kind: "paper",
    },
    {
      label: "Ebadi 等 2021 · 256 原子量子模拟器",
      url: "https://doi.org/10.1038/s41586-021-03582-4",
      kind: "paper",
    },
    {
      label: "BIPM · SI 的七个定义常数",
      url: "https://www.bipm.org/en/measurement-units/si-defining-constants",
      kind: "agency",
    },
    {
      label: "Aeppli 等 2024 · 锶钟系统不确定度8.1×10⁻¹⁹",
      url: "https://doi.org/10.1103/PhysRevLett.133.023401",
      kind: "paper",
    },
    {
      label: "Lamb 与 Retherford 1947 · 微波方法测氢精细结构",
      url: "https://doi.org/10.1103/PhysRev.72.241",
      kind: "paper",
    },
    {
      label: "Lamb 1955 · 诺贝尔讲演",
      url: "https://www.nobelprize.org/uploads/2018/06/lamb-lecture.pdf",
      kind: "paper",
    },
    {
      label: "Fan 等 2023 · 电子磁矩",
      url: "https://doi.org/10.1103/PhysRevLett.130.071801",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "bohr-model",
      name: { primary: "Bohr 模型", latin: "Bohr Model" },
      position: [-0.5, 0, -0.3],
      description:
        "Bohr 1913 定态模型给出近似 Eₙ = −13.6 eV/n²。它是历史与教学起点；现代波函数轨道并非经典运行路线。",
      data: [
        { label: "年份", value: "1913" },
        { label: "氢电离", value: "13.6 eV" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "pauli",
      name: { primary: "Pauli 不相容原理", latin: "Pauli Exclusion" },
      position: [0.3, 0, -0.5],
      description:
        "相同完整单电子态不能重复占据；空间轨道仍可容纳两种自旋投影。亚层容量与相互作用共同塑造周期表。",
      data: [
        { label: "年份", value: "1925" },
        { label: "互文", value: "P7 标准模型 · 自旋统计" },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
    {
      id: "hydrogen-orbitals",
      name: { primary: "氢原子轨道", latin: "Hydrogen Orbitals" },
      position: [0.6, 0, 0],
      description:
        "非相对论库仑模型的空间本征态可分离为径向与角向部分。实轨道的形状只是可选基底，d 轨道并非全是四瓣。",
      data: [
        { label: "求解者", value: "Schrödinger 1926" },
        { label: "Y_lm", value: "球谐函数" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "periodic-table",
      name: { primary: "元素周期表", latin: "Periodic Table" },
      position: [-0.4, 0, 0.5],
      description:
        "Mendeleev 1869 的经验排列得到量子解释；s/p/d/f 亚层容量为 2/6/10/14，填充顺序仍需比较能量。",
      data: [
        { label: "118 元素", value: "Z = 1–118" },
        { label: "互文", value: "P6 核 · 同位素" },
      ],
      color: "var(--hw-gold)",
      size: 0.03,
    },
    {
      id: "bec",
      name: { primary: "玻色-爱因斯坦凝聚", latin: "Bose-Einstein Condensate" },
      position: [0.5, 0, 0.4],
      description:
        "适当密度与温度下，玻色系统的某个单粒子态被宏观占据。有限温度通常仍有非凝聚组分。",
      data: [
        { label: "T_c", value: "~ 10⁻⁷ K" },
        { label: "Nobel", value: "2001" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "rydberg-arrays",
      name: { primary: "Rydberg 原子阵列", latin: "Rydberg Atom Arrays" },
      position: [-0.6, 0, 0.3],
      description:
        "用光镊排列原子，再耦合到 Rydberg 态以调节相互作用。2021 年 256 原子阵列研究了二维量子自旋模型。",
      data: [
        { label: "2021 示例", value: "256 个原子" },
        { label: "互文", value: "P8 前沿 · 量子计算" },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
  ],
};

export default content;

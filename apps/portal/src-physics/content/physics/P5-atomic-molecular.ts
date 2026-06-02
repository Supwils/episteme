import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "P5",
  name: { primary: "原子与分子", latin: "Atomic & Molecular Physics" },
  tagline: "化学的物理根源",
  whisper: "波函数的形状决定了元素周期表的轮廓——量子力学第一次解释了「为什么」。",
  dataCards: [
    { label: "Bohr 半径", latinLabel: "a₀", value: "5.292 × 10⁻¹¹", hint: "m" },
    { label: "Rydberg 常数", latinLabel: "R∞", value: "1.097 × 10⁷", hint: "/ m" },
    { label: "氢电离能", value: "13.606", hint: "eV" },
    { label: "精细结构常数", latinLabel: "α", value: "1 / 137.036", hint: "无量纲" },
    { label: "已知元素", value: "118", hint: "Z = 1–118 已合成" },
    { label: "Hartree 能量单位", value: "27.211", hint: "eV" },
    { label: "BEC 临界温度", value: "~ 10⁻⁷", hint: "K · 实验典型" },
    { label: "化学键能量量级", value: "1–10", hint: "eV · 共价 / 离子" },
    {
      label: "Lamb shift",
      value: "≈ 1057.8",
      hint: "MHz · 氢 2S₁/₂ vs 2P₁/₂ · QED 标志",
    },
    {
      label: "氢超精细分裂",
      value: "1 420.405 751 768",
      hint: "MHz · 21 cm 谱线（射电天文标尺）",
    },
    {
      label: "Cs-133 时基",
      value: "9 192 631 770",
      hint: "Hz · SI 秒的定义",
    },
    {
      label: "光学钟不确定度",
      value: "~ 10⁻¹⁸",
      hint: "Sr-87 / Yb-171 晶格钟 · 宇宙年龄偏 ≤ 1 s",
    },
  ],
  narrative: [
    {
      heading: "直觉 · Bohr 与谱线",
      body: [
        "1913 年 Bohr 假设电子只能在离散轨道上运动，E_n = −13.6 eV / n²，立刻解释了氢原子的可见谱线（Balmer 系列）。这是「跃迁就是发光」的第一条量化版本。",
        "Pauli 不相容原理（两个电子不能占据同一态）+ 量子数 (n, ℓ, m, s) 决定了周期表的列宽：1s² · 2s² 2p⁶ · 3s² 3p⁶...",
        "把元素周期表想象成一栋公寓楼：每层楼是一个主量子数 n，每层楼上有不同户型（s/p/d/f 轨道），每个户型最多住两个「室友」（自旋上和自旋下的电子），而且根据 Pauli 原理，两个室友不能完全相同。第一层只有 s 户型（2 人），第二层有 s 和 p（8 人），第三层加了 d（18 人）……周期表的列宽、元素的化学性质、甚至钻石的硬度和金子的颜色，都由这栋「量子公寓」的入住规则决定。",
      ],
    },
    {
      heading: "学院 · 多电子原子与分子轨道",
      body: [
        "氢原子 Schrödinger 方程有精确解：径向 R_nl(r) × 球谐 Y_lm(θ,φ)，给出 s/p/d/f 轨道形状。多电子要靠 Hartree-Fock 自洽场：每个电子在其他电子的平均势里运动。",
        "化学键来自原子轨道线性组合（LCAO）：H₂ 的成键 σ_g 与反键 σ_u；杂化 sp/sp²/sp³ 解释了 CH₄ 的正四面体与苯环的平面六角。",
        "光谱学三层：电子（eV / 紫外可见）、振动（~ 0.1 eV / 红外）、转动（~ meV / 微波）。每一层都是 Born-Oppenheimer 近似下的能级阶梯。",
      ],
    },
    {
      heading: "前沿 · 冷原子 / BEC / 量子模拟",
      body: [
        "激光冷却把原子降到 μK 量级（Nobel 1997），蒸发冷却继续到 nK；1995 Wieman / Cornell / Ketterle 实现 BEC——宏观波函数。",
        "光晶格 + Rydberg 原子阵列让 100+ 量子比特的「模拟器」成为现实，用于研究 Hubbard 模型、自旋液体、量子相变；这是 NISQ 时代最干净的量子计算路线之一。",
      ],
    },
    {
      heading: "光谱学 · 宇宙的指纹鉴定",
      body: [
        "每一种原子和分子都有独一无二的能级结构，因此它们吸收或发射的光子频率也各不相同——这些离散的谱线就像宇宙中的「指纹」。Fraunhofer 1814 年在太阳光谱中发现了数百条暗线，Kirchhoff 和 Bunsen 1860 年代证明每条线对应一种特定元素。今天天文学家仅凭一束来自数十亿光年外的星光，就能精确测定遥远天体的化学成分、温度、密度、磁场强度甚至自转速度——这一切都建立在 Born-Oppenheimer 近似下的电子-振-转能级阶梯之上。",
        "光谱学在天文学中的威力跨越所有尺度：21 cm 氢超精细谱线 (1420 MHz) 描绘了银河系的旋臂结构；分子转动谱线 (CO 115 GHz, H₂O 22 GHz) 揭示了恒星摇篮中的气体运动；Lyman-α 森林（遥远类星体光谱中密集的氢吸收线）是探测星系际介质和宇宙大尺度结构的标准探针。2022 年 JWST 在系外行星 WASP-39b 大气中首次明确检测到 CO₂ 的 4.3 μm 振-转吸收带——这是在另一颗恒星的行星大气中识别出特定分子的里程碑时刻，也是光谱学作为「宇宙指纹鉴定术」最令人激动的前沿应用。",
      ],
    },
    {
      heading: "精密度量 · 原子钟与基础常数",
      body: [
        "现代国际单位制 (SI 2019) 把秒、米、kg、安培都定义在原子常数上：秒由 Cs-133 超精细跃迁 9 192 631 770 Hz 给出，米从光速倒推。光学晶格钟 (Sr-87、Yb-171) 已经把不确定度推到 10⁻¹⁸ —— 相当于在宇宙年龄里偏差不到 1 秒。",
        "这套精度让原子物理变成了基础物理的探针：精细结构常数 α 的时间漂移上限、电子电偶极矩 (EDM) 测量、暗物质粒子与电子的耦合搜索，都跑在原子钟与冷原子干涉仪上。这是「桌面上的高能物理」。",
      ],
    },
    {
      heading: "分子能级阶梯 · Born-Oppenheimer 的礼物",
      body: [
        "原子核比电子重 ~1800 倍，所以核运动慢、电子运动快。Born-Oppenheimer 1927 把核固定下来先解电子 Schrödinger 方程，再让核在「电子势能面」V(R) 上做运动。这个看似粗糙的分离实际上是化学的基石——「分子是几何」这个观念由此成立，每条键长、键角、势垒高度都成了可计算量。",
        "在 V(R) 极小附近，Morse 势 V(R) = D_e (1 − e^(−a(R−R_e)))² 给出振动能级 E_v = ℏω(v + 1/2) − ℏω x_e (v + 1/2)²，转动叠加 E_J = B J(J+1) 给出红外吸收的 P/R 支结构。光谱学三层（电子 eV / 振动 0.1 eV / 转动 meV）拼起来就是一张分子指纹——IPCC 用 CO₂ 在 4.3 μm 和 15 μm 的振-转吸收带量化温室效应，JWST 用 H₂O / CH₄ / CO₂ 的红外谱在系外行星大气里找生命指标，都站在 Born-Oppenheimer 给的这套阶梯上。",
      ],
    },
    {
      heading: "Lamb shift · QED 进入原子",
      body: [
        "Dirac 方程预言 H 的 2S₁/₂ 与 2P₁/₂ 能级简并，但 Lamb & Retherford 1947 用微波共振技术测到二者相差 ≈ 1058 MHz——经典量子力学无法解释。Bethe 同年用「真空涨落 + 重正化」给出第一估计，开启了完整的 QED 微扰计算；这条 Lamb shift 是 P4 的非相对论量子力学 → P2 量子电磁 → P7 重正化场论 的实验入口。",
        "今天 QED 修正对 H 1S Lamb shift 的理论值与实验值吻合到 ppm 量级；同一套机制贡献的电子反常磁矩 a_e = (g−2)/2 算到 5-loop，与 Penning trap 实验吻合到 13 位有效数字——这是人类整个科学最精确的预测，也是新物理候选 (BSM, P7) 必须不能扰动的紧箍咒。原子物理的精度直接限定了基本理论。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "Bransden & Joachain《Physics of Atoms and Molecules》；Cohen-Tannoudji《Quantum Mechanics》两卷；Atkins《Physical Chemistry》给出化学家的视角；Foot《Atomic Physics》是激光冷却时代的入门。",
      ],
    },
  ],
  sources: [
    {
      label: "NIST Atomic Spectra Database",
      url: "https://www.nist.gov/pml/atomic-spectra-database",
      kind: "agency",
    },
    {
      label: "Wikipedia · Periodic table",
      url: "https://en.wikipedia.org/wiki/Periodic_table",
      kind: "encyclopedia",
    },
    {
      label: "Cohen-Tannoudji · QM lecture archive",
      url: "https://www.lkb.upmc.fr/cqed/welcome/",
      kind: "encyclopedia",
    },
    {
      label: "BIPM SI Brochure 2019 — Redefined units",
      url: "https://www.bipm.org/en/publications/si-brochure",
      kind: "agency",
    },
    {
      label: "Lamb & Retherford 1947 — Fine Structure of the H Atom",
      url: "https://journals.aps.org/pr/abstract/10.1103/PhysRev.72.241",
      kind: "paper",
    },
    {
      label: "Hanneke et al. 2008 — New Measurement of g − 2 of the Electron",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.100.120801",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "bohr-model",
      name: { primary: "Bohr 模型", latin: "Bohr Model" },
      position: [-0.5, 0, -0.3],
      description:
        "电子量子化轨道，E_n = −13.6 eV / n²。是经典与量子的过渡产物，被 Schrödinger 方程完全取代但仍是教学起点。",
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
      description: "费米子不能占据同一量子态。周期表的每一行都是这条原理的几何后果。",
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
      description: "Schrödinger 方程的精确解。s 球形、p 哑铃、d 四瓣——化学键的几何根源。",
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
        "Mendeleev 1869 的经验排列；量子力学解释了为什么列宽是 2 / 6 / 10 / 14——s/p/d/f 容量。",
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
      description: "降温到 nK 量级，玻色子全部坍缩到基态——宏观尺度上的单一波函数。",
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
      description: "把高激发态原子排成 2D 阵列做量子模拟。是当前最干净的多比特量子平台之一。",
      data: [
        { label: "qubit 规模", value: "100+" },
        { label: "互文", value: "P8 前沿 · 量子计算" },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
  ],
};

export default content;

import type { TierContent } from "@/lib/content";

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
    {
      label: "原子半径量级",
      value: "0.5 – 3",
      hint: "Å · Bohr 半径 a₀ = 0.529 Å 为基准",
    },
    {
      label: "氢 Balmer 系谱线",
      value: "656.3 / 486.1 / 434.0 / 410.2",
      hint: "nm · Hα / Hβ / Hγ / Hδ · 可见光",
    },
    {
      label: "BEC 凝聚分数纪录",
      value: "> 95%",
      hint: "⁸⁷Sr 晶格 BEC · 2023 · 纯度纪录",
    },
    {
      label: "DFT 泛函数量",
      value: "500+",
      hint: "Jacob's Ladder 分级 · 从 LDA 到 RPA",
    },
    {
      label: "ATP 合酶转速",
      value: "~ 130",
      hint: "rev/s · 分子马达 · 生物化学能量转换",
    },
  ],
  narrative: [
    {
      heading: "直觉 · Bohr 与谱线 · 周期表的量子根源",
      body: [
        "1913 年 Bohr 假设电子只能在离散轨道上运动，E_n = −13.6 eV / n²，立刻解释了氢原子的可见谱线（Balmer 系列）。这是「跃迁就是发光」的第一条量化版本。",
        "Pauli 不相容原理（两个电子不能占据同一态）+ 量子数 (n, ℓ, m, s) 决定了周期表的列宽：1s² · 2s² 2p⁶ · 3s² 3p⁶... 每一层壳填满后，下一元素就是惰性气体。周期表不是经验排列，是量子力学的直接推论。",
        "原子半径由最外层电子的波函数延伸决定：氢的 Bohr 半径 a₀ = 4πε₀ℏ² / (m_e e²) ≈ 0.529 Å 是所有原子的自然尺度。同一族从上到下半径增大（主量子数 n 增加，轨道更扩展），同一周期从左到右半径缩小（核电荷增加，拉紧电子云）。这种周期性变化直接决定了化学键长和晶格常数。",
        "氢的 Balmer 系列（Hα 656.3 nm 红色、Hβ 486.1 nm 青色、Hγ 434.0 nm 蓝紫、Hδ 410.2 nm 紫色）在天文学中无处不在：恒星分类（OBAFGKM）基于氢线强度，宇宙膨胀的红移用 Balmer 系位移测量。一条原子的谱线就是一本宇宙的编年史。",
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
        "激光冷却把原子降到 μK 量级（Nobel 1997），蒸发冷却继续到 nK；1995 Wieman / Cornell / Ketterle 实现 BEC——宏观波函数。所有原子占据同一量子态，可以用 Gross-Pitaevskii 方程（非线性 Schrödinger）描述。BEC 是超流、超导的玻色子版本，但在稀薄气体中最干净。",
        "光晶格 + Rydberg 原子阵列让 100+ 量子比特的「模拟器」成为现实，用于研究 Hubbard 模型、自旋液体、量子相变；这是 NISQ 时代最干净的量子计算路线之一。Rydberg 原子（主量子数 n ~ 50–100）的偶极-偶极相互作用比基态原子强 10¹⁰ 倍，可以在 μm 间距上实现可控的量子门。",
        "原子干涉仪用物质波的干涉测量惯性力和引力梯度，灵敏度远超经典传感器。10 m 原子塔的重力梯度仪已经能探测地下空洞和矿藏；空间原子干涉仪（STE-QUEST）计划在微重力下测等效原理到 10⁻¹⁵——与 MICROSCOPE 卫星（P3）同级但原理完全不同。",
        "冷原子钟（Sr-87 晶格钟）的不确定度已达 10⁻¹⁸，相当于宇宙年龄（138 亿年）里误差不超过 1 秒。这种精度让基础物理测试成为可能：精细结构常数 α 的时间漂移、暗物质与标准模型粒子的耦合、引力红移的高阶修正——都在「桌面上的高能物理」里进行。",
      ],
    },
    {
      heading: "精密度量 · 原子钟与基础常数",
      body: [
        "现代国际单位制 (SI 2019) 把秒、米、kg、安培都定义在原子常数上：秒由 Cs-133 超精细跃迁 9 192 631 770 Hz 给出，米从光速倒推。光学晶格钟 (Sr-87、Yb-171) 已经把不确定度推到 10⁻¹⁸ —— 相当于在宇宙年龄里偏差不到 1 秒。",
        "原子常数的精密测量也是基础物理的探针。精细结构常数 α 的时间漂移上限 < 10⁻¹⁸ /yr 来自比对不同原子钟的频率比——如果 α 在变，不同原子的能级移动方式不同。电子电偶极矩 (EDM) 的上限 < 10⁻²⁹ e·cm 直接限制 CP 破缺新物理的能标——比 LHC 能量前沿高几个数量级。",
        "暗物质粒子（如 axion）与电子或核子的耦合会在原子钟频率中产生振荡信号。全球原子钟网络的数据正在被用来搜索这类信号——这是「桌面上的暗物质探测」，与 LUX-ZEPLIN 等地下实验互补。",
        "这套精度让原子物理变成了基础物理的探针。从测量引力波（P3）到搜索新粒子（P7），从测试量子电动力学（P2）到探索暗能量状态方程（P8），原子物理的精密测量贯穿了整个物理学的层次结构。",
      ],
    },
    {
      heading: "分子能级阶梯 · Born-Oppenheimer 的礼物",
      body: [
        "原子核比电子重 ~1800 倍，所以核运动慢、电子运动快。Born-Oppenheimer 1927 把核固定下来先解电子 Schrödinger 方程，再让核在「电子势能面」V(R) 上做运动。这个看似粗糙的分离实际上是化学的基石——「分子是几何」这个观念由此成立，每条键长、键角、势垒高度都成了可计算量。",
        "化学键的强度（键能）是化学反应的门槛：C−C 单键 ~3.6 eV、C=C 双键 ~6.4 eV、C≡C 三键 ~8.7 eV。这些数字决定了反应活化能、分子稳定性和材料强度。H₂ 的键能 4.52 eV 来自 covalent bond 的量子力学计算——两个 1s 轨道重叠形成成键 σ_g 与反键 σ_u，能量差就是键能。",
        "在 V(R) 极小附近，Morse 势 V(R) = D_e (1 − e^(−a(R−R_e)))² 给出振动能级 E_v = ℏω(v + 1/2) − ℏω x_e (v + 1/2)²，转动叠加 E_J = B J(J+1) 给出红外吸收的 P/R 支结构。光谱学三层（电子 eV / 振动 0.1 eV / 转动 meV）拼起来就是一张分子指纹。",
        "IPCC 用 CO₂ 在 4.3 μm 和 15 μm 的振-转吸收带量化温室效应，JWST 用 H₂O / CH₄ / CO₂ 的红外谱在系外行星大气里找生命指标，都站在 Born-Oppenheimer 给的这套阶梯上。光谱学不仅是分析工具，它是探测宇宙化学组成的唯一窗口。",
      ],
    },
    {
      heading: "Lamb shift · QED 进入原子",
      body: [
        "Dirac 方程预言 H 的 2S₁/₂ 与 2P₁/₂ 能级简并，但 Lamb & Retherford 1947 用微波共振技术测到二者相差 ≈ 1058 MHz——经典量子力学无法解释。Bethe 同年用「真空涨落 + 重正化」给出第一估计，开启了完整的 QED 微扰计算。",
        "Lamb shift 的物理机制是：电子与真空中的虚光子不断相互作用，「抖动」了它的位置和能量。这种真空涨落的效应在自由电子上不可见（重正化消掉），但在束缚态（如氢原子）中部分保留，导致能级偏移。2S₁/₂ 比 2P₁/₂ 受影响更大，因为 2S 电子在核附近出现的概率更高。",
        "今天 QED 修正对 H 1S Lamb shift 的理论值与实验值吻合到 ppm 量级；同一套机制贡献的电子反常磁矩 a_e = (g−2)/2 算到 5-loop，与 Penning trap 实验吻合到 13 位有效数字——这是人类整个科学最精确的预测。",
        "这条 Lamb shift 是 P4 的非相对论量子力学 → P2 量子电磁 → P7 重正化场论 的实验入口。它也是新物理候选 (BSM, P7) 必须不能扰动的紧箍咒——任何新粒子如果与电子耦合太强，都会在 a_e 中留下痕迹。原子物理的精度直接限定了基本理论的边界。",
      ],
    },
    {
      heading: "化学键的量子本质 · 从 LCAO 到密度泛函",
      body: [
        "化学键的本质是量子力学的：两个原子靠近时，它们的电子波函数重叠，形成成键（能量更低）和反键（能量更高）的分子轨道。H₂ 的 σ_g 成键态比两个孤立氢原子低 ~4.5 eV，这就是共价键的起源——电子在两个核之间出现的概率增大，电荷密度把两个正核「粘」在一起。",
        "杂化轨道是理解分子几何的钥匙：sp 杂化给出直线形（如 CO₂），sp² 给出平面三角形（如苯），sp³ 给出四面体（如 CH₄）。这些几何来自能量最小化——VSEPR 模型只是粗略的经验规则，真正的答案在 Schrödinger 方程的解里。",
        "离子键、金属键、Van der Waals 力和氢键都可以在同一套量子力学框架下理解。离子键是电子转移后的静电吸引；金属键是电子海模型的量子版本；Van der Waals 力来自瞬时偶极的关联（London 1930 用二阶微扰论给出）；氢键介于共价和静电之间，是水的奇异性质（密度极大值、高比热）的量子根源。",
        "密度泛函理论（DFT, Hohenberg-Kohn 1964, Kohn-Sham 1965）把多电子问题化为电子密度的泛函最小化，计算成本比 Hartree-Fock 低一个数量级，精度却足够化学。今天 DFT 是计算化学和材料科学的主力工具——从药物分子设计到电池材料筛选，从催化机理到表面吸附，都靠它给出第一性原理预测。",
      ],
    },
    {
      heading: "量子化学 · 从 Hartree-Fock 到机器学习势能面",
      body: [
        "量子化学的核心任务是求解多电子 Schrödinger 方程。Hartree-Fock 把每个电子放在其他电子的平均场里运动，忽略电子关联——这是零级近似。post-HF 方法（MP2、CCSD(T)、CASSCF）逐步加回关联能，但计算成本随电子数指数增长：CCSD(T) 被称为「金标准」，对小分子（< 20 个重原子）精度可达 kcal/mol，但对大分子束手无策。",
        "DFT 的成功改变了游戏规则：B3LYP 泛函在 1990 年代让有机化学家第一次能用桌面电脑算反应机理。Jacob's Ladder（Perdew 2001）把泛函分五级：LDA → GGA → meta-GGA → hybrid → RPA，每上一级精度提高但成本也增加。双杂化泛函（如 DSD-PBEP86）和 RPA 已接近 CCSD(T) 精度，成本却低得多。",
        "机器学习势能面（MLP）是最新突破：用 DFT 数据训练神经网络，把第一性原理精度和力场速度结合。ANI（2017）、MACE（2022）、DPA-2（2024）等模型能在 ns 时间尺度上模拟化学反应，精度逼近 DFT。DeepMind 的 GNoME（2023）用图神经网络预测了 220 万种稳定晶体结构——这是人类已知材料数量的 10 倍以上。量子化学正从「算分子」走向「设计分子」。",
        "量子计算对量子化学的冲击还在酝酿中：VQE（变分量子本征求解器）在 NISQ 设备上尝试算 H₂、LiH 等小分子的基态能量，但噪声限制了规模。理论上，容错量子计算机可以用多项式资源精确求解多电子问题——这将彻底改变药物设计和材料发现的范式，但需要百万比特级量子计算机，估计在 2035 年之后。",
      ],
    },
    {
      heading: "分子马达 · 生物化学中的纳米机器",
      body: [
        "生物体内的分子马达是自然界最精密的纳米机器。ATP 合酶（F₁F₀-ATP synthase）是一个旋转马达：质子流驱动 F₀ 部分旋转，带动 F₁ 部分的 γ 亚基每转 120° 合成一个 ATP 分子。转速 ~130 rev/s，效率接近 100%——比任何人造发动机都高。Boyer 和 Walker 因解析其机制获 1997 年 Nobel 化学奖。",
        "驱动蛋白（kinesin）沿微管「行走」，每步 8 nm，消耗一个 ATP，产生 ~6 pN 的力。肌球蛋白（myosin）在肌肉收缩中做类似的工作：每步 ~10 nm，力 ~3–4 pN。这些分子马达的运动机制已被单分子实验（光镊、AFM）详细测量——它们不是弹簧，而是热涨落 + 棘轮势的布朗马达（Brownian ratchet），靠 ATP 水解的自由能打破热力学平衡。",
        "人工分子马达在 2016 年获得 Nobel 化学奖（Feringa）。第一代光驱动分子马达靠紫外光异构化旋转，转速 ~1 kHz；最新设计已能在表面上单向连续旋转，并驱动微米级玻璃管运动。挑战在于把分子马达的无规热运动变成宏观定向运动——这需要层级组装和反馈控制。",
        "分子马达的设计原则正在被应用到纳米机器人和药物递送中。DNA 折纸（DNA origami）可以构建可编程的纳米结构，结合分子马达实现药物的靶向释放。2024 年已有团队演示了 DNA 机器人在活细胞内自主导航、识别癌细胞标记物、释放药物载荷——这是分子生物物理学向临床应用的过渡。分子马达不仅是生物物理的奇观，也是纳米技术的灵感来源。",
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
    {
      label:
        "Anderson et al. 1995 — Observation of Bose-Einstein Condensation in a Dilute Atomic Vapor",
      url: "https://www.science.org/doi/10.1126/science.269.5221.198",
      kind: "paper",
    },
    {
      label: "Chu 1998 — Nobel Lecture: The manipulation of neutral atoms",
      url: "https://www.nobelprize.org/prizes/physics/1997/chu/lecture/",
      kind: "agency",
    },
    {
      label: "Merchant et al. (GNoME) 2023 — Scaling deep learning for materials discovery",
      url: "https://www.nature.com/articles/s41586-023-06735-9",
      kind: "paper",
    },
    {
      label: "Boyer 1997 — Nobel Lecture: Energy, Life, and ATP",
      url: "https://www.nobelprize.org/prizes/chemistry/1997/boyer/lecture/",
      kind: "agency",
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
  discussionQuestions: [
    "元素周期表的列宽（2/6/10/14）由量子力学的 s/p/d/f 轨道容量决定——如果电子的自旋不是 1/2 而是 1，周期表会变成什么样？",
    "光学钟的精度达到宇宙年龄偏差不超过 1 秒——如此精密的测量能用来探测暗物质吗？",
    "ATP 合酶的效率接近 100%——人造发动机为什么做不到？分子马达的设计原则能否启发宏观工程？",
  ],
};

export default content;

import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "P1",
  name: { primary: "热力学与统计力学", latin: "Thermodynamics & Statistical Mechanics" },
  tagline: "随机的优雅",
  whisper: "时间之矢的方向，来自微观状态数的对数——熵把概率写成了物理定律。",
  dataCards: [
    {
      label: "Boltzmann 常数",
      latinLabel: "k_B",
      value: "1.380 649 × 10⁻²³",
      hint: "J / K（精确）",
    },
    { label: "Avogadro 数", latinLabel: "N_A", value: "6.022 × 10²³", hint: "/ mol" },
    { label: "气体常数", latinLabel: "R", value: "8.314", hint: "J / (mol · K)" },
    { label: "绝对零度", latinLabel: "0 K", value: "−273.15", hint: "°C" },
    { label: "熵增定律", value: "dS ≥ 0", hint: "孤立系统熵不减" },
    { label: "卡诺效率", latinLabel: "η_C", value: "1 − T_c / T_h", hint: "理想热机上限" },
    { label: "理想气体方程", value: "pV = nRT", hint: "状态方程" },
    { label: "等分定理", value: "½ k_B T / DoF", hint: "每个自由度的平均能量" },
    {
      label: "Stefan-Boltzmann 常数",
      latinLabel: "σ",
      value: "5.670 374 × 10⁻⁸",
      hint: "W / (m² · K⁴) · 黑体总辐射",
    },
    {
      label: "Wien 位移定律",
      value: "λ_max T = 2.898 × 10⁻³",
      hint: "m · K · 黑体谱峰",
    },
    {
      label: "Onsager 倒易",
      value: "L_ij = L_ji",
      hint: "线性非平衡 · 1931 (Nobel 1968)",
    },
    {
      label: "2D Ising 临界温度",
      value: "k_B T_c / J = 2 / ln(1 + √2)",
      hint: "≈ 2.269 · Onsager 1944 精确解",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 温度即平均能量",
      body: [
        "把房间里所有分子的动能加起来除以分子数，得到的就是「温度」的统计含义。Maxwell-Boltzmann 分布给出在温度 T 下分子速率的概率密度，常温空气分子的均方根速率约 500 m/s。",
        "热永远从高温流向低温——这条经验规则就是热力学第二定律的日常版本。它背后的真相不是力学，而是概率：高熵态的微观实现方式远多于低熵态。",
      ],
    },
    {
      heading: "学院 · 四大定律 + 配分函数",
      body: [
        "零定律定义温度的存在；第一定律 ΔU = Q − W 把热和功一起接到能量守恒里；第二定律 dS ≥ 0 给出过程方向；第三定律 S → 0 (T → 0) 锚定熵的零点。",
        "微正则系综（孤立）用 Ω(E) 数态，正则系综（与热库接触）用配分函数 Z = Σ e^(−βE_i) 求平均，巨正则再加一个 μN。从 Z 出发可以拿到自由能、熵、压强、磁化率，一站式打包。",
        "卡诺循环给出热机效率的理论上限 η_C = 1 − T_c/T_h；任何实际热机都做不过它，且只有可逆过程能取到等号。这把第二定律变成了可工程化的设计约束。",
      ],
    },
    {
      heading: "前沿 · 涨落定理 / 黑洞热力学 / 信息",
      body: [
        "Jarzynski 1997 与 Crooks 1999 把非平衡过程里的功的概率分布与平衡自由能差挂钩——「单分子拉伸」实验实测到了 ΔF。",
        "Bekenstein-Hawking 公式 S = A · k_B c³ / (4 ℏ G) 把黑洞视界面积变成熵，温度 T_H = ℏ c³ / (8 π G M k_B)。这条边界把广义相对论、量子场论与热力学钉在了一起。",
        "Landauer 1961：擦掉 1 比特信息至少耗散 k_B T ln 2 的热——信息有物理代价。这条原理在量子计算与可逆电路里直接变成设计约束。",
      ],
    },
    {
      heading: "相变与临界现象 · 普适类",
      body: [
        "水变冰、铁磁有序、超流相变 —— 在临界点附近，序参量、关联长度、磁化率都按幂律发散。Widom 1965、Kadanoff 1966、Wilson 1971 一系列工作发现：所有这些「不同」相变其实属于少数几个**普适类**，只看维度与对称性，不看微观细节。",
        "Wilson 的重正化群 (RG) 把多尺度物理变成了一套递归方程：在每一步「粗粒化」中，无关项指数衰减，相关项停在固定点。这是 20 世纪后半叶物理学最重要的概念革命之一，影响一直延伸到量子场论 (P7) 与凝聚态拓扑相 (P8)。",
      ],
    },
    {
      heading: "Onsager 关系 · 非平衡的对称",
      body: [
        "把系统稍微推离平衡，热流、粒子流、电流就开始流动，且彼此交叉耦合：温差能驱动电流（Seebeck），电流能搬运热（Peltier）。Onsager 1931 在线性响应区写出方程 J_i = Σ_j L_ij X_j，并基于「微观可逆性」证明耦合矩阵满足 L_ij = L_ji——这条对称把热电、热扩散、化学耦合一并钉在统一的框架里，1968 年因此拿到 Nobel 化学奖。",
        "下一步是 Kubo 公式：把系统的线性响应函数写成平衡涨落的时间关联，χ(ω) = (1/k_BT) ∫ ⟨A(t) Ȧ(0)⟩ e^(iωt) dt。配合涨落-耗散定理 ⟨|x(ω)|²⟩ = (2k_BT / ω) Im χ(ω)，热噪声和耗散就成了同一枚硬币的两面。今天测一根电阻的 Johnson 噪声、一颗光镊里的微珠位移谱、甚至宇宙背景的 B 模偏振，用的都是这条「涨落即响应」的桥。",
      ],
    },
    {
      heading: "Brown 运动 · Langevin → Fokker-Planck",
      body: [
        "1827 年 Robert Brown 在显微镜下看到花粉颗粒在水里乱跳；1905 年爱因斯坦把这种「乱跳」翻译成扩散系数 D = k_B T / (6π η a)（Stokes 半径 a），把分子的真实存在性钉上了实验台——Perrin 1908 据此测出 Avogadro 数。",
        "现代写法分两步。Langevin 1908 给颗粒的牛顿方程外加一个随机力 ξ(t)：m ẍ = −γ ẋ + ξ(t)，⟨ξ(t)ξ(t')⟩ = 2γ k_BT δ(t−t')，把摩擦与噪声用同一个 k_BT 锁死，这正是涨落-耗散的最简版本。把它的概率密度 P(x, t) 写出来就得到 Fokker-Planck 方程 ∂_t P = ∂_x (γ⁻¹ ∂_x V) P + D ∂_x² P，化学反应、神经放电、金融期权定价（Black-Scholes 几乎是它的孪生兄弟）共用同一条方程——「随机」一旦写下，就和确定性一样可算。",
      ],
    },
    {
      heading: "参考文献入口",
      body: [
        "Reif《Fundamentals of Statistical and Thermal Physics》经典本科；Kardar《Statistical Physics of Particles / Fields》两卷研究生级；Landau-Lifshitz Vol 5《Statistical Physics》是俄派标准；Goldenfeld《Lectures on Phase Transitions and the Renormalization Group》给 RG 视角。",
      ],
    },
  ],
  sources: [
    {
      label: "MIT 8.044 Statistical Physics I (OCW)",
      url: "https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/",
      kind: "encyclopedia",
    },
    {
      label: "Wikipedia · Thermodynamics",
      url: "https://en.wikipedia.org/wiki/Thermodynamics",
      kind: "encyclopedia",
    },
    {
      label: "Kardar · Stat Phys lecture notes",
      url: "https://web.mit.edu/8.333/www/",
      kind: "encyclopedia",
    },
    {
      label: "Wilson 1975 — The renormalization group (RMP)",
      url: "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.47.773",
      kind: "paper",
    },
    {
      label: "Onsager 1931 — Reciprocal Relations in Irreversible Processes",
      url: "https://journals.aps.org/pr/abstract/10.1103/PhysRev.37.405",
      kind: "paper",
    },
    {
      label: "Onsager 1944 — Crystal Statistics I (2D Ising exact)",
      url: "https://journals.aps.org/pr/abstract/10.1103/PhysRev.65.117",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "second-law",
      name: { primary: "熵增定律", latin: "Second Law" },
      position: [-0.5, 0, -0.4],
      description:
        "dS ≥ 0。时间之矢的物理根源；Clausius 1865 给出，到今天还是被写得最简练的一条物理定律。",
      data: [
        { label: "等号", value: "可逆过程" },
        { label: "互文", value: "T0 大爆炸 · 低熵开端" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "boltzmann",
      name: { primary: "玻尔兹曼公式", latin: "S = k_B ln W" },
      position: [0.3, 0, -0.5],
      description:
        "熵等于微观状态数对数乘以 k_B。Boltzmann 把概率论搬进了物理学；这一行公式被刻在他维也纳的墓碑上。",
      data: [
        { label: "k_B", value: "1.381 × 10⁻²³ J/K" },
        { label: "年份", value: "1877" },
      ],
      color: "var(--hw-red)",
      size: 0.035,
    },
    {
      id: "carnot-cycle",
      name: { primary: "卡诺循环", latin: "Carnot Cycle" },
      position: [-0.4, 0, 0.5],
      description:
        "两条等温 + 两条绝热，构成理想可逆热机。η_C = 1 − T_c/T_h 给出所有热机的效率上限。",
      data: [
        { label: "构造", value: "isothermal + adiabatic ×2" },
        { label: "年份", value: "1824" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "maxwell-boltzmann",
      name: { primary: "Maxwell-Boltzmann 分布", latin: "Maxwell-Boltzmann" },
      position: [0.5, 0, 0.4],
      description:
        "经典理想气体里分子速率的概率密度：f(v) ∝ v² e^(−mv²/2kT)。给出常温空气分子均方根速率 ~ 500 m/s。",
      data: [
        { label: "形式", value: "Gaussian × v²" },
        { label: "互文", value: "P4 量子 · Bose / Fermi" },
      ],
      color: "var(--hw-gold)",
      size: 0.03,
    },
    {
      id: "partition-function",
      name: { primary: "配分函数", latin: "Partition Function Z" },
      position: [0.6, 0, 0],
      description:
        "Z = Σ e^(−βE_i) 把所有微观态求和——所有热力学量都能从 ln Z 的导数里读出来。统计力学的核心工具。",
      data: [
        { label: "β", value: "1 / k_B T" },
        { label: "互文", value: "Feynman 路径积分形式同源" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "black-hole-entropy",
      name: { primary: "Bekenstein-Hawking 熵", latin: "BH Entropy" },
      position: [-0.6, 0, 0.2],
      description:
        "黑洞的熵正比于视界面积而非体积——把热力学、广相、量子场论一次性拼在一起。全息原理的起点。",
      data: [
        { label: "S", value: "A · k_B c³ / 4 ℏ G" },
        { label: "互文", value: "P8 前沿 · holography" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
  ],
};

export default content;

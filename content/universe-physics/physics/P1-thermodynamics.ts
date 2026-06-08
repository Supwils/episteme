import type { TierContent } from "@/lib/content";

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
      hint: "J / K（精确）· 微观与宏观世界的桥梁常数",
    },
    { label: "Avogadro 数", latinLabel: "N_A", value: "6.022 × 10²³", hint: "/ mol · Perrin 1908 年用 Brown 运动首次测出" },
    { label: "气体常数", latinLabel: "R", value: "8.314", hint: "J / (mol · K) · 理想气体方程的核心参数" },
    { label: "绝对零度", latinLabel: "0 K", value: "−273.15", hint: "°C · 热力学第三定律锚定的熵零点" },
    { label: "熵增定律", value: "dS ≥ 0", hint: "孤立系统熵不减 · 时间之矢的物理根源" },
    { label: "卡诺效率", latinLabel: "η_C", value: "1 − T_c / T_h", hint: "理想热机效率上限 · 1824 年卡诺给出 · 任何实际热机都做不过它" },
    { label: "理想气体方程", value: "pV = nRT", hint: "状态方程 · 把压强、体积、温度、物质量四者关联" },
    { label: "等分定理", value: "½ k_B T / DoF", hint: "每个自由度分配的平均热动能 · 解释了为什么比热是常数" },
    {
      label: "Stefan-Boltzmann 常数",
      latinLabel: "σ",
      value: "5.670 374 × 10⁻⁸",
      hint: "W / (m² · K⁴) · 黑体总辐射功率正比于 T⁴ · 恒星亮度的物理基础",
    },
    {
      label: "Wien 位移定律",
      value: "λ_max T = 2.898 × 10⁻³",
      hint: "m · K · 黑体辐射谱峰波长 · 天文学测恒星表面温度的核心工具",
    },
    {
      label: "Onsager 倒易",
      value: "L_ij = L_ji",
      hint: "线性非平衡的对称关系 · 1931 年证明 · Nobel 1968 · 热电效应的统一框架",
    },
    {
      label: "2D Ising 临界温度",
      value: "k_B T_c / J = 2 / ln(1 + √2)",
      hint: "≈ 2.269 · Onsager 1944 精确解 · 相变理论的里程碑",
    },
    {
      label: "黑洞熵系数",
      value: "S = A · k_B c³ / (4 ℏ G)",
      hint: "Bekenstein-Hawking · 熵正比于视界面积而非体积 · 全息原理的起点",
    },
    {
      label: "Jarzynski 等式",
      value: "⟨e^(−βW)⟩ = e^(−βΔF)",
      hint: "非平衡功与自由能差的精确关系 · 1997 · 把第二定律从不等式升级为等式",
    },
    {
      label: "Landauer 极限",
      value: "k_B T ln 2",
      hint: "擦除 1 比特的最小热耗散 ≈ 3 × 10⁻²¹ J (300 K) · 信息有物理代价",
    },
    {
      label: "Hawking 温度",
      value: "ℏ c³ / (8π G M k_B)",
      hint: "太阳质量黑洞 T_H ≈ 60 nK · 黑洞并不黑 · 把引力、量子、热力学焊在一起",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 温度即平均能量 · 时间之矢",
      body: [
        "你为什么记得过去而不记得未来？这个问题的答案不在心理学，而在热力学——熵增的方向给了时间一个箭头，而熵的本质是概率。",
        "把房间里所有分子的动能加起来除以分子数，得到的就是「温度」的统计含义。Maxwell-Boltzmann 分布给出在温度 T 下分子速率的概率密度，常温空气分子的均方根速率约 500 m/s。",
        "热永远从高温流向低温——这条经验规则就是热力学第二定律的日常版本。它背后的真相不是力学，而是概率：高熵态的微观实现方式远多于低熵态。",
        "时间之矢——为什么我们记得过去而非未来——就藏在这条定律里。微观力学（牛顿或量子）对时间反演完全对称，但宏观的熵增方向给了时间一个箭头。Boltzmann 的洞见是：宇宙从一个极低熵的初始态（大爆炸）出发，熵增是统计上压倒性的趋势，而非绝对禁令。",
        "宇宙的最终命运取决于暗能量（P8）的性质：如果 w = −1（宇宙学常数），宇宙将永远膨胀并趋向「热寂」——最大熵态，所有结构被稀释到虚无。这是热力学第二定律在宇宙学尺度上的终极后果。为什么这很重要？因为熵增不只是「能量变废」的日常直觉——它是宇宙从有序走向无序的根本法则，从蒸汽机到黑洞蒸发，从生命代谢到宇宙终结，无一例外。",
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
        "临界点的特征是关联长度 ξ → ∞：系统在所有尺度上自相似，涨落跨越宏观距离。这就是为什么临界点附近的乳白色液体（临界乳光）——密度涨落的尺度已经到了可见光波长。Ising 模型在 2D 有 Onsager 精确解（1944），3D 至今没有——但重正化群给出的数值已经精确到 6 位有效数字。",
        "Wilson 的重正化群 (RG) 把多尺度物理变成了一套递归方程：在每一步「粗粒化」中，无关项指数衰减，相关项停在固定点。这是 20 世纪后半叶物理学最重要的概念革命之一，影响一直延伸到量子场论 (P7) 与凝聚态拓扑相 (P8)。",
        "普适性的哲学含义深远：水的三相点与磁铁的居里点用同一套临界指数描述——微观细节在 RG 流下被「洗掉」，只剩下维度和对称性。这种「微观无关性」是物理学最反直觉但最有力量的洞见之一。",
      ],
    },
    {
      heading: "Onsager 关系 · 非平衡的对称",
      body: [
        "把系统稍微推离平衡，热流、粒子流、电流就开始流动，且彼此交叉耦合：温差能驱动电流（Seebeck），电流能搬运热（Peltier）。Onsager 1931 在线性响应区写出方程 J_i = Σ_j L_ij X_j，并基于「微观可逆性」证明耦合矩阵满足 L_ij = L_ji——这条对称把热电、热扩散、化学耦合一并钉在统一的框架里，1968 年因此拿到 Nobel 化学奖。",
        "Onsager 关系的证明依赖一个深刻的物理假设：微观时间反演对称。在磁场存在时，L_ij(B) = L_ji(−B)——磁场打破了时间反演，但保留了翻转磁场后的对称。这个修正让 Hall 效应、磁热效应也被纳入同一条框架。",
        "下一步是 Kubo 公式：把系统的线性响应函数写成平衡涨落的时间关联，χ(ω) = (1/k_BT) ∫ ⟨A(t) Ȧ(0)⟩ e^(iωt) dt。配合涨落-耗散定理 ⟨|x(ω)|²⟩ = (2k_BT / ω) Im χ(ω)，热噪声和耗散就成了同一枚硬币的两面。",
        "今天测一根电阻的 Johnson 噪声、一颗光镊里的微珠位移谱、甚至宇宙背景的 B 模偏振，用的都是这条「涨落即响应」的桥。从纳米热电材料到引力波探测器的热噪声极限，Onsager-Kubo 框架无处不在。",
      ],
    },
    {
      heading: "Brown 运动 · Langevin → Fokker-Planck",
      body: [
        "1827 年 Robert Brown 在显微镜下看到花粉颗粒在水里乱跳；1905 年爱因斯坦把这种「乱跳」翻译成扩散系数 D = k_B T / (6π η a)（Stokes 半径 a），把分子的真实存在性钉上了实验台——Perrin 1908 据此测出 Avogadro 数。",
        "爱因斯坦的理论预言：粒子在时间 t 内的均方位移 ⟨x²⟩ = 2Dt（一维）或 6Dt（三维）。Perrin 用显微镜追踪 0.5 μm 的藤黄颗粒，逐帧记录位置，用统计方法提取 D，再代入公式算出 N_A——与气体动力学估计吻合到 10%。这是「原子存在吗」这场持续半个世纪争论的判决性实验。",
        "现代写法分两步。Langevin 1908 给颗粒的牛顿方程外加一个随机力 ξ(t)：m ẍ = −γ ẋ + ξ(t)，⟨ξ(t)ξ(t')⟩ = 2γ k_BT δ(t−t')，把摩擦与噪声用同一个 k_BT 锁死，这正是涨落-耗散的最简版本。",
        "把它的概率密度 P(x, t) 写出来就得到 Fokker-Planck 方程 ∂_t P = ∂_x (γ⁻¹ ∂_x V) P + D ∂_x² P，化学反应、神经放电、金融期权定价（Black-Scholes 几乎是它的孪生兄弟）共用同一条方程——「随机」一旦写下，就和确定性一样可算。",
      ],
    },
    {
      heading: "Maxwell 妖的实验实现 · 信息热力学",
      body: [
        "Maxwell 妖不再是纯思想实验。2007 年日本团队（Toyabe et al.）用一个胶体粒子在「信息棘轮」中首次实现了 Szilard 引擎的实验版本：通过测量粒子位置并施加反馈力，他们把信息转化成了有用功——直接验证了 Landauer 原理的逆过程。2010 年 Bérut et al. 在 Nature 上发表了首个直接测量信息擦除热耗散的实验，用 AFM 悬臂操控微米级聚苯乙烯珠子，测到擦除 1 比特的功正好等于 k_B T ln 2——与 Landauer 1961 年的预言精确吻合。",
        "这些实验把「信息是物理的」从格言变成了可测量的事实。2016 年 Koski et al. 用单电子晶体管实现了量子版本的 Szilard 引擎，证明在量子领域 Landauer 原理依然成立。今天的纳米机器设计、分子马达研究、甚至生物分子机器（如核糖体翻译 mRNA）的热力学分析，全部建立在信息-热力学的基础上。",
        "信息热力学也深刻影响了黑洞物理。Hawking 辐射（1974）预言黑洞会缓慢蒸发，温度 T_H = ℏc³/(8πGMk_B)——一个太阳质量的黑洞温度仅 ~60 nK，远低于宇宙微波背景辐射，所以实际上还在吸热。但微型黑洞（~10¹¹ kg）的温度可达 ~10¹² K，会在宇宙年龄内蒸发殆尽。黑洞蒸发是否保留信息（unitarity）是量子引力最核心的问题之一——这就是黑洞信息悖论。",
        "2019 年 Penington 等人提出「岛屿公式」（island formula），用量子极值面修正了 Hawking 的半经典计算，首次在玩具模型中恢复了 Page 曲线——暗示信息确实被保留，但存储在视界附近的量子纠缠中。这是近年量子引力最令人兴奋的进展之一，直接把热力学、量子信息和引力焊接在一起。",
      ],
    },
    {
      heading: "涨落定理 · 非平衡的精确等式",
      body: [
        "热力学第二定律 dS ≥ 0 是一个不等式——它只告诉我们熵增的方向，不给出精确数值。1990 年代 Evans、Cohen、Morriss 和 Gallavotti、Cohen 独立发现了「涨落定理」：在有限时间的非平衡过程中，观测到熵减小（暂时违反第二定律）的概率与熵增大的概率之比按指数规律衰减——P(−S)/P(+S) ≈ exp(−S/k_B)。这不是违反第二定律，而是精确量化了它的统计本质。",
        "Jarzynski 1997 年把这个洞见变成了一个惊人的等式 ⟨e^(−βW)⟩ = e^(−βΔF)：无论过程多远离平衡、多不可逆，功 W 的指数平均值精确等于平衡自由能差。这条等式在 2002 年被 Liphardt et al. 用光镊拉伸 RNA 分子首次实验验证——单分子实验测到的 ΔF 与平衡态测量吻合到几个百分点。",
        "Crooks 1999 年给出了更精细的版本：正向和逆向过程的功分布满足 P_F(W)/P_R(−W) = exp(β(W−ΔF))。这条等式让「不可逆性」本身变成了可测量的量——通过比较正向和逆向单分子实验的功分布，可以直接提取自由能差，而不需要让系统达到平衡。这对生物分子尤其重要：蛋白质折叠、酶催化、DNA 解旋都是远离平衡的过程。",
        "涨落定理是 21 世纪统计力学最重要的理论突破之一。它把第二定律从不等式升级为等式（Jarzynski 等式是不等式的「精确版」），把非平衡统计力学从定性推向定量。今天的纳米热机设计、分子机器优化、甚至细胞代谢的热力学分析都依赖这些等式。从 Perrin 1908 年的 Brown 运动到 2020 年代的单分子热力学，统计力学的边界一直在向外推。",
      ],
    },
    {
      heading: "Maxwell 妖 · 信息即物理",
      body: [
        "1867 年 Maxwell 想象了一个思想实验：一个微小的「妖」守在容器中间的活门旁，只让快分子从左到右、慢分子从右到左，结果无需做功就把两侧温度拉开——似乎违反了第二定律。这个困扰物理学界一百多年的思想实验，直到 Landauer 和 Bennett 才给出满意的解答。",
        "Landauer 1961 提出「信息擦除原理」：把 1 比特信息重置为 0，至少要向环境耗散 k_B T ln 2 的热。这不是技术限制，是热力学定律对信息处理的硬约束。Bennett 1982 进一步指出：妖要持续工作，必须擦除旧的测量记录，而擦除过程产生的熵恰好抵消了它「分拣」分子所减少的熵。",
        "这条原理把信息和热力学焊在了一起：信息不是抽象的数学对象，它有物理载体（存储器），有热力学代价（擦除耗散），有熵（Shannon 熵与 Boltzmann 熵的对应）。今天量子信息科学（P8）把这条线继续延伸——量子比特的擦除代价是 k_B T ln 2 的量子版本，量子纠错码的热力学极限正在被实验逼近。",
        "Maxwell 妖的思想实验最终告诉我们：第二定律没有被违反，因为信息采集和处理本身就是物理过程。从计算机芯片的散热到黑洞信息悖论（P8），Landauer 原理始终是理解「信息即物理」的关键钥匙。",
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
    {
      label: "Boltzmann 1877 — Über die Beziehung zwischen dem zweiten Hauptsatze (S = k log W)",
      url: "https://en.wikipedia.org/wiki/Boltzmann%27s_entropy_formula",
      kind: "encyclopedia",
    },
    {
      label: "Jarzynski 1997 — Nonequilibrium equality for free energy differences",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.78.2690",
      kind: "paper",
    },
    {
      label: "Bérut et al. 2012 — Experimental verification of Landauer's principle (Nature)",
      url: "https://www.nature.com/articles/nature10872",
      kind: "paper",
    },
    {
      label: "Hawking 1975 — Particle Creation by Black Holes (Comm. Math. Phys.)",
      url: "https://link.springer.com/article/10.1007/BF02345020",
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
  discussionQuestions: [
    '如果时间之矢来自熵增，那么在大爆炸之前的极低熵状态下，「时间」是否有意义？',
    'Maxwell 妖真的被「解决」了吗？Landauer 原理说信息擦除有热耗散——但如果有可逆计算呢？',
    '黑洞熵正比于面积而非体积——这暗示我们的三维宇宙可能是某个二维理论的「全息投影」？这对你理解「现实」有什么影响？',
  ],
};

export default content;

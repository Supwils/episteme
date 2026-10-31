import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P1",
  name: { primary: "热力学与统计力学", latin: "Thermodynamics & Statistical Mechanics" },
  tagline: "随机的优雅",
  whisper: "微观涨落连接宏观热规律；时间方向还需要动力学与初态。",
  dataCards: [
    {
      label: "Boltzmann 常数",
      latinLabel: "k_B",
      value: "1.380 649 × 10⁻²³",
      hint: "J / K（精确）",
    },
    {
      label: "Avogadro 数",
      latinLabel: "N_A",
      value: "6.022 140 76 × 10²³",
      hint: "mol⁻¹（精确）",
    },
    { label: "气体常数", latinLabel: "R", value: "8.314", hint: "J / (mol · K)" },
    { label: "绝对零度", latinLabel: "0 K", value: "−273.15", hint: "°C" },
    { label: "熵增定律", value: "dS ≥ 0", hint: "宏观孤立系统；开放系统须计熵流" },
    {
      label: "卡诺效率",
      latinLabel: "η_C",
      value: "1 − T_c / T_h",
      hint: "两个恒温热浴、循环热机的上限",
    },
    { label: "理想气体方程", value: "pV = nRT", hint: "状态方程" },
    { label: "等分定理", value: "½ k_B T", hint: "经典平衡中每个独立二次项" },
    {
      label: "Stefan-Boltzmann 常数",
      latinLabel: "σ",
      value: "5.670 374 × 10⁻⁸",
      hint: "W / (m² · K⁴) · 黑体总辐射",
    },
    {
      label: "Wien 位移定律",
      value: "λ_max T = 2.898 × 10⁻³",
      hint: "m · K · 按单位波长定义的黑体谱峰",
    },
    {
      label: "Onsager 倒易",
      value: "L_ij = L_ji",
      hint: "近平衡、适当反演条件；1931 / 诺奖1968",
    },
    {
      label: "2D Ising 临界温度",
      value: "k_B T_c / J = 2 / ln(1 + √2)",
      hint: "方格、最近邻铁磁、零外场；≈ 2.269",
    },
    {
      label: "Jarzynski 等式",
      value: "⟨e^(−βW)⟩ = e^(−βΔF)",
      hint: "正则初态；W 为对系统做功；1997",
    },
    {
      label: "Landauer 极限",
      value: "k_B T ln 2",
      hint: "标准等概率比特复位的平均排热；300 K 约2.87 × 10⁻²¹ J",
    },
    {
      label: "Hawking 温度",
      value: "ℏ c³ / (8π G M k_B)",
      hint: "无电荷、无自旋；太阳质量约60 nK",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 温度与随机运动",
      body: [
        "对经典、非相对论理想气体，扣除整体流动后，每粒子平均平动动能是 3k_B T/2；温度不是任意物质的平均能量本身。以 300 K 的氮气为例，均方根速率约 517 m/s，质量不同的气体在同温下有不同速率。",
        "没有其他补偿变化时，宏观热量自发从高温流向低温。第二定律约束完整系统的熵收支；微观统计解释还需要动力学、初态与粗粒化条件，不能仅由高熵态数目多就推出所有时间方向。",
      ],
    },
    {
      heading: "定律 · 先写清系统边界",
      body: [
        "零定律支持温度的定义；对封闭、无其他宏观能量变化的系统，ΔU = Q − W 中 Q 为流入的热，W 为系统对外做功。第二定律对孤立系统给出宏观熵不减；开放系统则必须计入热和物质携带的熵。",
        "第三定律有热定理、零熵和不可及等表述，各有条件。唯一基态的平衡系统可在趋近零温时熵趋零；基态简并或冻结的残余构型不能一律忽略，基态量子涨落也不会因温度降为零而全部消失。",
        "只与两个恒温热浴交换热、完成循环的热机，效率不超过 1 − T_c/T_h；可逆极限取等号。温度必须用开尔文，其他热源、物质流与外部功不能从效率边界中删去。",
      ],
    },
    {
      heading: "系综 · 配分函数与模型条件",
      body: [
        "微正则系综对指定能量壳计数，正则系综在固定温度、体积和粒子数下用 Z = Σ_i exp(−βE_i) 加权；巨正则权重为 exp[−β(E_i−μN_i)]。β = 1/(k_B T)，求和须包含正确态简并与粒子统计。",
        "F = −k_B T ln Z 将微观模型接到平衡热力学，压强、熵和响应可由适当导数获得。系综对同一物理系统是否等价还要看相互作用、约束和热力学极限；有限正则配分函数本身通常光滑，严格奇点需要相应极限。",
      ],
    },
    {
      heading: "相变与临界现象 · 普适性的边界",
      body: [
        "水的凝固、液气临界点与铁磁转变不是同一类相变。连续临界点附近，序参量通常按幂律趋零，关联长度与某些响应可发散；一级转变、BKT 型转变不能照搬同一套幂律。",
        "普适类取决于维度、序参量对称性、相互作用范围及其他相关因素。重正化群在粗粒化后区分增长的相关扰动、衰减的无关扰动与边缘扰动；临界行为由相应固定点和邻域流决定，不能说相关项本身都停在固定点。",
        "1944 年 Onsager 解的是零外场、最近邻方格晶格伊辛模型等明确条件下的问题。各向同性铁磁模型的临界温度为 k_B T_c/J = 2/ln(1+√2)，不是任意二维磁性材料的通用温度。",
      ],
    },
    {
      heading: "近平衡 · 交叉输运与涨落响应",
      body: [
        "在适当选择共轭力与流后，近平衡可写 J_i = Σ_j L_ij X_j。微观可逆性给出有时间反演条件的 Onsager 互易关系；外磁场、旋转和变量的反演奇偶性需要相应推广。索雷效应是温度梯度驱动组分迁移，杜富尔效应是扩散关联的交叉热流。",
        "Kubo 线性响应与涨落—耗散关系把平衡关联函数和小扰动响应联系起来。具体公式依赖可观测量、耦合方式、谱的单双边定义及经典或量子条件；不能把一个位移噪声公式直接当成所有天文偏振、主动介质或远离平衡噪声的解释。",
      ],
    },
    {
      heading: "布朗运动 · 随机模型仍需边界",
      body: [
        "Brown 在 1827 年研究悬浮微粒的运动；Einstein 在 1905 年建立扩散与热运动的定量联系，Perrin 后来用多种方法估计阿伏伽德罗常数。对连续黏性流体中的球形粒子，低雷诺数、无滑移等条件下，Stokes–Einstein 关系为 D = k_B T/(6π ηa)。",
        "一维 Langevin 模型可写 mẍ = −γẋ − V′(x) + ξ(t)，平衡白噪声近似满足 ⟨ξ(t)ξ(t′)⟩ = 2γk_B T δ(t−t′)。过阻尼、恒定摩擦时，相应 Fokker–Planck 方程为 ∂_t P = (1/γ)∂_x[V′(x)P] + D∂_x²P，D = k_B T/γ。",
        "过阻尼极限与含惯性方程并非完全同一方程；位置相关摩擦、有色噪声和非平衡驱动还会改变形式。金融和神经科学也用随机方程，但参数、概率意义及噪声来源必须重新论证，形式相似不证明物理机制相同。",
      ],
    },
    {
      heading: "信息热力学 · 两项实验各自测什么",
      body: [
        "Toyabe 等人 2010 年用基于粒子位置的实时反馈，让布朗粒子沿电场势景观获得自由能，检验推广的 Jarzynski 关系。Bérut 等人 2012 年则测量双阱胶体记忆复位的平均排热，并在慢操作时接近 Landauer 界限；年份与实验任务应分别标明。",
        "等能、无外部相关信息、初始等概率的经典比特可靠复位，在温度 T 热浴中的平均排热下限为 k_B T ln 2。它不是每个逻辑门的固定收费，也不是每条随机轨迹的硬阈值。理想测量、经典复制与反计算可以接近可逆，但空白记忆、控制器及输出资源都应计入循环。",
      ],
    },
    {
      heading: "涨落关系 · 精确等式也有前提",
      body: [
        "Jarzynski 1997 年的等式 ⟨exp(−βW)⟩ = exp(−βΔF)，连接重复驱动中的功统计与两端参数所定义的平衡自由能差。标准形式从指定温度的正则初态出发，W 是对系统做的功；终态不必已平衡，但不能任意删去初态与动力学条件。",
        "Crooks 1999 年给出 P_F(W)/P_R(−W) = exp[β(W−ΔF)]，需要适当的微观反演与正反向协议，并分别准备相应平衡初态。有限数据的指数平均可能受罕见轨迹支配，有抽样偏差；单次负耗散也不意味着稳定循环违反第二定律。",
        "Liphardt 等人 2002 年用单分子 RNA 拉伸检验 Jarzynski 关系。涨落定理有不同对象与适用域，不能把总熵、介质熵、有限时和长时稳态形式都压成同一个没有条件的概率比。",
      ],
    },
    {
      heading: "黑洞热力学 · 半经典的交汇点",
      body: [
        "四维广义相对论的半经典黑洞熵为 S = k_B A c³/(4ℏG)。对不带电、不旋转的 Schwarzschild 黑洞，T_H = ℏc³/(8πGMk_B)，太阳质量对应约 60 nK。温度公式的这个简洁形式不能直接套到任意旋转或带电黑洞。",
        "Bekenstein 的 1973 年工作与 Hawking 的 1974—1975 年辐射计算逐步建立联系。黑洞蒸发、辐射相关性与量子引力中的信息问题仍需更完整理论；不能把模型中的 Page 曲线计算当成真实天体信息保存的直接测量。",
      ],
    },
    {
      heading: "继续阅读",
      body: [
        "先从热力学定律、统计力学与玻尔兹曼分布理解边界和系综，再读相变、自由能、非平衡态与麦克斯韦妖。下方列出作者讲义、标准定义和原论文，可据此逐项核对模型、实验年份与适用条件。",
      ],
    },
  ],
  sources: [
    {
      label: "BIPM · SI 定义常数",
      url: "https://www.bipm.org/en/measurement-units/si-defining-constants",
      kind: "agency",
    },
    {
      label: "Tong · Statistical Physics 作者讲义",
      url: "https://www.damtp.cam.ac.uk/user/tong/statphys.html",
      kind: "encyclopedia",
    },
    {
      label: "Wilson 1975 · 重正化群与临界现象",
      url: "https://doi.org/10.1103/RevModPhys.47.773",
      kind: "paper",
    },
    {
      label: "Onsager 1931 · 不可逆过程互易关系 I",
      url: "https://doi.org/10.1103/PhysRev.37.405",
      kind: "paper",
    },
    {
      label: "Onsager 1944 · 方格伊辛模型零场解",
      url: "https://doi.org/10.1103/PhysRev.65.117",
      kind: "paper",
    },
    {
      label: "Toyabe 等 2010 · 信息反馈与自由能",
      url: "https://doi.org/10.1038/nphys1821",
      kind: "paper",
    },
    {
      label: "Bérut 等 2012 · 记忆复位的平均排热",
      url: "https://doi.org/10.1038/nature10872",
      kind: "paper",
    },
    {
      label: "Bennett 1982 · 计算热力学",
      url: "https://fab.cba.mit.edu/classes/862.22/notes/computation/Bennett-1982.pdf",
      kind: "paper",
    },
    {
      label: "Jarzynski 1997 · 非平衡功等式",
      url: "https://doi.org/10.1103/PhysRevLett.78.2690",
      kind: "paper",
    },
    {
      label: "Crooks 1999 · 熵产生与功分布",
      url: "https://doi.org/10.1103/PhysRevE.60.2721",
      kind: "paper",
    },
    {
      label: "Liphardt 等 2002 · RNA 拉伸实验",
      url: "https://doi.org/10.1126/science.1071152",
      kind: "paper",
    },
    {
      label: "Hawking 1975 · 黑洞粒子产生",
      url: "https://doi.org/10.1007/BF02345020",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "second-law",
      name: { primary: "熵增定律", latin: "Second Law" },
      position: [-0.5, 0, -0.4],
      description:
        "对宏观孤立系统，熵不减；开放系统须同时计算边界熵流与内部熵产生。统计时间方向还涉及初态与动力学。",
      data: [
        { label: "适用边界", value: "孤立系统，或完整熵收支" },
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
        "指定宏观态的可及微观态数或归一化相空间体积决定玻尔兹曼熵；计数需要明确能量壳与约束。",
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
        "两条等温和两条可逆绝热构成卡诺循环。η_C = 1 − T_c/T_h 是相同两恒温热浴间循环热机的效率上限。",
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
        "正则配分函数按 exp(−βE_i) 对模型的微观态加权；给定哈密顿量和约束后，可由自由能计算相应平衡响应。",
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
        { label: "S", value: "k_B A c³ / (4ℏG)" },
        { label: "互文", value: "P8 前沿 · holography" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
  ],
};

export default content;

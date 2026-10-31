import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "P3",
  name: { primary: "相对论", latin: "Relativity" },
  tagline: "时空就是几何",
  whisper: "爱因斯坦 1905 把同时性击碎，1915 又把引力还原成时空的曲率。",
  dataCards: [
    { label: "真空光速", latinLabel: "c", value: "299 792 458", hint: "m / s（精确）" },
    { label: "Lorentz 因子", latinLabel: "γ", value: "1 / √(1 − β²)", hint: "β = v / c" },
    {
      label: "Schwarzschild 半径",
      latinLabel: "r_s",
      value: "2GM / c²",
      hint: "无自旋、无电荷黑洞的视界面积半径",
    },
    { label: "Newton 引力常数", latinLabel: "G", value: "6.674 × 10⁻¹¹", hint: "N · m² / kg²" },
    {
      label: "GPS 时钟修正",
      value: "≈ 38 μs / 天",
      hint: "典型轨道卫星钟相对地球大地水准面钟的净快率",
    },
    { label: "GW150914 信号", value: "约 0.2 s", hint: "2015 年探测 · 2016 年发表 · LIGO 频带内" },
    { label: "M87* 亮环角直径", value: "42 ± 3 μas", hint: "EHT · 2017 年观测，2019 年发表" },
    { label: "Sgr A* 亮环角直径", value: "51.8 ± 2.3 μas", hint: "EHT 2022 · 68% 可信区间" },
    {
      label: "弱等效原理检验",
      latinLabel: "η",
      value: "η(Ti, Pt) ≈ −1.5 × 10⁻¹⁵",
      hint: "2022 · 统计 ±2.3、系统 ±1.5，均以 10⁻¹⁵ 为单位",
    },
    {
      label: "Pound-Rebka 红移",
      value: "Δν / ν ≈ 2.5 × 10⁻¹⁵",
      hint: "1960 年实验报告 · 哈佛塔约 22.5 m 高度差",
    },
    {
      label: "GW150914 总辐射",
      value: "≈ 3 M☉ c²",
      hint: "由并合波形推断的总辐射能量",
    },
    {
      label: "GW170817 与伽马暴",
      value: "Δt = 1.74 ± 0.05 s",
      hint: "GRB 170817A 晚于引力波并合时刻到达",
    },
    {
      label: "Sgr A* 质量",
      value: "约 4 × 10⁶ M☉",
      hint: "银河系中心 · 与恒星轨道及 EHT 模型推断相容",
    },
    {
      label: "GW170817 传播速度检验",
      value: "−3 × 10⁻¹⁵ 至 +7 × 10⁻¹⁶",
      hint: "(v_GW − c) / c · 依赖源处发射时差假设",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 怎样判断两地同时",
      body: [
        "1905 年爱因斯坦从相对性原理和真空光速不变出发，重新定义了远处时钟的同步。若两个事件在火车坐标系中同时、却发生在不同位置，地面惯性系赋给它们的时间通常不同。这是扣除光传播时间后的坐标判断；眼睛先收到哪束光还取决于观察者的位置。由同一套变换还能得到时间膨胀、长度收缩和静止能量 E₀ = mc²。",
      ],
    },
    {
      heading: "学院 · Minkowski 与 Lorentz 群",
      body: [
        "Minkowski 把时间与空间放进四维几何。采用负号在时间项的约定，平直时空的间隔 ds² = −c²dt² + dx² + dy² + dz² 在惯性坐标变换下不变。光锥内是可由低于光速的运动连接的事件，锥面对应光的传播，锥外事件无法与原点建立亚光速因果联系。",
        "Lorentz 变换保持这一间隔。电场与磁场共同组成反对称的电磁场张量 F；Maxwell 方程需要带电流源的一组和无磁单极子、Faraday 定律对应的齐次一组，不能只用一个带源方程包办。变换混合电磁分量，物理规律的形式保持一致。",
        "对静质量 m 非零的自由粒子，p = γmv、E = γmc²，满足 E² = p²c² + m²c⁴。光子的静质量为零，满足 E = pc；λ = h/p 则把粒子动量与量子波长联系起来。",
      ],
    },
    {
      heading: "学院 · 广义相对论 · 弯曲时空",
      body: [
        "在足够小的自由落体实验室中，可以消去引力对局部非引力实验的一阶影响；跨越有限区域的潮汐效应仍能测出。等效原理提供了几何化引力的线索，还需要场方程决定几何怎样响应能量动量。",
        "Einstein 场方程可写为 G_μν + Λg_μν = (8πG/c⁴)T_μν，Λ 是宇宙学常数。不计其他力的小试验物体沿时空测地线运动，压力和能量流也属于引力源。曲率涉及四维时空，橡皮膜的凹陷只能帮助想象一小部分空间几何。",
        "Einstein 在 1915 年已算出水星近日点每世纪约 43 角秒的额外进动。Schwarzschild 1916 年给出的球对称真空解描述球形天体的外部；当它用于无自旋、无电荷黑洞时，r = 2GM/c² 是视界。Kerr 解描述旋转黑洞，FLRW 度规用于均匀、各向同性的宇宙模型。",
      ],
    },
    {
      heading: "前沿 · GW · EHT · 量子引力",
      body: [
        "2015 年 9 月，LIGO 的 Hanford 与 Livingston 两台探测器记录了 GW150914，论文发表于 2016 年。EHT 在 2017 年取得 M87* 与 Sgr A* 的观测数据，分别于 2019、2022 年发表首批图像结果。亮环和中央亮度凹陷支持黑洞附近的强引力模型；它们的尺寸还受吸积等离子体和成像分析影响，不能宣称已经把 Kerr 几何所有性质检验到 1%。",
        "把引力与量子理论统一仍是开放问题。弦论、圈量子引力、渐近安全等方向各有研究方案；黑洞信息和全息对偶也提供了理论线索。这些方案的适用范围与可检验预言仍需逐项研究。",
      ],
    },
    {
      heading: "GR 经过的实验场",
      body: [
        "从水星轨道、太阳附近的光偏折到原子钟，相对论面对的是多种条件下的独立测量。Pound–Rebka 于 1960 年报告约 22.5 米高度差上的引力频移。Cassini 无线电实验在 2003 年给出 PPN 参数 γ − 1 = (2.1 ± 2.3) × 10⁻⁵；这里的 γ 衡量空间曲率效应，和狭义相对论的 Lorentz 因子同名而含义不同。",
        "MICROSCOPE 的 2022 年结果为 η(Ti, Pt) = [−1.5 ± 2.3（统计）± 1.5（系统）] × 10⁻¹⁵，没有发现钛、铂合金试验质量的自由落体加速度差。双脉冲星 2021 年分析把引力波四极辐射预言检验到约 0.013%（95% 置信水平）。这些结果各自约束特定参数、材料和环境；测量与 GR 相容仍为更高精度的检验留下空间。",
      ],
    },
    {
      heading: "从候选警报到多信使观测",
      body: [
        "引力波观测的实时候选警报需要经过背景估计和离线分析，才能进入可靠事件目录，数量不能混用。GW230529 在 2023 年 5 月 29 日由 LIGO Livingston 探测，2024 年公布：两个天体的质量分别约为 2.5–4.5 和 1.2–2.0 个太阳质量（90% 可信区间）。较重者落在以往样本稀少的质量区间；引力波数据本身没有无歧义地确定两者各是黑洞还是中子星。",
        "GW170817 的引力波与 GRB 170817A 相隔 1.74 ± 0.05 秒到达，随后多波段观测揭示了千新星。这确立了双中子星并合产生短伽马暴的一条渠道，并支持并合抛射物中的快速中子俘获核合成。在原论文采用的源处发射时差假设下，(v_GW − c)/c 被限制在约 −3 × 10⁻¹⁵ 至 +7 × 10⁻¹⁶。LISA 将把观测扩展到毫赫兹频段；ESA 的任务表列出约 2035 年的计划发射时间，进度仍可能调整。",
      ],
    },
    {
      heading: "EHT 银河系中心 · Sgr A* 与黑洞阴影",
      body: [
        "Sgr A* 的 EHT 亮环直径为 51.8 ± 2.3 微角秒（68% 可信区间），与约 400 万太阳质量的银河系中心黑洞模型相容。这个亮环是被弯折的等离子体辐射形成的，不能直接当作事件视界轮廓。源在小时以内的变化给成像带来困难，研究者需要联合考虑时间变化、散射和阵列采样。",
        "2024 年公布的偏振图像进一步约束了发光区的磁场结构。图上短线标出的是偏振方向，其与磁场的联系需要辐射模型；与 M87* 的相似性提示了可能的喷流机制，尚不能当作已直接发现 Sgr A* 喷流。增加地面站、带宽和观测频率，有望改善成像并研究吸积流的时间变化。",
      ],
    },
    {
      heading: "双生子佯谬 · 比较两条世界线",
      body: [
        "一个孪生子留在理想惯性实验室，另一个高速往返，两人在同一地点重逢时可以有不同年龄。单用「彼此都看对方运动」无法比较整段旅程，因为往返者不能始终使用同一个惯性坐标系。",
        "在平直时空中沿各自世界线积累本征时 τ = ∫√(1 − v²/c²)dt，便能直接比较两只钟。连接同一对类时事件的惯性直世界线积累的本征时最大；年龄差由完整路径决定，加速度的大小本身不是统一的时钟变慢公式。Hafele–Keating 在 1971 年让铯钟随民航飞机东西向环球飞行，1972 年发表观测，结果与同时计入运动和引力势差的预言相容。",
      ],
    },
    {
      heading: "测地线偏离 · 把引力翻译成潮汐",
      body: [
        "一个自由落体电梯里的乘客可以失重，相邻自由落体物体的间距仍可能改变。地球附近，径向的引力强度变化和不同方向的会聚共同产生潮汐。测地线偏离方程用 Riemann 曲率描述这种相对加速度；它体现了一个局部惯性系无法在有限区域内消除的引力效应。",
        "引力波经过干涉仪时，两条正交臂对同一波产生不同的长度响应。以垂直入射的加偏振波为例，一条伸长时另一条缩短；h 约为 10⁻²¹、臂长 L = 4 千米时，差分长度变化的量级 hL 约为 4 × 10⁻¹⁸ 米。实际响应还取决于来波方向、偏振和仪器频率特性。",
      ],
    },
  ],
  sources: [
    {
      label: "Carroll 1997 · Lecture Notes on General Relativity（时空、曲率与黑洞）",
      url: "https://arxiv.org/abs/gr-qc/9712019",
      kind: "paper",
    },
    {
      label: "Einstein Papers Project · 1915 年水星进动计算与场方程的发表次序",
      url: "https://www.einstein.caltech.edu/news/one-hundred-years-of-einsteins-field-equations-and-of-the-explanation-of-mercurys-perihelion",
      kind: "agency",
    },
    {
      label: "Ashby 2003 · Relativity in the Global Positioning System",
      url: "https://doi.org/10.12942/lrr-2003-1",
      kind: "paper",
    },
    {
      label: "Will 2014 · The Confrontation between General Relativity and Experiment",
      url: "https://arxiv.org/abs/1403.7377",
      kind: "paper",
    },
    {
      label: "Pound & Rebka 1960 · Apparent Weight of Photons",
      url: "https://doi.org/10.1103/PhysRevLett.4.337",
      kind: "paper",
    },
    {
      label: "MICROSCOPE 2022 · 弱等效原理最终结果及统计、系统误差",
      url: "https://doi.org/10.1103/PhysRevLett.129.121102",
      kind: "paper",
    },
    {
      label: "Kramer et al. 2021 · Strong-field Gravity Tests with the Double Pulsar",
      url: "https://arxiv.org/abs/2112.06795",
      kind: "paper",
    },
    {
      label:
        "LIGO / Virgo 2016 · Observation of Gravitational Waves from a Binary Black Hole Merger",
      url: "https://doi.org/10.1103/PhysRevLett.116.061102",
      kind: "paper",
    },
    {
      label: "LIGO / Virgo / Fermi / INTEGRAL 2017 · GW170817 and GRB 170817A",
      url: "https://dcc.ligo.org/P1700308/public",
      kind: "paper",
    },
    {
      label: "LVK 2024 · GW230529：质量区间与天体类型的不确定性",
      url: "https://dcc.ligo.org/P2300352/public",
      kind: "paper",
    },
    {
      label: "EHT 2019 · First M87 Results I（42 ± 3 μas 亮环）",
      url: "https://doi.org/10.3847/2041-8213/ab0ec7",
      kind: "paper",
    },
    {
      label: "EHT 2022 · First Sagittarius A* Results I（亮环与中央亮度凹陷）",
      url: "https://doi.org/10.3847/2041-8213/ac6674",
      kind: "paper",
    },
    {
      label: "EHT 2024 · Sgr A* 偏振观测及磁场结构的解释",
      url: "https://eventhorizontelescope.org/blog/astronomers-unveil-strong-magnetic-fields-spiraling-edge-milky-way%E2%80%99s-central-black-hole",
      kind: "agency",
    },
    {
      label: "Hafele & Keating 1972 · Observed Relativistic Time Gains",
      url: "https://doi.org/10.1126/science.177.4044.168",
      kind: "paper",
    },
    {
      label: "ESA · LISA factsheet（任务与计划时间）",
      url: "https://www.esa.int/Science_Exploration/Space_Science/LISA/LISA_factsheet",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "lorentz-transform",
      name: { primary: "Lorentz 变换", latin: "Lorentz Transform" },
      position: [-0.6, 0, -0.4],
      description:
        "保光速不变的时空变换。t' = γ(t − vx/c²)，x' = γ(x − vt)。时间膨胀与长度收缩都从这两行公式出来。",
      data: [
        { label: "γ", value: "1 / √(1 − β²)" },
        { label: "年份", value: "1905" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "mass-energy",
      name: { primary: "质能关系", latin: "E₀ = mc²" },
      position: [0.3, 0, -0.6],
      description: "静止能量 E₀ = mc²；完整能量动量关系为 E² = p²c² + m²c⁴，其中 m 是静质量。",
      data: [
        { label: "完整", value: "E² = (pc)² + (mc²)²" },
        { label: "互文", value: "P6 核 · 结合能" },
      ],
      color: "var(--hw-red)",
      size: 0.04,
    },
    {
      id: "einstein-field",
      name: { primary: "Einstein 场方程", latin: "Einstein Field Equations" },
      position: [0.5, 0, 0.3],
      description: "G_μν = 8πG/c⁴ · T_μν。左边几何，右边能量动量；广义相对论的核心。",
      data: [
        { label: "年份", value: "1915" },
        { label: "互文", value: "P8 前沿 · 量子引力" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
    {
      id: "schwarzschild",
      name: { primary: "Schwarzschild / 黑洞", latin: "Schwarzschild" },
      position: [-0.5, 0, 0.5],
      description:
        "球对称真空解（1916）；用于无自旋、无电荷黑洞时，r = 2GM/c² 是视界面积半径。EHT 图像来自视界附近的发光等离子体。",
      data: [
        { label: "r_s", value: "2GM / c²" },
        { label: "Sgr A* M", value: "约 4 × 10⁶ M☉" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "gravitational-waves",
      name: { primary: "引力波", latin: "Gravitational Waves" },
      position: [0.6, 0, -0.1],
      description:
        "GR 中以真空光速传播的时空扰动。GW150914 在 LIGO 频带内约 0.2 秒，含双黑洞的旋近、并合与铃宕。",
      data: [
        { label: "h", value: "~ 10⁻²¹" },
        { label: "Nobel", value: "2017" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "cosmology",
      name: { primary: "FLRW · 膨胀宇宙学", latin: "FLRW Cosmology" },
      position: [-0.4, 0, 0.6],
      description:
        "用于大尺度均匀、各向同性宇宙的时空度规；结合场方程、物质成分与观测建立膨胀模型。CMB 的详细性质还需热史与扰动理论。",
      data: [
        { label: "尺度因子", value: "a(t)" },
        { label: "互文", value: "T0 可见宇宙" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
  ],
};

export default content;

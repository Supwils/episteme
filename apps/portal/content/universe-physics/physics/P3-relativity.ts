import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "P3",
  name: { primary: "相对论", latin: "Relativity" },
  tagline: "时空就是几何",
  whisper: "爱因斯坦 1905 把同时性击碎，1915 又把引力还原成时空的曲率。",
  dataCards: [
    { label: "真空光速", latinLabel: "c", value: "299 792 458", hint: "m / s（精确）" },
    { label: "Lorentz 因子", latinLabel: "γ", value: "1 / √(1 − β²)", hint: "β = v / c" },
    { label: "Schwarzschild 半径", latinLabel: "r_s", value: "2GM / c²", hint: "黑洞视界" },
    { label: "Newton 引力常数", latinLabel: "G", value: "6.674 × 10⁻¹¹", hint: "N · m² / kg²" },
    { label: "GPS 时钟修正", value: "≈ 38 μs / 天", hint: "若不修正每天偏 ~11 km" },
    { label: "GW150914 信号", value: "约 250 ms", hint: "首例引力波 2015" },
    { label: "M87* 视界角直径", value: "≈ 42 μas", hint: "事件视界望远镜 2019" },
    { label: "宇宙年龄", value: "13.8 × 10⁹", hint: "yr · Planck 2018" },
    {
      label: "等效原理违反上限",
      latinLabel: "η",
      value: "< 2 × 10⁻¹⁵",
      hint: "MICROSCOPE 卫星 2022",
    },
    {
      label: "Pound-Rebka 红移",
      value: "Δν / ν ≈ 2.5 × 10⁻¹⁵",
      hint: "1959 · 哈佛塔 22.5 m 高度差",
    },
    {
      label: "GW150914 总辐射",
      value: "≈ 3 M☉ c²",
      hint: "21 ms 内以引力波形式释放",
    },
    {
      label: "LIGO O4 事件数",
      value: "≥ 200+",
      hint: "2023–2025 观测期 · 引力波天文学常态化",
    },
    {
      label: "Sgr A* 质量",
      value: "4.0 × 10⁶ M☉",
      hint: "EHT 2022 · 银河系中心黑洞阴影",
    },
    {
      label: "GW170817 中子星并合",
      value: "Δv_GW / c < 10⁻¹⁵",
      hint: "引力波速度与光速偏差上限 · 2017",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 同时性是相对的",
      body: [
        "1905 年爱因斯坦只用两条公设——所有惯性系物理定律相同、光速在所有惯性系里都是 c——就推出了时间膨胀、长度收缩、E = mc²。",
        "「同时」在不同惯性系里指的不是同一件事：火车上同时发生的两件事，地面观察者会先看到一件再看到另一件。这是相对论击穿牛顿直觉的第一刀。",
      ],
    },
    {
      heading: "学院 · Minkowski 与 Lorentz 群",
      body: [
        "Minkowski 1908 把时间与空间合在一起：四维时空里两点的「间隔」ds² = −c² dt² + dx² + dy² + dz² 在所有惯性系不变。光锥把因果未来 / 因果过去 / 别处分开。",
        "Lorentz 变换是保 ds² 不变的线性变换；构成一个群（Lorentz group），把 Maxwell 方程组写成协变形式只用一行 ∂_μ F^μν = μ₀ J^ν。电磁场被自然嵌入 4-tensor。",
        "动量 p = γmv，能量 E = γmc²，二者满足 E² = (pc)² + (mc²)²。外推到光子（m=0）就得到 E = pc，对应德布罗意波 λ = h/p。",
      ],
    },
    {
      heading: "学院 · 广义相对论 · 弯曲时空",
      body: [
        "等效原理：自由落体的人感觉不到引力——加速参考系与引力场局部不可区分。把这条原理推到极致就得到广义相对论：引力不是力，是时空的弯曲。",
        "Einstein 1915 场方程 G_μν = 8π G/c⁴ · T_μν：左边几何（Ricci 张量构成），右边物质能量动量；测地线代替了牛顿引力线，行星轨道是弯曲时空里的「直线」。",
        "Schwarzschild 1916 给出第一个精确解，预言黑洞与水星近日点进动（每世纪 43 角秒）；后来还有 Kerr（自旋黑洞）、FLRW（膨胀宇宙学）、引力波（弱场近似下的波动解）。",
      ],
    },
    {
      heading: "前沿 · GW · EHT · 量子引力",
      body: [
        "LIGO/Virgo 2015 直接探测到双黑洞并合的引力波，验证了 GR 的强场预言；EHT 2019 拍到 M87* 与 2022 拍到 Sgr A* 的黑洞阴影，与 Kerr 解吻合到 1% 量级。",
        "量子引力仍未完成：弦论、圈量子引力（LQG）、渐近安全引力是主要方向；黑洞信息悖论、AdS/CFT 全息、ER=EPR 是当下最活跃的桥梁。",
      ],
    },
    {
      heading: "GR 经过的实验场",
      body: [
        "GR 在 110 年里被一轮轮越来越精的实验逼近：水星近日点进动 43″/世纪、星光经过太阳的偏转 1.75″（Eddington 1919）、引力红移（Pound-Rebka 1959）、Shapiro 延迟（Cassini 探测器 2003，γ−1 < 2 × 10⁻⁵）、双脉冲星 PSR J0737-3039 的轨道衰减与 GR 预测吻合到 0.05%。",
        "强场测试现在由 GW + EHT 主导：GW170817 双中子星并合给出 ΔvGW − c / c < 10⁻¹⁵，把许多修正引力理论一次性扼杀；LIGO 的 O4 (2023-2025) 已经累积 200+ 事件，群体统计开始限制 black-hole 形成通道。GR 没有一处可量化的偏离 —— 这本身就是悬念，因为我们知道它不可能是终极理论。",
      ],
    },
    {
      heading: "LIGO O4 · 引力波天文学的新时代",
      body: [
        "LIGO/Virgo/KAGRA 的第四次观测（O4，2023–2025）标志着引力波天文学从「首次探测」走向「常规观测」。O4 期间累积了超过 200 个确认事件，包括双黑洞并合、双中子星并合和黑洞-中子星并合。GW230529（2024 年公布）是一个特别有趣的事件：一颗 ~3.6 M☉ 的天体与一颗 ~1.4 M☉ 的中子星并合，3.6 M☉ 的伴星质量落在「质量间隙」中。",
        "引力波天文学的另一个突破是「多信使天文学」的成熟。GW170817（2017）是里程碑：LIGO/Virgo 探测到双中子星并合后 1.7 秒，Fermi 卫星探测到伽马射线暴，随后全球 70+ 个望远镜观测到光学暂现源。这次事件确认了双中子星并合是短伽马射线暴和重元素（金、铂）的来源。下一步是 LISA（预计 2035 年发射），将在太空探测 mHz 频段引力波。",
      ],
    },
    {
      heading: "EHT 银河系中心 · Sgr A* 与黑洞阴影",
      body: [
        "事件视界望远镜（EHT）在 2019 年拍摄了 M87* 的第一张黑洞阴影照片后，2022 年 5 月公布了银河系中心超大质量黑洞 Sgr A* 的图像。Sgr A* 的质量约 400 万太阳质量，距离仅 26000 光年，角直径约 52 微角秒。Sgr A* 的成像比 M87* 困难得多：变化时标仅 ~10 分钟（M87* ~数天）。",
        "2024 年 EHT 发布了 Sgr A* 的偏振图像，揭示了黑洞周围的磁场结构——螺旋形的磁场线与 M87* 的喷流形成机制高度一致。下一代 EHT（ngEHT）计划增加更多天线和太空基线，目标是拍摄「黑洞电影」——实时观测吸积流的轨道运动。结合 LISA 的引力波数据，我们将首次同时用电磁波和引力波「看」同一个黑洞系统。",
      ],
    },
    {
      heading: "双生子佯谬 · 加速参考系的不对称",
      body: [
        "两个孪生子，一个留在地球，一个乘 0.99c 火箭往返。狭义相对论预言两人重逢时旅行者更年轻——但既然「运动是相对的」，为何不能换个视角说留下的那个更年轻？这就是 1911 年 Langevin 提的双生子佯谬。",
        "解开它的关键是「对称性其实早被打破」：留下者一直在惯性系，而旅行者必须减速、掉头、加速才能回来，这段非惯性段在 Minkowski 图上把他的世界线变成折线。沿世界线积分本征时 τ = ∫ √(1 − v²/c²) dt，折线版总是短于直线版（注意 Minkowski 几何里直线是「最长」），所以年龄差是几何事实而非视角错觉。1971 年 Hafele-Keating 把铯钟绑上民航飞机绕地球东向、西向各飞一圈，测到与 SR + GR 联合预言吻合到几十纳秒——双生子佯谬不再是脑实验。",
      ],
    },
    {
      heading: "测地线偏离 · 把引力翻译成潮汐",
      body: [
        "等效原理只在「局域」成立：一个自由落体的电梯里你确实失重，但电梯顶板和底板感受到的引力方向略有不同——这种不可消除的剩余就是潮汐力。GR 的语言是测地线偏离方程 D²ξ^μ/Dτ² = −R^μ_{ανβ} u^α u^β ξ^ν，把潮汐力直接翻译成 Riemann 曲率张量在两条邻近测地线之间的「拉伸」。",
        "这是引力波探测器的物理原理：经过 LIGO 干涉臂的引力波本质上是一阵周期性的潮汐力，把两条臂以 h × L ~ 10⁻¹⁸ m 的振幅相反挤压。同一条方程在另一个方向上解释了 Roche 极限：当卫星走到主星 r < 1.26 (ρ_M/ρ_m)^(1/3) R_M 时，潮汐力超过自身引力，卫星被撕成环——土星环、Shoemaker-Levy 9 与黑洞 TDE 都是这条几何句子的不同语调。",
      ],
    },
  ],
  sources: [
    {
      label: "Carroll · Lecture Notes on General Relativity",
      url: "https://arxiv.org/abs/gr-qc/9712019",
      kind: "paper",
    },
    {
      label: "LIGO Scientific Collaboration",
      url: "https://www.ligo.org/",
      kind: "agency",
    },
    {
      label: "Wikipedia · General relativity",
      url: "https://en.wikipedia.org/wiki/General_relativity",
      kind: "encyclopedia",
    },
    {
      label: "Will 2014 — The Confrontation between GR and Experiment",
      url: "https://arxiv.org/abs/1403.7377",
      kind: "paper",
    },
    {
      label: "Pound & Rebka 1960 — Apparent Weight of Photons",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.4.337",
      kind: "paper",
    },
    {
      label: "MICROSCOPE 2022 — Equivalence Principle to 2e−15",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.129.121102",
      kind: "paper",
    },
    {
      label: "EHT Collaboration 2022 — First Sagittarius A* Event Horizon Telescope Results",
      url: "https://iopscience.iop.org/journal/2041-8205/page/Focus_Issue_EHT_Sgr_A",
      kind: "paper",
    },
    {
      label: "LISA Consortium — Laser Interferometer Space Antenna (ESA/NASA)",
      url: "https://lisa.nasa.gov/",
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
      name: { primary: "质能关系", latin: "E = mc²" },
      position: [0.3, 0, -0.6],
      description: "静质量蕴含的能量；核反应与对撞机能量预算的基础。完整版 E² = (pc)² + (mc²)²。",
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
        "第一个精确解（1916）。r = 2GM/c² 是事件视界，光也无法逃逸。被 EHT 2019 直接拍到。",
      data: [
        { label: "r_s", value: "2GM / c²" },
        { label: "Sgr A* M", value: "~ 4.3 × 10⁶ M☉" },
      ],
      color: "var(--hw-blue)",
      size: 0.035,
    },
    {
      id: "gravitational-waves",
      name: { primary: "引力波", latin: "Gravitational Waves" },
      position: [0.6, 0, -0.1],
      description:
        "时空的横向涟漪，速度等于 c。GW150914 是首次直接探测——两个黑洞合并发出的几百毫秒信号。",
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
        "对均匀各向同性宇宙的 GR 解。Hubble-Lemaître 定律与 CMB 都从这里来；ΛCDM 给出 ~13.8 Gyr 宇宙年龄。",
      data: [
        { label: "H₀", value: "~ 67–73 km/s/Mpc" },
        { label: "互文", value: "T0 可见宇宙" },
      ],
      color: "var(--hw-gold)",
      size: 0.04,
    },
  ],
};

export default content;

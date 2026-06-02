import type { TierContent } from "@/lib/content";

/**
 * Cross-domain links for this tier (see @universe/content cross-links):
 *   → philosophy/phenomenology: 时空观的哲学讨论
 *   → human-history/einstein: 爱因斯坦提出狭义与广义相对论
 */

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
      label: "LIGO 臂长",
      value: "4 km",
      hint: "Fabry-Pérot 干涉仪 · 灵敏度 ~10⁻²¹",
    },
    {
      label: "GW 天文事件数",
      value: "200+",
      hint: "LIGO-Virgo-KAGRA O1–O4 · 截至 2025",
    },
    {
      label: "GW170817 中子星并合",
      value: "≈ 0.05 M☉ r-process",
      hint: "首次多信使 · 重元素合成确认",
    },
    {
      label: "中子星并合",
      latinLabel: "Neutron star merger",
      value: "GW170817",
      hint: "首次多信使天文学事件 · 引力波 + 电磁波",
    },
  ],
  narrative: [
    {
      heading: "直觉 · 同时性是相对的",
      body: [
        "1905 年爱因斯坦只用两条公设——所有惯性系物理定律相同、光速在所有惯性系里都是 c——就推出了时间膨胀、长度收缩、E = mc²。",
        "「同时」在不同惯性系里指的不是同一件事：火车上同时发生的两件事，地面观察者会先看到一件再看到另一件。这是相对论击穿牛顿直觉的第一刀。",
        "想象你坐在一列以接近光速行驶的火车上，车厢正中央有一盏灯同时向前后两端闪光。对你来说，光同时到达前后壁——因为你看到的是一个对称的过程。但站台上的观察者看到的是：后壁在迎着光跑，前壁在背着光跑，所以光先到达后壁、后到达前壁。两个观察者对「哪件事先发生」给出了不同答案——这不是错觉，而是时空本身的几何性质。时间不再是全宇宙共享的舞台背景，而是每个观察者各自的私人维度。",
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
        "最直观的比喻是「橡皮膜」模型：把时空想象成一张绷紧的弹性膜，放上一颗保龄球（太阳），膜面凹陷形成漏斗状曲面。一颗弹珠（地球）沿凹陷边缘滚动——它以为自己在走直线，但实际上被弯曲的膜面导引成了椭圆轨道。这就是引力的本质：不是一种「拉力」，而是几何形状的后果。光线经过太阳时偏转 1.75 角秒，不是因为光被「吸」了，而是光在弯曲时空中走的「直线」（测地线）本身就是弯的。GPS 卫星每天偏差 38 微秒（若不修正则定位每天偏 ~11 km），正是地球质量弯曲了周围时空的直接工程后果。",
      ],
    },
    {
      heading: "前沿 · GW · EHT · 量子引力",
      body: [
        "LIGO/Virgo 2015 直接探测到双黑洞并合的引力波，验证了 GR 的强场预言；EHT 2019 拍到 M87* 与 2022 拍到 Sgr A* 的黑洞阴影，与 Kerr 解吻合到 1% 量级。",
        "量子引力仍未完成：弦论、圈量子引力（LQG）、渐近安全引力是主要方向；黑洞信息悖论、AdS/CFT 全息、ER=ERP 是当下最活跃的桥梁。",
      ],
    },
    {
      heading: "引力波 · 时空的涟漪",
      body: [
        "想象在一张绷紧的床单上扔下两颗钢球，让它们互绕旋转——它们搅动床单产生的波纹向外扩散，这就是引力波的直觉图像。爱因斯坦 1916 年从广义相对论线性化近似中预言了这种「时空涟漪」的存在：任何有质量的物体加速运动都会扰动周围的时空度量，以光速向外传播。但信号极其微弱——即使两个黑洞合并，到达地球时引起的时空形变也只有 ~10⁻²¹，相当于把地球到比邻星的距离（4.2 光年）改变了一个原子核的直径。",
        "LIGO 的两座干涉仪（臂长 4 km，分别在华盛顿州和路易斯安那州）花了 40 年才把灵敏度推到这个量级。2015 年 9 月 14 日，GW150914 信号抵达——两个分别为 36 和 29 倍太阳质量的黑洞在 13 亿光年外合并，在最后 0.2 秒内以引力波形式辐射出约 3 倍太阳质量的能量（E = mc² 的终极演示）。信号频率从 35 Hz 扫到 250 Hz，持续不到 0.5 秒——这一声「啁啾」是人类第一次直接听到时空本身的震颤。2017 年 Nobel 物理学奖授予 Weiss、Barish 和 Thorne。截至 2025 年，LIGO-Virgo-KAGRA 已累积 200+ 个引力波事件，引力波天文学正式成为一门观测科学。",
      ],
    },
    {
      heading: "引力波 · 时空的涟漪",
      body: [
        "爱因斯坦 1916 年从广义相对论的弱场近似中推导出：时空的曲率扰动以光速传播，就像池塘上的涟漪。但这些波的振幅极其微弱——即使两个黑洞并合，到达地球时引起的时空应变也只有 h ~ 10⁻²¹，相当于把一个原子核的直径变化放到比太阳到地球还长的距离上。爱因斯坦本人一度怀疑它们是否真实存在。",
        "2015 年 9 月 14 日，LIGO 的两个探测器（Hanford 与 Livingston，相距 3000 km）同时捕捉到了一个持续约 0.2 秒的信号——GW150914。频率从 35 Hz 扫到 250 Hz，波形与双黑洞并合的广义相对论数值模拟精确吻合：两个分别约 36 和 29 倍太阳质量的黑洞在 13 亿光年外合并，释放出约 3 倍太阳质量的纯引力波能量——在那 0.2 秒内，它的辐射功率超过可观测宇宙中所有恒星光度之和。这是人类第一次直接「听到」时空本身的震颤，2017 年 Nobel 物理学奖颁给了 Weiss、Barish 和 Thorne。",
        "此后 LIGO/Virgo/KAGRA 的四轮观测已累积 200+ 个引力波事件，包括 GW170817——首个双中子星并合，同时被伽马暴 GRB 170817A 与千新星 AT 2017gfo 电磁对应体捕获，开启了「多信使天文学」的新纪元。引力波天文学让我们用一种全新的感官探索宇宙：它不依赖光子，能穿透电磁波无法穿透的区域，直接感受黑洞、中子星这些最致密天体的动力学。未来 LISA（ESA，空间引力波天线，~2035）将探测超大质量黑洞并合的低频段，宇宙中的引力波交响乐正在被一层层揭开。",
      ],
    },
    {
      heading: "GW170817 · 多信使天文学的诞生",
      body: [
        "2017 年 8 月 17 日，LIGO 和 Virgo 探测器同时捕获了一个持续约 100 秒的引力波信号——与双黑洞并合的短促啁啾截然不同，这是一个频率缓慢上升、持续时间长得多的事件，对应两颗中子星的螺旋并合。B.P. Abbott 等人 (Physical Review Letters 119, 161101, 2017) 发布了这一发现：GW170817 的波形精确确定了两颗中子星的质量 (1.17–1.60 M☉)、距离 (40 Mpc，即 1.3 亿光年) 和天空位置。仅在引力波到达后 1.7 秒，NASA 的 Fermi 卫星和 ESA 的 INTEGRAL 卫星同时探测到了来自同一方向的短伽马射线暴 GRB 170817A——这是引力波与电磁波首次被同时观测到的天文事件，宣告了「多信使天文学」时代的正式到来。",
        "随后 12 小时内，全球 70 余台望远镜在从射电到 X 射线的全波段对准了星系 NGC 4993 中的这个源。光学和红外波段观测到了 AT 2017gfo——一颗「千新星 (kilonova)」，其光谱演化与 r-过程核合成模型 (快中子捕获过程) 完美吻合：并合抛射物中的中子富集物质在膨胀冷却过程中合成金、铂、铀等比铁更重的元素，光度曲线和光谱特征直接证实了中子星并合是宇宙中至少一半重元素的工厂 (The Astrophysical Journal Letters 848, L12, 2017)。引力波信号还给出了光速与引力波速度之差 |v_GW − c| / c < 10⁻¹⁵，一次性排除了大量修正引力理论。GW170817 不仅是一次观测突破，更是对广义相对论、核物理、致密天体物理和宇宙化学演化的全方位检验——一个事件同时回答了四个领域的问题，这在天文学史上前所未有。",
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
      label: "LIGO/Virgo 2017 — GW170817 multi-messenger neutron star merger",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.119.161101",
      kind: "paper",
    },
    {
      label: "Abbott et al. 2017 — GW170817 (PRL 119, 161101)",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.119.161101",
      kind: "paper",
    },
    {
      label: "Abbott et al. 2017 — EM counterpart & kilonova (ApJL 848, L12)",
      url: "https://iopscience.iop.org/article/10.3847/2041-8213/aa91c9",
      kind: "paper",
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

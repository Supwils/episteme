import type { TierContent } from "./types";

const content: TierContent = {
  tier: "T1",
  name: {
    primary: "宇宙纤维",
    latin: "Cosmic Web",
  },
  tagline: "宇宙的骨架",
  whisper: "物质沿引力的脊线流淌，沉积成星系的串珠。",
  dataCards: [
    {
      label: "典型纤维长度",
      latinLabel: "Filament length",
      value: "依识别方法与样本",
      hint: "不同层级的纤维不共用一个固定长度范围",
    },
    {
      label: "牧夫座原始红移缺口",
      latinLabel: "Boötes redshift gap",
      value: "6000 km/s",
      hint: "Kirshner1981 · 约60 h⁻¹ Mpc的视线深度，h以100定义",
    },
    {
      label: "Sloan 长城",
      latinLabel: "Sloan Great Wall",
      value: "1.37 × 10⁹ ly",
      hint: "≈ 420 Mpc · Gott et al. 2005",
    },
    {
      label: "纤维气体温度",
      latinLabel: "Warm-hot gas",
      value: "10⁵ – 10⁷ K",
      hint: "WHIM定义范围；不是每条纤维全部气体的温度",
    },
    {
      label: "WHIM模拟重子份额",
      latinLabel: "Baryons in WHIM",
      value: "30–40%",
      hint: "Davé2001的当代宇宙模型估计；分母为全部重子",
    },
    {
      label: "CfA长城原论文尺寸",
      latinLabel: "CfA Great Wall",
      value: "≥60 × 170 h⁻¹ Mpc",
      hint: "Geller与Huchra1989 · h=H₀/(100 km/s/Mpc)",
    },
    {
      label: "Hercules-Corona 长城",
      latinLabel: "Herc-Corona Borealis Wall",
      value: "2000–3000 Mpc（声称）",
      hint: "Horváth2015的GRB聚集尺度；连续结构与显著性有争议",
    },
    {
      label: "冷暗物质/冷暗物质加重子",
      latinLabel: "CDM / (CDM + baryons)",
      value: "约84.3%",
      hint: "Planck2018基线Ωch²/(Ωch²+Ωbh²)，非单条纤维的测量",
    },
    {
      label: "线性偏置因子",
      latinLabel: "Galaxy bias b",
      value: "ξgg ≈ b² ξmm",
      hint: "大尺度线性近似；b依星系样本、红移和尺度",
    },
    {
      label: "Millennium 仿真粒子",
      latinLabel: "Millennium N-body",
      value: "1.008 × 10¹⁰",
      hint: "Springel 2005 · 500 Mpc/h 盒",
    },
    {
      label: "IllustrisTNG-300 体积",
      latinLabel: "TNG300 box",
      value: "(302.6 Mpc)³",
      hint: "项目数据表 · 共动盒边长302.6 Mpc",
    },
    {
      label: "空洞尺度约定",
      latinLabel: "Void definition",
      value: "依目录与识别算法",
      hint: "有效半径、连通范围与红移缺口不同；没有统一300Mpc尺度上限",
    },
    {
      label: "暗物质晕质量函数",
      latinLabel: "Halo mass function",
      value: "dn/dM",
      hint: "按质量统计数密度；质量定义、红移与宇宙学参数均须说明",
    },
    {
      label: "DR17星系分类光谱",
      latinLabel: "Spectroscopic sample",
      value: "2,863,635条",
      hint: "官方全部项目有用光学光谱的星系分类计数；未标为去重星系数",
    },
    {
      label: "星系对tSZ叠合示例",
      latinLabel: "Stacked tSZ signal",
      value: "5.3σ",
      hint: "Tanimura等：Planck×SDSS DR12 LRG对，特定叠合/晕扣除分析",
    },
    {
      label: "历史中微子质量上限",
      latinLabel: "Neutrino mass sum",
      value: "Σmν<0.12 eV",
      hint: "Planck2018 CMB+BAO、95%上限；指定ΛCDM扩展模型",
    },
    {
      label: "DESI DR2中微子比较",
      latinLabel: "Model-dependent bounds",
      value: "<0.064 / <0.16 eV",
      hint: "2025基线BAO+CMB、非负质量先验、95%；分别ΛCDM与w₀w_a模型",
    },
    {
      label: "CHIME 21cm叠合探针",
      latinLabel: "Neutral hydrogen",
      value: "0.78<z<1.43",
      hint: "2022预印本、2023发表；中性氢强度图与eBOSS示踪体叠合，非WHIM温度图",
    },
  ],
  narrative: [
    {
      heading: "从初始涨落到宇宙网络",
      body: [
        "宇宙网由引力演化把早期扰动组织成纤维、片墙、节点与空洞。微波背景温度是多种效应的投影，不能把每个热点与一个密度峰逐一对号入座；同样，网络的节点可以联系星系团或其他高密度区域，并不全都叫超星系团。星系作为发光示踪体，又只揭示物质分布的一部分。",
        "引力在不同方向上的压缩有助于理解片、纤维和节点的形成，Zel'dovich近似与后来的潮汐场分析提供了重要语言。但真实结构形成不是全宇宙在同一红移先做完片墙、再统一碎裂成纤维的流水线。初始涨落、非线性并合、环境及重子物理共同影响演化，近似的适用范围也有边界。",
        "Bond、Kofman与Pogosyan在1996年对宇宙网的形成机制给出重要解释，却不是N体模拟第一次预言有网络状结构。红移巡天更早已经揭示泡沫、墙和空隙，后来更大的巡天与模拟把统计检验推得更远。第一代恒星的形成也早于z≈2–3，不能把恒星形成活动高峰写成宇宙第一次点亮。",
      ],
    },
    {
      heading: "空洞：低密度区域也需要定义",
      body: [
        "空洞是相对稀疏的区域，内部仍可能有星系、细丝和暗物质。研究者可以用星系分布、密度场或不同的连通算法定义它们，由此得到的有效半径和边界并不完全相同。因此，某个目录的典型尺寸、一个著名对象的红移缺口与理论极值，不能混成唯一的空洞直径标准。",
        "牧夫座空洞的1981年发现首先是一个明显的星系红移缺口。原论文报告约6000km/s的缺口，按h=H₀/(100km/s/Mpc)约为60h⁻¹Mpc的视线深度；这是早期稀疏样本给出的尺度，完整边界还需更密集的测量。Keenan、Barger与Cowie讨论的KBC较大尺度低密度情景，也不等同于近邻的Local Void；其幅度、几何与本动速度模型都会影响对局部测距的推断。",
        "空洞环境可用于研究星系演化、引力和膨胀史，但不是因为内部有一种额外的「暗能量斥力」就能直接读出暗能量参数。空洞方向的ISW温度关联、形状与红移空间畸变，都要结合样本选择和模型。低密度环境与星系颜色、恒星形成的关系也需控制质量等变量，不能把空洞壁与中心的星系统一排成一个必然的年龄顺序。",
      ],
    },
    {
      heading: "长城：醒目的连通形状与统计均匀性",
      body: [
        "CfA长城和Sloan长城展示了宇宙网络能延展成很醒目的薄墙与复合结构。1989年CfA原论文给出的下限约60×170h⁻¹Mpc，带h的距离需按所选H₀换算。Sloan长城的约420Mpc及相关2003年预印本、2005年发表版本，也要和所采用的距离模型放在一起理解，而非把所有年份当成不同发现。",
        "武仙—北冕方向的伽马暴分布曾被解释为约数Gpc的巨型结构，后续研究对选样、定位与统计显著性提出质疑。它是一项有争议的结构解释，不能先列为已确认的最大宇宙实体，再拿其尺寸宣布宇宙学原理失效。统计均匀性关心足够大尺度的总体分布，并不要求天空上不存在显著连通结构。",
        "功率谱也不能直接告诉我们宇宙「偏好一堵多长的墙」。无量纲谱Δ²(k)=k³P(k)/(2π²)表示每对数波数区间的方差贡献，与P(k)的峰值不是同一个量；波长与角波数还相差2π因子。墙的连通性受阈值、巡天边界和非线性演化影响，要与使用同类选择方法的模拟比较。",
      ],
    },
    {
      heading: "重子预算：FRB测到什么，又没测到什么",
      body: [
        "大爆炸核合成与CMB为平均重子密度提供约束；低红移的观测清单则要把恒星、不同温度的气体和其他形态逐一盘点。所谓丢失重子，主要是不同清单之间尚未完整识别的部分，并非物质真的消失。Davé等早期模拟给出的WHIM份额，是指定模型与温度定义下的预测，不能直接当作今日精确普查。",
        "快速射电暴穿过电离介质时，低频脉冲比高频更迟到达，色散量约束沿视线的自由电子柱密度，并含宇宙膨胀的红移权重。分析还需扣除或建模银河盘、银河晕和宿主环境。Macquart等2020年把已定位FRB的色散与宿主红移联系起来，提供了弥散重子预算的重要证据。",
        "电子柱密度并不单独给出气体温度，也不会自动告诉我们每个电子位于哪一根纤维。FRB结果不能直接证实所有丢失重子都在10⁵–10⁷K的WHIM中，更不能把Lyα吸收、中性氢发射、热气体发射都视作同一种温度计。多探针研究的价值，正是在不同选择与模型假设下相互补充。",
      ],
    },
    {
      heading: "怎样从观测重建网络",
      body: [
        "光学光谱巡天测量星系红移，再在指定距离模型中重建空间分布。本动速度会造成红移空间畸变，巡天边界和选样也会影响看到的结构。SDSS、DESI与2MoST等项目提供不同样本和覆盖范围；2MoST提供光学光谱；气体的X射线发射则需另一类仪器来探测。DR17官方总表列有2,863,635条被分类为星系的有用光学光谱，表中并未将这个数标为去重后的独立星系数。",
        "弱引力透镜通过大量背景星系形状的统计畸变约束投影质量，而非逐个看到暗物质粒子。图像的仪器角分辨率，也不等于透镜质量图的分辨率；背景源数量、形状噪声、红移分布和重建平滑都会限制结果。要识别跨越大天区的低密度纤维，需要合适的背景源样本、红移信息和统计检验，而单个致密天体的清晰图像回答的是另一类问题。",
        "X射线、tSZ和透镜对气体密度、压力与总质量具有不同权重。把这些图与星系目录放在一起，能够检验物质是否沿相同结构分布；但一项对许多星系对叠合后的统计关联，与单个对象被逐像素清楚成像，仍须区分。观测方法决定了图上的亮点、色块与不确定性分别代表什么。",
      ],
    },
    {
      heading: "N体与流体模拟：分辨率、反馈和预测",
      body: [
        "模拟用大量宏观计算粒子近似物质分布，在与CMB等约束相容的初始功率谱下生成随机实现，再演化引力。CMB天空图是沿视线投影的观测，与模拟所需的三维初始密度场有不同的信息内容。Millennium2005以2160³个无碰撞暗物质计算粒子演化500h⁻¹Mpc盒中的结构，计算粒子也不是一个真实的暗物质基本粒子。",
        "IllustrisTNG进一步包括重子流体、反馈和磁场；FLAMINGO的不同体积与分辨率系列研究了星系和星系团等统计量。不能把这些项目统称为每一代都加入了同样的物理，也不能保证所有光度函数、SZ和Lyα统计都同时在百分级吻合。用于调节反馈参数的观测属于校准，之后用独立观测检验，才更能体现预测能力。",
        "大体积与高分辨率之间存在取舍。重力软化、质量分辨率与流体空间分辨率也不是同一个「像素大小」。星际介质、恒星形成和反馈的未解析过程需要亚网格模型；高分辨率局部放大模拟可对特定系统做更细的检验。质量函数、晕内部密度和环境趋势因而既是模型输出，也受到数值收敛、反馈与质量定义的影响。",
      ],
    },
    {
      heading: "关联函数与偏置：把示踪体和物质分开",
      body: [
        "二点关联函数ξ(r)描述指定间距上，找到一对对象相对于均匀随机样本的超额概率；分析须用相同巡天掩模和选样生成随机目录。BAO会在相关函数中留下一个较宽的统计特征，但不是每一种数据样本都在完全相同的实测距离上给出一座不受模型影响的尖峰。",
        "在简化的大尺度线性偏置模型里，δ_g≈bδ_m，因此自关联满足ξ_gg≈b²ξ_mm。两个自关联函数的比因而近似为b²。实际偏置取决于样本、红移和尺度，还可能包含随机性与非线性项；亮度、颜色或形态提供的信息，也不能化约成每类星系永远固定的一个数字。",
        "多示踪策略利用不同样本对密度和速度场的不同响应。LRG、ELG、类星体与Lyα森林并不在所有红移切片里都同时重叠，更不分别只占据节点、纤维或空洞。Lyα透射通量的偏置定义不同于星系数密度偏置，通常还要讨论符号和红移空间各向异性。先统一定义，才能把多类数据组合成一致的宇宙学约束。",
      ],
    },
    {
      heading: "tSZ：从电子压力到模型推断",
      body: [
        "热SZ效应来自热电子对CMB光子的散射，使频谱发生特定畸变。Compton y主要约束电子压力沿视线的积分；它不像普通表面亮度那样随红移发生同样的宇宙学变暗，却仍受角分辨率、噪声、前景和样本选择限制。信号能否被检出，不能只凭「与距离无关」就作保证。",
        "Tanimura等的Planck×SDSS DR12分析，将约26万对LRG旋转、缩放后叠合，并扣除假定圆对称的晕贡献，在星系对之间得到5.3σ的残余信号。这个显著性属于特定的选对、叠合和背景扣除步骤，不是每根纤维单独都有5.3σ。其气体参数还依赖温度、密度剖面和几何的假设。",
        "de Graaff等对另一组CMASS星系对的分析得到2.9σ的tSZ残余，再结合同样本的弱透镜及模型，推断约百万K量级气体的性质。这说明联合探针能缓解压力的密度—温度简并，而不是一张微波图就直接给出三维温度。两篇研究的样本、滤波和背景处理不同；比较时保留这些条件，才能判断它们提供了怎样的相互支持。",
      ],
    },
    {
      heading: "中微子质量：宇宙学约束需要模型",
      body: [
        "振荡实验测到的是中微子质量平方差，表明至少部分中微子有质量，但尚未确定绝对质量标度。宇宙学的敏感性来自自由流动对结构增长的影响：质量、红移和何时转为非相对论性运动共同决定尺度，不能给所有Σmν≈0.1eV的模型配上一个永久不变的100Mpc自由流动长度。",
        "Planck2018的CMB+BAO在指定ΛCDM扩展下得到Σmν<0.12eV的95%上限；这个数字反映的是当时的数据与模型。DESI DR2的2025年BAO+CMB分析采用文中基线CamSpec CMB似然与非负质量先验，分别在ΛCDM和w₀w_a模型中给出0.064eV与0.16eV上限。同样的数据，改变暗能量等假设就能显著改变约束，因而不应把一个宇宙学上限写成直接实验称重。",
        "与振荡给出的正常序和倒序质量和下限比较，可以在特定宇宙学框架中得到排序偏好，但还要检查系统误差和扩展模型。未来巡天能增加信息，也须用真实数据验证分辨率、偏置和非线性建模；不能把某年达到3σ探测的预测，当成必将发生的质量发现。实验室运动学测量、振荡与宇宙学约束是在不同假设下互补的路径。",
      ],
    },
    {
      heading: "不同气体相：21cm与热气体图如何互补",
      body: [
        "中性氢21cm强度测绘选择的是中性氢信号，不是热电离WHIM的直接温度图。CHIME在2022年预印本、2023年发表的分析里，用102夜数据构建图像，在eBOSS的LRG、ELG和类星体角位置与红移上叠合，检出0.78<z<1.43范围的大尺度21cm信号；其约束仍受非线性建模等不确定性影响。",
        "这样的统计检出表明射电强度图可以与光学巡天结合研究大尺度结构，同时也要求分清信号来自哪些气体环境。中性气体可能位于星系及其环境，与更弥散的电离气体具有不同选择权重。未来更精细的交叉观测，需要分别处理射电前景、仪器系统误差、宿主气体和结构选择。",
        "宇宙网的气体图景需要多种测量共同拼合。FRB提供电子柱密度，tSZ提供压力，X射线与吸收线偏向特定温度和电离态，透镜提供投影质量。将各自假设、统计检测和空间分辨率列清楚，才能判断哪些相互支持，哪些差异正在检验气体物理与反馈模型。",
      ],
    },
  ],
  sources: [
    {
      label: "Bond等1996 · 初始潮汐场与宇宙网",
      url: "https://arxiv.org/abs/astro-ph/9512141",
      kind: "paper",
    },
    {
      label: "Kirshner等1981 · 牧夫座原始红移缺口与h约定",
      url: "https://articles.adsabs.harvard.edu/pdf/1981ApJ...248L..57K",
      kind: "paper",
    },
    {
      label: "Geller与Huchra1989 · CfA长城的原始摘要与尺寸",
      url: "https://ntrs.nasa.gov/citations/19900029036",
      kind: "paper",
    },
    {
      label: "Gott等2005 · Sloan长城与距离图",
      url: "https://arxiv.org/abs/astro-ph/0310571",
      kind: "paper",
    },
    {
      label: "Horváth等2015 · 支持武仙–北冕聚集的GRB分析",
      url: "https://arxiv.org/abs/1510.01933",
      kind: "paper",
    },
    {
      label: "Christian2020 · 对武仙–北冕聚集显著性的复核",
      url: "https://arxiv.org/abs/2006.00141",
      kind: "paper",
    },
    {
      label: "Davé等2001 · WHIM重子份额的流体模拟",
      url: "https://arxiv.org/abs/astro-ph/0007217",
      kind: "paper",
    },
    {
      label: "Macquart等2020 · FRB色散与重子预算",
      url: "https://arxiv.org/abs/2005.13161",
      kind: "paper",
    },
    {
      label: "Millennium项目 · 暗物质模拟与半解析目录",
      url: "https://wwwmpa.mpa-garching.mpg.de/galform/virgo/millennium/index.shtml",
      kind: "agency",
    },
    {
      label: "IllustrisTNG项目 · 模型说明与盒尺寸",
      url: "https://www.tng-project.org/data/docs/background/",
      kind: "agency",
    },
    {
      label: "IllustrisTNG项目 · TNG300数据表",
      url: "https://www.tng-project.org/data/",
      kind: "agency",
    },
    {
      label: "Schaye等2023 · FLAMINGO规模与反馈校准",
      url: "https://arxiv.org/abs/2306.04024",
      kind: "paper",
    },
    {
      label: "Keenan等2013 · 近邻K波段光度密度",
      url: "https://arxiv.org/abs/1304.2884",
      kind: "paper",
    },
    {
      label: "Tully1988 · 双鱼–鲸鱼复合体会议摘要",
      url: "https://doi.org/10.1017/S0074180900136101",
      kind: "paper",
    },
    {
      label: "Tully等2014 · Laniakea速度流域边界",
      url: "https://arxiv.org/abs/1409.0880",
      kind: "paper",
    },
    {
      label: "Hadzhiyska等2021 · §3.5偏置与二点相关的定义",
      url: "https://academic.oup.com/mnras/article/508/1/698/6368874",
      kind: "paper",
    },
    {
      label: "Planck2018 VI · 指定基线的重子与冷暗物质密度",
      url: "https://arxiv.org/abs/1807.06209",
      kind: "paper",
    },
    {
      label: "Tanimura等 — Planck×SDSS DR12星系对tSZ叠合",
      url: "https://arxiv.org/abs/1709.05024",
      kind: "paper",
    },
    {
      label: "de Graaff等 — tSZ与透镜联合约束气体",
      url: "https://arxiv.org/abs/1709.10378",
      kind: "paper",
    },
    {
      label: "CHIME2023 — 宇宙学21cm发射的叠合检出",
      url: "https://arxiv.org/abs/2202.01242",
      kind: "paper",
    },
    {
      label: "DESI2025 DR2 II — 中微子质量的模型依赖约束",
      url: "https://arxiv.org/html/2503.14738v2",
      kind: "paper",
    },
    {
      label: "SDSS DR17 — 光谱样本与统计口径",
      url: "https://www.sdss4.org/dr17/scope/",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "sloan-great-wall",
      name: {
        primary: "Sloan 长城",
        latin: "Sloan Great Wall",
      },
      position: [0.95, 0.15, -0.3],
      description:
        "Gott等2003预印本、2005正式论文用SDSS资料描述的长城，尺度约13.7亿光年（420 Mpc）。这个数字来自特定结构边界与距离约定；长城、复合体与按速度流域定义的超星系团，采用的结构划分方式各有不同。",
      data: [
        {
          label: "论文尺度",
          value: "约420 Mpc",
        },
        {
          label: "论文版本",
          value: "2003预印本 / 2005发表",
        },
        {
          label: "资料",
          value: "SDSS",
        },
      ],
      color: "#ffd29a",
      size: 0.04,
    },
    {
      id: "bootes-void",
      name: {
        primary: "牧夫座空洞",
        latin: "Boötes Void",
      },
      position: [-0.75, 0.4, 0.45],
      description:
        "Kirshner等1981在三个天区的红移中报告稀少星系区：缺口6000 km/s，按论文h约定约60 h⁻¹ Mpc的视线深度，横向天区间距约80 h⁻¹ Mpc。早期稀疏样本揭示了低密度区域，后来的更密集测量才能进一步刻画边界与内部星系分布。",
      data: [
        {
          label: "原始红移缺口",
          value: "6000 km/s",
        },
        {
          label: "视线深度",
          value: "约60 h⁻¹ Mpc",
        },
        {
          label: "h定义",
          value: "H₀/(100 km/s/Mpc)",
        },
      ],
      color: "#7884a8",
      size: 0.05,
    },
    {
      id: "cfa2-great-wall",
      name: {
        primary: "CfA2 长城",
        latin: "CfA2 Great Wall",
      },
      position: [0.3, -0.65, 0.55],
      description:
        "Geller与Huchra1989报告的CfA长城，原摘要给最低横向尺寸60 h⁻¹ × 170 h⁻¹ Mpc。它揭示了显著的片状大尺度结构，但单个有限结构不自动推翻足够大尺度的统计均匀性。",
      data: [
        {
          label: "最低横向尺寸",
          value: "60 × 170 h⁻¹ Mpc",
        },
        {
          label: "论文作者",
          value: "Geller / Huchra",
        },
        {
          label: "发表年份",
          value: "1989",
        },
      ],
      color: "#f4e3c1",
      size: 0.035,
    },
    {
      id: "hercules-corona-wall",
      name: {
        primary: "武仙-北冕长城",
        latin: "Hercules-Corona Borealis Great Wall",
      },
      position: [-0.5, -0.3, -0.7],
      description:
        "Horváth等从GRB分布提出并在2015样本中支持的大尺度聚集声称，估计2000–3000 Mpc。Christian2020指出选择效应与统计检验可能高估显著性。它是否对应连续的物质结构仍有争议，不能说已确认，或把它写成接近今日粒子视界大小。",
      data: [
        {
          label: "2015声称尺度",
          value: "2000–3000 Mpc",
        },
        {
          label: "示踪物",
          value: "伽马暴",
        },
        {
          label: "证据状态",
          value: "统计解释有争议",
        },
      ],
      color: "#ffb45a",
      size: 0.045,
    },
    {
      id: "kbc-void",
      name: {
        primary: "KBC低密度区假说",
        latin: "KBC Void",
      },
      position: [0, 0, 0],
      description:
        "Keenan、Barger与Cowie2013比较近邻K波段光度密度，讨论约300 Mpc尺度的低密度解释。把光度密度转换为总质量密度需要假设；它不是已证实能解决哈勃张力的唯一模型，也不同于近邻星系分布中另称Local Void的空洞。",
      data: [
        {
          label: "研究尺度",
          value: "约300 Mpc",
        },
        {
          label: "观测量",
          value: "K波段光度密度",
        },
        {
          label: "性质",
          value: "低密度解释，具模型条件",
        },
      ],
      color: "#6ad0ff",
      size: 0.035,
    },
    {
      id: "piscs-cetus",
      name: {
        primary: "双鱼座-鲸鱼座超星系团复合体",
        latin: "Pisces-Cetus Supercluster Complex",
      },
      position: [0.55, 0.6, -0.45],
      description:
        "Tully1988会议摘要讨论约50个富星系团、跨度约300 h₇₅⁻¹ Mpc的复合体，h₇₅以75 km/s/Mpc定义。这种按星系团分布识别的连结，和Laniakea按本动速度流域划界的方法不同，不能把两种目录直接画成已证实的严格嵌套层级。",
      data: [
        {
          label: "会议摘要尺度",
          value: "约300 h₇₅⁻¹ Mpc",
        },
        {
          label: "h₇₅定义",
          value: "H₀/(75 km/s/Mpc)",
        },
        {
          label: "识别线索",
          value: "富星系团空间分布",
        },
      ],
      color: "#e6e9f0",
      size: 0.03,
    },
    {
      id: "n-body-node",
      name: {
        primary: "N 体模拟节点",
        latin: "N-body Simulation Node",
      },
      position: [-0.15, -0.55, -0.4],
      description:
        "这里示意引力形成的高密度节点。Millennium使用无碰撞暗物质N体计算并结合半解析星系模型；TNG使用磁流体；FLAMINGO比较流体与反馈模型。模拟能检验结构统计，但其盒尺寸、物理过程和拟合精度不能混成一条统一的实测结论。",
      data: [
        {
          label: "Millennium粒子",
          value: "2160³",
        },
        {
          label: "TNG300盒边长",
          value: "302.6 Mpc（共动）",
        },
        {
          label: "FLAMINGO最大流体盒",
          value: "2.8 Gpc（共动）",
        },
      ],
      color: "#b89aff",
      size: 0.034,
    },
    {
      id: "whim-filament",
      name: {
        primary: "丢失重子 · WHIM",
        latin: "Warm-Hot IGM",
      },
      position: [0.65, -0.18, -0.05],
      description:
        "WHIM指约10⁵–10⁷ K的温热星系际气体，低密度使其难观测，但并非不能产生X射线信号。Davé2001的模拟重子份额与Macquart2020的FRB弥散电子预算是不同测量/推断，不能合并成已定位并测温全部丢失重子的直接照片。",
      data: [
        {
          label: "温度范围",
          value: "10⁵–10⁷ K",
        },
        {
          label: "2001模拟重子份额",
          value: "30–40%",
        },
        {
          label: "FRB色散探针",
          value: "沿视线自由电子柱密度",
        },
      ],
      color: "#94c8ff",
      size: 0.028,
    },
  ],
  discussionQuestions: [
    "宇宙体积的大部分是空洞——如果我们在一个空洞中心，我们的宇宙学观测会有什么不同？",
    "FRB、tSZ与X射线分别约束气体的哪些性质？怎样结合它们区分温度、密度与重子预算？",
    "如何区分模拟对观测的校准、数值收敛检验与独立预测？",
  ],
};

export default content;

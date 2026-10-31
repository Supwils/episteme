import type { TierContent } from "./types";

const content: TierContent = {
  tier: "T5",
  name: {
    primary: "恒星邻域",
    latin: "Stellar Neighborhood",
  },
  tagline: "50 光年以内",
  whisper: "距离近不等于看起来亮；标记为精选邻居，背景星点为示意，并非普查。",
  dataCards: [
    {
      label: "区域半径",
      latinLabel: "Radius",
      value: "50 ly",
      hint: "≈ 15.3 pc · 4.7 × 10¹⁷ m",
    },
    {
      label: "10 pc普查系统数",
      latinLabel: "Known systems",
      value: "336",
      hint: "Reylé等2023更新；不是50光年内的系统总数",
    },
    {
      label: "太阳以外最近恒星",
      latinLabel: "Closest star beyond Sun",
      value: "Proxima Cen",
      hint: "4.246 ly",
    },
    {
      label: "夜空最亮恒星",
      latinLabel: "Brightest night-sky star (V)",
      value: "Sirius A",
      hint: "−1.46 mag · 8.6 ly",
    },
    {
      label: "低质量星占多数",
      latinLabel: "Spectral mix",
      value: "M星约61%",
      hint: "2021的10pc恒星+棕矮星样本估计；分母需明确",
    },
    {
      label: "10 pc行星数（2021）",
      latinLabel: "Confirmed exoplanets",
      value: "77",
      hint: "当年普查的已确认系外行星；非当前50ly总数",
    },
    {
      label: "10 pc白矮星（2021）",
      latinLabel: "White dwarfs",
      value: "20",
      hint: "另有候选；不能当整个50ly球的当前数目",
    },
    {
      label: "10 pc恒星数（2021）",
      latinLabel: "Stars within 10 pc",
      value: "373",
      hint: "含白矮星；分类及完整性见原普查，非空间密度",
    },
    {
      label: "10 pc棕矮星（2021）",
      latinLabel: "Brown dwarfs",
      value: "85",
      hint: "当年确认数，另有3候选；并非WISE只发现30颗",
    },
    {
      label: "10 pc系统多重率",
      latinLabel: "Multiplicity",
      value: "约28%（2021）",
      hint: "多重系统数/系统总数；不是每颗星的伴星比例",
    },
    {
      label: "太阳宜居带模型示例",
      latinLabel: "CHZ around Sun",
      value: "0.99–1.70 AU",
      hint: "Kopparapu2013水损失/最大温室，1D无云条件",
    },
    {
      label: "比邻星b发现值",
      latinLabel: "Proxima b minimum mass",
      value: "约1.3 M⊕",
      hint: "2016径向速度最低质量；不是半径或当前唯一最佳解",
    },
    {
      label: "铁丰度的对数刻度",
      latinLabel: "Metallicity example",
      value: "[Fe/H]=−0.5 → 约0.32倍",
      hint: "相对太阳的铁/氢数目比；不代表所有重元素均同比例",
    },
    {
      label: "邻域年龄估计",
      latinLabel: "Stellar ages",
      value: "依星族、活动与模型",
      hint: "混合年龄样本，主序位置不能为每颗低质量星精确定年",
    },
    {
      label: "JWST大气观测",
      latinLabel: "Atmosphere methods",
      value: "透射、二次食、相位曲线",
      hint: "不同方法/行星提供不同约束；不以未定义样本作总数",
    },
    {
      label: "TRAPPIST-1 b/c相位曲线",
      latinLabel: "Thermal phase curves",
      value: "MIRI 15 μm",
      hint: "2025预印本/2026刊印：不利于≥1bar且强温室的大气模型",
    },
    {
      label: "已确认星际来客",
      latinLabel: "Interstellar objects",
      value: "至少3个（截至2026-10）",
      hint: "1I/ʻOumuamua、2I/Borisov、3I/ATLAS；并非总体数量",
    },
    {
      label: "K2-18b含硫分子推断",
      latinLabel: "DMS / DMDS inference",
      value: "尚无稳健确认",
      hint: "2025 MIRI候选及独立重分析有分歧；位于50ly范围外",
    },
  ],
  narrative: [
    {
      heading: "近邻是被矮星统治的",
      body: [
        "以太阳为中心画半径50光年的球，能把陌生星名放回身边的三维空间。真正讨论人口时，得先划清普查边界：Reylé等2021的10 pc目录列540个天体、339个系统，2023更新为541个天体、336个系统。这些条目包含恒星、棕矮星和行星，不能把系统数当恒星数，也不能将10 pc目录直接改称50光年（约15.3 pc）普查。",
        "低质量红矮星主导近邻恒星人口。2021目录中，M星约占恒星与棕矮星合计的61%；若分母只取恒星，比重会更高。比邻星虽近，可见光仍远低于通常肉眼极限。暗星的缺席常常是观测选择的结果，远处一颗高光度恒星可以比近处许多红矮星更显眼。",
        "这一分布与恒星形成时的初始质量函数有关，却不是未经修正就能直接读出的同一条曲线。Kroupa2001的分段幂律在约0.5和0.08太阳质量附近改变斜率；恒星寿命、未分解双星、距离误差与样本完整性又会改变今日看到的质量分布。近邻普查的价值，正在于它允许逐个检查那些容易被亮度巡天漏掉的成员。",
      ],
    },
    {
      heading: "等级森严的视亮度",
      body: [
        "多数肉眼恒星位于50光年以外。天狼星约8.6光年、织女星约25光年、牛郎星约16.7光年，都是容易辨认的近邻；夏季大三角的第三位是更远的天津四Deneb，并非Fomalhaut。天空中的三角描述视方向，并不表示三颗星距离相近、同龄或形成于同一星团。",
        "视亮度由本征光度、距离与消光共同决定。以可见光绝对星等相差约14等为例，本征亮度比约为10^(0.4×14)，即约40万；若亮星又远两倍，距离平方会把这一比值缩小到约10万，而不会放大到十亿。比较恒星时还要指定波段，红矮星在红外的相对贡献会高于可见光。",
        "天狼星B于1862年被观测到，后来其高温、低光度与致密性质推动了白矮星研究。把双星分解、测出视差，再将视星等换成绝对星等，才能区分一颗星是本来很暗还是仅仅很远。Gaia提供大规模光学天体测量，但极冷棕矮星和部分低光度对象仍要依靠红外数据补充，不能说它已把所有M矮星看全。",
        "星等刻度把亮度乘法变成差值：亮度相差100倍对应5个星等。视差给出的距离，可以让不同恒星移到共同的10pc基准比较；再对尘埃消光和波段作修正，才更接近本征辐射差异。因此一张肉眼星图与一份定距目录，即使覆盖同一方向，也在回答不同的人口问题。",
      ],
    },
    {
      heading: "Alpha Centauri：太阳的引力邻居",
      body: [
        "南门二A/B组成双星，远处另有小质量M型红矮星比邻星。Kervella等2017的运动分析支持比邻星受系统引力束缚，并估计其轨道周期约55万年。A是类太阳G型星，B是K型星；相同系统内不同恒星的质量、辐射与活动，给行星环境研究提供了可以比较的条件。",
        "2016年径向速度发现Proxima b的约11.2日信号，原论文报告最低质量约1.3个地球质量。行星使恒星产生视线方向上的周期运动；不知道轨道倾角时，测得的是质量乘以倾角正弦。它既不是1.27个地球半径，也没有由这次观测测出行星表面、海洋或大气。",
        "若想近距离观察这些世界，Starshot提出了激光推动克量级光帆、目标速度约0.2c的概念。约20年指设想中的出发后航行时间，研制、加速、导航、抗尘埃和跨星际回传仍各有难题。航行时间的简单估算可以让尺度直观起来，却不能当作已经兑现的发射日期或唯一可行的星际任务方案。",
      ],
    },
    {
      heading: "类太阳目标",
      body: [
        "天仓五Tau Ceti与天苑四Epsilon Eridani都在约十余光年尺度，因而适合把精密径向速度、尘埃盘和行星研究放在一起。Feng等2017在Tau Ceti数据中提出四个候选行星信号，其解释依赖噪声模型。低振幅周期必须与恒星活动和仪器相关性区分，不能将候选直接写成四颗已确认宜居行星。",
        "恒星铁丰度常用[Fe/H]的十进对数表示。若取−0.5这个示例，对应铁/氢比约为太阳的10^(−0.5)≈0.32倍；它不表示低一半，也不直接给出整个原行星盘的固体质量。G、K型星的寿命和宜居带随质量与光度变化，恒星活动、年龄和伴星环境同样会影响搜索目标的选择。",
        "Greaves等1998使用JCMT的SCUBA亚毫米相机，在Epsilon Eridani周围850μm图像中分辨出尘埃环，峰值约60AU。它常被拿来与年轻太阳系的柯伊伯带比较，这份观测并非COBE图像。尘埃的温度、空间分布与碰撞补给使行星系统演化可被间接研究，但环中不对称本身不等于已经唯一确定某颗扰动行星。",
      ],
    },
    {
      heading: "HR 图 · 邻域恒星的体检报告",
      body: [
        "Hertzsprung–Russell图把温度或颜色与光度或绝对星等对应起来。它通常按单颗恒星画点，多星系统若未分解，合光会把位置推离单星序列。邻域中主序矮星占多数；天狼星B、南河三B这样的白矮星虽然表面温度可高，却因半径小而落在低光度区域。",
        "棕矮星无法依靠持续稳定的氢聚变维持主序。约13与约75—80个木星质量的常用边界分别关联氘和氢燃烧，也依成分与定义变化；不能说所有棕矮星都烧过氘。2021年的10 pc普查已列85颗确认棕矮星，另有3个候选。L、T、Y是冷天体的光谱分类，同一温度可对应不同质量和年龄。",
        "WISE 0855−0714是极冷的近邻自由漂浮天体，2014发现时模型给约250K、距离约2pc；它不是最近的棕矮星系统，Luhman16双星更近。对同龄星团，主序转折可帮助估年龄；对年龄混杂的场星，尤其低质量主序星，仅凭HR位置往往不能精确定年。等时线拟合、自转与星震提供不同信息，各自需要适用范围和校准。",
        "光度还把温度与半径联系起来：在有效温度的定义下，L=4πR²σT_eff⁴。高温却暗的白矮星因而必须很小，冷且半径大的巨星则仍可很亮。质量、成分、年龄与未分解伴星都能影响图上的位置；把位置直接换成唯一年龄，会丢掉这些共同作用的参数。",
      ],
    },
    {
      heading: "近邻行星 · TRAPPIST-1 与更远的比较对象",
      body: [
        "约40.5光年外的TRAPPIST-1有七颗已知凌日行星，半径接近地球；e、f、g常被归入特定保守宜居带模型。它们都在比水星轨道更紧凑的范围内运行，但入射光通量、潮汐与大气演化各不相同。半径相似与辐照合适，是研究环境的起点，并未确认海洋或生命。",
        "TOI-700 d距太阳约101光年，属于50光年球之外的比较对象。Kopparapu2013的1D无云模型给太阳水损失与最大温室边界约0.99—1.70AU；换成更暗恒星，对应轨道通常更靠近恒星，同时还须考虑光谱、大气与行星质量。宜居带不是在所有恒星周围固定缩放的一条生命保证线。",
        "JWST对TRAPPIST-1不同成员使用不同方法：b、c有热发射及相位曲线，d、e有凌日光谱约束。对内侧b、c的强大气限制，不能直接推给更外侧的e、f、g。比较这些成员可以检验辐照与大气保留的关系，但即使某一颗的厚大气被排除，也不能单独证明所有红矮星行星都失去了大气。",
      ],
    },
    {
      heading: "比邻星b · 最近行星的大气仍是问题",
      body: [
        "Proxima b的径向速度信号揭示了轨道周期与最低质量，却尚未建立可用于透射光谱的凌日几何。我们因此还不能像研究TRAPPIST-1 b那样，通过已知的凌日与二次食测量其大气。给这类非凌日近邻寻找大气，需要其他观测策略、足够的星行星分离能力，以及对母星背景的精细处理。",
        "Dong等2017采用多组分磁流体模型估算离子逃逸，发现无内禀磁场的模型行星可有远高于太阳系类地行星的损失率；某些星风条件下磁场可降低损失，却仍不能保证长期保住大气。星风、高能辐射、初始挥发物与磁场等输入并未全被测定，这是一组条件模拟，不能当作比邻星b现有大气的直接检测。",
        "不同候选还须分别追踪。按2026年10月核对的NASA Exoplanet Archive，Proxima b与d列为确认行星，约5.12日、最低质量约0.26M⊕的d对应2025确认研究；c仍列候选，约1900日的信号不应写成已经确定的第三颗行星。系统看起来丰富，证据却必须一颗一颗积累。",
      ],
    },
    {
      heading: "JWST大气光谱：三种方法回答不同问题",
      body: [
        "行星凌日时，部分星光穿过其大气，不同波段的额外遮挡构成透射光谱；二次食则比较行星被恒星遮住前后的系统亮度，以分离行星昼面辐射。完整相位曲线再追踪轨道各阶段的亮度变化，对昼夜传热增加约束。恒星斑点、仪器变化和云雾会给这些方法带来不同退化。",
        "Greene等2023对TRAPPIST-1 b使用的是MIRI约15μm二次食测量，并非4.5μm。随后Gillon等2025预印本、2026刊印的15μm相位曲线，对b、c都不利于表面气压≥1bar且温室效应强的大气模型。c仍允许稀薄、温室效应弱的富氧大气等解释，不能将某类模型被排除概括成所有可能成分都没有。",
        "更远的亚海王星K2-18b展示另一种难题。Madhusudhan等2023用NIRISS与NIRSpec报告CH₄和CO₂，并讨论富氢大气下海洋的可能；后续重分析对甲烷支持较稳健，对CO₂强度和其他分子更依分析选择。光谱先约束气体吸收，再通过内部与气候模型推测环境，中间不能省去模型的不确定性。",
        "透射信号的强弱也受大气尺度高度影响。在等温、静力近似下，H=kT/(m̄g)，其中m̄是单个粒子的平均质量。温度高、平均粒子质量小的大气通常更膨胀，而强重力使它更紧凑。这解释了富氢亚海王星为何较容易做光谱，却也提醒我们，较清楚的吸收特征未必意味着更接近地球的环境。",
      ],
    },
    {
      heading: "星际天体：太阳系外的漂流物",
      body: [
        "1I/ʻOumuamua于2017年、2I/Borisov于2019年被发现；2025年7月1日发现的3I/ATLAS成为第三个确认来客。确定未受太阳束缚的入射轨道，是确认星际来源的关键，不能只因一颗普通彗星的瞬时轨道离心率略大于1便下同样结论。它们也不是绕太阳运行的恒星邻域成员，而是穿过太阳系的外来样本。",
        "ʻOumuamua的形状与非引力加速曾引出多种自然模型及技术起源猜想；亮度变化并未直接拍出其外形，缺少某种可见气体也不自动证明光帆。Borisov与ATLAS表现出彗星活动，使气体、尘埃与轨道可以联合比较。不同来客在成分上存在差异，不能从相似的彗发外观推断它们来自同一种形成环境。",
        "发现频率还受亮度、尺寸分布、太阳遮挡与巡天节奏影响。Hoover等2022对无彗星活动的ʻOumuamua类群体建模，给LSST约十年发现约15个的估计；这不是已经兑现的每年固定发现数。增加样本后，才能更可靠地讨论其他恒星系统向星际空间抛出了多少、怎样的固体物质。",
        "轨道分析要同时处理行星引力扰动、观测误差与可能的排气推力，通常以远离太阳系时的入射能量检验是否未受束缚。成分研究则另走一条路径：在不同日距记录气体释放与尘埃变化，再检验温度、挥发性和观测孔径的影响。轨道给来处的线索，光谱给材料的线索，两者合起来才有机会重建这些漂流物的经历。",
      ],
    },
    {
      heading: "K2-18b：含硫分子候选与独立重分析",
      body: [
        "K2-18b在50光年范围之外，是亚海王星大气研究的比较对象。2023近红外论文讨论的DMS迹象很弱；2025年4月Madhusudhan等的新观测使用MIRI LRS约6—12μm，报告约3σ的DMS和/或DMDS证据。两种分子尚有退化，显著性依所用模型，不能改写成NIRSpec在3.4μm确认了生物气体。",
        "独立分析并未给出一致确认。Stevenson等2025指出中红外结果对分箱和相关噪声敏感；Fernández-Rodríguez等对近红外的重分析则在更完整模型中失去DMS证据。这里需要检查的是跨仪器、数据处理与候选吸收体的一致性，而不是把一个σ值直接换成生命存在的概率。",
        "即便某种分子将来被确认，也要继续检验非生物生成、光化学与输运。海洋加富氢大气的Hycean解释、较厚气体包层及其他内部情形，仍需与质量、半径和光谱联合比较；现有资料未直接测定海洋。这个案例的价值，在于让“有吸收特征”“是哪种分子”“怎样的环境”“是否有生命”各自成为可以检验的问题。",
      ],
    },
  ],
  sources: [
    {
      label: "Reylé等2021 · 10pc普查、分类与表3",
      url: "https://arxiv.org/abs/2104.14972",
      kind: "paper",
    },
    {
      label: "Reylé等2023 · 10pc普查首次更新",
      url: "https://arxiv.org/abs/2302.02810",
      kind: "paper",
    },
    {
      label: "Proxima b原始径向速度发现（2016）",
      url: "https://arxiv.org/abs/1609.03449",
      kind: "paper",
    },
    {
      label: "Kervella等2017 · Proxima与Alpha Cen轨道",
      url: "https://arxiv.org/abs/1611.03495",
      kind: "paper",
    },
    {
      label: "Feng等2017 · Tau Ceti四个候选信号",
      url: "https://arxiv.org/abs/1708.02051",
      kind: "paper",
    },
    {
      label: "Gillon等2017 · TRAPPIST-1七颗近地球大小行星",
      url: "https://www.nature.com/articles/nature21360",
      kind: "paper",
    },
    {
      label: "Kopparapu等2013 · 宜居带的气候模型",
      url: "https://arxiv.org/abs/1301.6674",
      kind: "paper",
    },
    {
      label: "NASA/JWST · TRAPPIST-1不同成员的观测",
      url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/what-is-webb-revealing-about-the-trappist-1-system/",
      kind: "agency",
    },
    {
      label: "Gillon等2025预印本/2026刊印 · b/c热相位曲线",
      url: "https://arxiv.org/abs/2509.02128",
      kind: "paper",
    },
    {
      label: "Basant等2025 · Barnard星四行星独立数据",
      url: "https://arxiv.org/abs/2503.08095",
      kind: "paper",
    },
    {
      label: "Luhman2014 · 极冷WISE0855发现",
      url: "https://arxiv.org/abs/1404.6501",
      kind: "paper",
    },
    {
      label: "NASA/JPL · Summer Triangle的三颗成员",
      url: "https://nightsky.jpl.nasa.gov/media/documents/resources/2024July.pdf",
      kind: "agency",
    },
    {
      label: "NASA/Hubble · Sirius B于1862发现",
      url: "https://science.nasa.gov/missions/hubble/measuring-a-white-dwarf-star/",
      kind: "agency",
    },
    {
      label: "Breakthrough2016 · Starshot概念与航行目标",
      url: "https://breakthroughinitiatives.org/news/4",
      kind: "agency",
    },
    {
      label: "NASA Exoplanet Archive · 近邻宿主坐标与距离",
      url: "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select%20hostname%2Cra%2Cdec%2Csy_dist%20from%20pscomppars%20where%20hostname%20like%20%27Barnard%25%27%20or%20hostname%3D%27TRAPPIST-1%27&format=json",
      kind: "agency",
    },
    {
      label: "SIMBAD · 恒星识别与测量书目入口",
      url: "https://simbad.cds.unistra.fr/simbad/",
      kind: "agency",
    },
    {
      label: "Kroupa2001 · 初始质量函数与未分解双星偏差",
      url: "https://arxiv.org/abs/astro-ph/0009005",
      kind: "paper",
    },
    {
      label: "Greaves等1998 · JCMT/SCUBA的Epsilon Eridani尘埃环",
      url: "https://arxiv.org/abs/astro-ph/9808224",
      kind: "paper",
    },
    {
      label: "Dong等2017 · Proxima b条件性大气逃逸模拟",
      url: "https://arxiv.org/abs/1702.04089",
      kind: "paper",
    },
    {
      label: "NASA Exoplanet Archive · Proxima b/d确认与c候选（2026-10核对）",
      url: "https://exoplanetarchive.ipac.caltech.edu/overview/GJ-551",
      kind: "agency",
    },
    {
      label: "NASA2023 · TRAPPIST-1 b的15μm热辐射测量",
      url: "https://science.nasa.gov/universe/exoplanets/webb-measures-the-temperature-of-a-trappist-1-exoplanet/",
      kind: "agency",
    },
    {
      label: "Seligman等2025 · 第三个星际天体3I/ATLAS发现",
      url: "https://arxiv.org/abs/2507.02757",
      kind: "paper",
    },
    {
      label: "Hoover等2022 · LSST星际天体发现与可达性模型",
      url: "https://arxiv.org/abs/2109.10406",
      kind: "paper",
    },
    {
      label: "Madhusudhan等2023 · K2-18b近红外碳分子与候选解释",
      url: "https://arxiv.org/abs/2309.05566",
      kind: "paper",
    },
    {
      label: "Madhusudhan等2025 · MIRI的DMS/DMDS候选信号",
      url: "https://arxiv.org/abs/2504.12267",
      kind: "paper",
    },
    {
      label: "Stevenson等2025 · K2-18b独立约化与统计复核",
      url: "https://arxiv.org/abs/2508.05961",
      kind: "paper",
    },
    {
      label: "Fernández-Rodríguez等2025 · 近红外重分析",
      url: "https://arxiv.org/abs/2510.18098",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "sun",
      name: {
        primary: "太阳",
        latin: "Sol",
      },
      position: [0, 0, 0],
      description:
        "G2V 主序星，年龄约 46 亿年，预计还有 ~50 亿年留在主序上。它是 50 光年内为数不多的 G 型恒星之一。下一档 T6 是它整个行星系。",
      data: [
        {
          label: "类型",
          value: "G2V",
        },
        {
          label: "年龄",
          value: "4.6 Gyr",
        },
        {
          label: "下钻",
          value: "T6",
        },
      ],
      color: "#fff3c4",
      size: 0.04,
    },
    {
      id: "proxima-cen",
      name: {
        primary: "比邻星",
        latin: "Proxima Centauri",
      },
      position: [-0.031, -0.075, -0.023],
      description:
        "距太阳约4.25光年的M型红矮星，质量约为太阳12%。运动分析支持它与Alpha Centauri A/B束缚，轨道周期估计约55万年。Proxima b在2016发现论文中的最低质量约1.3 M⊕，不是测得半径；其大气与宜居性不能仅凭辐照判断。",
      data: [
        {
          label: "距离",
          value: "4.246 ly",
        },
        {
          label: "类型",
          value: "M5.5V",
        },
        {
          label: "行星",
          value: "Proxima b",
        },
      ],
      color: "#ff8866",
      size: 0.06,
    },
    {
      id: "alpha-cen",
      name: {
        primary: "南门二",
        latin: "Alpha Centauri A/B",
      },
      position: [-0.033, -0.076, -0.027],
      description:
        "由 G2V (Alpha A) 和 K1V (Alpha B) 组成的双星，距离 4.367 ly，相互绕转周期约 80 年。Alpha A 是与太阳最相似的恒星之一 (1.1 M⊙, 1.5 L⊙)。Proxima 是这个系统外环的第三星。",
      data: [
        {
          label: "距离",
          value: "4.367 ly",
        },
        {
          label: "A 型",
          value: "G2V",
        },
        {
          label: "B 型",
          value: "K1V",
        },
      ],
      color: "#fff4d8",
      size: 0.05,
    },
    {
      id: "sirius",
      name: {
        primary: "天狼星",
        latin: "Sirius A/B",
      },
      position: [-0.032, -0.05, 0.162],
      description:
        "天狼星是太阳之外夜空视亮度最高的恒星，约8.6光年，V≈−1.46。Sirius A是约2太阳质量的A型主序星，Sirius B是致密白矮星，伴星于1862年被观测到；1925不是其首次发现年。双星周期约50年。",
      data: [
        {
          label: "距离",
          value: "8.6 ly",
        },
        {
          label: "A 型",
          value: "A1V",
        },
        {
          label: "B 型",
          value: "DA2 (WD)",
        },
      ],
      color: "#d4dcff",
      size: 0.055,
    },
    {
      id: "vega",
      name: {
        primary: "织女星",
        latin: "Vega",
      },
      position: [0.062, 0.314, -0.385],
      description:
        "织女星，天琴座α，约25光年，A型主序星。因地轴岁差，它在约一万多年前接近北天极；约26000年是岁差的量级周期，不是章动周期。它是光度标定的重要参考，也有尘埃盘；早期视差史不能简单写成1837年已经完成首个可靠恒星距离测量。",
      data: [
        {
          label: "距离",
          value: "25.04 ly",
        },
        {
          label: "类型",
          value: "A0V",
        },
        {
          label: "标志",
          value: "光度零点",
        },
      ],
      color: "#e8eeff",
      size: 0.055,
    },
    {
      id: "tau-ceti",
      name: {
        primary: "天仓五",
        latin: "Tau Ceti",
      },
      position: [0.206, -0.065, 0.1],
      description:
        "天仓五是约11.9光年外的G8V近邻，1960年Ozma射电搜寻的两个目标之一。Feng等2017提出四个依赖噪声分析的行星候选信号；“候选”不能写成已确认四颗，宜居带边缘也不等于确认可居住。",
      data: [
        {
          label: "距离",
          value: "11.9 ly",
        },
        {
          label: "类型",
          value: "G8V",
        },
        {
          label: "行星",
          value: "2017四个候选信号",
        },
      ],
      color: "#fff0c4",
      size: 0.045,
    },
    {
      id: "barnards-star",
      name: {
        primary: "巴纳德星",
        latin: "Barnard's Star",
      },
      position: [-0.001143, 0.009842, -0.118736],
      description:
        "巴纳德星距太阳约5.96光年，是最近的单恒星系统之一；它不是继比邻星之后最近的单颗恒星，因为Alpha Centauri A/B也更近。自行约10.3角秒/年，100年约1030角秒，约满月直径的一半以上而非三分之一。2025 MAROON-X与ESPRESSO联合分析报告四颗近轨道行星，最低质量约0.19—0.34 M⊕；这些不是宜居带内行星。",
      data: [
        {
          label: "距离",
          value: "5.96 ly",
        },
        {
          label: "自行",
          value: "10.3 ″/yr (最大)",
        },
        {
          label: "行星结果",
          value: "2025四颗近轨道，非确认半径",
        },
      ],
      color: "#ff9a66",
      size: 0.04,
    },
    {
      id: "trappist-1",
      name: {
        primary: "TRAPPIST-1",
        latin: "TRAPPIST-1",
      },
      position: [0.785776, -0.07128, -0.186816],
      description:
        "约40.5光年外的小质量红矮星，七颗已知凌日行星的大小近地球；e/f/g属于常用保守宜居带模型的成员。JWST的热发射、相位曲线与凌日光谱对不同成员给出不同大气限制；没有由宜居带标签确认生命或宜居表面。",
      data: [
        {
          label: "距离",
          value: "≈40.5 ly",
        },
        {
          label: "类型",
          value: "M8V",
        },
        {
          label: "行星",
          value: "7 (b–h)",
        },
        {
          label: "宜居带",
          value: "e / f / g",
        },
      ],
      color: "#ff7755",
      size: 0.05,
    },
  ],
  discussionQuestions: [
    "把肉眼星空与近邻普查比较时，亮度、距离、波段和未分解双星会怎样改变结论？",
    "TRAPPIST-1内侧行星的大气限制，能够在什么条件下推广到更外侧成员？",
    "K2-18b从光谱特征到生命解释，需要通过哪些彼此独立的检验？",
  ],
};

export default content;

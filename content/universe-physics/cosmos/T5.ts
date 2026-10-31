import type { TierContent } from "@/subjects/physics/lib/content";

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
      label: "TRAPPIST-1行星数",
      latinLabel: "TRAPPIST-1 planets",
      value: "7",
      hint: "2017凌日体系；大小近地球不等确认宜居",
    },
  ],
  narrative: [
    {
      heading: "近邻是被矮星统治的",
      body: [
        "以太阳为中心画半径50光年的球，是理解邻域尺度的一种办法，图中只精选若干目标。要谈数量则必须给出普查半径、分类和日期：Reylé等2021的10 pc目录列540个天体、339个系统；2023更新为541个天体、336个系统，包含恒星、棕矮星和系外行星。不能把这些数直接贴到15.3 pc（50光年）的球上，也不能把系统、恒星与行星混数。",
        "低质量红矮星占优势，但比例依分母而变。2021目录估计M星约占恒星与棕矮星合计的61%，剔除棕矮星后恒星样本中的比例更高。比邻星虽是最近的恒星，却远低于通常肉眼亮度极限；许多更远的大光度恒星反而清楚可见。这是亮度选择造成的差异，不是附近没有暗星。",
      ],
    },
    {
      heading: "等级森严的视亮度",
      body: [
        "夜空中的视亮度同时取决于本征光度、距离与消光。多数肉眼恒星并不在50光年内；我们熟悉的近邻亮星包括约8.6光年的天狼星、约25光年的织女星和约16.7光年的牛郎星。天狼星系统的暗伴星Sirius B于1862年被观测到，后来其高温却低光度的性质成为白矮星研究的重要线索，不能把1925年说成首次发现。",
        "夏季大三角由织女星Vega、牛郎星Altair与天津四Deneb组成，第三颗不是南鱼座的Fomalhaut。Deneb远在这个邻域球之外，三角是天空视方向构成的星群，不是三颗同时形成、相互靠近的A型恒星。将天球图案与三维位置分开，正是邻域图的用途。",
      ],
    },
    {
      heading: "Alpha Centauri：太阳的引力邻居",
      body: [
        "南门二A/B组成双星，另有远距的比邻星。Kervella等2017的运动分析支持比邻星受该系统引力束缚，并给出约55万年的轨道周期估计。A是类太阳G型星，B是K型星，比邻星是小质量M型红矮星；这里的不同尺度不能在同一张示意图里都按恒星半径画出。",
        "2016年径向速度发现Proxima b的约11.2日信号，原论文给最低质量约1.3个地球质量；这不是1.27个地球半径，也没有由凌日直接测出半径。“位于温和辐照轨道”并不证明有地表液态水或可居住大气。Starshot在2016年提出以激光帆推动克量级探测器、目标速度约0.2c；约20年是出发后的设想飞行时间，不是承诺2016起20年内建成并抵达。",
      ],
    },
    {
      heading: "类太阳目标",
      body: [
        "Tau Ceti、Epsilon Eridani等近邻使精密径向速度、尘埃盘和行星成像研究可以相互对照。Feng等2017在Tau Ceti数据中解释出四个行星候选信号，结果依赖噪声模型；不能把“candidate”直接改成四颗已确认宜居行星。低振幅信号还须排除恒星活动和仪器相关性，宜居带位置也是气候模型输入后的分类。",
      ],
    },
    {
      heading: "HR 图 · 邻域恒星的体检报告",
      body: [
        "Hertzsprung–Russell图通常把温度或颜色放在横轴、光度或绝对星等放在纵轴；它按单个恒星画点，不能把一个多星系统不加分解地当一颗星。邻域样本中主序矮星占多数，白矮星则温度可高、半径却小，因而落在低光度区域。天狼星B与南河三B展示了恒星演化的另一结局。",
        "棕矮星无法长期以稳定氢聚变维持主序光度。常见约13与约75—80个木星质量的边界分别关联氘和氢燃烧，但会随成分与定义变化；并非每个被称作自由漂浮棕矮星的低质量对象都烧过氘。L、T、Y是冷天体的光谱分类，不能仅凭谱型给出唯一质量。2021的10pc普查已有85颗确认棕矮星，远多于30。",
        "WISE 0855−0714是极冷的近邻自由漂浮天体，2014发现时模型估计有效温度约250 K，距离约2 pc；温度依光谱、光度与演化模型而定。它不是最近的棕矮星系统，Luhman 16双星更近。观察冷而暗的邻居需要红外巡天，Gaia光学目录本身不会收齐这一族。",
      ],
    },
    {
      heading: "近邻行星 · 辐照、宜居带与大气证据",
      body: [
        "约40.5光年外的TRAPPIST-1有七颗已知凌日行星，2017年的联合分析给出了近地球的大小；e、f、g常被归入特定保守宜居带模型。半径接近地球与模型允许液态水，均不等于已经测得大气、海洋或生命。",
        "JWST对不同成员采用不同观测：b、c有热发射及相位曲线，d、e有凌日光谱约束，不能统写成2023年已经对b/c/d完成同一种测光。2025预印本、2026刊印的b/c相位曲线不利于有效温室和高效传热的厚大气，仍须区分具体成分与气压假设；对e的光谱也不能声称已确认大气。",
        "TOI-700 d距太阳约101光年，属于本图50光年范围之外的比较对象。Kopparapu2013的1D无云模型给太阳水损失/最大温室边界约0.99—1.70 AU；更暗恒星的相应轨道通常更近，但边界还依光谱、大气、行星质量与气候模型。离恒星近并不会自动使红矮星宜居更现实，耀斑、早期高能辐射与潮汐状态也须检验。",
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
  relatedArticles: [
    {
      href: "/cosmology/knowledge-base/恒星物理--main-sequence-stars",
      title: "主序星",
    },
    {
      href: "/cosmology/knowledge-base/恒星物理--star-formation",
      title: "恒星形成",
    },
    {
      href: "/cosmology/knowledge-base/恒星物理--stellar-structure-hydrostatic-equilibrium",
      title: "恒星结构与流体静力平衡",
    },
  ],
};

export default content;

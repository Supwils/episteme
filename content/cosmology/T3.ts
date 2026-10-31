import type { TierContent } from "./types";

const content: TierContent = {
  tier: "T3",
  name: {
    primary: "本星系群",
    latin: "Local Group",
  },
  tagline: "我们这个「双星系」邻里",
  whisper: "两个大盘面、几十个小卫星，正在缓缓互相靠近。",
  dataCards: [
    {
      label: "邻里尺度",
      latinLabel: "Extent",
      value: "约数Mpc",
      hint: "成员范围与边界定义有关",
    },
    {
      label: "2012成员名录",
      latinLabel: "Historical census",
      value: "73个矮成员",
      hint: "McConnachie明确/很可能成员；另计MW/M31，非当前总数",
    },
    {
      label: "总质量量级",
      latinLabel: "Mass",
      value: "数×10¹² M⊙",
      hint: "含暗物质；依动力学方法与模型",
    },
    {
      label: "MW ↔ M31",
      latinLabel: "MW–Andromeda",
      value: "约780 kpc",
      hint: "McConnachie2012编录783±25kpc",
    },
    {
      label: "相对径向速度",
      latinLabel: "v_rad (M31)",
      value: "约−110 km/s",
      hint: "银河心参考系；不是日心约−300km/s",
    },
    {
      label: "并合预报",
      latinLabel: "MW–M31 future",
      value: "取决于轨道与质量",
      hint: "5–10Gyr级模型；不是45亿年必然合并",
    },
    {
      label: "测横向运动",
      latinLabel: "Proper motion",
      value: "HST + Gaia",
      hint: "微小自行及卫星反冲影响远期预报",
    },
    {
      label: "零速度半径",
      latinLabel: "Zero-velocity radius",
      value: "0.96±0.03 Mpc",
      hint: "2009球对称模型与30个邻近星系样本",
    },
    {
      label: "本地空洞",
      latinLabel: "Local Void",
      value: "数十Mpc尺度",
      hint: "非规则球形，低密度不等绝对空无",
    },
    {
      label: "GSE并合",
      latinLabel: "GSE merger",
      value: "约100亿年前",
      hint: "Helmi等2018；Gaia DR2与化学/年龄证据",
    },
    {
      label: "薄片取样厚度",
      latinLabel: "Local Sheet slice",
      value: "SGZ=0±1.5 Mpc",
      hint: "Tully2008的选取切片；总厚度3Mpc",
    },
    {
      label: "横向速度换算",
      latinLabel: "Transverse motion",
      value: "vₜ=4.74047μd",
      hint: "vₜ用km/s、μ用mas/yr、d用kpc；780kpc处20km/s约5.4μas/yr",
    },
    {
      label: "Gaia DR4计划",
      latinLabel: "Data Release 4",
      value: "预计2026年12月",
      hint: "2026-10核对ESA；覆盖66个月数据，尚非已发布成果",
    },
    {
      label: "2025并合模拟",
      latinLabel: "Sawala et al.",
      value: "10Gyr内约一半不合并",
      hint: "四个主要星系及观测误差；指定模型中的样本比例",
    },
    {
      label: "2021外晕尾迹示踪",
      latinLabel: "Conroy et al.",
      value: "1 301颗恒星",
      hint: "银心距60–100kpc的恒星密度结构；非暗物质粒子直接成像",
    },
    {
      label: "2026基准并合模拟",
      latinLabel: "Wu et al.",
      value: "约90% / 6.5Gyr",
      hint: "不同更新自行输入；10Gyr积分、间距<20kpc为并合判据",
    },
    {
      label: "群的逃逸速度",
      latinLabel: "Escape speed",
      value: "依位置和引力势",
      hint: "须选总质量分布与势零点；多体、演化系统无统一350km/s",
    },
  ],
  narrative: [
    {
      heading: "两个主要质量中心与矮成员",
      body: [
        "本星系群的质量主要围绕银河系与仙女星系M31分布，两个大星系各自伴随许多矮卫星。在外围还存在较孤立的成员，它们并非都沿已知闭合轨道绕着某个主星系运行。M33是第三个主要旋涡星系，其与M31的束缚关系和近掠历史，需要结合自行、质量和轨道模型判断。",
        "成员名录随微弱天体搜寻而变化。McConnachie2012在太阳周围3Mpc搜集100个邻近星系，另计银河系和M31，其中73个被列为本星系群明确或很可能的矮成员。邻近体积内的全部星系、本群成员与某次巡天确认对象，各有不同统计口径。",
        "本群的总质量约为数万亿个太阳质量的量级，具体值依动力学方法、暗物质晕与背景模型而变。质量还分布在气体和恒星之外，不能只凭两个明亮盘面的亮度推得总质量。两个主星系的运动、外缘星系的膨胀以及卫星动力学，提供了彼此相关但不完全相同的质量线索。",
      ],
    },
    {
      heading: "正在靠近，轨道仍有不确定性",
      body: [
        "M31的日心径向速度约−300km/s，换到银河心参考系，相对接近速度约−110km/s。沿视线接近是一个重要事实，完整轨道却还需要横向运动、两者质量和其他大卫星的引力作用。看到接近，并不直接等于已经知道未来每次近遇的时间与距离。",
        "2012年Sohn等用HST跨5–7年的观测首次测得M31自行。背景星系为微小位移提供参考，质心运动还需校正M31盘内运动、观测区域选择和太阳运动。这类误差会传播到横向速度，进而在数十亿年的轨道积分中产生明显分歧。",
        "早期模型描绘过近遇、潮汐长尾与最终并合的可能过程；后来加入更新自行、M33和LMC后，预测也随之改变。恒星之间距离很大，星系相互穿越的主要作用是整体引力重排，但某一颗恒星或太阳最终落在哪里，仍需由具体模拟和初始条件决定。",
      ],
    },
    {
      heading: "矮星系：微弱却丰富的线索",
      body: [
        "本群矮成员包括矮椭球、矮不规则和更微弱的系统。许多弥散矮星系的恒星运动需要远大于可见恒星的动力学质量，是暗物质研究的重要对象。比较质光比时，要同时标明波段、半径、平衡假设以及双星和潮汐的影响，而不是只排列一个脱离方法的数字。",
        "超暗矮星系可能比明亮星团还不醒目。识别时，稀疏恒星的空间聚集只是第一步；距离、速度和金属丰度分布等信息有助于区分矮星系、星团和偶然聚集。低表面亮度与银河前景又使不同方向、不同距离的检出能力差别很大。",
        "人马座矮椭球正在被银河系潮汐剥离，留下跨越天空的恒星流。它的轨道平面与银河盘显著不同，星流的位置、距离和速度记录了引力势的作用。把这些信息放到包含LMC扰动和银河系演化的模型中，可以追索吸积历史，也能检验质量分布。",
      ],
    },
    {
      heading: "缺失卫星：先统一预测与观测",
      body: [
        "ΛCDM模拟中的暗物质亚晕并不逐一对应明亮卫星。再电离、恒星反馈和气体保持能力，会影响小亚晕能否形成可探测的恒星系统；观测还只能在有限面积和亮度范围内搜寻。因此，比较模型与卫星清单，首先需要把成星物理与巡天检出率放进同一框架。",
        "Drlica-Wagner等2020年对DES和Pan-STARRS数据做一致搜寻，用注入模拟标定恢复率。那次分析恢复已有对象、建立选择函数，没有报告新的高显著候选。选择函数使研究者能问：某个真实存在的矮星系，在这片天区和这个距离，究竟有多大机会被找到？",
        "完全没有恒星的亚晕则需要间接探针。Erkal与Belokurov2015年研究了亚晕飞掠如何在冷恒星流中形成缺口，并在模拟观测条件下讨论质量、尺度与运动的推断。缺口也受到宿主势、冲击几何和其他扰动影响；理论可辨认性与实际发现具体暗亚晕，需要分开评估。",
      ],
    },
    {
      heading: "化学考古：元素与运动共同作证",
      body: [
        "恒星保留着形成气体的部分元素记录。[α/Fe]等丰度比受到不同类型超新星的产额与时间分布影响，也受气体流入、流出和成星历史影响。它可以帮助比较不同族群，却不是由单一成星速率控制、没有其他参数的时钟。",
        "Helmi等2018年结合Gaia DR2运动、光谱化学与年龄线索，辨认出约100亿年前Gaia–Enceladus并合的重要残迹。径向运动、相对低α族群与年龄信息相互补充，让混合在银河晕中的恒星重新显出共同经历。具体祖星系质量仍依化学演化和动力学模型。",
        "Gaia与APOGEE、GALAH等光谱资料能够在不同样本上结合位置、速度和化学。DR3提供约3380万颗恒星径向速度，其他光谱参数和丰度属于各自受限的子样本。不同并合碎片的辨认也有各自的观测与研究历史，不能将它们统归给同一篇论文或一个数据发布。",
      ],
    },
    {
      heading: "本地薄片与空洞：本动是一组矢量",
      body: [
        "本星系群还处在更大的本地薄片Local Sheet环境中。Tully等2008年展示的一个选样切片为SGZ=0上下各1.5Mpc，总厚度3Mpc；这是一种观察和分析近邻分布的几何选法，并非所有成员都被压在一块测得厚度正好1.5Mpc的均匀板中。",
        "该文把本地薄片相对CMB约631km/s的运动分成三个近于正交的尺度贡献：远离本地空洞约259、朝室女座约185，以及较远结构约455km/s。它们需要按方向合成，不能直接换算成几个速率占总速率的百分比。",
        "空洞是相对平均密度的欠密区，仍可含星系和细丝。所谓被空洞「推开」描述的是较弱吸引与差异膨胀造成的相对运动，不引入负质量或新的排斥力。本地空洞向超星系北极方向展开，形状与边界依重建；这种不均匀的近邻环境可以与足够大尺度上的统计均匀性共存。",
      ],
    },
    {
      heading: "零速度面：当前的转向尺度",
      body: [
        "在球对称膨胀与坍缩模型中，零速度半径R₀描述此刻相对群心平均径向速度为零的尺度，附近本动抵消背景膨胀。它是一项运动学诊断，而不是可以触摸的边界；群内系统是否维里化、个别对象未来是否束缚，还要考虑轨道和势的演化。",
        "Karachentsev等2009年用30个邻近星系的距离与速度拟合，得到R₀=0.96±0.03Mpc。在文中Ωm=0.24的平直宇宙模型下，推得总质量(1.9±0.2)×10¹²M⊙。换宇宙学参数、成员样本或距离标尺时，应重新评估模型与误差。",
        "这类外围膨胀检验与双主星系的timing argument、卫星运动等质量估计具有不同的假设。比较它们可以检验非球对称、外部环境与速度信息的作用。逃逸速度同样取决于位置、质量分布和势的零点，在演化的多体环境中，不能用一个固定速率判断所有候选成员的命运。",
      ],
    },
    {
      heading: "2025与2026：并合概率为何会变",
      body: [
        "Sawala等2025年将银河系、M31、M33和LMC及其观测误差纳入模型，得到未来100亿年约一半样本不发生银河系–M31并合。这个比例来自指定初始条件分布中的模拟，不是望远镜直接测到一枚未来事件的概率。",
        "Wu等2026年用不同的更新自行输入，在同类半解析框架中得到基准并合概率约90%、中位时间约65亿年，并强调对M31自行的敏感性。其积分到100亿年，将两质心三维距离小于20kpc记为并合。不同输入、质量和事件判据，都需要保留在数字旁。",
        "两项模型的差异表明，微小自行及大卫星的反冲可能显著影响远期轨道。比较研究时，先统一参考系、初值和并合定义，比把一个新数字称为已确定命运更有意义。近掠、引力束缚、盘面扰动和质心进入某个距离阈值，也不是完全相同的事件。",
      ],
    },
    {
      heading: "LMC尾迹：观测恒星，检验晕的响应",
      body: [
        "LMC进入银河系时，其引力会扰动恒星和暗物质晕，并伴随银河系内外区域的相对响应。Garavito-Camargo等2019年的N体模拟研究了过去20亿年的相互作用，预言沿轨道的局部尾迹以及更大范围的密度与运动变化，为观测搜寻提供了具体目标。",
        "Conroy等2021年用银心距60–100kpc的1301颗恒星构建天空密度图，报告局部尾迹及北天过密度。尾迹位置与包含LMC作用的模拟相符，但观测密度反差比该模拟更强。这里看到的是发光恒星的分布，以此检验引力响应；它并非暗物质粒子的直接图像，也不是某个完全黑暗亚晕被单独发现。",
        "尾迹的方向、形态和强度可以帮助约束LMC轨道及银河系质量分布。与此同时，前景、样本选择、其他吸积残迹与非平衡动力学都需处理。它提醒我们：若把外晕恒星当成完全静态、平衡的示踪体，可能错过大卫星正在造成的系统影响。",
      ],
    },
    {
      heading: "数据发布之后，仍需要新的测量与模型",
      body: [
        "截至2026年10月，ESA将Gaia DR4列为预计2026年12月发布，覆盖66个月观测。任务在2025年1月结束科学观测，数据整理与后续发布继续进行。计划日期与已发表结果应分开记录，发布更多资料也不自动保证某个星系自行或暗物质形状达到预定精度。",
        "自行是角速度；换成横向速度须结合距离。在780kpc处，20km/s约对应每年5.4微角秒。扩展星系中的单星测量、成员选择、盘内运动和质心估计，构成从资料到轨道的多个步骤，仪器图像分辨率与最终天体测量精度也不是同一指标。",
        "更完整的近邻图景需要多种样本：微弱卫星、潮汐流、外晕恒星和主星系自行相互补充。候选体需确认其性质和成员关系，模型则需说明初值与系统误差。这样，新增数据才能真正收紧本星系群的质量、吸积史与未来轨道，而不是把一次发布当作所有问题同时得到答案。",
      ],
    },
  ],
  sources: [
    {
      label: "McConnachie2012 · 近邻矮星系、成员口径与Table2距离",
      url: "https://arxiv.org/abs/1204.1562",
      kind: "paper",
    },
    {
      label: "Sohn等2012 · HST首次测M31自行",
      url: "https://arxiv.org/abs/1205.6863",
      kind: "paper",
    },
    {
      label: "Sawala等2025 · 银河系–M31并合并非确定",
      url: "https://doi.org/10.1038/s41550-025-02563-1",
      kind: "paper",
    },
    {
      label: "Wu等2026 · 更新自行输入下的并合模型与敏感性",
      url: "https://arxiv.org/abs/2603.22863",
      kind: "paper",
    },
    {
      label: "Helmi等2018 · Gaia–Enceladus并合证据",
      url: "https://arxiv.org/abs/1806.06038",
      kind: "paper",
    },
    {
      label: "Drlica-Wagner等2020 · DES/PS1卫星选择函数",
      url: "https://arxiv.org/abs/1912.03302",
      kind: "paper",
    },
    {
      label: "Karachentsev等2009 · Local Group周围哈勃流",
      url: "https://arxiv.org/abs/0811.4610",
      kind: "paper",
    },
    {
      label: "Tully等2008 · 本地空洞与本动矢量分解",
      url: "https://arxiv.org/abs/0705.4139",
      kind: "paper",
    },
    {
      label: "Gaia合作组2023 · DR3数据内容与巡天性质",
      url: "https://doi.org/10.1051/0004-6361/202243940",
      kind: "paper",
    },
    {
      label: "Putman等2003 · Magellanic Stream及周围HI结构",
      url: "https://arxiv.org/abs/astro-ph/0209127",
      kind: "paper",
    },
    {
      label: "Majewski等2003 · 人马座矮星系与潮汐臂轨道平面",
      url: "https://arxiv.org/abs/astro-ph/0304198",
      kind: "paper",
    },
    {
      label: "Conroy等2021 — LMC引起的外晕恒星密度响应",
      url: "https://arxiv.org/abs/2104.09515",
      kind: "paper",
    },
    {
      label: "Garavito-Camargo等2019 — LMC与银河晕尾迹模拟",
      url: "https://arxiv.org/abs/1902.05089",
      kind: "paper",
    },
    {
      label: "Erkal与Belokurov2015 — 用潮汐流缺口推断亚晕性质",
      url: "https://arxiv.org/abs/1507.05625",
      kind: "paper",
    },
    {
      label: "ESA Gaia — 任务与数据发布计划",
      url: "https://www.esa.int/Science_Exploration/Space_Science/Gaia",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "milky-way",
      name: {
        primary: "银河系",
        latin: "Milky Way",
      },
      position: [0, 0, 0],
      description:
        "我们居住的带棒旋涡盘面，盘径 ~30 kpc，含约 1000 亿颗恒星。下一档 T4 是它的特写。",
      data: [
        {
          label: "盘径",
          value: "~30 kpc",
        },
        {
          label: "成员数",
          value: "~10¹¹",
        },
        {
          label: "下钻",
          value: "T4",
        },
      ],
      color: "#fff0c4",
      size: 0.018,
    },
    {
      id: "andromeda",
      name: {
        primary: "仙女星系 / M31",
        latin: "Andromeda Galaxy",
      },
      position: [-0.376, -0.287, 0.621],
      description:
        "本群两大主要星系之一，McConnachie2012编录距离783±25kpc。相对银河系的径向速度约−110km/s；亮度与盘面大小不直接决定总暗晕质量排名。未来近遇及并合依横向运动、LMC/M33、质量与模拟条件，不能给45亿年必然合并。",
      data: [
        {
          label: "距离",
          value: "780 kpc",
        },
        {
          label: "轨道预报",
          value: "依模型与自行输入",
        },
        {
          label: "径向速度",
          value: "-110 km/s",
        },
      ],
      color: "#ffe0b8",
      size: 0.024,
    },
    {
      id: "triangulum",
      name: {
        primary: "三角座星系 / M33",
        latin: "Triangulum Galaxy",
      },
      position: [-0.476, -0.42, 0.501],
      description:
        "本群第三个主要旋涡星系，McConnachie2012距离编录809±22kpc。它与M31的束缚和近掠史依赖轨道模型；不能仅凭两者附近的HI结构就认定已经发生某次近距离碰撞。",
      data: [
        {
          label: "距离",
          value: "约810 kpc（2012编录）",
        },
        {
          label: "与M31关系",
          value: "需轨道模型检验",
        },
        {
          label: "类型",
          value: "SA(s)cd",
        },
      ],
      color: "#d8e1ff",
      size: 0.016,
    },
    {
      id: "lmc",
      name: {
        primary: "大麦哲伦云",
        latin: "Large Magellanic Cloud",
      },
      position: [0.008, -0.027, -0.041],
      description:
        "银河系明亮的近邻卫星，距离约50kpc，具有棒状结构与不规则星形成。1987年其中爆发的SN1987A带来来自超新星的中微子信号，是多信使天文学的重要里程碑；中微子天文学在此前已有太阳中微子等工作。",
      data: [
        {
          label: "距离",
          value: "50 kpc",
        },
        {
          label: "主要结构",
          value: "棒状恒星结构",
        },
        {
          label: "标志事件",
          value: "SN 1987A",
        },
      ],
      color: "#ffc88a",
      size: 0.011,
    },
    {
      id: "smc",
      name: {
        primary: "小麦哲伦云",
        latin: "Small Magellanic Cloud",
      },
      position: [0.025, -0.045, -0.039],
      description:
        "银河系近邻卫星，距离约60多kpc。连接LMC与SMC的是Magellanic Bridge；延伸在两云之后的长气体流叫Magellanic Stream，不能互换名称。潮汐和气体动力学共同影响这些结构，不能仅凭气桥就断言两云正在被银河系吞并。",
      data: [
        {
          label: "距离",
          value: "64 kpc",
        },
        {
          label: "相关结构",
          value: "气桥与长气体流",
        },
        {
          label: "气体桥",
          value: "Magellanic Bridge",
        },
      ],
      color: "#ffc88a",
      size: 0.009,
    },
    {
      id: "sagittarius-dsph",
      name: {
        primary: "人马座矮椭球",
        latin: "Sagittarius dSph",
      },
      position: [0.025, -0.006, 0.002],
      description:
        "距离约26kpc的银河系矮卫星，正被潮汐剥离。Sagittarius恒星流沿其轨道环绕银河，轨道平面不等于银河盘面。它让我们能追踪星系吸积，并用空间与速度信息检验银河引力势。",
      data: [
        {
          label: "距离",
          value: "26 kpc",
        },
        {
          label: "类型",
          value: "dSph",
        },
        {
          label: "状态",
          value: "正在解体",
        },
      ],
      color: "#ffd7a0",
      size: 0.008,
    },
    {
      id: "local-sheet",
      name: {
        primary: "本地薄片",
        latin: "Local Sheet",
      },
      position: [0.45, 0.05, -0.15],
      description:
        "本星系群及若干近邻系统所在的薄片状结构。Tully2008展示SGZ=0±1.5Mpc的切片；局部本动可分为远离Local Void、朝Virgo和更远结构等不同方向贡献，不是整片以270km/s统一朝Virgo运动。此处标记表示扩展结构，不是一个点状天体。",
      data: [
        {
          label: "展示切片",
          value: "SGZ=0±1.5Mpc（2008）",
        },
        {
          label: "本动",
          value: "多尺度矢量叠加",
        },
        {
          label: "2008分量",
          value: "259/185/455km/s，方向不同",
        },
      ],
      color: "#9ec8ff",
      size: 0.022,
    },
    {
      id: "gse-debris",
      name: {
        primary: "Gaia-Sausage-Enceladus 化石",
        latin: "GSE Merger Debris",
      },
      position: [0.02, 0.035, 0.018],
      description:
        "GaiaDR2结合光谱化学与年龄证据，支持银河系约100亿年前经历一次重要吸积事件。Helmi等2018称为Gaia–Enceladus；Gaia–Sausage强调同批相关晕星强径向运动。其残骸是内晕的重要组成，并可能加热厚盘前身；图上点位为便于选取的标签，不是残骸空间大小。",
      data: [
        {
          label: "并合时间",
          value: "≈ 8–10 Gyr ago",
        },
        {
          label: "祖星系质量",
          value: "约6×10⁸ M⊙（Helmi2018化学模型）",
        },
        {
          label: "发现",
          value: "Gaia DR2 (Helmi 2018)",
        },
      ],
      color: "#ffaf78",
      size: 0.012,
    },
  ],
  discussionQuestions: [
    "为什么测得M31沿视线靠近，仍不足以确定未来并合时间？怎样比较采用不同自行与质量输入的模型？",
    "用微弱卫星和恒星流研究暗物质时，各有哪些选择效应与动力学假设？",
    "LMC尾迹的恒星密度观测怎样约束引力模型？它与直接探测暗物质粒子提供的信息有何不同？",
  ],
};

export default content;

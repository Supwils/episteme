import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "T3",
  name: { primary: "本星系群", latin: "Local Group" },
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
  ],
  narrative: [
    {
      heading: "两个主要质量中心，还有孤立的近邻",
      body: [
        "银河系和M31是本星系群的两个主要质量中心，分别伴随许多矮卫星；但并非所有成员都绕着这两个大星系作已知闭合轨道，外缘还有较孤立的矮星系。M33是第三个主要旋涡星系，与M31的束缚关系和过去近掠史需要结合自行、质量和轨道模型。",
        "成员不是一个永久固定的数目。McConnachie2012在太阳周围3Mpc搜集100个邻近星系（另计银河系与M31），其中73个被列为本星系群明确或很可能成员。把“3Mpc范围的全部星系”“本群成员”与某次目录计数混在一起，会让不同页面的数字表面矛盾。",
      ],
    },
    {
      heading: "正在靠近，并不等于命运已定",
      body: [
        "在银河心参考系下，M31相对银河系的径向速度约−110km/s；日心观测速度则约−300km/s，两者不能直接混用。2012年HST多年基线首次测得M31自行，为横向运动提供约束，仍须校正星系内部运动及太阳运动才能推得质心轨道。",
        "早期模型预报未来数十亿年近遇与合并。Sawala等2025纳入M33、LMC及观测误差，得到未来100亿年约一半样本不合并；Wu等2026采用不同的更新自行输入，在同类半解析框架下基准合并概率约90%、中位时间约65亿年，但对M31自行仍很敏感。2026模型将两质心三维间距小于20kpc记为并合，并积分到100亿年；这些是给定输入与判据下的模拟比例，不是一次直接测得的命运概率，更不能继续写45亿年必然迎头相撞。",
      ],
    },
    {
      heading: "矮星系：很暗，也很有信息",
      body: [
        "成员包括矮椭球、矮不规则等多种形态。许多弥散矮星系的恒星运动需要远大于可见恒星的动力学质量，成为暗物质研究对象；具体质光比必须标明波段、测量半径、动力学平衡假设以及双星和潮汐等影响，不能把所有成员平均成同一个50。",
        "人马座矮椭球正被银河系潮汐剥离，留下环绕银河的恒星流。其轨道平面与银河盘显著不同，不是沿银河盘面拖出的一条带子。用星流的空间与速度结构约束引力势，还要容纳LMC扰动和银河系随时间变化。",
      ],
    },
    {
      heading: "缺失卫星：选择效应与成星物理要一起比较",
      body: [
        "暗物质模拟中的亚晕不是一一对应可见星系。若直接拿全部亚晕数与某一巡天的亮卫星数比较，就忽略了再电离、反馈及观测选择。最小亚晕未必保留足够气体形成可探测的恒星系统。",
        "DES和Pan-STARRS等扩大了微弱卫星的搜寻范围。Drlica-Wagner等2020用注入模拟标定检出率，明确其该次一致搜寻没有新高显著候选，而是恢复已有对象并建立选择函数。Rubin/LSST的未来或正在积累的样本应按实际数据发布陈述，不能用“2024+已在过去十年发现几十个”替代证据。",
      ],
    },
    {
      heading: "化学考古：运动与元素的联合线索",
      body: [
        "[α/Fe]随形成环境、产额与气体流入流出共同变化。相对低的[α/Fe]常与Ia型超新星有时间贡献铁的较慢富集史相符，但它不是一条只由成星速率决定的唯一时钟，也不证明任一低α星一定来自矮星系。",
        "Gaia DR2的精密运动结合光谱丰度和年龄，让Helmi等2018辨认出约100亿年前Gaia–Enceladus并合的残迹，说明内晕与厚盘历史有重要吸积成分。DR3进一步提供约3380万颗恒星径向速度和部分恒星的光谱参数；不能说这些恒星都同时有同等精度的完整化学丰度。",
      ],
    },
    {
      heading: "本地薄片与空洞：矢量相加的本动",
      body: [
        "Tully等2008把本星系群及若干近邻系统所在结构称为Local Sheet。论文展示的一个切片为SGZ=0上下各1.5Mpc，这是选样几何，不是测得所有成员压在总厚1.5Mpc的均匀板里。",
        "该文将本地薄片相对CMB的约631km/s分成三个近于正交的尺度贡献：远离本地空洞约259、朝室女座约185、更远结构约455km/s，必须按方向相加。原来的270km/s不是全片统一朝Virgo的速度；空洞也不是负质量在排斥，而是相对平均密度的欠密区造成较弱吸引与差异膨胀。本地空洞朝超星系北极方向展开，非银河反中心一颗直径固定的空球。",
      ],
    },
    {
      heading: "零速度面：当前转向尺度，不是硬壳",
      body: [
        "在球对称膨胀/坍缩模型里，零速度半径R₀指此刻相对群心平均径向速度为零的转向尺度，附近的本动抵消背景膨胀。这一运动学定义不意味着球内每个天体已经维里化，也不单凭当前位置就保证未来束缚；非球对称、切向运动与暗能量会影响更完整的轨道判断。",
        "Karachentsev等2009对30个邻近星系的距离和速度拟合得到R₀=0.96±0.03Mpc，在文中Ωm=0.24的平直宇宙模型下推得总质量(1.9±0.2)×10¹²M⊙。应将它写成指定方法和模型的历史测量，而不是1.05Mpc的唯一真实边界，也不能无条件宣称与所有timing argument结果都在30%内一致。",
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
  ],
  // Illustrative positions use heliocentric galactic directions and rounded distances.
  // The Milky Way is drawn at the origin; this is not a precise Galactocentric orbit map.
  markers: [
    {
      id: "milky-way",
      name: { primary: "银河系", latin: "Milky Way" },
      position: [0, 0, 0],
      description:
        "我们居住的带棒旋涡盘面，盘径 ~30 kpc，含约 1000 亿颗恒星。下一档 T4 是它的特写。",
      data: [
        { label: "盘径", value: "~30 kpc" },
        { label: "成员数", value: "~10¹¹" },
        { label: "下钻", value: "T4" },
      ],
      color: "#fff0c4",
      size: 0.018,
    },
    {
      id: "andromeda",
      name: { primary: "仙女星系 / M31", latin: "Andromeda Galaxy" },
      // galacticToScene(121.17°, -21.57°, 780 kpc)
      position: [-0.376, -0.287, 0.621],
      description:
        "本群两大主要星系之一，McConnachie2012编录距离783±25kpc。相对银河系的径向速度约−110km/s；亮度与盘面大小不直接决定总暗晕质量排名。未来近遇及并合依横向运动、LMC/M33、质量与模拟条件，不能给45亿年必然合并。",
      data: [
        { label: "距离", value: "780 kpc" },
        { label: "轨道预报", value: "依模型与自行输入" },
        { label: "径向速度", value: "-110 km/s" },
      ],
      color: "#ffe0b8",
      size: 0.024,
    },
    {
      id: "triangulum",
      name: { primary: "三角座星系 / M33", latin: "Triangulum Galaxy" },
      // galacticToScene(133.6°, -31.3°, 809 kpc), McConnachie 2012 Table 2
      position: [-0.476, -0.42, 0.501],
      description:
        "本群第三个主要旋涡星系，McConnachie2012距离编录809±22kpc。它与M31的束缚和近掠史依赖轨道模型；不能仅凭两者附近的HI结构就认定已经发生某次近距离碰撞。",
      data: [
        { label: "距离", value: "约810 kpc（2012编录）" },
        { label: "与M31关系", value: "需轨道模型检验" },
        { label: "类型", value: "SA(s)cd" },
      ],
      color: "#d8e1ff",
      size: 0.016,
    },
    {
      id: "lmc",
      name: { primary: "大麦哲伦云", latin: "Large Magellanic Cloud" },
      // galacticToScene(280.5°, -32.9°, 50 kpc)
      position: [0.008, -0.027, -0.041],
      description:
        "银河系明亮的近邻卫星，距离约50kpc，具有棒状结构与不规则星形成。1987年其中爆发的SN1987A带来来自超新星的中微子信号，是多信使天文学的重要里程碑；中微子天文学在此前已有太阳中微子等工作。",
      data: [
        { label: "距离", value: "50 kpc" },
        { label: "主要结构", value: "棒状恒星结构" },
        { label: "标志事件", value: "SN 1987A" },
      ],
      color: "#ffc88a",
      size: 0.011,
    },
    {
      id: "smc",
      name: { primary: "小麦哲伦云", latin: "Small Magellanic Cloud" },
      // galacticToScene(302.8°, -44.3°, 64 kpc)
      position: [0.025, -0.045, -0.039],
      description:
        "银河系近邻卫星，距离约60多kpc。连接LMC与SMC的是Magellanic Bridge；延伸在两云之后的长气体流叫Magellanic Stream，不能互换名称。潮汐和气体动力学共同影响这些结构，不能仅凭气桥就断言两云正在被银河系吞并。",
      data: [
        { label: "距离", value: "64 kpc" },
        { label: "相关结构", value: "气桥与长气体流" },
        { label: "气体桥", value: "Magellanic Bridge" },
      ],
      color: "#ffc88a",
      size: 0.009,
    },
    {
      id: "sagittarius-dsph",
      name: { primary: "人马座矮椭球", latin: "Sagittarius dSph" },
      // galacticToScene(5.6°, -14.1°, 26 kpc)
      position: [0.025, -0.006, 0.002],
      description:
        "距离约26kpc的银河系矮卫星，正被潮汐剥离。Sagittarius恒星流沿其轨道环绕银河，轨道平面不等于银河盘面。它让我们能追踪星系吸积，并用空间与速度信息检验银河引力势。",
      data: [
        { label: "距离", value: "26 kpc" },
        { label: "类型", value: "dSph" },
        { label: "状态", value: "正在解体" },
      ],
      color: "#ffd7a0",
      size: 0.008,
    },
    {
      id: "local-sheet",
      name: { primary: "本地薄片", latin: "Local Sheet" },
      // Roughly in-plane between Local Group and the Virgo / Centaurus direction,
      // offset perpendicular to the MW–M31 axis so it reads as a sheet, not a point.
      position: [0.45, 0.05, -0.15],
      description:
        "本星系群及若干近邻系统所在的薄片状结构。Tully2008展示SGZ=0±1.5Mpc的切片；局部本动可分为远离Local Void、朝Virgo和更远结构等不同方向贡献，不是整片以270km/s统一朝Virgo运动。此处标记表示扩展结构，不是一个点状天体。",
      data: [
        { label: "展示切片", value: "SGZ=0±1.5Mpc（2008）" },
        { label: "本动", value: "多尺度矢量叠加" },
        { label: "2008分量", value: "259/185/455km/s，方向不同" },
      ],
      color: "#9ec8ff",
      size: 0.022,
    },
    {
      id: "gse-debris",
      name: { primary: "Gaia-Sausage-Enceladus 化石", latin: "GSE Merger Debris" },
      // Placed close to MW (the debris lives in the inner halo), slightly offset.
      position: [0.02, 0.035, 0.018],
      description:
        "GaiaDR2结合光谱化学与年龄证据，支持银河系约100亿年前经历一次重要吸积事件。Helmi等2018称为Gaia–Enceladus；Gaia–Sausage强调同批相关晕星强径向运动。其残骸是内晕的重要组成，并可能加热厚盘前身；图上点位为便于选取的标签，不是残骸空间大小。",
      data: [
        { label: "并合时间", value: "≈ 8–10 Gyr ago" },
        { label: "祖星系质量", value: "约6×10⁸ M⊙（Helmi2018化学模型）" },
        { label: "发现", value: "Gaia DR2 (Helmi 2018)" },
      ],
      color: "#ffaf78",
      size: 0.012,
    },
  ],
  relatedArticles: [
    { href: "/cosmology/knowledge-base/星系形成与演化", title: "星系形成与演化" },
    { href: "/cosmology/knowledge-base/星系天文学--galaxy-clusters", title: "星系团" },
    { href: "/cosmology/knowledge-base/星系天文学--dwarf-galaxies", title: "矮星系" },
  ],
};

export default content;

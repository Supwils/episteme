import type { Curiosity } from "@/lib/curiosities";

export const COSMOLOGY_CURIOSITIES: Curiosity[] = [
  {
    id: "stars-vs-sand",
    title: "可观测宇宙的恒星，比地球上所有沙滩的沙粒还多",
    detail:
      "地球所有海滩的沙粒约 10^18–10^20 颗；而可观测宇宙的恒星估计有 10^22–10^24 颗。也就是说，每一粒沙背后，平均对应上万颗恒星。",
    source: "天文学常用量级估算",
    tags: ["恒星", "尺度"],
    url: "/cosmology",
  },
  {
    id: "tv-static-big-bang",
    title: "老电视的「雪花噪声」里，有一部分是大爆炸的余辉",
    detail:
      "没有信号时模拟电视的雪花，约百分之一来自宇宙微波背景辐射——138 亿年前大爆炸留下的最古老的光，正穿过你的客厅。",
    source: "宇宙微波背景（Penzias & Wilson, 1965）",
    tags: ["CMB", "大爆炸"],
    url: "/cosmology/knowledge-base",
  },
  {
    id: "andromeda-collision",
    title: "银河系正以每秒约 110 公里冲向仙女座，约 45 亿年后相撞",
    detail:
      "两个星系将合并成一个，但恒星之间距离极大，实际相撞的恒星几乎为零——这是一场几乎没有碰撞的「碰撞」。那时太阳还在，地球的夜空将彻底改变。",
    source: "哈勃测量（van der Marel et al., 2012）",
    tags: ["仙女座", "星系并合"],
    url: "/cosmology",
  },
  {
    id: "observable-universe-larger-than-age",
    title: "宇宙只有 138 亿岁，但可观测宇宙的直径却有 930 亿光年",
    detail:
      "这不矛盾：宇宙空间本身在膨胀，早期膨胀极快，所以当年发出光的区域如今已被「推」到 465 亿光年之外。空间本身的膨胀不受光速限制，所以可观测宇宙的边界一直在扩大。",
    source: "Wikipedia: Observable universe；标准宇宙学模型",
    tags: ["可观测宇宙", "宇宙膨胀", "共动距离"],
    url: "/cosmology",
  },
  {
    id: "distant-galaxies-faster-than-light",
    title: "此刻有无数星系正在以超过光速的速度「远离」我们，我们永远看不到它们",
    detail:
      "哈勃定律告诉我们，距离越远，退行速度越快。红移大于约 1.5 的星系，其退行速度已超过光速——但这不违反相对论，因为不是星系在空间中移动，而是它们之间的空间本身在扩张。那些星系发出的光永远无法到达我们。",
    source: "Davis & Lineweaver 2004, Publications of the Astronomical Society of Australia",
    tags: ["宇宙膨胀", "超光速退行", "哈勃定律"],
    url: "/cosmology",
  },
  {
    id: "dark-energy-dominates",
    title: "宇宙中约 68% 是暗能量，5% 是你能看到的一切",
    detail:
      "普通物质（恒星、行星、气体、你）只占宇宙能量组成的约 5%；暗物质约 27%；暗能量约 68%。暗能量是宇宙加速膨胀的驱动力，但我们至今不知道它是什么——这意味着我们对宇宙 95% 的主体几乎一无所知。",
    source: "Planck 2018 宇宙学参数；NASA Science",
    tags: ["暗能量", "暗物质", "宇宙组成"],
    url: "/cosmology",
  },
  {
    id: "hubble-tension-crisis",
    title: "用两种不同方法测量宇宙膨胀速度，得出的答案互相矛盾——这可能意味着新物理",
    detail:
      "「哈勃张力」：利用宇宙微波背景测得哈勃常数约 67.4 km/s/Mpc，而用造父变星/超新星等本地测距法测得约 73 km/s/Mpc，两者相差超过 5σ。这不是测量误差，而可能是早期宇宙存在未知物理的信号。",
    source: "Hubble tension review, Riess et al. 2022；Planck Collaboration 2020",
    tags: ["哈勃常数", "哈勃张力", "暗能量"],
    url: "/cosmology",
  },
  {
    id: "universe-flat",
    title: "宇宙在几何上是「平的」——精度达 0.4%，这要求暗能量几乎精确到令人不安的程度",
    detail:
      "WMAP 和 Planck 卫星测量表明，宇宙的空间曲率几乎精确为零（平直）——意味着平行线永远不会相交或汇聚。达到这种平直需要宇宙的能量密度极其精确地等于临界密度，暗能量的存在恰好「补足」了差额，这种精细调节令物理学家困惑至今。",
    source: "Planck 2018: ΩK = 0.001 ± 0.002",
    tags: ["宇宙几何", "平直宇宙", "精细调节"],
    url: "/cosmology",
  },
  {
    id: "boomerang-nebula-coldest",
    title: "已知自然界中最冷的地方，不是深空——而是 5000 光年外一团膨胀的气体",
    detail:
      "飞旋镖星云（Boomerang Nebula）温度约 1 开尔文，比宇宙微波背景（2.725 K）还低。它的低温来自一颗濒死恒星喷出气体的快速绝热膨胀。宇宙「背景底噪」已经够冷，而这团星云竟然更冷。",
    source: "Sahai & Nyman 1997；ALMA 后续观测",
    tags: ["飞旋镖星云", "极低温", "行星状星云"],
    url: "/cosmology",
  },
  {
    id: "quasar-water-reservoir",
    title: "120 亿光年外的类星体旁，有一片水蒸气云，水量相当于地球海洋的 140 万亿倍",
    detail:
      "天文学家在类星体 APM 08279+5255 周围发现了迄今已知最大的宇宙水汽储库。这片水云跨越数百光年，证明水分子在宇宙诞生后不久就已大量存在。水并非地球的专利，它是宇宙中普遍的化学产物。",
    source: "Bradford et al. 2011, ApJ Letters；NASA/ESA",
    tags: ["类星体", "水分子", "星际介质"],
  },
  {
    id: "voyager-one-light-day",
    title: "旅行者 1 号正接近距地球「一光天」的里程碑——人类制造的物体从未到过这么远",
    detail:
      "1977 年发射的旅行者 1 号目前距地球约 250 亿公里，信号往返需约 47 小时。2026 年前后它将成为第一个距地球整整一光天（约 260 亿公里）的人造物体。即便如此，它抵达最近恒星系（半人马座 α）还需约 7.3 万年。",
    source: "NASA JPL Voyager Mission Status；CNN 2025 报道",
    tags: ["旅行者号", "星际探测", "太空探索"],
  },
  {
    id: "largest-structure-universe",
    title: "宇宙中最大的已知结构，长达 100 亿光年，比可观测宇宙直径的十分之一还大",
    detail:
      "「武仙-北冕座长城」（Hercules-Corona Borealis Great Wall）是一个由星系超密集分布构成的巨型结构，长约 100 亿光年（部分研究认为可达 150 亿光年）。它的存在本身就令宇宙学家头疼：在标准宇宙学模型中，这种规模的结构理论上不应该存在。",
    source: "Horváth et al. 2014；IFLScience 2024 更新",
    tags: ["宇宙大尺度结构", "超星系团", "宇宙学"],
    url: "/cosmology",
  },
  {
    id: "gravitational-wave-black-holes-1-3-billion",
    title: "LIGO 探测到的引力波，来自 13 亿年前两个黑洞的碰撞——那时地球还没有复杂生命",
    detail:
      "2015 年 9 月 14 日，LIGO 探测到引力波事件 GW150914：两个分别约 29 和 36 倍太阳质量的黑洞，在 13 亿年前合并，释放出相当于三个太阳质量的能量——全部以引力波形式辐射出去，仅在 0.2 秒内完成。那一瞬间的功率超过了所有可观测宇宙中所有恒星的总发光功率。",
    source: "LIGO Scientific Collaboration, GW150914, PRL 2016",
    tags: ["引力波", "黑洞并合", "LIGO"],
  },
  {
    id: "cmb-everywhere-ancient",
    title: "宇宙微波背景辐射来自 38 万年——而非 138 亿年——的宇宙，那是光第一次能自由传播的时刻",
    detail:
      "大爆炸后约 38 万年，宇宙冷却到足以让电子与质子结合成氢原子，宇宙从不透明变得透明。这一刻释放的光子，经过 138 亿年的旅行和红移，冷却为我们今天看到的 2.725 K 微波背景——它是宇宙婴儿期的照片，印刻在整个天空的每一个方向。",
    source: "Penzias & Wilson 1965；COBE/WMAP/Planck 卫星",
    tags: ["CMB", "宇宙微波背景", "复合时期"],
    url: "/cosmology",
  },
  {
    id: "dark-matter-invisible-but-real",
    title: "银河系中有一种物质，占总质量约 85%，从未被直接「看到」，但我们知道它就在那里",
    detail:
      "暗物质的证据无处不在：星系旋转曲线、引力透镜、宇宙大尺度结构——都指向一种不发光、不与光相互作用的物质。没有它，星系会在自身引力下解体。但半个世纪过去，我们仍不知道暗物质粒子是什么。",
    source: "Zwicky 1933；Rubin & Ford 1970；Planck 2018",
    tags: ["暗物质", "星系旋转曲线", "宇宙学"],
    url: "/cosmology",
  },
  {
    id: "universe-oldest-star",
    title: "距我们仅 190 光年处，有一颗恒星几乎与宇宙一样古老",
    detail:
      "HD 140283（「玛土撒拉星」）是一颗金属丰度极低的古老恒星，年龄估计约 130 亿年——接近宇宙年龄 138 亿年，误差范围内几乎与宇宙同龄。它是第一批超新星遗留下来的第二代恒星的候选者，是宇宙化学演化的活化石。",
    source: "Bond et al. 2013；revised Bond et al. 2021 (12.01 ± 0.05 Gyr)",
    tags: ["古老恒星", "宇宙年龄", "恒星演化"],
  },
  {
    id: "universe-mostly-unreachable",
    title: "即使以光速飞行，宇宙中绝大多数星系我们此生永远无法到达",
    detail:
      "由于宇宙加速膨胀，今天距离我们超过约 160 亿光年（哈勃体积以外）的星系，我们发出的任何信号都永远追不上它们的退行速度。宇宙中大约 97% 的区域对我们而言是永远的「宇宙地平线」之外，这个比例随时间还会继续增大。",
    source: "Lineweaver & Davis 2005, Scientific American",
    tags: ["宇宙地平线", "宇宙膨胀", "可达性"],
    url: "/cosmology",
  },
  {
    id: "earth-water-older-than-sun",
    title: "地球上相当一部分水，比太阳还古老",
    detail:
      "最新研究表明，地球的水有可能来自太阳系形成之前就存在于星际尘埃云中的冰。金牛座 V883 Ori 星盘中水的同位素组成与地球相似，支持地球水源自星际介质的理论。这意味着你喝的每一口水，部分分子的历史可能超过 46 亿年。",
    source: "Tobin et al. 2023, Nature；ESO 新闻稿",
    tags: ["地球水", "星际介质", "太阳系起源"],
  },
];

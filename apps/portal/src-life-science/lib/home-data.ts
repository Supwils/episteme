export const ERAS = [
  {
    id: "hadean",
    era: "45—40 亿年前",
    eraLabel: "冥古宙",
    title: "生命的起源",
    subtitle: "Origin of Life",
    description:
      "地球形成初期的熔融世界，陨石轰击、岩浆海洋。在深海热泉或原始汤中，第一批有机分子自我复制，生命从无到有的伟大开端。",
    href: "/life-science/timeline",
    markers: ["RNA 世界", "深海热泉", "原始汤"],
    accent: "#d85a5a",
  },
  {
    id: "archean",
    era: "40—25 亿年前",
    eraLabel: "太古宙",
    title: "蓝藻与大氧化",
    subtitle: "Cyanobacteria & Great Oxidation",
    description:
      "蓝藻学会光合作用，释放氧气改变大气。大氧化事件消灭了大部分厌氧生物，却为复杂生命铺平道路。叠层石记录了最早的生物建筑。",
    href: "/life-science/timeline",
    markers: ["蓝藻", "叠层石", "大氧化事件"],
    accent: "#e8a840",
  },
  {
    id: "proterozoic",
    era: "25—5.4 亿年前",
    eraLabel: "元古宙",
    title: "多细胞生命的崛起",
    subtitle: "Rise of Multicellular Life",
    description:
      "真核生物出现，细胞有了细胞核和线粒体。埃迪卡拉生物群——地球上最早的多细胞动物——在海底展开奇异的生命实验。",
    href: "/life-science/timeline",
    markers: ["真核生物", "埃迪卡拉", "雪球地球"],
    accent: "#5cb87a",
  },
  {
    id: "paleozoic",
    era: "5.4—2.5 亿年前",
    eraLabel: "古生代",
    title: "寒武纪大爆发",
    subtitle: "Cambrian Explosion",
    description:
      "在短短数百万年内，几乎所有现代动物门类突然出现。三叶虫统治海洋，鱼类演化出颌骨，两栖动物首次登上陆地，石炭纪的巨型昆虫和广袤森林。",
    href: "/life-science/timeline",
    markers: ["寒武纪爆发", "三叶虫", "登陆"],
    accent: "#5a9ad8",
  },
  {
    id: "mesozoic",
    era: "2.5 亿—6600 万年前",
    eraLabel: "中生代",
    title: "恐龙时代",
    subtitle: "Age of Dinosaurs",
    description:
      "恐龙统治地球长达 1.9 亿年。翼龙翱翔天空，鱼龙畅游海洋。被子植物绽放，哺乳动物在恐龙的阴影下悄然演化。直到小行星撞击终结一切。",
    href: "/life-science/timeline",
    markers: ["恐龙", "被子植物", "K-Pg 灭绝"],
    accent: "#98c379",
  },
  {
    id: "cenozoic",
    era: "6600 万年前—至今",
    eraLabel: "新生代",
    title: "哺乳动物的纪元",
    subtitle: "Age of Mammals",
    description:
      "恐龙灭绝后，哺乳动物迅速辐射演化。鲸鱼回到海洋，蝙蝠飞上天空，灵长类在非洲丛林中发展出更大的大脑，为人类的出现奠定基础。",
    href: "/life-science/timeline",
    markers: ["哺乳动物辐射", "灵长类", "草原扩张"],
    accent: "#c8a45a",
  },
  {
    id: "pleistocene",
    era: "258 万—1.17 万年前",
    eraLabel: "更新世",
    title: "冰河时代与人类",
    subtitle: "Ice Age & Human Evolution",
    description:
      "反复的冰期塑造了地球面貌。人属从非洲走出，直立人学会用火，尼安德特人与智人共存。认知革命点燃了文化的火花。",
    href: "/life-science/timeline",
    markers: ["冰期", "直立人", "认知革命"],
    accent: "#a88adf",
  },
  {
    id: "holocene",
    era: "1.17 万年前—至今",
    eraLabel: "全新世",
    title: "文明与第六次大灭绝",
    subtitle: "Civilization & Sixth Extinction",
    description:
      "农业革命改变了人类与自然的关系。工业化加速了物种灭绝。我们正经历地球第六次大灭绝，同时也是唯一能理解并改变这一进程的物种。",
    href: "/life-science/timeline",
    markers: ["农业革命", "第六次灭绝", "生物多样性"],
    accent: "#4a9e6f",
  },
] as const;

export const FEATURED_SPECIES = [
  { name: "三叶虫", latin: "Trilobita", era: "5.2 亿年前", period: "寒武纪", icon: "🦠", accent: "#5a9ad8" },
  { name: "邓氏鱼", latin: "Dunkleosteus", era: "3.8 亿年前", period: "泥盆纪", icon: "🐟", accent: "#5a9ad8" },
  { name: "霸王龙", latin: "Tyrannosaurus rex", era: "6800 万年前", period: "白垩纪", icon: "🦖", accent: "#98c379" },
  { name: "猛犸象", latin: "Mammuthus", era: "400 万年前", period: "新近纪", icon: "🐘", accent: "#c8a45a" },
  { name: "渡渡鸟", latin: "Raphus cucullatus", era: "1662 年灭绝", period: "全新世", icon: "🐦", accent: "#a88adf" },
  { name: "腔棘鱼", latin: "Latimeria", era: "4 亿年前", period: "泥盆纪", icon: "🐠", accent: "#4a9e6f" },
] as const;

export const QUICK_LINKS = [
  { href: "/life-science/timeline", label: "进化时间线", icon: "⏳", description: "40 亿年生命演化的关键节点与里程碑", accent: "#4a9e6f" },
  { href: "/life-science/tree", label: "生命之树", icon: "🌿", description: "从 LUCA 到所有现存物种的系统发育关系", accent: "#5cb87a" },
  { href: "/life-science/species", label: "物种图鉴", icon: "🦋", description: "88 关键物种的详细档案与演化故事", accent: "#c8a45a" },
  { href: "/life-science/extinctions", label: "大灭绝", icon: "☄", description: "5 次大灭绝事件的原因、过程与后果", accent: "#d85a5a" },
  { href: "/life-science/scientists", label: "科学家", icon: "🔬", description: "15 改变我们理解生命的伟大科学家", accent: "#5a9ad8" },
  { href: "/life-science/food-web", label: "食物网", icon: "🕸", description: "探索生态系统中物种间的捕食关系与能量流动", accent: "#9b6db7" },
] as const;

export const STATS = [
  { value: 8, label: "地质时代", suffix: "个" },
  { value: 88, label: "关键物种", suffix: "" },
  { value: 5, label: "大灭绝", suffix: "次" },
  { value: 15, label: "科学家", suffix: "位" },
] as const;

export const FLOATING_SYMBOLS = ["🧬", "🌿", "🦴", "🔬", "☄", "🦠", "🌋", "DNA"] as const;

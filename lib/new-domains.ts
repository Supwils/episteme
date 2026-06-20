/**
 * Configuration for domains driven by the generic knowledge-domain engine
 * (lib/knowledge-domain.ts). Adding a section here + dropping content +
 * generating the thin route files is all a new section needs.
 */
export interface DomainSectionConfig {
  /** URL segment and content subdirectory, e.g. "pioneers". */
  key: string;
  /** Nav + list-page label, e.g. "先驱". */
  label: string;
  /** Hex accent for this section's chips and list page. */
  accent: string;
  /** Emoji shown on the domain home card. */
  icon: string;
  /** One-line description for nav/home card. */
  description: string;
}

export interface DomainConfig {
  domain: string;
  label: string;
  labelEn: string;
  /** Home hero subtitle. */
  tagline: string;
  accent: string;
  sections: DomainSectionConfig[];
}

export const COMPUTER_SCIENCE: DomainConfig = {
  domain: "computer-science",
  label: "计算机科学",
  labelEn: "Computer Science",
  tagline:
    "从图灵机到大语言模型——计算如何成为理解世界、改造世界的新语言。算法、抽象、复杂性，以及它们正在抵达的边界。",
  accent: "#4f9cf0",
  sections: [
    {
      key: "pioneers",
      label: "先驱",
      accent: "#4f9cf0",
      icon: "👤",
      description: "图灵、冯·诺伊曼、香农、Dijkstra、Knuth 到 Hinton——奠定计算的人",
    },
    {
      key: "concepts",
      label: "核心概念",
      accent: "#56b6c2",
      icon: "💡",
      description: "抽象、递归、类型、并发、缓存、虚拟化——计算思维的基本词汇",
    },
    {
      key: "algorithms",
      label: "算法",
      accent: "#98c379",
      icon: "🔀",
      description: "排序、图搜索、动态规划、哈希、加密、机器学习——解决问题的配方",
    },
    {
      key: "theory",
      label: "计算理论",
      accent: "#c678dd",
      icon: "🧮",
      description: "可计算性、P/NP、信息论、自动机、密码学——计算的数学骨架",
    },
  ],
};

export const POLITICAL_SCIENCE: DomainConfig = {
  domain: "political-science",
  label: "政治学",
  labelEn: "Political Science",
  tagline:
    "权力如何被获得、约束与正当化？从主权与正义的古老追问，到自由主义、社会主义、现实主义的交锋，再到全球治理与地缘格局的当代重组。",
  accent: "#c25b5b",
  sections: [
    {
      key: "thinkers",
      label: "政治思想家",
      accent: "#c25b5b",
      icon: "👤",
      description: "霍布斯、洛克、卢梭、马克思、阿伦特、罗尔斯、亨廷顿——追问权力与正义的人",
    },
    {
      key: "isms",
      label: "政治主义",
      accent: "#e0a458",
      icon: "🏛",
      description: "自由主义、保守主义、社会主义、民族主义、现实主义、建构主义",
    },
    {
      key: "concepts",
      label: "核心概念",
      accent: "#d49a6a",
      icon: "💡",
      description: "主权、权力、合法性、民主、正义、国家、公民身份",
    },
    {
      key: "institutions",
      label: "制度与政体",
      accent: "#a88adf",
      icon: "⚖",
      description: "民主与威权、议会制与总统制、联邦制、选举与宪政",
    },
    {
      key: "international-relations",
      label: "国际关系",
      accent: "#6b9bd1",
      icon: "🌍",
      description: "国际秩序、地缘政治、全球治理、战争与和平、大国博弈",
    },
  ],
};

export const EARTH_SCIENCE: DomainConfig = {
  domain: "earth-science",
  label: "地球科学",
  labelEn: "Earth Science",
  tagline:
    "从地核到大气，从板块漂移到气候临界点——地球如何运转，又如何成为已知宇宙中唯一的家园。这是宇宙物理下钻到地球之后、生命登场之前的那一章。",
  accent: "#4f9d76",
  sections: [
    {
      key: "pioneers",
      label: "先驱",
      accent: "#4f9d76",
      icon: "👤",
      description: "赫顿、莱伊尔、魏格纳、米兰科维奇、玛丽·撒普、基林——读懂地球的人",
    },
    {
      key: "concepts",
      label: "核心概念",
      accent: "#5fb3a3",
      icon: "💡",
      description: "板块边界、科里奥利效应、碳循环、水循环、地球内部、地图投影",
    },
    {
      key: "processes",
      label: "地质与气候过程",
      accent: "#d98c5f",
      icon: "🌋",
      description: "火山、地震、洋流、侵蚀沉积、冰期循环、天气系统——驱动地球的机制",
    },
    {
      key: "events",
      label: "重大事件与灾害",
      accent: "#5b9bd1",
      icon: "🌊",
      description: "坦博拉1815、里斯本1755、2004印度洋海啸、雪球地球、泛大陆裂解",
    },
  ],
};

export const MEDICINE: DomainConfig = {
  domain: "medicine",
  label: "医学与公共卫生",
  labelEn: "Medicine & Public Health",
  tagline:
    "人类如何认识并修复自己的身体——从体液学说到分子医学，从放血疗法到 mRNA 疫苗。这是唯一一门直接关乎每个人生死的知识，也是科学自我纠错最动人的舞台。",
  accent: "#d9544d",
  sections: [
    {
      key: "figures",
      label: "医学人物",
      accent: "#d9544d",
      icon: "👤",
      description: "希波克拉底、维萨里、哈维、詹纳、巴斯德、南丁格尔、弗莱明、屠呦呦——治病救人的人",
    },
    {
      key: "diseases",
      label: "疾病",
      accent: "#c2477a",
      icon: "🦠",
      description: "鼠疫、天花、霍乱、结核、疟疾、艾滋、COVID-19、癌症、糖尿病——人类与疾病的搏斗",
    },
    {
      key: "concepts",
      label: "核心概念",
      accent: "#5b9bd1",
      icon: "💡",
      description: "细菌致病论、免疫、炎症、循证医学、流行病学、抗生素耐药性、知情同意",
    },
    {
      key: "technologies",
      label: "医学技术",
      accent: "#5fb3a3",
      icon: "🔬",
      description: "听诊器、麻醉、无菌术、X 射线、CT/MRI、抗生素、器官移植、mRNA 疫苗、CRISPR",
    },
    {
      key: "events",
      label: "公共卫生里程碑",
      accent: "#e0a458",
      icon: "🌍",
      description: "牛痘接种、斯诺霍乱地图、天花根除、塔斯基吉实验、反应停事件、COVID-19 大流行",
    },
    {
      key: "traditions",
      label: "传统医学",
      accent: "#a88adf",
      icon: "🌿",
      description: "中医、阿育吠陀、尤纳尼、藏医、非洲传统医学——尊重传统，并标注循证验证状态",
    },
    {
      key: "ethics",
      label: "医学伦理",
      accent: "#6b9bd1",
      icon: "⚖️",
      description: "海拉细胞、基因编辑婴儿、安乐死、器官分配、临床试验伦理——科学与人文的交汇",
    },
  ],
};

export const CHEMISTRY: DomainConfig = {
  domain: "chemistry",
  label: "化学",
  labelEn: "Chemistry",
  tagline:
    "万物由什么构成、又如何相互转化——从原子与化学键，到燃烧、合成与催化。化学是连接物理与生命的「中心科学」，也是人类改造物质世界的语言。",
  accent: "#e08a3c",
  sections: [
    {
      key: "figures",
      label: "化学家",
      accent: "#e08a3c",
      icon: "👤",
      description: "拉瓦锡、道尔顿、门捷列夫、居里夫人、鲍林、哈伯——读懂并重塑物质的人",
    },
    {
      key: "concepts",
      label: "核心概念",
      accent: "#d4a24c",
      icon: "💡",
      description: "原子结构、化学键、周期表、摩尔、酸碱、氧化还原、平衡、热化学、电化学",
    },
    {
      key: "substances",
      label: "物质与材料",
      accent: "#5fb3a3",
      icon: "🧪",
      description: "水、碳的同素异形体、高分子、金属合金、半导体、氨、玻璃陶瓷、烃、催化剂",
    },
    {
      key: "reactions",
      label: "反应与过程",
      accent: "#c25b5b",
      icon: "⚗️",
      description: "燃烧、酸碱中和、沉淀、聚合、催化、电解、有机合成、发酵",
    },
    {
      key: "milestones",
      label: "里程碑",
      accent: "#a88adf",
      icon: "🏆",
      description: "氧化学革命、周期律、合成氨、合成染料、塑料时代、放射性、原子论、绿色化学",
    },
  ],
};

export const KNOWLEDGE_DOMAINS: Record<string, DomainConfig> = {
  "computer-science": COMPUTER_SCIENCE,
  "political-science": POLITICAL_SCIENCE,
  "earth-science": EARTH_SCIENCE,
  medicine: MEDICINE,
  chemistry: CHEMISTRY,
};

export function getDomainConfig(domain: string): DomainConfig | null {
  return KNOWLEDGE_DOMAINS[domain] ?? null;
}

export function getSectionConfig(domain: string, section: string): DomainSectionConfig | null {
  const config = KNOWLEDGE_DOMAINS[domain];
  if (!config) return null;
  return config.sections.find((s) => s.key === section) ?? null;
}

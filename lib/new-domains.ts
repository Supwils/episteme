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

export const KNOWLEDGE_DOMAINS: Record<string, DomainConfig> = {
  "computer-science": COMPUTER_SCIENCE,
  "political-science": POLITICAL_SCIENCE,
};

export function getDomainConfig(domain: string): DomainConfig | null {
  return KNOWLEDGE_DOMAINS[domain] ?? null;
}

export function getSectionConfig(domain: string, section: string): DomainSectionConfig | null {
  const config = KNOWLEDGE_DOMAINS[domain];
  if (!config) return null;
  return config.sections.find((s) => s.key === section) ?? null;
}

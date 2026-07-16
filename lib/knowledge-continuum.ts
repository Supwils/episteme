import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "./knowledge-levels";

export const KNOWLEDGE_STAGES = KNOWLEDGE_LEVELS;
export type KnowledgeStageId = KnowledgeLevel;

export const KNOWLEDGE_DOMAINS = {
  "universe-physics": { label: "物理学", href: "/universe-physics" },
  cosmology: { label: "宇宙学", href: "/cosmology" },
  chemistry: { label: "化学", href: "/chemistry" },
  "earth-science": { label: "地球科学", href: "/earth-science" },
  "life-science": { label: "生命科学", href: "/life-science" },
  medicine: { label: "医学", href: "/medicine" },
  mathematics: { label: "数学", href: "/mathematics" },
  "computer-science": { label: "计算机科学", href: "/computer-science" },
  psychology: { label: "心理学", href: "/psychology" },
  philosophy: { label: "哲学", href: "/philosophy" },
  "human-history": { label: "人类历史", href: "/human-history" },
  sociology: { label: "社会学", href: "/sociology" },
  economics: { label: "经济学", href: "/economics" },
  "political-science": { label: "政治学", href: "/political-science" },
} as const;

export type KnowledgeDomainId = keyof typeof KNOWLEDGE_DOMAINS;

export type KnowledgeContinuumNode = {
  id: string;
  stage: KnowledgeStageId;
  title: string;
  question: string;
  description: string;
  href: string;
  domains: readonly KnowledgeDomainId[];
};

export type KnowledgeContinuumThread = {
  id: string;
  label: string;
  subtitle: string;
  color: string;
  nodes: readonly KnowledgeContinuumNode[];
};

export const KNOWLEDGE_THREADS: readonly KnowledgeContinuumThread[] = [
  {
    id: "universe-matter",
    label: "宇宙与物质",
    subtitle: "尺度、能量、结构",
    color: "#6a6fd0",
    nodes: [
      {
        id: "universe-matter-1",
        stage: 1,
        title: "仰望天空",
        question: "太阳、月亮和星星为什么会移动？",
        description: "先从昼夜、季节和天空中的尺度感出发，把观察变成可以继续追问的问题。",
        href: "/cosmology/universe",
        domains: ["cosmology", "earth-science"],
      },
      {
        id: "universe-matter-2",
        stage: 2,
        title: "力、能量与原子",
        question: "物体怎样运动，万物又由什么构成？",
        description: "用力、能量、原子和化学键描述物质，为后续理解恒星、材料与生命奠基。",
        href: "/chemistry/concepts/atomic-structure",
        domains: ["universe-physics", "chemistry"],
      },
      {
        id: "universe-matter-3",
        stage: 3,
        title: "恒星制造元素",
        question: "宇宙如何从简单粒子长出复杂物质？",
        description: "把引力、核反应和恒星演化连接起来，理解构成行星与身体的元素从何而来。",
        href: "/cosmology/stellar-evolution",
        domains: ["cosmology", "universe-physics", "chemistry"],
      },
      {
        id: "universe-matter-4",
        stage: 4,
        title: "从测量到定律",
        question: "看不见的规律怎样被实验和数学约束？",
        description: "通过实验、误差、数学表达和可重复观测，区分漂亮解释与经得住检验的理论。",
        href: "/universe-physics/experiments",
        domains: ["universe-physics", "mathematics"],
      },
      {
        id: "universe-matter-5",
        stage: 5,
        title: "暗物质与量子边界",
        question: "现有物理为何仍解释不了大部分宇宙？",
        description: "把粒子实验、天文观测、统计推断和理论物理放在同一问题上，进入开放研究。",
        href: "/universe-physics/frontier/dark-matter-direct-detection",
        domains: ["universe-physics", "cosmology", "mathematics"],
      },
    ],
  },
  {
    id: "earth-life-body",
    label: "地球、生命与身体",
    subtitle: "环境、演化、健康",
    color: "#4f9d76",
    nodes: [
      {
        id: "earth-life-body-1",
        stage: 1,
        title: "身边的生命",
        question: "植物、动物和人为什么既相似又不同？",
        description: "从可观察的形态、栖息地和身体功能开始，建立生命多样性与共同性的直觉。",
        href: "/life-science/species",
        domains: ["life-science", "medicine"],
      },
      {
        id: "earth-life-body-2",
        stage: 2,
        title: "细胞、遗传与演化",
        question: "生命怎样保存信息并跨世代改变？",
        description: "把细胞、DNA、遗传和自然选择连成生命科学的基础语言。",
        href: "/life-science/knowledge-base",
        domains: ["life-science", "chemistry", "medicine"],
      },
      {
        id: "earth-life-body-3",
        stage: 3,
        title: "行星系统中的生命",
        question: "岩石、水、气候与生态如何共同变化？",
        description: "从板块、水循环和气候反馈理解环境，再观察生命如何适应并改变地球。",
        href: "/earth-science/processes/plate-tectonics",
        domains: ["earth-science", "life-science"],
      },
      {
        id: "earth-life-body-4",
        stage: 4,
        title: "从实验到临床证据",
        question: "怎样知道一种干预真的有效且安全？",
        description: "连接分子测量、对照实验、统计推断和临床试验，理解证据链及其伦理边界。",
        href: "/medicine/concepts/clinical-trials",
        domains: ["medicine", "chemistry", "mathematics"],
      },
      {
        id: "earth-life-body-5",
        stage: 5,
        title: "可设计的生命",
        question: "基因编辑能治疗疾病，也会改变什么边界？",
        description: "把基因技术、临床风险、演化后果和生命伦理放进同一个研究与治理框架。",
        href: "/life-science/frontier/crispr-clinical-revolution",
        domains: ["life-science", "medicine", "philosophy"],
      },
    ],
  },
  {
    id: "patterns-computation",
    label: "数量、逻辑与机器",
    subtitle: "模式、证明、计算",
    color: "#4f9cf0",
    nodes: [
      {
        id: "patterns-computation-1",
        stage: 1,
        title: "数数与找规律",
        question: "数量、形状和重复模式有什么共同语言？",
        description: "从数轴、比较和图形入手，把具体对象转化为可以操作的抽象关系。",
        href: "/mathematics/concepts/number-line",
        domains: ["mathematics"],
      },
      {
        id: "patterns-computation-2",
        stage: 2,
        title: "函数、证明与算法",
        question: "怎样精确描述输入、变化和可靠步骤？",
        description: "函数表达关系，证明保证结论，算法把有限规则变成可执行过程。",
        href: "/mathematics/concepts/function",
        domains: ["mathematics", "computer-science"],
      },
      {
        id: "patterns-computation-3",
        stage: 3,
        title: "网络与复杂性",
        question: "大量局部连接怎样产生整体行为？",
        description: "从图遍历进入网络、信息流和复杂系统，连接机器、社会与生物结构。",
        href: "/computer-science/algorithms/graph-traversal",
        domains: ["computer-science", "mathematics", "sociology"],
      },
      {
        id: "patterns-computation-4",
        stage: 4,
        title: "概率、模拟与推断",
        question: "数据有噪声时，模型还能告诉我们什么？",
        description: "用概率表示不确定性，以模拟比较情景，并检查模型对假设有多敏感。",
        href: "/mathematics/concepts/probability",
        domains: ["mathematics", "computer-science", "psychology"],
      },
      {
        id: "patterns-computation-5",
        stage: 5,
        title: "可解释人工智能",
        question: "能预测的机器是否也能给出可信理由？",
        description: "连接学习算法、因果推断、形式验证与社会责任，研究模型能力和可问责性。",
        href: "/computer-science/frontier/ai-interpretability",
        domains: ["computer-science", "mathematics", "philosophy"],
      },
    ],
  },
  {
    id: "mind-meaning",
    label: "心智、意义与价值",
    subtitle: "经验、认知、判断",
    color: "#c08a52",
    nodes: [
      {
        id: "mind-meaning-1",
        stage: 1,
        title: "感受与选择",
        question: "我为什么会记住、害怕、喜欢和改变主意？",
        description: "从每个人都经历的知觉、情绪和选择出发，发现心智也可以被认真研究。",
        href: "/psychology/phenomena",
        domains: ["psychology", "philosophy"],
      },
      {
        id: "mind-meaning-2",
        stage: 2,
        title: "发展、依恋与自我",
        question: "一个人怎样在关系和文化中成长？",
        description: "把发展、依恋、学习和身份联系起来，理解个人不是脱离环境的孤立心智。",
        href: "/psychology/knowledge-base/attachment-theory",
        domains: ["psychology", "sociology"],
      },
      {
        id: "mind-meaning-3",
        stage: 3,
        title: "原因、理由与责任",
        question: "解释行为时，原因和理由有什么不同？",
        description: "连接心理机制、因果关系、自由意志与伦理判断，避免把人的行动压成单一解释。",
        href: "/philosophy/concepts/causation",
        domains: ["philosophy", "psychology"],
      },
      {
        id: "mind-meaning-4",
        stage: 4,
        title: "可重复的心智证据",
        question: "如何减少选择性报告和事后讲故事？",
        description: "通过预注册、测量、效应量和重复研究，检查关于心智的主张能否经受反驳。",
        href: "/psychology/methods/preregistration-registered-reports",
        domains: ["psychology", "mathematics", "philosophy"],
      },
      {
        id: "mind-meaning-5",
        stage: 5,
        title: "意识理论的竞争",
        question: "主观体验能否被客观理论解释？",
        description: "让神经证据、计算模型和哲学论证正面相遇，比较彼此可检验的预测与盲点。",
        href: "/philosophy/frontier/consciousness-iit-gnw",
        domains: ["philosophy", "psychology", "computer-science"],
      },
    ],
  },
  {
    id: "people-institutions",
    label: "人群、历史与制度",
    subtitle: "文化、权力、交换",
    color: "#c25b5b",
    nodes: [
      {
        id: "people-institutions-1",
        stage: 1,
        title: "家庭、规则与过去",
        question: "人为什么共同生活，又为什么留下不同制度？",
        description: "从家庭故事、地方规则和历史遗迹开始，看见个人生活背后的集体结构。",
        href: "/human-history/timeline",
        domains: ["human-history", "sociology"],
      },
      {
        id: "people-institutions-2",
        stage: 2,
        title: "社会结构与文化",
        question: "身份、规范和资源怎样塑造机会？",
        description: "用群体、角色、阶层、文化和社会网络描述个人与社会之间的双向关系。",
        href: "/sociology/concepts/social-structure",
        domains: ["sociology", "human-history", "psychology"],
      },
      {
        id: "people-institutions-3",
        stage: 3,
        title: "市场、国家与公共品",
        question: "个人选择为什么不能自动产生共同利益？",
        description: "连接市场失灵、集体行动、权力与制度，理解经济和政治系统如何共同分配资源。",
        href: "/economics/concepts/market-failure-public-goods",
        domains: ["economics", "political-science", "sociology"],
      },
      {
        id: "people-institutions-4",
        stage: 4,
        title: "比较制度与历史因果",
        question: "为什么相似社会会走向不同结果？",
        description: "通过比较案例、过程追踪、统计与文本证据，判断制度差异是否真的构成原因。",
        href: "/political-science/methods/comparative-method",
        domains: ["political-science", "sociology", "human-history"],
      },
      {
        id: "people-institutions-5",
        stage: 5,
        title: "平台治理与数字劳动",
        question: "算法平台正在形成什么样的新制度？",
        description: "把技术架构、劳动关系、市场权力和公共治理连起来，研究快速变化中的制度边界。",
        href: "/sociology/frontier/platform-governance",
        domains: ["sociology", "political-science", "economics", "computer-science"],
      },
    ],
  },
  {
    id: "shared-future",
    label: "共同未来",
    subtitle: "风险、公平、行动",
    color: "#5b9da0",
    nodes: [
      {
        id: "shared-future-1",
        stage: 1,
        title: "我们的共同家园",
        question: "空气、水、食物和健康怎样彼此相连？",
        description: "从日常需要理解人与环境的依赖关系，也看见风险和资源从来不是平均分布。",
        href: "/earth-science",
        domains: ["earth-science", "medicine", "life-science"],
      },
      {
        id: "shared-future-2",
        stage: 2,
        title: "资源与共同治理",
        question: "共享资源一定会被耗尽吗？",
        description: "用公地、激励、规范和合作解释资源治理，比较市场、国家与社区的不同能力。",
        href: "/economics/concepts/commons-governance",
        domains: ["economics", "sociology", "political-science"],
      },
      {
        id: "shared-future-3",
        stage: 3,
        title: "风险与集体行动",
        question: "明知存在风险，人群为何仍难以协调行动？",
        description: "连接风险感知、信息传播、利益冲突和公共政策，理解集体延迟背后的机制。",
        href: "/political-science/concepts/public-policy",
        domains: ["political-science", "psychology", "sociology"],
      },
      {
        id: "shared-future-4",
        stage: 4,
        title: "比较政策效果与公平",
        question: "有限资源怎样在证据与价值冲突中分配？",
        description: "综合效果、成本、分配、公平和实施条件，让模型服务于可复核的公共决策。",
        href: "/medicine/public-health/health-economic-evaluation-priority-setting",
        domains: ["medicine", "economics", "political-science", "philosophy"],
      },
      {
        id: "shared-future-5",
        stage: 5,
        title: "气候临界点与适应",
        question: "面对不可逆风险，科学与制度如何共同决策？",
        description: "把地球系统、概率预测、经济转型、公共卫生和代际正义放入统一的行动问题。",
        href: "/earth-science/frontier/climate-tipping-points",
        domains: ["earth-science", "economics", "medicine", "political-science", "philosophy"],
      },
    ],
  },
] as const;

export const KNOWLEDGE_BRIDGES = [
  ["universe-matter-2", "patterns-computation-2"],
  ["universe-matter-3", "earth-life-body-2"],
  ["universe-matter-4", "patterns-computation-4"],
  ["earth-life-body-3", "shared-future-3"],
  ["earth-life-body-4", "shared-future-4"],
  ["patterns-computation-3", "people-institutions-2"],
  ["patterns-computation-4", "mind-meaning-4"],
  ["patterns-computation-5", "people-institutions-5"],
  ["mind-meaning-2", "people-institutions-2"],
  ["mind-meaning-3", "people-institutions-3"],
  ["mind-meaning-5", "universe-matter-5"],
  ["people-institutions-3", "shared-future-2"],
  ["people-institutions-4", "shared-future-4"],
  ["people-institutions-5", "shared-future-5"],
] as const;

export const ALL_KNOWLEDGE_CONTINUUM_NODES = KNOWLEDGE_THREADS.flatMap((thread) => thread.nodes);

export function getKnowledgeContinuumNode(id: string): KnowledgeContinuumNode | undefined {
  return ALL_KNOWLEDGE_CONTINUUM_NODES.find((node) => node.id === id);
}

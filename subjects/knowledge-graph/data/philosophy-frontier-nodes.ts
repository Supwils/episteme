import type { GraphEdge, GraphNode } from "./types";

/**
 * Philosophy frontier articles live under content/philosophy/frontier as `.md`,
 * which philosophy-nodes.ts does not read — it builds nodes from the schools /
 * concepts / isms `.mdx` sections only. The whole frontier section was therefore
 * invisible to the graph, learning paths and frontier recommendations despite
 * being the domain's most current material. This module wires it in.
 *
 * `consciousness-iit-gnw` is deliberately absent: it already has a curated node
 * in continuum-anchor-nodes.ts, and duplicate ids fail graph-integrity.test.ts.
 */
const frontierNode = (
  slug: string,
  label: string,
  description: string,
  tags: string[],
  knowledgeLevel: 4 | 5,
  prerequisiteIds: string[] = []
): GraphNode => ({
  id: `philosophy:${slug}`,
  label,
  domain: "philosophy",
  type: "question",
  slug,
  section: "frontier",
  url: `/philosophy/frontier/${slug}`,
  description,
  tags,
  knowledgeLevel,
  knowledgeLevelSource: "curated",
  evidenceMode: "synthesis",
  prerequisiteIds,
});

const frontierEdge = (
  source: string,
  target: string,
  label: string,
  type: GraphEdge["type"] = "cross-reference"
): GraphEdge => ({
  source: source.includes(":") ? source : `philosophy:${source}`,
  target: target.includes(":") ? target : `philosophy:${target}`,
  type,
  label,
});

export const PHILOSOPHY_FRONTIER_NODES: GraphNode[] = [
  frontierNode(
    "ai-alignment-philosophy",
    "AI 对齐与价值的哲学",
    "人类价值能否被规范化，以及一个更强的系统为何可能可靠地追求它。",
    ["AI 对齐", "价值规范化", "存在风险"],
    5,
    ["philosophy:ai-ethics"]
  ),
  frontierNode(
    "experimental-philosophy",
    "实验哲学",
    "把直觉当作可测量的数据：哲学论证依赖的直觉是否跨人群稳定。",
    ["实验哲学", "直觉", "方法论"],
    4,
    ["philosophy:argument"]
  ),
  frontierNode(
    "free-will-neuroscience",
    "自由意志的神经科学",
    "意志发起的时点实验及其对责任概念的实际冲击。",
    ["自由意志", "利贝特实验", "责任"],
    4,
    ["philosophy:responsibility"]
  ),
  frontierNode(
    "llm-language-understanding",
    "大语言模型与语言理解",
    "统计上的流利是否构成理解，以及这个问题该如何被判定。",
    ["语言理解", "意义", "大语言模型"],
    5,
    ["philosophy:philosophy-of-language"]
  ),
  frontierNode(
    "longtermism-existential-risk",
    "长期主义与存在风险",
    "若未来人的福利不打折，道德优先级应当如何重排。",
    ["长期主义", "存在风险", "代际伦理"],
    5,
    ["philosophy:responsibility"]
  ),
  frontierNode(
    "neuroethics-and-mental-privacy",
    "神经伦理与心理隐私",
    "当心灵可被推断，“思想不可查验”这一制度前提还剩下什么。",
    ["神经权利", "心理隐私", "认知自由"],
    5,
    ["philosophy:digital-ethics"]
  ),
  frontierNode(
    "formal-epistemology-and-bayesianism",
    "形式认识论与贝叶斯主义",
    "把信念写成 0 到 1 之间的数，以及这样做换来与失去的东西。",
    ["贝叶斯认识论", "信念度", "同侪分歧"],
    5,
    ["philosophy:knowledge"]
  ),
  frontierNode(
    "climate-justice-and-intergenerational-ethics",
    "气候正义与代际伦理",
    "非同一性问题、贴现率与历史责任：对尚不存在的人负有什么义务。",
    ["代际正义", "非同一性问题", "贴现率"],
    5,
    ["philosophy:justice"]
  ),
  frontierNode(
    "digital-personhood-and-mind-uploading",
    "数字人格与心灵上传",
    "复制品是不是我：人格同一性理论被技术逼到必须表态的地步。",
    ["心灵上传", "人格同一性", "全脑仿真"],
    5,
    ["philosophy:identity"]
  ),
  frontierNode(
    "epistemic-crisis-testimony-and-deepfakes",
    "认识论危机：证言与深度伪造",
    "支撑证言体系的核验后盾正在瓦解，而说谎者从中获得红利。",
    ["证言", "深度伪造", "回音室"],
    5,
    ["philosophy:knowledge"]
  ),
];

export const PHILOSOPHY_FRONTIER_EDGES: GraphEdge[] = [
  frontierEdge("ai-ethics", "ai-alignment-philosophy", "把价值问题推到系统设计上"),
  frontierEdge("philosophy-of-ai", "llm-language-understanding", "理解与模拟理解的分界"),
  frontierEdge("philosophy-of-language", "llm-language-understanding", "意义是否需要指称与意图"),
  frontierEdge("argument", "experimental-philosophy", "直觉作为论证前提被检验"),
  frontierEdge("responsibility", "free-will-neuroscience", "能动性的事实基础"),
  frontierEdge("responsibility", "longtermism-existential-risk", "义务能否跨越世代"),
  frontierEdge("justice", "climate-justice-and-intergenerational-ethics", "分配正义的跨代版本"),
  frontierEdge("identity", "digital-personhood-and-mind-uploading", "同一性理论被迫表态"),
  frontierEdge("knowledge", "formal-epistemology-and-bayesianism", "从知道与否到相信多少"),
  frontierEdge("knowledge", "epistemic-crisis-testimony-and-deepfakes", "证言作为知识来源"),
  frontierEdge("digital-ethics", "neuroethics-and-mental-privacy", "隐私争论的神经版本"),
  frontierEdge(
    "epistemic-justice",
    "epistemic-crisis-testimony-and-deepfakes",
    "可信度分配的不平等"
  ),
  frontierEdge(
    "longtermism-existential-risk",
    "climate-justice-and-intergenerational-ethics",
    "未来人福利不打折的两种推论"
  ),
  frontierEdge(
    "free-will-neuroscience",
    "neuroethics-and-mental-privacy",
    "能动性作为一项可被技术转移的东西"
  ),
  // 跨域桥
  frontierEdge(
    "formal-epistemology-and-bayesianism",
    "computer-science:statistical-learning-theory-pac",
    "归纳问题的两种形式化回答",
    "domain-link"
  ),
  frontierEdge(
    "epistemic-crisis-testimony-and-deepfakes",
    "computer-science:large-language-models",
    "无信念的信息源如何算作证言",
    "domain-link"
  ),
  frontierEdge(
    "neuroethics-and-mental-privacy",
    "psychology:neuroimaging-methods-and-their-limits",
    "解码能力的真实边界",
    "domain-link"
  ),
  frontierEdge(
    "climate-justice-and-intergenerational-ethics",
    "earth-science:carbon-budgets-and-net-zero",
    "把伦理判断翻译成排放上限",
    "domain-link"
  ),
  frontierEdge(
    "digital-personhood-and-mind-uploading",
    "engineering:bioengineering-boundaries",
    "渐进替换从思想实验变成临床路径",
    "domain-link"
  ),
];

import type { GraphEdge, GraphNode } from "./types";

type AnthropologyNode = Omit<GraphNode, "id" | "domain" | "type" | "url"> & {
  knowledgeLevel: 1 | 2 | 3 | 4 | 5;
  evidenceMode: NonNullable<GraphNode["evidenceMode"]>;
};

const n = (node: AnthropologyNode): GraphNode => ({
  ...node,
  id: `anthropology:${node.slug}`,
  domain: "anthropology",
  type: "concept",
  url: `/anthropology/${node.section}/${node.slug}`,
  knowledgeLevelSource: "curated",
});

export const ANTHROPOLOGY_NODES: GraphNode[] = [
  n({
    slug: "what-is-culture",
    label: "什么是文化",
    section: "culture-and-method",
    description: "把文化当成可争辩的分类，而不是群体的本质或进化阶梯上的等级。",
    tags: ["文化概念", "泰勒", "博厄斯"],
    knowledgeLevel: 1,
    evidenceMode: "interpretation",
  }),
  n({
    slug: "kinship-terminology",
    label: "亲属称谓",
    section: "kinship-and-exchange",
    description: "称谓系统把同一套亲属词切成可比较的格子，不是血缘的自然标签。",
    tags: ["亲属称谓", "摩尔根", "克罗伯"],
    knowledgeLevel: 2,
    evidenceMode: "comparative",
    prerequisiteIds: ["anthropology:what-is-culture"],
  }),
  n({
    slug: "stratigraphy-and-context",
    label: "地层与出土情境",
    section: "prehistory-and-archaeology",
    description: "出土位置、叠压与共出决定器物能证明什么；没有单位号的激动进不了年表。",
    tags: ["地层学", "出土情境", "哈里斯矩阵"],
    knowledgeLevel: 3,
    evidenceMode: "observation",
    prerequisiteIds: ["anthropology:kinship-terminology"],
  }),
  n({
    slug: "fieldnotes-and-representation",
    label: "田野笔记与再现",
    section: "comparison-and-ethics",
    description: "笔记与报告是被制度保存的再现，不是透明窗口，也不能写成采集手册。",
    tags: ["田野笔记", "再现", "写文化"],
    knowledgeLevel: 4,
    evidenceMode: "formal",
    prerequisiteIds: ["anthropology:stratigraphy-and-context"],
  }),
  n({
    slug: "nagpra-and-repatriation",
    label: "NAGPRA 与归还",
    section: "urban-and-heritage",
    description: "归还法律把谁有权讲述过去写成可核对的清册、咨询与期限。",
    tags: ["NAGPRA", "归还", "肯纳威克人"],
    knowledgeLevel: 5,
    evidenceMode: "synthesis",
    prerequisiteIds: ["anthropology:fieldnotes-and-representation"],
  }),
];

const e = (
  source: string,
  target: string,
  label: string,
  type: GraphEdge["type"] = "hierarchy"
): GraphEdge => ({
  source: source.includes(":") ? source : `anthropology:${source}`,
  target: target.includes(":") ? target : `anthropology:${target}`,
  type,
  label,
});

export const ANTHROPOLOGY_EDGES: GraphEdge[] = [
  e("what-is-culture", "kinship-terminology", "分类进入可比较的称谓格子"),
  e("kinship-terminology", "stratigraphy-and-context", "亲属制度对照出土情境能证明什么"),
  e("stratigraphy-and-context", "fieldnotes-and-representation", "层位记录进入公开再现的政治"),
  e("fieldnotes-and-representation", "nagpra-and-repatriation", "再现权进入可执行的归还程序"),
];

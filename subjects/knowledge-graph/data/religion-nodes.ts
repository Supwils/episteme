import type { GraphEdge, GraphNode } from "./types";

type ReligionNode = Omit<GraphNode, "id" | "domain" | "type" | "url"> & {
  knowledgeLevel: 1 | 2 | 3 | 4 | 5;
  evidenceMode: NonNullable<GraphNode["evidenceMode"]>;
};

const n = (node: ReligionNode): GraphNode => ({
  ...node,
  id: `religion:${node.slug}`,
  domain: "religion",
  type: "concept",
  url: `/religion/${node.section}/${node.slug}`,
  knowledgeLevelSource: "curated",
});

export const RELIGION_NODES: GraphNode[] = [
  n({
    slug: "what-is-religion",
    label: "什么是宗教",
    section: "religion-foundations",
    description: "把“宗教”当成可争辩的分类，而不是一套必须为真的教义。",
    tags: ["定义", "神圣", "制度"],
    knowledgeLevel: 1,
    evidenceMode: "interpretation",
  }),
  n({
    slug: "ritual-and-practice",
    label: "仪式与实践",
    section: "religion-foundations",
    description: "通过仪礼把人从一种社会位置送到另一种；分析范畴不是操作步骤。",
    tags: ["仪式", "阈限", "实践"],
    knowledgeLevel: 2,
    evidenceMode: "comparative",
    prerequisiteIds: ["religion:what-is-religion"],
  }),
  n({
    slug: "axial-age-religions",
    label: "轴心时代",
    section: "religious-history",
    description: "公元前第一千纪若干文明同时出现可核的伦理—宇宙论文本，不是单一神启事件。",
    tags: ["轴心时代", "历史", "比较"],
    knowledgeLevel: 3,
    evidenceMode: "comparative",
    prerequisiteIds: ["religion:ritual-and-practice"],
  }),
  n({
    slug: "scripture-and-canon",
    label: "经典与正典",
    section: "texts-and-canons",
    description: "正典是被反复抄写、宣读和考试的名单，不是文本自己发光。",
    tags: ["正典", "文本", "制度"],
    knowledgeLevel: 4,
    evidenceMode: "formal",
    prerequisiteIds: ["religion:axial-age-religions"],
  }),
  n({
    slug: "secularization-debate",
    label: "世俗化之争",
    section: "secularization",
    description: "参与、认同与制度特权可以分开变化；一条曲线不能代表宗教消失。",
    tags: ["世俗化", "现代性", "测量"],
    knowledgeLevel: 5,
    evidenceMode: "synthesis",
    prerequisiteIds: ["religion:scripture-and-canon"],
  }),
];

const e = (
  source: string,
  target: string,
  label: string,
  type: GraphEdge["type"] = "hierarchy"
): GraphEdge => ({
  source: source.includes(":") ? source : `religion:${source}`,
  target: target.includes(":") ? target : `religion:${target}`,
  type,
  label,
});

export const RELIGION_EDGES: GraphEdge[] = [
  e("what-is-religion", "ritual-and-practice", "分类进入可观察的实践"),
  e("ritual-and-practice", "axial-age-religions", "实践进入可纪年的传统"),
  e("axial-age-religions", "scripture-and-canon", "传统把一部分文本做成正典"),
  e("scripture-and-canon", "secularization-debate", "正典制度进入现代测量之争"),
];

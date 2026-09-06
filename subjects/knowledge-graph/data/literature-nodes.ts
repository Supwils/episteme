// Literature domain spine: five W1 anchors so the domain can hang in the graph
// before article bodies exist. Later MDX-derived nodes with the same URL yield.
import type { GraphEdge, GraphNode } from "./types";

type LiteratureNode = Omit<GraphNode, "id" | "domain" | "type" | "url"> & {
  knowledgeLevel: 1 | 2 | 3 | 4 | 5;
  evidenceMode: NonNullable<GraphNode["evidenceMode"]>;
};

const n = (node: LiteratureNode): GraphNode => ({
  ...node,
  id: `literature:${node.slug}`,
  domain: "literature",
  type: "concept",
  url: `/literature/${node.section}/${node.slug}`,
  knowledgeLevelSource: "curated",
});

export const LITERATURE_NODES: GraphNode[] = [
  n({
    slug: "what-is-a-story",
    label: "故事是什么",
    section: "narrative-basics",
    description: "把“发生了一件事”与可核验的叙述结构分开：谁对谁做了什么，按什么次序被讲出来。",
    tags: ["叙事", "情节", "虚构"],
    knowledgeLevel: 1,
    evidenceMode: "interpretation",
  }),
  n({
    slug: "meter-and-the-line",
    label: "韵律与诗行",
    section: "poetics-and-form",
    description: "诗行是可计数的形式单位：音步、韵部与停顿约束朗读，而不是装饰。",
    tags: ["诗学", "韵律", "诗行"],
    knowledgeLevel: 2,
    evidenceMode: "formal",
    prerequisiteIds: ["literature:what-is-a-story"],
  }),
  n({
    slug: "epic-as-public-memory",
    label: "史诗作为公共记忆",
    section: "world-traditions",
    description: "史诗把集体可复述的过去编进可表演的长篇叙述，并随抄本与演出版本改写。",
    tags: ["史诗", "口头传统", "公共记忆"],
    knowledgeLevel: 3,
    evidenceMode: "comparative",
    prerequisiteIds: ["literature:meter-and-the-line"],
  }),
  n({
    slug: "close-reading",
    label: "细读",
    section: "theory-and-method",
    description: "细读把文本局部的用词、句法与歧义当成证据，而不是把评价当成作品属性。",
    tags: ["细读", "方法", "文本证据"],
    knowledgeLevel: 4,
    evidenceMode: "formal",
    prerequisiteIds: ["literature:epic-as-public-memory"],
  }),
  n({
    slug: "canon-wars",
    label: "正典之争",
    section: "contemporary-edges",
    description: "教材、奖项与书单如何把一部分作品写成“必须读”，以及这些名单被谁改写。",
    tags: ["正典", "课程", "接受"],
    knowledgeLevel: 5,
    evidenceMode: "synthesis",
    prerequisiteIds: ["literature:close-reading"],
  }),
];

const e = (
  source: string,
  target: string,
  label: string,
  type: GraphEdge["type"] = "hierarchy"
): GraphEdge => ({
  source: source.includes(":") ? source : `literature:${source}`,
  target: target.includes(":") ? target : `literature:${target}`,
  type,
  label,
});

export const LITERATURE_EDGES: GraphEdge[] = [
  e("what-is-a-story", "meter-and-the-line", "叙述单位进入可计数的诗行"),
  e("meter-and-the-line", "epic-as-public-memory", "形式约束长篇公共叙述"),
  e("epic-as-public-memory", "close-reading", "公共文本仍须回到局部证据"),
  e("close-reading", "canon-wars", "细读方法进入正典与课程之争"),
];

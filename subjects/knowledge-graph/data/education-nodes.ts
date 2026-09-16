import type { GraphEdge, GraphNode } from "./types";

type EducationNode = Omit<GraphNode, "id" | "domain" | "type" | "url"> & {
  knowledgeLevel: 1 | 2 | 3 | 4 | 5;
  evidenceMode: NonNullable<GraphNode["evidenceMode"]>;
};

const n = (node: EducationNode): GraphNode => ({
  ...node,
  id: `education:${node.slug}`,
  domain: "education",
  type: "concept",
  url: `/education/${node.section}/${node.slug}`,
  knowledgeLevelSource: "curated",
});

export const EDUCATION_NODES: GraphNode[] = [
  n({
    slug: "what-is-learning",
    label: "什么是学习",
    section: "learning-foundations",
    description: "把“学会了”写成可观察的改变，而不是把知识倒进容器。",
    tags: ["学习", "教学", "行为主义", "杜威"],
    knowledgeLevel: 1,
    evidenceMode: "interpretation",
  }),
  n({
    slug: "memory-spacing-and-transfer",
    label: "记忆、间隔与迁移",
    section: "cognition-and-memory",
    description: "遗忘曲线、间隔练习与测验效应能证明什么，不能证明什么。",
    tags: ["间隔练习", "测验效应", "迁移", "艾宾浩斯"],
    knowledgeLevel: 2,
    evidenceMode: "experimental",
    prerequisiteIds: ["education:what-is-learning"],
  }),
  n({
    slug: "curriculum-as-selection",
    label: "课程即选择",
    section: "curriculum-and-teaching",
    description: "课程是选择与排序，不是中立的知识管道。",
    tags: ["课程", "泰勒", "阿普尔", "伯恩斯坦"],
    knowledgeLevel: 3,
    evidenceMode: "comparative",
    prerequisiteIds: ["education:memory-spacing-and-transfer"],
  }),
  n({
    slug: "assessment-as-inference",
    label: "评估即推断",
    section: "assessment-and-equity",
    description: "测验分数是对潜在能力的推断，信效度决定这句话能走多远。",
    tags: ["效度", "标准化测验", "形成性评价"],
    knowledgeLevel: 4,
    evidenceMode: "formal",
    prerequisiteIds: ["education:curriculum-as-selection"],
  }),
  n({
    slug: "pisa-is-not-civilization",
    label: "PISA 不是文明",
    section: "comparison-and-policy",
    description: "国际测评是测量选择，不是文化或种族的本质排名。",
    tags: ["PISA", "OECD", "政策借用", "比较教育"],
    knowledgeLevel: 5,
    evidenceMode: "synthesis",
    prerequisiteIds: ["education:assessment-as-inference"],
  }),
];

const e = (
  source: string,
  target: string,
  label: string,
  type: GraphEdge["type"] = "hierarchy"
): GraphEdge => ({
  source: source.includes(":") ? source : `education:${source}`,
  target: target.includes(":") ? target : `education:${target}`,
  type,
  label,
});

export const EDUCATION_EDGES: GraphEdge[] = [
  e("what-is-learning", "memory-spacing-and-transfer", "可观察的学会进入记忆与练习条件"),
  e("memory-spacing-and-transfer", "curriculum-as-selection", "练习条件进入被选择的课程序列"),
  e("curriculum-as-selection", "assessment-as-inference", "被选入课程的内容进入可推断的分数"),
  e("assessment-as-inference", "pisa-is-not-civilization", "国内测验技术进入国际比较与政策借用"),
];

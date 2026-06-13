import type { GraphNode, GraphEdge } from "./types";

const n = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `political-science:${slug}`,
  label,
  domain: "political-science",
  type,
  slug,
  section,
  url: `/political-science/${section}/${slug}`,
  tags,
  description,
});

export const POLITICAL_SCIENCE_NODES: GraphNode[] = [
  n("thomas-hobbes", "霍布斯", "thinker", "thinkers", "《利维坦》与社会契约，绝对主权的论证者。", [
    "利维坦",
    "社会契约",
    "主权",
  ]),
  n("john-locke", "洛克", "thinker", "thinkers", "自然权利、有限政府与革命权。", [
    "自然权利",
    "有限政府",
  ]),
  n("jean-jacques-rousseau", "卢梭", "thinker", "thinkers", "公意与人民主权。", [
    "公意",
    "人民主权",
  ]),
  n("montesquieu", "孟德斯鸠", "thinker", "thinkers", "三权分立与法的精神。", ["三权分立", "宪政"]),
  n("karl-marx", "马克思", "thinker", "thinkers", "阶级、国家与历史唯物主义。", [
    "阶级",
    "国家",
    "历史唯物主义",
  ]),
  n("hannah-arendt", "阿伦特", "thinker", "thinkers", "极权主义起源与平庸之恶。", [
    "极权主义",
    "平庸之恶",
  ]),
  n("liberalism", "自由主义", "ism", "isms", "以个人权利、有限政府与法治为核心。", [
    "自由",
    "权利",
    "法治",
  ]),
  n("conservatism", "保守主义", "ism", "isms", "强调传统、渐进与制度延续。", ["传统", "渐进"]),
  n("socialism", "社会主义", "ism", "isms", "关注生产资料与分配的平等。", ["平等", "公有"]),
  n("nationalism", "民族主义", "ism", "isms", "以民族认同建构政治共同体。", ["民族", "认同"]),
  n("sovereignty", "主权", "concept", "concepts", "最终的、不可分割的政治决断权。", [
    "主权",
    "国家",
  ]),
  n("power", "权力", "concept", "concepts", "权力的三张面孔：决策、议程与塑造偏好。", [
    "权力",
    "支配",
  ]),
  n("justice", "正义", "concept", "concepts", "分配正义与罗尔斯的无知之幕。", ["正义", "分配"]),
  n("the-state", "国家", "concept", "concepts", "韦伯的暴力垄断与现代国家的形成。", [
    "国家",
    "暴力垄断",
  ]),
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `political-science:${from}`,
  target: `political-science:${to}`,
  type: "cross-reference",
  label,
});

export const POLITICAL_SCIENCE_EDGES: GraphEdge[] = [
  e("thomas-hobbes", "sovereignty", "论证"),
  e("thomas-hobbes", "the-state", "奠基"),
  e("john-locke", "liberalism", "奠基"),
  e("montesquieu", "the-state", "设计制衡"),
  e("karl-marx", "socialism", "理论化"),
  e("john-locke", "power", "限制"),
  e("justice", "liberalism", "内核"),
  // cross-domain bridge: Marx the political theorist ↔ Marx the political economist
  {
    source: "political-science:karl-marx",
    target: "economics:karl-marx",
    type: "domain-link",
    label: "政治经济学",
  },
];

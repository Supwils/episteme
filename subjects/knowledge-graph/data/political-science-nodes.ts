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
  // ── more thinkers ──
  n(
    "niccolo-machiavelli",
    "马基雅维利",
    "thinker",
    "thinkers",
    "《君主论》与政治现实主义的开端。",
    ["君主论", "现实主义"]
  ),
  n("john-rawls", "罗尔斯", "thinker", "thinkers", "《正义论》、无知之幕与作为公平的正义。", [
    "正义论",
    "无知之幕",
  ]),
  n("max-weber", "马克斯·韦伯", "thinker", "thinkers", "国家=暴力垄断、合法性类型与科层制。", [
    "合法性",
    "科层制",
  ]),
  n("john-stuart-mill", "约翰·密尔", "thinker", "thinkers", "《论自由》、伤害原则与代议政府。", [
    "论自由",
    "伤害原则",
  ]),
  n("michel-foucault", "福柯", "thinker", "thinkers", "权力/知识、规训与生命政治。", [
    "权力",
    "规训",
  ]),
  // ── more isms ──
  n("fascism", "法西斯主义", "ism", "isms", "极端民族主义、领袖崇拜与对自由民主的否定。", [
    "极权",
    "民族主义",
  ]),
  n("feminism", "女性主义", "ism", "isms", "追问性别权力结构与平等的政治思想谱系。", [
    "性别",
    "平等",
  ]),
  // ── more concepts ──
  n("democracy", "民主", "concept", "concepts", "人民统治的理念与制度，从雅典到代议制。", [
    "民主",
    "代议制",
  ]),
  n("social-contract", "社会契约", "concept", "concepts", "政治权威源于被治者同意的思想传统。", [
    "契约",
    "同意",
  ]),
  n("social-movements", "社会运动", "concept", "concepts", "集体行动如何挑战与重塑权力结构。", [
    "集体行动",
    "动员",
  ]),
  n("state-capacity", "国家能力", "concept", "concepts", "国家征税、执法与提供公共品的实际能力。", [
    "国家能力",
    "治理",
  ]),
  // ── institutions ──
  n("federalism", "联邦制", "institution", "institutions", "中央与地方分权的制度安排。", [
    "分权",
    "联邦",
  ]),
  n(
    "welfare-state",
    "福利国家",
    "institution",
    "institutions",
    "国家承担社会保障与再分配的制度。",
    ["社会保障", "再分配"]
  ),
  // ── international relations ──
  n(
    "realism-ir",
    "现实主义（国关）",
    "concept",
    "international-relations",
    "无政府状态下国家追求权力与安全。",
    ["权力政治", "无政府"]
  ),
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
  // new node web
  e("niccolo-machiavelli", "power", "直面"),
  e("john-rawls", "justice", "重构"),
  e("max-weber", "the-state", "定义"),
  e("max-weber", "power", "类型学"),
  e("john-stuart-mill", "liberalism", "深化"),
  e("john-locke", "social-contract", "奠基"),
  e("thomas-hobbes", "social-contract", "奠基"),
  e("jean-jacques-rousseau", "social-contract", "重述"),
  e("social-contract", "democracy", "正当性来源"),
  e("michel-foucault", "power", "重新理解"),
  e("nationalism", "fascism", "极端化"),
  e("feminism", "justice", "性别维度"),
  e("the-state", "state-capacity", "其实际能力"),
  e("social-movements", "democracy", "推动"),
  e("federalism", "the-state", "结构形态"),
  e("welfare-state", "socialism", "部分实践"),
  e("realism-ir", "power", "国关版本"),
  // cross-domain bridge: Marx the political theorist ↔ Marx the political economist
  {
    source: "political-science:karl-marx",
    target: "economics:karl-marx",
    type: "domain-link",
    label: "政治经济学",
  },
  {
    source: "political-science:welfare-state",
    target: "economics:keynesian-economics",
    type: "domain-link",
    label: "凯恩斯式干预",
  },
];

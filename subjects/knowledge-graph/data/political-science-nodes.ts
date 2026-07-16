import type { GraphNode, GraphEdge } from "./types";
import {
  POLITICAL_SCIENCE_COVERAGE_EDGES,
  POLITICAL_SCIENCE_COVERAGE_NODES,
} from "./political-science-coverage";

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
  n(
    "postcolonialism",
    "后殖民主义",
    "ism",
    "isms",
    "从殖民遗产、知识权力和主体性重写现代政治秩序。",
    ["后殖民", "帝国", "主体性"]
  ),
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
  n(
    "fiscal-state",
    "财政国家",
    "concept",
    "concepts",
    "税收、债务、预算和公共服务构成现代国家能力的财政骨架。",
    ["财政国家", "税收", "国家能力"]
  ),
  n(
    "budget-governance",
    "预算治理",
    "concept",
    "concepts",
    "预算如何把公共目标、财政规则、透明审计和分配冲突组织起来。",
    ["预算", "财政规则", "问责"]
  ),
  n(
    "fiscal-rules-democratic-legitimacy",
    "财政规则与民主合法性",
    "concept",
    "concepts",
    "财政规则如何在债务纪律、危机弹性、公共投资和民主授权之间取得平衡。",
    ["财政规则", "民主合法性", "债务", "公共信任"]
  ),
  // ── research methods ──
  n(
    "political-methodology-behavioralism",
    "政治学方法论与行为主义革命",
    "concept",
    "concepts",
    "从制度描述到经验检验、形式模型与多方法研究的学科转型。",
    ["方法论", "行为主义", "因果推断"]
  ),
  n(
    "comparative-method",
    "政治学的比较方法",
    "concept",
    "methods",
    "利用案例之间的相同与不同检验制度、结构和行动者解释。",
    ["比较政治", "概念等值", "因果推断"]
  ),
  n(
    "process-tracing",
    "过程追踪与因果机制",
    "concept",
    "methods",
    "在案例内部用诊断性证据检验竞争机制，而非只讲时间线。",
    ["过程追踪", "因果机制", "档案"]
  ),
  n(
    "case-selection-and-small-n",
    "案例选择与小样本研究",
    "concept",
    "methods",
    "让典型、异常、极端与关键案例分别承担清晰的推断任务。",
    ["案例选择", "小样本", "选择偏差"]
  ),
  n(
    "survey-public-opinion-measurement",
    "调查研究与公共舆论测量",
    "concept",
    "methods",
    "从抽样、问卷、非应答和加权理解民意数字如何被生产。",
    ["调查", "公共舆论", "测量"]
  ),
  n(
    "experiments-natural-experiments",
    "政治实验与自然实验",
    "concept",
    "methods",
    "用随机化、制度阈值和外部冲击构造可信反事实，并审查政治伦理。",
    ["实验", "自然实验", "因果识别"]
  ),
  n(
    "formal-models-game-theory",
    "形式模型与政治博弈论",
    "concept",
    "methods",
    "明确行动者、偏好、信息和规则，推导战略互动的均衡与可检验命题。",
    ["形式模型", "博弈论", "均衡"]
  ),
  n(
    "text-as-data-political-analysis",
    "文本即数据与计算政治分析",
    "concept",
    "methods",
    "把政治文本的生成、标注、模型验证与跨语言偏差纳入同一分析管线。",
    ["文本即数据", "NLP", "模型验证"]
  ),
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
  n(
    "central-bank-independence-political-economy",
    "中央银行独立的政治经济学",
    "institution",
    "institutions",
    "央行独立如何在抗通胀可信度、财政主导和民主问责之间取得平衡。",
    ["中央银行", "货币政策", "独立性"]
  ),
  n(
    "central-bank-communication-public-understanding",
    "央行沟通与公众理解",
    "institution",
    "institutions",
    "央行如何把通胀目标、政策工具、预测不确定性和民主问责转化为公众能理解的语言。",
    ["中央银行", "沟通", "公众理解", "信任"]
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
  n(
    "failed-and-fragile-states",
    "失败与脆弱国家",
    "concept",
    "international-relations",
    "国家能力、合法性和安全垄断不足导致的治理脆弱性。",
    ["脆弱国家", "安全", "国家能力"]
  ),
  n(
    "regional-organizations",
    "区域组织",
    "concept",
    "international-relations",
    "区域一体化、贸易、公共品与安全合作的制度平台。",
    ["区域一体化", "国际制度"]
  ),
  n(
    "peacekeeping",
    "维和行动",
    "concept",
    "international-relations",
    "联合国与区域组织在冲突后稳定、保护平民和政治过渡中的行动。",
    ["维和", "联合国", "安全"]
  ),
  n(
    "trade-politics-and-wto",
    "贸易政治与 WTO",
    "concept",
    "international-relations",
    "贸易规则、产业利益、关税、争端解决和多边秩序之间的政治经济关系。",
    ["贸易", "WTO", "全球治理"]
  ),
  n(
    "postcolonial-state-building",
    "后殖民国家建设",
    "concept",
    "international-relations",
    "从殖民边界、国家能力、财政契约和合法性解释独立后的国家形成。",
    ["后殖民", "国家能力", "去殖民化"]
  ),
  n(
    "african-regional-organizations",
    "非洲区域组织",
    "concept",
    "international-relations",
    "非洲联盟、ECOWAS、SADC、EAC 与 AfCFTA 如何提供安全、贸易和公共品。",
    ["非洲联盟", "区域一体化", "AfCFTA"]
  ),
  ...POLITICAL_SCIENCE_COVERAGE_NODES,
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
  e("fiscal-state", "state-capacity", "财政基础"),
  e("budget-governance", "fiscal-state", "预算纪律"),
  e("fiscal-rules-democratic-legitimacy", "budget-governance", "规则嵌入预算过程"),
  e("fiscal-rules-democratic-legitimacy", "fiscal-state", "跨期财政承诺"),
  e("political-methodology-behavioralism", "comparative-method", "跨案例检验"),
  e("political-methodology-behavioralism", "survey-public-opinion-measurement", "行为测量"),
  e("political-methodology-behavioralism", "formal-models-game-theory", "形式理论"),
  e("comparative-method", "case-selection-and-small-n", "选择可比较案例"),
  e("case-selection-and-small-n", "process-tracing", "进入案例内部"),
  e("process-tracing", "experiments-natural-experiments", "机制与效应互证"),
  e("survey-public-opinion-measurement", "experiments-natural-experiments", "调查实验"),
  e("formal-models-game-theory", "experiments-natural-experiments", "检验战略预测"),
  e("survey-public-opinion-measurement", "text-as-data-political-analysis", "舆论与表达"),
  e("text-as-data-political-analysis", "process-tracing", "定位关键过程材料"),
  e("central-bank-independence-political-economy", "fiscal-state", "财政-货币边界"),
  e(
    "central-bank-communication-public-understanding",
    "central-bank-independence-political-economy",
    "独立性的公共解释"
  ),
  e("central-bank-communication-public-understanding", "budget-governance", "财政-货币协调"),
  e("social-movements", "democracy", "推动"),
  e("federalism", "the-state", "结构形态"),
  e("welfare-state", "socialism", "部分实践"),
  e("realism-ir", "power", "国关版本"),
  e("postcolonial-state-building", "state-capacity", "核心能力"),
  e("postcolonial-state-building", "postcolonialism", "制度化问题"),
  e("postcolonial-state-building", "failed-and-fragile-states", "失败风险"),
  e("african-regional-organizations", "regional-organizations", "非洲版本"),
  e("african-regional-organizations", "postcolonial-state-building", "弥补国家能力"),
  e("african-regional-organizations", "peacekeeping", "安全功能"),
  e("african-regional-organizations", "trade-politics-and-wto", "贸易一体化"),
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
  {
    source: "political-science:fiscal-state",
    target: "economics:modern-money-fiscal-deficits",
    type: "domain-link",
    label: "财政能力",
  },
  {
    source: "political-science:budget-governance",
    target: "economics:debt-sustainability-macro-framework",
    type: "domain-link",
    label: "债务路径可信度",
  },
  {
    source: "political-science:fiscal-rules-democratic-legitimacy",
    target: "economics:debt-sustainability-macro-framework",
    type: "domain-link",
    label: "规则塑造债务可信度",
  },
  {
    source: "political-science:fiscal-rules-democratic-legitimacy",
    target: "psychology:political-psychology-of-fiscal-austerity",
    type: "domain-link",
    label: "规则需要分配合法性",
  },
  {
    source: "political-science:fiscal-rules-democratic-legitimacy",
    target: "economics:expectations-credibility-policy-transmission",
    type: "domain-link",
    label: "财政承诺进入预期",
  },
  {
    source: "political-science:central-bank-independence-political-economy",
    target: "economics:country-macro-diagnostics-forecasting",
    type: "domain-link",
    label: "货币政策情景",
  },
  {
    source: "political-science:central-bank-communication-public-understanding",
    target: "psychology:inflation-expectations-and-trust",
    type: "domain-link",
    label: "预期与信任",
  },
  {
    source: "political-science:central-bank-communication-public-understanding",
    target: "economics:modern-money-fiscal-deficits",
    type: "domain-link",
    label: "政策边界沟通",
  },
  {
    source: "political-science:postcolonial-state-building",
    target: "economics:african-development-economics",
    type: "domain-link",
    label: "发展与国家能力",
  },
  {
    source: "political-science:african-regional-organizations",
    target: "economics:african-development-economics",
    type: "domain-link",
    label: "区域市场与公共品",
  },
  {
    source: "political-science:comparative-method",
    target: "sociology:comparative-historical-analysis",
    type: "domain-link",
    label: "比较设计与历史路径",
  },
  {
    source: "political-science:process-tracing",
    target: "sociology:comparative-historical-analysis",
    type: "domain-link",
    label: "案例内部机制",
  },
  {
    source: "political-science:survey-public-opinion-measurement",
    target: "sociology:survey-research",
    type: "domain-link",
    label: "抽样与测量",
  },
  {
    source: "political-science:experiments-natural-experiments",
    target: "sociology:experiments-and-quasi-experiments",
    type: "domain-link",
    label: "随机化与准实验",
  },
  {
    source: "political-science:text-as-data-political-analysis",
    target: "sociology:content-analysis",
    type: "domain-link",
    label: "编码与语境",
  },
  {
    source: "political-science:text-as-data-political-analysis",
    target: "computer-science:machine-learning-overview",
    type: "domain-link",
    label: "机器学习与模型验证",
  },
  {
    source: "political-science:formal-models-game-theory",
    target: "mathematics:game-theory",
    type: "domain-link",
    label: "战略互动的数学",
  },
  ...POLITICAL_SCIENCE_COVERAGE_EDGES,
];

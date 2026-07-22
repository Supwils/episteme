import type { GraphEdge } from "./types";
import { CONFLUENCE_MULTIPARENT_RELATIONS } from "./confluence-prerequisite-release";
import type { LearningRelationRole, ReviewedLearningRelation } from "./learning-relation-types";

export { FRONTIER_FOUNDATION_NODES } from "./frontier-foundation-nodes";
export type {
  LearningRelationEvidenceKind,
  LearningRelationEvidenceReference,
  LearningRelationRole,
  ReviewedLearningRelation,
} from "./learning-relation-types";

const REVIEWED_AT = "2026-07-13" as const;
const FOUNDATION_RELEASE_ID = "frontier-foundations-v1";
const FOUNDATION_RELEASE_VERSION = "1.0.0";

function reviewedRelation(
  relation: Pick<
    ReviewedLearningRelation,
    "sourceId" | "targetId" | "role" | "rationale" | "reviewBasis"
  >
): ReviewedLearningRelation {
  return {
    ...relation,
    id: `${FOUNDATION_RELEASE_ID}:${relation.sourceId}->${relation.targetId}:${relation.role}`,
    reviewStatus: "reviewed",
    reviewedAt: REVIEWED_AT,
    releaseId: FOUNDATION_RELEASE_ID,
    version: FOUNDATION_RELEASE_VERSION,
    evidence: [
      {
        kind: "editorial-audit",
        ref: "frontier-foundation-audit-2026-07-13",
        label: "高阶无锚点逐学科审计",
      },
    ],
  };
}

function reviewedGroup(
  sourceId: string,
  targetIds: readonly string[],
  rationale: string,
  reviewBasis: ReviewedLearningRelation["reviewBasis"] = "domain-foundation"
): ReviewedLearningRelation[] {
  return targetIds.map((targetId) =>
    reviewedRelation({
      sourceId,
      targetId,
      role: "required-prerequisite",
      rationale,
      reviewBasis,
    })
  );
}

const REQUIRED_RELATIONS: readonly ReviewedLearningRelation[] = [
  ...reviewedGroup(
    "cosmology:scale-light-expansion",
    ["cosmology:大爆炸理论"],
    "大爆炸模型以宇宙尺度、光谱红移和膨胀观测为入门证据。",
    "content-dependency"
  ),
  ...reviewedGroup(
    "physics:measurement-motion-energy",
    [
      "physics:P1",
      "physics:P2",
      "physics:P3",
      "physics:P4",
      "physics:P5",
      "physics:P6",
      "physics:P7",
      "physics:量子物理--量子纠缠",
      "physics:量子物理--不确定性原理",
      "physics:相对论--狭义相对论",
      "physics:相对论--广义相对论",
      "physics:经典物理--能量守恒",
      "physics:热力学--麦克斯韦妖",
      "physics:粒子物理--higgs-mechanism",
      "physics:粒子物理--quarks-and-leptons",
      "physics:凝聚态物理--bose-einstein-condensate",
    ],
    "这些理论都要求先能读懂测量、变化、尺度与能量守恒。"
  ),
  ...reviewedGroup(
    "philosophy:questions-reasons-counterexamples",
    [
      "philosophy:existentialism",
      "philosophy:marxism-philosophy",
      "philosophy:structuralism",
      "philosophy:ai-ethics",
      "philosophy:complexity-philosophy",
      "philosophy:decolonial-epistemology",
      "philosophy:digital-identity",
      "philosophy:effective-altruism-detail",
      "philosophy:epistemic-justice",
      "philosophy:indian-buddhist-epistemology",
      "philosophy:information-philosophy",
      "philosophy:modern-chinese-thought",
      "philosophy:practical-wisdom",
      "philosophy:how-to-live-meaningfully",
      "philosophy:should-ai-have-rights",
      "philosophy:constructivism",
      "philosophy:effective-altruism",
      "philosophy:environmentalism",
      "philosophy:feminism",
      "philosophy:positivism",
      "philosophy:pragmatism-ism",
      "philosophy:structuralism-ism",
      "philosophy:transcendentalism",
      "philosophy:transhumanism",
    ],
    "进入流派、伦理与认识论争论前，必须能区分主张、理由与反例。"
  ),
  ...reviewedGroup(
    "economics:scarcity-flows-incentives",
    [
      "economics:expectations-credibility-policy-transmission",
      "economics:bond-market",
      "economics:real-estate-economics",
      "economics:poverty-trap",
      "economics:eurozone-crisis",
      "economics:yen-carry-trade",
      "economics:us-macro-diagnosis-2026",
      "economics:china-macro-diagnosis-2026",
      "economics:china-property-local-finance-financial-system-2026",
      "economics:euro-area-macro-diagnosis-2026",
      "economics:euro-area-fiscal-rules-energy-transition-2026",
      "economics:japan-macro-diagnosis-2026",
      "economics:japan-yield-normalization-aging-fiscal-2026",
      "economics:india-macro-diagnosis-2026",
      "economics:india-growth-employment-constraints-2026",
      "economics:commodity-exporters-macro-diagnosis-2026",
      "economics:commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
      "economics:low-income-debt-countries-macro-diagnosis-2026",
      "economics:commons-governance",
    ],
    "专题判断依赖资源约束、存量流量和激励变化三个共同入口。"
  ),
  ...reviewedGroup(
    "economics:poverty-trap",
    ["economics:development-economics"],
    "发展经济学需要先理解贫困陷阱中资本、人力与制度的反馈。",
    "content-dependency"
  ),
  ...reviewedGroup(
    "psychology:behavior-mind-evidence",
    [
      "psychology:bystander-effect",
      "psychology:change-blindness",
      "psychology:dunning-kruger",
      "psychology:fundamental-attribution-error",
      "psychology:groupthink",
      "psychology:placebo-effect",
      "psychology:self-fulfilling-prophecy",
      "psychology:serial-position-effect",
      "psychology:social-identity",
      "psychology:risk-perception-and-macro-decisions",
      "psychology:political-polarization-psychology",
      "psychology:inflation-expectations-and-trust",
      "psychology:political-psychology-of-fiscal-austerity",
      "psychology:cultural-psychology",
      "psychology:sleep-and-mind",
      "psychology:causal-inference-experiments-observational-studies",
    ],
    "解释心理现象前，需要区分行为、体验、测量与理论推断。"
  ),
  ...reviewedGroup(
    "psychology:perception-physiology",
    ["psychology:stroop-1935"],
    "理解 Stroop 实验需要先掌握知觉加工与反应测量。",
    "method-sequence"
  ),
  ...reviewedGroup(
    "computer-science:abstraction",
    [
      "computer-science:recursion",
      "computer-science:data-structures",
      "computer-science:computer-security-principles",
      "computer-science:human-computer-interaction",
    ],
    "递归、数据结构、安全与交互都依赖抽象边界和接口层次。"
  ),
  ...reviewedGroup(
    "computer-science:data-structures",
    ["computer-science:a-star-search", "computer-science:binary-search"],
    "搜索算法的状态空间与索引操作依赖数据结构表达。",
    "method-sequence"
  ),
  ...reviewedGroup(
    "political-science:power-rules-collective-choice",
    [
      "political-science:conservatism",
      "political-science:fascism",
      "political-science:feminism",
      "political-science:postcolonialism",
      "political-science:social-movements",
      "political-science:political-methodology-behavioralism",
      "political-science:realism-ir",
      "political-science:failed-and-fragile-states",
      "political-science:regional-organizations",
      "political-science:peacekeeping",
      "political-science:african-regional-organizations",
      "political-science:accountability",
      "political-science:political-economy",
      "political-science:security-dilemma-war-peace",
    ],
    "比较意识形态、制度和国际关系前，必须先识别权力、规则与集体行动。"
  ),
  ...reviewedGroup(
    "political-science:political-methodology-behavioralism",
    ["political-science:experiments-natural-experiments"],
    "实验与自然实验属于政治方法论中的识别策略。",
    "method-sequence"
  ),
  ...reviewedGroup(
    "cosmology:大爆炸理论",
    [
      "cosmology:宇宙的最终命运",
      "cosmology:宇宙距离阶梯",
      "cosmology:重子声学振荡",
      "cosmology:宇宙学基础--丢失的重子问题",
      "cosmology:宇宙学观测--苏尼亚耶夫-泽尔多维奇效应",
    ],
    "这些专题以膨胀宇宙、热历史及其观测证据为共同模型背景。",
    "content-dependency"
  ),
  ...reviewedGroup(
    "mathematics:number-line",
    [
      "mathematics:linear-algebra",
      "mathematics:dynamical-systems",
      "mathematics:optimization",
      "mathematics:control-theory",
      "mathematics:matrix",
      "mathematics:chaos-theory",
    ],
    "这些领域都从数量、方向、距离和变化的可操作表示出发。"
  ),
  ...reviewedGroup(
    "mathematics:axiom",
    [
      "mathematics:category-theory",
      "mathematics:graph-theory",
      "mathematics:complexity",
      "mathematics:information-theory",
      "mathematics:combinatorics",
    ],
    "定义对象、关系和规则是进入离散结构与抽象理论的必要步骤。"
  ),
  ...reviewedGroup(
    "earth-science:earth-systems-observation",
    [
      "earth-science:plate-boundaries",
      "earth-science:earths-magnetic-field",
      "earth-science:thermohaline-circulation",
      "earth-science:coriolis-effect",
      "earth-science:map-projections",
      "earth-science:cryosphere",
      "earth-science:ocean-acidification",
      "earth-science:climate-modeling",
      "earth-science:sea-level-change",
      "earth-science:mineral-resources-and-critical-metals",
    ],
    "圈层交换、尺度、物质来源和观测误差是这些地球过程与资源判断的共同基础。"
  ),
  ...reviewedGroup(
    "earth-science:plate-boundaries",
    ["earth-science:orogeny-mountain-building"],
    "造山过程建立在板块汇聚、俯冲与碰撞机制之上。",
    "content-dependency"
  ),
  ...reviewedGroup(
    "earth-science:climate-modeling",
    ["earth-science:extreme-event-attribution", "earth-science:urban-heat-risk-adaptation"],
    "归因与适应评估都需要气候模型的基线、情景和不确定性。",
    "method-sequence"
  ),
  ...reviewedGroup(
    "medicine:body-disease-evidence",
    [
      "medicine:global-health-inequality-coloniality",
      "medicine:maternal-child-health-life-course",
      "medicine:vaccine-policy-programs-hesitancy",
      "medicine:clinical-diagnosis",
      "medicine:pharmacology",
      "medicine:inflammation",
      "medicine:pathology",
      "medicine:nutrition-science",
      "medicine:screening-and-early-detection",
      "medicine:pain-and-analgesia",
      "medicine:informed-consent",
      "medicine:community-mental-health-access-continuity",
      "medicine:adolescent-mental-health-school-community-services",
    ],
    "这些主题都要求区分正常功能、疾病机制和可评价的健康结局。"
  ),
  ...reviewedGroup(
    "medicine:germ-theory",
    ["medicine:plague"],
    "鼠疫的传播、诊断和防控需要病原体与传播途径框架。",
    "content-dependency"
  ),
  ...reviewedGroup(
    "medicine:clinical-diagnosis",
    ["medicine:x-ray-imaging"],
    "影像检查的价值取决于临床问题、诊断阈值和误差解释。",
    "method-sequence"
  ),
  ...reviewedGroup(
    "chemistry:matter-change-measurement",
    [
      "chemistry:chemical-equilibrium",
      "chemistry:thermochemistry",
      "chemistry:electrochemistry",
      "chemistry:carbon-allotropes",
      "chemistry:metals-and-alloys",
      "chemistry:catalysts",
      "chemistry:mass-spectrometry",
      "chemistry:reaction-mechanisms",
      "chemistry:chirality",
      "chemistry:medicinal-chemistry",
      "chemistry:bonding-theory",
      "chemistry:buffer-systems",
    ],
    "组成、结构、守恒与可测变化是这些化学主题的共同入口。"
  ),
  ...reviewedGroup(
    "sociology:social-patterns-institutions",
    [
      "sociology:social-capital",
      "sociology:deviance-and-social-control",
      "sociology:chinese-social-thought",
      "sociology:indian-social-thought",
      "sociology:islamic-social-thought",
      "sociology:latin-american-dependency-liberation-sociology",
      "sociology:social-support-mental-health",
    ],
    "理解社会理论与制度问题前，需要先能从互动中识别结构性模式。"
  ),
  ...reviewedGroup(
    "sociology:social-structure",
    ["sociology:african-urbanization", "sociology:media-and-public-sphere"],
    "城市化与公共领域都以组织、分层和制度关系为分析骨架。",
    "content-dependency"
  ),
];

const CONTEXT_RELATIONS: readonly ReviewedLearningRelation[] = [
  reviewedRelation({
    sourceId: "political-science:taxes-and-public-budget",
    targetId: "economics:us-macro-diagnosis-2026",
    role: "recommended-background",
    rationale: "预算制度有助于解释财政路径，但不是阅读宏观诊断的硬门槛。",
    reviewBasis: "content-dependency",
  }),
  reviewedRelation({
    sourceId: "psychology:inflation-psychology",
    targetId: "economics:modern-money-fiscal-deficits",
    role: "related-context",
    rationale: "心理机制与通胀模型相互解释，但不构成单向前置。",
    reviewBasis: "content-dependency",
  }),
  reviewedRelation({
    sourceId: "economics:bond-market",
    targetId: "economics:us-macro-diagnosis-2026",
    role: "recommended-background",
    rationale: "国债市场能深化财政诊断，但基础宏观体征已足以开始。",
    reviewBasis: "content-dependency",
  }),
];

export const REVIEWED_LEARNING_RELATIONS: readonly ReviewedLearningRelation[] = [
  ...REQUIRED_RELATIONS,
  ...CONTEXT_RELATIONS,
  ...CONFLUENCE_MULTIPARENT_RELATIONS,
];

export const REVIEWED_REQUIRED_PREREQUISITES = new Map<string, readonly string[]>();
for (const relation of REVIEWED_LEARNING_RELATIONS) {
  if (relation.role !== "required-prerequisite") continue;
  const existing = REVIEWED_REQUIRED_PREREQUISITES.get(relation.targetId) ?? [];
  REVIEWED_REQUIRED_PREREQUISITES.set(relation.targetId, [...existing, relation.sourceId]);
}

export const REVIEWED_LEARNING_RELATION_EDGES: readonly GraphEdge[] =
  REVIEWED_LEARNING_RELATIONS.map((relation) => ({
    source: relation.sourceId,
    target: relation.targetId,
    type:
      relation.role === "required-prerequisite"
        ? "hierarchy"
        : relation.sourceId.split(":")[0] === relation.targetId.split(":")[0]
          ? "cross-reference"
          : "domain-link",
    label:
      relation.role === "required-prerequisite"
        ? "必要前置"
        : relation.role === "recommended-background"
          ? "推荐背景"
          : "相关语境",
  }));

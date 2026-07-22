export type MentalHealthComparisonKind = "shared" | "contrast";

export interface MentalHealthComparisonRoute {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  href: string;
  stepCount: number;
}

export interface MentalHealthComparisonSide {
  routeId: string;
  step: number;
  nodeId: string;
  label: string;
  perspective: string;
  articleHref: string;
  tourHref: string;
}

export interface MentalHealthComparisonCheckpoint {
  id: string;
  kind: MentalHealthComparisonKind;
  label: string;
  question: string;
  left: MentalHealthComparisonSide;
  right: MentalHealthComparisonSide;
}

const CLINICAL_ROUTE_ID = "from-distress-to-rights-based-mental-health-care";
const ADOLESCENT_ROUTE_ID = "from-adolescent-development-to-continuous-support";

function tourHref(routeId: string, step: number, nodeId: string): string {
  const params = new URLSearchParams({
    layout: "spatial",
    tourId: routeId,
    step: String(step),
    source: "route-comparison",
    focus: nodeId,
  });
  return `/knowledge-graph?${params.toString()}`;
}

function side(
  routeId: string,
  step: number,
  nodeId: string,
  label: string,
  perspective: string,
  articleHref: string
): MentalHealthComparisonSide {
  return {
    routeId,
    step,
    nodeId,
    label,
    perspective,
    articleHref,
    tourHref: tourHref(routeId, step, nodeId),
  };
}

export const MENTAL_HEALTH_COMPARISON_ROUTES: readonly [
  MentalHealthComparisonRoute,
  MentalHealthComparisonRoute,
] = [
  {
    id: CLINICAL_ROUTE_ID,
    label: "个体困扰与可持续照护",
    shortLabel: "个体照护",
    color: "#d36b76",
    href: tourHref(CLINICAL_ROUTE_ID, 1, "psychology:major-depressive"),
    stepCount: 9,
  },
  {
    id: ADOLESCENT_ROUTE_ID,
    label: "青少年环境与连续支持",
    shortLabel: "环境支持",
    color: "#5ca47a",
    href: tourHref(ADOLESCENT_ROUTE_ID, 1, "psychology:developmental-psychology"),
    stepCount: 10,
  },
];
export const MENTAL_HEALTH_COMPARISON_CHECKPOINTS: readonly MentalHealthComparisonCheckpoint[] = [
  {
    id: "unit-of-analysis",
    kind: "contrast",
    label: "分析起点",
    question: "研究从症状表型出发，还是先解释发展阶段与环境暴露？",
    left: side(
      CLINICAL_ROUTE_ID,
      1,
      "psychology:major-depressive",
      "重度抑郁症",
      "区分情绪、症状、功能损害和临床诊断，避免用单一总分代表全部困扰。",
      "/psychology/disorders/major-depressive"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      1,
      "psychology:developmental-psychology",
      "发展心理学",
      "把生理、认知、身份和关系变化视为发展窗口，避免把正常波动直接病理化。",
      "/psychology/knowledge-base/developmental-psychology"
    ),
  },
  {
    id: "social-support",
    kind: "shared",
    label: "关系与支持",
    question: "同一个社会支持节点，如何同时影响求助、压力缓冲和青少年归属？",
    left: side(
      CLINICAL_ROUTE_ID,
      3,
      "sociology:social-support-mental-health",
      "社会支持与心理健康",
      "关系质量改变污名、求助入口、持续治疗和危机中的自主空间。",
      "/sociology/concepts/social-support-mental-health"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      4,
      "sociology:social-support-mental-health",
      "社会支持与心理健康",
      "家庭和同伴既可缓冲压力，也可能传播排斥、控制和规范压力。",
      "/sociology/concepts/social-support-mental-health"
    ),
  },
  {
    id: "causal-standard",
    kind: "contrast",
    label: "因果标准",
    question: "平均疗效和平台关联分别需要怎样的反事实与外推边界？",
    left: side(
      CLINICAL_ROUTE_ID,
      4,
      "medicine:depression",
      "抑郁症临床证据",
      "观察诊断鉴别、症状、功能、安全与治疗反应，不把平均疗效写成个人预言。",
      "/medicine/diseases/depression"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      6,
      "psychology:causal-inference-experiments-observational-studies",
      "心理学因果推断",
      "比较随机实验、纵向观察和自然实验，并公开混杂、干预定义与可外推人群。",
      "/psychology/methods/causal-inference-experiments-observational-studies"
    ),
  },
  {
    id: "intervention-locus",
    kind: "contrast",
    label: "干预层级",
    question: "资源应优先进入卫生系统覆盖，还是学校与社区的上游入口？",
    left: side(
      CLINICAL_ROUTE_ID,
      6,
      "medicine:health-systems-universal-health-coverage",
      "卫生系统与全民健康覆盖",
      "从服务、人群和费用三条轴审计有效覆盖、质量和财务保护。",
      "/medicine/public-health/health-systems-universal-health-coverage"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      8,
      "medicine:adolescent-mental-health-school-community-services",
      "学校、社区与连续服务",
      "把促进性环境、教师边界、适龄识别和校外青年触达接入真实转介。",
      "/medicine/public-health/adolescent-mental-health-school-community-services"
    ),
  },
  {
    id: "system-responsibility",
    kind: "contrast",
    label: "系统责任",
    question: "公共项目与平台治理分别掌握哪些规则、数据和问责工具？",
    left: side(
      CLINICAL_ROUTE_ID,
      7,
      "political-science:public-policy",
      "公共政策",
      "明确目标人群、资金、执行责任、申诉和分配结果，避免政策停留在承诺。",
      "/political-science/concepts/public-policy"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      7,
      "sociology:platform-governance",
      "平台治理前沿",
      "审计默认设置、推荐、骚扰处置、研究数据访问和风险的群体分布。",
      "/sociology/frontier/platform-governance"
    ),
  },
  {
    id: "care-continuity",
    kind: "shared",
    label: "连续照护",
    question: "服务从哪里进入并不相同，但为什么都必须审计转介后的流失？",
    left: side(
      CLINICAL_ROUTE_ID,
      5,
      "medicine:community-mental-health-access-continuity",
      "社区精神卫生与连续照护",
      "从需要、识别、首次接触到匹配治疗和恢复，逐级定位服务流失。",
      "/medicine/public-health/community-mental-health-access-continuity"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      9,
      "medicine:community-mental-health-access-continuity",
      "社区精神卫生与连续照护",
      "确认学校转介是否真正被接收，并检查等待、失访和群体覆盖差距。",
      "/medicine/public-health/community-mental-health-access-continuity"
    ),
  },
  {
    id: "rights-and-agency",
    kind: "shared",
    label: "权利与主体性",
    question: "危机中的决定能力与青少年的适龄自主，如何共享同一权利底线？",
    left: side(
      CLINICAL_ROUTE_ID,
      8,
      "medicine:informed-consent",
      "知情同意",
      "能力针对具体决定评估，并以支持性决策、持续同意和最少限制保护主体地位。",
      "/medicine/concepts/informed-consent"
    ),
    right: side(
      ADOLESCENT_ROUTE_ID,
      10,
      "medicine:informed-consent",
      "知情同意",
      "用适龄沟通、隐私边界、可信支持者和申诉机制保护发展中的自主。",
      "/medicine/concepts/informed-consent"
    ),
  },
];

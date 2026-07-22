import type {
  AdolescentServiceConstraints,
  AdolescentServiceOption,
  AdolescentServiceScenario,
} from "./adolescent-service-portfolio";

// All values are fictional teaching inputs. They expose system dependencies
// and allocation trade-offs; they are not effect estimates or local budgets.
export const ADOLESCENT_SERVICE_OPTIONS: readonly AdolescentServiceOption[] = [
  {
    id: "whole-school-climate",
    title: "全校安全、归属与心理健康促进",
    shortTitle: "全校促进",
    layer: "promotion",
    costUnits: 4.2,
    benefitUnits: 520,
    underservedShare: 0.45,
    mechanism: "改善安全、归属、反欺凌规则、求助文化与教师支持环境。",
    implementationConstraint: "需要学校治理、教师工作条件与学生参与，而不只是一次课程。",
  },
  {
    id: "targeted-early-support",
    title: "面向早期困难与高风险暴露的定向支持",
    shortTitle: "定向支持",
    layer: "early-support",
    costUnits: 4.8,
    benefitUnits: 430,
    underservedShare: 0.52,
    mechanism: "为出现功能变化或暴露于逆境的青少年提供结构化、可升级的支持。",
    implementationConstraint: "必须定义升级条件，并避免把风险身份直接等同于诊断。",
  },
  {
    id: "community-youth-outreach",
    title: "校外青年、偏远社区与少数语言外展",
    shortTitle: "社区外展",
    layer: "outreach",
    costUnits: 3.9,
    benefitUnits: 270,
    underservedShare: 0.82,
    mechanism: "通过青年中心、基层卫生、移动团队和可信社区组织补足学校分母。",
    implementationConstraint: "需要稳定转介目的地、语言适配与免污名接触方式。",
  },
  {
    id: "youth-friendly-entry",
    title: "适龄评估、保密说明与转介协调",
    shortTitle: "适龄入口",
    layer: "entry",
    costUnits: 5.2,
    benefitUnits: 350,
    underservedShare: 0.65,
    mechanism: "把求助信号转成确认评估、匹配服务和被接收的转介。",
    implementationConstraint: "要有责任人、等待时间标准、保密边界与失败后的补救。",
  },
  {
    id: "matched-clinical-care",
    title: "可直接进入的匹配临床照护能力",
    shortTitle: "匹配照护",
    layer: "care",
    costUnits: 8.6,
    benefitUnits: 560,
    underservedShare: 0.38,
    mechanism: "按严重度、风险、功能、偏好与既往反应匹配心理、家庭、社会或药物照护。",
    implementationConstraint: "需要督导、质量保障、危机路径和高强度服务的直接入口。",
  },
  {
    id: "continuity-navigation",
    title: "跨学校、家庭、社区与卫生服务的连续导航",
    shortTitle: "连续导航",
    layer: "continuity",
    costUnits: 4.9,
    benefitUnits: 390,
    underservedShare: 0.68,
    mechanism: "确认交接、主动跟进失访并持续观察功能、安全、偏好与权利结果。",
    implementationConstraint: "跨机构需要授权的信息共享、共同责任与长期人力。",
  },
];

export const DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS: AdolescentServiceConstraints = {
  budgetUnits: 26,
  equityWeight: 1.6,
  minimumUnderservedShare: 0.45,
  requireCompletePathway: true,
};

export const ADOLESCENT_SERVICE_SCENARIOS: readonly AdolescentServiceScenario[] = [
  {
    id: "school-first",
    label: "校内起步",
    description: "预算较紧，不强制完整临床路径，用来暴露“项目有活动、系统无接收”的风险。",
    constraints: {
      budgetUnits: 16,
      equityWeight: 1,
      minimumUnderservedShare: 0.3,
      requireCompletePathway: false,
    },
  },
  {
    id: "connected-district",
    label: "区域联结",
    description: "要求入口、匹配照护和连续导航闭环，并为服务不足群体设置最低收益占比。",
    constraints: DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS,
  },
  {
    id: "equity-network",
    label: "公平网络",
    description: "提高公平权重与最低占比，观察社区外展和连续导航如何改变组合。",
    constraints: {
      budgetUnits: 30,
      equityWeight: 2.2,
      minimumUnderservedShare: 0.56,
      requireCompletePathway: true,
    },
  },
];

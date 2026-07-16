import type { LearningGoalStep, LearningPlanMinutes } from "@/lib/knowledge-learning-plan";

export type KnowledgeConfluenceRole = "required" | "complementary" | "contested";

export type KnowledgeConfluenceEvidenceType =
  | "observational-data"
  | "causal-evidence"
  | "model-scenario"
  | "comparative-institutional"
  | "normative-framework"
  | "systematic-synthesis"
  | "implementation-evidence"
  | "measurement-validation";

export type KnowledgeConfluenceReviewStatus = "reviewed" | "monitor" | "needs-review";

export interface KnowledgeConfluenceEvidenceSource {
  id: string;
  title: string;
  publisher: string;
  year: number;
  href: string;
}

export interface KnowledgeConfluenceEvidenceDefinition {
  strandId: string;
  evidenceType: KnowledgeConfluenceEvidenceType;
  claim: string;
  dispute: string;
  reviewedAt: string;
  reviewStatus: KnowledgeConfluenceReviewStatus;
  sourceIds: readonly string[];
}

export interface KnowledgeConfluenceEvidenceRecord extends Omit<
  KnowledgeConfluenceEvidenceDefinition,
  "sourceIds"
> {
  sourcePathId: string;
  sourcePathTitle: string;
  sourceNode: Pick<
    LearningGoalStep,
    "nodeId" | "label" | "level" | "domainLabel" | "articleHref" | "graphHref"
  >;
  sources: readonly KnowledgeConfluenceEvidenceSource[];
}

export interface KnowledgeConfluenceStrandDefinition {
  id: string;
  pathId: string;
  role: KnowledgeConfluenceRole;
  title: string;
  contribution: string;
  boundary: string;
  reviewQuestion: string;
}

export interface KnowledgeConfluenceDefinition {
  id: string;
  title: string;
  question: string;
  summary: string;
  targetPathId: string;
  synthesisTask: string;
  unresolvedQuestions: readonly string[];
  strands: readonly KnowledgeConfluenceStrandDefinition[];
}

export interface KnowledgeConfluenceStrand extends KnowledgeConfluenceStrandDefinition {
  domainIds: readonly LearningGoalStep["domainId"][];
  steps: readonly LearningGoalStep[];
  evidence: KnowledgeConfluenceEvidenceRecord;
}

export interface KnowledgeConfluence extends Omit<KnowledgeConfluenceDefinition, "strands"> {
  target: LearningGoalStep;
  domainCount: number;
  nodeCount: number;
  strands: readonly KnowledgeConfluenceStrand[];
}

export interface KnowledgeConfluenceSummary {
  id: string;
  title: string;
  question: string;
  summary: string;
  strandCount: number;
  domainCount: number;
  nodeCount: number;
  targetLabel: string;
  roleCounts: Record<KnowledgeConfluenceRole, number>;
  evidenceSourceCount: number;
  reviewedAt: string;
  reviewStatus: KnowledgeConfluenceReviewStatus;
  href: string;
}

export interface KnowledgeConfluenceSummaryCatalog {
  confluences: readonly KnowledgeConfluenceSummary[];
}

export interface KnowledgeConfluencePlanStep extends LearningGoalStep {
  minutes: number;
  activity: string;
  reason: string;
  strandId: string | null;
  strandTitle: string;
  role: KnowledgeConfluenceRole | "synthesis";
}

export interface KnowledgeConfluencePlan {
  id: string;
  confluenceId: string;
  totalMinutes: LearningPlanMinutes;
  checkpointCount: number;
  strands: readonly {
    id: string;
    title: string;
    role: KnowledgeConfluenceRole;
    minutes: number;
    steps: readonly KnowledgeConfluencePlanStep[];
  }[];
  synthesis: KnowledgeConfluencePlanStep;
}

export const KNOWLEDGE_CONFLUENCE_ROLE_META: Record<
  KnowledgeConfluenceRole,
  { label: string; shortLabel: string; description: string; color: string }
> = {
  required: {
    label: "必要主线",
    shortLabel: "必要",
    description: "缺少这条线，就无法形成对研究问题的基本解释或判断。",
    color: "#d6a85f",
  },
  complementary: {
    label: "互补视角",
    shortLabel: "互补",
    description: "补入另一种尺度、机制或制度条件，防止单学科过度外推。",
    color: "#55a897",
  },
  contested: {
    label: "争议检验",
    shortLabel: "检验",
    description: "主动寻找测量边界、替代解释与受忽略经验，暴露结论的不确定性。",
    color: "#c17882",
  },
};

export const KNOWLEDGE_CONFLUENCE_EVIDENCE_META: Record<
  KnowledgeConfluenceEvidenceType,
  { label: string; description: string }
> = {
  "observational-data": {
    label: "观察数据",
    description: "描述分布、趋势与关联；不能单独识别因果。",
  },
  "causal-evidence": {
    label: "因果证据",
    description: "利用实验、准实验或明确识别策略估计干预效果。",
  },
  "model-scenario": {
    label: "模型与情景",
    description: "在公开假设下推演机制、范围与压力情景，不等同于预测。",
  },
  "comparative-institutional": {
    label: "制度比较",
    description: "比较不同历史与制度环境中的机制及可迁移边界。",
  },
  "normative-framework": {
    label: "规范框架",
    description: "公开权利、公平和程序原则，不能替代经验效果检验。",
  },
  "systematic-synthesis": {
    label: "综合评估",
    description: "汇总多来源研究并标注一致性、置信度和知识缺口。",
  },
  "implementation-evidence": {
    label: "实施证据",
    description: "检验方案在真实组织、资源和执行环境中的可达性。",
  },
  "measurement-validation": {
    label: "测量验证",
    description: "检查构念、指标、误差和跨人群可比性是否成立。",
  },
};

export const KNOWLEDGE_CONFLUENCE_REVIEW_META: Record<
  KnowledgeConfluenceReviewStatus,
  { label: string; description: string; color: string }
> = {
  reviewed: {
    label: "已复核",
    description: "来源、主张和边界已在当前审阅日期核对。",
    color: "#55a897",
  },
  monitor: {
    label: "持续跟踪",
    description: "基础证据已复核，但领域变化较快，需要按期更新。",
    color: "#d6a85f",
  },
  "needs-review": {
    label: "待复核",
    description: "存在来源、时效或可迁移性缺口，不应作为稳定结论使用。",
    color: "#c17882",
  },
};

export const KNOWLEDGE_CONFLUENCE_PLAN_LEVELS: Record<
  LearningPlanMinutes,
  readonly (1 | 2 | 3 | 4)[]
> = {
  20: [4],
  45: [2, 4],
  90: [1, 2, 3, 4],
};

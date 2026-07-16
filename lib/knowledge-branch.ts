import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type {
  LearningGoalStep,
  LearningPlanCatalog,
  LearningPlanMinutes,
  LearningPlanSelection,
  LearningPlanStep,
} from "@/lib/knowledge-learning-plan";
import { allocateLearningMinutes, learningActivityFor } from "@/lib/knowledge-learning-plan";

export type KnowledgeBranchConfidence = "curated" | "direct" | "contextual" | "exploratory";
export type KnowledgePlanStepSource = "curated-prerequisite" | "inferred-branch";

export const KNOWLEDGE_BRANCH_CONFIDENCE_META: Record<
  KnowledgeBranchConfidence,
  { label: string; description: string }
> = {
  curated: {
    label: "人工前置",
    description: "目标本身位于人工策展主干中，前置顺序经过逐步核验。",
  },
  direct: {
    label: "直接旁支",
    description: "目标与策展锚点之间有一条明确图谱关系，但它不是前置关系。",
  },
  contextual: {
    label: "两跳旁支",
    description: "目标通过一个中间概念接入策展锚点，用于扩展语境而非证明先修顺序。",
  },
  exploratory: {
    label: "探索旁支",
    description: "目标需要三跳或更多图谱关系接入，适合作为探索线索，不应视为课程结论。",
  },
};

export interface KnowledgeBranchPathNode extends LearningGoalStep {
  relationFromPrevious?: string;
}

export interface KnowledgeAnchorCandidate {
  anchorNodeId: string;
  anchorLabel: string;
  anchorPathId: string;
  anchorPathTitle: string;
  anchorLevel: KnowledgeLevel;
  anchorDomainId: LearningGoalStep["domainId"];
  anchorDomainLabel: string;
  distance: number;
  confidence: KnowledgeBranchConfidence;
  branchPath: readonly KnowledgeBranchPathNode[];
  sameDomain: boolean;
  levelGap: number;
  requiresHigherAnchor: boolean;
  selectionReason: string;
}

export interface KnowledgeBranchTarget {
  id: string;
  label: string;
  description: string;
  level: KnowledgeLevel;
  levelSource: "curated" | "inferred";
  domainId: LearningGoalStep["domainId"];
  domainLabel: string;
  domainColor: string;
  evidenceMode: LearningGoalStep["evidenceMode"];
  evidenceLabel: string;
  articleHref?: string;
  anchorNodeId: string;
  anchorLabel: string;
  anchorPathId: string;
  anchorPathTitle: string;
  anchorLevel: KnowledgeLevel;
  distance: number;
  confidence: KnowledgeBranchConfidence;
  branchPath: readonly KnowledgeBranchPathNode[];
  candidateCount: number;
  anchorCandidates: readonly KnowledgeAnchorCandidate[];
  keywords: readonly string[];
}

export interface KnowledgeBranchCatalog {
  summary: {
    nodeCount: number;
    anchorCount: number;
    inferredBranchCount: number;
    maximumDistance: number;
    ambiguousTargetCount: number;
    maximumCandidateCount: number;
    confidenceCounts: Record<KnowledgeBranchConfidence, number>;
  };
  targets: readonly KnowledgeBranchTarget[];
}

export interface KnowledgeTargetSearchResult {
  id: string;
  label: string;
  domainLabel: string;
  domainColor: string;
  level: KnowledgeLevel;
  levelSource: "curated" | "inferred";
  anchorLabel: string;
  distance: number;
  confidence: KnowledgeBranchConfidence;
  candidateCount: number;
}

export interface KnowledgeTargetFilter {
  domainId?: LearningGoalStep["domainId"];
  level?: KnowledgeLevel;
  confidence?: KnowledgeBranchConfidence;
}

export interface KnowledgeTargetPlanStep extends LearningPlanStep {
  source: KnowledgePlanStepSource;
  relationLabel?: string;
}

export interface KnowledgeTargetPlan {
  id: string;
  title: string;
  question: string;
  requestedStartLevel: KnowledgeLevel;
  effectiveStartLevel: KnowledgeLevel;
  totalMinutes: LearningPlanMinutes;
  assumedMasteredCount: number;
  domainCount: number;
  anchorLabel: string;
  anchorPathTitle: string;
  branchDistance: number;
  confidence: KnowledgeBranchConfidence;
  steps: readonly KnowledgeTargetPlanStep[];
}

export function selectKnowledgeTargetAnchor(
  target: KnowledgeBranchTarget,
  anchorNodeId: string
): KnowledgeBranchTarget {
  const candidate = target.anchorCandidates.find((item) => item.anchorNodeId === anchorNodeId);
  if (!candidate) throw new Error(`Unknown anchor candidate for target: ${target.id}`);
  return {
    ...target,
    anchorNodeId: candidate.anchorNodeId,
    anchorLabel: candidate.anchorLabel,
    anchorPathId: candidate.anchorPathId,
    anchorPathTitle: candidate.anchorPathTitle,
    anchorLevel: candidate.anchorLevel,
    distance: candidate.distance,
    confidence: candidate.confidence,
    branchPath: candidate.branchPath,
  };
}

export function buildKnowledgeTargetPlan(
  catalog: LearningPlanCatalog,
  target: KnowledgeBranchTarget,
  selection: Pick<LearningPlanSelection, "startLevel" | "minutes">
): KnowledgeTargetPlan {
  const goal = catalog.goals.find((candidate) => candidate.id === target.anchorPathId);
  if (!goal) throw new Error(`Missing anchor path for target: ${target.id}`);
  const anchorIndex = goal.steps.findIndex((step) => step.nodeId === target.anchorNodeId);
  if (anchorIndex < 0) throw new Error(`Missing anchor node for target: ${target.id}`);

  const effectiveStartLevel = Math.min(selection.startLevel, target.anchorLevel) as KnowledgeLevel;
  const backbone = goal.steps
    .slice(0, anchorIndex + 1)
    .filter((step) => step.level >= effectiveStartLevel);
  const branch = target.branchPath.slice(1);
  const route = [...backbone, ...branch];
  const allocations = allocateLearningMinutes(selection.minutes, route);
  const steps = route.map((step, index) => {
    const branchIndex = branch.findIndex((candidate) => candidate.nodeId === step.nodeId);
    const source: KnowledgePlanStepSource =
      branchIndex >= 0 ? "inferred-branch" : "curated-prerequisite";
    const relationLabel = branchIndex >= 0 ? branch[branchIndex]?.relationFromPrevious : undefined;
    return {
      ...step,
      minutes: allocations[index]!,
      activity: learningActivityFor(step, selection.minutes),
      reason:
        source === "inferred-branch"
          ? `${relationLabel ?? "图谱相关关系"}。这是探索旁支，不是人工验证的前置关系。`
          : index === 0
            ? `从L${effectiveStartLevel}的人工策展步骤开始。${step.transition}`
            : step.transition,
      source,
      relationLabel,
    };
  });

  return {
    id: `target:${target.id}:L${effectiveStartLevel}:${selection.minutes}`,
    title: `通向“${target.label}”`,
    question: `怎样从经过策展的知识骨架走到“${target.label}”？`,
    requestedStartLevel: selection.startLevel,
    effectiveStartLevel,
    totalMinutes: selection.minutes,
    assumedMasteredCount: effectiveStartLevel - 1,
    domainCount: new Set(steps.map((step) => step.domainId)).size,
    anchorLabel: target.anchorLabel,
    anchorPathTitle: target.anchorPathTitle,
    branchDistance: target.distance,
    confidence: target.confidence,
    steps,
  };
}

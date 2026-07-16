import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { CURATED_LEARNING_PATHS } from "@/subjects/knowledge-graph/data/curated-learning-paths";
import {
  COVERAGE_DOMAIN_META,
  COVERAGE_EVIDENCE_META,
} from "@/lib/knowledge-continuum-coverage-meta";
import type {
  LearningGoal,
  LearningGoalKind,
  LearningPlanCatalog,
} from "@/lib/knowledge-learning-plan";

const MAIN_THREAD_IDS = new Set([
  "universe-matter",
  "earth-life-body",
  "patterns-computation",
  "mind-meaning",
  "people-institutions",
  "shared-future",
]);

function kindFor(pathId: string, scope?: "cross-domain" | "domain-spine"): LearningGoalKind {
  if (MAIN_THREAD_IDS.has(pathId)) return "main-thread";
  return scope === "domain-spine" ? "domain-spine" : "cross-domain";
}

export function buildLearningPlanCatalog(): LearningPlanCatalog {
  const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
  const goals: LearningGoal[] = CURATED_LEARNING_PATHS.map((path) => ({
    id: path.id,
    kind: kindFor(path.id, path.scope),
    title: path.title,
    question: path.question,
    steps: path.steps.map((step) => {
      const node = nodeMap.get(step.nodeId);
      if (!node) throw new Error(`Learning plan node is missing: ${path.id}/${step.nodeId}`);
      const domain = COVERAGE_DOMAIN_META[node.domain];
      const evidence = COVERAGE_EVIDENCE_META[step.evidenceMode];
      const params = new URLSearchParams({
        path: path.id,
        focus: node.id,
        source: "learning-plan",
      });
      return {
        nodeId: node.id,
        label: node.label,
        level: step.level,
        domainId: node.domain,
        domainLabel: domain.label,
        domainColor: domain.color,
        evidenceMode: step.evidenceMode,
        evidenceLabel: evidence.label,
        evidenceColor: evidence.color,
        transition: step.transition,
        articleHref: node.url,
        graphHref: `/knowledge-graph?${params.toString()}`,
      };
    }),
  }));
  return { goals };
}

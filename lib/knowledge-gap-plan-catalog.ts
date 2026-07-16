import { buildKnowledgeGapPlan } from "./knowledge-gap-plan";
import type { LearningPlanMinutes } from "./knowledge-learning-plan";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { REVIEWED_LEARNING_RELATIONS } from "@/subjects/knowledge-graph/data/frontier-prerequisite-relations";

export function buildCatalogKnowledgeGapPlan(
  targetId: string,
  knownIds: readonly string[],
  minutes: LearningPlanMinutes
) {
  return buildKnowledgeGapPlan(ALL_NODES, REVIEWED_LEARNING_RELATIONS, targetId, knownIds, minutes);
}

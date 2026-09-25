import { buildKnowledgeGapPlan } from "./knowledge-gap-plan";
import type { LearningPlanMinutes } from "./knowledge-learning-plan";
import { COGNITIVE_NODES as ALL_NODES } from "@/lib/cognitive-nodes";
import { REVIEWED_LEARNING_RELATIONS } from "@/subjects/knowledge-graph/data/frontier-prerequisite-relations";

export function buildCatalogKnowledgeGapPlan(
  targetId: string,
  knownIds: readonly string[],
  minutes: LearningPlanMinutes
) {
  return buildKnowledgeGapPlan(ALL_NODES, REVIEWED_LEARNING_RELATIONS, targetId, knownIds, minutes);
}

import type { LearningPlanCatalog } from "@/lib/knowledge-learning-plan";
import {
  type KnowledgeConfluence,
  type KnowledgeConfluenceEvidenceRecord,
  type KnowledgeConfluenceReviewStatus,
  type KnowledgeConfluenceRole,
  type KnowledgeConfluenceSummaryCatalog,
} from "@/lib/knowledge-confluence";
import {
  CURATED_KNOWLEDGE_CONFLUENCES,
  getCuratedConfluenceNodeIds,
  getCuratedKnowledgeConfluence,
} from "@/subjects/knowledge-graph/data/curated-confluences";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CURATED_CONFLUENCE_EVIDENCE,
  CURATED_CONFLUENCE_EVIDENCE_SOURCES,
} from "@/subjects/knowledge-graph/data/curated-confluence-evidence";

function aggregateReviewStatus(
  statuses: readonly KnowledgeConfluenceReviewStatus[]
): KnowledgeConfluenceReviewStatus {
  if (statuses.includes("needs-review")) return "needs-review";
  return statuses.includes("monitor") ? "monitor" : "reviewed";
}

export function buildKnowledgeConfluenceSummaryCatalog(): KnowledgeConfluenceSummaryCatalog {
  const nodes = new Map(ALL_NODES.map((node) => [node.id, node]));
  return {
    confluences: CURATED_KNOWLEDGE_CONFLUENCES.map((definition) => {
      const nodeIds = getCuratedConfluenceNodeIds(definition);
      const targetNode = nodes.get(nodeIds.at(-1)!);
      if (!targetNode) throw new Error(`Confluence target node is missing: ${definition.id}`);
      const evidence = CURATED_CONFLUENCE_EVIDENCE[definition.id];
      if (!evidence) throw new Error(`Confluence evidence is missing: ${definition.id}`);
      const sourceIds = new Set(evidence.flatMap((record) => record.sourceIds));
      const roleCounts: Record<KnowledgeConfluenceRole, number> = {
        required: 0,
        complementary: 0,
        contested: 0,
      };
      for (const strand of definition.strands) roleCounts[strand.role] += 1;
      const domains = new Set(
        nodeIds.map((nodeId) => nodes.get(nodeId)?.domain).filter((domain) => domain !== undefined)
      );
      return {
        id: definition.id,
        title: definition.title,
        question: definition.question,
        summary: definition.summary,
        strandCount: definition.strands.length,
        domainCount: domains.size,
        nodeCount: nodeIds.length,
        targetLabel: targetNode.label,
        roleCounts,
        evidenceSourceCount: sourceIds.size,
        reviewedAt: evidence
          .map((record) => record.reviewedAt)
          .sort()
          .at(-1)!,
        reviewStatus: aggregateReviewStatus(evidence.map((record) => record.reviewStatus)),
        href: `/knowledge-confluence/${encodeURIComponent(definition.id)}`,
      };
    }),
  };
}

export function buildKnowledgeConfluence(
  confluenceId: string,
  learningCatalog: LearningPlanCatalog
): KnowledgeConfluence | undefined {
  const goals = new Map(learningCatalog.goals.map((goal) => [goal.id, goal]));
  const definition = getCuratedKnowledgeConfluence(confluenceId);
  if (!definition) return undefined;
  const evidenceDefinitions = CURATED_CONFLUENCE_EVIDENCE[definition.id];
  if (!evidenceDefinitions) throw new Error(`Confluence evidence is missing: ${definition.id}`);
  const evidenceByStrand = new Map(evidenceDefinitions.map((record) => [record.strandId, record]));
  const targetGoal = goals.get(definition.targetPathId);
  if (!targetGoal) throw new Error(`Confluence target path is missing: ${definition.targetPathId}`);
  const target = targetGoal.steps.at(-1);
  if (!target || target.level !== 5) {
    throw new Error(`Confluence target must be L5: ${definition.id}/${definition.targetPathId}`);
  }

  const strands = definition.strands.map((strand) => {
    const goal = goals.get(strand.pathId);
    if (!goal)
      throw new Error(`Confluence strand path is missing: ${definition.id}/${strand.pathId}`);
    const steps = goal.steps.filter((step) => step.level <= 4);
    if (steps.length !== 4) {
      throw new Error(`Confluence strand must provide L1-L4: ${definition.id}/${strand.pathId}`);
    }
    const evidenceDefinition = evidenceByStrand.get(strand.id);
    if (!evidenceDefinition) {
      throw new Error(`Confluence strand evidence is missing: ${definition.id}/${strand.id}`);
    }
    const sourceNode = steps.at(-1)!;
    const evidence: KnowledgeConfluenceEvidenceRecord = {
      ...evidenceDefinition,
      sourcePathId: goal.id,
      sourcePathTitle: goal.title,
      sourceNode: {
        nodeId: sourceNode.nodeId,
        label: sourceNode.label,
        level: sourceNode.level,
        domainLabel: sourceNode.domainLabel,
        articleHref: sourceNode.articleHref,
        graphHref: sourceNode.graphHref,
      },
      sources: evidenceDefinition.sourceIds.map((sourceId) => {
        const source = CURATED_CONFLUENCE_EVIDENCE_SOURCES[sourceId];
        if (!source) throw new Error(`Confluence evidence source is missing: ${sourceId}`);
        return source;
      }),
    };
    return {
      ...strand,
      domainIds: [...new Set(steps.map((step) => step.domainId))],
      steps,
      evidence,
    };
  });
  const nodeIds = new Set([
    target.nodeId,
    ...strands.flatMap((strand) => strand.steps.map((step) => step.nodeId)),
  ]);
  const domainIds = new Set([target.domainId, ...strands.flatMap((strand) => strand.domainIds)]);

  return {
    ...definition,
    target,
    strands,
    nodeCount: nodeIds.size,
    domainCount: domainIds.size,
  };
}

export function buildKnowledgeConfluenceCatalog(learningCatalog: LearningPlanCatalog): {
  confluences: readonly KnowledgeConfluence[];
} {
  const confluences = CURATED_KNOWLEDGE_CONFLUENCES.map((definition) => {
    const confluence = buildKnowledgeConfluence(definition.id, learningCatalog);
    if (!confluence) throw new Error(`Confluence is missing: ${definition.id}`);
    return confluence;
  });
  return { confluences };
}

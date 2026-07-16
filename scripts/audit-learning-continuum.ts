import { ALL_KNOWLEDGE_CONTINUUM_NODES } from "../lib/knowledge-continuum.ts";
import { CONTINUUM_GRAPH_NODE_IDS } from "../lib/knowledge-continuum-graph.ts";
import { ALL_EDGES, ALL_NODES } from "../subjects/knowledge-graph/data/graph-data.ts";
import { CURATED_LEARNING_PATHS } from "../subjects/knowledge-graph/data/curated-learning-paths.ts";
import { buildKnowledgeCoverageSnapshot } from "../lib/knowledge-continuum-coverage.ts";
import { buildKnowledgeBridgeFlows } from "../lib/knowledge-bridge-flow.ts";
import { buildLearningPlanCatalog } from "../lib/knowledge-learning-plan-catalog.ts";
import {
  buildPersonalLearningPlan,
  LEARNING_PLAN_DURATIONS,
} from "../lib/knowledge-learning-plan.ts";
import { buildKnowledgeBranchCatalog } from "../lib/knowledge-branch-catalog.ts";
import { buildKnowledgeTargetPlan, selectKnowledgeTargetAnchor } from "../lib/knowledge-branch.ts";
import { buildKnowledgeTerrainSnapshot } from "../lib/knowledge-terrain.ts";
import { FULL_GRAPH_ATTACHMENT_EDGES } from "../subjects/knowledge-graph/data/full-graph-attachments.ts";
import {
  buildKnowledgeConfluenceCatalog,
  buildKnowledgeConfluenceSummaryCatalog,
} from "../lib/knowledge-confluence-catalog.ts";
import { buildKnowledgeConfluencePlan } from "../lib/knowledge-confluence-plan.ts";
import { buildKnowledgeFrontierSnapshot } from "../lib/knowledge-frontier.ts";
import { buildKnowledgeFrontierView } from "../lib/knowledge-frontier-catalog.ts";
import { buildCatalogKnowledgeRelationReview } from "../lib/knowledge-relation-review-catalog.ts";

const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
const edgePairs = new Set(
  ALL_EDGES.flatMap((edge) => [`${edge.source}|${edge.target}`, `${edge.target}|${edge.source}`])
);
const issues: string[] = [];
const coverage = buildKnowledgeCoverageSnapshot();
const bridgeFlows = buildKnowledgeBridgeFlows(coverage.bridgeTransitions);
const learningPlanCatalog = buildLearningPlanCatalog();
const branchCatalog = buildKnowledgeBranchCatalog();
const terrain = buildKnowledgeTerrainSnapshot(branchCatalog);
const confluenceCatalog = buildKnowledgeConfluenceCatalog(learningPlanCatalog);
const confluenceSummaryCatalog = buildKnowledgeConfluenceSummaryCatalog();
const relationReview = buildCatalogKnowledgeRelationReview([]);

for (const anchor of ALL_KNOWLEDGE_CONTINUUM_NODES) {
  const graphNodeId = CONTINUUM_GRAPH_NODE_IDS[anchor.id];
  const graphNode = graphNodeId ? nodeMap.get(graphNodeId) : undefined;
  if (!graphNode) {
    issues.push(`Homepage anchor has no graph node: ${anchor.id}`);
  } else if (graphNode.knowledgeLevel !== anchor.stage) {
    issues.push(
      `Stage mismatch: ${anchor.id} is L${anchor.stage}, ${graphNode.id} is L${graphNode.knowledgeLevel}`
    );
  }
}

const curatedNodeIds = CURATED_LEARNING_PATHS.flatMap((path) =>
  path.steps.map((step) => step.nodeId)
);
for (const path of CURATED_LEARNING_PATHS) {
  if (path.steps.map((step) => step.level).join(",") !== "1,2,3,4,5") {
    issues.push(`Incomplete level sequence: ${path.id}`);
  }
  path.steps.forEach((step, index) => {
    if (!nodeMap.has(step.nodeId)) issues.push(`Missing path node: ${path.id}/${step.nodeId}`);
    if (index > 0) {
      const previousId = path.steps[index - 1]!.nodeId;
      if (!edgePairs.has(`${previousId}|${step.nodeId}`)) {
        issues.push(`Missing prerequisite edge: ${previousId} -> ${step.nodeId}`);
      }
    }
  });
}

function countBy(values: readonly string[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort((left, right) => right[1] - left[1]);
}

const curatedNodes = curatedNodeIds.flatMap((id) => {
  const node = nodeMap.get(id);
  return node ? [node] : [];
});

if (coverage.summary.nodeCount !== new Set(curatedNodeIds).size) {
  issues.push(
    `Coverage snapshot has ${coverage.summary.nodeCount}/${new Set(curatedNodeIds).size} curated nodes`
  );
}
if (coverage.summary.pathCount !== CURATED_LEARNING_PATHS.length) {
  issues.push(
    `Coverage snapshot has ${coverage.summary.pathCount}/${CURATED_LEARNING_PATHS.length} paths`
  );
}
const coverageByLevel = [0, 1, 2, 3, 4].map((index) =>
  coverage.domains.reduce((total, row) => total + row.levels[index]!, 0)
);
if (coverageByLevel.some((count) => count !== coverage.summary.pathCount)) {
  issues.push(`Coverage levels are imbalanced: ${coverageByLevel.join("/")}`);
}
for (const row of coverage.domains.filter((candidate) => candidate.status === "established")) {
  if (row.levels.some((count) => count === 0)) {
    issues.push(`Established subject is missing a knowledge level: ${row.id}`);
  }
}
if (
  coverage.evidenceModes.reduce((total, row) => total + row.total, 0) !== coverage.summary.nodeCount
) {
  issues.push("Coverage evidence modes do not account for every curated node");
}
if (coverage.domains.filter((row) => row.status === "established").length !== 15) {
  issues.push("Coverage snapshot must keep all 15 subjects established");
}
const previewDomains = coverage.domains.filter((row) => row.status === "preview");
if (previewDomains.length !== 0) {
  issues.push("Coverage snapshot must not retain preview subjects after linguistics graduation");
}
if (coverage.bridgeTransitions.length !== coverage.summary.crossDomainTransitionCount) {
  issues.push("Coverage bridge transition count does not match its summary");
}
if (
  new Set(coverage.bridgeTransitions.map((transition) => transition.id)).size !==
  coverage.bridgeTransitions.length
) {
  issues.push("Coverage bridge transition IDs must be unique");
}
if (
  bridgeFlows.reduce((total, flow) => total + flow.count, 0) !== coverage.bridgeTransitions.length
) {
  issues.push("Directed bridge aggregation lost one or more transitions");
}
const curatedPathMap = new Map(CURATED_LEARNING_PATHS.map((path) => [path.id, path]));
for (const transition of coverage.bridgeTransitions) {
  const path = curatedPathMap.get(transition.pathId);
  const fromNode = nodeMap.get(transition.fromNodeId);
  const toNode = nodeMap.get(transition.toNodeId);
  if (!path) issues.push(`Bridge references a missing path: ${transition.id}`);
  if (!fromNode || !toNode) {
    issues.push(`Bridge references a missing node: ${transition.id}`);
    continue;
  }
  if (fromNode.domain !== transition.fromDomain || toNode.domain !== transition.toDomain) {
    issues.push(`Bridge domain does not match its nodes: ${transition.id}`);
  }
  if (transition.fromDomain === transition.toDomain) {
    issues.push(`Bridge does not cross a domain boundary: ${transition.id}`);
  }
  if (transition.level !== transition.fromLevel + 1) {
    issues.push(`Bridge does not connect adjacent stages: ${transition.id}`);
  }
  const fromIndex = path?.steps.findIndex((step) => step.nodeId === transition.fromNodeId) ?? -1;
  if (fromIndex < 0 || path?.steps[fromIndex + 1]?.nodeId !== transition.toNodeId) {
    issues.push(`Bridge nodes are not adjacent in their path: ${transition.id}`);
  }
}
if (learningPlanCatalog.goals.length !== CURATED_LEARNING_PATHS.length) {
  issues.push("Learning planner must expose every curated path as a target");
}
for (const goal of learningPlanCatalog.goals) {
  for (const startLevel of [1, 2, 3, 4, 5] as const) {
    for (const duration of LEARNING_PLAN_DURATIONS) {
      const plan = buildPersonalLearningPlan(learningPlanCatalog, {
        goalId: goal.id,
        startLevel,
        minutes: duration.minutes,
      });
      if (plan.steps.length !== 6 - startLevel) {
        issues.push(`Learning plan has the wrong step count: ${plan.id}`);
      }
      if (plan.steps.reduce((total, step) => total + step.minutes, 0) !== duration.minutes) {
        issues.push(`Learning plan exceeds its time budget: ${plan.id}`);
      }
      if (plan.steps.some((step, index) => step.level !== startLevel + index)) {
        issues.push(`Learning plan skips a required stage: ${plan.id}`);
      }
    }
  }
}
if (branchCatalog.targets.length !== ALL_NODES.length) {
  issues.push(
    `Full graph planner covers ${branchCatalog.targets.length}/${ALL_NODES.length} nodes`
  );
}
if (new Set(branchCatalog.targets.map((target) => target.id)).size !== ALL_NODES.length) {
  issues.push("Full graph planner target IDs must be unique");
}
if (
  Object.values(branchCatalog.summary.confidenceCounts).reduce(
    (total, count) => total + count,
    0
  ) !== ALL_NODES.length
) {
  issues.push("Full graph confidence counts do not account for every node");
}
if (terrain.domains.reduce((total, domain) => total + domain.total, 0) !== ALL_NODES.length) {
  issues.push("Knowledge terrain domain totals do not account for every node");
}
if (terrain.summary.levelCounts.reduce((total, count) => total + count, 0) !== ALL_NODES.length) {
  issues.push("Knowledge terrain level totals do not account for every node");
}
const terrainDiagnostics = terrain.domains.flatMap((domain) => domain.diagnostics);
if (terrainDiagnostics.length !== terrain.summary.diagnosticCount) {
  issues.push("Knowledge terrain diagnostic total is inconsistent");
}
if (
  new Set(terrainDiagnostics.map((diagnosis) => diagnosis.id)).size !== terrainDiagnostics.length
) {
  issues.push("Knowledge terrain diagnostic IDs must be unique");
}
for (const domain of terrain.domains) {
  const metrics = domain.metrics;
  if (metrics.curatedCount + metrics.inferredBranchCount !== domain.total) {
    issues.push(`Knowledge terrain backbone metrics are inconsistent: ${domain.id}`);
  }
  if (metrics.advancedCount !== domain.levels[3] + domain.levels[4]) {
    issues.push(`Knowledge terrain advanced-stage metrics are inconsistent: ${domain.id}`);
  }
  if (metrics.missingLevels.some((level) => domain.levels[level - 1] !== 0)) {
    issues.push(`Knowledge terrain missing-stage signal is inconsistent: ${domain.id}`);
  }
}
for (const target of branchCatalog.targets) {
  if (target.branchPath[0]?.nodeId !== target.anchorNodeId) {
    issues.push(`Branch does not start at its curated anchor: ${target.id}`);
  }
  if (target.branchPath.at(-1)?.nodeId !== target.id) {
    issues.push(`Branch does not end at its target: ${target.id}`);
  }
  if (target.branchPath.length !== target.distance + 1) {
    issues.push(`Branch distance does not match its path: ${target.id}`);
  }
  if (target.branchPath.slice(1).some((step) => !step.relationFromPrevious)) {
    issues.push(`Branch has an unexplained graph relation: ${target.id}`);
  }
  if (target.anchorCandidates.length !== Math.min(target.candidateCount, 3)) {
    issues.push(`Branch exposes the wrong number of anchor candidates: ${target.id}`);
  }
  if (target.anchorCandidates[0]?.anchorNodeId !== target.anchorNodeId) {
    issues.push(`Branch default anchor does not match its first candidate: ${target.id}`);
  }
  for (const candidate of target.anchorCandidates) {
    if (
      candidate.distance !== target.distance ||
      candidate.branchPath[0]?.nodeId !== candidate.anchorNodeId ||
      candidate.branchPath.at(-1)?.nodeId !== target.id
    ) {
      issues.push(`Alternative anchor is not an equal shortest route: ${target.id}`);
    }
    const alternative = selectKnowledgeTargetAnchor(target, candidate.anchorNodeId);
    const plan = buildKnowledgeTargetPlan(learningPlanCatalog, alternative, {
      startLevel: 1,
      minutes: 20,
    });
    if (plan.steps.reduce((total, step) => total + step.minutes, 0) !== 20) {
      issues.push(`Alternative branch plan exceeds its time budget: ${plan.id}`);
    }
  }
  for (const startLevel of [1, 2, 3, 4, 5] as const) {
    for (const duration of LEARNING_PLAN_DURATIONS) {
      const plan = buildKnowledgeTargetPlan(learningPlanCatalog, target, {
        startLevel,
        minutes: duration.minutes,
      });
      if (plan.steps.reduce((total, step) => total + step.minutes, 0) !== duration.minutes) {
        issues.push(`Branch plan exceeds its time budget: ${plan.id}`);
      }
      const firstBranchIndex = plan.steps.findIndex((step) => step.source === "inferred-branch");
      if (
        firstBranchIndex >= 0 &&
        plan.steps.slice(firstBranchIndex).some((step) => step.source !== "inferred-branch")
      ) {
        issues.push(`Branch plan returns to curated prerequisites: ${plan.id}`);
      }
    }
  }
}
for (const edge of FULL_GRAPH_ATTACHMENT_EDGES) {
  if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target)) {
    issues.push(`Editorial attachment has a missing endpoint: ${edge.source} -> ${edge.target}`);
  }
  if (!edge.label?.trim()) {
    issues.push(`Editorial attachment has no explanation: ${edge.source} -> ${edge.target}`);
  }
}

const summaryBytes = Buffer.byteLength(JSON.stringify(confluenceSummaryCatalog), "utf8");
const fullConfluenceBytes = Buffer.byteLength(JSON.stringify(confluenceCatalog), "utf8");
if (summaryBytes > 8_000) {
  issues.push(`Confluence summary catalog exceeds 8 kB: ${summaryBytes} bytes`);
}
if (summaryBytes >= fullConfluenceBytes * 0.25) {
  issues.push(
    `Confluence summary is not compact enough: ${summaryBytes}/${fullConfluenceBytes} bytes`
  );
}
if (confluenceCatalog.confluences.length !== confluenceSummaryCatalog.confluences.length) {
  issues.push("Confluence summary does not account for every curated research question");
}
for (const confluence of confluenceCatalog.confluences) {
  if (confluence.strands.length !== 4 || confluence.nodeCount !== 17) {
    issues.push(`Confluence has an invalid route structure: ${confluence.id}`);
  }
  if (
    confluence.strands.some(
      (strand) =>
        strand.steps.length !== 4 ||
        strand.evidence.sourceNode.level !== 4 ||
        strand.evidence.sources.length === 0
    )
  ) {
    issues.push(`Confluence has an incomplete evidence ledger: ${confluence.id}`);
  }
  for (const duration of LEARNING_PLAN_DURATIONS) {
    const plan = buildKnowledgeConfluencePlan(confluence, duration.minutes);
    const steps = [...plan.strands.flatMap((strand) => strand.steps), plan.synthesis];
    if (steps.reduce((total, step) => total + step.minutes, 0) !== duration.minutes) {
      issues.push(`Confluence plan exceeds its time budget: ${plan.id}`);
    }
  }
}

const emptyFrontier = buildKnowledgeFrontierSnapshot(ALL_NODES, []);
const emptyFrontierView = buildKnowledgeFrontierView([], { status: "ready", limit: 24 });
const completeFrontier = buildKnowledgeFrontierSnapshot(
  ALL_NODES,
  ALL_NODES.map((node) => node.id)
);
if (
  emptyFrontier.summary.masteredCount +
    emptyFrontier.summary.readyCount +
    emptyFrontier.summary.blockedCount !==
  ALL_NODES.length
) {
  issues.push("Knowledge frontier states do not account for every graph node");
}
if (
  ALL_NODES.some(
    (node) =>
      node.knowledgeLevel! > 1 &&
      (node.prerequisiteIds?.length ?? 0) === 0 &&
      emptyFrontier.states.get(node.id)?.status === "ready"
  )
) {
  issues.push("A higher-level node without prerequisite metadata is incorrectly ready");
}
if (
  emptyFrontierView.recommendations.length !== 15 ||
  new Set(emptyFrontierView.recommendations.map((result) => result.domainId)).size !== 15 ||
  emptyFrontierView.recommendations.some((result) => result.level !== 1)
) {
  issues.push("Knowledge frontier does not provide one diverse L1 start per subject");
}
if (
  completeFrontier.summary.masteredCount !== ALL_NODES.length ||
  completeFrontier.summary.readyCount !== 0 ||
  completeFrontier.summary.blockedCount !== 0
) {
  issues.push("A complete explicit profile does not master the entire graph exactly once");
}
if (
  emptyFrontierView.confluences.length !== confluenceCatalog.confluences.length ||
  emptyFrontierView.confluences.some(
    (confluence) => confluence.prerequisiteCount !== 16 || confluence.status !== "blocked"
  )
) {
  issues.push("L5 confluence readiness does not preserve all four L1–L4 strands");
}
if (
  relationReview.summary.targetCount !== 15 ||
  relationReview.summary.relationCount !== 30 ||
  relationReview.summary.netNewRequiredCount !== 15 ||
  relationReview.summary.cycleCount !== 0
) {
  issues.push("Multi-parent relation release has an invalid impact summary");
}
if (
  relationReview.targets.some(
    (target) =>
      target.baselineRequiredCount !== 1 ||
      target.currentRequiredCount !== 2 ||
      target.routeNodeDelta <= 0
  )
) {
  issues.push("A reviewed L5 target does not expose a real multi-parent route expansion");
}

console.log("Learning Continuum Audit\n");
console.log(`Homepage anchors: ${ALL_KNOWLEDGE_CONTINUUM_NODES.length}`);
console.log(`Mapped homepage anchors: ${Object.keys(CONTINUUM_GRAPH_NODE_IDS).length}`);
console.log(`Curated paths: ${CURATED_LEARNING_PATHS.length}`);
console.log(
  `Curated path nodes: ${curatedNodeIds.length} (${new Set(curatedNodeIds).size} unique)`
);
console.log(`Graph nodes: ${ALL_NODES.length}`);
console.log(`Graph edges: ${ALL_EDGES.length}\n`);
console.log(
  `Coverage snapshot: ${coverage.summary.nodeCount} nodes / ${coverage.summary.prerequisiteCount} prerequisites / ${coverage.summary.crossDomainTransitionCount} cross-domain transitions`
);
console.log(`Directed bridge flows: ${bridgeFlows.length}`);
console.log(`Learning planner targets: ${learningPlanCatalog.goals.length}`);
console.log(
  `Full graph targets: ${branchCatalog.summary.nodeCount} (${branchCatalog.summary.inferredBranchCount} inferred branches, max ${branchCatalog.summary.maximumDistance} hops)`
);
console.log(
  `Knowledge terrain: ${terrain.domains.length} domains × 5 levels; ${branchCatalog.summary.ambiguousTargetCount} targets have equal-distance anchors (max ${branchCatalog.summary.maximumCandidateCount})`
);
console.log(
  `Inventory diagnostics: ${terrain.summary.diagnosticCount} signals (${terrain.summary.highPriorityDiagnosticCount} high priority)`
);
console.log(
  `Knowledge confluences: ${confluenceCatalog.confluences.length} topics; summary ${summaryBytes} bytes / full ${fullConfluenceBytes} bytes`
);
console.log(
  `Reachable frontier: ${emptyFrontier.summary.readyCount} L1-ready / ${emptyFrontier.summary.blockedCount} blocked / ${emptyFrontier.summary.metadataGapCount} metadata gaps; ${emptyFrontierView.recommendations.length} diverse starts`
);
console.log(
  `Relation governance: ${relationReview.summary.targetCount} L3-L5 targets / ${relationReview.summary.relationCount} reviewed relations / ${relationReview.summary.netNewRequiredCount} new hard prerequisites / ${relationReview.summary.cycleCount} cycles`
);
console.log(
  `Subject status: ${coverage.summary.establishedDomainCount} established / ${coverage.summary.previewDomainCount} preview\n`
);

console.log("Curated nodes by domain:");
for (const [domain, count] of countBy(curatedNodes.map((node) => node.domain))) {
  console.log(`  ${domain}: ${count}`);
}

console.log("\nCurated nodes by level:");
for (const [level, count] of countBy(curatedNodes.map((node) => `L${node.knowledgeLevel}`))) {
  console.log(`  ${level}: ${count}`);
}

console.log("\nCurated nodes by evidence mode:");
for (const [mode, count] of countBy(curatedNodes.map((node) => node.evidenceMode ?? "missing"))) {
  console.log(`  ${mode}: ${count}`);
}

if (issues.length > 0) {
  console.error(`\nAudit failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exitCode = 1;
} else {
  console.log("\nAudit passed: all paths, prerequisites, stages and homepage mappings are valid.");
}

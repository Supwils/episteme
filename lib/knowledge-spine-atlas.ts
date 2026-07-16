import type {
  CoverageBridge,
  CoverageDomainId,
  CoverageEvidenceMode,
  KnowledgeCoverageSnapshot,
} from "@/lib/knowledge-continuum-coverage-meta";
import {
  COVERAGE_DOMAIN_META,
  COVERAGE_EVIDENCE_META,
} from "@/lib/knowledge-continuum-coverage-meta";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type { LearningGoalStep, LearningPlanCatalog } from "@/lib/knowledge-learning-plan";

export const PRIMARY_DOMAIN_SPINE_PATH_IDS: Record<CoverageDomainId, string> = {
  physics: "physics-unification-spine",
  cosmology: "cosmology-compact-spacetime-spine",
  chemistry: "chemistry-green-hydrogen-spine",
  "earth-science": "earth-science-earthquake-spine",
  "life-science": "life-science-evidence-spine",
  medicine: "medicine-public-health-spine",
  mathematics: "mathematics-prime-frontier-spine",
  "computer-science": "computer-science-learning-systems-spine",
  psychology: "psychology-reliable-evidence-spine",
  philosophy: "philosophy-consciousness-spine",
  history: "history-global-evidence-spine",
  sociology: "sociology-algorithmic-work-spine",
  economics: "economics-macro-diagnostics-spine",
  "political-science": "political-science-fiscal-governance-spine",
  linguistics: "linguistics-multilingual-ai-spine",
};

export interface KnowledgeSpineAtlasRow {
  domainId: CoverageDomainId;
  domainLabel: string;
  domainShortLabel: string;
  domainColor: string;
  domainHref: string;
  pathId: string;
  title: string;
  question: string;
  steps: readonly LearningGoalStep[];
  bridges: readonly CoverageBridge[];
  bridgeTransitions: readonly KnowledgeSpineBridgeTransition[];
}

export type KnowledgeSpineBridgeDirection = "outgoing" | "incoming";

export interface KnowledgeSpineBridgeTransition {
  id: string;
  transitionId: string;
  direction: KnowledgeSpineBridgeDirection;
  pathId: string;
  pathTitle: string;
  fromDomainId: CoverageDomainId;
  fromDomainLabel: string;
  fromDomainShortLabel: string;
  fromDomainColor: string;
  toDomainId: CoverageDomainId;
  toDomainLabel: string;
  toDomainShortLabel: string;
  toDomainColor: string;
  counterpartDomainId: CoverageDomainId;
  counterpartDomainLabel: string;
  counterpartDomainShortLabel: string;
  counterpartDomainColor: string;
  fromNodeId: string;
  fromNodeLabel: string;
  fromArticleHref?: string;
  toNodeId: string;
  toNodeLabel: string;
  toArticleHref?: string;
  fromLevel: KnowledgeLevel;
  toLevel: KnowledgeLevel;
  selectedDomainLevel: KnowledgeLevel;
  counterpartLevel: KnowledgeLevel;
  evidenceMode: CoverageEvidenceMode;
  evidenceLabel: string;
  evidenceColor: string;
  transition: string;
  graphHref: string;
}

export interface KnowledgeSpineAtlas {
  summary: {
    domainCount: number;
    stageCount: number;
    nodeCount: number;
    crossDomainTransitionCount: number;
  };
  rows: readonly KnowledgeSpineAtlasRow[];
}

export function rankKnowledgeSpineBridges(
  transitions: readonly KnowledgeSpineBridgeTransition[],
  selectedLevel: KnowledgeLevel
): KnowledgeSpineBridgeTransition[] {
  return [...transitions].sort(
    (left, right) =>
      Math.abs(left.selectedDomainLevel - selectedLevel) -
        Math.abs(right.selectedDomainLevel - selectedLevel) ||
      left.selectedDomainLevel - right.selectedDomainLevel ||
      (left.direction === right.direction ? 0 : left.direction === "outgoing" ? -1 : 1) ||
      left.counterpartDomainLabel.localeCompare(right.counterpartDomainLabel, "zh-CN") ||
      left.pathTitle.localeCompare(right.pathTitle, "zh-CN")
  );
}

export function buildKnowledgeSpineAtlas(
  catalog: LearningPlanCatalog,
  coverage: KnowledgeCoverageSnapshot
): KnowledgeSpineAtlas {
  const goals = new Map(catalog.goals.map((goal) => [goal.id, goal]));
  const nodeArticleHrefs = new Map<string, string>();
  for (const goal of catalog.goals) {
    for (const step of goal.steps) {
      if (step.articleHref && !nodeArticleHrefs.has(step.nodeId)) {
        nodeArticleHrefs.set(step.nodeId, step.articleHref);
      }
    }
  }
  const rows = coverage.domains.map((domain): KnowledgeSpineAtlasRow => {
    const pathId = PRIMARY_DOMAIN_SPINE_PATH_IDS[domain.id];
    const goal = goals.get(pathId);
    if (!goal) throw new Error(`Primary domain spine is missing: ${domain.id}/${pathId}`);
    if (goal.kind !== "domain-spine") {
      throw new Error(`Primary domain spine has the wrong kind: ${domain.id}/${pathId}`);
    }
    if (
      goal.steps.length !== 5 ||
      goal.steps.some((step, index) => step.domainId !== domain.id || step.level !== index + 1)
    ) {
      throw new Error(`Primary domain spine is not a complete same-domain L1-L5 path: ${pathId}`);
    }

    const bridgeTransitions = coverage.bridgeTransitions
      .filter(
        (transition) => transition.fromDomain === domain.id || transition.toDomain === domain.id
      )
      .map((transition): KnowledgeSpineBridgeTransition => {
        const direction: KnowledgeSpineBridgeDirection =
          transition.fromDomain === domain.id ? "outgoing" : "incoming";
        const fromDomain = COVERAGE_DOMAIN_META[transition.fromDomain];
        const toDomain = COVERAGE_DOMAIN_META[transition.toDomain];
        const counterpart =
          direction === "outgoing" ? COVERAGE_DOMAIN_META[transition.toDomain] : fromDomain;
        const counterpartDomainId =
          direction === "outgoing" ? transition.toDomain : transition.fromDomain;
        const params = new URLSearchParams({
          path: transition.pathId,
          focus: transition.toNodeId,
          source: "spine-bridge",
        });

        return {
          id: `${domain.id}:${transition.id}`,
          transitionId: transition.id,
          direction,
          pathId: transition.pathId,
          pathTitle: transition.pathTitle,
          fromDomainId: transition.fromDomain,
          fromDomainLabel: fromDomain.label,
          fromDomainShortLabel: fromDomain.shortLabel,
          fromDomainColor: fromDomain.color,
          toDomainId: transition.toDomain,
          toDomainLabel: toDomain.label,
          toDomainShortLabel: toDomain.shortLabel,
          toDomainColor: toDomain.color,
          counterpartDomainId,
          counterpartDomainLabel: counterpart.label,
          counterpartDomainShortLabel: counterpart.shortLabel,
          counterpartDomainColor: counterpart.color,
          fromNodeId: transition.fromNodeId,
          fromNodeLabel: transition.fromNodeLabel,
          fromArticleHref: nodeArticleHrefs.get(transition.fromNodeId),
          toNodeId: transition.toNodeId,
          toNodeLabel: transition.toNodeLabel,
          toArticleHref: nodeArticleHrefs.get(transition.toNodeId),
          fromLevel: transition.fromLevel,
          toLevel: transition.level,
          selectedDomainLevel: direction === "outgoing" ? transition.fromLevel : transition.level,
          counterpartLevel: direction === "outgoing" ? transition.level : transition.fromLevel,
          evidenceMode: transition.evidenceMode,
          evidenceLabel: COVERAGE_EVIDENCE_META[transition.evidenceMode].label,
          evidenceColor: COVERAGE_EVIDENCE_META[transition.evidenceMode].color,
          transition: transition.transition,
          graphHref: `/knowledge-graph?${params.toString()}`,
        };
      })
      .sort(
        (left, right) =>
          left.selectedDomainLevel - right.selectedDomainLevel ||
          left.counterpartDomainLabel.localeCompare(right.counterpartDomainLabel, "zh-CN") ||
          left.pathTitle.localeCompare(right.pathTitle, "zh-CN")
      );

    return {
      domainId: domain.id,
      domainLabel: domain.label,
      domainShortLabel: domain.shortLabel,
      domainColor: domain.color,
      domainHref: domain.href,
      pathId,
      title: goal.title,
      question: goal.question,
      steps: goal.steps,
      bridges: [...domain.bridges].sort(
        (left, right) => right.count - left.count || left.label.localeCompare(right.label, "zh-CN")
      ),
      bridgeTransitions,
    };
  });

  return {
    summary: {
      domainCount: rows.length,
      stageCount: 5,
      nodeCount: rows.reduce((total, row) => total + row.steps.length, 0),
      crossDomainTransitionCount: coverage.summary.crossDomainTransitionCount,
    },
    rows,
  };
}

import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type {
  CoverageBridgeTransition,
  CoverageDomainId,
  CoverageEvidenceMode,
} from "@/lib/knowledge-continuum-coverage";

export interface KnowledgeBridgeFlow {
  id: string;
  fromDomain: CoverageDomainId;
  toDomain: CoverageDomainId;
  count: number;
  levels: readonly [number, number, number, number, number];
  evidence: readonly { id: CoverageEvidenceMode; count: number }[];
  transitions: readonly CoverageBridgeTransition[];
}

export interface KnowledgeBridgeFilter {
  level: KnowledgeLevel | null;
  evidenceMode: CoverageEvidenceMode | null;
}

export function filterBridgeTransitions(
  transitions: readonly CoverageBridgeTransition[],
  filter: KnowledgeBridgeFilter
): CoverageBridgeTransition[] {
  return transitions.filter(
    (transition) =>
      (!filter.level || transition.level === filter.level) &&
      (!filter.evidenceMode || transition.evidenceMode === filter.evidenceMode)
  );
}

export function buildKnowledgeBridgeFlows(
  transitions: readonly CoverageBridgeTransition[],
  filter: KnowledgeBridgeFilter = { level: null, evidenceMode: null }
): KnowledgeBridgeFlow[] {
  const filtered = filterBridgeTransitions(transitions, filter);
  const grouped = new Map<string, CoverageBridgeTransition[]>();
  for (const transition of filtered) {
    const id = `${transition.fromDomain}->${transition.toDomain}`;
    const existing = grouped.get(id) ?? [];
    existing.push(transition);
    grouped.set(id, existing);
  }

  return [...grouped.entries()]
    .map(([id, flowTransitions]) => {
      const first = flowTransitions[0]!;
      const levels: [number, number, number, number, number] = [0, 0, 0, 0, 0];
      const evidenceCounts = new Map<CoverageEvidenceMode, number>();
      for (const transition of flowTransitions) {
        const levelIndex = transition.level - 1;
        levels[levelIndex] = (levels[levelIndex] ?? 0) + 1;
        evidenceCounts.set(
          transition.evidenceMode,
          (evidenceCounts.get(transition.evidenceMode) ?? 0) + 1
        );
      }
      return {
        id,
        fromDomain: first.fromDomain,
        toDomain: first.toDomain,
        count: flowTransitions.length,
        levels,
        evidence: [...evidenceCounts.entries()]
          .map(([id, count]) => ({ id, count }))
          .sort((left, right) => right.count - left.count || left.id.localeCompare(right.id)),
        transitions: flowTransitions,
      } satisfies KnowledgeBridgeFlow;
    })
    .sort(
      (left, right) =>
        right.count - left.count ||
        left.fromDomain.localeCompare(right.fromDomain) ||
        left.toDomain.localeCompare(right.toDomain)
    );
}

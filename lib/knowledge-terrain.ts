import type { KnowledgeBranchCatalog, KnowledgeBranchConfidence } from "@/lib/knowledge-branch";
import {
  COVERAGE_DOMAIN_META,
  type CoverageDomainId,
  type CoverageLevelCounts,
} from "@/lib/knowledge-continuum-coverage-meta";
import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";

export type KnowledgeTerrainConfidenceCounts = Record<KnowledgeBranchConfidence, number>;

export interface KnowledgeTerrainCell {
  level: KnowledgeLevel;
  total: number;
  confidenceCounts: KnowledgeTerrainConfidenceCounts;
}

export type KnowledgeTerrainDiagnosisKind =
  | "missing-levels"
  | "stage-concentration"
  | "advanced-thin"
  | "thin-backbone"
  | "distant-branches";

export type KnowledgeTerrainDiagnosisSeverity = "high" | "medium";

export interface KnowledgeTerrainDiagnosis {
  id: string;
  kind: KnowledgeTerrainDiagnosisKind;
  severity: KnowledgeTerrainDiagnosisSeverity;
  title: string;
  description: string;
  recommendation: string;
  focusLevel?: KnowledgeLevel;
  focusConfidence?: KnowledgeBranchConfidence;
}

export interface KnowledgeTerrainDomainMetrics {
  curatedCount: number;
  inferredBranchCount: number;
  exploratoryCount: number;
  advancedCount: number;
  curatedShare: number;
  exploratoryShare: number;
  advancedShare: number;
  dominantLevel: KnowledgeLevel;
  dominantShare: number;
  missingLevels: readonly KnowledgeLevel[];
}

export interface KnowledgeTerrainDomain {
  id: CoverageDomainId;
  label: string;
  shortLabel: string;
  color: string;
  href: string;
  status: "established" | "preview";
  total: number;
  levels: CoverageLevelCounts;
  cells: readonly KnowledgeTerrainCell[];
  metrics: KnowledgeTerrainDomainMetrics;
  diagnostics: readonly KnowledgeTerrainDiagnosis[];
}

export interface KnowledgeTerrainSnapshot {
  summary: KnowledgeBranchCatalog["summary"] & {
    levelCounts: CoverageLevelCounts;
    diagnosticCount: number;
    highPriorityDiagnosticCount: number;
  };
  domains: readonly KnowledgeTerrainDomain[];
}

function emptyConfidenceCounts(): KnowledgeTerrainConfidenceCounts {
  return { curated: 0, direct: 0, contextual: 0, exploratory: 0 };
}

function share(count: number, total: number): number {
  return total > 0 ? count / total : 0;
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function buildDomainDiagnostics(
  domainId: CoverageDomainId,
  label: string,
  status: KnowledgeTerrainDomain["status"],
  metrics: KnowledgeTerrainDomainMetrics
): KnowledgeTerrainDiagnosis[] {
  const diagnostics: KnowledgeTerrainDiagnosis[] = [];
  if (metrics.missingLevels.length > 0) {
    const levels = metrics.missingLevels.map((level) => `L${level}`).join("、");
    diagnostics.push({
      id: `${domainId}:missing-levels:${metrics.missingLevels.join("-")}`,
      kind: "missing-levels",
      severity: status === "established" ? "high" : "medium",
      title: `缺少 ${levels} 索引`,
      description: `${label}当前图谱索引在${levels}没有节点；这表示平台库存尚未覆盖，不表示学科本身缺少这些层次。`,
      recommendation: "先补代表性概念、方法与前沿锚点，再建立相邻阶段的人工前置关系。",
      focusLevel: metrics.missingLevels[0],
    });
  }
  if (metrics.dominantShare >= 0.6) {
    diagnostics.push({
      id: `${domainId}:stage-concentration:L${metrics.dominantLevel}`,
      kind: "stage-concentration",
      severity: metrics.dominantShare >= 0.8 ? "high" : "medium",
      title: `节点集中在 L${metrics.dominantLevel}`,
      description: `${label}有${formatPercent(metrics.dominantShare)}的节点位于L${metrics.dominantLevel}；原始密度主要反映当前库存结构，不能解读为学科重要性。`,
      recommendation: "复核高密阶段的重复粒度，并从现有内容中提炼能通向相邻阶段的桥接节点。",
      focusLevel: metrics.dominantLevel,
    });
  }
  if (metrics.advancedShare < 0.08 && metrics.curatedCount + metrics.inferredBranchCount >= 20) {
    diagnostics.push({
      id: `${domainId}:advanced-thin:L4-L5`,
      kind: "advanced-thin",
      severity: metrics.advancedShare < 0.03 ? "high" : "medium",
      title: "L4–L5 索引偏薄",
      description: `${label}的L4–L5节点合计占${formatPercent(metrics.advancedShare)}；当前平台从方法建模走向综合前沿的可见台阶较少。`,
      recommendation: "优先补研究方法、模型边界、证据争议与开放问题，并连接到已有基础概念。",
      focusLevel: 4,
    });
  }
  if (metrics.curatedShare < 0.12) {
    diagnostics.push({
      id: `${domainId}:thin-backbone:curated`,
      kind: "thin-backbone",
      severity: metrics.curatedShare < 0.06 ? "high" : "medium",
      title: "人工骨架占比较低",
      description: `${label}仅有${formatPercent(metrics.curatedShare)}的节点直接位于人工五级主干；其余节点虽可达，但更多依赖相关关系接入。`,
      recommendation: "从高频旁支中选择少量代表节点，人工核验它们的前置顺序与阶段定位。",
      focusConfidence: "curated",
    });
  }
  if (metrics.exploratoryShare >= 0.15) {
    diagnostics.push({
      id: `${domainId}:distant-branches:exploratory`,
      kind: "distant-branches",
      severity: metrics.exploratoryShare >= 0.25 ? "high" : "medium",
      title: "远距旁支较多",
      description: `${label}有${formatPercent(metrics.exploratoryShare)}的节点需要三跳或更多关系才能接入人工骨架。`,
      recommendation: "逐项复核远距节点，补充语义明确的一跳桥或将其保留为低置信探索线索。",
      focusConfidence: "exploratory",
    });
  }
  return diagnostics.sort(
    (left, right) => Number(right.severity === "high") - Number(left.severity === "high")
  );
}

export function buildKnowledgeTerrainSnapshot(
  catalog: KnowledgeBranchCatalog
): KnowledgeTerrainSnapshot {
  const cells = new Map<string, KnowledgeTerrainCell>();
  const levelCounts = [0, 0, 0, 0, 0];

  for (const target of catalog.targets) {
    const key = `${target.domainId}:${target.level}`;
    const cell = cells.get(key) ?? {
      level: target.level,
      total: 0,
      confidenceCounts: emptyConfidenceCounts(),
    };
    cell.total += 1;
    cell.confidenceCounts[target.confidence] += 1;
    cells.set(key, cell);
    levelCounts[target.level - 1]! += 1;
  }

  const domains = (Object.keys(COVERAGE_DOMAIN_META) as CoverageDomainId[]).map((id) => {
    const meta = COVERAGE_DOMAIN_META[id];
    const domainCells = KNOWLEDGE_LEVELS.map(
      ({ id: level }) =>
        cells.get(`${id}:${level}`) ?? {
          level,
          total: 0,
          confidenceCounts: emptyConfidenceCounts(),
        }
    );
    const levels = domainCells.map((cell) => cell.total) as unknown as CoverageLevelCounts;
    const total = domainCells.reduce((sum, cell) => sum + cell.total, 0);
    const curatedCount = domainCells.reduce((sum, cell) => sum + cell.confidenceCounts.curated, 0);
    const exploratoryCount = domainCells.reduce(
      (sum, cell) => sum + cell.confidenceCounts.exploratory,
      0
    );
    const advancedCount = domainCells
      .filter((cell) => cell.level >= 4)
      .reduce((sum, cell) => sum + cell.total, 0);
    const dominantCell = domainCells.reduce((largest, cell) =>
      cell.total > largest.total ? cell : largest
    );
    const metrics: KnowledgeTerrainDomainMetrics = {
      curatedCount,
      inferredBranchCount: total - curatedCount,
      exploratoryCount,
      advancedCount,
      curatedShare: share(curatedCount, total),
      exploratoryShare: share(exploratoryCount, total),
      advancedShare: share(advancedCount, total),
      dominantLevel: dominantCell.level,
      dominantShare: share(dominantCell.total, total),
      missingLevels: domainCells.filter((cell) => cell.total === 0).map((cell) => cell.level),
    };
    return {
      id,
      label: meta.label,
      shortLabel: meta.shortLabel,
      color: meta.color,
      href: meta.href,
      status: meta.status,
      total,
      levels,
      cells: domainCells,
      metrics,
      diagnostics: buildDomainDiagnostics(id, meta.label, meta.status, metrics),
    };
  });

  const diagnostics = domains.flatMap((domain) => domain.diagnostics);

  return {
    summary: {
      ...catalog.summary,
      levelCounts: levelCounts as unknown as CoverageLevelCounts,
      diagnosticCount: diagnostics.length,
      highPriorityDiagnosticCount: diagnostics.filter((diagnosis) => diagnosis.severity === "high")
        .length,
    },
    domains,
  };
}

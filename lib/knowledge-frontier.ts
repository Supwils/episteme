import type { GraphNode } from "@/lib/graph-engine";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

export type KnowledgeFrontierStatus = "mastered" | "ready" | "blocked";

export const KNOWLEDGE_FRONTIER_STATUS_META: Record<
  KnowledgeFrontierStatus,
  { label: string; shortLabel: string; description: string; color: string }
> = {
  mastered: {
    label: "已确认掌握",
    shortLabel: "已掌握",
    description: "由你主动确认；系统不会根据浏览记录或隐含能力分数自动判定。",
    color: "#55a897",
  },
  ready: {
    label: "现在可学习",
    shortLabel: "可学习",
    description: "节点没有前置要求，或所有明确前置都已由你确认掌握。",
    color: "#d6a85f",
  },
  blocked: {
    label: "仍被前置阻塞",
    shortLabel: "被阻塞",
    description: "至少一个明确前置尚未确认，或平台还没有建立可核验的前置锚点。",
    color: "#c17882",
  },
};

export interface KnowledgeFrontierNodeInput {
  id: string;
  label: string;
  domain: GraphNode["domain"];
  knowledgeLevel?: KnowledgeLevel;
  knowledgeLevelSource?: "curated" | "inferred";
  prerequisiteIds?: readonly string[];
}

export interface KnowledgeFrontierNodeState {
  id: string;
  status: KnowledgeFrontierStatus;
  level: KnowledgeLevel;
  source: "curated" | "inferred";
  prerequisiteIds: readonly string[];
  satisfiedPrerequisiteIds: readonly string[];
  missingPrerequisiteIds: readonly string[];
  gapIds: readonly string[];
  metadataGap: boolean;
  reason: string;
}

export interface KnowledgeFrontierSummary {
  nodeCount: number;
  validKnownCount: number;
  ignoredKnownCount: number;
  masteredCount: number;
  readyCount: number;
  blockedCount: number;
  metadataGapCount: number;
  domainCount: number;
  highestMasteredLevel: KnowledgeLevel | 0;
}

export interface KnowledgeFrontierSnapshot {
  states: ReadonlyMap<string, KnowledgeFrontierNodeState>;
  summary: KnowledgeFrontierSummary;
}

function nodeLevel(node: KnowledgeFrontierNodeInput): KnowledgeLevel {
  if (!node.knowledgeLevel) throw new Error(`Knowledge level is missing: ${node.id}`);
  return node.knowledgeLevel;
}

function collectUnmetPrerequisites(
  nodeId: string,
  nodeMap: ReadonlyMap<string, KnowledgeFrontierNodeInput>,
  knownIds: ReadonlySet<string>,
  output: Set<string>,
  visiting: Set<string>
): void {
  if (visiting.has(nodeId)) return;
  const node = nodeMap.get(nodeId);
  if (!node) return;
  visiting.add(nodeId);
  for (const prerequisiteId of node.prerequisiteIds ?? []) {
    if (knownIds.has(prerequisiteId)) continue;
    collectUnmetPrerequisites(prerequisiteId, nodeMap, knownIds, output, visiting);
    if (nodeMap.has(prerequisiteId)) output.add(prerequisiteId);
  }
  visiting.delete(nodeId);
}

export function buildKnowledgeFrontierSnapshot(
  nodes: readonly KnowledgeFrontierNodeInput[],
  requestedKnownIds: Iterable<string>
): KnowledgeFrontierSnapshot {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const requested = new Set(requestedKnownIds);
  const knownIds = new Set([...requested].filter((id) => nodeMap.has(id)));
  const states = new Map<string, KnowledgeFrontierNodeState>();
  let readyCount = 0;
  let blockedCount = 0;
  let metadataGapCount = 0;

  for (const node of nodes) {
    const level = nodeLevel(node);
    const source = node.knowledgeLevelSource ?? "inferred";
    const prerequisiteIds = (node.prerequisiteIds ?? []).filter((id) => nodeMap.has(id));
    const satisfiedPrerequisiteIds = prerequisiteIds.filter((id) => knownIds.has(id));
    const missingPrerequisiteIds = prerequisiteIds.filter((id) => !knownIds.has(id));
    const metadataGap = level > 1 && prerequisiteIds.length === 0;
    const gapIds = new Set<string>();
    collectUnmetPrerequisites(node.id, nodeMap, knownIds, gapIds, new Set());
    const sortedGapIds = [...gapIds].sort((left, right) => {
      const levelDifference = nodeLevel(nodeMap.get(left)!) - nodeLevel(nodeMap.get(right)!);
      return levelDifference || left.localeCompare(right);
    });

    let status: KnowledgeFrontierStatus;
    let reason: string;
    if (knownIds.has(node.id)) {
      status = "mastered";
      reason = "你已主动确认掌握；系统没有自动补记它的前置节点。";
    } else if (!metadataGap && missingPrerequisiteIds.length === 0) {
      status = "ready";
      readyCount += 1;
      reason =
        prerequisiteIds.length === 0
          ? "这是 L1 自然入口，不要求预先掌握平台中的其他节点。"
          : `${prerequisiteIds.length} 个${source === "curated" ? "人工策展" : "图谱推断"}前置均已确认。`;
    } else {
      status = "blocked";
      blockedCount += 1;
      if (metadataGap) metadataGapCount += 1;
      reason = metadataGap
        ? `这是 L${level} 节点，但平台尚未建立可核验的低阶前置；不会把“没有数据”解释为“无需前置”。`
        : `仍缺 ${sortedGapIds.length} 个前置节点，其中 ${missingPrerequisiteIds.length} 个是直接前置。`;
    }

    states.set(node.id, {
      id: node.id,
      status,
      level,
      source,
      prerequisiteIds,
      satisfiedPrerequisiteIds,
      missingPrerequisiteIds,
      gapIds: sortedGapIds,
      metadataGap,
      reason,
    });
  }

  const masteredNodes = nodes.filter((node) => knownIds.has(node.id));
  return {
    states,
    summary: {
      nodeCount: nodes.length,
      validKnownCount: knownIds.size,
      ignoredKnownCount: requested.size - knownIds.size,
      masteredCount: knownIds.size,
      readyCount,
      blockedCount,
      metadataGapCount,
      domainCount: new Set(masteredNodes.map((node) => node.domain)).size,
      highestMasteredLevel: masteredNodes.reduce<KnowledgeLevel | 0>(
        (highest, node) => Math.max(highest, nodeLevel(node)) as KnowledgeLevel | 0,
        0
      ),
    },
  };
}

import type { DomainClusterId } from "@/lib/domain-clusters";
import { DOMAIN_CLUSTERS } from "@/lib/domain-clusters";
import { DOMAIN_SEALS } from "@/lib/design/seals";
import { RING_ORDER } from "@/lib/knowledge-geometry";
import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";
import type { SummitNodeRecord } from "@/lib/summit-model";

export type SummitLevelGroup = {
  level: KnowledgeLevel;
  label: string;
  nodes: SummitNodeRecord[];
};

export type SummitDomainGroup = {
  id: string;
  name: string;
  seal: string;
  levels: SummitLevelGroup[];
};

export type SummitClusterGroup = {
  id: DomainClusterId;
  label: string;
  domains: SummitDomainGroup[];
};

/** 星盘环上的二十二个路由领域，给学科页的静态参数和站点地图用。 */
export function summitRouteDomains(): string[] {
  return DOMAIN_CLUSTERS.flatMap((cluster) => [...RING_ORDER[cluster.id]]);
}

/** 山体页的目录：只有簇和领域名，文章在各自的学科页上。 */
export function summitOverview(): SummitClusterGroup[] {
  return DOMAIN_CLUSTERS.map((cluster) => ({
    id: cluster.id,
    label: cluster.label,
    domains: RING_ORDER[cluster.id].map((id) => domainGroup(id, [])),
  }));
}

/** 簇 → 领域 → 层级。顺序跟星盘的环走，不跟图谱的历史上线顺序走。 */
export function summitCatalog(nodes: readonly SummitNodeRecord[]): SummitClusterGroup[] {
  const byDomain = new Map<string, SummitNodeRecord[]>();
  for (const node of nodes) {
    const list = byDomain.get(node.routeDomain);
    if (list) list.push(node);
    else byDomain.set(node.routeDomain, [node]);
  }
  return DOMAIN_CLUSTERS.map((cluster) => ({
    id: cluster.id,
    label: cluster.label,
    domains: RING_ORDER[cluster.id].map((id) => domainGroup(id, byDomain.get(id) ?? [])),
  }));
}

function domainGroup(id: string, nodes: readonly SummitNodeRecord[]): SummitDomainGroup {
  const seal = DOMAIN_SEALS[id as keyof typeof DOMAIN_SEALS];
  return {
    id,
    name: seal?.name ?? id,
    seal: seal?.char ?? "",
    levels: KNOWLEDGE_LEVELS.map((level) => ({
      level: level.id,
      label: level.label,
      nodes: nodes.filter((node) => node.level === level.id),
    })).filter((group) => group.nodes.length > 0),
  };
}

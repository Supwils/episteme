/**
 * 学科簇（T-INFO-01）：22 域的六簇分类法。
 * DOMAINS 条目自带 cluster 字段（lib/data.tsx 类型引入此处），这里是簇元数据
 * 与派生函数——页头图册（lib/atlas.ts）、门户网格、页脚全部从这里派生，不再各自手写清单。
 * 设计依据：docs/学科版图与导航架构.md
 * 注意：本模块不 import lib/data，调用方显式传入 DOMAINS，避免循环依赖。
 */

export const DOMAIN_CLUSTERS = [
  { id: "cosmos-nature", label: "宇宙与自然", en: "Cosmos & Nature" },
  { id: "life-mind", label: "生命与心灵", en: "Life & Mind" },
  { id: "society-institutions", label: "社会与制度", en: "Society & Institutions" },
  { id: "history-civilization", label: "历史与文明", en: "History & Civilization" },
  { id: "humanities-arts", label: "人文与艺术", en: "Humanities & Arts" },
  { id: "formal-technology", label: "数理与技术", en: "Formal & Technology" },
] as const;

export type DomainClusterId = (typeof DOMAIN_CLUSTERS)[number]["id"];

const CLUSTER_BY_ID = new Map(DOMAIN_CLUSTERS.map((c) => [c.id, c]));

export function getCluster(id: DomainClusterId) {
  return CLUSTER_BY_ID.get(id)!;
}

export type DomainLike = { id: string; cluster: string };

/** 按六簇分组的全量领域（保持簇内声明顺序），供门户网格/移动抽屉/页脚使用。 */
export function getClustersWithDomains<T extends DomainLike>(domains: readonly T[]) {
  return DOMAIN_CLUSTERS.map((cluster) => ({
    ...cluster,
    domains: domains.filter((d) => d.cluster === cluster.id),
  })).filter((group) => group.domains.length > 0);
}

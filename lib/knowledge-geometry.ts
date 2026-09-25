/**
 * 知识几何（T-DESIGN-01f）：全站唯一的知识空间模型。
 *
 *   角度 = 学科：六簇按 DOMAIN_CLUSTERS 顺序顺时针铺满一圈，簇间留缝，
 *            每个领域占一个等宽扇区；首页格致仪、领域首页、格致山都用这一套。
 *   半径 = 认知层级：L1 直觉启蒙在外圈，L5 综合前沿在圆心——学科在前沿处汇合。
 *            格致山把同一个层级读作高度：从上往下看，山就是这张星盘。
 *
 * 纯函数、无 DOM、无 React，可在服务端渲染 SVG 与 Web Worker 里直接用。
 * 角度用「度」，0° 在正上方、顺时针为正（与 SVG 的 y 轴向下一致）。
 */
import { DOMAIN_CLUSTERS, type DomainClusterId } from "@/lib/domain-clusters";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

/**
 * 环上的领域顺序。簇内顺序让跨簇的邻居也是真邻居（化学 → 生命科学、
 * 教育学 → 社会学、法学 → 人类历史、哲学 → 数学（逻辑）、工程 → 物理），
 * 整圈首尾相接。测试保证它与 lib/data.tsx 的 DOMAINS（id 与所属簇）一致。
 */
export const RING_ORDER: Record<DomainClusterId, readonly string[]> = {
  "cosmos-nature": ["universe-physics", "cosmology", "earth-science", "chemistry"],
  "life-mind": ["life-science", "medicine", "psychology", "linguistics", "education"],
  "society-institutions": ["sociology", "economics", "political-science", "law"],
  "history-civilization": ["human-history", "anthropology", "religion"],
  "humanities-arts": ["arts", "literature", "philosophy"],
  "formal-technology": ["mathematics", "computer-science", "engineering"],
};

/** 簇与簇之间留出的角度，让六簇在任何尺寸下都读得出分界。 */
export const CLUSTER_GAP_DEG = 4;

export type Wedge = {
  domain: string;
  cluster: DomainClusterId;
  /** 在整圈中的序号（0 起）。 */
  index: number;
  startDeg: number;
  endDeg: number;
  centerDeg: number;
};

export type ClusterArc = {
  cluster: DomainClusterId;
  startDeg: number;
  endDeg: number;
  centerDeg: number;
  domains: readonly string[];
};

const DOMAIN_COUNT = Object.values(RING_ORDER).reduce((sum, list) => sum + list.length, 0);
const WEDGE_DEG = (360 - CLUSTER_GAP_DEG * DOMAIN_CLUSTERS.length) / DOMAIN_COUNT;

function buildRing(): { wedges: Wedge[]; arcs: ClusterArc[] } {
  const wedges: Wedge[] = [];
  const arcs: ClusterArc[] = [];
  // Center the first cluster's gap on 0° so the ring starts cleanly at the top.
  let cursor = CLUSTER_GAP_DEG / 2;
  for (const { id: cluster } of DOMAIN_CLUSTERS) {
    const domains = RING_ORDER[cluster];
    const arcStart = cursor;
    for (const domain of domains) {
      wedges.push({
        domain,
        cluster,
        index: wedges.length,
        startDeg: cursor,
        endDeg: cursor + WEDGE_DEG,
        centerDeg: cursor + WEDGE_DEG / 2,
      });
      cursor += WEDGE_DEG;
    }
    arcs.push({
      cluster,
      startDeg: arcStart,
      endDeg: cursor,
      centerDeg: (arcStart + cursor) / 2,
      domains,
    });
    cursor += CLUSTER_GAP_DEG;
  }
  return { wedges, arcs };
}

const RING = buildRing();
const WEDGE_BY_DOMAIN = new Map(RING.wedges.map((wedge) => [wedge.domain, wedge]));

export const DOMAIN_WEDGES: readonly Wedge[] = RING.wedges;
export const CLUSTER_ARCS: readonly ClusterArc[] = RING.arcs;

/** 领域所属的簇（由环序反查，不必为此引入带 JSX 的 lib/data）。 */
export function domainCluster(domain: string): DomainClusterId | null {
  return WEDGE_BY_DOMAIN.get(domain)?.cluster ?? null;
}

export function domainWedge(domain: string): Wedge {
  const wedge = WEDGE_BY_DOMAIN.get(domain);
  if (!wedge) throw new Error(`knowledge-geometry: unknown domain "${domain}"`);
  return wedge;
}

/** 圆心处留给「汇流」的空白（归一化半径），L5 环落在它外侧。 */
export const CORE_RADIUS = 0.2;

/** 认知层级 → 归一化半径（0–1）。L1 在外缘 1，L5 靠近圆心。 */
export function levelRadius(level: KnowledgeLevel): number {
  return CORE_RADIUS + ((1 - CORE_RADIUS) * (6 - level)) / 5;
}

/** 层级带的内外边界（归一化），用来画同心环与放置节点。 */
export function levelBand(level: KnowledgeLevel): { inner: number; outer: number } {
  const step = (1 - CORE_RADIUS) / 5;
  const outer = levelRadius(level);
  return { inner: outer - step, outer };
}

/** 认知层级 → 归一化高度（0–1），格致山用：L1 山脚 0，L5 山顶 1。 */
export function levelHeight(level: KnowledgeLevel): number {
  return (level - 1) / 4;
}

/** 极坐标（0° 在上、顺时针）→ 平面坐标（y 向下，SVG 同向）。 */
export function polarToXY(angleDeg: number, radius: number): { x: number; y: number } {
  const radians = (angleDeg * Math.PI) / 180;
  return { x: radius * Math.sin(radians), y: -radius * Math.cos(radians) };
}

/**
 * 在某领域扇区、某层级带内放一个点。`along`（0–1）沿扇区角度方向，
 * `depth`（0–1）从层级带外缘到内缘；两者都应来自稳定种子，保证 SSR 与水合一致。
 * 扇区两侧各留 12% 的边，点不会压在簇缝或邻域上。
 */
export function placeInWedge(
  domain: string,
  level: KnowledgeLevel,
  along: number,
  depth: number
): { x: number; y: number; angleDeg: number; radius: number } {
  const wedge = domainWedge(domain);
  const margin = (wedge.endDeg - wedge.startDeg) * 0.12;
  const angleDeg = wedge.startDeg + margin + (wedge.endDeg - wedge.startDeg - 2 * margin) * along;
  const band = levelBand(level);
  const radius = band.outer - (band.outer - band.inner) * (0.15 + 0.7 * depth);
  return { ...polarToXY(angleDeg, radius), angleDeg, radius };
}

/** SVG 环形扇区路径（归一化坐标乘以 scale），用于高亮某领域或某层级的一段。 */
export function annularSectorPath(
  startDeg: number,
  endDeg: number,
  inner: number,
  outer: number,
  scale = 1
): string {
  const fmt = (value: number) => Number((value * scale).toFixed(2));
  const a = polarToXY(startDeg, outer);
  const b = polarToXY(endDeg, outer);
  const c = polarToXY(endDeg, inner);
  const d = polarToXY(startDeg, inner);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M${fmt(a.x)} ${fmt(a.y)}`,
    `A${fmt(outer)} ${fmt(outer)} 0 ${large} 1 ${fmt(b.x)} ${fmt(b.y)}`,
    `L${fmt(c.x)} ${fmt(c.y)}`,
    `A${fmt(inner)} ${fmt(inner)} 0 ${large} 0 ${fmt(d.x)} ${fmt(d.y)}`,
    "Z",
  ].join(" ");
}

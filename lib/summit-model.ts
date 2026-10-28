import { graphDomainId } from "@/lib/domain-spine";
import { CORE_RADIUS, DOMAIN_WEDGES, domainWedge, polarToXY } from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { isSafeInternalPath } from "@/lib/urls";
import {
  SUMMIT_BEACON_HEIGHT,
  placeSummitNode,
  prerequisiteSteps,
  quantizeSummit,
  routeDomainForGraph,
  SUMMIT_QUANTIZE,
} from "@/lib/summit-place";
import { SUMMIT_GRID, SUMMIT_SPAN, summitHeightField } from "@/lib/summit-terrain";
import type { SummitBeaconRecord, SummitLayoutFile } from "@/lib/summit-layout";
import { SUMMIT_LAYOUT_VERSION, SUMMIT_NODE_STRIDE } from "@/lib/summit-layout";
import { ALL_EDGES, ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CURATED_KNOWLEDGE_CONFLUENCES,
  getCuratedConfluenceNodeIds,
} from "@/subjects/knowledge-graph/data/curated-confluences";

const NEIGHBOR_CAP = 4;
const PREREQ_CAP = 6;
const DEK_MAX = 48;

export type SummitNodeRecord = {
  index: number;
  id: string;
  label: string;
  routeDomain: string;
  level: KnowledgeLevel;
  url: string | null;
  dek: string | null;
  x: number;
  y: number;
  z: number;
  radius: number;
  prereq: number[];
  neighbors: number[];
  degree: number;
};

export type SummitModel = {
  nodes: SummitNodeRecord[];
  beacons: Array<SummitBeaconRecord & { angleDeg: number }>;
  layout: SummitLayoutFile;
  /** 文章路径 → [路由领域, 节点序号]。同一路径只保留先出现的节点。 */
  urls: Record<string, [string, number]>;
};

const DOMAIN_INDEX = new Map(DOMAIN_WEDGES.map((wedge, index) => [wedge.domain, index]));
const ID_INDEX = new Map(ALL_NODES.map((node, index) => [node.id, index]));

let cached: SummitModel | null = null;

/** 图谱在一次进程里不变。二十二个学科页共用这一次放置。 */
export function buildSummitModel(): SummitModel {
  if (cached) return cached;
  cached = createSummitModel();
  return cached;
}

function createSummitModel(): SummitModel {
  const routeDomains = ALL_NODES.map((node) => routeDomainForGraph(node.domain));
  const parents = parentIndexes();
  const depth = new Map<number, number>();
  const placed = ALL_NODES.map((node, index) => {
    const level = asLevel(node.knowledgeLevel, node.id);
    const routeDomain = routeDomains[index] ?? node.domain;
    return placeSummitNode(routeDomain, level, node.id, prerequisiteSteps(index, parents, depth));
  });
  const neighbors = crossDomainNeighbors(routeDomains);
  const nodes = ALL_NODES.map((node, index) => {
    const point = placed[index];
    const routeDomain = routeDomains[index];
    if (!point || !routeDomain) throw new Error(`summit: missing placement for ${node.id}`);
    const level = asLevel(node.knowledgeLevel, node.id);
    const prereq = (parents[index] ?? []).slice(0, PREREQ_CAP);
    const links = neighbors[index] ?? [];
    return {
      index,
      id: node.id,
      label: node.label,
      routeDomain,
      level,
      url: articleUrl(node.url),
      dek: summitDek(node.description),
      x: point.x,
      y: point.y,
      z: point.z,
      radius: point.radius,
      prereq,
      neighbors: links,
      degree: Math.min(15, prereq.length + links.length),
    };
  });
  return {
    nodes,
    beacons: beaconRecords(),
    layout: layoutFile(nodes),
    urls: urlIndex(nodes),
  };
}

function parentIndexes(): number[][] {
  return ALL_NODES.map((node) =>
    (node.prerequisiteIds ?? []).flatMap((id) => {
      const found = ID_INDEX.get(id);
      return found === undefined ? [] : [found];
    })
  );
}

function crossDomainNeighbors(routeDomains: readonly string[]): number[][] {
  const lists = ALL_NODES.map(() => [] as number[]);
  for (const edge of ALL_EDGES) {
    const a = idIndex(edge.source);
    const b = idIndex(edge.target);
    if (a === undefined || b === undefined || a === b) continue;
    if (routeDomains[a] === routeDomains[b]) continue;
    pushCap(lists[a], b);
    pushCap(lists[b], a);
  }
  return lists;
}

function idIndex(id: string): number | undefined {
  return ID_INDEX.get(id);
}

function pushCap(list: number[] | undefined, value: number) {
  if (!list || list.length >= NEIGHBOR_CAP || list.includes(value)) return;
  list.push(value);
}

function asLevel(value: number | undefined, id: string): KnowledgeLevel {
  if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) return value;
  throw new Error(`summit: ${id} has no knowledge level`);
}

function articleUrl(url: string | undefined): string | null {
  if (!url) return null;
  const path = url.split("?")[0] ?? "";
  return isSafeInternalPath(path) ? path : null;
}

/** 目录里只收已经很短的提要。长说明留在文章页，避免把整座山的文档撑过预算。 */
export function summitDek(description: string | undefined): string | null {
  const text = (description ?? "").replace(/\s+/g, " ").trim();
  if (text.length < 4 || text.length > DEK_MAX) return null;
  return text;
}

/**
 * 与 astrolabeConfluences 同一套圆形平均。不从 astrolabe 引进来：
 * 那条链会带上 lib/data.tsx 的 JSX，生成脚本评不了。
 */
function beaconRecords(): Array<SummitBeaconRecord & { angleDeg: number }> {
  const routeByGraph = new Map(
    DOMAIN_WEDGES.map((wedge) => [graphDomainId(wedge.domain), wedge.domain])
  );
  return CURATED_KNOWLEDGE_CONFLUENCES.map((confluence) => {
    const domains = new Set(
      getCuratedConfluenceNodeIds(confluence).flatMap((nodeId) => {
        const route = routeByGraph.get(nodeId.split(":")[0] ?? "");
        return route ? [route] : [];
      })
    );
    let sx = 0;
    let sy = 0;
    for (const domain of domains) {
      const radians = (domainWedge(domain).centerDeg * Math.PI) / 180;
      sx += Math.sin(radians);
      sy += Math.cos(radians);
    }
    const angleDeg = ((Math.atan2(sx, sy) * 180) / Math.PI + 360) % 360;
    const flat = polarToXY(angleDeg, CORE_RADIUS * 0.55);
    return {
      id: confluence.id,
      title: confluence.title,
      angleDeg,
      x: flat.x,
      y: SUMMIT_BEACON_HEIGHT,
      z: flat.y,
    };
  });
}

function layoutFile(nodes: readonly SummitNodeRecord[]): SummitLayoutFile {
  const packed: number[] = [];
  for (const node of nodes) {
    const domainIndex = DOMAIN_INDEX.get(node.routeDomain);
    if (domainIndex === undefined)
      throw new Error(`summit: ${node.routeDomain} is not on the ring`);
    packed.push(
      quantizeSummit(node.x),
      quantizeSummit(node.y),
      quantizeSummit(node.z),
      node.level,
      domainIndex,
      node.degree
    );
  }
  if (packed.length !== nodes.length * SUMMIT_NODE_STRIDE) {
    throw new Error("summit: node stride drifted");
  }
  return {
    v: SUMMIT_LAYOUT_VERSION,
    scale: SUMMIT_QUANTIZE,
    grid: SUMMIT_GRID,
    span: SUMMIT_SPAN,
    height: summitHeightField().map((sample) => quantizeSummit(sample)),
    nodes: packed,
    beacons: beaconRecords().map(({ id, title, x, y, z }) => ({
      id,
      title,
      x: quantizeSummit(x),
      y: quantizeSummit(y),
      z: quantizeSummit(z),
    })),
  };
}

function urlIndex(nodes: readonly SummitNodeRecord[]): Record<string, [string, number]> {
  const entries: Array<[string, [string, number]]> = [];
  const seen = new Set<string>();
  for (const node of nodes) {
    if (!node.url || seen.has(node.url)) continue;
    seen.add(node.url);
    entries.push([node.url, [node.routeDomain, node.index]]);
  }
  entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
  return Object.fromEntries(entries);
}

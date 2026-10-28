/**
 * 格致山的放置。平面位置来自知识几何（与首页星盘同一套扇区和层级带），
 * 高度是这条带的台阶，不另做一套半径。
 *
 * 世界坐标（Three.js，Y 朝上）：x = r sin θ，z = −r cos θ，y = 高度。
 * θ = 0 在正北，也就是世界 −Z。俯视时 camera.up 取 (0, 0, −1)，正北在画面上方。
 */
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import {
  CORE_RADIUS,
  levelBand,
  levelHeight,
  placeInWedge,
  polarToXY,
} from "@/lib/knowledge-geometry";

const GRAPH_TO_ROUTE: Record<string, string> = {
  physics: "universe-physics",
  history: "human-history",
};

/** 图谱里的领域 id → 星盘环上的路由 id。 */
export function routeDomainForGraph(graphDomain: string): string {
  return GRAPH_TO_ROUTE[graphDomain] ?? graphDomain;
}

/** FNV-1a，结果在 [0, 1)。同一 id 每次得到同一个数。 */
export function stableUnit(id: string, salt: number): number {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash ^= salt;
  hash = Math.imul(hash, 16777619);
  return (hash >>> 0) / 4294967296;
}

const MAX_PREREQUISITE_STEPS = 8;

/**
 * 前置链有多深。环上的节点记 0，避免死循环；深度封顶，只用来在层级带内微移。
 */
export function prerequisiteSteps(
  index: number,
  parents: readonly (readonly number[])[],
  memo: Map<number, number> = new Map(),
  stack: Set<number> = new Set()
): number {
  const cached = memo.get(index);
  if (cached !== undefined) return cached;
  if (stack.has(index)) return 0;
  stack.add(index);
  let best = 0;
  for (const parent of parents[index] ?? []) {
    if (parent < 0 || parent >= parents.length || parent === index) continue;
    best = Math.max(best, 1 + prerequisiteSteps(parent, parents, memo, stack));
    if (best >= MAX_PREREQUISITE_STEPS) break;
  }
  stack.delete(index);
  const capped = Math.min(best, MAX_PREREQUISITE_STEPS);
  memo.set(index, capped);
  return capped;
}

/** 节点略高出本层台阶，避免陷进山体。 */
export const SUMMIT_NODE_LIFT = 0.045;

/** 汇流灯标比核心台地再高一截。 */
export const SUMMIT_BEACON_HEIGHT = 1.06;

export const SUMMIT_QUANTIZE = 1000;

export function quantizeSummit(value: number): number {
  const scaled = Math.round(value * SUMMIT_QUANTIZE);
  return Math.max(-32768, Math.min(32767, scaled));
}

/**
 * 半径 → 台阶高度。每一层认知在自己的环带上是平的：
 * L1 在外缘为 0，L5 在内缘为 1，圆心台地略高。
 */
export function ridgeHeight(radius: number): number {
  if (radius > 1) return 0;
  if (radius <= CORE_RADIUS) return 1.02;
  const levels: readonly KnowledgeLevel[] = [1, 2, 3, 4, 5];
  for (const level of levels) {
    const band = levelBand(level);
    const inner = level === 5 ? CORE_RADIUS : band.inner;
    if (radius <= band.outer && radius > inner) return levelHeight(level);
  }
  return 0;
}

export type SummitPoint = {
  x: number;
  y: number;
  z: number;
  radius: number;
  angleDeg: number;
};

/**
 * 扇区内的稳定位置。前置越深，半径越往带的内侧收，但收得不超过带宽的 15%，
 * 也不离开这一层。高度始终是这一层的台阶。
 */
export function placeSummitNode(
  routeDomain: string,
  level: KnowledgeLevel,
  id: string,
  depthSteps: number
): SummitPoint {
  const placed = placeInWedge(routeDomain, level, stableUnit(id, 1), stableUnit(id, 2));
  const band = levelBand(level);
  const span = band.outer - band.inner;
  const nudge =
    (Math.min(Math.max(depthSteps, 0), MAX_PREREQUISITE_STEPS) / MAX_PREREQUISITE_STEPS) *
    span *
    0.15;
  const radius = Math.min(
    band.outer - span * 0.08,
    Math.max(band.inner + span * 0.08, placed.radius - nudge)
  );
  const flat = polarToXY(placed.angleDeg, radius);
  return {
    x: flat.x,
    y: levelHeight(level) + SUMMIT_NODE_LIFT,
    z: flat.y,
    radius,
    angleDeg: placed.angleDeg,
  };
}

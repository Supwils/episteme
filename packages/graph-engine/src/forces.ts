import type { LayoutConfig, LayoutNode, LayoutEdge } from './types';
import type { QuadNode } from './quadtree';
import { buildQuadTree, initQuadTreePool } from './quadtree';

let _fx: Float64Array = new Float64Array(0);
let _fy: Float64Array = new Float64Array(0);

export function ensureForceArrays(n: number): void {
  if (_fx.length < n) {
    _fx = new Float64Array(n * 2);
    _fy = new Float64Array(n * 2);
  }
}

export function resetForces(n: number): void {
  for (let i = 0; i < n; i++) {
    _fx[i] = 0;
    _fy[i] = 0;
  }
}

export function applyBarnesHutRepulsion(
  nodes: LayoutNode[],
  config: LayoutConfig,
): void {
  const n = nodes.length;
  if (n === 0) return;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < n; i++) {
    const nd = nodes[i]!;
    if (nd.x < minX) minX = nd.x;
    if (nd.y < minY) minY = nd.y;
    if (nd.x > maxX) maxX = nd.x;
    if (nd.y > maxY) maxY = nd.y;
  }

  const pad = 50;
  minX -= pad;
  minY -= pad;
  const w = maxX - minX + pad * 2 || 100;
  const h = maxY - minY + pad * 2 || 100;

  initQuadTreePool();
  const root = buildQuadTree(nodes, minX, minY, w, h);

  const theta2 = config.theta * config.theta;
  const repulsion = config.repulsionStrength;
  const minDist = config.minDistance;
  const minDist2 = minDist * minDist;

  const stack: QuadNode[] = [];

  for (let i = 0; i < n; i++) {
    const body = nodes[i]!;
    stack.length = 0;
    stack.push(root);

    while (stack.length > 0) {
      const cur = stack.pop()!;
      if (cur.mass === 0) continue;

      const dx = cur.cx - body.x;
      const dy = cur.cy - body.y;
      const dist2 = dx * dx + dy * dy;

      if (cur.bodyIndex === i && cur.mass === 1) continue;

      const s2 = cur.w * cur.w;

      if (cur.bodyIndex >= 0 || s2 / dist2 < theta2) {
        const effDist2 = dist2 < minDist2 ? minDist2 : dist2;
        const dist = Math.sqrt(effDist2);
        const force = (repulsion * cur.mass) / effDist2;
        _fx[i]! -= (dx / dist) * force;
        _fy[i]! -= (dy / dist) * force;
      } else {
        for (let c = 0; c < 4; c++) {
          const child = cur.children[c];
          if (child && child.mass > 0) {
            stack.push(child);
          }
        }
      }
    }
  }
}

export function applyEdgeAttraction(
  nodes: LayoutNode[],
  edgeList: [number, number, number][],
  config: LayoutConfig,
): void {
  for (let e = 0; e < edgeList.length; e++) {
    const [si, ti, strength] = edgeList[e]!;
    const s = nodes[si]!;
    const t = nodes[ti]!;
    const dx = t.x - s.x;
    const dy = t.y - s.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
    const force = config.attractionStrength * dist * strength;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    _fx[si]! += fx;
    _fy[si]! += fy;
    _fx[ti]! -= fx;
    _fy[ti]! -= fy;
  }
}

export function applyCenterGravity(
  nodes: LayoutNode[],
  config: LayoutConfig,
): void {
  for (let i = 0; i < nodes.length; i++) {
    _fx[i]! -= nodes[i]!.x * config.centerGravity;
    _fy[i]! -= nodes[i]!.y * config.centerGravity;
  }
}

export function applyDomainClustering(
  nodes: LayoutNode[],
  config: LayoutConfig,
  domainCenters: Map<string, { x: number; y: number }>,
): void {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    if (config.clusterMode) {
      const center = config.clusterCenters[node.domain];
      if (center) {
        _fx[i]! += (center.x - node.x) * config.clusterStrength;
        _fy[i]! += (center.y - node.y) * config.clusterStrength;
      }
    } else {
      const center = domainCenters.get(node.domain);
      if (center) {
        _fx[i]! += (center.x - node.x) * config.domainClusterStrength;
        _fy[i]! += (center.y - node.y) * config.domainClusterStrength;
      }
    }
  }
}

export function applyForcesWithDamping(
  nodes: LayoutNode[],
  config: LayoutConfig,
  alpha: number,
): void {
  const maxForce = 50;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    if (node.fixed) continue;

    let fx = _fx[i]! * alpha;
    let fy = _fy[i]! * alpha;

    const fMag = Math.sqrt(fx * fx + fy * fy);
    if (fMag > maxForce) {
      const scale = maxForce / fMag;
      fx *= scale;
      fy *= scale;
    }

    node.vx = (node.vx + fx) * config.damping;
    node.vy = (node.vy + fy) * config.damping;
    node.x += node.vx;
    node.y += node.vy;
  }
}

export function resolveCollisions(
  nodes: LayoutNode[],
  config: LayoutConfig,
): void {
  const n = nodes.length;
  const minDist = config.minDistance;
  const minDist2 = minDist * minDist;

  const cellSize = minDist;
  const grid = new Map<number, number[]>();
  const keyToCoords = new Map<number, [number, number]>();

  for (let i = 0; i < n; i++) {
    const node = nodes[i]!;
    const gx = Math.floor(node.x / cellSize);
    const gy = Math.floor(node.y / cellSize);
    const key = ((gx * 73856093) ^ (gy * 19349663)) | 0;

    let cell = grid.get(key);
    if (!cell) {
      cell = [];
      grid.set(key, cell);
      keyToCoords.set(key, [gx, gy]);
    }
    cell.push(i);
  }

  const processed = new Set<number>();

  for (const [key, cell] of grid) {
    const coords = keyToCoords.get(key);
    if (!coords) continue;
    const [gx, gy] = coords;

    resolvePairs(cell, cell, nodes, minDist, minDist2);

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nkey = (((gx + dx) * 73856093) ^ ((gy + dy) * 19349663)) | 0;
        if (processed.has(nkey)) continue;
        const neighbor = grid.get(nkey);
        if (neighbor) {
          resolvePairs(cell, neighbor, nodes, minDist, minDist2);
        }
      }
    }

    processed.add(key);
  }
}

function resolvePairs(
  listA: number[],
  listB: number[],
  nodes: LayoutNode[],
  minDist: number,
  minDist2: number,
): void {
  const isSame = listA === listB;
  for (let a = 0; a < listA.length; a++) {
    const startB = isSame ? a + 1 : 0;
    for (let b = startB; b < listB.length; b++) {
      const i = listA[a]!;
      const j = listB[b]!;
      if (i === j) continue;
      const ni = nodes[i]!;
      const nj = nodes[j]!;
      const dx = nj.x - ni.x;
      const dy = nj.y - ni.y;
      const dist2 = dx * dx + dy * dy;

      if (dist2 < minDist2 && dist2 > 0) {
        const dist = Math.sqrt(dist2);
        const overlap = (minDist - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;

        if (!ni.fixed) {
          ni.x -= nx * overlap;
          ni.y -= ny * overlap;
        }
        if (!nj.fixed) {
          nj.x += nx * overlap;
          nj.y += ny * overlap;
        }
      }
    }
  }
}

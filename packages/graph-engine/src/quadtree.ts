import type { LayoutNode } from './types';

const enum Child {
  NW = 0,
  NE = 1,
  SW = 2,
  SE = 3,
}

export interface QuadNode {
  mass: number;
  cx: number;
  cy: number;
  x: number;
  y: number;
  w: number;
  h: number;
  bodyIndex: number;
  children: [QuadNode | null, QuadNode | null, QuadNode | null, QuadNode | null];
}

const POOL_SIZE = 12000;
const qPool: QuadNode[] = new Array(POOL_SIZE);
export let qPoolIdx = 0;

function initQPool(): void {
  for (let i = 0; i < POOL_SIZE; i++) {
    qPool[i] = { mass: 0, cx: 0, cy: 0, x: 0, y: 0, w: 0, h: 0, bodyIndex: -1, children: [null, null, null, null] };
  }
  qPoolIdx = 0;
}

function acquireQ(): QuadNode {
  if (qPoolIdx >= POOL_SIZE) {
    return { mass: 0, cx: 0, cy: 0, x: 0, y: 0, w: 0, h: 0, bodyIndex: -1, children: [null, null, null, null] };
  }
  const n = qPool[qPoolIdx++]!;
  n.mass = 0;
  n.cx = 0;
  n.cy = 0;
  n.bodyIndex = -1;
  n.children[0] = null;
  n.children[1] = null;
  n.children[2] = null;
  n.children[3] = null;
  return n;
}

function childIndex(px: number, py: number, mx: number, my: number): Child {
  return (px < mx ? 0 : 1) + (py < my ? 0 : 2);
}

function childBounds(
  ci: Child,
  x: number,
  y: number,
  hw: number,
  hh: number,
  mx: number,
  my: number,
): [number, number] {
  switch (ci) {
    case Child.NW: return [x, y];
    case Child.NE: return [mx, y];
    case Child.SW: return [x, my];
    case Child.SE: return [mx, my];
  }
}

let _nodesRef: LayoutNode[] = [];

function qtInsert(
  node: QuadNode,
  body: LayoutNode,
  bodyIdx: number,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  if (node.mass === 0 && node.bodyIndex === -1 && node.children[0] === null) {
    node.bodyIndex = bodyIdx;
    node.mass = 1;
    node.cx = body.x;
    node.cy = body.y;
    return;
  }

  const hw = w / 2;
  const hh = h / 2;
  const mx = x + hw;
  const my = y + hh;

  if (node.bodyIndex >= 0) {
    const existingIdx = node.bodyIndex;
    const existing = _nodesRef[existingIdx]!;
    node.bodyIndex = -1;

    const eci = childIndex(existing.x, existing.y, mx, my);
    const eChild = acquireQ();
    const [ex, ey] = childBounds(eci, x, y, hw, hh, mx, my);
    eChild.x = ex;
    eChild.y = ey;
    eChild.w = hw;
    eChild.h = hh;
    eChild.bodyIndex = existingIdx;
    eChild.mass = 1;
    eChild.cx = existing.x;
    eChild.cy = existing.y;
    node.children[eci] = eChild;

    const nci = childIndex(body.x, body.y, mx, my);
    if (nci === eci) {
      qtInsert(eChild, body, bodyIdx, ex, ey, hw, hh);
    } else {
      const nChild = acquireQ();
      const [nx, ny] = childBounds(nci, x, y, hw, hh, mx, my);
      nChild.x = nx;
      nChild.y = ny;
      nChild.w = hw;
      nChild.h = hh;
      nChild.bodyIndex = bodyIdx;
      nChild.mass = 1;
      nChild.cx = body.x;
      nChild.cy = body.y;
      node.children[nci] = nChild;
    }
    return;
  }

  const ci = childIndex(body.x, body.y, mx, my);
  let child = node.children[ci];
  if (!child) {
    child = acquireQ();
    const [cx, cy] = childBounds(ci, x, y, hw, hh, mx, my);
    child.x = cx;
    child.y = cy;
    child.w = hw;
    child.h = hh;
    node.children[ci] = child;
  }
  const [cx2, cy2] = childBounds(ci, x, y, hw, hh, mx, my);
  qtInsert(child, body, bodyIdx, cx2, cy2, hw, hh);
}

function qtComputeMass(node: QuadNode): number {
  if (node.bodyIndex >= 0) {
    return node.mass;
  }
  let total = 0;
  let wx = 0;
  let wy = 0;
  for (let i = 0; i < 4; i++) {
    const c = node.children[i];
    if (c) {
      const m = qtComputeMass(c);
      total += m;
      wx += c.cx * m;
      wy += c.cy * m;
    }
  }
  if (total > 0) {
    node.mass = total;
    node.cx = wx / total;
    node.cy = wy / total;
  }
  return total;
}

export function initQuadTreePool(): void {
  qPoolIdx = 0;
  if (qPool[0] === undefined) initQPool();
}

export function buildQuadTree(
  nodes: LayoutNode[],
  x: number,
  y: number,
  w: number,
  h: number,
): QuadNode {
  _nodesRef = nodes;
  const root = acquireQ();
  root.x = x;
  root.y = y;
  root.w = w;
  root.h = h;

  for (let i = 0; i < nodes.length; i++) {
    qtInsert(root, nodes[i]!, i, x, y, w, h);
  }
  qtComputeMass(root);
  return root;
}

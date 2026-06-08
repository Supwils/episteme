import type { LayoutConfig, LayoutNode, LayoutEdge } from './types';
import { DEFAULT_CONFIG } from './types';
import {
  ensureForceArrays,
  resetForces,
  applyBarnesHutRepulsion,
  applyEdgeAttraction,
  applyCenterGravity,
  applyDomainClustering,
  applyForcesWithDamping,
  resolveCollisions,
} from './forces';

export type { LayoutConfig, LayoutNode, LayoutEdge };

export class ForceLayout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  config: LayoutConfig;
  private nodeMap: Map<string, number>;
  private edgeList: [number, number, number][];
  private domainCenters: Map<string, { x: number; y: number }>;
  private alpha: number;
  private iteration: number;

  constructor(
    nodes: LayoutNode[],
    edges: LayoutEdge[],
    config?: Partial<LayoutConfig>,
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.nodes = nodes;
    this.edges = edges;
    this.nodeMap = new Map();
    this.edgeList = [];
    this.domainCenters = new Map();
    this.alpha = 1;
    this.iteration = 0;

    for (let i = 0; i < nodes.length; i++) {
      this.nodeMap.set(nodes[i]!.id, i);
    }

    for (const edge of edges) {
      const si = this.nodeMap.get(edge.source);
      const ti = this.nodeMap.get(edge.target);
      if (si !== undefined && ti !== undefined) {
        this.edgeList.push([si, ti, edge.strength ?? 1]);
      }
    }

    this.computeDomainCenters();
    ensureForceArrays(nodes.length);
  }

  private computeDomainCenters(): void {
    const domains = new Set<string>();
    for (const node of this.nodes) {
      domains.add(node.domain);
    }

    const domainList = [...domains].sort();
    const n = domainList.length;
    const radius = 300;

    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      this.domainCenters.set(domainList[i]!, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }
  }

  tick(): void {
    const { nodes, config, edgeList, domainCenters } = this;
    const n = nodes.length;
    if (n === 0) return;

    ensureForceArrays(n);
    resetForces(n);

    applyBarnesHutRepulsion(nodes, config);
    applyEdgeAttraction(nodes, edgeList, config);
    applyCenterGravity(nodes, config);
    applyDomainClustering(nodes, config, domainCenters);
    applyForcesWithDamping(nodes, config, this.alpha);
    resolveCollisions(nodes, config);

    this.alpha *= config.coolingFactor;
    this.iteration++;
  }

  runToStability(): void {
    const maxIter = this.config.maxIterations;
    for (let i = 0; i < maxIter; i++) {
      this.tick();
      if (this.alpha < 0.001) break;
    }
  }

  getNode(id: string): LayoutNode | undefined {
    const index = this.nodeMap.get(id);
    return index !== undefined ? this.nodes[index] : undefined;
  }

  setFixed(id: string, fixed: boolean): void {
    const node = this.getNode(id);
    if (node) node.fixed = fixed;
  }

  setPosition(id: string, x: number, y: number): void {
    const node = this.getNode(id);
    if (node) {
      node.x = x;
      node.y = y;
      node.vx = 0;
      node.vy = 0;
    }
  }

  getPositions(): Map<string, { x: number; y: number }> {
    const positions = new Map<string, { x: number; y: number }>();
    for (const node of this.nodes) {
      positions.set(node.id, { x: node.x, y: node.y });
    }
    return positions;
  }

  getTotalEnergy(): number {
    let energy = 0;
    for (const node of this.nodes) {
      energy += node.vx * node.vx + node.vy * node.vy;
    }
    return energy;
  }

  getIteration(): number {
    return this.iteration;
  }

  getAlpha(): number {
    return this.alpha;
  }

  updateConfig(patch: Partial<LayoutConfig>): void {
    Object.assign(this.config, patch);
  }

  restart(): void {
    this.alpha = 1;
    this.iteration = 0;
  }
}

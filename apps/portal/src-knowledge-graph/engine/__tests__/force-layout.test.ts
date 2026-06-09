import { describe, it, expect } from 'vitest';
import { ForceLayout, type LayoutNode, type LayoutEdge } from '@/lib/graph-engine';

function makeNodes(count: number, domain = 'physics'): LayoutNode[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `n${i}`,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
    vx: 0,
    vy: 0,
    domain,
  }));
}

function makeChain(nodes: LayoutNode[]): LayoutEdge[] {
  const edges: LayoutEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({ source: nodes[i]!.id, target: nodes[i + 1]!.id });
  }
  return edges;
}

describe('ForceLayout', () => {
  it('converges after runToStability', () => {
    const nodes = makeNodes(20);
    const edges = makeChain(nodes);
    const layout = new ForceLayout(nodes, edges, { maxIterations: 500 });

    layout.runToStability();

    expect(layout.getAlpha()).toBeLessThan(0.001);
    expect(layout.getIteration()).toBeGreaterThan(0);
    expect(layout.getTotalEnergy()).toBeLessThan(5);
  });

  it('nodes do not overlap after convergence', () => {
    const nodes = makeNodes(15);
    const edges = makeChain(nodes);
    const minDistance = 30;
    const layout = new ForceLayout(nodes, edges, {
      maxIterations: 500,
      minDistance,
    });

    layout.runToStability();

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j]!.x - nodes[i]!.x;
        const dy = nodes[j]!.y - nodes[i]!.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        expect(dist).toBeGreaterThanOrEqual(minDistance - 1);
      }
    }
  });

  it('connected nodes are closer than disconnected nodes', () => {
    const nodesA: LayoutNode[] = [
      { id: 'a1', x: -100, y: 0, vx: 0, vy: 0, domain: 'physics' },
      { id: 'a2', x: -80, y: 0, vx: 0, vy: 0, domain: 'physics' },
      { id: 'a3', x: -60, y: 0, vx: 0, vy: 0, domain: 'physics' },
    ];
    const nodesB: LayoutNode[] = [
      { id: 'b1', x: 100, y: 0, vx: 0, vy: 0, domain: 'history' },
      { id: 'b2', x: 120, y: 0, vx: 0, vy: 0, domain: 'history' },
      { id: 'b3', x: 140, y: 0, vx: 0, vy: 0, domain: 'history' },
    ];
    const allNodes = [...nodesA, ...nodesB];
    const edges: LayoutEdge[] = [
      { source: 'a1', target: 'a2' },
      { source: 'a2', target: 'a3' },
      { source: 'b1', target: 'b2' },
      { source: 'b2', target: 'b3' },
    ];

    const layout = new ForceLayout(allNodes, edges, { maxIterations: 500 });
    layout.runToStability();

    const avgConnected = (dist('a1', 'a2', allNodes) + dist('a2', 'a3', allNodes) + dist('b1', 'b2', allNodes) + dist('b2', 'b3', allNodes)) / 4;
    const avgDisconnected = (dist('a1', 'b1', allNodes) + dist('a1', 'b2', allNodes) + dist('a2', 'b1', allNodes)) / 3;

    expect(avgConnected).toBeLessThan(avgDisconnected);
  });

  it('respects fixed nodes', () => {
    const nodes: LayoutNode[] = [
      { id: 'fixed', x: 0, y: 0, vx: 0, vy: 0, domain: 'physics', fixed: true },
      { id: 'free', x: 50, y: 0, vx: 0, vy: 0, domain: 'physics' },
    ];
    const edges: LayoutEdge[] = [{ source: 'fixed', target: 'free' }];
    const layout = new ForceLayout(nodes, edges, { maxIterations: 100 });

    layout.runToStability();

    const fixedNode = layout.getNode('fixed')!;
    expect(fixedNode.x).toBe(0);
    expect(fixedNode.y).toBe(0);
  });

  it('getNode returns undefined for unknown id', () => {
    const layout = new ForceLayout([], []);
    expect(layout.getNode('nonexistent')).toBeUndefined();
  });

  it('handles empty graph', () => {
    const layout = new ForceLayout([], []);
    layout.runToStability();
    expect(layout.getTotalEnergy()).toBe(0);
  });

  it('handles single node', () => {
    const nodes: LayoutNode[] = [
      { id: 'alone', x: 10, y: 20, vx: 0, vy: 0, domain: 'physics' },
    ];
    const layout = new ForceLayout(nodes, [], { maxIterations: 100 });
    layout.runToStability();
    expect(layout.getNode('alone')).toBeDefined();
  });
});

function dist(idA: string, idB: string, nodes: LayoutNode[]): number {
  const a = nodes.find((n) => n.id === idA)!;
  const b = nodes.find((n) => n.id === idB)!;
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

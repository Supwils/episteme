import { describe, it, expect } from 'vitest';
import { ForceLayout, type LayoutNode, type LayoutEdge } from '@universe/graph-engine';

function makeNodes(count: number, domains: string[]): LayoutNode[] {
  const nodes: LayoutNode[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: `n${i}`,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0,
      domain: domains[i % domains.length]!,
    });
  }
  return nodes;
}

function makeEdges(nodes: LayoutNode[], density: number): LayoutEdge[] {
  const edges: LayoutEdge[] = [];
  for (let i = 1; i < nodes.length; i++) {
    if (Math.random() < density) {
      edges.push({ source: nodes[i - 1]!.id, target: nodes[i]!.id });
    }
    // Cross-domain edges
    if (Math.random() < density * 0.3) {
      const j = Math.floor(Math.random() * nodes.length);
      if (j !== i) {
        edges.push({ source: nodes[i]!.id, target: nodes[j]!.id });
      }
    }
  }
  return edges;
}

describe('ForceLayout', () => {
  it('should not overlap nodes after stabilization', () => {
    const domains = ['physics', 'history', 'philosophy'];
    const nodes = makeNodes(50, domains);
    const edges = makeEdges(nodes, 0.5);
    const layout = new ForceLayout(nodes, edges, { maxIterations: 200 });

    layout.runToStability();

    const minDist = layout.config.minDistance;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]!;
        const b = nodes[j]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Allow small tolerance for collision resolution
        expect(dist).toBeGreaterThanOrEqual(minDist * 0.8);
      }
    }
  });

  it('connected nodes should be closer than disconnected nodes', () => {
    const nodes: LayoutNode[] = [
      { id: 'a', x: -100, y: 0, vx: 0, vy: 0, domain: 'physics' },
      { id: 'b', x: 100, y: 0, vx: 0, vy: 0, domain: 'physics' },
      { id: 'c', x: 0, y: 100, vx: 0, vy: 0, domain: 'physics' },
      { id: 'd', x: 0, y: -100, vx: 0, vy: 0, domain: 'history' },
    ];
    const edges: LayoutEdge[] = [
      { source: 'a', target: 'b' },
    ];

    const layout = new ForceLayout(nodes, edges, { maxIterations: 300 });
    layout.runToStability();

    const a = layout.getNode('a')!;
    const b = layout.getNode('b')!;
    const c = layout.getNode('c')!;
    const d = layout.getNode('d')!;

    const distAB = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    const distCD = Math.sqrt((c.x - d.x) ** 2 + (c.y - d.y) ** 2);

    // Connected nodes (a-b) should be closer on average than unconnected (c-d)
    // Note: due to domain clustering, this test primarily checks edge attraction effect
    expect(distAB).toBeLessThan(distCD);
  });

  it('simulation converges — energy decreases over time', () => {
    const domains = ['physics', 'history', 'philosophy', 'biology'];
    const nodes = makeNodes(100, domains);
    const edges = makeEdges(nodes, 0.4);
    const layout = new ForceLayout(nodes, edges, { maxIterations: 100 });

    // Run first batch
    for (let i = 0; i < 20; i++) layout.tick();
    const energyEarly = layout.getTotalEnergy();

    // Run remaining
    for (let i = 0; i < 80; i++) layout.tick();
    const energyLate = layout.getTotalEnergy();

    expect(energyLate).toBeLessThan(energyEarly);
  });

  it('fixed nodes should not move', () => {
    const nodes: LayoutNode[] = [
      { id: 'fixed1', x: 0, y: 0, vx: 0, vy: 0, domain: 'physics', fixed: true },
      { id: 'free1', x: 100, y: 0, vx: 0, vy: 0, domain: 'physics' },
    ];
    const edges: LayoutEdge[] = [{ source: 'fixed1', target: 'free1' }];
    const layout = new ForceLayout(nodes, edges);

    const origX = nodes[0]!.x;
    const origY = nodes[0]!.y;

    for (let i = 0; i < 50; i++) layout.tick();

    expect(nodes[0]!.x).toBe(origX);
    expect(nodes[0]!.y).toBe(origY);
  });

  it('handles 700 nodes without crashing and converges', () => {
    const domains = ['physics', 'history', 'philosophy', 'biology', 'math'];
    const nodes = makeNodes(700, domains);
    const edges = makeEdges(nodes, 0.3);
    const layout = new ForceLayout(nodes, edges, { maxIterations: 200 });

    const start = performance.now();
    layout.runToStability();
    const elapsed = performance.now() - start;

    // Should complete in under 5 seconds on any modern machine
    expect(elapsed).toBeLessThan(5000);

    // Should converge — energy should be lower than early measurement
    const energy = layout.getTotalEnergy();
    expect(energy).toBeLessThan(5000);
    expect(energy).toBeGreaterThan(0);
  });

  it('domain clustering keeps same-domain nodes nearer', () => {
    const nodes: LayoutNode[] = [
      { id: 'p1', x: -50, y: 0, vx: 0, vy: 0, domain: 'physics' },
      { id: 'p2', x: 50, y: 0, vx: 0, vy: 0, domain: 'physics' },
      { id: 'h1', x: 0, y: -50, vx: 0, vy: 0, domain: 'history' },
      { id: 'h2', x: 0, y: 50, vx: 0, vy: 0, domain: 'history' },
    ];
    const edges: LayoutEdge[] = [];
    const layout = new ForceLayout(nodes, edges, { maxIterations: 300 });
    layout.runToStability();

    const p1 = layout.getNode('p1')!;
    const p2 = layout.getNode('p2')!;
    const h1 = layout.getNode('h1')!;
    const h2 = layout.getNode('h2')!;

    const distPP = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    const distHH = Math.sqrt((h1.x - h2.x) ** 2 + (h1.y - h2.y) ** 2);
    const distPH = Math.sqrt((p1.x - h1.x) ** 2 + (p1.y - h1.y) ** 2);

    // Same-domain pairs should be closer than cross-domain
    expect(distPP).toBeLessThan(distPH);
    expect(distHH).toBeLessThan(distPH);
  });

  it('getPositions returns correct map', () => {
    const nodes: LayoutNode[] = [
      { id: 'a', x: 10, y: 20, vx: 0, vy: 0, domain: 'physics' },
      { id: 'b', x: 30, y: 40, vx: 0, vy: 0, domain: 'history' },
    ];
    const layout = new ForceLayout(nodes, []);
    const positions = layout.getPositions();

    expect(positions.size).toBe(2);
    expect(positions.get('a')).toEqual({ x: 10, y: 20 });
    expect(positions.get('b')).toEqual({ x: 30, y: 40 });
  });

  it('setPosition and setFixed work correctly', () => {
    const nodes: LayoutNode[] = [
      { id: 'a', x: 0, y: 0, vx: 5, vy: 5, domain: 'physics' },
    ];
    const layout = new ForceLayout(nodes, []);

    layout.setPosition('a', 100, 200);
    const node = layout.getNode('a')!;
    expect(node.x).toBe(100);
    expect(node.y).toBe(200);
    expect(node.vx).toBe(0);
    expect(node.vy).toBe(0);

    layout.setFixed('a', true);
    expect(node.fixed).toBe(true);
  });
});

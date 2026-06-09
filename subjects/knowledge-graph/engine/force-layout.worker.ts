import type { LayoutNode, LayoutEdge, LayoutConfig } from '@/lib/graph-engine';

type WorkerRequest = {
  type: 'run';
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  config?: Partial<LayoutConfig>;
};

type WorkerResponse = {
  type: 'result';
  positions: [string, { x: number; y: number }][];
};

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { nodes, edges, config } = e.data;

  const { ForceLayout } = await import('@/lib/graph-engine');
  const layout = new ForceLayout(nodes, edges, config);
  layout.runToStability();

  const positions = [...layout.getPositions().entries()] as [
    string,
    { x: number; y: number },
  ][];

  const response: WorkerResponse = { type: 'result', positions };
  self.postMessage(response);
};

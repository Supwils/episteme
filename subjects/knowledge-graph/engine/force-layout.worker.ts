import type { LayoutNode, LayoutEdge, LayoutConfig } from "@/lib/graph-engine";

type WorkerRequest = {
  type: "run";
  /** Echoed back so the consumer can drop results from a superseded request. */
  id: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  config?: Partial<LayoutConfig>;
};

type WorkerResponse = {
  type: "result";
  id: number;
  positions: [string, { x: number; y: number }][];
};

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, nodes, edges, config } = e.data;

  const { ForceLayout } = await import("@/lib/graph-engine");
  const layout = new ForceLayout(nodes, edges, config);
  layout.runToStability();

  const positions = [...layout.getPositions().entries()] as [string, { x: number; y: number }][];

  const response: WorkerResponse = { type: "result", id, positions };
  self.postMessage(response);
};

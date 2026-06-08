import type { GraphEdge } from './graph-types';

export function findShortestPath(
  startId: string,
  endId: string,
  adjacency: Map<string, string[]>,
): string[] | null {
  if (startId === endId) return [startId];

  const visited = new Set<string>();
  const parent = new Map<string, string>();
  const queue: string[] = [startId];
  visited.add(startId);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const neighbors = adjacency.get(current) ?? [];
    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      parent.set(neighbor, current);
      if (neighbor === endId) {
        const path: string[] = [endId];
        let node = endId;
        while (parent.has(node)) {
          node = parent.get(node)!;
          path.unshift(node);
        }
        return path;
      }
      queue.push(neighbor);
    }
  }
  return null;
}

export function getNodesWithinHops(
  startId: string,
  hops: number,
  adjacency: Map<string, string[]>,
): Set<string> {
  const result = new Set<string>();
  let frontier = new Set<string>([startId]);
  result.add(startId);

  for (let h = 0; h < hops; h++) {
    const next = new Set<string>();
    for (const node of frontier) {
      const neighbors = adjacency.get(node) ?? [];
      for (const neighbor of neighbors) {
        if (!result.has(neighbor)) {
          result.add(neighbor);
          next.add(neighbor);
        }
      }
    }
    frontier = next;
  }
  return result;
}

export function buildAdjacency(edges: GraphEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    if (!adj.has(edge.target)) adj.set(edge.target, []);
    adj.get(edge.source)!.push(edge.target);
    adj.get(edge.target)!.push(edge.source);
  }
  return adj;
}

export const MAX_ANIMATED_GRAPH_ELEMENTS = 2_400;

export function shouldAnimateGraphEntrance(
  nodeCount: number,
  edgeCount: number,
  reducedMotion: boolean
): boolean {
  if (reducedMotion) return false;
  return nodeCount + edgeCount <= MAX_ANIMATED_GRAPH_ELEMENTS;
}

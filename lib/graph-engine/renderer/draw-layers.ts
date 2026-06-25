import type {
  RenderNode,
  RenderEdge,
  RenderConfig,
  Transform,
  ViewBounds,
  HighlightState,
} from "./types";
import {
  HOVER_GLOW_EXTRA,
  PULSE_SPEED,
  PULSE_MIN,
  PULSE_MAX,
  EDGE_ALPHA_DISTANCE,
  LABEL_VISIBLE_SCALE,
  SMALL_NODE_HIDE_SCALE,
} from "./types";

export type DrawContext = {
  ctx: CanvasRenderingContext2D;
  config: RenderConfig;
  transform: Transform;
  highlight: HighlightState;
  nodesRef: RenderNode[];
  edgesRef: RenderEdge[];
  crossDomainOnly: boolean;
  markDirty: () => void;
};

export function isInBounds(node: RenderNode, b: ViewBounds): boolean {
  return node.x >= b.minX && node.x <= b.maxX && node.y >= b.minY && node.y <= b.maxY;
}

export function isEdgeInBounds(edge: RenderEdge, b: ViewBounds): boolean {
  return !(
    Math.max(edge.x1, edge.x2) < b.minX ||
    Math.min(edge.x1, edge.x2) > b.maxX ||
    Math.max(edge.y1, edge.y2) < b.minY ||
    Math.min(edge.y1, edge.y2) > b.maxY
  );
}

export function drawEdges(dc: DrawContext, bounds: ViewBounds): void {
  const { ctx, config, edgesRef, transform, highlight, crossDomainOnly } = dc;
  const camCX = (bounds.minX + bounds.maxX) / 2;
  const camCY = (bounds.minY + bounds.maxY) / 2;
  const hasHighlight = highlight.nodeIds.size > 0;

  ctx.lineCap = "round";

  for (let i = 0; i < edgesRef.length; i++) {
    const edge = edgesRef[i]!;
    if (crossDomainOnly && !edge.crossDomain) continue;
    if (!isEdgeInBounds(edge, bounds)) continue;

    const midX = (edge.x1 + edge.x2) / 2;
    const midY = (edge.y1 + edge.y2) / 2;
    const dist = Math.sqrt((midX - camCX) ** 2 + (midY - camCY) ** 2);
    const distAlpha = Math.max(0.1, 1 - dist / EDGE_ALPHA_DISTANCE);

    const edgeKey =
      edge.sourceId && edge.targetId
        ? `${edge.sourceId}->${edge.targetId}`
        : `${edge.x1},${edge.y1}-${edge.x2},${edge.y2}`;
    const isHighlighted = hasHighlight && highlight.edgeKeys.has(edgeKey);

    ctx.beginPath();
    ctx.moveTo(edge.x1, edge.y1);
    ctx.lineTo(edge.x2, edge.y2);

    if (isHighlighted) {
      ctx.strokeStyle = config.highlightColor;
      ctx.globalAlpha = Math.min(1, edge.alpha * distAlpha * 2.5);
      ctx.lineWidth = (edge.width * 2) / transform.scale;
    } else if (hasHighlight) {
      ctx.strokeStyle = edge.color || config.edgeColor;
      ctx.globalAlpha = edge.alpha * distAlpha * 0.15;
      ctx.lineWidth = edge.width / transform.scale;
    } else {
      ctx.strokeStyle = edge.color || config.edgeColor;
      ctx.globalAlpha = edge.alpha * distAlpha;
      ctx.lineWidth = edge.width / transform.scale;
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function drawNodes(dc: DrawContext, bounds: ViewBounds): void {
  const { ctx, transform, highlight, config, nodesRef } = dc;
  const scale = transform.scale;
  const hasHighlight = highlight.nodeIds.size > 0;
  ctx.lineWidth = 2 / scale;

  for (let i = 0; i < nodesRef.length; i++) {
    const node = nodesRef[i]!;
    if (!isInBounds(node, bounds)) continue;
    if (scale < SMALL_NODE_HIDE_SCALE && node.radius < 5) continue;

    const isHighlighted = hasHighlight && highlight.nodeIds.has(node.id);
    const baseAlpha = hasHighlight && !isHighlighted ? highlight.dimAlpha : 1;

    ctx.globalAlpha = node.alpha * baseAlpha;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();

    if (node.searchMatched) {
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 3.5 / scale;
    } else if (isHighlighted) {
      ctx.strokeStyle = config.highlightColor;
      ctx.lineWidth = 3 / scale;
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2 / scale;
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function drawLabels(dc: DrawContext, bounds: ViewBounds): void {
  const { ctx, config, transform, highlight, nodesRef } = dc;
  const scale = transform.scale;
  const hasHighlight = highlight.nodeIds.size > 0;
  const fontSize = Math.max(10, 12 / scale);
  ctx.font = `${fontSize}px ${config.labelFont}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = config.labelColor;

  // Semantic LOD: at low zoom show only the most prominent nodes' labels so the
  // 1000-node constellation stays legible instead of collapsing into label soup;
  // reveal progressively more as the reader zooms in.
  const labelMinRadius = scale < 0.55 ? 17 : scale < 0.9 ? 14 : 0;

  for (let i = 0; i < nodesRef.length; i++) {
    const node = nodesRef[i]!;
    if (!isInBounds(node, bounds)) continue;

    const isHighlighted = hasHighlight && highlight.nodeIds.has(node.id);
    const prominent = node.hovered || node.selected || isHighlighted;
    if (!prominent && scale < LABEL_VISIBLE_SCALE) continue;
    if (!prominent && node.radius < labelMinRadius) continue;

    const baseAlpha = hasHighlight && !isHighlighted ? highlight.dimAlpha : 1;

    ctx.globalAlpha = node.alpha * baseAlpha;
    ctx.fillText(node.label, node.x, node.y + node.radius + 4 / scale);
  }
  ctx.globalAlpha = 1;
}

// Render the relationship label (the "why") at the midpoint of each highlighted
// edge that carries one — so selecting a node, or running a path, explains the
// connections right on the graph instead of only in a side panel.
export function drawEdgeLabels(dc: DrawContext, bounds: ViewBounds): void {
  const { ctx, config, transform, highlight, edgesRef } = dc;
  const scale = transform.scale;
  if (scale < 0.35) return; // too zoomed-out: labels would be illegible clutter
  if (highlight.edgeKeys.size === 0) return;

  const fontSize = Math.max(9, 11 / scale);
  ctx.font = `${fontSize}px ${config.labelFont}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const padX = 5 / scale;
  const padY = 2.5 / scale;

  for (let i = 0; i < edgesRef.length; i++) {
    const edge = edgesRef[i]!;
    if (!edge.label) continue;
    const edgeKey = edge.sourceId && edge.targetId ? `${edge.sourceId}->${edge.targetId}` : null;
    if (!edgeKey || !highlight.edgeKeys.has(edgeKey)) continue;
    if (!isEdgeInBounds(edge, bounds)) continue;

    const midX = (edge.x1 + edge.x2) / 2;
    const midY = (edge.y1 + edge.y2) / 2;
    const w = ctx.measureText(edge.label).width;

    ctx.globalAlpha = 0.82;
    ctx.fillStyle = "rgba(10, 10, 16, 0.9)";
    roundRect(
      ctx,
      midX - w / 2 - padX,
      midY - fontSize / 2 - padY,
      w + padX * 2,
      fontSize + padY * 2,
      4 / scale
    );
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.fillStyle = edge.crossDomain ? "#e8c879" : config.labelColor;
    ctx.fillText(edge.label, midX, midY);
  }
  ctx.globalAlpha = 1;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function drawHoverGlow(dc: DrawContext, node: RenderNode): void {
  const { ctx, config, transform } = dc;
  const r = node.radius + HOVER_GLOW_EXTRA / transform.scale;
  ctx.beginPath();
  ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
  ctx.strokeStyle = config.highlightColor;
  ctx.lineWidth = 3 / transform.scale;
  ctx.globalAlpha = 0.7;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawSelectionPulse(dc: DrawContext, node: RenderNode, now: number): void {
  const { ctx, config, transform } = dc;
  const pulse = PULSE_MIN + (PULSE_MAX - PULSE_MIN) * (0.5 + 0.5 * Math.sin(now * PULSE_SPEED));
  const r = node.radius + (6 * pulse) / transform.scale;
  ctx.beginPath();
  ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
  ctx.strokeStyle = config.highlightColor;
  ctx.lineWidth = 2 / transform.scale;
  ctx.globalAlpha = 0.5 + 0.3 * pulse;
  ctx.stroke();
  ctx.globalAlpha = 1;
  dc.markDirty();
}

export function drawPathAnimation(dc: DrawContext, now: number): void {
  const { ctx, config, transform, highlight, nodesRef } = dc;
  if (highlight.pathNodes.length < 2) return;

  const nodeMap = new Map<string, RenderNode>();
  for (const n of nodesRef) nodeMap.set(n.id, n);

  const dashOffset = (now * 0.05) % 20;

  ctx.save();
  ctx.setLineDash([8, 6]);
  ctx.lineDashOffset = -dashOffset;
  ctx.lineCap = "round";
  ctx.lineWidth = 3 / transform.scale;

  for (let i = 0; i < highlight.pathNodes.length - 1; i++) {
    const a = nodeMap.get(highlight.pathNodes[i]!);
    const b = nodeMap.get(highlight.pathNodes[i + 1]!);
    if (!a || !b) continue;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = config.highlightColor;
    ctx.globalAlpha = 0.8;
    ctx.stroke();
  }

  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.restore();
  dc.markDirty();
}

export function drawSearchGlow(dc: DrawContext, node: RenderNode, now: number): void {
  const { ctx, transform } = dc;
  const pulse = 0.6 + 0.4 * Math.sin(now * 0.004);
  const r = node.radius + (10 * pulse) / transform.scale;
  ctx.beginPath();
  ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2 / transform.scale;
  ctx.globalAlpha = 0.4 * pulse;
  ctx.stroke();
  ctx.globalAlpha = 1;
  dc.markDirty();
}

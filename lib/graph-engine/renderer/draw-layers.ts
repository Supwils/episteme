import type {
  RenderNode,
  RenderEdge,
  RenderGuide,
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
  guidesRef: RenderGuide[];
  crossDomainOnly: boolean;
  markDirty: () => void;
};

export function drawGuides(dc: DrawContext, bounds: ViewBounds): void {
  const { ctx, guidesRef, transform, config } = dc;
  if (guidesRef.length === 0) return;

  ctx.save();
  for (const guide of guidesRef) {
    ctx.globalAlpha = guide.alpha;
    ctx.strokeStyle = guide.color;
    ctx.fillStyle = guide.color;
    ctx.lineWidth = guide.kind === "label" ? 1 : guide.width / transform.scale;
    ctx.setLineDash(guide.kind === "label" ? [] : (guide.dash ?? []));

    if (guide.kind === "ellipse") {
      if (
        guide.x + guide.radiusX < bounds.minX ||
        guide.x - guide.radiusX > bounds.maxX ||
        guide.y + guide.radiusY < bounds.minY ||
        guide.y - guide.radiusY > bounds.maxY
      ) {
        continue;
      }
      ctx.beginPath();
      ctx.ellipse(guide.x, guide.y, guide.radiusX, guide.radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
      continue;
    }

    if (guide.kind === "line") {
      if (
        Math.max(guide.x1, guide.x2) < bounds.minX ||
        Math.min(guide.x1, guide.x2) > bounds.maxX ||
        Math.max(guide.y1, guide.y2) < bounds.minY ||
        Math.min(guide.y1, guide.y2) > bounds.maxY
      ) {
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(guide.x1, guide.y1);
      ctx.lineTo(guide.x2, guide.y2);
      ctx.stroke();
      continue;
    }

    if (
      guide.x < bounds.minX ||
      guide.x > bounds.maxX ||
      guide.y < bounds.minY ||
      guide.y > bounds.maxY
    ) {
      continue;
    }
    ctx.font = `${Math.max(11, 12 / transform.scale)}px ${config.labelFont}`;
    ctx.textAlign = guide.align ?? "left";
    ctx.textBaseline = "middle";
    ctx.fillText(guide.text, guide.x, guide.y);
  }
  ctx.restore();
}

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
  const semanticOverview = transform.scale < 0.24;
  const semanticMidrange = transform.scale < 0.45;

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
    const semanticThreshold = hasHighlight ? 0.98 : 0.94;
    if (
      semanticOverview &&
      !isHighlighted &&
      edge.importance !== undefined &&
      edge.importance < semanticThreshold
    ) {
      continue;
    }
    const semanticAlpha = semanticOverview ? 0.55 : semanticMidrange ? 0.78 : 1;

    ctx.beginPath();
    ctx.moveTo(edge.x1, edge.y1);
    ctx.lineTo(edge.x2, edge.y2);

    if (isHighlighted) {
      ctx.strokeStyle = config.highlightColor;
      ctx.globalAlpha = Math.min(1, edge.alpha * distAlpha * 2.5);
      ctx.lineWidth = (edge.width * 2) / transform.scale;
    } else if (hasHighlight) {
      ctx.strokeStyle = edge.color || config.edgeColor;
      ctx.globalAlpha = edge.alpha * distAlpha * 0.15 * semanticAlpha;
      ctx.lineWidth = edge.width / transform.scale;
    } else {
      ctx.strokeStyle = edge.color || config.edgeColor;
      ctx.globalAlpha = edge.alpha * distAlpha * semanticAlpha;
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

type LabelBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type LabelPlacement = LabelBox & {
  x: number;
  y: number;
  align: CanvasTextAlign;
};

function labelBoxesOverlap(left: LabelBox, right: LabelBox): boolean {
  return !(
    left.right < right.left ||
    left.left > right.right ||
    left.bottom < right.top ||
    left.top > right.bottom
  );
}

function semanticLabelPlacements(
  node: RenderNode,
  textWidth: number,
  fontSize: number,
  scale: number
): LabelPlacement[] {
  const gap = 5 / scale;
  const collisionPadding = 4 / scale;
  const height = fontSize * 1.2;
  return [
    {
      x: node.x,
      y: node.y + node.radius + gap,
      align: "center",
      left: node.x - textWidth / 2 - collisionPadding,
      right: node.x + textWidth / 2 + collisionPadding,
      top: node.y + node.radius + gap - collisionPadding,
      bottom: node.y + node.radius + gap + height + collisionPadding,
    },
    {
      x: node.x,
      y: node.y - node.radius - gap - height,
      align: "center",
      left: node.x - textWidth / 2 - collisionPadding,
      right: node.x + textWidth / 2 + collisionPadding,
      top: node.y - node.radius - gap - height - collisionPadding,
      bottom: node.y - node.radius - gap + collisionPadding,
    },
    {
      x: node.x + node.radius + gap,
      y: node.y - height / 2,
      align: "left",
      left: node.x + node.radius + gap - collisionPadding,
      right: node.x + node.radius + gap + textWidth + collisionPadding,
      top: node.y - height / 2 - collisionPadding,
      bottom: node.y + height / 2 + collisionPadding,
    },
    {
      x: node.x - node.radius - gap,
      y: node.y - height / 2,
      align: "right",
      left: node.x - node.radius - gap - textWidth - collisionPadding,
      right: node.x - node.radius - gap + collisionPadding,
      top: node.y - height / 2 - collisionPadding,
      bottom: node.y + height / 2 + collisionPadding,
    },
  ];
}

function drawSemanticLabel(
  ctx: CanvasRenderingContext2D,
  node: RenderNode,
  fontSize: number,
  scale: number,
  occupied: LabelBox[],
  force: boolean
): void {
  const placements = semanticLabelPlacements(
    node,
    ctx.measureText(node.label).width,
    fontSize,
    scale
  );
  const placement =
    placements.find((candidate) => occupied.every((box) => !labelBoxesOverlap(candidate, box))) ??
    (force ? placements[0] : undefined);
  if (!placement) return;

  ctx.save();
  ctx.globalAlpha *= 0.86;
  ctx.fillStyle = "rgba(8, 8, 15, 0.9)";
  roundRect(
    ctx,
    placement.left,
    placement.top,
    placement.right - placement.left,
    placement.bottom - placement.top,
    4 / scale
  );
  ctx.fill();
  ctx.restore();
  ctx.textAlign = placement.align;
  ctx.fillText(node.label, placement.x, placement.y);
  occupied.push(placement);
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
  const denseGraphMinRadius = nodesRef.length > 60 && scale < 1.2 ? 20 : 0;
  const labelMinRadius = Math.max(denseGraphMinRadius, scale < 0.55 ? 17 : scale < 0.9 ? 14 : 0);
  const semanticImportanceThreshold = scale < 0.24 ? 0.985 : scale < 0.45 ? 0.96 : null;
  const occupied: LabelBox[] = [];
  const labelNodes =
    semanticImportanceThreshold === null
      ? nodesRef
      : [...nodesRef].sort((left, right) => {
          const leftProminent =
            left.hovered || left.selected || left.searchMatched || highlight.nodeIds.has(left.id);
          const rightProminent =
            right.hovered ||
            right.selected ||
            right.searchMatched ||
            highlight.nodeIds.has(right.id);
          return (
            Number(rightProminent) - Number(leftProminent) ||
            (right.importance ?? 0) - (left.importance ?? 0)
          );
        });

  for (const node of labelNodes) {
    if (!isInBounds(node, bounds)) continue;

    const isHighlighted = hasHighlight && highlight.nodeIds.has(node.id);
    const prominent = node.hovered || node.selected || node.searchMatched || isHighlighted;
    const semanticHub =
      semanticImportanceThreshold !== null &&
      node.importance !== undefined &&
      node.importance >= semanticImportanceThreshold;
    if (!prominent && !semanticHub && scale < LABEL_VISIBLE_SCALE) continue;
    if (!prominent && !semanticHub && node.radius < labelMinRadius) continue;

    const baseAlpha = hasHighlight && !isHighlighted ? highlight.dimAlpha : 1;

    ctx.globalAlpha = node.alpha * baseAlpha;
    if (semanticImportanceThreshold !== null) {
      drawSemanticLabel(ctx, node, fontSize, scale, occupied, prominent);
    } else {
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + node.radius + 4 / scale);
    }
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

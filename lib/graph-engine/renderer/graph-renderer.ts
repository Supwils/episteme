import type {
  RenderNode,
  RenderEdge,
  RenderGuide,
  RenderConfig,
  Transform,
  InteractionCallbacks,
  ViewBounds,
  HighlightState,
} from "./types";
import {
  DEFAULT_HIGHLIGHT,
  MIN_SCALE,
  MAX_SCALE,
  CLICK_THRESHOLD,
  TOUCH_HIT_EXTRA,
  LONG_PRESS_MS,
  DOUBLE_TAP_MS,
} from "./types";
import { SpatialGrid } from "./spatial-grid";
import type { DrawContext } from "./draw-layers";
import {
  isInBounds,
  drawEdges,
  drawGuides,
  drawNodes,
  drawLabels,
  drawEdgeLabels,
  drawHoverGlow,
  drawSelectionPulse,
  drawPathAnimation,
  drawSearchGlow,
} from "./draw-layers";

export type {
  RenderNode,
  RenderEdge,
  RenderConfig,
  InteractionCallbacks,
  ViewBounds,
  HighlightState,
} from "./types";
export { DEFAULT_HIGHLIGHT } from "./types";

export class GraphRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: RenderConfig;
  private transform: Transform = { scale: 1, offsetX: 0, offsetY: 0 };
  private dpr: number;
  private width = 0;
  private height = 0;
  private dirty = true;
  private rafId: number | null = null;
  private destroyed = false;
  private spatialGrid: SpatialGrid;
  private callbacks: InteractionCallbacks = {};

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartOffsetX = 0;
  private dragStartOffsetY = 0;

  private touches: Map<number, { x: number; y: number }> = new Map();
  private lastPinchDist: number | null = null;
  private lastPinchCenter: { x: number; y: number } | null = null;
  private longPressTimer: ReturnType<typeof setTimeout> | null = null;
  private lastTapTime = 0;
  private lastTapNode: RenderNode | null = null;

  private hoveredNode: RenderNode | null = null;
  private selectedNode: RenderNode | null = null;
  private nodesRef: RenderNode[] = [];
  private edgesRef: RenderEdge[] = [];
  private guidesRef: RenderGuide[] = [];
  private highlight: HighlightState = {
    ...DEFAULT_HIGHLIGHT,
    nodeIds: new Set(),
    edgeKeys: new Set(),
    pathNodes: [],
  };
  private crossDomainOnly = false;

  private boundMouseMove: (e: MouseEvent) => void;
  private boundMouseDown: (e: MouseEvent) => void;
  private boundMouseUp: (e: MouseEvent) => void;
  private boundWheel: (e: WheelEvent) => void;
  private boundTouchStart: (e: TouchEvent) => void;
  private boundTouchMove: (e: TouchEvent) => void;
  private boundTouchEnd: (e: TouchEvent) => void;
  private boundResize: () => void;

  constructor(canvas: HTMLCanvasElement, config: RenderConfig) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Failed to get 2D context");
    this.ctx = ctx;
    this.config = config;
    this.dpr = window.devicePixelRatio || 1;
    this.spatialGrid = new SpatialGrid(100);

    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundMouseDown = this.onMouseDown.bind(this);
    this.boundMouseUp = this.onMouseUp.bind(this);
    this.boundWheel = this.onWheel.bind(this);
    this.boundTouchStart = this.onTouchStart.bind(this);
    this.boundTouchMove = this.onTouchMove.bind(this);
    this.boundTouchEnd = this.onTouchEnd.bind(this);
    this.boundResize = this.onResize.bind(this);

    canvas.addEventListener("mousemove", this.boundMouseMove);
    canvas.addEventListener("mousedown", this.boundMouseDown);
    canvas.addEventListener("mouseup", this.boundMouseUp);
    canvas.addEventListener("mouseleave", this.boundMouseUp);
    canvas.addEventListener("wheel", this.boundWheel, { passive: false });
    canvas.addEventListener("touchstart", this.boundTouchStart, { passive: false });
    canvas.addEventListener("touchmove", this.boundTouchMove, { passive: false });
    canvas.addEventListener("touchend", this.boundTouchEnd);
    canvas.addEventListener("touchcancel", this.boundTouchEnd);
    window.addEventListener("resize", this.boundResize);

    this.onResize();
    this.startLoop();
  }

  setCallbacks(callbacks: InteractionCallbacks): void {
    this.callbacks = callbacks;
  }

  render(nodes: RenderNode[], edges: RenderEdge[]): void {
    this.nodesRef = nodes;
    this.edgesRef = edges;
    this.spatialGrid.markDirty();
    this.spatialGrid.buildIfNeeded(nodes);
    this.markDirty();
  }

  setHighlight(highlight: HighlightState): void {
    this.highlight = highlight;
    this.markDirty();
  }

  setGuides(guides: readonly RenderGuide[]): void {
    this.guidesRef = [...guides];
    this.markDirty();
  }

  // When true, only edges that bridge two different domains are drawn — turning
  // the whole graph into a pure interdisciplinary map.
  setCrossDomainOnly(value: boolean): void {
    this.crossDomainOnly = value;
    this.markDirty();
  }

  setTransform(scale: number, offsetX: number, offsetY: number): void {
    this.transform.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    this.transform.offsetX = offsetX;
    this.transform.offsetY = offsetY;
    this.markDirty();
  }

  screenToWorld(sx: number, sy: number): { x: number; y: number } {
    const { scale, offsetX, offsetY } = this.transform;
    return {
      x: (sx - offsetX) / scale,
      y: (sy - offsetY) / scale,
    };
  }

  worldToScreen(wx: number, wy: number): { x: number; y: number } {
    const { scale, offsetX, offsetY } = this.transform;
    return {
      x: wx * scale + offsetX,
      y: wy * scale + offsetY,
    };
  }

  getNodeAtPosition(
    sx: number,
    sy: number,
    nodes: RenderNode[],
    extraRadius = 0
  ): RenderNode | null {
    const world = this.screenToWorld(sx, sy);
    const worldExtraRadius = extraRadius / this.transform.scale;
    const maxRadius = this.getMaxNodeRadius(nodes) + worldExtraRadius;
    const candidates = this.spatialGrid.query(world.x, world.y, maxRadius);

    let closest: RenderNode | null = null;
    let closestDist = Infinity;

    for (let i = 0; i < candidates.length; i++) {
      const node = candidates[i]!;
      const dx = node.x - world.x;
      const dy = node.y - world.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= node.radius + worldExtraRadius && dist < closestDist) {
        closest = node;
        closestDist = dist;
      }
    }
    return closest;
  }

  destroy(): void {
    this.destroyed = true;
    this.clearLongPressTimer();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.canvas.removeEventListener("mousemove", this.boundMouseMove);
    this.canvas.removeEventListener("mousedown", this.boundMouseDown);
    this.canvas.removeEventListener("mouseup", this.boundMouseUp);
    this.canvas.removeEventListener("mouseleave", this.boundMouseUp);
    this.canvas.removeEventListener("wheel", this.boundWheel);
    this.canvas.removeEventListener("touchstart", this.boundTouchStart);
    this.canvas.removeEventListener("touchmove", this.boundTouchMove);
    this.canvas.removeEventListener("touchend", this.boundTouchEnd);
    this.canvas.removeEventListener("touchcancel", this.boundTouchEnd);
    window.removeEventListener("resize", this.boundResize);
  }

  private startLoop(): void {
    if (this.destroyed || this.rafId !== null) return;
    const frame = () => {
      if (this.dirty) {
        this.dirty = false;
        this.drawFrame();
      }
      // Idle when nothing changed (drawFrame re-dirties itself while an
      // animation layer is active); restarted on demand via markDirty().
      this.rafId = this.dirty ? requestAnimationFrame(frame) : null;
    };
    this.rafId = requestAnimationFrame(frame);
  }

  private markDirty(): void {
    this.dirty = true;
    if (!this.destroyed && this.rafId === null) this.startLoop();
  }

  private getDrawContext(): DrawContext {
    return {
      ctx: this.ctx,
      config: this.config,
      transform: this.transform,
      highlight: this.highlight,
      nodesRef: this.nodesRef,
      edgesRef: this.edgesRef,
      guidesRef: this.guidesRef,
      crossDomainOnly: this.crossDomainOnly,
      markDirty: () => {
        this.markDirty();
      },
    };
  }

  private drawFrame(): void {
    const { ctx, width, height, dpr, config } = this;
    const { scale, offsetX, offsetY } = this.transform;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    const bounds = this.getViewBounds();
    const now = performance.now();
    const dc = this.getDrawContext();

    drawGuides(dc, bounds);
    drawEdges(dc, bounds);
    drawNodes(dc, bounds);
    drawLabels(dc, bounds);
    drawEdgeLabels(dc, bounds);

    for (let i = 0; i < this.nodesRef.length; i++) {
      const node = this.nodesRef[i]!;
      if (!isInBounds(node, bounds)) continue;
      if (node.searchMatched) drawSearchGlow(dc, node, now);
      if (node.hovered) drawHoverGlow(dc, node);
      if (node.selected) drawSelectionPulse(dc, node, now);
    }

    drawPathAnimation(dc, now);

    ctx.restore();
  }

  private getViewBounds(): ViewBounds {
    const tl = this.screenToWorld(0, 0);
    const br = this.screenToWorld(this.width, this.height);
    return { minX: tl.x - 100, minY: tl.y - 100, maxX: br.x + 100, maxY: br.y + 100 };
  }

  private getMaxNodeRadius(nodes: readonly RenderNode[]): number {
    let max = 20;
    for (const node of nodes) {
      if (node.radius > max) max = node.radius;
    }
    return max;
  }

  // --- Mouse interactions ---

  private onMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (this.isDragging) {
      this.transform.offsetX = this.dragStartOffsetX + (sx - this.dragStartX);
      this.transform.offsetY = this.dragStartOffsetY + (sy - this.dragStartY);
      this.markDirty();
      this.callbacks.onPan?.(this.transform.offsetX, this.transform.offsetY);
      return;
    }

    const node = this.getNodeAtPosition(sx, sy, this.nodesRef);
    if (node !== this.hoveredNode) {
      if (this.hoveredNode) this.hoveredNode.hovered = false;
      this.hoveredNode = node;
      if (node) node.hovered = true;
      this.markDirty();
      this.callbacks.onNodeHover?.(node);
      this.canvas.style.cursor = node ? "pointer" : "default";
    }
  }

  private onMouseDown(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.dragStartX = e.clientX - rect.left;
    this.dragStartY = e.clientY - rect.top;
    this.dragStartOffsetX = this.transform.offsetX;
    this.dragStartOffsetY = this.transform.offsetY;
    this.isDragging = true;
  }

  private onMouseUp(e: MouseEvent): void {
    if (this.isDragging) {
      const rect = this.canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const moved = Math.abs(sx - this.dragStartX) + Math.abs(sy - this.dragStartY);

      if (moved < CLICK_THRESHOLD) {
        const node = this.getNodeAtPosition(sx, sy, this.nodesRef);
        if (this.selectedNode) this.selectedNode.selected = false;
        if (node) {
          node.selected = node !== this.selectedNode;
          this.selectedNode = node.selected ? node : null;
        } else {
          this.selectedNode = null;
        }
        this.markDirty();
        this.callbacks.onNodeSelect?.(this.selectedNode);
      }
    }
    this.isDragging = false;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const worldBefore = this.screenToWorld(sx, sy);
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, this.transform.scale * factor));

    this.transform.scale = newScale;
    this.transform.offsetX = sx - worldBefore.x * newScale;
    this.transform.offsetY = sy - worldBefore.y * newScale;
    this.markDirty();
    this.callbacks.onZoom?.(newScale, this.transform.offsetX, this.transform.offsetY);
  }

  // --- Touch interactions ---

  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]!;
      this.touches.set(t.identifier, { x: t.clientX, y: t.clientY });
    }
    if (e.touches.length === 1) {
      const t = e.touches[0]!;
      const rect = this.canvas.getBoundingClientRect();
      this.dragStartX = t.clientX - rect.left;
      this.dragStartY = t.clientY - rect.top;
      this.dragStartOffsetX = this.transform.offsetX;
      this.dragStartOffsetY = this.transform.offsetY;
      this.isDragging = true;

      const sx = this.dragStartX;
      const sy = this.dragStartY;
      this.longPressTimer = setTimeout(() => {
        const node = this.getNodeAtPosition(sx, sy, this.nodesRef, TOUCH_HIT_EXTRA);
        this.callbacks.onLongPress?.(node, t.clientX, t.clientY);
        this.longPressTimer = null;
      }, LONG_PRESS_MS);
    }
    if (e.touches.length === 2) {
      this.isDragging = false;
      this.clearLongPressTimer();
      this.lastPinchDist = this.pinchDist(e);
      this.lastPinchCenter = this.pinchCenter(e);
    }
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]!;
      this.touches.set(t.identifier, { x: t.clientX, y: t.clientY });
    }

    if (e.touches.length === 1 && this.isDragging) {
      const t = e.touches[0]!;
      const rect = this.canvas.getBoundingClientRect();
      const sx = t.clientX - rect.left;
      const sy = t.clientY - rect.top;
      const moved = Math.abs(sx - this.dragStartX) + Math.abs(sy - this.dragStartY);
      if (moved > CLICK_THRESHOLD) {
        this.clearLongPressTimer();
      }
      this.transform.offsetX = this.dragStartOffsetX + (sx - this.dragStartX);
      this.transform.offsetY = this.dragStartOffsetY + (sy - this.dragStartY);
      this.markDirty();
      this.callbacks.onPan?.(this.transform.offsetX, this.transform.offsetY);
    }

    if (e.touches.length === 2) {
      const dist = this.pinchDist(e);
      const center = this.pinchCenter(e);
      if (this.lastPinchDist !== null && this.lastPinchCenter !== null) {
        const rect = this.canvas.getBoundingClientRect();
        const cx = center.x - rect.left;
        const cy = center.y - rect.top;
        const factor = dist / this.lastPinchDist;
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, this.transform.scale * factor));

        const worldBefore = this.screenToWorld(cx, cy);
        this.transform.scale = newScale;
        this.transform.offsetX = cx - worldBefore.x * newScale;
        this.transform.offsetY = cy - worldBefore.y * newScale;

        this.transform.offsetX += center.x - this.lastPinchCenter.x;
        this.transform.offsetY += center.y - this.lastPinchCenter.y;

        this.markDirty();
        this.callbacks.onZoom?.(newScale, this.transform.offsetX, this.transform.offsetY);
      }
      this.lastPinchDist = dist;
      this.lastPinchCenter = center;
    }
  }

  private onTouchEnd(e: TouchEvent): void {
    const hadSingleFinger = e.touches.length === 0 && e.changedTouches.length === 1;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]!;
      this.touches.delete(t.identifier);
    }
    if (e.touches.length < 2) {
      this.lastPinchDist = null;
      this.lastPinchCenter = null;
    }

    if (hadSingleFinger) {
      const t = e.changedTouches[0]!;
      const rect = this.canvas.getBoundingClientRect();
      const sx = t.clientX - rect.left;
      const sy = t.clientY - rect.top;
      const moved = Math.abs(sx - this.dragStartX) + Math.abs(sy - this.dragStartY);

      if (moved < CLICK_THRESHOLD) {
        const node = this.getNodeAtPosition(sx, sy, this.nodesRef, TOUCH_HIT_EXTRA);
        const now = Date.now();
        const isDoubleTap =
          now - this.lastTapTime < DOUBLE_TAP_MS &&
          node != null &&
          this.lastTapNode?.id === node?.id;

        if (isDoubleTap) {
          this.clearLongPressTimer();
          this.callbacks.onDoubleTap?.(node);
          this.lastTapTime = 0;
          this.lastTapNode = null;
        } else {
          this.lastTapTime = now;
          this.lastTapNode = node;

          if (this.selectedNode) this.selectedNode.selected = false;
          if (node) {
            node.selected = node !== this.selectedNode;
            this.selectedNode = node.selected ? node : null;
          } else {
            this.selectedNode = null;
          }
          this.markDirty();
          this.callbacks.onNodeSelect?.(this.selectedNode);
        }
      }
    }

    if (e.touches.length === 0) {
      this.isDragging = false;
      this.clearLongPressTimer();
    }
  }

  private clearLongPressTimer(): void {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  private onResize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.markDirty();
  }

  private pinchDist(e: TouchEvent): number {
    const t0 = e.touches[0]!;
    const t1 = e.touches[1]!;
    const dx = t0.clientX - t1.clientX;
    const dy = t0.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private pinchCenter(e: TouchEvent): { x: number; y: number } {
    const t0 = e.touches[0]!;
    const t1 = e.touches[1]!;
    return {
      x: (t0.clientX + t1.clientX) / 2,
      y: (t0.clientY + t1.clientY) / 2,
    };
  }
}

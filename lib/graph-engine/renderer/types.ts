export type RenderNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  domain: string;
  type: string;
  radius: number;
  color: string;
  hovered: boolean;
  selected: boolean;
  searchMatched: boolean;
  alpha: number;
  /** Percentile rank (0..1) used for semantic level-of-detail. */
  importance?: number;
};

export type RenderEdge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
  alpha: number;
  sourceId?: string;
  targetId?: string;
  /** The relationship label ("why" two ideas connect), if the edge carries one. */
  label?: string;
  /** True when the edge bridges two different knowledge domains. */
  crossDomain?: boolean;
  /** Endpoint prominence used to reduce overview clutter. */
  importance?: number;
};

export type RenderGuide =
  | {
      kind: "ellipse";
      x: number;
      y: number;
      radiusX: number;
      radiusY: number;
      color: string;
      alpha: number;
      width: number;
      dash?: number[];
    }
  | {
      kind: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
      alpha: number;
      width: number;
      dash?: number[];
    }
  | {
      kind: "label";
      x: number;
      y: number;
      text: string;
      color: string;
      alpha: number;
      align?: CanvasTextAlign;
    };

export type RenderConfig = {
  nodeRadius: Record<string, number>;
  domainColors: Record<string, string>;
  edgeColor: string;
  backgroundColor: string;
  labelFont: string;
  labelColor: string;
  highlightColor: string;
};

export type Transform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export type InteractionCallbacks = {
  onNodeHover?: (node: RenderNode | null) => void;
  onNodeSelect?: (node: RenderNode | null) => void;
  onPan?: (offsetX: number, offsetY: number) => void;
  onZoom?: (scale: number, offsetX: number, offsetY: number) => void;
  onLongPress?: (node: RenderNode | null, screenX: number, screenY: number) => void;
  onDoubleTap?: (node: RenderNode | null) => void;
};

export type ViewBounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type HighlightState = {
  nodeIds: Set<string>;
  edgeKeys: Set<string>;
  pathNodes: string[];
  dimAlpha: number;
};

export const DEFAULT_HIGHLIGHT: HighlightState = {
  nodeIds: new Set(),
  edgeKeys: new Set(),
  pathNodes: [],
  dimAlpha: 1,
};

export const MIN_SCALE = 0.05;
export const MAX_SCALE = 5;
export const LABEL_VISIBLE_SCALE = 0.3;
export const SMALL_NODE_HIDE_SCALE = 0.15;
export const HOVER_GLOW_EXTRA = 8;
export const PULSE_SPEED = 0.003;
export const PULSE_MIN = 1.0;
export const PULSE_MAX = 1.6;
export const EDGE_ALPHA_DISTANCE = 2000;
export const CLICK_THRESHOLD = 5;
export const TOUCH_HIT_EXTRA = 10;
export const LONG_PRESS_MS = 500;
export const DOUBLE_TAP_MS = 300;

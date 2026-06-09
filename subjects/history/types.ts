export interface HistoryEvent {
  year: number;
  title: string;
  desc: string;
  longDesc: string;
  era: string;
  region: string;
  cat: string;
  references: string[];
}

export interface Figure {
  name: string;
  birth: number | null;
  death: number | null;
  title: string;
  desc: string;
  longDesc: string;
  era: string;
  region: string;
  domain: string;
  quote: string;
  impact: string[];
  achievements: string[];
  controversies: string[];
  keyEvents: FigureKeyEvents[];
  references: string[];
}

export interface FigureKeyEvents {
  year: number;
  title: string;
}

export interface Era {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  desc: string;
  longDesc: string;
  color: string;
  icon: string;
  highlights: string[];
  quote: { text: string; author: string };
  keyFigures: string[];
  keyEvents: string[];
  achievements: string[];
  legacy: string;
  references: string[];
}

export interface AtlasScene {
  title: string;
  body: string;
}

export interface AtlasTopic {
  id: string;
  name: string;
  x: number;
  y: number;
  scenes: AtlasScene[];
}

export interface AtlasEra {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  hue: string;
  topics: AtlasTopic[];
}

export interface BreadcrumbItem {
  label: string;
  action: (() => void) | null;
}

export interface AtlasState {
  level: number;
  activeEra: AtlasEra | null;
  activeTopic: AtlasTopic | null;
  pan: { x: number; y: number };
  zoom: number;
  isPanning: boolean;
  panStart: { x: number; y: number };
  pointerStart: { x: number; y: number } | null;
  suppressClick: boolean;
  dirty: boolean;
  rafId: number | null;
  hoveredEra: string | null;
  hoveredTopic: string | null;
  clickPulse: { x: number; y: number; time: number } | null;
  W: number;
  H: number;
  scaleRatio: number;
  showHelp: boolean;
  touchStartTime: number;
  touchStartPos: { x: number; y: number } | null;
}

export interface NodeBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type CleanupFn = () => void;
export type RenderFn = (app: HTMLElement) => CleanupFn | void;
export type AsyncRenderFn = (app: HTMLElement) => Promise<CleanupFn | void>;

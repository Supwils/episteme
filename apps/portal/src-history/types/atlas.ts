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

export interface ClickPulse {
  x: number;
  y: number;
  time: number;
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
  clickPulse: ClickPulse | null;
  W: number;
  H: number;
  scaleRatio: number;
  showHelp: boolean;
  touchStartTime: number;
  touchStartPos: { x: number; y: number } | null;
}

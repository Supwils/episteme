export type LayoutConfig = {
  repulsionStrength: number;
  attractionStrength: number;
  centerGravity: number;
  domainClusterStrength: number;
  damping: number;
  minDistance: number;
  maxIterations: number;
  theta: number;
  coolingFactor: number;
  clusterMode: boolean;
  clusterCenters: Record<string, { x: number; y: number }>;
  clusterStrength: number;
};

export type LayoutNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  domain: string;
  fixed?: boolean;
};

export type LayoutEdge = {
  source: string;
  target: string;
  strength?: number;
};

export const DEFAULT_CONFIG: LayoutConfig = {
  repulsionStrength: 500,
  attractionStrength: 0.01,
  centerGravity: 0.1,
  domainClusterStrength: 0.3,
  damping: 0.9,
  minDistance: 30,
  maxIterations: 300,
  theta: 0.8,
  coolingFactor: 0.97,
  clusterMode: false,
  clusterCenters: {},
  clusterStrength: 0.5,
};

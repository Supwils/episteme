import type { KnowledgeStageId } from "@/lib/knowledge-continuum";
import type { KnowledgeSpineAtlas } from "@/lib/knowledge-spine-atlas";

export const SPINE_ORBIT_VIEWBOX = {
  width: 1000,
  height: 700,
  centerX: 500,
} as const;

const BASE_LEVEL_Y = 590;
const LEVEL_GAP = 116;
const BASE_RADIUS = 195;
const RADIUS_STEP = 32;
const DEPTH_TILT = 24;

export interface KnowledgeSpineOrbitPoint {
  domainId: string;
  domainIndex: number;
  level: KnowledgeStageId;
  nodeId: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  radius: number;
}

export interface KnowledgeSpineOrbitProjection {
  points: readonly KnowledgeSpineOrbitPoint[];
  pointsByCoordinate: ReadonlyMap<string, KnowledgeSpineOrbitPoint>;
}

export function orbitCoordinateKey(domainId: string, level: KnowledgeStageId): string {
  return `${domainId}:${level}`;
}

export function rotationForOrbitDomain(domainIndex: number, domainCount: number): number {
  return 90 - (domainIndex / domainCount) * 360;
}

export function projectKnowledgeSpineOrbit(
  atlas: KnowledgeSpineAtlas,
  rotationDegrees: number,
  depthScale = 1
): KnowledgeSpineOrbitProjection {
  const rotation = (rotationDegrees * Math.PI) / 180;
  const normalizedDepthScale = Math.max(0.45, Math.min(1.65, depthScale));
  const points: KnowledgeSpineOrbitPoint[] = [];
  const pointsByCoordinate = new Map<string, KnowledgeSpineOrbitPoint>();

  atlas.rows.forEach((row, domainIndex) => {
    const domainAngle = (domainIndex / atlas.rows.length) * Math.PI * 2 + rotation;
    const z = Math.sin(domainAngle);

    row.steps.forEach((step) => {
      const radius = BASE_RADIUS + (6 - step.level) * RADIUS_STEP;
      const point: KnowledgeSpineOrbitPoint = {
        domainId: row.domainId,
        domainIndex,
        level: step.level,
        nodeId: step.nodeId,
        x: SPINE_ORBIT_VIEWBOX.centerX + Math.cos(domainAngle) * radius,
        y:
          BASE_LEVEL_Y -
          (step.level - 1) * LEVEL_GAP +
          z * DEPTH_TILT * normalizedDepthScale,
        z,
        scale: 0.72 + (z + 1) * 0.15,
        opacity: 0.34 + (z + 1) * 0.3,
        radius,
      };
      points.push(point);
      pointsByCoordinate.set(orbitCoordinateKey(row.domainId, step.level), point);
    });
  });

  return {
    points: points.sort(
      (left, right) =>
        left.z - right.z ||
        left.level - right.level ||
        left.domainIndex - right.domainIndex
    ),
    pointsByCoordinate,
  };
}

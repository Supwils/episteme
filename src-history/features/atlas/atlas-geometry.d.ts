import type { AtlasEra, AtlasTopic } from "@/src-history/types/atlas";

export function scaleValue(value: number, scaleRatio: number): number;
export function hitTestNodes(
  nodes: readonly AtlasTopic[],
  mx: number,
  my: number,
  radius: number,
  scaleRatio: number
): AtlasTopic | null;
export function hitTestNodes(
  nodes: readonly AtlasEra[],
  mx: number,
  my: number,
  radius: number,
  scaleRatio: number
): AtlasEra | null;
export function isNearNodes(
  nodes: readonly AtlasTopic[],
  mx: number,
  my: number,
  radius: number,
  scaleRatio: number
): boolean;
export function getNodeBounds(
  nodes: readonly AtlasTopic[],
  scaleRatio: number
): { minX: number; maxX: number; minY: number; maxY: number };

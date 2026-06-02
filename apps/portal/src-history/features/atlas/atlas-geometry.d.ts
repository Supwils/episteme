export function scaleValue(value: number, scaleRatio: number): number;
export function hitTestNodes(nodes: readonly any[], mx: number, my: number, radius: number, scaleRatio: number): any | null;
export function isNearNodes(nodes: readonly any[], mx: number, my: number, radius: number, scaleRatio: number): boolean;
export function getNodeBounds(nodes: readonly any[], scaleRatio: number): { minX: number; maxX: number; minY: number; maxY: number };

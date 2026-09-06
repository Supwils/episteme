export type Point = { x: number; y: number };

export function towardVanishing(point: Point, vanishing: Point, depth: number): Point {
  return {
    x: point.x + (vanishing.x - point.x) * depth,
    y: point.y + (vanishing.y - point.y) * depth,
  };
}

export function perspectiveBox(
  vanishing: Point,
  depth = 0.45
): {
  front: Point[];
  back: Point[];
} {
  const front = [
    { x: 70, y: 70 },
    { x: 190, y: 70 },
    { x: 190, y: 150 },
    { x: 70, y: 150 },
  ];
  return { front, back: front.map((point) => towardVanishing(point, vanishing, depth)) };
}

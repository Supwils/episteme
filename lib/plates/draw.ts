/**
 * 标本图版的绘图原语（T-DESIGN-01g）。所有生成器在 400 × 300 的图版上作画，
 * 只产出路径字符串，不碰 DOM——服务端与浏览器得到同一张图。
 */
export const PLATE_WIDTH = 400;
export const PLATE_HEIGHT = 300;

/**
 * 线的三种身份：major 主线（前景墨）、minor 辅线（淡墨）、accent 点睛（簇颜料）。
 * 一张图版里 accent 只画那一处要看的东西。
 */
export type StrokeRole = "major" | "minor" | "accent";

export type PlateStroke = {
  d: string;
  role: StrokeRole;
  /** Filled shapes (dots, arrowheads) instead of a stroke. */
  fill?: boolean;
  dashed?: boolean;
};

export type Point = readonly [number, number];

export type PlateGenerator = (random: () => number) => PlateStroke[];

export const n = (value: number) => Number(value.toFixed(1));

export function stroke(d: string, role: StrokeRole = "major", extra: Partial<PlateStroke> = {}) {
  return { d, role, ...extra } satisfies PlateStroke;
}

export function polyline(points: readonly Point[], close = false): string {
  const body = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${n(x)} ${n(y)}`).join("");
  return close ? `${body}Z` : body;
}

/** Catmull-Rom through the points, emitted as cubic Béziers. */
export function smooth(points: readonly Point[], close = false): string {
  if (points.length < 3) return polyline(points, close);
  const at = (i: number): Point =>
    close
      ? points[(i + points.length) % points.length]!
      : points[Math.max(0, Math.min(points.length - 1, i))]!;
  const last = close ? points.length : points.length - 1;
  let d = `M${n(points[0]![0])} ${n(points[0]![1])}`;
  for (let i = 0; i < last; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(p2[0])} ${n(p2[1])}`;
  }
  return close ? `${d}Z` : d;
}

export function circle(cx: number, cy: number, r: number): string {
  return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0`;
}

/** Ellipse rotated by `rotation` radians, sampled as a smooth closed curve. */
export function ellipse(cx: number, cy: number, rx: number, ry: number, rotation = 0): string {
  const points: Point[] = [];
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 2;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    points.push([
      cx + x * Math.cos(rotation) - y * Math.sin(rotation),
      cy + x * Math.sin(rotation) + y * Math.cos(rotation),
    ]);
  }
  return smooth(points, true);
}

/** Samples y = f(x) across [x0, x1] into a smooth path. */
export function plot(f: (x: number) => number, x0: number, x1: number, steps = 40): string {
  const points: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    points.push([x, f(x)]);
  }
  return smooth(points);
}

/** A small filled dot, for nodes and marks. */
export function dot(x: number, y: number, r = 2.2): PlateStroke {
  return { d: circle(x, y, r), role: "accent", fill: true };
}

/** Arrowhead at `tip`, pointing along the direction from `from`. */
export function arrowhead(from: Point, tip: Point, size = 6): string {
  const angle = Math.atan2(tip[1] - from[1], tip[0] - from[0]);
  const wing = (offset: number): Point => [
    tip[0] - size * Math.cos(angle + offset),
    tip[1] - size * Math.sin(angle + offset),
  ];
  return polyline([wing(0.45), tip, wing(-0.45)]);
}

/** Engraver's frame: a hairline border with corner ticks. */
export function frame(inset = 10): PlateStroke[] {
  const [x0, y0, x1, y1] = [inset, inset, PLATE_WIDTH - inset, PLATE_HEIGHT - inset];
  const tick = 6;
  return [
    stroke(
      polyline(
        [
          [x0, y0],
          [x1, y0],
          [x1, y1],
          [x0, y1],
        ],
        true
      ),
      "minor"
    ),
    stroke(
      [
        polyline([
          [x0 - tick, y0],
          [x0, y0],
          [x0, y0 - tick],
        ]),
        polyline([
          [x1 + tick, y0],
          [x1, y0],
          [x1, y0 - tick],
        ]),
        polyline([
          [x1 + tick, y1],
          [x1, y1],
          [x1, y1 + tick],
        ]),
        polyline([
          [x0 - tick, y1],
          [x0, y1],
          [x0, y1 + tick],
        ]),
      ].join(""),
      "minor"
    ),
  ];
}

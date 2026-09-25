// 宇宙与自然：物理 · 宇宙 · 地球科学 · 化学
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  circle,
  dot,
  ellipse,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type PlateStroke,
  type Point,
} from "./draw";

/** 物理：两个相干波源的干涉，外加一组偶极场线。 */
export const physics: PlateGenerator = (random) => {
  const gap = between(random, 70, 100);
  const a: Point = [W / 2 - gap / 2, H / 2];
  const b: Point = [W / 2 + gap / 2, H / 2];
  const out: PlateStroke[] = [];
  for (let r = 14, i = 0; r < 260; r += 16, i++) {
    const role = i % 2 === 0 ? "major" : "minor";
    out.push(stroke(circle(a[0], a[1], r) + circle(b[0], b[1], r), role));
  }
  for (const bend of [30, 60, 95]) {
    const up = smooth([a, [W / 2, H / 2 - bend], b]);
    const down = smooth([a, [W / 2, H / 2 + bend], b]);
    out.push(stroke(up + down, "accent"));
  }
  out.push(dot(a[0], a[1], 3.2), dot(b[0], b[1], 3.2));
  return out;
};

/** 宇宙：同一轨道的近日点在进动，外圈是几条同心轨道。 */
export const cosmology: PlateGenerator = (random) => {
  const sun: Point = [W / 2 + 36, H / 2];
  const out: PlateStroke[] = [];
  const turns = 9;
  const start = between(random, 2.6, 3.4);
  for (let i = 0; i < turns; i++) {
    const rotation = start + (i - (turns - 1) / 2) * 0.14;
    const rx = 104;
    const ry = 72;
    const c = Math.sqrt(rx * rx - ry * ry);
    // The sun sits at one focus, so each ellipse's center is offset along its axis.
    const cx = sun[0] + c * Math.cos(rotation);
    const cy = sun[1] + c * Math.sin(rotation);
    out.push(stroke(ellipse(cx, cy, rx, ry, rotation), i === turns - 1 ? "accent" : "minor"));
  }
  for (const r of [34, 52]) out.push(stroke(circle(sun[0], sun[1], r), "major"));
  out.push(dot(sun[0], sun[1], 4));
  return out;
};

/** 地球科学：两座山的等高线，下方是起伏的地层。 */
export const earthScience: PlateGenerator = (random) => {
  const out: PlateStroke[] = [];
  const peaks: Point[] = [
    [between(random, 110, 150), between(random, 90, 120)],
    [between(random, 250, 290), between(random, 110, 140)],
  ];
  const phase = Array.from({ length: 3 }, () => between(random, 0, Math.PI * 2));
  peaks.forEach(([px, py], p) => {
    for (let level = 1; level <= 6; level++) {
      const points: Point[] = [];
      for (let i = 0; i < 18; i++) {
        const t = (i / 18) * Math.PI * 2;
        const wobble = 1 + 0.12 * Math.sin(3 * t + phase[p]!) + 0.06 * Math.sin(5 * t + phase[2]!);
        const r = level * 12.5 * wobble;
        points.push([px + r * 1.3 * Math.cos(t), py + r * Math.sin(t)]);
      }
      out.push(
        stroke(smooth(points, true), level === 4 ? "accent" : level % 2 ? "minor" : "major")
      );
    }
  });
  for (let layer = 0; layer < 5; layer++) {
    const y0 = 214 + layer * 15;
    const points: Point[] = [];
    for (let x = 0; x <= W; x += 40) {
      points.push([x, y0 + 6 * Math.sin(x / 70 + phase[0]! + layer * 0.6)]);
    }
    out.push(stroke(smooth(points), layer === 0 ? "major" : "minor"));
  }
  return out;
};

/** 化学：六角晶格，几个格点上画出 p 轨道的哑铃叶。 */
export const chemistry: PlateGenerator = (random) => {
  const out: PlateStroke[] = [];
  const size = 34;
  const dx = size * Math.sqrt(3);
  const hexes: string[] = [];
  const vertices: Point[] = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 8; col++) {
      const cx = 20 + col * dx + (row % 2 ? dx / 2 : 0);
      const cy = 20 + row * size * 1.5;
      const corners = Array.from({ length: 6 }, (_, k): Point => {
        const t = (Math.PI / 3) * k + Math.PI / 6;
        return [cx + size * Math.cos(t), cy + size * Math.sin(t)];
      });
      hexes.push(polyline(corners, true));
      vertices.push(corners[0]!);
    }
  }
  out.push(stroke(hexes.join(""), "minor"));
  for (let i = 0; i < 5; i++) {
    const [x, y] = vertices[Math.floor(random() * vertices.length)]!;
    const angle = between(random, 0, Math.PI);
    const lobe = (sign: number) =>
      ellipse(x + sign * 14 * Math.cos(angle), y + sign * 14 * Math.sin(angle), 14, 7, angle);
    out.push(stroke(lobe(1) + lobe(-1), "accent"), dot(x, y, 2.4));
  }
  return out;
};

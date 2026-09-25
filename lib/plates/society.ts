// 社会与制度：社会学 · 经济学 · 政治学 · 法学
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  dot,
  plot,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type PlateStroke,
  type Point,
} from "./draw";

/** 社会学：小世界网络——环形近邻格 + 几条随机捷径（Watts–Strogatz）。 */
export const sociology: PlateGenerator = (random) => {
  const count = 28;
  const [cx, cy, r] = [W / 2, H / 2, 118];
  const nodes = Array.from({ length: count }, (_, i): Point => {
    const t = (i / count) * Math.PI * 2;
    return [cx + r * 1.25 * Math.cos(t), cy + r * Math.sin(t)];
  });
  const ring: string[] = [];
  const shortcuts: string[] = [];
  nodes.forEach((node, i) => {
    for (const k of [1, 2]) {
      const target = nodes[(i + k) % count]!;
      if (k === 2 && random() < 0.16) {
        // A rewired edge jumps across the ring; bow it toward the center.
        const far = nodes[(i + 6 + Math.floor(random() * (count - 12))) % count]!;
        const bow: Point = [
          ((node[0] + far[0]) / 2) * 0.7 + cx * 0.3,
          ((node[1] + far[1]) / 2) * 0.7 + cy * 0.3,
        ];
        shortcuts.push(smooth([node, bow, far]));
      } else {
        ring.push(polyline([node, target]));
      }
    }
  });
  return [
    stroke(ring.join(""), "minor"),
    stroke(shortcuts.join(""), "accent"),
    ...nodes.map(([x, y]) => ({ ...dot(x, y, 2.4), role: "major" as const })),
  ];
};

/** 经济学：供给与需求交于均衡点，虚线投到两轴。 */
export const economics: PlateGenerator = (random) => {
  const [x0, y0, x1, y1] = [40, 40, W - 40, H - 40];
  const shift = between(random, -20, 20);
  const demand = (x: number) => y0 + 12 + ((x - x0) / (x1 - x0)) ** 0.8 * (y1 - y0 - 30) + shift;
  const supply = (x: number) => y1 - 12 - ((x - x0) / (x1 - x0)) ** 1.25 * (y1 - y0 - 30) + shift;
  let ex = x0;
  for (let x = x0; x <= x1; x += 0.5) {
    if (Math.abs(demand(x) - supply(x)) < Math.abs(demand(ex) - supply(ex))) ex = x;
  }
  const ey = demand(ex);
  const shifted = (x: number) => supply(x) - 34;
  return [
    stroke(
      polyline([
        [x0, y0 - 10],
        [x0, y1],
        [x1 + 10, y1],
      ]),
      "minor"
    ),
    stroke(plot(shifted, x0 + 20, x1 - 10), "minor", { dashed: true }),
    stroke(plot(demand, x0 + 10, x1 - 10), "major"),
    stroke(plot(supply, x0 + 10, x1 - 10), "major"),
    stroke(
      polyline([
        [x0, ey],
        [ex, ey],
        [ex, y1],
      ]),
      "accent",
      { dashed: true }
    ),
    dot(ex, ey, 4),
  ];
};

/** 政治学：Voronoi 疆域划分——每个治所管辖离它最近的土地。 */
export const politicalScience: PlateGenerator = (random) => {
  const sites = Array.from(
    { length: 13 },
    (): Point => [between(random, 30, W - 30), between(random, 30, H - 30)]
  );
  const cells = sites.map((site) => {
    let cell: Point[] = [
      [0, 0],
      [W, 0],
      [W, H],
      [0, H],
    ];
    for (const other of sites) {
      if (other === site) continue;
      cell = clipToCloserHalf(cell, site, other);
    }
    return cell;
  });
  const capital = Math.floor(random() * sites.length);
  return [
    stroke(cells.map((cell) => polyline(cell, true)).join(""), "major"),
    stroke(polyline(cells[capital]!, true), "accent"),
    ...sites.map(([x, y], i) => ({
      ...dot(x, y, i === capital ? 3.4 : 2),
      role: i === capital ? ("accent" as const) : ("minor" as const),
    })),
  ];
};

/** Sutherland–Hodgman against the half-plane closer to `site` than to `other`. */
function clipToCloserHalf(polygon: Point[], site: Point, other: Point): Point[] {
  const [nx, ny] = [other[0] - site[0], other[1] - site[1]];
  const c = (other[0] ** 2 + other[1] ** 2 - site[0] ** 2 - site[1] ** 2) / 2;
  const inside = (p: Point) => p[0] * nx + p[1] * ny <= c;
  const out: Point[] = [];
  polygon.forEach((current, i) => {
    const previous = polygon[(i + polygon.length - 1) % polygon.length]!;
    const crossing = (): Point => {
      const [dx, dy] = [current[0] - previous[0], current[1] - previous[1]];
      const t = (c - previous[0] * nx - previous[1] * ny) / (dx * nx + dy * ny);
      return [previous[0] + t * dx, previous[1] + t * dy];
    };
    if (inside(current)) {
      if (!inside(previous)) out.push(crossing());
      out.push(current);
    } else if (inside(previous)) {
      out.push(crossing());
    }
  });
  return out;
}

/** 法学：规范的层级——承认规则在根，宪法、法律、条例、判决逐层展开。 */
export const law: PlateGenerator = (random) => {
  const rows = [1, 3, 6, 11];
  const lines: string[] = [];
  const boxes: string[] = [];
  let previous: Point[] = [];
  const out: PlateStroke[] = [];
  rows.forEach((count, depth) => {
    const y = 44 + depth * 72;
    const width = W - 60;
    const row = Array.from(
      { length: count },
      (_, i): Point => [30 + (width * (i + 0.5)) / count, y]
    );
    row.forEach(([x, yy], i) => {
      const w = depth === 0 ? 70 : Math.min(54, width / count - 8);
      const box = polyline(
        [
          [x - w / 2, yy - 10],
          [x + w / 2, yy - 10],
          [x + w / 2, yy + 10],
          [x - w / 2, yy + 10],
        ],
        true
      );
      if (depth === 0) out.push(stroke(box, "accent"));
      else boxes.push(box);
      if (previous.length > 0) {
        const parent =
          previous[
            Math.min(
              previous.length - 1,
              Math.floor((i / count) * previous.length + random() * 0.4)
            )
          ]!;
        lines.push(
          polyline([
            [parent[0], parent[1] + 10],
            [parent[0], (parent[1] + yy) / 2],
            [x, (parent[1] + yy) / 2],
            [x, yy - 10],
          ])
        );
      }
    });
    previous = row;
  });
  return [stroke(lines.join(""), "minor"), stroke(boxes.join(""), "major"), ...out];
};

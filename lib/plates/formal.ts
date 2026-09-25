// 数理与技术：数学 · 计算机科学 · 工程
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  arrowhead,
  circle,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type PlateStroke,
  type Point,
} from "./draw";

/** 数学：一条李萨如曲线，配坐标轴与单位刻度。 */
export const mathematics: PlateGenerator = (random) => {
  const ratios = [
    [3, 2],
    [5, 4],
    [3, 4],
    [5, 6],
  ] as const;
  const [a, b] = ratios[Math.floor(random() * ratios.length)]!;
  const phase = between(random, 0.3, 1.2);
  const [cx, cy, rx, ry] = [W / 2, H / 2, 150, 110];
  const points: Point[] = [];
  for (let i = 0; i < 360; i++) {
    const t = (i / 360) * Math.PI * 2;
    points.push([cx + rx * Math.sin(a * t + phase), cy + ry * Math.sin(b * t)]);
  }
  const ticks: string[] = [];
  for (let k = -3; k <= 3; k++) {
    ticks.push(
      polyline([
        [cx + k * 50, cy - 4],
        [cx + k * 50, cy + 4],
      ])
    );
    ticks.push(
      polyline([
        [cx - 4, cy + k * 36],
        [cx + 4, cy + k * 36],
      ])
    );
  }
  return [
    stroke(
      polyline([
        [20, cy],
        [W - 20, cy],
      ]) +
        polyline([
          [cx, 16],
          [cx, H - 16],
        ]),
      "minor"
    ),
    stroke(ticks.join(""), "minor"),
    stroke(polyline(points, true), "accent"),
    stroke(
      polyline(
        [
          [cx - rx, cy - ry],
          [cx + rx, cy - ry],
          [cx + rx, cy + ry],
          [cx - rx, cy + ry],
        ],
        true
      ),
      "minor",
      { dashed: true }
    ),
  ];
};

/** 计算机科学：有限状态自动机——四个状态、一个接受态、带自环的转移。 */
export const computerScience: PlateGenerator = (random) => {
  const y = H / 2 + between(random, -10, 10);
  const states: Point[] = [60, 150, 250, 340].map((x, i) => [x, y + (i % 2 ? -46 : 30)]);
  const r = 20;
  const edge = (from: Point, to: Point, bend: number) => {
    const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
    const start: Point = [from[0] + r * Math.cos(angle), from[1] + r * Math.sin(angle)];
    const end: Point = [to[0] - r * Math.cos(angle), to[1] - r * Math.sin(angle)];
    const mid: Point = [
      (start[0] + end[0]) / 2 - bend * Math.sin(angle),
      (start[1] + end[1]) / 2 + bend * Math.cos(angle),
    ];
    return smooth([start, mid, end]) + arrowhead(mid, end, 7);
  };
  const edges = [
    edge(states[0]!, states[1]!, -10),
    edge(states[1]!, states[2]!, -12),
    edge(states[2]!, states[3]!, -10),
    edge(states[2]!, states[1]!, -30),
    edge(states[3]!, states[0]!, 60),
  ];
  const [lx, ly] = states[1]!;
  const loop = smooth([
    [lx - 10, ly - r + 2],
    [lx - 16, ly - r - 28],
    [lx + 16, ly - r - 28],
    [lx + 10, ly - r + 2],
  ]);
  const entry =
    polyline([
      [states[0]![0] - 52, states[0]![1]],
      [states[0]![0] - r, states[0]![1]],
    ]) + arrowhead([states[0]![0] - 52, states[0]![1]], [states[0]![0] - r, states[0]![1]], 7);
  const accept = states[3]!;
  return [
    stroke(
      edges.join("") + loop + arrowhead([lx + 16, ly - r - 20], [lx + 10, ly - r + 2], 6),
      "minor"
    ),
    stroke(entry, "major"),
    stroke(states.map(([x, yy]) => circle(x, yy, r)).join(""), "major"),
    stroke(circle(accept[0], accept[1], r - 5), "accent"),
  ] satisfies PlateStroke[];
};

/** 工程：华伦桁架的蓝图——上下弦、交替斜杆、两端支座与尺寸线。 */
export const engineering: PlateGenerator = (random) => {
  const panels = 6 + Math.floor(random() * 3);
  const [x0, x1, top, bottom] = [40, W - 40, 110, 190];
  const step = (x1 - x0) / panels;
  const diagonals: Point[] = [[x0, bottom]];
  for (let i = 0; i < panels; i++) {
    diagonals.push([x0 + step * (i + 0.5), top], [x0 + step * (i + 1), bottom]);
  }
  const grid: string[] = [];
  for (let x = 20; x < W; x += 20)
    grid.push(
      polyline([
        [x, 20],
        [x, H - 20],
      ])
    );
  for (let y = 20; y < H; y += 20)
    grid.push(
      polyline([
        [20, y],
        [W - 20, y],
      ])
    );
  const support = (x: number) =>
    polyline(
      [
        [x, bottom],
        [x - 12, bottom + 18],
        [x + 12, bottom + 18],
      ],
      true
    ) +
    polyline([
      [x - 18, bottom + 22],
      [x + 18, bottom + 22],
    ]);
  const dimension =
    polyline([
      [x0, bottom + 44],
      [x1, bottom + 44],
    ]) +
    polyline([
      [x0, bottom + 38],
      [x0, bottom + 50],
    ]) +
    polyline([
      [x1, bottom + 38],
      [x1, bottom + 50],
    ]);
  return [
    stroke(grid.join(""), "minor", { dashed: true }),
    stroke(
      polyline([
        [x0 + step / 2, top],
        [x1 - step / 2, top],
      ]) +
        polyline([
          [x0, bottom],
          [x1, bottom],
        ]),
      "major"
    ),
    stroke(polyline(diagonals), "accent"),
    stroke(support(x0) + support(x1) + dimension, "major"),
  ];
};

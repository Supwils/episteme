// 人文与艺术：哲学 · 文学 · 艺术
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  arrowhead,
  circle,
  dot,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type PlateStroke,
  type Point,
} from "./draw";

/** 哲学：正—反—合的三元组，合又成为下一轮的正，一路向上。 */
export const philosophy: PlateGenerator = (random) => {
  const minor: string[] = [];
  const major: string[] = [];
  const nodes: Point[] = [];
  let thesis: Point = [between(random, 90, 130), H - 40];
  let antithesis: Point = [between(random, 270, 310), H - 40];
  for (let round = 0; round < 3; round++) {
    const synthesis: Point = [
      (thesis[0] + antithesis[0]) / 2 + between(random, -18, 18),
      thesis[1] - 78,
    ];
    major.push(polyline([thesis, synthesis]) + polyline([antithesis, synthesis]));
    minor.push(polyline([thesis, antithesis]));
    major.push(arrowhead(thesis, synthesis, 7) + arrowhead(antithesis, synthesis, 7));
    nodes.push(thesis, antithesis);
    const spread = 100 - round * 22;
    thesis = synthesis;
    antithesis = [synthesis[0] + (round % 2 ? -spread : spread), synthesis[1]];
    minor.push(polyline([thesis, antithesis]));
  }
  return [
    stroke(minor.join(""), "minor", { dashed: true }),
    stroke(major.join(""), "major"),
    ...nodes.map(([x, y]) => ({ ...dot(x, y, 3), role: "major" as const })),
    stroke(circle(thesis[0], thesis[1], 7), "accent"),
    dot(thesis[0], thesis[1], 3),
  ];
};

/** 文学：弗莱塔格情节弧，一笔画成，五个节点各有一道刻。 */
export const literature: PlateGenerator = (random) => {
  const base = H - 60;
  const peak = between(random, 60, 80);
  const climaxX = between(random, 220, 260);
  const arc: Point[] = [
    [30, base],
    [90, base - 4],
    [150, base - 60],
    [climaxX - 30, peak + 30],
    [climaxX, peak],
    [climaxX + 36, peak + 70],
    [W - 70, base - 20],
    [W - 30, base - 18],
  ];
  const marks = [arc[1]!, arc[2]!, arc[4]!, arc[5]!, arc[6]!];
  return [
    stroke(
      polyline([
        [30, base + 20],
        [W - 30, base + 20],
      ]),
      "minor"
    ),
    stroke(
      marks
        .map(([x, y]) =>
          polyline([
            [x, y + 8],
            [x, base + 20],
          ])
        )
        .join(""),
      "minor",
      { dashed: true }
    ),
    stroke(smooth(arc), "major"),
    stroke(circle(arc[4]![0], arc[4]![1], 8), "accent"),
    ...marks.map(([x, y]) => ({ ...dot(x, y, 2.6), role: "major" as const })),
  ];
};

/** 艺术：一点透视——地面网格汇向灭点，地平线上立着一个方块。 */
export const arts: PlateGenerator = (random) => {
  const horizon = between(random, 100, 130);
  const vp: Point = [between(random, 170, 230), horizon];
  const rays: string[] = [];
  for (let x = -200; x <= W + 200; x += 40) rays.push(polyline([vp, [x, H]]));
  const rungs: string[] = [];
  for (let k = 1; k <= 7; k++) {
    const y = horizon + (H - horizon) * (k / 7) ** 1.8;
    rungs.push(
      polyline([
        [0, y],
        [W, y],
      ])
    );
  }
  // A box whose receding edges run to the vanishing point.
  const [bx, by, s] = [W - 150, H - 70, 60];
  const toward = ([x, y]: Point, t: number): Point => [x + (vp[0] - x) * t, y + (vp[1] - y) * t];
  const front: Point[] = [
    [bx, by],
    [bx + s, by],
    [bx + s, by - s],
    [bx, by - s],
  ];
  const back = front.map((p) => toward(p, 0.28));
  const box =
    polyline(front, true) +
    polyline(back, true) +
    front.map((p, i) => polyline([p, back[i]!])).join("");
  const guides = [front[0]!, front[3]!].map((p) => polyline([p, vp])).join("");
  return [
    stroke(rays.join("") + rungs.join(""), "minor"),
    stroke(
      polyline([
        [0, horizon],
        [W, horizon],
      ]),
      "major"
    ),
    stroke(guides, "accent", { dashed: true }),
    stroke(box, "major"),
    dot(vp[0], vp[1], 3.2),
  ] satisfies PlateStroke[];
};

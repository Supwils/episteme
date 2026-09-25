// 历史与文明：人类历史 · 人类学与考古 · 宗教学
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  circle,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type PlateStroke,
  type Point,
} from "./draw";

/** 人类历史：层层堆叠的时间地层，每层有自己的刻度，越往上越薄越密。 */
export const humanHistory: PlateGenerator = (random) => {
  const layers: string[] = [];
  const ticks: string[] = [];
  let y = H - 30;
  let thickness = 56;
  let marked = "";
  for (let layer = 0; layer < 7; layer++) {
    const top = y - thickness;
    const points: Point[] = [];
    for (let x = 20; x <= W - 20; x += 38) {
      points.push([x, top + between(random, -3, 3)]);
    }
    layers.push(smooth(points));
    const step = 60 - layer * 6;
    for (let x = 30; x < W - 20; x += step) {
      ticks.push(
        polyline([
          [x, top + 2],
          [x, top + 7],
        ])
      );
    }
    if (layer === 3) marked = smooth(points);
    y = top;
    thickness *= 0.8;
  }
  return [
    stroke(
      polyline([
        [20, H - 30],
        [W - 20, H - 30],
      ]),
      "major"
    ),
    stroke(layers.join(""), "major"),
    stroke(ticks.join(""), "minor"),
    stroke(marked, "accent"),
  ];
};

/** 人类学：一张亲属关系图——△ 男、○ 女，婚配横线，世系竖线。 */
export const anthropology: PlateGenerator = (random) => {
  const minor: string[] = [];
  const major: string[] = [];
  const person = ([x, y]: Point, male: boolean) =>
    male
      ? polyline(
          [
            [x, y - 9],
            [x + 9, y + 7],
            [x - 9, y + 7],
          ],
          true
        )
      : circle(x, y, 8.5);
  const couple = (left: Point, right: Point) => {
    major.push(person(left, true), person(right, false));
    minor.push(
      polyline([
        [left[0] + 10, left[1]],
        [right[0] - 10, right[1]],
      ])
    );
    return [(left[0] + right[0]) / 2, left[1]] as Point;
  };
  const children = (from: Point, xs: number[], y: number) => {
    minor.push(polyline([from, [from[0], y - 24]]));
    minor.push(
      polyline([
        [Math.min(...xs), y - 24],
        [Math.max(...xs), y - 24],
      ])
    );
    for (const x of xs)
      minor.push(
        polyline([
          [x, y - 24],
          [x, y - 10],
        ])
      );
  };
  const top = couple([150, 60], [250, 60]);
  const genTwo = [90, 200, 310];
  children(top, genTwo, 150);
  const left = couple([genTwo[0]!, 150], [genTwo[0]! + 60, 150]);
  major.push(person([genTwo[1]!, 150], random() < 0.5));
  const right = couple([genTwo[2]! - 40, 150], [genTwo[2]! + 20, 150]);
  children(left, [70, 130], 240);
  children(right, [260, 310, 360], 240);
  const ego: Point = [130, 240];
  [70, 260, 310, 360].forEach((x, i) => major.push(person([x, 240], i % 2 === 0)));
  return [
    stroke(minor.join(""), "minor"),
    stroke(major.join(""), "major"),
    stroke(person(ego, false) + circle(ego[0], ego[1], 13), "accent"),
  ];
};

/** 宗教学：中性的同心几何花窗——不取任何一个传统的符号。 */
export const religion: PlateGenerator = (random) => {
  const [cx, cy] = [W / 2, H / 2];
  const folds = 8 + 2 * Math.floor(random() * 3);
  const out: PlateStroke[] = [];
  for (const r of [26, 62, 104, 132]) out.push(stroke(circle(cx, cy, r), "minor"));
  const petals: string[] = [];
  for (let i = 0; i < folds; i++) {
    const t = (i / folds) * Math.PI * 2;
    const tip: Point = [cx + 104 * Math.cos(t), cy + 104 * Math.sin(t)];
    const side = (s: number): Point => [
      cx + 62 * Math.cos(t + (s * Math.PI) / folds),
      cy + 62 * Math.sin(t + (s * Math.PI) / folds),
    ];
    petals.push(
      smooth([side(-1), [cx + 88 * Math.cos(t - 0.12), cy + 88 * Math.sin(t - 0.12)], tip])
    );
    petals.push(
      smooth([side(1), [cx + 88 * Math.cos(t + 0.12), cy + 88 * Math.sin(t + 0.12)], tip])
    );
  }
  out.push(stroke(petals.join(""), "major"));
  const star: Point[] = [];
  for (let i = 0; i < folds * 2; i++) {
    const t = (i / (folds * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? 26 : 44;
    star.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  out.push(stroke(polyline(star, true), "accent"));
  return out;
};

// 生命与心灵：生命科学 · 医学 · 心理学 · 语言学 · 教育学
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  circle,
  dot,
  plot,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type PlateStroke,
  type Point,
} from "./draw";

/** 生命科学：一棵分支的系统发生树（直角枝），一支高亮。 */
export const lifeScience: PlateGenerator = (random) => {
  const minor: string[] = [];
  const accent: string[] = [];
  const tips: Point[] = [];
  const grow = (x: number, y0: number, y1: number, depth: number, lit: boolean) => {
    const y = (y0 + y1) / 2;
    const reach = between(random, 34, 52);
    if (depth === 0 || y1 - y0 < 24) {
      (lit ? accent : minor).push(
        polyline([
          [x, y],
          [W - 30, y],
        ])
      );
      tips.push([W - 30, y]);
      return;
    }
    const split = between(random, 0.35, 0.65);
    const mid = y0 + (y1 - y0) * split;
    const top = (y0 + mid) / 2;
    const bottom = (mid + y1) / 2;
    (lit ? accent : minor).push(
      polyline([
        [x, top],
        [x, bottom],
      ])
    );
    const litTop = lit && random() < 0.5;
    for (const [a, b, childLit] of [
      [y0, mid, litTop],
      [mid, y1, lit && !litTop],
    ] as const) {
      const cy = (a + b) / 2;
      (childLit ? accent : minor).push(
        polyline([
          [x, cy],
          [x + reach, cy],
        ])
      );
      grow(x + reach, a, b, depth - 1, childLit);
    }
  };
  grow(40, 24, H - 24, 6, true);
  const out: PlateStroke[] = [stroke(minor.join(""), "major"), stroke(accent.join(""), "accent")];
  out.push(...tips.map(([x, y]) => ({ ...dot(x, y, 1.8), role: "major" as const })));
  return out;
};

/** 医学：一段脉搏波，走着走着落成 Kaplan–Meier 生存阶梯。 */
export const medicine: PlateGenerator = (random) => {
  const base = 110;
  const pulse: Point[] = [];
  for (let beat = 0; beat < 4; beat++) {
    const x0 = 24 + beat * 46;
    pulse.push([x0, base], [x0 + 14, base], [x0 + 18, base - 8], [x0 + 22, base + 10]);
    pulse.push([x0 + 26, base - 58], [x0 + 30, base + 22], [x0 + 34, base], [x0 + 46, base]);
  }
  const steps: Point[] = [[208, base]];
  let y = base;
  for (let x = 208; x < W - 24; x += between(random, 12, 26)) {
    y += between(random, 4, 16);
    steps.push([x, steps.at(-1)![1]], [x, y]);
  }
  steps.push([W - 24, y]);
  const axis = polyline([
    [24, 40],
    [24, H - 40],
    [W - 24, H - 40],
  ]);
  const ticks = Array.from({ length: 8 }, (_, i) =>
    polyline([
      [24 + i * 50, H - 40],
      [24 + i * 50, H - 34],
    ])
  ).join("");
  return [
    stroke(axis + ticks, "minor"),
    stroke(polyline(pulse), "major"),
    stroke(polyline(steps), "accent"),
  ];
};

/** 心理学：中心—周边感受野的重叠圆，加一只内克尔立方体。 */
export const psychology: PlateGenerator = (random) => {
  const out: PlateStroke[] = [];
  for (let i = 0; i < 7; i++) {
    const cx = between(random, 50, 240);
    const cy = between(random, 60, 240);
    const r = between(random, 24, 44);
    out.push(stroke(circle(cx, cy, r), "minor"), stroke(circle(cx, cy, r * 0.42), "major"));
  }
  const [x, y, s, o] = [280, 110, 70, 30];
  const front = polyline(
    [
      [x, y],
      [x + s, y],
      [x + s, y + s],
      [x, y + s],
    ],
    true
  );
  const back = polyline(
    [
      [x + o, y - o],
      [x + s + o, y - o],
      [x + s + o, y + s - o],
      [x + o, y + s - o],
    ],
    true
  );
  const edges = [
    [
      [x, y],
      [x + o, y - o],
    ],
    [
      [x + s, y],
      [x + s + o, y - o],
    ],
    [
      [x + s, y + s],
      [x + s + o, y + s - o],
    ],
    [
      [x, y + s],
      [x + o, y + s - o],
    ],
  ] as const;
  out.push(stroke(front + back + edges.map((e) => polyline(e)).join(""), "accent"));
  return out;
};

/** 语言学：一段语音的波形包络，上方三条共振峰轨迹。 */
export const linguistics: PlateGenerator = (random) => {
  const mid = 200;
  const bars: string[] = [];
  const syllables = Array.from({ length: 4 }, () => between(random, 0.6, 1));
  for (let x = 24; x <= W - 24; x += 4) {
    const t = (x - 24) / (W - 48);
    const s = syllables[Math.min(3, Math.floor(t * 4))]!;
    const envelope = s * Math.sin(Math.PI * ((t * 4) % 1)) ** 0.8;
    const amp = 6 + 60 * envelope * (0.55 + 0.45 * random());
    bars.push(
      polyline([
        [x, mid - amp / 2],
        [x, mid + amp / 2],
      ])
    );
  }
  const formant = (base: number, swing: number, phase: number) => {
    const points: Point[] = [];
    for (let x = 24; x <= W - 24; x += 25) {
      points.push([x, base + swing * Math.sin(x / 45 + phase)]);
    }
    return smooth(points);
  };
  return [
    stroke(bars.join(""), "minor"),
    stroke(formant(118, 10, random() * 6), "major"),
    stroke(formant(84, 16, random() * 6), "accent"),
    stroke(formant(48, 8, random() * 6), "major"),
  ];
};

/** 教育学：遗忘曲线，每次间隔复习都把它拉回顶端，衰减越来越慢。 */
export const education: PlateGenerator = (random) => {
  const [x0, top, floor] = [30, 50, H - 50];
  let x = x0;
  let rate = 0.035;
  const curves: string[] = [];
  const reviews: PlateStroke[] = [];
  const gaps = [42, 58, 76, 100];
  for (const [i, gap] of gaps.entries()) {
    const start = x;
    const decay = (px: number) => top + (floor - top) * (1 - Math.exp(-rate * (px - start)));
    curves.push(plot(decay, start, start + gap, 14));
    x = start + gap;
    reviews.push(
      stroke(
        polyline([
          [x, decay(x)],
          [x, top],
        ]),
        "accent",
        { dashed: true }
      )
    );
    if (i < gaps.length - 1) reviews.push(dot(x, top, 2.6));
    rate *= between(random, 0.42, 0.55);
  }
  const noReview = (px: number) => top + (floor - top) * (1 - Math.exp(-0.035 * (px - x0)));
  return [
    stroke(
      polyline([
        [x0, top - 16],
        [x0, floor],
        [W - 20, floor],
      ]),
      "minor"
    ),
    stroke(plot(noReview, x0, W - 30, 30), "minor", { dashed: true }),
    stroke(curves.join(""), "major"),
    ...reviews,
  ];
};

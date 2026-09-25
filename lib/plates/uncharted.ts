// 404 的图版：经纬网上，一段已测绘的海岸线走到半途变成虚线，伸进空白。
import { between } from "./random";
import {
  PLATE_HEIGHT as H,
  PLATE_WIDTH as W,
  circle,
  polyline,
  smooth,
  stroke,
  type PlateGenerator,
  type Point,
} from "./draw";

export const uncharted: PlateGenerator = (random) => {
  const graticule: string[] = [];
  for (let x = 40; x < W; x += 40)
    graticule.push(
      polyline([
        [x, 16],
        [x, H - 16],
      ])
    );
  for (let y = 30; y < H; y += 40)
    graticule.push(
      polyline([
        [16, y],
        [W - 16, y],
      ])
    );
  const coast: Point[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    coast.push([
      30 + t * (W - 60),
      150 + 60 * Math.sin(t * 5 + between(random, -0.3, 0.3)) * (1 - t * 0.4),
    ]);
  }
  const split = 7;
  const [cx, cy] = [W - 70, 70];
  const rose = [
    polyline([
      [cx, cy - 26],
      [cx, cy + 26],
    ]),
    polyline([
      [cx - 26, cy],
      [cx + 26, cy],
    ]),
    polyline(
      [
        [cx, cy - 26],
        [cx - 5, cy - 8],
        [cx + 5, cy - 8],
      ],
      true
    ),
  ].join("");
  return [
    stroke(graticule.join(""), "minor", { dashed: true }),
    stroke(smooth(coast.slice(0, split + 1)), "major"),
    stroke(smooth(coast.slice(split)), "accent", { dashed: true }),
    stroke(circle(cx, cy, 18) + rose, "major"),
  ];
};

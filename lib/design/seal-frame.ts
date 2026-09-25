import { seededRandom } from "@/lib/plates/random";

/**
 * 印框：略带刀意的圆角方。四边各有一处极轻的起伏，按领域 id 取种子，
 * 每方印不同、每次渲染相同（SSR 与水合一致）。坐标在 100 × 100 印面内。
 */
export function sealFramePath(seed: string): string {
  const random = seededRandom(`seal:${seed}`);
  const wobble = () => (random() - 0.5) * 2.4;
  const inset = 4;
  const far = 100 - inset;
  const r = 7;
  const n = (value: number) => Math.round(value * 10) / 10;
  // Clockwise from the top-left corner; each side bows once at a seeded point.
  const top = [n(30 + random() * 40), n(inset + wobble())];
  const right = [n(far + wobble()), n(30 + random() * 40)];
  const bottom = [n(30 + random() * 40), n(far + wobble())];
  const left = [n(inset + wobble()), n(30 + random() * 40)];
  return [
    `M${inset + r} ${inset}`,
    `L${top[0]} ${top[1]}L${far - r} ${inset}`,
    `Q${far} ${inset} ${far} ${inset + r}`,
    `L${right[0]} ${right[1]}L${far} ${far - r}`,
    `Q${far} ${far} ${far - r} ${far}`,
    `L${bottom[0]} ${bottom[1]}L${inset + r} ${far}`,
    `Q${inset} ${far} ${inset} ${far - r}`,
    `L${left[0]} ${left[1]}L${inset} ${inset + r}`,
    `Q${inset} ${inset} ${inset + r} ${inset}Z`,
  ].join("");
}

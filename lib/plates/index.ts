/**
 * 标本图版注册表（T-DESIGN-01g）：每个领域一张由自身题材生成的刻线图，
 * 以领域 id 为种子，服务端与浏览器画出同一张。
 */
import type { SealDomain } from "@/lib/design/seals";
import { chemistry, cosmology, earthScience, physics } from "./cosmos";
import { computerScience, engineering, mathematics } from "./formal";
import { anthropology, humanHistory, religion } from "./history";
import { arts, literature, philosophy } from "./humanities";
import { education, lifeScience, linguistics, medicine, psychology } from "./life";
import { seededRandom } from "./random";
import { economics, law, politicalScience, sociology } from "./society";
import { uncharted } from "./uncharted";
import type { PlateGenerator, PlateStroke } from "./draw";

export { PLATE_HEIGHT, PLATE_WIDTH, type PlateStroke, type StrokeRole } from "./draw";

export const PLATE_GENERATORS: Record<SealDomain, PlateGenerator> = {
  "universe-physics": physics,
  cosmology,
  "earth-science": earthScience,
  chemistry,
  "life-science": lifeScience,
  medicine,
  psychology,
  linguistics,
  education,
  sociology,
  economics,
  "political-science": politicalScience,
  law,
  "human-history": humanHistory,
  anthropology,
  religion,
  philosophy,
  arts,
  literature,
  mathematics,
  "computer-science": computerScience,
  engineering,
};

/** 不属于任何领域的图版：404 的「未测绘区域」。 */
export const SPECIAL_PLATES = { uncharted } satisfies Record<string, PlateGenerator>;

export type PlateKey = SealDomain | keyof typeof SPECIAL_PLATES;

/** 图版的内容：同一个 key 永远得到同一张图。 */
export function drawPlate(key: PlateKey): PlateStroke[] {
  const generator =
    key in SPECIAL_PLATES
      ? SPECIAL_PLATES[key as keyof typeof SPECIAL_PLATES]
      : PLATE_GENERATORS[key as SealDomain];
  return generator(seededRandom(`plate:${key}`));
}

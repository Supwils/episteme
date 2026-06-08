import type { EraContent } from "./types";

import era0 from "./era-0-origin";
import era1 from "./era-1-eukaryotes";
import era2 from "./era-2-multicellular";
import era3 from "./era-3-cambrian";
import era4 from "./era-4-land";
import era5 from "./era-5-dinosaurs";
import era6 from "./era-6-mammals";
import era7 from "./era-7-human-evolution";

export const ERAS: EraContent[] = [
  era0,
  era1,
  era2,
  era3,
  era4,
  era5,
  era6,
  era7,
];

export function getEraById(id: string): EraContent | null {
  return ERAS.find((era) => era.id === id) ?? null;
}

export function getEraByIndex(index: number): EraContent | null {
  return ERAS[index] ?? null;
}

export const ERA_IDS = ERAS.map((era) => era.id);

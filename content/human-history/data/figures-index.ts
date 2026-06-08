import type { HistoricalFigure } from "./types";
import { FIGURES_CLASSICAL } from "./figures/figures-classical";
import { FIGURES_MEDIEVAL } from "./figures/figures-medieval";
import { FIGURES_EARLY_MODERN } from "./figures/figures-early-modern";
import { FIGURES_MODERN } from "./figures/figures-modern";
import { FIGURES_CONTEMPORARY } from "./figures/figures-contemporary";
import { FIGURES_FUTURE } from "./figures/figures-future";
import { FIGURES_PREHISTORIC } from "./figures/figures-prehistoric";
import { FIGURES_OCEANIA } from "./figures/figures-oceania";
import { FIGURES_EXPANSION_A } from "./figures/figures-expansion-a";
import { FIGURES_EXPANSION_B } from "./figures/figures-expansion-b";
import { FIGURES_AFRICAN_DEEP } from "./figures/figures-african-deep";
import { FIGURES_ISLAMIC_DEEP } from "./figures/figures-islamic-deep";
import { FIGURES_LATAM_DEEP } from "./figures/figures-latam-deep";
import { FIGURES_MODERN_DEEP } from "./figures/figures-modern-deep";
import { FIGURES_ANCIENT_DEEP } from "./figures/figures-ancient-deep";
import { FIGURES_WOMEN_DEEP } from "./figures/figures-women-deep";
import { FIGURES_SCIENTISTS_DEEP } from "./figures/figures-scientists-deep";

export const FIGURES: HistoricalFigure[] = [
  ...FIGURES_PREHISTORIC,
  ...FIGURES_CLASSICAL,
  ...FIGURES_MEDIEVAL,
  ...FIGURES_EARLY_MODERN,
  ...FIGURES_MODERN,
  ...FIGURES_CONTEMPORARY,
  ...FIGURES_OCEANIA,
  ...FIGURES_FUTURE,
  ...FIGURES_EXPANSION_A,
  ...FIGURES_EXPANSION_B,
  ...FIGURES_AFRICAN_DEEP,
  ...FIGURES_ISLAMIC_DEEP,
  ...FIGURES_LATAM_DEEP,
  ...FIGURES_MODERN_DEEP,
  ...FIGURES_ANCIENT_DEEP,
  ...FIGURES_WOMEN_DEEP,
  ...FIGURES_SCIENTISTS_DEEP,
];

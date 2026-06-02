import type { HistoricalFigure } from './types';
import { FIGURES_CLASSICAL } from './figures/figures-classical';
import { FIGURES_MEDIEVAL } from './figures/figures-medieval';
import { FIGURES_EARLY_MODERN } from './figures/figures-early-modern';
import { FIGURES_MODERN } from './figures/figures-modern';
import { FIGURES_CONTEMPORARY } from './figures/figures-contemporary';
import { FIGURES_FUTURE } from './figures/figures-future';
import { FIGURES_PREHISTORIC } from './figures/figures-prehistoric';
import { FIGURES_OCEANIA } from './figures/figures-oceania';
import { FIGURES_EXPANSION_A } from './figures/figures-expansion-a';
import { FIGURES_EXPANSION_B } from './figures/figures-expansion-b';

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
];

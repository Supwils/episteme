// @ts-nocheck
import { FIGURES_CLASSICAL } from './figures/figures-classical.js';
import { FIGURES_MEDIEVAL } from './figures/figures-medieval.js';
import { FIGURES_EARLY_MODERN } from './figures/figures-early-modern.js';
import { FIGURES_MODERN } from './figures/figures-modern.js';
import { FIGURES_CONTEMPORARY } from './figures/figures-contemporary.js';
import { FIGURES_FUTURE } from './figures/figures-future.js';
import { FIGURES_PREHISTORIC } from './figures/figures-prehistoric.js';
import { FIGURES_OCEANIA } from './figures/figures-oceania.js';
import { FIGURES_EXPANSION_A } from './figures/figures-expansion-a.js';
import { FIGURES_EXPANSION_B } from './figures/figures-expansion-b.js';

export const FIGURES = [
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

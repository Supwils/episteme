import { ANCIENT_SPECIES } from "./ancient";
import { PALEOZOIC_SPECIES } from "./paleozoic";
import { MESOZOIC_SPECIES } from "./mesozoic";
import { CENOZOIC_MODERN_SPECIES } from "./cenozoic-modern";
import type { Species } from "./types";

export type { Species } from "./types";

const SPECIES: Species[] = [
  ...ANCIENT_SPECIES,
  ...PALEOZOIC_SPECIES,
  ...MESOZOIC_SPECIES,
  ...CENOZOIC_MODERN_SPECIES,
];

export function getAllSpecies(): Species[] {
  return SPECIES;
}

export function getSpeciesByEra(era: string): Species[] {
  return SPECIES.filter((s) => s.era === era);
}

export function getSpeciesByType(kingdom: string): Species[] {
  return SPECIES.filter((s) => s.taxonomy.kingdom === kingdom);
}

export function getSpeciesById(id: string): Species | undefined {
  return SPECIES.find((s) => s.id === id);
}

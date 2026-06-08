export type LifeScienceNode = {
  id: string;
  label: string;
  domain: "life-science";
  type: "species" | "scientist" | "extinction" | "era";
  slug: string;
  era?: string;
  tags: string[];
  description: string;
};

export type LifeScienceEdge = {
  source: string;
  target: string;
  relationship: string;
  type: "era-species" | "era-extinction" | "scientist-era" | "species-extinction" | "cross-reference";
};

import { SPECIES_NODES } from './species-nodes';
import { ERA_NODES, SCIENTIST_NODES, EXTINCTION_NODES } from './other-nodes';
import { LIFESCIENCE_EDGES } from './edges';

export { SPECIES_NODES } from './species-nodes';
export { ERA_NODES, SCIENTIST_NODES, EXTINCTION_NODES } from './other-nodes';
export { LIFESCIENCE_EDGES } from './edges';

export const LIFESCIENCE_NODES: LifeScienceNode[] = [
  ...ERA_NODES,
  ...SPECIES_NODES,
  ...SCIENTIST_NODES,
  ...EXTINCTION_NODES,
];

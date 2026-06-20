import type { CrossReference, Domain } from "./types";
import { DOMAIN_ROUTES } from "./types";
import { PHYSICS_REFS } from "./physics-refs";
import { HISTORY_REFS } from "./history-refs";
import { PHILOSOPHY_REFS } from "./philosophy-refs";
import { LIFE_SCIENCE_REFS } from "./life-science-refs";
import { COSMOLOGY_REFS } from "./cosmology-refs";
import { ECONOMICS_REFS } from "./economics-refs";
import { PSYCHOLOGY_REFS } from "./psychology-refs";
import { COMPUTER_SCIENCE_REFS } from "./computer-science-refs";
import { POLITICAL_SCIENCE_REFS } from "./political-science-refs";
import { MATHEMATICS_REFS } from "./mathematics-refs";
import { EARTH_SCIENCE_REFS } from "./earth-science-refs";
import { MEDICINE_REFS } from "./medicine-refs";
import { CHEMISTRY_REFS } from "./chemistry-refs";

export type { Domain, CrossReference } from "./types";
export { DOMAIN_LABELS, DOMAIN_ROUTES } from "./types";

const CROSS_REFERENCES: CrossReference[] = [
  ...PHYSICS_REFS,
  ...HISTORY_REFS,
  ...PHILOSOPHY_REFS,
  ...LIFE_SCIENCE_REFS,
  ...COSMOLOGY_REFS,
  ...ECONOMICS_REFS,
  ...PSYCHOLOGY_REFS,
  ...COMPUTER_SCIENCE_REFS,
  ...POLITICAL_SCIENCE_REFS,
  ...MATHEMATICS_REFS,
  ...EARTH_SCIENCE_REFS,
  ...MEDICINE_REFS,
  ...CHEMISTRY_REFS,
];

export { CROSS_REFERENCES };

export function getCrossReferences(domain: Domain, id: string): CrossReference[] {
  return CROSS_REFERENCES.filter(
    (ref) =>
      (ref.fromDomain === domain && ref.fromId === id) ||
      (ref.toDomain === domain && ref.toId === id)
  );
}

export function getOutgoingReferences(domain: Domain, id: string): CrossReference[] {
  return CROSS_REFERENCES.filter((ref) => ref.fromDomain === domain && ref.fromId === id);
}

export function getIncomingReferences(domain: Domain, id: string): CrossReference[] {
  return CROSS_REFERENCES.filter((ref) => ref.toDomain === domain && ref.toId === id);
}

export function getRelatedDomains(domain: Domain): Domain[] {
  const related = new Set<Domain>();
  for (const ref of CROSS_REFERENCES) {
    if (ref.fromDomain === domain) related.add(ref.toDomain);
    if (ref.toDomain === domain) related.add(ref.fromDomain);
  }
  return [...related];
}

export function resolveReference(
  ref: CrossReference,
  currentDomain: Domain
): {
  targetDomain: Domain;
  targetId: string;
  targetTitle: string;
  targetRoute: string;
  relation: string;
  direction: "outgoing" | "incoming";
} {
  const isOutgoing = ref.fromDomain === currentDomain;
  const targetDomain = isOutgoing ? ref.toDomain : ref.fromDomain;
  const targetId = isOutgoing ? ref.toId : ref.fromId;
  const explicitPath = isOutgoing ? ref.toPath : ref.fromPath;
  return {
    targetDomain,
    targetId,
    targetTitle: isOutgoing ? ref.toTitle : ref.fromTitle,
    targetRoute: explicitPath ?? `${DOMAIN_ROUTES[targetDomain]}/${targetId}`,
    relation: ref.relation,
    direction: isOutgoing ? "outgoing" : "incoming",
  };
}

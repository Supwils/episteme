// Curated cross-domain relationship pairs. The dedicated UI (CrossDomainLinks)
// and its route-resolution map were removed in favour of the validated
// <RelatedContent> system (lib/cross-domain-refs); these pairs now feed the
// knowledge-graph cross-domain edges only.
import type { CrossLink } from "./types";
import { LINKS_PHILOSOPHY_HISTORY_PHYSICS } from "./links-philo-hist-phys";
import { LINKS_LIFE_SCIENCE } from "./links-life-science";
import { LINKS_PHILOSOPHY_HISTORY_EXPANDED } from "./links-philo-hist-expanded";
import { LINKS_ROUND2 } from "./links-round2";
import { LINKS_MATHEMATICS } from "./links-mathematics";
import { LINKS_COSMOLOGY } from "./links-cosmology";
import { LINKS_ECONOMICS } from "./links-economics";
import { LINKS_PSYCHOLOGY } from "./links-psychology";

export type { DomainApp, CrossLink } from "./types";

export const CROSS_LINKS: CrossLink[] = [
  ...LINKS_PHILOSOPHY_HISTORY_PHYSICS,
  ...LINKS_LIFE_SCIENCE,
  ...LINKS_PHILOSOPHY_HISTORY_EXPANDED,
  ...LINKS_ROUND2,
  ...LINKS_MATHEMATICS,
  ...LINKS_COSMOLOGY,
  ...LINKS_ECONOMICS,
  ...LINKS_PSYCHOLOGY,
];

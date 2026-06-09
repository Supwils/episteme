export type { DomainApp, CrossLink } from "./types";
export { getAppLabel, getAppBasePath, getLinkUrl } from "./mappings";
export {
  getLinksForEntity,
  getLinksToApp,
  getLinkedEntityIds,
} from "./helpers";

import type { CrossLink } from "./types";
import { LINKS_PHILOSOPHY_HISTORY_PHYSICS } from "./links-philo-hist-phys";
import { LINKS_LIFE_SCIENCE } from "./links-life-science";
import { LINKS_PHILOSOPHY_HISTORY_EXPANDED } from "./links-philo-hist-expanded";
import { LINKS_ROUND2 } from "./links-round2";
import { LINKS_MATHEMATICS } from "./links-mathematics";
import { LINKS_COSMOLOGY } from "./links-cosmology";
import { LINKS_ECONOMICS } from "./links-economics";
import { LINKS_PSYCHOLOGY } from "./links-psychology";
import { getLinksForEntity, getLinksToApp, getLinkedEntityIds } from "./helpers";
import type { DomainApp } from "./types";

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

export function getLinksForEntityBound(app: DomainApp, id: string): CrossLink[] {
  return getLinksForEntity(CROSS_LINKS, app, id);
}

export function getLinksToAppBound(
  sourceApp: DomainApp,
  sourceId: string,
  targetApp: DomainApp
): CrossLink[] {
  return getLinksToApp(CROSS_LINKS, sourceApp, sourceId, targetApp);
}

export function getLinkedEntityIdsBound(app: DomainApp): string[] {
  return getLinkedEntityIds(CROSS_LINKS, app);
}

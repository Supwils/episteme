// Public cross-links API (formerly the @/lib/cross-links/api package entry point).
export {
  CROSS_LINKS,
  type CrossLink,
  type DomainApp,
  getLinksForEntityBound as getLinksForEntity,
  getLinksToAppBound as getLinksToApp,
  getLinkedEntityIdsBound as getLinkedEntityIds,
  getAppLabel,
  getAppBasePath,
  getLinkUrl,
} from "./index";

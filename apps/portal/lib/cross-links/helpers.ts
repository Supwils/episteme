import type { CrossLink, DomainApp } from "./types";

export function getLinksForEntity(
  crossLinks: CrossLink[],
  app: DomainApp,
  id: string
): CrossLink[] {
  return crossLinks.filter(
    (link) =>
      (link.sourceApp === app && link.sourceId === id) ||
      (link.targetApp === app && link.targetId === id)
  );
}

export function getLinksToApp(
  crossLinks: CrossLink[],
  sourceApp: DomainApp,
  sourceId: string,
  targetApp: DomainApp
): CrossLink[] {
  return crossLinks.filter(
    (link) =>
      link.sourceApp === sourceApp &&
      link.sourceId === sourceId &&
      link.targetApp === targetApp
  );
}

export function getLinkedEntityIds(
  crossLinks: CrossLink[],
  app: DomainApp
): string[] {
  const ids = new Set<string>();
  for (const link of crossLinks) {
    if (link.sourceApp === app) ids.add(link.sourceId);
    if (link.targetApp === app) ids.add(link.targetId);
  }
  return Array.from(ids);
}

import {
  getHistoryEventSummary,
  type HistoryEraId,
} from "./history-catalog";
import type { EventRelation } from "./event-relationships";

export interface EventPage {
  title: string;
  body: string;
}

export interface EventDetailData {
  pages: EventPage[];
  facts: string[];
  quote: { text: string; author: string };
}

export interface EnrichedEvent {
  year: number;
  title: string;
  desc: string;
  longDesc: string;
  era: HistoryEraId;
  region: string;
  cat: string;
  references: string[];
  detail: EventDetailData | null;
  eraName: string;
  eraColor: string;
  relatedEvents: EventRelation[];
  figureLinks: { figureId: string; role: string }[];
  resolvedReferences: {
    id: string;
    author: string;
    title: string;
    titleEn?: string;
    year: number;
  }[];
}

type EventRouteModule = {
  EVENT_ROUTE_RECORDS: Record<string, EnrichedEvent>;
};

const eventRouteLoaders: Record<
  HistoryEraId,
  () => Promise<EventRouteModule>
> = {
  prehistoric: () =>
    import(
      "@/content/human-history/data/generated/event-route-prehistoric.js"
    ).then((loaded) => loaded as unknown as EventRouteModule),
  classical: () =>
    import("@/content/human-history/data/generated/event-route-classical.js").then(
      (loaded) => loaded as unknown as EventRouteModule,
    ),
  medieval: () =>
    import("@/content/human-history/data/generated/event-route-medieval.js").then(
      (loaded) => loaded as unknown as EventRouteModule,
    ),
  earlyModern: () =>
    import(
      "@/content/human-history/data/generated/event-route-earlyModern.js"
    ).then((loaded) => loaded as unknown as EventRouteModule),
  modern: () =>
    import("@/content/human-history/data/generated/event-route-modern.js").then(
      (loaded) => loaded as unknown as EventRouteModule,
    ),
  contemporary: () =>
    import(
      "@/content/human-history/data/generated/event-route-contemporary.js"
    ).then((loaded) => loaded as unknown as EventRouteModule),
  future: () =>
    import("@/content/human-history/data/generated/event-route-future.js").then(
      (loaded) => loaded as unknown as EventRouteModule,
    ),
};

export async function getEventRouteRecord(
  title: string,
): Promise<EnrichedEvent | undefined> {
  const summary = getHistoryEventSummary(title);
  if (!summary) return undefined;
  const routeModule = await eventRouteLoaders[summary.era]();
  return routeModule.EVENT_ROUTE_RECORDS[summary.title];
}

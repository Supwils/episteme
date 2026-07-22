import type { EventDetailData } from "./event-route-data";
import type { HistoryEraId } from "./history-catalog";

export interface TimelineDetailRecord {
  longDesc: string;
  detail: EventDetailData | null;
}

type TimelineDetailModule = {
  TIMELINE_DETAIL_RECORDS: Record<string, TimelineDetailRecord>;
};

const timelineDetailLoaders: Record<
  HistoryEraId,
  () => Promise<TimelineDetailModule>
> = {
  prehistoric: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-prehistoric.js"
    ).then((module) => module as unknown as TimelineDetailModule),
  classical: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-classical.js"
    ).then((module) => module as unknown as TimelineDetailModule),
  medieval: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-medieval.js"
    ).then((module) => module as unknown as TimelineDetailModule),
  earlyModern: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-earlyModern.js"
    ).then((module) => module as unknown as TimelineDetailModule),
  modern: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-modern.js"
    ).then((module) => module as unknown as TimelineDetailModule),
  contemporary: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-contemporary.js"
    ).then((module) => module as unknown as TimelineDetailModule),
  future: () =>
    import(
      "@/content/human-history/data/generated/timeline-details-future.js"
    ).then((module) => module as unknown as TimelineDetailModule),
};

const eraCache = new Map<
  HistoryEraId,
  Promise<Record<string, TimelineDetailRecord>>
>();

export async function loadTimelineDetail(
  era: HistoryEraId,
  title: string,
): Promise<TimelineDetailRecord | undefined> {
  let records = eraCache.get(era);
  if (!records) {
    records = timelineDetailLoaders[era]().then(
      (module) => module.TIMELINE_DETAIL_RECORDS,
    );
    eraCache.set(era, records);
  }
  return (await records)[title];
}

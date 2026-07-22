import { EVENT_CATALOG } from "@/content/human-history/data/generated/event-catalog.js";
import { FIGURE_CATALOG } from "@/content/human-history/data/generated/figure-catalog.js";
import { TIMELINE_EVENT_CATALOG } from "@/content/human-history/data/generated/timeline-catalog.js";

export type HistoryEraId =
  | "prehistoric"
  | "classical"
  | "medieval"
  | "earlyModern"
  | "modern"
  | "contemporary"
  | "future";

export interface HistoryEventSummary {
  year: number;
  title: string;
  desc: string;
  era: HistoryEraId;
  region: string;
  cat: string;
  references: string[];
}

export interface HistoryFigureSummary {
  name: string;
  birth: number | null;
  death: number | null;
  title: string;
  desc: string;
  era: HistoryEraId;
  region: string;
  domain: string;
  quote: string;
  impact: string[];
}

export interface TimelineEventSummary {
  year: number;
  title: string;
  desc: string;
  era: HistoryEraId;
  region: string;
  cat: string;
  source: string;
  hasDetail: boolean;
  detailPageCount: number;
}

export const HISTORY_EVENT_CATALOG =
  EVENT_CATALOG as HistoryEventSummary[];
export const HISTORY_FIGURE_CATALOG =
  FIGURE_CATALOG as HistoryFigureSummary[];
export const HISTORY_TIMELINE_CATALOG =
  TIMELINE_EVENT_CATALOG as TimelineEventSummary[];

const eventByTitle = new Map(
  HISTORY_EVENT_CATALOG.map((event) => [event.title, event]),
);
const figureByName = new Map(
  HISTORY_FIGURE_CATALOG.map((figure) => [figure.name, figure]),
);

export function getHistoryEventSummary(
  title: string,
): HistoryEventSummary | undefined {
  return eventByTitle.get(decodeURIComponent(title));
}

export function getHistoryFigureSummary(
  name: string,
): HistoryFigureSummary | undefined {
  return figureByName.get(decodeURIComponent(name));
}

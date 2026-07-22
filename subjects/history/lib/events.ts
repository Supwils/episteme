import { ERAS } from '@/subjects/history/lib/eras';
import {
  HISTORY_EVENT_CATALOG,
  getHistoryEventSummary,
  type HistoryEventSummary,
} from '@/subjects/history/lib/history-catalog';

export interface CatalogEvent extends HistoryEventSummary {
  eraName: string;
  eraColor: string;
}

const CAT_LABELS: Record<string, string> = {
  politics: '政治',
  military: '军事',
  economy: '经济',
  culture: '文化',
  science: '科技',
  technology: '技术',
};

const REGION_LABELS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  americas: '美洲',
  oceania: '大洋洲',
  global: '全球',
};

export function getCatLabel(cat: string): string {
  return CAT_LABELS[cat] ?? cat;
}

export function getRegionLabel(region: string): string {
  return REGION_LABELS[region] ?? region;
}

export function formatYear(year: number): string {
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return '公元元年';
  return `公元${year}年`;
}

export function getAllEvents(): CatalogEvent[] {
  return HISTORY_EVENT_CATALOG.map((event) => enrichEventSummary(event));
}

export function getEventBySlug(title: string): CatalogEvent | undefined {
  const event = getHistoryEventSummary(title);
  return event ? enrichEventSummary(event) : undefined;
}

function enrichEventSummary(event: HistoryEventSummary): CatalogEvent {
  const era = ERAS.find((candidate) => candidate.id === event.era);
  return {
    ...event,
    eraName: era?.name ?? event.era,
    eraColor: era?.color ?? '#C8A951',
  };
}

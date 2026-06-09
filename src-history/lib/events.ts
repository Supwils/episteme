import { EVENTS } from '@/content/human-history/data/events.js';
import { EVENT_DETAILS } from '@/content/human-history/data/event-details.js';
import { REFERENCES } from '@/content/human-history/data/references.js';
import { ERAS } from '@/src-history/lib/eras';
import {
  getEventRelationsByTitle,
  getFigureLinksByEvent,
} from '@/src-history/lib/event-relationships';
import type { EventRelation } from '@/src-history/lib/event-relationships';

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
  era: string;
  region: string;
  cat: string;
  references: string[];
  detail: EventDetailData | null;
  eraName: string;
  eraColor: string;
  relatedEvents: EventRelation[];
  figureLinks: { figureId: string; role: string }[];
  resolvedReferences: { id: string; author: string; title: string; titleEn?: string; year: number }[];
}

interface RawEvent {
  year: number;
  title: string;
  desc: string;
  longDesc?: string;
  era: string;
  region: string;
  cat: string;
  references?: string[];
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

export function getAllEvents(): EnrichedEvent[] {
  return (EVENTS as RawEvent[]).map((ev) => enrichEvent(ev));
}

export function getEventBySlug(title: string): EnrichedEvent | undefined {
  const raw = (EVENTS as RawEvent[]).find((e) => e.title === title);
  if (!raw) return undefined;
  return enrichEvent(raw);
}

function enrichEvent(ev: RawEvent): EnrichedEvent {
  const detail = (EVENT_DETAILS as Record<string, EventDetailData>)[ev.title] ?? null;
  const era = ERAS.find((e) => e.id === ev.era);
  const relations = getEventRelationsByTitle(ev.title);
  const figureLinks = getFigureLinksByEvent(ev.title);

  const refRecords = (REFERENCES as Record<string, { author: string; title: string; titleEn?: string; year: number }>);
  const resolvedReferences = (ev.references ?? [])
    .map((id) => ({
      id,
      ...(refRecords[id] ?? { author: '', title: id, year: 0 }),
    }))
    .filter((r) => r.title);

  return {
    year: ev.year,
    title: ev.title,
    desc: ev.desc,
    longDesc: ev.longDesc ?? '',
    era: ev.era,
    region: ev.region,
    cat: ev.cat,
    references: ev.references ?? [],
    detail,
    eraName: era?.name ?? ev.era,
    eraColor: era?.color ?? '#C8A951',
    relatedEvents: relations,
    figureLinks: figureLinks.map((l) => ({ figureId: l.figureId, role: l.role })),
    resolvedReferences,
  };
}

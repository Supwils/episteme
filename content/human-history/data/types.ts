export interface HistoryEvent {
  year: number;
  title: string;
  desc: string;
  longDesc: string;
  era: string;
  region: string;
  cat: string;
  references?: string[];
}

export interface Era {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  desc: string;
  longDesc: string;
  color: string;
  icon: string;
  highlights: string[];
  quote: { text: string; author: string };
  keyFigures: string[];
  keyEvents: string[];
  achievements: string[];
  legacy: string;
  references: string[];
}

export interface HistoricalFigure {
  name: string;
  birth: number;
  death: number | null;
  title: string;
  desc: string;
  longDesc: string;
  era: string;
  region: string;
  domain: string;
  quote: string;
  impact: string[];
  achievements: string[];
  controversies: string[];
  keyEvents: { year: number; title: string }[];
  references: string[];
}

export interface DetailPage {
  title: string;
  body: string;
}

export interface EventDetail {
  pages: DetailPage[];
  facts: string[];
  quote: { text: string; author: string };
}

export interface EventDetailsMap {
  [eventTitle: string]: EventDetail;
}

export interface GeoEvent {
  year: number;
  title: string;
  region: string;
  era: string;
  lng: number;
  lat: number;
  cat: string;
}

export interface Region {
  id: string;
  name: string;
  color: string;
  emoji: string;
  desc: string;
  highlights: string[];
}

export interface FigureRelation {
  source: string;
  target: string;
  type: string;
  desc: string;
}

export interface FigureEventLink {
  figure: string;
  eventTitle: string;
}

export interface Reference {
  author: string;
  title: string;
  titleEn?: string;
  year: number;
  lang: string;
}

export interface ReferencesMap {
  [key: string]: Reference;
}

export interface LessonCase {
  title: string;
  period: string;
  summary: string;
  detail: string;
  relatedFigures: string[];
  relatedEvents: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  intro: string;
  cases: LessonCase[];
  lesson: string;
  modernRelevance: string;
}

export interface AtlasScene {
  title: string;
  body: string;
}

export interface AtlasTopic {
  id: string;
  name: string;
  x: number;
  y: number;
  scenes: AtlasScene[];
}

export interface AtlasEra {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  hue: string;
  topics: AtlasTopic[];
}

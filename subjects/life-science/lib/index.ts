import { getAllEras } from "./eras";
import { getAllSpecies } from "./species";
import { getAllScientists } from "./scientists";
import { getAllExtinctions } from "./extinctions";
import { TIMELINE_EVENTS } from "./timeline-events";
// Static search mirror (no fs) — safe for the client search bundle.
import { LIFE_SCIENCE_DIALOGUES } from "@/content/life-science/dialogues-data";

export const ERAS = getAllEras().map((era) => ({
  id: era.id,
  title: era.name,
  subtitle: era.nameEn,
  description: era.keyFact,
}));

export const SPECIES = getAllSpecies().map((s) => ({
  id: s.id,
  name: s.name,
  era: s.era,
  description: s.keyTraits.join("、"),
}));

export const SCIENTISTS = getAllScientists().map((s) => ({
  id: s.id,
  name: s.name,
  latin: s.nameEn,
  field: s.field,
}));

export const EXTINCTIONS = getAllExtinctions().map((e) => ({
  id: e.id,
  name: e.name,
  nameEn: e.nameEn,
  dateDisplay: e.dateDisplay,
  description: e.description,
}));

export const LS_TIMELINE_EVENTS = TIMELINE_EVENTS.map((e) => ({
  id: e.id,
  event: e.event,
  era: e.era,
  detail: e.detail,
}));

export const LS_DIALOGUES = LIFE_SCIENCE_DIALOGUES.map((d) => ({
  slug: d.slug,
  title: d.title,
  participants: d.participants,
  question: d.question,
  field: d.field,
}));

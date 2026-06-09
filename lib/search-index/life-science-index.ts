import type { SearchDocument } from "./types";

export function indexLifeScience(
  lifeScienceMod: {
    ERAS?: ReadonlyArray<{ id: string; title: string; subtitle: string; description: string }>;
    SPECIES?: ReadonlyArray<{ id: string; name: string; era: string; description: string }>;
    SCIENTISTS?: ReadonlyArray<{ id: string; name: string; latin: string; field: string }>;
    EXTINCTIONS?: ReadonlyArray<{ id: string; name: string; nameEn: string; dateDisplay: string; description: string }>;
    LS_TIMELINE_EVENTS?: ReadonlyArray<{ id: string; event: string; era: string; detail: string }>;
  } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];
  if (!lifeScienceMod) return docs;

  const eras = lifeScienceMod.ERAS ?? [];
  for (const era of eras) {
    docs.push({
      id: `ls-era-${era.id}`,
      title: era.title,
      subtitle: era.subtitle,
      content: era.description,
      section: "life-science",
      url: "/life-science",
      type: "era",
    });
  }

  const species = lifeScienceMod.SPECIES ?? [];
  for (const s of species) {
    docs.push({
      id: `ls-species-${s.id}`,
      title: s.name,
      subtitle: s.era,
      content: s.description,
      section: "life-science",
      url: `/life-science/species/${s.id}`,
      type: "species",
    });
  }

  const scientists = lifeScienceMod.SCIENTISTS ?? [];
  for (const sc of scientists) {
    docs.push({
      id: `ls-scientist-${sc.id}`,
      title: sc.name,
      subtitle: sc.latin,
      content: sc.field,
      section: "life-science",
      url: `/life-science/scientists/${sc.id}`,
      type: "scientist",
    });
  }

  const extinctions = lifeScienceMod.EXTINCTIONS ?? [];
  for (const ext of extinctions) {
    docs.push({
      id: `ls-extinction-${ext.id}`,
      title: ext.name,
      subtitle: ext.nameEn,
      content: `${ext.dateDisplay} · ${ext.description}`,
      section: "life-science",
      url: `/life-science/extinctions/${ext.id}`,
      type: "extinction",
    });
  }

  const timelineEvents = lifeScienceMod.LS_TIMELINE_EVENTS ?? [];
  for (const te of timelineEvents) {
    docs.push({
      id: `ls-timeline-${te.id}`,
      title: te.event,
      subtitle: te.era,
      content: te.detail,
      section: "life-science",
      url: `/life-science/timeline/${te.id}`,
      type: "timeline",
    });
  }

  return docs;
}

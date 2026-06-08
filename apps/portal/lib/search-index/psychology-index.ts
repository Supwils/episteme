import type { SearchDocument } from "./types";

export function indexPsychology(
  psychologistsDataMod: { PSYCHOLOGY_THEORISTS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; era: string }> } | null,
  psychExperimentsDataMod: { PSYCHOLOGY_EXPERIMENTS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; researcher: string; year: number }> } | null,
  phenomenaDataMod: { PHENOMENA_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; category: string }> } | null,
  disordersDataMod: { DISORDERS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; category: string }> } | null,
  dialoguesDataMod: { PSYCHOLOGY_DIALOGUES_DATA: ReadonlyArray<{ slug: string; title: string; title_en: string; field: string; participants: readonly string[] }> } | null,
  psychKbDataMod: { PSYCHOLOGY_KB_DATA: ReadonlyArray<{ slug: string; title: string; titleEn: string; category: string }> } | null,
  psychSchoolsDataMod: { PSYCHOLOGY_SCHOOLS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; era: string; founder: string }> } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  if (psychologistsDataMod) {
    for (const p of psychologistsDataMod.PSYCHOLOGY_THEORISTS_DATA) {
      docs.push({
        id: `psychologist-${p.slug}`,
        title: p.title,
        subtitle: p.subtitle,
        content: `${p.era} · 心理学家`,
        section: "psychology",
        url: `/psychology/theorists/${p.slug}`,
        type: "psychologist",
      });
    }
  }

  if (psychExperimentsDataMod) {
    for (const exp of psychExperimentsDataMod.PSYCHOLOGY_EXPERIMENTS_DATA) {
      docs.push({
        id: `psych-exp-${exp.slug}`,
        title: exp.title,
        subtitle: exp.subtitle,
        content: `${exp.year} · ${exp.researcher}`,
        section: "psychology",
        url: `/psychology/experiments/${exp.slug}`,
        type: "experiment",
      });
    }
  }

  if (phenomenaDataMod) {
    for (const p of phenomenaDataMod.PHENOMENA_DATA) {
      docs.push({
        id: `phenomenon-${p.slug}`,
        title: p.title,
        subtitle: p.subtitle,
        content: `${p.category} · 心理现象`,
        section: "psychology",
        url: `/psychology/phenomena/${p.slug}`,
        type: "phenomenon",
      });
    }
  }

  if (disordersDataMod) {
    for (const d of disordersDataMod.DISORDERS_DATA) {
      docs.push({
        id: `disorder-${d.slug}`,
        title: d.title,
        subtitle: d.subtitle,
        content: `${d.category} · 心理障碍`,
        section: "psychology",
        url: `/psychology/disorders/${d.slug}`,
        type: "disorder",
      });
    }
  }

  if (dialoguesDataMod) {
    for (const d of dialoguesDataMod.PSYCHOLOGY_DIALOGUES_DATA) {
      docs.push({
        id: `psych-dialogue-${d.slug}`,
        title: d.title,
        subtitle: d.title_en,
        content: `${d.field} · ${d.participants.join("、")}`,
        section: "psychology",
        url: `/psychology/dialogues/${d.slug}`,
        type: "dialogue",
      });
    }
  }

  if (psychKbDataMod) {
    for (const a of psychKbDataMod.PSYCHOLOGY_KB_DATA) {
      docs.push({
        id: `psych-kb-${a.slug}`,
        title: a.title,
        subtitle: a.titleEn,
        content: `${a.category} · 知识库`,
        section: "psychology",
        url: `/psychology/knowledge-base/${a.slug}`,
        type: "knowledgeBase",
      });
    }
  }

  if (psychSchoolsDataMod) {
    for (const s of psychSchoolsDataMod.PSYCHOLOGY_SCHOOLS_DATA) {
      docs.push({
        id: `psych-school-${s.slug}`,
        title: s.title,
        subtitle: s.subtitle,
        content: `${s.era} · ${s.founder} · 心理学派`,
        section: "psychology",
        url: `/psychology/schools/${s.slug}`,
        type: "school",
      });
    }
  }

  return docs;
}

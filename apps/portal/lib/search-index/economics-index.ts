import type { SearchDocument } from "./types";

export function indexEconomics(
  economistsDataMod: { ECONOMISTS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; era: string }> } | null,
  econSchoolsDataMod: { ECONOMICS_SCHOOLS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; era: string }> } | null,
  theoriesDataMod: { THEORIES_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; category: string }> } | null,
  econConceptsDataMod: { ECONOMICS_CONCEPTS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; field: string }> } | null,
  econKbDataMod: { ECONOMICS_KB_DATA: ReadonlyArray<{ slug: string; title: string; titleEn: string; category: string }> } | null,
  econDebatesDataMod: { ECONOMICS_DEBATES_DATA: ReadonlyArray<{ slug: string; title: string; titleEn: string; field: string; sides: readonly string[] }> } | null,
  econDialoguesDataMod: { ECONOMICS_DIALOGUES_DATA: ReadonlyArray<{ slug: string; title: string; titleEn: string; field: string; participants: readonly string[] }> } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  if (economistsDataMod) {
    for (const e of economistsDataMod.ECONOMISTS_DATA) {
      docs.push({
        id: `economist-${e.slug}`,
        title: e.title,
        subtitle: e.subtitle,
        content: `${e.era} · 经济学家`,
        section: "economics",
        url: `/economics/economists/${e.slug}`,
        type: "economist",
      });
    }
  }

  if (econSchoolsDataMod) {
    for (const s of econSchoolsDataMod.ECONOMICS_SCHOOLS_DATA) {
      docs.push({
        id: `econ-school-${s.slug}`,
        title: s.title,
        subtitle: s.subtitle,
        content: `${s.era} · 经济学派`,
        section: "economics",
        url: `/economics/schools/${s.slug}`,
        type: "school",
      });
    }
  }

  if (theoriesDataMod) {
    for (const t of theoriesDataMod.THEORIES_DATA) {
      docs.push({
        id: `theory-${t.slug}`,
        title: t.title,
        subtitle: t.subtitle,
        content: `${t.category} · 经济理论`,
        section: "economics",
        url: `/economics/theories/${t.slug}`,
        type: "theory",
      });
    }
  }

  if (econConceptsDataMod) {
    for (const c of econConceptsDataMod.ECONOMICS_CONCEPTS_DATA) {
      docs.push({
        id: `econ-concept-${c.slug}`,
        title: c.title,
        subtitle: c.subtitle,
        content: `${c.field} · 经济学概念`,
        section: "economics",
        url: `/economics/concepts/${c.slug}`,
        type: "concept",
      });
    }
  }

  if (econKbDataMod) {
    for (const a of econKbDataMod.ECONOMICS_KB_DATA) {
      docs.push({
        id: `econ-kb-${a.slug}`,
        title: a.title,
        subtitle: a.titleEn,
        content: `${a.category} · 知识库`,
        section: "economics",
        url: `/economics/knowledge-base/${a.slug}`,
        type: "knowledgeBase",
      });
    }
  }

  if (econDebatesDataMod) {
    for (const d of econDebatesDataMod.ECONOMICS_DEBATES_DATA) {
      docs.push({
        id: `econ-debate-${d.slug}`,
        title: d.title,
        subtitle: d.titleEn,
        content: `${d.field} · ${d.sides.join(" vs ")}`,
        section: "economics",
        url: `/economics/debates/${d.slug}`,
        type: "dialogue",
      });
    }
  }

  if (econDialoguesDataMod) {
    for (const d of econDialoguesDataMod.ECONOMICS_DIALOGUES_DATA) {
      docs.push({
        id: `econ-dialogue-${d.slug}`,
        title: d.title,
        subtitle: d.titleEn,
        content: `${d.field} · ${d.participants.join("、")}`,
        section: "economics",
        url: `/economics/dialogues/${d.slug}`,
        type: "dialogue",
      });
    }
  }

  return docs;
}

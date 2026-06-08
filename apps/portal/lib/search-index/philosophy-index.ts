import type { SearchDocument } from "./types";

export function indexPhilosophy(
  thinkersDataMod: { THINKERS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; era: string }> } | null,
  schoolsDataMod: { SCHOOLS_DATA: ReadonlyArray<{ slug: string; title: string; subtitle: string; era: string }> } | null,
  ismsDataMod: { ISMS: ReadonlyArray<{ slug: string; title: string; title_en: string; category: string; era: string; key_figures: readonly string[] }> } | null,
  questionsDataMod: { QUESTIONS: ReadonlyArray<{ slug: string; title: string; field: string; key_figures: readonly string[] }> } | null,
  philosophyExperimentsDataMod: { PHILOSOPHY_EXPERIMENTS: ReadonlyArray<{ slug: string; title: string; title_en: string; philosopher: string; year: number; field: string }> } | null,
  dialoguesMod: { DIALOGUES: ReadonlyArray<{ slug: string; title: string; title_en: string; field: string; participants: readonly string[] }> } | null,
  conceptsDataMod: { CONCEPTS: ReadonlyArray<{ slug: string; title: string; title_en: string; field: string; key_figures: readonly string[] }> } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  if (thinkersDataMod) {
    for (const thinker of thinkersDataMod.THINKERS_DATA) {
      docs.push({
        id: `thinker-${thinker.slug}`,
        title: thinker.title,
        subtitle: thinker.subtitle,
        content: `${thinker.era} · 哲学家`,
        section: "philosophy",
        url: `/philosophy/thinkers/${thinker.slug}`,
        type: "thinker",
      });
    }
  }

  if (schoolsDataMod) {
    for (const school of schoolsDataMod.SCHOOLS_DATA) {
      docs.push({
        id: `school-${school.slug}`,
        title: school.title,
        subtitle: school.subtitle,
        content: `${school.era} · 哲学流派`,
        section: "philosophy",
        url: `/philosophy/schools/${school.slug}`,
        type: "school",
      });
    }
  }

  if (ismsDataMod) {
    for (const ism of ismsDataMod.ISMS) {
      docs.push({
        id: `ism-${ism.slug}`,
        title: ism.title,
        subtitle: ism.title_en,
        content: `${ism.category} · ${ism.key_figures.join("、")}`,
        section: "philosophy",
        url: `/philosophy/isms/${ism.slug}`,
        type: "ism",
      });
    }
  }

  if (questionsDataMod) {
    for (const q of questionsDataMod.QUESTIONS) {
      docs.push({
        id: `question-${q.slug}`,
        title: q.title,
        subtitle: q.field,
        content: `${q.field} · ${q.key_figures.join("、")}`,
        section: "philosophy",
        url: `/philosophy/questions/${q.slug}`,
        type: "question",
      });
    }
  }

  if (philosophyExperimentsDataMod) {
    for (const exp of philosophyExperimentsDataMod.PHILOSOPHY_EXPERIMENTS) {
      docs.push({
        id: `philo-exp-${exp.slug}`,
        title: exp.title,
        subtitle: exp.title_en,
        content: `${exp.field} · ${exp.philosopher}`,
        section: "philosophy",
        url: `/philosophy/experiments/${exp.slug}`,
        type: "experiment",
      });
    }
  }

  if (dialoguesMod) {
    for (const d of dialoguesMod.DIALOGUES) {
      docs.push({
        id: `dialogue-${d.slug}`,
        title: d.title,
        subtitle: d.title_en,
        content: `${d.field} · ${d.participants.join("、")}`,
        section: "philosophy",
        url: `/philosophy/dialogues/${d.slug}`,
        type: "dialogue",
      });
    }
  }

  if (conceptsDataMod) {
    for (const c of conceptsDataMod.CONCEPTS) {
      docs.push({
        id: `concept-${c.slug}`,
        title: c.title,
        subtitle: c.title_en,
        content: `${c.field} · ${c.key_figures.join("、")}`,
        section: "philosophy",
        url: `/philosophy/concepts/${c.slug}`,
        type: "concept",
      });
    }
  }

  return docs;
}

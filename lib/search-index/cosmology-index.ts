import type { SearchDocument } from "./types";

export function indexCosmology(
  erasDataMod: { COSMOLOGY_ERAS: ReadonlyArray<{ id: string; name: { primary: string; english: string }; description: string; timeRange: string }> } | null,
  cosKbDataMod: { COSMOLOGY_KB_DATA: ReadonlyArray<{ slug: string; title: string; titleEn: string; category: string }> } | null,
  cosDialoguesDataMod: { COSMOLOGY_DIALOGUES_DATA: ReadonlyArray<{ slug: string; title: string; titleEn: string; field: string; participants: readonly string[] }> } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  if (erasDataMod) {
    for (const era of erasDataMod.COSMOLOGY_ERAS) {
      docs.push({
        id: `cosmology-era-${era.id}`,
        title: era.name.primary,
        subtitle: era.name.english,
        content: `${era.timeRange} · ${era.description}`,
        section: "cosmology",
        url: `/cosmology/timeline`,
        type: "era",
      });
    }
  }

  if (cosKbDataMod) {
    for (const a of cosKbDataMod.COSMOLOGY_KB_DATA) {
      docs.push({
        id: `cosmology-kb-${a.slug}`,
        title: a.title,
        subtitle: a.titleEn,
        content: `${a.category} · 知识库`,
        section: "cosmology",
        url: `/cosmology/knowledge-base/${a.slug}`,
        type: "knowledgeBase",
      });
    }
  }

  if (cosDialoguesDataMod) {
    for (const d of cosDialoguesDataMod.COSMOLOGY_DIALOGUES_DATA) {
      docs.push({
        id: `cosmology-dialogue-${d.slug}`,
        title: d.title,
        subtitle: d.titleEn,
        content: `${d.field} · ${d.participants.join("、")}`,
        section: "cosmology",
        url: `/cosmology/dialogues/${d.slug}`,
        type: "dialogue",
      });
    }
  }

  return docs;
}

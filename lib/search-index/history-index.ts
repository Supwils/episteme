import type { SearchDocument } from "./types";

export function indexHistory(
  eventsMod: { EVENTS: Array<{ year: number; title: string; desc: string }> },
  figuresMod: { FIGURES: Array<Record<string, unknown>> } | null,
  simulationsDataMod: { SIMULATIONS: ReadonlyArray<{ id: string; title: string; year: string; tagline: string }> } | null,
  kbDataMod: { KB_ARTICLES?: ReadonlyArray<{ slug: string; title: string; era: string }> } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  const events = eventsMod.EVENTS;
  for (const event of events) {
    docs.push({
      id: `event-${event.title}`,
      title: event.title,
      subtitle: event.year < 0 ? `公元前${Math.abs(event.year)}年` : `${event.year}年`,
      content: event.desc,
      section: "history",
      url: "/human-history/timeline",
      type: "event",
    });
  }

  if (figuresMod) {
    const figures = figuresMod.FIGURES;
    for (const fig of figures) {
      const name = String(fig.name ?? "");
      if (!name) continue;
      docs.push({
        id: `figure-${name}`,
        title: name,
        subtitle: String(fig.title ?? ""),
        content: String(fig.desc ?? ""),
        section: "history",
        url: "/human-history/figures",
        type: "figure",
      });
    }
  }

  if (simulationsDataMod) {
    const simulations = simulationsDataMod.SIMULATIONS;
    for (const sim of simulations) {
      docs.push({
        id: `history-sim-${sim.id}`,
        title: sim.title,
        subtitle: sim.year,
        content: sim.tagline,
        section: "history",
        url: `/human-history/simulations?sim=${sim.id}`,
        type: "simulation",
      });
    }
  }

  if (kbDataMod) {
    const articles = kbDataMod.KB_ARTICLES ?? [];
    for (const article of articles) {
      docs.push({
        id: `kb-${article.slug}`,
        title: article.title,
        subtitle: article.era,
        content: `知识库 · ${article.era}`,
        section: "history",
        url: `/human-history/knowledge/${article.slug}`,
        type: "article",
      });
    }
  }

  return docs;
}

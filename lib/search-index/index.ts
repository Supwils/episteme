import MiniSearch from "minisearch";
import type { SearchDocument } from "./types";
import { indexPhysics } from "./physics-index";
import { indexHistory } from "./history-index";
import { indexPhilosophy } from "./philosophy-index";
import { indexLifeScience } from "./life-science-index";
import { indexEconomics } from "./economics-index";
import { indexPsychology } from "./psychology-index";
import { indexCosmology } from "./cosmology-index";
import { indexFrontier } from "./frontier-index";
import { indexDomains } from "./domain-index";
import { indexMathematics } from "./mathematics-index";
import { indexCuriosities } from "./curiosities-index";

export type { SearchDocument } from "./types";

let index: MiniSearch<SearchDocument> | null = null;
let documents: SearchDocument[] = [];

function createIndex(docs: SearchDocument[]): MiniSearch<SearchDocument> {
  const ms = new MiniSearch<SearchDocument>({
    fields: ["title", "subtitle", "content"],
    storeFields: ["title", "subtitle", "content", "section", "url", "type"],
    searchOptions: {
      boost: { title: 3, subtitle: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });
  ms.addAll(docs);
  return ms;
}

export async function getSearchIndex(): Promise<{
  index: MiniSearch<SearchDocument>;
  documents: SearchDocument[];
}> {
  if (index) return { index, documents };

  const docs: SearchDocument[] = [];

  try {
    const [
      cosmosMods,
      physicsMods,
      eventsMod,
      thinkersDataMod,
      schoolsDataMod,
      ismsDataMod,
      questionsDataMod,
      experimentsDataMod,
      philosophyExperimentsDataMod,
      dialoguesMod,
      conceptsDataMod,
      figuresMod,
      simulationsDataMod,
      lifeScienceMod,
      kbDataMod,
      economistsDataMod,
      econSchoolsDataMod,
      theoriesDataMod,
      econConceptsDataMod,
      psychologistsDataMod,
      psychExperimentsDataMod,
      phenomenaDataMod,
      disordersDataMod,
      psychDialoguesDataMod,
      econKbDataMod,
      psychKbDataMod,
      cosmologyErasDataMod,
      cosmologyKbDataMod,
      econDebatesDataMod,
      econDialoguesDataMod,
      psychSchoolsDataMod,
      cosmologyDialoguesDataMod,
      physicsSearchDataMod,
      frontierDataMod,
      domainDataMod,
      mathDataMod,
      curiositiesMod,
    ] = await Promise.all([
      Promise.all([
        import("@/content/universe-physics/cosmos/T0"),
        import("@/content/universe-physics/cosmos/T1"),
        import("@/content/universe-physics/cosmos/T2"),
        import("@/content/universe-physics/cosmos/T3"),
        import("@/content/universe-physics/cosmos/T4"),
        import("@/content/universe-physics/cosmos/T5"),
        import("@/content/universe-physics/cosmos/T6"),
        import("@/content/universe-physics/cosmos/T7"),
      ]),
      Promise.all([
        import("@/content/universe-physics/physics/P0-classical-mechanics"),
        import("@/content/universe-physics/physics/P1-thermodynamics"),
        import("@/content/universe-physics/physics/P2-electromagnetism"),
        import("@/content/universe-physics/physics/P3-relativity"),
        import("@/content/universe-physics/physics/P4-quantum-mechanics"),
        import("@/content/universe-physics/physics/P5-atomic-molecular"),
        import("@/content/universe-physics/physics/P6-nuclear-particle"),
        import("@/content/universe-physics/physics/P7-standard-model"),
        import("@/content/universe-physics/physics/P8-frontier"),
      ]),
      import("@/content/human-history/data/events.js"),
      import("@/content/philosophy/thinkers-data").catch(() => null),
      import("@/content/philosophy/schools-data").catch(() => null),
      import("@/content/philosophy/isms-data").catch(() => null),
      import("@/content/philosophy/questions-data").catch(() => null),
      import("@/content/universe-physics/experiments-data").catch(() => null),
      import("@/content/philosophy/philosophy-experiments-data").catch(() => null),
      import("@/content/philosophy/dialogues/index").catch(() => null),
      import("@/content/philosophy/concepts-data").catch(() => null),
      import("@/content/human-history/data/figures.js").catch(() => null),
      import("@/content/human-history/data/simulations-data").catch(() => null),
      import("@/subjects/life-science/lib/index").catch(() => null),
      import("@/content/human-history/data/knowledge-base-data").catch(() => null),
      import("@/content/economics/economists-data").catch(() => null),
      import("@/content/economics/schools-data").catch(() => null),
      import("@/content/economics/theories-data").catch(() => null),
      import("@/content/economics/concepts-data").catch(() => null),
      import("@/content/psychology/theorists-data").catch(() => null),
      import("@/content/psychology/experiments-data").catch(() => null),
      import("@/content/psychology/phenomena-data").catch(() => null),
      import("@/content/psychology/disorders-data").catch(() => null),
      import("@/content/psychology/dialogues-data").catch(() => null),
      import("@/content/economics/knowledge-base-data").catch(() => null),
      import("@/content/psychology/knowledge-base-data").catch(() => null),
      import("@/content/cosmology/eras").catch(() => null),
      import("@/content/cosmology/knowledge-base-data").catch(() => null),
      import("@/content/economics/debates-data").catch(() => null),
      import("@/content/economics/dialogues-data").catch(() => null),
      import("@/content/psychology/schools-data").catch(() => null),
      import("@/content/cosmology/dialogues-data").catch(() => null),
      import("@/content/universe-physics/knowledge-base-data").catch(() => null),
      import("@/lib/search-index/frontier-data").catch(() => null),
      import("@/lib/search-index/domain-data").catch(() => null),
      import("@/lib/search-index/mathematics-data").catch(() => null),
      import("@/lib/curiosities").catch(() => null),
    ]);

    /* eslint-disable @typescript-eslint/no-explicit-any -- dynamically imported modules have no shared static type at this boundary */
    docs.push(
      ...indexPhysics(
        cosmosMods as any,
        physicsMods as any,
        experimentsDataMod as any,
        physicsSearchDataMod as any,
        physicsSearchDataMod as any
      )
    );
    docs.push(
      ...indexHistory(
        eventsMod as any,
        figuresMod as any,
        simulationsDataMod as any,
        kbDataMod as any
      )
    );
    /* eslint-enable @typescript-eslint/no-explicit-any */
    docs.push(
      ...indexPhilosophy(
        thinkersDataMod,
        schoolsDataMod,
        ismsDataMod,
        questionsDataMod,
        philosophyExperimentsDataMod,
        dialoguesMod,
        conceptsDataMod
      )
    );
    docs.push(...indexLifeScience(lifeScienceMod));
    docs.push(
      ...indexEconomics(
        economistsDataMod,
        econSchoolsDataMod,
        theoriesDataMod,
        econConceptsDataMod,
        econKbDataMod,
        econDebatesDataMod,
        econDialoguesDataMod
      )
    );
    docs.push(
      ...indexPsychology(
        psychologistsDataMod,
        psychExperimentsDataMod,
        phenomenaDataMod,
        disordersDataMod,
        psychDialoguesDataMod,
        psychKbDataMod,
        psychSchoolsDataMod
      )
    );
    docs.push(
      ...indexCosmology(cosmologyErasDataMod, cosmologyKbDataMod, cosmologyDialoguesDataMod)
    );
    docs.push(...indexFrontier(frontierDataMod));
    docs.push(...indexDomains(domainDataMod));
    docs.push(...indexMathematics(mathDataMod));
    docs.push(...indexCuriosities(curiositiesMod));

    docs.push({
      id: "knowledge-graph",
      title: "知识图谱",
      subtitle: "Knowledge Graph",
      content: "以节点与连线呈现知识之间的深层关联，发现跨领域的隐性联系",
      section: "physics",
      url: "/knowledge-graph",
      type: "page",
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[search-index] Failed to build index:", err);
    }
  }

  documents = docs;
  index = createIndex(docs);
  return { index, documents };
}

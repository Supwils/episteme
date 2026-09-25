/**
 * Emits generated/site-stats.json — the one source for every count the site
 * prints (portal cards, domain descriptions, featured blurbs, meta text).
 *
 * Article counts come from search-stats.json, so a domain's number and the
 * site total are drawn from the same set. Collection counts ("117 位哲学家")
 * use the same loaders the domain landings render, so the portal and the
 * landing can never disagree. Runs inside `pnpm gen-all` after `gen-search-index`
 * (and so after `gen-links`, whose backlink index and corpus meta it reads).
 */
import { readFileSync, writeFileSync } from "node:fs";
// FRONTIER_DOMAINS is test-pinned to equal the DOMAINS ids; lib/data.tsx itself
// carries JSX and cannot load in a plain script.
import { FRONTIER_DOMAINS } from "../lib/frontier.ts";
import { getAllThinkers } from "../lib/mdx.ts";
import { getAllSchools as getPhilosophySchools } from "../lib/schools.ts";
import { getAllExperiments as getThoughtExperiments } from "../lib/experiments.ts";
import {
  getAllEconomists,
  getAllTheories,
  getAllConcepts as getEconomicsConcepts,
  getAllSchools as getEconomicsSchools,
} from "../subjects/economics/lib/mdx.ts";
import {
  getAllTheorists,
  getAllExperiments as getPsychologyExperiments,
  getAllPhenomena,
  getAllSchools as getPsychologySchools,
} from "../subjects/psychology/lib/mdx.ts";
import { getAllEras } from "../subjects/life-science/lib/eras.ts";
import { getAllExtinctions } from "../subjects/life-science/lib/extinctions.ts";
import { getAllScientists } from "../subjects/life-science/lib/scientists.ts";
import { getAllSpecies } from "../subjects/life-science/lib/species/index.ts";
import { HISTORY_HOME_COUNTS } from "../content/human-history/data/home-summary.js";
import { KB_ARTICLES } from "../content/human-history/data/knowledge-base-data.ts";
import { ALL_EDGES, ALL_NODES } from "../subjects/knowledge-graph/data/graph-data.ts";
import { BACKLINKS_INDEX } from "../lib/backlinks-index.ts";

type Collection = { label: string; unit: string; count: number };

const COLLECTIONS: Record<string, Collection[]> = {
  "human-history": [
    { label: "核心事件", unit: "个", count: HISTORY_HOME_COUNTS.events },
    { label: "历史人物", unit: "位", count: HISTORY_HOME_COUNTS.figures },
    { label: "知识库文章", unit: "篇", count: KB_ARTICLES.length },
  ],
  philosophy: [
    { label: "哲学家", unit: "位", count: getAllThinkers().length },
    { label: "流派", unit: "个", count: getPhilosophySchools().length },
    { label: "思想实验", unit: "个", count: getThoughtExperiments().length },
  ],
  "life-science": [
    { label: "地质时代", unit: "个", count: getAllEras().length },
    { label: "关键物种", unit: "个", count: getAllSpecies().length },
    { label: "大灭绝", unit: "次", count: getAllExtinctions().length },
    { label: "科学家", unit: "位", count: getAllScientists().length },
  ],
  economics: [
    { label: "经济学家", unit: "位", count: getAllEconomists().length },
    { label: "理论", unit: "个", count: getAllTheories().length },
    { label: "概念", unit: "个", count: getEconomicsConcepts().length },
    { label: "流派", unit: "个", count: getEconomicsSchools().length },
  ],
  psychology: [
    { label: "理论家", unit: "位", count: getAllTheorists().length },
    { label: "实验", unit: "项", count: getPsychologyExperiments().length },
    { label: "现象", unit: "个", count: getAllPhenomena().length },
    { label: "流派", unit: "个", count: getPsychologySchools().length },
  ],
};

const searchStats = JSON.parse(readFileSync("generated/search-stats.json", "utf8")) as {
  articles: number;
  documents: number;
  byDomain: Record<string, number>;
};
// Hubs feed the no-JS index on /knowledge-graph. Nodes are grouped by the route
// they link to, because graph domain ids ("physics") differ from route ids.
const HUBS_PER_DOMAIN = 6;
const degree = new Map<string, number>();
for (const edge of ALL_EDGES) {
  degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
  degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
}
function hubsFor(domainId: string) {
  return ALL_NODES.filter((node) => node.url?.split("/")[1] === domainId)
    .map((node) => ({ label: node.label, url: node.url!, degree: degree.get(node.id) ?? 0 }))
    .sort((a, b) => b.degree - a.degree || a.label.localeCompare(b.label, "zh"))
    .slice(0, HUBS_PER_DOMAIN);
}
function graphNodeCount(domainId: string) {
  return ALL_NODES.filter((node) => node.url?.split("/")[1] === domainId).length;
}
const graphNodes = ALL_NODES.length;

// Bridges feed 「与其他领域的桥」 on domain landings: for each pair of domains,
// how many inline [[wiki-links]] cross between them (either direction), plus the
// article on the far side that the pair most often meets at.
const BRIDGES_PER_DOMAIN = 8;
const MIN_BRIDGE_LINKS = 3;
const corpusMeta = JSON.parse(readFileSync("generated/corpus-meta.json", "utf8")) as {
  docs: { t: string; u: string }[];
};
const titleByUrl = new Map(corpusMeta.docs.map((doc) => [doc.u, doc.t]));
const routeDomain = (url: string) => url.split("/")[1] ?? "";
// pairLinks["law"]["economics"] = links; meetings["law"]["economics"][url] = hits
const pairLinks = new Map<string, Map<string, number>>();
const meetings = new Map<string, Map<string, Map<string, number>>>();
function recordBridge(here: string, there: string, farUrl: string) {
  const links = pairLinks.get(here) ?? new Map<string, number>();
  links.set(there, (links.get(there) ?? 0) + 1);
  pairLinks.set(here, links);
  const byDomain = meetings.get(here) ?? new Map<string, Map<string, number>>();
  const hits = byDomain.get(there) ?? new Map<string, number>();
  hits.set(farUrl, (hits.get(farUrl) ?? 0) + 1);
  byDomain.set(there, hits);
  meetings.set(here, byDomain);
}
for (const [target, sources] of Object.entries(BACKLINKS_INDEX)) {
  for (const source of sources) {
    const from = routeDomain(source.url);
    const to = routeDomain(target);
    if (from === to) continue;
    recordBridge(from, to, target);
    recordBridge(to, from, source.url);
  }
}
function bridgesFor(domainId: string) {
  return [...(pairLinks.get(domainId) ?? new Map<string, number>())]
    .filter(([, links]) => links >= MIN_BRIDGE_LINKS)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, BRIDGES_PER_DOMAIN)
    .map(([domain, links]) => {
      const [url] = [...meetings.get(domainId)!.get(domain)!].sort(
        (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
      )[0]!;
      return { domain, links, via: { title: titleByUrl.get(url) ?? url, url } };
    });
}

const domains = Object.fromEntries(
  FRONTIER_DOMAINS.map((id) => [
    id,
    {
      articles: searchStats.byDomain[id] ?? 0,
      collections: COLLECTIONS[id] ?? [],
      graphNodes: graphNodeCount(id),
      hubs: hubsFor(id),
      bridges: bridgesFor(id),
    },
  ])
);

writeFileSync(
  "generated/site-stats.json",
  JSON.stringify({
    v: 1,
    domainCount: FRONTIER_DOMAINS.length,
    articles: searchStats.articles,
    documents: searchStats.documents,
    graphNodes,
    domains,
  })
);
console.log(
  `✅ site stats → generated/site-stats.json (${FRONTIER_DOMAINS.length} domains, ` +
    `${searchStats.articles} articles, ${graphNodes} graph nodes)`
);

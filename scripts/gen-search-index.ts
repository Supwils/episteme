/**
 * Builds both tiers of the knowledge search from `content/`.
 *
 *   public/search-index.json      tier 1 — bigram MiniSearch over titles and
 *     section headings. Loaded in a Worker, answers as the reader types. ~400KB.
 *   generated/corpus.txt          tier 2 — article prose as one string.
 *   generated/corpus-meta.json    tier 2 — where each article starts, plus the
 *     metadata needed to render a hit.
 *
 * Tier 2 is regenerated on every build and is not committed: 10MB of prose in
 * git would grow the history by that much on every content change. Tier 1 is
 * committed, like the other generated indexes, so `pnpm dev` and the unit tests
 * work without a build.
 *
 * Run: pnpm gen-search-index
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import MiniSearch from "minisearch";
import { collectArticles, type Article } from "../lib/search/articles";
import { getSearchIndex } from "../lib/search-index";
import { KNOWLEDGE_DOMAINS } from "../lib/new-domains";
import { toSearchableText } from "../lib/search/extract";
import { buildCorpus } from "../lib/search/corpus";
import {
  SEARCH_INDEX_OPTIONS,
  SEARCH_INDEX_VERSION,
  type SearchDoc,
  type SearchIndexArtifact,
} from "../lib/search/types";

const ROOT = process.cwd();
const OUT_INDEX = join(ROOT, "public", "search-index.json");
const GENERATED = join(ROOT, "generated");
const OUT_CORPUS = join(GENERATED, "corpus.txt");
const OUT_CORPUS_META = join(GENERATED, "corpus-meta.json");
const OUT_STATS = join(GENERATED, "search-stats.json");

interface Indexed {
  id: number;
  title: string;
  text: string;
}

/** Entity documents label these domains by their subject rather than their route
 *  prefix. Articles must agree, or they land in a group the UI cannot render. */
const SECTION_BY_DOMAIN: Record<string, string> = {
  "human-history": "history",
  "universe-physics": "physics",
};

/** The exact `<domain>/<section>` set the retired domain mirror covered — the
 *  engine-driven domains render from MDX, so their search metadata now comes
 *  straight from frontmatter. Matching the mirror's granularity keeps the
 *  content type identical (e.g. psychology/debates stays an "article"). */
const ENGINE_SECTIONS = new Set(
  Object.values(KNOWLEDGE_DOMAINS).flatMap((c) => c.sections.map((s) => `${c.domain}/${s.key}`))
);

/** The content type for an article with no typed entity, matching what the
 *  retired domain/frontier/math index mirrors used to assign. */
function articleType(article: Article): string {
  if (article.url.includes("/frontier/")) return "frontier";
  const [, domain, section] = article.url.split("/");
  if (ENGINE_SECTIONS.has(`${domain}/${section}`) || article.domain === "mathematics") {
    return "entry";
  }
  return "article";
}

/**
 * Tier 1 must grow with the number of documents, not with their length: the
 * artifact is fetched whole into a Worker and has a hard size budget. Two rules
 * bound each article's contribution.
 *
 * 1. Structural headings are dropped. "参考文献" / "跨域连接" / "延伸阅读" appear in
 *    almost every article, so their bigrams carried posting lists thousands of
 *    entries long while being useless as queries — a search for 参考文献 matching
 *    2300 articles is noise, not recall. The cut is by document frequency rather
 *    than a hand-written list, so a new domain template's boilerplate is excluded
 *    automatically as the corpus grows.
 * 2. What survives is deduplicated and truncated to a character budget. Heading
 *    text also lives in the tier-2 prose corpus, so an article stays reachable by
 *    its later sections on /search; the budget only bounds what answers instantly
 *    while typing.
 */
const HEADING_STOPWORD_RATIO = 0.015;
const HEADING_STOPWORD_FLOOR = 20;
const HEADING_CHAR_BUDGET = 100;

function buildHeadingSelector(articles: Article[]): {
  select: (article: Article) => string;
  stopwords: string[];
} {
  const documentFrequency = new Map<string, number>();
  for (const article of articles) {
    for (const heading of new Set(article.headings.map((h) => h.trim()).filter(Boolean))) {
      documentFrequency.set(heading, (documentFrequency.get(heading) ?? 0) + 1);
    }
  }
  const threshold = Math.max(
    HEADING_STOPWORD_FLOOR,
    Math.round(articles.length * HEADING_STOPWORD_RATIO)
  );
  const stopwords = [...documentFrequency]
    .filter(([, count]) => count >= threshold)
    .sort((a, b) => b[1] - a[1])
    .map(([heading]) => heading);
  const stopwordSet = new Set(stopwords);

  return {
    stopwords,
    select(article) {
      const kept: string[] = [];
      let used = 0;
      for (const heading of new Set(article.headings.map((h) => h.trim()))) {
        if (!heading || stopwordSet.has(heading)) continue;
        if (used + heading.length > HEADING_CHAR_BUDGET) break;
        kept.push(heading);
        used += heading.length;
      }
      return kept.join(" ");
    },
  };
}

async function main(): Promise<void> {
  const articles = collectArticles();

  // Entity documents (history figures, species, economists…) live in typed data
  // modules rather than MDX. Reuse the existing collectors so the new pipeline
  // never covers less than the one it replaces.
  const { documents: entities } = await getSearchIndex();
  const entityByUrl = new Map(entities.map((d) => [d.url, d]));

  const headings = buildHeadingSelector(articles);

  const docs: SearchDoc[] = [];
  const indexed: Indexed[] = [];
  const bodies: string[] = [];
  const corpusDocs: SearchDoc[] = [];

  for (const article of articles) {
    const entity = entityByUrl.get(article.url);
    entityByUrl.delete(article.url);

    const doc: SearchDoc = {
      t: article.title,
      s: entity?.subtitle ?? article.titleEn,
      u: article.url,
      c: entity?.section ?? SECTION_BY_DOMAIN[article.domain] ?? article.domain,
      k: entity?.type ?? articleType(article),
    };
    indexed.push({
      id: docs.length,
      title: `${doc.t} ${doc.s}`.trim(),
      text: headings.select(article),
    });
    docs.push(doc);

    corpusDocs.push(doc);
    bodies.push(toSearchableText(article.body));
  }

  // Whatever is left has no MDX prose: index its title and descriptor so the
  // reader can still reach it.
  for (const entity of entityByUrl.values()) {
    const doc: SearchDoc = {
      t: entity.title,
      s: entity.subtitle,
      u: entity.url,
      c: entity.section,
      k: entity.type,
    };
    indexed.push({
      id: docs.length,
      title: `${doc.t} ${doc.s}`.trim(),
      text: entity.content,
    });
    docs.push(doc);
  }

  const index = new MiniSearch<Indexed>(SEARCH_INDEX_OPTIONS);
  index.addAll(indexed);

  const artifact: SearchIndexArtifact = {
    v: SEARCH_INDEX_VERSION,
    docs,
    index: index.toJSON(),
  };
  writeFileSync(OUT_INDEX, JSON.stringify(artifact));

  const corpus = buildCorpus(bodies);
  mkdirSync(GENERATED, { recursive: true });
  writeFileSync(OUT_CORPUS, corpus.text);
  writeFileSync(
    OUT_CORPUS_META,
    JSON.stringify({ v: SEARCH_INDEX_VERSION, offsets: corpus.offsets, docs: corpusDocs })
  );
  // Tiny committed snapshot the portal stats strip reads — keeps the homepage
  // numbers in lockstep with the index instead of drifting between content rounds.
  writeFileSync(
    OUT_STATS,
    JSON.stringify({
      v: SEARCH_INDEX_VERSION,
      documents: docs.length,
      articles: articles.length,
      entities: docs.length - articles.length,
    })
  );

  const indexBytes = readFileSync(OUT_INDEX).byteLength;
  console.log(
    `✅ search tier 1: ${docs.length} documents ` +
      `(${articles.length} articles + ${docs.length - articles.length} entities), ` +
      `${(indexBytes / 1024).toFixed(0)}KB\n` +
      `   heading budget: ${headings.stopwords.length} structural headings excluded ` +
      `(top: ${headings.stopwords.slice(0, 3).join(" / ")}), ` +
      `${HEADING_CHAR_BUDGET} chars kept per article\n` +
      `✅ search tier 2: ${corpusDocs.length} bodies, ` +
      `${(corpus.text.length / 1e6).toFixed(2)}M characters`
  );
}

void main();

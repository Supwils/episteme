import { collectArticles } from "@/lib/search/articles";
import type { GraphNode } from "./types";

type AuditScope = {
  /** Graph domain key. Two domains name theirs differently from their route. */
  domain: string;
  /** content/ directory and first URL segment, when it differs from `domain`. */
  contentDirectory?: string;
  sections: readonly string[];
  minimumCoveragePercent: number;
};

export type ContentReachabilityReport = {
  domain: string;
  articleUrls: string[];
  coveredArticleUrls: string[];
  missingArticleUrls: string[];
  graphNodeUrlsWithoutArticle: string[];
  coveragePercent: number;
};

// These domains share stable, one-article-per-file routes. Keeping the audit
// scope explicit prevents incompatible legacy loaders from producing misleading
// coverage rates while still making expansion in mature domains measurable.
export const CONTENT_REACHABILITY_AUDIT_SCOPES: readonly AuditScope[] = [
  {
    domain: "computer-science",
    sections: ["algorithms", "concepts", "frontier", "pioneers", "systems", "theory"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "mathematics",
    sections: [
      "concepts",
      "dialogues",
      "frontier",
      "knowledge-base",
      "mathematicians",
      "paradoxes",
      "theorems",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "chemistry",
    sections: [
      "concepts",
      "figures",
      "frontier",
      "methods",
      "milestones",
      "reactions",
      "substances",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "medicine",
    sections: [
      "concepts",
      "diseases",
      "ethics",
      "events",
      "figures",
      "frontier",
      "public-health",
      "technologies",
      "traditions",
      "trial-analyses",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "sociology",
    sections: ["concepts", "frontier", "institutions", "methods", "thinkers"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "law",
    sections: [
      "foundations",
      "frontier",
      "public-law",
      "private-law",
      "criminal-and-procedure",
      "legal-traditions",
      "global-and-digital",
      "judgment-analyses",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "arts",
    sections: [
      "foundations",
      "frontier",
      "media",
      "architecture",
      "traditions",
      "aesthetics",
      "methods",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "engineering",
    sections: ["foundations", "frontier", "energy", "materials", "machines", "civil", "frontiers"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "political-science",
    sections: [
      "concepts",
      "frontier",
      "institutions",
      "international-relations",
      "isms",
      "methods",
      "thinkers",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "psychology",
    sections: [
      "debates",
      "dialogues",
      "disorders",
      "experiments",
      "frontier",
      "knowledge-base",
      "methods",
      "phenomena",
      "schools",
      "theorists",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "earth-science",
    sections: [
      "climate-risks",
      "concepts",
      "event-analyses",
      "events",
      "frontier",
      "pioneers",
      "processes",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "economics",
    sections: [
      "case-studies",
      "concepts",
      "debates",
      "dialogues",
      "economists",
      "frontier",
      "knowledge-base",
      "policy-analyses",
      "schools",
      "theories",
    ],
    minimumCoveragePercent: 100,
  },
  {
    // The last four cross-section duplicate slugs were merged in T-CONTENT-64;
    // philosophy now has the same strict no-orphan contract as mature domains.
    domain: "philosophy",
    sections: [
      "concepts",
      "dialogues",
      "experiments",
      "frontier",
      "isms",
      "questions",
      "schools",
      "thinkers",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "linguistics",
    sections: [
      "acquisition-and-mind",
      "frontier",
      "history-typology-society",
      "methods-and-frontiers",
      "sounds-and-signs",
      "words-sentences-meaning",
      "writing-systems",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "cosmology",
    sections: ["dialogues", "frontier", "knowledge-base"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "life-science",
    sections: ["dialogues", "events", "frontier", "knowledge-base"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "physics",
    contentDirectory: "universe-physics",
    sections: ["dialogues", "frontier", "knowledge-base"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "history",
    contentDirectory: "human-history",
    sections: ["frontier", "knowledge", "source-analyses"],
    minimumCoveragePercent: 100,
  },
];

const routePrefix = (scope: AuditScope): string => scope.contentDirectory ?? scope.domain;

function getArticleUrls(scope: AuditScope): string[] {
  const sections = new Set(scope.sections);
  return collectArticles()
    .filter((article) => article.domain === routePrefix(scope) && sections.has(article.section))
    .map((article) => article.url)
    .sort();
}

export function auditContentReachability(nodes: readonly GraphNode[]): ContentReachabilityReport[] {
  return CONTENT_REACHABILITY_AUDIT_SCOPES.map((scope) => {
    const articleUrls = getArticleUrls(scope);
    const articleUrlSet = new Set(articleUrls);
    // Only real route inventory is compared. The shared collector understands
    // composite knowledge-base slugs and excludes history's editorial meta docs,
    // so this audit cannot silently omit a whole nested content tree again.
    const scopedSections = new Set(scope.sections);
    const graphNodeUrls = nodes
      .filter((node) => node.domain === scope.domain && node.url)
      .map((node) => node.url!)
      .filter((url) => scopedSections.has(url.split("/")[2] ?? ""));
    const graphNodeUrlSet = new Set(graphNodeUrls);
    const coveredArticleUrls = articleUrls.filter((url) => graphNodeUrlSet.has(url));

    return {
      domain: scope.domain,
      articleUrls,
      coveredArticleUrls,
      missingArticleUrls: articleUrls.filter((url) => !graphNodeUrlSet.has(url)),
      graphNodeUrlsWithoutArticle: [...graphNodeUrlSet]
        .filter((url) => !articleUrlSet.has(url))
        .sort(),
      coveragePercent: (coveredArticleUrls.length / articleUrls.length) * 100,
    };
  });
}

import fs from "node:fs";
import path from "node:path";
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
    sections: ["concepts", "dialogues", "frontier", "mathematicians", "paradoxes", "theorems"],
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
      "public-law",
      "private-law",
      "criminal-and-procedure",
      "legal-traditions",
      "global-and-digital",
    ],
    minimumCoveragePercent: 100,
  },
  {
    domain: "arts",
    sections: ["foundations", "media", "architecture", "traditions", "aesthetics", "methods"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "engineering",
    sections: ["foundations", "energy", "materials", "machines", "civil", "frontiers"],
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
    sections: ["climate-risks", "concepts", "events", "frontier", "pioneers", "processes"],
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
      "schools",
      "theories",
    ],
    minimumCoveragePercent: 100,
  },
  {
    // Four articles share a slug with an article in another section, so only one
    // of each pair can hold `philosophy:<slug>` — the same ambiguity that makes
    // the wiki index drop those slugs. Merging them is content work, not a floor.
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
    minimumCoveragePercent: 98,
  },
  {
    domain: "linguistics",
    sections: [
      "acquisition-and-mind",
      "history-typology-society",
      "methods-and-frontiers",
      "sounds-and-signs",
      "words-sentences-meaning",
      "writing-systems",
    ],
    minimumCoveragePercent: 100,
  },
  {
    // knowledge-base is left out of the three legacy domains below: those routes
    // are `category--slug` composites generated from one directory deeper.
    domain: "cosmology",
    sections: ["dialogues", "frontier"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "life-science",
    sections: ["dialogues", "events", "frontier"],
    minimumCoveragePercent: 100,
  },
  {
    domain: "physics",
    contentDirectory: "universe-physics",
    sections: ["dialogues", "frontier"],
    minimumCoveragePercent: 100,
  },
  {
    // Only frontier: knowledge-base/ holds editorial meta documents that were
    // deliberately removed from the detail routes, and the history articles
    // themselves are composites one directory deeper.
    domain: "history",
    contentDirectory: "human-history",
    sections: ["frontier"],
    minimumCoveragePercent: 100,
  },
];

const routePrefix = (scope: AuditScope): string => scope.contentDirectory ?? scope.domain;

function getArticleUrls(scope: AuditScope): string[] {
  const urls: string[] = [];
  for (const section of scope.sections) {
    const sectionPath = path.join(process.cwd(), "content", routePrefix(scope), section);
    if (!fs.existsSync(sectionPath)) continue;
    for (const entry of fs.readdirSync(sectionPath)) {
      if (!/\.mdx?$/.test(entry) || entry.endsWith(".narration.md")) continue;
      urls.push(`/${routePrefix(scope)}/${section}/${entry.replace(/\.mdx?$/, "")}`);
    }
  }
  return urls.sort();
}

export function auditContentReachability(nodes: readonly GraphNode[]): ContentReachabilityReport[] {
  return CONTENT_REACHABILITY_AUDIT_SCOPES.map((scope) => {
    const articleUrls = getArticleUrls(scope);
    const articleUrlSet = new Set(articleUrls);
    // Only the scoped sections are compared. Sections left out of a scope are
    // driven by something other than one file per route — a registry with
    // optional long-form bodies (life-science scientists), or a knowledge base
    // whose routes are `category--slug` composites one directory deeper — and
    // reading their nodes as article-less would be a false alarm, not a finding.
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

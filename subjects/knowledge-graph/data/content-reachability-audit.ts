import fs from "node:fs";
import path from "node:path";
import type { GraphNode } from "./types";

type AuditScope = {
  domain: string;
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
    sections: ["algorithms", "concepts", "frontier", "pioneers", "theory"],
    minimumCoveragePercent: 25,
  },
  {
    domain: "mathematics",
    sections: ["concepts", "dialogues", "frontier", "mathematicians", "paradoxes", "theorems"],
    minimumCoveragePercent: 28,
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
    minimumCoveragePercent: 55,
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
    minimumCoveragePercent: 50,
  },
  {
    domain: "sociology",
    sections: ["concepts", "frontier", "institutions", "methods", "thinkers"],
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
    minimumCoveragePercent: 34,
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
    minimumCoveragePercent: 70,
  },
  {
    domain: "earth-science",
    sections: ["climate-risks", "concepts", "events", "frontier", "pioneers", "processes"],
    minimumCoveragePercent: 62,
  },
];

function getArticleUrls(scope: AuditScope): string[] {
  const urls: string[] = [];
  for (const section of scope.sections) {
    const sectionPath = path.join(process.cwd(), "content", scope.domain, section);
    if (!fs.existsSync(sectionPath)) continue;
    for (const entry of fs.readdirSync(sectionPath)) {
      if (!/\.mdx?$/.test(entry) || entry.endsWith(".narration.md")) continue;
      urls.push(`/${scope.domain}/${section}/${entry.replace(/\.mdx?$/, "")}`);
    }
  }
  return urls.sort();
}

export function auditContentReachability(nodes: readonly GraphNode[]): ContentReachabilityReport[] {
  return CONTENT_REACHABILITY_AUDIT_SCOPES.map((scope) => {
    const articleUrls = getArticleUrls(scope);
    const articleUrlSet = new Set(articleUrls);
    const graphNodeUrls = nodes
      .filter((node) => node.domain === scope.domain && node.url)
      .map((node) => node.url!);
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

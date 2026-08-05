import { ALL_NODES } from "../subjects/knowledge-graph/data/graph-data.ts";
import {
  auditContentReachability,
  CONTENT_REACHABILITY_AUDIT_SCOPES,
} from "../subjects/knowledge-graph/data/content-reachability-audit.ts";

const scopeByDomain = new Map(
  CONTENT_REACHABILITY_AUDIT_SCOPES.map((scope) => [scope.domain, scope])
);
const reports = auditContentReachability(ALL_NODES);

console.log("Graph Content Reachability Audit\n");
const belowFloor: string[] = [];
for (const report of reports) {
  const scope = scopeByDomain.get(report.domain)!;
  const failed = report.coveragePercent < scope.minimumCoveragePercent;
  console.log(
    `${failed ? "✗" : "✓"} ${report.domain}: ` +
      `${report.coveredArticleUrls.length}/${report.articleUrls.length} ` +
      `(${report.coveragePercent.toFixed(1)}%, floor ${scope.minimumCoveragePercent}%)`
  );
  console.log(`  Missing anchors: ${report.missingArticleUrls.length}`);
  console.log(`  Graph URLs without articles: ${report.graphNodeUrlsWithoutArticle.length}`);
  if (failed) {
    belowFloor.push(report.domain);
    // The first few are enough to start fixing; the unit test prints the rest.
    for (const url of report.missingArticleUrls.slice(0, 5)) console.log(`    missing: ${url}`);
  }
}

// Until 2026-08 this script always exited 0, so a domain could sit below its
// floor while `pnpm prepush` reported green — only the unit test caught it.
// A local audit that cannot fail is worse than no audit: it manufactures trust.
if (belowFloor.length > 0) {
  console.error(`\nBelow coverage floor: ${belowFloor.join(", ")}`);
  process.exit(1);
}

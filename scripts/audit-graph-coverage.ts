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
for (const report of reports) {
  const scope = scopeByDomain.get(report.domain)!;
  console.log(
    `${report.domain}: ${report.coveredArticleUrls.length}/${report.articleUrls.length} ` +
      `(${report.coveragePercent.toFixed(1)}%, floor ${scope.minimumCoveragePercent}%)`
  );
  console.log(`  Missing anchors: ${report.missingArticleUrls.length}`);
  console.log(`  Graph URLs without articles: ${report.graphNodeUrlsWithoutArticle.length}`);
}

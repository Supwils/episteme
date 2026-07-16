import { describe, expect, it } from "vitest";
import { ALL_NODES } from "../graph-data";
import {
  auditContentReachability,
  CONTENT_REACHABILITY_AUDIT_SCOPES,
} from "../content-reachability-audit";

const reports = auditContentReachability(ALL_NODES);

describe("mature content graph reachability audit", () => {
  it("keeps each audited domain inventory non-empty", () => {
    for (const report of reports) {
      expect(report.articleUrls.length, report.domain).toBeGreaterThan(0);
    }
  });

  it("does not retain audited graph URLs without a matching article", () => {
    for (const report of reports) {
      expect(report.graphNodeUrlsWithoutArticle, report.domain).toEqual([]);
    }
  });

  it("holds the agreed coverage floor for each mature domain", () => {
    for (const scope of CONTENT_REACHABILITY_AUDIT_SCOPES) {
      const report = reports.find((item) => item.domain === scope.domain);
      expect(report, scope.domain).toBeDefined();
      expect(report!.coveragePercent, scope.domain).toBeGreaterThanOrEqual(
        scope.minimumCoveragePercent
      );
    }
  });
});

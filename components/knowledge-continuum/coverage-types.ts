import type { DomainCoverageRow, EvidenceCoverageRow } from "@/lib/knowledge-continuum-coverage";

export type CoverageRow = DomainCoverageRow | EvidenceCoverageRow;

export function isDomainCoverageRow(row: CoverageRow): row is DomainCoverageRow {
  return "bridges" in row;
}

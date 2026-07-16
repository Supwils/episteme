export type LearningRelationRole =
  | "required-prerequisite"
  | "recommended-background"
  | "related-context";

export type LearningRelationEvidenceKind = "editorial-audit" | "curated-path" | "confluence-ledger";

export interface LearningRelationEvidenceReference {
  kind: LearningRelationEvidenceKind;
  ref: string;
  label: string;
  href?: string;
}

export interface ReviewedLearningRelation {
  id: string;
  sourceId: string;
  targetId: string;
  role: LearningRelationRole;
  rationale: string;
  reviewBasis: "domain-foundation" | "content-dependency" | "method-sequence";
  reviewStatus: "reviewed";
  reviewedAt: string;
  releaseId: string;
  version: string;
  evidence: readonly LearningRelationEvidenceReference[];
}

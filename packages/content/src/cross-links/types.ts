export type DomainApp =
  | "universe-physics"
  | "human-history"
  | "philosophy"
  | "life-science"
  | "mathematics"
  | "cosmology"
  | "economics"
  | "psychology";

export type CrossLink = {
  sourceApp: DomainApp;
  sourceId: string;
  sourceTitle: string;
  targetApp: DomainApp;
  targetId: string;
  targetTitle: string;
  relationship: string;
};

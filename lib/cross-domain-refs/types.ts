export type Domain =
  | "universe-physics"
  | "human-history"
  | "philosophy"
  | "life-science"
  | "cosmology"
  | "mathematics"
  | "economics"
  | "psychology";

export interface CrossReference {
  fromDomain: Domain;
  fromId: string;
  fromTitle: string;
  toDomain: Domain;
  toId: string;
  toTitle: string;
  relation: string;
}

export const DOMAIN_LABELS: Record<Domain, string> = {
  "universe-physics": "宇宙物理",
  "human-history": "人类历史",
  philosophy: "哲学思想",
  "life-science": "生命科学",
  cosmology: "宇宙学",
  mathematics: "数学",
  economics: "经济学",
  psychology: "心理学",
};

export const DOMAIN_ROUTES: Record<Domain, string> = {
  "universe-physics": "/universe-physics",
  "human-history": "/human-history",
  philosophy: "/philosophy",
  "life-science": "/life-science",
  cosmology: "/cosmology",
  mathematics: "/mathematics",
  economics: "/economics",
  psychology: "/psychology",
};

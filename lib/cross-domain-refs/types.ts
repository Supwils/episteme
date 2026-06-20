export type Domain =
  | "universe-physics"
  | "human-history"
  | "philosophy"
  | "life-science"
  | "cosmology"
  | "mathematics"
  | "economics"
  | "psychology"
  | "computer-science"
  | "political-science"
  | "earth-science"
  | "medicine"
  | "chemistry";

export interface CrossReference {
  fromDomain: Domain;
  fromId: string;
  fromTitle: string;
  toDomain: Domain;
  toId: string;
  toTitle: string;
  relation: string;
  /**
   * Explicit target routes. The legacy `${DOMAIN_ROUTES[domain]}/${id}` form
   * only works for flat domains; nested domains (section/slug) supply the full
   * path here so the link resolves correctly instead of 404ing.
   */
  fromPath?: string;
  toPath?: string;
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
  "computer-science": "计算机科学",
  "political-science": "政治学",
  "earth-science": "地球科学",
  medicine: "医学与公共卫生",
  chemistry: "化学",
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
  "computer-science": "/computer-science",
  "political-science": "/political-science",
  "earth-science": "/earth-science",
  medicine: "/medicine",
  chemistry: "/chemistry",
};

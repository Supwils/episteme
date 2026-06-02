export type DomainApp = "universe-physics" | "human-history" | "philosophy";

export type CrossLink = {
  sourceApp: DomainApp;
  sourceId: string;
  sourceTitle: string;
  targetApp: DomainApp;
  targetId: string;
  targetTitle: string;
  relationship: string;
};

export const CROSS_LINKS: CrossLink[] = [
  // Philosophy ↔ Human History
  { sourceApp: "philosophy", sourceId: "aristotle", sourceTitle: "亚里士多德", targetApp: "human-history", targetId: "alexander-great", targetTitle: "亚历山大东征", relationship: "亚里士多德是亚历山大的老师" },
  { sourceApp: "philosophy", sourceId: "marx", sourceTitle: "马克思", targetApp: "human-history", targetId: "communist-manifesto", targetTitle: "《共产党宣言》", relationship: "马克思主义的诞生" },
  { sourceApp: "philosophy", sourceId: "confucius", sourceTitle: "孔子", targetApp: "human-history", targetId: "spring-autumn", targetTitle: "春秋时期", relationship: "孔子生活在春秋末期" },
  { sourceApp: "philosophy", sourceId: "kant", sourceTitle: "康德", targetApp: "human-history", targetId: "enlightenment", targetTitle: "启蒙运动", relationship: "康德是启蒙运动的哲学总结者" },

  // Philosophy ↔ Universe Physics
  { sourceApp: "philosophy", sourceId: "descartes", sourceTitle: "笛卡尔", targetApp: "universe-physics", targetId: "classical-mechanics", targetTitle: "经典力学", relationship: "笛卡尔的机械论宇宙观" },
  { sourceApp: "philosophy", sourceId: "kant", sourceTitle: "康德", targetApp: "universe-physics", targetId: "cosmic-web", targetTitle: "宇宙大尺度结构", relationship: "康德星云假说" },
  { sourceApp: "philosophy", sourceId: "determinism", sourceTitle: "决定论", targetApp: "universe-physics", targetId: "quantum-mechanics", targetTitle: "量子力学", relationship: "量子力学对决定论的挑战" },
  { sourceApp: "philosophy", sourceId: "phenomenology", sourceTitle: "现象学", targetApp: "universe-physics", targetId: "relativity", targetTitle: "相对论", relationship: "时空观的哲学讨论" },

  // Human History ↔ Universe Physics
  { sourceApp: "human-history", sourceId: "scientific-revolution", sourceTitle: "科学革命", targetApp: "universe-physics", targetId: "classical-mechanics", targetTitle: "经典力学", relationship: "牛顿力学的诞生" },
  { sourceApp: "human-history", sourceId: "einstein", sourceTitle: "爱因斯坦", targetApp: "universe-physics", targetId: "relativity", targetTitle: "相对论", relationship: "相对论的提出" },
  { sourceApp: "human-history", sourceId: "space-race", sourceTitle: "太空竞赛", targetApp: "universe-physics", targetId: "solar-system", targetTitle: "太阳系", relationship: "人类对太阳系的探索" },

  // Reverse links (bidirectional)
  { sourceApp: "human-history", sourceId: "alexander-great", sourceTitle: "亚历山大东征", targetApp: "philosophy", targetId: "aristotle", targetTitle: "亚里士多德", relationship: "亚历山大受亚里士多德教育" },
  { sourceApp: "human-history", sourceId: "enlightenment", sourceTitle: "启蒙运动", targetApp: "philosophy", targetId: "kant", targetTitle: "康德", relationship: "启蒙运动的哲学高峰" },
  { sourceApp: "human-history", sourceId: "scientific-revolution", sourceTitle: "科学革命", targetApp: "philosophy", targetId: "descartes", targetTitle: "笛卡尔", relationship: "笛卡尔的理性主义方法论" },
  { sourceApp: "universe-physics", sourceId: "classical-mechanics", sourceTitle: "经典力学", targetApp: "philosophy", targetId: "descartes", targetTitle: "笛卡尔", relationship: "机械论哲学基础" },
  { sourceApp: "universe-physics", sourceId: "quantum-mechanics", sourceTitle: "量子力学", targetApp: "philosophy", targetId: "determinism", targetTitle: "决定论", relationship: "量子不确定性挑战经典决定论" },
  { sourceApp: "universe-physics", sourceId: "relativity", sourceTitle: "相对论", targetApp: "human-history", targetId: "einstein", targetTitle: "爱因斯坦", relationship: "爱因斯坦提出狭义与广义相对论" },
  { sourceApp: "universe-physics", sourceId: "classical-mechanics", sourceTitle: "经典力学", targetApp: "human-history", targetId: "scientific-revolution", targetTitle: "科学革命", relationship: "经典力学是科学革命的巅峰" },
];

/**
 * Get all cross-links where the given app+id appears as source or target.
 */
export function getLinksForEntity(app: DomainApp, id: string): CrossLink[] {
  return CROSS_LINKS.filter(
    (link) =>
      (link.sourceApp === app && link.sourceId === id) ||
      (link.targetApp === app && link.targetId === id)
  );
}

/**
 * Get cross-links from a specific source to a specific target app.
 */
export function getLinksToApp(sourceApp: DomainApp, sourceId: string, targetApp: DomainApp): CrossLink[] {
  return CROSS_LINKS.filter(
    (link) =>
      link.sourceApp === sourceApp &&
      link.sourceId === sourceId &&
      link.targetApp === targetApp
  );
}

/**
 * Get all unique entity IDs for a given app that have cross-links.
 */
export function getLinkedEntityIds(app: DomainApp): string[] {
  const ids = new Set<string>();
  for (const link of CROSS_LINKS) {
    if (link.sourceApp === app) ids.add(link.sourceId);
    if (link.targetApp === app) ids.add(link.targetId);
  }
  return Array.from(ids);
}

const APP_LABELS: Record<DomainApp, string> = {
  "universe-physics": "宇宙物理",
  "human-history": "人类历史",
  philosophy: "哲学思想",
};

const APP_BASE_PATHS: Record<DomainApp, string> = {
  "universe-physics": "/universe-physics",
  "human-history": "/human-history",
  philosophy: "/philosophy",
};

export function getAppLabel(app: DomainApp): string {
  return APP_LABELS[app];
}

export function getAppBasePath(app: DomainApp): string {
  return APP_BASE_PATHS[app];
}

export function getLinkUrl(link: CrossLink, currentApp: DomainApp): string {
  const isSource = link.sourceApp === currentApp;
  const targetApp = isSource ? link.targetApp : link.sourceApp;
  const targetId = isSource ? link.targetId : link.sourceId;
  const basePath = APP_BASE_PATHS[targetApp];

  if (targetApp === "philosophy") {
    const philosophyRoutes: Record<string, string> = {
      determinism: "/isms/determinism",
      phenomenology: "/schools/phenomenology",
    };
    return `${basePath}${philosophyRoutes[targetId] || `/thinkers/${targetId}`}`;
  }
  if (targetApp === "human-history") {
    const historyRoutes: Record<string, string> = {
      "newton-mechanics": "/timeline",
      "alexander-great": "/timeline",
      "communist-manifesto": "/timeline",
      "spring-autumn": "/timeline",
      "enlightenment": "/timeline",
      "scientific-revolution": "/timeline",
      "einstein": "/figures",
      "space-race": "/timeline",
    };
    return `${basePath}${historyRoutes[targetId] || "/timeline"}`;
  }
  if (targetApp === "universe-physics") {
    const physicsRoutes: Record<string, string> = {
      "classical-mechanics": "/physics/classical-mechanics",
      "cosmic-web": "/universe/cosmic-web",
      "quantum-mechanics": "/physics/quantum-mechanics",
      "relativity": "/physics/relativity",
      "solar-system": "/universe/solar-system",
    };
    return `${basePath}${physicsRoutes[targetId] || ""}`;
  }

  return basePath;
}

import type { CrossLink, DomainApp } from "./types";

const APP_LABELS: Record<DomainApp, string> = {
  "universe-physics": "宇宙物理",
  "human-history": "人类历史",
  philosophy: "哲学思想",
  "life-science": "生命科学",
  mathematics: "数学",
  cosmology: "宇宙学",
  economics: "经济学",
  psychology: "心理学",
};

const APP_BASE_PATHS: Record<DomainApp, string> = {
  "universe-physics": "/universe-physics",
  "human-history": "/human-history",
  philosophy: "/philosophy",
  "life-science": "/life-science",
  mathematics: "/mathematics",
  cosmology: "/cosmology",
  economics: "/economics",
  psychology: "/psychology",
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
      "philosophy-of-mind": "/schools/philosophy-of-mind",
      utilitarianism: "/isms/utilitarianism",
      bioethics: "/schools/bioethics",
      "environmental-ethics": "/schools/environmental-ethics",
      "philosophy-of-science": "/schools/philosophy-of-science",
      "logical-positivism": "/schools/logical-positivism",
      "philosophy-of-time": "/schools/philosophy-of-time",
      "analytic-philosophy": "/schools/analytic-philosophy",
      "philosophy-of-mathematics": "/schools/philosophy-of-mathematics",
      epistemology: "/schools/epistemology",
      structuralism: "/schools/structuralism",
      eudaimonia: "/concepts/eudaimonia",
    };
    return `${basePath}${philosophyRoutes[targetId] || `/thinkers/${targetId}`}`;
  }
  if (targetApp === "human-history") {
    const historyRoutes: Record<string, string> = {
      "newton-mechanics": "/timeline",
      "alexander-great": "/timeline",
      "communist-manifesto": "/timeline",
      "spring-autumn": "/timeline",
      enlightenment: "/timeline",
      "scientific-revolution": "/timeline",
      einstein: "/figures",
      "space-race": "/timeline",
      "human-prehistory": "/timeline",
      "historical-climate": "/timeline",
      "neolithic-revolution": "/timeline",
      "glorious-revolution": "/timeline",
      "french-revolution": "/timeline",
      "islamic-golden-age": "/timeline",
      "warring-states": "/timeline",
      "qin-dynasty": "/timeline",
      "black-death": "/timeline",
      "darwin-origin": "/figures",
      "covid-19": "/timeline",
      "early-civilization": "/timeline",
      "italian-renaissance": "/timeline",
      "wwii-codebreaking": "/timeline",
      "great-depression": "/timeline",
      "bretton-woods": "/timeline",
      "industrial-revolution": "/timeline",
      holocaust: "/timeline",
    };
    return `${basePath}${historyRoutes[targetId] || "/timeline"}`;
  }
  if (targetApp === "universe-physics") {
    const physicsRoutes: Record<string, string> = {
      "classical-mechanics": "/physics/classical-mechanics",
      "cosmic-web": "/universe/cosmic-web",
      "quantum-mechanics": "/physics/quantum-mechanics",
      relativity: "/physics/relativity",
      "solar-system": "/universe/solar-system",
      earth: "/universe/earth",
      thermodynamics: "/physics/thermodynamics",
      "nuclear-physics": "/physics/nuclear-particle",
      heliocentrism: "/physics/classical-mechanics",
      "particle-physics": "/physics/standard-model",
      astrophysics: "/universe/observable",
      optics: "/physics/electromagnetism",
      "natural-philosophy": "/physics/classical-mechanics",
      "nebular-hypothesis": "/universe/solar-system",
      "chaos-theory": "/physics/classical-mechanics",
      "fluid-dynamics": "/physics/fluid-dynamics",
    };
    return `${basePath}${physicsRoutes[targetId] || ""}`;
  }
  if (targetApp === "life-science") {
    const lifeScienceRoutes: Record<string, string> = {
      "earth-formation": "/timeline/earth-formation",
      "atmosphere-evolution": "/timeline/great-oxidation",
      "mass-extinction-asteroid": "/extinctions/cretaceous",
      "human-evolution": "/species/homo-sapiens",
      "agriculture-origin": "/timeline/holocene",
      "medicine-history": "/scientists",
      darwin: "/scientists/darwin",
      "genetic-engineering": "/timeline/holocene",
      "biology-origin": "/timeline/earliest-life",
      "mass-extinction": "/extinctions/permian",
      "evolutionary-ethics": "/tree/eukaryota",
      "consciousness-neuroscience": "/species/homo-sapiens",
      "radiation-mutations": "/timeline/earliest-life",
      metabolism: "/timeline/cyanobacteria",
      "carbon-dating": "/scientists",
      "cell-biology": "/timeline/eukaryotes",
      "plague-bacteriology": "/timeline/holocene",
      "plant-domestication": "/timeline/holocene",
      "microscope-invention": "/scientists",
      "origin-of-species": "/scientists/darwin",
      "pandemic-history": "/timeline/holocene",
      "biology-classification": "/tree/eukaryota",
      "consciousness-studies": "/species/homo-sapiens",
      ecology: "/tree/eukaryota",
      "evolution-theory": "/scientists/darwin",
      "clinical-trials": "/scientists",
    };
    return `${basePath}${lifeScienceRoutes[targetId] || ""}`;
  }
  if (targetApp === "mathematics") {
    const mathRoutes: Record<string, string> = {
      "newton-calculus": "/concepts/calculus",
      euler: "/mathematicians/euler",
      riemann: "/concepts/geometry",
      fourier: "/concepts/analysis",
      hilbert: "/concepts/algebra",
      godel: "/mathematicians/godel",
      logic: "/concepts/logic",
      "set-theory": "/concepts/set-theory",
      probability: "/concepts/probability",
      "category-theory": "/concepts/algebra",
      "al-khwarizmi": "/mathematicians/al-khwarizmi",
      fibonacci: "/mathematicians/fibonacci",
      turing: "/mathematicians/turing",
      statistics: "/concepts/statistics",
      "population-genetics": "/concepts/applied-mathematics",
    };
    return `${basePath}${mathRoutes[targetId] || ""}`;
  }
  if (targetApp === "cosmology") {
    const cosmologyRoutes: Record<string, string> = {
      "big-bang": "/universe/big-bang",
      "dark-energy": "/universe/dark-energy",
      cmb: "/universe/cmb",
      "black-holes": "/universe/black-holes",
      neutrinos: "/universe/neutrinos",
      "earth-formation": "/universe/earth-formation",
      "stellar-nucleosynthesis": "/universe/stellar-nucleosynthesis",
      "habitable-zone": "/universe/habitable-zone",
      "copernican-revolution": "",
      "space-race": "",
      "anthropic-principle": "",
      multiverse: "",
      "curved-spacetime": "/universe/curved-spacetime",
      "cosmic-expansion": "/universe/cosmic-expansion",
    };
    return `${basePath}${cosmologyRoutes[targetId] || ""}`;
  }
  if (targetApp === "economics") {
    const economicsRoutes: Record<string, string> = {
      "adam-smith": "/economists/adam-smith",
      "karl-marx": "/economists/karl-marx",
      "daniel-kahneman": "/economists/daniel-kahneman",
      "richard-thaler": "/economists/richard-thaler",
      "amos-tversky": "/economists/amos-tversky",
      "behavioral-economics-theory": "/theories/behavioral-economics-theory",
      "game-theory-basics": "/theories/game-theory-basics",
      "prospect-theory": "/theories/prospect-theory",
      "welfare-economics": "/theories/welfare-economics",
      "great-depression": "/case-studies/great-depression",
      "bretton-woods": "/case-studies/bretton-woods",
      "industrial-revolution": "/case-studies/industrial-revolution",
      econometrics: "/concepts/econometrics",
      "health-economics": "/concepts/health-economics",
      "environmental-economics": "/concepts/environmental-economics",
    };
    return `${basePath}${economicsRoutes[targetId] || `/concepts/${targetId}`}`;
  }
  if (targetApp === "psychology") {
    const psychologyRoutes: Record<string, string> = {
      "sigmund-freud": "/theorists/sigmund-freud",
      "daniel-kahneman": "/theorists/daniel-kahneman",
      "richard-thaler": "/theorists/richard-thaler",
      "amos-tversky": "/theorists/amos-tversky",
      "anchoring-bias": "/phenomena/anchoring-bias",
      "framing-effect": "/phenomena/framing-effect",
      "cognitive-bias": "/phenomena/cognitive-bias",
      "cognitive-dissonance": "/phenomena/cognitive-dissonance",
      "positive-psychology": "/schools/positive-psychology",
      behaviorism: "/schools/behaviorism",
      "social-psychology": "/schools/social-psychology",
      "milgram-experiment": "/experiments/milgram-experiment",
      neuroscience: "/theorists/neuroscience",
      "evolutionary-psychology": "/theories/evolutionary-psychology",
      psychometrics: "/concepts/psychometrics",
    };
    return `${basePath}${psychologyRoutes[targetId] || `/concepts/${targetId}`}`;
  }

  return basePath;
}

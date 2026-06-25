// Curated cross-domain "思想之线" (thought lines): each tour is an ordered list
// of waypoint node ids. At runtime the path-finder stitches the shortest path
// between consecutive waypoints, so every step is a REAL edge in the graph and
// the relationship labels along the way narrate the connection themselves.
// Waypoints are verified to exist and connect (see scripts/route-audit pattern).

export type ThoughtTour = {
  id: string;
  title: string;
  subtitle: string;
  waypoints: string[];
};

export const THOUGHT_TOURS: ThoughtTour[] = [
  {
    id: "entropy-thread",
    title: "熵之线索",
    subtitle: "从热力学的无序，经概率与博弈，到可计算的极限",
    waypoints: [
      "physics:热力学--熵与时间之箭",
      "mathematics:probability",
      "computer-science:alan-turing",
    ],
  },
  {
    id: "limits-of-reason",
    title: "理性的极限",
    subtitle: "苏格拉底的追问，如何通向哥德尔与图灵划定的边界",
    waypoints: [
      "philosophy:socrates",
      "mathematics:godel-incompleteness",
      "computer-science:computability",
    ],
  },
  {
    id: "riddle-of-mind",
    title: "心智之谜",
    subtitle: "从笛卡尔的身心二元，到无意识，再到行为经济学",
    waypoints: [
      "philosophy:descartes",
      "psychology:sigmund-freud",
      "psychology:cognitive-bias",
      "economics:daniel-kahneman",
    ],
  },
  {
    id: "earth-to-life",
    title: "从大地到生命",
    subtitle: "漂移的板块如何一次次改写生命的命运",
    waypoints: [
      "earth-science:plate-tectonics",
      "lifescience:end-cretaceous",
      "lifescience:darwin",
    ],
  },
  {
    id: "stars-to-atoms",
    title: "从恒星到原子",
    subtitle: "你身上的每一个重原子，都曾在恒星内部熔炼",
    waypoints: [
      "cosmology:stellar-evolution",
      "cosmology:恒星核合成",
      "chemistry:atomic-structure",
    ],
  },
  {
    id: "epic-of-evolution",
    title: "演化的史诗",
    subtitle: "四十亿年，从第一个细胞到仰望星空的人类",
    waypoints: ["lifescience:origin-of-life", "lifescience:darwin", "lifescience:human-evolution"],
  },
  {
    id: "evolution-and-society",
    title: "进化与社会",
    subtitle: "达尔文、尼采、马克思与斯密之间意想不到的思想之链",
    waypoints: ["lifescience:darwin", "economics:adam-smith"],
  },
];

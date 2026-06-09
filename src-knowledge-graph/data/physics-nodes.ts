export type PhysicsNode = {
  id: string;
  label: string;
  domain: "physics";
  type: "cosmos-tier" | "physics-tier";
  slug: string;
  tags: string[];
  description: string;
};

export type PhysicsEdge = {
  source: string;
  target: string;
  relationship: string;
  type: "adjacent-tier" | "cross-reference";
};

export const PHYSICS_NODES: PhysicsNode[] = [
  // ── Cosmos Tiers (T0–T7) ──────────────────────────────────────
  {
    id: "physics:T0",
    label: "可见宇宙",
    domain: "physics",
    type: "cosmos-tier",
    slug: "observable-universe",
    tags: ["cosmology", "CMB", "dark-energy", "BAO", "inflation"],
    description: "我们所能看到的全部",
  },
  {
    id: "physics:T1",
    label: "宇宙纤维",
    domain: "physics",
    type: "cosmos-tier",
    slug: "cosmic-web",
    tags: ["large-scale-structure", "filaments", "voids", "N-body"],
    description: "宇宙的骨架",
  },
  {
    id: "physics:T2",
    label: "拉尼亚凯亚超星系团",
    domain: "physics",
    type: "cosmos-tier",
    slug: "laniakea",
    tags: ["supercluster", "great-attractor", "cosmic-flows"],
    description: "我们所在的引力分水岭",
  },
  {
    id: "physics:T3",
    label: "本星系群",
    domain: "physics",
    type: "cosmos-tier",
    slug: "local-group",
    tags: ["milky-way", "andromeda", "dwarf-galaxies"],
    description: "我们这个「双星系」邻里",
  },
  {
    id: "physics:T4",
    label: "银河系",
    domain: "physics",
    type: "cosmos-tier",
    slug: "milky-way",
    tags: ["spiral-galaxy", "sgr-a-star", "gaia", "bar"],
    description: "我们脚下的这个旋臂盘",
  },
  {
    id: "physics:T5",
    label: "恒星邻域",
    domain: "physics",
    type: "cosmos-tier",
    slug: "stellar-neighborhood",
    tags: ["nearby-stars", "exoplanets", "red-dwarfs", "trappist-1"],
    description: "50 光年以内",
  },
  {
    id: "physics:T6",
    label: "太阳系",
    domain: "physics",
    type: "cosmos-tier",
    slug: "solar-system",
    tags: ["planets", "kuiper-belt", "oort-cloud", "asteroids"],
    description: "我们的恒星和它的行星",
  },
  {
    id: "physics:T7",
    label: "地球",
    domain: "physics",
    type: "cosmos-tier",
    slug: "earth",
    tags: ["atmosphere", "plate-tectonics", "biosphere", "moon"],
    description: "我们站着的这颗",
  },

  // ── Physics Tiers (P0–P8) ─────────────────────────────────────
  {
    id: "physics:P0",
    label: "经典力学",
    domain: "physics",
    type: "physics-tier",
    slug: "classical-mechanics",
    tags: ["newton", "lagrangian", "hamiltonian", "kepler"],
    description: "三百年依然管用的脚手架",
  },
  {
    id: "physics:P1",
    label: "热力学与统计力学",
    domain: "physics",
    type: "physics-tier",
    slug: "thermodynamics",
    tags: ["entropy", "boltzmann", "carnot", "statistical-mechanics"],
    description: "随机的优雅",
  },
  {
    id: "physics:P2",
    label: "电磁与光",
    domain: "physics",
    type: "physics-tier",
    slug: "electromagnetism",
    tags: ["maxwell", "light", "electromagnetic-wave", "optics"],
    description: "看不见的力，照亮的世界",
  },
  {
    id: "physics:P3",
    label: "相对论",
    domain: "physics",
    type: "physics-tier",
    slug: "relativity",
    tags: ["einstein", "spacetime", "gravity", "black-holes"],
    description: "时空就是几何",
  },
  {
    id: "physics:P4",
    label: "量子力学",
    domain: "physics",
    type: "physics-tier",
    slug: "quantum-mechanics",
    tags: ["schrodinger", "heisenberg", "wave-function", "entanglement"],
    description: "测量就是参与",
  },
  {
    id: "physics:P5",
    label: "原子与分子",
    domain: "physics",
    type: "physics-tier",
    slug: "atomic-molecular",
    tags: ["bohr", "periodic-table", "chemical-bond", "spectroscopy"],
    description: "化学的物理根源",
  },
  {
    id: "physics:P6",
    label: "原子核与粒子",
    domain: "physics",
    type: "physics-tier",
    slug: "nuclear-particle",
    tags: ["quarks", "nuclear-force", "fission", "fusion"],
    description: "把物质再砸碎一点",
  },
  {
    id: "physics:P7",
    label: "标准模型与量子场论",
    domain: "physics",
    type: "physics-tier",
    slug: "standard-model",
    tags: ["higgs", "QFT", "gauge-theory", "standard-model"],
    description: "已知物理学的完整草图",
  },
  {
    id: "physics:P8",
    label: "前沿物理",
    domain: "physics",
    type: "physics-tier",
    slug: "frontier-physics",
    tags: ["dark-matter", "quantum-computing", "string-theory", "multiverse"],
    description: "下一个百年的入口",
  },
];

export const PHYSICS_EDGES: PhysicsEdge[] = [
  // ── Adjacent cosmos-tier edges (T0→T1→…→T7) ─────────────────
  { source: "physics:T0", target: "physics:T1", relationship: "下钻: 可见宇宙 → 宇宙纤维", type: "adjacent-tier" },
  { source: "physics:T1", target: "physics:T2", relationship: "下钻: 宇宙纤维 → 拉尼亚凯亚", type: "adjacent-tier" },
  { source: "physics:T2", target: "physics:T3", relationship: "下钻: 拉尼亚凯亚 → 本星系群", type: "adjacent-tier" },
  { source: "physics:T3", target: "physics:T4", relationship: "下钻: 本星系群 → 银河系", type: "adjacent-tier" },
  { source: "physics:T4", target: "physics:T5", relationship: "下钻: 银河系 → 恒星邻域", type: "adjacent-tier" },
  { source: "physics:T5", target: "physics:T6", relationship: "下钻: 恒星邻域 → 太阳系", type: "adjacent-tier" },
  { source: "physics:T6", target: "physics:T7", relationship: "下钻: 太阳系 → 地球", type: "adjacent-tier" },

  // ── Adjacent physics-tier edges (P0→P1→…→P8) ────────────────
  { source: "physics:P0", target: "physics:P1", relationship: "学科递进: 经典力学 → 热力学", type: "adjacent-tier" },
  { source: "physics:P1", target: "physics:P2", relationship: "学科递进: 热力学 → 电磁学", type: "adjacent-tier" },
  { source: "physics:P2", target: "physics:P3", relationship: "学科递进: 电磁学 → 相对论", type: "adjacent-tier" },
  { source: "physics:P3", target: "physics:P4", relationship: "学科递进: 相对论 → 量子力学", type: "adjacent-tier" },
  { source: "physics:P4", target: "physics:P5", relationship: "学科递进: 量子力学 → 原子与分子", type: "adjacent-tier" },
  { source: "physics:P5", target: "physics:P6", relationship: "学科递进: 原子与分子 → 原子核与粒子", type: "adjacent-tier" },
  { source: "physics:P6", target: "physics:P7", relationship: "学科递进: 原子核与粒子 → 标准模型", type: "adjacent-tier" },
  { source: "physics:P7", target: "physics:P8", relationship: "学科递进: 标准模型 → 前沿物理", type: "adjacent-tier" },

  // ── Cross-reference edges from packages/content/src/cross-links.ts ──
  // (filtered to universe-physics ↔ life-science pairs with physics targets)
  { source: "physics:T7", target: "lifescience:origin-of-life", relationship: "地球的形成为生命起源提供了条件", type: "cross-reference" },
  { source: "physics:T6", target: "lifescience:end-cretaceous", relationship: "太阳系中小行星的运动导致了白垩纪大灭绝", type: "cross-reference" },
  { source: "physics:T7", target: "lifescience:end-cretaceous", relationship: "地球大气层的演化影响了生命的进化方向", type: "cross-reference" },
  { source: "physics:P0", target: "philosophy:descartes", relationship: "笛卡尔的机械论宇宙观", type: "cross-reference" },
  { source: "physics:P1", target: "lifescience:atmosphere-evolution", relationship: "热力学原理驱动大气化学反应和气候系统", type: "cross-reference" },
  { source: "physics:P3", target: "philosophy:phenomenology", relationship: "时空观的哲学讨论", type: "cross-reference" },
  { source: "physics:P4", target: "philosophy:determinism", relationship: "量子不确定性挑战经典决定论", type: "cross-reference" },
  { source: "physics:P6", target: "lifescience:radiation-mutations", relationship: "核物理揭示的辐射机制解释了生物突变的物理基础", type: "cross-reference" },
];

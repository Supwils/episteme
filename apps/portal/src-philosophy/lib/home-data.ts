export const SCHOOLS = [
  {
    id: "ancient-greek",
    era: "公元前 6 世纪 — 公元 3 世纪",
    eraLabel: "古典",
    title: "古希腊哲学",
    subtitle: "Ancient Greek Philosophy",
    description:
      "从米利都学派对自然本原的追问，到苏格拉底的辩证法、柏拉图的理型论、亚里士多德的形式逻辑——西方哲学的奠基时代。",
    href: "/philosophy/schools",
    figures: ["Plato", "Aristotle", "Socrates", "Heraclitus"],
    accent: "#6ad0ff",
  },
  {
    id: "eastern",
    era: "公元前 6 世纪 — 至今",
    eraLabel: "东方",
    title: "东方哲学",
    subtitle: "Eastern Philosophy",
    description:
      "儒家以仁礼立人伦秩序，道家以无为问道法自然，佛家以四圣谛解脱苦难。三条思路穿越两千五百年。",
    href: "/philosophy/schools",
    figures: ["孔子", "老子", "释迦牟尼", "孟子"],
    accent: "#c8a45a",
  },
  {
    id: "modern",
    era: "17 世纪 — 20 世纪初",
    eraLabel: "近现代",
    title: "近现代哲学",
    subtitle: "Modern Philosophy",
    description:
      "笛卡尔开启理性主义，休谟迫使康德惊醒，黑格尔重构历史，尼采宣告上帝已死，维特根斯坦划定哲学的边界。",
    href: "/philosophy/schools",
    figures: ["Kant", "Nietzsche", "Wittgenstein", "Hegel"],
    accent: "#7aaa8a",
  },
  {
    id: "contemporary",
    era: "20 世纪中叶 — 至今",
    eraLabel: "当代",
    title: "当代哲学",
    subtitle: "Contemporary Philosophy",
    description:
      "分析哲学与大陆哲学的裂痕、语言转向、解构主义、正义理论、技术伦理——在科学时代重新追问存在性挑战。",
    href: "/philosophy/schools",
    figures: ["Rawls", "Foucault", "Derrida", "Parfit"],
    accent: "#a88adf",
  },
] as const;

export const THINKERS = [
  {
    name: "柏拉图",
    latin: "Plato",
    era: "前 428—前 348",
    quote: "哲学始于惊奇。",
    accent: "#6ad0ff",
  },
  {
    name: "亚里士多德",
    latin: "Aristotle",
    era: "前 384—前 322",
    quote: "吾爱吾师，吾更爱真理。",
    accent: "#6ad0ff",
  },
  {
    name: "孔子",
    latin: "Confucius",
    era: "前 551—前 479",
    quote: "己所不欲，勿施于人。",
    accent: "#c8a45a",
  },
  {
    name: "康德",
    latin: "Kant",
    era: "1724—1804",
    quote: "有两样东西，愈是思索愈惊叹。",
    accent: "#7aaa8a",
  },
  {
    name: "尼采",
    latin: "Nietzsche",
    era: "1844—1900",
    quote: "那些杀不死我的，使我更强大。",
    accent: "#7aaa8a",
  },
  {
    name: "维特根斯坦",
    latin: "Wittgenstein",
    era: "1889—1951",
    quote: "凡不可说的，必须沉默。",
    accent: "#a88adf",
  },
] as const;

export const QUICK_LINKS = [
  {
    href: "/philosophy/thinkers",
    label: "哲学家",
    icon: "Φ",
    description: "67 位东西方哲学家的生平、思想与遗产",
    accent: "#6ad0ff",
  },
  {
    href: "/philosophy/schools",
    label: "流派",
    icon: "◎",
    description: "33 个跨越文明的哲学流派全景图",
    accent: "#c8a45a",
  },
  {
    href: "/philosophy/isms",
    label: "主义",
    icon: "∑",
    description: "从唯物主义到存在主义的思想光谱",
    accent: "#7aaa8a",
  },
  {
    href: "/philosophy/experiments",
    label: "思想实验",
    icon: "∞",
    description: "21 个改变哲学进程的思想实验",
    accent: "#a88adf",
  },
  {
    href: "/philosophy/questions",
    label: "大问题",
    icon: "?",
    description: "哲学史上最根本的追问与回答",
    accent: "#6ad0ff",
  },
  {
    href: "/philosophy/tree",
    label: "传承树",
    icon: "🌳",
    description: "哲学家影响传承的交互式时间线可视化",
    accent: "#10b981",
  },
] as const;

export const STATS = [
  { value: 67, label: "哲学家", suffix: "位" },
  { value: 33, label: "流派", suffix: "个" },
  { value: 21, label: "思想实验", suffix: "个" },
  { value: 201, label: "文章", suffix: "篇" },
] as const;

export const FLOATING_SYMBOLS = ["φ", "θ", "∞", "π", "Ω", "λ", "Δ", "ψ"] as const;

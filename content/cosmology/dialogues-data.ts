// Search-index source for cosmology dialogues. Each `slug` MUST match a real
// file under content/cosmology/dialogues/, or the search result 404s.
// `pnpm check-content` (Link Integrity phase) fails the build on a mismatch.
export const COSMOLOGY_DIALOGUES_DATA = [
  {
    slug: "hubble-lemaitre",
    title: "哈勃 vs 勒梅特：宇宙膨胀的发现",
    titleEn: "Hubble vs Lemaître: Discovery of Cosmic Expansion",
    field: "宇宙学",
    participants: ["埃德温·哈勃", "乔治·勒梅特"],
  },
  {
    slug: "cosmology-crisis",
    title: "宇宙学危机：哈勃常数之争",
    titleEn: "Cosmology in Crisis: The Hubble Tension",
    field: "宇宙学",
    participants: ["亚当·里斯", "乔治·埃夫斯塔西奥"],
  },
  {
    slug: "dark-matter-debate",
    title: "暗物质 vs 修改引力",
    titleEn: "Dark Matter vs Modified Gravity",
    field: "天体物理学",
    participants: ["维拉·鲁宾", "莫德海·米尔格罗姆"],
  },
  {
    slug: "penrose-hawking",
    title: "彭罗斯 vs 霍金：奇点定理",
    titleEn: "Penrose vs Hawking: Singularity Theorems",
    field: "理论物理学",
    participants: ["罗杰·彭罗斯", "斯蒂芬·霍金"],
  },
  {
    slug: "penrose-hawking-singularity",
    title: "彭罗斯 vs 霍金：奇点定理的深层含义",
    titleEn: "Penrose vs Hawking: Implications of Singularity Theorems",
    field: "理论物理学",
    participants: ["罗杰·彭罗斯", "斯蒂芬·霍金"],
  },
  {
    slug: "degrasse-tyson-sagan",
    title: "科学传播的对话：泰森与萨根",
    titleEn: "Science Communication: Tyson and Sagan",
    field: "科学传播",
    participants: ["尼尔·德格拉斯·泰森", "卡尔·萨根"],
  },
] as const;

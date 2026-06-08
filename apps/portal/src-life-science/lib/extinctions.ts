import type { ExtinctionEvent } from "./types";

const EXTINCTIONS: ExtinctionEvent[] = [
  {
    id: "ordovician",
    name: "奥陶纪-志留纪大灭绝",
    nameEn: "Ordovician-Silurian",
    dateMYA: 443,
    dateDisplay: "4.43亿年前",
    speciesLostPercent: 85,
    severity: 4,
    causes: ["全球冰期", "海平面剧降", "海洋缺氧"],
    description: "地球历史上第二次大规模灭绝事件，主要影响海洋无脊椎动物。",
  },
  {
    id: "devonian",
    name: "晚泥盆纪大灭绝",
    nameEn: "Late Devonian",
    dateMYA: 372,
    dateDisplay: "3.72亿年前",
    speciesLostPercent: 75,
    severity: 3.5,
    causes: ["全球变冷", "海洋缺氧", "火山活动"],
    description: "持续数百万年的灭绝事件，重创珊瑚礁和鱼类种群。",
  },
  {
    id: "permian",
    name: "二叠纪-三叠纪大灭绝",
    nameEn: "Permian-Triassic",
    dateMYA: 252,
    dateDisplay: "2.52亿年前",
    speciesLostPercent: 96,
    severity: 5,
    causes: ["西伯利亚暗色岩火山", "全球变暖", "海洋酸化", "甲烷释放"],
    description: '地球历史上最严重的大灭绝，被称为"大死亡"，消灭了96%的海洋物种。',
  },
  {
    id: "triassic-jurassic",
    name: "三叠纪-侏罗纪大灭绝",
    nameEn: "Triassic-Jurassic",
    dateMYA: 201,
    dateDisplay: "2.01亿年前",
    speciesLostPercent: 80,
    severity: 4,
    causes: ["大规模火山活动", "全球变暖", "海洋酸化"],
    description: "为恐龙的崛起扫清了障碍，许多大型两栖类和原始爬行类灭绝。",
  },
  {
    id: "cretaceous",
    name: "白垩纪-古近纪大灭绝",
    nameEn: "Cretaceous-Paleogene",
    dateMYA: 66,
    dateDisplay: "6600万年前",
    speciesLostPercent: 76,
    severity: 4.5,
    causes: ["小行星撞击", "德干暗色岩火山", "全球冬季"],
    description: "最著名的大灭绝事件，终结了非鸟恐龙时代，为哺乳动物崛起铺路。",
  },
];

export function getAllExtinctions(): ExtinctionEvent[] {
  return EXTINCTIONS;
}

export function getExtinctionById(id: string): ExtinctionEvent | undefined {
  return EXTINCTIONS.find((e) => e.id === id);
}

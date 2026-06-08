export type CosmologyEra = {
  id: string;
  name: { primary: string; english: string };
  timeRange: string;
  description: string;
  keyEvents: string[];
};

export const COSMOLOGY_ERAS: CosmologyEra[] = [
  {
    id: "big-bang",
    name: { primary: "大爆炸", english: "Big Bang" },
    timeRange: "t = 0",
    description: "宇宙从一个极度高温高密的奇点诞生，所有物质和能量在这一刻开始膨胀。",
    keyEvents: ["奇点", "普朗克时代", "大统一时代"],
  },
  {
    id: "inflation",
    name: { primary: "暴胀", english: "Inflation" },
    timeRange: "10⁻³⁶ – 10⁻³² s",
    description: "宇宙在极短时间内指数级膨胀，解决了视界问题和平直性问题。",
    keyEvents: ["指数膨胀", "量子涨落放大", "结构种子形成"],
  },
  {
    id: "recombination",
    name: { primary: "再结合", english: "Recombination" },
    timeRange: "~38 万年",
    description: "宇宙冷却到约 3000 K，电子与质子结合成中性氢，光子首次自由传播，形成宇宙微波背景辐射。",
    keyEvents: ["中性氢形成", "CMB 释放", "宇宙变得透明"],
  },
  {
    id: "dark-ages",
    name: { primary: "黑暗时代", english: "Dark Ages" },
    timeRange: "38 万年 – ~2 亿年",
    description: "宇宙中没有恒星发光，只有中性氢气体在引力作用下缓慢聚集。",
    keyEvents: ["中性氢主导", "暗物质晕增长", "气体冷却"],
  },
  {
    id: "first-stars",
    name: { primary: "第一代恒星", english: "First Stars" },
    timeRange: "~2 亿年",
    description: "第一批大质量恒星（星族 III）点燃，照亮了宇宙，开始合成重元素并再电离中性氢。",
    keyEvents: ["星族 III 恒星", "再电离开始", "重元素合成"],
  },
  {
    id: "galaxy-formation",
    name: { primary: "星系形成", english: "Galaxy Formation" },
    timeRange: "~3 – 10 亿年",
    description: "暗物质晕合并增长，气体在其中坍缩形成第一批星系，宇宙大尺度结构开始显现。",
    keyEvents: ["星系并合", "超大质量黑洞形成", "宇宙纤维成型"],
  },
  {
    id: "stellar-evolution",
    name: { primary: "恒星演化", english: "Stellar Evolution" },
    timeRange: "~100 亿年",
    description: "恒星在分子云中诞生，经历主序星、红巨星等阶段，通过超新星爆发将重元素归还星际介质。",
    keyEvents: ["恒星核合成", "超新星爆发", "行星系统形成"],
  },
  {
    id: "today",
    name: { primary: "今天", english: "Today" },
    timeRange: "138 亿年",
    description: "暗能量驱动宇宙加速膨胀，我们生活在一个由暗能量、暗物质和普通物质共同构成的宇宙中。",
    keyEvents: ["暗能量主导", "加速膨胀", "哈勃张力"],
  },
];

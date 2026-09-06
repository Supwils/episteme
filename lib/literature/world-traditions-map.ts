export type TraditionEpoch = "ancient" | "medieval" | "early-modern" | "modern";

export type TraditionNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  epochs: readonly TraditionEpoch[];
  note: string;
};

export const TRADITION_EPOCHS: readonly {
  id: TraditionEpoch;
  label: string;
}[] = [
  { id: "ancient", label: "上古" },
  { id: "medieval", label: "中古" },
  { id: "early-modern", label: "近世" },
  { id: "modern", label: "现代" },
];

/**
 * 示意坐标，不是经纬度。年代是教学分期，写定/刊刻/记录往往不是同一件事。
 */
export const TRADITION_NODES: readonly TraditionNode[] = [
  {
    id: "homer",
    label: "荷马史诗",
    x: 92,
    y: 58,
    epochs: ["ancient"],
    note: "口头程式传统；写定年代有争议，不能钉成一个创作年。",
  },
  {
    id: "shiji",
    label: "史记",
    x: 168,
    y: 48,
    epochs: ["ancient"],
    note: "太初元年（前一〇四年）前后司马迁开始正式著史；今本经续补。",
  },
  {
    id: "mahabharata",
    label: "摩诃婆罗多",
    x: 148,
    y: 78,
    epochs: ["ancient", "medieval"],
    note: "长篇史诗传统，成书窗口很长；浦那精校本是二十世纪的整理。",
  },
  {
    id: "genji",
    label: "源氏物语",
    x: 196,
    y: 62,
    epochs: ["medieval"],
    note: "十一世纪初紫式部的物语；写本系统与后来印本不是同一物件。",
  },
  {
    id: "nights",
    label: "一千零一夜",
    x: 118,
    y: 92,
    epochs: ["medieval", "early-modern"],
    note: "阿拉伯故事丛编；加朗法译本一七〇四至一七一七年才进入欧洲书市。",
  },
  {
    id: "sunjata",
    label: "松迪亚塔",
    x: 78,
    y: 108,
    epochs: ["medieval", "modern"],
    note: "故事与十三世纪马里建国传统相连；能核对的是二十世纪表演与印本。",
  },
  {
    id: "quixote",
    label: "堂吉诃德",
    x: 70,
    y: 78,
    epochs: ["early-modern"],
    note: "马德里一六〇五年、一六一五年两部。‘第一部现代小说’是评价，不是出版事实。",
  },
  {
    id: "honglou",
    label: "红楼梦",
    x: 178,
    y: 108,
    epochs: ["early-modern"],
    note: "前八十回抄本；程甲本一七九一年。后四十回作者问题没有闭合。",
  },
  {
    id: "luxun",
    label: "呐喊",
    x: 188,
    y: 132,
    epochs: ["modern"],
    note: "一九二三年新潮社。其中《狂人日记》一九一八年五月刊于《新青年》。",
  },
];

export function traditionsInEpoch(epoch: TraditionEpoch): TraditionNode[] {
  return TRADITION_NODES.filter((node) => node.epochs.includes(epoch));
}

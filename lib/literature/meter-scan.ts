export type MeterKind = "wuyan" | "qiyan" | "iambic-pentameter";

export type MeterSlot = {
  text: string;
  strong: boolean;
};

export type MeterSample = {
  id: MeterKind;
  label: string;
  source: string;
  slots: readonly MeterSlot[];
  groupSizes: readonly number[];
  note: string;
};

export const METER_SAMPLES: readonly MeterSample[] = [
  {
    id: "wuyan",
    label: "五言",
    source: "孟浩然《春晓》首句（通行本）",
    slots: [
      { text: "春", strong: true },
      { text: "眠", strong: false },
      { text: "不", strong: true },
      { text: "觉", strong: false },
      { text: "晓", strong: true },
    ],
    groupSizes: [2, 3],
    note: "五言常读成二加三。这里的轻重只是停顿示意，不是中古平仄判决。",
  },
  {
    id: "qiyan",
    label: "七言",
    source: "杜甫《绝句》首句（通行本）",
    slots: [
      { text: "两", strong: true },
      { text: "个", strong: false },
      { text: "黄", strong: true },
      { text: "鹂", strong: false },
      { text: "鸣", strong: true },
      { text: "翠", strong: false },
      { text: "柳", strong: true },
    ],
    groupSizes: [2, 2, 3],
    note: "七言常见二、二、三。字数可数，韵部要查韵书，本页不算韵。",
  },
  {
    id: "iambic-pentameter",
    label: "抑扬五音步",
    source: "Shakespeare, Sonnet 18（1609 四开本首行）",
    slots: [
      { text: "Shall", strong: false },
      { text: "I", strong: true },
      { text: "com-", strong: false },
      { text: "pare", strong: true },
      { text: "thee", strong: false },
      { text: "to", strong: true },
      { text: "a", strong: false },
      { text: "sum-", strong: true },
      { text: "mer's", strong: false },
      { text: "day?", strong: true },
    ],
    groupSizes: [2, 2, 2, 2, 2],
    note: "教学音步：弱—强重复五次。实际朗读会滑步、省略，不能拿这一行当英语诗的本质。",
  },
];

export function meterById(id: MeterKind): MeterSample {
  const sample = METER_SAMPLES.find((item) => item.id === id);
  if (!sample) throw new Error(`unknown meter ${id}`);
  return sample;
}

export function groupedSlots(sample: MeterSample): MeterSlot[][] {
  const groups: MeterSlot[][] = [];
  let cursor = 0;
  for (const size of sample.groupSizes) {
    groups.push(sample.slots.slice(cursor, cursor + size) as MeterSlot[]);
    cursor += size;
  }
  return groups;
}

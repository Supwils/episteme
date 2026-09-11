export type ReciprocityId = "generalized" | "balanced" | "negative";

export const RECIPROCITY_MODES: readonly {
  id: ReciprocityId;
  label: string;
  tease: string;
}[] = [
  {
    id: "generalized",
    label: "概括互惠",
    tease: "回赠不立刻结算。萨林斯用来描述近亲之间的给予。",
  },
  {
    id: "balanced",
    label: "均衡互惠",
    tease: "礼物有可观察的对等期待，如库拉圈里被记下的臂饰与项圈。",
  },
  {
    id: "negative",
    label: "消极互惠",
    tease: "占便宜、讨价还价或劫掠。不是道德判决，是交换距离的一端。",
  },
];

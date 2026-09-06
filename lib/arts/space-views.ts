export type SpaceView = "plan" | "section" | "axon";

export const SPACE_VIEWS: readonly { id: SpaceView; name: string; what: string }[] = [
  {
    id: "plan",
    name: "平面",
    what: "看人如何走进三开间：中轴、侧廊与尽端。荷载在图上几乎看不见。",
  },
  {
    id: "section",
    name: "剖面",
    what: "切开屋顶与楼板，看见高度、侧光和高侧窗。结构高度开始说话。",
  },
  {
    id: "axon",
    name: "轴测",
    what: "同时看到平面网格与竖向承重。游行路线与传力路线不必重合。",
  },
];

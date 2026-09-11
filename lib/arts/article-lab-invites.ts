import type { LabInviteData } from "@/lib/lab-invite";

const DETAIL: LabInviteData = {
  href: "/arts/detail-comparator",
  label: "作品细节比较器",
  tease: "对照轮廓优先与色块优先的同一母题，看局部怎样改判断。",
};

const PERSPECTIVE: LabInviteData = {
  href: "/arts/perspective-lab",
  label: "透视与构图实验室",
  tease: "拖动灭点，看一点透视箱体的正交线如何会合。",
};

const PIGMENT: LabInviteData = {
  href: "/arts/pigment-profile",
  label: "材料与颜料剖面",
  tease: "从光油到支撑体，点选一层看它在油画结构里做什么。",
};

const EXCHANGE: LabInviteData = {
  href: "/arts/exchange-map",
  label: "全球艺术交流地图",
  tease: "示意几条物质与形式的长距离移动，不是精确底图。",
};

const SPACE: LabInviteData = {
  href: "/arts/space-explorer",
  label: "建筑空间探索器",
  tease: "同一座厅堂在平面、剖面与轴测之间切换，看路线和承重怎么被提问。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "perspective-and-space": PERSPECTIVE,
  "composition-balance": PERSPECTIVE,
  "line-shape-form": PERSPECTIVE,
  "painting-media": PIGMENT,
  "color-and-light": PIGMENT,
  "fresco-and-wall-painting": PIGMENT,
  "conservation-science": PIGMENT,
  "las-meninas-close-reading": DETAIL,
  "formal-analysis": DETAIL,
  "chinese-painting": EXCHANGE,
  "japanese-ukiyoe": EXCHANGE,
  "islamic-visual-culture": EXCHANGE,
  "building-as-structure": SPACE,
  "orders-and-arches": SPACE,
  "east-asian-timber-frame": SPACE,
  "sacred-spaces": SPACE,
  "landscape-and-gardens": SPACE,
  "modernism-and-international-style": SPACE,
};

const BY_SECTION: Record<string, LabInviteData> = {
  foundations: PERSPECTIVE,
  media: PIGMENT,
  architecture: SPACE,
  traditions: EXCHANGE,
  aesthetics: DETAIL,
  methods: DETAIL,
  frontier: DETAIL,
};

export function artsLabInvite(section: string, slug: string): LabInviteData {
  return BY_SLUG[slug] ?? BY_SECTION[section] ?? DETAIL;
}

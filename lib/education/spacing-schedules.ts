export type SpacingId = "massed" | "spaced";

export const SPACING_SCHEDULES: readonly {
  id: SpacingId;
  label: string;
  immediate: number;
  delayed: number;
  tease: string;
}[] = [
  {
    id: "massed",
    label: "集中练习",
    immediate: 92,
    delayed: 38,
    tease: "当时更熟。隔周的保持条更短。熟是即时表现，不是持久学习。",
  },
  {
    id: "spaced",
    label: "间隔练习",
    immediate: 61,
    delayed: 74,
    tease: "当时没那么熟。延迟保持条更长。示意对照时间表，不是背词器。",
  },
];

export function spacingById(id: SpacingId) {
  return SPACING_SCHEDULES.find((item) => item.id === id)!;
}

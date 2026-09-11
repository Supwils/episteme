export type RitualStageId = "separation" | "liminal" | "aggregation";

export const RITUAL_STAGES: readonly {
  id: RitualStageId;
  label: string;
  note: string;
}[] = [
  {
    id: "separation",
    label: "分离",
    note: "候选人离开先前的身份位置：脱下旧标记、离开旧空间。这是分析范畴，不是步骤清单。",
  },
  {
    id: "liminal",
    label: "阈限",
    note: "中间状态：既不是原来的人，也还不是新身份。特纳强调这里的共同体感受是暂时的。",
  },
  {
    id: "aggregation",
    label: "聚合",
    note: "重新进入日常位置，带上新的权利与义务。完成的是社会位置，不是神秘本质。",
  },
];

export function ritualStageById(id: RitualStageId) {
  return RITUAL_STAGES.find((stage) => stage.id === id)!;
}

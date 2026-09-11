export type RitualStageId = "separation" | "liminal" | "aggregation";
export type RitualCaseId = "graduation" | "pilgrimage" | "wedding";

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

export const RITUAL_CASES: readonly {
  id: RitualCaseId;
  label: string;
  why: string;
  stages: Record<RitualStageId, string>;
}[] = [
  {
    id: "graduation",
    label: "毕业典礼",
    why: "公开、可观察、没有秘传。用来练习三步，不是任何学校的流程手册。",
    stages: {
      separation: "候选人按名单离开座位，换上统一的袍与帽。旧座位上的「在校学生」暂时被搁置。",
      liminal: "队列、名字被宣读、尚未接到证书的那段时间：人在舞台上，学位还没落在纸上。",
      aggregation: "证书到手、照相、家人称呼改变。新位置是校友或毕业生，义务与权利跟着换。",
    },
  },
  {
    id: "pilgrimage",
    label: "朝圣作为结构",
    why: "看的是进出日常秩序，不是某条路线该怎么走。朝圣的具体仪轨不在这里展开。",
    stages: {
      separation: "离开常住地与日常角色：护照、假期、把工作交给别人，都是可观察的退出。",
      liminal:
        "在路上或圣地，日常等级暂时松动。特纳把这种短暂平等叫做 communitas，并强调它会结束。",
      aggregation:
        "回家之后带回纪念品、故事或新的义务。社会位置通常回到原点，只是多了一层可讲述的经历。",
    },
  },
  {
    id: "wedding",
    label: "婚礼作为位置转移",
    why: "民法、亲属称谓和宴席座位都能看见位置变化。这里不写任何宗教婚礼的操作。",
    stages: {
      separation:
        "双方从「未婚」的法律与亲属位置退出：请柬、户籍预约、告别单身的宴会都是公开信号。",
      liminal: "典礼进行中，两人既不再是原来的未婚身份，也还没被登记成新的亲属节点。",
      aggregation: "登记、改称谓、新的财产与扶养义务生效。完成的是制度位置，不是感情的本质。",
    },
  },
];

export function ritualStageById(id: RitualStageId) {
  return RITUAL_STAGES.find((stage) => stage.id === id)!;
}

export function ritualCaseById(id: RitualCaseId) {
  return RITUAL_CASES.find((item) => item.id === id)!;
}

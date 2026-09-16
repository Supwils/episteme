export type PathLensId = "tutor" | "system";
export type PathNodeId = "start" | "branch" | "green" | "next";

export const PATH_LENSES: readonly {
  id: PathLensId;
  label: string;
  tease: string;
}[] = [
  {
    id: "tutor",
    label: "像家教",
    tease: "家教可以改口、停下来、承认不确定。示意不是真人。",
  },
  {
    id: "system",
    label: "系统记录",
    tease: "系统记下点击、时延与对错。绿灯是模型推断。",
  },
];

export const PATH_NODES: readonly {
  id: PathNodeId;
  label: string;
  tutor: string;
  system: string;
}[] = [
  {
    id: "start",
    label: "起始题",
    tutor: "看你会不会入门。",
    system: "记下作答与用时。",
  },
  {
    id: "branch",
    label: "分支",
    tutor: "换一种表征再问。",
    system: "按错误类型跳题。",
  },
  {
    id: "green",
    label: "绿灯",
    tutor: "我觉得你可以往前。",
    system: "掌握概率过阈值。不是已经学会的照片。",
  },
  {
    id: "next",
    label: "下一题",
    tutor: "来一道远一点的。",
    system: "日志进入推荐。谁有权看，是另一篇文章。",
  },
];

export function pathLensById(id: PathLensId) {
  return PATH_LENSES.find((item) => item.id === id)!;
}

export function pathNodeById(id: PathNodeId) {
  return PATH_NODES.find((item) => item.id === id)!;
}

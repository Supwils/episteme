export type TalkId = "ire" | "wait";

export const TALK_MODES: readonly {
  id: TalkId;
  label: string;
  tease: string;
}[] = [
  {
    id: "ire",
    label: "IRE",
    tease: "启动—回应—评价。话轮短，教师很快收回发言权。",
  },
  {
    id: "wait",
    label: "长等待",
    tease: "启动之后留下空白。学生可以展开，评价推迟。",
  },
];

export const TALK_TURNS: Record<
  TalkId,
  readonly { id: string; label: string; speaker: string; text: string }[]
> = {
  ire: [
    { id: "i", label: "启动", speaker: "教师", text: "答案是什么？" },
    { id: "r", label: "回应", speaker: "学生", text: "短答。话轮被收回。" },
    { id: "e", label: "评价", speaker: "教师", text: "对。下一题。" },
  ],
  wait: [
    { id: "i", label: "启动", speaker: "教师", text: "你怎么想到的？" },
    { id: "w", label: "等待", speaker: "空白", text: "几秒不被打断。" },
    { id: "s", label: "展开", speaker: "学生", text: "把理由说完。" },
  ],
};

export function talkModeById(id: TalkId) {
  return TALK_MODES.find((item) => item.id === id)!;
}

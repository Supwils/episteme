export type DiscourseMode = "chronological" | "in-medias-res" | "end-first";

export type StoryEvent = {
  id: string;
  storyIndex: number;
  shortLabel: string;
  text: string;
};

/** 韩非子《五蠹》守株待兔：情节事件，不是主题读法。 */
export const HARE_EVENTS: readonly StoryEvent[] = [
  { id: "till", storyIndex: 1, shortLabel: "耕田", text: "宋人耕田" },
  { id: "hare", storyIndex: 2, shortLabel: "触株", text: "兔走触株而死" },
  { id: "wait", storyIndex: 3, shortLabel: "守株", text: "释耒守株" },
  { id: "fail", storyIndex: 4, shortLabel: "不得", text: "兔不可复得" },
];

const DISCOURSE_IDS: Record<DiscourseMode, readonly string[]> = {
  chronological: ["till", "hare", "wait", "fail"],
  "in-medias-res": ["wait", "till", "hare", "fail"],
  "end-first": ["fail", "till", "hare", "wait"],
};

export const DISCOURSE_MODES: readonly {
  id: DiscourseMode;
  label: string;
  note: string;
}[] = [
  {
    id: "chronological",
    label: "故事次序",
    note: "讲述顺序与情节事件一致。这是对照基线，不是“正确讲法”。",
  },
  {
    id: "in-medias-res",
    label: "从中段起",
    note: "先看见守株，再补耕田与触株。热奈特所谓倒叙：话语先于故事里更早的事件。",
  },
  {
    id: "end-first",
    label: "先给结局",
    note: "先说兔不可复得，再回填原因。事件没变，可跟踪的因果却后置。",
  },
];

export function discourseSequence(mode: DiscourseMode): StoryEvent[] {
  const byId = new Map(HARE_EVENTS.map((event) => [event.id, event]));
  return DISCOURSE_IDS[mode].map((id) => {
    const event = byId.get(id);
    if (!event) throw new Error(`unknown event ${id}`);
    return event;
  });
}

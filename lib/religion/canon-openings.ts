export type CanonPairId = "genesis" | "daodejing" | "heart-sutra";
export type CanonLensId = "speaker" | "claim" | "genre";

export const CANON_LENSES: readonly { id: CanonLensId; label: string }[] = [
  { id: "speaker", label: "谁在说话" },
  { id: "claim", label: "它声称什么" },
  { id: "genre", label: "体裁" },
];

export type CanonPair = {
  id: CanonPairId;
  label: string;
  source: string;
  text: string;
  lenses: Record<CanonLensId, string>;
};

export const CANON_PAIRS: readonly CanonPair[] = [
  {
    id: "genesis",
    label: "创世记起句",
    source: "和合本公有领域译文（1919）",
    text: "起初神创造天地。地是空虚混沌，渊面黑暗；神的灵运行在水面上。",
    lenses: {
      speaker: "叙事者用全知口吻讲「起初」。神是被叙述的行动者，不是这段话里的第一人称。",
      claim: "世界有一个可定位的开端，并且是被造出来的。空虚、黑暗、水面是创造之前的场景，不是无。",
      genre: "叙事宇宙论：用时间副词「起初」把宇宙放进故事。后面很快会进入谱系与族长史。",
    },
  },
  {
    id: "daodejing",
    label: "道德经起句",
    source: "通行本《老子》第一章，据公有领域整理",
    text: "道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。",
    lenses: {
      speaker:
        "没有署名的格言口吻。不像创世记那样出现一个行动中的神，也不像佛经那样有「如是我闻」。",
      claim: "能用语言固定下来的「道」就不是那个常道。起句先限制命名，再谈天地之始。",
      genre: "对句与悖论。宇宙论被写成可反复诵读的命题，而不是按日展开的创造叙事。",
    },
  },
  {
    id: "heart-sutra",
    label: "心经起句",
    source: "玄奘译《般若波罗蜜多心经》公有领域文本",
    text: "观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。",
    lenses: {
      speaker: "观自在菩萨是被叙述的修行者。汉译经题把这段放进般若类经典，而不是创世史诗。",
      claim: "色受想行识都可以被「照见」为空。苦厄的解除被连在这种照见上，而不是连在创世事件上。",
      genre: "短经 / 咒语型文本的开篇：人物、修行、洞察、果，四拍收住。后面才进入「色不异空」。",
    },
  },
];

export function canonPairById(id: CanonPairId) {
  return CANON_PAIRS.find((pair) => pair.id === id)!;
}

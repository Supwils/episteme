export type CanonPairId = "genesis" | "daodejing" | "heart-sutra";

export type CanonPair = {
  id: CanonPairId;
  label: string;
  source: string;
  text: string;
};

export const CANON_PAIRS: readonly CanonPair[] = [
  {
    id: "genesis",
    label: "创世记起句",
    source: "和合本公有领域译文（1919）",
    text: "起初神创造天地。地是空虚混沌，渊面黑暗；神的灵运行在水面上。",
  },
  {
    id: "daodejing",
    label: "道德经起句",
    source: "通行本《老子》第一章，据公有领域整理",
    text: "道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。",
  },
  {
    id: "heart-sutra",
    label: "心经起句",
    source: "玄奘译《般若波罗蜜多心经》公有领域文本",
    text: "观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。",
  },
];

export function canonPairById(id: CanonPairId) {
  return CANON_PAIRS.find((pair) => pair.id === id)!;
}

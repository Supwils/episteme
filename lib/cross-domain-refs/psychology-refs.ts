import type { CrossReference } from "./types";

// Only cognitive-dissonance↔determinism survives with real pages on both ends.
// positive-psychology→eudaimonia, cognitive-bias→wwii-codebreaking and
// milgram→holocaust were dropped: those endpoints have no article pages.
export const PSYCHOLOGY_REFS: CrossReference[] = [
  {
    fromDomain: "psychology",
    fromId: "cognitive-dissonance",
    fromTitle: "认知失调",
    fromPath: "/psychology/phenomena/cognitive-dissonance",
    toDomain: "philosophy",
    toId: "determinism",
    toTitle: "决定论",
    toPath: "/philosophy/concepts/determinism",
    relation: "认知失调理论挑战了理性决定论假设，揭示人类决策中的非理性机制",
  },
];

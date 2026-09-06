export type TranslationSide = {
  translator: string;
  edition: string;
  lines: readonly string[];
};

export type TranslationPair = {
  id: string;
  title: string;
  sourceLabel: string;
  sourceLines: readonly string[];
  left: TranslationSide;
  right: TranslationSide;
  contrast: string;
};

export const TRANSLATION_PAIRS: readonly TranslationPair[] = [
  {
    id: "jingyesi",
    title: "静夜思",
    sourceLabel: "李白《静夜思》（通行二十字本）",
    sourceLines: ["床前明月光", "疑是地上霜", "举头望明月", "低头思故乡"],
    left: {
      translator: "Herbert A. Giles",
      edition: "Chinese Poetry in English Verse, 1898",
      lines: [
        "I wake, and moonbeams play around my bed,",
        "Glittering like hoar-frost to my wondering eyes;",
        "Up towards the glorious moon I raise my head,",
        "Then lay me down—and thoughts of home arise.",
      ],
    },
    right: {
      translator: "Witter Bynner",
      edition: "The Jade Mountain, 1929",
      lines: [
        "So bright a gleam on the foot of my bed—",
        "Could there have been a frost already?",
        "Lifting myself to look, I found that it was moonlight.",
        "Sinking back again, I thought suddenly of home.",
      ],
    },
    contrast:
      "Giles 把四句收成带韵的五音步；Bynner 把“疑是”写成问句，床前变成 foot of my bed。改写发生在节奏、疑问和空间词上。",
  },
  {
    id: "odyssey",
    title: "奥德赛起句",
    sourceLabel: "荷马《奥德赛》1.1（希腊文教学转写）",
    sourceLines: ["Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον"],
    left: {
      translator: "A. T. Murray",
      edition: "Loeb Classical Library, 1919",
      lines: ["Tell me, O Muse, of the man of many devices, who wandered full many ways"],
    },
    right: {
      translator: "Samuel Butler",
      edition: "The Odyssey, 1900",
      lines: ["Tell me, O muse, of that ingenious hero who travelled far and wide"],
    },
    contrast:
      "πολύτροπον：Murray 作 many devices，Butler 作 ingenious hero。同一个希腊形容词，英语里一次偏计谋，一次偏人物评价。",
  },
];

export function translationPairById(id: string): TranslationPair {
  const pair = TRANSLATION_PAIRS.find((item) => item.id === id);
  if (!pair) throw new Error(`unknown pair ${id}`);
  return pair;
}

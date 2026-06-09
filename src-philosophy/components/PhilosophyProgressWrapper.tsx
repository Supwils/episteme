"use client";

import { usePathname } from "next/navigation";
import { ReadingProgressBar } from "./ReadingProgressBar";

const DETAIL_PREFIXES = [
  { prefix: "/philosophy/thinkers/", type: "思想家", key: "thinker" },
  { prefix: "/philosophy/concepts/", type: "概念", key: "concept" },
  { prefix: "/philosophy/schools/", type: "流派", key: "school" },
  { prefix: "/philosophy/isms/", type: "主义", key: "ism" },
  { prefix: "/philosophy/experiments/", type: "思想实验", key: "experiment" },
  { prefix: "/philosophy/dialogues/", type: "哲学对话", key: "dialogue" },
  { prefix: "/philosophy/questions/", type: "哲学大问题", key: "question" },
];

export function PhilosophyProgressWrapper() {
  const pathname = usePathname();

  for (const { prefix, type, key } of DETAIL_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      const slug = pathname.slice(prefix.length).split("/")[0];
      if (slug) {
        return <ReadingProgressBar slug={`${key}:${slug}`} contentType={type} />;
      }
    }
  }

  return null;
}

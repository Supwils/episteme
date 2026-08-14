import type { Metadata } from "next";
import PhilosophyHomeClient from "./PhilosophyHomeClient";
import type { PhilosophyHomeStat } from "./PhilosophyHomeClient";
import { getAllThinkers, getAllQuestions } from "@/lib/mdx";
import { getAllSchools } from "@/lib/schools";
import { getAllExperiments } from "@/lib/experiments";
import { getAllIsms } from "@/lib/isms";
import { getAllConcepts } from "@/lib/concepts";
import { getAllDialogues } from "@/lib/dialogues";
import { createFrontier } from "@/lib/frontier";

export const metadata: Metadata = {
  title: "哲学思想 — Episteme · 格致",
  description: "从古希腊到当代的哲学知识图谱——探索思想家、流派与核心问题",
  openGraph: {
    title: "哲学思想",
    description: "从古希腊到当代的哲学知识图谱——探索思想家、流派与核心问题",
    type: "website",
  },
};

export default function PhilosophyHomePage() {
  // Counted from the real loaders so hero stats never drift from content.
  const thinkerCount = getAllThinkers().length;
  const articleTotal =
    thinkerCount +
    getAllSchools().length +
    getAllIsms().length +
    getAllConcepts().length +
    getAllExperiments().length +
    getAllQuestions().length +
    getAllDialogues().length +
    createFrontier("philosophy").getAllArticles().length;

  const stats: PhilosophyHomeStat[] = [
    { value: thinkerCount, label: "哲学家", suffix: "位" },
    { value: getAllSchools().length, label: "流派", suffix: "个" },
    { value: getAllExperiments().length, label: "思想实验", suffix: "个" },
    { value: articleTotal, label: "文章", suffix: "篇" },
  ];

  return <PhilosophyHomeClient stats={stats} />;
}

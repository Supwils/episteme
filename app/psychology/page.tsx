import type { Metadata } from "next";
import PsychologyHomeClient from "./PsychologyHomeClient";
import type { PsychologyHomeStat } from "./PsychologyHomeClient";
import {
  getAllTheorists,
  getAllExperiments,
  getAllPhenomena,
  getAllSchools,
} from "@/subjects/psychology/lib/mdx";

export const metadata: Metadata = {
  title: "心理学与认知科学 — Episteme · 格致",
  description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
  openGraph: {
    title: "心理学与认知科学",
    description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
    type: "website",
  },
};

export default function PsychologyHomePage() {
  // Counted from the real loaders so the hero stats can never drift from content.
  const stats: PsychologyHomeStat[] = [
    { label: "理论家", value: getAllTheorists().length, suffix: "位" },
    { label: "实验", value: getAllExperiments().length, suffix: "项" },
    { label: "现象", value: getAllPhenomena().length, suffix: "个" },
    { label: "流派", value: getAllSchools().length, suffix: "个" },
  ];
  return <PsychologyHomeClient stats={stats} />;
}

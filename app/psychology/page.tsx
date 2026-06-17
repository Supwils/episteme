import type { Metadata } from "next";
import PsychologyHomeClient from "./PsychologyHomeClient";

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
  return <PsychologyHomeClient />;
}

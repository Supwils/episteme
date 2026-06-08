import type { Metadata } from "next";
import PhilosophyHomeClient from "./PhilosophyHomeClient";

export const metadata: Metadata = {
  title: "哲学思想 — Universe Knowledge",
  description: "从古希腊到当代的哲学知识图谱——探索思想家、流派与核心问题",
  openGraph: {
    title: "哲学思想",
    description: "从古希腊到当代的哲学知识图谱——探索思想家、流派与核心问题",
    type: "website",
  },
};

export default function PhilosophyHomePage() {
  return <PhilosophyHomeClient />;
}

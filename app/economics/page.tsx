import EconomicsHomeClient from "./EconomicsHomeClient";
import type { EconomicsHomeStat } from "./EconomicsHomeClient";
import {
  getAllEconomists,
  getAllTheories,
  getAllConcepts,
  getAllCaseStudies,
  getAllSchools,
  getAllDebates,
  getAllDialogues,
  getAllKnowledgeBase,
} from "@/subjects/economics/lib/mdx";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { createFrontier } from "@/lib/frontier";

export const metadata = {
  title: "经济学 — Episteme · 格致",
  description: "从亚当·斯密到现代博弈论，探索市场机制与经济思想的知识殿堂。",
};

const SIMULATION_COUNT = 10;

export default function EconomicsPage() {
  // Counted from the real loaders so cards and stats never drift from content.
  const articleCounts = {
    economists: getAllEconomists().length,
    theories: getAllTheories().length,
    concepts: getAllConcepts().length,
    caseStudies: getAllCaseStudies().length,
    policyAnalyses: createKnowledgeSection("economics", "policy-analyses").getAll().length,
    schools: getAllSchools().length,
    debates: getAllDebates().length,
    dialogues: getAllDialogues().length,
    knowledgeBase: getAllKnowledgeBase().length,
    frontier: createFrontier("economics").getAllArticles().length,
  };
  const totalArticles = Object.values(articleCounts).reduce((sum, n) => sum + n, 0);

  const counts: Record<string, string> = {
    economists: String(articleCounts.economists),
    theories: String(articleCounts.theories),
    concepts: String(articleCounts.concepts),
    "case-studies": String(articleCounts.caseStudies),
    "policy-analyses": String(articleCounts.policyAnalyses),
    schools: String(articleCounts.schools),
    debates: String(articleCounts.debates),
    dialogues: String(articleCounts.dialogues),
    "knowledge-base": String(articleCounts.knowledgeBase),
  };

  const stats: EconomicsHomeStat[] = [
    { value: totalArticles, label: "知识条目", suffix: "+" },
    { value: articleCounts.economists, label: "经济学家", suffix: "" },
    { value: articleCounts.schools, label: "经济学派", suffix: "" },
    { value: SIMULATION_COUNT, label: "互动模拟", suffix: "" },
  ];

  return <EconomicsHomeClient counts={counts} stats={stats} />;
}

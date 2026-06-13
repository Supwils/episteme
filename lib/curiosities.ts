import { PHYSICS_CURIOSITIES } from "@/content/curiosities/physics";
import { COSMOLOGY_CURIOSITIES } from "@/content/curiosities/cosmology";
import { MATHEMATICS_CURIOSITIES } from "@/content/curiosities/mathematics";
import { LIFE_SCIENCE_CURIOSITIES } from "@/content/curiosities/life-science";
import { PHILOSOPHY_CURIOSITIES } from "@/content/curiosities/philosophy";
import { ECONOMICS_CURIOSITIES } from "@/content/curiosities/economics";
import { PSYCHOLOGY_CURIOSITIES } from "@/content/curiosities/psychology";
import { HISTORY_CURIOSITIES } from "@/content/curiosities/human-history";
import { COMPUTER_SCIENCE_CURIOSITIES } from "@/content/curiosities/computer-science";
import { POLITICAL_SCIENCE_CURIOSITIES } from "@/content/curiosities/political-science";

/**
 * A "curiosity" is a short, surprising, sourced fact — the kind of thing that
 * makes a reader go "I had no idea." Distinct from the systematic knowledge base
 * and the research frontier: this is the fascination layer, browsable as a wall.
 */
export interface Curiosity {
  /** Stable id within its subject (kebab-case). */
  id: string;
  /** The hook — one punchy line. */
  title: string;
  /** 1–3 sentences: the surprise + why it's true / why it matters. */
  detail: string;
  /** Where it comes from, for credibility. */
  source?: string;
  tags?: string[];
  /** Optional link to deeper content on the platform. */
  url?: string;
}

export type CuriositySubject =
  | "physics"
  | "cosmology"
  | "mathematics"
  | "life-science"
  | "philosophy"
  | "economics"
  | "psychology"
  | "human-history"
  | "computer-science"
  | "political-science";

export interface CuriosityWithSubject extends Curiosity {
  subject: CuriositySubject;
}

export const CURIOSITY_SUBJECTS: Record<
  CuriositySubject,
  { label: string; accent: string; href: string; icon: string }
> = {
  physics: { label: "宇宙物理", accent: "#6b8cce", href: "/universe-physics", icon: "🔬" },
  cosmology: { label: "宇宙学", accent: "#a88adf", href: "/cosmology", icon: "🌌" },
  mathematics: { label: "数学", accent: "#5fb3a3", href: "/mathematics", icon: "📐" },
  "life-science": { label: "生命科学", accent: "#6bae6b", href: "/life-science", icon: "🧬" },
  philosophy: { label: "哲学", accent: "#c8956a", href: "/philosophy", icon: "💭" },
  economics: { label: "经济学", accent: "#c8a45a", href: "/economics", icon: "📊" },
  psychology: { label: "心理学", accent: "#c678dd", href: "/psychology", icon: "🧠" },
  "human-history": { label: "人类历史", accent: "#cf8a52", href: "/human-history", icon: "📜" },
  "computer-science": {
    label: "计算机科学",
    accent: "#4f9cf0",
    href: "/computer-science",
    icon: "💻",
  },
  "political-science": {
    label: "政治学",
    accent: "#c25b5b",
    href: "/political-science",
    icon: "⚖️",
  },
};

const REGISTRY: Record<CuriositySubject, Curiosity[]> = {
  physics: PHYSICS_CURIOSITIES,
  cosmology: COSMOLOGY_CURIOSITIES,
  mathematics: MATHEMATICS_CURIOSITIES,
  "life-science": LIFE_SCIENCE_CURIOSITIES,
  philosophy: PHILOSOPHY_CURIOSITIES,
  economics: ECONOMICS_CURIOSITIES,
  psychology: PSYCHOLOGY_CURIOSITIES,
  "human-history": HISTORY_CURIOSITIES,
  "computer-science": COMPUTER_SCIENCE_CURIOSITIES,
  "political-science": POLITICAL_SCIENCE_CURIOSITIES,
};

export function getAllCuriosities(): CuriosityWithSubject[] {
  const all: CuriosityWithSubject[] = [];
  for (const subject of Object.keys(REGISTRY) as CuriositySubject[]) {
    for (const item of REGISTRY[subject]) {
      all.push({ ...item, subject });
    }
  }
  return all;
}

export function getCuriositiesBySubject(subject: CuriositySubject): CuriosityWithSubject[] {
  return REGISTRY[subject].map((item) => ({ ...item, subject }));
}

export function getCuriosityCount(): number {
  return Object.values(REGISTRY).reduce((sum, list) => sum + list.length, 0);
}

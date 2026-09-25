import { isSafeInternalPath } from "@/lib/urls";
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
import { CHEMISTRY_CURIOSITIES } from "@/content/curiosities/chemistry";
import { MEDICINE_CURIOSITIES } from "@/content/curiosities/medicine";
import { EARTH_SCIENCE_CURIOSITIES } from "@/content/curiosities/earth-science";
import { ENGINEERING_CURIOSITIES } from "@/content/curiosities/engineering";
import { LINGUISTICS_CURIOSITIES } from "@/content/curiosities/linguistics";
import { SOCIOLOGY_CURIOSITIES } from "@/content/curiosities/sociology";
import { LAW_CURIOSITIES } from "@/content/curiosities/law";
import { ARTS_CURIOSITIES } from "@/content/curiosities/arts";
import { LITERATURE_CURIOSITIES } from "@/content/curiosities/literature";
import { RELIGION_CURIOSITIES } from "@/content/curiosities/religion";
import { ANTHROPOLOGY_CURIOSITIES } from "@/content/curiosities/anthropology";
import { EDUCATION_CURIOSITIES } from "@/content/curiosities/education";
import { CROSS_DOMAIN_CURIOSITIES } from "@/content/curiosities/cross-domain";

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
  | "political-science"
  | "chemistry"
  | "medicine"
  | "earth-science"
  | "engineering"
  | "linguistics"
  | "sociology"
  | "law"
  | "arts"
  | "literature"
  | "religion"
  | "anthropology"
  | "education";

export const CROSS_DOMAIN_TAG = "cross-domain";

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
  chemistry: { label: "化学", accent: "#e08a3c", href: "/chemistry", icon: "⚗️" },
  medicine: { label: "医学", accent: "#d9544d", href: "/medicine", icon: "🩺" },
  "earth-science": { label: "地球科学", accent: "#4f9d76", href: "/earth-science", icon: "🌏" },
  engineering: { label: "工程", accent: "#8a919e", href: "/engineering", icon: "🛠️" },
  linguistics: { label: "语言学", accent: "#6fa8c7", href: "/linguistics", icon: "🔤" },
  sociology: { label: "社会学", accent: "#b07cc6", href: "/sociology", icon: "👥" },
  law: { label: "法学", accent: "#a8843c", href: "/law", icon: "⚖️" },
  arts: { label: "艺术", accent: "#b0785a", href: "/arts", icon: "🎨" },
  literature: { label: "文学", accent: "#8b5e4a", href: "/literature", icon: "📖" },
  religion: { label: "宗教学", accent: "#6b5c8a", href: "/religion", icon: "🕯️" },
  anthropology: { label: "人类学", accent: "#8b5a3c", href: "/anthropology", icon: "🦴" },
  education: { label: "教育学", accent: "#3d6b8a", href: "/education", icon: "🎒" },
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
  chemistry: CHEMISTRY_CURIOSITIES,
  medicine: MEDICINE_CURIOSITIES,
  "earth-science": EARTH_SCIENCE_CURIOSITIES,
  engineering: ENGINEERING_CURIOSITIES,
  linguistics: LINGUISTICS_CURIOSITIES,
  sociology: SOCIOLOGY_CURIOSITIES,
  law: LAW_CURIOSITIES,
  arts: ARTS_CURIOSITIES,
  literature: LITERATURE_CURIOSITIES,
  religion: RELIGION_CURIOSITIES,
  anthropology: ANTHROPOLOGY_CURIOSITIES,
  education: EDUCATION_CURIOSITIES,
};

export function getAllCuriosities(): CuriosityWithSubject[] {
  const all: CuriosityWithSubject[] = [];
  for (const subject of Object.keys(REGISTRY) as CuriositySubject[]) {
    for (const item of REGISTRY[subject]) {
      all.push({ ...item, subject });
    }
  }
  for (const item of CROSS_DOMAIN_CURIOSITIES) {
    const tags = item.tags?.includes(CROSS_DOMAIN_TAG)
      ? item.tags
      : [...(item.tags ?? []), CROSS_DOMAIN_TAG];
    all.push({ ...item, tags });
  }
  return all;
}

export function isCrossDomainCuriosity(item: CuriosityWithSubject): boolean {
  return item.tags?.includes(CROSS_DOMAIN_TAG) === true;
}

/** Lands the wall on the coincidence chip. Safe to use as a Next `<Link href>`. */
export const COINCIDENCE_WALL_HREF = "/curiosities?filter=cross-domain";

/** Same salt as daily/homepage so today's coincidence matches across surfaces. */
export const SPOTLIGHT_COINCIDENCE_SALT = 26;

export function getCrossDomainCuriosities(): CuriosityWithSubject[] {
  return getAllCuriosities().filter(isCrossDomainCuriosity);
}

export function getSpotlightCoincidence(seed: number): CuriosityWithSubject {
  const pool = getCrossDomainCuriosities();
  if (pool.length === 0) {
    throw new Error("getSpotlightCoincidence: coincidence pool is empty");
  }
  const picked = pool[Math.abs(seed) % pool.length];
  if (!picked) {
    throw new Error("getSpotlightCoincidence: coincidence pool is empty");
  }
  return picked;
}

export function coincidenceFollowHref(url?: string): string {
  return curiosityArticleHref(url) ?? COINCIDENCE_WALL_HREF;
}

export function curiosityTeaser(detail: string, max = 72): string {
  const sentence = detail.match(/^[^。！？]+[。！？]?/)?.[0] ?? detail;
  if (sentence.length <= max) return sentence;
  return `${sentence.slice(0, max).trimEnd()}…`;
}

/**
 * Domain homes (`/psychology`) and section lists (`/psychology/phenomena`)
 * dump the reader. Only article-depth paths (three or more segments) count.
 * Protocol-relative and off-site URLs are never followable from daily/wall CTAs.
 */
export function curiosityArticleHref(url?: string): string | undefined {
  if (!url) return undefined;
  if (!isSafeInternalPath(url)) return undefined;
  const parts = url.split("/").filter(Boolean);
  return parts.length >= 3 ? url : undefined;
}

/** Wall / daily CTA: only promise an article when the URL actually is one. */
export function curiosityFollowLabel(url?: string): string {
  return curiosityArticleHref(url) ? "阅读相关文章 →" : "更多奇趣知识 →";
}

export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  era: "古代" | "近代" | "现代" | "当代";
  category: "思想" | "著作" | "事件" | "学派";
  figures: string[];
  significance: 1 | 2 | 3;
};

import { ANCIENT_EVENTS } from "./timeline-data-ancient";
import { MODERN_EVENTS } from "./timeline-data-modern";

export const TIMELINE: TimelineEvent[] = [...ANCIENT_EVENTS, ...MODERN_EVENTS].sort(
  (a, b) => a.year - b.year
);

export const ERA_ORDER = ["古代", "近代", "现代", "当代"] as const;

export const ERA_LABELS: Record<string, string> = {
  古代: "古典时代 · Ancient & Hellenistic",
  近代: "中世纪与近代 · Medieval & Early Modern",
  现代: "现代哲学 · Modern",
  当代: "当代哲学 · Contemporary",
};

export const ERA_RANGES: Record<string, string> = {
  古代: "600 BCE - 500 CE",
  近代: "500 - 1800",
  现代: "1800 - 1950",
  当代: "1950 - 2025",
};

export const CATEGORY_ICONS: Record<string, string> = {
  思想: "\u25C8",
  著作: "\u25A3",
  事件: "\u25C9",
  学派: "\u25C6",
};

export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

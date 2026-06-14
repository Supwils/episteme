import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "@/lib/content-paths";

/**
 * Long-form deep-dive articles for major life-history events
 * (content/life-science/events/*.mdx). They had no route; instead of an orphan
 * section, each is surfaced inline on its matching timeline event page.
 * Server-only (fs).
 */
const EVENTS_DIR = path.join(getDomainContentDir("life-science"), "events");

/** timeline event id → deep-dive article slug. The mdx `era` field is unreliable. */
const TIMELINE_TO_EVENT_DETAIL: Record<string, string> = {
  "cambrian-explosion": "cambrian-explosion-detail",
  "great-oxidation": "oxygen-catastrophe",
  "permian-extinction": "permian-extinction-detail",
};

export interface EventDetail {
  title: string;
  body: string;
}

export function getEventDetailForTimeline(timelineEventId: string): EventDetail | null {
  const slug = TIMELINE_TO_EVENT_DETAIL[timelineEventId];
  if (!slug) return null;
  const file = path.join(EVENTS_DIR, `${slug}.mdx`);
  if (!file.startsWith(EVENTS_DIR) || !fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  const body = content.replace(/^\s*#\s+.+\n+/, "").trim();
  if (!body) return null;
  return { title: typeof data.title === "string" ? data.title : "深入详解", body };
}

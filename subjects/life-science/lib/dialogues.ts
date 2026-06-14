import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainContentDir } from "@/lib/content-paths";
import type { LifeScienceDialogue } from "./types";

/**
 * Server-only loader for life-science dialogues (content/life-science/dialogues/*.mdx).
 * Uses fs, so it must NOT be imported into the client search bundle — the search
 * mirror (content/life-science/dialogues-data.ts) carries the metadata instead.
 */
const DIALOGUES_DIR = path.join(getDomainContentDir("life-science"), "dialogues");

function parse(slug: string): LifeScienceDialogue | null {
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const file = path.join(DIALOGUES_DIR, `${slug}.mdx`);
  if (!file.startsWith(DIALOGUES_DIR) || !fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  // The body opens with a `---` divider after the frontmatter; drop it.
  const body = content.replace(/^\s*---\s*\n/, "").trim();
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    participants: Array.isArray(data.participants) ? data.participants.map(String) : [],
    question: typeof data.question === "string" ? data.question : "",
    field: typeof data.field === "string" ? data.field : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    body,
  };
}

export function getDialogueSlugs(): string[] {
  if (!fs.existsSync(DIALOGUES_DIR)) return [];
  return fs
    .readdirSync(DIALOGUES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

export function getDialogueBySlug(slug: string): LifeScienceDialogue | null {
  return parse(slug);
}

export function getAllDialogues(): LifeScienceDialogue[] {
  return getDialogueSlugs()
    .map((s) => parse(s))
    .filter((d): d is LifeScienceDialogue => d !== null);
}

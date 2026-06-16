import fs from "node:fs";
import path from "node:path";
import { getDomainContentDir } from "./content-paths";
import { safeParseMatter, firstHeading, stripLeadingHeading } from "./content-utils";

export interface DialogueSummary {
  slug: string;
  title: string;
  /** The framing question (physics `question`) or subject (cosmology `topic`). */
  description: string;
  /** Display names of the two interlocutors. */
  participants: string[];
  tags: string[];
}

export interface DialogueFull extends DialogueSummary {
  content: string;
}

export interface DialogueCollection {
  getAll(): DialogueSummary[];
  getBySlug(slug: string): DialogueFull | null;
  getSlugs(): string[];
}

/** Two frontmatter shapes exist: `[id, id]` (physics) and `[{name,…}]`
 * (cosmology). Normalize both to a list of display strings. */
function parseParticipants(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((p) =>
      typeof p === "string"
        ? p
        : p && typeof p === "object" && "name" in p
          ? String((p as { name: unknown }).name)
          : ""
    )
    .filter(Boolean);
}

export function createDialogues(domain: string): DialogueCollection {
  const root = path.join(getDomainContentDir(domain), "dialogues");
  let cache: DialogueSummary[] | null = null;

  const summaryOf = (
    slug: string,
    data: Record<string, unknown>,
    content: string
  ): DialogueSummary => ({
    slug,
    title:
      typeof data.title === "string" && data.title ? data.title : (firstHeading(content) ?? slug),
    description:
      (typeof data.question === "string" && data.question) ||
      (typeof data.topic === "string" && data.topic) ||
      "",
    participants: parseParticipants(data.participants),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  });

  const getSlugs = (): string[] => {
    if (!fs.existsSync(root)) return [];
    return fs
      .readdirSync(root)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  };

  const getAll = (): DialogueSummary[] => {
    if (cache) return cache;
    cache = getSlugs()
      .map((slug) => {
        const { data, content } = safeParseMatter(
          fs.readFileSync(path.join(root, `${slug}.mdx`), "utf-8")
        );
        return summaryOf(slug, data, content);
      })
      .sort((a, b) => a.title.localeCompare(b.title, "zh"));
    return cache;
  };

  const getBySlug = (slug: string): DialogueFull | null => {
    if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
    const full = path.join(root, `${slug}.mdx`);
    if (!fs.existsSync(full)) return null;
    const { data, content } = safeParseMatter(fs.readFileSync(full, "utf-8"));
    return { ...summaryOf(slug, data, content), content: stripLeadingHeading(content) };
  };

  return { getAll, getBySlug, getSlugs };
}

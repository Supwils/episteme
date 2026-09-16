import path from "node:path";
import { readContentBySlug, readContentEntries } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";
import { firstHeading, stripLeadingHeading } from "./content-utils";

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

  const getSlugs = (): string[] => listContentSlugs(root);

  const getAll = (): DialogueSummary[] => {
    if (cache) return cache;
    cache = readContentEntries(root, undefined, "safe")
      .map((entry) => summaryOf(entry.slug, entry.frontmatter, entry.content))
      .sort((a, b) => a.title.localeCompare(b.title, "zh"));
    return cache;
  };

  const getBySlug = (slug: string): DialogueFull | null => {
    const entry = readContentBySlug(root, slug, undefined, "safe");
    if (!entry) return null;
    return {
      ...summaryOf(slug, entry.frontmatter, entry.content),
      content: stripLeadingHeading(entry.content),
    };
  };

  return { getAll, getBySlug, getSlugs };
}

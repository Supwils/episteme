import { describe, expect, it } from "vitest";
import { MERGED_ARTICLES } from "@/lib/merged-articles";
import { getArticleBySlug } from "@/lib/knowledge-base";
import { cosmologyKB } from "@/lib/cosmology-kb";
import { lifeScienceKB } from "@/lib/life-science-kb";
import { getSpeciesById } from "@/subjects/life-science/lib/species";

const LOADERS: Record<string, (slug: string) => unknown> = {
  "/human-history/knowledge": getArticleBySlug,
  "/cosmology/knowledge-base": (slug) => cosmologyKB.getArticleBySlug(slug),
  "/life-science/knowledge-base": (slug) => lifeScienceKB.getArticleBySlug(slug),
  "/life-science/species": getSpeciesById,
};

function resolve(path: string): unknown {
  const cut = path.lastIndexOf("/");
  const load = LOADERS[path.slice(0, cut)];
  if (!load) throw new Error(`No loader for ${path}`);
  return load(path.slice(cut + 1));
}

describe("merged articles", () => {
  it.each(Object.entries(MERGED_ARTICLES))("%s now lives only at %s", (from, to) => {
    // A merged-away article that reappears would shadow its own redirect.
    expect(resolve(from)).toBeFalsy();
    expect(resolve(to)).toBeTruthy();
  });
});

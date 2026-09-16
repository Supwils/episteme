import path from "node:path";
import { readContentBySlug } from "./content-article";
import { getDomainContentDir } from "./content-paths";
import { decodeSlug, stripLeadingHeading } from "./content-utils";

/**
 * The species detail route is data-driven (taxonomy/traits from
 * subjects/life-science/lib/species), but `content/life-science/species/*.mdx`
 * holds long-form, source-cited essays for a curated subset. This loader bridges
 * the two so an essay actually renders on the page — whether the species also has
 * a structured record (essay appended) or is essay-only (prose page).
 */
export interface SpeciesProse {
  slug: string;
  title: string;
  titleEn: string;
  latinName: string;
  category: string;
  era: string;
  tags: string[];
  content: string;
}

const speciesRoot = path.join(getDomainContentDir("life-science"), "species");

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" && value ? value : fallback;
}

export function getSpeciesProse(slug: string): SpeciesProse | null {
  const wanted = decodeSlug(slug).normalize("NFC");
  const entry = readContentBySlug(speciesRoot, wanted, undefined, "safe");
  if (!entry) return null;
  const data = entry.frontmatter;
  return {
    slug: wanted,
    title: str(data.title, wanted),
    titleEn: str(data.titleEn),
    latinName: str(data.latinName),
    category: str(data.category, "物种"),
    era: str(data.era),
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
    content: stripLeadingHeading(entry.content),
  };
}

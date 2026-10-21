import path from "node:path";
import { readContentEntries } from "@/lib/content-article";
import { getDomainContentDir } from "@/lib/content-paths";
import { chineseNameBesideLatin } from "@/lib/reader-person-label";
import { getAllScientists } from "@/subjects/life-science/lib/scientists";

// Person routes. A life-science scientist page can exist with no article file;
// its title is the catalog name. Two pages that disagree on one slug are not
// a name — leave that id unresolved instead of picking a person.
const PERSON_SECTIONS: ReadonlyArray<readonly [string, string]> = [
  ["philosophy", "thinkers"],
  ["mathematics", "mathematicians"],
  ["economics", "economists"],
  ["psychology", "theorists"],
  ["life-science", "scientists"],
  ["computer-science", "pioneers"],
  ["chemistry", "figures"],
  ["medicine", "figures"],
  ["earth-science", "pioneers"],
  ["political-science", "thinkers"],
  ["sociology", "thinkers"],
];

const CJK = /[一-鿿]/;

let cachedTitles: Map<string, string | null> | null = null;

function addTitle(found: Map<string, Set<string>>, slug: string, title: string): void {
  const trimmed = title.trim();
  if (!trimmed) return;
  const bucket = found.get(slug) ?? new Set<string>();
  bucket.add(trimmed);
  found.set(slug, bucket);
}

function loadPageTitles(): Map<string, string | null> {
  const found = new Map<string, Set<string>>();
  for (const [domain, section] of PERSON_SECTIONS) {
    const root = path.join(getDomainContentDir(domain), section);
    for (const entry of readContentEntries(root, [".mdx", ".md"], "safe")) {
      const title = entry.frontmatter.title;
      if (typeof title === "string") addTitle(found, entry.slug, title);
    }
  }
  for (const scientist of getAllScientists()) addTitle(found, scientist.id, scientist.name);

  const resolved = new Map<string, string | null>();
  for (const [slug, titles] of found) {
    resolved.set(slug, titles.size === 1 ? ([...titles][0] ?? null) : null);
  }
  return resolved;
}

function pageTitles(): Map<string, string | null> {
  if (!cachedTitles) cachedTitles = loadPageTitles();
  return cachedTitles;
}

/** Title of the person page for this id, or null when there is none or they disagree. */
export function personPageTitle(slug: string): string | null {
  return pageTitles().get(slug) ?? null;
}

/** Reader-facing name. Page title, then a name already written beside the Latin form. */
export function personDisplayName(id: string, articleText: string): string {
  if (CJK.test(id)) return id;
  return personPageTitle(id) ?? chineseNameBesideLatin(articleText, id) ?? id;
}

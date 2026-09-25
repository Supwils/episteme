import type { Section } from "./types";

// Search sections predate the site's domain ids for the two oldest subjects.
const LEGACY: Partial<Record<Section, string>> = {
  physics: "universe-physics",
  history: "human-history",
};

/** The DOMAINS id behind a search section (seal, pigment, routes). */
export function sectionDomain(section: string): string {
  return LEGACY[section as Section] ?? section;
}

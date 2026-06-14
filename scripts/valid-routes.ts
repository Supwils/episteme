/**
 * Builds the authoritative set of valid app routes from the filesystem +
 * content data — the source of truth for route-integrity checks (cross-domain
 * refs and search-index URLs). Pure node:fs, reads from process.cwd(); safe to
 * import from both tsx scripts and vitest (never from client code).
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
// Life-science detail routes are registry-driven (generateStaticParams maps the
// registry), not one-file-per-article — so mirror the registry, not the mdx dir.
import { getAllSpecies } from "@/subjects/life-science/lib/species";
import { getAllScientists } from "@/subjects/life-science/lib/scientists";
import { getAllExtinctions } from "@/subjects/life-science/lib/extinctions";
import { getAllTimelineEvents } from "@/subjects/life-science/lib/timeline-events";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "content");
const APP = join(ROOT, "app");

const DOMAINS = [
  "universe-physics",
  "human-history",
  "philosophy",
  "life-science",
  "cosmology",
  "mathematics",
  "economics",
  "psychology",
  "computer-science",
  "political-science",
];

function dirSlugs(rel: string): string[] {
  const dir = join(CONTENT, rel);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function walkRel(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  const walk = (d: string) => {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry)) out.push(relative(dir, full).replace(/\.mdx?$/, ""));
    }
  };
  walk(dir);
  return out;
}

function dataSlugs(relFile: string): string[] {
  const file = join(CONTENT, relFile);
  if (!existsSync(file)) return [];
  const text = readFileSync(file, "utf8");
  return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]!);
}

/** Every static (non-dynamic, non-api) page route, discovered from app/. */
function staticRoutes(): string[] {
  const out: string[] = [];
  const walk = (dir: string, segs: string[]) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const name = entry.name;
        if (name === "api" || name.startsWith("_")) continue;
        // Route groups `(group)` don't contribute a URL segment.
        const next = name.startsWith("(") && name.endsWith(")") ? segs : [...segs, name];
        walk(join(dir, name), next);
      } else if (entry.name === "page.tsx" && !segs.some((s) => s.includes("["))) {
        out.push(segs.length === 0 ? "/" : "/" + segs.join("/"));
      }
    }
  };
  if (existsSync(APP)) walk(APP, []);
  return out;
}

export function buildValidRoutes(): Set<string> {
  const valid = new Set<string>(staticRoutes());
  const add = (prefix: string, slugs: string[]) =>
    slugs.forEach((s) => valid.add(`${prefix}/${s}`));

  // Philosophy
  add("/philosophy/thinkers", dirSlugs("philosophy/thinkers"));
  add("/philosophy/schools", dataSlugs("philosophy/schools-data.ts"));
  add("/philosophy/concepts", dataSlugs("philosophy/concepts-data.ts"));
  add("/philosophy/isms", dataSlugs("philosophy/isms-data.ts"));
  add("/philosophy/questions", dataSlugs("philosophy/questions-data.ts"));
  add("/philosophy/dialogues", dataSlugs("philosophy/dialogues/index.ts"));
  add("/philosophy/experiments", dirSlugs("philosophy/experiments"));

  // Mathematics
  add("/mathematics/mathematicians", dirSlugs("mathematics/mathematicians"));
  add("/mathematics/concepts", dirSlugs("mathematics/concepts"));
  add("/mathematics/theorems", dirSlugs("mathematics/theorems"));
  add("/mathematics/paradoxes", dirSlugs("mathematics/paradoxes"));
  add("/mathematics/dialogues", dirSlugs("mathematics/dialogues"));

  // Life science: species/scientists/extinctions/timeline are registry-driven.
  add(
    "/life-science/species",
    getAllSpecies().map((s) => s.id)
  );
  add(
    "/life-science/scientists",
    getAllScientists().map((s) => s.id)
  );
  add(
    "/life-science/extinctions",
    getAllExtinctions().map((e) => e.id)
  );
  add(
    "/life-science/timeline",
    getAllTimelineEvents().map((e) => e.id)
  );
  add("/life-science/dialogues", dirSlugs("life-science/dialogues"));

  // Economics (routes serve both .md and .mdx)
  add("/economics/economists", dirSlugs("economics/economists"));
  add("/economics/concepts", dirSlugs("economics/concepts"));
  add("/economics/case-studies", dirSlugs("economics/case-studies"));
  add("/economics/theories", dirSlugs("economics/theories"));
  add("/economics/schools", dirSlugs("economics/schools"));
  add("/economics/debates", dirSlugs("economics/debates"));
  add("/economics/dialogues", dirSlugs("economics/dialogues"));

  // Psychology
  add("/psychology/theorists", dirSlugs("psychology/theorists"));
  add("/psychology/experiments", dirSlugs("psychology/experiments"));
  add("/psychology/phenomena", dirSlugs("psychology/phenomena"));
  add("/psychology/schools", dirSlugs("psychology/schools"));
  add("/psychology/disorders", dirSlugs("psychology/disorders"));
  add("/psychology/debates", dirSlugs("psychology/debates"));
  add("/psychology/dialogues", dirSlugs("psychology/dialogues"));
  add("/psychology/knowledge-base", dirSlugs("psychology/knowledge-base"));

  // Cosmology KB
  add("/cosmology/knowledge-base", dataSlugs("cosmology/knowledge-base-data.ts"));

  // Universe-physics + cosmology dialogues (fs-backed, .mdx).
  add("/universe-physics/dialogues", dirSlugs("universe-physics/dialogues"));
  add("/cosmology/dialogues", dirSlugs("cosmology/dialogues"));

  // Generic-domain sections (computer-science, political-science)
  for (const domain of ["computer-science", "political-science"]) {
    const root = join(CONTENT, domain);
    if (!existsSync(root)) continue;
    for (const section of readdirSync(root)) {
      if (!statSync(join(root, section)).isDirectory()) continue;
      if (section === "knowledge-base" || section === "frontier") continue;
      add(`/${domain}/${section}`, walkRel(join(root, section)));
    }
  }

  // Frontier + KB for every domain (KB slug = relative path with "/" → "--").
  for (const domain of DOMAINS) {
    for (const slug of walkRel(join(CONTENT, domain, "frontier"))) {
      valid.add(`/${domain}/frontier/${slug.replace(/\//g, "--")}`);
    }
    for (const slug of walkRel(join(CONTENT, domain, "knowledge-base"))) {
      valid.add(`/${domain}/knowledge-base/${slug.replace(/\//g, "--")}`);
    }
  }

  // Tier walkers (both media) + human-history knowledge articles + per-domain homes.
  const tiers = [
    "observable",
    "cosmic-web",
    "laniakea",
    "local-group",
    "milky-way",
    "stellar-neighborhood",
    "solar-system",
    "earth",
  ];
  for (const t of tiers) {
    valid.add(`/universe-physics/universe/${t}`);
    valid.add(`/cosmology/universe/${t}`);
  }
  for (const t of [
    "classical-mechanics",
    "quantum-mechanics",
    "relativity",
    "thermodynamics",
    "electromagnetism",
    "particle-physics",
    "frontier",
  ]) {
    valid.add(`/universe-physics/physics/${t}`);
  }
  // human-history knowledge-base articles render under /human-history/knowledge/<slug>.
  for (const slug of walkRel(join(CONTENT, "human-history", "knowledge-base"))) {
    valid.add(`/human-history/knowledge/${slug.replace(/\//g, "--")}`);
  }
  for (const d of DOMAINS) valid.add(`/${d}`);

  return valid;
}

/** Normalize a URL for membership testing: strip origin, query, hash, trailing slash. */
export function normalizeRoute(url: string): string {
  let u = url
    .replace(/^https?:\/\/[^/]+/, "")
    .split("#")[0]!
    .split("?")[0]!;
  if (u.length > 1 && u.endsWith("/")) u = u.slice(0, -1);
  return u;
}

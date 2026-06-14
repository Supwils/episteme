/**
 * Validates that every cross-domain reference resolves to a real route.
 *
 * The cross-domain-refs dataset historically pointed at aspirational content
 * (ids that were never built into pages). This script builds the authoritative
 * set of valid routes from the filesystem + content data modules, then checks
 * the route each ref resolves to (via the same logic as resolveReference).
 *
 * Run: pnpm tsx scripts/check-cross-refs.ts
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { CROSS_REFERENCES, DOMAIN_ROUTES, type Domain } from "../lib/cross-domain-refs";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "content");

function dirSlugs(rel: string): string[] {
  const dir = join(CONTENT, rel);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** Recursively collect mdx/md files under a dir, returning relative paths sans extension. */
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

const ALL_DOMAINS: Domain[] = [
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

function dataSlugs(relFile: string): string[] {
  const file = join(CONTENT, relFile);
  if (!existsSync(file)) return [];
  const text = readFileSync(file, "utf8");
  return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]!);
}

// Build the authoritative valid-route set.
const valid = new Set<string>();
const add = (prefix: string, slugs: string[]) => slugs.forEach((s) => valid.add(`${prefix}/${s}`));

// Philosophy
add("/philosophy/thinkers", dirSlugs("philosophy/thinkers"));
add("/philosophy/schools", dataSlugs("philosophy/schools-data.ts"));
add("/philosophy/concepts", dataSlugs("philosophy/concepts-data.ts"));
add("/philosophy/isms", dataSlugs("philosophy/isms-data.ts"));
add("/philosophy/questions", dataSlugs("philosophy/questions-data.ts"));

// Mathematics
add("/mathematics/mathematicians", dirSlugs("mathematics/mathematicians"));
add("/mathematics/concepts", dirSlugs("mathematics/concepts"));
add("/mathematics/theorems", dirSlugs("mathematics/theorems"));
add("/mathematics/paradoxes", dirSlugs("mathematics/paradoxes"));

// Life science
add("/life-science/scientists", dirSlugs("life-science/scientists"));
add("/life-science/species", dirSlugs("life-science/species"));
add("/life-science/extinctions", dirSlugs("life-science/extinctions"));

// Economics
add("/economics/economists", dirSlugs("economics/economists"));
add("/economics/concepts", dirSlugs("economics/concepts"));
add("/economics/case-studies", dirSlugs("economics/case-studies"));

// Psychology
add("/psychology/theorists", dataSlugs("psychology/theorists-data.ts"));
add("/psychology/experiments", dataSlugs("psychology/experiments-data.ts"));
add("/psychology/phenomena", dataSlugs("psychology/phenomena-data.ts"));
add("/psychology/schools", dataSlugs("psychology/schools-data.ts"));
add("/psychology/disorders", dataSlugs("psychology/disorders-data.ts"));

// Cosmology knowledge base
add("/cosmology/knowledge-base", dataSlugs("cosmology/knowledge-base-data.ts"));

// Generic-domain sections (computer-science, political-science) — dir-based.
for (const domain of ["computer-science", "political-science"]) {
  const root = join(CONTENT, domain);
  if (!existsSync(root)) continue;
  for (const section of readdirSync(root)) {
    if (!statSync(join(root, section)).isDirectory()) continue;
    if (section === "knowledge-base" || section === "frontier") continue;
    add(`/${domain}/${section}`, walkRel(join(root, section)));
  }
}

// Frontier + knowledge-base routes for every domain.
// KB slug = relative path with "/" → "--" (see lib/generic-kb.ts).
for (const domain of ALL_DOMAINS) {
  for (const slug of walkRel(join(CONTENT, domain, "frontier"))) {
    valid.add(`/${domain}/frontier/${slug.replace(/\//g, "--")}`);
  }
  for (const slug of walkRel(join(CONTENT, domain, "knowledge-base"))) {
    valid.add(`/${domain}/knowledge-base/${slug.replace(/\//g, "--")}`);
  }
}

// Cross-cutting / dialogue routes referenced by some refs.
add("/philosophy/dialogues", dataSlugs("philosophy/dialogues-data.ts"));
add("/mathematics/dialogues", dataSlugs("mathematics/dialogues-data.ts"));

// Static route sets (non-slug or tier-based).
const STATIC: string[] = [
  // universe-physics physics laws
  ...[
    "classical-mechanics",
    "quantum-mechanics",
    "relativity",
    "thermodynamics",
    "electromagnetism",
    "particle-physics",
    "frontier",
  ].map((s) => `/universe-physics/physics/${s}`),
  // tier walkers (both media)
  ...[
    "observable",
    "cosmic-web",
    "laniakea",
    "local-group",
    "milky-way",
    "stellar-neighborhood",
    "solar-system",
    "earth",
  ].flatMap((s) => [`/universe-physics/universe/${s}`, `/cosmology/universe/${s}`]),
  // human-history has no per-era article pages; only these section pages exist
  ...[
    "timeline",
    "atlas",
    "graph",
    "civilizations",
    "map",
    "figures",
    "lessons",
    "scholarly",
    "knowledge",
    "frontier",
  ].map((s) => `/human-history/${s}`),
  // domain homes (acceptable graceful target)
  "/human-history",
];
STATIC.forEach((r) => valid.add(r));

// Resolve each ref both directions and check.
let broken = 0;
for (const ref of CROSS_REFERENCES) {
  const checks: Array<["from" | "to", Domain, string, string | undefined]> = [
    ["from", ref.fromDomain, ref.fromId, ref.fromPath],
    ["to", ref.toDomain, ref.toId, ref.toPath],
  ];
  for (const [side, domain, id, explicit] of checks) {
    const route = explicit ?? `${DOMAIN_ROUTES[domain]}/${id}`;
    if (!valid.has(route)) {
      broken++;
      console.error(`✗ [${ref.fromId}→${ref.toId}] ${side} route 404: ${route}`);
    }
  }
}

console.log(
  `\n${broken === 0 ? "✅" : "❌"} ${CROSS_REFERENCES.length} refs checked, ${broken} broken route(s).`
);
process.exit(broken === 0 ? 0 : 1);

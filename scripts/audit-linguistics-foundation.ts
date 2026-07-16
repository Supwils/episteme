import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDomainConfig } from "../lib/new-domains.ts";
import { RELEASED_LINGUISTICS_ARTICLES } from "../lib/linguistics-subject-plan.ts";
import { LinguisticsArticleSchema } from "../subjects/linguistics/lib/schema.ts";
import { ALL_EDGES, ALL_NODES } from "../subjects/knowledge-graph/data/graph-data.ts";
import { CURATED_LEARNING_PATHS } from "../subjects/knowledge-graph/data/curated-learning-paths.ts";
import { COVERAGE_DOMAIN_META } from "../lib/knowledge-continuum-coverage-meta.ts";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "linguistics");
const APP_ROOT = path.join(ROOT, "app", "linguistics");
const expected = RELEASED_LINGUISTICS_ARTICLES;
const expectedBySlug = new Map(expected.map((article) => [article.slug, article]));
const domainConfig = getDomainConfig("linguistics");
const activeSections = new Set(domainConfig?.sections.map((section) => section.key) ?? []);
const issues: string[] = [];
const found: { section: string; slug: string; cjkChars: number }[] = [];
const expectedInteractives = new Map([
  ["phonetics-and-ipa", "ipa-explorer"],
  ["syntax", "syntax-tree-builder"],
  ["linguistic-typology", "language-map"],
  ["unicode-and-digital-writing", "writing-timeline"],
  ["languages-change", "sound-change-lab"],
]);
const foundInteractives = new Set<string>();

for (const section of activeSections) {
  const contentDir = path.join(CONTENT_ROOT, section);
  const listRoute = path.join(APP_ROOT, section, "page.tsx");
  const detailRoute = path.join(APP_ROOT, section, "[slug]", "page.tsx");
  if (!fs.existsSync(listRoute)) issues.push(`Missing list route: ${section}`);
  if (!fs.existsSync(detailRoute)) issues.push(`Missing detail route: ${section}`);
  if (!fs.existsSync(contentDir)) continue;

  for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith(".mdx"))) {
    const slug = file.replace(/\.mdx$/, "");
    const source = fs.readFileSync(path.join(contentDir, file), "utf8");
    const parsed = matter(source);
    const schemaResult = LinguisticsArticleSchema.safeParse(parsed.data);
    if (!schemaResult.success) issues.push(`${section}/${slug}: invalid frontmatter`);
    const cjkChars = (parsed.content.match(/[\u3400-\u9fff]/g) ?? []).length;
    if (cjkChars < 2200) issues.push(`${section}/${slug}: ${cjkChars} CJK chars, expected >= 2200`);
    const planned = expectedBySlug.get(slug);
    if (!planned) issues.push(`${section}/${slug}: not in the current release plan`);
    if (planned && planned.level !== parsed.data.knowledge_level) {
      issues.push(
        `${section}/${slug}: planned L${planned.level}, frontmatter L${parsed.data.knowledge_level}`
      );
    }
    const expectedInteractive = expectedInteractives.get(slug);
    if (expectedInteractive && parsed.data.interactive !== expectedInteractive) {
      issues.push(`${section}/${slug}: expected interactive ${expectedInteractive}`);
    }
    if (typeof parsed.data.interactive === "string") foundInteractives.add(parsed.data.interactive);
    found.push({ section, slug, cjkChars });
  }
}

const foundSlugs = new Set(found.map((article) => article.slug));
for (const article of expected) {
  if (!foundSlugs.has(article.slug))
    issues.push(`Missing planned release article: ${article.slug}`);
}

const graphNodes = ALL_NODES.filter((node) => node.domain === "linguistics");
const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
const bridgeDomains = new Set<string>();
for (const edge of ALL_EDGES) {
  const source = nodeMap.get(edge.source);
  const target = nodeMap.get(edge.target);
  if (source?.domain === "linguistics" && target && target.domain !== "linguistics") {
    bridgeDomains.add(target.domain);
  }
  if (target?.domain === "linguistics" && source && source.domain !== "linguistics") {
    bridgeDomains.add(source.domain);
  }
}
if (graphNodes.length !== expected.length)
  issues.push(`Graph has ${graphNodes.length}/${expected.length} foundation nodes`);
if (bridgeDomains.size < 8)
  issues.push(`Graph has ${bridgeDomains.size}/8 external bridge domains`);
const graphLevels = new Set(graphNodes.map((node) => node.knowledgeLevel));
if ([1, 2, 3, 4, 5].some((level) => !graphLevels.has(level))) {
  issues.push(`Graph does not cover all L1-L5 levels: ${[...graphLevels].sort().join(", ")}`);
}

const languageSpine = CURATED_LEARNING_PATHS.find(
  (learningPath) => learningPath.id === "linguistics-multilingual-ai-spine"
);
if (
  !languageSpine ||
  languageSpine.scope !== "domain-spine" ||
  languageSpine.steps.map((step) => step.level).join(",") !== "1,2,3,4,5" ||
  languageSpine.steps.some((step) => !step.nodeId.startsWith("linguistics:"))
) {
  issues.push("Missing complete linguistics L1-L5 domain spine");
}
if (COVERAGE_DOMAIN_META.linguistics.status !== "established") {
  issues.push("Linguistics coverage status is not established");
}

const interactiveRegistry = fs.readFileSync(
  path.join(ROOT, "components", "domain", "DomainArticleExtras.tsx"),
  "utf8"
);
for (const interactive of expectedInteractives.values()) {
  if (!interactiveRegistry.includes(`"${interactive}"`)) {
    issues.push(`Interactive is not registered: ${interactive}`);
  }
}
if (foundInteractives.size !== expectedInteractives.size) {
  issues.push(
    `Found ${foundInteractives.size}/${expectedInteractives.size} interactive visualizations`
  );
}

console.log("Linguistics Foundation Audit\n");
console.log(`Active sections: ${activeSections.size}`);
console.log(`Released articles: ${found.length}/${expected.length}`);
console.log(`Knowledge graph nodes: ${graphNodes.length}/${expected.length}`);
console.log(`External bridge domains: ${bridgeDomains.size}/8`);
console.log(`Interactive visualizations: ${foundInteractives.size}/5`);
console.log(`Curated L1-L5 spine: ${languageSpine ? "present" : "missing"}`);
console.log(
  `Depth range: ${Math.min(...found.map((article) => article.cjkChars))}-${Math.max(...found.map((article) => article.cjkChars))} CJK chars`
);
console.log("\nArticles by section:");
for (const section of activeSections) {
  console.log(`  ${section}: ${found.filter((article) => article.section === section).length}`);
}

if (issues.length > 0) {
  console.error(`\nAudit failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exitCode = 1;
} else {
  console.log(
    "\nAudit passed: all released linguistics articles, schemas, depth gates and routes are present."
  );
}

/**
 * Answers the two questions you have while writing a `## 跨域连接` section:
 * "does this `[[slug]]` resolve?" and "what slugs exist about X?"
 *
 * This matters because an unresolved target does not fail loudly — the renderer
 * degrades it to plain emphasised text by design, so a dead `[[link]]` looks
 * almost right on the page and silently costs a graph edge. Check before you
 * write, not after.
 *
 *   pnpm wiki-slug morphology semantics      # exact keys → URL, or ❌
 *   pnpm wiki-slug 'evolut|phylogen'         # no exact match → treated as regex
 *
 * `check-content` catches dead links across every publicly routable article;
 * this is the authoring-time counterpart. A small reviewed alias map lives in
 * gen-wiki-links-index.ts; arbitrary typos are never guessed.
 */
import { WIKI_LINK_INDEX } from "../lib/wiki-link-index.ts";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: pnpm wiki-slug <slug|regex> [...]");
  process.exit(2);
}

const keys = Object.keys(WIKI_LINK_INDEX);
const plainKeys = keys.filter((key) => /^[a-z][a-z0-9-]*$/.test(key));
let missing = 0;

for (const arg of args) {
  const entry = WIKI_LINK_INDEX[arg];
  if (entry) {
    const url = typeof entry === "string" ? entry : JSON.stringify(entry);
    console.log(`✅ ${arg.padEnd(38)} ${url}`);
    continue;
  }
  // Not an exact key: treat it as a search so a failed guess still helps.
  let matches = [];
  try {
    const re = new RegExp(arg);
    matches = plainKeys.filter((key) => re.test(key)).slice(0, 12);
  } catch {
    matches = [];
  }
  if (matches.length > 0) {
    console.log(`❌ ${arg.padEnd(38)} 不存在；相近的：${matches.join(", ")}`);
  } else {
    console.log(`❌ ${arg.padEnd(38)} 不存在，也没有相近的 slug`);
  }
  missing += 1;
}

if (missing > 0) process.exitCode = 1;

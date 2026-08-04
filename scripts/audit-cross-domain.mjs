/**
 * Measures the real state of `## 跨域连接` sections per domain.
 *
 * Existence is not the same as quality, and confusing the two has produced the
 * same planning error four times: a domain whose files all carry the heading was
 * recorded as "done" while every section was still a list of empty clauses like
 * `- **经济学**：分工带来效率`. This script reports both numbers side by side so
 * the backlog can never again be read off the heading alone.
 *
 * The bar mirrors what the finished domains (philosophy, psychology, sociology,
 * linguistics) actually converged on: five bullets, each led by a bold
 * `[[slug|中文标签]]`, and enough prose to state a mechanism rather than name a
 * discipline.
 *
 *   pnpm audit-cross-domain              # per-domain table
 *   pnpm audit-cross-domain psychology   # plus every failing file in that domain
 *
 * Counting note: CJK characters are matched with a Unicode range in JS on
 * purpose — BSD `grep -o` miscounts multibyte text, which is how two earlier
 * measurements came out wrong.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT = join(process.cwd(), "content");
// `叙事与引用规范.md` asks for 4–5 bullets, so 4 is the floor, not 5; an earlier
// draft of this script used 5 and reported 168 sound philosophy sections as
// failures.
const MIN_CHARS = 400;
const BULLETS = 4;
// The same spec allows a discipline with no article of its own to appear in bold
// without a link, so the bar is "most bullets carry a link", not "all of them".
const MIN_LINKED = 3;
// `\Z` is not a JS escape (it matches a literal Z), so end-of-input is spelled
// as a `$` that has nothing after it — the first draft of this file got that
// wrong and silently reported every section as empty.
const HEADING = /^## (跨域连接|跨领域连接|跨学科连接|跨领域关联)[ \t]*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m;
const CJK = /[一-鿿]/g;
const BULLET = /^[-*] /gm;
const WIKI = /\[\[([^\]|]+)/g;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else if (/\.mdx?$/.test(name) && !name.endsWith(".narration.md") && name !== "CREDITS.md")
      out.push(path);
  }
  return out;
}

/** A section passes only if a reader would get five linked mechanisms, not five labels. */
function inspect(path) {
  const text = readFileSync(path, "utf8");
  const match = HEADING.exec(text);
  if (!match) return { path, missing: true };
  const body = match[2];
  const chars = (body.match(CJK) ?? []).length;
  const bullets = (body.match(BULLET) ?? []).length;
  const slugs = [...body.matchAll(WIKI)].map((m) => m[1].trim());
  const linkLed = body
    .split("\n")
    .filter((line) => /^[-*] /.test(line) && line.split("：")[0].includes("[[")).length;
  const own = path.split("/").pop().replace(/\.mdx?$/, "");
  return {
    path,
    variant: match[1],
    chars,
    bullets,
    slugCount: slugs.length,
    linkLed,
    selfLink: slugs.includes(own),
    ok: chars >= MIN_CHARS && bullets >= BULLETS && linkLed >= MIN_LINKED && !slugs.includes(own),
  };
}

const only = process.argv[2];
const rows = [];
for (const domain of readdirSync(CONTENT).sort()) {
  const dir = join(CONTENT, domain);
  if (!statSync(dir).isDirectory()) continue;
  const files = walk(dir).map(inspect);
  const withSection = files.filter((f) => !f.missing);
  const passing = withSection.filter((f) => f.ok);
  const lens = withSection.map((f) => f.chars).sort((a, b) => a - b);
  rows.push({
    domain,
    total: files.length,
    withSection: withSection.length,
    passing: passing.length,
    median: lens.length ? lens[Math.floor(lens.length / 2)] : 0,
    variants: new Set(withSection.map((f) => f.variant)).size,
    defects: withSection.filter((f) => !f.ok),
    missing: files.filter((f) => f.missing),
  });
}

rows.sort((a, b) => b.passing - a.passing);
const pad = (value, width) => String(value).padStart(width);
console.log("域                    总篇  有节  达标  节字中位  标题变体数");
for (const row of rows) {
  console.log(
    `${row.domain.padEnd(20)}${pad(row.total, 5)}${pad(row.withSection, 6)}${pad(row.passing, 6)}${pad(row.median, 10)}${pad(row.variants, 12)}`
  );
}
const sum = (key) => rows.reduce((acc, row) => acc + row[key], 0);
console.log(
  `${"合计".padEnd(19)}${pad(sum("total"), 5)}${pad(sum("withSection"), 6)}${pad(sum("passing"), 6)}`
);

if (only) {
  const row = rows.find((r) => r.domain === only);
  if (!row) {
    console.error(`\n未知的域：${only}`);
    process.exit(2);
  }
  console.log(`\n${only} 无节 ${row.missing.length} 篇：`);
  for (const file of row.missing) console.log(`  ${file.path}`);
  console.log(`\n${only} 有节但未达标 ${row.defects.length} 篇：`);
  for (const file of row.defects) {
    const why = [
      file.chars < MIN_CHARS ? `字${file.chars}` : null,
      file.bullets < BULLETS ? `条${file.bullets}` : null,
      file.linkLed < MIN_LINKED ? `带链条目${file.linkLed}` : null,
      file.selfLink ? "自链" : null,
    ]
      .filter(Boolean)
      .join(" ");
    console.log(`  ${file.path}  [${file.variant}] ${why}`);
  }
}

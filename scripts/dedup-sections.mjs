#!/usr/bin/env node
// One-off cleanup: collapse duplicate level-2 sections that share the same
// heading (accidental template duplicates, e.g. two `## 延伸阅读` or two
// `## 为什么今天仍然重要`). Keeps the section with the longest body and drops the
// others — but ONLY when every non-trivial line of a dropped section also
// appears in the kept one (i.e. the kept section is a content superset), so no
// unique prose/citation is lost. Files with a "risky" duplicate (the shorter
// section has unique lines) are reported and left untouched for manual review.
//
// Usage: node scripts/dedup-sections.mjs [--apply]

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const APPLY = process.argv.includes("--apply");

function splitFrontmatter(text) {
  if (text.startsWith("---\n")) {
    const end = text.indexOf("\n---\n", 4);
    if (end !== -1) return [text.slice(0, end + 5), text.slice(end + 5)];
  }
  return ["", text];
}

function headingKey(line) {
  return line
    .replace(/^##\s+/, "")
    .replace(/\s*\{#[^}]*\}\s*$/, "")
    .trim();
}

function sectionize(body) {
  const lines = body.split("\n");
  const intro = [];
  const sections = [];
  let cur = null;
  for (const line of lines) {
    if (/^##\s+/.test(line) && !/^###/.test(line)) {
      if (cur) sections.push(cur);
      cur = { key: headingKey(line), lines: [line] };
    } else if (cur) cur.lines.push(line);
    else intro.push(line);
  }
  if (cur) sections.push(cur);
  return { intro: intro.join("\n"), sections };
}

const meaningful = (s) =>
  s.lines
    .slice(1)
    .map((l) => l.trim())
    .filter((l) => l !== "" && l !== "---");

let changed = 0;
const risky = [];
const files = execSync("find content -name '*.md' -o -name '*.mdx'", {
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter(Boolean);

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const [fm, body] = splitFrontmatter(text);
  const { intro, sections } = sectionize(body);

  const groups = new Map();
  sections.forEach((s, i) => {
    if (!groups.has(s.key)) groups.set(s.key, []);
    groups.get(s.key).push(i);
  });

  const drop = new Set();
  let fileRisky = false;
  for (const [key, idxs] of groups) {
    if (idxs.length < 2) continue;
    // Keep the section with the most meaningful lines.
    const keepIdx = idxs.reduce((a, b) =>
      meaningful(sections[b]).length > meaningful(sections[a]).length ? b : a
    );
    const keptLines = new Set(meaningful(sections[keepIdx]));
    for (const i of idxs) {
      if (i === keepIdx) continue;
      const unique = meaningful(sections[i]).filter((l) => !keptLines.has(l));
      if (unique.length === 0) drop.add(i);
      else {
        fileRisky = true;
        risky.push(`${file.replace("content/", "")} :: ${key} (${unique.length} unique lines)`);
      }
    }
  }

  if (drop.size === 0) continue;
  const kept = sections.filter((_, i) => !drop.has(i));
  const introTrim = intro.replace(/\n+$/, "");
  const parts = [];
  if (introTrim.trim() !== "") parts.push(introTrim);
  for (const s of kept) parts.push(s.lines.join("\n").replace(/\n+$/, ""));
  const out = fm + (fm ? "\n" : "") + parts.join("\n\n") + "\n";
  if (out !== text) {
    changed++;
    if (APPLY) writeFileSync(file, out);
    else console.log(`${file.replace("content/", "")}  (−${drop.size} dup section)`);
  }
}

console.log(`\n${APPLY ? "APPLIED" : "DRY-RUN"}: ${changed} files de-duplicated.`);
if (risky.length) {
  console.log(`\n⚠️  ${risky.length} risky duplicates left untouched (shorter copy has unique lines):`);
  risky.forEach((r) => console.log("   " + r));
}

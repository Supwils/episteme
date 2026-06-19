#!/usr/bin/env node
// One-off structural fix: move bibliography sections (参考文献 / 延伸阅读 / …) to
// the END of each article. Earlier "deepening" rounds appended prose sections
// AFTER the bibliography, so articles appear to end at 参考文献 then resume — and
// JSON-LD bibliography extraction reads a mid-article block. This reorders body
// sections to: intro + all CONTENT sections (original order) + 参考文献-class +
// 延伸阅读-class. Byte-identical duplicate sections are dropped. Frontmatter and
// section bodies are preserved verbatim; only section ORDER changes.
//
// Usage:
//   node scripts/reorder-citations.mjs <dir|glob-root>            # dry-run
//   node scripts/reorder-citations.mjs <dir> --apply              # write
// Example: node scripts/reorder-citations.mjs content/economics --apply

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const root = args.find((a) => !a.startsWith("--")) || "content";

const REFERENCES = /^(参考文献|引用|学术文献|参考书目|参考资料|参考来源|references?)$/i;
const FURTHER = /^(延伸阅读|进一步阅读|推荐阅读|推荐阅读书目|further\s+reading)$/i;
const isBib = (h) => REFERENCES.test(h) || FURTHER.test(h);

function splitFrontmatter(text) {
  if (text.startsWith("---\n")) {
    const end = text.indexOf("\n---\n", 4);
    if (end !== -1) {
      return [text.slice(0, end + 5), text.slice(end + 5)];
    }
  }
  return ["", text];
}

// Split body into intro + level-2 (`## `) sections. ### stay inside their parent.
function sectionize(body) {
  const lines = body.split("\n");
  const intro = [];
  const sections = [];
  let cur = null;
  for (const line of lines) {
    if (/^##\s+/.test(line) && !/^###/.test(line)) {
      if (cur) sections.push(cur);
      // Strip a trailing `{#anchor}` so headings like `## 学术文献 {#refs}`
      // classify the same as plain `## 学术文献`.
      const heading = line
        .replace(/^##\s+/, "")
        .replace(/\s*\{#[^}]*\}\s*$/, "")
        .trim();
      cur = { heading, lines: [line] };
    } else if (cur) {
      cur.lines.push(line);
    } else {
      intro.push(line);
    }
  }
  if (cur) sections.push(cur);
  return { intro: intro.join("\n"), sections };
}

function reorder(text) {
  const [fm, body] = splitFrontmatter(text);
  const { intro, sections } = sectionize(body);
  if (sections.length === 0) return text;

  const content = [];
  const refs = [];
  const further = [];
  for (const s of sections) {
    if (REFERENCES.test(s.heading)) refs.push(s);
    else if (FURTHER.test(s.heading)) further.push(s);
    else content.push(s);
  }

  // If no bibliography section is followed by a content section, nothing to fix.
  const firstBibIdx = sections.findIndex((s) => isBib(s.heading));
  const lastContentIdx = sections.map((s) => isBib(s.heading)).lastIndexOf(false);
  if (firstBibIdx === -1 || firstBibIdx > lastContentIdx) return text;

  const ordered = [...content, ...refs, ...further];

  // Drop byte-identical duplicate sections (keep first).
  const seen = new Set();
  const deduped = [];
  for (const s of ordered) {
    const key = s.lines.join("\n").trim();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(s);
  }

  const introTrim = intro.replace(/\n+$/, "");
  const parts = [];
  if (introTrim.trim() !== "") parts.push(introTrim);
  for (const s of deduped) parts.push(s.lines.join("\n").replace(/\n+$/, ""));
  const newBody = parts.join("\n\n") + "\n";
  return fm + (fm ? "\n" : "") + newBody;
}

const files = execSync(`find ${root} -name '*.md' -o -name '*.mdx'`, {
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter(Boolean);

let changed = 0;
for (const file of files) {
  const before = readFileSync(file, "utf8");
  const after = reorder(before);
  if (after !== before) {
    changed++;
    if (APPLY) writeFileSync(file, after);
    else console.log(file);
  }
}
console.log(`\n${APPLY ? "APPLIED" : "DRY-RUN"}: ${changed} files reordered.`);

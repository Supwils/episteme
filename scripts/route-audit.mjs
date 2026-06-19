#!/usr/bin/env node
// Ad-hoc production route audit: samples REAL slugs from content + every route
// type and reports non-200s. Run: node scripts/route-audit.mjs [baseUrl]
import { readdirSync, readFileSync, existsSync } from "node:fs";

const BASE = process.argv[2] || "https://episteme-self.vercel.app";
const enc = encodeURIComponent;

function mdxSlugs(dir, n = 2) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .slice(0, n)
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}
// nested KB slug: dir--file
function kbSlugs(root, n = 2) {
  const out = [];
  const walk = (d, prefix) => {
    if (out.length >= n || !existsSync(d)) return;
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (out.length >= n) break;
      if (e.isDirectory()) walk(`${d}/${e.name}`, prefix ? `${prefix}--${e.name}` : e.name);
      else if (e.name.endsWith(".md") && !e.name.endsWith(".narration.md")) {
        const base = e.name.replace(/\.md$/, "");
        out.push(prefix ? `${prefix}--${base}` : base);
      }
    }
  };
  walk(root, "");
  return out;
}

const urls = [];
const add = (p) => urls.push(p);

// MDX concept domains
for (const [dom, subs] of Object.entries({
  mathematics: ["concepts", "mathematicians", "theorems", "paradoxes", "dialogues", "frontier"],
  philosophy: ["concepts", "thinkers", "schools", "isms", "questions", "experiments", "dialogues", "frontier"],
  economics: ["concepts", "economists", "theories", "schools", "case-studies", "debates", "dialogues", "frontier"],
  psychology: ["theorists", "experiments", "phenomena", "disorders", "schools", "debates", "dialogues", "frontier"],
  "computer-science": ["concepts", "pioneers", "algorithms", "theory", "frontier"],
  "political-science": ["thinkers", "concepts", "isms", "institutions", "international-relations", "frontier"],
})) {
  for (const sub of subs) for (const s of mdxSlugs(`content/${dom}/${sub}`)) add(`/${dom}/${sub}/${enc(s)}`);
}
// KB (.md nested) domains
for (const dom of ["universe-physics", "cosmology", "life-science", "psychology", "economics"]) {
  for (const s of kbSlugs(`content/${dom}/knowledge-base`)) add(`/${dom}/knowledge-base/${enc(s)}`);
}
// frontier .md (physics/cosmology/life)
for (const dom of ["universe-physics", "cosmology", "life-science"]) {
  for (const s of mdxSlugs(`content/${dom}/frontier`)) add(`/${dom}/frontier/${enc(s)}`);
}
// life-science subsections
for (const sub of ["species", "scientists", "dialogues"]) for (const s of mdxSlugs(`content/life-science/${sub}`)) add(`/life-science/${sub}/${enc(s)}`);
// history: event titles + era ids
try {
  const ev = readFileSync("content/human-history/data/events.js", "utf8");
  const titles = [...ev.matchAll(/title:\s*'([^']+)'/g)].slice(0, 4).map((m) => m[1]);
  for (const t of titles) add(`/human-history/events/${enc(t)}`);
} catch {}
try {
  const eras = readFileSync("subjects/history/lib/eras.ts", "utf8");
  const ids = [...eras.matchAll(/id:\s*['"]([a-z-]+)['"]/g)].slice(0, 3).map((m) => m[1]);
  for (const id of ids) add(`/human-history/eras/${id}`);
} catch {}
// history KB (CJK nested)
for (const s of kbSlugs("content/human-history/knowledge-base", 3)) add(`/human-history/knowledge/${enc(s)}`);
// tier pages
for (const t of ["observable", "milky-way", "solar-system"]) add(`/universe-physics/universe/${t}`);
for (const t of ["classical-mechanics", "quantum-mechanics", "relativity"]) add(`/universe-physics/physics/${t}`);
for (const t of ["observable", "solar-system"]) add(`/cosmology/universe/${t}`);

const main = async () => {
  console.log(`Auditing ${urls.length} sampled routes on ${BASE}\n`);
  let bad = 0;
  for (const p of urls) {
    let code = 0;
    try {
      const r = await fetch(BASE + p, { redirect: "follow" });
      code = r.status;
    } catch {
      code = -1;
    }
    if (code !== 200) {
      console.log(`  ${code}  ${decodeURIComponent(p)}`);
      bad++;
    }
  }
  console.log(`\nNon-200: ${bad} / ${urls.length}`);
};
main();

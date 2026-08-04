import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * content/human-history/data/index.js is a barrel that re-exports FIGURES —
 * all 202 figure biographies (longDesc/keyEvents/controversies/references,
 * ~670 KB raw). When the /human-history/lessons and /scholarly renderers
 * imported it for constants they could have taken from leaf modules, the
 * barrel dragged every biography into a client chunk: 325.9 KB gzip against
 * the 285 KB single-chunk budget (fixed in a95fefc0 by importing leaf modules
 * and the generated FIGURE_CATALOG projection instead, back to 179.4 KB).
 *
 * Nothing about that regression names the barrel — it surfaces only as an
 * oversize chunk — so this guard walks the static import graph from every
 * `"use client"` entry (following static AND dynamic imports, which is how
 * the history page-renderers are loaded) and fails if any of them can reach
 * the barrel or the figures payload behind it.
 */

const ROOTS = ["app", "components", "subjects"];
const CWD = process.cwd();

const FIGURES_DIR = resolve(CWD, "content/human-history/data/figures");
const BARREL_MODULES = [
  "content/human-history/data/index.js",
  "content/human-history/data/figures.js",
  "content/human-history/data/figures-index.js",
].map((path) => resolve(CWD, path));

function isForbidden(file: string): boolean {
  return file.startsWith(`${FIGURES_DIR}/`) || BARREL_MODULES.includes(file);
}

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry)) out.push(full);
  }
  return out;
}

/** Resolve a relative or `@/`-aliased specifier the way the bundler would. */
function resolveSpecifier(fromFile: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith(".")) base = resolve(dirname(fromFile), specifier);
  else if (specifier.startsWith("@/")) base = resolve(CWD, specifier.slice(2));
  else return null;
  for (const candidate of [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.mjs`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
    join(base, "index.js"),
    join(base, "index.jsx"),
  ]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

// Static imports/exports, side-effect imports, and dynamic `import(...)` —
// the history routes load their renderers via dynamic import from a client
// wrapper, and those chunks ship to the browser exactly like static ones.
const IMPORT_PATTERN = /(?:from\s+|import\s*\(\s*|import\s+)["'](\.[^"']+|@\/[^"']+)["']/g;

function localImports(file: string): string[] {
  const src = readFileSync(file, "utf8");
  return [...src.matchAll(IMPORT_PATTERN)]
    .map((match) => resolveSpecifier(file, match[1]!))
    .filter((resolved): resolved is string => resolved !== null);
}

/** Every module reachable from `entry` through local imports. */
function importClosure(entry: string): Set<string> {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length > 0) {
    const current = queue.pop()!;
    if (seen.has(current)) continue;
    seen.add(current);
    queue.push(...localImports(current));
  }
  return seen;
}

const clientRoots = ROOTS.flatMap(sourceFiles).filter((file) => {
  const head = readFileSync(file, "utf8").slice(0, 200);
  return /^\s*["']use client["']/m.test(head);
});

const barrel = resolve(CWD, "content/human-history/data/index.js");

describe("the human-history data barrel stays out of client bundles", () => {
  it("finds client entry modules to check (guard against a vacuous pass)", () => {
    expect(clientRoots.length).toBeGreaterThanOrEqual(100);
  });

  it("the barrel still re-exports the figures payload (positive control)", () => {
    // Proves the traversal detects barrel reachability. If the barrel stops
    // re-exporting FIGURES this guard is moot — delete it, don't weaken it.
    const closure = importClosure(barrel);
    expect(closure.has(resolve(CWD, "content/human-history/data/figures-index.js"))).toBe(true);
    expect([...closure].some((file) => file.startsWith(`${FIGURES_DIR}/`))).toBe(true);
  });

  it("no client-reachable module reaches the barrel or the figures payload", () => {
    const offenders: string[] = [];
    for (const root of clientRoots) {
      const hit = [...importClosure(root)].find(isForbidden);
      if (hit) offenders.push(`${relative(CWD, root)} -> ${relative(CWD, hit)}`);
    }
    expect(
      offenders,
      `Client-reachable modules import the human-history data barrel, which ` +
        `drags all 202 figure biographies into the browser bundle (this cost ` +
        `325.9 KB gzip against a 285 KB chunk budget once). Import leaf modules ` +
        `(eras.js, presentation.js, …) or the generated FIGURE_CATALOG instead:\n` +
        offenders.join("\n")
    ).toEqual([]);
  });
});

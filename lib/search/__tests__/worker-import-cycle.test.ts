import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * A worker must never import the module that spawns it. That cycle makes the
 * worker's chunk group depend on its own owner, and Turbopack deadlocks
 * building it: `next build` stops at "Creating an optimized production build"
 * with every worker thread parked, emitting no output and no error until the
 * CI job times out. It cost a red pipeline and a bisect to find, and nothing
 * about the failure points at the cycle — hence this guard.
 */

const ROOTS = ["app", "components", "lib", "subjects"];
const SPAWN_PATTERN = /new Worker\(\s*new URL\(\s*["']([^"']+)["']/g;

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

/** Resolve a relative specifier the way the bundler would, extensions included. */
function resolveRelative(fromFile: string, specifier: string): string | null {
  if (!specifier.startsWith(".")) return null;
  const base = resolve(dirname(fromFile), specifier);
  for (const candidate of [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
  ]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function relativeImports(file: string): string[] {
  const src = readFileSync(file, "utf8");
  const specifiers = [...src.matchAll(/from\s+["'](\.[^"']+)["']/g)].map((match) => match[1]!);
  return specifiers
    .map((specifier) => resolveRelative(file, specifier))
    .filter((resolved): resolved is string => resolved !== null);
}

/** Every module reachable from `entry` through relative imports. */
function importClosure(entry: string): Set<string> {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length > 0) {
    const current = queue.pop()!;
    if (seen.has(current)) continue;
    seen.add(current);
    queue.push(...relativeImports(current));
  }
  return seen;
}

interface SpawnSite {
  owner: string;
  worker: string;
}

const spawnSites: SpawnSite[] = ROOTS.flatMap(sourceFiles).flatMap((owner) => {
  const src = readFileSync(owner, "utf8");
  return [...src.matchAll(SPAWN_PATTERN)].flatMap((match) => {
    const worker = resolveRelative(owner, match[1]!);
    return worker ? [{ owner, worker }] : [];
  });
});

describe("worker entries do not import their own spawner", () => {
  it("finds the worker spawn sites (guard against a vacuous pass)", () => {
    expect(spawnSites.length).toBeGreaterThanOrEqual(3);
  });

  it.each(spawnSites)("$worker does not reach back into $owner", ({ owner, worker }) => {
    const closure = importClosure(worker);
    const cycle = closure.has(resolve(owner));
    expect(
      cycle,
      `${relative(process.cwd(), worker)} imports its spawner ` +
        `${relative(process.cwd(), owner)} — this deadlocks \`next build\`. ` +
        `Move the shared code into a module that does not import the spawner.`
    ).toBe(false);
  });
});

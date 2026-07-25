import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOTS = ["app", "components", "subjects"];
const HEAVY_MODULES = ["backlinks-index", "wiki-link-index"];

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "__tests__") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

/**
 * The generated link indexes are ~275 KB and ~205 KB of data. Reading one from
 * a `"use client"` module drags the whole thing into the browser bundle (it
 * cost every article page ~40 KB gzip before <Backlinks> moved to the server),
 * and nothing about that failure is visible without inspecting the chunks.
 */
describe("generated link indexes stay server-side", () => {
  const clientModules = ROOTS.flatMap(sourceFiles).filter((file) => {
    const head = readFileSync(file, "utf8").slice(0, 200);
    return /^\s*["']use client["']/m.test(head);
  });

  it("finds client modules to check (guard against a vacuous pass)", () => {
    expect(clientModules.length).toBeGreaterThan(0);
  });

  it("keeps the backlink and wiki-link indexes out of every client module", () => {
    const offenders = clientModules.filter((file) => {
      const src = readFileSync(file, "utf8");
      return HEAVY_MODULES.some((mod) => src.includes(`/${mod}"`) || src.includes(`/${mod}'`));
    });
    expect(offenders).toEqual([]);
  });
});

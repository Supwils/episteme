import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Counts drift: the portal once said 117 哲学家 while the landing said 67 and the
// directory held 117. Every inventory number must come from lib/site-stats.
const COUNT_PATTERN = /\d{2,}\+?\s*(?:位|个|篇|项|次|名|种)/;

// Numbers that are facts about the world or fixed parts of an interactive, not
// inventory counts of this site.
const ALLOWED: Record<string, string> = {
  "app/life-science/extinctions/page.tsx": "每天约有 150—200 个物种灭绝",
  "app/philosophy/concepts/quiz/page.tsx": "10个经典思想实验",
};

const ROOT = process.cwd();

function pageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return entry === "__tests__" ? [] : pageFiles(full);
    return entry === "page.tsx" || entry === "layout.tsx" ? [full] : [];
  });
}

// LATEST_UPDATES entries are dated changelog lines ("2026-06 上线，覆盖 29 位…"):
// true when written, so they are history rather than a current count.
function withoutChangelog(source: string): string {
  const start = source.indexOf("export const LATEST_UPDATES");
  if (start === -1) return source;
  const end = source.indexOf("\n];", start);
  return source.slice(0, start) + source.slice(end + 3);
}

function offendingLines(file: string, source: string): string[] {
  const allowed = ALLOWED[path.relative(ROOT, file)];
  return source
    .split("\n")
    .filter((line) => COUNT_PATTERN.test(line) && !(allowed && line.includes(allowed)))
    .map((line) => `${path.relative(ROOT, file)}: ${line.trim()}`);
}

describe("no hard-coded counts", () => {
  it("keeps page and layout copy free of typed inventory numbers", () => {
    const offenders = pageFiles(path.join(ROOT, "app")).flatMap((file) =>
      offendingLines(file, readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });

  it("keeps domain and landing data free of typed inventory numbers", () => {
    const files = [
      "lib/data.tsx",
      "subjects/philosophy/lib/home-data.ts",
      "subjects/life-science/lib/home-data.ts",
    ].map((file) => path.join(ROOT, file));
    const offenders = files.flatMap((file) =>
      offendingLines(file, withoutChangelog(readFileSync(file, "utf8")))
    );
    expect(offenders).toEqual([]);
  });
});

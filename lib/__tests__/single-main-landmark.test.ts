import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function tsxFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...tsxFiles(full));
    else if (entry.endsWith(".tsx")) found.push(full);
  }
  return found;
}

describe("single main landmark", () => {
  it("keeps the only app <main> on the root layout", () => {
    const offenders = tsxFiles(path.join(process.cwd(), "app"))
      .filter((file) => /<main[\s>]/.test(readFileSync(file, "utf8")))
      .map((file) => path.relative(process.cwd(), file));
    expect(offenders).toEqual(["app/layout.tsx"]);
  });

  it("points the skip link at a div inside that main", () => {
    const layout = readFileSync(path.join(process.cwd(), "app/philosophy/layout.tsx"), "utf8");
    expect(layout).toContain("<div data-skip-target tabIndex={-1}");
    expect(layout).not.toContain("<main");
    const root = readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(root).toContain('<main id="main-content"');
  });
});

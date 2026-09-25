import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

const PORTAL_SOURCES = [
  "app/page.tsx",
  "components/portal/Astrolabe.tsx",
  "components/portal/AstrolabeController.tsx",
  "components/portal/ClusterAtlas.tsx",
  "components/portal/TodaySection.tsx",
  "components/portal/ReadingShelf.tsx",
  "components/portal/BookShelf.tsx",
  "components/portal/ClimbInvite.tsx",
  "components/DeferredHomeKnowledgeContinuum.tsx",
];

describe("homepage motion contract", () => {
  it("keeps the homepage and its SEO metadata server-rendered", () => {
    const page = read("app/page.tsx");

    expect(page.trimStart().startsWith('"use client"')).toBe(false);
    expect(page).toContain("export const metadata: Metadata");
    expect(page).toContain('type="application/ld+json"');
    for (const server of ["Astrolabe", "ClusterAtlas", "TodaySection", "ClimbInvite"]) {
      expect(read(`components/portal/${server}.tsx`).trimStart()).not.toMatch(/^"use client"/);
    }
  });

  it("ships no animation library: one CSS entrance, then only what the reader turns", () => {
    for (const file of PORTAL_SOURCES) {
      expect(read(file), file).not.toMatch(/from ["'](?:gsap|framer-motion|motion\/react)/);
      expect(read(file), file).not.toMatch(/import\(["']gsap/);
    }
  });

  it("gates every portal animation behind prefers-reduced-motion", () => {
    const css = read("components/portal/portal.css");
    const outside = css.replace(
      /@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n\}\n/g,
      ""
    );
    expect(outside).not.toMatch(/^\s*animation(?:-name)?:/m);
    expect(outside).not.toMatch(/^\s*transition:\s*transform/m);
  });

  it("does not hide crawlable homepage content behind scroll reveals", () => {
    for (const file of PORTAL_SOURCES) {
      expect(read(file), file).not.toContain("data-home-reveal");
      expect(read(file), file).not.toContain("whileInView");
    }
    expect(read("components/portal/portal.css")).not.toMatch(/opacity:\s*0\s*;/);
  });

  it("keeps homepage chrome on semantic classes instead of long utility strings", () => {
    for (const file of PORTAL_SOURCES) {
      expect(read(file), file).not.toMatch(/className="[^"]{80,}"/);
    }
  });
});

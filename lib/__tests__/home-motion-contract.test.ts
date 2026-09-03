import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

describe("homepage motion contract", () => {
  it("keeps the homepage and its SEO metadata server-rendered", () => {
    const page = read("app/page.tsx");

    expect(page.trimStart().startsWith('"use client"')).toBe(false);
    expect(page).toContain("export const metadata: Metadata");
    expect(page).toContain('type="application/ld+json"');
    expect(page).toContain("data-home-motion-root");
  });

  it("loads scroll animation code after hydration and preserves reduced motion", () => {
    const controller = read("components/HomeMotionController.tsx");

    expect(controller).toContain('import("gsap")');
    expect(controller).toContain('import("gsap/ScrollTrigger")');
    expect(controller).not.toMatch(/^import .* from ["']gsap/m);
    expect(controller).toContain("prefers-reduced-motion: reduce");
    expect(controller).toContain("prefers-reduced-motion: no-preference");
    expect(controller).toContain("gsap.matchMedia(root)");
    expect(controller).toContain("requestIdleCallback");
    expect(controller).toContain("return null");
  });

  it("does not hide crawlable homepage content in the static stylesheet", () => {
    const css = read("app/globals.css");

    expect(css).not.toMatch(/\[data-home-reveal\][^{]*\{[^}]*opacity:\s*0/s);
    expect(css).not.toMatch(/\[data-home-reveal\][^{]*\{[^}]*visibility:\s*hidden/s);
  });
});

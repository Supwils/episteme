import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

function cspFor(source: string): string {
  const rule = headers.find((entry) => entry.source === source);
  const csp = rule?.headers.find((header) => header.key === "Content-Security-Policy")?.value;
  if (!csp) throw new Error(`missing CSP for ${source}`);
  return csp;
}

const headers = await nextConfig.headers!();

describe("route-scoped Content-Security-Policy", () => {
  it("keeps Iconify off the default policy", () => {
    const csp = cspFor("/((?!medicine|chemistry|molecules|human-history).*)");
    expect(csp).not.toContain("iconify");
    expect(csp).not.toContain("unisvg");
    expect(csp).not.toContain("simpleicons");
  });

  it("allows only the pinned Iconify script on human-history routes", () => {
    const csp = cspFor("/human-history/:path*");
    expect(csp).toContain("https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js");
    expect(csp).toContain("https://api.iconify.design");
    expect(csp).not.toContain("rcsb.org");
  });

  it("keeps Mol* RCSB hosts on molecule routes and Iconify off them", () => {
    const csp = cspFor("/molecules/:path*");
    expect(csp).toContain("https://models.rcsb.org");
    expect(csp).not.toContain("iconify");
  });

  it("pins the human-history script with SRI", () => {
    const layout = readFileSync("app/human-history/layout.tsx", "utf-8");
    expect(layout).toContain(
      'src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"'
    );
    expect(layout).toContain("integrity=");
    expect(layout).toContain('crossOrigin="anonymous"');
  });
});

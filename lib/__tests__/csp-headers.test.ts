import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import nextConfig from "../../next.config";

function cspFor(pathname: string): string {
  const rule = headers.find((entry) => getPathMatch(entry.source)(pathname));
  const csp = rule?.headers.find((header) => header.key === "Content-Security-Policy")?.value;
  if (!csp) throw new Error(`missing CSP for ${pathname}`);
  return csp;
}

const headers = await nextConfig.headers!();

describe("route-scoped Content-Security-Policy", () => {
  it.each([
    "/",
    "/search",
    "/api/search",
    "/medicine-extra",
    "/chemistry2",
    "/molecules-old/viewer",
    "/human-historyish",
    "/MEDICINE-EXTRA",
  ])("applies the default security headers to %s", (pathname) => {
    const matching = headers.filter((rule) => getPathMatch(rule.source)(pathname));
    expect(matching).toHaveLength(1);
    const applied = matching[0]!.headers;
    expect(applied).toEqual(
      expect.arrayContaining([
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      ])
    );
    const csp = applied.find((header) => header.key === "Content-Security-Policy")!.value;
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toContain("rcsb.org");
    expect(csp).not.toContain("iconify");
  });

  it.each(["medicine", "chemistry", "molecules", "human-history"])(
    "matches only the dedicated policy for the %s route and its descendants",
    (domain) => {
      for (const pathname of [`/${domain}`, `/${domain}/`, `/${domain}/concepts/article`]) {
        const matching = headers.filter((rule) => getPathMatch(rule.source)(pathname));
        expect(matching).toHaveLength(1);
        expect(matching[0]!.source).toBe(`/${domain}/:path*`);
      }
    }
  );

  it("keeps Iconify off the default policy", () => {
    const csp = cspFor("/");
    expect(csp).not.toContain("iconify");
    expect(csp).not.toContain("unisvg");
    expect(csp).not.toContain("simpleicons");
  });

  it("allows only the pinned Iconify script on human-history routes", () => {
    const csp = cspFor("/human-history");
    expect(csp).toContain("https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js");
    expect(csp).toContain("https://api.iconify.design");
    expect(csp).not.toContain("rcsb.org");
  });

  it("keeps Mol* RCSB hosts on molecule routes and Iconify off them", () => {
    const csp = cspFor("/molecules");
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

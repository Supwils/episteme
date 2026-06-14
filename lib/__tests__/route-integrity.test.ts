import { describe, it, expect } from "vitest";
import { buildValidRoutes, normalizeRoute } from "@/scripts/valid-routes";
import { CROSS_REFERENCES, DOMAIN_ROUTES } from "@/lib/cross-domain-refs";
import { getSearchIndex } from "@/lib/search-index";

const valid = buildValidRoutes();

describe("route integrity: cross-domain references", () => {
  it("every cross-domain ref resolves to a real route (both directions)", () => {
    const broken: string[] = [];
    for (const ref of CROSS_REFERENCES) {
      const fromRoute = ref.fromPath ?? `${DOMAIN_ROUTES[ref.fromDomain]}/${ref.fromId}`;
      const toRoute = ref.toPath ?? `${DOMAIN_ROUTES[ref.toDomain]}/${ref.toId}`;
      if (!valid.has(fromRoute)) broken.push(`[${ref.fromId}→${ref.toId}] from ${fromRoute}`);
      if (!valid.has(toRoute)) broken.push(`[${ref.fromId}→${ref.toId}] to ${toRoute}`);
    }
    expect(broken).toEqual([]);
  });
});

describe("route integrity: search index URLs", () => {
  it("every search result links to a real route", async () => {
    const { documents } = await getSearchIndex();
    // Sanity: the index actually built (guards against vacuous pass on import failure).
    expect(documents.length).toBeGreaterThan(1000);

    const broken = new Map<string, string>(); // route → example doc id
    for (const doc of documents) {
      const route = normalizeRoute(doc.url);
      if (!valid.has(route)) broken.set(route, doc.id);
    }
    expect([...broken.entries()].map(([r, id]) => `${r} (e.g. ${id})`)).toEqual([]);
  }, 60_000);
});

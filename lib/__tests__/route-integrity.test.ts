import { describe, it, expect } from "vitest";
import { buildValidRoutes, normalizeRoute } from "@/scripts/valid-routes";
import { CROSS_REFERENCES, DOMAIN_ROUTES } from "@/lib/cross-domain-refs";
import { getSearchIndex } from "@/lib/search-index";
import { APP_URLS, SECTION_SHELL_PREFIXES } from "@/lib/urls";

const valid = buildValidRoutes();

describe("route integrity: registry-driven history pages", () => {
  it("includes exact event, figure, and era detail routes", () => {
    expect(valid.has(`/human-history/events/${encodeURIComponent("洞窟壁画")}`)).toBe(true);
    expect(valid.has(`/human-history/figures/${encodeURIComponent("孔子")}`)).toBe(true);
    expect(valid.has("/human-history/eras/earlyModern")).toBe(true);
  });
});

describe("normalizeRoute", () => {
  it("encodes CJK figure and event slugs to match the catalog", () => {
    const encoded = `/human-history/figures/${encodeURIComponent("孔子")}`;
    expect(normalizeRoute("/human-history/figures/孔子")).toBe(encoded);
    expect(normalizeRoute(encoded)).toBe(encoded);
    expect(normalizeRoute("/human-history/events/洞窟壁画")).toBe(
      `/human-history/events/${encodeURIComponent("洞窟壁画")}`
    );
    expect(valid.has(normalizeRoute("/human-history/figures/孔子"))).toBe(true);
  });

  it("does not encode knowledge-base or history-knowledge CJK slugs", () => {
    const kb = "/life-science/knowledge-base/进化专题--眼睛的进化";
    const history = "/human-history/knowledge/近代--俄罗斯帝国";
    expect(normalizeRoute(kb)).toBe(kb);
    expect(normalizeRoute(history)).toBe(history);
    expect(valid.has(kb)).toBe(true);
    expect(valid.has(history)).toBe(true);
  });

  it("does not throw on a malformed percent in a figure slug", () => {
    expect(() => normalizeRoute("/human-history/figures/孔子%")).not.toThrow();
    expect(normalizeRoute("/human-history/figures/孔子%")).toBe(
      `/human-history/figures/${encodeURIComponent("孔子%")}`
    );
  });

  it("strips origin, query, hash, and a trailing slash", () => {
    expect(normalizeRoute("https://example.com/philosophy/thinkers/plato/?x=1#top")).toBe(
      "/philosophy/thinkers/plato"
    );
  });
});

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

describe("section shell suppression", () => {
  // Every domain with its own DomainNav must suppress the portal nav/footer.
  // The law, arts and engineering launches each shipped without updating the
  // formerly hand-copied prefix lists, which produced duplicated navigation and
  // a portal header rendering dark-theme foreground tokens on a light page.
  it("covers every registered domain landing route", () => {
    const uncovered = Object.values(APP_URLS).filter(
      (url) => !SECTION_SHELL_PREFIXES.some((prefix) => url.startsWith(prefix))
    );
    expect(uncovered).toEqual([]);
  });

  it("does not swallow the portal itself", () => {
    for (const route of ["/", "/daily", "/search"]) {
      expect(
        SECTION_SHELL_PREFIXES.some((prefix) => route.startsWith(prefix)),
        route
      ).toBe(false);
    }
  });
});

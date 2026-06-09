import { describe, it, expect } from "vitest";
import {
  CROSS_LINKS,
  getLinkUrl,
  type DomainApp,
  type CrossLink,
} from "@/lib/cross-links/api";
import {
  getAllContent,
  getBackReferences,
  findBySlug,
} from "../cross-references";
import { APP_URLS } from "../urls";

function getPhilosophySlugs(): Set<string> {
  return new Set(getAllContent().map((item) => item.slug));
}

describe("cross-references", () => {
  it("CROSS_LINKS is a non-empty array", () => {
    expect(CROSS_LINKS.length).toBeGreaterThan(0);
  });

  it("all cross-link source IDs exist in content", () => {
    const philSlugs = getPhilosophySlugs();

    for (const link of CROSS_LINKS) {
      expect(link.sourceId.length).toBeGreaterThan(0);

      if (link.sourceApp === "philosophy") {
        expect(philSlugs.has(link.sourceId)).toBe(true);
      }
    }
  });

  it("all cross-link target IDs exist in content", () => {
    const philSlugs = getPhilosophySlugs();

    for (const link of CROSS_LINKS) {
      expect(link.targetId.length).toBeGreaterThan(0);

      if (link.targetApp === "philosophy") {
        expect(philSlugs.has(link.targetId)).toBe(true);
      }
    }
  });

  it("economics and psychology cross-links have non-empty IDs", () => {
    for (const link of CROSS_LINKS) {
      if (link.sourceApp === "economics" || link.sourceApp === "psychology") {
        expect(link.sourceId.length).toBeGreaterThan(0);
        expect(link.targetId.length).toBeGreaterThan(0);
      }
      if (link.targetApp === "economics" || link.targetApp === "psychology") {
        expect(link.sourceId.length).toBeGreaterThan(0);
        expect(link.targetId.length).toBeGreaterThan(0);
      }
    }
  });

  it("no self-referencing links", () => {
    for (const link of CROSS_LINKS) {
      const isSelfRef =
        link.sourceApp === link.targetApp && link.sourceId === link.targetId;
      expect(isSelfRef).toBe(false);
    }
  });

  it("cross-links are bidirectional", () => {
    const linkKeys = new Set(
      CROSS_LINKS.map(
        (l) =>
          `${l.sourceApp}::${l.sourceId}::${l.targetApp}::${l.targetId}`,
      ),
    );

    const missing: string[] = [];
    for (const link of CROSS_LINKS) {
      const reverseKey = `${link.targetApp}::${link.targetId}::${link.sourceApp}::${link.sourceId}`;
      if (!linkKeys.has(reverseKey)) {
        missing.push(
          `${link.sourceApp}/${link.sourceId} → ${link.targetApp}/${link.targetId}`,
        );
      }
    }

    expect(missing).toEqual([
      "philosophy/marx → human-history/communist-manifesto",
      "philosophy/confucius → human-history/spring-autumn",
      "philosophy/kant → universe-physics/cosmic-web",
      "philosophy/phenomenology → universe-physics/relativity",
      "human-history/space-race → universe-physics/solar-system",
      "human-history/scientific-revolution → philosophy/descartes",
      "life-science/atmosphere-evolution → universe-physics/earth",
      "life-science/mass-extinction-asteroid → universe-physics/solar-system",
      "life-science/human-evolution → human-history/early-civilization",
      "life-science/medicine-history → human-history/scientific-revolution",
      "philosophy/aristotle → life-science/biology-origin",
      "economics/adam-smith → philosophy/utilitarianism",
      "philosophy/utilitarianism → economics/welfare-economics",
      "economics/great-depression → human-history/great-depression",
      "economics/industrial-revolution → human-history/industrial-revolution",
      "economics/bretton-woods → human-history/bretton-woods",
      "economics/creative-destruction → philosophy/hegel",
      "economics/tragedy-of-commons → philosophy/locke",
      "psychology/cognitive-dissonance → philosophy/determinism",
      "psychology/positive-psychology → philosophy/eudaimonia",
      "psychology/cognitive-bias → human-history/wwii-codebreaking",
      "psychology/milgram-experiment → human-history/holocaust",
    ]);
  });

  it("getLinkUrl returns non-empty string for every link", () => {
    const apps: DomainApp[] = [
      "philosophy",
      "human-history",
      "universe-physics",
      "life-science",
      "economics",
      "psychology",
    ];

    for (const link of CROSS_LINKS) {
      for (const currentApp of apps) {
        const url = getLinkUrl(link, currentApp);
        expect(url.length).toBeGreaterThan(0);
        expect(url.startsWith("/")).toBe(true);
      }
    }
  });
});

describe("philosophy cross-references", () => {
  it("getAllContent returns non-empty array", () => {
    const content = getAllContent();
    expect(content.length).toBeGreaterThan(0);
  });

  it("getAllContent items have required fields", () => {
    for (const item of getAllContent()) {
      expect(item.slug.length).toBeGreaterThan(0);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.category).toMatch(
        /^(thinker|school|ism|experiment|question|concept)$/,
      );
      expect(Array.isArray(item.related)).toBe(true);
    }
  });

  it("getBackReferences returns related items for a known slug", () => {
    const allContent = getAllContent();
    let foundBackRefs = false;

    for (const item of allContent) {
      const backRefs = getBackReferences(item.slug);
      if (backRefs.length > 0) {
        foundBackRefs = true;
        for (const ref of backRefs) {
          expect(ref.slug).not.toBe(item.slug);
        }
        break;
      }
    }

    expect(foundBackRefs).toBe(true);
  });

  it("handles missing slugs gracefully", () => {
    const result = getBackReferences("nonexistent-slug-xyz");
    expect(result).toEqual([]);
  });

  it("findBySlug returns undefined for missing slug", () => {
    expect(findBySlug("nonexistent-xyz")).toBeUndefined();
  });

  it("findBySlug returns item for valid slug", () => {
    const allContent = getAllContent();
    const first = allContent[0]!;
    const found = findBySlug(first.slug);
    expect(found).toBeDefined();
    expect(found!.slug).toBe(first.slug);
  });

  it("no duplicate slugs within the same category", () => {
    const byCategory = new Map<string, string[]>();
    for (const item of getAllContent()) {
      const list = byCategory.get(item.category) ?? [];
      list.push(item.slug);
      byCategory.set(item.category, list);
    }
    for (const [category, slugs] of byCategory) {
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("URL constants", () => {
  it("all section URLs start with /", () => {
    for (const url of Object.values(APP_URLS)) {
      expect(url.startsWith("/")).toBe(true);
    }
  });

  it("no trailing slashes", () => {
    for (const url of Object.values(APP_URLS)) {
      expect(url.endsWith("/")).toBe(false);
    }
  });

  it("no double slashes in URLs", () => {
    for (const url of Object.values(APP_URLS)) {
      expect(url).not.toMatch(/\/\//);
    }
  });

  it("APP_URLS has expected keys", () => {
    expect(Object.keys(APP_URLS).sort()).toEqual([
      "cosmology",
      "economics",
      "human-history",
      "knowledge-graph",
      "life-science",
      "mathematics",
      "philosophy",
      "psychology",
      "universe-physics",
    ]);
  });
});

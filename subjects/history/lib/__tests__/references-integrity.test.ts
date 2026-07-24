import { describe, expect, it } from "vitest";
import { REFERENCES } from "@/content/human-history/data/references.js";
import { EVENTS } from "@/content/human-history/data/events.js";
import { FIGURES } from "@/content/human-history/data/figures.js";

/**
 * Events and figures cite the bibliography by key. A key with no REFERENCES
 * entry doesn't error — the resolver just drops it, so the citation silently
 * vanishes from the page. Eight such dead keys had accumulated. This turns that
 * failure mode into a caught error.
 */
const bibliography = new Set(Object.keys(REFERENCES));

function deadKeys(items: readonly unknown[]): string[] {
  const dead: string[] = [];
  for (const raw of items) {
    const item = raw as { title?: string; name?: string; references?: string[] };
    for (const key of item.references ?? []) {
      if (!bibliography.has(key)) dead.push(`${item.title ?? item.name ?? "?"} → ${key}`);
    }
  }
  return dead;
}

describe("human-history reference integrity", () => {
  it("resolves every reference key an event cites", () => {
    expect(deadKeys(EVENTS)).toEqual([]);
  });

  it("resolves every reference key a figure cites", () => {
    expect(deadKeys(FIGURES)).toEqual([]);
  });

  it("has a well-formed bibliography entry for every source", () => {
    for (const [key, ref] of Object.entries(REFERENCES)) {
      expect(ref.author.length, key).toBeGreaterThan(0);
      expect(ref.title.length, key).toBeGreaterThan(0);
      expect(Number.isFinite(ref.year), key).toBe(true);
    }
  });
});

import { describe, expect, it } from "vitest";
import { BACKLINKS_INDEX } from "@/lib/backlinks-index";
import { domainLabelOf, domainOf, groupBacklinks, normalizeArticleUrl } from "@/lib/backlinks";

describe("normalizeArticleUrl", () => {
  it("leaves a plain article url untouched", () => {
    expect(normalizeArticleUrl("/computer-science/concepts/recursion")).toBe(
      "/computer-science/concepts/recursion"
    );
  });

  it("decodes percent-encoded CJK slugs so they hit the index", () => {
    // `usePathname()`/`headers()` hand back the encoded form; the generated
    // index is keyed by the decoded slug.
    expect(normalizeArticleUrl("/cosmology/knowledge-base/%E4%B8%AD%E5%AD%90%E6%98%9F")).toBe(
      "/cosmology/knowledge-base/中子星"
    );
  });

  it("strips a trailing slash, query and hash", () => {
    expect(normalizeArticleUrl("/philosophy/concepts/logos/")).toBe("/philosophy/concepts/logos");
    expect(normalizeArticleUrl("/philosophy/concepts/logos?from=nav")).toBe(
      "/philosophy/concepts/logos"
    );
    expect(normalizeArticleUrl("/philosophy/concepts/logos#refs")).toBe(
      "/philosophy/concepts/logos"
    );
  });

  it("survives a malformed percent-escape instead of throwing", () => {
    // decodeURIComponent throws URIError on a lone '%'; a bad URL must not 500.
    expect(normalizeArticleUrl("/philosophy/concepts/100%")).toBe("/philosophy/concepts/100%");
  });
});

describe("domainOf", () => {
  it("reads the first path segment", () => {
    expect(domainOf("/computer-science/concepts/recursion")).toBe("computer-science");
    expect(domainOf("/philosophy/thinkers/kant")).toBe("philosophy");
  });

  it("returns an empty string for a rootless url", () => {
    expect(domainOf("")).toBe("");
  });
});

describe("domainLabelOf", () => {
  it("labels the curated cross-reference domains", () => {
    expect(domainLabelOf("computer-science")).toBe("计算机科学");
    expect(domainLabelOf("philosophy")).toBe("哲学思想");
  });

  it("labels engine domains missing from DOMAIN_LABELS", () => {
    // linguistics/sociology have backlinks but are absent from the curated
    // cross-domain `Domain` union — they must not render as a raw slug.
    expect(domainLabelOf("linguistics")).toBe("语言学");
    expect(domainLabelOf("sociology")).toBe("社会学");
  });

  it("falls back to the raw segment for an unknown domain", () => {
    expect(domainLabelOf("astrology")).toBe("astrology");
  });
});

describe("groupBacklinks", () => {
  it("returns an empty group for an article with no inbound links", () => {
    const g = groupBacklinks("/nothing/links/here");
    expect(g.total).toBe(0);
    expect(g.sameDomain).toEqual([]);
    expect(g.crossDomain).toEqual([]);
  });

  it("splits inbound links into same-domain and cross-domain buckets", () => {
    // acids-and-bases is referenced by both chemistry and earth-science pages.
    const g = groupBacklinks("/chemistry/concepts/acids-and-bases");
    expect(g.total).toBeGreaterThan(0);
    expect(g.total).toBe(
      g.sameDomain.length + g.crossDomain.reduce((n, d) => n + d.links.length, 0)
    );
    expect(g.sameDomain.every((l) => domainOf(l.url) === "chemistry")).toBe(true);
    expect(g.crossDomain.every((d) => d.domain !== "chemistry")).toBe(true);
    expect(g.crossDomain.map((d) => d.domain)).toContain("earth-science");
  });

  it("carries a human label for every cross-domain bucket", () => {
    const g = groupBacklinks("/chemistry/concepts/acids-and-bases");
    expect(g.crossDomain.every((d) => d.label.length > 0)).toBe(true);
  });

  it("orders cross-domain buckets by link count, densest first", () => {
    const target = Object.keys(BACKLINKS_INDEX).find((url) => {
      const g = groupBacklinks(url);
      return g.crossDomain.length >= 2;
    });
    expect(target).toBeDefined();
    const counts = groupBacklinks(target!).crossDomain.map((d) => d.links.length);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });

  it("resolves an encoded url to the same group as its decoded form", () => {
    const cjk = Object.keys(BACKLINKS_INDEX).find((url) => /[^\x20-\x7E]/.test(url));
    expect(cjk).toBeDefined();
    const encoded = "/" + cjk!.slice(1).split("/").map(encodeURIComponent).join("/");
    expect(groupBacklinks(encoded).total).toBe(groupBacklinks(cjk!).total);
    expect(groupBacklinks(encoded).total).toBeGreaterThan(0);
  });

  it("never lists the article itself as its own backlink", () => {
    for (const url of Object.keys(BACKLINKS_INDEX).slice(0, 200)) {
      const g = groupBacklinks(url);
      const all = [...g.sameDomain, ...g.crossDomain.flatMap((d) => d.links)];
      expect(all.some((l) => normalizeArticleUrl(l.url) === url)).toBe(false);
    }
  });
});

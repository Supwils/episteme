import { describe, expect, it } from "vitest";
import { groupPreviewsByDomain, shardDomainForHref } from "../link-preview-shards";

describe("shardDomainForHref", () => {
  it("takes the first path segment as the shard domain", () => {
    expect(shardDomainForHref("/sociology/concepts/social-capital")).toBe("sociology");
    expect(shardDomainForHref("/computer-science/knowledge/algorithms/sorting")).toBe(
      "computer-science"
    );
  });

  it("returns null for URLs that cannot belong to a domain shard", () => {
    expect(shardDomainForHref("/sociology")).toBeNull();
    expect(shardDomainForHref("https://example.com/x/y")).toBeNull();
    expect(shardDomainForHref("")).toBeNull();
    expect(shardDomainForHref("/Bad Domain/x")).toBeNull();
  });
});

describe("groupPreviewsByDomain", () => {
  it("groups every entry under its own domain without dropping or duplicating any", () => {
    const previews = {
      "/chemistry/concepts/mole": { t: "摩尔", e: "", d: "chemistry" },
      "/chemistry/concepts/atom": { t: "原子", e: "", d: "chemistry" },
      "/mathematics/concepts/function": { t: "函数", e: "", d: "mathematics" },
    };
    const byDomain = groupPreviewsByDomain(previews);

    expect([...byDomain.keys()].sort()).toEqual(["chemistry", "mathematics"]);
    expect(Object.keys(byDomain.get("chemistry")!)).toEqual([
      "/chemistry/concepts/mole",
      "/chemistry/concepts/atom",
    ]);
    expect(byDomain.get("mathematics")).toEqual({
      "/mathematics/concepts/function": { t: "函数", e: "", d: "mathematics" },
    });
    const total = [...byDomain.values()].reduce((n, shard) => n + Object.keys(shard).length, 0);
    expect(total).toBe(Object.keys(previews).length);
  });

  it("keeps same-slug cross-domain entries in their respective shards", () => {
    const previews = {
      "/philosophy/concepts/justice": { t: "正义（哲学）", e: "", d: "philosophy" },
      "/law/concepts/justice": { t: "正义（法学）", e: "", d: "law" },
    };
    const byDomain = groupPreviewsByDomain(previews);

    expect(byDomain.get("philosophy")!["/philosophy/concepts/justice"]!.t).toBe("正义（哲学）");
    expect(byDomain.get("law")!["/law/concepts/justice"]!.t).toBe("正义（法学）");
  });
});

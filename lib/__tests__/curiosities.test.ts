import { describe, expect, it } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { indexCuriosities } from "@/lib/search-index/curiosities-index";
import {
  CROSS_DOMAIN_TAG,
  CURIOSITY_SUBJECTS,
  COINCIDENCE_WALL_HREF,
  coincidenceFollowHref,
  curiosityArticleHref,
  curiosityFollowLabel,
  curiosityTeaser,
  getAllCuriosities,
  getSpotlightCoincidence,
  isCrossDomainCuriosity,
} from "@/lib/curiosities";

describe("curiosity registry", () => {
  it("registers all twenty-two launched subjects", () => {
    expect(Object.keys(CURIOSITY_SUBJECTS)).toHaveLength(22);
  });

  it("keeps coincidence cards tagged and mixed into the wall pool", () => {
    const coincidences = getAllCuriosities().filter(isCrossDomainCuriosity);
    expect(coincidences.length).toBeGreaterThanOrEqual(40);
    expect(coincidences.every((item) => item.tags?.includes(CROSS_DOMAIN_TAG))).toBe(true);
    const subjects = new Set(coincidences.map((item) => item.subject));
    expect(subjects.size).toBeGreaterThanOrEqual(10);
  });

  it("keeps curiosity ids unique within a subject", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const item of getAllCuriosities()) {
      const key = `${item.subject}:${item.id}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    }
    expect(dupes).toEqual([]);
  });

  it("gives every new domain at least sixteen cards", () => {
    const all = getAllCuriosities();
    for (const subject of [
      "chemistry",
      "medicine",
      "earth-science",
      "engineering",
      "linguistics",
      "sociology",
      "law",
      "arts",
      "literature",
      "religion",
      "anthropology",
      "education",
    ] as const) {
      expect(all.filter((item) => item.subject === subject).length, subject).toBeGreaterThanOrEqual(
        16
      );
    }
  });

  it("requires a source on every new-domain and coincidence card", () => {
    const newDomains = new Set([
      "chemistry",
      "medicine",
      "earth-science",
      "engineering",
      "linguistics",
      "sociology",
      "law",
      "arts",
      "literature",
      "religion",
      "anthropology",
      "education",
    ]);
    const missing = getAllCuriosities()
      .filter((item) => newDomains.has(item.subject) || isCrossDomainCuriosity(item))
      .filter((item) => !item.source?.trim())
      .map((item) => `${item.subject}:${item.id}`);
    expect(missing).toEqual([]);
  });
});

describe("curiosityArticleHref", () => {
  it("rejects domain homes and section lists", () => {
    expect(curiosityArticleHref(undefined)).toBeUndefined();
    expect(curiosityArticleHref("/psychology")).toBeUndefined();
    expect(curiosityArticleHref("/psychology/phenomena")).toBeUndefined();
    expect(curiosityArticleHref("/philosophy/experiments")).toBeUndefined();
  });

  it("accepts article-depth paths", () => {
    expect(curiosityArticleHref("/psychology/phenomena/anchoring-bias")).toBe(
      "/psychology/phenomena/anchoring-bias"
    );
    expect(curiosityArticleHref("/philosophy/thinkers/plato")).toBe("/philosophy/thinkers/plato");
  });

  it("rejects protocol-relative, off-site, and script URLs", () => {
    expect(curiosityArticleHref("//evil.example/foo/bar")).toBeUndefined();
    expect(curiosityArticleHref("https://evil.example/foo/bar")).toBeUndefined();
    expect(curiosityArticleHref("javascript:alert(1)")).toBeUndefined();
    expect(curiosityArticleHref("/\\evil.example/foo/bar")).toBeUndefined();
    expect(curiosityFollowLabel("//evil.example/foo/bar")).toBe("更多奇趣知识 →");
  });

  it("treats empty strings and trailing-slash section lists as unlinkable", () => {
    expect(curiosityArticleHref("")).toBeUndefined();
    expect(curiosityArticleHref("/psychology/phenomena/")).toBeUndefined();
    expect(curiosityArticleHref("/life-science/knowledge-base/进化专题--眼睛的进化")).toBe(
      "/life-science/knowledge-base/进化专题--眼睛的进化"
    );
  });

  it("labels the follow CTA by whether the URL is an article", () => {
    expect(curiosityFollowLabel(undefined)).toBe("更多奇趣知识 →");
    expect(curiosityFollowLabel("/psychology")).toBe("更多奇趣知识 →");
    expect(curiosityFollowLabel("/psychology/phenomena")).toBe("更多奇趣知识 →");
    expect(curiosityFollowLabel("/psychology/phenomena/anchoring-bias")).toBe("阅读相关文章 →");
    expect(curiosityFollowLabel("/human-history/figures/马丁·路德·金")).toBe("阅读相关文章 →");
    expect(curiosityFollowLabel("/human-history/figures")).toBe("更多奇趣知识 →");
    expect(curiosityArticleHref("/human-history/figures/马丁·路德·金")).toBe(
      "/human-history/figures/马丁·路德·金"
    );
  });
});

describe("coincidence spotlight", () => {
  it("picks a tagged coincidence and falls back to the wall filter", () => {
    const item = getSpotlightCoincidence(20260115);
    expect(isCrossDomainCuriosity(item)).toBe(true);
    expect(getSpotlightCoincidence(20260115).id).toBe(item.id);
    expect(coincidenceFollowHref(undefined)).toBe(COINCIDENCE_WALL_HREF);
    expect(coincidenceFollowHref("/psychology")).toBe(COINCIDENCE_WALL_HREF);
    expect(coincidenceFollowHref("/chemistry/concepts/chirality")).toBe(
      "/chemistry/concepts/chirality"
    );
    expect(curiosityTeaser("第一句。第二句还很长。")).toBe("第一句。");
  });
});

describe("curiosity deep links", () => {
  it("never wrap a card around a domain homepage", () => {
    const leftover = getAllCuriosities()
      .map((item) => curiosityArticleHref(item.url))
      .filter((href): href is string => Boolean(href))
      .filter((href) => /^\/[a-z-]+$/.test(href));
    expect(leftover).toEqual([]);
  });

  it("treats essay-only species pages as real routes", () => {
    const valid = buildValidRoutes();
    for (const href of [
      "/life-science/species/naked-mole-rat",
      "/life-science/species/mycorrhiza",
      "/life-science/species/immortal-jellyfish",
      "/life-science/species/slime-mould",
      "/life-science/species/axolotl",
    ]) {
      expect(valid.has(href), href).toBe(true);
    }
  });

  it("points remaining deep links at real routes", () => {
    const valid = buildValidRoutes();
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const broken = getAllCuriosities()
      .map((item) => ({
        id: `${item.subject}:${item.id}`,
        href: curiosityArticleHref(item.url),
      }))
      .filter((item) => item.href && !resolves(item.href))
      .map((item) => `${item.id} → ${item.href}`);
    expect(broken).toEqual([]);
  });

  it("indexes curiosities onto article routes or /curiosities, never a domain home", () => {
    const docs = indexCuriosities({ getAllCuriosities });
    const leftover = docs
      .filter((d) => /^\/[a-z-]+$/.test(d.url) && d.url !== "/curiosities")
      .map((d) => `${d.id} → ${d.url}`);
    expect(leftover).toEqual([]);
  });

  it("maps high-value former section dumps onto real articles", () => {
    const all = getAllCuriosities();
    const urlOf = (id: string) => all.find((c) => c.id === id)?.url;
    expect(urlOf("point-nine-recurring")).toBe("/mathematics/concepts/convergence");
    expect(urlOf("cocktail-party-effect")).toBe("/psychology/phenomena/perception-physiology");
    expect(urlOf("blind-spot")).toBe("/psychology/phenomena/perception-physiology");
    expect(urlOf("giffen-good")).toBe("/economics/theories/supply-demand");
    expect(urlOf("weierstrass-function")).toBe("/mathematics/concepts/continuity");
    expect(urlOf("goldbach-conjecture-unproven")).toBe("/mathematics/concepts/number-theory");
    expect(urlOf("collatz-conjecture")).toBe("/mathematics/concepts/number-theory");
    expect(urlOf("benford-law")).toBe("/mathematics/concepts/statistics");
    expect(urlOf("veblen-goods")).toBe("/economics/theories/supply-demand");
    expect(urlOf("ultimatum-game-fairness")).toBe(
      "/economics/theories/behavioral-economics-theory"
    );
    expect(urlOf("git-created-in-ten-days")).toBe("/computer-science/concepts/version-control");
    expect(urlOf("cobol-atm-transactions")).toBe("/computer-science/pioneers/grace-hopper");
    expect(urlOf("lempel-ziv-compression-universal")).toBe(
      "/computer-science/theory/information-theory"
    );
    expect(urlOf("facial-feedback-nuance")).toBe("/psychology/schools/embodied-cognition");
    expect(urlOf("embodied-number-line")).toBe("/psychology/schools/embodied-cognition");
    expect(urlOf("roman-republic-dictator-legitimate")).toBe(
      "/political-science/institutions/constitutionalism-separation-of-powers"
    );
    expect(urlOf("iran-theocracy-elected-president")).toBe(
      "/political-science/institutions/theocracy"
    );
    expect(urlOf("naked-mole-rat-cancer")).toBe("/life-science/species/naked-mole-rat");
    expect(urlOf("mycorrhizal-network")).toBe("/life-science/species/mycorrhiza");
    expect(urlOf("immortal-jellyfish")).toBe("/life-science/species/immortal-jellyfish");
    expect(urlOf("slime-mold-tokyo-rail")).toBe("/life-science/species/slime-mould");
    expect(urlOf("illusion-of-explanatory-depth")).toBe(
      "/psychology/knowledge-base/metacognition-training"
    );
    expect(urlOf("mantis-shrimp-vision")).toBe("/life-science/knowledge-base/进化专题--眼睛的进化");
    expect(urlOf("crow-compound-tools")).toBe(
      "/life-science/knowledge-base/进化专题--动物行为与本能"
    );
    expect(urlOf("andromeda-collision")).toBe(
      "/cosmology/knowledge-base/星系天文学--milky-way-structure"
    );
    expect(urlOf("largest-structure-universe")).toBe(
      "/cosmology/knowledge-base/宇宙学基础--宇宙网与纤维状结构"
    );
    expect(urlOf("iceland-oldest-parliament")).toBe("/human-history/knowledge/中世纪--维京人");
    expect(urlOf("oxford-older-than-aztecs")).toBe("/human-history/knowledge/美洲--阿兹特克帝国");
    expect(urlOf("woolly-mammoth-pyramids-overlap")).toBe("/human-history/knowledge/文明--古埃及");
    expect(urlOf("sahara-was-green")).toBe("/human-history/knowledge/远古时期--农业革命");
    expect(urlOf("harvard-older-than-calculus")).toBe(
      "/mathematics/knowledge-base/分析--微积分的故事"
    );
  });

  it("does not index section-list dumps either", () => {
    const docs = indexCuriosities({ getAllCuriosities });
    const leftover = docs
      .filter((d) => d.url !== "/curiosities")
      .filter((d) => d.url.split("/").filter(Boolean).length < 3)
      .map((d) => `${d.id} → ${d.url}`);
    expect(leftover).toEqual([]);
  });
});

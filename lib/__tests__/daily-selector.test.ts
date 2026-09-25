import { describe, it, expect } from "vitest";
import { buildValidRoutes, normalizeRoute } from "@/scripts/valid-routes";
import { getDailySelected, seededSelect } from "../daily-selector";
import { getAllCuriosities, isCrossDomainCuriosity } from "../curiosities";
import {
  ARTS_FACTS,
  CHEMISTRY_FACTS,
  COMPUTER_SCIENCE_FACTS,
  COSMOLOGY_FACTS,
  EARTH_SCIENCE_FACTS,
  ECONOMICS_FACTS,
  ENGINEERING_FACTS,
  EDUCATION_FACTS,
  ANTHROPOLOGY_FACTS,
  LAW_FACTS,
  LITERATURE_FACTS,
  RELIGION_FACTS,
  LIFE_SCIENCE_FACTS,
  LINGUISTICS_FACTS,
  MATH_FACTS,
  MEDICINE_FACTS,
  MONTHLY_FACTS,
  POLITICAL_SCIENCE_FACTS,
  PSYCHOLOGY_FACTS,
} from "../daily-facts";
import { SOCIOLOGY_FACTS } from "../daily-sociology";
import { ECONOMICS_TODAY } from "../daily-economics";
import { HISTORY_TODAY } from "../daily-history";
import { ON_THIS_DAY } from "../on-this-day";
import { PHILOSOPHY_TODAY } from "../philosophy-today";
import { PHYSICS_TODAY } from "../daily-physics";
import { PSYCHOLOGY_TODAY } from "../daily-psychology";

// Characterization snapshots: getDailySelected drives the deterministic
// "daily knowledge" surface. These lock its exact output for fixed
// (date, seedOffset) inputs so the getDailySelected refactor cannot silently
// change what users see on any given day.
describe("getDailySelected (characterization)", () => {
  const cases: Array<[string, number]> = [
    ["2026-01-15", 0],
    ["2026-03-14", 0],
    ["2026-03-14", 1],
    ["2026-06-16", 0],
    ["2026-06-16", 2],
    ["2026-12-25", 0],
  ];
  for (const [dateStr, offset] of cases) {
    it(`is stable for ${dateStr} offset ${offset}`, () => {
      const out = getDailySelected(new Date(`${dateStr}T00:00:00`), offset);
      expect(out).toMatchSnapshot();
    });
  }

  it("is deterministic for identical inputs", () => {
    const a = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    const b = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    expect(a).toEqual(b);
  });

  it("changes the selection when the seed offset changes", () => {
    const a = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    const b = getDailySelected(new Date("2026-06-16T00:00:00"), 1);
    expect(a.seed).not.toEqual(b.seed);
  });

  it("surfaces education and anthropology article cards", () => {
    const out = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    expect(out.education.url).toMatch(/^\/education\/[^/]+\/[^/]+$/);
    expect(out.anthropology.url).toMatch(/^\/anthropology\/[^/]+\/[^/]+$/);
  });

  it("uses a cross-domain coincidence as the daily curiosity", () => {
    const out = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    const titles = getAllCuriosities()
      .filter(isCrossDomainCuriosity)
      .map((item) => item.title);
    expect(titles).toContain(out.curiosity.title);
  });
});

describe("seededSelect", () => {
  it("refuses an empty pool instead of returning undefined", () => {
    expect(() => seededSelect([], 1)).toThrow(/empty pool/);
  });
});

const FACT_CATALOGS = [
  MATH_FACTS,
  LIFE_SCIENCE_FACTS,
  COSMOLOGY_FACTS,
  ECONOMICS_FACTS,
  PSYCHOLOGY_FACTS,
  LINGUISTICS_FACTS,
  LAW_FACTS,
  ARTS_FACTS,
  LITERATURE_FACTS,
  RELIGION_FACTS,
  ENGINEERING_FACTS,
  COMPUTER_SCIENCE_FACTS,
  POLITICAL_SCIENCE_FACTS,
  EARTH_SCIENCE_FACTS,
  MEDICINE_FACTS,
  CHEMISTRY_FACTS,
  SOCIOLOGY_FACTS,
  EDUCATION_FACTS,
  ANTHROPOLOGY_FACTS,
] as const;

describe("daily fact article links", () => {
  it("never dumps the reader on a domain homepage", () => {
    const leftover = FACT_CATALOGS.flatMap((catalog) =>
      catalog
        .filter((fact) => /^\/[a-z-]+$/.test(fact.url))
        .map((fact) => `${fact.title} ${fact.url}`)
    );
    expect(leftover).toEqual([]);
  });

  it("points at real routes", () => {
    const valid = buildValidRoutes();
    const broken = FACT_CATALOGS.flatMap((catalog) =>
      catalog.filter((fact) => !valid.has(fact.url)).map((fact) => `${fact.title} → ${fact.url}`)
    );
    expect(broken).toEqual([]);
  });

  it("does not confuse diminishing marginal utility with opportunity cost", () => {
    const fact = ECONOMICS_FACTS.find((f) => f.title === "边际效用递减");
    expect(fact?.url).toBe("/economics/concepts/marginal-analysis");
  });

  it("does not collapse Japanese Children's Day onto the lunar Duanwu date", () => {
    const may = MONTHLY_FACTS["05"] ?? [];
    expect(may.some((line) => line.includes("也叫端午节"))).toBe(false);
  });

  it("homepage daily facts reuse MONTHLY_FACTS instead of a stale duplicate", async () => {
    const { getDailyKnowledge } = await import("../daily-knowledge");
    const knowledge = getDailyKnowledge(new Date(2026, 4, 6));
    expect(knowledge.fact).not.toContain("也叫端午节");
  });

  it("on 5 May names Children's Day without collapsing it onto lunar Duanwu", async () => {
    const { getDailyKnowledge } = await import("../daily-knowledge");
    const knowledge = getDailyKnowledge(new Date(2026, 4, 5));
    expect(knowledge.date).toBe("2026-05-05");
    expect(knowledge.fact).toContain("公历5月5日");
    expect(knowledge.fact).toContain("不是同一天");
    expect(knowledge.fact).not.toContain("也叫端午节");
  });

  it("psychology calendar events that name an experiment resolve", () => {
    const valid = buildValidRoutes();
    const experimentLinks = PSYCHOLOGY_TODAY.filter((e) =>
      e.url.startsWith("/psychology/experiments/")
    );
    const broken = experimentLinks
      .filter((e) => !valid.has(e.url))
      .map((e) => `${e.title} → ${e.url}`);
    expect(experimentLinks.length).toBeGreaterThan(0);
    expect(broken).toEqual([]);
  });

  it("psychology calendar events never dump the reader on the domain home", () => {
    const valid = buildValidRoutes();
    const leftover = PSYCHOLOGY_TODAY.filter((e) => e.url === "/psychology").map(
      (e) => `${e.title} ${e.url}`
    );
    const broken = PSYCHOLOGY_TODAY.filter((e) => !valid.has(e.url)).map(
      (e) => `${e.title} → ${e.url}`
    );
    expect(leftover).toEqual([]);
    expect(broken).toEqual([]);
  });

  it("psychology calendar events never dump the reader on a section list", () => {
    const leftover = PSYCHOLOGY_TODAY.filter(
      (e) => e.url.split("/").filter(Boolean).length < 3
    ).map((e) => `${e.title} ${e.url}`);
    expect(leftover).toEqual([]);
  });

  it("does not send the golden ratio to a Euclidean-geometry article", () => {
    const fact = MATH_FACTS.find((f) => f.title === "黄金比例");
    expect(fact?.url).toBe("/arts/foundations/proportion-and-harmony");
  });

  it("economics calendar events never dump the reader on the domain home", () => {
    const valid = buildValidRoutes();
    const leftover = ECONOMICS_TODAY.filter((e) => e.url === "/economics").map(
      (e) => `${e.title} ${e.url}`
    );
    const broken = ECONOMICS_TODAY.filter((e) => !valid.has(e.url)).map(
      (e) => `${e.title} → ${e.url}`
    );
    expect(leftover).toEqual([]);
    expect(broken).toEqual([]);
  });

  it("physics calendar events never dump the reader on the domain home", () => {
    const valid = buildValidRoutes();
    const leftover = PHYSICS_TODAY.filter((e) => e.url === "/universe-physics").map(
      (e) => `${e.title} ${e.url}`
    );
    const broken = PHYSICS_TODAY.filter((e) => !valid.has(e.url)).map(
      (e) => `${e.title} → ${e.url}`
    );
    expect(leftover).toEqual([]);
    expect(broken).toEqual([]);
  });

  it("on-this-day entries never dump the reader on a domain homepage", () => {
    const valid = buildValidRoutes();
    const leftover = ON_THIS_DAY.filter((e) => /^\/[a-z-]+$/.test(e.url)).map(
      (e) => `${e.title} ${e.url}`
    );
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const broken = ON_THIS_DAY.filter((e) => !resolves(e.url)).map((e) => `${e.title} → ${e.url}`);
    expect(leftover).toEqual([]);
    expect(broken).toEqual([]);
  });

  it("philosophy calendar events resolve and are not all timeline dumps", () => {
    const valid = buildValidRoutes();
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const broken = PHILOSOPHY_TODAY.filter((e) => !resolves(e.url)).map(
      (e) => `${e.title} → ${e.url}`
    );
    const timeline = PHILOSOPHY_TODAY.filter((e) => e.url === "/philosophy/timeline");
    expect(broken).toEqual([]);
    expect(timeline.length).toBeLessThan(PHILOSOPHY_TODAY.length / 2);
  });

  it("resolves calendar figure and event URLs through normalizeRoute", () => {
    const valid = buildValidRoutes();
    const urls = [...HISTORY_TODAY, ...PHILOSOPHY_TODAY]
      .map((e) => e.url)
      .filter(
        (url) =>
          url.startsWith("/human-history/figures/") || url.startsWith("/human-history/events/")
      );
    const broken = [...new Set(urls)].filter((url) => !valid.has(normalizeRoute(url))).sort();
    expect(urls.length).toBeGreaterThan(0);
    expect(broken).toEqual([]);
  });

  it("history calendar deep links resolve when they leave the timeline list", () => {
    const valid = buildValidRoutes();
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const deep = HISTORY_TODAY.filter((e) => e.url !== "/human-history/timeline");
    const broken = deep.filter((e) => !resolves(e.url)).map((e) => `${e.title} → ${e.url}`);
    expect(deep.length).toBeGreaterThan(90);
    expect(broken).toEqual([]);
    expect(HISTORY_TODAY.some((e) => e.url.includes("/tive"))).toBe(false);
  });

  it("does not send February Revolution to October or a timeline dump", () => {
    const event = HISTORY_TODAY.find((e) => e.title === "俄国二月革命");
    expect(event?.url).toBe("/human-history/knowledge/近代--俄罗斯帝国");
  });

  it("sends Tsushima to the Meiji restoration article, not the timeline list", () => {
    const event = HISTORY_TODAY.find((e) => e.title === "对马海战");
    expect(event?.url).toBe("/human-history/knowledge/事件--明治维新");
  });

  it("sends Watergate and Nixon's resignation to political corruption, not the timeline dump", () => {
    const watergate = HISTORY_TODAY.find((e) => e.title === "水门事件");
    const nixon = HISTORY_TODAY.find((e) => e.title === "尼克松辞职");
    expect(watergate?.url).toBe("/political-science/concepts/political-corruption");
    expect(nixon?.url).toBe("/political-science/concepts/political-corruption");
  });
});

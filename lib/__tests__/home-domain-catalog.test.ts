import { describe, expect, it } from "vitest";
import { DOMAINS, STATS } from "@/lib/data";
import { APP_URLS } from "@/lib/urls";

const EXPECTED_DOMAIN_IDS = [
  "universe-physics",
  "cosmology",
  "human-history",
  "philosophy",
  "life-science",
  "mathematics",
  "economics",
  "psychology",
  "computer-science",
  "political-science",
  "earth-science",
  "medicine",
  "chemistry",
  "sociology",
  "linguistics",
];

describe("homepage domain catalog", () => {
  it("publishes every established subject exactly once", () => {
    const domainIds = DOMAINS.map((domain) => domain.id);

    expect(domainIds).toEqual(EXPECTED_DOMAIN_IDS);
    expect(new Set(domainIds).size).toBe(domainIds.length);
  });

  it("derives the displayed subject count from the catalog", () => {
    const subjectStat = STATS.find((stat) => stat.label === "知识领域");

    expect(subjectStat?.value).toBe(DOMAINS.length);
  });

  it("maps every homepage subject to its canonical route", () => {
    for (const domain of DOMAINS) {
      expect(APP_URLS[domain.id]).toBe(`/${domain.id}`);
    }
  });
});

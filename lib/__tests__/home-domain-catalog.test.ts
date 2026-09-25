import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { astrolabeReadouts } from "@/lib/astrolabe";
import { DOMAINS, LATEST_UPDATES } from "@/lib/data";
import { APP_URLS } from "@/lib/urls";

const EXPECTED_DOMAIN_IDS = [
  "universe-physics",
  "cosmology",
  "human-history",
  "religion",
  "anthropology",
  "philosophy",
  "arts",
  "literature",
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
  "law",
  "linguistics",
  "education",
  "engineering",
];

describe("homepage domain catalog", () => {
  it("publishes every established subject exactly once", () => {
    const domainIds = DOMAINS.map((domain) => domain.id);

    expect(domainIds).toEqual(EXPECTED_DOMAIN_IDS);
    expect(new Set(domainIds).size).toBe(domainIds.length);
  });

  it("includes education in the accessibility scan inventory", () => {
    const scan = readFileSync("scripts/a11y-scan.mjs", "utf8");
    expect(scan).toContain('["教育学与学习科学", "/education"');
    expect(scan).toContain("/education/learning-foundations/what-is-learning");
    expect(scan).toContain("/education/spacing-lab");
    expect(scan).toContain("/education/classroom-talk-lab");
    expect(scan).toContain("/education/score-decomposer");
    expect(scan).toContain("/education/adaptive-path-lab");
  });

  it("gives every homepage subject a frontier genre", async () => {
    const { FRONTIER_DOMAINS } = await import("@/lib/frontier");
    expect([...FRONTIER_DOMAINS].sort()).toEqual([...DOMAINS.map((domain) => domain.id)].sort());
  });

  it("gives every frontier domain a list page and an article page", async () => {
    const { existsSync } = await import("node:fs");
    const { FRONTIER_DOMAINS } = await import("@/lib/frontier");
    for (const id of FRONTIER_DOMAINS) {
      expect(existsSync(`app/${id}/frontier/page.tsx`), `${id} frontier list`).toBe(true);
      expect(existsSync(`app/${id}/frontier/[slug]/page.tsx`), `${id} frontier article`).toBe(true);
    }
  });

  it("includes anthropology in the accessibility scan inventory", () => {
    const scan = readFileSync("scripts/a11y-scan.mjs", "utf8");
    expect(scan).toContain('["人类学与考古", "/anthropology"');
    expect(scan).toContain("/anthropology/culture-and-method/what-is-culture");
    expect(scan).toContain("/anthropology/kinship-diagram");
    expect(scan).toContain("/anthropology/material-map");
    expect(scan).toContain("/anthropology/chronology-scale");
    expect(scan).toContain("/anthropology/reciprocity-lab");
  });

  it("includes religion in the accessibility scan inventory", () => {
    const scan = readFileSync("scripts/a11y-scan.mjs", "utf8");
    expect(scan).toContain('["宗教学", "/religion"');
    expect(scan).toContain("/religion/religion-foundations/what-is-religion");
    expect(scan).toContain("/religion/ritual-lab");
    expect(scan).toContain("/religion/world-map");
    expect(scan).toContain("/religion/canon-comparator");
    expect(scan).toContain("/religion/secularization-chart");
    expect(scan).toContain("/philosophy/thinkers/socrates");
    expect(scan).toContain("/universe-physics/dialogues/bohr-heisenberg");
  });

  it("includes launched-subject labs in the accessibility scan inventory", () => {
    const scan = readFileSync("scripts/a11y-scan.mjs", "utf8");
    for (const path of [
      "/literature/narrative-graph",
      "/literature/meter-lab",
      "/literature/world-map",
      "/literature/translation-comparator",
      "/arts/perspective-lab",
      "/arts/detail-comparator",
      "/arts/pigment-profile",
      "/arts/exchange-map",
      "/arts/space-explorer",
      "/engineering/grid-flow",
      "/engineering/structure-lab",
      "/engineering/materials-profile",
      "/engineering/chip-process",
      "/anthropology/kinship-diagram",
      "/anthropology/material-map",
      "/anthropology/chronology-scale",
      "/anthropology/reciprocity-lab",
      "/education/spacing-lab",
      "/education/classroom-talk-lab",
      "/education/score-decomposer",
      "/education/adaptive-path-lab",
    ]) {
      expect(scan, path).toContain(`"${path}"`);
    }
  });

  it("maps every homepage subject to its canonical route", () => {
    for (const domain of DOMAINS) {
      expect(APP_URLS[domain.id]).toBe(`/${domain.id}`);
    }
  });

  it("points every astrolabe spine step at a real article", () => {
    const valid = buildValidRoutes();
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const broken = astrolabeReadouts().flatMap((readout) =>
      readout.steps
        .filter((step) => !resolves(step.url))
        .map((step) => `${readout.domain} → ${step.url}`)
    );
    expect(broken).toEqual([]);
  });

  it("points the visible latest-update cards off domain homepages", () => {
    const valid = buildValidRoutes();
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const visible = LATEST_UPDATES;
    const leftover = visible
      .filter((item) => item.href.split("/").filter(Boolean).length < 3)
      .filter((item) => item.href !== "/curiosities")
      .map((item) => `${item.title} ${item.href}`);
    const broken = visible
      .filter((item) => !resolves(item.href))
      .map((item) => `${item.title} → ${item.href}`);
    expect(leftover).toEqual([]);
    expect(broken).toEqual([]);
  });
});

describe("static sitemap exploration routes", () => {
  it("includes the molecule gallery next to other discovery walls", () => {
    const source = readFileSync("app/sitemap.ts", "utf-8");
    expect(source).toContain('path: "/curiosities"');
    expect(source).toContain('path: "/molecules"');
    expect(source).toContain('path: "/search"');
    expect(source).toContain('path: "/random"');
    expect(source).toContain('path: "/philosophy/tree"');
    expect(source).toContain('path: "/life-science/food-web"');
    expect(source).toContain('path: "/cosmology/stellar-evolution"');
    expect(source).toContain('path: "/mathematics/distributions"');
    expect(source).toContain("lifeScienceKB.getSlugs()");
    expect(source).toContain("lifeSpeciesEntries");
    expect(source).toContain("/life-science/species/");
    expect(source).toContain(
      "`${SITE_URL}/mathematics/knowledge-base/${encodeURIComponent(slug)}`"
    );
    expect(source).toContain(
      "`${SITE_URL}/human-history/knowledge/${encodeURIComponent(article.slug)}`"
    );
    expect(source).toContain('path: "/economics/knowledge-base"');
    expect(source).toContain('path: "/medicine/simulator"');
    expect(source).toContain('path: "/human-history/civilizations"');
    expect(source).toContain("lifeTreeDomainEntries");
    expect(source).toContain("econKnowledgeBaseEntries");
  });
});

describe("cosmology home uses theme tokens for chrome", () => {
  it("does not hardcode a white hover that vanishes in the light theme", () => {
    const source = readFileSync("app/cosmology/page.tsx", "utf-8");
    expect(source).not.toMatch(/hover:bg-white/);
  });
});

describe("daily loading skeleton uses theme tokens", () => {
  it("does not hardcode white pulses that vanish in the light theme", () => {
    const source = readFileSync("app/daily/loading.tsx", "utf-8");
    expect(source).not.toMatch(/bg-white\//);
    expect(source).not.toMatch(/border-white\//);
  });
});

describe("dual-theme loading shells use tokens", () => {
  it("does not hardcode white pulses on philosophy tree and math timeline", () => {
    for (const file of [
      "app/philosophy/tree/loading.tsx",
      "app/mathematics/timeline/loading.tsx",
      "app/economics/simulations/loading.tsx",
    ]) {
      const source = readFileSync(file, "utf-8");
      expect(source, file).not.toMatch(/bg-white/);
    }
  });
});

describe("cosmology tier cards use theme tokens", () => {
  it("does not hardcode white hover or #9ca3af copy", () => {
    const source = readFileSync("subjects/cosmology/components/TierCard.tsx", "utf-8");
    expect(source).not.toMatch(/hover:bg-white/);
    expect(source).not.toMatch(/#9ca3af/);
    expect(source).not.toMatch(/group-hover:text-white/);
  });
});

describe("exploration shells have token error fallbacks", () => {
  it("wires DomainError on random, curiosities, molecules, and search", () => {
    for (const file of [
      "app/random/error.tsx",
      "app/curiosities/error.tsx",
      "app/molecules/error.tsx",
      "app/search/error.tsx",
      "app/knowledge-confluence/[id]/error.tsx",
      "app/universe-physics/experiments/error.tsx",
      "app/universe-physics/physics/error.tsx",
      "app/universe-physics/universe/error.tsx",
    ]) {
      const source = readFileSync(file, "utf-8");
      expect(source, file).toContain("DomainError");
      expect(source, file).not.toContain("error.message");
    }
  });

  it("wires DomainNotFound on exploration 404 shells", () => {
    for (const file of [
      "app/curiosities/not-found.tsx",
      "app/molecules/not-found.tsx",
      "app/search/not-found.tsx",
      "app/read/not-found.tsx",
      "app/random/not-found.tsx",
    ]) {
      const source = readFileSync(file, "utf-8");
      expect(source, file).toContain("DomainNotFound");
    }
  });

  it("wires DomainError on dual-theme visualization pages", () => {
    for (const file of [
      "app/life-science/food-web/error.tsx",
      "app/mathematics/distributions/error.tsx",
      "app/medicine/simulator/error.tsx",
      "app/cosmology/stellar-evolution/error.tsx",
    ]) {
      const source = readFileSync(file, "utf-8");
      expect(source, file).toContain("DomainError");
      expect(source, file).not.toContain("error.message");
    }
  });
});

describe("exploration eyebrows stay in Chinese", () => {
  it("does not print English kickers on read, molecules, or curiosities", () => {
    expect(readFileSync("app/read/page.tsx", "utf-8")).not.toMatch(/reading paths/);
    expect(readFileSync("app/read/layout.tsx", "utf-8")).not.toMatch(/reading paths/);
    expect(readFileSync("app/molecules/page.tsx", "utf-8")).not.toMatch(/Molecule Gallery/);
    expect(readFileSync("components/curiosities/CuriositiesWall.tsx", "utf-8")).not.toMatch(
      /curiosities ·/
    );
    expect(readFileSync("app/curiosities/layout.tsx", "utf-8")).not.toMatch(/curiosities ·/);
  });
});

describe("life-science tree domains are reachable", () => {
  it("registers bacteria, archaea, and eukaryota as valid routes", () => {
    const valid = buildValidRoutes();
    expect(valid.has("/life-science/tree/bacteria")).toBe(true);
    expect(valid.has("/life-science/tree/archaea")).toBe(true);
    expect(valid.has("/life-science/tree/eukaryota")).toBe(true);
  });
});

describe("homepage daily cards label economics and psychology", () => {
  it("does not fall back to the generic 知识 badge", () => {
    const source = readFileSync("components/DailyKnowledgeCard.tsx", "utf-8");
    expect(source).toContain('label: "经济学"');
    expect(source).toContain('label: "心理学"');
  });
});

describe("life-science deep reading uses theme tokens", () => {
  it("does not hardcode white copy that vanishes in the light theme", () => {
    const source = readFileSync("subjects/life-science/components/DeepReading.tsx", "utf-8");
    expect(source).not.toMatch(/text-white/);
    expect(source).not.toMatch(/border-white/);
  });
});

describe("homepage cards use theme tokens", () => {
  it("borders every card with a token that survives both themes", () => {
    const source = readFileSync("components/portal/portal.css", "utf-8");
    expect(source).toMatch(/\.domain-card \{[^}]*border: 1px solid var\(--color-border-subtle\)/);
    expect(source).not.toMatch(/#fff\b|:\s*white\b/);
  });
});

describe("cosmology dual-theme pages use tokens", () => {
  it("does not hardcode gray-400 copy on the timeline or stellar evolution pages", () => {
    for (const file of [
      "app/cosmology/timeline/page.tsx",
      "app/cosmology/stellar-evolution/page.tsx",
    ]) {
      const source = readFileSync(file, "utf-8");
      expect(source, file).not.toMatch(/text-\[#a8adbd\]/);
      expect(source, file).not.toMatch(/bg-white\/\[/);
    }
  });
});

describe("physics experiments loading uses tokens", () => {
  it("does not pulse with a near-invisible blue wash", () => {
    const source = readFileSync("app/universe-physics/experiments/loading.tsx", "utf-8");
    expect(source).not.toMatch(/bg-blue-500/);
    expect(source).not.toMatch(/bg-white/);
  });
});

describe("dual-theme visualizations use tokens for chrome", () => {
  it("does not hardcode white fills on the memory curve or decision matrix", () => {
    for (const file of [
      "subjects/psychology/components/visualizations/MemoryCurve.tsx",
      "subjects/psychology/components/visualizations/DecisionMatrix.tsx",
      "subjects/mathematics/components/visualizations/FractalExplorer.tsx",
    ]) {
      const source = readFileSync(file, "utf-8");
      expect(source, file).not.toMatch(/bg-white/);
      expect(source, file).not.toMatch(/text-white/);
      expect(source, file).not.toMatch(/rgba\(255,\s*255,\s*255/);
    }
  });
});

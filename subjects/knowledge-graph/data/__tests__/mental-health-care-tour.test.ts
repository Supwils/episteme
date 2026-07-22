import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURED_KNOWLEDGE_TOURS } from "@/lib/featured-knowledge-tours";
import { ALL_EDGES, ALL_NODES } from "../graph-data";
import { MENTAL_HEALTH_CARE_TOUR } from "../mental-health-care-tour";

const articlePaths = {
  psychology: "content/psychology/disorders/major-depressive.mdx",
  risk: "content/psychology/knowledge-base/risk-perception-and-macro-decisions.mdx",
  sociology: "content/sociology/concepts/social-support-mental-health.mdx",
  medicine: "content/medicine/public-health/community-mental-health-access-continuity.mdx",
  consent: "content/medicine/concepts/informed-consent.mdx",
} as const;

const readArticle = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const cjkLength = (source: string) => source.match(/[\u3400-\u9fff]/g)?.length ?? 0;

describe("mental health care evidence route", () => {
  it("keeps the homepage entry aligned with the real tour", () => {
    const featured = FEATURED_KNOWLEDGE_TOURS.find(
      (candidate) => candidate.id === MENTAL_HEALTH_CARE_TOUR.id
    );

    expect(featured).toBeDefined();
    expect(featured?.href).toContain(`tourId=${MENTAL_HEALTH_CARE_TOUR.id}`);
    expect(featured?.href).toContain("layout=spatial");
    expect(featured?.labHref).toBe("/medicine/mental-health-access");
  });

  it("keeps every waypoint article-addressable", () => {
    const nodes = new Map(ALL_NODES.map((node) => [node.id, node]));

    for (const waypoint of MENTAL_HEALTH_CARE_TOUR.waypoints) {
      const node = nodes.get(waypoint);
      expect(node, `missing node ${waypoint}`).toBeDefined();
      expect(node?.url, `missing article URL for ${waypoint}`).toMatch(/^\//);
    }
  });

  it("uses a direct evidence relation between every consecutive step", () => {
    for (let index = 0; index < MENTAL_HEALTH_CARE_TOUR.waypoints.length - 1; index++) {
      const source = MENTAL_HEALTH_CARE_TOUR.waypoints[index]!;
      const target = MENTAL_HEALTH_CARE_TOUR.waypoints[index + 1]!;
      const edge = ALL_EDGES.find(
        (candidate) =>
          (candidate.source === source && candidate.target === target) ||
          (candidate.source === target && candidate.target === source)
      );

      expect(edge, `missing direct edge ${source} -> ${target}`).toBeDefined();
      expect(edge?.label?.trim().length, `missing relation label ${source} -> ${target}`).toBeGreaterThan(
        0
      );
    }
  });

  it("keeps the new and revised articles substantive", () => {
    expect(cjkLength(readArticle(articlePaths.psychology))).toBeGreaterThanOrEqual(2200);
    expect(cjkLength(readArticle(articlePaths.risk))).toBeGreaterThanOrEqual(1800);
    expect(cjkLength(readArticle(articlePaths.sociology))).toBeGreaterThanOrEqual(2200);
    expect(cjkLength(readArticle(articlePaths.medicine))).toBeGreaterThanOrEqual(2600);
    expect(cjkLength(readArticle(articlePaths.consent))).toBeGreaterThanOrEqual(2200);
  });

  it("guards corrected claims and modern consent framing", () => {
    const depression = readArticle(articlePaths.psychology);
    const consent = readArticle(articlePaths.consent);

    expect(depression).not.toContain("全球超过2.8亿");
    expect(depression).not.toContain("自杀风险是一般人群的20倍");
    expect(depression).not.toContain("累计缓解率约为67%");
    expect(depression).toContain("筛查不是诊断");
    expect(consent).toContain("2024 年最新修订");
    expect(consent).toContain("决定能力是具体的、可变化的");
    expect(consent).toContain("支持性决策");
    expect(readArticle(articlePaths.medicine)).toContain("/medicine/mental-health-access");
  });
});

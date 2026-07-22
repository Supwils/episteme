import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURED_KNOWLEDGE_TOURS } from "@/lib/featured-knowledge-tours";
import { ADOLESCENT_MENTAL_HEALTH_TOUR } from "../adolescent-mental-health-tour";
import { ALL_EDGES, ALL_NODES } from "../graph-data";

const articlePaths = {
  sleep: "content/psychology/knowledge-base/sleep-and-mind.mdx",
  socialMedia: "content/psychology/frontier/social-media-teen-mental-health.md",
  schoolCommunity:
    "content/medicine/public-health/adolescent-mental-health-school-community-services.mdx",
} as const;

const readArticle = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const cjkLength = (source: string) => source.match(/[\u3400-\u9fff]/g)?.length ?? 0;

describe("adolescent mental health evidence route", () => {
  it("keeps the homepage entry aligned with the real tour", () => {
    const featured = FEATURED_KNOWLEDGE_TOURS.find(
      (candidate) => candidate.id === ADOLESCENT_MENTAL_HEALTH_TOUR.id
    );

    expect(featured).toBeDefined();
    expect(featured?.href).toContain(`tourId=${ADOLESCENT_MENTAL_HEALTH_TOUR.id}`);
    expect(featured?.href).toContain("layout=spatial");
  });

  it("keeps every step aligned and article-addressable", () => {
    const nodes = new Map(ALL_NODES.map((node) => [node.id, node]));

    expect(ADOLESCENT_MENTAL_HEALTH_TOUR.steps).toHaveLength(
      ADOLESCENT_MENTAL_HEALTH_TOUR.waypoints.length
    );
    for (const waypoint of ADOLESCENT_MENTAL_HEALTH_TOUR.waypoints) {
      const node = nodes.get(waypoint);
      expect(node, `missing node ${waypoint}`).toBeDefined();
      expect(node?.url, `missing article URL for ${waypoint}`).toMatch(/^\//);
    }
  });

  it("uses a labeled direct relation between every consecutive step", () => {
    for (
      let index = 0;
      index < ADOLESCENT_MENTAL_HEALTH_TOUR.waypoints.length - 1;
      index++
    ) {
      const source = ADOLESCENT_MENTAL_HEALTH_TOUR.waypoints[index]!;
      const target = ADOLESCENT_MENTAL_HEALTH_TOUR.waypoints[index + 1]!;
      const edge = ALL_EDGES.find(
        (candidate) =>
          (candidate.source === source && candidate.target === target) ||
          (candidate.source === target && candidate.target === source)
      );

      expect(edge, `missing direct edge ${source} -> ${target}`).toBeDefined();
      expect(
        edge?.label?.trim().length,
        `missing relation label ${source} -> ${target}`
      ).toBeGreaterThan(0);
    }
  });

  it("keeps the revised and new articles substantive", () => {
    expect(cjkLength(readArticle(articlePaths.sleep))).toBeGreaterThanOrEqual(1800);
    expect(cjkLength(readArticle(articlePaths.socialMedia))).toBeGreaterThanOrEqual(2200);
    expect(cjkLength(readArticle(articlePaths.schoolCommunity))).toBeGreaterThanOrEqual(2200);
  });

  it("guards the corrected evidence boundaries", () => {
    const sleep = readArticle(articlePaths.sleep);
    const socialMedia = readArticle(articlePaths.socialMedia);
    const schoolCommunity = readArticle(articlePaths.schoolCommunity);

    expect(sleep).not.toContain("清除代谢废物的效率比清醒时提高 60%");
    expect(sleep).not.toContain("睡眠债务不能简单地通过周末补觉来偿还");
    expect(sleep).not.toContain("夜间情绪疗愈");
    expect(sleep).toContain("两套过程共同塑造睡眠");
    expect(socialMedia).not.toContain("分歧完全来自");
    expect(socialMedia).not.toContain("JAMA Pediatrics 或");
    expect(socialMedia).toContain("平均关联也不能直接预测");
    expect(schoolCommunity).toContain("筛查只能产生一个需要进一步理解的信号");
    expect(schoolCommunity).toContain("支持性决策");
  });
});

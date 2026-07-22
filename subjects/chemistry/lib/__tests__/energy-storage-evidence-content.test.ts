import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { THOUGHT_TOURS } from "@/subjects/knowledge-graph/data/thought-tours";
import { ALL_EDGES, ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";

const readDomainContent = (domain: string, relativePath: string) =>
  readFileSync(join(process.cwd(), "content", domain, relativePath), "utf8");

const reviewedPages = {
  electrochemistry: readDomainContent("chemistry", "concepts/electrochemistry.mdx"),
  batteryEvidence: readDomainContent(
    "chemistry",
    "concepts/battery-performance-safety-and-circularity.mdx"
  ),
  beyondLithium: readDomainContent("chemistry", "frontier/beyond-lithium-batteries.md"),
  criticalMinerals: readDomainContent(
    "earth-science",
    "concepts/mineral-resources-and-critical-metals.mdx"
  ),
};

const countCjkChars = (value: string) => value.match(/\p{Script=Han}/gu)?.length ?? 0;
const graphNodeIds = new Set(ALL_NODES.map((node) => node.id));
const edgeKeys = new Set(ALL_EDGES.map((edge) => `${edge.source}->${edge.target}`));

describe("energy storage evidence chain", () => {
  it("keeps every reviewed page substantial and current", () => {
    for (const page of Object.values(reviewedPages)) {
      expect(page).toContain("updated: 2026-07-18");
      expect(countCjkChars(page)).toBeGreaterThan(2_500);
    }
  });

  it("separates electrochemical potential, working voltage, energy, and power", () => {
    expect(reviewedPages.electrochemistry).toContain("ΔG = -n F E");
    expect(reviewedPages.electrochemistry).toContain("能斯特方程");
    expect(reviewedPages.electrochemistry).toContain("开路电压不是工作电压");
    expect(reviewedPages.electrochemistry).toContain("∫V dQ");
    expect(reviewedPages.electrochemistry).toContain("阳极发生氧化");
  });

  it("audits battery claims from electrode conditions through circularity", () => {
    expect(reviewedPages.batteryEvidence).toContain("面载量");
    expect(reviewedPages.batteryEvidence).toContain("库仑效率与能量效率不能互换");
    expect(reviewedPages.batteryEvidence).toContain("单体通过某项滥用测试");
    expect(reviewedPages.batteryEvidence).toContain("火法冶金");
    expect(reviewedPages.batteryEvidence).toContain("湿法冶金");
    expect(reviewedPages.batteryEvidence).toContain("直接回收");
    expect(reviewedPages.batteryEvidence).toContain("回收率有多个分母");
  });

  it("treats next-generation chemistry as a scenario-specific manufacturing choice", () => {
    expect(reviewedPages.beyondLithium).toContain("技术路线不是一场只有一个冠军的竞赛");
    expect(reviewedPages.beyondLithium).toContain("比较前先统一尺度");
    expect(reviewedPages.beyondLithium).toContain("制造良率是被忽视的科学变量");
    expect(reviewedPages.beyondLithium).toContain("企业量产年份是计划");
    expect(reviewedPages.beyondLithium).not.toContain("已量产（储能/入门车）");
  });

  it("connects chemistry substitution to real mineral and processing constraints", () => {
    expect(reviewedPages.criticalMinerals).toContain("替代路线不会自动消除关键性");
    expect(reviewedPages.criticalMinerals).toContain("回收设施公布的处理能力");
    expect(graphNodeIds.has("earth-science:mineral-resources-and-critical-metals")).toBe(true);
    expect(
      edgeKeys.has(
        "chemistry:beyond-lithium-batteries->earth-science:mineral-resources-and-critical-metals"
      )
    ).toBe(true);
    expect(
      edgeKeys.has(
        "earth-science:mineral-resources-and-critical-metals->economics:commodity-exporters-macro-diagnosis-2026"
      )
    ).toBe(true);
  });

  it("publishes a nine-step explained route with article-backed waypoints", () => {
    const route = THOUGHT_TOURS.find(
      (tour) => tour.id === "from-electron-to-circular-energy-storage"
    );
    expect(route?.waypoints).toHaveLength(9);
    expect(route?.steps).toHaveLength(9);
    expect(route?.waypoints[0]).toBe("chemistry:chemical-thermodynamics");
    expect(route?.waypoints[2]).toBe(
      "chemistry:battery-performance-safety-and-circularity"
    );
    expect(route?.waypoints[6]).toBe(
      "earth-science:mineral-resources-and-critical-metals"
    );
    expect(route?.waypoints.at(-1)).toBe("chemistry:green-chemistry");
  });
});

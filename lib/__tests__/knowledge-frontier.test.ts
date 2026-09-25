import { describe, expect, it } from "vitest";
import {
  buildKnowledgeFrontierOverview,
  buildKnowledgeFrontierSnapshot,
  type KnowledgeFrontierNodeInput,
} from "../knowledge-frontier";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { buildKnowledgeFrontierView } from "../knowledge-frontier-catalog";
import { buildKnowledgeCoverageSnapshot } from "../knowledge-continuum-coverage";

// One diverse L1 start per established subject — derived so a new subject
// launch does not require re-typing the count here.
const ESTABLISHED_DOMAIN_COUNT = buildKnowledgeCoverageSnapshot().domains.length;

const nodes: KnowledgeFrontierNodeInput[] = [
  {
    id: "root",
    label: "观察入口",
    domain: "physics",
    knowledgeLevel: 1,
    knowledgeLevelSource: "curated",
    prerequisiteIds: [],
  },
  {
    id: "concept",
    label: "基础概念",
    domain: "physics",
    knowledgeLevel: 2,
    knowledgeLevelSource: "curated",
    prerequisiteIds: ["root"],
  },
  {
    id: "method",
    label: "研究方法",
    domain: "physics",
    knowledgeLevel: 3,
    knowledgeLevelSource: "curated",
    prerequisiteIds: ["concept"],
  },
  {
    id: "orphan",
    label: "缺少锚点的高阶节点",
    domain: "physics",
    knowledgeLevel: 3,
    knowledgeLevelSource: "inferred",
    prerequisiteIds: [],
  },
];

describe("knowledge frontier", () => {
  it("treats only L1 nodes without prerequisites as natural entries", () => {
    const snapshot = buildKnowledgeFrontierSnapshot(nodes, []);
    expect(snapshot.states.get("root")?.status).toBe("ready");
    expect(snapshot.states.get("concept")?.status).toBe("blocked");
    expect(snapshot.states.get("orphan")).toMatchObject({
      status: "blocked",
      metadataGap: true,
      gapIds: [],
    });
    expect(snapshot.summary).toMatchObject({
      nodeCount: 4,
      masteredCount: 0,
      readyCount: 1,
      blockedCount: 3,
      metadataGapCount: 1,
    });
  });

  it("opens the next node and exposes a transitive minimum gap", () => {
    const snapshot = buildKnowledgeFrontierSnapshot(nodes, ["root"]);
    expect(snapshot.states.get("root")?.status).toBe("mastered");
    expect(snapshot.states.get("concept")?.status).toBe("ready");
    expect(snapshot.states.get("method")).toMatchObject({
      status: "blocked",
      missingPrerequisiteIds: ["concept"],
      gapIds: ["concept"],
    });
  });

  it("never infers mastery for omitted prerequisites", () => {
    const snapshot = buildKnowledgeFrontierSnapshot(nodes, ["concept"]);
    expect(snapshot.states.get("root")?.status).toBe("ready");
    expect(snapshot.states.get("concept")?.status).toBe("mastered");
    expect(snapshot.states.get("method")?.status).toBe("ready");
    expect(snapshot.summary.masteredCount).toBe(1);
  });

  it("ignores unknown profile IDs without losing graph accounting", () => {
    const snapshot = buildKnowledgeFrontierSnapshot(nodes, ["root", "missing"]);
    expect(snapshot.summary.validKnownCount).toBe(1);
    expect(snapshot.summary.ignoredKnownCount).toBe(1);
    expect(
      snapshot.summary.masteredCount + snapshot.summary.readyCount + snapshot.summary.blockedCount
    ).toBe(nodes.length);
  });

  it("covers the real graph with diverse L1 starts and L5 confluences", () => {
    const view = buildKnowledgeFrontierView([], { status: "ready", limit: 24 });
    expect(view.summary.nodeCount).toBeGreaterThan(1300);
    expect(view.summary.masteredCount + view.summary.readyCount + view.summary.blockedCount).toBe(
      view.summary.nodeCount
    );
    expect(view.recommendations).toHaveLength(ESTABLISHED_DOMAIN_COUNT);
    expect(new Set(view.recommendations.map((result) => result.domainId)).size).toBe(
      ESTABLISHED_DOMAIN_COUNT
    );
    expect(view.recommendations.every((result) => result.level === 1)).toBe(true);
    expect(view.summary.metadataGapCount).toBe(0);
    expect(view.confluences).toHaveLength(5);
    expect(view.confluences.every((confluence) => confluence.prerequisiteCount === 16)).toBe(true);
  });
});

describe("knowledge frontier overview", () => {
  // The graph mounts with the overview and describes only the selected node, so
  // it must agree with the full snapshot the API routes serve, node for node.
  it.each([
    ["no profile", [] as string[]],
    ["a sparse profile", ALL_NODES.filter((_, i) => i % 7 === 0).map((node) => node.id)],
    ["a dense profile", ALL_NODES.filter((_, i) => i % 3 === 0).map((node) => node.id)],
  ])("matches the full snapshot on the real graph with %s", (_label, known) => {
    const snapshot = buildKnowledgeFrontierSnapshot(ALL_NODES, known);
    const overview = buildKnowledgeFrontierOverview(ALL_NODES, known);
    expect(overview.summary).toEqual(snapshot.summary);
    for (const [id, state] of snapshot.states) {
      expect(overview.statuses.get(id), id).toBe(state.status);
    }
    for (const id of ALL_NODES.filter((_, i) => i % 50 === 0).map((node) => node.id)) {
      expect(overview.describe(id), id).toEqual(snapshot.states.get(id));
    }
    expect(overview.describe("missing:node")).toBeUndefined();
  });
});

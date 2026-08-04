import { describe, expect, it } from "vitest";
import graphSnapshot from "@/subjects/knowledge-graph/data/aggregate-snapshot.json";
import { GET } from "@/app/api/learning-targets/route";
import {
  buildKnowledgeBranchCatalog,
  searchKnowledgeBranchTargets,
} from "@/lib/knowledge-branch-catalog";

describe("learning target API", () => {
  it("returns compact search results and full attachment details on demand", async () => {
    const searchResponse = await GET(
      new Request("https://episteme.test/api/learning-targets?q=AI%20%E4%BC%A6%E7%90%86")
    );
    expect(searchResponse.status).toBe(200);
    const search = (await searchResponse.json()) as {
      summary: { nodeCount: number };
      results: { id: string; distance: number; candidateCount: number }[];
    };
    expect(search.summary.nodeCount).toBe(graphSnapshot.branch.nodeCount);
    // candidateCount 随正文跨域链接增减而变（等距候选数），只断言 id 与距离
    expect(search.results[0]).toMatchObject({
      id: "philosophy:ai-ethics",
      distance: 1,
    });
    expect(search.results).toHaveLength(1);

    const detailResponse = await GET(
      new Request("https://episteme.test/api/learning-targets?id=philosophy%3Aai-ethics")
    );
    const detail = (await detailResponse.json()) as {
      target: { anchorNodeId: string; branchPath: unknown[]; anchorCandidates: unknown[] };
    };
    // 锚点在等距候选间由 tie-break 决定、且候选 top-3 封顶（见 knowledge-branch.test.ts），
    // 故只断言语义边目标之一仍在候选中。
    const candidates = (detail.target.anchorCandidates as Array<{ anchorNodeId: string }>).map(
      (candidate) => candidate.anchorNodeId
    );
    expect(
      candidates.includes("computer-science:ai-interpretability") ||
        candidates.includes("arts:generative-art-and-ai")
    ).toBe(true);
    expect(detail.target.branchPath).toHaveLength(2);
  });

  it("filters aggregate terrain selections and rejects malformed filters", async () => {
    // Never assert that a specific (domain, level, confidence) cell is
    // non-empty: cross-domain link edits shift nodes between confidence
    // buckets (on 2026-07-27 every sociology L4 contextual node became
    // direct, emptying that cell and breaking the previous version of this
    // test). The intent is "filter parameters take effect", so assert
    // whole-set properties instead: the API returns exactly the rows the
    // same filter yields on the local catalog (an ignored or broken filter
    // fails this regardless of whether the chosen cell happens to be
    // empty), every returned row matches the filter, and the filtered set
    // is narrower than the unfiltered catalog.
    const catalog = buildKnowledgeBranchCatalog();
    const expected = searchKnowledgeBranchTargets(catalog, "", 20, {
      domainId: "sociology",
      level: 4,
      confidence: "direct",
    });

    const response = await GET(
      new Request(
        "https://episteme.test/api/learning-targets?domain=sociology&level=4&confidence=direct"
      )
    );
    const data = (await response.json()) as {
      summary: { nodeCount: number };
      results: { id: string; domainLabel: string; level: number; confidence: string }[];
    };
    expect(response.status).toBe(200);
    expect(data.results.map((result) => result.id)).toEqual(expected.map((target) => target.id));
    expect(data.results.length).toBeLessThan(data.summary.nodeCount);
    expect(
      data.results.every(
        (result) =>
          result.domainLabel === "社会学" && result.level === 4 && result.confidence === "direct"
      )
    ).toBe(true);

    const invalid = await GET(
      new Request("https://episteme.test/api/learning-targets?domain=unknown&level=9")
    );
    expect(invalid.status).toBe(400);
  });

  it("rejects an unknown target with a clear 404", async () => {
    const response = await GET(
      new Request("https://episteme.test/api/learning-targets?id=missing-node")
    );
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Unknown knowledge target" });
  });
});

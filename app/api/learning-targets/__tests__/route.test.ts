import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/learning-targets/route";

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
    expect(search.summary.nodeCount).toBe(1381);
    expect(search.results[0]).toMatchObject({
      id: "philosophy:ai-ethics",
      distance: 1,
      candidateCount: 1,
    });
    expect(search.results).toHaveLength(1);

    const detailResponse = await GET(
      new Request("https://episteme.test/api/learning-targets?id=philosophy%3Aai-ethics")
    );
    const detail = (await detailResponse.json()) as {
      target: { anchorNodeId: string; branchPath: unknown[]; anchorCandidates: unknown[] };
    };
    expect(detail.target.anchorNodeId).toBe("computer-science:ai-interpretability");
    expect(detail.target.branchPath).toHaveLength(2);
    expect(detail.target.anchorCandidates).toHaveLength(1);
  });

  it("filters aggregate terrain selections and rejects malformed filters", async () => {
    const response = await GET(
      new Request(
        "https://episteme.test/api/learning-targets?domain=sociology&level=4&confidence=contextual"
      )
    );
    const data = (await response.json()) as {
      results: { domainLabel: string; level: number; confidence: string }[];
    };
    expect(response.status).toBe(200);
    expect(data.results.length).toBeGreaterThan(0);
    expect(
      data.results.every(
        (result) =>
          result.domainLabel === "社会学" &&
          result.level === 4 &&
          result.confidence === "contextual"
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

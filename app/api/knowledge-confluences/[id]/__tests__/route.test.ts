import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/knowledge-confluences/[id]/route";

function getConfluence(id: string) {
  return GET(new Request(`https://episteme.test/api/knowledge-confluences/${id}`), {
    params: Promise.resolve({ id }),
  });
}

describe("knowledge confluence API", () => {
  it("returns one complete, cacheable confluence on demand", async () => {
    const response = await getConfluence("urban-climate-adaptation");
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=3600, stale-while-revalidate=86400"
    );
    expect(response.headers.get("x-content-strategy")).toBe("on-demand");

    const payload = (await response.json()) as {
      confluence: {
        id: string;
        nodeCount: number;
        strands: { steps: unknown[]; evidence: { sources: unknown[] } }[];
      };
    };
    expect(payload.confluence.id).toBe("urban-climate-adaptation");
    expect(payload.confluence.nodeCount).toBe(17);
    expect(payload.confluence.strands).toHaveLength(4);
    expect(payload.confluence.strands.every((strand) => strand.steps.length === 4)).toBe(true);
    expect(payload.confluence.strands.every((strand) => strand.evidence.sources.length > 0)).toBe(
      true
    );
  });

  it("rejects an unknown confluence without returning fallback content", async () => {
    const response = await getConfluence("missing-topic");
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Unknown knowledge confluence" });
  });
});

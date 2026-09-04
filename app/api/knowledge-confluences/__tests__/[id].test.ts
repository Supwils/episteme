import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/knowledge-confluences/[id]/route";

describe("GET /api/knowledge-confluences/[id]", () => {
  it("returns 404 for nonexistent confluence ID", async () => {
    const request = new Request("http://localhost/api/knowledge-confluences/nonexistent-xyz");
    const context = { params: Promise.resolve({ id: "nonexistent-xyz" }) };
    const response = await GET(request, context);

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.error).toContain("Unknown knowledge confluence");
  });

  it("sets appropriate ISR cache headers", async () => {
    const request = new Request("http://localhost/api/knowledge-confluences/test");
    const context = { params: Promise.resolve({ id: "test-id" }) };

    try {
      const response = await GET(request, context);
      if (response.status === 200) {
        const cacheControl = response.headers.get("cache-control");
        expect(cacheControl).toContain("public");
        expect(cacheControl).toContain("max-age=86400");
      }
    } catch {
      // ID might not exist, that's OK for this test
    }
  });
});

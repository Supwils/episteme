import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/learning-targets/route";

describe("GET /api/learning-targets", () => {
  it("returns catalog for empty filter", async () => {
    const request = new Request("http://localhost/api/learning-targets");
    const response = await GET(request);
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("summary");
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBe(true);
  });

  it("returns 404 for nonexistent target ID", async () => {
    const request = new Request("http://localhost/api/learning-targets?id=nonexistent-xyz-123");
    const response = await GET(request);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.error).toContain("Unknown knowledge target");
  });

  it("returns 400 for invalid domain filter", async () => {
    const request = new Request("http://localhost/api/learning-targets?domain=invalid-domain");
    const response = await GET(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Invalid knowledge target filter");
  });

  it("returns 400 for invalid level filter", async () => {
    const request = new Request("http://localhost/api/learning-targets?level=invalid");
    const response = await GET(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid confidence filter", async () => {
    const request = new Request("http://localhost/api/learning-targets?confidence=invalid");
    const response = await GET(request);
    expect(response.status).toBe(400);
  });

  it("sets appropriate cache headers", async () => {
    const request = new Request("http://localhost/api/learning-targets");
    const response = await GET(request);

    const cacheControl = response.headers.get("cache-control");
    expect(cacheControl).toContain("public");
    expect(cacheControl).toContain("max-age=3600");
    expect(cacheControl).toContain("stale-while-revalidate=86400");
  });

  it("handles search query parameter", async () => {
    const request = new Request("http://localhost/api/learning-targets?q=quantum&domain=physics");
    const response = await GET(request);
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("results");
  });

  it("does not leak secrets or internal env vars", async () => {
    const request = new Request("http://localhost/api/learning-targets");
    const response = await GET(request);
    const body = await response.json();

    const bodyStr = JSON.stringify(body);
    // Ensure no env vars or secrets leak
    expect(bodyStr).not.toMatch(/VERCEL_TOKEN/);
    expect(bodyStr).not.toMatch(/NODE_ENV/);
    expect(bodyStr).not.toMatch(/process\.env/);
  });
});

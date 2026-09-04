import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/search/route";

describe("/api/search", () => {
  it("should return search results with request ID", async () => {
    const request = new Request("http://localhost/api/search?q=physics&limit=5");
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBeDefined();
    expect(response.headers.get("cache-control")).toContain("public");

    const data = await response.json();
    expect(data).toHaveProperty("query", "physics");
    expect(data).toHaveProperty("hits");
    expect(Array.isArray(data.hits)).toBe(true);
  });

  it("should echo incoming x-request-id header", async () => {
    const request = new Request("http://localhost/api/search?q=test", {
      headers: { "x-request-id": "custom-123" },
    });
    const response = await GET(request);

    expect(response.headers.get("x-request-id")).toBe("custom-123");
  });

  it("should apply rate limiting after many requests", async () => {
    const clientIp = "10.0.0.1";
    const requests: Promise<Response>[] = [];

    // Send 70 requests (capacity is 60)
    for (let i = 0; i < 70; i++) {
      const request = new Request("http://localhost/api/search?q=test", {
        headers: { "x-real-ip": clientIp },
      });
      requests.push(GET(request));
    }

    const responses = await Promise.all(requests);
    const rateLimited = responses.filter((r) => r.status === 429);

    expect(rateLimited.length).toBeGreaterThan(0);
    const limitedResponse = rateLimited[0];
    expect(limitedResponse?.headers.get("retry-after")).toBeDefined();
    expect(limitedResponse?.headers.get("x-request-id")).toBeDefined();
  });

  it("should handle query parameter edge cases", async () => {
    const request = new Request("http://localhost/api/search?q=&limit=abc");
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.query).toBe("");
  });

  it("should truncate long queries", async () => {
    const longQuery = "a".repeat(200);
    const request = new Request(`http://localhost/api/search?q=${longQuery}`);
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.query.length).toBeLessThanOrEqual(120);
  });
});

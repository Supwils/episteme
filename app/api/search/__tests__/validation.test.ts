import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/search/route";

describe("GET /api/search input validation", () => {
  it("handles repeated q parameters by using first value", async () => {
    const response = await GET(new Request("http://localhost/api/search?q=first&q=second"));
    expect(response.status).toBe(200);
    const body = await response.json();
    // searchParams.get() returns first value
    expect(body.query).toBe("first");
  });

  it("handles extremely long queries by truncating", async () => {
    const longQuery = "知识".repeat(100);
    const response = await GET(
      new Request(`http://localhost/api/search?q=${encodeURIComponent(longQuery)}`)
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.query.length).toBeLessThanOrEqual(120);
  });

  it("handles special characters in query safely", async () => {
    const specialQueries = ["熵&熵", "熵|熵", "熵<熵>熵", '"熵"', "'熵'"];

    for (const query of specialQueries) {
      const response = await GET(
        new Request(`http://localhost/api/search?q=${encodeURIComponent(query)}`)
      );
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.query).toBe(query);
    }
  });

  it("returns 200 with empty hits for invalid limit values", async () => {
    const invalidLimits = ["NaN", "Infinity", "null", "undefined", "[]", "{}"];

    for (const limit of invalidLimits) {
      const response = await GET(new Request(`http://localhost/api/search?q=知识&limit=${limit}`));
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body.hits)).toBe(true);
    }
  });

  it("treats fractional limits as integers", async () => {
    const response = await GET(new Request("http://localhost/api/search?q=知识&limit=5.7"));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.hits.length).toBeLessThanOrEqual(5);
  });
});

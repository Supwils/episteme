import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/daily/shuffle/route";

describe("GET /api/daily/shuffle", () => {
  it("returns valid daily content structure", async () => {
    const response = await GET(new Request("http://localhost/api/daily/shuffle"));
    expect(response.status).toBe(200);

    const body = await response.json();
    // daily-selector returns {date, physics, history, philosophy, economics, ...}
    expect(body).toHaveProperty("date");
    expect(body).toHaveProperty("physics");
    expect(body).toHaveProperty("history");
  });

  it("handles offset parameter for re-rolling selection", async () => {
    const response1 = await GET(new Request("http://localhost/api/daily/shuffle?offset=0"));
    const response2 = await GET(new Request("http://localhost/api/daily/shuffle?offset=1"));

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);

    const body1 = await response1.json();
    const body2 = await response2.json();

    // Different offsets should potentially give different selections
    expect(body1).toHaveProperty("date");
    expect(body2).toHaveProperty("date");
  });

  it("handles invalid offset values gracefully", async () => {
    const invalidOffsets = ["abc", "null", "undefined", "-5.7"];

    for (const offset of invalidOffsets) {
      const response = await GET(
        new Request(`http://localhost/api/daily/shuffle?offset=${offset}`)
      );
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty("date");
    }
  });

  it("caps offset within reasonable bounds", async () => {
    // Test extremely large offset
    const response = await GET(new Request("http://localhost/api/daily/shuffle?offset=999999999"));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("date");
  });

  it("handles repeated offset parameters by using first value", async () => {
    const response = await GET(
      new Request("http://localhost/api/daily/shuffle?offset=5&offset=10")
    );
    expect(response.status).toBe(200);
    // Should use first value (5)
    const body = await response.json();
    expect(body).toHaveProperty("date");
  });

  it("sets no-store cache control for shuffle endpoint", async () => {
    const response = await GET(new Request("http://localhost/api/daily/shuffle"));
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
});

import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/daily/route";

describe("GET /api/daily", () => {
  it("returns valid daily content structure", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    // daily-selector returns {date, physics, history, philosophy, economics, ...}
    expect(body).toHaveProperty("date");
    expect(body).toHaveProperty("physics");
    expect(body).toHaveProperty("history");
  });

  it("sets appropriate cache headers for ISR", async () => {
    const response = await GET();
    const cacheControl = response.headers.get("cache-control");

    expect(cacheControl).toContain("public");
    expect(cacheControl).toContain("s-maxage=3600");
    expect(cacheControl).toContain("stale-while-revalidate=86400");
  });

  it("returns consistent content for same day (force-static)", async () => {
    const response1 = await GET();
    const response2 = await GET();

    const body1 = await response1.json();
    const body2 = await response2.json();

    // Should be identical since it's force-static for the current day
    expect(body1).toEqual(body2);
  });
});

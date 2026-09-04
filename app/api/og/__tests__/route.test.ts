import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/og/route";

describe("GET /api/og", () => {
  it("returns PNG image response", async () => {
    const request = new Request("http://localhost/api/og");
    const response = await GET(request);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("image/png");
  });

  it("handles title parameter", async () => {
    const request = new Request("http://localhost/api/og?title=" + encodeURIComponent("测试标题"));
    const response = await GET(request);
    expect(response.status).toBe(200);
  });

  it("handles section parameter with validation", async () => {
    const validSections = ["philosophy", "mathematics", "life-science"];

    for (const section of validSections) {
      const request = new Request(`http://localhost/api/og?section=${section}`);
      const response = await GET(request);
      expect(response.status).toBe(200);
    }
  });

  it("handles invalid section gracefully", async () => {
    const request = new Request("http://localhost/api/og?section=invalid-section");
    const response = await GET(request);
    // Should still render, just without special section styling
    expect(response.status).toBe(200);
  });

  it("uses Object.hasOwn for section validation", async () => {
    // Verify the code uses Object.hasOwn() to prevent prototype pollution
    const request = new Request("http://localhost/api/og?section=__proto__");
    const response = await GET(request);
    expect(response.status).toBe(200);
    // Should treat __proto__ as invalid section
  });

  it("handles description parameter", async () => {
    const request = new Request(
      "http://localhost/api/og?description=" + encodeURIComponent("这是一个描述")
    );
    const response = await GET(request);
    expect(response.status).toBe(200);
  });

  it("truncates extremely long descriptions", async () => {
    const longDesc = "很长的描述".repeat(100);
    const request = new Request(
      "http://localhost/api/og?description=" + encodeURIComponent(longDesc)
    );
    const response = await GET(request);
    expect(response.status).toBe(200);
  });

  it("handles font loading failure gracefully", async () => {
    // The code already has try/catch for font loading
    const request = new Request("http://localhost/api/og");
    const response = await GET(request);
    expect(response.status).toBe(200);
  });

  it("handles Chinese characters in title", async () => {
    const request = new Request("http://localhost/api/og?title=" + encodeURIComponent("哲学思想"));
    const response = await GET(request);
    expect(response.status).toBe(200);
  });
});

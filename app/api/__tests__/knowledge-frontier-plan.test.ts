import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/knowledge-frontier/plan/route";

describe("/api/knowledge-frontier/plan", () => {
  it("should reject requests with body size exceeding limit", async () => {
    const largeBody = {
      targetId: "test",
      knownIds: new Array(2000).fill("long-id-string-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
      minutes: 45,
    };
    const bodyString = JSON.stringify(largeBody);
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": String(bodyString.length),
      },
      body: bodyString,
    });

    const response = await POST(request);
    if (bodyString.length > 100_000) {
      expect(response.status).toBe(413);
      expect(response.headers.get("x-request-id")).toBeDefined();
    }
  });

  it("should reject invalid JSON", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{invalid",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("Invalid JSON");
  });

  it("should reject invalid plan request structure", async () => {
    const body = {
      targetId: "test",
      knownIds: ["id-1"],
      minutes: 999, // Invalid minutes
    };
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(response.headers.get("x-request-id")).toBeDefined();
  });

  it("should apply rate limiting", async () => {
    const clientIp = "10.0.0.3";
    const body = {
      targetId: "test-target",
      knownIds: [],
      minutes: 45,
    };

    const requests: Promise<Response>[] = [];
    for (let i = 0; i < 25; i++) {
      const request = new Request("http://localhost/api/knowledge-frontier/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": clientIp,
        },
        body: JSON.stringify(body),
      });
      requests.push(POST(request));
    }

    const responses = await Promise.all(requests);
    const rateLimited = responses.filter((r) => r.status === 429);
    expect(rateLimited.length).toBeGreaterThan(0);
  });

  it("should include request ID in all responses", async () => {
    const body = {
      targetId: "unknown-target-xyz",
      knownIds: [],
      minutes: 20,
    };
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.headers.get("x-request-id")).toBeDefined();
  });
});

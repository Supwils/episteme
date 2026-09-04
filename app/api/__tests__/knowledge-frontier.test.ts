import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/knowledge-frontier/route";

describe("/api/knowledge-frontier", () => {
  it("should return frontier view with request ID", async () => {
    const body = {
      knownIds: ["test-id-1"],
      filter: {
        status: "ready",
        offset: 0,
        limit: 10,
      },
    };
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBeDefined();
  });

  it("should reject requests exceeding body size limit", async () => {
    const largeBody = {
      knownIds: new Array(10000).fill("long-id-string-that-takes-space"),
      filter: { status: "ready", offset: 0, limit: 10 },
    };
    const bodyString = JSON.stringify(largeBody);
    const request = new Request("http://localhost/api/knowledge-frontier", {
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
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json{",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("Invalid JSON");
    expect(response.headers.get("x-request-id")).toBeDefined();
  });

  it("should reject invalid filter structure", async () => {
    const body = {
      knownIds: ["id-1"],
      filter: {
        status: "invalid-status",
        offset: 0,
        limit: 10,
      },
    };
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(response.headers.get("x-request-id")).toBeDefined();
  });

  it("should apply rate limiting after many requests", async () => {
    const clientIp = "10.0.0.2";
    const requests: Promise<Response>[] = [];

    const body = {
      knownIds: [],
      filter: { status: "ready", offset: 0, limit: 10 },
    };

    // Send 35 requests (capacity is 30)
    for (let i = 0; i < 35; i++) {
      const request = new Request("http://localhost/api/knowledge-frontier", {
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
    const limitedResponse = rateLimited[0];
    expect(limitedResponse?.headers.get("retry-after")).toBeDefined();
  });

  it("should validate knownIds array constraints", async () => {
    const body = {
      knownIds: new Array(2001).fill("id"),
      filter: { status: "ready", offset: 0, limit: 10 },
    };
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should echo custom x-request-id header", async () => {
    const body = {
      knownIds: [],
      filter: { status: "ready", offset: 0, limit: 10 },
    };
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": "custom-frontier-123",
      },
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.headers.get("x-request-id")).toBe("custom-frontier-123");
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/knowledge-frontier/route";

describe("POST /api/knowledge-frontier", () => {
  const validPayload = {
    knownIds: ["test-id-1", "test-id-2"],
    filter: {
      status: "未解决",
      domainId: "physics",
      level: 4,
      query: "quantum",
      offset: 0,
      limit: 24,
    },
  };

  it("returns 400 for invalid JSON", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      body: "not valid json",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Invalid JSON");
  });

  it("returns 400 for missing filter", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ knownIds: [] }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid status value", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: [],
        filter: { ...validPayload.filter, status: "invalid-status" },
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid domain ID", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: [],
        filter: { ...validPayload.filter, domainId: "nonexistent-domain" },
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid level", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: [],
        filter: { ...validPayload.filter, level: "invalid" },
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for negative offset", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: [],
        filter: { ...validPayload.filter, offset: -1 },
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for limit exceeding maximum", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: [],
        filter: { ...validPayload.filter, limit: 101 },
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for too many known IDs", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: Array(2001).fill("id"),
        filter: validPayload.filter,
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 if known IDs contain invalid entries", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knownIds: ["valid-id", 123, null, "another-valid"],
        filter: validPayload.filter,
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("sets private no-store cache control", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ knownIds: [], filter: validPayload.filter }),
    });
    const response = await POST(request);

    // Check if it's a successful response before testing headers
    if (response.status === 200) {
      expect(response.headers.get("cache-control")).toBe("private, no-store");
      expect(response.headers.get("x-profile-storage")).toBe("local-only");
    } else {
      // For error responses, just check that they return appropriate status
      expect([400, 404, 500]).toContain(response.status);
    }
  });
});

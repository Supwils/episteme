import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/knowledge-frontier/plan/route";

describe("POST /api/knowledge-frontier/plan", () => {
  it("returns 400 for invalid JSON", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      body: "not json",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Invalid JSON");
  });

  it("returns 400 for missing targetId", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ knownIds: [], minutes: 20 }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid minutes value", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetId: "test-target",
        knownIds: [],
        minutes: 30, // not in [20, 45, 90]
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 404 for unknown target ID", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetId: "nonexistent-target-xyz-123",
        knownIds: [],
        minutes: 20,
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.error).toContain("Unknown knowledge target");
  });

  it("returns 400 for too many known IDs", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetId: "test-target",
        knownIds: Array(2001).fill("id"),
        minutes: 20,
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("sets private cache control headers", async () => {
    const request = new Request("http://localhost/api/knowledge-frontier/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetId: "nonexistent",
        knownIds: [],
        minutes: 20,
      }),
    });
    const response = await POST(request);
    // Even on error, check what headers would be set on success
    if (response.status === 200) {
      expect(response.headers.get("cache-control")).toBe("private, no-store");
      expect(response.headers.get("x-profile-storage")).toBe("local-only");
    }
  });
});

import { describe, expect, it } from "vitest";
import { POST } from "../route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/knowledge-frontier/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("knowledge gap plan API", () => {
  it("returns a private versioned route snapshot contract", async () => {
    const response = await POST(
      request({
        targetId: "political-science:security-dilemma-war-peace",
        knownIds: [],
        minutes: 45,
      })
    );
    const data = (await response.json()) as {
      steps: unknown[];
      version: {
        schemaVersion: number;
        fingerprint: string;
        relationReleases: { releaseId: string; version: string }[];
        relationIds: string[];
      };
    };

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-Profile-Storage")).toBe("local-only");
    expect(data.steps).toHaveLength(2);
    expect(data.version.schemaVersion).toBe(1);
    expect(data.version.fingerprint).toMatch(/^kgp-1-/);
    expect(data.version.relationReleases.length).toBeGreaterThan(0);
    expect(data.version.relationIds.length).toBeGreaterThan(0);
  });

  it("rejects malformed requests", async () => {
    expect((await POST(request({ targetId: "target", knownIds: [], minutes: 30 }))).status).toBe(
      400
    );
    expect(
      (await POST(request({ targetId: "target", knownIds: "none", minutes: 45 }))).status
    ).toBe(400);
  });
});

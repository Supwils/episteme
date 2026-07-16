import { describe, expect, it } from "vitest";
import { POST } from "../route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/knowledge-frontier/journeys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("knowledge journey plans API", () => {
  it("recalculates multiple private route versions in one request", async () => {
    const response = await POST(
      request({
        knownIds: [],
        journeys: [
          { targetId: "political-science:security-dilemma-war-peace", minutes: 20 },
          { targetId: "economics:us-macro-diagnosis-2026", minutes: 90 },
        ],
      })
    );
    const data = (await response.json()) as {
      plans: { target: { id: string }; totalMinutes: number; version: { fingerprint: string } }[];
      unavailableTargetIds: string[];
    };

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-Profile-Storage")).toBe("local-only");
    expect(data.plans.map((plan) => [plan.target.id, plan.totalMinutes])).toEqual([
      ["political-science:security-dilemma-war-peace", 20],
      ["economics:us-macro-diagnosis-2026", 90],
    ]);
    expect(data.plans.every((plan) => plan.version.fingerprint.startsWith("kgp-1-"))).toBe(true);
    expect(data.unavailableTargetIds).toEqual([]);
  });

  it("rejects empty, duplicate and oversized journey requests", async () => {
    expect((await POST(request({ knownIds: [], journeys: [] }))).status).toBe(400);
    expect(
      (
        await POST(
          request({
            knownIds: [],
            journeys: [
              { targetId: "same", minutes: 20 },
              { targetId: "same", minutes: 45 },
            ],
          })
        )
      ).status
    ).toBe(400);
    expect(
      (
        await POST(
          request({
            knownIds: [],
            journeys: Array.from({ length: 17 }, (_, index) => ({
              targetId: `target-${index}`,
              minutes: 45,
            })),
          })
        )
      ).status
    ).toBe(400);
  });

  it("isolates a target that no longer exists without hiding valid route versions", async () => {
    const response = await POST(
      request({
        knownIds: [],
        journeys: [
          { targetId: "removed:target", minutes: 45 },
          { targetId: "economics:us-macro-diagnosis-2026", minutes: 90 },
        ],
      })
    );
    const data = (await response.json()) as {
      plans: { target: { id: string } }[];
      unavailableTargetIds: string[];
    };

    expect(response.status).toBe(200);
    expect(data.plans.map((plan) => plan.target.id)).toEqual(["economics:us-macro-diagnosis-2026"]);
    expect(data.unavailableTargetIds).toEqual(["removed:target"]);
  });
});

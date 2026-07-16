import { describe, expect, it } from "vitest";
import { POST } from "../route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/knowledge-frontier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("knowledge frontier API", () => {
  it("returns a private, complete frontier without persisting the profile", async () => {
    const response = await POST(request({ knownIds: [], filter: { status: "ready", limit: 3 } }));
    const data = (await response.json()) as {
      summary: { nodeCount: number; readyCount: number };
      results: unknown[];
    };
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-Profile-Storage")).toBe("local-only");
    expect(data.summary.nodeCount).toBe(1362);
    expect(data.summary.readyCount).toBeGreaterThan(0);
    expect(data.results).toHaveLength(3);
  });

  it("moves an explicitly confirmed node into mastered state", async () => {
    const response = await POST(
      request({
        knownIds: ["computer-science:abstraction"],
        filter: { status: "mastered" },
      })
    );
    const data = (await response.json()) as {
      summary: { masteredCount: number };
      results: { id: string; status: string }[];
    };
    expect(data.summary.masteredCount).toBe(1);
    expect(data.results).toContainEqual(
      expect.objectContaining({ id: "computer-science:abstraction", status: "mastered" })
    );
  });

  it("rejects invalid statuses and oversized profiles", async () => {
    const invalidStatus = await POST(request({ knownIds: [], filter: { status: "guessed" } }));
    const oversized = await POST(
      request({
        knownIds: Array.from({ length: 2001 }, (_, index) => `node-${index}`),
        filter: { status: "ready" },
      })
    );
    expect(invalidStatus.status).toBe(400);
    expect(oversized.status).toBe(400);
  });

  it("rejects pagination values outside the supported range", async () => {
    const negativeOffset = await POST(
      request({ knownIds: [], filter: { status: "ready", offset: -1 } })
    );
    const emptyPage = await POST(request({ knownIds: [], filter: { status: "ready", limit: 0 } }));
    const oversizedPage = await POST(
      request({ knownIds: [], filter: { status: "ready", limit: 101 } })
    );

    expect(negativeOffset.status).toBe(400);
    expect(emptyPage.status).toBe(400);
    expect(oversizedPage.status).toBe(400);
  });
});

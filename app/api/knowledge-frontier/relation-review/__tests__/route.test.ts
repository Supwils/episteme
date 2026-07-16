import { describe, expect, it } from "vitest";
import { POST } from "../route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/knowledge-frontier/relation-review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("knowledge relation review API", () => {
  it("returns a private version impact replay", async () => {
    const response = await POST(request({ knownIds: [] }));
    const data = (await response.json()) as {
      release: { version: string };
      summary: { targetCount: number; relationCount: number; cycleCount: number };
      targets: unknown[];
    };
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-Profile-Storage")).toBe("local-only");
    expect(data.release.version).toBe("2.1.0");
    expect(data.summary).toMatchObject({ targetCount: 15, relationCount: 30, cycleCount: 0 });
    expect(data.targets).toHaveLength(15);
  });

  it("rejects malformed and oversized profiles", async () => {
    expect((await POST(request({ knownIds: "none" }))).status).toBe(400);
    expect(
      (
        await POST(
          request({ knownIds: Array.from({ length: 2001 }, (_, index) => `node-${index}`) })
        )
      ).status
    ).toBe(400);
  });
});

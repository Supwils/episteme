import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "../route";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network disabled")));
});

afterEach(() => vi.unstubAllGlobals());

describe("GET /api/og", () => {
  it.each(["philosophy", "unknown", "__proto__", "constructor", "toString"])(
    "renders a PNG for section %s without inherited object values",
    async (section) => {
      const response = await GET(
        new Request(`https://episteme.test/api/og?title=Episteme&section=${section}`)
      );
      const bytes = new Uint8Array(await response.arrayBuffer());
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("image/png");
      expect([...bytes.slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
      expect(response.headers.get("cache-control")).toContain("s-maxage=86400");
    }
  );

  it("renders a complete PNG with local fonts while the network is disabled", async () => {
    const response = await GET(new Request("https://episteme.test/api/og?title=格致"));
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    const bytes = Buffer.from(await response.arrayBuffer());
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
    expect(bytes.subarray(-8, -4).toString()).toBe("IEND");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("still renders when title and description are far longer than the paint budget", async () => {
    const response = await GET(
      new Request(
        `https://episteme.test/api/og?title=${encodeURIComponent("T".repeat(2000))}&description=${encodeURIComponent("D".repeat(2000))}&section=philosophy`
      )
    );
    const bytes = new Uint8Array(await response.arrayBuffer());
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect([...bytes.slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  });
});

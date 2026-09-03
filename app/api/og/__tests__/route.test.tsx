import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "../route";

beforeEach(() => {
  // Use the built-in fallback font so these rendering tests do not need network.
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
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
    }
  );
});

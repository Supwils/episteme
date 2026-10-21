import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/og/render", () => ({ renderOgPng: vi.fn() }));
import { renderOgPng } from "@/lib/og/render";
import { GET } from "../route";

afterEach(() => vi.restoreAllMocks());

describe("OG error response", () => {
  it("returns a retryable non-cacheable error before committing an image response", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(renderOgPng).mockRejectedValueOnce(new Error("private font path"));
    const response = await GET(new Request("https://episteme.test/api/og?title=格致"));
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("retry-after")).toBe("60");
    expect(response.headers.get("content-type")).not.toContain("image/png");
    expect(await response.text()).not.toContain("private font path");
  });
});

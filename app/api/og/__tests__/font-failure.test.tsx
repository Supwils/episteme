import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "../route";

afterEach(() => vi.unstubAllGlobals());

describe("OG image font failure", () => {
  it("keeps distinct Chinese titles readable when external services are unavailable", async () => {
    const remote = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", remote);
    const images = [];
    for (const title of ["格致", "知识"]) {
      const response = await GET(
        new Request(`https://episteme.test/api/og?${new URLSearchParams({ title })}`)
      );
      const bytes = new Uint8Array(await response.arrayBuffer());
      expect(response.status).toBe(200);
      expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
      images.push(bytes);
    }
    expect(images[0]).not.toEqual(images[1]);
    expect(remote).not.toHaveBeenCalled();
  });

  it("does not return a broken PNG stream when a remote service supplies corrupt font bytes", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response("src: url(https://fonts.gstatic.com/l/font?kit=test) format('truetype');")
      )
      .mockResolvedValue(new Response(new Uint8Array([0, 1, 0, 0])));
    vi.stubGlobal("fetch", fetchMock);
    const response = await GET(new Request("https://episteme.test/api/og?title=格致"));
    const bytes = new Uint8Array(await response.arrayBuffer());
    expect(response.status).toBe(200);
    expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

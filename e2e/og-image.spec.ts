import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("article metadata resolves to a complete, decodable local sharing image", async ({
  page,
  request,
}) => {
  for (const [path, section] of [
    ["/philosophy/thinkers/socrates", "philosophy"],
    ["/chemistry/concepts/chemical-bond", "chemistry"],
  ] as const) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toBeTruthy();
    const url = new URL(image!);
    expect(url.pathname).toBe("/api/og");
    expect(url.searchParams.get("section")).toBe(section);
    expect(url.searchParams.get("title")).toBeTruthy();
    const localImage = url.pathname + url.search;
    const png = await request.get(localImage);
    expect(png.status()).toBe(200);
    expect(png.headers()["content-type"]).toBe("image/png");
    expect(png.headers()["cache-control"]).toContain("s-maxage=86400");
    expect((await png.body()).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    await page.goto(localImage);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight])
      )
      .toEqual([1200, 630]);
  }
});

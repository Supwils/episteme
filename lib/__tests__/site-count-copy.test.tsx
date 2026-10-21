import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site-stats", async (original) => {
  const stats = await original<typeof import("@/lib/site-stats")>();
  return { ...stats, SITE_TOTALS: { ...stats.SITE_TOTALS, domains: 23 } };
});
vi.mock("@/lib/fonts", () => ({
  spaceGrotesk: { variable: "--font-display" },
  plexMono: { variable: "--font-mono" },
}));
vi.mock("@/lib/display-font", () => ({ spaceGrotesk: { variable: "--font-display" } }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn() }),
}));

import { metadata as homeMetadata } from "@/app/page";
import { metadata as rootMetadata } from "@/app/layout";
import { metadata as curiosityMetadata } from "@/app/curiosities/layout";
import CuriositiesPage from "@/app/curiosities/page";
import { Astrolabe } from "@/components/portal/Astrolabe";
import { ClusterAtlas } from "@/components/portal/ClusterAtlas";

describe("site copy follows generated domain totals", () => {
  it("updates homepage, shared social metadata and curiosity metadata together", () => {
    for (const metadata of [homeMetadata, rootMetadata, curiosityMetadata]) {
      if (metadata === homeMetadata || metadata === curiosityMetadata) {
        expect(metadata.description).toContain("二十三");
      }
      expect(metadata.openGraph?.description).toContain("二十三");
      if (metadata.twitter) expect(metadata.twitter.description).toContain("二十三");
    }
  });

  it("renders the current count in the curiosity introduction", () => {
    const text = renderToStaticMarkup(<CuriositiesPage />).replace(/<!--.*?-->/g, "");
    expect(text.match(/横跨.{0,16}个学科/)?.[0]).toBe("横跨二十三个学科");
  });

  it("renders current domain totals in the atlas heading and dial description", () => {
    const atlas = renderToStaticMarkup(<ClusterAtlas />);
    expect(atlas.match(/<h2[^>]*>(.*?)<\/h2>/s)?.[1]?.replace(/<!--.*?-->/g, "")).toBe(
      "六簇二十三域"
    );
    const dial = renderToStaticMarkup(<Astrolabe selected="mathematics" />).replace(
      /<!--.*?-->/g,
      ""
    );
    expect(dial.match(/aria-label="(格致仪：[^"]+)"/)?.[1]).toContain("二十三个学科按六簇排成一圈");
    expect(dial.match(/\d+ 个学科/)?.[0]).toBe("23 个学科");
  });
});

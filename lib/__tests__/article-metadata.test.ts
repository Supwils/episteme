import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { generateMetadata as thinkerMetadata } from "@/app/philosophy/thinkers/[slug]/page";
import { engineArticleMetadata } from "@/lib/article-canonical";
import { getDomainConfig } from "@/lib/new-domains";

function card(meta: Metadata) {
  const og = meta.openGraph as { title?: string; description?: string; images?: unknown };
  const twitter = meta.twitter as { card?: string; title?: string; description?: string };
  return { og, twitter, imageUrl: JSON.stringify(og?.images ?? "") };
}

describe("article share metadata", () => {
  it("gives an engine article its own og and twitter card, not the domain's", () => {
    const meta = engineArticleMetadata("law", "foundations", "why-law-exists");
    const { og, twitter, imageUrl } = card(meta);
    expect(meta.description).toBeTruthy();
    expect(og.description).toBe(meta.description);
    expect(og.description).not.toBe(getDomainConfig("law")?.tagline);
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.title).toContain("法律为什么存在");
    expect(twitter.description).toBe(meta.description);
    expect(imageUrl).toContain("/api/og?");
    expect(imageUrl).toContain("section=law");
  });

  it("gives a philosophy thinker a twitter card that mirrors its og card", async () => {
    const meta = await thinkerMetadata({ params: Promise.resolve({ slug: "plato" }) });
    const { og, twitter, imageUrl } = card(meta);
    expect(og.title).toContain("柏拉图");
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.title).toBe(og.title);
    expect(twitter.description).toBe(og.description);
    expect(imageUrl).toContain("section=philosophy");
    expect(imageUrl).not.toContain("episteme.vercel.app");
  });
});

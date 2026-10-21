import { describe, expect, it } from "vitest";
import { ogCard } from "../card";
import { articleOgImagePath } from "@/lib/article-metadata";

describe("OG text boundaries", () => {
  it("preserves supplementary characters at the title and metadata limits", () => {
    const card = ogCard(new URLSearchParams({ title: "a".repeat(199) + "🧠x" }));
    expect(card.title).toBe("a".repeat(199) + "🧠");
    const url = articleOgImagePath({
      path: "/x",
      title: "格致",
      domain: "mathematics",
      description: "a".repeat(119) + "𠮷x",
    });
    expect(new URL(url, "https://episteme.test").searchParams.get("description")).toBe(
      "a".repeat(119) + "𠮷"
    );
  });
  it("normalizes control characters and caps the displayed description", () => {
    expect(
      ogCard(new URLSearchParams({ title: " A\n B\u0000", description: "知".repeat(121) })).title
    ).toBe("A B");
    expect(ogCard(new URLSearchParams({ description: "知".repeat(121) })).description).toBe(
      "知".repeat(120) + "…"
    );
  });
});

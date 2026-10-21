// @vitest-environment happy-dom
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { extractH2Headings } from "@/lib/markdown-heading";

afterEach(cleanup);

function assertAnchors(container: HTMLElement) {
  const ids = Array.from(container.querySelectorAll("[id]"), (element) => element.id);
  expect(ids.every(Boolean)).toBe(true);
  expect(new Set(ids).size).toBe(ids.length);
  for (const link of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
    const fragment = link.getAttribute("href")!.slice(1);
    expect(fragment).not.toBe("");
    const target = decodeURIComponent(fragment);
    expect(ids.filter((id) => id === target)).toHaveLength(1);
  }
}

describe("article fragment target integrity", () => {
  it("keeps an unreferenced definition without inventing a return link", () => {
    const { container } = render(
      <MarkdownRenderer content={"正文。\n\n[^unused]: 只列出的来源。"} />
    );
    expect(container.querySelector(".md-footnotes li")?.textContent).toContain("只列出的来源。");
    expect(container.querySelector(".md-footnotes__back")).toBeNull();
    assertAnchors(container);
  });

  it("keeps a repeated reference distinct from another note's numeric suffix", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"正文[^a]，再引[^a]，另引[^a-2]。\n\n[^a]: 第一来源。\n[^a-2]: 第二来源。"}
      />
    );
    assertAnchors(container);
    expect(container.querySelectorAll('a[href="#fn-a"]')).toHaveLength(2);
    expect(container.querySelectorAll('a[href="#fn-a-2"]')).toHaveLength(1);
    expect(container.querySelector('[id="fnref-a-2"]')?.textContent).toBe("[a-2]");
  });

  it("preserves custom heading anchors when footnote targets and references collide", () => {
    const content = [
      "## 自定义节 {#fn-a}",
      "### 自定义小节 {#fnref-a}",
      "#### 自定义条目 {#fnref-a-2}",
      "正文[^a]，再引[^a]，另引[^a-2]。",
      "[^a]: 第一来源。\n[^a-2]: 第二来源。",
    ].join("\n\n");
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(container.querySelector("h2")?.id).toBe("fn-a");
    expect(container.querySelector("h3")?.id).toBe("fnref-a");
    expect(container.querySelector("h4")?.id).toBe("fnref-a-2");
    assertAnchors(container);
    const reference = container.querySelector<HTMLAnchorElement>('a[title="第一来源。"]')!;
    const target = decodeURIComponent(reference.getAttribute("href")!.slice(1));
    expect(
      Array.from(container.querySelectorAll(".md-footnotes li")).find((note) => note.id === target)
        ?.textContent
    ).toContain("第一来源。");
  });

  it.each(["a%20b", "a#b", "a?b", "a/b", "原典", "文😀", 'a"b'])(
    "encodes a fragment for the literal footnote id %s",
    (id) => {
      const { container } = render(
        <MarkdownRenderer content={`正文[^${id}]。\n\n[^${id}]: 来源。`} />
      );
      assertAnchors(container);
      expect(container.querySelector(".md-footnotes__back")).not.toBeNull();
    }
  );

  it("allocates nonempty targets for punctuation and supplementary-plane headings", () => {
    const content = "## ？！\n\n正文。\n\n## 😀\n\n正文。\n\n### 🧠\n\n正文。";
    const { container } = render(<MarkdownRenderer content={content} />);
    assertAnchors(container);
    expect(extractH2Headings(content).map((heading) => heading.id)).toEqual(
      Array.from(container.querySelectorAll("h2"), (heading) => heading.id)
    );
  });

  it("keeps malformed surrogate IDs well formed and distinct after normalization", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "正文[^a\uD800]，再引[^a\uDC00]。\n\n[^a\uD800]: 第一来源。\n[^a\uDC00]: 第二来源。"
        }
      />
    );
    assertAnchors(container);
    expect(container.querySelectorAll(".md-footnotes li")).toHaveLength(2);
  });

  it("keeps discovery anchors aligned with real headings outside code fences", () => {
    const content = "```text\n## 同名标题\n```\n\n## 同名标题\n\n正文。\n\n## 后一节\n\n正文。";
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(extractH2Headings(content)).toEqual([
      { text: "同名标题", id: "同名标题" },
      { text: "后一节", id: "后一节" },
    ]);
    assertAnchors(container);
  });
});

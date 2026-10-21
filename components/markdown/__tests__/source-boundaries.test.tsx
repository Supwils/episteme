// @vitest-environment happy-dom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { loadImageManifest } from "@/lib/image-rights";
import { extractFootnotes, finalizeFootnoteAnchors, footnoteReturnAnchors } from "../footnotes";
import { splitSections } from "../sections";
import { renderSection } from "../SectionViews";

afterEach(cleanup);

describe("Markdown source boundaries", () => {
  it("finishes citation metadata before server components serialize their children", () => {
    const content = [
      "## 普通标题[^ref]",
      "正文[^ref]。",
      "- 列表[^ref]。",
      "| 标题 | 引用 |\n| --- | --- |\n| 数据 | [^ref] |",
      "## 关键洞察\n\n洞察[^ref]。",
      "## 破除误解\n\n误解一，某个误解。实际来源[^ref]。",
      "```aside\n作者旁注[^ref]。\n```",
      "[^ref]: 来源。",
    ].join("\n\n");
    const footnotes = extractFootnotes(content);
    const usedHeadingIds = new Set<string>();
    for (const section of splitSections(content, usedHeadingIds)) {
      renderSection({
        section,
        ctx: { footnotes, usedHeadingIds, domain: "", accentColor: "#fff" },
      });
    }
    finalizeFootnoteAnchors(footnotes, usedHeadingIds);
    const anchors = footnoteReturnAnchors(footnotes, "ref");
    expect(anchors).toHaveLength(7);
    expect(anchors.every(Boolean)).toBe(true);
    expect(new Set(anchors).size).toBe(7);
  });

  it("includes citations from later footnote bodies in an earlier note's return links", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"正文[^first]。\n\n[^first]: 第一来源。\n[^later]: 另一个来源也引[^first]。"}
      />
    );
    expect(
      Array.from(container.querySelectorAll("#fn-first .md-footnotes__back"), (link) =>
        link.getAttribute("href")
      )
    ).toEqual(["#fnref-first", "#fnref-first-2"]);
  });

  it.each(["constructor", "toString", "__proto__", "hasOwnProperty"])(
    "renders the unknown section %s as ordinary narrative",
    (heading) => {
      const { container } = render(
        <MarkdownRenderer content={`## ${heading}\n\n这一段仍然可读。`} />
      );
      expect(container.querySelector('[data-section="narrative"]')).not.toBeNull();
      expect(container.querySelector("h2 [data-heading-anchor]")?.getAttribute("aria-label")).toBe(
        `链接到本节：${heading}`
      );
      expect(container.textContent).toContain("这一段仍然可读。");
    }
  );

  it("does not extract or resolve footnotes written inside a code fence", () => {
    const { container } = render(
      <MarkdownRenderer content={"示例引用[^demo]。\n\n```text\n[^demo]: 只是代码。\n```"} />
    );
    expect(container.querySelector("code")?.textContent).toContain("[^demo]: 只是代码。");
    expect(container.querySelector(".md-footnotes")).toBeNull();
    expect(container.querySelector(".md-p")?.textContent).toContain("[^demo]");
  });

  it("does not let a fenced example overwrite a real footnote", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"正文[^source]。\n\n[^source]: 真实来源。\n\n```text\n[^source]: 示例文字。\n```"}
      />
    );
    const note = container.querySelector(".md-footnotes li");
    expect(note?.textContent).toContain("真实来源。");
    expect(note?.textContent).not.toContain("示例文字。");
  });

  it("keeps a footnote-looking line in an unclosed fence as code", () => {
    const { container } = render(
      <MarkdownRenderer content={"```text\n代码。\n\n[^sample]: 仍然是代码。"} />
    );
    expect(container.querySelector("code")?.textContent).toContain("[^sample]: 仍然是代码。");
    expect(container.querySelector(".md-footnotes")).toBeNull();
  });

  it("keeps balanced parentheses in a standalone image URL", () => {
    const src = "https://example.org/illustration_(copy).png";
    const { container } = render(<MarkdownRenderer content={`![示意图](${src})`} />);
    expect(container.querySelector("figure img")?.getAttribute("src")).toBe(src);
  });

  it.each(["", "前文。"])(
    "keeps a registered image responsive and attributed alongside prose: %s",
    (prefix) => {
      const [id, entry] = Object.entries(loadImageManifest()).find(
        ([, entry]) => entry.attribution
      )!;
      const { container } = render(
        <MarkdownRenderer content={`${prefix}![示意图](/images/${id})后文。`} />
      );
      const image = container.querySelector("img")!;
      expect(image.getAttribute("src")).toMatch(/\.webp$/);
      expect(image.getAttribute("srcset")).toContain("640w");
      expect(image.getAttribute("width")).toBe(String(entry.width));
      expect(image.getAttribute("height")).toBe(String(entry.height));
      expect(container.querySelector("p figure")).toBeNull();
      expect(container.querySelector('[role="figure"]')).not.toBeNull();
      expect(container.textContent).toContain(entry.title);
      expect(container.textContent).toContain(entry.attribution);
      expect(container.textContent).toContain(prefix);
      expect(container.textContent).toContain("后文。");
    }
  );

  it.each([
    "````text\n```\n[^demo]: 代码中的短围栏。\n````",
    "~~~text\n```\n[^demo]: 另一种围栏。\n~~~",
    "```text\n```not-a-close\n[^demo]: 仍然在围栏里。\n```",
    "  ```text\n[^demo]: 缩进围栏。\n  ```",
  ])("shares exact fence boundaries between code and footnotes: %s", (fence) => {
    const { container } = render(
      <MarkdownRenderer content={`围栏前。\n${fence}\n围栏后。\n\n[^real]: 真实脚注。`} />
    );
    expect(container.querySelector("code")?.textContent).toContain("[^demo]:");
    expect(container.querySelectorAll(".md-footnotes li")).toHaveLength(1);
    expect(container.querySelector(".md-footnotes li")?.textContent).toContain("真实脚注。");
    expect(container.querySelectorAll(".md-p")).toHaveLength(2);
    expect(container.textContent).toContain("围栏后。");
  });

  it("preserves a long fenced sample without promoting its footnotes or headings", () => {
    const code = Array.from(
      { length: 1000 },
      (_, index) => `## 示例 ${index}\n[^sample-${index}]: 代码文字。`
    ).join("\n\n");
    const { container } = render(<MarkdownRenderer content={`\`\`\`text\n${code}\n\`\`\``} />);
    expect(container.querySelectorAll("pre")).toHaveLength(1);
    expect(container.querySelector("code")?.textContent).toBe(code);
    expect(container.querySelector("h2, .md-footnotes, .md-sidenote")).toBeNull();
  });

  it.each([
    "前文![示意图](https://example.org/a.png)后文。",
    "![示意图](https://example.org/a.png)图后的正文。",
    "![甲图](https://example.org/a.png)与![乙图](https://example.org/b.png)相互参照。",
  ])("preserves images and all surrounding prose in %s", (content) => {
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(container.querySelectorAll("img")).toHaveLength(content.match(/!\[/g)!.length);
    expect(container.querySelectorAll("a")).toHaveLength(0);
    const prose = content.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
    expect(container.textContent).toBe(prose);
  });

  it.each([
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "java\tscript:alert(1)",
    "data:text/html,test",
    "//evil.example/x",
    "/\\evil.example/x",
  ])("keeps a disallowed URL inert in ordinary links and both image positions: %s", (url) => {
    const { container } = render(
      <MarkdownRenderer content={`[链接](${url})\n\n![图片](${url})\n\n正文![行内图](${url})。`} />
    );
    expect(container.querySelector("a, img")).toBeNull();
    expect(container.textContent).toContain("链接");
    expect(container.textContent).toContain("正文");
  });

  it("renders authored HTML as text rather than executable markup", () => {
    const source = '<script>window.injected=true</script><img src="x" onerror="alert(1)">';
    const { container } = render(<MarkdownRenderer content={source} />);
    expect(container.querySelector("script, img")).toBeNull();
    expect(container.textContent).toBe(source);
  });

  it.each([String.raw`\href{javascript:alert(1)}{x}`, String.raw`\htmlClass{injected}{x}`])(
    "keeps KaTeX extensions untrusted: %s",
    (formula) => {
      const { container } = render(<MarkdownRenderer content={`$${formula}$`} />);
      expect(container.querySelector('[role="math"]')).not.toBeNull();
      expect(container.querySelector("a, .injected")).toBeNull();
    }
  );

  it("falls back from a recursive macro after the existing expansion budget", () => {
    const { container } = render(<MarkdownRenderer content={String.raw`$\def\a{\a}\a$`} />);
    expect(container.querySelector('[role="math"] .katex-error')).not.toBeNull();
    expect(container.querySelector('[role="math"]')?.textContent).toContain(String.raw`\def`);
  });
});

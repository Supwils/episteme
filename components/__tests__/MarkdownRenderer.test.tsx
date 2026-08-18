// @vitest-environment happy-dom
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MarkdownRenderer } from "../MarkdownRenderer";

afterEach(cleanup);

describe("MarkdownRenderer document outline", () => {
  it("drops a leading title-level `# ` block (the page shell owns the document h1)", () => {
    const { container } = render(
      <MarkdownRenderer content={"# 文章标题\n\n## 第一节\n\n正文。"} />
    );
    expect(container.querySelectorAll("h1")).toHaveLength(0);
    expect(container.textContent).not.toContain("文章标题");
    expect(container.querySelectorAll("h2")).toHaveLength(1);
  });

  it("demotes a later `# ` block to h2 instead of creating a second h1", () => {
    const { container } = render(
      <MarkdownRenderer content={"开篇段落。\n\n# 中途大标题\n\n## 小节\n\n正文。"} />
    );
    expect(container.querySelectorAll("h1")).toHaveLength(0);
    const h2s = container.querySelectorAll("h2");
    expect(h2s).toHaveLength(2);
    expect(h2s[0]!.textContent).toContain("中途大标题");
  });

  it("keeps bodies without any `# ` block untouched", () => {
    const { container } = render(
      <MarkdownRenderer content={"直接开场。\n\n## 第一节\n\n正文。"} />
    );
    expect(container.textContent).toContain("直接开场");
    expect(container.querySelectorAll("h2")).toHaveLength(1);
  });
});

describe("MarkdownRenderer footnotes", () => {
  it("renders footnote definitions only in the footnotes section, never as body text", () => {
    const { container } = render(
      <MarkdownRenderer content={"正文引用[^1]。\n\n[^1]: 脚注定义文本。"} />
    );
    const occurrences = container.textContent!.split("脚注定义文本").length - 1;
    expect(occurrences).toBe(1);
    // The duplicated `fnref-1` id came from the definition block being
    // re-rendered as a paragraph; only the in-text reference may carry it.
    expect(container.querySelectorAll('[id="fnref-1"]')).toHaveLength(1);
    expect(container.querySelector('[id="fn-1"]')?.textContent).toContain("脚注定义文本");
  });

  it("skips a definition block that holds several footnotes", () => {
    const { container } = render(
      <MarkdownRenderer content={"正文[^1]又引[^2]。\n\n[^1]: 第一条。\n[^2]: 第二条。"} />
    );
    expect(container.querySelectorAll("footer li")).toHaveLength(2);
    expect(container.querySelectorAll('[id="fnref-1"]')).toHaveLength(1);
    expect(container.querySelectorAll('[id="fnref-2"]')).toHaveLength(1);
  });
});

describe("MarkdownRenderer DOI links", () => {
  it("links a plain `DOI: 10.xxxx/…` reference to doi.org", () => {
    const { container } = render(
      <MarkdownRenderer content={"参考文献。DOI: 10.1038/s41586-021-03819-2 见正文。"} />
    );
    const link = container.querySelector('a[href="https://doi.org/10.1038/s41586-021-03819-2"]');
    expect(link).not.toBeNull();
    expect(link!.textContent).toBe("DOI: 10.1038/s41586-021-03819-2");
  });

  it("keeps trailing CJK sentence punctuation outside the DOI link", () => {
    const { container } = render(
      <MarkdownRenderer content={"参考文献。DOI: 10.1038/s41586-021-03819-2。"} />
    );
    const link = container.querySelector('a[href="https://doi.org/10.1038/s41586-021-03819-2"]');
    expect(link).not.toBeNull();
    expect(link!.textContent).not.toContain("。");
    expect(link!.nextSibling?.textContent).toBe("。");
  });

  it("leaves ordinary text that merely mentions DOI unlinked", () => {
    const { container } = render(<MarkdownRenderer content={"本文不含 DOI 编号。"} />);
    expect(container.querySelectorAll('a[href^="https://doi.org/"]')).toHaveLength(0);
    expect(container.textContent).toContain("本文不含 DOI 编号。");
  });
});

describe("MarkdownRenderer apparatus sections", () => {
  it("renders 参考文献 lists smaller and denser than narrative lists", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"## 论证\n\n- 叙事列表项\n\n## 参考文献\n\n- 文献条目甲\n- 文献条目乙"}
      />
    );
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[0]!.className).toContain("text-[1rem]");
    expect(lists[1]!.className).toContain("text-sm");
    expect(lists[1]!.className).toContain("space-y-1");
  });

  it("applies the same apparatus styling to 延伸阅读", () => {
    const { container } = render(<MarkdownRenderer content={"## 延伸阅读\n\n- 推荐读物"} />);
    expect(container.querySelector("ul")!.className).toContain("text-sm");
  });

  it("marks 跨域连接 lists with a hairline left rule but keeps narrative sizing", () => {
    const { container } = render(<MarkdownRenderer content={"## 跨域连接\n\n- 关联条目"} />);
    const list = container.querySelector("ul")!;
    expect(list.className).toContain("border-l");
    expect(list.className).toContain("text-[1rem]");
  });

  it("resets apparatus styling at the next h2", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 参考文献\n\n- 文献条目\n\n## 跨域连接\n\n- 关联条目"} />
    );
    const lists = container.querySelectorAll("ul");
    expect(lists[0]!.className).toContain("text-sm");
    expect(lists[1]!.className).toContain("text-[1rem]");
    expect(lists[1]!.className).not.toContain("text-sm");
  });

  it("does not treat narrative headings containing the words as apparatus sections", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 参考文献的写法\n\n- 叙事列表项"} />
    );
    expect(container.querySelector("ul")!.className).toContain("text-[1rem]");
  });
});

describe("MarkdownRenderer heading anchors", () => {
  it("adds a hover-revealed # permalink to h2 and h3", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 第一节\n\n正文。\n\n### 小节\n\n正文。"} />
    );
    const h2 = container.querySelector("h2")!;
    const h3 = container.querySelector("h3")!;
    const h2Anchor = h2.querySelector(`a[href="#${h2.id}"]`);
    const h3Anchor = h3.querySelector(`a[href="#${h3.id}"]`);
    expect(h2Anchor).not.toBeNull();
    expect(h3Anchor).not.toBeNull();
    expect(h2Anchor!.textContent).toBe("#");
    expect(h2Anchor!.getAttribute("aria-label")).toContain("第一节");
  });

  it("points the anchor at the explicit {#anchor} id when present", () => {
    const { container } = render(<MarkdownRenderer content={"## 第一节 {#custom-id}\n\n正文。"} />);
    const h2 = container.querySelector("h2")!;
    expect(h2.id).toBe("custom-id");
    expect(h2.querySelector('a[href="#custom-id"]')).not.toBeNull();
  });
});

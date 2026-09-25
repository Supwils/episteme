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
  it("renders 参考文献 lists as a bibliography, narrative lists as prose", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"## 论证\n\n- 叙事列表项\n\n## 参考文献\n\n- 文献条目甲\n- 文献条目乙"}
      />
    );
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[0]!.dataset.variant).toBe("narrative");
    expect(lists[1]!.dataset.variant).toBe("references");
  });

  it("treats 延伸阅读 and 学术文献 as bibliographies too", () => {
    for (const title of ["延伸阅读", "学术文献"]) {
      const { container, unmount } = render(
        <MarkdownRenderer content={`## ${title}\n\n- 推荐读物`} />
      );
      expect(container.querySelector("ul")!.dataset.variant).toBe("references");
      unmount();
    }
  });

  it("marks 跨域连接 lists as the cross-domain variant", () => {
    const { container } = render(<MarkdownRenderer content={"## 跨域连接\n\n- 关联条目"} />);
    expect(container.querySelector("ul")!.dataset.variant).toBe("cross-domain");
    expect(container.querySelector('[data-section="cross-domain"]')).toBeTruthy();
  });

  it("resets apparatus styling at the next h2", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 参考文献\n\n- 文献条目\n\n## 跨域连接\n\n- 关联条目"} />
    );
    const lists = container.querySelectorAll("ul");
    expect(lists[0]!.dataset.variant).toBe("references");
    expect(lists[1]!.dataset.variant).toBe("cross-domain");
  });

  it("does not treat narrative headings containing the words as apparatus sections", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 参考文献的写法\n\n- 叙事列表项"} />
    );
    expect(container.querySelector("ul")!.dataset.variant).toBe("narrative");
  });
});

describe("MarkdownRenderer section types", () => {
  it("turns numbered misconceptions into struck claims with their corrections", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "## 破除误解\n\n第一个误解，是把程序看成包装纸。其实程序本身就是正义。\n\n第二个误解，是认为程序保护坏人。它保护的是所有人。\n\n照例说明：本篇不构成法律建议。"
        }
      />
    );
    const cards = container.querySelectorAll(".myth-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]!.querySelector("s")!.textContent).toBe("第一个误解，是把程序看成包装纸。");
    expect(cards[0]!.textContent).toContain("其实程序本身就是正义。");
    // The disclaimer leaves the cards and becomes a note.
    expect(container.querySelector(".md-note")!.textContent).toContain("不构成法律建议");
  });

  it("never strikes an opening sentence that does not state a misconception", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 破除误解\n\n法律起源于纠纷解决。这一点常被忽略。"} />
    );
    expect(container.querySelector("s")).toBeNull();
    expect(container.querySelector(".myth-card")!.textContent).toContain("法律起源于纠纷解决。");
  });

  it("renders numbered fact cards as index cards", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 事实卡\n\n- **卡1**：甲事实。\n- **卡2**：乙事实。"} />
    );
    const cards = container.querySelectorAll(".fact-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]!.querySelector(".fact-card__label")!.textContent).toBe("卡1");
  });

  it("gives only the first 关键洞察 the insight plate", () => {
    const { container } = render(
      <MarkdownRenderer content={"## 关键洞察\n\n一。\n\n## 关键洞察\n\n二。"} />
    );
    expect(container.querySelectorAll(".insight-plate")).toHaveLength(1);
  });

  it("sets classic quotes as epigraphs with their source", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "## 经典名言\n\n> 「焦虑是自由的眩晕。」——《焦虑的概念》\n\n> 「生活只能向后理解。」——日记"
        }
      />
    );
    const figures = container.querySelectorAll("figure.epigraph");
    expect(figures).toHaveLength(2);
    expect(figures[0]!.querySelector("figcaption")!.textContent).toBe("《焦虑的概念》");
  });

  it("keeps every word of the body in the DOM", () => {
    const content =
      "## 破除误解\n\n第一个误解，甲。乙。\n\n## 事实卡\n\n- **卡1**：丙。\n\n## 关键词\n\n丁; 戊; 己";
    const { container } = render(<MarkdownRenderer content={content} />);
    for (const word of ["甲", "乙", "丙", "丁", "戊", "己"]) {
      expect(container.textContent).toContain(word);
    }
  });

  it("splits a heading glued to the paragraph under it", () => {
    const { container } = render(<MarkdownRenderer content={"## 起源\n正文紧跟标题。"} />);
    expect(container.querySelector("h2")!.textContent).toContain("起源");
    expect(container.querySelector("h2")!.textContent).not.toContain("正文");
    expect(container.querySelector("p")!.textContent).toBe("正文紧跟标题。");
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

describe("MarkdownRenderer unsafe URLs", () => {
  it("renders javascript and protocol-relative links as plain text", () => {
    const { container } = render(
      <MarkdownRenderer content={"看[这里](javascript:alert(1))和[那里](//evil.example/x)。"} />
    );
    expect(container.querySelector("a")).toBeNull();
    expect(container.textContent).toContain("这里");
    expect(container.textContent).toContain("那里");
  });

  it("keeps ordinary https bibliography links clickable", () => {
    const { container } = render(
      <MarkdownRenderer content={"见[论文](https://doi.org/10.1038/example)。"} />
    );
    const link = container.querySelector('a[href="https://doi.org/10.1038/example"]');
    expect(link).not.toBeNull();
    expect(link!.textContent).toBe("论文");
  });
});

describe("MarkdownRenderer math", () => {
  it("renders ordinary inline TeX as math, not raw dollars", () => {
    const { container } = render(<MarkdownRenderer content={"面积是 $x^2$ 。"} />);
    expect(container.querySelector('[role="math"]')).not.toBeNull();
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("does not throw on a macro-expansion bomb", () => {
    expect(() => render(<MarkdownRenderer content={"$\\def\\x{x\\x}\\x$"} />)).not.toThrow();
  });
});

describe("MarkdownRenderer fences and author kit", () => {
  it("keeps blank lines inside a code fence and drops the closing fence", () => {
    const { container } = render(
      <MarkdownRenderer content={"```python\na = 1\n\nb = 2\n```\n\n之后的段落。"} />
    );
    const code = container.querySelector("pre code")!;
    expect(code.textContent).toBe("a = 1\n\nb = 2");
    expect(container.querySelectorAll("pre")).toHaveLength(1);
    expect(container.querySelector(".md-p")?.textContent).toBe("之后的段落。");
  });

  it("renders a levels ladder in authored order", () => {
    const { container } = render(
      <MarkdownRenderer content={"```levels\nL1 | 想象 | 影子与映像\nL2 | 信念 | 可见事物\n```"} />
    );
    const steps = container.querySelectorAll(".kit-levels__step");
    expect(steps).toHaveLength(2);
    expect(steps[0]!.querySelector(".kit-levels__title")?.textContent).toBe("想象");
  });

  it("renders compare as a real table with column headers", () => {
    const { container } = render(
      <MarkdownRenderer content={"```compare\n理性论 | 经验论\n天赋观念 | 白板\n```"} />
    );
    expect([...container.querySelectorAll("th")].map((th) => th.textContent)).toEqual([
      "理性论",
      "经验论",
    ]);
    expect(container.querySelectorAll("tbody td")).toHaveLength(2);
  });

  it("renders steps, timeline and aside", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "```steps\n观察 | 记下现象\n假设 | 提出解释\n```\n\n```timeline\n1687 | 《原理》出版\n```\n\n```aside\n第一段\n\n第二段\n```"
        }
      />
    );
    expect(container.querySelectorAll(".kit-steps__step")).toHaveLength(2);
    expect(container.querySelector(".kit-timeline__when")?.textContent).toBe("1687");
    expect(container.querySelectorAll(".kit-aside p")).toHaveLength(2);
  });

  it("renders an inline term with its gloss in the DOM", () => {
    const { container } = render(
      <MarkdownRenderer content={"柏拉图称之为{{term:理型|eidos，可知世界的原型}}。"} />
    );
    const term = container.querySelector("dfn.md-term")!;
    expect(term.textContent).toBe("理型（eidos，可知世界的原型）");
    expect(container.querySelector(".md-p")?.textContent).toBe(
      "柏拉图称之为理型（eidos，可知世界的原型）。"
    );
  });

  it("leaves set-builder braces alone", () => {
    const { container } = render(<MarkdownRenderer content={"3 是 {{{∅}}}。"} />);
    expect(container.querySelector("dfn")).toBeNull();
    expect(container.textContent).toContain("{{{∅}}}");
  });
});

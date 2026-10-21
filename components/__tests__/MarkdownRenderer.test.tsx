// @vitest-environment happy-dom
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { extractH2Headings } from "@/lib/markdown-heading";
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

  it("renders a wiki link inside a heading instead of the raw brackets", () => {
    const { container } = render(
      <MarkdownRenderer
        domain="earth-science"
        content={"## 节\n\n### 与 [[weathering-soil|风化成土]] 的分工\n\n正文。"}
      />
    );
    const h3 = container.querySelector("h3");
    expect(h3).not.toBeNull();
    expect(h3!.id).toBe("与-weathering-soil-风化成土-的分工");
    expect(h3!.textContent).not.toContain("[[");
    const link = h3!.querySelector('a[href="/earth-science/processes/weathering-soil"]');
    expect(link?.textContent).toBe("风化成土");
    expect(h3!.querySelector("[data-heading-anchor]")?.getAttribute("aria-label")).toBe(
      "链接到本节：与 风化成土 的分工"
    );
  });

  it("renders math inside an h2 instead of the dollar signs", () => {
    const { container } = render(
      <MarkdownRenderer content={"## $\\zeta$ 函数的特殊值\n\n正文。"} />
    );
    const h2 = container.querySelector("h2");
    expect(h2).not.toBeNull();
    expect(h2!.id).toBe("zeta-函数的特殊值");
    expect(h2!.textContent).not.toContain("$");
    expect(h2!.querySelector('[role="math"]')?.getAttribute("aria-label")).toBe("\\zeta");
    expect(h2!.querySelector("[data-heading-anchor]")?.getAttribute("aria-label")).toBe(
      "链接到本节：\\zeta 函数的特殊值"
    );
  });

  it("gives a repeated heading its own anchor", () => {
    const content =
      "## 成本治理\n\n前。\n\n## 成本治理\n\n后。\n\n### 物理原理\n\n甲。\n\n### 物理原理\n\n乙。";
    const { container } = render(<MarkdownRenderer content={content} />);
    const h2 = Array.from(container.querySelectorAll("h2"));
    expect(h2.map((heading) => heading.id)).toEqual(["成本治理", "成本治理-2"]);
    expect(extractH2Headings(content).map((heading) => heading.id)).toEqual([
      "成本治理",
      "成本治理-2",
    ]);
    expect(
      h2.map((heading) => heading.querySelector("[data-heading-anchor]")?.getAttribute("href"))
    ).toEqual(["#成本治理", "#成本治理-2"]);
    const h3 = Array.from(container.querySelectorAll("h3"));
    expect(h3.map((heading) => heading.id)).toEqual(["物理原理", "物理原理-2"]);
    expect(container.textContent).toContain("后。");
    expect(container.textContent).toContain("乙。");
  });
});

describe("MarkdownRenderer footnotes", () => {
  it("renders footnote definitions only in the footnotes section, never as body text", () => {
    const { container } = render(
      <MarkdownRenderer content={"正文引用[^1]。\n\n[^1]: 脚注定义文本。"} />
    );
    // The margin copy (shown only on wide article pages) is inert; outside it
    // the definition text appears once, in the footnotes section.
    const sidenotes = container.querySelectorAll(".md-sidenote");
    expect(sidenotes).toHaveLength(1);
    expect(sidenotes[0]!.hasAttribute("inert")).toBe(true);
    sidenotes.forEach((note) => note.remove());
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

  it("gives each citation of the same footnote its own return target", () => {
    const { container } = render(
      <MarkdownRenderer content={"先引[^fpp]，再引[^fpp]。\n\n[^fpp]: 同一条。"} />
    );
    expect(container.querySelectorAll('[id="fnref-fpp"]')).toHaveLength(1);
    expect(container.querySelectorAll('[id="fnref-fpp-2"]')).toHaveLength(1);
    const backs = container.querySelectorAll(".md-footnotes__back");
    expect(Array.from(backs).map((link) => link.getAttribute("href"))).toEqual([
      "#fnref-fpp",
      "#fnref-fpp-2",
    ]);
  });

  it("splits several footnote definitions written on one line", () => {
    const { container } = render(
      <MarkdownRenderer content={"正文[^a]与[^b]。\n\n[^a]: 甲。[^b]: 乙。"} />
    );
    expect(container.querySelector("#fn-a")?.textContent).toContain("甲");
    expect(container.querySelector("#fn-a")?.textContent).not.toContain("[^b]");
    expect(container.querySelector("#fn-b")?.textContent).toContain("乙");
    expect(container.textContent).not.toContain("[^a]");
    expect(container.textContent).not.toContain("[^b]");
  });
});

describe("MarkdownRenderer emphasis", () => {
  it("keeps underscores inside an identifier and still emphasizes a marked phrase", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"见 doi:10.1162/isec_a_00383。期刊是 _International Security_。"}
      />
    );
    expect(container.textContent).toContain("isec_a_00383");
    expect(container.querySelector("em")?.textContent).toBe("International Security");
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

  it("links a lowercase doi and keeps the prefix as written", () => {
    const { container } = render(
      <MarkdownRenderer content={"参考文献。doi:10.1162/isec_a_00383。"} />
    );
    const link = container.querySelector('a[href="https://doi.org/10.1162/isec_a_00383"]');
    expect(link).not.toBeNull();
    expect(link!.textContent).toBe("doi:10.1162/isec_a_00383");
    expect(link!.nextSibling?.textContent).toBe("。");
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
  it("renders the P vs NP article's plain relations without consuming prices or code", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"若 $P=NP$ 或 $ P = NP $，令 $x + 1$。Prices are $100 or $75,000; code `$P=NP$`."}
      />
    );
    expect(
      Array.from(container.querySelectorAll('[role="math"]')).map((node) =>
        node.getAttribute("aria-label")
      )
    ).toEqual(["P=NP", " P = NP ", "x + 1"]);
    expect(container.textContent).toContain("Prices are $100 or $75,000;");
    expect(container.querySelector("code")?.textContent).toBe("$P=NP$");
  });

  it("renders the probability article's compact fractions without treating prices as math", () => {
    const { container } = render(
      <MarkdownRenderer content={"概率 $1/2$ 在 $0$ 与 $1$ 之间。Prices are $100 or $75,000."} />
    );
    expect(
      Array.from(container.querySelectorAll('[role="math"]')).map((node) =>
        node.getAttribute("aria-label")
      )
    ).toEqual(["1/2", "0", "1"]);
    expect(container.textContent).toContain("Prices are $100 or $75,000.");
  });
  it("renders simple variables beside TeX without consuming currency or code", () => {
    const content =
      "系统（$S$）与环境（$E$），质量 $m$，温度 $T$。价格 $100 万或 $75,000；代码 `$S$`。";
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(
      Array.from(container.querySelectorAll('[role="math"]')).map((node) =>
        node.getAttribute("aria-label")
      )
    ).toEqual(["S", "E", "m", "T"]);
    expect(container.textContent).toContain("$100 万或 $75,000");
    expect(container.querySelector("code")?.textContent).toBe("$S$");
  });

  it("renders signed and mixed arithmetic as math without consuming prices", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"值在 $1-s$ 与 $s=-1$，比例靠近 $1/e$。Prices are $100 or $75,000."}
      />
    );
    expect(
      Array.from(container.querySelectorAll('[role="math"]')).map((node) =>
        node.getAttribute("aria-label")
      )
    ).toEqual(["1-s", "s=-1", "1/e"]);
    expect(container.textContent).toContain("Prices are $100 or $75,000.");
  });

  it("renders ordinary inline TeX as math, not raw dollars", () => {
    const { container } = render(<MarkdownRenderer content={"面积是 $x^2$ 。"} />);
    expect(container.querySelector('[role="math"]')).not.toBeNull();
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("does not warn about Chinese text inside a formula", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<MarkdownRenderer content={"$$v_{球} = 2^x$$"} />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
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

describe("MarkdownRenderer corpus regressions", () => {
  it("keeps hyphenated footnote ids and their citation text", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"质量上限[^katrin-2022]。\n\n[^katrin-2022]: KATRIN 合作组，2022。"}
      />
    );
    expect(container.querySelector('a[href="#fn-katrin-2022"]')?.textContent).toBe("[katrin-2022]");
    expect(container.querySelector("#fn-katrin-2022")?.textContent).toContain("KATRIN 合作组");
    expect(container.querySelector(".md-p")?.textContent).not.toContain("[^");
  });

  it("splits a heading and a list glued under a paragraph line", () => {
    const { container } = render(
      <MarkdownRenderer
        content={"## 养殖\n\n需要平衡：\n- 甲\n- 乙\n后续说明。\n## 参考文献\n- 文献"}
      />
    );
    expect([...container.querySelectorAll("h2")].map((h) => h.id)).toEqual(["养殖", "参考文献"]);
    expect(container.querySelector(".md-p")?.textContent).toBe("需要平衡：");
    const lists = container.querySelectorAll("ul");
    expect([...lists[0]!.querySelectorAll("li")].map((li) => li.textContent)).toEqual([
      "甲",
      "乙\n后续说明。",
    ]);
    expect(lists[1]!.dataset.variant).toBe("references");
  });

  it("does not split lines inside a display formula", () => {
    const { container } = render(<MarkdownRenderer content={"推导：\n$$\na\n- b\n$$"} />);
    expect(container.querySelector("ul")).toBeNull();
    expect(container.querySelector('[role="math"]')?.getAttribute("aria-label")).toBe("a\n- b");
  });

  it("uses a bolded misconception as the claim and the block under it as the fact", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "## 破除误解\n\n**误解一：S3 的桶里有文件夹。**\n\n没有。键空间是扁平的。\n\n由此产生一串后果。\n\n**误解二：键名无所谓。** 恰恰相反。"
        }
      />
    );
    const cards = container.querySelectorAll(".myth-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]!.querySelector("s")!.textContent).toBe("误解一：S3 的桶里有文件夹。");
    expect(cards[0]!.querySelector(".myth-card__fact")!.textContent).toBe(
      "实情没有。键空间是扁平的。"
    );
    expect(cards[0]!.textContent).toContain("由此产生一串后果。");
    expect(cards[1]!.querySelector("s")!.textContent).toBe("误解二：键名无所谓。");
    expect(cards[1]!.querySelector(".myth-card__fact")!.textContent).toBe("实情恰恰相反。");
    expect(container.textContent).not.toContain("**");
  });

  it("keeps pipes inside math, code and escapes within one table cell", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "| 名称 | 定义 |\n| --- | --- |\n| 绝对值函数 | $f(x) = |x|$ |\n| 分区 | `3 1` \\| **4** |\n| 范数 | $\\|x\\|^2$ |\n| 价格 | $100 |"
        }
      />
    );
    const rows = [...container.querySelectorAll("tbody tr")].map((row) =>
      [...row.querySelectorAll("td")].map((cell) => cell.textContent)
    );
    expect(rows.map((row) => row.length)).toEqual([2, 2, 2, 2]);
    expect(rows[0]![1]).not.toContain("$");
    expect(container.querySelector("tbody tr td:nth-child(2) .katex")).not.toBeNull();
    expect(rows[1]![1]).toBe("3 1 | 4");
    expect(rows[2]![1]).not.toContain("$");
    expect(rows[3]![1]).toBe("$100");
  });

  it("gives math headings a plain TOC label", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "## $\\zeta$ 函数与 [[riemann-hypothesis|黎曼猜想]]\n\n正文。\n\n### **加粗** 小节\n\n正文。"
        }
      />
    );
    expect(container.querySelector("h2")!.dataset.tocLabel).toBe("ζ 函数与 黎曼猜想");
    expect(container.querySelector("h3")!.dataset.tocLabel).toBe("加粗 小节");
  });

  it("continues ordered numbering and nests indented items", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "1. 初始化\n\n说明段落。\n\n2. 重复以下步骤：\n   - 取出最小的两棵\n   - 合并成新节点\n3. 结束"
        }
      />
    );
    const lists = [...container.querySelectorAll("ol")].filter((list) => !list.closest("li"));
    expect(lists).toHaveLength(2);
    expect(lists[0]!.getAttribute("start")).toBeNull();
    expect(lists[1]!.getAttribute("start")).toBe("2");
    const items = [...lists[1]!.children];
    expect(items).toHaveLength(2);
    const nested = items[0]!.querySelectorAll("ul > li");
    expect([...nested].map((li) => li.textContent)).toEqual(["取出最小的两棵", "合并成新节点"]);
    expect(container.textContent).not.toContain("- ");
  });

  it("does not open italics on a lone star followed by a space", () => {
    const { container } = render(
      <MarkdownRenderer content={"π* 轨道与 A* 搜索，*真斜体*，*外 **内** 外*。"} />
    );
    const ems = [...container.querySelectorAll("em")].map((em) => em.textContent);
    expect(ems).toEqual(["真斜体", "外 内 外"]);
    expect(container.textContent).toContain("π* 轨道与 A* 搜索");
  });

  it("keeps balanced parentheses in a link URL", () => {
    const { container } = render(
      <MarkdownRenderer
        content={
          "[DOI: 10.1016/S0140-6736(25)01375-3](https://doi.org/10.1016/S0140-6736(25)01375-3)。"
        }
      />
    );
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("https://doi.org/10.1016/S0140-6736(25)01375-3");
    expect(container.querySelector(".md-p")?.textContent).toBe(
      "DOI: 10.1016/S0140-6736(25)01375-3。"
    );
  });
});

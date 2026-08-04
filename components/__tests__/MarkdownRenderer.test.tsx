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
    expect(h2s[0]!.textContent).toBe("中途大标题");
  });

  it("keeps bodies without any `# ` block untouched", () => {
    const { container } = render(
      <MarkdownRenderer content={"直接开场。\n\n## 第一节\n\n正文。"} />
    );
    expect(container.textContent).toContain("直接开场");
    expect(container.querySelectorAll("h2")).toHaveLength(1);
  });
});

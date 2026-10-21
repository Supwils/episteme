// @vitest-environment happy-dom
import React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { toSearchableText } from "@/lib/search/extract";

afterEach(cleanup);

describe("Chinese inline mathematics", () => {
  it.each([
    ["bellman-ford", String.raw`\text{ 的出队次数}`, "出队次数"],
    ["string-matching", String.raw`\text{输出}`, "输出"],
    ["convex-hull", String.raw`\text{近似值}`, "近似值"],
  ])("keeps the published %s formula intact at its dollar boundaries", (slug, marker, label) => {
    const source = readFileSync(
      join(process.cwd(), "content/computer-science/algorithms", `${slug}.mdx`),
      "utf8"
    );
    const paragraph = source.split("\n").find((line) => line.includes(marker));
    expect(paragraph).toBeDefined();
    const { container } = render(<MarkdownRenderer content={paragraph!} />);
    expect(container.querySelector(".katex-error")).toBeNull();
    const formulas = Array.from(container.querySelectorAll('[role="math"]'));
    expect(
      formulas.some((math) => math.querySelector(".katex-html")?.textContent?.includes(label))
    ).toBe(true);
    expect(toSearchableText(paragraph!)).not.toMatch(/[\\$]/);
  });

  it.each([
    [String.raw`P(\text{正确}) = 1/3`, "正确"],
    [String.raw`\rho_{流体}`, "流体"],
    [String.raw`V_{排开}`, "排开"],
    [String.raw`7\,\mu s/天`, "天"],
    [
      String.raw`M = \{c \in \mathbb{C} : \text{序列 } z_{n+1} = z_n^2 + c, z_0 = 0 \text{ 有界}\}`,
      "有界",
    ],
    [String.raw`K_c = \{z \in \mathbb{C} : \text{迭代 } z \mapsto z^2 + c \text{ 有界}\}`, "迭代"],
    [String.raw`T_{\text{房间\{一\}}} = 20`, "房间"],
  ])("renders the formula and keeps its Chinese search text: %s", (tex, label) => {
    const content = `前文 $${tex}$，后文。`;
    const { container } = render(<MarkdownRenderer content={content} />);
    const math = container.querySelector('[role="math"]');
    expect(math?.getAttribute("aria-label")).toBe(tex);
    expect(math?.querySelector(".katex-error")).toBeNull();
    expect(math?.querySelector(".katex-html")?.textContent).toContain(label);
    expect(container.textContent).toContain("后文。");
    const text = toSearchableText(content);
    expect(text).toContain(label);
    expect(text).not.toMatch(/[\\$]/);
  });

  it("preserves prices and ordinary prose beside a Chinese formula", () => {
    const content = String.raw`从 $100 到 $200，文件 foo_bar $300 万；概率 $P(\text{正确}) = 1/3$。`;
    const { container } = render(<MarkdownRenderer content={content} />);
    expect(container.querySelectorAll('[role="math"]')).toHaveLength(1);
    expect(container.textContent).toContain("从 $100 到 $200，文件 foo_bar $300 万；概率");
    expect(toSearchableText(content)).toContain("从 $100 到 $200");
  });

  it("does not promote an earlier price because prose later contains a command or path", () => {
    const prices = String.raw`价格 $100 万（C:\temp，变量 \rho_{流体}）到 $200 万`;
    const { container } = render(
      <MarkdownRenderer content={`${prices}，概率 $P(\\text{正确})=1/3$。`} />
    );
    expect(container.querySelectorAll('[role="math"]')).toHaveLength(1);
    expect(container.textContent).toContain(prices);
    expect(toSearchableText(prices)).toContain("价格 $100 万");
  });

  it("keeps HTML and URL extensions untrusted inside Chinese formulas", () => {
    const { container } = render(
      <MarkdownRenderer
        content={String.raw`$\href{javascript:alert(1)}{\text{点击}}$ $\htmlClass{injected}{\text{中文}}$`}
      />
    );
    expect(container.querySelectorAll('[role="math"]')).toHaveLength(2);
    expect(container.querySelector("a, .injected")).toBeNull();
  });

  it("leaves malformed Chinese TeX visible through the existing KaTeX error fallback", () => {
    const tex = String.raw`\frac{\text{中文}}{`;
    const { container } = render(<MarkdownRenderer content={`$${tex}$`} />);
    expect(container.querySelector(".katex-error")?.textContent).toBe(tex);
  });
});

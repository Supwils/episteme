import { describe, expect, it } from "vitest";
import { toSearchableText } from "../extract";
import { isInlineMath, plainMath, replaceSearchMath } from "../plain-math";

const CONVERGENCE =
  "**大数定律**：$\\bar{X}_n \\xrightarrow{a.s.} \\mu$（强大数定律）或 $\\bar{X}_n \\xrightarrow{P} \\mu$（弱大数定律）。**中心极限定理**：$\\sqrt{n}(\\bar{X}_n - \\mu)/\\sigma \\xrightarrow{d} N(0,1)$——依分布收敛的经典应用。";

describe("plainMath", () => {
  it("turns the convergence formulas into plain text", () => {
    expect(plainMath("\\bar{X}_n \\xrightarrow{P} \\mu")).toBe("X̄ₙ → μ");
    expect(plainMath("\\sqrt{n}(\\bar{X}_n - \\mu)/\\sigma \\xrightarrow{d} N(0,1)")).toBe(
      "√n(X̄ₙ - μ)/σ → N(0,1)"
    );
  });

  it("keeps a relation that has no TeX command", () => {
    expect(plainMath("P=NP")).toBe("P=NP");
    expect(plainMath("P = NP")).toBe("P = NP");
  });

  it("never leaves a backslash", () => {
    expect(plainMath("\\unknown{q} + \\frac{1}{2}")).not.toContain("\\");
  });
});

describe("replaceSearchMath", () => {
  it.each([
    String.raw`I(\text{明文}; \text{密文}) = 0`,
    String.raw`\text{LP 值} \leq \text{OPT}`,
    String.raw`\rho_{流体}`,
    String.raw`V_{排开}`,
    String.raw`7\,\mu s/天`,
    String.raw`M = \{c \in \mathbb{C} : \text{序列 } z_{n+1} = z_n^2 + c, z_0 = 0 \text{ 有界}\}`,
    String.raw`\text{央行政策利率} \rightarrow \text{银行间拆借利率}`,
  ])("shares the Chinese TeX boundary with the renderer: %s", (tex) => {
    expect(isInlineMath(tex)).toBe(true);
    const text = replaceSearchMath(`公式 $${tex}$。`);
    expect(text).toBe(`公式  ${plainMath(tex)} 。`);
    expect(text).not.toMatch(/[\\$]/);
  });

  it.each([
    "从 $100 到 $200，样本 $n$ 增长",
    "报价 $100 万，文件名 foo_bar，到 $200 万",
    String.raw`路径 C:\报价，价格 $100 到 $200`,
    "配置 $100 {折扣}，另付 $20",
    String.raw`价格 $100 万（C:\temp）到 $200 万`,
    String.raw`从 $100 万，变量 \rho_{流体}，到 $200 万`,
    "$普通中文$和$另一段文字$",
  ])("preserves ordinary Chinese and currency in %s", (text) => {
    expect(replaceSearchMath(text)).toBe(text.replace("$n$", " n "));
  });

  it("keeps a rejected amount from consuming the next Chinese formula", () => {
    expect(replaceSearchMath(String.raw`从 $100 到 $200，概率 $P(\text{正确}) = 1/3$。`)).toBe(
      "从 $100 到 $200，概率  P(正确) = 1/3 。"
    );
  });

  it("leaves currency in place and still reads a later formula", () => {
    expect(isInlineMath("100 到 ")).toBe(false);
    expect(replaceSearchMath("从 $100 到 $200，样本 $n$ 增长")).toBe(
      "从 $100 到 $200，样本  n  增长"
    );
  });

  it("does not treat a dollar amount as a formula", () => {
    expect(replaceSearchMath("约 $75,000 与 $100 万")).toBe("约 $75,000 与 $100 万");
  });
});

describe("toSearchableText math", () => {
  it("shows the convergence sentence without TeX source", () => {
    const text = toSearchableText(CONVERGENCE);
    expect(text).toContain("中心极限定理");
    expect(text).toContain("X̄ₙ → μ");
    expect(text).toContain("√n(X̄ₙ - μ)/σ → N(0,1)");
    expect(text).not.toContain("\\");
    expect(text).not.toContain("$");
  });

  it("keeps a display formula readable and drops the dollars", () => {
    expect(toSearchableText("当\n$$\\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}}$$\n时")).toBe(
      "当 (X̄ₙ - μ)/(σ / √n) 时"
    );
  });

  it("reads function notation followed by a relation as math", () => {
    for (const tex of ["f(x) = |x|", "T(n) = 2T(n/2) + O(n)", "d(x,y)=d(y,x)", "R(3,3) > 5"]) {
      expect(isInlineMath(tex)).toBe(true);
    }
    expect(isInlineMath("5 涨到 ")).toBe(false);
    expect(isInlineMath("100 and ")).toBe(false);
  });
});

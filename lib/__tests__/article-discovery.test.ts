import { describe, expect, it } from "vitest";
import { deriveAskPrompts, deriveTakeaway } from "@/lib/article-discovery";
import { parseHeadingLine, slugifyHeading } from "@/lib/markdown-heading";

describe("markdown-heading", () => {
  it("slugifies CJK headings the same way article anchors do", () => {
    expect(slugifyHeading("破除误解")).toBe("破除误解");
    expect(slugifyHeading("跨域连接")).toBe("跨域连接");
    expect(parseHeadingLine("破除误解：霸权不等于帝国").id).toBe("破除误解-霸权不等于帝国");
    expect(parseHeadingLine("核心 {#core}").id).toBe("core");
  });
});

describe("deriveTakeaway", () => {
  it("prefers explicit frontmatter insight", () => {
    const t = deriveTakeaway("## 破除误解\n\n正文。", "债务率相同，持有人结构不同，脆弱性就不同。");
    expect(t).toContain("持有人结构");
  });

  it("derives from 破除误解 section when present", () => {
    const content = `## 破除误解

日本经济最常被写成失去的三十年。这个说法有解释力，但它也容易遮蔽真实韧性。

日本债务以日元计价，风险不在外债违约，而在利息、汇率与代际分配。

## 增长

增长段落。
`;
    const t = deriveTakeaway(content);
    expect(t).toBeTruthy();
    expect(t!.length).toBeGreaterThanOrEqual(24);
    expect(t).toMatch(/债务|日元|风险/);
  });

  it("returns null when there is no usable insight", () => {
    expect(deriveTakeaway("## 增长\n\n短。")).toBeNull();
  });
});

describe("deriveAskPrompts", () => {
  it("only links to headings that exist", () => {
    const content = `## 破除误解：不是帝国

正文。

## 核心：霸权稳定论

更多。

## 跨域连接

- 链接

## 参考文献

- 书
`;
    const prompts = deriveAskPrompts(content);
    expect(prompts.length).toBeGreaterThanOrEqual(2);
    expect(prompts.some((p) => p.label.includes("误解"))).toBe(true);
    expect(prompts.some((p) => p.href.includes("跨域连接"))).toBe(true);
    expect(prompts.every((p) => p.href.startsWith("#"))).toBe(true);
  });

  it("hides when fewer than two anchors match", () => {
    expect(deriveAskPrompts("## 参考文献\n\n- a").length).toBeLessThan(2);
  });
});

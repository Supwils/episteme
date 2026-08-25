import { describe, expect, it } from "vitest";
import { deriveAskPrompts, deriveTakeaway } from "@/lib/article-discovery";
import { extractH2Headings, parseHeadingLine, slugifyHeading } from "@/lib/markdown-heading";

describe("markdown-heading", () => {
  it("slugifies CJK headings the same way article anchors do", () => {
    expect(slugifyHeading("破除误解")).toBe("破除误解");
    expect(slugifyHeading("跨域连接")).toBe("跨域连接");
    expect(parseHeadingLine("破除误解：霸权不等于帝国").id).toBe("破除误解-霸权不等于帝国");
    expect(parseHeadingLine("核心 {#core}").id).toBe("core");
    expect(slugifyHeading("<em>破除误解</em>")).toBe("破除误解");
  });

  it("extracts only ATX h2 lines and honors explicit ids", () => {
    const heads = extractH2Headings(`# 标题
## 破除误解 {#myth}
### 不是 h2
## 跨域连接
`);
    expect(heads.map((h) => h.id)).toEqual(["myth", "跨域连接"]);
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

  it("truncates an overlong frontmatter insight and ignores a too-short one", () => {
    const long = "甲".repeat(160);
    const truncated = deriveTakeaway("## 增长\n\n短。", long);
    expect(truncated).toHaveLength(140);
    expect(truncated?.endsWith("…")).toBe(true);
    expect(deriveTakeaway("## 增长\n\n短。", "太短了")).toBeNull();
    expect(deriveTakeaway("## 增长\n\n短。", "   ")).toBeNull();
  });
});

describe("deriveAskPrompts", () => {
  it("uses the explicit heading id in prompt hrefs", () => {
    const prompts = deriveAskPrompts(`## 破除误解 {#myth}

这段必须足够长，才能被带走句抽出来作为原来如此。

## 增长

增长段落也写得足够长，超过二十四字以免被丢掉。
`);
    expect(prompts.some((p) => p.href === "#myth")).toBe(true);
    const takeaway = deriveTakeaway(`## 破除误解 {#myth}

这段必须足够长，才能被带走句抽出来作为原来如此。
`);
    expect(takeaway).toMatch(/带走句|原来如此|足够长/);
  });

  it("falls back to 往下看核心章节 when there is no 破除误解 or 核心", () => {
    const prompts = deriveAskPrompts(`## 历史背景

背景段落。

## 跨域连接

- 链接
`);
    expect(prompts.some((p) => p.label === "往下看核心章节" && p.href === "#历史背景")).toBe(true);
  });

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

  it("does not treat 代价 or apparatus headings as the core chapter", () => {
    const prompts = deriveAskPrompts(`## 代价：谁来买单

短。

## 参考文献

- 书
`);
    expect(prompts.some((p) => p.href.includes("代价"))).toBe(false);
    expect(prompts.length).toBeLessThan(2);
  });
});

import { describe, expect, it } from "vitest";
import { extractHeadings, toSearchableText } from "../extract";

describe("extractHeadings", () => {
  it("collects level 2 and 3 headings", () => {
    const md = ["# 标题", "正文", "## 热力学第二定律", "正文", "### 熵增原理"].join("\n");
    expect(extractHeadings(md)).toEqual(["热力学第二定律", "熵增原理"]);
  });

  it("ignores the level 1 title and deeper levels", () => {
    const md = ["# 一级", "#### 四级", "##### 五级"].join("\n");
    expect(extractHeadings(md)).toEqual([]);
  });

  it("ignores hashes inside fenced code blocks", () => {
    const md = ["## 真标题", "```py", "## 这是注释不是标题", "```"].join("\n");
    expect(extractHeadings(md)).toEqual(["真标题"]);
  });

  it("strips inline markdown from heading text", () => {
    expect(extractHeadings("## **玻尔兹曼**的 `S = k log W`")).toEqual(["玻尔兹曼的 S = k log W"]);
  });
});

describe("toSearchableText", () => {
  it("drops fenced code blocks", () => {
    expect(toSearchableText("正文\n```js\nconst x = 1;\n```\n结尾")).toBe("正文 结尾");
  });

  it("keeps link text and drops the target", () => {
    expect(toSearchableText("参见[热力学](/physics/thermo)一文")).toBe("参见热力学一文");
  });

  it("keeps wiki-link text and drops the brackets", () => {
    expect(toSearchableText("参见[[熵增原理]]")).toBe("参见熵增原理");
    expect(toSearchableText("参见[[entropy|熵增原理]]")).toBe("参见熵增原理");
  });

  it("collapses whitespace so phrases survive line wrapping", () => {
    expect(toSearchableText("热力学\n第二定律")).toBe("热力学 第二定律");
  });

  it("removes heading markers but keeps the heading words", () => {
    expect(toSearchableText("## 熵增原理\n正文")).toBe("熵增原理 正文");
  });

  it("removes emphasis markers without eating the words", () => {
    expect(toSearchableText("**玻尔兹曼**与*吉布斯*")).toBe("玻尔兹曼与吉布斯");
  });

  it("returns an empty string for content that is only markup", () => {
    expect(toSearchableText("---\n\n> \n")).toBe("");
  });
});

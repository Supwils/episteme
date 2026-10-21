import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { extractExcerpt, safeParseMatter } from "@/lib/content-utils";

describe("extractExcerpt", () => {
  it("ends on a sentence boundary instead of cutting mid-thought", () => {
    const raw = readFileSync("content/law/foundations/why-law-exists.mdx", "utf8");
    const excerpt = extractExcerpt(safeParseMatter(raw).content);
    expect(excerpt).toMatch(/[。！？」”]$/);
    expect(excerpt).not.toContain("…");
    // The law piece used to preview as "…第二个误解，…" — the next paragraph.
    expect(excerpt).not.toContain("第二个误解");
  });

  it("keeps whole sentences within the budget and always keeps the first", () => {
    const body =
      "第一句话在这里结束了。第二句话也在这里结束了。第三句会超出预算所以不该出现在预览里。";
    expect(extractExcerpt(body, 24)).toBe("第一句话在这里结束了。第二句话也在这里结束了。");
    expect(extractExcerpt(body, 5)).toBe("第一句话在这里结束了。");
  });

  it("skips headings, lists, tables and short lines, and keeps link text only", () => {
    const body = [
      "## 破除误解",
      "",
      "- 一个列表项不是导语",
      "| 表 | 格 |",
      "",
      "短行。",
      "",
      "这段引用了[[platos-cave|洞穴比喻]]和[一篇论文](https://example.org)，**加粗**也要去掉标记。",
    ].join("\n");
    expect(extractExcerpt(body)).toBe("这段引用了洞穴比喻和一篇论文，加粗也要去掉标记。");
  });

  it("passes over keyword lines, rules and colon lead-ins that have no sentence end", () => {
    const body = [
      "## 关键词",
      "",
      "水利社会; 东方专制主义; 魏特夫; 亚细亚生产方式; 灌溉农业; 官僚制",
      "",
      "---",
      "",
      "他提出了一个覆盖数千年、跨越四大洲的因果链：",
      "",
      "- 灌溉需要调集海量劳力",
      "",
      "这条因果链后来被逐一检验，多数环节没有经受住反例。",
    ].join("\n");
    expect(extractExcerpt(body)).toBe("这条因果链后来被逐一检验，多数环节没有经受住反例。");
  });

  it("falls back to the first long paragraph when no paragraph ends a sentence", () => {
    expect(extractExcerpt("只有一行没有句号的说明文字，长度也超过了二十个字")).toBe(
      "只有一行没有句号的说明文字，长度也超过了二十个字"
    );
  });
});

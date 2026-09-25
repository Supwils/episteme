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
});

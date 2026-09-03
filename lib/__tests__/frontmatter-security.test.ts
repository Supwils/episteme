import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";

// Exercise the parser gray-matter actually resolves, not another hoisted major.
const requireFromMatter = createRequire(createRequire(import.meta.url).resolve("gray-matter"));
const yaml = requireFromMatter("js-yaml") as {
  safeLoad(source: string, options?: { maxTotalMergeKeys: number }): unknown;
};

describe("frontmatter parser safety", () => {
  it("counts empty mappings toward the YAML merge work budget", () => {
    const source = "defaults: &defaults [{}, {}, {}, {}]\nitem:\n  <<: *defaults\n";
    expect(() => yaml.safeLoad(source, { maxTotalMergeKeys: 3 })).toThrow(/merge/i);
  });

  it("preserves ordinary frontmatter, aliases and content", () => {
    const parsed = matter(
      "---\ntitle: 测试\ntags: [知识, 阅读]\nbase: &base {level: 1}\nitem:\n  <<: *base\n---\n正文。"
    );
    expect(parsed.data).toMatchObject({
      title: "测试",
      tags: ["知识", "阅读"],
      item: { level: 1 },
    });
    expect(parsed.content.trim()).toBe("正文。");
  });

  it("continues to reject executable YAML tags", () => {
    expect(() =>
      matter("---\nvalue: !!js/function 'function () { return 42; }'\n---\n正文。")
    ).toThrow();
  });
});

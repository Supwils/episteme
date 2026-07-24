import { describe, expect, it } from "vitest";
import { buildCorpus, locate, snippet } from "../corpus";

describe("buildCorpus", () => {
  it("records where each body starts", () => {
    const { text, offsets } = buildCorpus(["熵增", "热力学"]);
    expect(offsets).toEqual([0, 3]);
    expect(text.slice(offsets[0]!, offsets[0]! + 2)).toBe("熵增");
    expect(text.slice(offsets[1]!, offsets[1]! + 3)).toBe("热力学");
  });

  it("separates bodies with a newline so no phrase spans two articles", () => {
    // Bodies are whitespace-collapsed before they get here, so a newline cannot
    // occur inside one — it is an unambiguous document boundary.
    const { text } = buildCorpus(["热力", "学第"]);
    expect(text.includes("热力学")).toBe(false);
    expect(text).toBe("热力\n学第");
  });

  it("handles an empty body without losing later offsets", () => {
    const { text, offsets } = buildCorpus(["甲", "", "乙"]);
    expect(text.slice(offsets[2]!, offsets[2]! + 1)).toBe("乙");
  });
});

describe("locate", () => {
  const offsets = [0, 10, 20, 30];

  it("maps a position inside a body to that body", () => {
    expect(locate(offsets, 0)).toBe(0);
    expect(locate(offsets, 5)).toBe(0);
    expect(locate(offsets, 10)).toBe(1);
    expect(locate(offsets, 29)).toBe(2);
    expect(locate(offsets, 30)).toBe(3);
    expect(locate(offsets, 999)).toBe(3);
  });

  it("agrees with a linear scan across every position", () => {
    const { text, offsets: real } = buildCorpus(["甲甲甲", "乙乙", "丙丙丙丙"]);
    for (let p = 0; p < text.length; p++) {
      let expected = 0;
      for (let d = 0; d < real.length; d++) if (real[d]! <= p) expected = d;
      expect(locate(real, p)).toBe(expected);
    }
  });
});

describe("snippet", () => {
  const body = "在十九世纪中叶，克劳修斯提出了热力学第二定律，随后玻尔兹曼给出统计解释。";
  const single = buildCorpus([body]);

  it("returns the match with surrounding context", () => {
    const s = snippet(single, body.indexOf("热力学第二定律"), 7, 8);
    expect(s.text).toContain("热力学第二定律");
    expect(s.text).toContain("克劳修斯"); // 8 characters of lead-in reaches the subject
    expect(s.text).toContain("随后玻尔兹曼"); // and the same amount of trailing context
  });

  it("reports where the match sits inside the returned snippet", () => {
    const s = snippet(single, body.indexOf("热力学第二定律"), 7, 6);
    expect(s.text.slice(s.matchStart, s.matchStart + 7)).toBe("热力学第二定律");
  });

  it("does not run past the start or end of the document", () => {
    const head = snippet(single, 0, 2, 50);
    expect(head.matchStart).toBe(0);
    expect(head.text.startsWith("在十")).toBe(true);

    const tail = snippet(single, body.length - 2, 2, 50);
    expect(tail.text.endsWith("解释。")).toBe(true);
  });

  it("never bleeds prose from a neighbouring article into the snippet", () => {
    // Document bounds are derived, not passed in, so a caller cannot forget them.
    const corpus = buildCorpus(["前一篇的结尾", "后一篇的开头"]);
    const s = snippet(corpus, corpus.offsets[1]!, 3, 20);
    expect(s.text).not.toContain("前一篇");
    expect(s.text.slice(s.matchStart, s.matchStart + 3)).toBe("后一篇");

    const back = snippet(corpus, 3, 3, 20);
    expect(back.text).not.toContain("后一篇");
  });
});

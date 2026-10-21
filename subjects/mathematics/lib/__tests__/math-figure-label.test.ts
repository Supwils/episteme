import { describe, expect, it } from "vitest";
import { getMathParadoxBySlug } from "../paradoxes";
import { mathFigureLabel } from "../mathematician-label";

describe("mathFigureLabel", () => {
  it("resolves the Zeno paradox figures without changing the stored slugs", () => {
    const paradox = getMathParadoxBySlug("zeno-paradoxes");
    expect(paradox?.key_figures).toEqual(["zeno", "aristotle", "cantor"]);
    const text = paradox?.content ?? "";
    expect(mathFigureLabel("zeno", text)).toBe("芝诺");
    expect(mathFigureLabel("aristotle", text)).toBe("亚里士多德");
    expect(mathFigureLabel("cantor", text)).toBe("康托尔");
  });

  it("leaves a slug with no person page and no Chinese pairing unchanged", () => {
    expect(mathFigureLabel("not-a-person", "正文里没有与这个 slug 配对的中文名。")).toBe(
      "not-a-person"
    );
  });

  it("shows the envelope term instead of the token", () => {
    const paradox = getMathParadoxBySlug("two-envelope");
    expect(paradox?.key_figures).toContain("expected_value");
    expect(mathFigureLabel("expected_value", paradox?.content ?? "")).toBe("期望值");
  });
});

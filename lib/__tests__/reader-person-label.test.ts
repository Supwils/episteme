import { describe, expect, it } from "vitest";
import { chineseNameBesideLatin } from "@/lib/reader-person-label";

describe("chineseNameBesideLatin", () => {
  const zeno = "芝诺（Zeno of Elea，约前490—前430）据记载提出了这些论证。";

  it("reads the Chinese name already written beside the Latin form", () => {
    expect(chineseNameBesideLatin(zeno, "zeno")).toBe("芝诺");
    expect(chineseNameBesideLatin("冯·诺伊曼（von Neumann）", "von_neumann")).toBe("冯·诺伊曼");
    expect(chineseNameBesideLatin("**埃尔德什**（Paul Erdős，1913—1996）", "erdos")).toBe(
      "埃尔德什"
    );
    expect(chineseNameBesideLatin("**哥德尔**（Gödel）", "goedel")).toBe("哥德尔");
    expect(chineseNameBesideLatin("德拉姆（de Rham）", "derham")).toBe("德拉姆");
    expect(chineseNameBesideLatin("米勒（Stanley Miller）做了这个实验。", "Stanley Miller")).toBe(
      "米勒"
    );
  });

  it("does not invent a name, and refuses an ambiguous pair", () => {
    expect(chineseNameBesideLatin(zeno, "aristotle")).toBeNull();
    expect(
      chineseNameBesideLatin("米勒-尤里实验证明氨基酸可以合成。", "Stanley Miller")
    ).toBeNull();
    expect(chineseNameBesideLatin("甲（Zeno）与乙（Zeno of Elea）", "zeno")).toBeNull();
    expect(chineseNameBesideLatin("芝诺（Zeno）", "芝诺")).toBeNull();
  });

  it("uses a two-part surname only when the full name is absent", () => {
    expect(chineseNameBesideLatin("库兹涅茨（Kuznets, 1934）", "Simon Kuznets")).toBe("库兹涅茨");
    expect(chineseNameBesideLatin("霍尔（Hall, 1990）", "monty_hall")).toBeNull();
  });
});

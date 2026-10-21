import { describe, expect, it } from "vitest";
import { readerKeyFigureLabel } from "@/lib/reader-key-figure-label";

describe("readerKeyFigureLabel", () => {
  it("uses a Chinese name already written beside the full Latin name", () => {
    const text = "它们由卡尼曼（Daniel Kahneman）和特沃斯基（Amos Tversky）提出。";
    expect(readerKeyFigureLabel(text, "Daniel Kahneman")).toBe("卡尼曼");
    expect(readerKeyFigureLabel(text, "Amos Tversky")).toBe("特沃斯基");
  });

  it("reads through bold and a wiki pipe", () => {
    const text =
      "瑞典经济学家**埃利·赫克歇尔**（Eli Heckscher）的学生**贝蒂尔·俄林**（[[bertil-ohlin|Bertil Ohlin]]）。" +
      "赫克歇尔-俄林模型（Heckscher-Ohlin model）是另一回事。";
    expect(readerKeyFigureLabel(text, "Eli Heckscher")).toBe("埃利·赫克歇尔");
    expect(readerKeyFigureLabel(text, "Bertil Ohlin")).toBe("贝蒂尔·俄林");
  });

  it("keeps year-citations and term glosses in the original Latin", () => {
    const text =
      "莱因哈特和罗戈夫（Carmen Reinhart & Kenneth Rogoff）指出这一点（Reinhart & Rogoff, 2009）。" +
      "政策制定的核心参考（Kuznets, 1934）。**地理决定论**（Jeffrey Sachs）强调地理。";
    expect(readerKeyFigureLabel(text, "Kenneth Rogoff")).toBe("罗戈夫");
    expect(readerKeyFigureLabel(text, "Carmen Reinhart")).toBe("Carmen Reinhart");
    expect(readerKeyFigureLabel(text, "Simon Kuznets")).toBe("Simon Kuznets");
    expect(readerKeyFigureLabel(text, "Jeffrey Sachs")).toBe("Jeffrey Sachs");
  });

  it("keeps a slug when the body never glosses that person", () => {
    expect(readerKeyFigureLabel("没有括号。", "l-randall-wray")).toBe("l-randall-wray");
    expect(readerKeyFigureLabel("庇古（Arthur Pigou）", "庇古")).toBe("庇古");
  });
});

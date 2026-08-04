// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MathParadoxesListBrowser } from "../mathematics/MathParadoxesListBrowser";
import type { MathParadoxItem } from "../mathematics/MathParadoxesListBrowser";

const paradoxes: MathParadoxItem[] = [
  {
    slug: "zeno",
    title: "芝诺悖论",
    title_en: "Zeno's Paradox",
    field: "分析",
    key_figures: ["芝诺"],
    tags: ["无穷"],
  },
  {
    slug: "russell",
    title: "罗素悖论",
    title_en: "Russell's Paradox",
    field: "逻辑",
    key_figures: ["罗素"],
    tags: ["集合论"],
  },
  {
    slug: "banach-tarski",
    title: "巴拿赫-塔斯基悖论",
    title_en: "Banach–Tarski Paradox",
    field: "几何",
    key_figures: ["巴拿赫", "塔斯基"],
    tags: ["选择公理"],
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(<MathParadoxesListBrowser paradoxes={paradoxes} />);
}

describe("MathParadoxesListBrowser", () => {
  it("renders every paradox grouped by field", () => {
    renderBrowser();
    expect(screen.getByText("芝诺悖论")).toBeTruthy();
    expect(screen.getByText("罗素悖论")).toBeTruthy();
    expect(screen.getByText("巴拿赫-塔斯基悖论")).toBeTruthy();
  });

  it("filters by free-text query across title, EN title and tags", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索数学悖论"), {
      target: { value: "集合论" },
    });
    expect(screen.queryByText("罗素悖论")).toBeTruthy();
    expect(screen.queryByText("芝诺悖论")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by field chip and toggles back to all", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: "逻辑" }));
    expect(screen.queryByText("罗素悖论")).toBeTruthy();
    expect(screen.queryByText("芝诺悖论")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("芝诺悖论")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索数学悖论"), {
      target: { value: "不存在的悖论" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("芝诺悖论")).toBeTruthy();
  });
});

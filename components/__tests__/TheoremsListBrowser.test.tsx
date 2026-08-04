// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { TheoremsListBrowser } from "../mathematics/TheoremsListBrowser";
import type { TheoremItem } from "../mathematics/TheoremsListBrowser";

const theorems: TheoremItem[] = [
  {
    slug: "pythagorean",
    title: "勾股定理",
    title_en: "Pythagorean Theorem",
    field: "几何",
    mathematician: "毕达哥拉斯",
    year: -500,
    difficulty: "基础",
    tags: ["直角三角形"],
  },
  {
    slug: "fermat-last",
    title: "费马大定理",
    title_en: "Fermat's Last Theorem",
    field: "数论",
    mathematician: "费马",
    year: 1637,
    difficulty: "高级",
    tags: ["椭圆曲线"],
  },
  {
    slug: "fundamental-algebra",
    title: "代数基本定理",
    title_en: "Fundamental Theorem of Algebra",
    field: "代数",
    mathematician: "高斯",
    year: 1799,
    difficulty: "进阶",
    tags: ["复数"],
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(<TheoremsListBrowser theorems={theorems} />);
}

describe("TheoremsListBrowser", () => {
  it("renders every theorem grouped by field", () => {
    renderBrowser();
    expect(screen.getByText("勾股定理")).toBeTruthy();
    expect(screen.getByText("费马大定理")).toBeTruthy();
    expect(screen.getByText("代数基本定理")).toBeTruthy();
  });

  it("filters by free-text query across title, EN title and mathematician", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索定理"), {
      target: { value: "高斯" },
    });
    expect(screen.queryByText("代数基本定理")).toBeTruthy();
    expect(screen.queryByText("勾股定理")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by field chip and toggles back to all", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: "数论" }));
    expect(screen.queryByText("费马大定理")).toBeTruthy();
    expect(screen.queryByText("勾股定理")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("勾股定理")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索定理"), {
      target: { value: "不存在的定理" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("勾股定理")).toBeTruthy();
  });
});

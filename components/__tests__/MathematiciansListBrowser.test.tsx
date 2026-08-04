// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MathematiciansListBrowser } from "../mathematics/MathematiciansListBrowser";
import type { MathematicianItem } from "../mathematics/MathematiciansListBrowser";

const mathematicians: MathematicianItem[] = [
  {
    slug: "euclid",
    title: "欧几里得",
    name: "Euclid",
    era: "古代",
    field: "几何",
    birthYear: -325,
    deathYear: -265,
    nationality: "古希腊",
    tags: ["几何原本"],
  },
  {
    slug: "gauss",
    title: "高斯",
    name: "Carl Friedrich Gauss",
    era: "近代",
    field: "数论",
    birthYear: 1777,
    deathYear: 1855,
    nationality: "德国",
    tags: ["算术研究"],
  },
  {
    slug: "terence-tao",
    title: "陶哲轩",
    name: "Terence Tao",
    era: "当代",
    field: "分析",
    birthYear: 1975,
    deathYear: null,
    nationality: "澳大利亚",
    tags: ["菲尔兹奖"],
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(<MathematiciansListBrowser mathematicians={mathematicians} />);
}

describe("MathematiciansListBrowser", () => {
  it("renders every mathematician", () => {
    renderBrowser();
    expect(screen.getByText("欧几里得")).toBeTruthy();
    expect(screen.getByText("高斯")).toBeTruthy();
    expect(screen.getByText("陶哲轩")).toBeTruthy();
  });

  it("filters by free-text query across title, name and tags", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索数学家"), {
      target: { value: "Gauss" },
    });
    expect(screen.queryByText("高斯")).toBeTruthy();
    expect(screen.queryByText("欧几里得")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by era chip and toggles back to all", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: "古代" }));
    expect(screen.queryByText("欧几里得")).toBeTruthy();
    expect(screen.queryByText("高斯")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("高斯")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索数学家"), {
      target: { value: "不存在的数学家" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("欧几里得")).toBeTruthy();
  });
});

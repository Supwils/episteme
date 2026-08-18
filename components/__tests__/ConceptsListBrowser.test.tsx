// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ConceptsListBrowser } from "../economics/ConceptsListBrowser";
import type { ConceptItem } from "../economics/ConceptsListBrowser";
import { orderConceptCategories } from "@/subjects/economics/lib/constants";

const concepts: ConceptItem[] = [
  {
    slug: "gdp",
    title: "国内生产总值",
    title_en: "Gross Domestic Product",
    category: "宏观经济学",
    key_figures: ["Simon Kuznets"],
    tags: ["GDP"],
    excerpt: "衡量一国经济总产出的核心指标。",
  },
  {
    slug: "elasticity",
    title: "弹性",
    title_en: "Elasticity",
    category: "微观经济学",
    key_figures: [],
    tags: ["价格"],
    excerpt: "需求量对价格变化的敏感程度。",
  },
  {
    slug: "nash-equilibrium",
    title: "纳什均衡",
    title_en: "Nash Equilibrium",
    category: "博弈论与市场设计",
    key_figures: ["John Nash"],
    tags: ["博弈论"],
    excerpt: "所有参与者都无意单方面改变策略的状态。",
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(<ConceptsListBrowser concepts={concepts} />);
}

describe("orderConceptCategories", () => {
  it("follows the fixed pedagogical order, not Unicode code points", () => {
    const ordered = orderConceptCategories(["博弈论与市场设计", "宏观经济学", "微观经济学"]);
    expect(ordered).toEqual(["微观经济学", "宏观经济学", "博弈论与市场设计"]);
  });

  it("appends unknown categories after known ones and keeps 其他 last", () => {
    const ordered = orderConceptCategories(["其他", "宏观经济学", "未来新分类"]);
    expect(ordered).toEqual(["宏观经济学", "未来新分类", "其他"]);
  });
});

describe("ConceptsListBrowser", () => {
  it("renders every concept grouped by category in pedagogical order", () => {
    const { container } = renderBrowser();
    expect(screen.getByText("国内生产总值")).toBeTruthy();
    expect(screen.getByText("纳什均衡")).toBeTruthy();
    const headings = [...container.querySelectorAll("section")].map(
      (s) => s.querySelector("span")?.textContent
    );
    expect(headings).toEqual(["微观经济学", "宏观经济学", "博弈论与市场设计"]);
  });

  it("filters by free-text query across title, figures and excerpt", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索经济学概念"), {
      target: { value: "纳什" },
    });
    expect(screen.queryByText("纳什均衡")).toBeTruthy();
    expect(screen.queryByText("国内生产总值")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by category chip and resets", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: /^宏观经济学/ }));
    expect(screen.queryByText("国内生产总值")).toBeTruthy();
    expect(screen.queryByText("弹性")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("弹性")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索经济学概念"), {
      target: { value: "不存在的概念" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("国内生产总值")).toBeTruthy();
  });
});

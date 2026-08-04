// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MathConceptsListBrowser } from "../mathematics/MathConceptsListBrowser";
import type { MathConceptItem } from "../mathematics/MathConceptsListBrowser";

const concepts: MathConceptItem[] = [
  {
    slug: "group",
    title: "群",
    title_en: "Group",
    field: "代数",
    key_figures: ["伽罗瓦"],
    tags: ["对称"],
  },
  {
    slug: "limit",
    title: "极限",
    title_en: "Limit",
    field: "分析",
    key_figures: ["柯西", "魏尔斯特拉斯"],
    tags: ["微积分"],
  },
  {
    slug: "topology-space",
    title: "拓扑空间",
    title_en: "Topological Space",
    field: "拓扑",
    key_figures: ["豪斯多夫"],
    tags: ["开集"],
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(<MathConceptsListBrowser concepts={concepts} />);
}

describe("MathConceptsListBrowser", () => {
  it("renders every concept grouped by field", () => {
    renderBrowser();
    expect(screen.getByText("群")).toBeTruthy();
    expect(screen.getByText("极限")).toBeTruthy();
    expect(screen.getByText("拓扑空间")).toBeTruthy();
  });

  it("filters by free-text query across title, EN title and key figures", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索数学概念"), {
      target: { value: "伽罗瓦" },
    });
    expect(screen.queryByText("群")).toBeTruthy();
    expect(screen.queryByText("极限")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by field chip and toggles back to all", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: "拓扑" }));
    expect(screen.queryByText("拓扑空间")).toBeTruthy();
    expect(screen.queryByText("群")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("群")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索数学概念"), {
      target: { value: "不存在的概念" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("群")).toBeTruthy();
  });
});

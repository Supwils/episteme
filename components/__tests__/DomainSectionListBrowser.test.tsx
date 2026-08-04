// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { DomainSectionListBrowser } from "../domain/DomainSectionListBrowser";
import type { SectionListEntry } from "../domain/DomainSectionListBrowser";

const entries: SectionListEntry[] = [
  {
    slug: "social-capital",
    title: "社会资本",
    titleEn: "Social Capital",
    excerpt: "关系网络中的信任、互惠与机会。",
    tags: ["网络", "信任"],
    category: "核心概念",
    info0: "L2",
  },
  {
    slug: "emile-durkheim",
    title: "涂尔干",
    excerpt: "社会事实、分工与自杀研究。",
    tags: ["社会事实"],
    category: "思想家",
    info0: "19世纪",
  },
  {
    slug: "anomie",
    title: "失范",
    excerpt: "规范失效时的社会状态。",
    tags: [],
    category: "核心概念",
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(
    <DomainSectionListBrowser
      domain="sociology"
      section="concepts"
      accent="#7a8f5a"
      entries={entries}
      badges={{}}
    />
  );
}

describe("DomainSectionListBrowser", () => {
  it("renders every entry grouped by category", () => {
    renderBrowser();
    expect(screen.getByText("社会资本")).toBeTruthy();
    expect(screen.getByText("涂尔干")).toBeTruthy();
    expect(screen.getByText("失范")).toBeTruthy();
  });

  it("filters by free-text query across title, excerpt and tags", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索本板块文章"), {
      target: { value: "信任" },
    });
    expect(screen.queryByText("社会资本")).toBeTruthy();
    expect(screen.queryByText("涂尔干")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by category chip and toggles back to all", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: "思想家" }));
    expect(screen.queryByText("涂尔干")).toBeTruthy();
    expect(screen.queryByText("社会资本")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("社会资本")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索本板块文章"), {
      target: { value: "不存在的条目" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("社会资本")).toBeTruthy();
  });

  it("renders precomputed cross-domain badge data without the server index", () => {
    render(
      <DomainSectionListBrowser
        domain="sociology"
        section="concepts"
        accent="#7a8f5a"
        entries={entries.slice(0, 1)}
        badges={{
          "social-capital": { colors: ["#fff", "#000"], count: 2, names: "心理学、经济学" },
        }}
      />
    );
    expect(screen.getByText("被 2 个领域引用")).toBeTruthy();
  });
});

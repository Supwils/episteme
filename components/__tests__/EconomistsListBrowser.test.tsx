// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { EconomistsListBrowser } from "../economics/EconomistsListBrowser";
import type { EconomistItem } from "../economics/EconomistsListBrowser";

const ERAS = ["古典", "新古典", "现代", "当代"] as const;

const economists: EconomistItem[] = [
  {
    slug: "adam-smith",
    title: "亚当·斯密",
    name_en: "Adam Smith",
    years: "1723–1790",
    era: "古典",
    school: "古典政治经济学",
    key_contributions: ["看不见的手", "分工理论"],
    nobel: false,
    tags: ["国富论", "分工"],
  },
  {
    slug: "keynes",
    title: "凯恩斯",
    name_en: "John Maynard Keynes",
    years: "1883–1946",
    era: "现代",
    school: "凯恩斯主义",
    key_contributions: ["有效需求"],
    nobel: false,
    tags: ["宏观"],
  },
  {
    slug: "friedman",
    title: "弗里德曼",
    name_en: "Milton Friedman",
    years: "1912–2006",
    era: "当代",
    school: "货币主义",
    key_contributions: ["货币数量论"],
    nobel: true,
    tags: ["货币"],
  },
];

afterEach(cleanup);

function renderBrowser() {
  return render(<EconomistsListBrowser economists={economists} eras={ERAS} />);
}

describe("EconomistsListBrowser", () => {
  it("renders every economist", () => {
    renderBrowser();
    expect(screen.getByText("亚当·斯密")).toBeTruthy();
    expect(screen.getByText("凯恩斯")).toBeTruthy();
    expect(screen.getByText("弗里德曼")).toBeTruthy();
  });

  it("filters by free-text query across name, school and tags", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索经济学家"), {
      target: { value: "货币" },
    });
    expect(screen.queryByText("弗里德曼")).toBeTruthy();
    expect(screen.queryByText("亚当·斯密")).toBeNull();
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("filters by era chip and toggles back to all", () => {
    renderBrowser();
    fireEvent.click(screen.getByRole("button", { name: /^古典/ }));
    expect(screen.queryByText("亚当·斯密")).toBeTruthy();
    expect(screen.queryByText("凯恩斯")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "全部" }));
    expect(screen.queryByText("凯恩斯")).toBeTruthy();
  });

  it("shows an empty state with a reset action when nothing matches", () => {
    renderBrowser();
    fireEvent.change(screen.getByLabelText("搜索经济学家"), {
      target: { value: "不存在的经济学家" },
    });
    expect(screen.getByText("没有匹配的条目")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "清除筛选" }));
    expect(screen.queryByText("亚当·斯密")).toBeTruthy();
  });
});

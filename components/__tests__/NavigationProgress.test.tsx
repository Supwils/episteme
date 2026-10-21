// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const route = vi.hoisted(() => ({ pathname: "/current", search: "" }));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
  useSearchParams: () => new URLSearchParams(route.search),
}));

import { NavigationProgress } from "../NavigationProgress";

afterEach(cleanup);
beforeEach(() => {
  route.pathname = "/current";
  route.search = "";
  window.history.replaceState({}, "", "/current");
});

describe("NavigationProgress", () => {
  it("announces a same-origin page transition", () => {
    render(
      <>
        <NavigationProgress />
        <a href="/search">下一页</a>
      </>
    );

    fireEvent.click(screen.getByRole("link", { name: "下一页" }));
    expect(screen.getByRole("status", { name: "正在打开页面" })).toBeDefined();
  });

  it("ignores hash-only, external, and modified clicks", () => {
    render(
      <>
        <NavigationProgress />
        <a href="/current#section">本页章节</a>
        <a href="https://example.com">外站</a>
        <a href="/search">新标签页</a>
      </>
    );

    fireEvent.click(screen.getByRole("link", { name: "本页章节" }));
    fireEvent.click(screen.getByRole("link", { name: "外站" }));
    fireEvent.click(screen.getByRole("link", { name: "新标签页" }), { ctrlKey: true });
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("clears once a query-only navigation commits", () => {
    const tree = () => (
      <>
        <NavigationProgress />
        <a href="/current?path=physics">退出路线</a>
      </>
    );
    const { rerender } = render(tree());

    fireEvent.click(screen.getByRole("link", { name: "退出路线" }));
    expect(screen.getByRole("status", { name: "正在打开页面" })).toBeDefined();

    route.search = "path=physics";
    rerender(tree());
    expect(screen.queryByRole("status")).toBeNull();
  });
});

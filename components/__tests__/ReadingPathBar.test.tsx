// @vitest-environment happy-dom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({
  pathname: "/",
  params: new URLSearchParams(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useSearchParams: () => nav.params,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { ReadingPathBar } from "../ReadingPathBar";

afterEach(cleanup);

describe("ReadingPathBar", () => {
  it("invites a chapter article into its path without query params", () => {
    nav.pathname = "/education/learning-foundations/what-is-learning";
    nav.params = new URLSearchParams();
    render(<ReadingPathBar />);
    expect(screen.getByRole("navigation", { name: "阅读路线" })).toBeDefined();
    const enter = screen.getByRole("link", { name: /从学会到国际比较/ });
    expect(enter.getAttribute("href")).toContain("path=from-learning-to-comparison");
    expect(enter.getAttribute("href")).toContain("step=1");
  });

  it("shows prev and next once the path query is active", () => {
    nav.pathname = "/education/cognition-and-memory/memory-spacing-and-transfer";
    nav.params = new URLSearchParams("path=from-learning-to-comparison&step=3");
    render(<ReadingPathBar />);
    expect(screen.getByRole("navigation", { name: "阅读路线" })).toBeDefined();
    expect(screen.getByRole("link", { name: "从学会到国际比较 目录" })).toBeDefined();
    expect(screen.getByRole("link", { name: "上一篇：教学不是灌输" })).toBeDefined();
    expect(screen.getByRole("link", { name: "下一篇：课堂是被组织的时间" })).toBeDefined();
  });

  it("uses the current article as the step even if the query disagrees", () => {
    nav.pathname = "/education/cognition-and-memory/memory-spacing-and-transfer";
    nav.params = new URLSearchParams("path=from-learning-to-comparison&step=1");
    render(<ReadingPathBar />);
    expect(screen.getByRole("link", { name: "上一篇：教学不是灌输" })).toBeDefined();
    expect(screen.getByRole("link", { name: "下一篇：课堂是被组织的时间" })).toBeDefined();
  });

  it("stays out of the way on pages that are not chapters", () => {
    nav.pathname = "/education/spacing-lab";
    nav.params = new URLSearchParams("path=from-learning-to-comparison&step=1");
    const { container } = render(<ReadingPathBar />);
    expect(container.innerHTML).toBe("");
  });
});

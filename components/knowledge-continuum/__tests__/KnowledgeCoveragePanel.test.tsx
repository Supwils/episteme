// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KnowledgeCoveragePanel } from "@/components/knowledge-continuum/KnowledgeCoveragePanel";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : undefined} {...props}>
      {children}
    </a>
  ),
}));

const snapshot = buildKnowledgeCoverageSnapshot();

afterEach(cleanup);

describe("KnowledgeCoveragePanel", () => {
  it("exposes the full curated landscape and the established linguistics spine", () => {
    render(<KnowledgeCoveragePanel snapshot={snapshot} />);
    expect(screen.getByText("本阶段全景共 46 个节点")).toBeDefined();

    expect(screen.getByRole("heading", { name: "230 个核心节点如何覆盖全学科" })).toBeDefined();
    expect(screen.getByText("73")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "语言学，直觉启蒙，2个核心节点" }));
    expect(screen.queryByText("建设中")).toBeNull();
    expect(screen.getByText("从词句结构到多语人工智能")).toBeDefined();
    const pathLink = screen.getByRole("link", { name: /从词句结构到多语人工智能/ });
    expect(pathLink.getAttribute("href")).toContain("path=linguistics-multilingual-ai-spine");
    expect(pathLink.getAttribute("href")).toContain("focus=linguistics%3Awords-and-sentences");
  });

  it("switches from subject coverage to evidence coverage without losing stage selection", () => {
    render(<KnowledgeCoveragePanel snapshot={snapshot} />);

    fireEvent.click(screen.getByRole("button", { name: "查看方法建模覆盖" }));
    fireEvent.click(screen.getByRole("button", { name: "证据方式" }));
    expect(screen.getByRole("button", { name: "证据方式" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText("个 方法建模 核心节点")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "形式推演，方法建模，6个核心节点" }));
    expect(screen.getByText("用定义、逻辑、数学结构和算法推出可检查结论。")).toBeDefined();
  });

  it("explores directed interdisciplinary bridges and their real path steps", () => {
    render(<KnowledgeCoveragePanel snapshot={snapshot} />);

    fireEvent.click(screen.getByRole("button", { name: "跨学科桥" }));
    expect(screen.getByText("73 次转接 · 50 个有向学科对")).toBeDefined();
    expect(screen.getAllByText("经济 → 政治").length).toBeGreaterThan(0);
    const pathLink = screen.getByRole("link", { name: /从共同生活到平台制度/ });
    expect(pathLink.getAttribute("href")).toContain("source=bridge-flow");
    expect(pathLink.getAttribute("href")).toContain("focus=political-science%3Acomparative-method");

    fireEvent.click(screen.getByRole("button", { name: "L5" }));
    expect(screen.getByText("12 次转接 · 10 个有向学科对")).toBeDefined();
    fireEvent.change(screen.getByLabelText("桥证据方式"), { target: { value: "synthesis" } });
    expect(screen.getByText("12 次转接 · 10 个有向学科对")).toBeDefined();
  });
});

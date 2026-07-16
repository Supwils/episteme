// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KnowledgeLearningPlanner } from "@/components/knowledge-continuum/KnowledgeLearningPlanner";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import {
  buildKnowledgeBranchCatalog,
  toKnowledgeTargetSearchResult,
} from "@/lib/knowledge-branch-catalog";
import { buildKnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : undefined} {...props}>
      {children}
    </a>
  ),
}));

const catalog = buildLearningPlanCatalog();
const branchCatalog = buildKnowledgeBranchCatalog();
const terrain = buildKnowledgeTerrainSnapshot(branchCatalog);
const aiEthics = branchCatalog.targets.find((target) => target.id === "philosophy:ai-ethics")!;
const bodyEvidence = branchCatalog.targets.find(
  (target) => target.id === "medicine:body-disease-evidence"
)!;

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState({}, "", "/");
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("KnowledgeLearningPlanner", () => {
  it("renders a complete default route with an exact time budget", () => {
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);
    expect(screen.getByRole("heading", { name: "把一个问题编排成可学习的路线" })).toBeDefined();
    expect(screen.getByText("我们怎样从观察天空，走到检验宇宙最深层的规律？")).toBeDefined();
    expect(screen.getAllByRole("checkbox")).toHaveLength(5);
    expect(screen.getByText(/从 L1 到 L5 · 5 步/)).toBeDefined();
    expect(screen.getByText(/共 45 分钟/)).toBeDefined();
  });

  it("rebuilds and persists a route from the selected start, goal and duration", () => {
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);
    fireEvent.change(screen.getByLabelText("学习起点"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("目标问题"), {
      target: { value: "people-institutions" },
    });
    fireEvent.click(screen.getByRole("button", { name: "20 分钟" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(screen.getByText(/从 L3 到 L5 · 3 步 · 3 门学科 · 共 20 分钟/)).toBeDefined();
    expect(screen.getByRole("heading", { name: "市场失灵理论" })).toBeDefined();
    expect(screen.getByRole("heading", { name: "政治学的比较方法" })).toBeDefined();
    expect(screen.getByRole("heading", { name: "平台治理前沿" })).toBeDefined();

    const checkbox = screen.getByRole("checkbox", { name: "标记“市场失灵理论”为已完成" });
    fireEvent.click(checkbox);
    expect(screen.getByText("1/3")).toBeDefined();
    expect(window.localStorage.getItem("uk-learning-plan-progress")).toContain(
      "economics:market-failures"
    );
    expect(window.localStorage.getItem("uk-learning-plan-selection")).toContain(
      "people-institutions"
    );

    const graphLinks = screen.getAllByRole("link", { name: "看图谱" });
    expect(graphLinks[1]?.getAttribute("href")).toBe(
      "/knowledge-graph?path=people-institutions&focus=political-science%3Acomparative-method&source=learning-plan"
    );
    fireEvent.click(screen.getByRole("button", { name: "重置当前路线进度" }));
    expect(screen.getByText("0/3")).toBeDefined();
  });

  it("searches all graph nodes and marks the inferred branch boundary", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request) => {
        const url = new URL(String(input), "https://episteme.test");
        if (url.searchParams.has("id")) {
          return new Response(JSON.stringify({ target: aiEthics }), { status: 200 });
        }
        return new Response(
          JSON.stringify({ results: [toKnowledgeTargetSearchResult(aiEthics)] }),
          { status: 200 }
        );
      })
    );
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);
    fireEvent.click(screen.getByRole("button", { name: "全部节点" }));
    const search = screen.getByRole("combobox", { name: "搜索全部知识节点" });
    fireEvent.focus(search);
    fireEvent.change(search, { target: { value: "AI 伦理" } });
    await screen.findByRole("option", { name: /AI 伦理/ });
    fireEvent.keyDown(search, { key: "ArrowDown" });
    expect(search.getAttribute("aria-activedescendant")).toBeTruthy();
    fireEvent.keyDown(search, { key: "Enter" });

    await waitFor(() => expect(screen.getAllByText("直接旁支").length).toBeGreaterThan(0));
    expect(screen.getByText(/以下步骤沿图谱关系进入推断旁支/)).toBeDefined();
    expect(screen.getAllByText("推断旁支").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("checkbox")).toHaveLength(6);
    expect(screen.getAllByRole("link", { name: "看图谱" }).at(-1)?.getAttribute("href")).toContain(
      "focus=philosophy%3Aai-ethics"
    );
  });

  it("reports a target search failure without an unhandled rejection", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 503 }))
    );
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);
    fireEvent.click(screen.getByRole("button", { name: "全部节点" }));
    const search = screen.getByRole("combobox", { name: "搜索全部知识节点" });
    fireEvent.focus(search);
    fireEvent.change(search, { target: { value: "不存在的请求" } });
    expect((await screen.findByRole("status")).textContent).toContain("节点搜索暂时不可用");
  });

  it("turns a terrain cell into a scoped full-graph search", () => {
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);
    const cell = screen.getByRole("button", {
      name: /社会学，方法建模，\d+个知识节点/,
    });
    fireEvent.click(cell);
    expect(screen.getByRole("button", { name: "全部节点" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect(screen.getByText(/搜索全部知识节点 · 社会学 \/ L4 方法建模/)).toBeDefined();
    expect(window.location.search).toContain("learnDomain=sociology");
    expect(window.location.search).toContain("learnLevel=4");
  });

  it("normalizes each subject independently and exposes inventory diagnostics", () => {
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);
    fireEvent.click(screen.getByRole("button", { name: "学科内结构" }));
    expect(screen.getByText(/每个学科独立归一化/)).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: "人类历史，直觉启蒙，303个知识节点，占该学科当前接入层97%",
      }).textContent
    ).toBe("97%");
    expect(screen.getByRole("heading", { name: "知识库存诊断" })).toBeDefined();
    const diagnostics = screen.getByTestId("knowledge-terrain-diagnostics");
    expect(diagnostics.textContent).toContain("11 条可复核信号");
    expect(diagnostics.textContent).toContain("5条高优先");
    expect(screen.getByText(/不能解读为学科重要性/)).toBeDefined();
  });

  it("compares equal-distance anchors and persists an alternative route", async () => {
    window.localStorage.setItem(
      "uk-learning-target-selection",
      JSON.stringify({ mode: "all-nodes", targetId: bodyEvidence.id, anchorNodeId: null })
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ target: bodyEvidence }), { status: 200 }))
    );
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);

    await screen.findByRole("heading", { name: "同距锚点比较" });
    const alternative = bodyEvidence.anchorCandidates[1]!;
    const alternativeButton = screen.getByRole("button", {
      name: `选择锚点“${alternative.anchorLabel}”`,
    });
    fireEvent.click(alternativeButton);
    expect(alternativeButton.getAttribute("aria-pressed")).toBe("true");
    await waitFor(() =>
      expect(window.localStorage.getItem("uk-learning-target-selection")).toContain(
        alternative.anchorNodeId
      )
    );
  });

  it("restores a shared terrain target and anchor from the URL", async () => {
    const alternative = bodyEvidence.anchorCandidates[1]!;
    window.history.replaceState(
      {},
      "",
      `/?learn=all&learnDomain=medicine&learnLevel=1&learnTarget=${encodeURIComponent(
        bodyEvidence.id
      )}&learnAnchor=${encodeURIComponent(alternative.anchorNodeId)}`
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ target: bodyEvidence }), { status: 200 }))
    );
    render(<KnowledgeLearningPlanner catalog={catalog} terrain={terrain} />);

    const alternativeButton = await screen.findByRole("button", {
      name: `选择锚点“${alternative.anchorLabel}”`,
    });
    expect(alternativeButton.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/搜索全部知识节点 · 医学与公共卫生 \/ L1 直觉启蒙/)).toBeDefined();
    expect(window.location.search).toContain(
      `learnAnchor=${encodeURIComponent(alternative.anchorNodeId)}`
    );
    expect(screen.getByRole("button", { name: "复制当前路线链接" })).toBeDefined();
  });
});

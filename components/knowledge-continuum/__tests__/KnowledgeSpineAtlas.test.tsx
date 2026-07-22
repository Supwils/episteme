// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KnowledgeSpineAtlas } from "@/components/knowledge-continuum/KnowledgeSpineAtlas";
import { buildKnowledgeCoverageSnapshot } from "@/lib/knowledge-continuum-coverage";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { buildKnowledgeSpineAtlas } from "@/lib/knowledge-spine-atlas";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : undefined} {...props}>
      {children}
    </a>
  ),
}));

const atlas = buildKnowledgeSpineAtlas(
  buildLearningPlanCatalog(),
  buildKnowledgeCoverageSnapshot()
);

afterEach(cleanup);

describe("KnowledgeSpineAtlas", () => {
  it("renders the 15 by 5 semantic map and opens an exact frontier node", () => {
    const { container } = render(<KnowledgeSpineAtlas atlas={atlas} />);

    expect(screen.getByRole("heading", { name: "15 门学科，从第一问走到研究边界" })).toBeDefined();
    expect(screen.getByTestId("knowledge-spine-atlas").textContent).toContain("75 个主干节点");
    expect(container.querySelectorAll('[data-testid^="orbit-node-"]')).toHaveLength(75);

    fireEvent.click(screen.getByTestId("orbit-node-mathematics-5"));
    expect(screen.getByRole("heading", { name: "黎曼猜想" })).toBeDefined();
    expect(screen.getByText(/计算验证不能替代一般证明/)).toBeDefined();
    expect(screen.getByRole("link", { name: "进入正文 →" }).getAttribute("href")).toContain(
      "/mathematics/"
    );

    fireEvent.click(screen.getByRole("button", { name: "矩阵对照" }));
    expect(container.querySelectorAll('[data-testid^="spine-step-"]')).toHaveLength(75);

    fireEvent.click(screen.getByTestId("spine-step-mathematics-5"));
    expect(screen.getByRole("heading", { name: "黎曼猜想" })).toBeDefined();
    expect(screen.getByText(/计算验证不能替代一般证明/)).toBeDefined();
    const graphLink = screen.getByRole("link", { name: "查看完整前置链 →" });
    expect(graphLink.getAttribute("href")).toContain("path=mathematics-prime-frontier-spine");
    expect(graphLink.getAttribute("href")).toContain("source=spine-atlas");
  });

  it("keeps the selected stage while switching subjects on the mobile route", () => {
    render(<KnowledgeSpineAtlas atlas={atlas} />);

    fireEvent.click(screen.getByRole("button", { name: "矩阵对照" }));
    fireEvent.click(screen.getByRole("button", { name: "L5 综合前沿" }));
    fireEvent.change(screen.getByLabelText("选择学科主干"), {
      target: { value: "computer-science" },
    });

    expect(screen.getByRole("heading", { name: "大语言模型与基础模型" })).toBeDefined();
    expect(screen.getAllByText("从程序构想到基础模型").length).toBeGreaterThan(0);
    expect(screen.getByText(/规模规律、能力评测、偏差、可解释性、安全与治理/)).toBeDefined();
  });

  it("explains a directed bridge and preserves it when switching to the other subject", () => {
    render(<KnowledgeSpineAtlas atlas={atlas} />);

    fireEvent.click(screen.getByRole("button", { name: "矩阵对照" }));
    expect(screen.getByRole("heading", { name: "物理学的跨域桥" })).toBeDefined();
    expect(screen.getByTestId("spine-bridge-explorer").textContent).toContain("14 条有向转接");

    fireEvent.click(
      screen.getByRole("button", {
        name: "从天空到物理边界：太阳系到原子结构",
      })
    );
    expect(screen.getByRole("heading", { name: "太阳系 → 原子结构" })).toBeDefined();
    expect(screen.getByText("再用原子描述可见物质的共同构件。")).toBeDefined();
    expect(screen.getByRole("link", { name: "在知识图谱核对转接 →" }).getAttribute("href")).toBe(
      "/knowledge-graph?path=universe-matter&focus=chemistry%3Aatomic-structure&source=spine-bridge"
    );

    fireEvent.click(screen.getByRole("button", { name: "切换到化学主干 →" }));
    expect(screen.getByRole("heading", { name: "化学的跨域桥" })).toBeDefined();
    expect(screen.getByRole("heading", { name: "太阳系 → 原子结构" })).toBeDefined();
    expect((screen.getByLabelText("选择学科主干") as HTMLSelectElement).value).toBe("chemistry");
  });

  it("rotates the spatial view and keeps subject focus accessible", () => {
    render(<KnowledgeSpineAtlas atlas={atlas} />);

    const physicsNode = screen.getByTestId("orbit-node-physics-3");
    const initialTransform = physicsNode.querySelector("circle")?.getAttribute("cx");
    fireEvent.click(screen.getByRole("button", { name: "向右旋转" }));
    expect(physicsNode.querySelector("circle")?.getAttribute("cx")).not.toBe(initialTransform);
    fireEvent.change(screen.getByLabelText("空间主干纵深"), {
      target: { value: "1.6" },
    });
    expect(screen.getByTestId("spine-orbit").getAttribute("data-depth-scale")).toBe("1.6");
    expect(
      within(screen.getByTestId("spine-orbit")).getAllByRole("link", { name: /^阅读/ })
    ).toHaveLength(5);

    fireEvent.change(screen.getByLabelText("空间主干聚焦学科"), {
      target: { value: "philosophy" },
    });
    expect(screen.getByRole("heading", { name: "戴维·查默斯" })).toBeDefined();
    expect(
      screen.getByRole("button", { name: "哲学，L1：戴维·查默斯" }).getAttribute("aria-pressed")
    ).toBe("true");
  });

  it("opens the featured mental health evidence route in the spatial graph", () => {
    render(<KnowledgeSpineAtlas atlas={atlas} />);

    expect(screen.getByRole("heading", { name: "跨域专题游览" })).toBeDefined();
    const mentalHealthTour = screen.getByTestId(
      "featured-tour-from-distress-to-rights-based-mental-health-care"
    );
    expect(within(mentalHealthTour).getByText("从心理困扰到可持续照护")).toBeDefined();
    expect(
      within(mentalHealthTour).getByRole("link", { name: "进入空间路线 →" }).getAttribute("href")
    ).toBe(
      "/knowledge-graph?layout=spatial&tourId=from-distress-to-rights-based-mental-health-care&step=0&source=spine-atlas"
    );
    expect(
      within(mentalHealthTour)
        .getByRole("link", { name: "打开服务可及性实验室 →" })
        .getAttribute("href")
    ).toBe("/medicine/mental-health-access");

    const adolescentTour = screen.getByTestId(
      "featured-tour-from-adolescent-development-to-continuous-support"
    );
    expect(within(adolescentTour).getByText("从青春期发展到连续支持")).toBeDefined();
    expect(
      within(adolescentTour).getByRole("link", { name: "进入空间路线 →" }).getAttribute("href")
    ).toBe(
      "/knowledge-graph?layout=spatial&tourId=from-adolescent-development-to-continuous-support&step=0&source=spine-atlas"
    );
  });
});

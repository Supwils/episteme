// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AdolescentServicePortfolioLab } from "../AdolescentServicePortfolioLab";

afterEach(cleanup);

describe("AdolescentServicePortfolioLab", () => {
  it("renders a complete default service stack and switches teaching scenarios", () => {
    render(<AdolescentServicePortfolioLab />);

    expect(
      screen.getByRole("img", { name: /青少年学校与社区服务六层立体结构/ })
    ).toBeDefined();
    expect(screen.getByText("路径状态").nextElementSibling?.textContent).toBe("完整");
    expect(screen.getByRole("button", { name: "区域联结" }).getAttribute("aria-pressed")).toBe(
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: "校内起步" }));

    expect(screen.getByRole("button", { name: "校内起步" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);
  });

  it("shows an infeasible state when a pivotal cost assumption breaks the constrained package", () => {
    render(<AdolescentServicePortfolioLab />);

    fireEvent.change(screen.getByLabelText("检验哪一层"), {
      target: { value: "matched-clinical-care" },
    });
    fireEvent.change(screen.getByLabelText("成本假设"), {
      target: { value: "1.5" },
    });

    expect(screen.getByTestId("adolescent-service-infeasible").textContent).toContain(
      "当前预算、最低公平占比与路径要求无法同时满足"
    );
    expect(screen.getByText(/当前假设下没有满足全部约束的组合/)).toBeDefined();
  });

  it("restores a feasible equity scenario and includes community outreach", () => {
    render(<AdolescentServicePortfolioLab />);

    fireEvent.click(screen.getByRole("button", { name: "公平网络" }));

    expect(screen.queryByTestId("adolescent-service-infeasible")).toBeNull();
    const outreachRow = screen.getByRole("row", { name: /校外青年、偏远社区与少数语言外展/ });
    expect(outreachRow.textContent).toContain("纳入服务包");
    expect(screen.getByText("服务不足群体占比").nextElementSibling?.textContent).toMatch(
      /5[6-9]%|6\d%/
    );
  });
});

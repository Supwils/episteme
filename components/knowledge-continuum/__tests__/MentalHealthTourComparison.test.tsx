// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MentalHealthTourComparison } from "@/components/knowledge-continuum/MentalHealthTourComparison";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : undefined} {...props}>
      {children}
    </a>
  ),
}));

const STORAGE_KEY = "uk-mental-health-tour-comparison-v1";

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe("MentalHealthTourComparison", () => {
  it("filters shared anchors and opens their real article and route steps", () => {
    render(<MentalHealthTourComparison />);

    expect(
      screen.getByRole("heading", {
        name: "个体照护与青少年支持系统，双路线核对",
      })
    ).toBeDefined();
    expect(screen.getByTestId("mental-health-route-comparison-diagram")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "共同锚点" }));
    expect(screen.getAllByRole("button", { name: /^选择比较检查点：/ })).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "选择比较检查点：连续照护" }));

    const comparison = screen.getByTestId("mental-health-tour-comparison");
    expect(within(comparison).getAllByRole("link", { name: "阅读正文 →" })).toHaveLength(2);
    expect(
      within(comparison).getAllByRole("link", { name: "阅读正文 →" })[0]?.getAttribute("href")
    ).toBe("/medicine/public-health/community-mental-health-access-continuity");
    expect(
      within(comparison).getAllByRole("link", { name: "定位路线步骤 →" })[0]?.getAttribute("href")
    ).toContain("tourId=from-distress-to-rights-based-mental-health-care");
    expect(
      within(comparison).getAllByRole("link", { name: "定位路线步骤 →" })[1]?.getAttribute("href")
    ).toContain("tourId=from-adolescent-development-to-continuous-support");
  });

  it("persists versioned comparison evidence without marking mastery", async () => {
    const { unmount } = render(<MentalHealthTourComparison />);

    fireEvent.click(screen.getByRole("button", { name: "共同锚点" }));
    fireEvent.click(screen.getByRole("button", { name: "选择比较检查点：权利与主体性" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "已核对这个共同锚点" }));

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored).toMatchObject({
      schemaVersion: 1,
      checkedIds: ["rights-and-agency"],
    });
    expect(stored.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(window.localStorage.getItem("uk-knowledge-profile-v1")).toBeNull();

    unmount();
    render(<MentalHealthTourComparison />);
    fireEvent.click(screen.getByRole("button", { name: "共同锚点" }));
    fireEvent.click(screen.getByRole("button", { name: "选择比较检查点：权利与主体性" }));
    await waitFor(() =>
      expect(
        (screen.getByRole("checkbox", {
          name: "已核对这个共同锚点",
        }) as HTMLInputElement).checked
      ).toBe(true)
    );
  });
});

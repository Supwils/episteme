// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ArtExchangeMap } from "../ArtExchangeMap";
import { DetailComparator } from "../DetailComparator";
import { PerspectiveLab } from "../PerspectiveLab";
import { PigmentProfile } from "../PigmentProfile";
import { SpaceExplorer } from "../SpaceExplorer";

afterEach(cleanup);

describe("arts labs", () => {
  it("moves the comparator window", () => {
    render(<DetailComparator />);
    fireEvent.change(screen.getByLabelText("放大窗位置"), { target: { value: "70" } });
    expect((screen.getByLabelText("放大窗位置") as HTMLInputElement).value).toBe("70");
  });

  it("moves the vanishing point", () => {
    render(<PerspectiveLab />);
    fireEvent.change(screen.getByLabelText("灭点左右"), { target: { value: "200" } });
    expect((screen.getByLabelText("灭点左右") as HTMLInputElement).value).toBe("200");
  });

  it("selects a pigment layer", () => {
    render(<PigmentProfile />);
    fireEvent.click(screen.getByRole("button", { name: "光油" }));
    expect(screen.getByRole("button", { name: "光油" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/最外层保护膜/)).toBeDefined();
  });

  it("selects an exchange route", () => {
    render(<ArtExchangeMap />);
    fireEvent.click(screen.getByRole("button", { name: "瓷器与模仿" }));
    expect(screen.getByText(/景德镇瓷器/)).toBeDefined();
  });

  it("switches architectural drawings", () => {
    render(<SpaceExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "剖面" }));
    expect(screen.getByLabelText("三开间厅堂的剖面")).toBeDefined();
  });
});

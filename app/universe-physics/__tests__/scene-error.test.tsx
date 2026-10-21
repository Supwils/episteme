// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PhysicsSceneError from "@/app/universe-physics/universe/earth/error";
import CosmologyTierError from "@/app/cosmology/universe/[tier]/error";

afterEach(() => {
  cleanup();
});

describe("3D scene error boundaries", () => {
  it("keeps the physics scene failure on a dark card without the raw message", () => {
    const reset = vi.fn();
    render(<PhysicsSceneError error={new Error("ENOENT /secret/path")} reset={reset} />);
    expect(screen.queryByText(/ENOENT|secret/)).toBeNull();
    expect(screen.getByText("这一页没能加载出来。重试一次通常就好。")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "页面加载失败" }).className).toContain("text-white");
    fireEvent.click(screen.getByRole("button", { name: "重试" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("keeps the cosmology tier failure on a dark card without the raw message", () => {
    const reset = vi.fn();
    render(<CosmologyTierError error={new Error("ENOENT /secret/path")} reset={reset} />);
    expect(screen.queryByText(/ENOENT|secret/)).toBeNull();
    expect(screen.getByRole("heading", { name: "尺度页面加载失败" }).className).toContain(
      "text-white"
    );
    fireEvent.click(screen.getByRole("button", { name: "重试" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});

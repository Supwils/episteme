// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DomainError } from "@/components/domain/DomainError";
import { DomainNotFound } from "@/components/domain/DomainNotFound";

afterEach(() => {
  cleanup();
});

describe("DomainError", () => {
  it("does not render a raw error.message and retries from the button", () => {
    const reset = vi.fn();
    render(<DomainError homeHref="/philosophy" homeLabel="哲学思想" reset={reset} />);
    expect(screen.queryByText(/ENOENT|TypeError|stack/i)).toBeNull();
    expect(screen.getByRole("heading", { name: "出了点问题" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "重试" }));
    expect(reset).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "返回哲学思想" }).getAttribute("href")).toBe(
      "/philosophy"
    );
  });
});

describe("DomainNotFound", () => {
  it("keeps the reader inside the current surface", () => {
    render(<DomainNotFound homeHref="/curiosities" homeLabel="奇趣知识" />);
    expect(screen.getByRole("heading", { name: "页面未找到" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "返回奇趣知识" }).getAttribute("href")).toBe(
      "/curiosities"
    );
  });
});

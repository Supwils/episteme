// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TableOfContents } from "../TableOfContents";

vi.mock("@/lib/scroll-frame", () => ({
  subscribeToScrollFrame: () => () => {},
}));

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

beforeEach(() => {
  document.body.innerHTML = `
    <main>
      <h2 id="one">第一</h2>
      <h3 id="two">第二</h3>
    </main>
  `;
});

describe("mobile table of contents sheet", () => {
  it("traps tab inside the dialog and restores focus to the trigger", async () => {
    render(<TableOfContents />);
    const trigger = await screen.findByRole("button", { name: "目录" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: "目录" });
    expect(document.body.style.overflow).toBe("hidden");

    const close = within(dialog).getByRole("button", { name: "关闭" });
    const lastLink = within(dialog).getByRole("link", { name: "第二" });
    lastLink.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(close);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastLink);

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on backdrop click", async () => {
    render(<TableOfContents />);
    fireEvent.click(await screen.findByRole("button", { name: "目录" }));
    expect(await screen.findByRole("dialog")).toBeTruthy();
    fireEvent.click(screen.getByRole("presentation"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

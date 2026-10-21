// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalSearch } from "../GlobalSearch";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("../search/useKnowledgeSearch", () => ({
  useKnowledgeSearch: () => ({
    query: "",
    setQuery: vi.fn(),
    titleResults: [],
    bodyResults: [],
    searching: false,
    warmup: vi.fn(),
  }),
}));
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

function setup() {
  render(
    <>
      <button>原先的按钮</button>
      <GlobalSearch />
    </>
  );
  const trigger = screen.getByRole("button", { name: "原先的按钮" });
  trigger.focus();
  act(() => document.dispatchEvent(new Event("open-global-search")));
  return trigger;
}

describe("global search modal focus lifecycle", () => {
  it("does not refer to a result list in the idle state", () => {
    setup();
    expect(screen.getByRole("textbox", { name: "搜索" }).getAttribute("aria-controls")).toBeNull();
    expect(document.getElementById("gs-result-list")).toBeNull();
  });

  it("refers to the displayed history list and removes the relation when history is cleared", () => {
    window.localStorage.setItem("uk-search-history", JSON.stringify(["苏格拉底"]));
    setup();
    const input = screen.getByRole("textbox", { name: "搜索" });
    expect(input.getAttribute("aria-controls")).toBe("gs-result-list");
    expect(document.getElementById("gs-result-list")).toBe(screen.getByRole("listbox"));
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(input.getAttribute("aria-controls")).toBeNull();
    expect(document.getElementById("gs-result-list")).toBeNull();
  });

  it("opens a native modal and immediately focuses the search input", () => {
    setup();
    const dialog = screen.getByRole("dialog", { name: "全站搜索" });
    expect(dialog).toBeInstanceOf(HTMLDialogElement);
    expect((dialog as HTMLDialogElement).open).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "搜索" }));
  });

  it.each(["button", "shortcut", "backdrop", "cancel"])(
    "restores the actual trigger on %s",
    (method) => {
      const trigger = setup();
      const input = screen.getByRole("textbox", { name: "搜索" });
      input.focus();
      if (method === "button") fireEvent.click(screen.getByRole("button", { name: "关闭搜索" }));
      else if (method === "shortcut") fireEvent.keyDown(input, { key: "k", ctrlKey: true });
      else if (method === "backdrop") fireEvent.click(screen.getByRole("dialog"));
      else fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(document.activeElement).toBe(trigger);
    }
  );
});

// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalSearch } from "../GlobalSearch";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
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
afterEach(cleanup);

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
  it("opens a native modal and immediately focuses the search input", () => {
    setup();
    const dialog = screen.getByRole("dialog", { name: "全站搜索" });
    expect(dialog).toBeInstanceOf(HTMLDialogElement);
    expect((dialog as HTMLDialogElement).open).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "搜索" }));
  });

  it.each(["escape", "shortcut", "backdrop", "cancel"])(
    "restores the actual trigger on %s",
    (method) => {
      const trigger = setup();
      const input = screen.getByRole("textbox", { name: "搜索" });
      input.focus();
      if (method === "escape") fireEvent.keyDown(input, { key: "Escape" });
      else if (method === "shortcut") fireEvent.keyDown(input, { key: "k", ctrlKey: true });
      else if (method === "backdrop") fireEvent.click(screen.getByRole("dialog"));
      else fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(document.activeElement).toBe(trigger);
    }
  );
});

// @vitest-environment happy-dom
import type { AnchorHTMLAttributes } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchResultItem } from "../SearchResultItem";

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));
afterEach(cleanup);

function setup() {
  const onClick = vi.fn();
  render(
    <SearchResultItem
      result={{
        title: "苏格拉底",
        subtitle: "",
        url: "/philosophy/thinkers/socrates",
        section: "philosophy",
        kind: "thinker",
      }}
      query="苏格拉底"
      isActive={false}
      onClick={onClick}
      onMouseEnter={() => {}}
    />
  );
  return { onClick, link: screen.getByRole("option") };
}

describe("search result link navigation", () => {
  it("delegates an ordinary click exactly once and prevents duplicate link navigation", () => {
    const { link, onClick } = setup();
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    fireEvent(link, event);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("/philosophy/thinkers/socrates");
    expect(event.defaultPrevented).toBe(true);
  });

  it("labels body hits with the knowledge domain", () => {
    render(
      <SearchResultItem
        result={{
          title: "德尔斐神谕",
          subtitle: "",
          url: "/philosophy/concepts/delphi",
          section: "philosophy",
          kind: "concept",
          snippet: "神庙上刻着认识你自己这句箴言",
          matchStart: 4,
        }}
        query="认识你自己"
        isActive={false}
        onClick={() => {}}
        onMouseEnter={() => {}}
        showSectionLabel
      />
    );
    expect(screen.getByRole("option").textContent).toContain("哲学思想");
  });

  it.each([
    { metaKey: true },
    { ctrlKey: true },
    { shiftKey: true },
    { altKey: true },
    { button: 1 },
  ])("preserves native navigation for %j", (modifiers) => {
    const { link, onClick } = setup();
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, ...modifiers });
    fireEvent(link, event);
    expect(onClick).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
    expect(link.getAttribute("href")).toBe("/philosophy/thinkers/socrates");
  });
});

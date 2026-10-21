// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GraphTraversal } from "../GraphTraversal";

afterEach(cleanup);

describe("GraphTraversal BFS order", () => {
  it("lists a node in visit order only after it is dequeued", () => {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;

    render(<GraphTraversal />);
    const order = screen
      .getAllByText(/访问顺序/)
      .find((el) => el.tagName === "DIV")
      ?.textContent?.replace(/\s+/g, " ")
      .trim();
    expect(order).toBe("访问顺序 A");
  });

  it("starts from a node chosen with the keyboard controls", () => {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;

    render(<GraphTraversal />);
    fireEvent.click(screen.getByRole("button", { name: "C" }));
    const order = screen
      .getAllByText(/访问顺序/)
      .find((el) => el.tagName === "DIV")
      ?.textContent?.replace(/\s+/g, " ")
      .trim();
    expect(order).toBe("访问顺序 C");
    expect(screen.getByRole("button", { name: "C" }).getAttribute("aria-pressed")).toBe("true");
  });
});

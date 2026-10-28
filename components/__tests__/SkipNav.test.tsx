// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SkipNav } from "../SkipNav";

afterEach(cleanup);

describe("SkipNav", () => {
  it("is a native anchor to #main-content", () => {
    render(<SkipNav />);
    expect(screen.getByRole("link", { name: "跳转到内容" }).getAttribute("href")).toBe(
      "#main-content"
    );
  });

  it("focuses a section's content marker past its header", () => {
    render(
      <>
        <SkipNav />
        <main id="main-content" tabIndex={-1}>
          <header>
            <a href="/philosophy">哲学</a>
          </header>
          <div data-skip-target tabIndex={-1}>
            正文
          </div>
        </main>
      </>
    );
    const link = screen.getByRole("link", { name: "跳转到内容" });
    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(false);
    expect(document.activeElement?.tagName).toBe("DIV");
    expect(document.activeElement?.hasAttribute("data-skip-target")).toBe(true);
  });

  it("leaves the native jump alone on pages without a section header", () => {
    render(
      <>
        <SkipNav />
        <main id="main-content" tabIndex={-1} />
      </>
    );
    expect(fireEvent.click(screen.getByRole("link", { name: "跳转到内容" }))).toBe(true);
  });
});

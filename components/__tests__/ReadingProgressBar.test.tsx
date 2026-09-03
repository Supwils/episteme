// @vitest-environment happy-dom
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ReadingProgressBar } from "../ReadingProgressBar";

afterEach(cleanup);

beforeEach(() => {
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: 500, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: 1_500,
    configurable: true,
  });
});

describe("ReadingProgressBar", () => {
  it("updates a compositor transform instead of rerendering a width value", async () => {
    const { container } = render(<ReadingProgressBar />);
    const indicator = container.querySelector<HTMLDivElement>("[aria-hidden] > div");
    expect(indicator?.style.transform).toBe("scaleX(0)");
    expect(indicator?.style.width).toBe("");

    Object.defineProperty(window, "scrollY", { value: 500, configurable: true });
    fireEvent.scroll(window);

    await waitFor(() => expect(indicator?.style.transform).toBe("scaleX(0.5)"));
  });
});

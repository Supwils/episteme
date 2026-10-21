// @vitest-environment happy-dom
import { createRef } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchQueryInput } from "../SearchQueryInput";

afterEach(cleanup);

describe("SearchQueryInput", () => {
  it("accepts 120 supplementary characters and cuts pasted text at complete code points", () => {
    const onQueryChange = vi.fn();
    const inputRef = createRef<HTMLInputElement>();
    render(<SearchQueryInput ref={inputRef} aria-label="搜索" onQueryChange={onQueryChange} />);
    const input = inputRef.current!;
    expect(input.maxLength).toBe(240);
    fireEvent.change(input, { target: { value: "𠀀".repeat(120) } });
    expect(input.value).toBe("𠀀".repeat(120));
    fireEvent.change(input, { target: { value: "热".repeat(119) + "𠀀更多" } });
    expect(input.value).toBe("热".repeat(119) + "𠀀");
    expect(onQueryChange).toHaveBeenLastCalledWith(input.value);
  });

  it("waits for IME composition to finish before limiting or issuing queries", () => {
    const onQueryChange = vi.fn();
    const { getByRole } = render(
      <SearchQueryInput type="search" aria-label="搜索" onQueryChange={onQueryChange} />
    );
    const input = getByRole("searchbox") as HTMLInputElement;
    const prefix = "知".repeat(119);
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: prefix + "ziran" } });
    expect(input.value).toBe(prefix + "ziran");
    expect(onQueryChange).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input, { target: { value: prefix + "自然" } });
    expect(input.value).toBe(prefix + "自");
    expect(onQueryChange).toHaveBeenCalledWith(prefix + "自");
  });

  it("retains native form submission and the server-rendered query", () => {
    const { getByRole } = render(
      <form action="/search">
        <SearchQueryInput type="search" name="q" aria-label="搜索" defaultValue="自然选择" />
      </form>
    );
    const input = getByRole("searchbox") as HTMLInputElement;
    expect(input.value).toBe("自然选择");
    fireEvent.change(input, { target: { value: "𠀀".repeat(121) } });
    expect(new FormData(input.form!).get("q")).toBe("𠀀".repeat(120));
  });
});

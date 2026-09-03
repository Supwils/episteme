// @vitest-environment happy-dom
import type { AnchorHTMLAttributes } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WikiLinkPreview } from "../MarkdownInteractions";

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("wiki preview retry after transient failure", () => {
  it.each(["network", "http", "json"])(
    "retries %s failures but keeps successful shards shared",
    async (failure) => {
      vi.useFakeTimers();
      const domain = `retry-${failure}`;
      const href = `/${domain}/concepts/example`;
      const fetchMock = vi.fn();
      if (failure === "network") fetchMock.mockRejectedValueOnce(new Error("offline"));
      else
        fetchMock.mockResolvedValueOnce({
          ok: failure === "json",
          json: () => Promise.reject(new Error("invalid JSON")),
        });
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ [href]: { t: "已恢复", e: "摘要", d: domain } }),
      });
      vi.stubGlobal("fetch", fetchMock);
      render(<WikiLinkPreview href={href} label="预览条目" />);
      const link = screen.getByRole("link");
      fireEvent.focus(link);
      await act(async () => vi.advanceTimersByTimeAsync(200));
      expect(screen.queryByRole("tooltip")).toBeNull();
      fireEvent.blur(link);
      fireEvent.focus(link);
      await act(async () => vi.advanceTimersByTimeAsync(200));
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(screen.getByRole("tooltip").textContent).toContain("已恢复");
      fireEvent.blur(link);
      fireEvent.focus(link);
      await act(async () => vi.advanceTimersByTimeAsync(200));
      expect(fetchMock).toHaveBeenCalledTimes(2);
    }
  );
});

// @vitest-environment happy-dom
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { OnThisDay, eventHref } from "../OnThisDay";
import type { OnThisDayEvent } from "@/lib/on-this-day";

const baseEvent: OnThisDayEvent = {
  month: 6,
  day: 5,
  year: 1776,
  title: "《国富论》出版",
  description: "亚当·斯密的《国富论》出版",
  domain: "经济学",
  domainColor: "#10b981",
  url: "/economics/economists/adam-smith",
};

afterEach(cleanup);

describe("eventHref", () => {
  it("uses the event url when present", () => {
    expect(eventHref(baseEvent)).toBe("/economics/economists/adam-smith");
  });

  it("falls back to the history timeline when url is missing or blank", () => {
    expect(eventHref({ url: "" })).toBe("/human-history/timeline");
    expect(eventHref({ url: "  " })).toBe("/human-history/timeline");
  });
});

describe("OnThisDay", () => {
  it("renders each event as a link to its url", () => {
    render(<OnThisDay events={[baseEvent]} />);
    const link = screen.getByRole("link", { name: /国富论/ });
    expect(link.getAttribute("href")).toBe("/economics/economists/adam-smith");
  });

  it("links events without url to the history timeline", () => {
    render(<OnThisDay events={[{ ...baseEvent, url: "" }]} />);
    const link = screen.getByRole("link", { name: /国富论/ });
    expect(link.getAttribute("href")).toBe("/human-history/timeline");
  });
});

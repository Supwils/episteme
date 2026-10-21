// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { lockDocumentScroll } from "../scroll-lock";

let releases: Array<() => void>;
beforeEach(() => {
  releases = [];
});
afterEach(() => {
  for (const release of releases.reverse()) release();
  document.documentElement.removeAttribute("style");
  document.body.removeAttribute("style");
});
function acquire(doc = document) {
  const release = lockDocumentScroll(doc);
  releases.push(release);
  return release;
}
function expectLocked(doc = document) {
  for (const node of [doc.documentElement, doc.body]) {
    expect(node.style.overflowX).toBe("hidden");
    expect(node.style.overflowY).toBe("hidden");
  }
}

describe("document scroll ownership", () => {
  it("locks both the viewport and body, then restores stylesheet ownership", () => {
    const release = acquire();
    expectLocked();
    release();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });
  it.each(["first", "last"])("keeps the page locked when the %s dialog releases first", (order) => {
    const first = acquire(),
      last = acquire();
    const [early, late] = order === "first" ? [first, last] : [last, first];
    early();
    early();
    expectLocked();
    late();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });
  it("restores independent axes and priorities without erasing unrelated styles", () => {
    const root = document.documentElement,
      body = document.body;
    root.style.setProperty("overflow-x", "clip", "important");
    root.style.setProperty("overflow-y", "scroll");
    body.style.setProperty("overflow-y", "auto", "important");
    const release = acquire();
    expectLocked();
    body.style.color = "red";
    release();
    expect(root.style.overflowX).toBe("clip");
    expect(root.style.getPropertyPriority("overflow-x")).toBe("important");
    expect(root.style.overflowY).toBe("scroll");
    expect(body.style.overflowX).toBe("");
    expect(body.style.overflowY).toBe("auto");
    expect(body.style.getPropertyPriority("overflow-y")).toBe("important");
    expect(body.style.color).toBe("red");
  });
  it("keeps a pre-existing body lock after the last modal closes", () => {
    document.body.style.overflow = "hidden";
    const release = acquire();
    release();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("");
  });
  it("does not erase a later owner's deliberate changes", () => {
    const release = acquire();
    document.body.style.overflowY = "scroll";
    document.documentElement.style.setProperty("overflow-x", "clip", "important");
    release();
    expect(document.body.style.overflowY).toBe("scroll");
    expect(document.documentElement.style.overflowX).toBe("clip");
    expect(document.body.style.overflowX).toBe("");
  });
  it("reserves a native scrollbar gutter only while it owns the lock", () => {
    document.documentElement.style.scrollbarGutter = "auto";
    const release = acquire();
    expect(document.documentElement.style.scrollbarGutter).toBe("stable");
    release();
    expect(document.documentElement.style.scrollbarGutter).toBe("auto");
  });
  it("preserves an existing gutter policy", () => {
    document.documentElement.style.scrollbarGutter = "stable both-edges";
    const release = acquire();
    release();
    expect(document.documentElement.style.scrollbarGutter).toBe("stable both-edges");
  });
  it("tracks independent documents separately", () => {
    const other = document.implementation.createHTMLDocument("other");
    const a = acquire(),
      b = acquire(other);
    a();
    expectLocked(other);
    expect(document.body.style.overflow).toBe("");
    b();
    expect(other.body.style.overflow).toBe("");
  });
});

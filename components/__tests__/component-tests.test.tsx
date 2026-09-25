// @vitest-environment happy-dom
import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

vi.mock("framer-motion", () => ({
  useInView: () => true,
  useMotionValue: (init: number) => {
    let val = init;
    return {
      get: () => val,
      set: (v: number) => {
        val = v;
      },
      on: (_event: string, _cb: any) => () => {},
    };
  },
  useTransform: (_mv: any, fn: (v: number) => number) => ({
    on: (_event: string, cb: (v: number) => void) => {
      cb(fn(0));
      return () => {};
    },
  }),
  useReducedMotion: () => true,
  animate: (_val: any, _target: number, _opts?: any) => ({ stop: () => {} }),
  motion: {
    span: ({ children, ref, ...props }: any) => (
      <span ref={ref} {...props}>
        {children}
      </span>
    ),
  },
}));

import { DomainCard } from "../DomainCard";
import { domainCollectionCount, getDomainStats } from "@/lib/site-stats";
import { BookShelf } from "../portal/BookShelf";
import { PageTransition } from "../PageTransition";
import { ScrollToTop } from "../ScrollToTop";
import { SectionAwareFooter } from "../SectionAwareFooter";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ReadingModeControls } from "@/components/ReadingModeControls";
import { DeepReading } from "@/subjects/life-science/components/DeepReading";
import { LifeStats } from "@/subjects/life-science/components/LifeStats";

afterEach(() => {
  cleanup();
});

const mockDomain = {
  id: "philosophy" as const,
  title: "哲学思想",
  titleEn: "PHILOSOPHY",
  description: "探索人类最深刻的思想",
  cluster: "humanities-arts" as const,
  stats: "100+ 哲学家",
};

describe("DomainCard", () => {
  it("renders domain title", () => {
    render(<DomainCard domain={mockDomain} />);
    expect(screen.getByText("哲学思想")).toBeDefined();
  });

  it("renders domain description", () => {
    render(<DomainCard domain={mockDomain} />);
    expect(screen.getByText("探索人类最深刻的思想")).toBeDefined();
  });

  it("links to correct URL", () => {
    render(<DomainCard domain={mockDomain} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/philosophy");
  });

  it("renders English subtitle", () => {
    render(<DomainCard domain={mockDomain} />);
    expect(screen.getByText("PHILOSOPHY")).toBeDefined();
  });

  it("prints generated counts, never the hand-written stats line or a creation index", () => {
    const { container } = render(<DomainCard domain={mockDomain} />);
    const { articles } = getDomainStats("philosophy");
    const stats = container.querySelector(".domain-card__stats")?.textContent ?? "";
    expect(stats.startsWith(`${articles} 篇文章 · `)).toBe(true);
    expect(stats).toContain(`${domainCollectionCount("philosophy", "哲学家")} 位哲学家`);
    expect(stats).not.toContain("100+");
    expect(container.textContent).not.toMatch(/DOMAIN \d/);
  });

  it("renders explore CTA", () => {
    render(<DomainCard domain={mockDomain} />);
    expect(screen.getByText("进入探索")).toBeDefined();
  });

  it("renders visible with no scroll-reveal hooks", () => {
    render(<DomainCard domain={mockDomain} />);
    const link = screen.getByRole("link");

    expect(link.hasAttribute("data-home-reveal")).toBe(false);
    expect(link.style.opacity).toBe("");
    expect(link.style.visibility).toBe("");
    expect(link.style.animationDelay).toBe("");
  });
});

describe("BookShelf", () => {
  const book = (slug: string, title: string, chapterCount: number) => ({
    slug,
    title,
    subtitle: `${title}的副题`,
    domainLabel: "哲学思想",
    pigment: "var(--brass)",
    chapterCount,
    preview: ["第一章", "第二章"],
    startHref: `/philosophy/thinkers/thales?path=${slug}&step=1`,
  });

  it("pulls out the first book, then whichever spine the reader picks", () => {
    render(<BookShelf books={[book("west", "西方哲学之旅", 14), book("east", "东方思想", 6)]} />);
    expect(screen.getByRole("heading", { name: "西方哲学之旅" })).toBeDefined();

    const east = screen.getByRole("button", { name: /东方思想/ });
    expect(east.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(east);
    expect(east.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("heading", { name: "东方思想" })).toBeDefined();
    expect(screen.getByRole("link", { name: "看完整目录" }).getAttribute("href")).toBe(
      "/read/east"
    );
  });
});

describe("SectionAwareFooter", () => {
  it("links every launched subject and the current repository", () => {
    render(<SectionAwareFooter />);

    expect(screen.getByRole("link", { name: "社会学" }).getAttribute("href")).toBe("/sociology");
    expect(screen.getByRole("link", { name: "语言学" }).getAttribute("href")).toBe("/linguistics");
    expect(screen.getByRole("link", { name: "GitHub" }).getAttribute("href")).toBe(
      "https://github.com/Supwils/episteme"
    );
    expect(screen.getByRole("link", { name: "随机一篇" }).getAttribute("href")).toBe("/random");
    expect(screen.getByRole("link", { name: "全站搜索" }).getAttribute("href")).toBe("/search");
  });
});

describe("PageTransition", () => {
  it("keeps initial page content visible without a hydration-gated wrapper", () => {
    render(
      <PageTransition>
        <h1>Initial article title</h1>
      </PageTransition>
    );

    const heading = screen.getByRole("heading", { name: "Initial article title" });
    expect(heading.parentElement?.style.opacity).toBe("");
    expect(heading.parentElement?.style.transform).toBe("");
  });
});

describe("ScrollToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  it("is hidden when not scrolled", () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("is visible after scrolling past threshold", async () => {
    render(<ScrollToTop />);
    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);
    expect(await screen.findByRole("button")).toBeDefined();
  });

  it("has correct aria-label", async () => {
    render(<ScrollToTop />);
    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);
    expect(await screen.findByLabelText("回到顶部")).toBeDefined();
  });

  it("calls scrollTo on click", async () => {
    const scrollToSpy = vi.fn();
    vi.stubGlobal("scrollTo", scrollToSpy);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));

    render(<ScrollToTop />);
    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);

    fireEvent.click(await screen.findByRole("button"));
    await waitFor(() => expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" }));
  });
});

describe("MarkdownRenderer", () => {
  it("demotes a leading `# ` title (the page shell owns the document h1)", () => {
    // T-UX-09: a first-block `# ` repeats the page title and is dropped; any
    // later `# ` becomes h2 so the page keeps a single-h1 outline.
    render(<MarkdownRenderer content={"前言。\n\n# Hello World"} />);
    // heading accessible name includes the permalink's aria-label suffix
    expect(screen.getByRole("heading", { level: 2, name: /^Hello World/ })).toBeDefined();
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });

  it("renders h2 headings", () => {
    render(<MarkdownRenderer content="## Section Title" />);
    expect(screen.getByRole("heading", { level: 2, name: /^Section Title/ })).toBeDefined();
  });

  it("renders h3 headings", () => {
    render(<MarkdownRenderer content="### Subsection" />);
    expect(screen.getByRole("heading", { level: 3, name: /^Subsection/ })).toBeDefined();
  });

  it("renders paragraphs", () => {
    render(<MarkdownRenderer content="This is a paragraph." />);
    expect(screen.getByText("This is a paragraph.")).toBeDefined();
  });

  it("renders bold text", () => {
    const { container } = render(<MarkdownRenderer content="This is **bold** text." />);
    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toBe("bold");
  });

  it("renders inline code", () => {
    const { container } = render(<MarkdownRenderer content="Use `console.log` for debugging." />);
    const code = container.querySelector("code");
    expect(code).not.toBeNull();
    expect(code!.textContent).toBe("console.log");
  });

  it("renders multiple paragraphs separated by blank lines", () => {
    const content = ["First paragraph.", "Second paragraph."].join("\n\n");
    const { container } = render(<MarkdownRenderer content={content} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]!.textContent).toBe("First paragraph.");
    expect(paragraphs[1]!.textContent).toBe("Second paragraph.");
  });

  it("renders blockquotes", () => {
    const { container } = render(<MarkdownRenderer content="> A wise quote" />);
    const blockquote = container.querySelector("blockquote");
    expect(blockquote).not.toBeNull();
  });

  it("renders unordered lists", () => {
    const { container } = render(<MarkdownRenderer content="- Item one\n- Item two" />);
    const ul = container.querySelector("ul");
    expect(ul).not.toBeNull();
  });

  it("renders horizontal rules", () => {
    const { container } = render(<MarkdownRenderer content="---" />);
    const hr = container.querySelector("[aria-hidden]");
    expect(hr).not.toBeNull();
  });

  it("resolves ambiguous wiki links against the explicit server domain", () => {
    render(<MarkdownRenderer content="[[bureaucracy|科层制]]" domain="sociology" />);

    expect(screen.getByRole("link", { name: "科层制" }).getAttribute("href")).toBe(
      "/sociology/institutions/bureaucracy"
    );
  });

  it("renders formulas to KaTeX markup in the initial output", () => {
    const { container } = render(<MarkdownRenderer content="$E = mc^2$" />);

    expect(container.querySelector(".katex")).not.toBeNull();
    expect(container.querySelector('[role="math"][aria-label="E = mc^2"]')).not.toBeNull();
  });
});

describe("ReadingModeControls", () => {
  it("switches the page reading mode", () => {
    render(<ReadingModeControls />);

    fireEvent.click(screen.getByRole("button", { name: "专注阅读模式" }));
    expect(document.documentElement.dataset.readingMode).toBe("focus");

    fireEvent.click(screen.getByRole("button", { name: "宽松阅读模式" }));
    expect(document.documentElement.dataset.readingMode).toBe("spacious");

    fireEvent.click(screen.getByRole("button", { name: "标准阅读模式" }));
    expect(document.documentElement.dataset.readingMode).toBe("standard");
  });
});

describe("DeepReading", () => {
  const defaultProps = {
    introduction: "This is the introduction to the topic.",
    sections: [
      { title: "Section One", content: ["Paragraph A.", "Paragraph B."] },
      { title: "Section Two", content: ["Paragraph C."] },
    ],
    citations: [
      {
        id: "c1",
        authors: "Smith et al.",
        year: 2020,
        title: "A Great Paper",
        journal: "Nature",
        doi: "10.1038/example",
      },
      {
        id: "c2",
        authors: "Jones",
        year: 2019,
        title: "Another Paper",
        journal: "Science",
      },
    ],
  };

  it("renders sections", () => {
    const { container } = render(<DeepReading {...defaultProps} />);
    const headings = container.querySelectorAll("h3");
    const sectionTitles = Array.from(headings).map((h) => h.textContent);
    expect(sectionTitles).toContain("Section One");
    expect(sectionTitles).toContain("Section Two");
    expect(screen.getByText("Paragraph A.")).toBeDefined();
    expect(screen.getByText("Paragraph C.")).toBeDefined();
  });

  it("renders introduction", () => {
    render(<DeepReading {...defaultProps} />);
    expect(screen.getByText("This is the introduction to the topic.")).toBeDefined();
  });

  it("renders citations", () => {
    const { container } = render(<DeepReading {...defaultProps} />);
    const citationList = container.querySelector("ol");
    expect(citationList).not.toBeNull();
    const citationItems = citationList!.querySelectorAll("li");
    expect(citationItems.length).toBe(2);
  });

  it("renders DOI links", () => {
    render(<DeepReading {...defaultProps} />);
    const doiLinks = screen.getAllByText("DOI");
    expect(doiLinks.length).toBe(1);
    expect(doiLinks[0]!.getAttribute("href")).toBe("https://doi.org/10.1038/example");
  });

  it('renders heading "深度阅读"', () => {
    render(<DeepReading {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 2, name: "深度阅读" })).toBeDefined();
  });

  it('renders heading "参考文献"', () => {
    render(<DeepReading {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 3, name: "参考文献" })).toBeDefined();
  });

  it("renders without citations", () => {
    const { container } = render(
      <DeepReading
        introduction="Intro"
        sections={[{ title: "Sec", content: ["P"] }]}
        citations={[]}
      />
    );
    const citationHeading = container.querySelector("#citations");
    expect(citationHeading).toBeNull();
  });
});

describe("LifeStats", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all stat items", () => {
    render(<LifeStats />);
    expect(screen.getByText("地质时代")).toBeDefined();
    expect(screen.getByText("物种记录")).toBeDefined();
    expect(screen.getByText("大灭绝事件")).toBeDefined();
    expect(screen.getByText("科学家")).toBeDefined();
    expect(screen.getByText("生命演化跨度")).toBeDefined();
  });

  it("renders stat icons", () => {
    const { container } = render(<LifeStats />);
    const icons = container.querySelectorAll(".text-xl");
    expect(icons.length).toBe(5);
    expect(icons[0]!.textContent).toBe("🌍");
    expect(icons[1]!.textContent).toBe("🦕");
    expect(icons[2]!.textContent).toBe("💥");
    expect(icons[3]!.textContent).toBe("🔬");
    expect(icons[4]!.textContent).toBe("⏳");
  });

  it("renders stat aria-labels with suffixes", () => {
    render(<LifeStats />);
    expect(screen.getByLabelText("8个")).toBeDefined();
    expect(screen.getByLabelText("50+")).toBeDefined();
    expect(screen.getByLabelText("5次")).toBeDefined();
    expect(screen.getByLabelText("20+")).toBeDefined();
    expect(screen.getByLabelText("40亿年")).toBeDefined();
  });
});

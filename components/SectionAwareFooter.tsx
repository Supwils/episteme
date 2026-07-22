"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_URLS } from "../lib/urls";

const SECTION_PREFIXES = [
  "/universe-physics",
  "/cosmology",
  "/earth-science",
  "/human-history",
  "/philosophy",
  "/mathematics",
  "/life-science",
  "/medicine",
  "/chemistry",
  "/economics",
  "/psychology",
  "/computer-science",
  "/political-science",
  "/sociology",
  "/linguistics",
  "/knowledge-graph",
  "/read",
  "/curiosities",
];

const LINK_CLASS = "text-sm text-fg-secondary transition-colors hover:text-accent-gold";

const COLUMN_HEADING_CLASS =
  "mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-fg-muted";

const DOMAIN_LINKS = [
  { href: APP_URLS["universe-physics"], label: "物理学" },
  { href: APP_URLS["cosmology"], label: "宇宙学" },
  { href: APP_URLS["earth-science"], label: "地球科学" },
  { href: APP_URLS["human-history"], label: "人类历史" },
  { href: APP_URLS["philosophy"], label: "哲学思想" },
  { href: APP_URLS["life-science"], label: "生命科学" },
  { href: APP_URLS["medicine"], label: "医学与公共卫生" },
  { href: APP_URLS["chemistry"], label: "化学" },
  { href: APP_URLS["mathematics"], label: "数学与逻辑" },
  { href: APP_URLS["economics"], label: "经济学" },
  { href: APP_URLS["psychology"], label: "心理学" },
  { href: APP_URLS["computer-science"], label: "计算机科学" },
  { href: APP_URLS["political-science"], label: "政治学" },
  { href: APP_URLS.sociology, label: "社会学" },
  { href: APP_URLS.linguistics, label: "语言学" },
];

const EXPLORE_LINKS = [
  { href: "/knowledge-graph", label: "知识图谱" },
  { href: "/daily", label: "每日知识" },
  { href: "/read", label: "阅读路线" },
  { href: "/curiosities", label: "奇趣知识" },
  { href: APP_URLS["human-history"] + "/timeline", label: "时间线" },
];

export function SectionAwareFooter() {
  const pathname = usePathname();
  const inSection = SECTION_PREFIXES.some((p) => pathname.startsWith(p));

  if (inSection) return null;

  return (
    <footer className="bg-bg-base text-fg-secondary relative px-6 pt-14 pb-9" role="contentinfo">
      {/* 顶部发丝线：克制的金色渐变分隔，暗/亮主题皆连贯 */}
      <div
        aria-hidden="true"
        className="via-accent-gold/40 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="text-accent-gold">
                ✦
              </span>
              <span className="font-display text-fg-primary text-[1.1rem] font-semibold tracking-tight">
                Episteme · 格致
              </span>
            </div>
            <p className="text-fg-muted m-0 text-[0.8rem] leading-relaxed">
              知识即服务平台。以可视化、沉浸式的方式探索人类最重要的知识。
            </p>
          </div>

          <div>
            <h3 className={COLUMN_HEADING_CLASS}>知识领域</h3>
            <nav aria-label="知识领域导航">
              <div className="flex flex-col gap-2.5">
                {DOMAIN_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <div>
            <h3 className={COLUMN_HEADING_CLASS}>探索方式</h3>
            <div className="flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={LINK_CLASS}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className={COLUMN_HEADING_CLASS}>关于</h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/Supwils/episteme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-secondary hover:text-accent-gold inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <span className="text-fg-muted text-sm">工程原则</span>
              <span className="text-fg-muted text-sm">知识精神</span>
            </div>
          </div>
        </div>

        <div className="border-border-faint flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <span className="text-fg-disabled text-[0.72rem]">
            © {new Date().getFullYear()} Episteme · 格致. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-accent-gold inline-flex items-center gap-1.5 text-[0.72rem] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 180 180" fill="none" aria-hidden="true">
                <mask
                  id="a"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="180"
                  height="180"
                >
                  <circle cx="90" cy="90" r="90" fill="currentColor" />
                </mask>
                <g mask="url(#a)">
                  <circle cx="90" cy="90" r="90" fill="currentColor" />
                  <path
                    d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461A90.304 90.304 0 00149.508 157.52z"
                    fill="url(#b)"
                  />
                  <rect x="115" y="54" width="12" height="72" fill="url(#c)" />
                </g>
                <defs>
                  <linearGradient
                    id="b"
                    x1="109"
                    y1="116.5"
                    x2="144.5"
                    y2="159.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="c"
                    x1="121"
                    y1="54"
                    x2="120.799"
                    y2="106.875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              Built with Next.js
            </a>
            <span className="text-fg-muted text-[0.72rem] italic">让知识触手可及</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_URLS } from "../lib/urls";

const SECTION_PREFIXES = [
  "/universe-physics",
  "/cosmology",
  "/human-history",
  "/philosophy",
  "/mathematics",
  "/life-science",
  "/economics",
  "/psychology",
  "/computer-science",
  "/political-science",
  "/knowledge-graph",
  "/read",
  "/curiosities",
];

export function SectionAwareFooter() {
  const pathname = usePathname();
  const inSection = SECTION_PREFIXES.some((p) => pathname.startsWith(p));

  if (inSection) return null;

  return (
    <footer className="border-t border-white/[0.06] px-6 pt-12 pb-8" role="contentinfo">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8">
          <div>
            <div
              className="mb-2 text-[1.05rem] font-bold"
              style={{
                background: "linear-gradient(135deg, #e8e8f0, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Universe Knowledge
            </div>
            <p className="m-0 text-[0.78rem] leading-relaxed text-[#9ca3af]">
              知识即服务平台。以可视化、沉浸式的方式探索人类最重要的知识。
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-[0.78rem] font-semibold tracking-wide text-[#9ca3af]">
              知识领域
            </h3>
            <nav aria-label="知识领域导航">
              <div className="flex flex-col gap-2">
                <Link
                  href={APP_URLS["universe-physics"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  物理学
                </Link>
                <Link
                  href={APP_URLS["cosmology"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  宇宙学
                </Link>
                <Link
                  href={APP_URLS["human-history"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  人类历史
                </Link>
                <Link
                  href={APP_URLS["philosophy"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  哲学思想
                </Link>
                <Link
                  href={APP_URLS["life-science"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#4a9e6f]"
                >
                  生命科学
                </Link>
                <Link
                  href={APP_URLS["mathematics"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  数学与逻辑
                </Link>
                <Link
                  href={APP_URLS["economics"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#e8b84a]"
                >
                  经济学
                </Link>
                <Link
                  href={APP_URLS["psychology"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#d4789c]"
                >
                  心理学
                </Link>
                <Link
                  href={APP_URLS["computer-science"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  计算机科学
                </Link>
                <Link
                  href={APP_URLS["political-science"]}
                  className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
                >
                  政治学
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <h3 className="mb-3 text-[0.78rem] font-semibold tracking-wide text-[#9ca3af]">
              探索方式
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/knowledge-graph"
                className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
              >
                知识图谱
              </Link>
              <Link
                href="/daily"
                className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
              >
                每日知识
              </Link>
              <Link
                href="/read"
                className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
              >
                阅读路线
              </Link>
              <Link
                href="/curiosities"
                className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
              >
                奇趣知识
              </Link>
              <Link
                href={APP_URLS["human-history"] + "/timeline"}
                className="text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
              >
                时间线
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-[0.78rem] font-semibold tracking-wide text-[#9ca3af]">关于</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/Kilo-Org/universe-knowledge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#9ca3af] transition-colors hover:text-[#818cf8]"
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
              <span className="text-sm text-[#9ca3af]">工程原则</span>
              <span className="text-sm text-[#9ca3af]">知识精神</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.04] pt-5">
          <span className="text-[0.7rem] text-[#9ca3af]">
            © {new Date().getFullYear()} Universe Knowledge. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.7rem] text-[#9ca3af] transition-colors hover:text-[#818cf8]"
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
                  <circle cx="90" cy="90" r="90" fill="black" />
                </mask>
                <g mask="url(#a)">
                  <circle cx="90" cy="90" r="90" fill="black" />
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
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="c"
                    x1="121"
                    y1="54"
                    x2="120.799"
                    y2="106.875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              Built with Next.js
            </a>
            <span className="text-[0.7rem] text-[#9ca3af] italic">让知识触手可及</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

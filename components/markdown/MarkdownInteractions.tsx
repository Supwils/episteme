"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type LinkPreview = { t: string; e: string; d: string };

let previewCache: Record<string, LinkPreview> | null = null;
let previewPromise: Promise<Record<string, LinkPreview>> | null = null;

function loadPreviews(): Promise<Record<string, LinkPreview>> {
  if (previewCache) return Promise.resolve(previewCache);
  if (!previewPromise) {
    previewPromise = fetch("/link-previews.json")
      .then((response) => (response.ok ? response.json() : {}))
      .then((previews: Record<string, LinkPreview>) => (previewCache = previews))
      .catch(() => (previewCache = {}));
  }
  return previewPromise;
}

const DOMAIN_LABEL: Record<string, string> = {
  chemistry: "化学",
  cosmology: "宇宙学",
  economics: "经济学",
  "computer-science": "计算机科学",
  "earth-science": "地球科学",
  history: "历史",
  "human-history": "人类历史",
  "life-science": "生命科学",
  linguistics: "语言学",
  mathematics: "数学",
  medicine: "医学",
  philosophy: "哲学",
  physics: "物理",
  "political-science": "政治学",
  psychology: "心理学",
  sociology: "社会学",
  "universe-physics": "宇宙物理",
};

export function WikiLinkPreview({ href, label }: { href: string; label: string }) {
  const [preview, setPreview] = useState<LinkPreview | null>(null);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void loadPreviews().then((previews) => {
        setPreview(previews[href] ?? null);
        setOpen(true);
      });
    }, 200);
  }, [href]);

  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }, []);

  return (
    <span className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={href}
        onFocus={show}
        onBlur={hide}
        className="text-accent-gold font-medium underline decoration-dotted decoration-from-font underline-offset-2 transition-opacity hover:opacity-80"
      >
        {label}
      </Link>
      {open && preview ? (
        <span
          role="tooltip"
          className="border-border-subtle bg-bg-elevated/95 pointer-events-none absolute top-full left-0 z-50 mt-1.5 block w-[min(20rem,80vw)] rounded-xl border p-3 text-left shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <span className="mb-1 flex items-center gap-1.5">
            <span className="bg-bg-panel text-fg-muted rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide">
              {DOMAIN_LABEL[preview.d] ?? preview.d}
            </span>
            <span className="text-fg-primary text-[13px] leading-tight font-semibold">
              {preview.t}
            </span>
          </span>
          {preview.e ? (
            <span className="text-fg-secondary block text-[12px] leading-relaxed">{preview.e}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

export function MarkdownCodeBlock({
  code,
  language,
  accentColor,
}: {
  code: string;
  language: string;
  accentColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="group/code border-border-faint relative my-6 overflow-hidden rounded-lg border">
      {language ? (
        <div className="border-border-faint bg-bg-elevated/50 border-b px-4 py-1.5">
          <span
            className="font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: accentColor }}
          >
            {language}
          </span>
        </div>
      ) : null}
      <pre tabIndex={0} className="bg-bg-elevated overflow-x-auto p-4">
        <code className="text-fg-primary font-mono text-sm leading-relaxed">{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="border-border-faint bg-bg-panel/80 hover:bg-bg-elevated absolute top-2 right-2 rounded-md border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity group-hover/code:opacity-100"
        style={{ color: copied ? "#6bae8a" : accentColor }}
        aria-label={copied ? "已复制" : "复制代码"}
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
    </div>
  );
}

export function MarkdownZoomableImage({
  src,
  alt,
  accentColor,
}: {
  src: string;
  alt: string;
  accentColor: string;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <figure className="my-8">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group/img border-border-faint hover:border-border-subtle relative block w-full cursor-zoom-in overflow-hidden rounded-lg border transition-all"
        >
          {/* Authored Markdown may reference external hosts that are not safe to whitelist globally. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-300 group-hover/img:scale-[1.02]"
          />
          <span
            className="bg-bg-panel/80 absolute right-2 bottom-2 rounded-md px-2 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity group-hover/img:opacity-100"
            style={{ color: accentColor }}
          >
            点击放大
          </span>
        </button>
        {alt ? (
          <figcaption className="text-fg-muted mt-2 text-center text-sm">{alt}</figcaption>
        ) : null}
      </figure>
      {zoomed ? (
        <div
          className="fixed inset-0 z-[500] flex cursor-zoom-out items-center justify-center bg-black/80 p-8 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-label={alt || "图片预览"}
        >
          {/* The zoom target preserves the authored source without a broad remotePatterns policy. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      ) : null}
    </>
  );
}

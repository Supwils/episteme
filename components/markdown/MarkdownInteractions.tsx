"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { shardDomainForHref, type LinkPreview } from "@/lib/link-preview-shards";

export { MarkdownCodeBlock } from "./MarkdownCodeBlock";

// Preview data is sharded per domain (`/link-previews/<domain>.json`) so the
// first hover downloads only the target link's shard instead of one ~915 KB
// file. A resolved wiki-link URL always starts with its article's domain, so
// the shard to load comes straight from the href — this also covers
// multi-domain slugs, since `resolveWikiLink` has already picked one URL.
const previewShardPromises = new Map<string, Promise<Record<string, LinkPreview>>>();

function loadPreviews(href: string): Promise<Record<string, LinkPreview>> {
  const domain = shardDomainForHref(href);
  if (!domain) return Promise.resolve({});
  let promise = previewShardPromises.get(domain);
  if (!promise) {
    promise = fetch(`/link-previews/${domain}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Preview shard unavailable");
        return response.json();
      })
      .catch(() => {
        previewShardPromises.delete(domain);
        return {};
      });
    previewShardPromises.set(domain, promise);
  }
  return promise;
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
  const [isTouch, setIsTouch] = useState(false);
  const [touchPending, setTouchPending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLSpanElement>(null);
  const requestVersion = useRef(0);

  const cancelPending = useCallback(() => {
    requestVersion.current += 1;
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const hide = useCallback(() => {
    cancelPending();
    setTouchPending(false);
    setOpen(false);
  }, [cancelPending]);

  useEffect(() => {
    hide();
    return cancelPending;
  }, [href, hide, cancelPending]);

  // Touch devices have no hover, so the tooltip was unreachable there: a tap
  // used to navigate immediately. On coarse pointers the first tap opens the
  // preview card (with its own "go" link), the second tap navigates.
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!isTouch || (!open && !touchPending)) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        hide();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, isTouch, touchPending, hide]);

  const reveal = useCallback(
    (version: number) => {
      void loadPreviews(href).then((previews) => {
        // Shard requests are shared; invalidate this interaction, not the fetch.
        if (version !== requestVersion.current) return;
        setPreview(previews[href] ?? null);
        setTouchPending(false);
        setOpen(true);
      });
    },
    [href]
  );

  const show = useCallback(() => {
    cancelPending();
    const version = requestVersion.current;
    timer.current = setTimeout(() => {
      timer.current = null;
      reveal(version);
    }, 200);
  }, [cancelPending, reveal]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isTouch || open) return; // desktop, or second tap while open → navigate
      e.preventDefault();
      cancelPending();
      setTouchPending(true);
      reveal(requestVersion.current);
    },
    [isTouch, open, cancelPending, reveal]
  );

  return (
    <span
      ref={rootRef}
      className="relative inline-block"
      onMouseEnter={isTouch ? undefined : show}
      onMouseLeave={isTouch ? undefined : hide}
    >
      <Link
        href={href}
        onFocus={isTouch ? undefined : show}
        onBlur={isTouch ? undefined : hide}
        onClick={handleClick}
        aria-expanded={isTouch ? open : undefined}
        className="text-accent-gold font-medium underline decoration-dotted decoration-from-font underline-offset-2 transition-opacity hover:opacity-80"
      >
        {label}
      </Link>
      {open && preview ? (
        <span
          role="tooltip"
          className={`border-border-subtle bg-bg-elevated/95 absolute top-full left-0 z-50 mt-1.5 block w-[min(20rem,80vw)] rounded-xl border p-3 text-left shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl ${
            isTouch ? "pointer-events-auto" : "pointer-events-none"
          }`}
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
          {isTouch ? (
            <Link
              href={href}
              className="text-accent-gold mt-2 inline-block text-[12px] font-medium underline underline-offset-2"
            >
              前往阅读 →
            </Link>
          ) : null}
        </span>
      ) : null}
    </span>
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!zoomed) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    dialog?.showModal();
    closeRef.current?.focus();
    return () => {
      dialog?.close();
      trigger?.focus();
    };
  }, [zoomed]);

  return (
    <>
      <figure className="my-8">
        <button
          ref={triggerRef}
          type="button"
          aria-label={alt ? `放大图片：${alt}` : "放大图片"}
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
        <dialog
          ref={dialogRef}
          className="fixed inset-0 z-[500] m-0 flex h-screen max-h-none w-screen max-w-none cursor-zoom-out items-center justify-center border-0 bg-black/80 p-8 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
          onCancel={(event) => {
            event.preventDefault();
            setZoomed(false);
          }}
          aria-modal="true"
          aria-label={alt || "图片预览"}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="关闭图片预览"
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 rounded-lg bg-black/60 px-4 py-2 text-white"
          >
            关闭
          </button>
          {/* The zoom target preserves the authored source without a broad remotePatterns policy. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </dialog>
      ) : null}
    </>
  );
}

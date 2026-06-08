'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type CopyLinkButtonProps = {
  url: string;
  label?: string;
  className?: string;
};

export function CopyLinkButton({ url, label = '复制链接', className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, [url]);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={copyLink}
        aria-label={label}
        className={
          className ??
          'flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] px-3 py-2 text-[13px] text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-200 cursor-pointer'
        }
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              className="flex items-center gap-1.5 text-emerald-400"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              已复制
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              className="flex items-center gap-1.5"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 text-[11px] text-emerald-400 font-mono tracking-wide"
          >
            链接已复制
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

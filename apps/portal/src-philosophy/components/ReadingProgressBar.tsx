"use client";

import { useEffect, useState } from "react";
import { markVisited, updateScroll } from "../lib/reading-progress";

type ReadingProgressBarProps = {
  slug: string;
  contentType?: string;
};

export function ReadingProgressBar({ slug, contentType }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    markVisited(slug);

    let ticking = false;
    let writeTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight <= 0 ? 100 : Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setProgress(percent);
        ticking = false;

        if (writeTimeout) clearTimeout(writeTimeout);
        writeTimeout = setTimeout(() => updateScroll(slug, percent), 500);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (writeTimeout) clearTimeout(writeTimeout);
    };
  }, [slug]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[3px]" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={contentType ? `${contentType} 阅读进度` : "阅读进度"}>
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #c8a45a 0%, #e8d5a3 100%)",
        }}
      />
    </div>
  );
}

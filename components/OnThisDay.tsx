"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/animations";
import type { OnThisDayEvent } from "../lib/daily-knowledge";
import { dailyLabelFor, dedupeDailyEvents } from "../lib/daily-display";
import { isSafeHref } from "@/lib/urls";

type OnThisDayProps = {
  events: OnThisDayEvent[];
  /** The site day the events were picked for (YYYY-MM-DD, Asia/Shanghai). The
   *  browser's own clock would disagree with the server's pick near midnight. */
  date: string;
};

const DOMAIN_LABELS: Record<string, string> = {
  宇宙物理: "物理",
  人类历史: "历史",
  哲学思想: "哲学",
  生命科学: "生命",
};

/** Events without a specific url fall back to the history timeline. */
const FALLBACK_URL = "/human-history/timeline";

export function eventHref(event: Pick<OnThisDayEvent, "url">): string {
  const url = event.url?.trim();
  return url && isSafeHref(url) ? url : FALLBACK_URL;
}

function getDomainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain;
}

function formatYear(year: number): string {
  return year < 0 ? `公元前${Math.abs(year)}年` : `${year}年`;
}

// Server content stays visible without waiting for viewport callbacks or JS.
export function OnThisDay({ events, date }: OnThisDayProps) {
  const [, month, day] = date.split("-").map(Number);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-display text-fg-primary mb-1 text-xl font-semibold">历史上的今天</h2>
        <p className="text-fg-muted text-[0.78rem]">
          {month}月{day}日
        </p>
      </motion.div>

      <motion.div
        className="relative"
        variants={STAGGER_CONTAINER}
        initial={false}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div
          aria-hidden="true"
          className="from-border-subtle absolute top-2 bottom-2 left-[15px] w-[2px] bg-gradient-to-b to-transparent"
        />

        {dedupeDailyEvents(events).map((event) => {
          const label = dailyLabelFor(event.url, getDomainLabel(event.domain));
          return (
            <motion.div
              key={`${event.year}-${event.title}`}
              className="group relative flex gap-4 pb-6 last:pb-0"
              variants={STAGGER_ITEM}
            >
              <div className="relative z-10 mt-1.5 shrink-0">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{
                    background: "var(--background)",
                    boxShadow: `0 0 0 2px ${event.domainColor}44`,
                  }}
                >
                  <div
                    className="h-[10px] w-[10px] rounded-full"
                    style={{ background: event.domainColor }}
                  />
                </div>
              </div>

              <Link
                href={eventHref(event)}
                className="group-hover:bg-bg-elevated border-border-faint bg-bg-panel focus-visible:ring-accent-gold block flex-1 rounded-xl border p-4 no-underline transition-all duration-300 focus-visible:ring-1 focus-visible:outline-none"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className="font-mono text-[0.72rem] font-semibold"
                    style={{ color: event.domainColor }}
                  >
                    {formatYear(event.year)}
                  </span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[0.65rem] font-semibold"
                    style={{
                      color: event.domainColor,
                      background: `${event.domainColor}14`,
                    }}
                  >
                    {label}
                  </span>
                </div>
                <h3 className="text-fg-primary group-hover:text-accent-gold m-0 text-[0.9rem] leading-snug font-semibold transition-colors">
                  {event.title}
                </h3>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

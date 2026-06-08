"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "../lib/constants";
import type { ExtinctionEvent } from "../lib/types";

export function ExtinctionEventCard({
  event,
  index,
}: {
  event: ExtinctionEvent;
  index: number;
}) {
  const reduce = useReducedMotion();
  const severityPercent = (event.severity / 5) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : index * 0.1,
        ease: PRODUCT_EASE,
      }}
      className="group relative overflow-hidden border p-5 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(255,107,107,0.12)]"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <div
        className="absolute top-0 left-0 h-full w-[3px] transition-all duration-500 group-hover:w-[4px]"
        style={{
          background: `linear-gradient(to bottom, #ff6b6b, rgba(255,107,107,0.2))`,
        }}
      />

      <div className="flex items-start justify-between gap-3 pl-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[1.05rem] font-semibold text-[#e8e8f0]">
            {event.name}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] tracking-wider text-[#ff6b6b]">
            {event.nameEn}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono text-[11px] text-[#9ca3af]">
            {event.dateDisplay}
          </div>
          <div className="font-mono text-[10px] text-[#666]">
            {event.dateMYA} MYA
          </div>
        </div>
      </div>

      <div className="mt-3 pl-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wider text-[#888]">
            物种灭绝比例
          </span>
          <span className="font-mono text-sm font-bold text-[#ff6b6b]">
            {event.speciesLostPercent}%
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ background: "rgba(255,107,107,0.1)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${event.speciesLostPercent}%` }}
            transition={{
              duration: reduce ? 0 : 1.2,
              delay: reduce ? 0 : index * 0.1 + 0.3,
              ease: PRODUCT_EASE,
            }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #ff6b6b, #ee5a24)",
            }}
          />
        </div>
      </div>

      <div className="mt-3 pl-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wider text-[#888]">
            严重程度
          </span>
          <span className="font-mono text-[10px] text-[#e07a5f]">
            {event.severity}/5
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: "rgba(224,122,95,0.1)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${severityPercent}%` }}
            transition={{
              duration: reduce ? 0 : 1,
              delay: reduce ? 0 : index * 0.1 + 0.5,
              ease: PRODUCT_EASE,
            }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #e07a5f, #d35400)",
            }}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 pl-3">
        {event.causes.map((cause) => (
          <span
            key={cause}
            className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wide text-[#9ca3af]"
            style={{ borderColor: "rgba(255,107,107,0.15)" }}
          >
            {cause}
          </span>
        ))}
      </div>

      <p className="mt-3 pl-3 text-[0.8rem] leading-relaxed text-[#888]">
        {event.description}
      </p>
    </motion.div>
  );
}

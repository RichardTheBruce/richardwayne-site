"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export type StatItem = {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
};

function StatEntry({ item }: { item: StatItem }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const numeric = Number(item.value.replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { value: 0 };
      gsap.to(counter, {
        value: numeric,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${item.prefix ?? ""}${Math.round(
            counter.value
          ).toLocaleString()}${item.suffix ?? ""}`;
        },
      });
    });

    return () => mm.revert();
  }, [numeric, item.prefix, item.suffix]);

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={valueRef}
        className="mono-label text-sm text-[var(--text-0)] sm:text-base"
      >
        {item.prefix ?? ""}
        {numeric.toLocaleString()}
        {item.suffix ?? ""}
      </span>
      <span className="text-xs text-[var(--text-2)]">{item.label}</span>
    </div>
  );
}

export function StatBar({ items }: { items: StatItem[] }) {
  return (
    <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-y border-[var(--border)] py-6">
      {items.map((item) => (
        <StatEntry key={item.label} item={item} />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export type StatItem = {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
};

function useCountUp(target: number, active: boolean) {
  const [display, setDisplay] = useState(active ? target : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function step(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [active, target]);

  return display;
}

function StatEntry({ item, active }: { item: StatItem; active: boolean }) {
  const numeric = Number(item.value.replace(/[^0-9]/g, "")) || 0;
  const count = useCountUp(numeric, active);

  return (
    <div className="flex flex-col gap-1">
      <span className="mono-label text-sm text-[var(--text-0)] sm:text-base">
        {item.prefix ?? ""}
        {count.toLocaleString()}
        {item.suffix ?? ""}
      </span>
      <span className="text-xs text-[var(--text-2)]">{item.label}</span>
    </div>
  );
}

export function StatBar({ items }: { items: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-y border-[var(--border)] py-6"
    >
      {items.map((item) => (
        <StatEntry key={item.label} item={item} active={active} />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export type TimelineEntry = {
  period: string;
  body: string;
};

/**
 * Vertical timeline with an accent path drawn down the left edge.
 * The path is scroll-scrubbed by the motion layer (GSAP ScrollTrigger);
 * without JS or under reduced-motion, the full line and all dots render
 * immediately so the timeline reads correctly either way.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [drawn, setDrawn] = useState(1);
  const [passedCount, setPassedCount] = useState(entries.length);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    setPathLength(path.getTotalLength());
    setDrawn(0);
    setPassedCount(0);

    function onScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const progressed = Math.min(
        1,
        Math.max(0, (viewportH - rect.top) / total)
      );
      setDrawn(progressed);
      setPassedCount(Math.round(progressed * entries.length));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entries.length]);

  return (
    <div ref={containerRef} className="relative pl-10">
      <svg
        className="absolute left-0 top-0 h-full w-6"
        viewBox={`0 0 24 ${entries.length * 200}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={`M12 0 L12 ${entries.length * 200}`}
          fill="none"
          stroke="var(--border-bright)"
          strokeWidth="2"
        />
        <path
          ref={pathRef}
          d={`M12 0 L12 ${entries.length * 200}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray={pathLength || 1}
          strokeDashoffset={
            pathLength ? pathLength * (1 - drawn) : 0
          }
        />
      </svg>
      <ol className="space-y-14">
        {entries.map((entry, index) => (
          <li key={entry.period} className="relative">
            <span
              className="absolute -left-10 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-colors duration-300"
              style={{
                borderColor: index < passedCount ? "var(--accent)" : "var(--border-bright)",
                backgroundColor: index < passedCount ? "var(--accent)" : "var(--bg-0)",
              }}
              aria-hidden="true"
            />
            <p className="mono-label text-xs text-[var(--accent)]">
              {entry.period}
            </p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--text-1)]">
              {entry.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

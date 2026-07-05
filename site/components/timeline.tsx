"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

export type TimelineEntry = {
  period: string;
  body: string;
};

/**
 * Vertical timeline with an accent path drawn down the left edge,
 * scroll-scrubbed via GSAP ScrollTrigger. Dots pop as the draw passes
 * them. Without JS or under reduced-motion, the full line and all dots
 * render immediately so the timeline still reads correctly.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [passedCount, setPassedCount] = useState(entries.length);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = "0";

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setPassedCount(0);

      gsap.fromTo(
        path,
        { strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
            onUpdate: (self) => {
              setPassedCount(Math.round(self.progress * entries.length));
            },
          },
        }
      );
    });

    return () => mm.revert();
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

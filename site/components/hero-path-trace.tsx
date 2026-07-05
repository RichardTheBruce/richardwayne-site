"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

/**
 * Single 2px accent path that draws in under the hero H1 on load.
 * Static SVG by default (content readable with JS disabled); GSAP
 * animates stroke-dashoffset, scoped to motion-safe contexts only.
 */
export function HeroPathTrace() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = "0";

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        path,
        { strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <svg
      viewBox="0 0 320 16"
      width="320"
      height="16"
      className="mt-3 h-4 w-full max-w-[320px]"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M2 8C40 2, 80 14, 120 8S200 2, 240 8, 300 8, 318 8"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

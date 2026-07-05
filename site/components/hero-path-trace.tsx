"use client";

import { useEffect, useRef } from "react";

/**
 * Single 2px accent path that draws in under the hero H1 on load.
 * Static SVG by default (content readable with JS disabled); the motion
 * layer animates stroke-dashoffset via GSAP, respecting reduced-motion.
 */
export function HeroPathTrace() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      path.style.strokeDashoffset = "0";
      return;
    }

    path.style.strokeDashoffset = `${length}`;
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
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

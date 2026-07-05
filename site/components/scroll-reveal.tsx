"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";

/**
 * Fade + rise scroll reveal via GSAP ScrollTrigger. Content renders fully
 * visible in the DOM (readable with JS disabled or before hydration);
 * gsap.matchMedia scopes the animation to motion-safe contexts only, so
 * prefers-reduced-motion visitors get the static, always-visible layout.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

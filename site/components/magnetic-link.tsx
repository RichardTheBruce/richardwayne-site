"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";

const MAGNETIC_RADIUS = 120;
const MAGNETIC_STRENGTH = 12;

/**
 * Magnetic CTA: attracts toward the cursor within a 120px radius
 * (translate max 12px), elastic return on leave. Falls back to a plain
 * link with no transform under reduced-motion, since gsap.matchMedia
 * never registers the pointer listeners in that context.
 */
export function MagneticLink({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      function onPointerMove(e: PointerEvent) {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        if (distance < MAGNETIC_RADIUS) {
          const pull = (1 - distance / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
          const angle = Math.atan2(dy, dx);
          gsap.to(el, {
            x: Math.cos(angle) * pull,
            y: Math.sin(angle) * pull,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });
        }
      }

      function onPointerLeave() {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      }

      window.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerleave", onPointerLeave);

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerleave", onPointerLeave);
      };
    });

    return () => mm.revert();
  }, []);

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

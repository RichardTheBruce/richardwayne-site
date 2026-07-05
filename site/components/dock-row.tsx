"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";

/**
 * macOS-dock-style proximity scale row. The item nearest the cursor
 * scales to 1.25x, immediate neighbors to 1.1x, everything else rests
 * at 1x. Disabled under reduced-motion and on touch (no meaningful
 * "proximity" without a hovering pointer); items render at natural
 * size in both cases.
 */
export function DockRow({ children }: { children: ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      function onPointerMove(e: PointerEvent) {
        const items = itemRefs.current.filter(
          (el): el is HTMLSpanElement => el !== null
        );
        const distances = items.map((el) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          return Math.abs(e.clientX - centerX);
        });
        const minDistance = Math.min(...distances);
        const nearestIndex = distances.indexOf(minDistance);

        items.forEach((el, index) => {
          const isNearest = index === nearestIndex && minDistance < 90;
          const isNeighbor =
            !isNearest &&
            Math.abs(index - nearestIndex) === 1 &&
            minDistance < 90;
          const scale = isNearest ? 1.25 : isNeighbor ? 1.1 : 1;
          gsap.to(el, { scale, duration: 0.25, ease: "power2.out" });
        });
      }

      function onPointerLeave() {
        itemRefs.current.forEach((el) => {
          if (el) gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" });
        });
      }

      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);

      return () => {
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center gap-x-8 gap-y-3"
    >
      {children.map((child, index) => (
        <span
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className="mono-label inline-block text-xs text-[var(--text-2)]"
          style={{ transformOrigin: "center" }}
        >
          {child}
        </span>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import type { CaseStudy } from "@/lib/work";

export function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const svg = svgRef.current;
    const rect = rectRef.current;
    if (!card || !svg || !rect) return;

    const length = rect.getTotalLength();
    rect.style.strokeDasharray = `${length}`;
    rect.style.strokeDashoffset = `${length}`;

    const gsap = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          once: true,
        },
      });

      tl.set(svg, { opacity: 1 }).fromTo(
        rect,
        { strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.inOut",
        }
      );

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/work/${study.slug}`}
      className="work-card card-surface group relative block overflow-hidden"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-1)]">
        <Image
          src={study.cardImage.src}
          alt={study.cardImage.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          priority={index === 0}
        />
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-[var(--text-0)]">
            {study.title}
          </h3>
          <span className="mono-label shrink-0 text-xs text-[var(--text-2)]">
            {study.role}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-1)]">
          {study.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
      </div>
      <svg
        ref={svgRef}
        className="reveal-border pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect
          ref={rectRef}
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
      </svg>
    </Link>
  );
}

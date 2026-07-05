import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WorkCard } from "@/components/work-card";
import { CtaBand } from "@/components/cta-band";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Richard Wayne: an agentic bank, a $300K cross-chain launchpad, the first omnichain NFT platform, a federal PPE supplier rebuild, and a crypto-education app.",
};

export default function WorkIndexPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
            Work
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--text-1)]">
            Five builds, five different failure modes solved. Each one
            shipped to production, not a demo.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <WorkCard key={study.slug} study={study} index={index} />
          ))}

          <Link
            href="/about#more"
            className="work-card card-surface group relative block overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-1)]">
              <Image
                src="/work/lab-saturn.png"
                alt="A physics playground with a particle field and an orbiting Saturn model"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-[var(--text-0)]">
                  The Lab
                </h3>
                <span className="mono-label shrink-0 text-xs text-[var(--text-2)]">
                  Experiments
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-1)]">
                A physics playground: 90,000-particle heroes, string fields,
                a Saturn that becomes your cursor.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip">Canvas</span>
                <span className="chip">WebGL</span>
                <span className="chip">GSAP</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <CtaBand
        heading="Have something that needs to exist?"
        body="Tell me what you are building and where it hurts. I reply within one business day."
        buttonLabel="Start the conversation"
        buttonHref="/contact"
      />
    </>
  );
}

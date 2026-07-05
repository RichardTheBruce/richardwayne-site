import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { WorkGallery } from "@/components/work-gallery";
import { caseStudies, getAdjacentCaseStudies, getCaseStudy } from "@/lib/work";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const caseStudyDescriptions: Record<string, string> = {
  "nuro-finance":
    "Nuro Finance case study: an agentic bank with an agent that cannot lie about what it did.",
  memetropolis:
    "Memetropolis case study: the first OFT launchpad on LayerZero, live across 7 chains.",
  "omni-x":
    "Omni-X case study: co-founding the first natively omnichain NFT platform.",
  "federal-ppe":
    "Federal-scale PPE supplier case study: a storefront rebuild plus a signal pipeline over public procurement data.",
  cryptogal:
    "CryptoGal case study: a warm crypto-education app for women with a real wallet and a scam analyzer.",
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: caseStudyDescriptions[slug] ?? study.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Work", item: `${site.url}/work` },
              {
                "@type": "ListItem",
                position: 2,
                name: study.title,
                item: `${site.url}/work/${study.slug}`,
              },
            ],
          }),
        }}
      />

      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <Link
            href="/work"
            className="mono-label text-xs text-[var(--text-2)] transition-colors hover:text-[var(--text-0)]"
          >
            &larr; All work
          </Link>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
              {study.title}
            </h1>
            <span className="mono-label text-xs text-[var(--text-2)]">
              {study.role}
            </span>
          </div>
          {study.ndaNote ? (
            <p className="mt-3 text-sm italic text-[var(--text-2)]">
              {study.ndaNote}
            </p>
          ) : null}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
            {study.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {study.chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--text-0)]">
              The problem
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-1)]">
              {study.problem}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--text-0)]">
              The build
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-1)]">
              {study.build}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="border-l-2 border-[var(--accent)] pl-6">
            <h2 className="font-display text-xl font-semibold text-[var(--text-0)]">
              The hard part
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-1)]">
              {study.hardPart}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--text-0)]">
              Outcome
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-1)]">
              {study.outcome}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-display text-xl font-semibold text-[var(--text-0)]">
            Gallery
          </h2>
          <div className="mt-8">
            <WorkGallery images={study.gallery} />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-10">
        <div className="container-page flex items-center justify-between gap-4">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex flex-col text-left"
          >
            <span className="mono-label text-xs text-[var(--text-2)]">Previous</span>
            <span className="mt-1 text-sm text-[var(--text-1)] group-hover:text-[var(--text-0)]">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col text-right"
          >
            <span className="mono-label text-xs text-[var(--text-2)]">Next</span>
            <span className="mt-1 text-sm text-[var(--text-1)] group-hover:text-[var(--text-0)]">
              {next.title}
            </span>
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

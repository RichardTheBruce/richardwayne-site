import type { Metadata } from "next";
import Link from "next/link";

const SSRN_URL =
  "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6692018";

const ABSTRACT_PARAGRAPHS = [
  "The ancient principle preserved in the Emerald Tablet, attributed to Hermes Trismegistus and foundational to centuries of philosophical inquiry, holds that the structure of what is above mirrors the structure of what is below. The Apostle Paul, writing to the Corinthians, observed that celestial bodies differ from one another in glory, as terrestrial bodies differ from one another in kind, and that the splendor of each is its own. These are not merely poetic observations. They are, this paper proposes, early articulations of a structural claim that physics has since made precise and that the study of human consciousness has not yet followed to its logical conclusion.",
  "This paper proposes a first formal framework for treating conscious human beings as mass bodies subject to the same class of structural laws that govern physical mass systems. The proposal is not that human beings are literally stars, or that consciousness is reducible to matter. The proposal is more precise and more limited: that the properties which define the behavior of physical mass bodies, their mass, energy output, directional momentum, decay frequency, wavelength character, probability space, and resonance coupling with other bodies, have genuine analogs in the properties of conscious human actors, and that these analogs are in principle observable, measurable, and formally expressible.",
  "The framework draws on the established physical classification of stellar bodies, most rigorously developed through the spectroscopic work of Cecilia Payne-Gaposchkin, whose 1925 dissertation demonstrated that stars could be classified by measurable wavelength signatures into a coherent system of spectral types. This paper proposes an analogous classification for conscious mass bodies: a first attempt at mapping the qualitative properties of human actors onto a formal typology grounded in the same physical variables that govern stellar classification, and expressible through a proposed decay wave function W(t) whose components are identified, whose relationships are proposed, and whose full mathematical formalization is offered as an invitation to future research.",
  "The paper makes no claim to have completed this formalization. It claims something more modest and more useful: that the mapping is internally consistent, that the proposed variables are the right variables, that the physical analogs are genuinely analogous rather than merely illustrative, and that the framework generates testable predictions about how conscious actors accumulate influence, attract compatible others, approach critical life events, and transition into new forms. The full mathematical specification of these relationships requires empirical calibration, computational modeling, and collaboration across physics, cognitive science, and the social sciences that exceeds the scope of this paper. What this paper provides is the architecture for that collaboration and an argument for why it is worth pursuing.",
  "The question this paper opens is not only whether consciousness follows structural physical regularities. It is what that means for what mankind can become, what the limits of conscious becoming are, if any exist at all, and what the path looks like from nothing to something to the approach of becoming one with everything.",
];

const KEYWORDS = [
  "consciousness",
  "physical analogy",
  "mass systems",
  "stellar classification",
  "decay function",
  "wave function",
  "conscious mass",
  "probability space",
  "resonance coupling",
  "Payne-Gaposchkin",
  "Hermes Trismegistus",
  "as above so below",
  "predictive framework",
];

export const metadata: Metadata = {
  title:
    "On the Matter of Consciousness and Its Equivocation: Toward a Physical Framework for the Properties of Conscious Mass",
  description:
    "A first formal framework treating conscious human beings as mass bodies subject to the same structural laws that govern physical mass systems, with a proposed decay wave function W(t) and a Payne-Gaposchkin-style classification of conscious mass types.",
  alternates: {
    canonical:
      "https://richardthebruce.com/writing/consciousness-equivocation",
  },
  openGraph: {
    title:
      "On the Matter of Consciousness and Its Equivocation",
    description:
      "A first formal framework treating conscious human beings as mass bodies subject to the same structural laws that govern physical mass systems.",
    type: "article",
    publishedTime: "2026-01-01",
    authors: ["Richard Wayne"],
  },
};

export default function ConsciousnessEquivocationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline:
      "On the Matter of Consciousness and Its Equivocation: Toward a Physical Framework for the Properties of Conscious Mass",
    author: {
      "@type": "Person",
      name: "Richard Wayne",
      url: "https://richardthebruce.com",
    },
    datePublished: "2026-01-01",
    publisher: {
      "@type": "Organization",
      name: "SSRN",
      url: "https://ssrn.com",
    },
    abstract:
      "This paper proposes a first formal framework for treating conscious human beings as mass bodies subject to the same class of structural laws that govern physical mass systems. Drawing on the stellar classification work of Cecilia Payne-Gaposchkin, it proposes an analogous typology for conscious mass bodies expressible through a decay wave function W(t), generating testable predictions about how conscious actors accumulate influence, attract compatible others, approach critical life events, and transition into new forms.",
    url: "https://richardthebruce.com/writing/consciousness-equivocation",
    sameAs: SSRN_URL,
    keywords: KEYWORDS.join(", "),
    numberOfPages: 19,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-20 sm:py-28">
        <div className="container-page max-w-2xl">
          {/* Back nav */}
          <Link
            href="/writing"
            className="mono-label text-xs text-[var(--text-2)] transition-colors hover:text-[var(--text-0)]"
          >
            &larr; All writing
          </Link>

          {/* Header */}
          <header className="mt-6">
            <p className="mono-label text-xs text-[var(--text-2)]">
              SSRN &middot; 2026 &middot; 19 pages
            </p>
            <h1 className="font-display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] font-semibold leading-tight tracking-tight text-[var(--text-0)]">
              On the Matter of Consciousness and Its Equivocation: Toward a
              Physical Framework for the Properties of Conscious Mass
            </h1>
            <p className="mt-3 text-sm text-[var(--text-2)]">
              <span className="text-[var(--text-1)]">Richard Wayne</span>
              {" "}
              &middot; Published on SSRN
            </p>
          </header>

          {/* SSRN link at top */}
          <p className="mt-5">
            <a
              href={SSRN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-[var(--accent)] underline underline-offset-4"
            >
              View the original on SSRN &rarr;
            </a>
          </p>

          {/* Abstract */}
          <section className="mt-10" aria-labelledby="abstract-heading">
            <h2
              id="abstract-heading"
              className="mono-label text-xs text-[var(--text-2)]"
            >
              Abstract
            </h2>
            <div className="mt-4 space-y-5 text-base leading-relaxed text-[var(--text-1)]">
              {ABSTRACT_PARAGRAPHS.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Keywords */}
          <section className="mt-8" aria-labelledby="keywords-heading">
            <h2
              id="keywords-heading"
              className="mono-label text-xs text-[var(--text-2)]"
            >
              Keywords
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {KEYWORDS.map((kw) => (
                <span key={kw} className="chip">
                  {kw}
                </span>
              ))}
            </div>
          </section>

          {/* PDF embed */}
          <section className="mt-10" aria-labelledby="paper-heading">
            <h2
              id="paper-heading"
              className="mono-label text-xs text-[var(--text-2)]"
            >
              Full paper
            </h2>
            <div
              className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]"
              style={{ height: "680px" }}
            >
              <iframe
                src="/research/consciousness-equivocation.pdf"
                title="On the Matter of Consciousness and Its Equivocation — full paper PDF"
                width="100%"
                height="100%"
                className="block"
                aria-label="Full paper PDF viewer"
              />
            </div>
            <p className="mt-2 text-xs text-[var(--text-2)]">
              PDF not rendering?{" "}
              <a
                href="/research/consciousness-equivocation.pdf"
                className="text-[var(--accent)] underline underline-offset-4"
                download
              >
                Download directly
              </a>
              .
            </p>
          </section>

          {/* SSRN citation link */}
          <section className="mt-10">
            <a
              href={SSRN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-secondary inline-flex"
            >
              Read and cite on SSRN &rarr;
            </a>
          </section>

          {/* Footer */}
          <footer className="mt-16 border-t border-[var(--border)] pt-8">
            <p className="text-sm text-[var(--text-1)]">
              Questions about this research?{" "}
              <a
                href="mailto:Richard@richardthebruce.com"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                Richard@richardthebruce.com
              </a>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                /contact
              </Link>
              .
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}

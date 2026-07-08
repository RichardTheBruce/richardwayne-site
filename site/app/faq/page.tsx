import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about working with Richard Wayne: solo engineer reliability, shipping speed, timezone, IP ownership, and how to start.",
  alternates: {
    canonical: "https://richardthebruce.com/faq",
  },
};

export const faqs = [
  {
    q: "You are a solo engineer. What if you disappear?",
    a: "I build systems that survive me leaving. Observability, kill-switches, and handoff docs ship with every engagement, and you own the repo, the architecture, and the deploy from day one. I also run a personal AI system that documents every decision, so the context never lives only in my head.",
  },
  {
    q: "Can one person really ship this fast?",
    a: "Yes, because I am not really working alone. I pair with a personal neural net I designed that documents every decision and lets me ship at the pace of a small team. Ten years of founding-engineer work, seven of them running production systems, is the track record.",
  },
  {
    q: "What about timezone and availability?",
    a: "I am US-based on Eastern time and reply to scope requests within one business day. I take a limited number of builds at once so the one I am on gets real attention.",
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do. Everything produced in a discovery sprint or a build is yours, whether or not we continue. A founding engineer who traps you is not helping you.",
  },
  {
    q: "Can this scale past you?",
    a: "The systems are built to hold at 10K and 100K users and are handed off with docs so your next hire can run them. I have run production systems with that discipline for seven years.",
  },
  {
    q: "How do we start?",
    a: "A 30-minute scope call. You describe the problem, I tell you honestly whether I am the right builder and what I would do first. No deck, no pitch.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <p className="mono-label text-xs text-[var(--text-2)]">
            Common questions
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
            FAQ
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--text-1)]">
            Honest answers to the questions I hear most often.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page max-w-3xl space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[var(--border)] py-8 first:pt-0 last:border-0"
            >
              <h2 className="font-display text-lg font-semibold text-[var(--text-0)]">
                {faq.q}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-1)]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        heading="Ready to start?"
        body="A 30-minute scope call. You describe the problem, I tell you honestly whether I am the right builder and what I would do first."
        buttonLabel="Book a scope call"
        buttonHref="/contact"
      />
    </>
  );
}

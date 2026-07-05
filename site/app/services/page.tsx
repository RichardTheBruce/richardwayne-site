import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { ProfessionalServiceJsonLd } from "@/components/professional-service-jsonld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three ways to engage a founding engineer: AI agent systems, cross-chain and payments infrastructure, and founding-engineer product builds. All of them end with working software in production.",
};

const offers = [
  {
    title: "AI agent systems",
    body: "Agents that execute real actions under proof, not chatbots that describe them. Execution layers, observability, kill-switches, and the trust architecture that makes autonomy safe to ship.",
    goodFit:
      "Good fit if: you need an agent that acts, not chats. You are wiring LLMs to real actions (payments, ops, data) and cannot afford hallucinated execution. You want observability and kill-switches designed in, not bolted on.",
  },
  {
    title: "Cross-chain and payments infrastructure",
    body: "LayerZero V2, Circle CCTP, Visa settlement rails. OApp, OFT, and ONFT patterns that are battle-tested in production across 7 chains, not demoed once on testnet.",
    goodFit:
      "Good fit if: you are going multi-chain and the bridges scare you. You need OFT or ONFT done right the first time. You are settling card or fiat rails against on-chain balances.",
  },
  {
    title: "Founding-engineer product builds",
    body: "The whole stack: contracts, backend, database, frontend, motion design, deploy, and the operational discipline to keep it alive. I have run this loop for 10 years.",
    goodFit:
      "Good fit if: you have a funded idea and no engineering team. You need someone who ships the contract, the backend, the frontend, and the deploy. You want a builder who has been the founder too and thinks about your runway like it is his own.",
  },
];

const process = [
  {
    title: "Scope call.",
    body: "30 minutes. You describe the problem, I tell you honestly whether I am the right builder and what I would do first. No deck, no sales pitch: a technical conversation about your actual constraints.",
  },
  {
    title: "Discovery sprint.",
    body: "A short paid sprint that produces architecture, a build plan, and a demo slice. You own everything produced, whether or not we continue past this point.",
  },
  {
    title: "The build.",
    body: "Weekly ships you can click, not status decks. Every claim verifiable in the repo, every decision logged, so you always know exactly where the project stands.",
  },
  {
    title: "Operate and harden.",
    body: "Observability, kill-switches, and handoff docs. I build systems that survive me leaving, because a founding engineer who traps you is not actually helping you.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
            Services
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--text-1)]">
            Three ways to engage. All of them end with working software in
            production.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page space-y-10">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="card-surface grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--text-0)]">
                  {offer.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-1)]">
                  {offer.body}
                </p>
              </div>
              <div className="border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="mono-label text-xs text-[var(--accent)]">
                  Good fit
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-1)]">
                  {offer.goodFit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-20 sm:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
            Process
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div key={step.title}>
                <span className="mono-label text-xs text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold text-[var(--text-0)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING BLOCK: intentionally omitted pending Richard's sign-off. */}

      <CtaBand
        heading="Have something that needs to exist?"
        body="Tell me what you are building and where it hurts. I reply within one business day."
        buttonLabel="Start the conversation"
        buttonHref="/contact"
      />
    </>
  );
}

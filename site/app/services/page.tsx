import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { ProfessionalServiceJsonLd } from "@/components/professional-service-jsonld";
import { CalBookingButton } from "@/components/cal-booking-button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cross-chain infrastructure (LayerZero V2, Circle CCTP), on-chain agent systems, and full-stack founding-engineer builds. Production proof across 23 chains. Start with a 30-minute scope call.",
  alternates: {
    canonical: "https://richardthebruce.com/services",
  },
};

const offers = [
  {
    title: "Cross-chain and DeFi infrastructure",
    body: "LayerZero V2 OApp, OFT, and ONFT patterns that are battle-tested in production across 7 chains. Circle CCTP including the Solana-to-EVM route most teams stall on. Concurrency that never strands funds: Postgres advisory locks, per-address chain locks, fresh-fetched nonces on every transaction. Visa settlement rails against on-chain balances.",
    goodFit:
      "Good fit if: you are going multi-chain and the bridges scare you. You need OFT or ONFT done right the first time, not after a botched first attempt. You are settling card or fiat rails against on-chain balances and cannot afford a stranded transaction.",
  },
  {
    title: "On-chain agent systems",
    body: "Agents that execute real on-chain actions under proof, not chatbots that describe them. Execution layers with observability, kill-switches, and a trust contract so your users know the agent cannot lie about what it did. Every action verifiable against a confirmed transaction hash.",
    goodFit:
      "Good fit if: you need an agent that acts on-chain, not one that chats about it. You are wiring LLMs to real payments, swaps, or chain state and cannot afford hallucinated execution. You want kill-switches and observability designed in from day one.",
  },
  {
    title: "Founding-engineer product builds",
    body: "Contracts, backend, database, frontend, deploy, and the operational discipline to keep it alive. I co-founded the first omnichain NFT platform (Omni-X), built the first OFT launchpad on LayerZero V2, and run a personal AI system that lets me ship at the pace of a small team. I have run this full-stack loop for 10 years.",
    goodFit:
      "Good fit if: you have a funded idea and no engineering team yet. You need someone who ships the contract, the backend, the frontend, and the deploy, without a hand-off gap between each. You want a builder who has been the founder too and thinks about your runway like it is his own.",
  },
];

const engagementSteps = [
  {
    label: "01",
    title: "Scope call",
    duration: "30 min, free",
    body: "You describe the problem. I tell you honestly whether I am the right builder, what the real risks are, and exactly what I would do first. No deck, no pitch.",
    cta: true,
  },
  {
    label: "02",
    title: "Paid discovery sprint",
    duration: "1-2 weeks, fixed fee",
    body: "Architecture, build plan, and a working demo slice. For a cross-chain team this means: chain selection rationale, OFT/OApp contract skeleton, concurrency model, and the hardest integration proven on testnet. You own everything produced whether or not we continue.",
    cta: false,
  },
  {
    label: "03",
    title: "The build",
    duration: "Weekly ships",
    body: "Working software you can click every week, not status decks. Every decision logged in the repo. For on-chain work: contracts verified on-chain, agent actions tied to transaction hashes, kill-switches on every live path.",
    cta: false,
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
          <p className="mono-label text-xs text-[var(--text-2)]">
            LayerZero V2 · Circle CCTP · On-chain agents · 23 chains in production
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
            Services
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--text-1)]">
            Three ways to engage. All of them end with working software in
            production, every claim verifiable on-chain or in the repo.
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

      {/* Engagement offer: scope call, discovery sprint, the build */}
      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
            How to engage
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--text-1)]">
            Three steps. You can stop after any one of them and keep everything produced.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {engagementSteps.map((step) => (
              <div key={step.label} className="card-surface flex flex-col p-8">
                <span className="mono-label text-xs text-[var(--accent)]">{step.label}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-[var(--text-0)]">
                  {step.title}
                </h3>
                <p className="mono-label mt-1 text-xs text-[var(--text-2)]">{step.duration}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-1)]">
                  {step.body}
                </p>
                {step.cta && (
                  <CalBookingButton className="btn btn-primary mt-6 w-full">
                    Book the scope call
                  </CalBookingButton>
                )}
              </div>
            ))}
          </div>
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
        heading="Building cross-chain or on-chain agents?"
        body="30 minutes: you describe the problem, I tell you honestly whether I am the right builder and exactly what I would do first."
        buttonLabel="Book a scope call"
        buttonHref="/contact"
      />
    </>
  );
}

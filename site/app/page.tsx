import Link from "next/link";
import { WorkCard } from "@/components/work-card";
import { CtaBand } from "@/components/cta-band";
import { HeroCanvas } from "@/components/hero-canvas";
import { HeroPathTrace } from "@/components/hero-path-trace";
import { StatBar } from "@/components/stat-bar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ProfessionalServiceJsonLd } from "@/components/professional-service-jsonld";
import { caseStudies } from "@/lib/work";

const offers = [
  {
    title: "AI agent systems",
    body: "Agents that execute real actions under proof, not chatbots that describe them. Execution layers, observability, kill-switches, and the trust architecture that makes autonomy safe to ship.",
    icon: (
      <path
        d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
        stroke="var(--accent)"
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Cross-chain and payments infrastructure",
    body: "LayerZero V2, Circle CCTP, Visa settlement rails. OApp, OFT, and ONFT patterns that are battle-tested in production across 7 chains, not demoed once on testnet.",
    icon: (
      <>
        <circle cx="7" cy="12" r="3.4" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
        <circle cx="17" cy="12" r="3.4" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
        <path d="M10.4 12H13.6" stroke="var(--accent)" strokeWidth="1.4" />
      </>
    ),
  },
  {
    title: "Founding-engineer product builds",
    body: "The whole stack: contracts, backend, database, frontend, motion design, deploy, and the operational discipline to keep it alive. I have run this loop for 10 years.",
    icon: (
      <path
        d="M4 18V6M4 6l6 4-6 4M12 18h8M12 13h8M12 8h8"
        stroke="var(--accent)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const howISteps = [
  {
    title: "Scope call.",
    body: "30 minutes. You describe the problem, I tell you honestly whether I am the right builder and what I would do first.",
  },
  {
    title: "Discovery sprint.",
    body: "A short paid sprint that produces architecture, a build plan, and a demo slice. You own everything produced.",
  },
  {
    title: "The build.",
    body: "Weekly ships you can click, not status decks. Every claim verifiable in the repo.",
  },
  {
    title: "Operate and harden.",
    body: "Observability, kill-switches, and handoff docs. I build systems that survive me leaving.",
  },
];

const principles = [
  "Code that holds at 10K and 100K users",
  "Every flag kill-switched",
  "Intent and execution are separate layers",
  "Verified against production schema, not the migration file",
  "Risky paths ship observe-only first",
];

const proofBar = [
  { value: "7", suffix: "", label: "chains in production" },
  { value: "300", suffix: "K", prefix: "$", label: "launchpad shipped" },
  { value: "23", suffix: "", label: "chain bridge matrix" },
  { value: "2300", suffix: "+", label: "commits since 2024" },
  { value: "5000", suffix: "", label: "users at launch" },
];

export default function Home() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <HeroCanvas />
        <div className="container-page relative z-10 flex min-h-[88vh] flex-col justify-center py-24">
          <p className="mono-label text-xs text-[var(--text-2)] sm:text-sm">
            Founding engineer · AI agents · Cross-chain · Full stack
          </p>
          <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-0)]">
            I build systems that move real money and hold at 100K users.
          </h1>
          <HeroPathTrace />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
            Richard Wayne. Founding engineer for the past 10 years. I take
            products from idea to production: autonomous AI agents,
            cross-chain infrastructure across 23 chains, and interfaces
            people trust with their money.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-primary magnetic-btn">
              Book a build call
            </Link>
            <Link href="/work" className="btn btn-secondary magnetic-btn">
              See the work
            </Link>
          </div>

          <StatBar items={proofBar} />
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-24 sm:py-32">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
              Selected work
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.slug} delay={index * 0.06}>
                <WorkCard study={study} index={index} />
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-[var(--text-1)]">
            More builds: a physics lab portfolio, a members-only social app,
            and me.md, a local-LLM digital twin{" "}
            <Link
              href="/about#more"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-24 sm:py-32">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
              What I do
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offers.map((offer, index) => (
              <ScrollReveal key={offer.title} delay={index * 0.08}>
                <div className="card-surface h-full p-8">
                  <svg width="28" height="28" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    {offer.icon}
                  </svg>
                  <h3 className="font-display mt-5 text-lg font-semibold text-[var(--text-0)]">
                    {offer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-1)]">
                    {offer.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-24 sm:py-32">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
              How I work
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howISteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.08}>
                <div>
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-12">
        <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-3">
          {principles.map((principle) => (
            <span key={principle} className="mono-label text-xs text-[var(--text-2)]">
              {principle}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-24 sm:py-32">
        <div className="container-page grid gap-10 md:grid-cols-[220px_1fr] md:items-start">
          <ScrollReveal>
            <div
              className="flex h-40 w-40 items-center justify-center rounded-[var(--radius-card)] border border-[var(--border-bright)] bg-[var(--bg-2)] font-display text-3xl font-semibold text-[var(--text-0)]"
              aria-hidden="true"
            >
              RW
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
              I built my first application at 14. Ten years of
              founding-engineer work later I have shipped a $300K
              cross-chain launchpad, co-founded the first omnichain NFT
              platform, advised a Rutgers electrical engineering capstone
              team, and graduated summa cum laude from Rutgers. I work daily
              with a personal AI neural net I designed, which is why I ship
              at the pace of a small team.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block text-sm text-[var(--accent)] underline underline-offset-4"
            >
              The full story &rarr;
            </Link>
          </ScrollReveal>
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

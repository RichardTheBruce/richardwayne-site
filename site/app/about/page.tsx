import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Timeline } from "@/components/timeline";
import { DockRow } from "@/components/dock-row";

export const metadata: Metadata = {
  title: "About",
  description:
    "Richard Wayne: founder-engineer since age 14. Co-founded the first omnichain NFT platform, founded a $300K cross-chain launchpad, and now builds the agentic bank AFI.",
};

const timelineEntries = [
  { period: "Age 14", body: "Built my first application. Never stopped." },
  {
    period: "2016 to 2022",
    body: "A decade of building begins in earnest: full-stack product work, systems, and the habit of shipping alone.",
  },
  {
    period: "2022",
    body: "Co-founded Omni-X, the first natively omnichain NFT platform. Created Greg, the first onchain ONFT. Advised a Rutgers electrical engineering senior capstone team as their engineering advisor.",
  },
  {
    period: "2024 to 2025",
    body: "Founded Memetropolis: the first OFT launchpad on LayerZero, 7 chains, about $300K invested, 810 commits.",
  },
  {
    period: "2025 to now",
    body: "Founding AFI, the agentic bank. Also shipping client builds: a federal PPE supplier's lead engine and CryptoGal.",
  },
];

const principles = [
  "Code that holds at 10K and 100K users",
  "Every flag kill-switched",
  "Intent and execution are separate layers",
  "Verified against production schema, not the migration file",
  "Risky paths ship observe-only first",
];

const moreBuilds = [
  {
    title: "The Lab",
    body: "A physics playground: 90,000-particle heroes, string fields, a Saturn that becomes your cursor.",
    image: "/work/lab-saturn.png",
    alt: "A physics playground with a particle field and an orbiting Saturn model",
    href: "https://github.com/RichardTheBruce/portfolio",
    external: true,
  },
  {
    title: "2gather",
    body: "A members-only social app: Expo, Supabase, realtime presence, 13 tables, shipped as a one-day marathon.",
    image: "/work/2gather-landing.png",
    alt: "2gather members-only social app landing screen on a phone",
    href: null,
    external: false,
  },
  {
    title: "me.md",
    body: "A portable local-LLM digital twin you fill with yourself. npm-installable, git-versioned self-states.",
    image: null,
    alt: "",
    href: "https://github.com/RichardTheBruce/me-md",
    external: true,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
            About
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
            I am Richard Wayne, a founder-engineer. I build autonomous
            agents that move real money and the cross-chain infrastructure
            underneath them that survives production.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <Timeline entries={timelineEntries} />
          <p className="mt-14 pl-10 text-sm text-[var(--text-2)]">
            Rutgers University, summa cum laude.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-20 sm:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
            How I ship so fast
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
            I designed and operate a personal AI neural net: a persistent
            memory, agent roster, and decision-ledger system that pairs
            with me on every build. Most consultants bill you hours to
            remember your codebase. Mine compounds.
          </p>
        </div>
      </section>

      <section id="more" className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
            More builds
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {moreBuilds.map((item) => {
              const content = (
                <div className="card-surface flex h-full flex-col overflow-hidden">
                  {item.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-2)]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 768px) 380px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex aspect-[16/10] w-full items-center justify-center border-b border-[var(--border)] bg-[var(--bg-2)] font-display text-2xl font-semibold text-[var(--text-2)]"
                      aria-hidden="true"
                    >
                      me.md
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-[var(--text-0)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
                      {item.body}
                    </p>
                  </div>
                </div>
              );

              if (!item.href) {
                return <div key={item.title}>{content}</div>;
              }

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  className="block h-full"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-12">
        <div className="container-page">
          <DockRow>
            {principles.map((principle) => (
              <span key={principle}>{principle}</span>
            ))}
          </DockRow>
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

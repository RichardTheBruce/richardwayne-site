import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Timeline } from "@/components/timeline";
import { DockRow } from "@/components/dock-row";

export const metadata: Metadata = {
  title: "About",
  description:
    "Richard Wayne: founder-engineer since age 14. Co-founded the first omnichain NFT platform, founded a $300K cross-chain launchpad, and now builds the agentic bank AFI.",
  alternates: {
    canonical: "https://richardthebruce.com/about",
  },
};

const timelineEntries = [
  { period: "Age 14", body: "Built my first application. Never stopped." },
  {
    period: "2016 to 2019",
    body: "A decade of building begins in earnest: full-stack product work, systems, and the habit of shipping alone.",
  },
  {
    period: "2019",
    body: "Ran a sole-proprietor venture to $20M in revenue. The year I learned that building and selling are the same discipline.",
  },
  {
    period: "2022",
    body: "Co-founded Omni-X, the first natively omnichain NFT platform. Created Greg, the first onchain ONFT. Advised a Rutgers electrical engineering senior capstone team as their engineering advisor.",
  },
  {
    period: "2024 to 2025",
    body: "Founded Memetropolis: the first OFT launchpad on LayerZero, 7 chains, about $300K invested, 810 commits. Seven years of production systems behind me by now, and $750K raised across two projects.",
  },
  {
    period: "2026",
    body: "Founding AFI, the agentic bank, on 1,700+ commits this year alone. Also shipping client builds, including a federal PPE supplier's lead engine.",
  },
];

const languages: { name: string; years: number }[] = [
  { name: "HTML", years: 17 },
  { name: "CSS", years: 17 },
  { name: "JavaScript", years: 15 },
  { name: "Java", years: 12 },
  { name: "C", years: 12 },
  { name: "C++", years: 12 },
  { name: "Python", years: 11 },
  { name: "SQL", years: 9 },
  { name: "Bash", years: 9 },
  { name: "TypeScript", years: 7 },
  { name: "Go", years: 5 },
  { name: "Solidity", years: 5 },
  { name: "Rust", years: 4 },
];

const tools = [
  "Node.js",
  "Docker",
  "Supabase",
  "PostgreSQL",
  "Next.js",
  "React",
  "Tailwind",
  "Vercel",
  "Git",
  "GSAP",
  "WebGL",
  "Three.js",
  "ffmpeg",
  "GitHub Actions",
  "Figma API",
  "MCP",
];

const craft = [
  {
    title: "Design systems from scratch",
    body: "Tokens, type scale, spacing, motion language, and a component library before a single page ships. AFI runs on an Obsidian and Graphite palette with one accent; the PPE rebuild carried its own design ledger. I do not vibe-code color. Every visual decision cites a reference.",
  },
  {
    title: "Motion and interface",
    body: "GSAP scroll choreography, SVG path tracing, WebGL and canvas particle systems, magnetic buttons, dock rows. Interfaces that feel alive without getting in the way of the work.",
  },
  {
    title: "The full stack under it",
    body: "Contracts, backend, database, frontend, deploy, and the operational discipline to keep it alive. I own design and engineering as one loop, which is why the seams do not show.",
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
    image: "/work/lab-hero.png",
    alt: "Glowing RichardTheBruce particle text with an orbiting Saturn model from the physics lab portfolio",
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
  {
    title: "3D game character",
    body: "A hooded, gas-masked figure modeled and textured from scratch, glowing rune detailing. Design and 3D work is part of the same craft, not a separate hire.",
    image: "/work/game-character.png",
    alt: "A 3D-modeled hooded game character wearing a gas mask and cyberpunk armor with glowing blue runes",
    href: null,
    external: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
              About
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
              I am Richard Wayne, a founder-engineer. I build autonomous
              agents that move real money and the cross-chain infrastructure
              underneath them that survives production.
            </p>
          </div>
          <Image
            src="/richard.jpg"
            alt="Richard Wayne"
            width={208}
            height={208}
            priority
            className="h-44 w-44 shrink-0 rounded-[var(--radius-card)] border border-[var(--border-bright)] object-cover sm:h-52 sm:w-52"
          />
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
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
              How I ship so fast
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
              I designed and operate a personal AI neural net: a persistent
              memory, agent roster, and decision-ledger system that pairs
              with me on every build. Most consultants bill you hours to
              remember your codebase. Mine compounds. The graph is the
              actual memory, thousands of linked notes the agents read
              before they write a line.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-2)]">
            <Image
              src="/work/neural-net-graph.jpg"
              alt="The Obsidian graph view of Richard Wayne's personal AI neural net, a dense web of linked memory notes around a central Database node"
              width={703}
              height={761}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20 sm:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
            Languages and craft
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
            Ten years of shipping means a wide surface. The languages I have
            written production code in, and the design craft I bring to the
            same builds. I design the system and I write the code, so the
            interface and the engine are never at war.
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-[var(--text-2)]">
            Languages
          </p>
          {/* Language pills with hover-year tooltip */}
          <style>{`
            .lang-pill {
              position: relative;
              display: inline-flex;
              align-items: center;
              gap: 0.35em;
            }
            .lang-pill .lang-tooltip {
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%);
              background: var(--bg-2);
              border: 1px solid var(--border-bright);
              color: #0d90ff;
              font-size: 11px;
              font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
              white-space: nowrap;
              padding: 3px 8px;
              border-radius: 6px;
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.15s ease;
              box-shadow: 0 2px 8px rgba(0,0,0,0.5);
            }
            .lang-pill .lang-tooltip::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border: 4px solid transparent;
              border-top-color: var(--border-bright);
            }
            @media (hover: hover) and (pointer: fine) {
              .lang-pill:hover .lang-tooltip {
                opacity: 1;
              }
              .lang-pill .lang-years-inline {
                display: none;
              }
            }
            @media (hover: none), (pointer: coarse) {
              .lang-pill .lang-tooltip {
                display: none;
              }
              .lang-years-inline {
                color: var(--text-2);
                font-size: 11px;
              }
            }
          `}</style>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {languages.map(({ name, years }) => (
              <span
                key={name}
                className="lang-pill rounded-full border border-[var(--border-bright)] bg-[var(--bg-2)] px-3.5 py-1.5 font-mono text-[13px] text-[var(--text-1)]"
                aria-label={`${name}, ${years} years`}
              >
                {name}
                <span className="lang-years-inline" aria-hidden="true">
                  {years}y
                </span>
                <span className="lang-tooltip" aria-hidden="true">
                  {years} years
                </span>
              </span>
            ))}
          </div>

          {/* Tools and platforms pills */}
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-[var(--text-2)]">
            Tools and platforms
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[var(--border-bright)] bg-[var(--bg-2)] px-3.5 py-1.5 font-mono text-[13px] text-[var(--text-1)]"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {craft.map((item) => (
              <div key={item.title} className="card-surface h-full p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--text-0)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-1)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-1)] py-20 sm:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
            Technical documentation and DevRel
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-1)] sm:text-lg">
            I ship the docs, not just the code. Spec-first APIs with an
            interactive reference a developer can actually call, clear
            guides, and the operational runbooks a team inherits when I
            hand off. Good documentation is the difference between a system
            that survives me leaving and one that does not.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              "OpenAPI spec-first",
              "Scalar interactive reference",
              "Try-it API console",
              "Runbooks and handoff docs",
              "Architecture decision records",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--border-bright)] bg-[var(--bg-2)] px-3.5 py-1.5 font-mono text-[13px] text-[var(--text-1)]"
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href="https://welcoming-dazzle-7q822.apidocumentation.com/reference"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--accent)] underline underline-offset-4"
          >
            See a live API reference I shipped
            <span aria-hidden="true">&rarr;</span>
          </a>
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

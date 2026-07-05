# richardwayne-site — Project Decision Ledger

> Deep (project-tier) ledger per the two-tier standing practice. Macro rows live in
> `memory/MYTHOS-DECISION-LEDGER.md` (MX-0017..0019 at inception).

## RW-0003 · 2026-07-05 · Design authority: locked taste profile supersedes taste-skill, taste-skill kept as pre-flight

- **Source:** taste-skill v2 (tasteskill.dev, `npx skills add Leonxlnx/taste-skill`) + `memory/richard_taste_profile.md` (LOCKED 2026-06-02)
- **Decision:** Richard asked to use tasteskill.dev. Its core value (brief inference, anti-template output, dark-mode discipline, honest pre-flight validation) was adopted as the PLAN.md §0.1 pre-flight checklist. Where taste-skill's generic guidance could conflict with Richard's locked profile (Obsidian/Graphite, #0D90FF-only accent, GSAP canon), the locked profile wins. No skill files installed into the repo; principles inlined so the build is deterministic.
- **Alternatives considered:** installing the skill wholesale and letting it infer a design system (rejected: Richard already has a locked, superior brief; inference risk with zero upside).
- **Status:** Shipped in PLAN.md.

## RW-0002 · 2026-07-05 · Corpus sweep + the Indutex before/after finding

- **Source:** screenshot-mcp (capture_urls_batch)
- **Decision:** Build case-study visuals from a fresh corpus sweep. Material finding: `indutexusa.com` still serves the LEGACY 2000s site; Richard's rebuild exists only in the repo, so it was booted locally (`:3777`) and captured. The legacy capture becomes the case study's "before" asset, which is stronger evidence than a single "after" shot. Nuro surfaces render blank headlessly, so the Nuro case uses the AFI card art (`afi-card-final.png`, `agentic-card.png`) until an authenticated capture happens.
- **Status:** Shipped (10 captures in `mythos/research/frontend/_corpus/screenshots/`, 13 assets staged).

## RW-0001 · 2026-07-05 · New standalone lead-gen site, not an evolution of `portfolio`

- **Source:** Mythos main loop (routing per MX-0015: Fable plans, sonnet deploys, Fable reviews)
- **Decision:** Build `richardwayne-site` as a NEW Next.js app at `richardwayne-site/site`, separate from the existing art portfolio repo (`RichardTheBruce/portfolio`, "He who creates", Saturn marquee). Rationale: the art portfolio optimizes for wonder; a lead-gen site optimizes for conversion and SEO. Mixing them dilutes both. The art portfolio gets linked as "The Lab" inside /about, preserving its value as a capability proof. Domain target `richardthebruce.dev` (referenced by the portfolio repo but DNS does not resolve; purchase pending, Richard).
- **Alternatives considered:** rebuilding inside `Richard Wayne/portfolio` (rejected: deployment-protection-gated team project + art-first IA); Upwork-first positioning (rejected by Richard: "upwork is full of scams").
- **Status:** In build (sonnet agent from PLAN.md). Flip to Shipped after main-loop review + walk-attest.

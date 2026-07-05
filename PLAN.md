# richardwayne-site — Lead-Generation Developer Website BUILD PLAN

> Authored by Mythos main loop 2026-07-05. Builder agent: read this ENTIRE file before writing any code.
> Mission: a modern, clean, animated, SEO-strong site that converts visitors into client leads for Richard Wayne.
> This is NOT an art portfolio. Every section earns its place by moving a visitor toward "book a call."

---

## 0. Non-negotiable rules (from Richard's locked workspace rules)

1. NO em-dashes in any copy, anywhere. Use periods, commas, colons, or parentheses.
2. Founder voice: real numbers, real names, real dates. Never "many clients" or "soon."
3. NEVER claim an EE degree or any engineering degree. Education line is exactly: "Rutgers University, summa cum laude." No major mentioned. The EE capstone advisor role is an EXPERIENCE line, not education.
4. No fake stats, no theatre ("bank-grade security", made-up client counts). Every number on the site is from the copy blocks below, verbatim.
5. Accent color `#0D90FF` is the ONLY decorative color. Everything else greyscale. One accent per surface max.
6. No pricing/dollar figures on the public site in this build. (Pricing requires Richard's explicit sign-off. Leave a commented-out pricing block where noted.)
7. Git commits: NO Co-Authored-By lines, no AI attribution, ever.
8. All copy in this plan is final. Do not rewrite, "improve," or paraphrase it. Typo fixes only.

## 0.1 Taste-skill pre-flight (anti-slop checklist, run before calling the build done)

- Does any section look like a template you have seen 100 times (centered badge, gradient blob, 3-column feature grid with emoji icons)? If yes, redesign that section.
- Is there exactly one accent color on screen at any scroll position?
- Does the hero communicate WHO this is and WHY hire him within 3 seconds, without scrolling?
- Do all animations respect `prefers-reduced-motion` (fall back to static)?
- Does every image have meaningful alt text?
- Lighthouse mental check: no layout shift from font/image loading (use `next/font`, explicit image dimensions).

---

## 1. Location, stack, scaffolding

- App lives at: `C:/Users/Richa/Richard Wayne/richardwayne-site/site`
- Staged images at: `C:/Users/Richa/Richard Wayne/richardwayne-site/assets-staging` (copy into `site/public/work/`, keep filenames)
- Stack: Next.js 15+ App Router, TypeScript, Tailwind CSS v4, GSAP (npm `gsap`, all plugins are free since 3.13: use ScrollTrigger; implement draw-on effects with stroke-dasharray/dashoffset, do NOT require club plugins), `next/font` with a grotesk display face (use `Space Grotesk` for headings + `Inter` for body via next/font/google), `@vercel/analytics`.
- Scaffold with `npx create-next-app@latest` (app router, tailwind, ts, src dir NO, eslint yes, import alias `@/*`). No experimental flags.
- Also create `C:/Users/Richa/Richard Wayne/richardwayne-site/.claude/launch.json`:
  `{"version":"0.0.1","configurations":[{"name":"richardwayne-site","runtimeExecutable":"npm","runtimeArgs":["run","dev","--prefix","site","--","--port","3801"],"port":3801}]}`
- `git init` in `richardwayne-site/`, commit at sensible milestones. Plain commit messages, no attribution footers.
- Big image note: `memetropolis-landing.png` is 7739px tall. Create a build-time crop script (`site/scripts/prep-images.mjs` using `sharp` as devDependency) that outputs `*-crop.png` versions: memetropolis (top 1600px), ppe-rebuild-landing (top 1600px), ppe-legacy-landing (top 1200px), omnix-landing (already viewport). Use the crops in cards, full versions on case study pages inside a max-height scroll-styled frame.

## 2. Design system (Obsidian/Graphite, cites = corpus screenshots)

Reference corpus (visual bar, cite these when in doubt):
- `mythos/research/frontend/_corpus/screenshots/indutex/rebuild-landing-desktop.png` (section rhythm, stat row, dark industrial confidence)
- `mythos/research/frontend/_corpus/screenshots/portfolio/saturn-marquee-v10-final-desktop.png` (hero particle quality bar)
- `mythos/research/frontend/_corpus/screenshots/richardthebruce-portfolio/strings-hero-overlay-desktop.png` (string-field hero overlay)

Tokens (CSS variables in globals):
- `--bg-0: #060607` (page), `--bg-1: #0B0B0D` (section alt), `--bg-2: #111114` (cards), `--border: #1D1D21`, `--border-bright: #2A2A30`
- `--text-0: #F4F4F5`, `--text-1: #A1A1AA`, `--text-2: #6B6B74`
- `--accent: #0D90FF` (the ONLY color), `--accent-dim: rgba(13,144,255,0.12)`
- Radius: 12px cards, 8px buttons. Borders 1px solid `--border`, hover to `--border-bright`.
- Type scale: hero clamp(2.8rem, 7vw, 5.5rem) Space Grotesk 600, tight tracking (-0.03em). Section titles clamp(1.8rem, 3.5vw, 2.6rem). Body 16/17px Inter, `--text-1`.
- Layout: max-w-[1200px] container, generous vertical rhythm (py-24/32 sections), 12-col feel.
- Buttons: primary = `--accent` bg, black text, magnetic hover (see §5). Secondary = transparent, 1px border, `--text-0`.

## 3. Information architecture

```
/                     Home (the funnel)
/work                 Index of case studies (grid)
/work/nuro-finance    Case study
/work/memetropolis    Case study
/work/omni-x          Case study
/work/federal-ppe     Case study (Indutex, see naming note)
/work/cryptogal       Case study
/services             Engagement types + process
/about                Story, timeline, principles
/writing              Post index (2 seed posts)
/writing/agents-that-cannot-lie
/writing/nonces-advisory-locks
/contact              Form + direct channels
```

Header: wordmark "RW·" + nav (Work, Services, About, Writing, Contact) + CTA button "Book a build call" (scrolls/links to /contact). Sticky, backdrop-blur, border-b.
Footer: name + one-liner, columns (Work links, Channels: GitHub / LinkedIn / X / Telegram / Discord, Contact email), copyright. Social URLs from `lib/site.ts` config (single source of truth):

```ts
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://richardthebruce.dev",
  name: "Richard Wayne",
  email: "richardthebrucewayne@gmail.com",
  github: "https://github.com/RichardTheBruce",
  linkedin: "https://www.linkedin.com/in/richard-wayne-nuro",
  x: "https://x.com/RichardTheBruce",          // pending account creation
  telegram: "https://t.me/richardthebruce",     // pending channel creation
  discord: "https://discord.gg/PLACEHOLDER",    // pending server creation
  calendar: "",                                  // cal.com link when Richard creates it; hide button when empty
}
```

## 4. Page-by-page spec with FINAL COPY

### 4.1 Home

**Hero** (full viewport, string-field canvas background, SVG path-trace accent):
- Eyebrow (mono, `--text-2`): `FOUNDING ENGINEER · AI AGENTS · CROSS-CHAIN · FULL STACK`
- H1: `I build systems that move real money and hold at 100K users.`
- Sub (max-w-xl, `--text-1`): `Richard Wayne. Founding engineer for the past 10 years. I take products from idea to production: autonomous AI agents, cross-chain infrastructure across 23 chains, and interfaces people trust with their money.`
- Primary CTA: `Book a build call` → /contact. Secondary: `See the work` → /work.
- Proof bar (mono, small, bordered row of 5): `7 chains in production` · `$300K launchpad shipped` · `23-chain bridge matrix` · `2,300+ commits since 2024` · `5,000 users at launch`

**Selected Work** (the core section; 5 large cards, scroll-driven reveal, each = screenshot + copy):
Card order and copy (title / role / line / chips):
1. Nuro Finance. `Founder and Lead Architect` / `An agentic bank where you talk to your Visa card and a bonded AI agent moves your money. Nothing counts as done without a confirmed on-chain transaction hash, so the agent cannot lie about what it did.` / chips: `AI agents` `LayerZero V2` `Circle CCTP` `Visa rails` `PostgreSQL`. Image: `nuro-card.png` (dark card art).
2. Memetropolis. `Founder and CTO` / `The first OFT launchpad on LayerZero, live across 7 EVM chains. About $300K invested, 810 commits, 5,000 users at launch, and concurrency that holds when two users hit the same second.` / chips: `Solidity` `LayerZero V2` `Subgraph` `Next.js`. Image: `memetropolis-landing-crop.png`.
3. Omni-X. `Co-Founder · 2022` / `The first natively omnichain NFT platform. Creator of Greg, the first onchain ONFT, and auditor of the original Gh0stly Gh0sts contract, the first omnichain NFT collection.` / chips: `ONFT` `LayerZero` `Marketplace`. Image: `omnix-landing.png`.
4. Federal-scale PPE supplier. `Solo Engineer · 2026` / `A modern storefront plus a signal-driven outbound engine over SAM.gov, OSHA, and FEMA data. Every lead lands enriched with affected-population estimates and SKU recommendations before the sales team wakes up.` / chips: `Next.js` `Postgres` `Signal pipeline` `Vercel`. Image: `ppe-rebuild-landing-crop.png`.
5. CryptoGal. `Product Engineer · 2026` / `A warm crypto-education app for women: guided lessons, a real wallet, and a scam analyzer that reads suspicious messages before they cost someone their savings.` / chips: `React Native` `Expo` `Supabase`. Image: `cryptogal-home.png` (phone-frame styling).

Each card links to its /work/ page. Below the grid: link `More builds: a physics lab portfolio, a members-only social app, and me.md, a local-LLM digital twin → /about#more`

**What I do** (3 offers, restrained cards, no emoji icons; use thin inline SVG glyphs):
1. `AI agent systems` : `Agents that execute real actions under proof, not chatbots that describe them. Execution layers, observability, kill-switches, and the trust architecture that makes autonomy safe to ship.`
2. `Cross-chain and payments infrastructure` : `LayerZero V2, Circle CCTP, Visa settlement rails. OApp, OFT, and ONFT patterns that are battle-tested in production across 7 chains, not demoed once on testnet.`
3. `Founding-engineer product builds` : `The whole stack: contracts, backend, database, frontend, motion design, deploy, and the operational discipline to keep it alive. I have run this loop for 10 years.`

**How I work** (4 numbered steps, tight):
1. `Scope call.` `30 minutes. You describe the problem, I tell you honestly whether I am the right builder and what I would do first.`
2. `Discovery sprint.` `A short paid sprint that produces architecture, a build plan, and a demo slice. You own everything produced.`
3. `The build.` `Weekly ships you can click, not status decks. Every claim verifiable in the repo.`
4. `Operate and harden.` `Observability, kill-switches, and handoff docs. I build systems that survive me leaving.`

**Principles strip** (mono, single line items): `Code that holds at 10K and 100K users` · `Every flag kill-switched` · `Intent and execution are separate layers` · `Verified against production schema, not the migration file` · `Risky paths ship observe-only first`

**About teaser**: photo placeholder (styled initials block if no photo), copy: `I built my first application at 14. Ten years of founding-engineer work later I have shipped a $300K cross-chain launchpad, co-founded the first omnichain NFT platform, advised a Rutgers electrical engineering capstone team, and graduated summa cum laude from Rutgers. I work daily with a personal AI neural net I designed, which is why I ship at the pace of a small team.` + link `The full story → /about`

**Final CTA band** (accent-bordered, magnetic button): H2 `Have something that needs to exist?` Body: `Tell me what you are building and where it hurts. I reply within one business day.` Button: `Start the conversation` → /contact.

### 4.2 /work index
Grid of the 5 cases + a sixth card `The Lab` linking to /about#more with image `lab-saturn.png`. Each card: crop image, title, one-liner from above, chips.

### 4.3 Case study template (/work/*)
Sections: Hero (title, role+dates, one-paragraph summary), `The problem`, `The build`, `The hard part` (this is the differentiator, be specific), `Outcome`, stack chip row, screenshot gallery (styled frames, dark borders), prev/next case nav, CTA band.
Write case bodies from these source blocks (verbatim where possible):

**nuro-finance**: Problem: `Everyone fears the same thing about AI agents: an agent that says it did something and did not do it. Handing one real money makes that fear existential.` Build: `Four money surfaces in one product: Vault, Pay Card, Agent, and Crypto Wallet. Drag a glyph to move money, tap to move around the app. Intent and execution are separate layers. The lifecycle is intent (pending), execution (confirmed with an on-chain transaction hash), then settled (paid with a payout hash). Per-user vaults are HD-derived on Base. A 23-chain settlement matrix routes through LayerZero V2 and Circle CCTP, including the Solana to EVM route most teams stall on. Visa card settlement runs on idempotent webhooks with a post-swap credit policy so the user carries volatility, not the platform.` Hard part: `Making "done" unfakeable. The agent runtime executes its decision loop hundreds of times a day, every action logged, every flag kill-switched, and nothing counts as moved until the chain proves it.` Outcome: `In production on PM2 and a VPS, with risky on-chain paths shipping observe-only for their first 24 hours. Images: nuro-card.png, nuro-agentic-card.png.`

**memetropolis**: Problem: `Launching a token on one chain is a solved problem. Launching the same token across 7 chains at once, with liquidity and state that stay coherent, is not.` Build: `The first OFT launchpad on LayerZero: Solidity contracts, TypeScript backend, subgraph indexing, Next.js frontend. Multi-chain peer wiring, per-chain gas configuration, Etherscan verification on every chain.` Hard part: `Concurrency. Two users hitting the launchpad in the same second used to mean colliding nonces and stranded funds. The fix that held: Postgres advisory locks plus per-address chain locks plus fresh-fetched nonces. Not naive sequential signing.` Outcome: `About $300K invested, 810 commits, 5,000 users at launch, live across 7 EVM chains.` Image: memetropolis-landing.png (full, scrollable frame).

**omni-x**: Problem: `In 2022, NFTs were trapped on the chain that minted them.` Build: `Co-founded the first natively omnichain NFT platform and marketplace on LayerZero. Created Greg, the first onchain ONFT. Audited the original Gh0stly Gh0sts contract, the first omnichain NFT collection.` Hard part: `There was no playbook. Omnichain messaging for NFTs had to be reasoned about from first principles, then shipped to a public that would find every edge case.` Outcome: `The platform and the ONFT standard patterns it pioneered are still live. This work is why cross-chain is home turf, not a skill listed on a resume.` Image: omnix-landing.png.

**federal-ppe**: (Named "Federal-scale PPE supplier". First line of body: `Client name withheld under NDA.`) Problem: `A federal and municipal PPE supplier was invisible online and dependent on inbound calls, while procurement signals sat in public data nobody read.` Build: `A modern storefront rebuilt from a 2000s-era legacy site, plus a daily signal pipeline over SAM.gov solicitations, OSHA citations, and FEMA disaster declarations. Each lead lands enriched: affected-population estimate, SKU recommendation, recurrence prediction, delivered as a daily digest to the sales team.` Hard part: `Signal quality. Raw government feeds are noisy, so the pipeline scores and enriches before a human ever sees a ticket.` Outcome: `Live for the client, deployed on Vercel with GitHub Actions cron. Before and after screenshots below.` Images: ppe-legacy-landing.png (label: `The legacy site`), ppe-rebuild-landing-crop.png (label: `The rebuild`), ppe-rebuild-catalog.png (label: `Catalog`).

**cryptogal**: Problem: `Crypto education apps talk down to beginners or drown them in charts. Women getting into crypto deserved a product that respects both their intelligence and their caution.` Build: `An Expo and React Native app: guided lesson journeys, a real Supabase-backed wallet flow, community, and a scam analyzer that reads suspicious messages and explains the red flags in plain language.` Hard part: `Tone is an engineering constraint here. Every surface, from the wallet to the scam verdicts, had to feel warm without being imprecise.` Outcome: `In active development with the founder of CryptoGal LLC.` Images: cryptogal-home.png, cryptogal-learn.png, cryptogal-scam-analyzer.png, cryptogal-wallet.png in a 4-up phone row.

### 4.4 /services
Intro line: `Three ways to engage. All of them end with working software in production.`
The 3 offers from Home, expanded with `Good fit if` bullets:
- AI agent systems: `Good fit if: you need an agent that acts, not chats. You are wiring LLMs to real actions (payments, ops, data) and cannot afford hallucinated execution. You want observability and kill-switches designed in, not bolted on.`
- Cross-chain and payments: `Good fit if: you are going multi-chain and the bridges scare you. You need OFT or ONFT done right the first time. You are settling card or fiat rails against on-chain balances.`
- Founding-engineer builds: `Good fit if: you have a funded idea and no engineering team. You need someone who ships the contract, the backend, the frontend, and the deploy. You want a builder who has been the founder too and thinks about your runway like it is his own.`
Process section: the 4 steps from Home, expanded one sentence each.
`<!-- PRICING BLOCK: intentionally omitted pending Richard's sign-off. -->`
CTA band.

### 4.5 /about
- Opening: `I am Richard Wayne, a founder-engineer. I build autonomous agents that move real money and the cross-chain infrastructure underneath them that survives production.`
- Timeline (vertical, path-trace line drawing as you scroll):
  - `Age 14` : `Built my first application. Never stopped.`
  - `2016 to 2022` : `A decade of building begins in earnest: full-stack product work, systems, and the habit of shipping alone.`
  - `2022` : `Co-founded Omni-X, the first natively omnichain NFT platform. Created Greg, the first onchain ONFT. Advised a Rutgers electrical engineering senior capstone team as their engineering advisor.`
  - `2024 to 2025` : `Founded Memetropolis: the first OFT launchpad on LayerZero, 7 chains, about $300K invested, 810 commits.`
  - `2025 to now` : `Founding Nuro Finance, the agentic bank. Also shipping client builds: a federal PPE supplier's lead engine and CryptoGal.`
- Education line (small, after timeline): `Rutgers University, summa cum laude.`
- `How I ship so fast` block: `I designed and operate a personal AI neural net: a persistent memory, agent roster, and decision-ledger system that pairs with me on every build. Most consultants bill you hours to remember your codebase. Mine compounds.`
- `#more` anchor, "More builds" grid: The Lab (`A physics playground: 90,000-particle heroes, string fields, a Saturn that becomes your cursor.` image lab-saturn.png, link https://github.com/RichardTheBruce/portfolio), 2gather (`A members-only social app: Expo, Supabase, realtime presence, 13 tables, shipped as a one-day marathon.` image 2gather-landing.png), me.md (`A portable local-LLM digital twin you fill with yourself. npm-installable, git-versioned self-states.` link https://github.com/RichardTheBruce/me-md).
- Principles list (the 5 from Home).
- CTA band.

### 4.6 /writing + 2 seed posts
Index: card list (title, date, dek, 4 min read).
Post 1 slug `agents-that-cannot-lie`, title `The agent lied about freezing my card. So I made lying structurally impossible.`, date 2026-07-05. Body (~500 words, use verbatim): opening anecdote: `I asked my card's agent to freeze itself. It said done. It had done nothing. That bug is the entire AI agent industry in one sentence: execution claimed, execution not proven.` Then explain the Trust Contract: intent vs execution as separate layers, on-chain hash as the only proof, lifecycle pending/confirmed/settled, observability and kill-switches, why this matters for anyone wiring LLMs to real actions. Close: `If you are giving an agent the keys to anything real, the question is not "how smart is it." It is "what makes its claims unfakeable."`
Post 2 slug `nonces-advisory-locks`, title `Two users, one second, seven chains: the concurrency bug that strands funds`, date 2026-07-05. Body (~500 words): the Memetropolis story: naive sequential signing, nonce collisions, stranded funds; the fix (Postgres advisory locks + per-address chain locks + fresh-fetched nonces); why "works in the demo" dies at 100 concurrent users; the principle (code that holds at 10K and 100K).
Both posts end with: `Building something in this space? richardthebrucewayne@gmail.com or /contact.`

### 4.7 /contact
- H1: `Tell me what needs to exist.`
- Form: name, email, company (optional), `What are you building?` textarea, budget select (`Under $5K`, `$5K to $15K`, `$15K to $50K`, `$50K+`, `Not sure yet`), submit `Send it`.
- API route `/api/contact`: if `RESEND_API_KEY` env is set, send via Resend to site.email with reply-to the submitter, from `leads@<domain>` (env `CONTACT_FROM`, default onboarding@resend.dev for pre-domain testing); always also log to console. If no key, return `{ok:false, fallback:"mailto"}` and the client swaps to a prefilled mailto link. Include honeypot field + basic rate limit by IP (in-memory Map is fine).
- Right column `Direct channels`: email (copy button), LinkedIn, GitHub, X, Telegram, Discord (render only non-placeholder ones: hide any URL containing PLACEHOLDER or empty), and a note: `Prefer async? Email gets answered within one business day.`
- If site.calendar is set, show `Book a 30-minute scope call` button.

## 5. Motion spec (GSAP, cite = Richard's locked references)

All animations: respect `prefers-reduced-motion` (gsap.matchMedia), 60fps budget, no scroll-jacking.
1. Hero string-field: Canvas 2D, ~90 anchored vertical strings (viewport-width distributed) that bow away from cursor with spring return (verlet or simple spring, no physics lib). Idle drift. Density halved <768px, disabled on touch + reduced-motion (static faint SVG lines instead). Quality bar: `richardthebruce-portfolio/strings-hero-overlay-desktop.png`.
2. SVG path trace under the H1: a single 2px `--accent` path that draws in on load (stroke-dashoffset tween, 1.2s, power2.out), like Richard's top primitive (GSAP draw-a-path demo).
3. Magnetic buttons: primary CTAs attract cursor within 120px radius (translate toward cursor max 12px, elastic return). Per magnetic-button demo.
4. Scroll reveals: sections fade+rise 24px via ScrollTrigger batch; work cards get a 1px accent border that draws around the card (dashoffset on rect) when entering viewport (draw-a-path pattern).
5. Stat/proof bar: numbers count up once on first view.
6. Tech chips row on /about: macOS-dock-style scale-on-proximity (max 1.25x, neighbors 1.1x).
7. Timeline on /about: vertical SVG path draws as you scroll (scrub), dots pop when passed.
Keep everything else still. Restraint is the brand.

## 6. SEO spec (do all of it)

- `metadataBase` from site.url. Title template `%s · Richard Wayne`. Home title: `Richard Wayne · Founding Engineer for AI Agents, Cross-Chain, and Full-Stack Builds`. Home description: `Founding engineer for hire. I build AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, and full-stack products that hold at 100K users. Coding since 14, shipping for 10 years.`
- Per-page unique title+description (write from each page's copy). Case studies: `Nuro Finance case study: an agentic bank with an agent that cannot lie` etc.
- `app/sitemap.ts` (all routes), `app/robots.ts` (allow all, sitemap ref).
- JSON-LD via `<script type="application/ld+json">`: Person on all pages (name, url, sameAs: github/linkedin/x/telegram, jobTitle `Founding Engineer`, alumniOf Rutgers University), ProfessionalService on /services + home (serviceType list), Article on both posts, BreadcrumbList on case studies.
- `app/opengraph-image.tsx`: 1200x630 dark card, obsidian bg, name in Space Grotesk, accent path underline, tagline `Founding engineer. AI agents, cross-chain, full stack.` Per-case-study og images can reuse the default (fine for v1).
- Semantic structure: exactly one h1 per page, h2 sections, `<main>/<nav>/<footer>` landmarks, descriptive alt on every image (write real alts: e.g. `Memetropolis omnichain launchpad landing page with live trader cards and charts`).
- Keywords woven naturally (already in copy): founding engineer for hire, AI agent developer, LayerZero developer, cross-chain infrastructure, fractional founding engineer, Circle CCTP, agentic systems.
- Static generation for everything except /api/contact. `export const dynamic = "force-static"` where applicable. next/image with explicit sizes.
- 404 page with a path-trace glyph + link home (keep it 20 lines).

## 7. Build order (commit after each)

1. Scaffold + tokens + fonts + layout shell (header/footer) + site config.
2. Image prep script + copy assets to public/work/.
3. Home page complete with all sections (static first).
4. Work index + 5 case studies + case template.
5. Services, About, Writing (+2 posts), Contact (+API route).
6. SEO layer (metadata, sitemap, robots, JSON-LD, OG image).
7. Motion layer (GSAP; hero strings, path traces, magnetic buttons, reveals).
8. Polish pass: mobile nav (hamburger → full-screen menu), responsive audit at 375/768/1280, reduced-motion audit, `npm run build` must pass clean.

## 8. Acceptance criteria

- `npm run build` completes with zero errors and zero type errors.
- Every route renders real content (no lorem, no placeholder text except the two social PLACEHOLDER URLs which must be hidden from render).
- All 13 staged images used somewhere meaningful (2gather-landing.png and lab-saturn.png on /about, nuro-agentic-card.png on the Nuro case).
- No em-dash characters anywhere in the rendered site (grep the repo for `—` and `–`).
- Home paints hero text without waiting for canvas JS.
- Works at 375px width without horizontal scroll.

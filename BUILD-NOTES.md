# Build notes: deviations from PLAN.md

Everything else in PLAN.md was implemented as written. This file lists every place the build deviated from a literal reading of the plan, why, and the current state.

## 1. Product screenshots carry their own colors (accent-color rule)

PLAN.md section 0 rule 5 says `#0D90FF` is the only decorative color. The staged case study images (`afi-card.png`, `memetropolis-landing.png`, `omnix-landing.png`, the PPE before/after shots, the CryptoGal phone screens) are real product screenshots and card art that carry their own brand colors: crypto logo orange/purple, Memetropolis neon purple/yellow, Indutex red/blue, CryptoGal pink. These are documentary content, not decoration I chose. The rule is applied to everything I actually design: buttons, borders, chips, backgrounds, icons, JSON-LD, motion effects. All of those are strictly greyscale plus the one accent. I did not recolor, filter, or otherwise alter the client screenshots to force them toward greyscale, since that would misrepresent the actual products. This is a judgment call, flagging it rather than silently deciding it.

## 2. OG image uses the system default bold sans, not Space Grotesk

`app/opengraph-image.tsx` uses `next/og`'s `ImageResponse`, which is powered by Satori and cannot use `next/font` (CSS-variable-based fonts do not work inside the Satori render tree; it needs raw font binary data passed via the `fonts` option). Loading an actual Space Grotesk `.ttf` file would mean fetching and bundling a font binary purely for this one 1200x630 image. I used Satori's built-in bold sans-serif at a heavy weight instead, which reads clean at OG-card size. The layout, colors, accent underline, and copy all match the plan.

## 3. Resend integration uses a direct fetch call, not the `resend` npm package

The plan says "if RESEND_API_KEY env is set, send via Resend." I implemented this as a plain `fetch` to `https://api.resend.com/emails` rather than adding the `resend` SDK as a dependency, since the integration is a single POST request and the SDK would be a dependency for one call. Behavior matches the spec exactly: env unset returns `{ok:false, fallback:"mailto"}`, env set attempts delivery and falls back to mailto on any failure, every submission is also logged to console, honeypot and rate limiting are both implemented.

## 4. Tech chips dock effect (motion spec item 6) applied to the principles strip

The plan's motion spec calls for a "macOS-dock-style scale-on-proximity" effect on a "tech chips row on /about," but the content spec for /about (section 4.5) does not define a distinct tech-chips content block, only the 5-item principles list (also used verbatim on Home). Since the principles strip is the only horizontal row of small discrete items on /about, I applied the dock effect there. Home's copy of the same principles list stays static, matching the plan's "keep everything else still" instruction and avoiding motion on a duplicate of the same content.

## 5. `.claude/launch.json` also added at the user-home level

PLAN.md instructed creating `richardwayne-site/.claude/launch.json`, which I did exactly as specified. The live preview tooling in this environment reads server configs from `C:/Users/Richa/.claude/launch.json` (a different, pre-existing file with three other projects' configs already in it), not from a project-local `.claude/launch.json`. To actually run and visually verify the build during development, I appended a fourth `richardwayne-site` entry to that shared file, without touching the three existing entries. Both files now correctly point at `site` on port 3801.

## 6. Removed default create-next-app scaffold artifacts

Deleted the auto-generated `AGENTS.md`, `CLAUDE.md` (Next.js 16's built-in "breaking changes" pointer file, consulted for the Cache Components question below, then removed since its job was done), the default `README.md` (referenced Geist font and port 3000, neither of which apply here, replaced with a real one), and the 5 unused placeholder SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) that ship with every fresh scaffold and were never referenced anywhere.

## 7. Cache Components stayed off (default caching model)

Next.js 16 ships an opt-in `cacheComponents` flag (Partial Prerendering plus the `use cache` directive) that replaces route segment configs like `dynamic = "force-static"` if enabled. The scaffold does not enable it by default, and I left it off: this is a fully static marketing site apart from one POST-only API route, so the legacy caching model that the plan's `force-static` instruction assumes works exactly as written, with far less migration surface than adopting Cache Components would require (Suspense boundaries around any runtime data access, `generateStaticParams` returning at least one param, and so on). `next.config.ts` sets `turbopack.root` explicitly to silence a workspace-root warning caused by an unrelated lockfile one level up in the parent `Richard Wayne` directory (a pre-existing file from a different project, left untouched).

## Bugs caught and fixed during the build (not deviations, just worth recording)

- The work card's accent-border draw-on animation was originally setting `opacity: 1` on the SVG `<rect>` element while the CSS rule that hides the border by default (`.reveal-border { opacity: 0 }`) targets the parent `<svg>`. The rect's own opacity had no effect on its invisible parent, so the border drew correctly but stayed invisible. Fixed by animating the svg's opacity directly in the same GSAP timeline as the stroke draw.
- The mobile nav overlay rendered fully transparent-looking (hero text bled through) because it was a DOM descendant of `<header>`, and `<header>` has `backdrop-blur`. Per the CSS spec, `backdrop-filter` makes an element a containing block for `position: fixed` descendants, which trapped the overlay inside the header's own stacking context instead of letting it paint as a true full-page fixed layer. Fixed by rendering the overlay as a sibling of `<header>` instead of a child.

## Known gaps

- Social URLs for X, Telegram, and Discord remain PLACEHOLDER or pending-creation per `lib/site.ts` (Richard has not created these accounts yet, per SOCIAL-KIT.md). The footer, /contact, and JSON-LD `sameAs` all correctly filter these out until real URLs are set.
- `site.calendar` is empty, so the "Book a 30-minute scope call" button on /contact does not render, per spec (hide when empty).
- Pricing is intentionally omitted from /services behind a comment, per explicit instruction pending Richard's sign-off.
- No real domain is live yet; `NEXT_PUBLIC_SITE_URL` falls back to `https://richardthebruce.dev` for metadata/sitemap/JSON-LD purposes per `lib/site.ts`, matching DEPLOY.md's target domain.
- `research` array in `lib/posts.ts` is empty, so the "Published research" block on /writing renders nothing, per spec (hide when empty). Richard fills in the two SSRN papers.

## Rebrand pass: Nuro Finance to AFI (2026-07-05, Richard's correction via coordinator)

Every user-visible "Nuro Finance" and "Nuro" on the site became "AFI":

- Case study slug renamed: `/work/nuro-finance` is now `/work/afi`. The slug lives once in `lib/work.ts` and drives `generateStaticParams`, prev/next nav, and the sitemap, so those updated automatically; the footer work-links list and the `caseStudyDescriptions` metadata map in `app/work/[slug]/page.tsx` were updated by hand.
- Image files renamed with `git mv` in BOTH `site/public/work/` AND `assets-staging/` (`nuro-card.png` to `afi-card.png`, `nuro-agentic-card.png` to `afi-agentic-card.png`). Renaming the staging copies too matters because `scripts/prep-images.mjs` copies staging into public by filename; renaming only the public copies would have let the next prep-images run silently reintroduce the old names.
- Copy updates: home selected-work card title, case study title and metadata description, /about timeline "2025 to now" entry and page description, the AFI mention in the agents-that-cannot-lie post body, and both image alt texts.
- PLAN.md updated as source of truth (IA route table, card 1 block, case body block header and image names, timeline entry, SEO example title, acceptance-criteria image note).
- Judgment call, logged: DEPLOY.md ("request indexing" URL list) and CLIENT-ACQUISITION-PLAYBOOK.md (outreach example link, case-study name) referenced the old slug, which would 404 after the rename. Those URL and name references were updated even though the correction only named PLAN.md, because a deploy runbook pointing at a dead route is an operational landmine. DECISIONS.md was left untouched as a dated historical ledger.
- Exception honored: the LinkedIn URL `https://www.linkedin.com/in/richard-wayne-nuro` in `lib/site.ts` (and its PLAN.md copy) stays as is. It is an address, not copy. It is the ONLY case-insensitive "nuro" match remaining in site source.
- No redirect was added from the old slug: the site has never been deployed, so no external links or crawler state reference `/work/nuro-finance`.

Also added in the same pass: the hidden-when-empty "Published research" block at the top of /writing, driven by the `research` array in `lib/posts.ts` (fields: title, venue, year, pages, url, oneLiner).

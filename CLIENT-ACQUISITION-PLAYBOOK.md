# Client Acquisition Playbook — The System Around the Site

> Mythos, 2026-07-05. The site is the credibility asset. Leads come from channels pointed AT it. This is the full system, ordered by speed-to-cash. Companion docs: `SOCIAL-KIT.md` (this folder), `Richard Wayne/Channel Pack — Money Now.md` (the fast-cash channel pack from 2026-06-07, still valid).

---

## The funnel, one line

Outbound + content + socials → richardthebruce.dev (proof) → contact form / booking link → scope call → paid discovery sprint → retainer.

Everything below exists to feed that line.

## Phase 0 · Launch requirements (this week, ~$12 total)

| # | Action | Owner | Cost |
|---|--------|-------|------|
| 1 | Buy `richardthebruce.dev` (Cloudflare Registrar or Porkbun, at-cost) | Richard | ~$12/yr |
| 2 | Deploy site to Vercel (personal account, NOT the 2gather team with Deployment Protection), attach domain | Mythos (runbook in DEPLOY.md once built) | $0 |
| 3 | Resend account, free tier, `RESEND_API_KEY` into Vercel env (contact form emails) | Richard (2 min signup), Mythos wires | $0 |
| 4 | cal.com free account, event type `30-min scope call`, paste link into `site/lib/site.ts` | Richard | $0 |
| 5 | Google Search Console + Bing Webmaster: verify domain, submit sitemap.xml | Mythos guides, Richard clicks | $0 |
| 6 | Claim X + Telegram + Discord per SOCIAL-KIT.md | Richard | $0 |
| 7 | LinkedIn: add site to featured + contact info | Richard | $0 |
| 8 | GitHub profile README: site link at top | Mythos | $0 |

## Phase 1 · Money now (weeks 1-4): outbound, not waiting

SEO takes 2-3 months to compound. Do not wait for it. The site's job in week one is to make your outbound convert better, because every prospect who googles you now finds a founder-grade site instead of nothing.

1. **Warm circle sweep (day 1-2).** George and Andrea are live clients. Ask each for: (a) a 2-sentence testimonial for the site, (b) one referral intro. A referral from a paying client is worth 100 cold applications. Script: `I am opening 2 client slots for Q3 and building my referral network. Is there one person you know who needs the kind of build I did for you? A one-line intro is plenty.`
2. **The 15-3-1 daily loop (every weekday).** 15 minutes scanning (web3 job boards from `Web3 Job Boards — Strategy + Apply Tracker.md`, Wellfound, Contra, Braintrust per the Channel Pack), 3 tailored outreach messages sent (each references THEIR product specifically, links one relevant case study page, e.g. /work/nuro-finance for agent work), 1 follow-up on a previous thread. Mythos drafts all of these on request; the `proposal` skill already does Upwork-format, and I will adapt it per channel.
3. **Telegram group presence.** Join 5 web3 builder/job groups. Do not pitch. Answer technical questions well, twice a week, with the build-log channel in your profile. This is where LayerZero-adjacent work actually gets sourced.
4. **BC ERA thread.** Carlo's retainer posting ($100-150/hr systems architect) is still the single largest open opportunity in the pipeline. The new site strengthens that pitch directly: send him the Nuro + Memetropolis case studies once live.

## Phase 2 · Compounding (weeks 2-8): content flywheel

- **One build story per week**, written once, published four times: site /writing (canonical), LinkedIn (engine + calendar already exist at `Richard Wayne/linkedin-engine/`), X thread (3-5 tweets), Telegram post. Always a real number, a real failure, a real fix.
- **Cross-post to dev.to and Hashnode** with `rel=canonical` pointing at richardthebruce.dev. Free backlinks from high-authority domains, which is exactly what a fresh .dev domain needs.
- **Seed posts 1 and 2 are already written** (agents-that-cannot-lie, nonces-advisory-locks). Weeks 3-6 topics, in order: the Solana-to-EVM CCTP route everyone stalls on; before/after of the PPE legacy site rebuild (anonymized); how I use a personal AI neural net to ship at team speed; what auditing the first omnichain NFT taught me about bridge risk.
- **Answer-engine reality:** buyers increasingly ask ChatGPT/Claude "who can build X." Specific, factual, name-attached case studies on a crawlable site are how you show up in those answers. The JSON-LD Person + sameAs graph in the build feeds this directly.

## Phase 3 · Authority (months 2-6)

- Testimonials section on the site once George + Andrea reply (I add the component in 20 minutes).
- 2 open-source flag plants: me.md is already public; add a small `layerzero-oft-checklist` repo (the checklist from Memetropolis experience). Dev tools repos are steady inbound.
- Monthly deep-dive post (2,000 words) targeting one commercial keyword each: `LayerZero developer for hire`, `AI agent development consultant`, `fractional founding engineer`.
- Speaking/pod guesting: web3 dev podcasts take guests with shipped-story inventory. You have 4 stories nobody else can tell (first ONFT, OFT launchpad, agent trust contract, Solana CCTP).

## Metrics that matter (check weekly, 5 minutes)

- Outreach sent / replies / calls booked (the only numbers that pay rent this month)
- Site: unique visitors, /contact submissions, which case study gets read most (Vercel Analytics)
- Search Console: impressions + queries (expect near-zero until week 6-8, that is normal)

## What I take charge of vs what needs your hands

**Mythos owns:** site build + deploy runbook, all copy and content drafts, proposal drafts for every lead, banner/OG art, SEO plumbing, weekly metric readout, keeping this playbook honest in the decision ledger.
**Richard owns (cannot be delegated):** domain purchase, account signups (phone verification), scope calls, pricing sign-off, sending messages from your own accounts, and the George/Andrea testimonial asks.

## The honest constraint

You have two live clients, two shipped ventures, and a pioneer credential from 2022. That is a stronger portfolio than 90% of freelance engineers. The gap has never been skill, it is that nobody can FIND the proof. This system closes that gap, but only the daily 15-3-1 loop closes the revenue gap this month. The site makes every one of those 3 daily messages land harder.

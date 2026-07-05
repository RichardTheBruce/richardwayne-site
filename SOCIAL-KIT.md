# Social Presence Kit — Richard Wayne

> Mythos, 2026-07-05. Everything below is paste-ready. Account creation needs your phone number and human verification, so the signups are yours. Budget: 25 minutes total, $0.
> Handle priority: try `RichardTheBruce` everywhere first (matches GitHub, one brand). Fallbacks listed per platform.

---

## 1. X / Twitter (highest priority, do this first)

**Handle:** `@RichardTheBruce` (fallbacks: `@richardthebrucew`, `@richardwbuilds`)
**Display name:** `Richard Wayne`
**Bio (160 chars):**
```
Founding engineer. AI agents that execute under proof, cross-chain infra on LayerZero, full-stack builds that hold at 100K users. Coding since 14.
```
**Location:** `NJ, USA` · **Link:** `richardthebruce.dev` (once live)
**Avatar:** same headshot as LinkedIn (consistency = recognition). **Banner:** dark obsidian, name + one path-trace line in #0D90FF. I can generate this when you say go.

**Pinned post (paste on day one):**
```
I asked my card's AI agent to freeze itself.

It said "done." It had done nothing.

That bug changed how I build agents: nothing counts as done without a confirmed on-chain transaction hash. Intent and execution are separate layers. The agent cannot lie.

I write about building systems like this, and I take on a small number of client builds. Work: richardthebruce.dev
```

**Cadence:** 3 posts/week minimum. Source material: the LinkedIn library at `Richard Wayne/linkedin-engine/` (each article splits into 2-3 tweets/threads). Rule: every post is a build story with a real number in it, never generic advice.

**Follow on day one (algorithm seeding):** LayerZero Labs, Circle, Vercel, Next.js, GSAP, indie-hacker and web3 builder accounts you actually read. Reply to 3 posts/day for the first 2 weeks; replies outperform posts at zero followers.

---

## 2. Telegram (channel = broadcast, plus your DM as the funnel)

**Channel name:** `Richard Wayne · Build Logs`
**Handle:** `t.me/richardthebruce` (fallbacks: `t.me/richardwaynebuilds`, `t.me/rw_buildlogs`)
**Type:** public broadcast channel (subscribers read, only you post)
**Description:**
```
Founding engineer build logs. AI agents that execute under proof, LayerZero cross-chain infra, full-stack product builds. Real numbers from real ships. Client inquiries: @<your personal handle> or richardthebrucewayne@gmail.com
```

**First 3 posts (paste in order):**
1. `This channel is my build log. I ship autonomous agent systems, cross-chain infrastructure, and full products for clients. Everything posted here is from real production work: what broke, what held, what it cost. If you are building something and need an engineer who has been the founder too, message me.`
2. The Trust Contract story (copy the pinned X post).
3. The nonce concurrency story: `Two users hit the launchpad in the same second. Naive sequential signing collides nonces and strands funds. The fix that held across 7 chains: Postgres advisory locks + per-address chain locks + fresh-fetched nonces. This is the difference between demo code and production code.`

**Why Telegram matters for you specifically:** web3 clients live there. Every crypto job posting, DAO, and founder group chat is on Telegram. The channel is your credibility link to drop in those groups.

---

## 3. Discord (client workroom first, community second)

Honest call: a public community Discord at zero audience is a ghost town that makes you look small. Flip the model: **Discord as your client delivery room.** Create the server, keep it invite-only, and give every client a private channel. It becomes a sales asset ("you get a direct channel to me, not a ticket queue").

**Server name:** `Richard Wayne · The Workshop`
**Structure (create these channels):**
- `#start-here` (read-only): who you are, links, how engagements work
- `#build-logs` (read-only): mirror of the Telegram channel posts
- `#ask-richard` (open): questions from prospects you invite
- Category `CLIENTS` (private): one channel per client, e.g. `#cryptogal`, `#ppe-engine`
**Invite link:** set to never expire, paste into `lib/site.ts` (`discord:` field) when created.

When the audience grows past ~200 X followers, open `#ask-richard` invites publicly and it becomes a lead pool.

---

## 4. Consistency checklist (10 minutes, after accounts exist)

- [ ] Same headshot on X, Telegram, Discord, LinkedIn, GitHub
- [ ] Same one-line bio spine everywhere: `Founding engineer. AI agents, cross-chain, full stack.`
- [ ] richardthebruce.dev in every bio link slot
- [ ] GitHub profile README (github.com/RichardTheBruce): add the site link + X + Telegram at the top
- [ ] LinkedIn featured section: add the site once live
- [ ] Send me the final URLs and I update `site/lib/site.ts` + JSON-LD sameAs, then the footer icons go live

## 5. What I still need from you

1. Claim the 3 accounts (25 min total).
2. One headshot file (or tell me to generate a monogram avatar instead).
3. Say "go" on the banner and I generate X/Telegram banner art in the locked obsidian style.

# Tool Stack + Technical Docs Research
**For:** Richard Wayne, solo founder (portfolio site + AFI)
**Date:** 2026-07-06
**Budget context:** ~$900 total runway, cash-urgent. Every recommendation is filtered through "does this make money or win a client in the next 60 days."

---

## PART A — Technical Documentation Showcase (Scalar)

### What those two URLs actually are

1. **https://welcoming-dazzle-7q822.apidocumentation.com/reference** is not a stranger's docs. It is the **Memetropolis API reference, created by GBlock, contact richard@gblock.gg, copyright 2025 GBlock**. This is Richard's own prior work, hosted on Scalar's free tier (every free Scalar Docs project gets a `<subdomain>.apidocumentation.com` URL). It has a Guide tab, a Reference tab, Ctrl+K search, and the interactive playground. Translation: Richard has already shipped a Scalar-powered API doc once. The portfolio showcase is not a new skill to learn, it is an existing artifact to reclaim, polish, and re-brand.

2. **https://docs.scalar.com/editor** is Scalar's own hosted docs editor (a client-side app, so it returns almost nothing to a plain fetch). It is the WYSIWYG/Markdown editor where you write guides in Markdown or MDX, attach OpenAPI documents for the interactive reference, and publish to your subdomain. GitHub Sync is available so guides can live in a repo instead.

### What Scalar is

Scalar (scalar.com, github.com/scalar/scalar) is an open-source API platform with three parts:

- **API Reference renderer**: takes an OpenAPI/Swagger document (3.x, JSON or YAML) and renders a modern three-panel interactive reference: sidebar navigation, endpoint detail with schemas, and generated code samples in many languages.
- **Built-in API client ("try it" console)**: every endpoint gets a live request runner in the browser, with environment variables, auth, and a CORS proxy (`proxy.scalar.com`) so requests to arbitrary APIs work from the docs page.
- **Hosted docs platform** (scalar.com): editor, guides (Markdown/MDX), GitHub sync, custom domains, SDK generation, API registry.

Key facts:

- **License: MIT. The renderer is free forever.** 15,400+ GitHub stars, 112 releases, ~1,100 dependent projects, very active.
- Written in TypeScript/Vue, but ships first-class wrappers for React, Next.js, Nuxt, SvelteKit, Fastify, Express, Hono, FastAPI, Django, .NET (Scalar is now the default OpenAPI UI in .NET 9+), and 30+ other frameworks.
- **Hosted pricing (verified July 2026):** Free plan includes hosted OpenAPI docs, the built-in API client, unlimited viewer seats, 1 editor seat, themes, and up to 3 APIs in the registry, on an `apidocumentation.com` subdomain. **Pro is $72/month** and adds custom domains, Git sync, Markdown/MDX guides, versions, landing pages, hosted MCP servers, and unlimited APIs (SDK generation is +$100/language). Enterprise is custom.
- **The self-hosted open-source renderer costs $0 and is all Richard needs.** The hosted Pro plan matters only if he wants Scalar to host guides on a custom domain, and he does not, because the portfolio site itself is the host.

### How rendering works

You hand Scalar an OpenAPI document (URL or inline string). It parses the spec client-side and renders the full reference, including the try-it client. No build step, no lock-in: the same spec file works in Redoc, Swagger UI, Postman, or an LLM context window.

```js
// CDN / vanilla usage, one script tag
Scalar.createApiReference('#app', {
  url: '/openapi.json',
  proxyUrl: 'https://proxy.scalar.com',
})
```

### Implementation options for a Next.js 16 App Router site (ranked)

**Option 1 (recommended): `@scalar/nextjs-api-reference` route handler.**
Purpose-built for App Router. The whole integration is one file:

```bash
npm install @scalar/nextjs-api-reference
```

```ts
// app/docs/afi-api/route.ts
import { ApiReference } from '@scalar/nextjs-api-reference'

export const GET = ApiReference({
  url: '/specs/afi-openapi.yaml',   // spec served from /public/specs/
  theme: 'default',                  // or a custom theme; dark themes available
  // nonce: '<csp-nonce>'            // supports strict CSP, no unsafe-inline
})
```

The docs live at `richardthebruce.dev/docs/afi-api`, fully interactive, zero backend. Serve the OpenAPI file from `public/` or from a second route handler that returns the spec (which also makes the raw spec itself a linkable artifact). Latest package version 0.11.8 shipped July 2, 2026, so it is actively maintained against current Next.js.

Caveat: the route handler serves its own full HTML page, so it will not sit inside the portfolio's layout/nav. That is actually correct for a docs showcase (docs should feel like a real product surface), and a "Back to portfolio" link can be injected via Scalar's customCss/slot config. If in-layout embedding is ever wanted, use Option 2.

**Option 2: `@scalar/api-reference-react` component.**
`npm install @scalar/api-reference-react`, render `<ApiReferenceReact configuration={{ url }} />` inside a client component (`'use client'`, plus its stylesheet). This puts the reference inside the site's own layout. Heavier client bundle and occasional SSR friction, so use only if the reference must share the portfolio chrome.

**Option 3: CDN script in a plain route.**
A static page with the jsdelivr script tag. Simplest possible, good for a quick prototype, but Option 1 is barely more work and version-pins properly.

**Option 4: Scalar free hosted docs (what Memetropolis already uses).**
Keep `welcoming-dazzle-7q822.apidocumentation.com` alive as a second, "hosted platform" proof point and link to it from the case study. Costs nothing. Do not pay $72/month for Pro just for a custom domain; self-hosting on the portfolio achieves that for free.

### What the portfolio "Technical Documentation" showcase should contain

1. **A live, embedded AFI API reference** at `/docs/afi-api` via Option 1. Write a curated public OpenAPI 3.1 spec for AFI (10 to 20 endpoints: agents, cards, freeze/unfreeze, transactions, webhooks, the Trust Contract attestation endpoints). Sanitized, no real environment details. The try-it console can point at a tiny mock handler (`app/api/mock/...`) so visitors get real 200 responses. An interactive, working banking API doc is a rare portfolio artifact.
2. **The spec itself as a deliverable**: a "View the raw OpenAPI spec" link. Hiring managers and DevRel folks read specs; it proves spec-first discipline, not just pretty rendering.
3. **The Memetropolis reference** linked as a shipped, third-party-visible example (already public, already branded GBlock).
4. **A short "docs engineering" write-up** (300 words): why Scalar over Swagger UI, spec-first workflow, CI spec linting (Spectral), mock server strategy. This is the DevRel voice on top of the DevOps artifact.
5. Optional stretch: a second spec for a fun fake API (Scalar's own demo uses a "Galaxy" API) themed to the portfolio, to show range without exposing AFI internals.

### Competitors, briefly

| Tool | What it is | Why Scalar wins here |
|---|---|---|
| **Mintlify** | AI-first hosted docs platform. Free Starter + metered AI credits ($100 to $1,000/mo tiers) | Beautiful, but hosted-only, credit-metered, and not embeddable in your own Next.js app |
| **ReadMe** | Hosted developer hubs. Free base, $99/mo Startup, $399/mo Business | SaaS lock-in, expensive, not a self-host story |
| **Redocly / Redoc** | Redoc is the classic OSS OpenAPI renderer; Redocly Pro from $10/seat/mo | Redoc has no try-it console in the free version and a dated look; Scalar is its modern successor |
| **Docusaurus** | Meta's OSS docs site generator | General docs sites, not an API reference renderer; you would embed Scalar or Redoc inside it anyway |

Why Scalar is the right choice for this showcase: MIT and free, renders inside the existing Next.js 16 site with one route file, has the best-looking default UI in the category, includes the interactive client (the thing that makes a demo memorable), and is the current industry momentum pick (.NET ships it by default). It also demos well in dark mode, which fits the Obsidian/Graphite taste profile.

---

## PART B — Design / Asset / Brand Tool Stack

*(Being finalized: sections below cover the five incumbent tools and the additional categories.)*

---

## PART C — Pipeline Recommendation

*(Being finalized.)*

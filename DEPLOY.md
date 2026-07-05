# Deploy Runbook — richardthebruce.dev

> Run top to bottom. Steps marked RICHARD need your hands (money or account auth). Everything else Mythos can drive from a session on this machine.

## 1. RICHARD · Buy the domain (~$12/yr, one time)

- Registrar: Cloudflare Registrar or Porkbun (at-cost, no upsells).
- Buy `richardthebruce.dev` (matches GitHub handle + the portfolio repo's declared home). `.dev` domains are HTTPS-only by design, which is fine on Vercel.
- Do NOT buy email hosting upsells. Email stays gmail for now; `leads@` routing comes later via Resend inbound if wanted.

## 2. Vercel project (personal scope, NOT the 2gather team)

The 2gather team (`team_hqPYHA35aGzM2rrL3FZ5D08r`) has Deployment Protection that walled the art portfolio. This site must be public, so it goes on the personal account.

```bash
cd "C:/Users/Richa/Richard Wayne/richardwayne-site/site"
npx vercel login          # RICHARD confirms the email tap once
npx vercel link           # create NEW project "richardwayne-site", personal scope
npx vercel --prod
```

If Deployment Protection shows on the new project anyway: Vercel dashboard → project → Settings → Deployment Protection → Off (it must serve logged-out visitors and search crawlers).

## 3. Environment variables (Vercel dashboard or CLI)

| Var | Value | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://richardthebruce.dev` | metadataBase, sitemap, JSON-LD |
| `RESEND_API_KEY` | from resend.com (RICHARD: free signup, 100 emails/day) | contact form delivery |
| `CONTACT_FROM` | `leads@richardthebruce.dev` after domain verify in Resend, else leave unset | form sender |

Redeploy after setting (`npx vercel --prod`).

## 4. Attach the domain

- Vercel project → Settings → Domains → add `richardthebruce.dev` (+ `www` redirect).
- At the registrar, point per Vercel's instructions (A 76.76.21.21 or the shown CNAME).
- Wait for the cert (minutes). Verify: site loads over HTTPS logged-out in a private window.

## 5. Search plumbing (day one, do not skip)

1. Google Search Console → add property `richardthebruce.dev` (domain property, DNS TXT verify at registrar). RICHARD clicks, Mythos dictates.
2. Submit `https://richardthebruce.dev/sitemap.xml`.
3. Bing Webmaster Tools → import from GSC (one click).
4. Request indexing on `/`, `/work/nuro-finance`, `/services`.

## 6. Post-deploy verification (Mythos, walk-attest)

- `mythos/scripts/deploy-attest.sh` against the prod URL, then screenshot-mcp captures of `/`, `/work`, `/contact` into the corpus as the walk-attest record.
- Contact form live test: submit once, confirm email lands in gmail (or mailto fallback fires if Resend unset).
- Lighthouse spot check: LCP under 2.5s on `/`.

## 7. Wire the last links

- cal.com booking URL + real X/Telegram/Discord URLs into `site/lib/site.ts`, commit, `npx vercel --prod`.
- GitHub profile README + LinkedIn featured link → the live domain.

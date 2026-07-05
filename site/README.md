# richardwayne-site

Lead-generation developer website for Richard Wayne. Next.js App Router, TypeScript, Tailwind CSS v4, GSAP.

## Develop

```bash
npm install
npm run dev -- --port 3801
```

Open http://localhost:3801.

## Image assets

Source screenshots live in `../assets-staging`. Run the prep script to copy and crop them into `public/work/`:

```bash
npm run prep-images
```

## Build

```bash
npm run build
```

## Structure

- `app/` route segments (home, work index + case studies, services, about, writing + posts, contact + API route)
- `lib/site.ts` single source of truth for site config, social links, nav
- `lib/work.ts` case study content
- `lib/posts.ts` writing post metadata
- `components/` shared UI (header, footer, hero canvas, scroll reveal, timeline, contact form)
- `scripts/prep-images.mjs` build-time image crop script (sharp)

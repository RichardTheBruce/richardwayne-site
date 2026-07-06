export type WorkImage = {
  src: string;
  alt: string;
  label?: string;
  // When set, this gallery item renders as a looping muted video with `src`
  // used as the poster frame and `video` as the source file.
  video?: string;
  // Force the tall internal-scroll frame for very tall full-page captures.
  tall?: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  chips: string[];
  cardImage: WorkImage;
  problem: string;
  build: string;
  hardPart: string;
  outcome: string;
  gallery: WorkImage[];
  ndaNote?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "afi",
    title: "AFI",
    role: "Founder and Lead Architect",
    summary:
      "An agentic bank where you talk to your Visa card and a bonded AI agent moves your money. Nothing counts as done without a confirmed on-chain transaction hash, so the agent cannot lie about what it did.",
    chips: ["AI agents", "LayerZero V2", "Circle CCTP", "Visa rails", "PostgreSQL"],
    cardImage: {
      src: "/work/afi-card.png",
      alt: "AFI dark agentic bank card art",
    },
    problem:
      "Everyone fears the same thing about AI agents: an agent that says it did something and did not do it. Handing one real money makes that fear existential.",
    build:
      "Four money surfaces in one product: Vault, Pay Card, Agent, and Crypto Wallet. Drag a glyph to move money, tap to move around the app. Intent and execution are separate layers. The lifecycle is intent (pending), execution (confirmed with an on-chain transaction hash), then settled (paid with a payout hash). Per-user vaults are HD-derived on Base. A 23-chain settlement matrix routes through LayerZero V2 and Circle CCTP, including the Solana to EVM route most teams stall on. Visa card settlement runs on idempotent webhooks with a post-swap credit policy so the user carries volatility, not the platform.",
    hardPart:
      "Making \"done\" unfakeable. The agent runtime executes its decision loop hundreds of times a day, every action logged, every flag kill-switched, and nothing counts as moved until the chain proves it.",
    outcome:
      "In production on PM2 and a VPS, with risky on-chain paths shipping observe-only for their first 24 hours.",
    gallery: [
      {
        src: "/work/afi-card.png",
        alt: "AFI dark agentic bank card art",
      },
      {
        src: "/work/afi-agentic-card.png",
        alt: "AFI agentic card interface showing agent-controlled payments",
      },
    ],
  },
  {
    slug: "memetropolis",
    title: "Memetropolis",
    role: "Founder and CTO",
    summary:
      "The first OFT launchpad on LayerZero, live across 7 EVM chains. About $300K invested, 810 commits, 5,000 users at launch, and concurrency that holds when two users hit the same second.",
    chips: ["Solidity", "LayerZero V2", "Subgraph", "Next.js"],
    cardImage: {
      src: "/work/memetropolis-landing-crop.png",
      alt: "Memetropolis omnichain launchpad landing page with live trader cards and charts",
    },
    problem:
      "Launching a token on one chain is a solved problem. Launching the same token across 7 chains at once, with liquidity and state that stay coherent, is not.",
    build:
      "The first OFT launchpad on LayerZero: Solidity contracts, TypeScript backend, subgraph indexing, Next.js frontend. Multi-chain peer wiring, per-chain gas configuration, Etherscan verification on every chain.",
    hardPart:
      "Concurrency. Two users hitting the launchpad in the same second used to mean colliding nonces and stranded funds. The fix that held: Postgres advisory locks plus per-address chain locks plus fresh-fetched nonces. Not naive sequential signing.",
    outcome:
      "About $300K invested, 810 commits, 5,000 users at launch, live across 7 EVM chains.",
    gallery: [
      {
        src: "/work/meme-dashboard.jpg",
        alt: "Memetropolis live launchpad dashboard with trader profile, portal funnels, and a recent-gainers table",
        label: "The live dashboard",
      },
      {
        src: "/work/meme-launchpad-full.jpg",
        alt: "Full Memetropolis token launch page: trader cards, wireframe launch art, bonding curve, and candlestick chart",
        label: "A token launch page",
      },
      {
        src: "/work/meme-trade-ui-poster.jpg",
        video: "/work/meme-trade-ui.mp4",
        alt: "The Memetropolis trade panel in motion: buy, sell, chain, whale sell, swap and bridge",
        label: "The trade panel, in motion",
      },
      {
        src: "/work/meme-launch-card.jpg",
        alt: "Memetropolis launch card with live trader feed and wireframe mountain launch artwork",
        label: "Launch card and live feed",
      },
      {
        src: "/work/meme-portal-3d.jpg",
        alt: "Cinematic 3D portal environment art rendered for the Memetropolis interface",
        label: "3D portal environment art",
      },
      {
        src: "/work/meme-portal-animation.jpg",
        alt: "The Memetropolis portal animation system showing ranked portals and container layout",
        label: "The portal animation system",
      },
      {
        src: "/work/brand-motion-poster.jpg",
        video: "/work/brand-motion.mp4",
        alt: "Memetropolis brand motion piece: a wireframe low-poly world in magenta and cyan with fan blades and orbiting spheres",
        label: "Brand world, in motion",
      },
      {
        src: "/work/meme-mobile.jpg",
        alt: "Memetropolis mobile app top-projects screen with portal funnels and token orbs",
        label: "Mobile: top projects",
      },
    ],
  },
  {
    slug: "omni-x",
    title: "Omni-X",
    role: "Co-Founder · 2022",
    summary:
      "The first natively omnichain NFT platform. Creator of Greg, the first onchain ONFT, and auditor of the original Gh0stly Gh0sts contract, the first omnichain NFT collection.",
    chips: ["ONFT", "LayerZero", "Marketplace"],
    cardImage: {
      src: "/work/omnix-landing.png",
      alt: "Omni-X omnichain NFT marketplace landing page",
    },
    problem: "In 2022, NFTs were trapped on the chain that minted them.",
    build:
      "Co-founded the first natively omnichain NFT platform and marketplace on LayerZero. Created Greg, the first onchain ONFT. Audited the original Gh0stly Gh0sts contract, the first omnichain NFT collection.",
    hardPart:
      "There was no playbook. Omnichain messaging for NFTs had to be reasoned about from first principles, then shipped to a public that would find every edge case.",
    outcome:
      "The platform and the ONFT standard patterns it pioneered are still live. This work is why cross-chain is home turf, not a skill listed on a resume.",
    gallery: [
      {
        src: "/work/omnix-landing.png",
        alt: "Omni-X omnichain NFT marketplace landing page",
        label: "The marketplace",
      },
      {
        src: "/work/onft-wizard-1.jpg",
        alt: "Original ONFT character art: a blue star-hatted wizard mascot illustrated for the Omni-X era",
        label: "ONFT character art I illustrated",
      },
      {
        src: "/work/onft-wizard-2.jpg",
        alt: "Alternate ONFT wizard mascot illustration on a black background",
        label: "Alternate mascot",
      },
    ],
  },
  {
    slug: "federal-ppe",
    title: "Federal-scale PPE supplier",
    role: "Solo Engineer · 2026",
    summary:
      "A modern storefront plus a signal-driven outbound engine over SAM.gov, OSHA, and FEMA data. Every lead lands enriched with affected-population estimates and SKU recommendations before the sales team wakes up.",
    chips: ["Next.js", "Postgres", "Signal pipeline", "Vercel"],
    cardImage: {
      src: "/work/ppe-rebuild-landing-crop.png",
      alt: "Rebuilt PPE supplier storefront landing page",
    },
    ndaNote: "Client name withheld under NDA.",
    problem:
      "A federal and municipal PPE supplier was invisible online and dependent on inbound calls, while procurement signals sat in public data nobody read.",
    build:
      "A modern storefront rebuilt from a 2000s-era legacy site, plus a daily signal pipeline over SAM.gov solicitations, OSHA citations, and FEMA disaster declarations. Each lead lands enriched: affected-population estimate, SKU recommendation, recurrence prediction, delivered as a daily digest to the sales team.",
    hardPart:
      "Signal quality. Raw government feeds are noisy, so the pipeline scores and enriches before a human ever sees a ticket.",
    outcome:
      "Live for the client, deployed on Vercel with GitHub Actions cron. Before and after screenshots below.",
    gallery: [
      {
        src: "/work/ppe-legacy-landing.png",
        alt: "The legacy PPE supplier website before the rebuild",
        label: "The legacy site",
      },
      {
        src: "/work/ppe-rebuild-landing-crop.png",
        alt: "The rebuilt PPE supplier storefront landing page",
        label: "The rebuild",
      },
      {
        src: "/work/ppe-rebuild-catalog.png",
        alt: "The rebuilt PPE supplier product catalog page",
        label: "Catalog",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  return { prev, next };
}

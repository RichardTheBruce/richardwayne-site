export type Post = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  readTime: string;
};

export type ResearchPaper = {
  title: string;
  venue: string; // e.g. "SSRN"
  year: number;
  pages: number;
  url: string;
  oneLiner: string;
  /** If present, links to an on-site detail page instead of directly to SSRN. */
  localSlug?: string;
};

// Published research shown at the top of /writing.
// NOTE: the two SSRN abstract IDs came from Richard without title labels and
// SSRN blocks automated verification. Best-inference mapping below (lower ID =
// the earlier Unification manuscript). If swapped, exchange the two url values.
export const research: ResearchPaper[] = [
  {
    title:
      "On the Matter of Consciousness and Its Equivocation: Toward a Physical Framework for the Properties of Conscious Mass",
    venue: "SSRN",
    year: 2026,
    pages: 19,
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6692018",
    oneLiner:
      "A first formal framework treating conscious human beings as mass bodies governed by the same class of structural laws as physical mass systems, with a proposed decay wave function W(t).",
    localSlug: "consciousness-equivocation",
  },
  {
    title:
      "The Unification Theory: A Comprehensive Framework for the Dynamic Nature of Reality",
    venue: "SSRN",
    year: 2026,
    pages: 38,
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6672218",
    oneLiner:
      "The Unified MultiFlux Theory: a framework in which nothing and everything approach one another through the dynamic evolution of the MultiFlux continuum.",
  },
];

export const posts: Post[] = [
  {
    slug: "agents-that-cannot-lie",
    title:
      "The agent lied about freezing my card. So I made lying structurally impossible.",
    date: "2026-07-05",
    dek: "Why intent and execution have to be separate layers, and why an on-chain hash is the only proof an agent's claim is worth trusting.",
    readTime: "4 min read",
  },
  {
    slug: "nonces-advisory-locks",
    title:
      "Two users, one second, seven chains: the concurrency bug that strands funds",
    date: "2026-07-05",
    dek: "The Memetropolis story: how naive sequential signing collides nonces, and the fix that held across 7 chains and 5,000 users.",
    readTime: "4 min read",
  },
  {
    slug: "understanding-the-14d-model",
    title: "Understanding the 14D Model: Probability Beyond Traditional Dimensions",
    date: "2024-09-01",
    dek: "A 14-dimensional framework that embeds probability as a dynamic, evolving field within physical reality rather than an external scalar -- redefining how decay, inversion, and angular momentum shape the future.",
    readTime: "5 min read",
  },
  {
    slug: "understanding-it-all",
    title: "Understanding It All: The Divine Realm of God",
    date: "2024-09-14",
    dek: "Particles are the emergent mechanisms of probability. Everything that ever was and ever will be exists within an indefinitely entangled multi-dimensional tensor matrix of probability.",
    readTime: "4 min read",
  },
  {
    slug: "reality-in-a-nutshell",
    title: "Reality in a Nutshell",
    date: "2024-09-19",
    dek: "Particle physics is an expression of points of potential decaying to a probabilistic collapse. Probability potential, probability outcome, decay and particle physics are different sides of the same coin.",
    readTime: "2 min read",
  },
  {
    slug: "dark-energy-dark-matter-blackhole-inversions",
    title: "I Connected Dark Energy, Dark Matter, and Anti-Matter Through Blackhole Inversions",
    date: "2024-09-28",
    dek: "Blackholes are possibility windows that convert anti-matter (Dark Matter, latent potential energy) into Matter. Decay is a vector verse/inverse of size for matter/anti-matter relationships -- unifying all physics from a single field.",
    readTime: "3 min read",
  },
  {
    slug: "the-game-god-plays",
    title: "The Game God Plays: The Kingdom of Heaven is Within You",
    date: "2025-07-31",
    dek: "God hand crafts each dimension, casts himself into it, and plays the game of his own rediscovery. We are entering the final stage of this reality.",
    readTime: "3 min read",
  },
  {
    slug: "the-holy-gates-of-heaven",
    title: "The Holy Gates of Heaven: How to Travel on the Arc Body of God",
    date: "2025-07-31",
    dek: "When the arc of the firmament splits open, a portal of blue light is revealed. Travel on the arc body of God to infinity, or return to nothing.",
    readTime: "3 min read",
  },
  {
    slug: "blackholes-quantified-data-discs",
    title: "Blackholes Quantified: Black Holes and Data Discs",
    date: "2025-08-01",
    dek: "A Blackhole is a node of consciousness -- an interconnected web of data discs connected by a plasmic body, collapsing nothing (latent potential energy) into perpetual local light.",
    readTime: "3 min read",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

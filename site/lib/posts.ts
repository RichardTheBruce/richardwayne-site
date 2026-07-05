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
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

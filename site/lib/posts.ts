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

// Published research shown at the top of /writing. The block renders
// nothing while this array is empty (same hidden-when-empty pattern as
// the placeholder social URLs in lib/site.ts). Richard fills in the
// SSRN papers here.
export const research: ResearchPaper[] = [];

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

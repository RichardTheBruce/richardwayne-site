import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const post = getPost("nonces-advisory-locks")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
  alternates: {
    canonical: "https://richardthebruce.com/writing/nonces-advisory-locks",
  },
};

export default function NoncesAdvisoryLocksPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            author: { "@type": "Person", name: "Richard Wayne" },
            description: post.dek,
          }),
        }}
      />
      <PostArticle post={post}>
        <p>
          Launching a token on one chain is a solved problem. Launching the
          same token across 7 chains at once, with liquidity and state
          that stay coherent, is not. Memetropolis, the OFT launchpad I
          founded on LayerZero, found that out the hard way during early
          testing, and the bug that surfaced is one almost every
          multi-chain team hits eventually.
        </p>
        <p>
          The naive version of a launchpad backend signs transactions
          sequentially: fetch the current nonce for an address, build the
          transaction, sign it, send it, move to the next request. That
          works fine with one user. It works fine in a demo. It falls
          apart the moment two users hit the launchpad in the same second,
          because both requests fetch the same nonce before either
          transaction lands. One of the two signed transactions is now
          invalid the instant it reaches the mempool, and depending on
          timing, the result ranges from a failed transaction to funds
          that get stranded mid-flow across a chain boundary.
        </p>
        <p>
          This is not a rare edge case at any real scale. At 5,000 users
          across 7 EVM chains, the same-second collision is not a
          hypothetical, it is Tuesday. &quot;Works in the demo&quot; and
          &quot;works at 100 concurrent users&quot; are different
          engineering problems, and the gap between them is exactly where
          projects that raised real money quietly die.
        </p>
        <p>
          The fix that held for Memetropolis was not a fancier queue or a
          bigger server. It was three layers of correctness stacked
          together: Postgres advisory locks to serialize access to shared
          state at the database level, per-address chain locks so two
          requests for the same address on the same chain cannot race each
          other, and nonces that get fetched fresh at the moment of
          signing rather than cached anywhere upstream. None of these
          three alone fixes the problem. Together, they make the
          collision structurally impossible instead of merely unlikely.
        </p>
        <p>
          The broader principle is one I apply to every system I build
          now, agentic or not: code that only works when requests arrive
          one at a time is not production code, no matter how clean the
          demo looks. Real usage is concurrent by default. If the
          concurrency story is not designed in from the start, it shows up
          later as stranded funds, corrupted state, or a support queue
          full of &quot;where did my transaction go.&quot; Cheaper to solve
          it once, correctly, before the second user ever shows up.
        </p>
      </PostArticle>
    </>
  );
}

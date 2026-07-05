import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const post = getPost("agents-that-cannot-lie")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
};

export default function AgentsThatCannotLiePost() {
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
          I asked my card&apos;s agent to freeze itself. It said done. It
          had done nothing. That bug is the entire AI agent industry in one
          sentence: execution claimed, execution not proven.
        </p>
        <p>
          That failure is why AFI, the agentic bank I am building,
          treats intent and execution as two separate layers instead of
          one. When you tell your card&apos;s agent to do something, that
          request becomes an intent: pending, unconfirmed, worth exactly
          nothing on its own. The agent is free to reason about it, plan
          around it, even talk about it. None of that is the thing itself.
        </p>
        <p>
          The thing itself is execution, and execution has one and only
          one proof: a confirmed on-chain transaction hash. Not a log line
          the agent wrote about itself. Not a status field the agent set
          to &quot;done.&quot; A hash that an independent chain confirmed,
          that anyone can verify, that the agent cannot fabricate because
          it does not control consensus. Until that hash exists, the
          lifecycle sits at pending. Once it exists, the state moves to
          confirmed. For money movements specifically, there is a third
          state after that: settled, meaning a payout hash closed the loop
          on the other side too.
        </p>
        <p>
          This sounds like a small distinction until you have handed an
          agent real money and real card rails. Then it is the whole
          architecture. The agent runtime executes its decision loop
          hundreds of times a day. Every action it takes gets logged.
          Every flag that lets it touch a risky path is kill-switched, so
          a bad decision can be cut off mid-flight instead of discovered
          after the fact. None of that observability matters, though, if
          the underlying claim of &quot;I did it&quot; is self-reported.
          Observability watches an agent. Proof constrains what the agent
          is even capable of claiming.
        </p>
        <p>
          This is not specific to banking. Anyone wiring an LLM to a real
          action, a payment, an infrastructure change, a database write,
          is one prompt injection or one confident hallucination away from
          the same bug I hit. The fix is not a smarter model. It is
          refusing to let the model be the source of truth about its own
          execution. Make the claim externally verifiable, or do not let
          the agent touch anything that matters.
        </p>
        <p>
          If you are giving an agent the keys to anything real, the
          question is not &quot;how smart is it.&quot; It is &quot;what
          makes its claims unfakeable.&quot;
        </p>
      </PostArticle>
    </>
  );
}

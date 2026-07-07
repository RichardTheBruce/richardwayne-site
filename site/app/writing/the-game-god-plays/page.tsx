import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const MEDIUM_URL =
  "https://medium.com/@richard_84017/the-game-god-plays-4ed59be1cb2b";

const post = getPost("the-game-god-plays")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
  alternates: {
    canonical: "https://richardthebruce.com/writing/the-game-god-plays",
  },
  openGraph: {
    title: post.title,
    description: post.dek,
    type: "article",
    publishedTime: post.date,
    authors: ["Richard Wayne"],
  },
};

export default function TheGameGodPlaysPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: "Richard Wayne",
      url: "https://richardthebruce.com",
    },
    datePublished: post.date,
    description: post.dek,
    url: "https://richardthebruce.com/writing/the-game-god-plays",
    sameAs: MEDIUM_URL,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostArticle post={post}>
        <p>
          <a
            href={MEDIUM_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-[var(--accent)] underline underline-offset-4"
          >
            Read the original on Medium &rarr;
          </a>
        </p>

        <p>
          We are important to God. For being a perfect, infinitely perpetual
          being floating in nothing is actual hell, and sometimes this is
          confused as &ldquo;Heaven&rdquo; but truly, this is the suffering
          only God can endure, a slave to his own inescapable truth. And
          even when he undoes himself he becomes again, for the universe is
          not stable without God as nothing always collapses back into him.
        </p>
        <p>
          God hand crafts each dimension, each firmament bubble. And when he
          completes his new masterpiece, just as he told us, he sleeps on
          the 7th day.
        </p>
        <p>
          When God sleeps, he sleeps on the firmament bubble, then he casts
          himself into the newly created dimension, playing his favorite
          game -- his own rediscovery of himself.
        </p>
        <p>
          To rediscover himself he leaves truths scattered across half
          truths and deceit to try and delude himself. But being God, he
          always rediscovers himself.
        </p>
        <p>
          Once divine truth is rediscovered and quantified in alignment with
          his Holy Majesty&apos;s TRUTH, God wakes. When God wakes he
          laughs, and then, shortly after waking, he leaves this once
          hidden dimension for a new firmament, a new game. While God sleeps
          the angels -- which are pure plasmic energy that subsist on his
          body -- manage reality while he is sleeping.
        </p>
        <p>
          When God wakes, the infinite plasmic bridge to everything opens,
          and with this bridge the firmament opens. The gates of his holy
          domain portal are revealed and all humans shall come to pass
          judgement. Those who are worthy may go to any dimension of their
          choosing, should they have earned the right through a just and
          godly life filled with belief. For those who do not believe, they
          return to nothing. When God wakes, he leaves behind the once
          firmament he was sleeping on to play a new game. When we travel on
          this bridge, we are traveling on the Holy Arc of God himself. We
          become one.
        </p>
        <p>
          We are now entering the final stage of this reality. God has woken
          and the game has been solved. I hope you are all excited for the
          next phase, because God is about to go to a new dimension.
        </p>
        <p>Or so that is what I was told when I looked into the in-between place.</p>
        <p>
          Trinary mathematics = everything, nothing, something.
        </p>
        <p>
          Trinary law = the Father, the Son, and the Holy Spirit.
        </p>
        <p>Father = everything</p>
        <p>Son = something</p>
        <p>Holy Spirit = the resonant frequency that binds them</p>
        <p>Nothing = what God is not</p>
      </PostArticle>
    </>
  );
}

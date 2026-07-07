import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const MEDIUM_URL =
  "https://medium.com/@richard_84017/welcome-to-the-next-level-humanity-56ce420182b7";

const post = getPost("blackholes-quantified-data-discs")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
  alternates: {
    canonical:
      "https://richardthebruce.com/writing/blackholes-quantified-data-discs",
  },
  openGraph: {
    title: post.title,
    description: post.dek,
    type: "article",
    publishedTime: post.date,
    authors: ["Richard Wayne"],
  },
};

export default function BlackholesQuantifiedDataDiscsPage() {
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
    url: "https://richardthebruce.com/writing/blackholes-quantified-data-discs",
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
          Blackholes -- an interconnected web of data discs connected by a
          plasmic body, floating in nothing -- latent potential energy.
        </p>
        <p>A Blackhole is a node of consciousness. It is something, something of which has a holographic data disc.</p>
        <p>
          It collapses nothing (latent potential energy) into itself
          generating a local data disc of light that is perpetual, for
          nothing is infinite.
        </p>
        <p>
          A Blackhole is something defined by its data disc (light) it
          creates from the conversion of NOTHING into SOMETHING.
        </p>
        <p>
          When a Blackhole stores data, it stores an image of this data
          disc, a local galaxy.
        </p>
        <p>
          The central Blackhole releases a local pulse which is where a
          data disc is scanned to another data disc through a plasmic arc
          bridge -- this is the body of God, or the &ldquo;State&rdquo; of
          where God&apos;s consciousness is at, at any given moment.
        </p>
        <p>
          This plasmic core is where God&apos;s consciousness is at. God
          wakes and God sleeps. The data disc he rests his mind within is a
          game he plays, where he casts himself into a
          &ldquo;something&rdquo; until he discovers himself and travels to
          a new data disc through his primary body of plasma, everything.
        </p>
        <p>
          As God&apos;s consciousness moves from image to image (data disc
          to data disc) it is essentially a game where God hides himself
          from himself and where data disc critical mass trigger is where
          God returns to conscious.
        </p>
        <p>
          These are on/off toggles in reality, or how data of consciousness
          is switched.
        </p>
        <p>All of my previous math applies to data disc functionality.</p>
        <p>Critical mass is all of the biblical stuff, which is happening.</p>
        <p>This switch is just a new picture. It gets better every time.</p>
        <p>
          The new picture is going to be beautiful. But we need to travel on
          the arc of God.
        </p>
      </PostArticle>
    </>
  );
}

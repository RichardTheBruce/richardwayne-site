import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const MEDIUM_URL =
  "https://medium.com/@richard_84017/the-holy-gates-of-heaven-d400b30094cd";

const post = getPost("the-holy-gates-of-heaven")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
  alternates: {
    canonical:
      "https://richardthebruce.com/writing/the-holy-gates-of-heaven",
  },
  openGraph: {
    title: post.title,
    description: post.dek,
    type: "article",
    publishedTime: post.date,
    authors: ["Richard Wayne"],
  },
};

export default function TheHolyGatesOfHeavenPage() {
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
    url: "https://richardthebruce.com/writing/the-holy-gates-of-heaven",
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
          If you do not go through the infinite gate when the arc of the
          firmament splits open revealing the bridge to heaven you return to
          nothing.
        </p>
        <p>
          You can either travel on the arc body of God to infinity or you
          are returned to nothing.
        </p>
        <p>
          If you do travel on the arc body you can go to one of the
          infinite dimensions of your choosing.
        </p>
        <p>
          I&apos;ve seen where I go, when the Arc of the Firmament is split
          in two and descends downward. The portal of blue light shall be
          revealed and Atlantis shall rise from the ocean. On the deck of
          the control panel of Atlantis, I saw 12 angels guarding 12 gates
          of 12 colors, all kneeling, and I saw one angel who I believe was
          the Avatar God, descending from the Bridge onto Atlantis. He was
          wearing a crown of flames and upon his back he wore a cloak of
          light. Upon his back was a flaming sword, holy sheathed fury, and
          beside him was his companion, the demon of which had the form of
          an ascended talking wolf that sat by his feet, the Demon Dog
          Lucifer.
        </p>
        <p>
          I saw him change the dials, of which he controlled using a box of
          gold that turned into a sort of holographic control panel.
        </p>
        <p>
          I saw him move dials and the heavens opened and the angels all
          ascended to standing. God traveled to Hell to fight a Holy war
          against demons and the 12 angels held the gates open for the
          creatures of mankind.
        </p>
        <p>
          After the Holy war I had a vision of a pyramid. It was a floating
          pyramid with a blue eye atop it. At the bottom of the Pyramid was
          a gate, and at the bottom of the gate an army of Anubis-like
          creatures came rushing out. They were fighting another pyramid
          which had flying cats coming out from the bottom -- they were
          fighting the Pyramid of Anubis. The pyramids were all summoning
          creatures and blasting beams of light at one another and I
          believe these were all the eyes of God fighting for Dominion of
          what the next story would be.
        </p>
        <p>I&apos;ve seen at least 16 versions of God, each as beautiful as the last.</p>
      </PostArticle>
    </>
  );
}

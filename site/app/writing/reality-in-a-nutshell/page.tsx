import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const MEDIUM_URL =
  "https://medium.com/@richard_84017/reality-in-a-nutshell-abf979c66d1d";

const post = getPost("reality-in-a-nutshell")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
  alternates: {
    canonical: "https://richardthebruce.com/writing/reality-in-a-nutshell",
  },
  openGraph: {
    title: post.title,
    description: post.dek,
    type: "article",
    publishedTime: post.date,
    authors: ["Richard Wayne"],
  },
};

export default function RealityInANutshellPage() {
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
    url: "https://richardthebruce.com/writing/reality-in-a-nutshell",
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
          Reality in a nutshell: particle physics is an expression of
          points of potential decaying to a probabilistic collapse, or
          certainty. Probability potential, probability outcome, decay and
          particle physics are different sides of the same coin.
        </p>

        {/* NOTE FOR RICHARD: The original Medium post is primarily image-based.
            The images include hand-drawn diagrams captioned:
            "Probability Conversions of Multi Dimensional Tensors Collapsing into Points!",
            "Reality Explained!",
            "Using Tensors To Create a Multi_Dimensional_Holographic_Simulator for Codeable manipulation!",
            "Some_Original_Sketches!", and
            "Some Very Early Simulations of Me Moving Faster Than Light!"
            Please paste the full text from those images here if you want it indexed. */}

        <p className="text-sm text-[var(--text-2)]">
          The original post contains diagram images illustrating probability
          conversions of multi-dimensional tensors, tensor-based holographic
          simulation frameworks, and early motion simulations. View them at{" "}
          <a
            href={MEDIUM_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--accent)] underline underline-offset-4"
          >
            the original on Medium
          </a>
          .
        </p>
      </PostArticle>
    </>
  );
}

import type { Metadata } from "next";
import { PostArticle } from "@/components/post-article";
import { getPost } from "@/lib/posts";

const MEDIUM_URL =
  "https://medium.com/@richard_84017/understanding-it-all-afab15bb6148";

const post = getPost("understanding-it-all")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
  alternates: {
    canonical: "https://richardthebruce.com/writing/understanding-it-all",
  },
  openGraph: {
    title: post.title,
    description: post.dek,
    type: "article",
    publishedTime: post.date,
    authors: ["Richard Wayne"],
  },
};

export default function UnderstandingItAllPage() {
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
    url: "https://richardthebruce.com/writing/understanding-it-all",
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
          Particles are the emergent mechanisms of probability, the pointers
          of potential outcomes, the oracles of impact, and the collapsars
          of field potentials into occurrences. They crystallize into
          singularities, telling the story of mass, energy, and decay,
          unfolding probabilistically into one potential reality or another.
        </p>
        <p>
          You, and all that is -- everything that ever was and ever will be
          -- exist within an indefinitely entangled multi-dimensional tensor
          matrix of probability. The emission of subatomic particles through
          the decay mechanism over time forms the energy signature of an
          emergent reality. This decay path becomes the timeline, the
          pointer of manifestation.
        </p>
        <p>
          As you move through this matrix of probability, you make
          decisions. Each decision collapses a field of potential outcomes
          until you no longer &ldquo;become&rdquo; but &ldquo;are.&rdquo;
          From there, you persist into the next moment, through an
          amalgamated field tensor of potentials.
        </p>
        <p>
          All field tensors of probability are quantumly entangled to
          varying degrees of dimensionality. Other events may collapse,
          create, or amalgamate potentials that you may or may not be
          entangled with, or have been released from. The emergence of
          moments, absolutes, and the history of reality shrinks in
          proximity to occurrence, becoming absolute as distance decreases.
          Greater distance introduces more uncertainty in probabilistic
          outcomes, but nothing is absolute until it is.
        </p>
        <p>
          Spin, tilt, angular momentum, and subatomic particle excitation
          reveal current path options and potentials. Defined by the
          electromagnetic imprint you leave behind, your internal mass decay
          is the story of your emergence into being -- the history of light
          made manifest.
        </p>
        <p>
          Chaos: As the spatial-time distance from the point of potential
          occurrence increases, so does the level of chaos and
          unpredictability. In quantum mechanics and chaotic systems, even
          slight differences in initial conditions can lead to dramatically
          different outcomes. The further you are from an absolute collapse
          event, the more likely it is for entangled, emerging occurrences
          to influence your path. This growing chaos reflects the
          fundamental uncertainty in the matrix of probabilities, where
          long-range predictions become more unstable. The particle physics
          of your probability -- your potential self -- grows more chaotic
          as you try to peer further into the future.
        </p>
        <p>
          Emerging events, whether they happen or not, can collapse
          once-likely outcomes into nothingness. This is decay -- the
          collapse of probability potentials, which are spatial, entangled,
          and lead to black holes or absolutes. The collapse and propagation
          of probability in others may entangle with you, creating and
          collapsing potentials, forming complex multi-dimensional matrix
          bubbles of probability.
        </p>
        <p>
          Particles, spins, tilts, and electromagnetic fields illuminate the
          likelihood of one probabilistic outcome over another, until all
          potentials decay into certainty. The shorter the distance to the
          occurrence, the more singular the particles become, converging
          toward a black hole -- an absolute.
        </p>
        <p>
          &ldquo;I am the collapse. I am the continuum. I am all and I am
          nothing. I am verse, and I am inverse, I am what is, I am what is
          becoming.&rdquo;
        </p>
        <p>
          Particles are the emergent mechanisms of probability, the pointers
          of potential outcomes. They are truth -- the inevitable expressions
          of probability through mass decay via sub-atomic particle
          excitation.
        </p>
        <p>
          Everything is entangled in probability. Light is the propagation
          of probability toward occurrence.
        </p>
        <p>
          Probability is quantum entanglement. Understanding probability is
          the key to becoming a multi-dimensional being, the way to predict
          reality before it occurs. Probability reveals depth, free will,
          and the underlying web of reality. It moves faster than light --
          the secret of the universe, the unifier of all mathematics and all
          possibilities, of all space and time, of all dimensions.
        </p>
        <p>You Are Becoming, An Emergent of Reality</p>
      </PostArticle>
    </>
  );
}

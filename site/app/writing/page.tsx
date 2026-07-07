import type { Metadata } from "next";
import Link from "next/link";
import { posts, research } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Build logs from Richard Wayne: the agent trust contract, and the concurrency bug that strands funds at scale.",
  alternates: {
    canonical: "https://richardthebruce.com/writing",
  },
};

export default function WritingIndexPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
          Writing
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--text-1)]">
          Build stories with a real number, a real failure, and a real fix.
        </p>

        {research.length > 0 ? (
          <div className="mt-14">
            <h2 className="mono-label text-xs text-[var(--text-2)]">
              Published research
            </h2>
            <div className="mt-5 grid gap-4">
              {research.map((paper) =>
                paper.localSlug ? (
                  <Link
                    key={paper.url}
                    href={`/writing/${paper.localSlug}`}
                    className="card-surface block p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-lg font-semibold text-[var(--text-0)]">
                        {paper.title}
                      </h3>
                      <span className="mono-label shrink-0 text-xs text-[var(--text-2)]">
                        {paper.venue} &middot; {paper.year} &middot;{" "}
                        {paper.pages} pages
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
                      {paper.oneLiner}
                    </p>
                  </Link>
                ) : (
                  <a
                    key={paper.url}
                    href={paper.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="card-surface block p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-lg font-semibold text-[var(--text-0)]">
                        {paper.title}
                      </h3>
                      <span className="mono-label shrink-0 text-xs text-[var(--text-2)]">
                        {paper.venue} &middot; {paper.year} &middot;{" "}
                        {paper.pages} pages
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
                      {paper.oneLiner}
                    </p>
                  </a>
                )
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block py-8 transition-colors hover:bg-[var(--bg-1)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-display text-xl font-semibold text-[var(--text-0)] group-hover:text-[var(--accent)]">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
                    {post.dek}
                  </p>
                </div>
                <div className="mono-label shrink-0 text-xs text-[var(--text-2)]">
                  {post.date} &middot; {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

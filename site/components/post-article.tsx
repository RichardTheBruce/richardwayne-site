import Link from "next/link";
import type { ReactNode } from "react";
import type { Post } from "@/lib/posts";

export function PostArticle({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) {
  return (
    <article className="py-20 sm:py-28">
      <div className="container-page max-w-2xl">
        <Link
          href="/writing"
          className="mono-label text-xs text-[var(--text-2)] transition-colors hover:text-[var(--text-0)]"
        >
          &larr; All writing
        </Link>

        <header className="mt-6">
          <p className="mono-label text-xs text-[var(--text-2)]">
            {post.date} &middot; {post.readTime}
          </p>
          <h1 className="font-display mt-4 text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-tight tracking-tight text-[var(--text-0)]">
            {post.title}
          </h1>
        </header>

        <div className="post-body mt-10 space-y-6 text-base leading-relaxed text-[var(--text-1)]">
          {children}
        </div>

        <footer className="mt-16 border-t border-[var(--border)] pt-8">
          <p className="text-sm text-[var(--text-1)]">
            Building something in this space?{" "}
            <a
              href="mailto:richardthebrucewayne@gmail.com"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              richardthebrucewayne@gmail.com
            </a>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              /contact
            </Link>
            .
          </p>
        </footer>
      </div>
    </article>
  );
}

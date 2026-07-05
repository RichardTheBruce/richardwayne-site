import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <svg width="120" height="24" viewBox="0 0 120 24" aria-hidden="true">
        <path
          d="M2 12C20 2, 40 22, 60 12S100 2, 118 12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="font-display mt-8 text-4xl font-semibold text-[var(--text-0)]">
        404
      </h1>
      <p className="mt-3 max-w-sm text-sm text-[var(--text-1)]">
        This page does not exist. Everything else does.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back home
      </Link>
    </section>
  );
}

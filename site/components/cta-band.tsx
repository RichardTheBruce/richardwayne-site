import Link from "next/link";

export function CtaBand({
  heading,
  body,
  buttonLabel,
  buttonHref,
}: {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <section className="container-page py-24">
      <div className="rounded-[var(--radius-card)] border border-[var(--accent)]/40 bg-[var(--bg-1)] px-8 py-16 text-center sm:px-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--text-0)] sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-1)]">
          {body}
        </p>
        <div className="mt-8">
          <Link href={buttonHref} className="btn btn-primary magnetic-btn">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

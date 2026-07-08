import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-b border-[var(--border)] py-24 sm:py-32">
      <div className="container-page">
        <h2 className="font-display max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-[var(--text-0)]">
          What clients say
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card-surface flex flex-col gap-4 p-8">
              <p className="text-base leading-relaxed text-[var(--text-1)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-[var(--text-0)]">{t.name}</p>
                <p className="mono-label text-xs text-[var(--text-2)]">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

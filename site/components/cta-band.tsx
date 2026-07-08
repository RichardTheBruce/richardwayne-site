"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_LINK } from "@/lib/site";
import { MagneticLink } from "@/components/magnetic-link";

export function CtaBand({
  heading,
  body,
  buttonLabel,
  buttonHref: _buttonHref,
}: {
  heading: string;
  body: string;
  buttonLabel: string;
  /** No longer navigated to. Kept in the prop signature so call sites do not break. */
  buttonHref?: string;
}) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "build-call" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#0D90FF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section className="container-page py-24">
      <div className="rounded-[var(--radius-card)] border border-[var(--accent)]/40 bg-[var(--bg-1)] px-8 py-16 text-center sm:px-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--text-0)] sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-1)]">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            data-cal-namespace="build-call"
            data-cal-link={CAL_LINK}
            data-cal-config='{"layout":"month_view"}'
            className="btn btn-primary"
          >
            {buttonLabel}
          </button>
          <MagneticLink href="/contact" className="text-sm text-[var(--text-2)] underline underline-offset-4 hover:text-[var(--text-1)]">
            Or send a message
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

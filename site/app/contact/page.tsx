import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { CalBookingButton } from "@/components/cal-booking-button";
import { getVisibleChannels, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "30-minute scope call with Richard Wayne: cross-chain infrastructure, LayerZero V2, Circle CCTP, on-chain agents. Book directly or send a note and get a reply within one business day.",
  alternates: {
    canonical: "https://richardthebruce.com/contact",
  },
};

export default function ContactPage() {
  const channels = getVisibleChannels();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <h1 className="font-display max-w-2xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
          Book a call or send a note.
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--text-1)]">
          30 minutes: you describe the problem, I tell you honestly whether I am the right builder and what I would do first.
        </p>

        {/* Primary: Cal.com booking */}
        <div className="mt-10 card-surface p-8 sm:p-10 max-w-lg">
          <p className="mono-label text-xs text-[var(--accent)]">Fastest path</p>
          <h2 className="font-display mt-3 text-xl font-semibold text-[var(--text-0)]">
            30-minute scope call
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
            Pick a time that works. No deck, no sales pitch: a technical conversation about your actual constraints.
          </p>
          <CalBookingButton className="btn btn-primary mt-6 w-full sm:w-auto">
            Book a scope call
          </CalBookingButton>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Secondary: contact form */}
          <div className="relative">
            <p className="mono-label mb-6 text-xs text-[var(--text-2)]">Or send a note</p>
            <ContactForm />
          </div>

          <div>
            <p className="mono-label text-xs text-[var(--text-2)]">
              Direct channels
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                <span className="text-sm text-[var(--text-1)]">{site.email}</span>
                <CopyEmailButton email={site.email} />
              </li>
              {channels.map((channel) => (
                <li
                  key={channel.href}
                  className="border-b border-[var(--border)] pb-4"
                >
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-[var(--text-1)] transition-colors hover:text-[var(--text-0)]"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-[var(--text-2)]">
              Prefer async? Email gets answered within one business day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

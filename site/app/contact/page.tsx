import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { getVisibleChannels, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Richard Wayne what you are building. Direct channels: email, LinkedIn, GitHub, and a contact form that replies within one business day.",
};

export default function ContactPage() {
  const channels = getVisibleChannels();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <h1 className="font-display max-w-2xl text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-tight text-[var(--text-0)]">
          Tell me what needs to exist.
        </h1>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative">
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

            {site.calendar ? (
              <a href={site.calendar} className="btn btn-secondary mt-6 w-full">
                Book a 30-minute scope call
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

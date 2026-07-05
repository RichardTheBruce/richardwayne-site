import Link from "next/link";
import { getVisibleChannels, site } from "@/lib/site";

const workLinks = [
  { label: "AFI", href: "/work/afi" },
  { label: "Memetropolis", href: "/work/memetropolis" },
  { label: "Omni-X", href: "/work/omni-x" },
  { label: "Federal-scale PPE supplier", href: "/work/federal-ppe" },
];

export function SiteFooter() {
  const channels = getVisibleChannels();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-1)]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold text-[var(--text-0)]">
            Richard Wayne
          </p>
          <p className="mt-3 max-w-sm text-sm text-[var(--text-1)]">
            Founding engineer for AI agents, cross-chain infrastructure, and
            full-stack builds that hold at 100K users.
          </p>
        </div>

        <div>
          <p className="mono-label text-xs text-[var(--text-2)]">Work</p>
          <ul className="mt-4 space-y-3">
            {workLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--text-1)] transition-colors hover:text-[var(--text-0)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label text-xs text-[var(--text-2)]">Channels</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[var(--text-1)] transition-colors hover:text-[var(--text-0)]"
              >
                Email
              </a>
            </li>
            {channels.map((channel) => (
              <li key={channel.href}>
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
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-[var(--text-2)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Richard Wayne. All rights reserved.</p>
          <p className="mono-label">Built and operated solo.</p>
        </div>
      </div>
    </footer>
  );
}

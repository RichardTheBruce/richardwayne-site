"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/nav";
import { ChannelIcons } from "@/components/channel-icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-0)]/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-[var(--text-0)]"
            onClick={() => setOpen(false)}
          >
            RW<span className="text-[var(--accent)]">·</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-1)] transition-colors hover:text-[var(--text-0)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ChannelIcons />
            <Link href="/contact" className="btn btn-primary">
              Book a build call
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[var(--text-0)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4L18 18M18 4L4 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 6H20M2 11H20M2 16H20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Rendered as a sibling of <header>, not a descendant. The header
          has backdrop-blur, which makes it a containing block for
          position:fixed children under the CSS spec, trapping a nested
          fixed overlay inside the header's own stacking context instead
          of painting above the whole page. Keeping this outside <header>
          avoids that. */}
      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[60] flex flex-col bg-[var(--bg-0)] md:hidden">
          <nav
            className="container-page flex flex-1 flex-col gap-1 pt-6"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-[var(--border)] py-4 text-xl font-display text-[var(--text-0)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-primary mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Book a build call
            </Link>
            <div className="mt-6 flex justify-center">
              <ChannelIcons />
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

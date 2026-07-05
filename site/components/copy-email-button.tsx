"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; silently no-op, the email is still
      // visible as plain text for manual copy.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mono-label shrink-0 text-xs text-[var(--accent)] transition-colors hover:text-[var(--text-0)]"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------

type ToastState = "idle" | "visible" | "fading";

function EmailToast({ state }: { state: ToastState }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        pointerEvents: "none",
        // fade + slide
        opacity: state === "visible" ? 1 : 0,
        transform:
          state === "visible" ? "translateY(0)" : "translateY(0.5rem)",
        transition:
          state === "fading"
            ? "opacity 0.3s ease, transform 0.3s ease"
            : "opacity 0.18s ease, transform 0.18s ease",
        // on-brand surface
        background: "var(--bg-2)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-button, 8px)",
        padding: "0.625rem 0.875rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        minWidth: "min(18rem, calc(100vw - 3rem))",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* accent dot */}
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-1)",
          lineHeight: 1.4,
        }}
      >
        Email copied,{" "}
        <span style={{ color: "var(--text-0)" }}>{site.email}</span>
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared copy logic
// ---------------------------------------------------------------------------

function useCopyEmail() {
  const [toastState, setToastState] = useState<ToastState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async () => {
    // Graceful fallback when clipboard API is unavailable
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
      } else {
        const el = document.createElement("textarea");
        el.value = site.email;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch {
      // If both paths fail, the toast still shows but copy silently failed.
    }

    // Clear any previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    setToastState("visible");
    timerRef.current = setTimeout(() => {
      setToastState("fading");
      timerRef.current = setTimeout(() => setToastState("idle"), 320);
    }, 2200);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { toastState, copy };
}

// ---------------------------------------------------------------------------
// CopyEmailLink — replaces the plain anchor in footer + contact page
// ---------------------------------------------------------------------------

export function CopyEmailLink({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { toastState, copy } = useCopyEmail();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    copy();
  }

  return (
    <>
      <a
        href={`mailto:${site.email}`}
        onClick={handleClick}
        className={className}
        title="Click to copy. Right-click to open mail app."
      >
        {children ?? site.email}
      </a>
      {toastState !== "idle" && <EmailToast state={toastState} />}
    </>
  );
}

// ---------------------------------------------------------------------------
// CopyEmailIcon — wraps the mail icon in ChannelIcons
// ---------------------------------------------------------------------------

export function CopyEmailIcon({
  className = "",
  children,
  label = "Email Richard",
}: {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  const { toastState, copy } = useCopyEmail();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    copy();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={`${label} — click to copy address`}
        className={className}
      >
        {children}
      </button>
      {toastState !== "idle" && <EmailToast state={toastState} />}
    </>
  );
}

// ---------------------------------------------------------------------------
// CopyEmailButton — small inline "Copy" button (used on contact page)
// ---------------------------------------------------------------------------

export function CopyEmailButton({ email: _email }: { email: string }) {
  const { toastState, copy } = useCopyEmail();

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="mono-label shrink-0 text-xs text-[var(--accent)] transition-colors hover:text-[var(--text-0)]"
      >
        {toastState === "visible" || toastState === "fading" ? "Copied" : "Copy"}
      </button>
      {toastState !== "idle" && <EmailToast state={toastState} />}
    </>
  );
}

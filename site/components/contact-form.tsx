"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const budgetOptions = [
  "Under $5K",
  "$5K to $15K",
  "$15K to $50K",
  "$50K+",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "error";

function buildMailtoHref(fields: {
  name: string;
  email: string;
  company: string;
  message: string;
  budget: string;
}) {
  const subject = encodeURIComponent(`New build inquiry from ${fields.name}`);
  const bodyLines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Company: ${fields.company}` : null,
    fields.budget ? `Budget: ${fields.budget}` : null,
    "",
    fields.message,
  ].filter((line): line is string => Boolean(line));
  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
      budget: String(data.get("budget") || ""),
      website: String(data.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const json = await res.json();

      if (json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      if (json.fallback === "mailto") {
        setMailtoHref(buildMailtoHref(fields));
        setStatus("error");
        setErrorMessage(
          "Email delivery is not configured yet. Use the button below to send directly."
        );
        return;
      }

      setStatus("error");
      setErrorMessage(json.error || "Something went wrong. Try again.");
    } catch {
      setMailtoHref(buildMailtoHref(fields));
      setStatus("error");
      setErrorMessage(
        "Could not reach the server. Use the button below to send directly."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="card-surface p-8">
        <p className="font-display text-lg font-semibold text-[var(--text-0)]">
          Sent.
        </p>
        <p className="mt-2 text-sm text-[var(--text-1)]">
          I reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field, hidden from real visitors via CSS, not display:none
          so it still receives bot autofill. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mono-label text-xs text-[var(--text-2)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-1)] px-4 py-3 text-sm text-[var(--text-0)] outline-none transition-colors focus:border-[var(--accent)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="mono-label text-xs text-[var(--text-2)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-1)] px-4 py-3 text-sm text-[var(--text-0)] outline-none transition-colors focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mono-label text-xs text-[var(--text-2)]">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-1)] px-4 py-3 text-sm text-[var(--text-0)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mono-label text-xs text-[var(--text-2)]">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-1)] px-4 py-3 text-sm text-[var(--text-0)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>

      <div>
        <label htmlFor="budget" className="mono-label text-xs text-[var(--text-2)]">
          Budget
        </label>
        <select
          id="budget"
          name="budget"
          defaultValue={budgetOptions[budgetOptions.length - 1]}
          className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-1)] px-4 py-3 text-sm text-[var(--text-0)] outline-none transition-colors focus:border-[var(--accent)]"
        >
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary magnetic-btn w-full disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send it"}
      </button>

      {status === "error" ? (
        <div className="rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-1)] p-4">
          <p className="text-sm text-[var(--text-1)]">{errorMessage}</p>
          {mailtoHref ? (
            <a href={mailtoHref} className="btn btn-secondary mt-3">
              Open email instead
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

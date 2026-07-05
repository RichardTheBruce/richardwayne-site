import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  budget?: string;
  website?: string; // honeypot field, must stay empty
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// In-memory rate limit. Resets on server restart and is per-instance,
// which is an accepted tradeoff for a low-traffic lead-gen contact form.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, company, message, budget, website } = payload;

  // Honeypot: real visitors never fill this hidden field.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look valid." },
      { status: 400 }
    );
  }

  console.log("[contact] new lead", {
    name,
    email,
    company: company || null,
    budget: budget || null,
    message,
    ip,
    at: new Date().toISOString(),
  });

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json({ ok: false, fallback: "mailto" });
  }

  const fromAddress = process.env.CONTACT_FROM || "onboarding@resend.dev";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [site.email],
        reply_to: email,
        subject: `New build inquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          budget ? `Budget: ${budget}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[contact] resend send failed", await res.text());
      return NextResponse.json({ ok: false, fallback: "mailto" });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] resend send threw", error);
    return NextResponse.json({ ok: false, fallback: "mailto" });
  }
}

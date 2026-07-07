"use client";

/**
 * Hero video background + capability gate.
 *
 * Responsibilities:
 *  - Read capability ONCE on mount (client-only; SSR renders the poster so the
 *    page paints a correct frame with zero JS and no autoplay).
 *  - If the device/user should not autoplay motion (reduced-motion, coarse
 *    pointer / mobile, narrow viewport, or Save-Data), render ONLY the graded
 *    poster image. No <video>, no download, no autoplay.
 *  - Otherwise mount the looping, muted, graded clip as a pure background layer.
 *  - Re-evaluate if the user toggles reduced-motion mid-session.
 *
 * This replaces the WebGL folding-tensor hero. The asset is Richard's REAL
 * "That Is" render, color-graded to obsidian + electric blue (public/hero/*),
 * not a recreation.
 *
 * UX INVARIANT (this is why the previous hero was careful about the same thing):
 * the media is a PURE BACKGROUND layer. This wrapper and the <video> are
 * `pointer-events-none` and `select-none`, so the clip can never win a click, a
 * scroll, or a text selection. The hero copy, nav, and buttons layered on top
 * stay fully clickable and selectable. A scrim above the media keeps copy
 * contrast over the brightest part of the bloom.
 */

import { useEffect, useState } from "react";
import { getCapability } from "@/lib/capability";

const POSTER = "/hero/hero-poster.jpg";
const MP4 = "/hero/hero-graded.mp4";
const WEBM = "/hero/hero-graded.webm";

/** True when the browser signalled Save-Data (data-saver mode). SSR-safe. */
function prefersSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return conn?.saveData === true;
}

export function HeroVideo() {
  // Default to the still: SSR and first client paint show the poster, so there
  // is never a blank flash and reduced-motion visitors never see motion.
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const decide = () => {
      const cap = getCapability();
      // useStaticFallback already folds in reduced-motion, coarse pointer, and
      // narrow viewport. Add Save-Data. Any one of these keeps the poster.
      setPlayVideo(!cap.useStaticFallback && !prefersSaveData());
    };

    decide();

    // Honor a live reduced-motion toggle: re-read and swap to the poster.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", decide);
    return () => mq.removeEventListener?.("change", decide);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {playVideo ? (
        <video
          className="hero-video-layer absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          tabIndex={-1}
        >
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      ) : (
        // Reduced-motion / mobile / Save-Data: static graded frame, no autoplay.
        <div
          className="hero-video-layer absolute inset-0 h-full w-full bg-[var(--bg-0)] bg-cover bg-center"
          style={{ backgroundImage: `url(${POSTER})` }}
        />
      )}

      {/* Scrim: obsidian gradient over the media so the H1 + subhead + CTAs keep
          contrast over the brightest part of the bloom, and the field feathers
          into the page edges and bottom border. */}
      <div className="hero-video-scrim absolute inset-0" />
    </div>
  );
}

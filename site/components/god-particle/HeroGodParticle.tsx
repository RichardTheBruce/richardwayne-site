"use client";

/**
 * Hero folding-tensor mount + capability gate.
 *
 * Responsibilities:
 *  - Read capability ONCE on mount (client-only; SSR renders the static frame).
 *  - If the device/user should not run the sim (mobile, reduced-motion, no
 *    WebGL, low-end), render only the static fallback so the page stays fast.
 *  - Otherwise dynamic-import the R3F tensor scene (ssr:false) at the tier's
 *    plane count, layered UNDER a vignette so hero copy stays readable.
 *  - Re-evaluate if the user toggles reduced-motion mid-session.
 *
 * UX INVARIANT (this is why the previous particle hero failed): the WebGL canvas
 * is a PURE BACKGROUND layer. This wrapper is `pointer-events-none` and
 * `select-none`, and the scene NEVER re-enables pointer events. There is no
 * orbit, no scroll-dolly, no wheel handler anywhere in the tensor scene, so the
 * canvas can never capture clicks, scroll, or DOM selection. The hero text, nav,
 * and buttons on top stay fully clickable and selectable.
 *
 * The static fallback (obsidian + a faint blue core glow) always renders as the
 * base layer, so there is never a blank flash before the canvas mounts.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getCapability,
  PLANE_COUNT,
  type CapabilitySnapshot,
} from "@/lib/capability";

// Scene is client-only WebGL: never server-render it.
const TensorFoldScene = dynamic(() => import("./TensorFoldScene"), {
  ssr: false,
});

export function HeroGodParticle() {
  const [cap, setCap] = useState<CapabilitySnapshot | null>(null);

  useEffect(() => {
    setCap(getCapability());

    // Honor a live reduced-motion toggle: re-read and swap to fallback.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCap(getCapability());
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const runSim = cap != null && !cap.useStaticFallback;
  const count = cap ? PLANE_COUNT[cap.tier] : 0;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base layer: always-present static frame. Zero JS, obsidian + core glow.
          Reads as the tensor bloom at rest for fallback visitors. */}
      <div className="god-static-frame absolute inset-0" />

      {/* Live sim. The wrapper stays pointer-events-none (inherited): the canvas
          is a background layer only and must never win a click or a scroll. */}
      {runSim && count > 0 && (
        <div className="pointer-events-none absolute inset-0">
          <TensorFoldScene count={count} />
        </div>
      )}

      {/* Vignette: fades the bloom into the page and toward the bottom border so
          the hero copy keeps contrast over the brightest part of the core. */}
      <div className="god-vignette absolute inset-0" />
    </div>
  );
}

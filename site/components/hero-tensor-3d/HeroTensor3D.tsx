"use client";

/**
 * Interactive radial-tensor hero: mount + capability gate.
 *
 * Recreates Richard's "That Is" render as a LIVE, INTERACTIVE 3D object:
 * a STACK of individual RADIAL TENSOR NETWORKS (each a wireframe hub-and-spoke
 * line network out to a ring or sphere of nodes, plus node chords and orbital
 * rings, matching his Reality_Tensors "5 D / 10 D / 18 D / 36 D / 72 D / 144 D"
 * diagrams) nested concentrically and TELESCOPING along a shared axis: falling
 * into each other and spreading back out, cyclically, over a violet box field
 * and a receding dot-grid tunnel. There is NO discrete core ball: the bright
 * centre is emergent, just where the additive spokes converge and overlap. You
 * can drag to orbit, zoom in / out (wheel scoped to the object, pinch on touch,
 * plus +/- buttons), and it idle-spins on its own.
 *
 * CAPABILITY GATE (reuses lib/capability.ts):
 *  - reduced-motion / coarse-pointer / narrow / low-end / no-WebGL  ->  render
 *    the graded static poster (/hero/hero-poster.jpg). No canvas, zero JS cost.
 *  - capable desktop  ->  dynamic-import the R3F scene (ssr:false) at a
 *    tier-scaled petal count, fully interactive.
 *  - Re-reads on a live reduced-motion toggle.
 *
 * UX INVARIANTS (the previous interactive attempt was rejected for breaking
 * these; this wrapper enforces them structurally):
 *  1. The page ALWAYS scrolls. The scene never preventDefaults a page-scroll
 *     wheel; wheel-zoom is scoped to the object only (see TensorScene.Rig).
 *  2. The canvas sits at z-0, BELOW the hero copy (z-10 in page.tsx). The copy,
 *     nav, and buttons therefore always sit ABOVE the canvas and stay clickable.
 *     The canvas receives drag / zoom only in the open area around the bloom.
 *  3. Nothing text-highlights: the wrapper is select-none, and the hero content
 *     wrapper in page.tsx keeps its own select-none.
 *  4. The contrast scrim is pointer-events-none, so it never blocks either the
 *     drag underneath or the buttons above.
 */

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getCapability, PLANE_COUNT, type CapabilitySnapshot } from "@/lib/capability";
import type { ZoomBridge } from "./TensorScene";

// WebGL scene is client-only: never server-render it.
const TensorScene = dynamic(() => import("./TensorScene"), { ssr: false });

// How many tensors to STACK / telescope, derived from the tier map. Each tensor
// is a wireframe line network, so the cost scales with line overdraw and the
// number of stacked tensors, not with a plane count. A deeper stack reads as a
// longer telescoping barrel; we keep it in a sane range so the additive line
// overdraw stays cheap. 0 stays 0 (static fallback).
function tensorsForTier(cap: CapabilitySnapshot): number {
  const n = PLANE_COUNT[cap.tier];
  if (n === 0) return 0;
  // premium(60)->~22 tensors, standard(40)->~15. Clamp 9..24.
  return Math.max(9, Math.min(24, Math.round(n * 0.38)));
}

export function HeroTensor3D() {
  const [cap, setCap] = useState<CapabilitySnapshot | null>(null);

  // Stable mutable bridge for the +/- buttons -> scene. A ref is the sanctioned
  // mutable container: the buttons mutate .current.step inside their (event
  // handler) onClick, the scene reads + drains it on the next frame, and no
  // re-render happens on a click. The ref OBJECT (not .current) is passed down,
  // so nothing dereferences a ref during render.
  const zoomBridge = useRef<ZoomBridge>({ step: 0 });

  const zoomIn = useCallback(() => {
    zoomBridge.current.step += 0.8; // dolly toward target
  }, []);
  const zoomOut = useCallback(() => {
    zoomBridge.current.step -= 0.8; // dolly away from target
  }, []);

  useEffect(() => {
    // Read capability after mount (client-only signals). This intentionally
    // sets state once on mount to swap SSR's static poster for the live scene.
    const decide = () => setCap(getCapability());
    decide();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", decide);
    return () => mq.removeEventListener?.("change", decide);
  }, []);

  const runScene = cap != null && !cap.useStaticFallback;
  const tensorCount = useMemo(() => (cap ? tensorsForTier(cap) : 0), [cap]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base layer: graded static poster. Always present so there is never a
          blank flash before the canvas mounts, and it IS the fallback frame for
          reduced-motion / mobile / low-end / no-WebGL visitors. */}
      <div className="tensor-static-frame absolute inset-0" />

      {/* Live interactive scene. This is the ONE layer that is pointer-events
          -auto (via .tensor-canvas-layer), so drag + scoped wheel + pinch work.
          It sits at z-0 under the hero copy, so it can never win a button click. */}
      {runScene && tensorCount > 0 && (
        <div className="tensor-canvas-layer pointer-events-auto absolute inset-0">
          <TensorScene
            tensorCount={tensorCount}
            interactive
            zoomBridgeRef={zoomBridge}
          />
        </div>
      )}

      {/* Contrast scrim above the media, pointer-events-none so it blocks
          neither the drag beneath nor the buttons above. */}
      <div className="tensor-scrim absolute inset-0" />

      {/* Always-available zoom affordance (desktop interactive only). Sits at
          z-20 and is pointer-events-auto so the buttons are clickable; the
          rest of the wrapper stays pointer-events-none. Guarantees zoom even if
          a browser ever blocks the scoped wheel path. */}
      {runScene && tensorCount > 0 && (
        <div className="tensor-zoom-controls pointer-events-auto">
          <button
            type="button"
            aria-label="Zoom in"
            className="tensor-zoom-btn"
            onClick={zoomIn}
          >
            +
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            className="tensor-zoom-btn"
            onClick={zoomOut}
          >
            &minus;
          </button>
        </div>
      )}
    </div>
  );
}

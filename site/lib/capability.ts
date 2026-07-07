/**
 * Capability detection for the folding-tensor hero.
 *
 * What it does: reads hardware + user-preference signals once at mount and
 * returns a tier the WebGL hero uses to decide how many fold planes to render,
 * or to bail out entirely in favor of the static fallback.
 *
 * Why this approach: the fe-particle-specialist Accessibility Floor requires
 * three signals (reduced-motion, low-power, low-end device). We fold pointer
 * type in as well because a coarse pointer (phone/tablet) tends to be power
 * constrained and a hero-scale WebGL bloom just crowds the copy on a narrow
 * column. All checks are guarded for SSR (no window/navigator at import).
 *
 * What breaks if you change it: callers (HeroGodParticle) branch on the tier
 * string. Renaming a tier without updating the consumer drops the sim to the
 * fallback silently.
 */

export type CapabilityTier = "premium" | "standard" | "minimal";

export type CapabilitySnapshot = {
  tier: CapabilityTier;
  /** True when the heavy WebGL sim should NOT run (mobile / reduced-motion / no-webgl). */
  useStaticFallback: boolean;
  prefersReducedMotion: boolean;
  isCoarsePointer: boolean;
  hasWebGL: boolean;
};

function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function getCapability(): CapabilitySnapshot {
  // SSR / no-DOM: assume the safest path so the server renders the fallback.
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      tier: "minimal",
      useStaticFallback: true,
      prefersReducedMotion: false,
      isCoarsePointer: false,
      hasWebGL: false,
    };
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hasWebGL = detectWebGL();

  // Width guard: phones report pointer:coarse, but some emulators / hybrids do
  // not. A hero-scale WebGL sim on a <900px column just crowds the copy, so
  // treat narrow viewports as fallback-only regardless of pointer type.
  const isNarrow = window.innerWidth < 900;

  // Best-effort low-end hints. deviceMemory is Chromium-only; treat absence as
  // "unknown, assume fine". hardwareConcurrency is broadly available.
  const cores =
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : 8;
  const memory =
    typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory ===
    "number"
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory!
      : 8;

  const isLowEnd = cores <= 4 || memory <= 2;

  // Any of these forces the static fallback: the sim is a non-essential,
  // pointer-first flourish and must never degrade the core page experience.
  const useStaticFallback =
    prefersReducedMotion || isCoarsePointer || isNarrow || !hasWebGL;

  let tier: CapabilityTier;
  if (useStaticFallback || isLowEnd) {
    tier = "minimal";
  } else if (cores >= 8 && memory >= 8) {
    tier = "premium";
  } else {
    tier = "standard";
  }

  return {
    tier,
    useStaticFallback,
    prefersReducedMotion,
    isCoarsePointer,
    hasWebGL,
  };
}

/**
 * Cone-tensor count per tier. Kept here so tuning lives in one place. The swarm
 * is thin translucent cone sheets accumulated additively, so the cost scales
 * with cone count and overdraw, not point count. 60 gives a dense, bright
 * emergent-centre bloom on capable hardware; 40 stays smooth on mid machines;
 * minimal uses the static fallback (no WebGL). Range is intentionally 30 to 64.
 */
export const PLANE_COUNT: Record<CapabilityTier, number> = {
  premium: 60,
  standard: 40,
  minimal: 0,
};

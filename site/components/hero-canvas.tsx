"use client";

import { useEffect, useRef } from "react";

type Anchor = {
  x: number;
  offset: number;
  targetOffset: number;
  velocity: number;
  phase: number;
};

/**
 * Full-bleed canvas string field behind the hero. Vertical strings anchored
 * to top and bottom, bowing toward the cursor with a spring return, plus a
 * slow idle drift so the field never looks static.
 *
 * Respects prefers-reduced-motion and disables on touch devices, where a
 * static faint SVG line field renders instead (see the noscript-safe
 * fallback markup below the canvas).
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let anchors: Anchor[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;

    function buildAnchors() {
      const isSmall = width < 768;
      const density = isSmall ? 45 : 90;
      const spacing = width / density;
      anchors = Array.from({ length: density }, (_, i) => ({
        x: spacing * i + spacing / 2,
        offset: 0,
        targetOffset: 0,
        velocity: 0,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildAnchors();
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function onPointerLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    let t = 0;
    function tick() {
      t += 0.008;
      ctx!.clearRect(0, 0, width, height);
      ctx!.strokeStyle = "rgba(161, 161, 170, 0.16)";
      ctx!.lineWidth = 1;

      for (const a of anchors) {
        const idleDrift = Math.sin(t + a.phase) * 6;
        const dx = a.x - mouseX;
        const distToMouse = Math.hypot(dx, height / 2 - mouseY);
        const influence = Math.max(0, 1 - distToMouse / 220);
        const bow = -Math.sign(dx || 1) * influence * 34;

        a.targetOffset = idleDrift + bow;
        const spring = (a.targetOffset - a.offset) * 0.08;
        a.velocity = (a.velocity + spring) * 0.82;
        a.offset += a.velocity;

        ctx!.beginPath();
        ctx!.moveTo(a.x, 0);
        ctx!.quadraticCurveTo(a.x + a.offset, height / 2, a.x, height);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full motion-safe-canvas" />
      <div className="hero-static-fallback absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-0)]" />
    </div>
  );
}

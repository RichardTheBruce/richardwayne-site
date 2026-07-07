"use client";

/**
 * The folding-tensor scene: a dense stack of thin translucent planes nested and
 * rotated around a shared center, additively blended into a luminous bloom, with
 * a bright blue-white core. The planes FOLD, they fan open into a bloom then
 * collapse back in on and into themselves, on a slow breathing loop, while the
 * whole stack rotates continuously. This reads as "tensors folding on and into
 * themselves." It is layered GEOMETRY, not points.
 *
 * Reference: C:/Users/Richa/OneDrive/Desktop/Portfolio Work/That Is - Copy.MP4
 * (contact sheet at rw-tensor/tensor-full.png). Collapsed frame ~8s: sheets
 * stack near-parallel into a tight lens. Bloomed frame ~26s: sheets fan out into
 * overlapping wings spiralling around the core with chromatic edge fringe.
 *
 * Fold model
 * ----------
 * N planes share the origin. Each plane i gets:
 *   - a SPIRAL yaw    = i * goldenAngle           (spreads sheets around the axis)
 *   - a base TILT     = mix(collapsedTilt, bloomTilt, foldMix)   (the fold)
 *   - a slight per-plane roll + depth offset so the stack has thickness.
 * foldMix breathes 0..1 on a slow sine (open bloom -> collapse -> repeat). At
 * foldMix=0 every plane's tilt converges toward a shared near-parallel angle
 * (nested lens); at foldMix=1 tilts spread across a wide fan (open bloom).
 * The parent group rotates continuously (slow yaw + a gentle nod) so the bloom
 * turns in space. A PASSIVE window pointermove applies a subtle parallax tilt to
 * the group. There is no orbit, no dolly, no wheel handler: the canvas never
 * touches page scroll or DOM selection.
 *
 * Rendering: additive blending, depthWrite off, low per-plane opacity so the
 * sheets accumulate into a bloom. Inner sheets are "hotter" (whiter) than outer.
 *
 * Cleanup: geometries/materials are declarative, so R3F disposes them on unmount.
 * The only manual listener (window pointermove) is removed in its effect cleanup.
 */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  planeVertexShader,
  planeFragmentShader,
  coreVertexShader,
  coreFragmentShader,
  haloVertexShader,
  haloFragmentShader,
} from "./tensorShaders";

const ACCENT = new THREE.Color("#0d90ff"); // dominant electric blue
const HOT = new THREE.Color("#cfe6ff"); // soft blue-white spill (not cyan)
const CYAN = new THREE.Color("#22d3ff"); // edge fringe A (whisper)
const MAGENTA = new THREE.Color("#ff45c6"); // edge fringe B (whisper)

const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // ~2.399963 rad, spiral spacing

// Scene sits off-center so the origin-centered bloom lands in the hero's
// right-side negative space, not under the H1. Screen fractions of width/height.
// Applied via camera.setViewOffset (pixels only), so world geometry stays at
// origin and the pointer parallax math is unaffected.
const OFFSET_FRAC_X = 0.24;
const OFFSET_FRAC_Y = 0.04;

// A shared pointer target the parallax lerps toward. Normalized [-1,1]. Kept in
// module scope (single hero instance) and fed by a passive window listener, so
// the canvas itself never needs pointer-events.
const pointerTarget = { x: 0, y: 0 };

/* -------------------------------------------------------------------------- */
/*  Folding plane stack                                                        */
/* -------------------------------------------------------------------------- */

type StackProps = { count: number };

function TensorStack({ count }: StackProps) {
  const groupRef = useRef<THREE.Group>(null);
  // Per-plane refs so we can drive tilt each frame for the fold.
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const matRefs = useRef<(THREE.ShaderMaterial | null)[]>([]);

  // Static per-plane params, computed once. Each entry is a nested sheet.
  const planes = useMemo(() => {
    const arr: {
      spiralYaw: number; // rotation around the shared vertical axis
      roll: number; // in-plane roll for variety
      depth: number; // small offset along the fan axis so the stack has body
      scale: number; // outer sheets slightly larger for a fuller bloom
      hot01: number; // inner sheets glow whiter
      opacity: number; // per-sheet base opacity (accumulates additively)
    }[] = [];
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0; // 0 inner .. 1 outer
      arr.push({
        spiralYaw: i * GOLDEN,
        roll: (i % 2 === 0 ? 1 : -1) * (0.12 + t * 0.4),
        depth: (t - 0.5) * 1.1,
        // Big sheets so the fanned wings dominate the frame, dwarfing the core
        // the way the reference does. Outer sheets largest for a wide bloom.
        scale: 2.6 + t * 3.2,
        hot01: 1 - t, // inner = hot
        // Per-sheet base opacity. The panel shader concentrates alpha at edges /
        // streaks (most of the sheet is transparent), so this can sit higher
        // without the center saturating: overlapping rims build the bloom.
        opacity: 0.22 + (1 - t) * 0.14,
      });
    }
    return arr;
  }, [count]);

  // One shared thin plane geometry, reused by every sheet (cheap, fast).
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(1, 1, 1, 1), []);
  useEffect(() => () => planeGeo.dispose(), [planeGeo]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30); // clamp huge frames (tab refocus)
    const t = state.clock.elapsedTime;

    // Fold breathing: 0 collapsed (nested lens) .. 1 bloomed (open fan). A slow
    // sine gives the open -> collapse -> repeat cycle from the reference clip.
    const foldMix = 0.5 - 0.5 * Math.cos(t * 0.28); // period ~22s
    // A faster micro-shimmer on top so mid-fold never sits perfectly still.
    const shimmer = 0.5 + 0.5 * Math.sin(t * 1.1);

    const grp = groupRef.current;
    if (grp) {
      // Passive-pointer parallax: a damped offset that eases toward the current
      // pointer target. Stored on userData so it persists across frames. This
      // never reads the canvas; pointerTarget is set by a window listener.
      const lerp = 1 - Math.pow(0.0022, delta);
      const targX = pointerTarget.x * 0.16;
      const targY = -pointerTarget.y * 0.12;
      grp.userData.px = (grp.userData.px ?? 0) + (targX - (grp.userData.px ?? 0)) * lerp;
      grp.userData.py = (grp.userData.py ?? 0) + (targY - (grp.userData.py ?? 0)) * lerp;

      // Continuous slow rotation of the whole stack (yaw + gentle nod), plus the
      // parallax offset on top.
      grp.rotation.y = t * 0.14 + grp.userData.px;
      grp.rotation.x = Math.sin(t * 0.19) * 0.22 + grp.userData.py;
    }

    // Drive each plane's fold. Collapsed: all tilts converge toward a shared
    // small angle (near-parallel nested lens). Bloomed: tilts spread into a wide
    // fan. The spread scales with foldMix, which IS the fold.
    for (let i = 0; i < planes.length; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const p = planes[i];
      const tt = planes.length > 1 ? i / (planes.length - 1) : 0;

      // Tilt fans from ~0 (collapsed) out to a wide angle (bloomed), biased by
      // the sheet's position in the stack so inner and outer sheets open at
      // different rates, giving the folding-into-itself read.
      const collapsedTilt = (tt - 0.5) * 0.18;
      const bloomTilt = (tt - 0.5) * Math.PI * 1.15;
      const tilt = collapsedTilt + (bloomTilt - collapsedTilt) * foldMix;

      // A subtle per-sheet wobble so the fold breathes organically.
      const wobble = Math.sin(t * 0.6 + i * 0.5) * 0.05 * foldMix;

      mesh.rotation.set(tilt + wobble, p.spiralYaw + t * 0.02, p.roll);
      // Push sheets slightly along their own normal as they bloom so the stack
      // gains depth when open and nests tight when collapsed.
      const spread = 0.15 + foldMix * 0.85;
      mesh.position.set(0, 0, p.depth * spread);
      const s = p.scale * (0.82 + foldMix * 0.22);
      mesh.scale.set(s, s, s);

      const mat = matRefs.current[i];
      if (mat) {
        mat.uniforms.uFold.value = foldMix;
        // Inner sheets pulse a touch with the shimmer for a living surface.
        mat.uniforms.uHot01.value = p.hot01 * (0.85 + shimmer * 0.15);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {planes.map((p, i) => (
        <mesh
          key={i}
          geometry={planeGeo}
          ref={(m) => {
            meshRefs.current[i] = m;
          }}
        >
          <shaderMaterial
            ref={(m) => {
              matRefs.current[i] = m;
            }}
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            uniforms={{
              uAccent: { value: ACCENT },
              uHot: { value: HOT },
              uCyan: { value: CYAN },
              uMagenta: { value: MAGENTA },
              uOpacity: { value: p.opacity },
              uHot01: { value: p.hot01 },
              uFold: { value: 0 },
            }}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Luminous core + bloom halo                                                 */
/* -------------------------------------------------------------------------- */

function Core() {
  const coreMat = useRef<THREE.ShaderMaterial>(null);
  const haloMat = useRef<THREE.ShaderMaterial>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Gentle breathing: slow base sine + a faint faster shimmer, clamped 0..1.
    const pulse = Math.max(
      0,
      Math.min(1, 0.5 + 0.3 * Math.sin(t * 0.8) + 0.14 * Math.sin(t * 2.3 + 1.1))
    );

    if (coreMat.current) coreMat.current.uniforms.uPulse.value = pulse;
    if (haloMat.current) haloMat.current.uniforms.uPulse.value = pulse;
    if (coreMesh.current) {
      coreMesh.current.scale.setScalar(1 + pulse * 0.08);
    }
    // Halo always faces the camera.
    if (halo.current) halo.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group>
      <mesh ref={coreMesh}>
        <icosahedronGeometry args={[0.42, 6]} />
        <shaderMaterial
          ref={coreMat}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uAccent: { value: ACCENT },
            uHot: { value: HOT },
            uPulse: { value: 0 },
          }}
        />
      </mesh>

      <mesh ref={halo} position={[0, 0, -0.3]}>
        <planeGeometry args={[6, 6]} />
        <shaderMaterial
          ref={haloMat}
          vertexShader={haloVertexShader}
          fragmentShader={haloFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uAccent: { value: ACCENT },
            uPulse: { value: 0 },
          }}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  View offset: pan the frustum so the bloom sits screen-right                 */
/* -------------------------------------------------------------------------- */

function ViewOffset() {
  const { camera, size } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    // Rendering the full window but sampled from a shifted sub-rect pans the
    // image. A NEGATIVE offsetX moves content right, so invert our fraction.
    const ox = -OFFSET_FRAC_X * size.width;
    const oy = -OFFSET_FRAC_Y * size.height;
    cam.setViewOffset(size.width, size.height, ox, oy, size.width, size.height);
    cam.updateProjectionMatrix();
    return () => {
      cam.clearViewOffset();
      cam.updateProjectionMatrix();
    };
  }, [camera, size.width, size.height]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Passive pointer tracking (window-level, canvas stays pointer-events none)   */
/* -------------------------------------------------------------------------- */

function PointerParallax() {
  useEffect(() => {
    // PASSIVE window listener. We never preventDefault, never touch scroll, and
    // never read the canvas. The canvas is pointer-events:none the whole time;
    // this just samples the global cursor to drive a subtle parallax tilt.
    const onMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Public scene                                                               */
/* -------------------------------------------------------------------------- */

export default function TensorFoldScene({ count }: { count: number }) {
  return (
    <Canvas
      // Cap DPR at 2 so retina displays don't 4x the fragment load.
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 0, 8.6] }}
      // Transparent clear so the obsidian page bg shows through.
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      // Belt-and-suspenders: the wrapper is pointer-events:none, but pin the
      // canvas element too so it can never intercept a click or selection.
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <Core />
      <TensorStack count={count} />
      <ViewOffset />
      <PointerParallax />
    </Canvas>
  );
}

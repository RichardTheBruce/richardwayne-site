"use client";

/**
 * The interactive RADIAL TENSOR-NETWORK scene.
 *
 * FORM (matched to C:\...\That Is - Copy.MP4 frames and Richard's
 * Reality_Tensors diagrams "5 D / 10 D / 18 D / 36 D / 72 D / 144 D"):
 *  - A STACK of individual "tensors". Each tensor is a WIREFRAME LINE NETWORK,
 *    NOT a solid cone and NOT a flat fan: a central hub with straight SPOKE
 *    lines radiating out to N nodes on a ring (low-D disc) or a Fibonacci
 *    sphere (high-D burst), plus CHORD lines webbing the nodes together, plus
 *    (for discs) a couple of tilted orbital ellipse rings. Small glowing dots
 *    sit at the node tips.
 *  - The tensors are NESTED CONCENTRICALLY along a shared axis and TELESCOPE:
 *    they fall into each other (nest tight) and expand out (spread along the
 *    axis), cyclically, like the render. Each tensor moves on its OWN phase and
 *    a slight independent rotation, so you can pick out individuals while the
 *    whole coheres. Slow overall rotation on top.
 *  - There is NO discrete central ball of light. The bright centre is EMERGENT:
 *    it is only where the many additive spokes converge at the hubs and overlap.
 *  - Behind: a field of small violet BOXES + a faint receding dot-grid tunnel.
 *
 * INTERACTIVITY (unchanged, page-scroll-safe):
 *  - drag to orbit (mouse + touch), gentle idle auto-rotate.
 *  - zoom in / out via wheel WHILE dragging, +/- buttons (wrapper), and pinch.
 *  - wheel zoom is scoped to a genuine drag so the PAGE always scrolls on a
 *    hovering cursor; we only preventDefault mid drag-orbit and on a two-finger
 *    pinch. See the Rig effect for the full policy.
 */

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import type { RefObject } from "react";
import { makeTensorGeometry, type TensorGeometry } from "./tensorGeometry";
import {
  makeTensorLineMaterial,
  makeTensorNodeMaterial,
} from "./tensorLineMaterial";
import { makeBoxField, makeDotGrid, mulberry32 } from "./backdrop";

/** Imperative zoom bridge: the wrapper's +/- buttons push a signed step into
 *  the ref, and the Rig consumes + zeroes it on the next frame. A ref keeps the
 *  channel mutable without any React re-render on a button press. */
export type ZoomBridge = { step: number };

type Props = {
  /** number of tensors stacked / telescoping (tier-scaled). */
  tensorCount: number;
  /** true on capable desktop pointers: enables wheel + drag. */
  interactive: boolean;
  /** ref the +/- buttons write into (dolly step per click); drained per frame. */
  zoomBridgeRef?: RefObject<ZoomBridge>;
};

/* ------------------------------------------------------------------ */
/* Tensor stack: N nested radial line-networks telescoping on an axis.  */
/*                                                                     */
/* Each tensor is built from LINES (hub->node spokes + node->node       */
/* chords + orbital rings) and node POINTS, additively blended so the   */
/* centre glow is EMERGENT where spokes converge, never a fake ball.    */
/*                                                                     */
/* The stack is a "dimension ladder": tensors near the front are low-D  */
/* discs (5/10/18), tensors deeper in are high-D spheres (36/72/144),   */
/* echoing Richard's labeled board. They share the axis (local Z) and   */
/* telescope: a global breathe pushes them apart along Z and pulls them */
/* back together, while each tensor also has its own phase offset + a    */
/* slow independent spin so you can pick out individuals.               */
/* ------------------------------------------------------------------ */

/** The dimension ladder (node count + shell) reused across the stack. Low-D are
 *  flat discs with orbital rings; high-D are spherical bursts. Kept modest so
 *  the additive line overdraw stays cheap. */
const DIM_LADDER: {
  nodes: number;
  shell: "ring" | "sphere";
  chordNeighbors: number;
  orbitals: number;
}[] = [
  { nodes: 5, shell: "ring", chordNeighbors: 2, orbitals: 2 },
  { nodes: 10, shell: "ring", chordNeighbors: 3, orbitals: 2 },
  { nodes: 18, shell: "ring", chordNeighbors: 4, orbitals: 2 },
  { nodes: 36, shell: "sphere", chordNeighbors: 5, orbitals: 0 },
  { nodes: 72, shell: "sphere", chordNeighbors: 6, orbitals: 0 },
  { nodes: 144, shell: "sphere", chordNeighbors: 7, orbitals: 0 },
];

function TensorStack({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);

  // Build ONE geometry per distinct ladder rung (dedup so a 30-deep stack still
  // only builds ~6 geometries and instances them by re-using the buffers).
  const rungGeos = useMemo<TensorGeometry[]>(
    () =>
      DIM_LADDER.map((d, i) =>
        makeTensorGeometry({
          nodes: d.nodes,
          shell: d.shell,
          chordNeighbors: d.chordNeighbors,
          orbitals: d.orbitals,
          seed: 0x51a7 + i * 977,
        })
      ),
    []
  );

  // One shared line material + one shared node material (uniforms animated once
  // per frame). Additive blending means order does not matter, so sharing is safe.
  const lineMat = useMemo(() => makeTensorLineMaterial(), []);
  const nodeMat = useMemo(() => makeTensorNodeMaterial(24), []);

  // Per-tensor signatures. `slot` is its base position along the shared axis
  // (Z), `phase` offsets its telescoping so tensors lead / lag, and the drift
  // fields give each tensor its own slow independent rotation + a small radial
  // scale jitter so silhouettes differ. Deterministic PRNG => stable across
  // SSR / reload. rung indexes into DIM_LADDER (which dimension it is).
  const tensors = useMemo(() => {
    const rnd = mulberry32(0x2b1f00 + count);
    const arr: {
      rung: number;
      slot: number; // base offset along axis, -1..1 (times a spread scalar)
      phase: number; // telescoping phase offset
      baseScale: number; // radial size of this tensor
      spinAxis: THREE.Vector3; // its own slow spin axis
      spinRate: number;
      spinPhase: number;
      tiltX: number; // fixed slight tilt so rings are not all coplanar
      tiltZ: number;
      // small fixed off-axis nudge so hubs are not a perfect single line.
      offX: number;
      offY: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0.5; // 0..1 front->back
      // Walk the dimension ladder across the stack: front tensors are low-D
      // discs, back tensors are high-D spheres, matching the labeled board.
      const rung = Math.min(
        DIM_LADDER.length - 1,
        Math.floor(t * DIM_LADDER.length)
      );
      arr.push({
        rung,
        slot: (t - 0.5) * 2, // -1 (front) .. 1 (back)
        phase: t * Math.PI * 1.6 + (rnd() - 0.5) * 0.6,
        // low-D discs a touch bigger up front, high-D spheres a touch smaller so
        // they nest inside the discs' orbital rings when collapsed.
        baseScale: THREE.MathUtils.lerp(1.15, 0.7, t) * (0.9 + rnd() * 0.2),
        spinAxis: new THREE.Vector3(
          (rnd() - 0.5) * 0.5,
          1,
          (rnd() - 0.5) * 0.5
        ).normalize(),
        spinRate: (rnd() < 0.5 ? -1 : 1) * (0.08 + rnd() * 0.22),
        spinPhase: rnd() * Math.PI * 2,
        tiltX: (rnd() - 0.5) * 0.6,
        tiltZ: (rnd() - 0.5) * 0.6,
        offX: (rnd() - 0.5) * 0.18,
        offY: (rnd() - 0.5) * 0.18,
      });
    }
    return arr;
  }, [count]);

  // Pivot per tensor: we transform the pivot each frame (telescope position +
  // independent spin + scale) and mount the shared line + node geometry under it.
  const pivotRefs = useRef<THREE.Group[]>([]);
  const spinQuat = useMemo(() => new THREE.Quaternion(), []);
  const tiltEuler = useMemo(() => new THREE.Euler(), []);

  // useFrame is react-three-fiber's imperative per-frame render loop, NOT a
  // React render or effect. Mutating shared material uniforms and the pivots
  // here is the sanctioned r3f pattern, so the immutability rule does not apply.
  /* eslint-disable react-hooks/immutability */
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // GLOBAL telescope breathe: 0 = fully NESTED (tensors collapsed into each
    // other, tight), 1 = fully EXPANDED (spread apart along the axis). Slow and
    // eased so the stack falls-in and spreads-out cyclically like the render.
    const raw = Math.sin(time * 0.28) * 0.5 + 0.5;
    const expand = THREE.MathUtils.smoothstep(raw, 0.0, 1.0);

    // Drive the shared shaders off the global breathe so the emergent core glow
    // (from converging spokes) tightens + brightens on nest, broadens on expand.
    lineMat.uniforms.uTime.value = time;
    lineMat.uniforms.uEdgeShift.value = 0.22 + expand * 0.9;
    lineMat.uniforms.uGlow.value = 1.08 - expand * 0.32; // hotter when nested
    lineMat.uniforms.uFade.value = 0.3 + (1.0 - expand) * 0.5;
    nodeMat.uniforms.uTime.value = time;
    nodeMat.uniforms.uEdgeShift.value = 0.22 + expand * 0.9;
    nodeMat.uniforms.uGlow.value = 1.0 - expand * 0.25;

    // How far the stack spreads along the axis at full expand (world units).
    const AXIS_SPREAD = 5.2;

    for (let i = 0; i < tensors.length; i++) {
      const pv = pivotRefs.current[i];
      if (!pv) continue;
      const d = tensors[i];

      // Per-tensor telescoping: blend the global breathe with the tensor's own
      // phase so tensors lead / lag (individually distinguishable) yet still
      // move as one nested stack. local 0 = this tensor nested, 1 = spread.
      const localRaw = Math.sin(time * 0.28 + d.phase) * 0.5 + 0.5;
      const local = THREE.MathUtils.lerp(
        expand,
        THREE.MathUtils.smoothstep(localRaw, 0.0, 1.0),
        0.55
      );

      // Position along the shared axis (local Z of the group). Nested => all
      // near 0 (falling into each other); expanded => fanned out by `slot`.
      const z = d.slot * AXIS_SPREAD * local;
      pv.position.set(d.offX * (0.4 + local), d.offY * (0.4 + local), z);

      // Independent slow spin (own axis + rate) plus a fixed tilt so no two
      // tensors are coplanar. This is the main "separate objects" cue alongside
      // their axial separation.
      const ang = time * d.spinRate + d.spinPhase;
      spinQuat.setFromAxisAngle(d.spinAxis, ang);
      const tiltQuat = new THREE.Quaternion().setFromEuler(
        tiltEuler.set(d.tiltX, 0, d.tiltZ)
      );
      pv.quaternion.copy(tiltQuat).multiply(spinQuat);

      // Scale: nested tensors shrink slightly so they tuck inside one another;
      // expanded tensors reach full size. Times the per-tensor base size.
      const s = d.baseScale * THREE.MathUtils.lerp(0.68, 1.05, local);
      pv.scale.setScalar(s);
    }

    // Whole stack drifts / rotates slowly so it is alive even at rest, and the
    // shared axis itself precesses gently (the render never sits still).
    if (group.current) {
      group.current.rotation.y = time * 0.06;
      group.current.rotation.x = Math.sin(time * 0.14) * 0.14 - 0.05;
      group.current.rotation.z = Math.cos(time * 0.1) * 0.05;
    }
  });
  /* eslint-enable react-hooks/immutability */

  useEffect(() => {
    return () => {
      rungGeos.forEach((g) => g.dispose());
      lineMat.dispose();
      nodeMat.dispose();
    };
  }, [rungGeos, lineMat, nodeMat]);

  return (
    <group ref={group}>
      {tensors.map((d, i) => {
        const geo = rungGeos[d.rung];
        return (
          <group
            key={i}
            ref={(el) => {
              if (el) pivotRefs.current[i] = el;
            }}
          >
            {/* the radial wireframe: hub spokes + node chords + orbital rings. */}
            <lineSegments geometry={geo.lines} material={lineMat} />
            {/* glowing dots at the node tips. */}
            <points geometry={geo.nodes} material={nodeMat} />
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Box field: instanced violet cubes behind the tensor stack.          */
/* ------------------------------------------------------------------ */
function BoxField() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => makeBoxField(96), []);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const color = new THREE.Color();
    for (let i = 0; i < data.count; i++) {
      mesh.setMatrixAt(i, data.matrices[i]);
      color.copy(data.colors[i]);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [data]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, data.count]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Dot grid: faint receding curved tunnel of points.                   */
/* ------------------------------------------------------------------ */
function DotGrid() {
  const { positions, alphas } = useMemo(() => makeDotGrid(), []);
  const tex = useMemo(() => makeDotTexture(), []);
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    return g;
  }, [positions, alphas]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTex: { value: tex },
          uColor: { value: new THREE.Color("#6a5cff") },
          uSize: { value: 34 },
        },
        vertexShader: /* glsl */ `
          attribute float aAlpha;
          varying float vA;
          uniform float uSize;
          void main() {
            vA = aAlpha;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = uSize / max(-mv.z, 1.0);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D uTex;
          uniform vec3 uColor;
          varying float vA;
          void main() {
            float m = texture2D(uTex, gl_PointCoord).a;
            gl_FragColor = vec4(uColor, m * vA);
            if (gl_FragColor.a < 0.01) discard;
          }
        `,
      }),
    [tex]
  );

  useEffect(() => {
    return () => {
      geo.dispose();
      mat.dispose();
      tex.dispose();
    };
  }, [geo, mat, tex]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
    }
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ------------------------------------------------------------------ */
/* Controls: orbit + pinch, idle auto-rotate, SCOPED wheel zoom.       */
/* ------------------------------------------------------------------ */
function Rig({
  interactive,
  zoomBridgeRef,
}: {
  interactive: boolean;
  zoomBridgeRef?: RefObject<ZoomBridge>;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera, gl } = useThree();
  const idleTimer = useRef(0);
  const draggingRef = useRef(false);

  /** Dolly the camera toward/away from the target by `amount` world units,
   *  clamped so the user can zoom out (requested) without clipping in.
   *  Memoized so the wheel/pinch effect can depend on it without re-binding. */
  const dolly = useCallback(
    (amount: number) => {
      const c = controls.current;
      if (!c) return;
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const next = camera.position.clone().addScaledVector(dir, amount);
      const dist = next.distanceTo(c.target);
      if (dist > 4.2 && dist < 26) {
        camera.position.copy(next);
        c.update();
      }
      idleTimer.current = 0;
    },
    [camera]
  );

  // Tracks whether the primary pointer is currently pressed ON the canvas
  // (i.e. the user is mid drag-orbit). This is the ONLY time a wheel event is
  // treated as zoom. It is the one unambiguous "genuinely interacting with the
  // object" signal that can never conflict with page scroll (you cannot scroll
  // the page while actively dragging), so the page ALWAYS scrolls when the user
  // is merely hovering. Discrete zoom is still available any time via the +/-
  // buttons (wrapper) and pinch (touch), so zoom-out is never gated behind a
  // drag. See the note in HeroTensor3D for the full rationale.
  const pointerDownRef = useRef(false);

  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 0 || e.pointerType !== "mouse") pointerDownRef.current = true;
    };
    const clearDown = () => (pointerDownRef.current = false);

    // WHEEL POLICY (page-scroll-safe):
    //   - NOT dragging  -> do nothing, do NOT preventDefault. The browser
    //     scrolls the PAGE normally. This is the default for a hovering cursor,
    //     so the hero never traps the scroll wheel.
    //   - Dragging (pointer held down on the canvas) -> the user is clearly
    //     manipulating the object; consume the wheel and dolly the camera.
    const onWheel = (e: WheelEvent) => {
      if (!pointerDownRef.current) return; // hovering -> page scrolls
      e.preventDefault();
      const c = controls.current;
      if (!c) return;
      const step = e.deltaY * 0.0016 * camera.position.distanceTo(c.target);
      // deltaY > 0 (scroll down) => zoom OUT (move away from target).
      dolly(-step);
    };

    // MANUAL PINCH ZOOM (touch). Two-finger gesture only. Single-finger touch
    // is left entirely to the page (vertical scroll) and to OrbitControls
    // (rotate), so touch page-scroll is never trapped. We only preventDefault
    // once a genuine second finger is down and moving, i.e. an unambiguous
    // pinch, matching the "genuinely interacting" rule.
    let pinchPrev = 0;
    const touchDist = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.hypot(dx, dy);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) pinchPrev = touchDist(e.touches);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault(); // pinch is a deliberate two-finger gesture
      const d = touchDist(e.touches);
      const c = controls.current;
      if (!c || pinchPrev === 0) {
        pinchPrev = d;
        return;
      }
      // Fingers apart (d > prev) => zoom IN (toward target).
      const delta = (d - pinchPrev) * 0.01 * camera.position.distanceTo(c.target);
      dolly(delta);
      pinchPrev = d;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchPrev = 0;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", clearDown);
    window.addEventListener("pointercancel", clearDown);
    // passive:false so preventDefault is allowed on the drag-zoom path only.
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", clearDown);
      window.removeEventListener("pointercancel", clearDown);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [interactive, gl, camera, dolly]);

  // Idle auto-rotate + consume any pending +/- button zoom step. useFrame is
  // r3f's imperative render loop; mutating controls state and draining the zoom
  // bridge here is intended, so the immutability rule does not apply.
  /* eslint-disable react-hooks/immutability */
  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;

    // Drain the zoom bridge (set by the +/- buttons in the wrapper).
    const bridge = zoomBridgeRef?.current;
    if (bridge && bridge.step !== 0) {
      dolly(bridge.step);
      bridge.step = 0;
    }

    if (draggingRef.current) {
      idleTimer.current = 0;
      c.autoRotate = false;
    } else {
      idleTimer.current += dt;
      c.autoRotate = idleTimer.current > 0.8;
    }
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      // enableZoom OFF on purpose. OrbitControls' built-in wheel zoom fires on a
      // HOVERING cursor (state NONE) and preventDefaults the event, which would
      // hijack page scroll over the hero. We instead handle wheel manually
      // (zoom only while dragging) and pinch manually (see the touch handlers
      // above), so page scroll is never trapped. enableZoom=false also disables
      // OrbitControls' own pinch, which is why we roll our own.
      enableZoom={false}
      enableRotate={interactive}
      autoRotate
      autoRotateSpeed={0.5}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.65}
      minDistance={4.2}
      maxDistance={26}
      // Single touch / left drag rotates. No pan.
      touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.ROTATE }}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: undefined,
        RIGHT: undefined,
      }}
      onStart={() => (draggingRef.current = true)}
      onEnd={() => (draggingRef.current = false)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Textures (procedural, no assets).                                   */
/* ------------------------------------------------------------------ */
function makeDotTexture(): THREE.Texture {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

/* ------------------------------------------------------------------ */
/* Scene root.                                                         */
/* ------------------------------------------------------------------ */
export default function TensorScene({
  tensorCount,
  interactive,
  zoomBridgeRef,
}: Props) {
  return (
    <Canvas
      // dpr capped so the additive line overdraw stays cheap on high-density
      // screens.
      dpr={[1, 1.75]}
      camera={{ position: [0.6, 2.2, 10.5], fov: 42, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // transparent: obsidian page shows through
      }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <DotGrid />
      <BoxField />
      <TensorStack count={tensorCount} />
      <Rig interactive={interactive} zoomBridgeRef={zoomBridgeRef} />
    </Canvas>
  );
}

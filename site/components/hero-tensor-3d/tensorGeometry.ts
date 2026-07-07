import * as THREE from "three";

/**
 * ONE radial "tensor" as a wireframe LINE NETWORK, matching Richard's actual
 * Reality_Tensors diagrams ("5 Dimensional Tensor", "10 D", "18 D", "36 D",
 * "72 D", "144 D") and the "That Is" render frames.
 *
 * A tensor is NOT a solid cone and NOT a flat fan. It is:
 *   - a central HUB point at the local origin,
 *   - N NODES placed on a circle (low N) or a Fibonacci sphere (high N),
 *   - straight SPOKE lines from the hub out to every node (the "cone of lines"
 *     the hub-to-rim spokes make),
 *   - CHORD lines connecting nodes to each other in a complete-graph-like web
 *     (we take a bounded fan of chords per node so density scales, not O(N^2)),
 *   - for low-dimension discs, two tilted orbital ELLIPSE rings above and below.
 *
 * The whole thing is emitted as a single interleaved LineSegments buffer so one
 * draw call renders the entire net. We also return the node point positions so
 * the scene can render small glowing dots at the tips.
 *
 * BAKED ATTRIBUTES the line shader reads:
 *   - aRadial : 0 at the hub end of a segment -> 1 at the outer/node end. Drives
 *               the apex->rim brightness falloff and the emergent-core softness.
 *   - aEdge   : a stable per-line value in [-1, 1] used for the cyan/magenta
 *               chromatic shear (electric blue dominates at 0).
 *   - aSeed   : per-line random 0..1 for shimmer phase so no two lines pulse
 *               in lockstep.
 *
 * Positions are in a local space normalized so the node shell radius is ~1.
 * The scene scales / stacks / rotates each tensor; the local geometry is static
 * and cheap (built once per distinct dimension bucket).
 */

export type TensorParams = {
  /** node count N (the "dimension": 5, 10, 18, 36, 72, 144, ...). */
  nodes: number;
  /**
   * shell shape. "ring" = a flat disc (nodes on one circle), "sphere" = a
   * spherical shell (Fibonacci sphere). Low-D uses ring, high-D uses sphere,
   * exactly like the diagrams (a 5D disc vs a 144D burst).
   */
  shell: "ring" | "sphere";
  /** how many nearest+skip chord neighbours to wire per node (web density). */
  chordNeighbors: number;
  /**
   * add tilted orbital ellipse rings above / below the disc (low-D discs have
   * these in the diagrams). 0 = none. Ignored-ish for spheres (they read as
   * great-circle rings instead).
   */
  orbitals: number;
  /** deterministic seed so SSR / hydration / reloads match. */
  seed: number;
};

export type TensorGeometry = {
  /** LineSegments geometry: hub-spokes + node chords + orbital rings. */
  lines: THREE.BufferGeometry;
  /** Points geometry for the node dots (one vertex per node). */
  nodes: THREE.BufferGeometry;
  dispose: () => void;
};

/** Small deterministic PRNG (mulberry32) local to geometry seeding. */
function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Place N node positions on the chosen shell, radius ~1 (Vector3[]). */
function shellNodes(
  n: number,
  shell: "ring" | "sphere",
  rnd: () => number
): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  if (shell === "ring") {
    // Flat disc: nodes evenly on a circle in the local XZ plane, with a tiny
    // vertical jitter so the ring is not a razor-thin line seen edge-on.
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const jitterY = (rnd() - 0.5) * 0.04;
      out.push(new THREE.Vector3(Math.cos(a), jitterY, Math.sin(a)));
    }
  } else {
    // Fibonacci sphere: near-uniform points on a unit sphere. This is the
    // sea-urchin / dandelion shell for high-D tensors.
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2; // 1 -> -1
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      out.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
    }
  }
  return out;
}

export function makeTensorGeometry(p: TensorParams): TensorGeometry {
  const { nodes: n, shell, chordNeighbors, orbitals, seed } = p;
  const rnd = prng(seed);

  const pos: number[] = [];
  const rad: number[] = []; // aRadial 0 (hub) .. 1 (node)
  const edge: number[] = []; // aEdge -1..1 chromatic shear
  const lineSeed: number[] = []; // aSeed 0..1 shimmer phase

  const nodePts = shellNodes(n, shell, rnd);
  const hub = new THREE.Vector3(0, 0, 0);

  // push one line segment (two verts) with per-vertex radial + shared edge/seed.
  const seg = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    ra: number,
    rb: number,
    e: number,
    s: number
  ) => {
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    rad.push(ra, rb);
    edge.push(e, e);
    lineSeed.push(s, s);
  };

  // --- SPOKES: hub -> every node (the radial "cone of lines"). ---------------
  // aEdge is derived from the node's azimuth so the chromatic shear sweeps
  // smoothly around the tensor (one side cyan, opposite magenta, blue through
  // the middle), exactly like the render's cyan-left / magenta-right split.
  for (let i = 0; i < n; i++) {
    const nd = nodePts[i];
    const azim = Math.atan2(nd.z, nd.x); // -PI..PI
    const e = Math.sin(azim); // -1..1 across the tensor
    seg(hub, nd, 0, 1, e, rnd());
  }

  // --- CHORDS: node -> a fan of other nodes (complete-graph-ish web). --------
  // For a ring we connect each node to its k nearest neighbours PLUS a couple of
  // long "skip" chords across the disc, which is what makes the classic tensor
  // star/mandala webbing. For a sphere we connect each node to the k nodes that
  // are closest in 3D, giving the dense triangulated urchin surface. We add each
  // undirected edge once (j > i style dedupe via a Set) so lines are not doubled.
  const seen = new Set<number>();
  const addChord = (i: number, j: number) => {
    if (i === j) return;
    const key = i < j ? i * 100003 + j : j * 100003 + i;
    if (seen.has(key)) return;
    seen.add(key);
    const a = nodePts[i];
    const b = nodePts[j];
    // chord edge value: blend the two endpoints' azimuth shear so the web tints
    // consistently with the spokes it sits between.
    const ea = Math.sin(Math.atan2(a.z, a.x));
    const eb = Math.sin(Math.atan2(b.z, b.x));
    // chords live at the rim, so both ends are "outer" (radial ~0.82) to keep
    // the hot emergent core reserved for where spokes converge, not the web.
    seg(a, b, 0.82, 0.82, (ea + eb) * 0.5, rnd());
  };

  if (shell === "ring") {
    for (let i = 0; i < n; i++) {
      // adjacent chords around the ring perimeter.
      for (let k = 1; k <= Math.min(chordNeighbors, Math.floor(n / 2)); k++) {
        addChord(i, (i + k) % n);
      }
      // a couple of long skip chords across the disc for the star web.
      addChord(i, (i + Math.floor(n / 2)) % n);
      addChord(i, (i + Math.floor(n / 3)) % n);
    }
  } else {
    // sphere: connect to k nearest by squared distance (bounded fan per node).
    const kk = Math.min(chordNeighbors, n - 1);
    for (let i = 0; i < n; i++) {
      const here = nodePts[i];
      // cheap partial nearest: score all, keep the kk smallest. n is modest
      // (<= ~200), so this O(n^2) build once at load is fine.
      const scored: { j: number; d: number }[] = [];
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        scored.push({ j, d: here.distanceToSquared(nodePts[j]) });
      }
      scored.sort((x, y) => x.d - y.d);
      for (let m = 0; m < kk; m++) addChord(i, scored[m].j);
    }
  }

  // --- ORBITAL ELLIPSE RINGS (low-D discs): tilted rings above / below. ------
  // These are the two elliptical halos in the 5D/10D/18D diagrams. Built as
  // dense line loops on a circle then tilted off-axis. Skipped for spheres.
  if (shell === "ring" && orbitals > 0) {
    const RING_SEGS = 72;
    for (let o = 0; o < orbitals; o++) {
      // alternate tilt direction + a small size variation per ring.
      const tilt = (o % 2 === 0 ? 1 : -1) * (0.55 + o * 0.14);
      const rr = 1.12 + o * 0.05; // slightly outside the node ring
      const yShift = (o % 2 === 0 ? 1 : -1) * (0.18 + o * 0.05);
      const m = new THREE.Matrix4().makeRotationZ(tilt);
      let prev = new THREE.Vector3();
      for (let s = 0; s <= RING_SEGS; s++) {
        const a = (s / RING_SEGS) * Math.PI * 2;
        const v = new THREE.Vector3(Math.cos(a) * rr, yShift, Math.sin(a) * rr);
        v.applyMatrix4(m);
        if (s > 0) {
          const e = Math.sin(a); // sweep chroma around the orbital too
          seg(prev, v, 0.9, 0.9, e, 0.5);
        }
        prev = v;
      }
    }
  }

  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  lines.setAttribute("aRadial", new THREE.Float32BufferAttribute(rad, 1));
  lines.setAttribute("aEdge", new THREE.Float32BufferAttribute(edge, 1));
  lines.setAttribute("aSeed", new THREE.Float32BufferAttribute(lineSeed, 1));
  lines.computeBoundingSphere();

  // Node dots: one point per node (radial = 1 so they read as the bright tips).
  const npos: number[] = [];
  const nedge: number[] = [];
  const nseed: number[] = [];
  for (let i = 0; i < n; i++) {
    const nd = nodePts[i];
    npos.push(nd.x, nd.y, nd.z);
    nedge.push(Math.sin(Math.atan2(nd.z, nd.x)));
    nseed.push(rnd());
  }
  const nodesGeo = new THREE.BufferGeometry();
  nodesGeo.setAttribute("position", new THREE.Float32BufferAttribute(npos, 3));
  nodesGeo.setAttribute("aEdge", new THREE.Float32BufferAttribute(nedge, 1));
  nodesGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(nseed, 1));
  nodesGeo.computeBoundingSphere();

  return {
    lines,
    nodes: nodesGeo,
    dispose: () => {
      lines.dispose();
      nodesGeo.dispose();
    },
  };
}

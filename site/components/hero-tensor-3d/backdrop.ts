import * as THREE from "three";

/**
 * Background elements behind the tensor bloom, straight from the video:
 *   1. A field of small violet / blue BOXES (cubes) scattered in a rough shell.
 *   2. A faint receding, gently curved DOT-GRID tunnel.
 *
 * Both are cheap, static geometry the scene rotates slowly. They live behind
 * the petals (larger radius, dimmer) so the bloom always reads in front.
 */

/** Deterministic PRNG so the field is stable across renders / SSR hydration.
 *  Exported so the cone swarm can seed its per-cone signatures from the same
 *  stable generator (no hydration mismatch, identical across reloads). */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type BoxFieldData = {
  count: number;
  matrices: THREE.Matrix4[];
  colors: THREE.Color[];
};

/**
 * Scatter `count` small cubes in a hollow-ish shell around the core. Biased so
 * more sit to the upper-left / back, matching the video's clustered boxes, but
 * still wrapping the whole scene so orbiting reveals them on every side.
 */
export function makeBoxField(count = 90, seed = 1337): BoxFieldData {
  const rnd = mulberry32(seed);
  const matrices: THREE.Matrix4[] = [];
  const colors: THREE.Color[] = [];

  const violet = new THREE.Color("#7b5cff");
  const blue = new THREE.Color("#2f6bff");
  const dim = new THREE.Color("#2a2050");

  for (let i = 0; i < count; i++) {
    // Spherical shell, radius 3.2 .. 7.5, with vertical squash so it reads as a
    // wide belt rather than a ball.
    const r = 3.2 + rnd() * 4.3;
    const theta = rnd() * Math.PI * 2;
    const phi = Math.acos(2 * rnd() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi) * 0.55; // squash vertically
    const z = r * Math.sin(phi) * Math.sin(theta);

    const s = 0.05 + rnd() * 0.14;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI)
    );
    m.compose(
      new THREE.Vector3(x, y, z),
      q,
      new THREE.Vector3(s, s, s)
    );
    matrices.push(m);

    // Mostly violet, some blue, a few near-black for depth variation.
    const pick = rnd();
    const c =
      pick > 0.72 ? blue.clone() : pick > 0.14 ? violet.clone() : dim.clone();
    c.multiplyScalar(0.5 + rnd() * 0.7);
    colors.push(c);
  }

  return { count, matrices, colors };
}

/**
 * A curved dot-grid tunnel receding behind the core. Points on a grid that is
 * bowed into a shallow bowl and pushed back in Z, exactly like the faint violet
 * lattice in f-40 / f-45. Returns a positions Float32Array + per-point alpha.
 */
export function makeDotGrid(cols = 60, rows = 34): {
  positions: Float32Array;
  alphas: Float32Array;
} {
  const positions = new Float32Array(cols * rows * 3);
  const alphas = new Float32Array(cols * rows);
  const width = 26;
  const depth = 20;
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1) - 0.5; // -0.5..0.5
      const w = r / (rows - 1); // 0 near .. 1 far

      const x = u * width;
      // Bowl: dip the centre, lift the far edge, so the grid curves like a
      // throat receding into the distance.
      const bowl = (u * u) * 10 - 3.5;
      const y = bowl - w * 2.0 - 1.5;
      const z = -6 - w * depth;

      positions[k * 3 + 0] = x;
      positions[k * 3 + 1] = y;
      positions[k * 3 + 2] = z;
      // Fade with distance so the far end dissolves.
      alphas[k] = (1 - w) * 0.7 + 0.05;
      k++;
    }
  }
  return { positions, alphas };
}

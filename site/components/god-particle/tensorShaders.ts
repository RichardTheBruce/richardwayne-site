/**
 * GLSL for the folding-tensor hero, bundled as TS template strings.
 *
 * Why strings and not .glsl files: keeps the artifact SSR-safe with ZERO
 * next.config changes (no raw-loader / glslify). The shaders are small and
 * self-contained. Trade-off: no in-editor syntax highlighting. Acceptable for a
 * single hero effect.
 *
 * The visual reference (a stack of thin translucent sheets folding open into a
 * bloom then collapsing, with a hot core and chromatic edge fringe) is graded to
 * brand: obsidian background, electric blue #0D90FF dominant. The chromatic
 * shimmer at sheet edges is intentional but kept to a WHISPER of cyan/magenta so
 * blue always dominates.
 */

/* -------------------------------------------------------------------------- */
/*  Translucent fold plane                                                     */
/* -------------------------------------------------------------------------- */
/**
 * PLANE
 * A thin translucent sheet. The fragment shader shades it as a soft luminous
 * membrane: brightest toward the shared center of the stack, with a thin
 * chromatic fringe along the two long edges (a whisper of cyan on one side,
 * magenta on the other) that reads as the "tensor shimmer" without letting a
 * second hue take over from blue. Additive-blended, low opacity, so many sheets
 * accumulate into a bloom.
 *
 * Attributes come from PlaneGeometry (position, uv).
 * Uniforms:
 *   uAccent    vec3  electric blue #0D90FF (dominant)
 *   uHot       vec3  near-white blue spill for the hottest inner region
 *   uCyan      vec3  edge fringe A (whisper)
 *   uMagenta   vec3  edge fringe B (whisper)
 *   uOpacity   float per-sheet base opacity (accumulates additively)
 *   uHot01     float 0..1 how "hot" this sheet is (inner sheets glow whiter)
 *   uFold      float 0..1 current fold amount, brightens edges as it blooms
 */
export const planeVertexShader = /* glsl */ `
varying vec2 vUv;

void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const planeFragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uAccent;
uniform vec3 uHot;
uniform vec3 uCyan;
uniform vec3 uMagenta;
uniform float uOpacity;
uniform float uHot01;
uniform float uFold;

varying vec2 vUv;

void main(){
  // A sheet is a translucent luminous PANEL, not a soft blob. To keep the
  // folded-card structure visible when many sheets overlap additively, we build
  // it from three parts: (1) a bright thin RIM on all four edges so each sheet's
  // silhouette reads, (2) fine STREAK lines running along the sheet (the
  // striations seen in the reference), (3) a faint interior FILL. A gentle
  // vignette toward the far corners keeps the panel from looking like a hard
  // rectangle. The two long edges also pick up a whisper of cyan / magenta.
  vec2 c = vUv - 0.5;
  float r = length(c) * 2.0; // 0 center .. ~1.41 corner

  // Distance to the nearest edge, in UV (0 at any edge, 0.5 at center).
  float dx = min(vUv.x, 1.0 - vUv.x);
  float dy = min(vUv.y, 1.0 - vUv.y);
  float edgeDist = min(dx, dy);

  // (1) Rim: bright near any edge, quick falloff inward.
  float rim = smoothstep(0.16, 0.0, edgeDist);
  rim = pow(rim, 1.4);

  // (2) Streaks: thin bright lines along the long (x) axis, a few per sheet, so
  // the flat face shows internal grain like the reference sheets. Faint.
  float streak = pow(0.5 + 0.5 * sin(vUv.y * 46.0), 8.0) * 0.25;

  // (3) Fill: faint uniform body, dimmed toward the far corners.
  float fill = (1.0 - smoothstep(0.7, 1.15, r)) * 0.18;

  // Inner sheets (uHot01 high) glow a little brighter overall.
  float lum = (rim * (0.9 + uHot01 * 0.6) + streak + fill);

  // Long-edge chromatic fringe: only the extreme top/bottom edges pick up a
  // thin cyan / magenta rim. Kept a WHISPER so electric blue dominates. Applied
  // only right at the rim and only near the very edges, so it never tints the
  // body toward cyan.
  float edgeTop = smoothstep(0.86, 1.0, vUv.y);
  float edgeBot = smoothstep(0.14, 0.0, vUv.y);
  float fringeAmt = (0.14 + 0.12 * uFold) * rim;
  vec3 fringe =
      uCyan    * edgeTop * fringeAmt
    + uMagenta * edgeBot * fringeAmt;

  // Base color: ELECTRIC BLUE dominant. Warm toward white only at the very
  // brightest rim so the sheets keep their blue read instead of going cyan.
  float hot = clamp(uHot01 * 0.35 + rim * 0.25, 0.0, 1.0);
  vec3 color = mix(uAccent, uHot, hot * 0.4) + fringe;

  float alpha = lum * uOpacity;
  if (alpha < 0.004) discard;

  gl_FragColor = vec4(color, alpha);
}
`;

/* -------------------------------------------------------------------------- */
/*  Luminous core                                                              */
/* -------------------------------------------------------------------------- */
/**
 * CORE
 * A soft additive sphere at the center of the stack. No lighting rig: a
 * view-dependent Fresnel-ish falloff makes it read as a self-luminous ball of
 * blue-white energy. Breathes via uPulse.
 *
 * Uniforms:
 *   uAccent  vec3  electric blue
 *   uHot     vec3  near-white
 *   uPulse   float 0..1 gentle breathing
 */
export const coreVertexShader = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vViewDir;

void main(){
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const coreFragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uAccent;
uniform vec3 uHot;
uniform float uPulse;

varying vec3 vNormalW;
varying vec3 vViewDir;

void main(){
  // Facing the camera = brightest (hot white core), rim falls to blue. This is
  // the opposite of a Fresnel rim: we want a solid glowing ball, not a shell.
  float facing = max(dot(vNormalW, vViewDir), 0.0);
  float energy = pow(facing, 2.0);

  vec3 color = mix(uAccent, uHot, clamp(energy, 0.0, 1.0));
  float alpha = clamp(0.18 + energy * 0.6, 0.0, 0.9) * (0.85 + uPulse * 0.3);

  gl_FragColor = vec4(color * (0.55 + energy * 0.8), alpha);
}
`;

/* -------------------------------------------------------------------------- */
/*  Bloom halo billboard                                                       */
/* -------------------------------------------------------------------------- */
/**
 * HALO
 * A single camera-facing billboard behind the stack. Pure radial gradient,
 * additive, so the core reads as genuinely luminous without a post pass. Kept
 * dim so it never blows out hero copy. Breathes with the same pulse.
 *
 * Uniforms:
 *   uAccent  vec3  electric blue
 *   uPulse   float 0..1 breathing
 */
export const haloVertexShader = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const haloFragmentShader = /* glsl */ `
precision highp float;
uniform vec3 uAccent;
uniform float uPulse;
varying vec2 vUv;

void main(){
  float d = distance(vUv, vec2(0.5));
  // Tight bright core, long soft tail. Dim on purpose: a glow behind the sheets,
  // not a fog wall that swamps them or blows out hero copy.
  float core = smoothstep(0.34, 0.0, d);
  float halo = smoothstep(0.5, 0.05, d);
  float a = core * 0.12 + halo * 0.08;
  a *= (0.8 + uPulse * 0.4);
  gl_FragColor = vec4(uAccent, a);
}
`;

import * as THREE from "three";

/**
 * Additive, translucent, glowing LINE material for the radial tensor networks.
 *
 * Pulled straight from the "That Is" frames: the tensor is a wireframe of thin
 * luminous lines on obsidian. Electric blue #0D90FF dominates; one side of each
 * tensor shears toward cyan, the opposite toward magenta (a subtle chromatic
 * shimmer on the edges, never a rainbow, brand rule keeps blue on top). Lines
 * are brightest at the hub end where the spokes converge and fade toward the
 * node rim, so the CENTRE brightness is EMERGENT from many overlapping spokes,
 * NOT a discrete glow sphere.
 *
 * uGlow    scales overall emission (breathes with the telescoping cycle).
 * uEdgeShift widens the cyan/magenta separation as the stack expands.
 * uFade    biases the hub->rim falloff so lines can read hotter at the core on
 *          collapse (compact + bright) and softer/broader on expand.
 */

export const T_BLUE = new THREE.Color("#0D90FF");
export const T_CYAN = new THREE.Color("#3af0ff");
export const T_MAGENTA = new THREE.Color("#ff3cc7");
export const T_WHITE = new THREE.Color("#eaf6ff");

export function makeTensorLineMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 1 },
      uEdgeShift: { value: 0.5 },
      uFade: { value: 0.5 },
      uBlue: { value: T_BLUE.clone() },
      uCyan: { value: T_CYAN.clone() },
      uMagenta: { value: T_MAGENTA.clone() },
      uWhite: { value: T_WHITE.clone() },
      uOpacity: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float aRadial;
      attribute float aEdge;
      attribute float aSeed;
      varying float vRadial;
      varying float vEdge;
      varying float vSeed;
      void main() {
        vRadial = aRadial;
        vEdge = aEdge;
        vSeed = aSeed;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime;
      uniform float uGlow;
      uniform float uEdgeShift;
      uniform float uFade;
      uniform float uOpacity;
      uniform vec3 uBlue;
      uniform vec3 uCyan;
      uniform vec3 uMagenta;
      uniform vec3 uWhite;
      varying float vRadial;
      varying float vEdge;
      varying float vSeed;

      void main() {
        // Hub->rim brightness. Spokes are brightest near the hub (vRadial ~0)
        // and fade toward the node (vRadial ~1). uFade shifts how hot the core
        // reads. This is what makes the emergent centre glow from overlapping
        // spokes instead of needing a fake light ball.
        float core = 1.0 - smoothstep(0.0, 0.55 + uFade * 0.5, vRadial);
        float rim = smoothstep(0.6, 1.0, vRadial) * 0.5; // faint node-end lift
        float bright = 0.28 + core * 1.15 + rim;

        // Chromatic shear across the tensor: blue at centre, cyan one side,
        // magenta the other. uEdgeShift widens it as the stack expands.
        float e = clamp(vEdge * (0.7 + uEdgeShift), -1.0, 1.0);
        vec3 col = uBlue;
        col = mix(col, uCyan, smoothstep(0.1, 1.0, -e) * 0.8);
        col = mix(col, uMagenta, smoothstep(0.1, 1.0, e) * 0.8);
        // where spokes pile at the hub, blow slightly toward white (emergent).
        col = mix(col, uWhite, core * core * 0.5);

        // Per-line shimmer so the wireframe is alive, never dead-flat.
        float shimmer = 0.85 + 0.15 * sin(uTime * 1.6 + vSeed * 6.2831 + vRadial * 5.0);

        float alpha = bright * uGlow * shimmer * uOpacity;
        if (alpha < 0.002) discard;
        gl_FragColor = vec4(col * (0.75 + bright * 0.6), alpha);
      }
    `,
  });
}

/**
 * Round glowing point sprite material for the node dots at the tips of the
 * spokes. Same chromatic language as the lines, sized in clip space so the dots
 * stay small and additive. A soft radial falloff (computed from gl_PointCoord)
 * gives each node a little bloom without a texture.
 */
export function makeTensorNodeMaterial(size = 26): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 1 },
      uSize: { value: size },
      uEdgeShift: { value: 0.5 },
      uBlue: { value: T_BLUE.clone() },
      uCyan: { value: T_CYAN.clone() },
      uMagenta: { value: T_MAGENTA.clone() },
      uOpacity: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float aEdge;
      attribute float aSeed;
      uniform float uSize;
      varying float vEdge;
      varying float vSeed;
      void main() {
        vEdge = aEdge;
        vSeed = aSeed;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize / max(-mv.z, 1.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime;
      uniform float uGlow;
      uniform float uEdgeShift;
      uniform float uOpacity;
      uniform vec3 uBlue;
      uniform vec3 uCyan;
      uniform vec3 uMagenta;
      varying float vEdge;
      varying float vSeed;
      void main() {
        vec2 d = gl_PointCoord - vec2(0.5);
        float r = length(d);
        float glow = smoothstep(0.5, 0.0, r); // soft round dot
        float e = clamp(vEdge * (0.7 + uEdgeShift), -1.0, 1.0);
        vec3 col = uBlue;
        col = mix(col, uCyan, smoothstep(0.1, 1.0, -e) * 0.8);
        col = mix(col, uMagenta, smoothstep(0.1, 1.0, e) * 0.8);
        float pulse = 0.8 + 0.2 * sin(uTime * 2.0 + vSeed * 6.2831);
        float alpha = glow * uGlow * pulse * uOpacity;
        if (alpha < 0.003) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

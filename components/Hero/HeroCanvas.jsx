/**
 * components/Hero/HeroCanvas.jsx
 *
 * The immersive Three.js 3D background for the hero section.
 *
 * What's rendered:
 * ─────────────────
 * • 2,000 colored particles (cyan, coral, amber, blue) — slowly drift
 * • 3 torus rings at different sizes/colors/opacities — slowly rotate
 * • Camera subtly parallaxes with mouse movement
 *
 * Performance notes:
 * ───────────────────
 * • We use `useRef` for all Three.js objects — never stored in React state.
 * • The animation loop (`requestAnimationFrame`) runs outside React.
 * • We update particle positions in-place (no new array allocation per frame).
 * • Cleanup function disposes the renderer + removes event listeners.
 *
 * Mouse reactivity:
 * ──────────────────
 * Uses `useMousePosition()` hook from hooks/useMousePosition.js.
 * The normalized x/y (-1 to +1) is read directly in the RAF loop
 * via a ref (mouseRef) to avoid stale closure issues.
 */

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Particle count — reduce to 1000 if performance is an issue on mobile
const PARTICLE_COUNT = 2000;

// Brand color palette for particles
const PALETTE = [
  new THREE.Color("#00F5FF"), // cyan
  new THREE.Color("#FF4D6D"), // coral
  new THREE.Color("#FFB547"), // amber
  new THREE.Color("#0066FF"), // deep blue
];

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 }); // live mouse data for RAF loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer setup ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias:   true,
      alpha:       true,     // transparent background — body color shows through
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2x for perf
    renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    renderer.setClearColor(0x000000, 0); // fully transparent clear color

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,                                                             // FOV
      canvas.clientWidth / canvas.clientHeight,                       // aspect
      0.1, 1000                                                       // near, far
    );
    camera.position.z = 5;

    // ── Particles ─────────────────────────────────────────────────────────────
    const geometry  = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const initPos   = new Float32Array(PARTICLE_COUNT * 3); // baseline positions

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random position within a bounding box
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Save baseline for animated drift
      initPos[i * 3]     = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Random color from palette
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i * 3]     = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size:            0.016,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.72,
      sizeAttenuation: true, // particles further away appear smaller
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // ── Torus rings ────────────────────────────────────────────────────────────
    const makeRing = (radius, tube, color, opacity) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      return new THREE.Mesh(geo, mat);
    };

    const ring1 = makeRing(1.8, 0.012, 0x00F5FF, 0.13); // large cyan
    const ring2 = makeRing(1.2, 0.010, 0xFF4D6D, 0.09); // medium coral
    const ring3 = makeRing(2.4, 0.008, 0x0066FF, 0.06); // large deep blue

    ring1.rotation.x =  0.4;
    ring2.rotation.z =  0.9;
    ring3.rotation.x = -0.6;
    ring3.rotation.y =  0.3;

    scene.add(ring1, ring2, ring3);

    // ── Mouse listener → mouseRef ─────────────────────────────────────────────
    // We write to a ref (not state) so the RAF loop always reads current value
    // without triggering React re-renders.
    const onMouseMove = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ─────────────────────────────────────────────────────────
    let t      = 0;
    let animId = null;
    const posArr = geometry.attributes.position.array;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      t += 0.003;

      const { x: mx, y: my } = mouseRef.current;

      // Drift particles using sine/cosine offsets from their initial position
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArr[i * 3]     = initPos[i * 3]     + Math.cos(t + i * 0.007) * 0.06;
        posArr[i * 3 + 1] = initPos[i * 3 + 1] + Math.sin(t + i * 0.011) * 0.09;
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate particle cloud with mouse influence
      particles.rotation.y = t * 0.05 + mx * 0.18;
      particles.rotation.x = my * 0.08;

      // Rotate torus rings
      ring1.rotation.y = t * 0.25;
      ring1.rotation.z = t * 0.10 + mx * 0.20;
      ring2.rotation.x = t * 0.18 + my * 0.30;
      ring2.rotation.y = t * 0.12;
      ring3.rotation.z = t * 0.08;

      // Subtle camera parallax
      camera.position.x += (mx * 0.28 - camera.position.x) * 0.04;
      camera.position.y += (my * 0.14 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      const parent = canvas.parentElement;
      camera.aspect = parent.clientWidth / parent.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(parent.clientWidth, parent.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
    };
  }, []); // runs once on mount

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset:    0,
        width:    "100%",
        height:   "100%",
        zIndex:   0,
      }}
      aria-hidden="true"
    />
  );
}

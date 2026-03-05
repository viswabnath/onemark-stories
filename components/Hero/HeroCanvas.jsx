/**
 * HeroCanvas — Three.js particle canvas.
 * Warm story-themed palette: terracotta, rose, gold, amber.
 * Reduced to 800 particles for performance.
 */
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

// Story palette — warm, romantic, cinematic
const DARK_PALETTE  = [
  new THREE.Color("#E8956D"),  // terracotta
  new THREE.Color("#C97080"),  // dusty rose
  new THREE.Color("#D4A853"),  // gold
  new THREE.Color("#A07858"),  // warm brown
];
const LIGHT_PALETTE = [
  new THREE.Color("#B85C20"),  // burnt sienna
  new THREE.Color("#9E2A40"),  // deep rose
  new THREE.Color("#9A6A10"),  // amber
  new THREE.Color("#7A4030"),  // warm earth
];

export default function HeroCanvas({ theme }) {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isDark  = theme !== "light";
    const PALETTE = isDark ? DARK_PALETTE : LIGHT_PALETTE;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const geometry  = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const initPos   = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      positions[i*3] = initPos[i*3] = x;
      positions[i*3+1] = initPos[i*3+1] = y;
      positions[i*3+2] = initPos[i*3+2] = z;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.65,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, particleMat);
    scene.add(particles);

    // Soft warm rings — less "tech agency", more cinematic
    const makeRing = (r, tube, color, op) => {
      const g = new THREE.TorusGeometry(r, tube, 8, 60);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op });
      return new THREE.Mesh(g, m);
    };
    const ringColors = isDark ? [0xE8956D, 0xC97080] : [0xB85C20, 0x9E2A40];
    const ring1 = makeRing(1.8, 0.010, ringColors[0], isDark ? 0.10 : 0.14);
    const ring2 = makeRing(1.2, 0.008, ringColors[1], isDark ? 0.07 : 0.11);
    ring1.rotation.x = 0.4; ring2.rotation.z = 0.9;
    scene.add(ring1, ring2);

    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let t = 0, animId;
    const posArr = geometry.attributes.position.array;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      t += 0.003;
      const { x: mx, y: my } = mouseRef.current;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArr[i*3]   = initPos[i*3]   + Math.cos(t + i * 0.007) * 0.05;
        posArr[i*3+1] = initPos[i*3+1] + Math.sin(t + i * 0.011) * 0.07;
      }
      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.0005;
      ring1.rotation.y += 0.0012;
      ring2.rotation.x += 0.0008;
      camera.position.x += (mx * 0.25 - camera.position.x) * 0.05;
      camera.position.y += (my * 0.15 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}

/**
 * HeroCanvas — Three.js particle canvas.
 * Reduced to 800 particles for performance. Uses a ref-based canvas element.
 */
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 800; // reduced from 2000 for perf

const DARK_PALETTE  = [new THREE.Color("#29ABE2"), new THREE.Color("#FF4D6D"), new THREE.Color("#FFB547"), new THREE.Color("#3355FF")];
const LIGHT_PALETTE = [new THREE.Color("#0A5FA8"), new THREE.Color("#8B1A2E"), new THREE.Color("#5C3A9E"), new THREE.Color("#006D77")];

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

    const particleMat = new THREE.PointsMaterial({ size: 0.02, vertexColors: true, transparent: true, opacity: isDark ? 0.7 : 0.8, sizeAttenuation: true });
    const particles = new THREE.Points(geometry, particleMat);
    scene.add(particles);

    // Fewer rings for perf
    const makeRing = (r, tube, color, op) => {
      const g = new THREE.TorusGeometry(r, tube, 8, 60);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op });
      return new THREE.Mesh(g, m);
    };
    const ringColors = isDark ? [0x29ABE2, 0xFF4D6D] : [0x0A5FA8, 0x8B1A2E];
    const ring1 = makeRing(1.8, 0.012, ringColors[0], isDark ? 0.13 : 0.18);
    const ring2 = makeRing(1.2, 0.010, ringColors[1], isDark ? 0.09 : 0.14);
    ring1.rotation.x = 0.4; ring2.rotation.z = 0.9;
    scene.add(ring1, ring2);

    const onMove = (e) => { mouseRef.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: -(e.clientY / window.innerHeight - 0.5) * 2 }; };
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
      particles.rotation.y = t * 0.05 + mx * 0.15;
      particles.rotation.x = my * 0.06;
      ring1.rotation.y = t * 0.22; ring1.rotation.z = t * 0.09 + mx * 0.18;
      ring2.rotation.x = t * 0.16 + my * 0.25; ring2.rotation.y = t * 0.10;
      camera.position.x += (mx * 0.2 - camera.position.x) * 0.04;
      camera.position.y += (my * 0.1 - camera.position.y) * 0.04;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      camera.aspect = p.clientWidth / p.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(p.clientWidth, p.clientHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose(); geometry.dispose(); particleMat.dispose();
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}

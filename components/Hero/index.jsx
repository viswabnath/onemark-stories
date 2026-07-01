/**
 * Hero — Animated canvas particle field + GSAP text entrance.
 *
 * Canvas draws floating glowing particles that drift and pulse.
 * Particles form loose "rings" matching the wedding ring motif.
 * Pure canvas — no Three.js dependency needed.
 */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const WA_NUMBER = "918331978532";
const WA_MSG    = encodeURIComponent("Hi OneMark Stories! 👋 I'd love to get a custom digital experience made. Can we talk?");
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

/* ── Particle canvas ──────────────────────────────────────────── */
function useParticleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H, particles;

    const COLORS = ["#D4758C", "#C9A96E", "#29ABE2", "#F5EEF0"];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      init();
    }

    function rand(min, max) { return min + Math.random() * (max - min); }

    function init() {
      const count = Math.floor((W * H) / 8000);
      particles = Array.from({ length: count }, () => {
        // Bias particles to right half (where ornament used to be)
        const side = Math.random() > 0.35;
        return {
          x:     side ? rand(W * 0.45, W * 0.98) : rand(0, W),
          y:     rand(0, H),
          r:     rand(1, 3.5),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          vx:    rand(-0.25, 0.25),
          vy:    rand(-0.18, 0.18),
          alpha: rand(0.08, 0.55),
          pulse: rand(0, Math.PI * 2),   // phase offset
          pulseSpeed: rand(0.008, 0.022),
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,117,140,${0.06 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        grd.addColorStop(0, p.color + Math.round(alpha * 255).toString(16).padStart(2,"0"));
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(Math.min(alpha * 1.8, 1) * 255).toString(16).padStart(2,"0");
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef]);
}

/* ── Component ────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const tlRef      = useRef(null);

  useParticleCanvas(canvasRef);

  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();
    const section = sectionRef.current;
    if (!section) return;

    const words  = section.querySelectorAll(".hero__word");
    const sub    = section.querySelector(".hero__sub");
    const btns   = section.querySelectorAll(".hero__ctas > *");
    const scroll = section.querySelector(".hero__scroll");

    gsap.set([sub, btns, scroll], { opacity: 0, y: 16 });
    gsap.set(words, { yPercent: 115 });

    const tl = gsap.timeline({ delay: 0.2 });
    tlRef.current = tl;

    tl
      .to(words,  { yPercent: 0, stagger: 0.13, duration: 1.1, ease: "power4.out" })
      .to(sub,    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .to(btns,   { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.4")
      .to(scroll, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/* Particle canvas — fills hero */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Ambient blobs */}
      <div className="blob hero__blob-tl" />
      <div className="blob hero__blob-br" />

      {/* Content */}
      <div className="hero__content">
        <h1 className="hero__headline">
          <div className="hero__line"><span className="hero__word">Your</span></div>
          <div className="hero__line"><span className="hero__word hero__word--outline">Story</span></div>
          <div className="hero__line"><span className="hero__word">Deserves</span></div>
          <div className="hero__line"><span className="hero__word hero__word--gradient">a Page.</span></div>
        </h1>

        <div className="hero__bottom-row">
          <p className="hero__sub">
            One beautiful website for your wedding, birthday, or special event —
            your guests open one link and feel the magic before the day arrives.
          </p>
          <div className="hero__cta-block">
            <div className="hero__ctas">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="whatsapp-btn" data-hover>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start Your Story
              </a>
              <Link href="/#work" className="mag-btn" data-hover>
                See Our Works
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>

            {/* Trust bar — social proof + price anchor */}
            <div className="hero__trust" aria-label="Quick facts">
              <span className="hero__trust-item">✦ 50+ moments delivered</span>
              <span className="hero__trust-sep" aria-hidden="true" />
              <span className="hero__trust-item">From ₹2,999</span>
              <span className="hero__trust-sep" aria-hidden="true" />
              <span className="hero__trust-item">Live in 3 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>
    </section>
  );
}
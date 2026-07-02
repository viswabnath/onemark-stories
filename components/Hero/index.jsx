/**
 * Hero — Cinematic Dark Split Hero with Interactive 3D Polaroid Fan.
 *
 * Content: the two offerings (event website + digital album) in plain words,
 * with a rotating occasion so visitors instantly see it's for any celebration.
 *
 * Animations:
 *  - Floating golden canvas dust particles in the background.
 *  - Interactive 3D polaroid stack on the right that tilts with mouse movements
 *    and fans out on hover.
 *  - Headline lines fade up in sequence.
 *  - The occasion word rotates every couple of seconds with a drawn underline.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const WA_NUMBER = "918331978532";
const WA_MSG = encodeURIComponent("Hi OneMark Stories! I'd love a website and digital album for my event. Can we talk?");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const OCCASIONS = ["wedding", "birthday", "housewarming", "anniversary", "celebration"];

const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.6 + 0.1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 197, 131, ${p.alpha})`; // champagne gold dust
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

// Photos cycled in the hero stack (front-most flips to the back in turn).
const POLAROIDS = [
  { photo: "/showcase/vijay-rashmika-desktop.png", caption: "Vijay × Rashmika Wedding Counter" },
  { photo: "/albums/srinu-sai/cover-front.jpg",    caption: "Srinu & Sri Digital Album" },
  { photo: "/showcase/nazurul-sajida-desktop.png", caption: "Nazurul & Sajida Love Story" },
  { photo: "/showcase/yadlapalli-desktop.png",     caption: "Yadlapalli's Gruha Pravesam" },
];

// Depth slots: 0 = front … last = deepest back. Must cover every card.
const SLOT_STYLES = [
  { transform: "rotate(-2deg) translate(0px, 0px) scale(1)",         zIndex: 4, filter: "brightness(1)" },
  { transform: "rotate(7deg) translate(22px, -6px) scale(0.96)",     zIndex: 3, filter: "brightness(0.9)" },
  { transform: "rotate(-9deg) translate(-24px, -12px) scale(0.92)",  zIndex: 2, filter: "brightness(0.8)" },
  { transform: "rotate(12deg) translate(40px, -18px) scale(0.88)",   zIndex: 1, filter: "brightness(0.7)" },
];

const InteractivePolaroidStack = () => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [front, setFront] = useState(0);

  // Auto-advance: every few seconds the front photo swings to the back.
  useEffect(() => {
    const reduce = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setFront((f) => (f + 1) % POLAROIDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: -(mouseY / (rect.height / 2)) * 14, y: (mouseX / (rect.width / 2)) * 14 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="hero__interactive-container">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hero__polaroid-stack"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {POLAROIDS.map((card, i) => {
          const slot = (i - front + POLAROIDS.length) % POLAROIDS.length;
          const s = SLOT_STYLES[slot];
          return (
            <div
              key={card.photo}
              className="hero__polaroid-card"
              style={{
                transform: s.transform,
                zIndex: s.zIndex,
                filter: s.filter,
                // z-index steps at mid-swing so the outgoing photo dips behind
                transition:
                  "transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.9s ease, z-index 0s linear 0.45s",
              }}
            >
              <div className="hero__polaroid-photo" style={{ backgroundImage: `url('${card.photo}')` }} />
              <div className="hero__polaroid-caption">{card.caption}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Hero() {
  const sectionRef = useRef(null);
  const tlRef = useRef(null);
  const [idx, setIdx] = useState(0);

  /* Rotate the occasion word */
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % OCCASIONS.length), 2200);
    return () => clearInterval(t);
  }, []);

  /* Entrance */
  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll(".hero__line");
    const sub = section.querySelector(".hero__sub");
    const btns = section.querySelectorAll(".hero__ctas > *");
    const trust = section.querySelector(".hero__trust");
    const stack = section.querySelector(".hero__interactive-container");
    const scroll = section.querySelector(".hero__scroll");

    gsap.set(lines, { opacity: 0, y: 26 });
    gsap.set([sub, btns, trust, scroll], { opacity: 0, y: 16 });
    gsap.set(stack, { opacity: 0, scale: 0.9, rotateY: -35 });

    const tl = gsap.timeline({ delay: 0.15 });
    tlRef.current = tl;

    tl.to(stack, { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "power3.out" })
      .to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power3.out" }, "-=0.9")
      .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .to(btns, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.3)" }, "-=0.2")
      .to(trust, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(scroll, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef} style={{ background: "radial-gradient(ellipse at bottom, #120C1F 0%, #05020B 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 2rem 4rem" }}>
      {/* Background canvas particles */}
      <CanvasParticles />

      {/* Ambient background glows */}
      <div className="ambient-glow" style={{ top: "10%", left: "10%" }} />
      <div className="ambient-glow" style={{ bottom: "10%", right: "15%", background: "radial-gradient(circle, var(--gold) 20%, var(--cyan) 60%, transparent 100%)" }} />

      <div className="hero__split-container">

        {/* Left Side: Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="hero__eyebrow hero__line" style={{ color: "var(--gold)", letterSpacing: "0.4em" }}>OneMark Stories</span>

          <h1 className="hero__headline">
            <span className="hero__line">A website &amp; album</span>
            <span className="hero__line">
              for your{" "}
              <span className="hero__rotate">
                <span key={idx} className="hero__rotate-word">{OCCASIONS[idx]}</span>
                <span className="hero__rotate-underline" />
              </span>
            </span>
          </h1>

          <p className="hero__sub">
            Everything your guests need before the big day — and a beautiful,
            flip-through digital album to relive it after. All in one link you can
            share on WhatsApp.
          </p>

          <div className="hero__ctas">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" data-hover style={{ background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)", border: "none", boxShadow: "0 4px 20px rgba(224, 90, 127, 0.25)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start on WhatsApp
            </a>
            <Link href="/albums" className="mag-btn" data-hover style={{ border: "1px solid var(--border-2)", background: "rgba(255,255,255,0.03)", color: "var(--text)" }}>
              See a live album
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>

          <div className="hero__trust" aria-label="Quick facts" style={{ marginTop: "1rem" }}>
            <span className="hero__trust-item">Website + album together</span>
            <span className="hero__trust-sep" aria-hidden="true" />
            <span className="hero__trust-item">From ₹4,999</span>
            <span className="hero__trust-sep" aria-hidden="true" />
            <span className="hero__trust-item">Ready in days</span>
          </div>
        </div>

        {/* Right Side: Interactive 3D Polaroid Fan */}
        <InteractivePolaroidStack />

      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>
    </section>
  );
}

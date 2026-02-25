/**
 * Loader.jsx — GSAP-animated logo + progress bar
 */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Loader({ onDone }) {
  const [percent,   setPercent]   = useState(0);
  const [unmounted, setUnmounted] = useState(false);
  const loaderRef  = useRef(null);
  const barRef     = useRef(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(".loader__logo",         { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .fromTo(".loader__progress-wrap", { opacity: 0 },         { opacity: 1, duration: 0.5 }, "-=0.3");
  }, []);

  useEffect(() => {
    let cur = 0;
    const iv = setInterval(() => {
      cur = Math.min(cur + Math.random() * 9 + 3, 98);
      setPercent(Math.floor(cur));
      if (barRef.current) gsap.to(barRef.current, { width: `${cur}%`, duration: 0.1, ease: "none" });
      if (cur >= 98) {
        clearInterval(iv);
        setTimeout(() => {
          setPercent(100);
          if (barRef.current) gsap.to(barRef.current, { width: "100%", duration: 0.15 });
          setTimeout(() => {
            gsap.to(loaderRef.current, {
              opacity: 0, duration: 0.6, ease: "power2.in",
              onComplete: () => { setUnmounted(true); onDone?.(); }
            });
          }, 280);
        }, 200);
      }
    }, 55);
    return () => clearInterval(iv);
  }, [onDone]);

  if (unmounted) return null;

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__logo">
        <Image src="/stories-logo-white-resized.png" alt="OneMark Stories"
          width={200} height={80}
          style={{ objectFit: "contain", filter: "drop-shadow(0 0 20px rgba(41,171,226,0.3))" }}
          priority />
      </div>
      <div className="loader__progress-wrap">
        <div className="loader__bar-track">
          <div className="loader__bar-fill" ref={barRef} style={{ width: "0%" }} />
        </div>
        <span className="loader__pct">{percent}%</span>
      </div>
    </div>
  );
}

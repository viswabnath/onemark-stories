/**
 * Loader.jsx — GSAP-animated logo + progress bar
 */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Loader({ onDone }) {
  const [percent, setPercent] = useState(0);
  const [unmounted, setUnmounted] = useState(false);
  const loaderRef = useRef(null);
  const barRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(".loader__logo", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .fromTo(".loader__progress-wrap", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3");
  }, []);

  useEffect(() => {
    // Idempotent completion — safe to call from the progress interval, the
    // window 'load' event, or the hard-timeout fallback. Guarantees the loader
    // can never trap the page if timers/animations are throttled or frozen
    // (e.g. a backgrounded tab or low-power mode).
    // instant=true hard-cuts without the gsap fade — used by the safety cap so
    // dismissal never depends on the animation frame (which can be frozen).
    const finish = (instant = false) => {
      if (doneRef.current) return;
      doneRef.current = true;
      setPercent(100);
      if (instant || !loaderRef.current) {
        setUnmounted(true);
        onDone?.();
        return;
      }
      if (barRef.current) gsap.to(barRef.current, { width: "100%", duration: 0.15 });
      setTimeout(() => {
        gsap.to(loaderRef.current, {
          opacity: 0, duration: 0.6, ease: "power2.in",
          onComplete: () => { setUnmounted(true); onDone?.(); },
        });
      }, 220);
    };

    let cur = 0;
    const iv = setInterval(() => {
      if (doneRef.current) { clearInterval(iv); return; }
      cur = Math.min(cur + Math.random() * 9 + 3, 98);
      setPercent(Math.floor(cur));
      if (barRef.current) gsap.to(barRef.current, { width: `${cur}%`, duration: 0.1, ease: "none" });
      if (cur >= 98) {
        clearInterval(iv);
        setTimeout(finish, 200);
      }
    }, 55);

    // Dismiss once the page has actually loaded…
    const onLoad = () => setTimeout(finish, 400);
    if (typeof document !== "undefined" && document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    // …and a hard cap so it always clears even if 'load' never fires.
    const cap = setTimeout(() => finish(true), 6000);

    return () => {
      clearInterval(iv);
      clearTimeout(cap);
      window.removeEventListener("load", onLoad);
    };
  }, [onDone]);

  if (unmounted) return null;

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__logo">
        <Image src="/stories-logo-blue-resized.png" alt="OneMark Stories"
          width={200} height={80}
          style={{ objectFit: "contain", filter: "drop-shadow(0 0 24px rgba(190,94,119,0.25))" }}
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

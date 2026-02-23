/**
 * components/Loader.jsx
 *
 * Full-screen loading screen with the OneMark logo (image) as the centerpiece.
 * Replaces the old text-only "ONEMARK CREATIVE" placeholder.
 *
 * Logo files (placed in /public/):
 *   /public/logo-om.png         — the OM icon mark
 *   /public/onemark-logo.png    — full wordmark logo
 *
 * Animation sequence:
 *   1. Logo fades + slides up gently on mount
 *   2. Progress bar fills with randomised increments (feels organic)
 *   3. At 100% → short pause → entire loader fades out
 *   4. `onDone()` fires → parent renders the main content
 */

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Loader({ onDone }) {
  const [percent,   setPercent]   = useState(0);
  const [fading,    setFading]    = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current = Math.min(current + Math.random() * 9 + 3, 98);
      setPercent(Math.floor(current));

      if (current >= 98) {
        clearInterval(interval);
        setTimeout(() => {
          setPercent(100);
          setTimeout(() => {
            setFading(true);
            setTimeout(() => {
              setUnmounted(true);
              onDone?.();
            }, 650);
          }, 280);
        }, 200);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [onDone]);

  if (unmounted) return null;

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          9990,
        backgroundColor: "var(--bg)",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        gap:             32,
        opacity:         fading ? 0 : 1,
        visibility:      fading ? "hidden" : "visible",
        transition:      "opacity 0.65s ease, visibility 0.65s",
      }}
    >
      {/* ── Logo mark (animated in) ─────────────────────────────────────── */}
      <div
        style={{
          animation: "fadeUp 0.8s cubic-bezier(.16,1,.3,1) 0.1s both",
          display:   "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* OM icon mark */}
        <div
          style={{
            width:    72,
            height:   72,
            position: "relative",
            filter:   "drop-shadow(0 0 20px rgba(0,191,255,0.35))",
          }}
        >
         
          <Image
            src="/onemark-logo.png"
            alt="OneMark Creative"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────── */}
      <div
        style={{
          animation:    "fadeUp 0.8s cubic-bezier(.16,1,.3,1) 0.25s both",
          display:      "flex",
          flexDirection: "column",
          alignItems:   "center",
          gap:          10,
        }}
      >
        {/* Track */}
        <div
          style={{
            width:        160,
            height:       2,
            background:   "rgba(255,255,255,0.07)",
            borderRadius: 1,
            overflow:     "hidden",
          }}
        >
          {/* Fill */}
          <div
            style={{
              height:       "100%",
              width:        `${percent}%`,
              background:   "linear-gradient(90deg, var(--cyan), rgba(0,100,255,0.9))",
              borderRadius: 1,
              transition:   "width 0.05s linear",
              boxShadow:    "0 0 8px rgba(0,191,255,0.6)",
            }}
          />
        </div>

        {/* Percentage */}
        <span
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      10,
            letterSpacing: "0.18em",
            color:         "var(--muted)",
          }}
        >
          {percent}%
        </span>
      </div>
    </div>
  );
}

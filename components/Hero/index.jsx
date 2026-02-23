/**
 * components/Hero/index.jsx
 *
 * Hero section — Three.js scene + headline + CTAs.
 * Stats (50+, 100%, ∞) removed per client request.
 * Fonts updated to Syne display + Plus Jakarta Sans body.
 */

import HeroCanvas from "./HeroCanvas";
import dynamic from "next/dynamic";

const HEADLINE_WORDS = [
  { text: "We Make",   delay: "0.15s", isGradient: false },
  { text: "Moments",   delay: "0.28s", isGradient: true  },
  { text: "Timeless.", delay: "0.41s", isGradient: false },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        position:       "relative",
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
      }}
    >
      <HeroCanvas />

      {/* Ambient blobs */}
      <div className="blob" style={{
        width: 700, height: 700, top: -200, left: -200,
        background: "radial-gradient(circle, rgba(0,191,255,0.09) 0%, transparent 70%)",
      }} />
      <div className="blob" style={{
        width: 600, height: 600, bottom: -80, right: -180,
        background: "radial-gradient(circle, rgba(255,77,109,0.07) 0%, transparent 70%)",
      }} />

      <div
        style={{
          position:  "relative",
          zIndex:    10,
          textAlign: "center",
          padding:   "0 24px",
          maxWidth:  860,
          margin:    "0 auto",
        }}
      >
        {/* Label */}
        <div
          className="sec-label"
          style={{
            marginBottom: 28,
            animation:    "fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.1s both",
          }}
        >
          Premium Digital Experiences
        </div>

        {/* Headline — Syne 800 */}
        <h1
          style={{
            fontFamily:    "'Syne', sans-serif",
            fontWeight:    800,
            lineHeight:    0.93,
            letterSpacing: "-0.03em",
            fontSize:      "clamp(3.2rem, 9vw, 8.5rem)",
            marginBottom:  28,
          }}
        >
          {HEADLINE_WORDS.map(({ text, delay, isGradient }) => (
            <div key={text} style={{ overflow: "hidden", display: "block" }}>
              <span
                style={{
                  display:   "inline-block",
                  animation: `revealWord 1s cubic-bezier(.16,1,.3,1) ${delay} both`,
                  ...(isGradient
                    ? {
                        background:           "linear-gradient(135deg, var(--cyan), #0055FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor:  "transparent",
                      }
                    : { color: "#fff" }),
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            animation:  "fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.65s both",
            color:      "var(--muted)",
            fontSize:   15,
            lineHeight: 1.88,
            maxWidth:   500,
            margin:     "0 auto 40px",
            fontWeight: 400,
          }}
        >
          We craft immersive digital experiences — wedding keepsakes, live event pages,
          and portfolio sites — designed to surprise, delight, and be remembered forever.
        </p>

        {/* CTAs */}
        <div
          style={{
            animation:      "fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.82s both",
            display:        "flex",
            flexWrap:       "wrap",
            justifyContent: "center",
            gap:            14,
          }}
        >
          <a href="#work" className="mag-btn primary" data-hover>
            Explore Our Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href="https://onemark.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="mag-btn"
            data-hover
            style={{ textDecoration: "none" }}
          >
            Visit Studio
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position:       "absolute",
          bottom:         36,
          left:           "50%",
          transform:      "translateX(-50%)",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            8,
          zIndex:         10,
          animation:      "scrollBounce 2.2s ease-in-out infinite, fadeUp 1s 1.2s both",
        }}
      >
        <span style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      9,
          letterSpacing: "0.2em",
          color:         "var(--muted)",
        }}>
          SCROLL
        </span>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, var(--cyan), transparent)",
        }} />
      </div>
    </section>
  );
}

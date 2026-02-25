/**
 * pages/maintenance.jsx
 *
 * Maintenance page — show this when you need to take the site down.
 *
 * To activate: in next.config.ts add a redirect:
 *   { source: '/', destination: '/maintenance', permanent: false }
 *
 * Or simply navigate to /maintenance to preview it.
 */

import Head from "next/head";
import Image from "next/image";

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Under Maintenance · OneMark Stories</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/logo-om.png" type="image/png" />
      </Head>

      {/* Inline styles — no external CSS dependency needed for this page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500&family=Space+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080809; color: #EDEDF2; font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes pulse  { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#080809",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "40px 24px",
        position: "relative", overflow: "hidden",
      }}>

        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px", zIndex: 0,
        }} />

        {/* Glow blob */}
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Logo */}
          <div style={{
            width: 72, height: 72, position: "relative", margin: "0 auto 24px",
            filter: "drop-shadow(0 0 20px rgba(0,191,255,0.4))",
            animation: "float 3s ease-in-out infinite",
          }}>
            <Image src="/logo-om.png" alt="OneMark" fill style={{ objectFit: "contain" }} priority />
          </div>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            background: "rgba(255,181,71,0.12)",
            border: "1px solid rgba(255,181,71,0.3)",
            marginBottom: 28,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#FFB547",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              letterSpacing: ".15em", color: "#FFB547", textTransform: "uppercase",
            }}>
              Under Maintenance
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: .95,
            letterSpacing: "-.03em", marginBottom: 20,
          }}>
            We're polishing<br />
            <span style={{
              background: "linear-gradient(135deg, #00BFFF, #0055FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              something beautiful.
            </span>
          </h1>

          <p style={{
            fontSize: 15, color: "#5A5A6E", lineHeight: 1.8,
            maxWidth: 440, margin: "0 auto 36px",
          }}>
            OneMark Stories is currently undergoing scheduled maintenance. We'll be back very shortly with something even better.
          </p>

          {/* Spinning gear indicator */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 40,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              border: "2px solid rgba(0,191,255,.15)",
              borderTopColor: "#00BFFF",
              animation: "spin .9s linear infinite",
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              color: "#5A5A6E", letterSpacing: ".08em",
            }}>
              Back soon...
            </span>
          </div>

          {/* Links row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "10px 22px", borderRadius: 100,
                 background: "linear-gradient(135deg, #00BFFF, rgba(0,100,255,.85))",
                 color: "#000", textDecoration: "none",
                 fontFamily: "'Space Mono', monospace", fontSize: 11,
                 fontWeight: 700, letterSpacing: ".06em",
               }}>
              Visit onemark.digital
            </a>
            <a href="https://www.instagram.com/stories.onemark" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "10px 22px", borderRadius: 100,
                 border: "1px solid rgba(0,191,255,.3)", color: "#00BFFF",
                 textDecoration: "none",
                 fontFamily: "'Space Mono', monospace", fontSize: 11,
                 letterSpacing: ".06em",
               }}>
              @stories.onemark
            </a>
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 60,
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            color: "#2A2A32", letterSpacing: ".08em",
          }}>
            stories.onemark.co.in · Kakinada, India
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * pages/maintenance.jsx — Under maintenance preview page with dynamic Light/Dark theme support.
 */
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Maintenance() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("onemark-theme") || "dark";
    const timer = setTimeout(() => {
      setTheme(stored);
      if (stored === "light") {
        document.body.classList.add("light");
      } else {
        document.body.classList.remove("light");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const isLight = theme === "light";
  const bgColor = isLight ? "#FBF9F6" : "#0B0516";
  const textColor = isLight ? "#231F1C" : "#F2EDF5";
  const subColor = isLight ? "#6A5D54" : "#9D8FA3";
  const gridColor = isLight ? "rgba(35, 31, 28, 0.03)" : "rgba(255, 255, 255, 0.015)";

  return (
    <>
      <Head>
        <title>Under Maintenance · OneMark Stories</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/stories-logo-blue-resized.png" type="image/png" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${bgColor}; color: ${textColor}; font-family: 'Plus Jakarta Sans', sans-serif; transition: background 0.4s ease, color 0.4s ease; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes pulse  { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
      `}</style>

      <div style={{
        minHeight: "100vh", background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "40px 24px",
        position: "relative", overflow: "hidden",
        transition: "background 0.4s ease"
      }}>

        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px), linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
          backgroundSize: "64px 64px", zIndex: 0,
        }} />

        {/* Glow blob */}
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: isLight
            ? "radial-gradient(circle, rgba(194,162,106,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(224,90,127,0.06) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          <div style={{
            width: 155, height: 38, position: "relative",
            margin: "0 auto 24px",
            animation: "float 3s ease-in-out infinite",
          }}>
            <Image src={isLight ? "/stories-logo-blue-resized.png" : "/stories-logo-white-resized.png"} alt="OneMark Stories" fill style={{ objectFit: "contain" }} priority />
          </div>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            background: isLight ? "rgba(194,162,106,0.1)" : "rgba(229,197,131,0.08)",
            border: isLight ? "1px solid rgba(194,162,106,0.25)" : "1px solid rgba(229,197,131,0.2)",
            marginBottom: 28,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--gold)",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: ".1em", color: "var(--gold)", textTransform: "uppercase",
            }}>
              Under Maintenance
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500,
            fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.05,
            letterSpacing: "-.02em", marginBottom: 20,
          }}>
            We&rsquo;re polishing<br />
            <span style={{
              background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontWeight: 600,
              fontStyle: "italic"
            }}>
              something beautiful.
            </span>
          </h1>

          <p style={{
            fontSize: 14, color: subColor, lineHeight: 1.8,
            maxWidth: 440, margin: "0 auto 36px",
          }}>
            OneMark Stories is currently undergoing scheduled maintenance. We&rsquo;ll be back very shortly with something even better.
          </p>

          {/* Spinning gear indicator */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 40,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              border: `2px solid ${isLight ? "rgba(35,31,28,0.15)" : "rgba(255,255,255,0.15)"}`,
              borderTopColor: "var(--rose)",
              animation: "spin .9s linear infinite",
            }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 500,
              color: subColor, letterSpacing: ".05em",
            }}>
              Back soon...
            </span>
          </div>

          {/* Links row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "10px 24px", borderRadius: 100,
                 background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
                 color: "#fff", textDecoration: "none",
                 fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12,
                 fontWeight: 600,
                 boxShadow: isLight ? "0 4px 15px rgba(168,63,82,0.15)" : "0 4px 15px rgba(224,90,127,0.25)"
               }}>
              Visit onemark.digital
            </a>
            <a href="https://www.instagram.com/stories.onemark" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "10px 24px", borderRadius: 100,
                 border: `1px solid ${isLight ? "rgba(35,31,28,0.15)" : "rgba(255,255,255,0.15)"}`, 
                 color: textColor,
                 textDecoration: "none",
                 fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 500,
                 background: "rgba(255,255,255,0.02)"
               }}>
              @stories.onemark
            </a>
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 60,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10,
            color: subColor, letterSpacing: ".08em", opacity: 0.8
          }}>
            stories.onemark.co.in · Kakinada, India
          </div>
        </div>
      </div>
    </>
  );
}

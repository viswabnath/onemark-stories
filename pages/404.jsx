/**
 * pages/404.jsx — Custom 404 Not Found page with dynamic Light/Dark theme support.
 */
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("onemark-theme") || "dark";
    // Wrap in setTimeout to prevent synchronous state change warning during hydration
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
        <title>Page Not Found · OneMark Stories</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/stories-logo-blue-resized.png" type="image/png" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${bgColor}; color: ${textColor}; font-family: 'Plus Jakarta Sans', sans-serif; transition: background 0.4s ease, color 0.4s ease; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{
        minHeight: "100vh", background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "40px 24px",
        position: "relative", overflow: "hidden",
        transition: "background 0.4s ease"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
          backgroundSize: "64px 64px", zIndex: 0,
        }} />
        
        {/* Background glow */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: isLight 
            ? "radial-gradient(circle, rgba(194,162,106,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(224,90,127,0.06) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600,
          fontSize: "clamp(10rem, 30vw, 24rem)", 
          color: isLight ? "rgba(35,31,28,0.02)" : "rgba(255,255,255,0.02)",
          userSelect: "none", zIndex: 0, lineHeight: 1,
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }}>
          404
        </div>

        <div style={{ position: "relative", zIndex: 1, animation: "fadeUp .8s ease both" }}>
          <div style={{
            width: 155, height: 38, position: "relative",
            margin: "0 auto 24px",
            animation: "float 3s ease-in-out infinite",
          }}>
            <Image src={isLight ? "/stories-logo-blue-resized.png" : "/stories-logo-white-resized.png"} alt="OneMark Stories" fill style={{ objectFit: "contain" }} priority />
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500,
            fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1,
            letterSpacing: "-.015em", marginBottom: 14,
          }}>
            Page not found.
          </h1>
          <p style={{
            fontSize: 14, color: subColor, lineHeight: 1.8,
            maxWidth: 380, margin: "0 auto 32px",
          }}>
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{
              padding: "12px 28px", borderRadius: 100,
              background: isLight 
                ? "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)"
                : "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
              color: "#fff", textDecoration: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600,
              boxShadow: isLight ? "0 4px 15px rgba(168,63,82,0.15)" : "0 4px 15px rgba(224,90,127,0.25)"
            }}>
              ← Back Home
            </Link>
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "12px 28px", borderRadius: 100,
                 border: `1px solid ${isLight ? "rgba(35,31,28,0.15)" : "rgba(255,255,255,0.15)"}`, 
                 color: textColor,
                 textDecoration: "none",
                 fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 500,
                 background: "rgba(255,255,255,0.02)"
               }}>
              onemark.digital ↗
            </a>
          </div>
          <div style={{
            marginTop: 56, fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 10, color: subColor, letterSpacing: ".08em", opacity: 0.8
          }}>
            stories.onemark.co.in · Kakinada, India
          </div>
        </div>
      </div>
    </>
  );
}

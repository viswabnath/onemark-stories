/**
 * pages/_error.jsx — Custom error page for 500 errors, timeouts, and unexpected failures.
 * Supports dynamic Light/Dark theme styles.
 */
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function ErrorPage({ statusCode, message }) {
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

  const isTimeout = statusCode === 504 || statusCode === 408;
  const isUnavailable = statusCode === 503;

  const config = isTimeout ? {
    badge:    "Request Timed Out",
    badgeColor: "var(--rose)",
    title:    "Took too long.",
    sub:      "The request timed out. This is usually temporary — please try again in a moment.",
    cta:      "Try Again",
    ctaAction: "reload",
  } : isUnavailable ? {
    badge:    "Service Unavailable",
    badgeColor: "var(--gold)",
    title:    "Briefly unavailable.",
    sub:      "We're experiencing high demand or quick maintenance. Should be back any moment.",
    cta:      "Refresh",
    ctaAction: "reload",
  } : {
    badge:    `Error ${statusCode || "Unknown"}`,
    badgeColor: "var(--rose)",
    title:    "Something went wrong.",
    sub:      message || "An unexpected error occurred. Our team has been notified and is working on a fix.",
    cta:      "Go Home",
    ctaAction: "home",
  };

  return (
    <>
      <Head>
        <title>{config.badge} · OneMark Stories</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/stories-logo-blue-resized.png" type="image/png" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${bgColor}; color: ${textColor}; font-family: 'Plus Jakarta Sans', sans-serif; transition: background 0.4s ease, color 0.4s ease; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
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
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`,
          backgroundSize: "64px 64px", zIndex: 0,
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: `radial-gradient(circle, ${config.badgeColor}15 0%, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, animation: "fadeUp .8s ease both" }}>

          <div style={{
            width: 155, height: 38, position: "relative",
            margin: "0 auto 20px",
            animation: "float 3s ease-in-out infinite",
          }}>
            <Image src={isLight ? "/stories-logo-blue-resized.png" : "/stories-logo-white-resized.png"} alt="OneMark Stories" fill style={{ objectFit: "contain" }} priority />
          </div>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            background: "rgba(224,90,127,0.08)",
            border: "1px solid rgba(224,90,127,0.2)",
            marginBottom: 24,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: config.badgeColor,
              animation: "pulse 1.8s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 600,
              color: config.badgeColor, letterSpacing: ".1em", textTransform: "uppercase",
            }}>
              {config.badge}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500,
            fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1,
            letterSpacing: "-.025em", marginBottom: 16, color: textColor,
          }}>
            {config.title}
          </h1>

          <p style={{
            fontSize: 14, color: subColor, lineHeight: 1.8,
            maxWidth: 400, margin: "0 auto 32px",
          }}>
            {config.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {config.ctaAction === "reload" ? (
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "12px 28px", borderRadius: 100,
                  background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
                  color: "#fff", border: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12,
                  fontWeight: 600, cursor: "pointer",
                  boxShadow: isLight ? "0 4px 15px rgba(168,63,82,0.15)" : "0 4px 15px rgba(224,90,127,0.25)"
                }}>
                {config.cta}
              </button>
            ) : (
              <Link href="/" style={{
                padding: "12px 28px", borderRadius: 100,
                background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
                color: "#fff", textDecoration: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12,
                fontWeight: 600,
                boxShadow: isLight ? "0 4px 15px rgba(168,63,82,0.15)" : "0 4px 15px rgba(224,90,127,0.25)"
              }}>
                {config.cta}
              </Link>
            )}
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "12px 28px", borderRadius: 100,
                 border: `1px solid ${isLight ? "rgba(35,31,28,0.15)" : "rgba(255,255,255,0.15)"}`, 
                 color: textColor,
                 textDecoration: "none",
                 fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 500,
                 background: "rgba(255,255,255,0.02)"
               }}>
              Visit onemark.digital ↗
            </a>
          </div>

          <div style={{
            marginTop: 56,
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

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;

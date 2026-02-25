/**
 * pages/_error.jsx
 *
 * Custom error page for 500 errors, timeouts, and unexpected failures.
 * Next.js automatically shows this for server errors.
 *
 * Also handles:
 * - Gateway timeouts (504)
 * - Service unavailable (503)
 * - Internal server errors (500)
 */

import Head from "next/head";
import Image from "next/image";

function ErrorPage({ statusCode, message }) {
  const isTimeout = statusCode === 504 || statusCode === 408;
  const isUnavailable = statusCode === 503;

  const config = isTimeout ? {
    emoji:    "⏱️",
    badge:    "Request Timed Out",
    badgeColor: "#FF4D6D",
    title:    "Took too long.",
    sub:      "The request timed out. This is usually temporary — please try again in a moment.",
    cta:      "Try Again",
    ctaAction: "reload",
  } : isUnavailable ? {
    emoji:    "🔧",
    badge:    "Service Unavailable",
    badgeColor: "#FFB547",
    title:    "Briefly unavailable.",
    sub:      "We're experiencing high demand or quick maintenance. Should be back any moment.",
    cta:      "Refresh",
    ctaAction: "reload",
  } : {
    emoji:    "💫",
    badge:    `Error ${statusCode || "Unknown"}`,
    badgeColor: "#FF4D6D",
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
        <link rel="icon" href="/logo-om.png" type="image/png" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500&family=Space+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080809; color: #EDEDF2; font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes pulse  { 0%,100% { opacity: .4; box-shadow: 0 0 0 0 rgba(255,77,109,.4); } 50% { opacity: 1; box-shadow: 0 0 0 6px rgba(255,77,109,0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#080809",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "40px 24px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px)",
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

          {/* Logo */}
          <div style={{
            width: 60, height: 60, position: "relative", margin: "0 auto 20px",
            animation: "float 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 16px rgba(0,191,255,.35))",
          }}>
            <Image src="/logo-om.png" alt="OneMark" fill style={{ objectFit: "contain" }} priority />
          </div>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            background: `${config.badgeColor}18`,
            border: `1px solid ${config.badgeColor}44`,
            marginBottom: 24,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: config.badgeColor,
              animation: "pulse 1.8s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: config.badgeColor, letterSpacing: ".14em", textTransform: "uppercase",
            }}>
              {config.badge}
            </span>
          </div>

          {/* Big emoji */}
          <div style={{ fontSize: "clamp(4rem, 12vw, 8rem)", marginBottom: 16, lineHeight: 1 }}>
            {config.emoji}
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.05,
            letterSpacing: "-.025em", marginBottom: 16, color: "#EDEDF2",
          }}>
            {config.title}
          </h1>

          <p style={{
            fontSize: 14, color: "#5A5A6E", lineHeight: 1.8,
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
                  background: `linear-gradient(135deg, ${config.badgeColor}, ${config.badgeColor}AA)`,
                  color: "#fff", border: "none",
                  fontFamily: "'Space Mono', monospace", fontSize: 11,
                  fontWeight: 700, letterSpacing: ".06em",
                }}>
                {config.cta}
              </button>
            ) : (
              <a href="/" style={{
                padding: "12px 28px", borderRadius: 100,
                background: "linear-gradient(135deg, #00BFFF, rgba(0,100,255,.85))",
                color: "#000", textDecoration: "none",
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                fontWeight: 700, letterSpacing: ".06em",
              }}>
                {config.cta}
              </a>
            )}
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "12px 28px", borderRadius: 100,
                 border: "1px solid rgba(0,191,255,.3)", color: "#00BFFF",
                 textDecoration: "none",
                 fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".06em",
               }}>
              Visit onemark.digital
            </a>
          </div>

          <div style={{
            marginTop: 50,
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            color: "#2A2A32", letterSpacing: ".08em",
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

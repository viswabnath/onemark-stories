/**
 * pages/_error.jsx — Custom error page (500 / timeout / unavailable),
 * printed-invitation cream theme (matches site).
 */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function ErrorPage({ statusCode, message }) {
  const isTimeout = statusCode === 504 || statusCode === 408;
  const isUnavailable = statusCode === 503;

  const config = isTimeout ? {
    badge: "Request Timed Out",
    badgeColor: "var(--kumkum, var(--rose))",
    title: "Took too long.",
    sub: "The request timed out. This is usually temporary — please try again in a moment.",
    cta: "Try Again",
    ctaAction: "reload",
  } : isUnavailable ? {
    badge: "Service Unavailable",
    badgeColor: "var(--marigold, var(--gold))",
    title: "Briefly unavailable.",
    sub: "We're experiencing high demand or quick maintenance. Should be back any moment.",
    cta: "Refresh",
    ctaAction: "reload",
  } : {
    badge: `Error ${statusCode || "Unknown"}`,
    badgeColor: "var(--kumkum, var(--rose))",
    title: "Something went wrong.",
    sub: message || "An unexpected error occurred. Our team has been notified and is working on a fix.",
    cta: "Go Home",
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
        .err { min-height: 100svh; background: var(--bg); color: var(--text);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; text-align: center; padding: 40px 24px;
          position: relative; overflow: hidden; }
        .err__card { position: relative; z-index: 1; }
        @keyframes errFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes errPulse { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
      `}</style>

      <div className="err">
        <div className="err__card">
          <div style={{ width: 155, height: 38, position: "relative", margin: "0 auto 20px", animation: "errFloat 3s ease-in-out infinite" }}>
            <Image src="/stories-logo-blue-resized.png" alt="OneMark Stories" fill style={{ objectFit: "contain" }} priority />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "var(--surface)", border: "1px solid var(--border-2)", marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: config.badgeColor, animation: "errPulse 1.8s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: config.badgeColor, letterSpacing: ".12em", textTransform: "uppercase" }}>
              {config.badge}
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 16, color: "var(--ink, var(--text))" }}>
            {config.title}
          </h1>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, maxWidth: 400, margin: "0 auto 32px" }}>
            {config.sub}
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {config.ctaAction === "reload" ? (
              <button
                onClick={() => window.location.reload()}
                style={{ padding: "12px 28px", borderRadius: 2, background: "var(--kumkum, var(--rose))", color: "#F4ECDB", border: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {config.cta}
              </button>
            ) : (
              <Link href="/" style={{ padding: "12px 28px", borderRadius: 2, background: "var(--kumkum, var(--rose))", color: "#F4ECDB", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600 }}>
                {config.cta}
              </Link>
            )}
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{ padding: "12px 28px", borderRadius: 2, border: "1px solid var(--border-2)", color: "var(--text)", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
              Visit onemark.digital ↗
            </a>
          </div>

          <div style={{ marginTop: 56, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted, var(--text-2))", letterSpacing: ".12em", textTransform: "uppercase" }}>
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

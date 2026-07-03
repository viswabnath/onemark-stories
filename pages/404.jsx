/**
 * pages/404.jsx — Custom 404, printed-invitation cream theme (matches site).
 */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found · OneMark Stories</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/stories-logo-blue-resized.png" type="image/png" />
      </Head>

      <style>{`
        .err { min-height: 100svh; background: var(--bg); color: var(--text);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; text-align: center; padding: 40px 24px;
          position: relative; overflow: hidden; }
        .err__watermark { position: absolute; top: 42%; left: 50%;
          transform: translate(-50%,-50%); font-family: var(--font-display);
          font-weight: 600; font-size: clamp(9rem, 26vw, 20rem); line-height: 1;
          color: color-mix(in srgb, var(--gold) 6%, transparent);
          user-select: none; z-index: 0; pointer-events: none; }
        .err__card { position: relative; z-index: 1; }
        @keyframes errFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>

      <div className="err">
        <div className="err__watermark">404</div>

        <div className="err__card">
          <div style={{ width: 155, height: 38, position: "relative", margin: "0 auto 24px", animation: "errFloat 3s ease-in-out infinite" }}>
            <Image src="/stories-logo-blue-resized.png" alt="OneMark Stories" fill style={{ objectFit: "contain" }} priority />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-.015em", marginBottom: 14, color: "var(--ink, var(--text))" }}>
            Page not found.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, maxWidth: 380, margin: "0 auto 32px" }}>
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ padding: "12px 28px", borderRadius: 2, background: "var(--kumkum, var(--rose))", color: "#F4ECDB", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600 }}>
              ← Back home
            </Link>
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{ padding: "12px 28px", borderRadius: 2, border: "1px solid var(--border-2)", color: "var(--text)", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
              onemark.digital ↗
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

/**
 * pages/maintenance.jsx — Under-maintenance page, printed-invitation cream theme.
 */
import Head from "next/head";
import Image from "next/image";

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Under Maintenance · OneMark Stories</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/stories-logo-blue-resized.png" type="image/png" />
      </Head>

      <style>{`
        .mnt { min-height: 100svh; background: var(--bg); color: var(--text);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; text-align: center; padding: 40px 24px;
          position: relative; overflow: hidden; }
        @keyframes mntFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes mntSpin { to { transform: rotate(360deg); } }
        @keyframes mntPulse { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
      `}</style>

      <div className="mnt">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ width: 155, height: 38, position: "relative", margin: "0 auto 24px", animation: "mntFloat 3s ease-in-out infinite" }}>
            <Image src="/stories-logo-blue-resized.png" alt="OneMark Stories" fill style={{ objectFit: "contain" }} priority />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "var(--surface)", border: "1px solid var(--border-2)", marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--marigold, var(--gold))", animation: "mntPulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", color: "var(--marigold, var(--gold))", textTransform: "uppercase" }}>
              Under Maintenance
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.05, letterSpacing: "-.02em", marginBottom: 20, color: "var(--ink, var(--text))" }}>
            We&rsquo;re polishing<br />
            <span style={{ color: "var(--kumkum, var(--rose))", fontWeight: 600, fontStyle: "italic" }}>
              something beautiful.
            </span>
          </h1>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 36px" }}>
            OneMark Stories is currently undergoing scheduled maintenance. We&rsquo;ll be back very shortly with something even better.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid var(--border-2)", borderTopColor: "var(--kumkum, var(--rose))", animation: "mntSpin .9s linear infinite" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--text-2)", letterSpacing: ".05em" }}>
              Back soon...
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{ padding: "10px 24px", borderRadius: 2, background: "var(--kumkum, var(--rose))", color: "#F4ECDB", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600 }}>
              Visit onemark.digital
            </a>
            <a href="https://www.instagram.com/stories.onemark" target="_blank" rel="noopener noreferrer"
               style={{ padding: "10px 24px", borderRadius: 2, border: "1px solid var(--border-2)", color: "var(--text)", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
              @stories.onemark
            </a>
          </div>

          <div style={{ marginTop: 60, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted, var(--text-2))", letterSpacing: ".12em", textTransform: "uppercase" }}>
            stories.onemark.co.in · Kakinada, India
          </div>
        </div>
      </div>
    </>
  );
}

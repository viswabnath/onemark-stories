/**
 * pages/404.jsx — Custom 404 Not Found page
 */
import Head from "next/head";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found · OneMark Stories</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/logo-om.png" type="image/png" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500&family=Space+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080809; color: #EDEDF2; font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#080809",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "40px 24px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(10rem, 30vw, 28rem)", color: "rgba(0,191,255,.03)",
          userSelect: "none", zIndex: 0, lineHeight: 1,
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }}>
          404
        </div>

        <div style={{ position: "relative", zIndex: 1, animation: "fadeUp .8s ease both" }}>
          <div style={{
            width: 60, height: 60, position: "relative",
            margin: "0 auto 24px",
            animation: "float 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 16px rgba(0,191,255,.35))",
          }}>
            <Image src="/logo-om.png" alt="OneMark" fill style={{ objectFit: "contain" }} priority />
          </div>

          <div style={{ fontSize: "5rem", marginBottom: 12 }}>🔍</div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.05,
            letterSpacing: "-.025em", marginBottom: 14,
          }}>
            Page not found.
          </h1>
          <p style={{
            fontSize: 14, color: "#5A5A6E", lineHeight: 1.8,
            maxWidth: 380, margin: "0 auto 32px",
          }}>
            The page you're looking for doesn't exist or may have moved.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" style={{
              padding: "12px 28px", borderRadius: 100,
              background: "linear-gradient(135deg, #00BFFF, rgba(0,100,255,.85))",
              color: "#000", textDecoration: "none",
              fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
            }}>
              ← Back Home
            </a>
            <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
               style={{
                 padding: "12px 28px", borderRadius: 100,
                 border: "1px solid rgba(0,191,255,.3)", color: "#00BFFF",
                 textDecoration: "none",
                 fontFamily: "'Space Mono', monospace", fontSize: 11,
               }}>
              onemark.digital
            </a>
          </div>
          <div style={{
            marginTop: 50, fontFamily: "'Space Mono', monospace",
            fontSize: 9, color: "#2A2A32", letterSpacing: ".08em",
          }}>
            stories.onemark.co.in · Kakinada, India
          </div>
        </div>
      </div>
    </>
  );
}

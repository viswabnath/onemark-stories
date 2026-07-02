/**
 * pages/api/og.js — Dynamic Open Graph image generator
 *
 * Generates a 1200×630 social preview card on-the-fly.
 * Usage:
 *   /api/og                        → homepage card
 *   /api/og?title=Vijay+%C3%97+Rashmika&tag=Wedding&desc=Wedding+Celebration+Site
 *
 * In your <Head>:
 *   <meta property="og:image" content="https://stories.onemark.co.in/api/og?title=..." />
 *
 * INSTALL:
 *   npm install @vercel/og
 *
 * This uses Vercel's Edge Runtime OG image generation (Satori under the hood).
 * Works at zero cost on Vercel's free tier.
 */
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default function handler(req) {
  const { searchParams } = new URL(req.url);

  const title   = searchParams.get("title")   || "OneMark Stories";
  const tag     = searchParams.get("tag")     || "";
  const desc    = searchParams.get("desc")    || "Event websites & interactive digital albums, from ₹4,999";
  const num     = searchParams.get("num")     || "";

  // Light editorial palette
  const ROSE  = "#BE5E77";
  const GOLD  = "#A67C3D";
  const CYAN  = "#2C7DA0";
  const BG    = "#F6F1E9";
  const SURF  = "#FFFFFF";
  const TEXT  = "#2A211C";
  const MUTED = "#6E625A";

  const tagColor = tag === "Wedding" ? ROSE
    : tag === "Corporate" ? CYAN
    : tag === "Portfolio"  ? CYAN
    : tag === "Wedding Album" ? ROSE
    : tag === "Digital Album" ? ROSE
    : GOLD;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: BG,
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blob */}
        <div style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ROSE}22 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN}18 0%, transparent 70%)`,
        }} />

        {/* Brand bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: `linear-gradient(135deg, ${ROSE}, ${GOLD})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: "700", color: "#fff",
          }}>O</div>
          <span style={{ fontSize: "16px", color: MUTED, letterSpacing: "0.1em" }}>
            ONEMARK STORIES
          </span>
          {tag && (
            <div style={{
              marginLeft: "auto",
              padding: "6px 16px",
              borderRadius: "100px",
              border: `1px solid ${tagColor}44`,
              background: `${tagColor}18`,
              fontSize: "13px",
              color: tagColor,
              letterSpacing: "0.12em",
            }}>
              {tag.toUpperCase()}
            </div>
          )}
        </div>

        {/* Main title */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          {num && (
            <div style={{ fontSize: "14px", color: MUTED, marginBottom: "16px", letterSpacing: "0.15em" }}>
              PROJECT {num}
            </div>
          )}
          <div style={{
            fontSize: title.length > 30 ? "52px" : "68px",
            fontWeight: "700",
            color: TEXT,
            lineHeight: "1.1",
            marginBottom: "24px",
            maxWidth: "860px",
          }}>
            {title}
          </div>
          <div style={{
            fontSize: "22px",
            color: MUTED,
            lineHeight: "1.6",
            maxWidth: "700px",
          }}>
            {desc}
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "32px",
          borderTop: `1px solid rgba(42,33,28,0.12)`,
          marginTop: "32px",
        }}>
          <div style={{ fontSize: "15px", color: MUTED }}>
            stories.onemark.co.in
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["From ₹4,999", "Website + album", "Forever online"].map((pill) => (
              <div key={pill} style={{
                padding: "6px 14px",
                borderRadius: "100px",
                background: SURF,
                border: "1px solid rgba(42,33,28,0.12)",
                fontSize: "13px",
                color: TEXT,
              }}>
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
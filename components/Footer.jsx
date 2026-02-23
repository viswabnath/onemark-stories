import { useState } from "react";
import { SOCIALS } from "../data/socials";

// Social icon box component
function SocialIcon({ label, href, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      data-hover
      style={{
        width:          34,
        height:         34,
        borderRadius:   10,
        border:         `1px solid ${hovered ? "var(--cyan)" : "var(--border)"}`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     "'DM Mono', monospace",
        fontSize:       10,
        color:          hovered ? "var(--cyan)" : "var(--muted)",
        textDecoration: "none",
        transform:      hovered ? "translateY(-4px)" : "translateY(0)",
        transition:     "border-color 0.3s, color 0.3s, transform 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
    </a>
  );
}

// The direct link component with a smooth neon hover effect
function BrandLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://www.onemark.digital"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        color:          hovered ? "var(--cyan)" : "inherit",
        textShadow:     hovered ? "0 0 20px rgba(0,245,255,0.45)" : "none",
        transition:     "color 0.4s, text-shadow 0.4s",
        textDecoration: "none",
        fontWeight:     "bold",
        position:       "relative",
        display:        "inline-block",
      }}
    >
      OneMark
    </a>
  );
}

export default function Footer() {
  // Pre-filled WhatsApp message encoded for the URL
  const whatsappNumber = "919392704742";
  const whatsappMessage = encodeURIComponent("Hi OneMark! I've seen your creative website https://www.creative.onemark.co.in and I'm interested in starting a project.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer
      style={{
        position:    "relative",
        overflow:    "hidden",
        borderTop:   "1px solid var(--border)",
        paddingTop:  80,
      }}
    >
      {/* Ambient blob */}
      <div
        className="blob"
        style={{
          width:      400,
          height:     400,
          bottom:     -120,
          left:       "50%",
          transform:  "translateX(-50%)",
          background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px 60px" }}>

        {/* ── 1. Big ghost CTA ──────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 64, position: "relative" }}>
          <div
            style={{
              fontFamily:    "'Unbounded', sans-serif",
              fontWeight:    900,
              lineHeight:    0.9,
              letterSpacing: "-0.03em",
              userSelect:    "none",
            }}
          >
            {/* Ghost lines — barely visible, act as texture */}
            <div style={{ color: "rgba(255,255,255,0.04)", fontSize: "clamp(3rem, 9vw, 8rem)" }}>
              LET'S MAKE
            </div>
            <div style={{ color: "rgba(255,255,255,0.03)", fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
              SOMETHING
            </div>
            {/* Final word — breaks out in cyan as the readable CTA */}
            <div
              style={{
                color:      "var(--cyan)",
                fontSize:   "clamp(2rem, 6vw, 5.5rem)",
                textShadow: "0 0 80px rgba(0,245,255,0.2)",
              }}
            >
              UNFORGETTABLE.
            </div>
          </div>

          {/* WhatsApp CTA button */}
          <div style={{ marginTop: 32 }}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mag-btn primary"
              data-hover
              style={{ 
                textDecoration: "none", 
                fontSize: 14, 
                padding: "16px 42px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              Start a Project →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 36 }} />

        {/* ── 2. Bottom row ─────────────────────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            24,
          }}
        >
          {/* Social icons (Now just Instagram) */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SOCIALS.map((social) => (
              <SocialIcon key={social.href} {...social} />
            ))}
          </div>

          {/* Powered by OneMark */}
          <div
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      12,
              color:         "var(--muted)",
              letterSpacing: "0.08em",
              textAlign:     "center",
            }}
          >
            Powered by <BrandLink />
          </div>

          {/* Copyright */}
          <div
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      10,
              color:         "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            © 2026 Onemark Digital
          </div>
        </div>
      </div>
    </footer>
  );
}
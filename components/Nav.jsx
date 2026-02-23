/**
 * components/Nav.jsx
 *
 * Fixed top navbar using the OneMark logo image instead of text.
 * Becomes a frosted-glass bar on scroll.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position:        "fixed",
        top:             0, left: 0, right: 0,
        zIndex:          50,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "space-between",
        padding:         "16px 60px",
        background:      scrolled ? "rgba(8,8,9,0.90)" : "transparent",
        backdropFilter:  scrolled ? "blur(20px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottom:    scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition:      "background 0.5s, backdrop-filter 0.5s, border-color 0.5s",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        {/* OM Icon */}
        <div style={{ width: 30, height: 30, position: "relative", flexShrink: 0 }}>
          <Image
            src="/onemark-logo.png"
            alt="OneMark"
            fill
            style={{ objectFit: "contain", objectPosition: "left center" }}
          />
        </div>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[{ label: "Work", href: "#work" }, { label: "About", href: "#about" }].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            data-hover
            style={{
              fontFamily:     "'Plus Jakarta Sans', sans-serif",
              fontSize:       13,
              fontWeight:     500,
              color:          "var(--muted)",
              textDecoration: "none",
              letterSpacing:  ".02em",
              transition:     "color .3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
          >
            {label}
          </a>
        ))}
        <a
          href="https://onemark.digital"
          target="_blank"
          rel="noopener noreferrer"
          className="mag-btn"
          data-hover
          style={{ padding: "9px 20px", fontSize: 10, textDecoration: "none" }}
        >
          Studio →
        </a>
      </div>
    </nav>
  );
}

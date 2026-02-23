/**
 * components/Showcase/IframeScreen.jsx
 *
 * Renders an <iframe> with a loading spinner overlay.
 *
 * Props:
 * ───────
 *   src       — URL to load inside the iframe
 *   className — "iframe-desktop" or "iframe-mobile" (CSS scaling classes)
 *   title     — accessibility title for the iframe
 *
 * How the loading state works:
 * ─────────────────────────────
 * 1. Whenever `src` changes, `loading` resets to true → spinner shows.
 * 2. When the iframe fires `onLoad`, `loading` → false → spinner fades out.
 * 3. The spinner sits in an absolute overlay on top of the iframe.
 *
 * Sandbox attributes:
 * ────────────────────
 * We use a permissive sandbox so projects with JS/forms work,
 * but we still block popups from escaping the frame.
 * Remove `allow-popups` if you want stricter isolation.
 */

import { useState, useEffect } from "react";

export default function IframeScreen({ src, className, title = "Project Preview" }) {
  const [loading, setLoading] = useState(true);

  // Reset loading state whenever src URL changes
  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <>
      {/* Loading overlay — sits above iframe until it fires onLoad */}
      {loading && (
        <div
          style={{
            position:        "absolute",
            inset:           0,
            zIndex:          5,
            background:      "#050505",
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            justifyContent:  "center",
            gap:             12,
          }}
        >
          {/* Spinner ring */}
          <div
            style={{
              width:       22,
              height:      22,
              borderRadius: "50%",
              border:      "2px solid rgba(0,245,255,0.15)",
              borderTopColor: "var(--cyan)",
              animation:   "spin 0.9s linear infinite",
            }}
          />
          <span
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      11,
              color:         "var(--muted)",
              letterSpacing: "0.1em",
            }}
          >
            Loading preview…
          </span>
        </div>
      )}

      {/* The actual iframe */}
      <iframe
        src={src}
        className={className}
        title={title}
        onLoad={() => setLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
      />
    </>
  );
}

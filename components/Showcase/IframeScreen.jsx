/**
 * components/Showcase/IframeScreen.jsx
 *
 * CHANGES vs original:
 *  - Detects blocked iframes via a timeout heuristic (onLoad never fires
 *    if the frame is blocked by X-Frame-Options / CSP).
 *  - Shows a graceful fallback card instead of an infinite spinner.
 *  - Adds an "Open site" button in the fallback so the user can still visit.
 */
import { useState, useEffect, useRef } from "react";

const BLOCKED_TIMEOUT_MS = 8000; // if onLoad hasn't fired in 8s, assume blocked

export default function IframeScreen({
  src,
  nativeWidth  = 390,
  nativeHeight = 844,
  title        = "Project Preview",
}) {
  const wrapRef    = useRef(null);
  const timerRef   = useRef(null);
  const [scale,    setScale]   = useState(1);
  const [loading,  setLoading] = useState(true);
  const [blocked,  setBlocked] = useState(false);

  // Reset state when src changes
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setLoading(true);
    setBlocked(false);
    clearTimeout(timerRef.current);
  }

  // Scale to container via ResizeObserver
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w > 0) setScale(w / nativeWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [nativeWidth]);

  // Blocked-iframe timeout
  useEffect(() => {
    if (!loading) return;
    timerRef.current = setTimeout(() => {
      // Still loading after BLOCKED_TIMEOUT_MS → assume blocked
      setLoading(false);
      setBlocked(true);
    }, BLOCKED_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [src, loading]);

  function handleLoad() {
    clearTimeout(timerRef.current);
    setLoading(false);
    setBlocked(false);
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position:      "relative",
        width:         "100%",
        height:        0,
        paddingBottom: `${(nativeHeight / nativeWidth) * 100}%`,
        overflow:      "hidden",
        background:    "#0a0a0a",
        borderRadius:  "inherit",
      }}
    >
      {/* Loading spinner */}
      {loading && !blocked && (
        <div className="iframe-loading">
          <div className="iframe-spinner" />
          <span className="iframe-loading-text">Loading preview…</span>
        </div>
      )}

      {/* Fallback for blocked iframes */}
      {blocked && (
        <div className="iframe-loading" style={{ gap: "16px", padding: "24px", textAlign: "center" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M9 9l6 6M15 9l-6 6" />
          </svg>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
            Preview blocked by the site&rsquo;s security policy.
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "6px",
              padding:      "8px 18px",
              borderRadius: "100px",
              border:       "1px solid var(--cyan)",
              color:        "var(--cyan)",
              fontSize:     "11px",
              fontFamily:   "Outfit, sans-serif",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Open live site ↗
          </a>
        </div>
      )}

      {/* The actual iframe — always rendered so onLoad fires */}
      <iframe
        src={src}
        title={title}
        onLoad={handleLoad}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
        style={{
          position:        "absolute",
          top:             0,
          left:            0,
          width:           nativeWidth,
          height:          nativeHeight,
          border:          "none",
          transformOrigin: "top left",
          transform:       `scale(${scale})`,
          pointerEvents:   "all",
          // Hide iframe visually when blocked/loading (but keep it in DOM for onLoad)
          opacity:         loading || blocked ? 0 : 1,
          transition:      "opacity 0.4s ease",
        }}
      />
    </div>
  );
}
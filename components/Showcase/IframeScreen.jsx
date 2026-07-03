/**
 * components/Showcase/IframeScreen.jsx
 *
 * Only starts the blocked-detection timer once the iframe container
 * is actually visible in the viewport (IntersectionObserver). This
 * prevents the "Preview blocked" flash on slides the user hasn't
 * scrolled to yet — those slides mount immediately but are off-screen.
 */
import { useState, useEffect, useRef } from "react";

const BLOCKED_TIMEOUT_MS = 8000;

export default function IframeScreen({
  src,
  nativeWidth = 390,
  nativeHeight = 844,
  title = "Project Preview",
}) {
  const wrapRef = useRef(null);
  const timerRef = useRef(null);
  const loadedRef = useRef(false); // tracks if onLoad ever fired
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [inView, setInView] = useState(false);

  // Reset state when src changes
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setLoading(true);
    setBlocked(false);
    setInView(false);
  }

  useEffect(() => {
    loadedRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [src]);

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

  // Watch visibility — only mark inView once (no need to reset after load)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start blocked-detection timer only after the slide is in view
  useEffect(() => {
    if (!loading || !inView || loadedRef.current) return;
    timerRef.current = setTimeout(() => {
      setLoading(false);
      setBlocked(true);
    }, BLOCKED_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [src, loading, inView]);

  function handleLoad() {
    clearTimeout(timerRef.current);
    loadedRef.current = true;
    setLoading(false);
    setBlocked(false);
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingBottom: `${(nativeHeight / nativeWidth) * 100}%`,
        overflow: "hidden",
        background: "#0a0a0a",
        borderRadius: "inherit",
      }}
    >
      {/* Loading spinner — only when in view and still loading */}
      {loading && !blocked && inView && (
        <div className="iframe-loading">
          <div className="iframe-spinner" />
          <span className="iframe-loading-text">Loading preview…</span>
        </div>
      )}

      {/* Fallback for truly blocked iframes */}
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
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              borderRadius: "100px",
              border: "1px solid var(--cyan)",
              color: "var(--cyan)",
              fontSize: "11px",
              fontFamily: "Outfit, sans-serif",
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
          position: "absolute",
          top: 0,
          left: 0,
          width: nativeWidth,
          height: nativeHeight,
          border: "none",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          pointerEvents: "all",
          opacity: loading || blocked ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  );
}

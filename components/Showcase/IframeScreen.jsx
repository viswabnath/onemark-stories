/**
 * IframeScreen — Self-scaling iframe using ResizeObserver.
 *
 * Measures container width, computes scale = containerWidth / nativeWidth,
 * applies it as an inline transform — always correct across device sizes.
 */
import { useState, useEffect, useRef } from "react";

export default function IframeScreen({
  src,
  nativeWidth = 390,
  nativeHeight = 844,
  title = "Project Preview",
}) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);

  // Reset loading when src changes — setState-during-render is the React-recommended
  // pattern for resetting state derived from a prop change (replaces getDerivedStateFromProps)
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setLoading(true);
  }

  // Recompute scale whenever container resizes
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

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingBottom: `${(nativeHeight / nativeWidth) * 100}%`,
        overflow: "hidden",
        background: "#000",
      }}
    >
      {loading && (
        <div className="iframe-loading">
          <div className="iframe-spinner" />
          <span className="iframe-loading-text">Loading preview&hellip;</span>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        onLoad={() => setLoading(false)}
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
        }}
      />
    </div>
  );
}

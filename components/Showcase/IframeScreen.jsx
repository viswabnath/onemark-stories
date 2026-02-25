/**
 * IframeScreen — Self-scaling iframe using ResizeObserver.
 * 
 * Why not CSS container queries (100cqi)?
 *   container-type: inline-size interacts badly with position:absolute children
 *   in some browsers — the cqi value resolves incorrectly, producing wrong scale.
 * 
 * This approach:
 *   1. Measures the container's actual pixel width via ResizeObserver
 *   2. Computes scale = containerWidth / nativeWidth
 *   3. Applies it as a real inline transform — always correct
 */
import { useState, useEffect, useRef } from "react";

export default function IframeScreen({
  src,
  nativeWidth  = 390,   // iPhone viewport width
  nativeHeight = 844,   // iPhone viewport height
  title = "Project Preview",
}) {
  const wrapRef   = useRef(null);
  const [scale,   setScale]   = useState(1);
  const [loading, setLoading] = useState(true);

  // Recompute scale whenever container resizes
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width;
      if (w > 0) setScale(w / nativeWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [nativeWidth]);

  // Reset loading when src changes
  useEffect(() => { setLoading(true); }, [src]);

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
      {/* Spinner overlay while loading */}
      {loading && (
        <div className="iframe-loading">
          <div className="iframe-spinner" />
          <span className="iframe-loading-text">Loading preview…</span>
        </div>
      )}

      {/* Iframe rendered at native resolution, scaled down */}
      <iframe
        src={src}
        title={title}
        onLoad={() => setLoading(false)}
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
        }}
      />
    </div>
  );
}

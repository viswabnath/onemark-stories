/**
 * components/Showcase/IPhone.jsx
 *
 * A realistic iPhone frame that wraps any content via `children`.
 *
 * Structure:
 * ───────────
 *   .iphone-body     ← dark aluminum shell (rounded corners ~44px)
 *     .iphone-notch  ← Dynamic Island / pill notch at top
 *     .iphone-screen ← black display area (clips content)
 *       {children}   ← iframe goes here
 *     .iphone-home   ← home indicator pill at bottom
 *
 * Props:
 * ───────
 *   children      — the IframeScreen component
 *   screenHeight  — height of the screen area in px (default 460)
 */

export default function IPhone({ children, screenHeight = 460 }) {
  return (
    <div style={{ width: 260, margin: "0 auto" }}>
      <div
        className="glass glow-cyan"
        style={{
          background:    "#1A1A1C",
          borderRadius:  44,
          padding:       12,
          border:        "2px solid #2E2E30",
          boxShadow:     [
            "0 0 0 1px rgba(255,255,255,0.04) inset",
            "0 50px 100px rgba(0,0,0,0.9)",
          ].join(", "),
          position:      "relative",
        }}
      >
        {/* Dynamic Island / notch */}
        <div
          style={{
            position:     "absolute",
            top:          14,
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        80,
            height:       26,
            background:   "#0A0A0A",
            borderRadius: "0 0 16px 16px",
            zIndex:       5,
          }}
        />

        {/* Screen */}
        <div
          style={{
            background:    "#000",
            borderRadius:  34,
            height:        screenHeight,
            overflow:      "hidden",
            position:      "relative", // anchor for absolute iframe
          }}
        >
          {children}
        </div>

        {/* Home indicator pill */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            padding:        "10px 0 4px",
          }}
        >
          <div
            style={{
              width:        90,
              height:       4,
              background:   "#333",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

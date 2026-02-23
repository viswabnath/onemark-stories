/**
 * components/Showcase/MacBook.jsx
 *
 * A realistic MacBook laptop frame that wraps any content via `children`.
 *
 * Structure (from top to bottom):
 * ─────────────────────────────────
 *   .mac-body     ← dark aluminum lid (rounded top corners)
 *     .mac-screen ← black screen area (clips content, relative positioned)
 *       .mac-notch  ← tiny webcam dot
 *       {children}  ← iframe goes here
 *   .mac-base     ← thin silver bottom bezel
 *   .mac-stand    ← narrow aluminum foot/stand
 *
 * Why `position: relative` on .mac-screen?
 * ──────────────────────────────────────────
 * The iframe inside is `position: absolute` and scaled via transform.
 * The screen wrapper clips it (overflow: hidden) and provides the
 * positioning context so `top: 0; left: 0` lands correctly.
 *
 * Props:
 * ───────
 *   children  — the IframeScreen component to display inside
 *   height    — screen height in px (default 400)
 */

export default function MacBook({ children, height = 400 }) {
  return (
    <div
      className="glass glow-cyan"
      style={{
        width:      "100%",
        maxWidth:   640,
        transition: "all 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {/* Lid with screen */}
      <div
        style={{
          background:    "#1C1C1E",
          borderRadius:  "14px 14px 0 0",
          padding:       "12px 12px 0",
          border:        "1.5px solid #2E2E30",
          borderBottom:  "none",
          boxShadow:     "0 0 0 1px rgba(255,255,255,0.05) inset, 0 50px 100px rgba(0,0,0,0.9)",
        }}
      >
        {/* Screen area */}
        <div
          style={{
            background:    "#000",
            borderRadius:  "8px 8px 0 0",
            height:        height,
            overflow:      "hidden",
            position:      "relative", // anchor for absolute iframe
          }}
        >
          {/* Webcam dot */}
          <div
            style={{
              position:     "absolute",
              top:          10,
              left:         "50%",
              transform:    "translateX(-50%)",
              width:        7,
              height:       7,
              borderRadius: "50%",
              background:   "#1C1C1E",
              zIndex:       5,
            }}
          />
          {/* Content (IframeScreen) */}
          {children}
        </div>
      </div>

      {/* Bottom bezel */}
      <div
        style={{
          height:        18,
          background:    "linear-gradient(to bottom, #2A2A2C, #1C1C1E)",
          borderRadius:  "0 0 4px 4px",
          border:        "1.5px solid #2E2E30",
          borderTop:     "none",
          display:       "flex",
          alignItems:    "center",
          justifyContent: "center",
        }}
      >
        {/* Indent/slot in base */}
        <div
          style={{
            width:        56,
            height:       4,
            background:   "#111",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>

      {/* Stand/foot */}
      <div
        style={{
          height:        10,
          background:    "#16161A",
          margin:        "0 70px",
          borderRadius:  "0 0 8px 8px",
          border:        "1px solid #222",
          borderTop:     "none",
        }}
      />
    </div>
  );
}

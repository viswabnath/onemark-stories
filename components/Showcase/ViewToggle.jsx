/**
 * components/Showcase/ViewToggle.jsx
 *
 * A pill-shaped toggle switch between "Desktop" and "Mobile" preview modes.
 *
 * Design:
 * ────────
 * • Dark pill track with two text labels inside.
 * • A glowing cyan thumb slides left (Desktop) or right (Mobile) using CSS transition.
 * • The active label turns black (sits on top of the cyan thumb).
 * • The inactive label stays muted gray.
 *
 * Props:
 * ───────
 *   isMobile  — boolean: true = mobile view active
 *   onToggle  — function: called when user clicks to switch
 *
 * Note: This component is purely presentational (controlled component).
 * The `isMobile` state lives in the parent Showcase/index.jsx.
 */

export default function ViewToggle({ isMobile, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {/* Label */}
      <span
        style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      10,
          color:         "var(--muted)",
          letterSpacing: "0.08em",
        }}
      >
        Preview mode
      </span>

      {/* Toggle track */}
      <div
        onClick={onToggle}
        data-hover
        style={{
          position:      "relative",
          width:         130,
          height:        38,
          background:    "rgba(255,255,255,0.06)",
          borderRadius:  100,
          border:        "1px solid rgba(255,255,255,0.1)",
          display:       "flex",
          alignItems:    "center",
          overflow:      "hidden",
          userSelect:    "none",
        }}
      >
        {/*
         * Sliding thumb — translates via CSS `left` transition.
         * left: 4px   → Desktop side (left)
         * left: 69px  → Mobile side (right)
         */}
        <div
          style={{
            position:     "absolute",
            top:          4,
            left:         isMobile ? 69 : 4,
            height:       30,
            width:        57,
            background:   "linear-gradient(135deg, var(--cyan), rgba(0,180,255,0.8))",
            borderRadius: 100,
            boxShadow:    "0 0 18px rgba(0,245,255,0.5)",
            transition:   "left 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />

        {/* "Desktop" label */}
        <span
          style={{
            position:      "relative",
            zIndex:        1,
            flex:          1,
            textAlign:     "center",
            fontFamily:    "'DM Mono', monospace",
            fontSize:      10,
            letterSpacing: "0.04em",
            fontWeight:    isMobile ? 400 : 700,
            color:         isMobile ? "var(--muted)" : "#000",
            transition:    "color 0.3s",
            userSelect:    "none",
          }}
        >
          Desktop
        </span>

        {/* "Mobile" label */}
        <span
          style={{
            position:      "relative",
            zIndex:        1,
            flex:          1,
            textAlign:     "center",
            fontFamily:    "'DM Mono', monospace",
            fontSize:      10,
            letterSpacing: "0.04em",
            fontWeight:    isMobile ? 700 : 400,
            color:         isMobile ? "#000" : "var(--muted)",
            transition:    "color 0.3s",
            userSelect:    "none",
          }}
        >
          Mobile
        </span>
      </div>
    </div>
  );
}

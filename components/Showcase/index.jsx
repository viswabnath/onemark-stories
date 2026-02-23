/**
 * components/Showcase/index.jsx
 *
 * The "Interactive Showcase" section — the core feature of the site.
 *
 * State managed here:
 * ────────────────────
 *   activeId   — which project is selected (number, 0–5)
 *   isMobile   — is the mobile preview frame active (boolean)
 *   switching  — is a frame transition in progress (boolean)
 *   currentUrl — the URL currently loaded in the iframe
 *
 * How frame switching works:
 * ───────────────────────────
 * 1. User clicks a project card → `handleProjectSelect(id)` fires
 * 2. `switching = true` → CSS class "frame-switching" dims & shrinks frame
 * 3. After 280ms (CSS transition time), update `activeId` + `currentUrl`
 * 4. `switching = false` → frame fades back in with new content
 *
 * This gives a cinematic fade-swap effect without Framer Motion.
 * Same pattern applies to the Desktop ↔ Mobile toggle.
 *
 * Child components used:
 * ───────────────────────
 *   ProjectList   — left panel (cards)
 *   ViewToggle    — desktop/mobile pill switch
 *   MacBook       — laptop frame
 *   IPhone        — phone frame
 *   IframeScreen  — iframe + loading spinner (used inside both frames)
 */

import { useState, useCallback } from "react";
import { PROJECTS } from "../../data/projects";
import ProjectList  from "./ProjectList";
import ViewToggle   from "./ViewToggle";
import MacBook      from "./MacBook";
import IPhone       from "./IPhone";
import IframeScreen from "./IframeScreen";

// Transition duration (ms) — must match CSS transition time
const SWITCH_DURATION = 280;

export default function Showcase() {
  const [activeId,    setActiveId]    = useState(0);
  const [isMobile,    setIsMobile]    = useState(false);
  const [switching,   setSwitching]   = useState(false);
  const [currentUrl,  setCurrentUrl]  = useState(PROJECTS[0].url);

  // ── Switch project ──────────────────────────────────────────────────────────
  const handleProjectSelect = useCallback((id) => {
    if (id === activeId) return; // no-op if already selected

    setSwitching(true);
    setTimeout(() => {
      setActiveId(id);
      setCurrentUrl(PROJECTS[id].url);
      setSwitching(false);
    }, SWITCH_DURATION);
  }, [activeId]);

  // ── Toggle desktop/mobile ───────────────────────────────────────────────────
  const handleToggle = useCallback(() => {
    setSwitching(true);
    setTimeout(() => {
      setIsMobile((prev) => !prev);
      setSwitching(false);
    }, SWITCH_DURATION);
  }, []);

  const activeProject = PROJECTS.find((p) => p.id === activeId);

  return (
    <section
      id="work"
      style={{ position: "relative", padding: "120px 60px", overflow: "hidden" }}
    >
      {/* Ambient blob */}
      <div
        className="blob"
        style={{
          width:      450,
          height:     450,
          top:        80,
          right:      -80,
          background: "radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 56 }}>
          <div className="sec-label" style={{ marginBottom: 14 }}>
            Interactive Showcase
          </div>
          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.1,
            }}
          >
            Live Builds.
            <br />
            <span style={{ color: "var(--muted)", fontWeight: 200 }}>
              No Redirects.
            </span>
          </h2>
        </div>

        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <div
          className="showcase-cols"
          style={{ display: "flex", gap: 36, alignItems: "flex-start" }}
        >
          {/* LEFT: Project list panel */}
          <ProjectList
            activeId={activeId}
            onSelect={handleProjectSelect}
          />

          {/* RIGHT: Preview area */}
          <div
            style={{
              flex:          1,
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           20,
            }}
          >
            {/* Toggle switch */}
            <ViewToggle isMobile={isMobile} onToggle={handleToggle} />

            {/* ── Frame area — dims during transitions ─────────────────── */}
            <div
              style={{
                width:      "100%",
                display:    "flex",
                justifyContent: "center",
                // Fade + shrink while switching
                opacity:   switching ? 0   : 1,
                transform: switching ? "scale(0.96)" : "scale(1)",
                transition: `opacity ${SWITCH_DURATION}ms ease, transform ${SWITCH_DURATION}ms ease`,
              }}
            >
              {isMobile ? (
                /* ── iPhone frame ─── */
                <IPhone>
                  <IframeScreen
                    src={currentUrl}
                    className="iframe-mobile"
                    title={`${activeProject?.title} — Mobile Preview`}
                  />
                </IPhone>
              ) : (
                /* ── MacBook frame ─── */
                <MacBook height={400}>
                  <IframeScreen
                    src={currentUrl}
                    className="iframe-desktop"
                    title={`${activeProject?.title} — Desktop Preview`}
                  />
                </MacBook>
              )}
            </div>

            {/* ── Info bar below the frame ─────────────────────────────── */}
            <div
              className="glass"
              style={{
                borderRadius: 14,
                padding:      "14px 22px",
                display:      "flex",
                justifyContent: "space-between",
                alignItems:   "center",
                width:        "100%",
                maxWidth:     620,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize:   12,
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {activeProject?.title}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  {activeProject?.desc}
                </div>
              </div>
              <div
                style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      10,
                  color:         "var(--cyan)",
                  letterSpacing: "0.1em",
                }}
              >
                {activeProject?.num} / {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * components/Showcase/ProjectList.jsx
 *
 * Left panel — project cards + expandable description.
 *
 * Each card shows: tag / number / title / short desc
 * When a card is ACTIVE, a description panel expands below it showing:
 *   - "about" paragraph
 *   - "why it matters" (importance) paragraph
 *   - 3 feature bullets
 *
 * This gives users context on every project without needing a separate page.
 */

import { PROJECTS } from "../../data/projects";

function FeaturePill({ text }) {
  return (
    <div
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           6,
        padding:       "5px 10px",
        borderRadius:  100,
        background:    "rgba(0,191,255,0.08)",
        border:        "1px solid rgba(0,191,255,0.18)",
        fontSize:      10,
        color:         "var(--cyan)",
        fontFamily:    "'Space Mono', monospace",
        letterSpacing: ".04em",
        whiteSpace:    "nowrap",
      }}
    >
      <span style={{ color: "var(--cyan)", fontSize: 8 }}>✦</span>
      {text}
    </div>
  );
}

export default function ProjectList({ activeId, onSelect }) {
  const activeProject = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <div style={{ width: 320, flexShrink: 0 }}>

      {/* ── Card list ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {PROJECTS.map((project) => {
          const isActive = project.id === activeId;

          return (
            <div key={project.id}>
              {/* Card header — always visible */}
              <div
                onClick={() => onSelect(project.id)}
                data-hover
                style={{
                  padding:      "14px 18px",
                  borderRadius: isActive ? "12px 12px 0 0" : 12,
                  border:       `1px solid ${isActive ? "rgba(0,191,255,0.5)" : "transparent"}`,
                  borderBottom: isActive ? "1px solid rgba(0,191,255,0.08)" : undefined,
                  background:   isActive ? "rgba(0,191,255,0.06)" : "transparent",
                  transform:    isActive ? "translateX(4px)" : "translateX(0)",
                  transition:   "border-color .3s, background .3s, transform .3s, border-radius .3s",
                  position:     "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(0,191,255,0.22)";
                    e.currentTarget.style.background  = "rgba(0,191,255,0.03)";
                    e.currentTarget.style.transform   = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.background  = "transparent";
                    e.currentTarget.style.transform   = "translateX(0)";
                  }
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{
                    fontFamily:    "'Space Mono', monospace",
                    fontSize:      9,
                    letterSpacing: ".18em",
                    color:         project.color,
                    textTransform: "uppercase",
                  }}>
                    {project.tag}
                  </span>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize:   9,
                    color:      "var(--muted)",
                  }}>
                    {project.num}
                  </span>
                </div>

                <div style={{
                  fontFamily:   "'Syne', sans-serif",
                  fontSize:     13,
                  fontWeight:   700,
                  lineHeight:   1.3,
                  marginBottom: 3,
                  color:        "#fff",
                }}>
                  {project.title}
                </div>

                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 400 }}>
                  {project.desc}
                </div>
              </div>

              {/* ── Expandable info panel — only for active project ─── */}
              <div
                style={{
                  maxHeight:    isActive ? 400 : 0,
                  overflow:     "hidden",
                  transition:   "max-height 0.5s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <div
                  style={{
                    background:   "rgba(0,191,255,0.04)",
                    border:       "1px solid rgba(0,191,255,0.5)",
                    borderTop:    "none",
                    borderRadius: "0 0 12px 12px",
                    padding:      "14px 18px 16px",
                    transform:    "translateX(4px)",
                  }}
                >
                  {/* About */}
                  <p style={{
                    fontSize:     12,
                    lineHeight:   1.75,
                    color:        "rgba(237,237,242,0.75)",
                    marginBottom: 10,
                  }}>
                    {project.about}
                  </p>

                  {/* Why it matters */}
                  <div
                    style={{
                      borderLeft:   "2px solid var(--cyan)",
                      paddingLeft:  10,
                      marginBottom: 12,
                    }}
                  >
                    <div style={{
                      fontFamily:    "'Space Mono', monospace",
                      fontSize:      8,
                      letterSpacing: ".15em",
                      color:         "var(--cyan)",
                      marginBottom:  5,
                      textTransform: "uppercase",
                    }}>
                      Why it matters
                    </div>
                    <p style={{
                      fontSize:   11,
                      lineHeight: 1.7,
                      color:      "rgba(237,237,242,0.65)",
                    }}>
                      {project.importance}
                    </p>
                  </div>

                  {/* Feature pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.features.map((f) => (
                      <FeaturePill key={f} text={f} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Open link */}
      <a
        href={activeProject.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mag-btn"
        data-hover
        style={{
          marginTop:      16,
          display:        "flex",
          justifyContent: "center",
          textDecoration: "none",
          fontSize:       10,
        }}
      >
        Open Live Site
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      </a>
    </div>
  );
}

/**
 * components/About.jsx
 *
 * The "Who We Are" section — split into a text column and a 2×2 card grid.
 *
 * Layout:
 * ────────
 *   [Left column]           [Right column]
 *   Section label           💍 Weddings  |  🎉 Events
 *   Headline                🖥️ Portfolios | 🎁 Surprises
 *   Two paragraphs
 *   CTA button
 *
 * Card hover effect:
 * ───────────────────
 * Each card lifts up 4px and deepens its shadow on hover — done
 * with inline `onMouseEnter/Leave` because Tailwind hover doesn't
 * support translateY easily without a plugin.
 */

// Service cards data — easy to edit/add
const SERVICES = [
  {
    emoji: "💍",
    title: "Weddings",
    desc:  "Countdown pages, ceremony sites, memory keepsakes",
    borderColor: "rgba(0,245,255,0.15)",
  },
  {
    emoji: "🎉",
    title: "Events",
    desc:  "Live counters, RSVP portals, event dashboards",
    borderColor: "rgba(255,77,109,0.12)",
  },
  {
    emoji: "🖥️",
    title: "Portfolios",
    desc:  "Immersive, animated personal showcases",
    borderColor: "rgba(255,181,71,0.12)",
  },
  {
    emoji: "🎁",
    title: "Surprises",
    desc:  "Birthday reveals, anniversary pages, secret sites",
    borderColor: "rgba(0,245,255,0.1)",
  },
];

function ServiceCard({ emoji, title, desc, borderColor }) {
  return (
    <div
      className="glass"
      data-hover
      style={{
        borderRadius:  18,
        padding:       22,
        borderColor:   borderColor,
        transition:    "transform 0.35s, box-shadow 0.35s, border-color 0.35s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform  = "translateY(-4px)";
        e.currentTarget.style.boxShadow  = "0 20px 60px rgba(0,0,0,0.4)";
        e.currentTarget.style.borderColor = borderColor.replace("0.1", "0.3");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform  = "translateY(0)";
        e.currentTarget.style.boxShadow  = "none";
        e.currentTarget.style.borderColor = borderColor;
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 12 }}>{emoji}</div>
      <div
        style={{
          fontFamily:   "'Unbounded', sans-serif",
          fontSize:     12,
          fontWeight:   700,
          marginBottom: 8,
          color:        "#fff",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.65 }}>
        {desc}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{ position: "relative", padding: "120px 60px", overflow: "hidden" }}
    >
      {/* Ambient blob */}
      <div
        className="blob"
        style={{
          width:      550,
          height:     550,
          top:        0,
          left:       -100,
          background: "radial-gradient(circle, rgba(255,77,109,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth:            1100,
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 64,
          alignItems:          "center",
        }}
      >
        {/* ── Left: text content ───────────────────────────────────────── */}
        <div>
          <div className="sec-label" style={{ marginBottom: 20 }}>
            Who We Are
          </div>

          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(1.8rem, 4vw, 2.8rem)",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            We don't build websites.
            <br />
            <span style={{ color: "var(--cyan)" }}>We build feelings.</span>
          </h2>

          <p
            style={{
              color:        "var(--muted)",
              fontSize:     15,
              lineHeight:   1.85,
              marginBottom: 16,
            }}
          >
            OneMark Creative is the bespoke arm of{" "}
            <strong style={{ color: "#fff" }}>Onemark Digital</strong> — dedicated to
            crafting one-of-a-kind digital experiences for life's most memorable moments.
          </p>

          <p
            style={{
              color:        "var(--muted)",
              fontSize:     15,
              lineHeight:   1.85,
              marginBottom: 32,
            }}
          >
            From intimate wedding countdown pages to vibrant event dashboards, every pixel
            is placed with intention. We build for the heart, not just the screen.
          </p>

          <a
            href="https://onemark.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="mag-btn"
            data-hover
            style={{ textDecoration: "none" }}
          >
            Learn More About Us →
          </a>
        </div>

        {/* ── Right: 2×2 service cards grid ────────────────────────────── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 14,
          }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

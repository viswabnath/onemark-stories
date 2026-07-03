/**
 * components/Testimonials.jsx
 *
 * Implements a dual opposing infinite marquee scrolling track system in pure CSS.
 * Tracks automatically pause on mouse hover and feature rich hover effects.
 */


const TESTIMONIALS = [
  { name: "Sindhu Kethan", tag: "Housewarming", color: "#B9832B", quote: "We didn't want a plain WhatsApp message for our Gruha Pravesam — we wanted something as auspicious as the occasion itself. They built a webpage that felt sacred. Every elder who opened it called to say how beautiful it was." },
  { name: "Ganesh & Srija", tag: "Wedding", color: "#145A50", quote: "The countdown timer that turned into fireworks at our Muhurtham time was magical. Our families in the US felt like they were right there with us." },
  { name: "Viswanath B.", tag: "Portfolio", color: "#145A50", quote: "I'd been putting off building a portfolio for two years. OneMark had mine live in four days — and I landed my first freelance client the week after." },
  { name: "Arun & Spandana", tag: "Wedding", color: "#96222B", quote: "From Ladakh to London — they captured our entire journey in one beautiful page. It's been months and relatives still share the link." },
  { name: "Meghana R.", tag: "Birthday", color: "#96222B", quote: "My dad's 60th birthday page had a countdown, photo gallery, and a surprise video message section. He cried. Worth every rupee." },
  { name: "Nazurul & Sajida", tag: "Wedding", color: "#B9832B", quote: "Our guests couldn't stop talking about the website. It felt like a mini movie of our love story — everyone knew exactly where to go and when to arrive." },
  { name: "Priya Events Co.", tag: "Corporate", color: "#B9832B", quote: "We used the Grand tier for a product launch and had over 3,000 visitors on day one without the site even hiccupping. The interactive gallery was a showstopper." },
  { name: "Srinu & Sai", tag: "Wedding", color: "#96222B", quote: "They turned our wedding into chapters — like a film. The photo galleries for each event made it so easy to relive every moment afterwards." },
  { name: "Venkat & Nandini", tag: "Wedding", color: "#B9832B", quote: "We replaced 500 printed cards with one link. Saved money, saved time, and honestly it looked a hundred times better than any paper invite could." }
];

export default function Testimonials() {
  const firstGroup = TESTIMONIALS.slice(0, 5);
  const secondGroup = TESTIMONIALS.slice(5);

  const leftGroup = [...firstGroup, ...firstGroup];
  const rightGroup = [...secondGroup, ...secondGroup];

  return (
    <section id="testimonials" className="testimonials-section" style={{ position: "relative", overflow: "hidden", padding: "6rem 0" }}>
      <div className="ambient-glow" style={{ top: "20%", right: "10%", width: "400px", opacity: 0.08 }} />

      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 1.5rem" }}>
        <span className="sec-label" style={{ color: "var(--gold)" }}>What Clients Say</span>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, color: "var(--text)", fontFamily: "var(--font-display)", marginTop: "0.5rem" }}>
          Heard from <span>real people.</span>
        </h2>
      </div>

      <div className="marquee-container">
        {/* Track 1: Leftward motion */}
        <div className="marquee-track marquee-track--left">
          {leftGroup.map((t, idx) => (
            <div key={`${t.name}-left-${idx}`} className="marquee-card" style={{ borderLeft: `3px solid ${t.color}` }}>
              <div style={{
                display: "inline-flex", alignItems: "center",
                padding: "3px 10px", borderRadius: "100px",
                border: `1px solid ${t.color}22`, background: `${t.color}11`,
                fontSize: "10px", color: t.color,
                letterSpacing: "0.12em", marginBottom: "12px", width: "fit-content",
                fontWeight: 600,
                textTransform: "uppercase"
              }}>
                {t.tag}
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text-2)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: `${t.color}22`, color: t.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "bold"
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", margin: 0 }}>{t.name}</h4>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>{t.tag} Guest</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Track 2: Rightward motion */}
        <div className="marquee-track marquee-track--right">
          {rightGroup.map((t, idx) => (
            <div key={`${t.name}-right-${idx}`} className="marquee-card" style={{ borderLeft: `3px solid ${t.color}` }}>
              <div style={{
                display: "inline-flex", alignItems: "center",
                padding: "3px 10px", borderRadius: "100px",
                border: `1px solid ${t.color}22`, background: `${t.color}11`,
                fontSize: "10px", color: t.color,
                letterSpacing: "0.12em", marginBottom: "12px", width: "fit-content",
                fontWeight: 600,
                textTransform: "uppercase"
              }}>
                {t.tag}
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text-2)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: `${t.color}22`, color: t.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "bold"
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", margin: 0 }}>{t.name}</h4>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>{t.tag} Guest</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/**
 * components/About.jsx
 * Native BEM classes utilized to prevent layout stretching.
 */
import { q } from "framer-motion/client";
import { useState } from "react";

const WA_NUMBER = "919392704742";
const WA_MSG = encodeURIComponent(
  "Hi OneMark Stories! 👋 I'd like to know more about pricing and what's included.",
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const SERVICES = [
  {
    emoji: "💍",
    title: "Weddings & Milestones",
    color: "#FF4D6D",
    desc: "Interactive invites for weddings, birthdays, and housewarmings. Complete with countdowns, love stories, and venue navigation.",
  },
  {
    emoji: "🎬",
    title: "Entertainment Launches",
    color: "#FFB547",
    desc: "High-impact landing pages for movie teasers, music releases, and trailer drops. Designed to handle massive traffic spikes.",
  },
  {
    emoji: "🏢",
    title: "Corporate Events",
    color: "#29ABE2",
    desc: "Sleek, branded experiences for product launches, company anniversaries, or exclusive VIP galas with digital RSVP.",
  },
  {
    emoji: "🖥️",
    title: "Premium Portfolios",
    color: "#00E5FF",
    desc: "Stand out to clients and recruiters. A bespoke, animated showcase of your individual skills or your agency's best work.",
  },
];

const COMPARISON = [
  {
    feature: "The Vibe",
    print: "Classic, but static.",
    wa: "Common, quickly lost in chat.",
    us: "Immersive, interactive & premium.",
  },
  {
    feature: "Updates & Changes",
    print: "Requires expensive reprint.",
    wa: "Needs re-editing & re-sending.",
    us: "Updated instantly. Same link.",
  },
  {
    feature: "Guest Navigation",
    print: "Manual typing into maps.",
    wa: "Static text address.",
    us: "One-click Google Maps integration.",
  },
  {
    feature: "The Lifespan",
    print: "Thrown away after the event.",
    wa: "Deleted to clear phone storage.",
    us: "A permanent digital keepsake.",
  },
  {
    feature: "Media Integration",
    print: "Text and photos only.",
    wa: "Compressed, low-quality video.",
    us: "Cinematic HD video, music & 3D.",
  },
  {
    feature: "Scalability",
    print: "Cost increases per guest.",
    wa: "Group chat limits.",
    us: "Handles 10 to 100,000+ viewers.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Tell us your story",
    desc: "Drop us a WhatsApp — share the date, names, and what you want to feel.",
  },
  {
    step: "02",
    title: "We design & build",
    desc: "We craft your site within 3–5 days, sharing previews for your feedback.",
  },
  {
    step: "03",
    title: "Share your link",
    desc: "One beautiful link goes to all your guests. Forever yours, forever online.",
  },
];

const FAQS = [
  {
    q: "How is this different from a Wix or DIY template?",
    a: "We don't use drag-and-drop builders. As a premium digital agency, we custom-code your story with high-end animations (like 3D effects and fluid scrolling) that DIY platforms simply can't do.",
  },
  {
    q: "Will this open like a website?",
    a: "Yes. Once published your guests will be able to see your invite like a dynamic website: Interactable, complete with links to venue location, RSVP, and wedding Instagram.",
  },
  {
    q: "How long does the website stay online?",
    a: "Forever. Long after the party is over, your OneMark Story remains live online as a digital keepsake for you to revisit whenever you want.",
  },
  {
    q: "what if i want to make changes after it's published?",
    a: "No problem! Just send us a message on WhatsApp with the changes you want, and we'll update your OneMark Story for you. It's that easy.",
  },
  {
    q: "what if i want to add more sections or features later on?",
    a: "We offer additional customization options! If you want to add more sections, features, or even a custom domain later on, just reach out to us on WhatsApp and we can discuss the options and pricing.",
  },
  {
    q: "Do I need to buy a domain name?",
    a: "No! We provide a beautiful, branded link (e.g., stories.onemark.co.in/your-event) by default. However, for corporate launches or premium portfolios, we can absolutely connect a custom domain (like yourmovie.com).",
  },
  {
    q: "What happens if our venue, timings, or launch date changes?",
    a: "That is the magic of a digital experience. Just drop us a WhatsApp. We update the site instantly without you ever needing to send a new link to your guests or audience.",
  },
  {
    q: "Can we add background music or trailer videos?",
    a: "Absolutely. Whether it's your favorite romantic song for a wedding invite, or an auto-playing HD trailer for a movie launch, we embed high-fidelity audio and video seamlessly.",
  },
  {
    q: "Is there a traffic limit for large public events or movie launches?",
    a: "Not at all. Our infrastructure is powered by enterprise-grade servers. Whether it's an intimate 50-person housewarming or a massive public teaser launch with thousands of visitors, the site stays fast and live.",
  },
  {
    q: "How do guests RSVP or interact with the page?",
    a: "We can embed custom forms directly on your page. When a guest submits their attendance, or a fan leaves a comment on a teaser, the data routes directly to your private dashboard or Google Sheet.",
  },
  {
    q: "How long does it take to build, and can I make changes later?",
    a: "Standard projects take 3–5 days. If you want to add new sections later (like adding event photos after a wedding, or the full movie release after a teaser), just message us! We offer seamless post-launch updates.",
  },
  {
    q: "Do you offer discounts for bulk events or agency partnerships?",
    a: "Yes! If you are an event planner, a PR agency, or just hosting multiple family events, reach out to us on WhatsApp. We offer specialized retainers and bulk-order pricing.",
  },
];

function ServiceCard({ emoji, title, desc, color }) {
  return (
    <div
      className="service-card glass"
      data-hover
      style={{ borderColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
    >
      <div className="service-card__emoji">{emoji}</div>
      <div className="service-card__title">{title}</div>
      <div className="service-card__desc">{desc}</div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button onClick={() => setIsOpen(!isOpen)} className="faq-btn" data-hover>
        <span>{q}</span>
        <span
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0)",
            transition: "transform .3s",
            color: "var(--cyan)",
            fontSize: "20px",
          }}
        >
          +
        </span>
      </button>
      <div className={`faq-ans-wrap ${isOpen ? "open" : ""}`}>
        <p className="faq-ans">{a}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="blob about__blob" />

      <div className="about__inner">
        {/* ── 1. What We Do ─────────────────────────────────────────────── */}
        <div className="about__grid">
          <div>
            <div className="sec-label about__label">What We Do</div>
            <h2 className="about__heading">
              A website built just
              <br />
              for <span>your moment.</span>
            </h2>
            <p className="about__body">
              Not a template. Not a DIY builder. We design and build a
              completely bespoke website for your wedding, event, or milestone —
              something your guests will actually remember.
            </p>
            <p className="about__body">
              <strong>Delivery in 3–5 days.</strong> One-time cost. Stays live
              online forever. Share it with a single link on WhatsApp,
              Instagram, or anywhere.
            </p>
            <div className="about__ctas">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                data-hover
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask Us Anything
              </a>
              <a href="#work" className="mag-btn" data-hover>
                See Examples
              </a>
            </div>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* ── 2. The Comparison (Why Us) ───────────────────────────────── */}
        <div style={{ marginBottom: "6rem" }}>
          <div
            className="sec-label"
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Beyond the Paper
          </div>
          <h3
            className="about__heading"
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            Why a <span>OneMark Story</span> is the ultimate invite.
          </h3>

          <div className="glass-panel">
            <table className="comp-table">
              <thead>
                <tr>
                  <th
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Feature
                  </th>
                  <th>💌 Print Card</th>
                  <th>📱 WhatsApp Graphic</th>
                  <th
                    style={{
                      color: "var(--cyan)",
                      textShadow: "0 0 8px rgba(41,171,226,0.3)",
                    }}
                  >
                    🌟 OneMark Story
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td>{row.print}</td>
                    <td>{row.wa}</td>
                    <td>{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 3. How It Works ──────────────────────────────────────────── */}
        <div style={{ marginBottom: "6rem" }}>
          <div className="process__label sec-label">The Process</div>
          <h3 className="process__heading">Simple. Fast. Unforgettable.</h3>
          <div className="process__grid">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="process__step glass" data-hover>
                <div className="process__step-num">{step}</div>
                <div className="process__step-title">{title}</div>
                <div className="process__step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. FAQ ───────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            className="sec-label"
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            FAQ
          </div>
          <h3
            className="about__heading"
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            Everything You Need to Know
          </h3>
          <div className="glass-panel" style={{ padding: "10px 32px" }}>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

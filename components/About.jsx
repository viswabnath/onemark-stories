/**
 * components/About.jsx
 *
 * CHANGES:
 *  1. ServiceCard — emoji removed, replaced with bespoke inline SVG icon
 *     per service. Cards get a coloured accent line on hover.
 *  2. FAQItem — redesigned: numbered, full-width expand, answer slides in
 *     with a left accent bar. The "+" rotates to "×" on open.
 *  3. FAQ section heading and container redesigned — editorial, no plain box.
 */
import { useState } from "react";
import Link from "next/link";

const WA_NUMBER = "918331978532";
const WA_MSG    = encodeURIComponent("Hi OneMark Stories! 👋 I'd like to know more about pricing and what's included.");
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

/* ── SVG icons — one per service ─────────────────────────────────── */
const IconWedding = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9"  cy="14" r="6"/>
    <circle cx="19" cy="14" r="6"/>
    <circle cx="14" cy="11" r="1.5" fill={color} stroke="none"/>
    <circle cx="14" cy="17" r="1.5" fill={color} stroke="none"/>
  </svg>
);

const IconFilm = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="22" height="16" rx="2"/>
    <line x1="3"  y1="10" x2="25" y2="10"/>
    <line x1="3"  y1="18" x2="25" y2="18"/>
    <line x1="8"  y1="6"  x2="8"  y2="10"/>
    <line x1="14" y1="6"  x2="14" y2="10"/>
    <line x1="20" y1="6"  x2="20" y2="10"/>
    <line x1="8"  y1="18" x2="8"  y2="22"/>
    <line x1="14" y1="18" x2="14" y2="22"/>
    <line x1="20" y1="18" x2="20" y2="22"/>
  </svg>
);

const IconCorporate = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="10" width="20" height="14" rx="1.5"/>
    <path d="M10 10V7a4 4 0 018 0v3"/>
    <line x1="14" y1="15" x2="14" y2="19"/>
    <line x1="10" y1="17" x2="18" y2="17"/>
  </svg>
);

const IconPortfolio = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="22" height="16" rx="2"/>
    <line x1="3"  y1="9"  x2="25" y2="9"/>
    <circle cx="6" cy="7" r="0.8" fill={color} stroke="none"/>
    <circle cx="9" cy="7" r="0.8" fill={color} stroke="none"/>
    <line x1="8"  y1="14" x2="14" y2="14"/>
    <line x1="8"  y1="17" x2="20" y2="17"/>
    <line x1="14" y1="21" x2="14" y2="24"/>
    <line x1="9"  y1="24" x2="19" y2="24"/>
  </svg>
);

const SERVICES = [
  {
    Icon:  IconWedding,
    title: "Weddings & Milestones",
    color: "#D4758C",
    desc:  "Interactive invites for weddings, birthdays, and housewarmings. Complete with countdowns, love stories, and venue navigation.",
  },
  {
    Icon:  IconFilm,
    title: "Entertainment Launches",
    color: "#C9A96E",
    desc:  "High-impact landing pages for movie teasers, music releases, and trailer drops. Designed to handle massive traffic spikes.",
  },
  {
    Icon:  IconCorporate,
    title: "Corporate Events",
    color: "#29ABE2",
    desc:  "Sleek, branded experiences for product launches, company anniversaries, or exclusive VIP galas with digital RSVP.",
  },
  {
    Icon:  IconPortfolio,
    title: "Premium Portfolios",
    color: "#29ABE2",
    desc:  "Stand out to clients and recruiters. A bespoke, animated showcase of your individual skills or your agency's best work.",
  },
];

/* ── Service card — SVG icon + accent line ───────────────────────── */
function ServiceCard({ Icon, title, desc, color }) {
  return (
    <div className="service-card glass" data-hover style={{ "--sc-color": color }}>
      {/* Top accent line that fills on hover */}
      <div className="service-card__accent" style={{ background: color }} />
      <div className="service-card__icon">
        <Icon color={color} />
      </div>
      <div className="service-card__title">{title}</div>
      <div className="service-card__desc">{desc}</div>
    </div>
  );
}

/* ── Comparison table ────────────────────────────────────────────── */
const COMPARISON = [
  { feature: "The Vibe",        print: "Classic, but static.",           wa: "Common, quickly lost in chat.",     us: "Immersive, interactive & premium." },
  { feature: "Updates",         print: "Requires expensive reprint.",     wa: "Needs re-editing & re-sending.",    us: "Updated instantly. Same link." },
  { feature: "Guest Navigation",print: "Manual typing into maps.",        wa: "Static text address.",              us: "One-click Google Maps integration." },
  { feature: "The Lifespan",    print: "Thrown away after the event.",    wa: "Deleted to clear phone storage.",   us: "A permanent digital keepsake." },
  { feature: "Media",           print: "Text and photos only.",           wa: "Compressed, low-quality video.",    us: "Cinematic HD video, music & 3D." },
  { feature: "Scalability",     print: "Cost increases per guest.",       wa: "Group chat limits.",                us: "Handles 10 to 100,000+ viewers." },
];

/* ── Process ─────────────────────────────────────────────────────── */
const PROCESS = [
  { step: "01", title: "Tell us your story",  desc: "Drop us a WhatsApp — share the date, names, and what you want to feel." },
  { step: "02", title: "We design & build",   desc: "We craft your site within 3–5 days, sharing previews for your feedback." },
  { step: "03", title: "Share your link",     desc: "One beautiful link goes to all your guests. Forever yours, forever online." },
];

/* ── FAQ ─────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "How is this different from a Wix or DIY template?",         a: "We don't use drag-and-drop builders. As a premium digital agency, we custom-code your story with high-end animations (like 3D effects and fluid scrolling) that DIY platforms simply can't do." },
  { q: "Will this open like a website?",                             a: "Yes. Once published your guests will be able to see your invite like a dynamic website: Interactable, complete with links to venue location, RSVP, and wedding Instagram." },
  { q: "How long does the website stay online?",                     a: "Forever. Long after the party is over, your OneMark Story remains live online as a digital keepsake for you to revisit whenever you want." },
  { q: "What if I want to make changes after it's published?",       a: "No problem! Just send us a message on WhatsApp with the changes you want, and we'll update your OneMark Story for you. It's that easy." },
  { q: "What if I want to add more sections or features later on?",  a: "We offer additional customization options! If you want to add more sections, features, or even a custom domain later on, just reach out to us on WhatsApp and we can discuss the options and pricing." },
  { q: "Do I need to buy a domain name?",                            a: "No! We provide a beautiful, branded link (e.g., stories.onemark.co.in/your-event) by default. However, for corporate launches or premium portfolios, we can absolutely connect a custom domain (like yourmovie.com)." },
  { q: "What happens if our venue, timings, or launch date changes?",a: "Just drop us a WhatsApp. We update the site instantly without you ever needing to send a new link to your guests or audience." },
  { q: "Can we add background music or trailer videos?",             a: "Absolutely. Whether it's your favourite romantic song for a wedding invite, or an auto-playing HD trailer for a movie launch, we embed high-fidelity audio and video seamlessly." },
  { q: "Is there a traffic limit for large public events or movie launches?", a: "Not at all. Our infrastructure is powered by enterprise-grade servers. Whether it's an intimate 50-person housewarming or a massive public teaser launch with thousands of visitors, the site stays fast and live." },
  { q: "How do guests RSVP or interact with the page?",              a: "We can embed custom forms directly on your page. When a guest submits their attendance, the data routes directly to your WhatsApp or Google Sheet." },
  { q: "How long does it take to build, and can I make changes later?", a: "Standard projects take 3–5 days. If you want to add new sections later (like adding event photos after a wedding), just message us! We offer seamless post-launch updates." },
  { q: "Do you offer discounts for bulk events or agency partnerships?", a: "Yes! If you are an event planner, a PR agency, or just hosting multiple family events, reach out to us on WhatsApp. We offer specialized retainers and bulk-order pricing." },
];

function FAQItem({ q, a, index }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq2-item${isOpen ? " faq2-item--open" : ""}`}>
      <button
        className="faq2-btn"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        data-hover
      >
        <span className="faq2-btn__num">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="faq2-btn__q">{q}</span>
        {/* Animated +/× */}
        <span className="faq2-btn__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="2" x2="9" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="faq2-icon-v"/>
            <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className="faq2-ans-wrap">
        <div className="faq2-ans-inner">
          <p className="faq2-ans">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="about">
      <div className="blob about__blob" />

      <div className="about__inner">

        {/* ── 1. What We Do ──────────────────────────────────────────── */}
        <div className="about__grid">
          <div>
            <div className="sec-label about__label">What We Do</div>
            <h2 className="about__heading">
              A website built just<br />
              for <span>your moment.</span>
            </h2>
            <p className="about__body">
              Not a template. Not a DIY builder. We design and build a completely
              bespoke website for your wedding, event, or milestone — something
              your guests will actually remember.
            </p>
            <p className="about__body">
              <strong>Delivery in 3–5 days.</strong> One-time cost. Stays live
              online forever. Share it with a single link on WhatsApp, Instagram,
              or anywhere.
            </p>
            <div className="about__ctas">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" data-hover>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask Us Anything
              </a>
              <Link href="/#work" className="mag-btn" data-hover>
                See Examples
              </Link>
            </div>
          </div>

          {/* Service cards — SVG icons, no emojis */}
          <div className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* ── 2. Comparison ──────────────────────────────────────────── */}
        <div style={{ marginBottom: "6rem" }}>
          <div className="sec-label" style={{ textAlign: "center", marginBottom: "1rem" }}>Beyond the Paper</div>
          <h3 className="about__heading" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            Why a <span>OneMark Story</span> is the ultimate invite.
          </h3>
          <div className="comparison-table">
            <div className="comparison-table__head">
              <div/>
              <div>Print</div>
              <div>WhatsApp</div>
              <div style={{ color: "var(--cyan)" }}>OneMark ✦</div>
            </div>
            {COMPARISON.map(({ feature, print, wa, us }) => (
              <div key={feature} className="comparison-table__row">
                <div className="comparison-table__feature">{feature}</div>
                <div className="comparison-table__cell comparison-table__cell--bad">{print}</div>
                <div className="comparison-table__cell comparison-table__cell--bad">{wa}</div>
                <div className="comparison-table__cell comparison-table__cell--good">{us}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Process ─────────────────────────────────────────────── */}
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

        {/* ── 4. FAQ — redesigned ────────────────────────────────────── */}
        <div className="faq2-section">
          <div className="faq2-section__header">
            <span className="sec-label">FAQ</span>
            <h3 className="faq2-section__heading">
              Everything you<br />
              <span>need to know.</span>
            </h3>
            <p className="faq2-section__sub">
              Still have questions? Just{" "}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)" }}>
                message us on WhatsApp
              </a>.
            </p>
          </div>

          <div className="faq2-list">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
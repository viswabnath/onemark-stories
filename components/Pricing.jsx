/**
 * Pricing.jsx — 3-tier pricing section
 */
const WA_NUMBER = "919392704742";
const makeWA = (plan) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi OneMark Stories! \u{1F44B} I'm interested in the ${plan} package. Can we discuss?`
  )}`;

const TIERS = [
  {
    name: "Spark",
    subtitle: "Essential",
    forLabel: "Birthdays · Countdowns · Announcements",
    price: "\u20B92,999",
    intl: "$35",
    color: "#C9A96E",
    best: false,
    features: [
      "Single-page responsive experience",
      "Live countdown timer",
      "Up to 6 photos or media items",
      "Custom color & branding",
      "WhatsApp & Instagram share-optimized",
      "Mobile-first design",
      "1 round of revisions",
    ],
  },
  {
    name: "Bloom",
    subtitle: "Premium",
    forLabel: "Weddings · Milestones · Events",
    price: "\u20B96,499",
    intl: "$75",
    color: "#29ABE2",
    best: true,
    features: [
      "Multi-section narrative (2\u20133 chapters)",
      "Your story timeline",
      "GSAP scroll animations",
      "3 event galleries with lightbox",
      "Event schedule & venue cards",
      "PWA \u2014 installs like an app",
      "Background music player",
      "Multilingual (English + 1 language)",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Legacy",
    subtitle: "Cinematic",
    forLabel: "Movie Launches · Corporate · Full Productions",
    price: "\u20B99,999",
    intl: "$125",
    color: "#D4758C",
    best: false,
    features: [
      "5\u20136 cinematic chapters",
      "3D elements & WebGL backgrounds",
      "Interactive galleries & flip-card reveals",
      "Event-time triggered celebrations",
      "Unlimited photo galleries + video",
      "Custom domain setup",
      "Post-event content updates",
      "Priority support & 3 revisions",
    ],
  },
];

function PricingCard({ name, subtitle, forLabel, price, intl, color, best, features }) {
  return (
    <div className={`pricing-card glass${best ? " pricing-card--best" : ""}`} data-hover>
      {best && <div className="pricing-card__badge">Most Popular</div>}
      {/* Ghost tier name — editorial background element */}
      <div className="pricing-card__tier-bg" aria-hidden="true" style={{ color }}>{name}</div>
      <div className="pricing-card__header">
        <div className="pricing-card__name" style={{ color }}>{name}</div>
        <div className="pricing-card__subtitle">{subtitle}</div>
        <div className="pricing-card__for">{forLabel}</div>
      </div>
      <div className="pricing-card__price">
        {price}
        <span className="pricing-card__intl"> / {intl}</span>
      </div>
      <ul className="pricing-card__features">
        {features.map((f) => (
          <li key={f}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <a
        href={makeWA(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="pricing-card__cta"
        style={{
          background: best
            ? `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 70%, #000))`
            : "transparent",
          borderColor: color,
          color: best ? "#fff" : color,
        }}
      >
        Get Started
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="pricing__inner">
        <div className="sec-label" style={{ textAlign: "center", marginBottom: "1rem" }}>
          Pricing
        </div>
        <h2 className="about__heading" style={{ textAlign: "center", marginBottom: "0.75rem" }}>
          One price. Every <span>moment.</span>
        </h2>
        <p className="pricing__sub">
          Weddings, birthdays, launches, events — one-time payment, no subscriptions, live forever.
        </p>
        <div className="pricing__grid">
          {TIERS.map((t) => (
            <PricingCard key={t.name} {...t} />
          ))}
        </div>
        <p className="pricing__note">
          Need something custom? Add-ons like RSVP forms, guest books, extra languages, QR codes, and trailer countdowns are available.{" "}
          <a href={makeWA("Custom")} target="_blank" rel="noopener noreferrer" data-hover>
            Let&rsquo;s talk &rarr;
          </a>
        </p>
        <p className="pricing__note pricing__note--terms">
          Prices are negotiable based on requirements. T&amp;C apply.
        </p>
      </div>
    </section>
  );
}

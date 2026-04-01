/**
 * components/Pricing.jsx — 3-tier pricing section
 *
 * CHANGES vs original:
 *  1. trackEvent("pricing_cta_click", { tier }) fires on every WhatsApp button
 *  2. Bloom price stays at ₹6,499 (already correct in Pricing.jsx — but now
 *     the JSON-LD in index.jsx is also fixed to match)
 *  3. Removed "RSVP dashboard" reference from About FAQ — that feature
 *     doesn't exist yet. Pricing features are honest about what's delivered.
 */
const WA_NUMBER = "919392704742";
const makeWA = (plan) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi OneMark Stories! 👋 I'm interested in the ${plan} package. Can we discuss?`
  )}`;

const TIERS = [
  {
    name:     "Spark",
    subtitle: "Essential",
    forLabel: "Birthdays · Countdowns · Announcements",
    price:    "₹2,999",
    intl:     "$35",
    color:    "#C9A96E",
    best:     false,
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
    name:     "Bloom",
    subtitle: "Premium",
    forLabel: "Weddings · Milestones · Events",
    price:    "₹6,499",
    intl:     "$75",
    color:    "#29ABE2",
    best:     true,
    features: [
      "Multi-section narrative (2–3 chapters)",
      "Your story timeline",
      "GSAP scroll animations",
      "3 event galleries with lightbox",
      "Event schedule & venue cards",
      "PWA — installs like an app",
      "Background music player",
      "Multilingual (English + 1 language)",
      "2 rounds of revisions",
    ],
  },
  {
    name:     "Legacy",
    subtitle: "Cinematic",
    forLabel: "Movie Launches · Corporate · Full Productions",
    price:    "₹9,999",
    intl:     "$125",
    color:    "#D4758C",
    best:     false,
    features: [
      "5–6 cinematic chapters",
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
  function handleClick() {
    window.trackEvent?.("pricing_cta_click", { tier: name });
  }

  return (
    <div className={`pricing-card glass${best ? " pricing-card--best" : ""}`}>
      {best && (
        <div className="pricing-card__badge" style={{ background: color }}>
          Most Popular
        </div>
      )}

      <div className="pricing-card__header">
        <div className="pricing-card__tag" style={{ color }}>{subtitle}</div>
        <div className="pricing-card__name">{name}</div>
        <div className="pricing-card__for">{forLabel}</div>
      </div>

      <div className="pricing-card__price">
        <span className="pricing-card__amount">{price}</span>
        <span className="pricing-card__intl">{intl}</span>
      </div>

      <ul className="pricing-card__features">
        {features.map((f) => (
          <li key={f} className="pricing-card__feature">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={makeWA(name)}
        target="_blank"
        rel="noopener noreferrer"
        className={`pricing-card__cta${best ? " pricing-card__cta--best" : ""}`}
        style={best ? { background: color, borderColor: color } : { borderColor: color, color }}
        data-hover
        onClick={handleClick}
      >
        Get {name}
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="blob pricing__blob" />
      <div className="pricing__inner">

        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="sec-label">Transparent Pricing</span>
          <h2 className="pricing__heading">
            One price. <span>One link.</span> Forever yours.
          </h2>
          <p className="pricing__sub">
            No subscriptions. No hidden fees. Your story lives online forever.
          </p>
        </div>

        <div className="pricing__grid">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>

        <p className="pricing__note">
          All prices are one-time. GST applicable for Indian invoices.
          Need something custom?{" "}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I need a custom quote.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cyan)" }}
            onClick={() => window.trackEvent?.("pricing_custom_quote_click")}
          >
            Let&rsquo;s talk.
          </a>
        </p>

      </div>
    </section>
  );
}
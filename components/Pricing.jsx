/**
 * components/Pricing.jsx — Interactive Price Calculator & Cost Builder.
 *
 * Provides a dynamic slider selector, add-on toggles, and direct WhatsApp prefill.
 */
import { useState } from "react";

const WA_NUMBER = "918331978532";

const PACKAGES = [
  {
    id: "spark",
    name: "Spark",
    basePrice: 4999,
    intl: "$60",
    desc: "For simple events and small celebrations.",
    pages: 15,
    features: [
      "Event website for details",
      "Event countdown",
      "Flip digital album (15 pages)",
      "Branded stories.onemark link",
      "1 round of revisions"
    ]
  },
  {
    id: "signature",
    name: "Signature",
    basePrice: 9999,
    intl: "$120",
    desc: "For weddings, engagements, and major milestones.",
    pages: 40,
    features: [
      "Multi-page story timeline",
      "Photo galleries grid",
      "Flip digital album (40 pages)",
      "Background music integration",
      "RSVP submission",
      "2 rounds of revisions"
    ]
  },
  {
    id: "grand",
    name: "Grand",
    basePrice: 19999,
    intl: "$240",
    desc: "The absolute premium experience.",
    pages: 80,
    features: [
      "Cinematic multi-chapter site",
      "Rich media video embeds",
      "Flip digital album (80 pages)",
      "Own domain (yourname.com)",
      "Post-event photo updates",
      "Priority revisions (3 rounds)"
    ]
  }
];

const ADDONS = [
  { id: "domain", name: "Custom Domain (.com / .in / .org)", price: 2499, desc: "Connect your own premium web address." },
  { id: "music", name: "High-Fidelity Audio Tracks", price: 999, desc: "Add background music to set the mood." },
  { id: "rsvp", name: "RSVP & Guest Manager Form", price: 1499, desc: "Collect attendee names and phone numbers." }
];

export default function Pricing() {
  const [packIndex, setPackIndex] = useState(1); // Default to Signature
  const selectedPack = PACKAGES[packIndex];
  const [checkedAddons, setCheckedAddons] = useState([]);
  const [extraPages, setExtraPages] = useState(0);
  // Derive total cost synchronously during render
  let total = selectedPack.basePrice;
  checkedAddons.forEach((addonId) => {
    const add = ADDONS.find((a) => a.id === addonId);
    if (add) total += add.price;
  });
  total += extraPages * 199;

  const toggleAddon = (id) => {
    if (checkedAddons.includes(id)) {
      setCheckedAddons(checkedAddons.filter((a) => a !== id));
    } else {
      setCheckedAddons([...checkedAddons, id]);
    }
  };

  const getWhatsAppLink = () => {
    const addonNames = checkedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean);
    const pagesText = extraPages > 0 ? ` + ${extraPages} extra pages` : "";
    const addonsText = addonNames.length > 0 ? `\nAdd-ons: ${addonNames.join(", ")}` : "";
    const msg = `Hi OneMark Stories! I want to order a custom package:
- Package: ${selectedPack.name} (₹${selectedPack.basePrice.toLocaleString()})${pagesText}${addonsText}
Total estimated cost: ₹${total.toLocaleString()}`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="pricing" className="pricing">
      <div className="ambient-glow" style={{ top: "40%", left: "5%", width: "500px", opacity: 0.08 }} />

      <div className="pricing__inner">

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="sec-label" style={{ color: "var(--gold)" }}>Cost Builder</span>
          <h2 className="pricing__heading" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500 }}>
            Build your <span>custom invite package.</span>
          </h2>
          <p className="pricing__sub">
            Slide to choose a base tier, customize with premium add-ons, and see your cost calculate live.
          </p>
        </div>

        <div className="pricing-layout">

          {/* Left Side: Controls */}
          <div className="pricing-controls">

            {/* Slider package selection */}
            <div className="pricing-slider-card glass">
              <div className="pricing-slider-head">
                <span className="pricing-card-label">Select Base Package</span>
                <span className="pricing-slider-pages">{selectedPack.pages} Album Pages</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                value={packIndex}
                className="pricing-range"
                onChange={(e) => {
                  setPackIndex(Number(e.target.value));
                  setCheckedAddons([]); // reset addons on package change to keep clean
                  setExtraPages(0);
                }}
              />
              <div className="pricing-pack-tabs">
                {PACKAGES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPackIndex(idx);
                      setCheckedAddons([]);
                      setExtraPages(0);
                    }}
                    className={`pricing-pack-tab${packIndex === idx ? " pricing-pack-tab--active" : ""}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Addons checklist */}
            <div className="pricing-addons-card glass">
              <span className="pricing-card-label" style={{ color: "var(--rose)", marginBottom: "0.5rem" }}>Choose Add-ons</span>
              {ADDONS.map((addon) => {
                const active = checkedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`pricing-addon-row${active ? " pricing-addon-row--active" : ""}`}
                  >
                    <div className={`pricing-addon-checkbox${active ? " pricing-addon-checkbox--checked" : ""}`}>
                      {active && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="pricing-addon-name">{addon.name}</div>
                      <div className="pricing-addon-desc">{addon.desc}</div>
                    </div>
                    <div className="pricing-addon-price">+₹{addon.price.toLocaleString()}</div>
                  </div>
                );
              })}

              {/* Extra pages page spinner */}
              <div className={`pricing-stepper-row${extraPages > 0 ? " pricing-stepper-row--active" : ""}`}>
                <div>
                  <div className="pricing-addon-name">Extra Album Pages</div>
                  <div className="pricing-addon-desc">Add custom spreads to your book.</div>
                </div>
                <div className="pricing-stepper">
                  <button
                    onClick={() => setExtraPages(prev => Math.max(0, prev - 1))}
                    className="pricing-stepper-btn"
                  >
                    -
                  </button>
                  <span className="pricing-stepper-count">{extraPages}</span>
                  <button
                    onClick={() => setExtraPages(prev => prev + 1)}
                    className="pricing-stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Total Summary */}
          <div className="pricing-summary">
            <div className="pricing-summary-card">
              <div>
                <div className="pricing-summary-label">Your order</div>
                <h3 className="pricing-summary-name">
                  {selectedPack.name} Package
                </h3>
                <p className="pricing-summary-desc">{selectedPack.desc}</p>
              </div>

              {/* Package features checklist */}
              <ul className="pricing-summary-features">
                {selectedPack.features.map((feat) => (
                  <li key={feat}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feat}
                  </li>
                ))}
                {extraPages > 0 && (
                  <li className="pricing-summary-features__extra">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {extraPages} Extra Album Pages (+₹{(extraPages * 199).toLocaleString()})
                  </li>
                )}
              </ul>

              <div className="pricing-summary-divider" />

              <div className="pricing-summary-total-row">
                <div>
                  <div className="pricing-total-label">Total</div>
                  <div className="pricing-total-figure">
                    ₹{total.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="pricing-total-usd-label">Approx.</div>
                  <div className="pricing-total-usd">
                    ~${Math.round(total / 83)}
                  </div>
                </div>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-cta-btn"
                onClick={() => window.trackEvent?.("pricing_cta_click", { tier: selectedPack.name, total })}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>

        </div>

        <p className="pricing__note">
          All prices are one-time. GST applicable for Indian invoices.
          Need a fully custom production or agency partnership?{" "}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I need a custom quote.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.trackEvent?.("pricing_custom_quote_click")}
          >
            Let&rsquo;s talk.
          </a>
        </p>

      </div>
    </section>
  );
}

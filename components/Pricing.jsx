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
    <section id="pricing" className="pricing" style={{ position: "relative", overflow: "hidden", padding: "6rem 0" }}>
      <div className="ambient-glow" style={{ top: "40%", left: "5%", width: "500px", opacity: 0.08 }} />

      <div className="pricing__inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="sec-label" style={{ color: "var(--gold)" }}>Cost Builder</span>
          <h2 className="pricing__heading" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500 }}>
            Build your <span>custom invite package.</span>
          </h2>
          <p className="pricing__sub" style={{ maxWidth: "540px", margin: "1rem auto 0" }}>
            Slide to choose a base tier, customize with premium add-ons, and see your cost calculate live.
          </p>
        </div>

        <div className="pricing-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
          
          {/* Left Side: Controls */}
          <div className="pricing-controls" style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
            
            {/* Slider package selection */}
            <div className="pricing-slider-card glass" style={{ padding: "2rem", borderRadius: "20px", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gold)", fontWeight: 600 }}>Select Base Package</span>
                <span style={{ fontSize: "12px", color: "var(--text-2)", fontWeight: 600 }}>{selectedPack.pages} Album Pages</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                value={packIndex}
                onChange={(e) => {
                  setPackIndex(Number(e.target.value));
                  setCheckedAddons([]); // reset addons on package change to keep clean
                  setExtraPages(0);
                }}
                style={{
                  width: "100%",
                  accentColor: "var(--rose)",
                  margin: "1rem 0 1.5rem",
                  cursor: "pointer",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                {PACKAGES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPackIndex(idx);
                      setCheckedAddons([]);
                      setExtraPages(0);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: packIndex === idx ? "var(--rose)" : "var(--text-2)",
                      fontWeight: packIndex === idx ? "700" : "500",
                      fontSize: "14px",
                      transition: "color 0.2s ease"
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Addons checklist */}
            <div className="pricing-addons-card glass" style={{ padding: "2rem", borderRadius: "20px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--rose)", fontWeight: 600, marginBottom: "0.5rem" }}>Choose Add-ons</span>
              {ADDONS.map((addon) => (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: "14px",
                    background: checkedAddons.includes(addon.id) ? "rgba(224, 90, 127, 0.05)" : "rgba(255,255,255,0.01)",
                    border: checkedAddons.includes(addon.id) ? "1px solid var(--border-2)" : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.25s ease"
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px",
                      border: "2px solid",
                      borderColor: checkedAddons.includes(addon.id) ? "var(--rose)" : "var(--muted)",
                      background: checkedAddons.includes(addon.id) ? "var(--rose)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {checkedAddons.includes(addon.id) && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{addon.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-2)", marginTop: "2px" }}>{addon.desc}</div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--gold)" }}>+₹{addon.price.toLocaleString()}</div>
                </div>
              ))}

              {/* Extra pages page spinner */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  borderRadius: "14px",
                  background: extraPages > 0 ? "rgba(229, 197, 131, 0.05)" : "rgba(255,255,255,0.01)",
                  border: extraPages > 0 ? "1px solid var(--border-2)" : "1px solid var(--border)",
                  marginTop: "0.5rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>Extra Album Pages</div>
                  <div style={{ fontSize: "11px", color: "var(--text-2)", marginTop: "2px" }}>Add custom spreads to your book.</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => setExtraPages(prev => Math.max(0, prev - 1))}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--text)",
                      fontWeight: "bold",
                      fontSize: "16px",
                      cursor: "pointer"
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "14px", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{extraPages}</span>
                  <button
                    onClick={() => setExtraPages(prev => prev + 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--text)",
                      fontWeight: "bold",
                      fontSize: "16px",
                      cursor: "pointer"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Total Summary */}
          <div className="pricing-summary" style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="pricing-summary-card glass"
              style={{
                position: "sticky",
                top: "6rem",
                padding: "2.5rem",
                borderRadius: "24px",
                border: "1px solid var(--border-2)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
                background: "linear-gradient(160deg, rgba(30, 20, 48, 0.7) 0%, rgba(11, 5, 22, 0.7) 100%)"
              }}
            >
              <div>
                <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--gold)", fontWeight: 600 }}>Checkout Summary</div>
                <h3 style={{ fontSize: "28px", color: "var(--text)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, marginTop: "0.5rem" }}>
                  {selectedPack.name} Package
                </h3>
                <p style={{ fontSize: "12px", color: "var(--text-2)", marginTop: "4px" }}>{selectedPack.desc}</p>
              </div>

              {/* Package features checklist */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0, margin: 0 }}>
                {selectedPack.features.map((feat) => (
                  <li key={feat} style={{ fontSize: "13px", color: "var(--text-2)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feat}
                  </li>
                ))}
                {extraPages > 0 && (
                  <li style={{ fontSize: "13px", color: "var(--gold)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {extraPages} Extra Album Pages (+₹{(extraPages * 199).toLocaleString()})
                  </li>
                )}
              </ul>

              <div style={{ height: "1px", background: "var(--border)", margin: "0.5rem 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--muted)" }}>Total Cost</div>
                  <div style={{ fontSize: "42px", fontWeight: 700, color: "var(--text)", textShadow: "0 0 20px rgba(255,255,255,0.1)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    ₹{total.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase" }}>Global Price</div>
                  <div style={{ fontSize: "16px", color: "var(--gold)", fontWeight: 600 }}>
                    ~${Math.round(total / 83)}
                  </div>
                </div>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-card__cta pricing-card__cta--best"
                style={{
                  background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
                  borderColor: "transparent",
                  color: "#fff",
                  padding: "1rem",
                  borderRadius: "12px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 8px 30px rgba(224, 90, 127, 0.25)",
                  display: "block"
                }}
                onClick={() => window.trackEvent?.("pricing_cta_click", { tier: selectedPack.name, total })}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>

        </div>

        <p className="pricing__note" style={{ textAlign: "center", marginTop: "4rem", fontSize: "12px", color: "var(--muted)" }}>
          All prices are one-time. GST applicable for Indian invoices.
          Need a fully custom production or agency partnership?{" "}
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

      <style jsx>{`
        @media (max-width: 900px) {
          .pricing-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .pricing-summary {
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
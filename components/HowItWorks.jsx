/**
 * components/HowItWorks.jsx — 3-step process section.
 * Card-based, matches existing glass/pricing card aesthetic.
 */

const STEPS = [
  {
    num:   "01",
    color: "#25D366",
    title: "Send a message",
    body:  "Drop us a WhatsApp. Tell us your event name, date, and vibe — takes 2 minutes.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    num:   "02",
    color: "#29ABE2",
    title: "We build your page",
    body:  "We custom-code your experience in 3 days. No templates. No chasing you for content.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="2" y1="7" x2="22" y2="7"/>
        <circle cx="5" cy="5" r="0.6" fill="currentColor" stroke="none"/>
        <circle cx="7.5" cy="5" r="0.6" fill="currentColor" stroke="none"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="7" y1="11" x2="13" y2="11"/>
        <line x1="7" y1="14" x2="17" y2="14"/>
      </svg>
    ),
  },
  {
    num:   "03",
    color: "#D4758C",
    title: "Share one link",
    body:  "Copy the link and send it on WhatsApp. Your guests open it and feel the magic — forever.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6"  cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw__inner">

        <div className="hiw__header">
          <span className="sec-label">The Process</span>
          <h2 className="hiw__heading">
            From message to <span>live page</span> in 3 days.
          </h2>
        </div>

        <div className="hiw__cards">
          {STEPS.map((step) => (
            <div key={step.num} className="hiw__card glass">
              {/* Big decorative number */}
              <div className="hiw__card-bg-num" aria-hidden="true">{step.num}</div>

              <div className="hiw__card-top">
                <div
                  className="hiw__card-icon"
                  style={{
                    color:       step.color,
                    background:  `${step.color}15`,
                    borderColor: `${step.color}30`,
                  }}
                >
                  {step.icon}
                </div>
                <span className="hiw__card-num sec-label">{step.num}</span>
              </div>

              <h3 className="hiw__card-title">{step.title}</h3>
              <p  className="hiw__card-body">{step.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

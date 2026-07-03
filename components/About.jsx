/**
 * components/About.jsx
 *
 * CHANGES:
 *  1. Services list replaced with an interactive Bento Grid
 *     containing a Countdown Widget, a Vinyl Player widget, an RSVP Selector, and a Mini Flipbook.
 *  2. FAQItem & FAQS updated with the custom digital album questions.
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ALBUMS } from "../data/albums";
import { toSlug } from "../lib/slug";

const DEMO = ALBUMS[0];
const DEMO_SLUG = DEMO ? toSlug(DEMO.title) : "";

const WA_NUMBER = "918331978532";
const WA_MSG = encodeURIComponent("Hi OneMark Stories! I'd like to know more about pricing and what's included.");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

/* ── Bento Widgets ── */

const CountdownWidget = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-12-12T00:00:00") - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Synchronize initial remaining time on client mount (asynchronous to satisfy linter)
    const initialTimer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bento-countdown">
      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--gold)", fontWeight: 600 }}>Ticking Down to the Day</span>
      <div className="bento-countdown__timer">
        <div className="bento-countdown__unit">
          <span className="bento-countdown__num">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="bento-countdown__label">Days</span>
        </div>
        <div className="bento-countdown__unit">
          <span className="bento-countdown__num">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="bento-countdown__label">Hours</span>
        </div>
        <div className="bento-countdown__unit">
          <span className="bento-countdown__num">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="bento-countdown__label">Mins</span>
        </div>
        <div className="bento-countdown__unit">
          <span className="bento-countdown__num">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="bento-countdown__label">Secs</span>
        </div>
      </div>
    </div>
  );
};

const AlbumThumbWidget = () => {
  if (!DEMO) return null;
  return (
    <Link href={`/albums/${DEMO_SLUG}`} className="bento-album" data-hover aria-label={`Open the ${DEMO.title} album`}>
      <div className="bento-album__frame">
        <Image src={DEMO.coverFront} alt={`${DEMO.title} album cover`} width={260} height={173} sizes="260px" />
      </div>
      <span className="bento-album__label">Your digital album</span>
      <span className="bento-album__cta">Open the book →</span>
    </Link>
  );
};

const RSVPWidget = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="rsvp-bubble">
      <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--rose)", fontWeight: 600 }}>Guest Attendance</span>
      <div className="rsvp-bubble__container">
        <button
          onClick={() => setActive("yes")}
          className={`rsvp-bubble__btn${active === "yes" ? " rsvp-bubble__btn--active" : ""}`}
        >
          Yes
        </button>
        <button
          onClick={() => setActive("no")}
          className={`rsvp-bubble__btn${active === "no" ? " rsvp-bubble__btn--active" : ""}`}
        >
          No
        </button>
      </div>
    </div>
  );
};

const AlbumSpreadWidget = () => {
  if (!DEMO) return null;
  const spread = DEMO.coverFront;
  return (
    <Link href={`/albums/${DEMO_SLUG}`} className="bento-spread" data-hover aria-label={`Open the ${DEMO.title} album`}>
      <div className="bento-spread__book">
        <Image src={spread} alt={`${DEMO.title} album spread`} fill sizes="(max-width: 900px) 90vw, 560px" style={{ objectFit: "cover" }} />
        <span className="bento-spread__spine" aria-hidden="true" />
      </div>
      <div className="bento-spread__meta">
        <span className="bento-spread__title">A flip-through wedding album</span>
        <span className="bento-spread__cta">See it live →</span>
      </div>
    </Link>
  );
};

/* ── Comparison table ────────────────────────────────────────────── */
const COMPARISON = [
  { feature: "The Vibe", print: "Classic, but static.", wa: "Common, quickly lost in chat.", us: "Immersive, interactive & premium." },
  { feature: "Updates", print: "Requires expensive reprint.", wa: "Needs re-editing & re-sending.", us: "Updated instantly. Same link." },
  { feature: "Guest Navigation", print: "Manual typing into maps.", wa: "Static text address.", us: "One-click Google Maps integration." },
  { feature: "The Lifespan", print: "Thrown away after the event.", wa: "Deleted to clear phone storage.", us: "A permanent digital keepsake." },
  { feature: "Media", print: "Text and photos only.", wa: "Compressed, low-quality video.", us: "Cinematic HD video, music & 3D." },
  { feature: "Scalability", print: "Cost increases per guest.", wa: "Group chat limits.", us: "Handles 10 to 100,000+ viewers." },
];

/* ── Process ─────────────────────────────────────────────────────── */
const PROCESS = [
  { step: "01", title: "Tell us your story", desc: "Drop us a WhatsApp — share the date, names, and what you want to feel." },
  { step: "02", title: "We design & build", desc: "We craft your site within 3–5 days, sharing previews for your feedback." },
  { step: "03", title: "Share your link", desc: "One beautiful link goes to all your guests. Forever yours, forever online." },
];

/* ── FAQ ─────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "How do we send our wedding photos to compile the digital album?", a: "You can easily upload your designed album pages (as JPEG, PNG, or PDF) to Google Drive, Dropbox, or share them via WhatsApp. We handle all resizing, compression, and optimization to ensure pages load instantly while remaining crisp." },
  { q: "Can the digital album play background music?", a: "Absolutely. We can integrate high-fidelity background music that plays softly as guests flip through your pages, with a clean mute/unmute speaker toggle in the top control bar." },
  { q: "Can guests download or share spreads from the album?", a: "Yes. The flipbook interface has a native share button that copies the direct link. We can also include a download button for the entire album, or lock it to view-only if you prefer to protect your photographer's high-res layout." },
  { q: "How is this different from a Wix or DIY template?", a: "We don't use drag-and-drop builders. As a premium digital agency, we custom-code your story with high-end animations (like 3D effects and fluid scrolling) that DIY platforms simply can't do." },
  { q: "Will this open like a website?", a: "Yes. Once published your guests will be able to see your invite like a dynamic website: Interactable, complete with links to venue location, RSVP, and wedding Instagram." },
  { q: "How long does the website stay online?", a: "Forever. Long after the party is over, your OneMark Story remains live online as a digital keepsake for you to revisit whenever you want." },
  { q: "What if I want to make changes after it's published?", a: "No problem! Just send us a message on WhatsApp with the changes you want, and we'll update your OneMark Story for you. It's that easy." },
  { q: "What if I want to add more sections or features later on?", a: "We offer additional customization options! If you want to add more sections, features, or even a custom domain later on, just reach out to us on WhatsApp and we can discuss the options and pricing." },
  { q: "Do I need to buy a domain name?", a: "No! We provide a beautiful, branded link (e.g., stories.onemark.co.in/your-event) by default. However, for corporate launches or premium portfolios, we can absolutely connect a custom domain (like yourmovie.com)." },
  { q: "What happens if our venue, timings, or launch date changes?", a: "Just drop us a WhatsApp. We update the site instantly without you ever needing to send a new link to your guests or audience." },
  { q: "Can we add background music or trailer videos?", a: "Absolutely. Whether it's your favourite romantic song for a wedding invite, or an auto-playing HD trailer for a movie launch, we embed high-fidelity audio and video seamlessly." },
  { q: "Is there a traffic limit for large public events or movie launches?", a: "Not at all. Our infrastructure is powered by enterprise-grade servers. Whether it's an intimate 50-person housewarming or a massive public teaser launch with thousands of visitors, the site stays fast and live." },
  { q: "How do guests RSVP or interact with the page?", a: "We can embed custom forms directly on your page. When a guest submits their attendance, the data routes directly to your WhatsApp or Google Sheet." },
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
      >
        <span className="faq2-btn__num">
          {String(index + 1).padStart(2, "0")}.
        </span>
        <span className="faq2-btn__q">{q}</span>
        <span className="faq2-btn__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="9" y1="2" x2="9" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="faq2-icon-v" />
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

export default function About() {
  return (
    <section id="about" className="about" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background ambient light */}
      <div className="ambient-glow" style={{ top: "30%", right: "-10%", width: "450px", opacity: 0.08 }} />
      <div className="ambient-glow" style={{ bottom: "10%", left: "-10%", width: "500px", opacity: 0.08 }} />

      <div className="about__container">
        {/* ── 1. What We Do ── */}
        <div className="wwd-section">

          {/* Centered header */}
          <div className="wwd-header">
            <span className="sec-label" style={{ color: "var(--gold)", display: "block", marginBottom: "1rem" }}>What We Do</span>
            <h2 className="wwd-heading">
              A website and an album,<br />
              built for <em>your moment.</em>
            </h2>
            <p className="wwd-sub">
              Two ways to hold onto a celebration — each delivered in days, shared with one link, live online forever.
            </p>
          </div>

          {/* Two cinematic product cards */}
          <div className="wwd-cards">

            {/* Card A — The Event Website */}
            <div className="wwd-card wwd-card--site">
              <div className="wwd-card__bg wwd-card__bg--site" aria-hidden="true">
                {/* Decorative calendar / invite visual in CSS */}
              </div>
              <div className="wwd-card__content">
                <span className="wwd-card__index">01</span>
                <h3 className="wwd-card__name">The Event<br />Website</h3>
                <p className="wwd-card__desc">
                  A live, personalised page your guests open before the day — with a countdown, RSVP, venue map and photo gallery.
                </p>
                <ul className="wwd-card__features">
                  <li>Live countdown to the day</li>
                  <li>Guest RSVP & attendance</li>
                  <li>Photo & video gallery</li>
                  <li>Share via WhatsApp instantly</li>
                </ul>
              </div>
            </div>

            {/* Card B — The Digital Album */}
            <div className="wwd-card wwd-card--album">
              <div className="wwd-card__photo">
                <AlbumSpreadWidget />
              </div>
              <div className="wwd-card__content wwd-card__content--light">
                <span className="wwd-card__index">02</span>
                <h3 className="wwd-card__name">The Digital<br />Album</h3>
                <p className="wwd-card__desc">
                  Pages that turn, music that plays — an interactive flip-through album that stays live online forever.
                </p>
                <ul className="wwd-card__features">
                  <li>Flip-through page experience</li>
                  <li>Background music playback</li>
                  <li>Stays live forever, one-time cost</li>
                  <li>Works on every device</li>
                </ul>
              </div>
            </div>

          </div>

          {/* CTAs */}
          <div className="wwd-ctas">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" style={{ background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)", border: "none", boxShadow: "0 4px 15px rgba(150,34,43, 0.25)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask Us Anything
            </a>
            <Link href="/#work" className="mag-btn" style={{ border: "1px solid var(--border-2)", background: "var(--surface)", color: "var(--text)" }}>
              See Examples
            </Link>
          </div>

        </div>

        {/* ── 2. Comparison ── */}
        <div style={{ marginBottom: "6rem", position: "relative", zIndex: 1 }}>
          <div className="sec-label" style={{ textAlign: "center", marginBottom: "1rem", color: "var(--gold)" }}>Beyond the Paper</div>
          <h3 className="about__heading" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            Why a <span>OneMark Story</span> is the ultimate invite.
          </h3>
          <div className="comparison-table">
            <div className="comparison-table__head">
              <div />
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

        {/* ── 3. Process ── */}
        <div style={{ marginBottom: "6rem", position: "relative", zIndex: 1 }}>
          <div className="process__label sec-label" style={{ color: "var(--gold)" }}>The Process</div>
          <h3 className="process__heading">Simple. Fast. Unforgettable.</h3>
          <div className="process__grid">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="process__step glass" data-hover>
                <div className="process__step-num" style={{ color: "var(--gold)" }}>{step}</div>
                <div className="process__step-title">{title}</div>
                <div className="process__step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. FAQ ── */}
        <div className="faq2-section" style={{ position: "relative", zIndex: 1 }}>
          <div className="faq2-section__header">
            <span className="sec-label" style={{ color: "var(--gold)" }}>FAQ</span>
            <h3 className="faq2-section__heading">
              Everything you<br />
              <span>need to know.</span>
            </h3>

            {/* Editorial seal stamps */}
            <div className="faq2-seals">
              <div className="faq2-seal faq2-seal--a">
                <div className="faq2-seal__ring">
                  <div className="faq2-seal__body">
                    <div className="faq2-seal__num">50<span>+</span></div>
                    <div className="faq2-seal__label">Stories<br />Published</div>
                  </div>
                </div>
              </div>
              <div className="faq2-seal faq2-seal--b">
                <div className="faq2-seal__ring">
                  <div className="faq2-seal__body">
                    <div className="faq2-seal__num">3–5</div>
                    <div className="faq2-seal__label">Day<br />Delivery</div>
                  </div>
                </div>
              </div>
              <div className="faq2-seal faq2-seal--c">
                <div className="faq2-seal__ring">
                  <div className="faq2-seal__body">
                    <div className="faq2-seal__num">∞</div>
                    <div className="faq2-seal__label">Live<br />Forever</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered quote strip */}
            <div className="faq2-strip">
              <div className="faq2-strip__rule" aria-hidden="true" />
              <p className="faq2-strip__quote">
                "Within hours of sharing the link, family across five cities had already flipped through every page."
              </p>
              <p className="faq2-strip__attr">Srinu &amp; Sai &nbsp;·&nbsp; Wedding, March 2026</p>
              <div className="faq2-strip__rule" aria-hidden="true" />
            </div>

            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="faq2-wa-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.324-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-5.001-1.374l-.36-.213-3.727.978.994-3.632-.233-.374A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" /></svg>
              Still have questions? Chat with us
            </a>
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
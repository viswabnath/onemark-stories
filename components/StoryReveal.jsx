/**
 * StoryReveal.jsx — Scroll-driven text + visual sequence.
 * CSS sticky keeps inner viewport fixed while user scrolls through 4 beats.
 * Each beat has a text side and a matching SVG visual.
 */
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// SVG visuals — one per beat. Static markup, no hooks.
const RingsVisual = () => (
  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-beat__svg" aria-hidden="true">
    <circle cx="105" cy="140" r="72" stroke="currentColor" strokeWidth="4.5"/>
    <circle cx="175" cy="140" r="72" stroke="currentColor" strokeWidth="4.5"/>
    <circle cx="105" cy="140" r="54" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 10" strokeOpacity="0.4"/>
    <circle cx="175" cy="140" r="54" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 10" strokeOpacity="0.4"/>
    <circle cx="140" cy="115" r="5" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="140" cy="165" r="5" fill="currentColor" fillOpacity="0.7"/>
  </svg>
);

const SparkleVisual = () => {
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-beat__svg" aria-hidden="true">
      <circle cx="140" cy="140" r="38" stroke="currentColor" strokeWidth="4.5"/>
      {spokes.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 140 + 55 * Math.cos(rad);
        const y1 = 140 + 55 * Math.sin(rad);
        const x2 = 140 + 95 * Math.cos(rad);
        const y2 = 140 + 95 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3.5" strokeOpacity="0.8" strokeLinecap="round"/>;
      })}
      {spokes.map((angle) => {
        const rad = ((angle + 22.5) * Math.PI) / 180;
        const x = 140 + 110 * Math.cos(rad);
        const y = 140 + 110 * Math.sin(rad);
        return <circle key={`dot-${angle}`} cx={x} cy={y} r="3.5" fill="currentColor" fillOpacity="0.5"/>;
      })}
    </svg>
  );
};

const PhoneVisual = () => (
  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-beat__svg" aria-hidden="true">
    {/* Phone body */}
    <rect x="85" y="35" width="110" height="195" rx="16" stroke="currentColor" strokeWidth="4.5"/>
    <line x1="102" y1="56" x2="178" y2="56" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" strokeLinecap="round"/>
    <circle cx="140" cy="217" r="7" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.5"/>
    {/* Share arrows flying out */}
    <circle cx="196" cy="95" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.75"/>
    <circle cx="210" cy="125" r="7" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.55"/>
    <circle cx="202" cy="75" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4"/>
    <line x1="178" y1="100" x2="189" y2="96" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round"/>
    <line x1="178" y1="120" x2="204" y2="126" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round"/>
    {/* Screen content lines */}
    <line x1="105" y1="95" x2="155" y2="95" stroke="currentColor" strokeWidth="3" strokeOpacity="0.35" strokeLinecap="round"/>
    <line x1="105" y1="112" x2="165" y2="112" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" strokeLinecap="round"/>
  </svg>
);

const BrowserVisual = () => (
  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-beat__svg" aria-hidden="true">
    {/* Browser chrome */}
    <rect x="25" y="60" width="230" height="160" rx="10" stroke="currentColor" strokeWidth="4.5"/>
    <line x1="25" y1="93" x2="255" y2="93" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.4"/>
    {/* Traffic lights */}
    <circle cx="46" cy="77" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.65"/>
    <circle cx="64" cy="77" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.65"/>
    <circle cx="82" cy="77" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.65"/>
    {/* URL bar */}
    <rect x="110" y="68" width="100" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
    {/* Content lines */}
    <line x1="50" y1="120" x2="130" y2="120" stroke="currentColor" strokeWidth="3.5" strokeOpacity="0.55" strokeLinecap="round"/>
    <line x1="50" y1="140" x2="165" y2="140" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" strokeLinecap="round"/>
    <line x1="50" y1="158" x2="115" y2="158" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" strokeLinecap="round"/>
    <line x1="50" y1="176" x2="145" y2="176" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" strokeLinecap="round"/>
    {/* Sparkle */}
    <circle cx="210" cy="148" r="22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
    <circle cx="210" cy="148" r="12" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.5"/>
  </svg>
);

const VISUALS = [RingsVisual, SparkleVisual, PhoneVisual, BrowserVisual];

const BEATS = [
  {
    chapter: "01",
    headline: ["Getting", "married?"],
    sub: "We build a custom website your guests open before the day even arrives.",
    color: "#D4758C",
  },
  {
    chapter: "02",
    headline: ["Something", "to celebrate?"],
    sub: "Birthdays, launches, milestones — every moment deserves its own page.",
    color: "#C9A96E",
  },
  {
    chapter: "03",
    headline: ["One link.", "All your guests."],
    sub: "A countdown, galleries, your story — one beautiful link shared with everyone you love.",
    color: "#29ABE2",
  },
  {
    chapter: "04",
    headline: ["We build", "the page."],
    sub: "Custom coded. Cinematic. Ready in 3 days. Lives online, forever.",
    color: "#D4758C",
  },
];

export default function StoryReveal() {
  const sectionRef = useRef(null);
  const currentBeatRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function update() {
      const rect = section.getBoundingClientRect();
      const sectionScrollHeight = section.offsetHeight - window.innerHeight;
      if (sectionScrollHeight <= 0) return;

      const scrolled = Math.max(0, Math.min(sectionScrollHeight, -rect.top));
      const progress = scrolled / sectionScrollHeight;
      const beatIndex = Math.min(BEATS.length - 1, Math.floor(progress * BEATS.length));

      if (beatIndex !== currentBeatRef.current) {
        const old = currentBeatRef.current;
        currentBeatRef.current = beatIndex;

        const oldEl = section.querySelector(`.story-beat--${old}`);
        const newEl = section.querySelector(`.story-beat--${beatIndex}`);

        // Immediately remove old beat — no overlap
        if (oldEl) {
          gsap.killTweensOf(oldEl);
          gsap.set(oldEl, { opacity: 0, y: 0, zIndex: 1 });
        }

        // Animate new beat in from below
        if (newEl) {
          gsap.killTweensOf(newEl);
          gsap.set(newEl, { zIndex: 2 });
          gsap.fromTo(
            newEl,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, duration: 0.72, ease: "power3.out" }
          );
        }

        section.querySelectorAll(".story-reveal__dot").forEach((dot, di) => {
          dot.classList.toggle("active", di === beatIndex);
        });
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="story-reveal" ref={sectionRef}>
      <div className="story-reveal__sticky">
        <div className="blob story-reveal__blob" />

        {BEATS.map((beat, i) => {
          const Visual = VISUALS[i];
          return (
            <div
              key={i}
              className={`story-beat story-beat--${i}`}
              style={{ "--beat-color": beat.color, opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 }}
            >
              <div className="story-beat__text">
                <span className="story-beat__chapter sec-label">{beat.chapter}</span>
                <h2 className="story-beat__headline">
                  {beat.headline.map((line, j) => (
                    <span key={j} className="story-beat__line">{line}</span>
                  ))}
                </h2>
                <p className="story-beat__sub">{beat.sub}</p>
              </div>
              <div className="story-beat__visual" style={{ color: beat.color }}>
                <Visual />
              </div>
            </div>
          );
        })}

        <div className="story-reveal__dots" aria-hidden="true">
          {BEATS.map((_, i) => (
            <div key={i} className={`story-reveal__dot${i === 0 ? " active" : ""}`} />
          ))}
        </div>

        <div className="story-reveal__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="story-reveal__scroll-line" />
        </div>
      </div>
    </section>
  );
}

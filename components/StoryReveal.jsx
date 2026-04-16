/**
 * StoryReveal.jsx — Scroll-driven 4-beat fullscreen narrative.
 *
 * MOBILE FIX: Wrapped scroll listener in IntersectionObserver.
 * On mobile the section's offsetHeight was stale at mount time
 * (fonts not loaded, loader still animating), so sectionScrollHeight
 * was 0 → beats never changed. Now the listener only attaches once
 * the section enters the viewport, when layout is settled.
 * Also calls update() immediately on enter so the correct beat
 * shows without needing to scroll first.
 */
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/* ── Beat data ──────────────────────────────────────────────────── */
const BEATS = [
  {
    chapter:  "01",
    headline: ["Every moment", "deserves", "a page."],
    sub:      "Weddings, birthdays, housewarmings, launches — whatever it is, we build the experience your guests remember.",
    color:    "#C9A96E",
    bg:       "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,169,110,0.18) 0%, transparent 70%)",
  },
  {
    chapter:  "02",
    headline: ["Getting", "married?"],
    sub:      "We build a custom website your guests open before the day even arrives.",
    color:    "#D4758C",
    bg:       "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(212,117,140,0.18) 0%, transparent 70%)",
  },
  {
    chapter:  "03",
    headline: ["One link.", "All your guests."],
    sub:      "A countdown, galleries, your story — one beautiful link shared with everyone you love.",
    color:    "#29ABE2",
    bg:       "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(41,171,226,0.18) 0%, transparent 70%)",
  },
  {
    chapter:  "04",
    headline: ["We build", "the page."],
    sub:      "Custom coded. Cinematic. Ready in 3 days. Lives online, forever.",
    color:    "#D4758C",
    bg:       "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(212,117,140,0.14) 0%, transparent 70%)",
  },
];

/* ── SVG Visuals ────────────────────────────────────────────────── */
const WeddingVisual = ({ color }) => (
  <div className="sr-visual sr-visual--wedding" style={{ "--vc": color }}>
    <svg viewBox="0 0 340 320" fill="none" aria-hidden="true">
      <defs>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="130" cy="160" r="80" stroke={color} strokeWidth="5" filter="url(#glow1)" className="sr-ring sr-ring--left"/>
      <circle cx="130" cy="160" r="60" stroke={color} strokeWidth="1.5" strokeDasharray="6 12" strokeOpacity="0.3" className="sr-ring-dash"/>
      <circle cx="210" cy="160" r="80" stroke={color} strokeWidth="5" filter="url(#glow1)" className="sr-ring sr-ring--right"/>
      <circle cx="210" cy="160" r="60" stroke={color} strokeWidth="1.5" strokeDasharray="6 12" strokeOpacity="0.3" className="sr-ring-dash"/>
      <polygon points="170,130 185,160 170,190 155,160" fill={color} fillOpacity="0.9" filter="url(#glow1)" className="sr-diamond"/>
      <polygon points="170,138 180,160 170,182 160,160" fill="white" fillOpacity="0.25"/>
      <g className="sr-sparkle sr-sparkle--1" style={{ transformOrigin: "72px 72px" }}>
        <line x1="72" y1="60" x2="72" y2="84" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="72" x2="84" y2="72" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="64" y1="64" x2="80" y2="80" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
        <line x1="80" y1="64" x2="64" y2="80" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
      </g>
      <g className="sr-sparkle sr-sparkle--2" style={{ transformOrigin: "280px 100px" }}>
        <line x1="280" y1="90" x2="280" y2="110" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="270" y1="100" x2="290" y2="100" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="273" y1="93" x2="287" y2="107" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5"/>
        <line x1="287" y1="93" x2="273" y2="107" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5"/>
      </g>
      <g className="sr-float sr-float--1">
        <path d="M90 240 C90 235,83 230,83 236 C83 240,90 246,90 246 C90 246,97 240,97 236 C97 230,90 235,90 240Z" fill={color} fillOpacity="0.7"/>
      </g>
      <g className="sr-float sr-float--2">
        <path d="M264 220 C264 216,259 212,259 217 C259 220,264 225,264 225 C264 225,269 220,269 217 C269 212,264 216,264 220Z" fill={color} fillOpacity="0.5"/>
      </g>
      <g className="sr-float sr-float--3">
        <path d="M50 180 C50 176,45 172,45 177 C45 180,50 185,50 185 C50 185,55 180,55 177 C55 172,50 176,50 180Z" fill={color} fillOpacity="0.35"/>
      </g>
      <rect x="120" y="260" width="100" height="26" rx="13" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" strokeWidth="1"/>
      <text x="170" y="278" textAnchor="middle" fill={color} fontSize="11" fontFamily="Outfit,sans-serif" letterSpacing="2">YOUR DATE</text>
    </svg>
  </div>
);

const CelebrationVisual = ({ color }) => (
  <div className="sr-visual sr-visual--celebrate" style={{ "--vc": color }}>
    <svg viewBox="0 0 340 320" fill="none" aria-hidden="true">
      <g className="sr-balloon sr-balloon--1">
        <ellipse cx="100" cy="140" rx="34" ry="42" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2.5"/>
        <ellipse cx="91" cy="128" rx="8" ry="5" fill="white" fillOpacity="0.15" transform="rotate(-30 91 128)"/>
        <line x1="100" y1="182" x2="104" y2="230" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round"/>
      </g>
      <g className="sr-balloon sr-balloon--2">
        <ellipse cx="170" cy="110" rx="40" ry="50" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="3"/>
        <ellipse cx="158" cy="94" rx="10" ry="7" fill="white" fillOpacity="0.18" transform="rotate(-30 158 94)"/>
        <line x1="170" y1="160" x2="175" y2="230" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round"/>
      </g>
      <g className="sr-balloon sr-balloon--3">
        <ellipse cx="248" cy="130" rx="30" ry="38" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2"/>
        <ellipse cx="240" cy="120" rx="7" ry="4" fill="white" fillOpacity="0.14" transform="rotate(-30 240 120)"/>
        <line x1="248" y1="168" x2="250" y2="230" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round"/>
      </g>
      {[[60,70,12,8,20],[280,60,10,6,-15],[240,200,14,7,35],[80,210,10,5,-25],[310,160,8,5,10],[45,140,12,6,-40]].map(([cx,cy,w,h,rot],i) => (
        <rect key={i} x={cx-w/2} y={cy-h/2} width={w} height={h} rx="2"
          fill={color} fillOpacity={0.3+(i%3)*0.15}
          transform={`rotate(${rot} ${cx} ${cy})`}
          className={`sr-confetti sr-confetti--${i+1}`}/>
      ))}
      <g className="sr-starburst" style={{ transformOrigin: "170px 250px" }}>
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const r=(a*Math.PI)/180;
          return <line key={i} x1={170} y1={250} x2={170+22*Math.cos(r)} y2={250+22*Math.sin(r)} stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8"/>;
        })}
        <circle cx="170" cy="250" r="5" fill={color}/>
      </g>
      <text x="60"  y="280" fill={color} fontSize="22" fontFamily="Cormorant Garamond,serif" fillOpacity="0.5" className="sr-exclaim">!</text>
      <text x="160" y="290" fill={color} fontSize="28" fontFamily="Cormorant Garamond,serif" fillOpacity="0.7" className="sr-exclaim">!</text>
      <text x="260" y="278" fill={color} fontSize="18" fontFamily="Cormorant Garamond,serif" fillOpacity="0.4" className="sr-exclaim">!</text>
    </svg>
  </div>
);

const ShareVisual = ({ color }) => (
  <div className="sr-visual sr-visual--share" style={{ "--vc": color }}>
    <svg viewBox="0 0 340 320" fill="none" aria-hidden="true">
      <rect x="130" y="60" width="80" height="145" rx="14" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="3"/>
      <rect x="152" y="68" width="36" height="8" rx="4" fill={color} fillOpacity="0.3"/>
      <rect x="142" y="90" width="56" height="8" rx="3" fill={color} fillOpacity="0.4"/>
      <rect x="142" y="106" width="40" height="5" rx="2.5" fill={color} fillOpacity="0.25"/>
      <rect x="142" y="118" width="48" height="5" rx="2.5" fill={color} fillOpacity="0.2"/>
      <rect x="142" y="132" width="56" height="36" rx="5" fill={color} fillOpacity="0.18" stroke={color} strokeOpacity="0.3" strokeWidth="1"/>
      <rect x="158" y="192" width="24" height="4" rx="2" fill={color} fillOpacity="0.4"/>
      <circle cx="170" cy="135" r="65"  stroke={color} strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 8" className="sr-ripple sr-ripple--1"/>
      <circle cx="170" cy="135" r="100" stroke={color} strokeWidth="1"   strokeOpacity="0.15" strokeDasharray="4 8" className="sr-ripple sr-ripple--2"/>
      <circle cx="170" cy="135" r="138" stroke={color} strokeWidth="0.8" strokeOpacity="0.1"  strokeDasharray="4 8" className="sr-ripple sr-ripple--3"/>
      {[[52,80],[295,90],[38,200],[302,210],[100,270],[240,268]].map(([cx,cy],i) => (
        <g key={i} className={`sr-avatar sr-avatar--${i+1}`}>
          <circle cx={cx} cy={cy} r="16" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
          <circle cx={cx-2} cy={cy-3} r="5" fill={color} fillOpacity="0.5"/>
          <path d={`M${cx-9} ${cy+10} Q${cx} ${cy+4} ${cx+9} ${cy+10}`} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round"/>
          <line x1={cx} y1={cy} x2="170" y2="135" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 5"/>
        </g>
      ))}
      <rect x="118" y="226" width="104" height="22" rx="11" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.35" strokeWidth="1"/>
      <text x="170" y="241" textAnchor="middle" fill={color} fontSize="10" fontFamily="Outfit,sans-serif" letterSpacing="1.5">LINK SHARED ✓</text>
    </svg>
  </div>
);

const BuildVisual = ({ color }) => (
  <div className="sr-visual sr-visual--build" style={{ "--vc": color }}>
    <svg viewBox="0 0 340 320" fill="none" aria-hidden="true">
      <rect x="40" y="50" width="260" height="195" rx="12" fill={color} fillOpacity="0.07" stroke={color} strokeWidth="2.5"/>
      <rect x="40" y="50" width="260" height="36" rx="12" fill={color} fillOpacity="0.15"/>
      <rect x="40" y="74" width="260" height="12" fill={color} fillOpacity="0.15"/>
      <circle cx="66" cy="68" r="6" fill={color} fillOpacity="0.6"/>
      <circle cx="86" cy="68" r="6" fill={color} fillOpacity="0.4"/>
      <circle cx="106" cy="68" r="6" fill={color} fillOpacity="0.25"/>
      <rect x="122" y="60" width="138" height="16" rx="8" fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.2" strokeWidth="1"/>
      <text x="191" y="72" textAnchor="middle" fill={color} fontSize="9" fontFamily="Outfit,sans-serif" letterSpacing="0.5" fillOpacity="0.6">stories.onemark.co.in</text>
      <rect x="60" y="102" width="100" height="10" rx="4" fill={color} fillOpacity="0.35" className="sr-buildline sr-buildline--1"/>
      <rect x="60" y="120" width="140" height="7" rx="3.5" fill={color} fillOpacity="0.22" className="sr-buildline sr-buildline--2"/>
      <rect x="60" y="135" width="80" height="7" rx="3.5" fill={color} fillOpacity="0.18" className="sr-buildline sr-buildline--3"/>
      <rect x="168" y="100" width="108" height="70" rx="7" fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.25" strokeWidth="1"/>
      <line x1="168" y1="100" x2="276" y2="170" stroke={color} strokeOpacity="0.1" strokeWidth="1"/>
      <line x1="276" y1="100" x2="168" y2="170" stroke={color} strokeOpacity="0.1" strokeWidth="1"/>
      <rect x="60" y="160" width="70" height="20" rx="10" fill={color} fillOpacity="0.4" className="sr-buildline sr-buildline--4"/>
      <rect x="60" y="210" width="220" height="6" rx="3" fill={color} fillOpacity="0.1"/>
      <rect x="60" y="210" width="0" height="6" rx="3" fill={color} className="sr-progress-fill"/>
      <rect x="85" y="228" width="170" height="26" rx="13" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" strokeWidth="1"/>
      <text x="170" y="245" textAnchor="middle" fill={color} fontSize="11" fontFamily="Outfit,sans-serif" letterSpacing="2" fontWeight="600">LIVE IN 3 DAYS ✦</text>
      <g className="sr-sparkle sr-sparkle--build" style={{ transformOrigin: "295px 55px" }}>
        <line x1="295" y1="45" x2="295" y2="65" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="285" y1="55" x2="305" y2="55" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="288" y1="48" x2="302" y2="62" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <line x1="302" y1="48" x2="288" y2="62" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
      </g>
    </svg>
  </div>
);

const VISUALS = [CelebrationVisual, WeddingVisual, ShareVisual, BuildVisual];

/* ── Component ──────────────────────────────────────────────────── */
export default function StoryReveal() {
  const sectionRef     = useRef(null);
  const currentBeatRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function update() {
      // Recalculate every call — fixes mobile stale offsetHeight bug
      const rect                = section.getBoundingClientRect();
      const sectionScrollHeight = section.offsetHeight - window.innerHeight;
      if (sectionScrollHeight <= 0) return;

      const scrolled  = Math.max(0, Math.min(sectionScrollHeight, -rect.top));
      const progress  = scrolled / sectionScrollHeight;
      const beatIndex = Math.min(BEATS.length - 1, Math.floor(progress * BEATS.length));

      if (beatIndex !== currentBeatRef.current) {
        const old = currentBeatRef.current;
        currentBeatRef.current = beatIndex;

        const oldEl = section.querySelector(`.story-beat--${old}`);
        const newEl = section.querySelector(`.story-beat--${beatIndex}`);

        if (oldEl) { gsap.killTweensOf(oldEl); gsap.set(oldEl, { opacity: 0, y: 0, zIndex: 1 }); }
        if (newEl) {
          gsap.killTweensOf(newEl);
          gsap.set(newEl, { zIndex: 2 });
          gsap.fromTo(newEl, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out" });
        }

        section.querySelectorAll(".story-reveal__dot").forEach((dot, di) => {
          dot.classList.toggle("active", di === beatIndex);
        });

        const sticky = section.querySelector(".story-reveal__sticky");
        if (sticky) sticky.style.setProperty("--beat-bg", BEATS[beatIndex].bg);
      }
    }

    // IntersectionObserver — attach scroll listener only when section is visible.
    // Fixes mobile: offsetHeight is correct only after section enters viewport.
    let active = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        window.addEventListener("scroll", update, { passive: true });
        update(); // run once immediately so correct beat shows on enter
      } else if (!entry.isIntersecting && active) {
        active = false;
        window.removeEventListener("scroll", update);
      }
    }, { threshold: 0 });
    io.observe(section);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <section className="story-reveal" ref={sectionRef}>
      <div className="story-reveal__sticky" style={{ "--beat-bg": BEATS[0].bg }}>
        <div className="story-reveal__bg" />
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
              <div className="story-beat__visual">
                <Visual color={beat.color} />
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
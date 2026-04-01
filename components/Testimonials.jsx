/**
 * components/Testimonials.jsx
 *
 * Single DOM tree — no conditional JSX branching based on window width.
 * CSS handles mobile vs desktop layout. JS height only runs on desktop.
 */
import { useRef, useEffect } from "react";

const TESTIMONIALS = [
  { name: "Nazurul & Sajida",  tag: "Wedding",   color: "#D4758C", quote: "Our guests couldn't stop talking about the website. It felt like a mini movie of our love story — everyone knew exactly where to go and when to arrive." },
  { name: "Ganesh & Srija",    tag: "Wedding",   color: "#29ABE2", quote: "The countdown timer that turned into fireworks at our Muhurtham time was magical. Our families in the US felt like they were right there with us." },
  { name: "Arun & Spandana",   tag: "Wedding",   color: "#C9A96E", quote: "From Ladakh to London — they captured our entire journey in one beautiful page. It's been months and relatives still share the link." },
  { name: "Venkat & Nandini",  tag: "Wedding",   color: "#C9A96E", quote: "We replaced 500 printed cards with one link. Saved money, saved time, and honestly it looked a hundred times better than any paper invite could." },
  { name: "Srinu & Sai",       tag: "Wedding",   color: "#D4758C", quote: "They turned our wedding into chapters — like a film. The photo galleries for each event made it so easy to relive every moment afterwards." },
  { name: "Viswanath B.",      tag: "Portfolio", color: "#29ABE2", quote: "I'd been putting off building a portfolio for two years. OneMark had mine live in four days — and I landed my first freelance client the week after." },
  { name: "Priya Events Co.",  tag: "Corporate", color: "#C9A96E", quote: "We used the Legacy tier for a product launch and had over 3,000 visitors on day one without the site even hiccupping. The 3D hero section was a showstopper." },
  { name: "Meghana R.",        tag: "Birthday",  color: "#D4758C", quote: "My dad's 60th birthday page had a countdown, photo gallery, and a surprise video message section. He cried. Worth every rupee." },
];

export default function Testimonials() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Never run sticky-height logic on mobile — prevents the giant spacer bug
    if (window.innerWidth < 768) return;

    const getOverflow = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const setHeight = () => {
      if (window.innerWidth < 768) { outer.style.height = ""; return; }
      const overflow = getOverflow();
      outer.style.height = overflow > 0 ? `calc(100vh + ${overflow}px)` : "";
    };
    setHeight();
    window.addEventListener("resize", setHeight, { passive: true });

    const onScroll = () => {
      if (window.innerWidth < 768) return;
      const rect = outer.getBoundingClientRect();
      const overflow = getOverflow();
      if (overflow <= 0) return;
      const scrolled = Math.max(0, Math.min(overflow, -rect.top));
      track.style.transform = `translateX(-${scrolled}px)`;
    };

    let active = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.trackEvent?.("testimonials_viewed");
      } else if (!entry.isIntersecting && active) {
        active = false;
        window.removeEventListener("scroll", onScroll);
      }
    }, { threshold: 0 });
    io.observe(outer);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setHeight);
      if (track) track.style.transform = "";
      if (outer) outer.style.height = "";
    };
  }, []);

  return (
    <div className="hs-outer" ref={outerRef}>
      <div className="hs-sticky">
        <div className="qs__header">
          <span className="sec-label">What Clients Say</span>
          <h2 className="quotes-section__heading">
            Heard from <span>real people.</span>
          </h2>
        </div>

        <div className="hs-track" ref={trackRef}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="hs-card glass" style={{ "--qp-color": t.color }}>
              <div className="hs-card__index sec-label">
                {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center",
                padding: "3px 10px", borderRadius: "100px",
                border: `1px solid ${t.color}44`, background: `${t.color}18`,
                fontSize: "10px", color: t.color,
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.12em", marginBottom: "12px", width: "fit-content",
              }}>
                {t.tag}
              </div>
              <blockquote className="hs-card__quote">{t.quote}</blockquote>
              <div className="hs-card__attr">
                <div className="hs-card__avatar" style={{
                  color: t.color,
                  background: `color-mix(in srgb, ${t.color} 15%, transparent)`,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="hs-card__name">{t.name}</div>
                  <div className="hs-card__tag">{t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe hint — shown on mobile only via CSS (.hs-swipe-hint) */}
        <p className="hs-swipe-hint">Swipe to see more →</p>
      </div>
    </div>
  );
}
/**
 * Testimonials.jsx — Horizontal GSAP scroll.
 * Uses CSS sticky (no GSAP pin) to avoid React DOM conflicts.
 * Outer div provides scroll height; inner sticky div acts as viewport.
 */
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: "Nazurul & Sajida",
    tag: "Wedding",
    quote:
      "Our guests couldn't stop talking about the website. It felt like a mini movie of our love story — everyone knew exactly where to go and when to arrive.",
    color: "#D4758C",
  },
  {
    name: "Ganesh & Srija",
    tag: "Wedding",
    quote:
      "The countdown timer that turned into fireworks at our Muhurtham time was magical. Our families in the US felt like they were right there with us.",
    color: "#29ABE2",
  },
  {
    name: "Arun & Spandana",
    tag: "Wedding",
    quote:
      "From Ladakh to London — they captured our entire journey in one beautiful page. It's been months and relatives still share the link.",
    color: "#C9A96E",
  },
  {
    name: "Venkat & Nandini",
    tag: "Wedding",
    quote:
      "We replaced 500 printed cards with one link. Saved money, saved time, and honestly it looked a hundred times better than any paper invite could.",
    color: "#C9A96E",
  },
  {
    name: "Srinu & Sai",
    tag: "Wedding",
    quote:
      "They turned our wedding into chapters — like a film. The photo galleries for each event made it so easy to relive every moment afterwards.",
    color: "#D4758C",
  },
];

export default function Testimonials() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Give the outer container enough height to scroll the full track width
    const setHeight = () => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll > 0) {
        outer.style.height = `calc(100vh + ${totalScroll}px)`;
      }
    };

    setHeight();

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: setHeight,
        },
      });
    });

    return () => {
      ctx.revert();
      if (outer) outer.style.height = "";
    };
  }, []);

  return (
    <div className="hs-outer" ref={outerRef}>
      {/* sticky panel — stays in view while outer scrolls */}
      <div className="hs-sticky">
        <div className="qs__header">
          <span className="sec-label">What Clients Say</span>
          <h2 className="quotes-section__heading">
            Heard from <span>real people.</span>
          </h2>
        </div>

        <div className="hs-track" ref={trackRef}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="hs-card glass"
              style={{ "--qp-color": t.color }}
            >
              <div className="hs-card__index sec-label">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(TESTIMONIALS.length).padStart(2, "0")}
              </div>
              <blockquote className="hs-card__quote">{t.quote}</blockquote>
              <div className="hs-card__attr">
                <div
                  className="hs-card__avatar"
                  style={{
                    color: t.color,
                    background: `color-mix(in srgb, ${t.color} 15%, transparent)`,
                  }}
                >
                  {t.name.split(" & ")[0][0]}
                </div>
                <div>
                  <div className="hs-card__name">{t.name}</div>
                  <div className="hs-card__tag">{t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

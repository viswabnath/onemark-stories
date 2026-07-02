/**
 * components/Showcase/index.jsx
 *
 * Sticky horizontal scroll — like StoryReveal but for projects.
 *
 * HOW IT WORKS (same pattern as Testimonials desktop scroll):
 *  - Outer div height = 100vh * number_of_projects  (gives scroll room)
 *  - Inner div is position:sticky, height:100vh
 *  - A horizontal track holds one full-viewport "slide" per project
 *  - On scroll, we read how far into the outer div we are and
 *    translateX the track by that amount — each slide snaps into view
 *
 * Each slide = left info panel + MacBook (right) + iPhone overlapping
 *
 * Mobile: same outer/sticky structure but track stacks vertically,
 *         MacBook hidden, iPhone shown alone. No JS height needed on mobile.
 */
import { useRef, useEffect } from "react";
import { PROJECTS } from "../../data/projects";
import IframeScreen from "./IframeScreen";
import MacBook from "./MacBook";
import IPhone from "./IPhone";

const IPHONE_W = 390;
const IPHONE_H = 844;
const DESKTOP_W = 1440;
const DESKTOP_H = 900;

function ProjectSlide({ project }) {
  return (
    <div className="phs-slide">
      {/* Background glow */}
      <div
        className="phs-slide__glow"
        style={{ background: `radial-gradient(ellipse 60% 70% at 75% 50%, ${project.color}18 0%, transparent 70%)` }}
      />

      <div className="phs-slide__inner">
        {/* ── Left: info ── */}
        <div className="phs-slide__info">
          <div className="phs-slide__meta">
            <span className="phs-slide__tag" style={{ color: project.color }}>{project.tag}</span>
            <span className="phs-slide__num">{project.num} / {String(PROJECTS.length).padStart(2, "0")}</span>
          </div>

          <h3 className="phs-slide__title">{project.title}</h3>
          <p className="phs-slide__tagline">{project.desc}</p>
          <p className="phs-slide__about">{project.about}</p>

          <div className="phs-slide__features">
            {project.features.slice(0, 3).map((f) => (
              <span key={f} className="phs-slide__pill"
                style={{ borderColor: `${project.color}33`, color: project.color, background: `${project.color}12` }}>
                ✦ {f}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mag-btn phs-slide__cta"
            style={{ borderColor: project.color, color: project.color }}
            data-hover
            onClick={() => window.trackEvent?.("showcase_open", { title: project.title })}
          >
            Open live site
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>

        {/* ── Right: devices ── */}
        <div className="phs-slide__devices">
          {/* MacBook — desktop only */}
          <div className="phs-slide__macbook">
            <MacBook>
              <IframeScreen
                src={project.url}
                nativeWidth={DESKTOP_W}
                nativeHeight={DESKTOP_H}
                title={`${project.title} — Desktop`}
              />
            </MacBook>
          </div>

          {/* iPhone overlapping bottom-left of MacBook */}
          <div className="phs-slide__iphone">
            <IPhone>
              <IframeScreen
                src={project.url}
                nativeWidth={IPHONE_W}
                nativeHeight={IPHONE_H}
                title={`${project.title} — Mobile`}
              />
            </IPhone>
          </div>
        </div>
      </div>

      {/* Progress dots at bottom */}
      <div className="phs-slide__dots" aria-hidden="true">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className={`phs-slide__dot${p.id === project.id ? " active" : ""}`}
            style={p.id === project.id ? { background: project.color } : {}}
          />
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Mobile: no JS needed — CSS handles stacked layout
    if (window.innerWidth < 900) return;

    const slideCount = PROJECTS.length;
    const getSlideWidth = () => window.innerWidth;

    // Outer height = one viewport per project slide
    const setHeight = () => {
      if (window.innerWidth < 900) { outer.style.height = ""; return; }
      outer.style.height = `${slideCount * 100}vh`;
    };
    setHeight();
    window.addEventListener("resize", setHeight, { passive: true });

    const onScroll = () => {
      if (window.innerWidth < 900) return;
      const rect = outer.getBoundingClientRect();
      const totalScroll = outer.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = Math.max(0, Math.min(totalScroll, -rect.top));
      // Translate track left by scrolled proportion
      const maxX = getSlideWidth() * (slideCount - 1);
      const x = (scrolled / totalScroll) * maxX;
      track.style.transform = `translateX(-${x}px)`;
    };

    let active = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.trackEvent?.("showcase_viewed");
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
    <div id="work" className="phs-outer" ref={outerRef}>
      <div className="phs-sticky">

        {/* Section label — top left */}
        <div className="phs-label">
          <span className="sec-label">See It Live</span>
          <h2 className="phs-heading">Real Sites. <span>Real People.</span></h2>
        </div>

        {/* Horizontal track */}
        <div className="phs-track" ref={trackRef}>
          {PROJECTS.map((project) => (
            <ProjectSlide key={project.id} project={project} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="phs-scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="phs-scroll-line" />
        </div>
      </div>
    </div>
  );
}
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
import { useRef, useEffect, useState } from "react";
import { PROJECTS } from "../../data/projects";
import IframeScreen from "./IframeScreen";
import MacBook from "./MacBook";
import IPhone from "./IPhone";

const IPHONE_W = 390;
const IPHONE_H = 844;
const DESKTOP_W = 1440;
const DESKTOP_H = 900;

/**
 * DevicePreview — renders the live iframe only when its slide is in (or near)
 * the viewport; otherwise a lightweight static placeholder. This keeps at most
 * a few live external sites mounted at once instead of all 20, which is what
 * caused the pinned-scroll to freeze on lower-end machines.
 */
function DevicePreview({ project, live, nativeWidth, nativeHeight, title }) {
  if (live) {
    return <IframeScreen src={project.url} nativeWidth={nativeWidth} nativeHeight={nativeHeight} title={title} />;
  }
  return (
    <div style={{ position: "relative", width: "100%", height: 0, paddingBottom: `${(nativeHeight / nativeWidth) * 100}%`, overflow: "hidden", borderRadius: "inherit" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8%",
          textAlign: "center",
          background: `radial-gradient(120% 100% at 50% 0%, ${project.color}33, transparent 60%), linear-gradient(160deg, #150f21 0%, #08060d 100%)`,
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: `${nativeWidth * 0.07}px`, color: "#F5EEF0", opacity: 0.85 }}>
          {project.title}
        </span>
      </div>
    </div>
  );
}

function ProjectSlide({ project, live, slideRef }) {
  return (
    <div className="phs-slide" ref={slideRef}>
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
              <DevicePreview
                project={project}
                live={live}
                nativeWidth={DESKTOP_W}
                nativeHeight={DESKTOP_H}
                title={`${project.title} — Desktop`}
              />
            </MacBook>
          </div>

          {/* iPhone overlapping bottom-left of MacBook */}
          <div className="phs-slide__iphone">
            <IPhone>
              <DevicePreview
                project={project}
                live={live}
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
  const slideRefs = useRef([]);
  const [liveSet, setLiveSet] = useState(() => new Set([0]));

  // Mount live iframes only for slides within ~one viewport of the screen
  // (horizontally on desktop, vertically on mobile). Keeps at most a handful
  // of external sites embedded at once instead of all 20. Driven by scroll
  // position (works reliably regardless of tab visibility).
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const vw = window.innerWidth, vh = window.innerHeight;
      const next = new Set();
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        // expand the viewport by one screen on every side to preload neighbours
        if (r.right > -vw && r.left < vw * 2 && r.bottom > -vh && r.top < vh * 2) next.add(i);
      });
      setLiveSet((prev) => {
        if (prev.size === next.size && [...next].every((i) => prev.has(i))) return prev;
        return next;
      });
    };
    const onChange = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

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
          {PROJECTS.map((project, i) => (
            <ProjectSlide
              key={project.id}
              project={project}
              live={liveSet.has(i)}
              slideRef={(el) => { slideRefs.current[i] = el; }}
            />
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
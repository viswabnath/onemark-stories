/**
 * Showcase — IframeScreen handles all scaling via ResizeObserver.
 */
import { useState, useCallback, useEffect, useRef } from "react";
import { PROJECTS } from "../../data/projects";
import ViewToggle   from "./ViewToggle";
import MacBook      from "./MacBook";
import IPhone       from "./IPhone";
import IframeScreen from "./IframeScreen";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SWITCH_MS = 260;

// Native viewport dimensions for each device
const IPHONE_W  = 390;
const IPHONE_H  = 844;
const DESKTOP_W = 1440;
const DESKTOP_H = 900;

function ProjectCard({ project, isActive, onSelect, children }) {
  return (
    <div className="project-card">
      <button
        onClick={() => onSelect(project.id)}
        className={`project-card-header${isActive ? " active" : ""}`}
        data-hover aria-expanded={isActive}
      >
        <div className="project-card__meta">
          <span className="project-card__tag" style={{ color: project.color }}>{project.tag}</span>
          <span className="project-card__num">{project.num}</span>
        </div>
        <div className="project-card__title">{project.title}</div>
        <div className="project-card__desc">{project.desc}</div>
      </button>
      <div className="project-card-body" style={{ maxHeight: isActive ? 1400 : 0 }}>
        <div className="project-card-body-inner">
          <p className="project-card-about">{project.about}</p>
          <div className="project-card-importance">
            <div className="project-card-importance__label">Why it matters</div>
            <p className="project-card-importance__text">{project.importance}</p>
          </div>
          <div className="project-card-features">
            {project.features.map(f => <span key={f} className="feature-pill">✦ {f}</span>)}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [activeId,      setActiveId]      = useState(0);
  const [isMobile,      setIsMobile]      = useState(false);
  const [switching,     setSwitching]     = useState(false);
  const [currentUrl,    setCurrentUrl]    = useState(PROJECTS[0]?.url);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => {
      const small = window.innerWidth < 768;
      setIsSmallScreen(small);
      if (small) setIsMobile(true);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".showcase__heading, .showcase__sub",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".showcase__header", start: "top 85%" } }
      );
      gsap.fromTo(".project-list-cards .project-card",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".project-list-cards", start: "top 85%" } }
      );
      gsap.fromTo(".showcase__device-col",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".showcase__device-col", start: "top 88%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [isSmallScreen]);

  const selectProject = useCallback((id) => {
    if (id === activeId) return;
    setSwitching(true);
    setTimeout(() => {
      setActiveId(id);
      setCurrentUrl(PROJECTS[id]?.url);
      setSwitching(false);
    }, SWITCH_MS);
  }, [activeId]);

  const handleToggle = useCallback(() => {
    setSwitching(true);
    setTimeout(() => { setIsMobile(p => !p); setSwitching(false); }, SWITCH_MS);
  }, []);

  const activeProject = PROJECTS.find(p => p.id === activeId);

  function DeviceFrame() {
    return (
      <div className={`device-frame${switching ? " switching" : ""}`}>
        {isMobile ? (
          <IPhone>
            <IframeScreen
              src={currentUrl}
              nativeWidth={IPHONE_W}
              nativeHeight={IPHONE_H}
              title={`${activeProject?.title} — Mobile`}
            />
          </IPhone>
        ) : (
          <MacBook>
            <IframeScreen
              src={currentUrl}
              nativeWidth={DESKTOP_W}
              nativeHeight={DESKTOP_H}
              title={`${activeProject?.title} — Desktop`}
            />
          </MacBook>
        )}
      </div>
    );
  }

  return (
    <section id="work" className="showcase" ref={sectionRef}>
      <div className="blob showcase__blob" />
      <div className="showcase__inner">

        <div className="showcase__header">
          <div className="sec-label showcase-sec-label-margin">See It Live</div>
          <h2 className="showcase__heading">
            Real Sites. Real People.<br />
            <span>Built by Us.</span>
          </h2>
          <p className="showcase__sub">
            These are actual live websites we've built for couples, families, and events.
            Click any project to preview it — or open it directly.
          </p>
        </div>

        {/* Mobile layout */}
        {isSmallScreen && (
          <div className="showcase__mobile-list">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project}
                isActive={project.id === activeId} onSelect={selectProject}>
                {project.id === activeId && (
                  <>
                    <div className="showcase__mobile-device">
                      <DeviceFrame />
                    </div>
                    <a href={currentUrl} target="_blank" rel="noopener noreferrer"
                      className="mag-btn showcase__open-link" data-hover>
                      Open Live Site ↗
                    </a>
                  </>
                )}
              </ProjectCard>
            ))}
          </div>
        )}

        {/* Desktop layout */}
        {!isSmallScreen && (
          <div className="showcase__desktop-layout">
            <div className="project-list-col">
              <div className="project-list-cards">
                {PROJECTS.map(project => (
                  <ProjectCard key={project.id} project={project}
                    isActive={project.id === activeId} onSelect={selectProject} />
                ))}
              </div>
              <a href={activeProject?.url} target="_blank" rel="noopener noreferrer"
                className="mag-btn showcase__open-link" data-hover>
                Open Live Site ↗
              </a>
            </div>

            <div className="showcase__device-col">
              <ViewToggle isMobile={isMobile} onToggle={handleToggle} />
              <DeviceFrame />
              <div className="showcase__info-bar glass">
                <div>
                  <div className="showcase__info-title">{activeProject?.title}</div>
                  <div className="showcase__info-desc">{activeProject?.desc}</div>
                </div>
                <div className="showcase__info-num">
                  {activeProject?.num} / {String(PROJECTS.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

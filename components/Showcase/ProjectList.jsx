/**
 * components/Showcase/ProjectList.jsx
 * Zero inline styles — classes from globals.css
 */
import { PROJECTS } from "../../data/projects";

export default function ProjectList({ activeId, onSelect }) {
  const activeProject = PROJECTS.find(p => p.id === activeId) ?? PROJECTS[0];

  return (
    <div className="project-list-col">
      <div className="project-list-cards">
        {PROJECTS.map(project => {
          const isActive = project.id === activeId;
          return (
            <div key={project.id} className="project-card">
              <button
                onClick={() => onSelect(project.id)}
                className={`project-card-header${isActive ? " active" : ""}`}
                data-hover
                aria-expanded={isActive}
              >
                <div className="project-card__meta">
                  <span className="project-card__tag" style={{ color: project.color }}>{project.tag}</span>
                  <span className="project-card__num">{project.num}</span>
                </div>
                <div className="project-card__title">{project.title}</div>
                <div className="project-card__desc">{project.desc}</div>
              </button>

              <div className="project-card-body" style={{ maxHeight: isActive ? 400 : 0 }}>
                <div className="project-card-body-inner">
                  <p className="project-card-about">{project.about}</p>
                  <div className="project-card-importance">
                    <div className="project-card-importance__label">Why it matters</div>
                    <p className="project-card-importance__text">{project.importance}</p>
                  </div>
                  <div className="project-card-features">
                    {project.features.map(f => (
                      <span key={f} className="feature-pill">✦ {f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <a
        href={activeProject.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mag-btn showcase__open-link"
        data-hover
      >
        Open Live Site
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </a>
    </div>
  );
}

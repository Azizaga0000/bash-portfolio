import { useMemo, useState } from "react";

function ProjectCard({ project, onPreview }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y, scale: 1.015 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 });
  };

  return (
    <article
      className="project-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`
      }}
    >
      <div className="project-head">
        <span className="project-category">{project.category}</span>
        <strong>{project.impact}</strong>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="stack-list">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="card-actions">
        <button className="small-btn" type="button" onClick={() => onPreview(project)}>
          Предпросмотр
        </button>
        <a href={project.demoUrl} target="_blank" rel="noreferrer">
          Demo
        </a>

      </div>
    </article>
  );
}

export default function ProjectGallery({ projects, onPreview }) {
  const [filter, setFilter] = useState("Все");

  const filters = useMemo(
    () => ["Все", ...new Set(projects.map((project) => project.category))],
    [projects]
  );

  const visibleProjects = useMemo(() => {
    if (filter === "Все") {
      return projects;
    }

    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  return (
    <section>
      <div className="section-head">
        <h2>Проекты с живым предпросмотром</h2>
        <p>Нажми «Предпросмотр», чтобы открыть отдельную мини-страницу проекта.</p>
      </div>
      <div className="filters">
        {filters.map((item) => (
          <button
            key={item}
            className={item === filter ? "chip is-active" : "chip"}
            type="button"
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onPreview={onPreview} />
        ))}
      </div>
    </section>
  );
}

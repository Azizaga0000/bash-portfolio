import { useEffect, useState } from "react";

export default function PreviewModal({ project, onClose }) {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="modal-content" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div>
            <strong>{project.title}</strong>
            <span>{project.category}</span>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className={device === "desktop" ? "chip is-active" : "chip"}
              onClick={() => setDevice("desktop")}
            >
              Desktop
            </button>
            <button
              type="button"
              className={device === "mobile" ? "chip is-active" : "chip"}
              onClick={() => setDevice("mobile")}
            >
              Mobile
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </header>
        <div className={device === "mobile" ? "preview-frame is-mobile" : "preview-frame"}>
          <iframe title={`${project.title} preview`} src={project.previewPath} loading="lazy" />
        </div>
        <footer>
          <a href={project.previewPath} target="_blank" rel="noreferrer">
            Открыть страницу отдельно
          </a>
        </footer>
      </div>
    </div>
  );
}

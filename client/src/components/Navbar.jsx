const sections = [
  { id: "home", label: "Главная" },
  { id: "projects", label: "Проекты" },
  { id: "skills", label: "Навыки" },
  { id: "lab", label: "Интерактив" },
  { id: "timeline", label: "Опыт" },
  { id: "contact", label: "Контакт" }
];

const themes = [
  { id: "aqua", label: "A" },
  { id: "ember", label: "E" },
  { id: "graphite", label: "G" }
];

export default function Navbar({
  activeSection,
  progress,
  onNavigate,
  theme,
  onThemeChange,
  onOpenCommand
}) {
  return (
    <header className="navbar-wrap">
      <div className="progress-line" style={{ transform: `scaleX(${progress})` }} />
      <div className="navbar">
        <button className="brand-mark" onClick={() => onNavigate("home")} type="button">
          GN<span className="brand-dot" />
        </button>
        <nav className="nav-links" aria-label="Главная навигация">
          {sections.map((section) => (
            <button
              key={section.id}
              className={section.id === activeSection ? "nav-link is-active" : "nav-link"}
              onClick={() => onNavigate(section.id)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="nav-tools">
          <div className="theme-switch" aria-label="Переключатель темы">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={theme === item.id ? "theme-dot is-active" : "theme-dot"}
                onClick={() => onThemeChange(item.id)}
                aria-label={`Тема ${item.id}`}
                title={`Тема ${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="ghost-btn" onClick={onOpenCommand} type="button">
            Quick Menu
          </button>
        </div>
      </div>
    </header>
  );
}

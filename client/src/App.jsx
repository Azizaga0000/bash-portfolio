import { useEffect, useMemo, useState } from "react";
import { getPortfolioData, sendMessage } from "./api";
import CommandPalette from "./components/CommandPalette";
import ContactTerminal from "./components/ContactTerminal";
import Hero from "./components/Hero";
import InteractiveLab from "./components/InteractiveLab";
import Navbar from "./components/Navbar";
import ParticleField from "./components/ParticleField";
import PreviewModal from "./components/PreviewModal";
import ProjectGallery from "./components/ProjectGallery";
import SkillOrbit from "./components/SkillOrbit";
import Timeline from "./components/Timeline";

const emptyData = {
  profile: null,
  projects: [],
  skills: [],
  timeline: [],
  activity: []
};

const themeOrder = ["aqua", "ember", "graphite"];

const isInputLike = (target) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
};

export default function App() {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);
  const [previewProject, setPreviewProject] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "aqua");
  const [commandOpen, setCommandOpen] = useState(false);

  const sectionIds = useMemo(
    () => ["home", "projects", "skills", "lab", "timeline", "contact"],
    []
  );

  const cycleTheme = () => {
    setTheme((previous) => {
      const index = themeOrder.indexOf(previous);
      const next = themeOrder[(index + 1) % themeOrder.length];
      return next;
    });
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const payload = await getPortfolioData();
      setData(payload);
    } catch (fetchError) {
      setError(fetchError.message ?? "Не удалось загрузить данные");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(Math.max(value, 0), 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((previous) => !previous);
        return;
      }

      if (isInputLike(event.target)) {
        return;
      }

      if (event.key.toLowerCase() === "t") {
        cycleTheme();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-20% 0px -35% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds, data.profile]);

  useEffect(() => {
    if (loading) {
      return undefined;
    }

    const revealNodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    revealNodes.forEach((node, index) => {
      node.style.transitionDelay = `${index * 80}ms`;
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [loading]);

  const navigateTo = (id) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const commandItems = useMemo(() => {
    const navigationCommands = sectionIds.map((id) => ({
      id: `go-${id}`,
      label: `Перейти: ${id}`,
      description: "Плавная прокрутка к секции",
      run: () => navigateTo(id)
    }));

    const randomPreviewCommand = {
      id: "random-preview",
      label: "Случайный предпросмотр",
      description: "Открывает случайный проект в модалке",
      run: () => {
        if (!data.projects.length) {
          return;
        }

        const randomIndex = Math.floor(Math.random() * data.projects.length);
        setPreviewProject(data.projects[randomIndex]);
      }
    };

    return [
      ...navigationCommands,
      {
        id: "theme-cycle",
        label: "Сменить тему",
        description: "Переключает цветовой пресет интерфейса",
        run: cycleTheme
      },
      randomPreviewCommand
    ];
  }, [data.projects, sectionIds]);

  if (loading) {
    return (
      <div className="screen-state">
        <div className="loader" />
        <p>Загрузка портфолио...</p>
      </div>
    );
  }

  if (error || !data.profile) {
    return (
      <div className="screen-state">
        <p>Ошибка: {error || "данные не найдены"}</p>
        <button className="primary-btn" type="button" onClick={loadData}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div
      className="app-shell"
      data-theme={theme}
      style={{
        "--cursor-x": `${cursor.x}px`,
        "--cursor-y": `${cursor.y}px`
      }}
    >
      <div className="bg-noise" />
      <div className="bg-glow" />
      <ParticleField />
      <Navbar
        activeSection={activeSection}
        progress={progress}
        onNavigate={navigateTo}
        theme={theme}
        onThemeChange={setTheme}
        onOpenCommand={() => setCommandOpen(true)}
      />
      <main>
        <section id="home" data-section className="page-section reveal">
          <Hero
            profile={data.profile}
            onExploreProjects={() => navigateTo("projects")}
            onOpenContact={() => navigateTo("contact")}
          />
        </section>

        <section id="projects" data-section className="page-section reveal">
          <ProjectGallery projects={data.projects} onPreview={setPreviewProject} />
        </section>

        <section id="skills" data-section className="page-section reveal">
          <SkillOrbit groups={data.skills} activity={data.activity} />
        </section>

        <section id="lab" data-section className="page-section reveal">
          <InteractiveLab />
        </section>

        <section id="timeline" data-section className="page-section reveal">
          <Timeline items={data.timeline} />
        </section>

        <section id="contact" data-section className="page-section reveal">
          <ContactTerminal onSubmit={sendMessage} />
        </section>
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {data.profile.fullName}.</p>
        <p>React + JavaScript + Node.js • Press T for theme</p>
      </footer>
      <CommandPalette
        isOpen={commandOpen}
        commands={commandItems}
        onClose={() => setCommandOpen(false)}
      />
      <PreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
    </div>
  );
}
